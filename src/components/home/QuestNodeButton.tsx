import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { Glyph, type GlyphName } from '@/components/icons';
import { colors, glow, questNode, radius, shadows, spacing, typography } from '@/theme';
import { BOSS_TIERS } from '@/data/questMap';
import type { QuestNode, QuestNodeKindId, QuestNodeState } from '@/types/quest';

/**
 * A single stop on the quest trail.
 *
 * Ordinary stops are chunky discs — a colored face riding on a darker lip that
 * it sinks onto when pressed. The unit boss is deliberately *not* a disc: it's
 * a larger shield with its own dark palette and a pulsing aura, so you can tell
 * a boss from a lesson at a glance while scrolling past.
 */

export const NODE_SIZE = 74;
export const BOSS_SIZE = 106;
const LIP = 7;

/**
 * The six boss ranks in an area, in order. Each one is bigger and hotter than
 * the last: the Sentry is a purple shield you can beat on the way past, the
 * Overlord is red, crowned, and the thing standing between you and the next
 * area. Rank is legible from the silhouette alone while scrolling.
 */
const BOSS_TIER_STYLE = [
  { size: 88, face: '#8A7FB5', deep: '#453A6E', edge: '#372C5C', ring: '#D8D0F0' },
  { size: 92, face: '#7E6FB8', deep: '#3E3070', edge: '#31245C', ring: '#D4CCF2' },
  { size: 96, face: '#8A5FB5', deep: '#3F2560', edge: '#2F1A4A', ring: '#DDC8F2' },
  { size: 100, face: '#9A4FA8', deep: '#4A1E58', edge: '#371244', ring: '#EEC6EE' },
  { size: 103, face: '#B0417E', deep: '#561640', edge: '#400E2E', ring: '#F8C2DE' },
  { size: 106, face: '#C4402E', deep: '#5E1610', edge: '#450C08', ring: '#FFC8B4' },
] as const;

const tierStyle = (tier?: number) => BOSS_TIER_STYLE[Math.min(5, Math.max(0, (tier ?? 1) - 1))];

/** Diameter a stop occupies, so the trail can place it before rendering. */
export function nodeSizeFor(node: Pick<QuestNode, 'kind' | 'tier'>): number {
  return node.kind === 'boss' ? tierStyle(node.tier).size : NODE_SIZE;
}

const KIND_GLYPH: Record<QuestNodeKindId, GlyphName> = {
  lesson: 'book',
  practice: 'bolt',
  reading: 'page',
  treasure: 'chest',
  boss: 'swords',
};

interface QuestNodeButtonProps {
  node: QuestNode;
  state: QuestNodeState;
  onPress: () => void;
}

export function QuestNodeButton({ node, state, onPress }: QuestNodeButtonProps) {
  const isBoss = node.kind === 'boss';
  const tier = tierStyle(node.tier);
  const size = nodeSizeFor(node);
  const locked = state === 'locked';
  const scheme = locked
    ? questNode.locked
    : isBoss
      ? { face: tier.face, edge: tier.edge, ring: tier.ring }
      : questNode[node.kind];

  const press = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state !== 'current') return;
    const loop = Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 1900, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [state, pulse]);

  const to = (v: number) =>
    Animated.spring(press, { toValue: v, useNativeDriver: true, speed: 50, bounciness: 0 }).start();

  const faceTransform = useMemo(
    () => [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [0, LIP - 1] }) }],
    [press],
  );

  const glyph: GlyphName = locked ? 'lock' : state === 'complete' ? (isBoss ? 'crown' : 'check') : KIND_GLYPH[node.kind];
  const glyphColor = locked ? '#9C8E9A' : colors.white;

  return (
    <View style={styles.slot} pointerEvents="box-none">
      {state === 'current' ? <PulseRing pulse={pulse} size={size} color={scheme.ring} /> : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${node.title}, ${STATE_LABEL[state]}`}
        accessibilityState={{ disabled: locked }}
        disabled={locked}
        onPressIn={() => to(1)}
        onPressOut={() => to(0)}
        onPress={onPress}
        style={{ width: size, height: size + LIP }}
      >
        {/* The disc's lip is a plain circle; the shield carries its own. */}
        {isBoss ? null : <View style={[styles.lip, { backgroundColor: scheme.edge, borderRadius: size }]} />}
        <Animated.View
          style={[
            { width: size, height: isBoss ? size + LIP : size, transform: faceTransform },
            state === 'current' ? glow(scheme.edge, 'strong') : shadows.xs,
          ]}
        >
          {isBoss ? (
            <BossFace size={size} locked={locked} glyph={glyph} tier={tier} />
          ) : (
            <View style={[styles.disc, { width: size, height: size, borderRadius: size, backgroundColor: scheme.face }]}>
              <View style={[styles.discSheen, { borderRadius: size }]} />
              <Glyph name={glyph} size={30} color={glyphColor} strokeWidth={2.6} />
            </View>
          )}
        </Animated.View>
      </Pressable>

      {state === 'complete' && !isBoss ? <View style={[styles.clearedRing, { width: size + 14, height: size + 14, borderRadius: size }]} pointerEvents="none" /> : null}
      {state === 'current' ? <StartFlag /> : null}
      {isBoss ? (
        <BossRibbon
          locked={locked}
          cleared={state === 'complete'}
          label={BOSS_TIERS[Math.min(5, Math.max(0, (node.tier ?? 1) - 1))]}
          tone={tier.deep}
        />
      ) : null}
    </View>
  );
}

const STATE_LABEL: Record<QuestNodeState, string> = {
  locked: 'locked',
  current: 'ready to start',
  complete: 'completed',
};

/** Expanding halo that marks the one stop the student should tap next. */
function PulseRing({ pulse, size, color }: { pulse: Animated.Value; size: number; color: string }) {
  const style = {
    opacity: pulse.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0.7, 0] }),
    transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.55] }) }],
  };
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.pulse,
        { width: size, height: size, borderRadius: size, backgroundColor: color, marginLeft: -size / 2 },
        style,
      ]}
    />
  );
}

/**
 * The boss shield — a different silhouette entirely, not a recolored disc. The
 * lip is a second copy of the shield sitting a few units lower, so the depth
 * follows the shape instead of poking out from behind it as a rectangle.
 */
const SHIELD = 'M50 4 L92 18 V50 C92 74 74 90 50 97 C26 90 8 74 8 50 V18 Z';

function BossFace({
  size,
  locked,
  glyph,
  tier,
}: {
  size: number;
  locked: boolean;
  glyph: GlyphName;
  tier: (typeof BOSS_TIER_STYLE)[number];
}) {
  const id = `boss-${locked ? 'locked' : tier.face.slice(1)}`;
  const height = size + LIP;
  // Extend the viewBox by the lip so the lower copy is not clipped.
  const viewH = 100 + (LIP / size) * 100;

  return (
    <View style={{ width: size, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={height} viewBox={`0 0 100 ${viewH}`} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id={id} x1="0.2" y1="0" x2="0.8" y2="1">
            <Stop offset="0" stopColor={locked ? '#D6CBD4' : tier.face} />
            <Stop offset="1" stopColor={locked ? '#B9AAB7' : tier.deep} />
          </LinearGradient>
        </Defs>
        <Path d={SHIELD} fill={locked ? '#A293A0' : tier.edge} transform={`translate(0 ${viewH - 100})`} />
        <Path
          d={SHIELD}
          fill={`url(#${id})`}
          stroke={locked ? '#A293A0' : tier.edge}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <Path d="M50 10 L86 22 V38 C70 26 58 18 50 14 Z" fill="#FFFFFF" opacity={0.14} />
      </Svg>
      <View style={{ marginBottom: LIP }}>
        <Glyph name={glyph} size={36} color={locked ? '#9C8E9A' : colors.gold} strokeWidth={2.4} />
      </View>
    </View>
  );
}

/** Small banner naming the boss's rank so its stakes read while scrolling. */
function BossRibbon({
  locked,
  cleared,
  label,
  tone,
}: {
  locked: boolean;
  cleared: boolean;
  label: string;
  tone: string;
}) {
  const background = locked ? '#BDAFBB' : cleared ? colors.goldDark : tone;
  return (
    <View style={[styles.ribbon, { backgroundColor: background }]}>
      <Text style={[styles.ribbonText, locked && styles.ribbonTextLocked]} numberOfLines={1}>
        {cleared ? 'Cleared' : label}
      </Text>
    </View>
  );
}

/** Floating "Start" flag over the live node. */
function StartFlag() {
  const bob = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bob]);

  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [0, -5] });

  return (
    <Animated.View pointerEvents="none" style={[styles.flag, shadows.sm, { transform: [{ translateY }] }]}>
      <Text style={styles.flagText}>Start</Text>
      <View style={styles.flagPoint} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slot: { alignItems: 'center' },
  lip: { position: 'absolute', left: 0, right: 0, top: LIP, bottom: 0 },
  disc: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  discSheen: {
    position: 'absolute',
    top: 5,
    left: 9,
    right: 9,
    height: '38%',
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  pulse: { position: 'absolute', top: 0, left: '50%' },
  clearedRing: { position: 'absolute', top: -7, borderWidth: 3, borderColor: colors.gold, opacity: 0.75 },

  flag: {
    position: 'absolute',
    top: -40,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  flagText: { ...typography.overline, color: colors.primary },
  flagPoint: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -5,
    width: 10,
    height: 10,
    backgroundColor: colors.surface,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },

  ribbon: {
    position: 'absolute',
    bottom: -9,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  ribbonText: { ...typography.overline, color: colors.gold, fontSize: 10 },
  ribbonTextLocked: { color: '#F3EDF2' },
});
