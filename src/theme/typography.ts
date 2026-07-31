import { TextStyle } from 'react-native';
import { colors } from './colors';

/**
 * Typography scale. Headings, buttons, and labels use the rounded, playful
 * **Fredoka** brand font (loaded in App.tsx via expo-font); body copy stays on
 * the crisp system font for readability. If fonts haven't finished loading yet,
 * text simply falls back to the system font.
 */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
} as const;

/** Brand font families (must match the keys loaded by `useFonts`). */
export const fonts = {
  bold: 'Fredoka_700Bold',
  semibold: 'Fredoka_600SemiBold',
  medium: 'Fredoka_500Medium',
} as const;

type Variant =
  | 'hero'
  | 'display'
  | 'title'
  | 'heading'
  | 'subtitle'
  | 'body'
  | 'bodyStrong'
  | 'tagline'
  | 'caption'
  | 'label'
  | 'overline'
  | 'numeral'
  | 'button';

export const typography: Record<Variant, TextStyle> = {
  hero: { fontFamily: fonts.bold, fontSize: 42, lineHeight: 50, letterSpacing: -0.8, color: colors.textPrimary },
  display: { fontFamily: fonts.bold, fontSize: 34, lineHeight: 42, letterSpacing: -0.5, color: colors.textPrimary },
  title: { fontFamily: fonts.bold, fontSize: 28, lineHeight: 36, letterSpacing: -0.3, color: colors.textPrimary },
  heading: { fontFamily: fonts.semibold, fontSize: 22, lineHeight: 30, color: colors.textPrimary },
  subtitle: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 25, color: colors.textPrimary },
  body: { fontSize: 16, lineHeight: 24, fontWeight: fontWeight.medium, color: colors.textSecondary },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: fontWeight.bold, color: colors.textPrimary },
  tagline: { fontSize: 18, lineHeight: 26, fontWeight: fontWeight.medium, color: colors.textSecondary },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: fontWeight.semibold, color: colors.textMuted },
  label: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, color: colors.textSecondary },
  // Small all-caps kicker that sits above a headline or inside a chip.
  overline: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 14, letterSpacing: 1.2, textTransform: 'uppercase', color: colors.textSecondary },
  // Tabular-feeling stat numbers for the map HUD.
  numeral: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 22, letterSpacing: -0.2, color: colors.textPrimary },
  // Chunky, slightly spaced button label.
  button: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 20, letterSpacing: 0.5 },
};
