/** Expressions change Stu's eyes + beak to react to the student. */
export type MascotExpression = 'happy' | 'thinking' | 'excited' | 'worried' | 'celebrating';

/** Optional item Stu holds. (The "STU" cap is always part of the base art.) */
export type MascotAccessory = 'none' | 'book' | 'pencil' | 'hat' | 'wand';

/** Named sizes; a raw number is also accepted for precise control. */
export type MascotSize = 'small' | 'medium' | 'large';

export interface MascotProps {
  expression?: MascotExpression;
  accessory?: MascotAccessory;
  size?: MascotSize | number;
  /** Master switch for idle breathing + blinking (default true). */
  animated?: boolean;
}

/** Pixel size for each named size. */
export const MASCOT_SIZES: Record<MascotSize, number> = {
  small: 80,
  medium: 120,
  large: 176,
};
