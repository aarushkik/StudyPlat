import type { ViewStyle } from 'react-native';
import { colors } from './colors';

/**
 * The chunky sticker treatment — a 3px ink border over a hard offset shadow.
 *
 * The design expresses this as `box-shadow: 0 5px 0 <colour>`: an offset with
 * **no blur**. React Native cannot draw that. `shadowRadius: 0` gets close on
 * iOS, but Android's `elevation` always blurs and always tints toward black,
 * so neither platform can carry a coloured hard edge.
 *
 * What works is a *lip*: a second view of the same shape sitting behind the
 * face and pushed down, so a band of it shows along the bottom. Every chunky
 * surface in the app is built from this pair.
 *
 * The offsets matter. A lip must be `top: depth, bottom: -depth` — the same
 * height as its parent, shifted down. Setting `bottom: 0` instead makes the
 * lip *shorter* than the face and it hides behind it completely, which is why
 * the old AppButton's lip never actually rendered.
 *
 * Because the lip hangs `depth` px below the parent's box, give the wrapper
 * `marginBottom: depth` or the next element will sit on top of it.
 */

export const BORDER = 3;

/** Depths used across the design, smallest surface to largest. */
export const depth = {
  chip: 4,
  card: 4,
  button: 5,
  prize: 5,
  stop: 6,
  current: 7,
} as const;

export const chunkyRadius = {
  chip: 16,
  prize: 18,
  button: 19,
  card: 20,
  flag: 10,
  nav: 9,
} as const;

export interface ChunkyStyles {
  /** Put on the outer view. Reserves room for the lip below the face. */
  wrap: ViewStyle;
  /** Absolutely positioned, rendered *before* the face. */
  lip: ViewStyle;
  /** The visible surface. */
  face: ViewStyle;
  /** How far the face travels down when pressed. */
  press: number;
}

interface ChunkyOptions {
  /** How far the lip peeks out. Defaults to the button depth. */
  depth?: number;
  /** Corner radius. Defaults to the card radius. */
  radius?: number;
  /** Lip colour. Ink for most things; a track's dark tone for coloured ones. */
  shadow?: string;
  /** Face fill. */
  background?: string;
  /** Border colour, if it should not be ink. */
  border?: string;
}

/**
 * Build the three styles for one chunky surface.
 *
 * ```tsx
 * const c = chunky({ depth: depth.button, radius: chunkyRadius.button });
 * <View style={c.wrap}>
 *   <View style={c.lip} />
 *   <Animated.View style={[c.face, { transform: [{ translateY }] }]}>…</Animated.View>
 * </View>
 * ```
 */
export function chunky(options: ChunkyOptions = {}): ChunkyStyles {
  const d = options.depth ?? depth.button;
  const r = options.radius ?? chunkyRadius.card;

  return {
    wrap: { position: 'relative', marginBottom: d },
    lip: {
      position: 'absolute',
      left: 0,
      right: 0,
      // Same height as the parent, pushed down — see the note above.
      top: d,
      bottom: -d,
      borderRadius: r,
      backgroundColor: options.shadow ?? colors.ink,
    },
    face: {
      borderWidth: BORDER,
      borderColor: options.border ?? colors.ink,
      borderRadius: r,
      backgroundColor: options.background ?? colors.surface,
    },
    // Pressing sinks the face onto its lip, leaving 2px so it never looks flat.
    press: Math.max(0, d - 2),
  };
}
