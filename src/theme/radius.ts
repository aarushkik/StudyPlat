/** Corner-radius scale. StudyPlat leans on generous, rounded corners. */
export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 30,
  xxxl: 38,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radius;
