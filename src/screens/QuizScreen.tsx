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
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '@/components/ui';
import { Glyph } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import {
  AnswerChoice,
  QuestionCard,
  QuizFeedbackPanel,
  QuizProgressHeader,
  StreakMilestoneOverlay,
  type ChoiceState,
} from '@/components/quiz';
import { colors, duration, easing, radius, spacing, typography } from '@/theme';
import { getPlacementQuiz, questionsForStop, placementQuestions } from '@/data';
import { scorePlacement, type AnsweredQuestion } from '@/utils/placementScoring';
import { isStreakMilestone } from '@/utils/streaks';
import { useOnboarding } from '@/state/OnboardingContext';
import { useQuest } from '@/state/QuestContext';
import type { PlacementQuestion } from '@/types';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Quiz'>;
type Route = RouteProp<RootStackParamList, 'Quiz'>;

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

/**
 * The question engine, used for two jobs.
 *
 * With no params it runs the "Find Your Level" placement quest: an intro,
 * the subject's full question set, then a weighted score that decides where the
 * quest map opens. With params it runs a *session* — one stop on the map or a
 * drill from the training ground — using a slice of the same bank and reporting
 * back to the map instead of to placement.
 */
export function QuizScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { courseId, setPlacementLevelId, setStartChoice } = useOnboarding();
  const { recordSession } = useQuest();

  const quiz = useMemo(() => getPlacementQuiz(courseId), [courseId]);
  const session = params?.title != null ? { title: params.title, xp: params.xp ?? 20, nodeId: params.nodeId } : null;

  const questions = useMemo(() => {
    // No params at all is the placement quest, which samples across the whole
    // course rather than running every question in it.
    if (!session) return placementQuestions(courseId);
    const key = session.nodeId ?? session.title;
    const count = params?.count ?? 5;
    // A stop knows its unit, so it draws from that unit first and only falls
    // back to the rest of the course if it needs more than the unit holds.
    if (params?.unit != null) return questionsForStop(courseId, params.unit, count, key);
    // A practice drill has no unit — it ranges over the whole course.
    return pickQuestions(quiz.questions, count, key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz, courseId, session?.title, session?.nodeId, params?.count, params?.unit]);
  const total = questions.length;

  const [phase, setPhase] = useState<'intro' | 'quiz'>(session ? 'quiz' : 'intro');
  const [index, setIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);

  const [currentCorrectStreak, setCurrentCorrectStreak] = useState(0);
  const [milestoneStreak, setMilestoneStreak] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const qAnim = useRef(new Animated.Value(1)).current;

  const question = questions[index];
  const isChoiceBased = !!question.choices;
  const isLast = index + 1 >= total;
  const progress = (index + (checked ? 1 : 0)) / total;
  const canCheck = isChoiceBased ? selectedChoiceId !== null : textAnswer.trim().length > 0;

  const evaluate = (): boolean => {
    if (isChoiceBased) return selectedChoiceId === question.correctAnswerId;
    return (question.acceptedAnswers ?? []).map(normalize).includes(normalize(textAnswer));
  };

  const onCheck = () => {
    if (!canCheck || checked) return;
    const correct = evaluate();
    setIsCorrect(correct);
    setChecked(true);

    if (correct) {
      const next = currentCorrectStreak + 1;
      setCurrentCorrectStreak(next);
      if (isStreakMilestone(next)) {
        setMilestoneStreak(next);
        setOverlayVisible(true);
      }
    } else {
      setCurrentCorrectStreak(0);
    }

    setAnswered((prev) => [...prev, { question, correct }]);
  };

  const finish = (all: AnsweredQuestion[]) => {
    const correct = all.filter((a) => a.correct).length;

    if (session) {
      // Award XP in proportion to accuracy, but never nothing for finishing.
      const earned = Math.max(5, Math.round((session.xp * correct) / Math.max(1, all.length)));
      recordSession(earned, session.nodeId);
      navigation.replace('LessonComplete', { title: session.title, correct, total: all.length, xp: earned });
      return;
    }

    setPlacementLevelId(scorePlacement(all).level);
    navigation.replace('PlacementResult');
  };

  const onContinue = () => {
    if (isLast) {
      finish(answered);
      return;
    }
    Animated.timing(qAnim, { toValue: 0, duration: duration.fast, easing: easing.in, useNativeDriver: true }).start(() => {
      setIndex((i) => i + 1);
      setSelectedChoiceId(null);
      setTextAnswer('');
      setChecked(false);
      setIsCorrect(false);
      Animated.timing(qAnim, { toValue: 1, duration: duration.base, easing: easing.out, useNativeDriver: true }).start();
    });
  };

  const choiceState = (choiceId: string): ChoiceState => {
    if (!checked) return selectedChoiceId === choiceId ? 'selected' : 'idle';
    if (choiceId === question.correctAnswerId) return isCorrect ? 'correct' : 'missed';
    if (choiceId === selectedChoiceId) return 'wrong';
    return 'idle';
  };

  const correctAnswerText = isChoiceBased
    ? question.choices?.find((c) => c.id === question.correctAnswerId)?.text
    : question.acceptedAnswers?.[0];

  // --- Intro (placement only): take the quest, or skip to the first unit ---
  if (phase === 'intro') {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.introTop}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityLabel="Close">
            <Glyph name="close" size={24} color={colors.textMuted} strokeWidth={2.6} />
          </Pressable>
        </View>

        <View style={styles.introBody}>
          <Mascot size={200} pose="excited" />
          <View style={styles.introBadge}>
            <Glyph name="compass" size={16} color={colors.primary} strokeWidth={2.4} />
            <Text style={styles.introBadgeText}>Find your level</Text>
          </View>
          <Text style={[typography.title, styles.introTitle]}>Let's see where you already are</Text>
          <Text style={[typography.body, styles.introText]}>{quiz.intro}</Text>
          <Text style={styles.introMeta}>{total} questions · about 4 minutes</Text>
        </View>

        <View style={styles.footer}>
          <AppButton label="Start the quest" icon="play" emphasis onPress={() => { setStartChoice('find_level'); setPhase('quiz'); }} />
          <Pressable
            onPress={() => {
              setStartChoice('scratch');
              setPlacementLevelId('beginner');
              navigation.replace('PlacementResult');
            }}
            hitSlop={8}
            style={styles.skip}
          >
            <Text style={styles.skipText}>Skip — start me at the beginning</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // --- Questions ---
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.headerWrap}>
            {session ? (
              <Text style={styles.sessionTitle} numberOfLines={1}>
                {session.title}
              </Text>
            ) : null}
            <QuizProgressHeader
              progress={progress}
              counter={`${index + 1} / ${total}`}
              currentCorrectStreak={currentCorrectStreak}
              onClose={() => navigation.goBack()}
            />
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={{
                opacity: qAnim,
                transform: [{ translateY: qAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
              }}
            >
              <QuestionCard question={question}>
                {isChoiceBased ? (
                  question.choices!.map((choice, i) => (
                    <AnswerChoice
                      key={choice.id}
                      index={i}
                      label={choice.text}
                      state={choiceState(choice.id)}
                      disabled={checked}
                      onPress={() => setSelectedChoiceId(choice.id)}
                    />
                  ))
                ) : (
                  <TextInput
                    style={[
                      styles.input,
                      checked && { borderColor: isCorrect ? colors.success : colors.danger },
                    ]}
                    placeholder="Type your answer"
                    placeholderTextColor={colors.textMuted}
                    value={textAnswer}
                    onChangeText={setTextAnswer}
                    editable={!checked}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={onCheck}
                  />
                )}
              </QuestionCard>
            </Animated.View>
          </ScrollView>

          {checked ? (
            <QuizFeedbackPanel
              correct={isCorrect}
              explanation={question.explanation}
              answer={correctAnswerText}
              continueLabel={isLast ? 'Finish' : 'Continue'}
              onContinue={onContinue}
            />
          ) : (
            <View style={styles.footer}>
              <AppButton label="Check" disabled={!canCheck} onPress={onCheck} />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>

      <StreakMilestoneOverlay
        visible={overlayVisible}
        streakCount={milestoneStreak}
        onAnimationComplete={() => setOverlayVisible(false)}
      />
    </View>
  );
}

/**
 * Take `count` questions from the bank, starting at an offset derived from the
 * stop's id. Two different stops therefore open on different questions, and the
 * same stop always opens on the same ones.
 */
function pickQuestions(bank: PlacementQuestion[], count: number, key: string): PlacementQuestion[] {
  if (bank.length === 0) return bank;
  const seed = [...key].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const start = seed % bank.length;
  const size = Math.min(count, bank.length);
  return Array.from({ length: size }, (_, i) => bank[(start + i) % bank.length]);
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },

  introTop: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  introBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  introBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryTint,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    marginTop: spacing.lg,
  },
  introBadgeText: { ...typography.overline, color: colors.primary },
  introTitle: { marginTop: spacing.md, textAlign: 'center' },
  introText: { textAlign: 'center', marginTop: spacing.sm, paddingHorizontal: spacing.sm },
  introMeta: { ...typography.caption, marginTop: spacing.lg },
  skip: { alignSelf: 'center', paddingVertical: spacing.md, marginTop: spacing.xs },
  skipText: { ...typography.bodyStrong, color: colors.textSecondary },

  headerWrap: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  sessionTitle: { ...typography.overline, color: colors.textMuted, marginBottom: spacing.xs, paddingLeft: spacing.xxxl },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.huge },

  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg, paddingBottom: spacing.xxl },
});
