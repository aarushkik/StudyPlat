import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';

interface VerticalProgressBarProps {
  /** 0–1 fill amount. Fills from the top downward; animates on change. */
  progress: number;
  color?: string;
  trackColor?: string;
  width?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A slim vertical progress bar. Sits on the left edge of the lesson/quiz screen
 * and fills top→bottom as the student advances. Rounded ends, rose fill, soft
 * gray track.
 */
export function VerticalProgressBar({
  progress,
  color = colors.primary,
  trackColor = colors.disabledBg,
  width = 8,
  style,
}: VerticalProgressBarProps) {
  const target = Math.min(1, Math.max(0, progress));
  const anim = useRef(new Animated.Value(target)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: target, duration: 480, useNativeDriver: false }).start();
  }, [target, anim]);

  const height = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={[styles.track, { width, borderRadius: width / 2, backgroundColor: trackColor }, style]}>
      <Animated.View style={[styles.fill, { width, borderRadius: width / 2, backgroundColor: color, height }]}>
        <View style={[styles.sheen, { borderRadius: width / 2 }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden', justifyContent: 'flex-start' },
  fill: { minHeight: 8 },
  // Soft highlight running down the fill for a premium, glossy feel.
  sheen: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 2,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.pill,
  },
});
