import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, View } from 'react-native';
import { biomes, type AmbienceKind, type BiomeId } from '@/theme/biomes';

/**
 * What moves through the air in one area.
 *
 * Petals over the meadow, leaves in the deepwood, fireflies in the marsh,
 * bubbles in the shallows, blown sand in the dunes, snow on the glacier,
 * embers over the wastes, rain in the reach. It's the difference between a
 * painted backdrop and a place.
 *
 * Deliberately cheap: every mote is a plain `View` — no SVG — animated by a
 * single looping value on the native driver, so the whole layer costs nothing
 * on the JS thread while you scroll. Counts are bounded per area and only the
 * two or three areas near the viewport are ever mounted, so the map never has
 * more than ~45 of these alive at once.
 *
 * Each mote travels a short local distance and loops, rather than falling the
 * full height of the area — over a 2300px segment a true top-to-bottom fall
 * would either crawl or blur past.
 */

interface AreaAmbienceProps {
  width: number;
  height: number;
  biome: BiomeId;
  /** Keeps mote placement stable but different between areas. */
  seed: number;
}

/** Deterministic 0–1 noise, matching `Scenery` so layers agree. */
function noise(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function AreaAmbience({ width, height, biome, seed }: AreaAmbienceProps) {
  const { kind, color, count } = biomes[biome].ambience;
  const [stillness, setStillness] = useState(false);

  // Respect the OS "reduce motion" setting: the motes still appear, they just
  // stop drifting.
  useEffect(() => {
    let alive = true;
    AccessibilityInfo.isReduceMotionEnabled().then((on) => {
      if (alive) setStillness(on);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (on) => setStillness(on));
    return () => {
      alive = false;
      sub.remove();
    };
  }, []);

  const motes = [];
  for (let i = 0; i < count; i += 1) {
    const n = seed * 53 + i * 11;
    motes.push(
      <Mote
        key={i}
        kind={kind}
        color={color}
        x={noise(n) * width}
        y={noise(n + 1) * height}
        variance={noise(n + 2)}
        index={i}
        still={stillness}
      />,
    );
  }

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {motes}
    </View>
  );
}

/** How each kind behaves: how far it travels, how fast, and which way. */
const BEHAVIOUR: Record<AmbienceKind, { travel: number; ms: [number, number]; drift: number; spin: boolean }> = {
  petal: { travel: 210, ms: [5200, 8200], drift: 34, spin: true },
  leaf: { travel: 230, ms: [4800, 7600], drift: 42, spin: true },
  snow: { travel: 240, ms: [6400, 10000], drift: 26, spin: false },
  rain: { travel: 300, ms: [900, 1500], drift: 8, spin: false },
  sand: { travel: 180, ms: [3200, 5200], drift: 70, spin: false },
  ember: { travel: -200, ms: [3600, 6000], drift: 30, spin: false },
  bubble: { travel: -190, ms: [4200, 7000], drift: 22, spin: false },
  firefly: { travel: -46, ms: [3400, 5600], drift: 40, spin: false },
  pollen: { travel: -60, ms: [5000, 8000], drift: 44, spin: false },
  sparkle: { travel: 0, ms: [2200, 3600], drift: 0, spin: false },
};

interface MoteProps {
  kind: AmbienceKind;
  color: string;
  x: number;
  y: number;
  /** 0–1, spreads size, speed and phase across the motes. */
  variance: number;
  index: number;
  still: boolean;
}

function Mote({ kind, color, x, y, variance, index, still }: MoteProps) {
  const t = useRef(new Animated.Value(0)).current;
  const behaviour = BEHAVIOUR[kind];

  useEffect(() => {
    if (still) return;
    const [min, max] = behaviour.ms;
    const duration = min + variance * (max - min);
    const loop = Animated.loop(
      Animated.timing(t, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true }),
    );
    // Stagger the starts so the field never pulses in unison.
    const start = setTimeout(() => loop.start(), index * 170 + variance * 900);
    return () => {
      clearTimeout(start);
      loop.stop();
    };
  }, [t, behaviour, variance, index, still]);

  const size = MOTE_SIZE[kind](variance);
  const transform: Animated.WithAnimatedArray<any> = [];

  if (behaviour.travel !== 0) {
    transform.push({
      translateY: t.interpolate({ inputRange: [0, 1], outputRange: [0, behaviour.travel] }),
    });
  }
  if (behaviour.drift !== 0) {
    // A there-and-back sway, so motes wander rather than sliding in a line.
    transform.push({
      translateX: t.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, behaviour.drift * (variance > 0.5 ? 1 : -1), 0],
      }),
    });
  }
  if (behaviour.spin) {
    transform.push({
      rotate: t.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', variance > 0.5 ? '260deg' : '-220deg'],
      }),
    });
  }
  if (kind === 'sparkle' || kind === 'firefly') {
    transform.push({
      scale: t.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 1.15, 0.6] }),
    });
  }

  // Fade in at the start of the loop and out at the end so nothing pops.
  const opacity = still
    ? MOTE_PEAK[kind] * 0.8
    : t.interpolate({
        inputRange: [0, 0.14, 0.8, 1],
        outputRange: [0, MOTE_PEAK[kind], MOTE_PEAK[kind], 0],
      });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.mote,
        { left: x, top: y, opacity },
        transform.length ? { transform } : null,
        shapeFor(kind, color, size),
      ]}
    >
      {kind === 'firefly' ? <View style={[styles.halo, { backgroundColor: color }]} /> : null}
    </Animated.View>
  );
}

/** Peak opacity per kind — rain and sand stay faint, fireflies burn bright. */
const MOTE_PEAK: Record<AmbienceKind, number> = {
  petal: 0.85,
  leaf: 0.8,
  snow: 0.9,
  rain: 0.45,
  sand: 0.5,
  ember: 0.9,
  bubble: 0.6,
  firefly: 0.95,
  pollen: 0.65,
  sparkle: 0.8,
};

const MOTE_SIZE: Record<AmbienceKind, (v: number) => number> = {
  petal: (v) => 7 + v * 4,
  leaf: (v) => 8 + v * 5,
  snow: (v) => 4 + v * 4,
  rain: (v) => 2 + v,
  sand: (v) => 3 + v * 3,
  ember: (v) => 3 + v * 3,
  bubble: (v) => 5 + v * 6,
  firefly: (v) => 4 + v * 2,
  pollen: (v) => 3 + v * 2,
  sparkle: (v) => 4 + v * 3,
};

/** The mote's actual shape. Kept to borders and radii — no SVG per mote. */
function shapeFor(kind: AmbienceKind, color: string, size: number) {
  switch (kind) {
    case 'petal':
      // A leaf-ish teardrop: round on three corners, pointed on one.
      return {
        width: size,
        height: size * 0.72,
        backgroundColor: color,
        borderTopLeftRadius: size,
        borderBottomRightRadius: size,
        borderTopRightRadius: size * 0.25,
        borderBottomLeftRadius: size * 0.25,
      };
    case 'leaf':
      return {
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        borderTopLeftRadius: size,
        borderBottomRightRadius: size,
      };
    case 'rain':
      return { width: size, height: size * 9, backgroundColor: color, borderRadius: size };
    case 'sand':
      return { width: size * 2.4, height: size * 0.7, backgroundColor: color, borderRadius: size };
    case 'bubble':
      return {
        width: size,
        height: size,
        borderRadius: size,
        borderWidth: 1.5,
        borderColor: color,
        backgroundColor: 'transparent',
      };
    default:
      return { width: size, height: size, borderRadius: size, backgroundColor: color };
  }
}

const styles = StyleSheet.create({
  mote: { position: 'absolute' },
  // A soft bloom around fireflies, so they read as lit rather than painted.
  halo: {
    position: 'absolute',
    left: -6,
    top: -6,
    right: -6,
    bottom: -6,
    borderRadius: 20,
    opacity: 0.28,
  },
});
