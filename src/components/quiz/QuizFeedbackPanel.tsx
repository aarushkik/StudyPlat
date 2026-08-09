import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
}

/**
 * The panel that slides up after an answer is checked.
 *
 * Supportive by design: a miss is framed as information, never a scolding —
 * Stu looks concerned rather than disappointed, the correct answer is stated
 * outright, and the explanation gets more room than the verdict does.
 */
export function QuizFeedbackPanel({ correct, explanation, answer, continueLabel, onContinue }: QuizFeedbackPanelProps) {
  const insets = useSafeAreaInsets();
  const slide = useRef(new Animated.Value(90)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  }, [slide, fade]);

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
      <View style={styles.headerRow}>
        <Mascot size={70} pose={correct ? 'thumbsup' : 'wince'} shadow={false} />
        <View style={styles.titleWrap}>
          <View style={styles.titleRow}>
            <View style={[styles.verdictDot, { backgroundColor: accent }]}>
              <Glyph name={correct ? 'check' : 'close'} size={13} color={colors.white} strokeWidth={3.4} />
            </View>
            <Text style={[styles.title, { color: accent }]}>{correct ? 'Nailed it' : 'Not quite'}</Text>
          </View>
          {!correct && answer ? (
            <Text style={styles.answer}>
              Answer: <Text style={{ color: accent }}>{answer}</Text>
            </Text>
          ) : null}
          <Text style={styles.explanation}>{explanation}</Text>
        </View>
      </View>

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
});
