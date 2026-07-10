import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Mascot } from '@/components/Mascot';
import type { MascotExpression } from '@/components/Mascot';
import { colors, spacing } from '@/theme';
import { STREAK_VISIBLE_THRESHOLD } from '@/utils/streaks';
import { StreakBadge } from './StreakBadge';

interface QuizProgressHeaderProps {
  /** Current correct-answer streak; badge shows at 2+. */
  currentCorrectStreak: number;
  onClose: () => void;
  /** Stu reacts here as answers are checked. */
  mascotExpression: MascotExpression;
}

/**
 * Quiz top row: close button, the streak badge, and a small reacting Stu.
 * The lesson progress bar lives separately as a vertical bar on the left edge
 * (see `VerticalProgressBar`).
 */
export function QuizProgressHeader({ currentCorrectStreak, onClose, mascotExpression }: QuizProgressHeaderProps) {
  const showStreak = currentCorrectStreak >= STREAK_VISIBLE_THRESHOLD;

  return (
    <View style={styles.row}>
      <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close quiz">
        <Ionicons name="close" size={28} color={colors.textMuted} />
      </Pressable>

      <View style={styles.badgeSlot}>
        <StreakBadge streakCount={currentCorrectStreak} visible={showStreak} />
      </View>

      <Mascot size={46} expression={mascotExpression} accessory="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  // Grows to fill the middle; badge is left-aligned near the bar.
  badgeSlot: { flex: 1, paddingLeft: spacing.md, justifyContent: 'center' },
});
