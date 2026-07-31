/** Expressions change Stu's eyes, brows, and bill to react to the student. */
export type MascotExpression =
  | 'happy'
  | 'thinking'
  | 'excited'
  | 'worried'
  | 'celebrating'
  | 'focused'
  | 'proud'
  | 'sleepy';

/** Optional item Stu holds. */
export type MascotAccessory = 'none' | 'book' | 'pencil' | 'wand' | 'lantern';

/** Named sizes; a raw number is also accepted for precise control. */
export type MascotSize = 'tiny' | 'small' | 'medium' | 'large' | 'xl';

export interface MascotProps {
  expression?: MascotExpression;
  accessory?: MascotAccessory;
  size?: MascotSize | number;
  /** Master switch for idle breathing + blinking (default true). */
  animated?: boolean;
  /** Soft contact shadow on the ground beneath Stu (default true). */
  shadow?: boolean;
}

/** Width in pixels for each named size. */
export const MASCOT_SIZES: Record<MascotSize, number> = {
  tiny: 44,
  small: 80,
  medium: 120,
  large: 176,
  xl: 232,
};

/** The art is drawn on this grid; the wrapper keeps its aspect ratio. */
export const MASCOT_VIEWBOX = { width: 240, height: 276 } as const;
export const MASCOT_ASPECT = MASCOT_VIEWBOX.height / MASCOT_VIEWBOX.width;
