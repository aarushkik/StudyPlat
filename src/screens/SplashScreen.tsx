import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mascot, Wordmark } from '@/components';
import { palette, spacing, typography } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const HOLD_MS = 2400;

// Faint, colorful academic motifs that give the splash an "AP study" identity.
const GLYPHS = [
  { char: 'π', top: '12%', left: '13%', size: 34, dir: 1, color: '#FFFFFF' },
  { char: '∫', top: '18%', left: '80%', size: 40, dir: -1, color: '#FFE0B3' },
  { char: '🧬', top: '33%', left: '7%', size: 28, dir: -1, color: '#FFFFFF' },
  { char: '⚛', top: '28%', left: '86%', size: 30, dir: 1, color: '#FFD9E8' },
  { char: '📐', top: '69%', left: '11%', size: 32, dir: 1, color: '#FFFFFF' },
  { char: 'Σ', top: '74%', left: '82%', size: 38, dir: -1, color: '#FFE0B3' },
  { char: '%', top: '85%', left: '26%', size: 26, dir: 1, color: '#FFD9E8' },
  { char: '✎', top: '61%', left: '73%', size: 30, dir: -1, color: '#FFFFFF' },
] as const;

/**
 * Brand splash. A warm rose backdrop scattered with twinkling study motifs, a
 * platypus emblem that springs in over pulsing halo rings, the stuAP wordmark,
 * a quest tagline, and a bouncing-dot loader — then it hands off to Welcome.
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
  const dots = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

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
      Animated.loop(Animated.timing(v, { toValue: 1, duration: 2000, easing: Easing.out(Easing.quad), useNativeDriver: true }));
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
      <LinearGradient colors={[palette.rose400, palette.rose600]} style={StyleSheet.absoluteFill} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} />

      {/* Twinkling study motifs */}
      {GLYPHS.map((g) => {
        const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [-6 * g.dir, 6 * g.dir] });
        const opacity = float.interpolate({ inputRange: [0, 1], outputRange: g.dir > 0 ? [0.12, 0.26] : [0.26, 0.12] });
        return (
          <Animated.Text key={g.char} style={[styles.glyph, { top: g.top, left: g.left, fontSize: g.size, color: g.color, opacity, transform: [{ translateY }] }]}>
            {g.char}
          </Animated.Text>
        );
      })}

      {/* Emblem with pulsing halo */}
      <View style={styles.center}>
        <Animated.View style={{ opacity: emblemOpacity, transform: [{ scale: emblemScale }] }}>
          <View style={styles.emblemWrap}>
            <Animated.View style={[styles.pulse, pulseStyle(pulse1)]} />
            <Animated.View style={[styles.pulse, pulseStyle(pulse2)]} />
            <View style={styles.ring}>
              <View style={styles.emblem}>
                <Mascot size={150} expression="excited" animated />
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.wordWrap, { opacity: wordOpacity, transform: [{ translateY: wordShift }] }]}>
          <Wordmark size={40} variant="light" />
          <Text style={styles.tagline}>Your AP quest starts here.</Text>
        </Animated.View>
      </View>

      {/* Bouncing-dot loader */}
      <View style={styles.loader}>
        {dots.map((d, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { transform: [{ translateY: d.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] }]}
          />
        ))}
      </View>
    </View>
  );
}

const EMBLEM = 226;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.rose500 },
  glyph: { position: 'absolute', fontWeight: '800' },
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
