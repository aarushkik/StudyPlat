import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Glyph } from '@/components/icons';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { colors, fonts } from '@/theme';
import { getStreakMilestoneLabel } from '@/utils/streaks';

interface StreakMilestoneOverlayProps {
  visible: boolean;
  streakCount: number;
  onAnimationComplete: () => void;
  variant?: 'water' | 'spark' | 'study';
}

/** A compact celebration triggered by an answer streak; never covers the quiz. */
export function StreakMilestoneOverlay({ visible, streakCount, onAnimationComplete }: StreakMilestoneOverlayProps) {
  const { motionEnabled } = useMotionPreference();
  const opacity = useRef(new Animated.Value(0)).current;
  const complete = useRef(onAnimationComplete);
  complete.current = onAnimationComplete;
  useEffect(() => {
    if (!visible) return;
    opacity.setValue(motionEnabled ? 0 : 1);
    const animation = Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: motionEnabled ? 160 : 0, useNativeDriver: true }),
      Animated.delay(900),
      Animated.timing(opacity, { toValue: 0, duration: motionEnabled ? 180 : 0, useNativeDriver: true }),
    ]);
    animation.start(({ finished }) => { if (finished) complete.current(); });
    return () => animation.stop();
  }, [visible, streakCount, motionEnabled, opacity]);
  if (!visible) return null;
  return (
    <Animated.View pointerEvents="none" accessibilityLiveRegion="polite" style={[styles.badge, { opacity }]}>
      <Glyph name="sparkle" size={18} color={colors.primary} />
      <Text style={styles.label}>{getStreakMilestoneLabel(streakCount)}</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  badge: { position: 'absolute', top: 62, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 9, paddingHorizontal: 16, borderWidth: 2, borderBottomWidth: 4, borderColor: colors.textPrimary, backgroundColor: colors.surface, borderRadius: 24 },
  label: { fontFamily: fonts.displayBold, fontSize: 16, color: colors.textPrimary },
});
