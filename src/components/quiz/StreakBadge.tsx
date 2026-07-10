import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';
import { getStreakMilestoneLabel } from '@/utils/streaks';

interface StreakBadgeProps {
  streakCount: number;
  visible: boolean;
}

/**
 * Small "N IN A ROW" combo label shown near the left of the progress bar.
 * Fades/slides in when the streak becomes active and pops on each increment.
 * The parent reserves vertical space so the bar never jumps.
 */
export function StreakBadge({ streakCount, visible }: StreakBadgeProps) {
  const enter = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const pop = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(enter, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, enter]);

  useEffect(() => {
    if (!visible) return;
    pop.setValue(1);
    Animated.sequence([
      Animated.spring(pop, { toValue: 1.18, useNativeDriver: true, speed: 60, bounciness: 14 }),
      Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 12 }),
    ]).start();
  }, [streakCount, visible, pop]);

  const translateY = enter.interpolate({ inputRange: [0, 1], outputRange: [6, 0] });

  return (
    <Animated.Text
      accessibilityRole="text"
      style={[styles.label, { opacity: enter, transform: [{ translateY }, { scale: pop }] }]}
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
