import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';
import { colors, fonts } from '@/theme';
import { getStreakMilestoneLabel } from '@/utils/streaks';

interface StreakMilestoneOverlayProps {
  visible: boolean;
  streakCount: number;
  onAnimationComplete: () => void;
  /** Only "water" is implemented for now. */
  variant?: 'water' | 'spark' | 'study';
}

/**
 * StudyPlat's original full-screen "knowledge splash" streak celebration.
 *
 * A turquoise water splash bursts from the center and floods the whole screen
 * with a squash-and-stretch pop, throws a spray of foam droplets, floats a few
 * bubbles, lands the milestone label, then recedes with a gentle fade. Fast,
 * satisfying, non-blocking (taps pass through), and respects reduce-motion.
 */
export function StreakMilestoneOverlay({ visible, streakCount, onAnimationComplete }: StreakMilestoneOverlayProps) {
  const { width, height } = useWindowDimensions();
  const base = Math.max(width, 1);
  const cover = (Math.hypot(width, height) / base) * 1.2;
  const spray = Math.hypot(width, height) / 2;

  const grow = useRef(new Animated.Value(0)).current;
  const drop = useRef(new Animated.Value(0)).current;
  const textV = useRef(new Animated.Value(0)).current;
  const master = useRef(new Animated.Value(1)).current;

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced);
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => sub?.remove?.();
  }, []);

  // Foam droplets thrown out over the water — biased outward in all directions.
  const droplets = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => {
        const ang = (i / 20) * Math.PI * 2 + (i % 2 ? 0.3 : 0);
        const dist = spray * (0.5 + ((i * 37) % 50) / 100);
        return {
          dx: Math.cos(ang) * dist,
          dy: Math.sin(ang) * dist,
          size: 7 + (i % 4) * 4,
          color: [colors.white, colors.splashSoft, colors.splashMid][i % 3],
          delay: (i % 5) * 0.06,
        };
      }),
    [spray],
  );

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    grow.setValue(0);
    drop.setValue(0);
    textV.setValue(0);
    master.setValue(1);
    const done = () => {
      if (!cancelled) onAnimationComplete();
    };

    if (reduced) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(grow, { toValue: 1, duration: 220, useNativeDriver: true }),
          Animated.timing(textV, { toValue: 1, duration: 220, useNativeDriver: true }),
        ]),
        Animated.delay(800),
        Animated.timing(master, { toValue: 0, duration: 260, useNativeDriver: true }),
      ]).start(done);
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(grow, { toValue: 1, duration: 420, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
          Animated.timing(drop, { toValue: 1, duration: 780, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.sequence([
            Animated.delay(240),
            Animated.spring(textV, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 12 }),
          ]),
        ]),
        Animated.delay(560),
        Animated.timing(master, { toValue: 0, duration: 380, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ]).start(done);
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduced]);

  if (!visible) return null;

  const fillScale = grow.interpolate({ inputRange: [0, 1], outputRange: [0, cover] });
  const fillSquashY = grow.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.55, 1.12, 1] });
  const innerScale = grow.interpolate({ inputRange: [0, 1], outputRange: [0, cover * 0.72] });
  const foamOpacity = grow.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 0, 0.6] });
  const recedeScale = master.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] });
  const textTranslate = textV.interpolate({ inputRange: [0, 1], outputRange: [22, 0] });

  const circle = { width: base, height: base, borderRadius: base / 2 };

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.layer, { opacity: master }]} pointerEvents="none">
      <Animated.View style={[StyleSheet.absoluteFill, styles.layer, { transform: [{ scale: recedeScale }] }]}>
        {/* main water fill */}
        <Animated.View
          style={[circle, styles.fill, { backgroundColor: colors.splash, transform: [{ scale: fillScale }, { scaleY: fillSquashY }] }]}
        />
        {/* lighter inner highlight for depth */}
        <Animated.View
          style={[circle, styles.fill, { backgroundColor: colors.splashMid, opacity: 0.6, transform: [{ translateX: -base * 0.12 }, { translateY: -base * 0.12 }, { scale: innerScale }] }]}
        />

        {/* floating foam bubbles */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.layer, { opacity: foamOpacity }]}>
          {FOAM.map((f, i) => (
            <View
              key={i}
              style={{ position: 'absolute', width: f.s, height: f.s, borderRadius: f.s / 2, backgroundColor: 'rgba(255,255,255,0.55)', transform: [{ translateX: f.x }, { translateY: f.y }] }}
            />
          ))}
        </Animated.View>

        {/* foam droplet spray */}
        <View style={[StyleSheet.absoluteFill, styles.layer]}>
          {droplets.map((d, i) => (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                width: d.size,
                height: d.size * 1.35,
                borderRadius: d.size,
                backgroundColor: d.color,
                opacity: drop.interpolate({ inputRange: [0, 0.15, 0.85, 1], outputRange: [0, 1, 1, 0] }),
                transform: [
                  { translateX: drop.interpolate({ inputRange: [0, 1], outputRange: [0, d.dx] }) },
                  { translateY: drop.interpolate({ inputRange: [0, 1], outputRange: [0, d.dy] }) },
                  { scale: drop.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
                ],
              }}
            />
          ))}
        </View>

        {/* milestone label */}
        <Animated.Text style={[styles.label, { opacity: textV, transform: [{ translateY: textTranslate }, { scale: textV }] }]}>
          {getStreakMilestoneLabel(streakCount)}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

// Fixed foam bubble offsets around the center.
const FOAM = [
  { x: -70, y: -120, s: 16 },
  { x: 90, y: -90, s: 12 },
  { x: -110, y: 30, s: 10 },
  { x: 120, y: 60, s: 14 },
  { x: -40, y: 120, s: 11 },
  { x: 60, y: 140, s: 9 },
  { x: 30, y: -150, s: 10 },
];

const styles = StyleSheet.create({
  layer: { alignItems: 'center', justifyContent: 'center' },
  fill: { position: 'absolute' },
  label: {
    fontFamily: fonts.bold,
    fontSize: 46,
    color: colors.white,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowColor: 'rgba(23,153,172,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});
