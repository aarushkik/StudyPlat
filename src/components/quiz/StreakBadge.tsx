import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';
import { getStreakMilestoneLabel } from '@/utils/streaks';

interface StreakBadgeProps {
  streakCount: number;
  visible: boolean;
}

/**
 * Small "N IN A ROW" combo label shown near the left of the progress bar.
 * Updates without moving when the answer streak changes.
 * The parent reserves vertical space so the bar never jumps.
 */
export function StreakBadge({ streakCount, visible }: StreakBadgeProps) {

  return (
    <Animated.Text
      accessibilityRole="text"
      style={[styles.label, { opacity: visible ? 1 : 0 }]}
    >
      {getStreakMilestoneLabel(streakCount)}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    color: colors.primary,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
