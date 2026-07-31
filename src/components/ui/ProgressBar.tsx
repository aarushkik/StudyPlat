import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, duration, easing, radius } from '@/theme';

interface ProgressBarProps {
  /** 0–1 fill amount. Animates smoothly whenever it changes. */
  progress: number;
  color?: string;
  trackColor?: string;
  height?: number;
  style?: ViewStyle;
}

/** Slim, rounded progress bar with a glossy fill. */
export function ProgressBar({
  progress,
  color = colors.primary,
  trackColor = colors.disabledBg,
  height = 14,
  style,
}: ProgressBarProps) {
  const target = Math.min(1, Math.max(0, progress));
  const anim = useRef(new Animated.Value(target)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: target,
      duration: duration.slow,
      easing: easing.out,
      useNativeDriver: false,
    }).start();
  }, [target, anim]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(target * 100) }}
      style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height }, style]}
    >
      <Animated.View style={[styles.fill, { backgroundColor: color, width, borderRadius: height }]}>
        <View style={styles.sheen} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flex: 1, overflow: 'hidden' },
  fill: { height: '100%', justifyContent: 'flex-start', minWidth: 14 },
  // Highlight along the top of the fill, so it reads as a rounded surface.
  sheen: {
    height: 4,
    marginTop: 3,
    marginHorizontal: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
});
