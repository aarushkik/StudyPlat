import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { AppButton } from '@/components/ui';
import { Glyph } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import { colors, radius, shadows, spacing, typography } from '@/theme';

interface QuizFeedbackPanelProps {
  correct: boolean;
  explanation: string;
  /** Shown on a miss so the right answer is always stated plainly. */
  answer?: string;
  /** Label for the primary action — "Continue" mid-quiz, "Finish" at the end. */
  continueLabel: string;
  onContinue: () => void;
  /**
   * Offered on a miss when the equipped companion can take it back. Absent
   * when there is nothing to offer, so the panel is unchanged for everyone
   * who has not equipped one.
   */
  retry?: { label: string; onPress: () => void };
}

/**
 * The panel that slides up after an answer is checked.
 *
 * Supportive by design: a miss is framed as information, never a scolding —
 * Stu looks concerned rather than disappointed, the correct answer is stated
 * outright, and the explanation gets more room than the verdict does.
 */
export function QuizFeedbackPanel({ correct, explanation, answer, continueLabel, onContinue, retry }: QuizFeedbackPanelProps) {
  const insets = useSafeAreaInsets();
  const { reduceMotion } = useMotionPreference();
  const slide = useRef(new Animated.Value(90)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slide.setValue(0);
    const animation = Animated.timing(fade, { toValue: 1, duration: reduceMotion ? 0 : 180, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [slide, fade, reduceMotion]);

  const accent = correct ? colors.successDark : colors.dangerDark;

  return (
    <Animated.View
      style={[
        styles.panel,
        shadows.xl,
        {
          backgroundColor: correct ? colors.successSoft : colors.dangerSoft,
          paddingBottom: insets.bottom + spacing.lg,
          opacity: fade,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      <ScrollView style={{ flexShrink: 1 }} showsVerticalScrollIndicator={false}><View style={styles.headerRow}>
        <Mascot size={70} pose={correct ? 'thumbsup' : 'wince'} shadow={false} />
        <View style={styles.titleWrap}>
          <View style={styles.titleRow}>
            <View style={[styles.verdictDot, { backgroundColor: accent }]}>
              <Glyph name={correct ? 'check' : 'close'} size={13} color={colors.white} strokeWidth={3.4} />
            </View>
            <Text accessibilityLiveRegion="polite" style={[styles.title, { color: accent }]}>{correct ? 'Nailed it' : 'Not quite'}</Text>
          </View>
          {!correct && answer ? (
            <Text style={styles.answer}>
              Answer: <Text style={{ color: accent }}>{answer}</Text>
            </Text>
          ) : null}
          <Text style={styles.explanation}>{explanation}</Text>
        </View>
      </View>

      </ScrollView>
      {/* The retry sits above Continue and is the quieter of the two. Moving
          on is always the safe choice; spending a one-per-session ability
          should be a decision, not the thing under your thumb. */}
      {retry ? (
        <Pressable
          accessibilityRole="button"
          onPress={retry.onPress}
          style={({ pressed }) => [styles.retry, pressed && styles.retryPressed]}
        >
          <Glyph name="refresh" size={16} color={colors.dangerDark} strokeWidth={2.8} />
          <Text style={styles.retryText}>{retry.label}</Text>
        </Pressable>
      ) : null}

      <AppButton
        label={continueLabel}
        tone={correct ? 'success' : 'primary'}
        icon="arrow-right"
        onPress={onContinue}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Ruled in ink on three sides, like the stop sheet. A coloured hairline over
  // a soft tinted sheet was the last surface still drawn in the old language,
  // and next to the ink-bordered answer cards above it, it read as unfinished.
  panel: {
    maxHeight: '60%', width: '100%', maxWidth: 620, alignSelf: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: colors.ink,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    overflow: 'hidden',
  },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg, gap: spacing.sm },
  titleWrap: { flex: 1, paddingTop: spacing.sm },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  verdictDot: { width: 24, height: 24, borderRadius: radius.pill, borderWidth: 2.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.heading },
  answer: { ...typography.bodyStrong, color: colors.textPrimary, marginTop: spacing.sm },
  explanation: { ...typography.body, color: colors.textPrimary, marginTop: spacing.xs },
  retry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
  },
  retryPressed: { transform: [{ translateY: 2 }], opacity: 0.92 },
  retryText: { ...typography.label, fontSize: 13, color: colors.dangerDark },
});
