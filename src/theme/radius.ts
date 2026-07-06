/** Corner-radius scale. stuAP leans on generous, rounded corners. */
export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 30,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radius;
