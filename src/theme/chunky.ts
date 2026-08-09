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
  chip: 5,
  card: 5,
  button: 6,
  prize: 6,
  stop: 7,
  current: 8,
} as const;

export const chunkyRadius = {
  chip: 20,
  prize: 22,
  button: 26,
  card: 26,
  flag: 14,
  nav: 15,
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

/**
 * The highlight that makes a filled surface read as moulded rather than
 * printed.
 *
 * One soft white shape hugging the top inside edge — the light sitting on a
 * vinyl sticker or a plastic toy. It is the cheapest possible cue for "this is
 * a solid object", and it is what separates a cartoon from a flat-design
 * illustration: flat design has one value per shape, cartoons have two.
 *
 * Deliberately not a gradient. A gradient across the whole face muddies the
 * flat colour the palette depends on; a hard-edged highlight over the top
 * third leaves the bottom two thirds exactly the colour they were.
 *
 * `inset` should clear the 3px border, or the highlight paints over the ink.
 */
export function gloss(radiusValue: number, strength = 0.16): ViewStyle {
  return {
    position: 'absolute',
    left: BORDER,
    right: BORDER,
    top: BORDER,
    // Kept low. On a wide face the highlight's lower edge is a long straight
    // line, and a strong one stops reading as light and starts reading as a
    // two-tone button. It should be felt, not seen.
    height: '38%',
    borderTopLeftRadius: Math.max(0, radiusValue - BORDER),
    borderTopRightRadius: Math.max(0, radiusValue - BORDER),
    borderBottomLeftRadius: radiusValue * 0.7,
    borderBottomRightRadius: radiusValue * 0.7,
    backgroundColor: `rgba(255,255,255,${strength})`,
  };
}

/**
 * The circular variant, for stops and any other round face.
 *
 * Deliberately drawn *wider than the face* and pushed up past its top edge.
 * A pill that fits inside the circle reads as a separate floating object; one
 * that overflows and is clipped by the circle's own border comes back as a
 * crescent that follows the curve, which is what light on a sphere does. The
 * face must therefore carry `overflow: 'hidden'`.
 */
export function glossRound(size: number, strength = 0.28): ViewStyle {
  return {
    position: 'absolute',
    top: -size * 0.30,
    left: -size * 0.08,
    width: size * 1.16,
    height: size * 0.58,
    borderRadius: size,
    backgroundColor: `rgba(255,255,255,${strength})`,
  };
}
