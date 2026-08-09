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

/**
 * Spring presets for `Animated.spring`.
 *
 * Going *down* into a press is dead flat: a bounce on the way in feels like a
 * mis-tap. Coming back *up* is where the character lives, so `release` carries
 * the overshoot. Splitting the two is what makes a button feel like a physical
 * thing rather than a rectangle changing its offset.
 */
export const spring = {
  /** Tight and immediate — going down into a press. */
  press: { speed: 44, bounciness: 0 },
  /** Coming back up. Overshoots, then settles. */
  release: { speed: 20, bounciness: 12 },
  /** Lively pop — selection, node landing. */
  pop: { speed: 26, bounciness: 16 },
  /** Soft settle — panels and sheets. */
  settle: { speed: 14, bounciness: 6 },
} as const;

/**
 * Overshoot is only safe on axes that cannot leave the screen.
 *
 * A spring passes its target by design, so a bouncy scale on a full-bleed card
 * pushes it past both screen edges at the top of the bounce. Vertical travel
 * on an inset element is safe; width is not. Bounce translateY, never scale up.
 */
export const OVERSHOOT_SAFE_AXES = ['translateY'] as const;
