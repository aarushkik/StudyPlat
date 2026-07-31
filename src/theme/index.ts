/** Single import surface for the design system. */
export { colors, palette, accents, gradients, scenery, questNode } from './colors';
export type { AccentName, Accent, QuestNodeKind } from './colors';
export { biomes, isDarkBiome } from './biomes';
export type { BiomeId, BiomeTheme, DecorKind } from './biomes';
export { spacing } from './spacing';
export { radius } from './radius';
export { shadows, glow } from './shadows';
export { typography, fontWeight, fonts } from './typography';
export { duration, easing, spring } from './motion';

import { colors, accents, palette, gradients, scenery, questNode } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { typography } from './typography';

export const theme = {
  colors,
  accents,
  palette,
  gradients,
  scenery,
  questNode,
  spacing,
  radius,
  shadows,
  typography,
} as const;
export type Theme = typeof theme;
