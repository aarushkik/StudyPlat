/**
 * 4px-based spacing scale. Use these tokens for padding, margins, and gaps so
 * layouts stay consistent and easy to retune.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 56,
} as const;

export type SpacingToken = keyof typeof spacing;
