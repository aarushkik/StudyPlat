/**
 * StudyPlat colour system.
 *
 * Ink on cream with a turquoise brand — the palette is read straight from the
 * Claude Design build, not invented here. Two things carry the whole look:
 *
 * 1. **Ink is on everything.** `#12303C` is the border of every card, button,
 *    chip and stop on the map, and most of the text. It is what makes the UI
 *    read as chunky stickers rather than flat panels.
 * 2. **Orange means "you are here".** Turquoise is the brand, but `#F5A02B` is
 *    reserved for the one stop the student should tap next and for in-progress
 *    state. Spending it anywhere else costs the map its focal point.
 *
 * Twelve screens render on the night ground instead of cream — splash, the
 * session summary, level up, unlock moments, all four boss screens, the
 * placement result, world complete, and review. See `nightScreens` below.
 */

export const palette = {
  // The line. On borders, on text, on shadows.
  ink: '#12303C',
  inkSoft: '#0B4A56',
  inkDeep: '#052F37',

  // Brand turquoise, sampled from the app icon.
  turquoise: '#05B1C9',
  turquoiseLight: '#7FE0EC',
  turquoiseDeep: '#037D91',
  turquoiseTint: '#EAF9FB',
  turquoiseSky: '#D6F2F6',

  // "You are here" and in-progress.
  orange: '#F5A02B',
  orangeDeep: '#C77812',
  orangeDark: '#5A3708',

  // Warm grounds.
  cream: '#FFFDF7',
  parchment: '#FBF1E2',
  sand: '#EADDC6',
  sandDeep: '#CFC0A4',
  locked: '#EFE3CD',
  lockedInk: '#AE9F84',

  // Night ground for the twelve dark screens.
  night: '#0B2029',
  nightRaised: '#12303C',

  // Muted text tiers, warm-biased so they sit on cream without going grey.
  muted: '#7C9199',
  mutedDeep: '#6D858C',
  mutedDark: '#5D767E',
  mutedLight: '#96A8AD',

  // Support hues used by tracks, prizes and characters.
  violet: '#6B4AA0',
  violetLight: '#C9A6F2',
  violetMid: '#A796C2',
  ember: '#D9552F',
  green: '#3E9E63',
  greenDeep: '#2A6E45',

  white: '#FFFFFF',
} as const;

export const colors = {
  // Structure
  ink: palette.ink,
  border: palette.ink,
  background: palette.parchment,
  surface: palette.cream,
  surfaceSelected: palette.turquoiseTint,
  night: palette.night,
  nightRaised: palette.nightRaised,

  // Brand
  primary: palette.turquoise,
  primaryLight: palette.turquoiseLight,
  primaryDeep: palette.turquoiseDeep,
  primaryTint: palette.turquoiseTint,

  // Progress
  current: palette.orange,
  currentDeep: palette.orangeDeep,
  locked: palette.locked,
  lockedText: palette.lockedInk,

  // Text
  textPrimary: palette.ink,
  textSecondary: palette.mutedDark,
  textMuted: palette.muted,
  textFaint: palette.mutedLight,
  textOnInk: palette.parchment,
  textOnPrimary: palette.inkDeep,

  // Feedback. Correct borrows the track green, wrong the ember.
  success: palette.green,
  successDeep: palette.greenDeep,
  successDark: palette.greenDeep,
  successSoft: '#DDEFE2',
  danger: palette.ember,
  dangerDark: '#A93B1C',
  dangerSoft: '#FBE1DA',

  gold: palette.orange,
  goldDeep: palette.orangeDeep,
  goldDark: palette.orangeDeep,

  // Sunken wells and inset tiles.
  surfaceSunken: palette.parchment,

  // Disabled / sealed.
  disabledBg: palette.locked,
  disabledEdge: palette.sandDeep,
  disabledText: palette.lockedInk,

  /**
   * The streak celebration keeps its own identity, and now that the brand is
   * turquoise it simply *is* the brand — the old palette had to reach for a
   * separate colour to avoid clashing with rose.
   */
  splash: palette.turquoise,
  splashDeep: palette.turquoiseDeep,
  splashMid: palette.turquoiseLight,
  splashSoft: palette.turquoiseSky,

  primaryDark: palette.turquoiseDeep,
  primarySoft: palette.turquoiseSky,

  black: palette.ink,
  white: palette.white,
} as const;

/**
 * Per-course accent pairs. Courses still colour-code their icon and selected
 * state; these are the old accent keys retuned to sit beside turquoise and ink
 * rather than rose.
 */
export const accents = {
  green: { base: palette.green, soft: '#DEEFE1', deep: palette.greenDeep },
  violet: { base: palette.violet, soft: '#E8DFF7', deep: '#4A3070' },
  coral: { base: palette.ember, soft: '#FBE1DA', deep: '#A93B1C' },
  amber: { base: palette.orange, soft: '#FBE6C7', deep: palette.orangeDeep },
  sky: { base: '#3F63B5', soft: '#DEE7F8', deep: '#2B457F' },
  lime: { base: '#6FA83C', soft: '#E6F0D6', deep: '#4C7626' },
  pink: { base: '#B04A87', soft: '#F5E2EE', deep: '#7C3160' },
  gold: { base: '#8A7A4E', soft: '#EAE5D6', deep: '#615436' },
} as const;

export type AccentName = keyof typeof accents;
export type Accent = (typeof accents)[AccentName];

/**
 * Stop colours on the path, keyed by what happens there.
 *
 * The design does not tint stops by kind the way the old map did — a stop is
 * cream when available, the track's deep tone when cleared, orange when it is
 * the one to play next, and sand when sealed. Kind is carried by the emblem
 * inside, not by the fill.
 */
export const stopColors = {
  available: { face: palette.cream, edge: palette.ink },
  current: { face: palette.orange, edge: palette.orangeDeep },
  locked: { face: palette.locked, edge: palette.ink },
} as const;

/**
 * Per-kind colour, used where a stop needs to *say* what it is rather than
 * where it sits — the crest on the stop sheet, legends, the practice list.
 * On the path itself the fill carries state and the emblem carries kind.
 */
export const questNode = {
  lesson: { face: palette.turquoise, edge: palette.turquoiseDeep, ring: palette.turquoiseSky },
  drill: { face: palette.violet, edge: '#4A3070', ring: '#E8DFF7' },
  study: { face: palette.green, edge: palette.greenDeep, ring: '#DEEFE1' },
  bonus: { face: palette.orange, edge: palette.orangeDeep, ring: '#FBE6C7' },
  boss: { face: palette.ember, edge: '#A93B1C', ring: '#FBE1DA' },
  locked: { face: palette.locked, edge: palette.sandDeep, ring: palette.sand },
} as const;

export type QuestNodeKind = keyof typeof questNode;

/**
 * Screens that render on the night ground. The mascot must use its
 * transparent art on these — the cream-backed copies show a visible square.
 */
export const nightScreens = [
  'Splash',
  'Summary',
  'LevelUp',
  'UnlockMoment',
  'BossIntro',
  'BossFight',
  'Victory',
  'Defeat',
  'PlacementResult',
  'WorldDone',
  'Review',
  'ReviewDone',
] as const;

export type NightScreen = (typeof nightScreens)[number];

/** Confetti chip colours, in the order the design cycles them. */
export const confettiColors = [
  palette.parchment,
  palette.orange,
  palette.turquoiseLight,
  palette.white,
  palette.violet,
] as const;
