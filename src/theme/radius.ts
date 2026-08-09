/** Corner-radius scale. StudyPlat leans on generous, rounded corners. */
/**
 * The corner scale.
 *
 * Deliberately generous. This is a cartoon world drawn in thick ink lines, and
 * a thick line around a tight corner reads as a technical drawing — the ink
 * has to bend, not turn. Every step is roughly 4pt so two adjacent radii are
 * distinguishable without either looking mean.
 */
export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 34,
  xxxl: 42,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radius;
