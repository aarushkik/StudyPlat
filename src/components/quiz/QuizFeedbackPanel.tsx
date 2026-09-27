import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
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
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

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
      <ScrollView style={{ flexShrink: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.lg }}><View style={styles.headerRow}>
        <Mascot size={48} pose={correct ? 'thumbsup' : 'wince'} shadow={false} />
        <View style={styles.titleWrap}>
          <View style={styles.titleRow}>
            <View style={[styles.verdictDot, { backgroundColor: accent }]}>
              <Glyph name={correct ? 'check' : 'close'} size={13} color={appTheme.isDark ? colors.textOnPrimary : colors.white} strokeWidth={3.4} />
            </View>
            <Text accessibilityLiveRegion="polite" style={[styles.title, { color: accent }]}>{correct ? 'Nailed it' : 'Not quite'}</Text>
          </View>
          <Text style={styles.caption}>{correct ? 'One more idea, locked in.' : 'A useful one to remember.'}</Text>
        </View>
      </View>
      {!correct && answer ? (
            <Text style={styles.answer}>
              Answer: <Text style={{ color: accent }}>{answer}</Text>
            </Text>
          ) : null}
      <Text style={styles.explanation}>{explanation}</Text>

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

const createStyles = ({ colors, palette, typography, stroke }: AppTheme) => StyleSheet.create({
  // Ruled in ink on three sides, like the stop sheet. A coloured hairline over
  // a soft tinted sheet was the last surface still drawn in the old language,
  // and next to the ink-bordered answer cards above it, it read as unfinished.
  panel: {
    maxHeight: '60%', width: '100%', maxWidth: 620, alignSelf: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: stroke.surface,
    borderBottomWidth: 0,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    overflow: 'hidden',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: spacing.sm },
  titleWrap: { flex: 1 },
  caption: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  verdictDot: { width: 24, height: 24, borderRadius: radius.pill, borderWidth: stroke.surface, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.heading },
  answer: { ...typography.bodyStrong, color: colors.textPrimary, marginTop: spacing.sm },
  explanation: { ...typography.body, color: colors.textPrimary, marginTop: spacing.sm, lineHeight: 23 },
  retry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: stroke.control,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
  },
  retryPressed: { transform: [{ translateY: 2 }], opacity: 0.92 },
  retryText: { ...typography.label, fontSize: 13, color: colors.dangerDark },
});
