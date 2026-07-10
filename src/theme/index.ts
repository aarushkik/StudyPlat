/** Single import surface for the design system. */
export { colors, palette, accents } from './colors';
export type { AccentName } from './colors';
export { spacing } from './spacing';
export { radius } from './radius';
export { shadows } from './shadows';
export { typography, fontWeight, fonts } from './typography';

import { colors, accents, palette } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { typography } from './typography';

export const theme = { colors, accents, palette, spacing, radius, shadows, typography } as const;
export type Theme = typeof theme;
