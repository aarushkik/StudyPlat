import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { Mascot, Wordmark } from '@/components';
import { palette, spacing, typography } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const HOLD_MS = 2400;

/**
 * Faint study motifs drifting behind the emblem. Each is drawn as a vector so
 * it inherits the brand palette and stays crisp — the app ships no emoji.
 */
type MotifKind = 'orbit' | 'flask' | 'helix' | 'curve' | 'compass' | 'book' | 'prism' | 'quill';

type Pct = `${number}%`;

const MOTIFS: { kind: MotifKind; top: Pct; left: Pct; size: number; dir: 1 | -1 }[] = [
  { kind: 'orbit', top: '11%', left: '12%', size: 44, dir: 1 },
  { kind: 'curve', top: '17%', left: '76%', size: 50, dir: -1 },
  { kind: 'helix', top: '32%', left: '6%', size: 40, dir: -1 },
  { kind: 'flask', top: '27%', left: '83%', size: 42, dir: 1 },
  { kind: 'compass', top: '68%', left: '9%', size: 44, dir: 1 },
  { kind: 'prism', top: '73%', left: '79%', size: 46, dir: -1 },
  { kind: 'quill', top: '85%', left: '24%', size: 38, dir: 1 },
  { kind: 'book', top: '60%', left: '71%', size: 40, dir: -1 },
];

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

      {MOTIFS.map((m) => (
        <Animated.View
          key={m.kind}
          style={[
            styles.motif,
            {
              top: m.top,
              left: m.left,
              opacity: float.interpolate({ inputRange: [0, 1], outputRange: m.dir > 0 ? [0.18, 0.34] : [0.34, 0.18] }),
              transform: [
                { translateY: float.interpolate({ inputRange: [0, 1], outputRange: [-7 * m.dir, 7 * m.dir] }) },
              ],
            },
          ]}
        >
          <Motif kind={m.kind} size={m.size} />
        </Animated.View>
      ))}

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

/** One drifting study motif, stroked in white on the rose backdrop. */
function Motif({ kind, size }: { kind: MotifKind; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G stroke="#FFFFFF" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'orbit' ? (
          <G>
            <Circle cx={16} cy={16} r={4} fill="#FFFFFF" stroke="none" />
            <Path d="M16 4 A12 6 -28 1 1 16 28 A12 6 -28 1 1 16 4 Z" />
            <Path d="M16 4 A12 6 28 1 1 16 28 A12 6 28 1 1 16 4 Z" />
          </G>
        ) : null}
        {kind === 'curve' ? (
          <G>
            <Path d="M5 27 V5 M5 27 H28" />
            <Path d="M6 24 C13 24 12 9 27 8" />
          </G>
        ) : null}
        {kind === 'helix' ? (
          <G>
            <Path d="M10 3 C24 9 10 23 24 29" />
            <Path d="M24 3 C10 9 24 23 10 29" />
            <Path d="M13 9 H21 M11 16 H21 M13 23 H21" />
          </G>
        ) : null}
        {kind === 'flask' ? (
          <G>
            <Path d="M13 4 H19 V13 L26 26 A2 2 0 0 1 24 29 H8 A2 2 0 0 1 6 26 L13 13 Z" />
            <Path d="M11 4 H21" />
            <Path d="M9.5 20 H22.5" />
          </G>
        ) : null}
        {kind === 'compass' ? (
          <G>
            <Circle cx={16} cy={16} r={12} />
            <Path d="M21 11 L18 18 L11 21 L14 14 Z" />
          </G>
        ) : null}
        {kind === 'prism' ? (
          <G>
            <Path d="M16 5 L28 26 H4 Z" />
            <Path d="M2 17 H10 M22 15 L30 11 M22 19 L30 21" />
          </G>
        ) : null}
        {kind === 'quill' ? (
          <G>
            <Path d="M28 4 C17 5 10 11 8 20 C7.5 23 8 25 9 26 C13 21 18 17 24 15" />
            <Path d="M9 26 L4 30" />
          </G>
        ) : null}
        {kind === 'book' ? (
          <G>
            <Path d="M16 9 C13 6.5 8 6 4 7 V25 C8 24 13 24.5 16 27 C19 24.5 24 24 28 25 V7 C24 6 19 6.5 16 9 Z" />
            <Path d="M16 9 V27" />
          </G>
        ) : null}
      </G>
    </Svg>
  );
}

const EMBLEM = 226;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.rose500 },
  motif: { position: 'absolute' },
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
