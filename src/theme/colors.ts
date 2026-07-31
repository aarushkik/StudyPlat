/**
 * stuAP color palette — warm, academic, and playful.
 *
 * A soft rose brand on a warm cream canvas, with a set of gentle accent colors
 * used to give each AP course its own identity, plus a dedicated "quest map"
 * range for the adventure path. All raw values live here so screens/components
 * never hardcode a hex — retheming stays a one-file change.
 */

export const palette = {
  // Brand — the rose scale
  rose50: '#FFF3F8',
  rose100: '#FFE1EC',
  rose200: '#FFC2DA',
  rose300: '#FF9CC2',
  rose400: '#FF7DAE', // mascot body
  rose500: '#FF5E9C', // primary brand
  rose600: '#EC4488', // button edge / pressed
  rose700: '#C72E6E',
  rose800: '#9E2255',

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
  amber: '#FFB02E',
  amberDark: '#F2921E',
  amberDeep: '#D97706',
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

  // Streak celebration (turquoise — its own identity)
  splash: '#2FC6D6',
  splashDeep: '#1799AC',
  splashMid: '#8AE0EA',
  splashSoft: '#D6F4F8',

  disabledBg: '#EDE7EC',
  disabledEdge: '#DED6DD',
  disabledText: '#B7AEB6',
} as const;

/**
 * Quest-map scenery. One warm, storybook landscape range shared by the
 * backdrop, the trail, and the node art so the map always reads as one place.
 */
export const scenery = {
  skyHigh: '#FFF1F6',
  skyLow: '#FFFAF3',
  hillFar: '#F4E6F1',
  hillMid: '#EAF2E0',
  hillNear: '#DDECCD',
  canopy: '#8FCB6E',
  canopyDeep: '#63A64C',
  trunk: '#B98457',
  trunkDeep: '#96683F',
  ridge: '#DACDE5',
  ridgeDeep: '#C0B0CF',
  snow: '#FFFBFF',
  water: '#AADEF0',
  waterDeep: '#7CC5E0',
  trail: '#F3E4D0',
  trailEdge: '#E0CBAE',
  stone: '#D0C5CF',
  stoneDeep: '#AA9CAA',
  cloud: '#FFFFFF',
} as const;

/** Node styling for the quest map, keyed by node kind. */
export const questNode = {
  lesson: { face: '#FF7DAE', edge: '#D93F78', ring: '#FFD3E5' },
  practice: { face: '#7FC8F0', edge: '#3E90C4', ring: '#D7EEFB' },
  reading: { face: '#F5B94B', edge: '#C98B1B', ring: '#FCEBCC' },
  treasure: { face: '#9C89F5', edge: '#6B54D1', ring: '#E6E0FE' },
  boss: { face: '#5A3B7A', edge: '#2F1B45', ring: '#C9A6E8' },
  locked: { face: '#DED4DC', edge: '#BDAFBB', ring: '#F0E9EF' },
} as const;

export type QuestNodeKind = keyof typeof questNode;

export const colors = {
  primary: palette.rose500,
  primaryDark: palette.rose600,
  primaryDeep: palette.rose700,
  primarySoft: palette.rose100,
  primaryTint: palette.rose50,

  background: palette.cream,
  surface: palette.white,
  surfaceSunken: palette.parchment,
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
  splash: palette.splash,
  splashDeep: palette.splashDeep,
  splashMid: palette.splashMid,
  splashSoft: palette.splashSoft,

  gold: palette.amber,
  goldDark: palette.amberDark,

  disabledBg: palette.disabledBg,
  disabledEdge: palette.disabledEdge,
  disabledText: palette.disabledText,

  white: palette.white,
  black: palette.black,
} as const;

/** Two-stop gradients, ready to spread into <LinearGradient colors={...} />. */
export const gradients = {
  brand: [palette.rose400, palette.rose600] as const,
  brandDeep: [palette.rose500, palette.rose700] as const,
  dawn: [palette.rose300, palette.amber] as const,
  sky: [scenery.skyHigh, scenery.skyLow] as const,
  gold: [palette.amber, palette.amberDeep] as const,
  boss: ['#7A4FA8', '#3B2258'] as const,
  success: [palette.success, palette.successDark] as const,
  glass: ['rgba(255,255,255,0.94)', 'rgba(255,255,255,0.74)'] as const,
} as const;

/** Soft accent pairs used to color-code AP courses. */
export const accents = {
  green: { base: '#38C793', soft: '#DFF6EC', deep: '#1F9A6E' },
  violet: { base: '#8B7BFF', soft: '#E7E3FF', deep: '#5E4BD6' },
  coral: { base: '#FF7A66', soft: '#FFE3DD', deep: '#D84E38' },
  amber: { base: '#F2A03D', soft: '#FCEBD4', deep: '#C4740F' },
  sky: { base: '#3CA7FF', soft: '#DDEEFF', deep: '#1173C4' },
  lime: { base: '#7DC94B', soft: '#E8F5D8', deep: '#4F9422' },
  pink: { base: '#FF6FB0', soft: '#FFE0EF', deep: '#D33F84' },
  gold: { base: '#E0A800', soft: '#FBF0CC', deep: '#A87A00' },
} as const;

export type AccentName = keyof typeof accents;
export type Accent = (typeof accents)[AccentName];
