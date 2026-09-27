import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, duration, easing, radius } from '@/theme';
import { useMotionPreference } from '@/hooks/useMotionPreference';

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
  color,
  trackColor,
  height = 14,
  style,
}: ProgressBarProps) {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const { reduceMotion } = useMotionPreference();
  const target = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const anim = useRef(new Animated.Value(target)).current;

  useEffect(() => {
    const animation = Animated.timing(anim, {
      toValue: target,
      duration: reduceMotion ? 0 : duration.slow,
      easing: easing.out,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [target, anim, reduceMotion]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(target * 100) }}
      style={[styles.track, { backgroundColor: trackColor ?? colors.disabledBg, height, borderRadius: height }, style]}
    >
      <Animated.View style={[styles.fill, { backgroundColor: color ?? colors.primary, width, borderRadius: height }]}>
        <View style={styles.sheen} />
      </Animated.View>
    </View>
  );
}

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  track: { flex: 1, overflow: 'hidden' },
  fill: { height: '100%', justifyContent: 'flex-start', overflow: 'hidden' },
  // Highlight along the top of the fill, so it reads as a rounded surface.
  sheen: {
    height: 4,
    marginTop: 3,
    marginHorizontal: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
});
