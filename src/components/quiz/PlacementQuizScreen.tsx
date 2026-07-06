import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '@/components/ui';
import { Mascot } from '@/components/Mascot';
import type { MascotExpression } from '@/components/Mascot';
import { AnswerChoice, type ChoiceState } from './AnswerChoice';
import { QuestionCard } from './QuestionCard';
import { QuizFeedbackPanel } from './QuizFeedbackPanel';
import { QuizProgressHeader } from './QuizProgressHeader';
import { colors, spacing, typography } from '@/theme';
import { getPlacementQuiz } from '@/data';
import { scorePlacement, type AnsweredQuestion } from '@/utils/placementScoring';
import { useOnboarding } from '@/state/OnboardingContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'PlacementQuiz'>;

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

/**
 * The "Find Your Level" placement quiz engine. Steps through a subject's
 * questions (multiple-choice, short-answer, and stimulus-based), gives
 * supportive per-answer feedback, then scores the result and routes to the
 * placement screen. Reusable across subjects — it just reads the quiz for the
 * currently selected course.
 */
export function PlacementQuizScreen() {
  const navigation = useNavigation<Nav>();
  const { courseId, setPlacementLevelId } = useOnboarding();
  const quiz = useMemo(() => getPlacementQuiz(courseId), [courseId]);
  const questions = quiz.questions;
  const total = questions.length;

  const [phase, setPhase] = useState<'intro' | 'quiz'>('intro');
  const [index, setIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [expression, setExpression] = useState<MascotExpression>('thinking');

  const qAnim = useRef(new Animated.Value(1)).current;

  const question = questions[index];
  const isChoiceBased = !!question.choices;
  const correctCount = answered.filter((a) => a.correct).length;
  const confidence = answered.length ? correctCount / answered.length : 0;
  const progress = (index + (checked ? 1 : 0)) / total;

  const canCheck = isChoiceBased ? selectedChoiceId !== null : textAnswer.trim().length > 0;

  const evaluate = (): boolean => {
    if (isChoiceBased) return selectedChoiceId === question.correctAnswerId;
    const accepted = (question.acceptedAnswers ?? []).map(normalize);
    return accepted.includes(normalize(textAnswer));
  };

  const onCheck = () => {
    if (!canCheck || checked) return;
    const correct = evaluate();
    setIsCorrect(correct);
    setChecked(true);
    setExpression(correct ? 'excited' : 'worried');
    setAnswered((prev) => [...prev, { question, correct }]);
  };

  const finish = (all: AnsweredQuestion[]) => {
    const result = scorePlacement(all);
    setPlacementLevelId(result.level);
    navigation.replace('PlacementResult');
  };

  const onContinue = () => {
    if (index + 1 >= total) {
      finish(answered);
      return;
    }
    // Fade/slide the current question out, swap, then animate the next one in.
    Animated.timing(qAnim, { toValue: 0, duration: 170, useNativeDriver: true }).start(() => {
      setIndex((i) => i + 1);
      setSelectedChoiceId(null);
      setTextAnswer('');
      setChecked(false);
      setIsCorrect(false);
      setExpression('thinking');
      Animated.timing(qAnim, { toValue: 1, duration: 260, useNativeDriver: true }).start();
    });
  };

  const choiceState = (choiceId: string): ChoiceState => {
    if (!checked) return selectedChoiceId === choiceId ? 'selected' : 'idle';
    if (choiceId === question.correctAnswerId) return 'correct';
    if (choiceId === selectedChoiceId) return 'wrong';
    return 'idle';
  };

  const qOpacity = qAnim;
  const qTranslate = qAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });

  // --- Intro phase ---
  if (phase === 'intro') {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.introTop}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityLabel="Close quiz">
            <Ionicons name="close" size={28} color={colors.textMuted} />
          </Pressable>
        </View>
        <View style={styles.introBody}>
          <Mascot size="large" expression="excited" accessory="pencil" animated />
          <Text style={[typography.title, styles.introTitle]}>Find your level</Text>
          <Text style={[typography.body, styles.introText]}>{quiz.intro}</Text>
        </View>
        <View style={styles.footer}>
          <AppButton label="Start quiz" onPress={() => setPhase('quiz')} />
        </View>
      </SafeAreaView>
    );
  }

  // --- Quiz phase ---
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.headerWrap}>
          <QuizProgressHeader onClose={() => navigation.goBack()} progress={progress} confidence={confidence} />
        </View>

        <View style={styles.mascotWrap}>
          <Mascot size={84} expression={expression} accessory="none" />
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: qOpacity, transform: [{ translateY: qTranslate }] }}>
            <QuestionCard question={question}>
              {isChoiceBased ? (
                question.choices!.map((choice) => (
                  <AnswerChoice
                    key={choice.id}
                    label={choice.text}
                    state={choiceState(choice.id)}
                    disabled={checked}
                    onPress={() => setSelectedChoiceId(choice.id)}
                  />
                ))
              ) : (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      checked && { borderColor: isCorrect ? colors.success : colors.danger },
                    ]}
                    placeholder="Type your answer…"
                    placeholderTextColor={colors.textMuted}
                    value={textAnswer}
                    onChangeText={setTextAnswer}
                    editable={!checked}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={onCheck}
                  />
                  {checked && !isCorrect ? (
                    <Text style={styles.answerHint}>
                      Answer: {question.acceptedAnswers?.[0]}
                    </Text>
                  ) : null}
                </View>
              )}
            </QuestionCard>
          </Animated.View>
        </ScrollView>

        {checked ? (
          <QuizFeedbackPanel correct={isCorrect} explanation={question.explanation} onContinue={onContinue} />
        ) : (
          <View style={styles.footer}>
            <AppButton label="Check" disabled={!canCheck} onPress={onCheck} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },

  introTop: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  introBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  introTitle: { marginTop: spacing.lg },
  introText: { textAlign: 'center', marginTop: spacing.md, paddingHorizontal: spacing.sm },

  headerWrap: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  mascotWrap: { alignItems: 'center', marginTop: spacing.sm },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xxl },

  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  answerHint: { ...typography.caption, color: colors.dangerDark, marginTop: spacing.sm, marginLeft: spacing.xs },

  footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
});
