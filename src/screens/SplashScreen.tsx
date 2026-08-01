import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { Mascot, Wordmark } from '@/components';
import { palette, spacing, typography } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const HOLD_MS = 2400;

/**
 * The backdrop is a contour map.
 *
 * stuAP is a trail through ten areas, so the splash says that before a word is
 * read: soft topographic rings radiating out from Stu, like the map you are
 * about to walk. It replaced a scatter of outlined study icons — beakers,
 * books, compasses — which read as stock clip-art and, worse, all drifted off
 * one shared value so the whole field breathed in lockstep.
 *
 * Ring count is deliberately low and the wobble is deterministic, so the same
 * landscape is drawn every launch.
 */
const RINGS = 7;

/** One closed, slightly irregular contour — polar samples with two harmonics. */
function contourPath(radius: number, wobble: number, phase: number, steps = 72): string {
  let d = '';
  for (let i = 0; i <= steps; i += 1) {
    const a = (i / steps) * Math.PI * 2;
    const r = radius * (1 + wobble * Math.sin(a * 3 + phase) + wobble * 0.55 * Math.sin(a * 5 - phase * 1.6));
    const x = Math.cos(a) * r;
    // Squashed slightly, so the rings read as ground seen at an angle.
    const y = Math.sin(a) * r * 0.78;
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d}Z`;
}

/**
 * Brand splash. A warm rose backdrop scattered with drifting study motifs, Stu
 * springing in over pulsing halo rings, the wordmark, a quest tagline, and a
 * bouncing-dot loader — then it hands off to Welcome.
 */
export function SplashScreen() {
  const navigation = useNavigation<Nav>();

  const emblemScale = useRef(new Animated.Value(0.7)).current;
  const emblemOpacity = useRef(new Animated.Value(0)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const wordShift = useRef(new Animated.Value(16)).current;
  const float = useRef(new Animated.Value(0)).current;
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.spring(emblemScale, { toValue: 1, useNativeDriver: true, speed: 7, bounciness: 10 }),
      Animated.timing(emblemOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(360),
        Animated.parallel([
          Animated.timing(wordOpacity, { toValue: 1, duration: 520, useNativeDriver: true }),
          Animated.spring(wordShift, { toValue: 0, useNativeDriver: true, speed: 10, bounciness: 6 }),
        ]),
      ]),
    ]).start();

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    floatLoop.start();

    const ring = (v: Animated.Value) =>
      Animated.loop(
        Animated.timing(v, { toValue: 1, duration: 2000, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      );
    const r1 = ring(pulse1);
    r1.start();
    const r2 = ring(pulse2);
    const r2timer = setTimeout(() => r2.start(), 1000);

    const bounce = (v: Animated.Value) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: 320, easing: Easing.in(Easing.quad), useNativeDriver: true }),
          Animated.delay(520),
        ]),
      );
    const dotLoops = dots.map((d) => bounce(d));
    const dotTimers = dotLoops.map((loop, i) => setTimeout(() => loop.start(), i * 150));

    const navTimer = setTimeout(() => navigation.replace('Welcome'), HOLD_MS);

    return () => {
      floatLoop.stop();
      r1.stop();
      r2.stop();
      dotLoops.forEach((l) => l.stop());
      clearTimeout(r2timer);
      dotTimers.forEach(clearTimeout);
      clearTimeout(navTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const pulseStyle = (v: Animated.Value) => ({
    opacity: v.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 0.32, 0] }),
    transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.55] }) }],
  });

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[palette.rose400, palette.rose600]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      <ContourField float={float} />

      <View style={styles.center}>
        <Animated.View style={{ opacity: emblemOpacity, transform: [{ scale: emblemScale }] }}>
          <View style={styles.emblemWrap}>
            <Animated.View style={[styles.pulse, pulseStyle(pulse1)]} />
            <Animated.View style={[styles.pulse, pulseStyle(pulse2)]} />
            <View style={styles.ring}>
              <View style={styles.emblem}>
                <Mascot size={158} expression="excited" shadow={false} />
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.wordWrap, { opacity: wordOpacity, transform: [{ translateY: wordShift }] }]}>
          <Wordmark size={40} variant="light" />
          <Text style={styles.tagline}>Your AP quest starts here.</Text>
        </Animated.View>
      </View>

      <View style={styles.loader}>
        {dots.map((d, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { transform: [{ translateY: d.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * The contour backdrop. Every ring is driven by the one `float` value but with
 * its own amplitude and direction, so the field breathes unevenly the way real
 * terrain would rather than pulsing as a single unit.
 */
function ContourField({ float }: { float: Animated.Value }) {
  const rings = [];
  for (let i = 0; i < RINGS; i += 1) {
    const radius = 74 + i * 52;
    const outward = i / (RINGS - 1);
    const dir = i % 2 === 0 ? 1 : -1;
    rings.push(
      <Animated.View
        key={i}
        style={[
          styles.ringLayer,
          {
            opacity: 0.3 - outward * 0.19,
            transform: [
              {
                scale: float.interpolate({
                  inputRange: [0, 1],
                  outputRange: dir > 0 ? [1, 1.035 + outward * 0.02] : [1.035 + outward * 0.02, 1],
                }),
              },
              {
                rotate: float.interpolate({
                  inputRange: [0, 1],
                  outputRange: dir > 0 ? ['0deg', '3deg'] : ['3deg', '0deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Svg width={radius * 2.4} height={radius * 2.4} viewBox={`${-radius * 1.2} ${-radius * 1.2} ${radius * 2.4} ${radius * 2.4}`}>
          <Path
            d={contourPath(radius, 0.045 + i * 0.006, i * 1.9)}
            stroke="#FFFFFF"
            strokeWidth={2}
            fill="none"
          />
        </Svg>
      </Animated.View>,
    );
  }

  return (
    <View pointerEvents="none" style={styles.contours}>
      {rings}
    </View>
  );
}

const EMBLEM = 226;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.rose500 },
  // Centred on the emblem so the contours radiate out from Stu.
  contours: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  ringLayer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emblemWrap: { width: EMBLEM, height: EMBLEM, alignItems: 'center', justifyContent: 'center' },
  pulse: {
    position: 'absolute',
    width: EMBLEM,
    height: EMBLEM,
    borderRadius: EMBLEM / 2,
    backgroundColor: palette.white,
  },
  ring: {
    width: EMBLEM,
    height: EMBLEM,
    borderRadius: EMBLEM / 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblem: {
    width: 186,
    height: 186,
    borderRadius: 93,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  wordWrap: { alignItems: 'center', marginTop: spacing.xxl },
  tagline: { ...typography.tagline, color: palette.rose100, marginTop: spacing.sm },
  loader: {
    position: 'absolute',
    bottom: spacing.giant,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.9)' },
});
