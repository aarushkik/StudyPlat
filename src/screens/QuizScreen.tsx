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
import { AppButton, PropBadge } from '@/components/ui';
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
import { getPlacementQuiz, questionsForStop, questionsForSkills, placementQuestions } from '@/data';
import { companionById } from '@/data/companions';
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
  const { recordSession, ability, equippedId } = useQuest();
  const companion = companionById(equippedId);

  const quiz = useMemo(() => getPlacementQuiz(courseId), [courseId]);
  /**
   * The equipped companion's one-shot abilities.
   *
   * One use per session rather than per question: a hint on every question is
   * not a hint, it is the answer key, and the ability lines say "one" for a
   * reason. Each is a separate flag so a student can spend them on different
   * questions.
   */
  const [hintShown, setHintShown] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [struckId, setStruckId] = useState<string | null>(null);
  const [strikeUsed, setStrikeUsed] = useState(false);
  const [retryUsed, setRetryUsed] = useState(false);
  /** Questions missed this session, queued to be asked again at the end. */
  const [requeued, setRequeued] = useState<PlacementQuestion[]>([]);
  const [hasRequeued, setHasRequeued] = useState(false);
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
    // A drill that named a topic asks about that topic, and only tops up from
    // the rest of the course if the bank cannot fill the session.
    if (params?.focus?.length) return questionsForSkills(courseId, params.focus, count, key);
    // Anything else ranges over the whole course.
    return pickQuestions(quiz.questions, count, key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz, courseId, session?.title, session?.nodeId, params?.count, params?.unit, params?.focus]);

  // Slate appends what was missed rather than replacing the run, so the
  // counter stays honest: "5 / 7" after a re-ask really is seven questions.
  const run = useMemo(() => [...questions, ...requeued], [questions, requeued]);
  const total = run.length;

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

  /**
   * True from the moment Continue is pressed until the next question is on
   * screen.
   *
   * Advancing happens in the fade-out's completion callback, so for the length
   * of that animation the button is still mounted, still says Continue, and
   * still has `checked` set. A second press inside that window ran the
   * advance twice: on an early question it silently skipped one, and on the
   * last-but-one it stepped past the end of the array and took the whole quiz
   * down with `Cannot read properties of undefined`. Easy to hit — the button
   * sits under your thumb and nothing about it looks busy.
   */
  const advancing = useRef(false);

  const question = run[Math.min(index, total - 1)];
  const isChoiceBased = !!question.choices;
  const isLast = index + 1 >= total;
  const progress = (index + (checked ? 1 : 0)) / total;
  const canCheck = isChoiceBased ? selectedChoiceId !== null : textAnswer.trim().length > 0;

  const evaluate = (): boolean => {
    if (isChoiceBased) return selectedChoiceId === question.correctAnswerId;
    return (question.acceptedAnswers ?? []).map(normalize).includes(normalize(textAnswer));
  };

  /** Mira: show the explanation before answering, once. */
  const takeHint = () => {
    if (hintUsed) return;
    setHintUsed(true);
    setHintShown(true);
  };

  /**
   * Nix: rule out one wrong option, once.
   *
   * Picked deterministically from the question's own id rather than at random,
   * so leaving and re-entering a stop cannot be used to strike a different
   * option each time and narrow it down for free.
   */
  const strikeOne = () => {
    if (strikeUsed || !question.choices) return;
    const wrong = question.choices.filter((c) => c.id !== question.correctAnswerId);
    if (wrong.length === 0) return;
    const seed = [...question.id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    setStruckId(wrong[seed % wrong.length].id);
    setStrikeUsed(true);
  };

  /**
   * Quill: take a wrong answer back, once.
   *
   * The answer has already been recorded by `onCheck`, so the retry drops it —
   * otherwise the session would count the attempt the companion just undid,
   * and a student who fixed it would still see the miss in their weak spots.
   */
  const takeRetry = () => {
    if (retryUsed || isCorrect || !checked) return;
    setRetryUsed(true);
    setAnswered((prev) => prev.slice(0, -1));
    setChecked(false);
    setIsCorrect(false);
    setSelectedChoiceId(null);
    setTextAnswer('');
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
      const base = Math.max(5, Math.round((session.xp * correct) / Math.max(1, all.length)));
      const earned = Math.round(base * xpMultiplier(all));
      recordSession(
        earned,
        session.nodeId,
        // What this session actually got right, by skill. Without it the
        // weakest-category list and every accuracy achievement stay empty.
        all.map((a) => ({ skillTag: a.question.skillTag, correct: a.correct })),
      );
      navigation.replace('LessonComplete', { title: session.title, correct, total: all.length, xp: earned });
      return;
    }

    setPlacementLevelId(scorePlacement(all).level);
    navigation.replace('PlacementResult');
  };

  /**
   * What the equipped companion multiplies this session's XP by.
   *
   * Applied after the accuracy split rather than instead of it, so a companion
   * rewards a good session rather than replacing the need for one.
   */
  const xpMultiplier = (all: AnsweredQuestion[]): number => {
    if (ability === 'xpDrill' && !session?.nodeId) return 1.2;
    if (ability === 'xpBoss' && params?.boss) return 1.5;
    if (ability === 'xpPerfect' && all.length > 0 && all.every((a) => a.correct)) return 2;
    return 1;
  };

  /**
   * What the equipped companion offers on this question, if anything.
   *
   * Only the two abilities that act *before* an answer appear here — the retry
   * belongs on the feedback panel, where the miss it is undoing is, and the
   * rest change what the session pays rather than how it is asked.
   *
   * Off during the placement quiz: that run decides where the map opens, and a
   * companion nudging it would place the student somewhere they have not
   * actually earned.
   */
  const companionAction = (() => {
    if (!session || !companion) return null;
    if (ability === 'hint') return { label: 'Hint', spent: hintUsed, onPress: takeHint };
    if (ability === 'eliminate' && question.choices) {
      return { label: 'Rule one out', spent: strikeUsed, onPress: strikeOne };
    }
    return null;
  })();

  const canRetry = Boolean(session) && ability === 'retry' && !retryUsed && checked && !isCorrect;

  const onContinue = () => {
    if (advancing.current) return;
    if (isLast) {
      /**
       * Slate: ask everything missed one more time before finishing.
       *
       * Appended once per session, not repeatedly — a student who misses the
       * re-ask too would otherwise never reach the end. Both attempts are
       * recorded, because both happened.
       */
      if (ability === 'requeue' && !hasRequeued) {
        const missed = answered.filter((a) => !a.correct).map((a) => a.question);
        if (missed.length > 0) {
          setHasRequeued(true);
          setRequeued(missed);
          setIndex((i) => i + 1);
          setSelectedChoiceId(null);
          setTextAnswer('');
          setChecked(false);
          setIsCorrect(false);
          setStruckId(null);
          setHintShown(false);
          return;
        }
      }
      // Finishing navigates away, so the latch is never released — which is
      // what stops a second press replacing the results screen twice.
      advancing.current = true;
      finish(answered);
      return;
    }
    advancing.current = true;
    Animated.timing(qAnim, { toValue: 0, duration: duration.fast, easing: easing.in, useNativeDriver: true }).start(() => {
      // Clamped as well as latched: the latch is the fix, the clamp means a
      // future path into this callback cannot crash the screen either.
      setIndex((i) => Math.min(i + 1, total - 1));
      setSelectedChoiceId(null);
      setTextAnswer('');
      setChecked(false);
      setIsCorrect(false);
      setStruckId(null);
      setHintShown(false);
      advancing.current = false;
      Animated.timing(qAnim, { toValue: 1, duration: duration.base, easing: easing.out, useNativeDriver: true }).start();
    });
  };

  const choiceState = (choiceId: string): ChoiceState => {
    if (!checked) {
      if (choiceId === struckId) return 'struck';
      return selectedChoiceId === choiceId ? 'selected' : 'idle';
    }
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
              retry={
                canRetry ? { label: `${companion?.name ?? 'Retry'} — try again`, onPress: takeRetry } : undefined
              }
            />
          ) : (
            <View style={styles.footer}>
              {/* What the equipped companion can do on this question, if
                  anything. Absent entirely when there is nothing to offer, so
                  nobody sees a control that does not apply to them. */}
              {companionAction ? (
                <View style={styles.companionBar}>
                  <PropBadge name={companion!.emblem} tint={companion!.tint} size={34} radius={12} />
                  <View style={styles.companionText}>
                    <Text style={styles.companionName}>{companion!.name}</Text>
                    <Text style={styles.companionNote} numberOfLines={1}>
                      {companionAction.spent ? 'Used this session' : companion!.ability}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={companionAction.label}
                    disabled={companionAction.spent}
                    onPress={companionAction.onPress}
                    style={({ pressed }) => [
                      styles.companionBtn,
                      companionAction.spent && styles.companionBtnSpent,
                      pressed && styles.companionBtnPressed,
                    ]}
                  >
                    <Text
                      style={[styles.companionBtnText, companionAction.spent && styles.companionBtnTextSpent]}
                    >
                      {companionAction.spent ? 'SPENT' : companionAction.label.toUpperCase()}
                    </Text>
                  </Pressable>
                </View>
              ) : null}

              {hintShown ? (
                <View style={styles.hint}>
                  <Text style={styles.hintText}>{question.explanation}</Text>
                </View>
              ) : null}

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

  companionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingLeft: spacing.sm,
    paddingRight: spacing.md,
  },
  companionText: { flex: 1, minWidth: 0 },
  companionName: { ...typography.bodyStrong, fontSize: 14, color: colors.textPrimary },
  companionNote: { ...typography.caption, color: colors.textMuted },
  companionBtn: {
    backgroundColor: colors.primary,
    borderWidth: 2.5,
    borderColor: colors.ink,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  companionBtnPressed: { transform: [{ translateY: 2 }] },
  companionBtnSpent: { backgroundColor: 'transparent', borderColor: 'rgba(18,48,60,0.28)' },
  companionBtnText: { ...typography.label, fontSize: 11, color: colors.white },
  companionBtnTextSpent: { color: colors.textMuted },

  hint: {
    marginBottom: spacing.md,
    backgroundColor: colors.primaryTint,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  hintText: { ...typography.body, fontSize: 13.5, color: colors.primaryDeep },

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
