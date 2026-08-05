/** Single import surface for the design system. */
export { colors, palette, accents, stopColors, questNode, nightScreens, confettiColors } from './colors';
export type { NightScreen, AccentName, Accent, QuestNodeKind } from './colors';
export { chunky, depth, chunkyRadius, BORDER } from './chunky';
export type { ChunkyStyles } from './chunky';
export { spacing } from './spacing';
export { radius } from './radius';
export { shadows, glow } from './shadows';
export { typography, fontWeight, fonts } from './typography';
export { duration, easing, spring } from './motion';

import { colors, palette } from './colors';
import { chunky, depth, chunkyRadius } from './chunky';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { typography } from './typography';

export const theme = {
  colors,
  palette,
  chunky,
  depth,
  chunkyRadius,
  spacing,
  radius,
  shadows,
  typography,
} as const;
export type Theme = typeof theme;
