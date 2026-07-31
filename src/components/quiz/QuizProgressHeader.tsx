import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from '@/components/ui';
import { Glyph } from '@/components/icons';
import { colors, radius, spacing, typography } from '@/theme';
import { STREAK_VISIBLE_THRESHOLD } from '@/utils/streaks';
import { StreakBadge } from './StreakBadge';

interface QuizProgressHeaderProps {
  /** 0–1 through the question set. */
  progress: number;
  /** e.g. "3 / 8". */
  counter: string;
  /** Current correct-answer streak; the badge appears at 2+. */
  currentCorrectStreak: number;
  onClose: () => void;
}

/**
 * The quiz's top row: leave, how far along you are, and the running combo.
 * Everything the student needs mid-question and nothing else — the mascot lives
 * in the feedback panel, where it has something to react to.
 */
export function QuizProgressHeader({ progress, counter, currentCorrectStreak, onClose }: QuizProgressHeaderProps) {
  return (
    <View>
      <View style={styles.row}>
        <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Leave quiz">
          <Glyph name="close" size={24} color={colors.textMuted} strokeWidth={2.6} />
        </Pressable>

        <ProgressBar progress={progress} height={14} style={styles.bar} />

        <View style={styles.counter}>
          <Text style={styles.counterText}>{counter}</Text>
        </View>
      </View>

      <View style={styles.badgeSlot}>
        <StreakBadge streakCount={currentCorrectStreak} visible={currentCorrectStreak >= STREAK_VISIBLE_THRESHOLD} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  bar: { flex: 1 },
  counter: {
    backgroundColor: colors.surfaceSunken,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  counterText: { ...typography.label, color: colors.textSecondary },
  // Fixed height so the bar never shifts when the combo badge appears.
  badgeSlot: { height: 18, justifyContent: 'center', paddingLeft: spacing.xxxl },
});
