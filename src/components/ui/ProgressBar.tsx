import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';

interface ProgressBarProps {
  /** 0–1 fill amount. Animates smoothly whenever it changes. */
  progress: number;
  color?: string;
  trackColor?: string;
  height?: number;
  style?: ViewStyle;
}

/** Slim, rounded progress bar for the onboarding step indicator. */
export function ProgressBar({
  progress,
  color = colors.primary,
  trackColor = colors.border,
  height = 14,
  style,
}: ProgressBarProps) {
  const target = Math.min(1, Math.max(0, progress));
  const anim = useRef(new Animated.Value(target)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: target, duration: 450, useNativeDriver: false }).start();
  }, [target, anim]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height }, style]}>
      <Animated.View style={[styles.fill, { backgroundColor: color, width, borderRadius: height }]}>
        {/* subtle top highlight for a glossy, premium feel */}
        <View style={styles.sheen} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%', justifyContent: 'flex-start', minWidth: 14 },
  sheen: {
    height: 4,
    marginTop: 3,
    marginHorizontal: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
});
