import React from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { useCardAnimation } from './useCardAnimation';

interface DailyGoalCardProps {
  minutes: number;
  /** Trailing descriptor, e.g. "Regular". */
  tag: string;
  selected: boolean;
  onPress: () => void;
}

/** Daily-goal option: "N min / day" with a trailing intensity tag. */
export function DailyGoalCard({ minutes, tag, selected, onPress }: DailyGoalCardProps) {
  const { scale, onPressIn, onPressOut } = useCardAnimation(selected);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, selected ? shadows.sm : shadows.none, selected && styles.selected]}
      >
        <Text style={[typography.subtitle, selected && styles.textSelected]}>{minutes} min / day</Text>
        <Text style={[typography.bodyStrong, styles.tag, selected && styles.textSelected]}>{tag}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  selected: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  tag: { color: colors.textMuted },
  textSelected: { color: colors.primaryDark },
});
