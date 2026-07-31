import { Easing } from 'react-native';

/**
 * Shared motion vocabulary. Durations and curves live here so every transition
 * in the app feels like it came from the same hand — quick and springy for
 * taps, slower and eased for entrances.
 */
export const duration = {
  instant: 110,
  fast: 180,
  base: 260,
  slow: 420,
  scene: 620,
} as const;

export const easing = {
  /** Default entrance: decelerates into place. */
  out: Easing.bezier(0.22, 1, 0.36, 1),
  /** Exits: accelerates away. */
  in: Easing.bezier(0.55, 0, 1, 0.45),
  /** Symmetric — for loops that breathe. */
  inOut: Easing.inOut(Easing.sin),
  /** A little overshoot for playful pops. */
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
} as const;

/** Spring presets for `Animated.spring`. */
export const spring = {
  /** Tight and immediate — button presses. */
  press: { speed: 50, bounciness: 0 },
  /** Lively pop — selection, node landing. */
  pop: { speed: 30, bounciness: 14 },
  /** Soft settle — panels and sheets. */
  settle: { speed: 14, bounciness: 6 },
} as const;
