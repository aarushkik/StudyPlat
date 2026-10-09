import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { AppButton } from '@/components/ui';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Glyph } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import { radius, spacing } from '@/theme';

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
 *
 * A floating card of tinted glass — green for right, red for wrong — that
 * rises on a soft spring, inset from the edges like the stop sheet on the map.
 */
export function QuizFeedbackPanel({ correct, explanation, answer, continueLabel, onContinue, retry }: QuizFeedbackPanelProps) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const insets = useSafeAreaInsets();
  const { reduceMotion } = useMotionPreference();
  const slide = useRef(new Animated.Value(reduceMotion ? 0 : 28)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion) { slide.setValue(0); fade.setValue(1); return; }
    // A short rise, not the full height: the panel replaces the Check button
    // in place, so it only needs to arrive, not travel.
    const animation = Animated.parallel([
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, damping: 18, stiffness: 240, mass: 0.9 }),
      Animated.timing(fade, { toValue: 1, duration: 160, useNativeDriver: true }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [slide, fade, reduceMotion]);

  const accent = correct ? colors.successDark : colors.dangerDark;

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          paddingBottom: Math.max(insets.bottom, 10),
          opacity: fade,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      <GlassSurface variant="thick" tint={correct ? colors.successSoft : colors.dangerSoft} style={styles.panel}>
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
      </GlassSurface>
    </Animated.View>
  );
}

const createStyles = ({ colors, palette, typography, stroke, card }: AppTheme) => StyleSheet.create({
  wrap: { maxHeight: '60%', width: '100%', maxWidth: 620, alignSelf: 'center', paddingHorizontal: 10 },
  panel: {
    flexShrink: 1,
    borderRadius: 36,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
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
    ...card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },
  retryPressed: { transform: [{ translateY: 2 }], opacity: 0.92 },
  retryText: { ...typography.label, fontSize: 13, color: colors.dangerDark },
});
