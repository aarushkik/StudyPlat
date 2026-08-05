import { TextStyle } from 'react-native';
import { colors } from './colors';

/**
 * Type scale.
 *
 * Two families, matching the design build. **Baloo 2** — rounded, heavy,
 * slightly condensed — carries every heading, button and label. **Figtree**
 * handles body copy and anything long enough to need reading rather than
 * scanning.
 *
 * The design leans on very heavy weights with open tracking for its small
 * labels (900 at 11–12px, +0.07 to +0.14em). That combination is what makes
 * chip and button text read as part of the sticker style rather than as
 * ordinary UI text, so the tracking values here are deliberate.
 *
 * Both families are loaded in `App.tsx`; text falls back to the system font
 * until they resolve.
 */

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/** Family names must match the keys passed to `useFonts`. */
export const fonts = {
  displaySemibold: 'Baloo2_600SemiBold',
  displayBold: 'Baloo2_700Bold',
  displayHeavy: 'Baloo2_800ExtraBold',
  body: 'Figtree_500Medium',
  bodySemibold: 'Figtree_600SemiBold',
  bodyBold: 'Figtree_700Bold',
  bodyHeavy: 'Figtree_800ExtraBold',
  bodyBlack: 'Figtree_900Black',
  /** Kept so existing callers of `fonts.bold` keep resolving to the display face. */
  bold: 'Baloo2_700Bold',
  semibold: 'Baloo2_600SemiBold',
  medium: 'Figtree_500Medium',
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
  | 'stat'
  | 'button'
  | 'place';

export const typography: Record<Variant, TextStyle> = {
  hero: { fontFamily: fonts.displayHeavy, fontSize: 40, lineHeight: 46, letterSpacing: -0.4, color: colors.textPrimary },
  display: { fontFamily: fonts.displayHeavy, fontSize: 32, lineHeight: 38, letterSpacing: -0.3, color: colors.textPrimary },
  title: { fontFamily: fonts.displayBold, fontSize: 26, lineHeight: 32, letterSpacing: -0.2, color: colors.textPrimary },
  heading: { fontFamily: fonts.displayBold, fontSize: 21, lineHeight: 27, color: colors.textPrimary },
  subtitle: { fontFamily: fonts.displaySemibold, fontSize: 17, lineHeight: 23, color: colors.textPrimary },

  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.textSecondary },
  bodyStrong: { fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 23, color: colors.textPrimary },
  tagline: { fontFamily: fonts.body, fontSize: 17, lineHeight: 25, color: colors.textSecondary },
  caption: { fontFamily: fonts.bodySemibold, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },

  /** Nav items and small controls. */
  label: { fontFamily: fonts.bodyHeavy, fontSize: 12, lineHeight: 16, letterSpacing: 0.2, color: colors.textSecondary },
  /** The design's all-caps kicker — heavy and widely tracked. */
  overline: {
    fontFamily: fonts.bodyBlack,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  /** Stat readouts in the HUD. */
  numeral: { fontFamily: fonts.displayHeavy, fontSize: 17, lineHeight: 21, color: colors.textPrimary },
  /** The big numbers on summary and progress screens. */
  stat: { fontFamily: fonts.displayHeavy, fontSize: 30, lineHeight: 34, letterSpacing: -0.3, color: colors.textPrimary },
  /** Buttons: heavy, uppercase, generously tracked. */
  button: { fontFamily: fonts.bodyBlack, fontSize: 15, lineHeight: 19, letterSpacing: 1.0, textTransform: 'uppercase' },
  /** A track's place name on the path header. */
  place: { fontFamily: fonts.displayHeavy, fontSize: 22, lineHeight: 27, letterSpacing: -0.2, color: colors.textPrimary },
};
