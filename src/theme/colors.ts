/**
 * stuAP color palette — warm, academic, and playful.
 *
 * A soft rose brand on a warm cream canvas, with a set of gentle accent colors
 * used to give each AP course its own identity. All raw values live here so
 * screens/components never hardcode a hex — retheming stays a one-file change.
 */

export const palette = {
  // Brand — the pink STU bird
  rose50: '#FFF3F8',
  rose100: '#FFE1EC',
  rose200: '#FFC2DA',
  rose300: '#FF9CC2',
  rose400: '#FF7DAE', // mascot body
  rose500: '#FF5E9C', // primary brand
  rose600: '#EC4488', // button edge / pressed
  rose700: '#C72E6E',

  // Warm neutrals
  cream: '#FFFCF7', // app background
  parchment: '#FBF4EA',
  ink: '#3B2E3A', // primary text (warm plum)
  slate: '#7A7080', // secondary text
  mist: '#A89FA8', // muted text
  border: '#EFE7EE',
  white: '#FFFFFF',
  black: '#241B22',

  // Accents
  amber: '#FFB02E', // beak / highlights
  amberDark: '#F2921E',
  hatTan: '#CE9A6B',
  hatBrown: '#A9723F',
  hatCream: '#FFF3E6',

  // Feedback
  success: '#37C98B',
  successDark: '#12946A',
  successSoft: '#DDF6EC',
  danger: '#FF5A6A',
  dangerDark: '#D53344',
  dangerSoft: '#FFE3E6',
  disabledBg: '#EDE7EC',
  disabledEdge: '#DED6DD',
  disabledText: '#B7AEB6',
} as const;

export const colors = {
  primary: palette.rose500,
  primaryDark: palette.rose600,
  primarySoft: palette.rose100,
  primaryTint: palette.rose50,

  background: palette.cream,
  surface: palette.white,
  border: palette.border,

  textPrimary: palette.ink,
  textSecondary: palette.slate,
  textMuted: palette.mist,
  textOnPrimary: palette.white,

  success: palette.success,
  successDark: palette.successDark,
  successSoft: palette.successSoft,
  danger: palette.danger,
  dangerDark: palette.dangerDark,
  dangerSoft: palette.dangerSoft,
  disabledBg: palette.disabledBg,
  disabledEdge: palette.disabledEdge,
  disabledText: palette.disabledText,

  white: palette.white,
  black: palette.black,
} as const;

/** Soft accent pairs used to color-code AP courses. */
export const accents = {
  green: { base: '#38C793', soft: '#DFF6EC' },
  violet: { base: '#8B7BFF', soft: '#E7E3FF' },
  coral: { base: '#FF7A66', soft: '#FFE3DD' },
  amber: { base: '#F2A03D', soft: '#FCEBD4' },
  sky: { base: '#3CA7FF', soft: '#DDEEFF' },
  lime: { base: '#7DC94B', soft: '#E8F5D8' },
  pink: { base: '#FF6FB0', soft: '#FFE0EF' },
  gold: { base: '#E0A800', soft: '#FBF0CC' },
} as const;

export type AccentName = keyof typeof accents;
