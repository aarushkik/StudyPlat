import { palette } from '@/theme';

/**
 * Companions — the collectible half of the quest.
 *
 * Each one carries a single ability that changes how a session plays, and each
 * locked one names the exact thing that unlocks it. "Keep playing" is not an
 * unlock condition; "beat five bosses" is, and a student can decide whether
 * they want it.
 *
 * The first four come from the Claude Design build verbatim. The rest follow
 * the same shape: one ability, one sentence, one condition.
 */

export interface Companion {
  id: string;
  name: string;
  /** What it does in a session, in one line. */
  ability: string;
  /** Its colour on the roster tile. */
  tint: string;
  /** Owned: how you hold it. Locked: what unlocks it. */
  tag: string;
  owned: boolean;
  /** Only one companion is equipped at a time. */
  equipped?: boolean;
}

const LOCKED_TINT = '#B8A98D';

export const COMPANIONS: Companion[] = [
  { id: 'mira', name: 'Mira', ability: 'Reveals one hint per stop', tint: palette.turquoise, tag: 'Equipped', owned: true, equipped: true },
  { id: 'ember', name: 'Ember', ability: 'Shields a streak day', tint: palette.orange, tag: 'Owned', owned: true },
  { id: 'pilot', name: 'Pilot', ability: 'Doubles the gems a session pays', tint: '#3E9E63', tag: 'Owned', owned: true },
  { id: 'quill', name: 'Quill', ability: 'One retry per stop', tint: palette.violet, tag: 'Owned', owned: true },
  { id: 'cobalt', name: 'Cobalt', ability: 'Freezes a boss timer once', tint: LOCKED_TINT, tag: '14-day streak', owned: false },
  { id: 'marrow', name: 'Marrow', ability: 'Skips one boss phase', tint: LOCKED_TINT, tag: 'Beat 5 bosses', owned: false },
  { id: 'tessel', name: 'Tessel', ability: '+20% XP on drills', tint: LOCKED_TINT, tag: 'Master 3 categories', owned: false },
  { id: 'nix', name: 'Nix', ability: 'Reveals one wrong answer', tint: LOCKED_TINT, tag: 'Finish Track 6', owned: false },
  { id: 'fen', name: 'Fen', ability: 'Keeps the streak on a missed day', tint: LOCKED_TINT, tag: '30-day streak', owned: false },
  { id: 'slate', name: 'Slate', ability: 'Re-asks anything you got wrong', tint: LOCKED_TINT, tag: 'Finish Track 4', owned: false },
  { id: 'vesper', name: 'Vesper', ability: 'Doubles XP on the last stop of a track', tint: LOCKED_TINT, tag: 'Clear a track first try', owned: false },
  { id: 'orrin', name: 'Orrin', ability: 'Starts every boss one phase down', tint: LOCKED_TINT, tag: 'Beat 15 bosses', owned: false },
];

export const OWNED_COMPANIONS = COMPANIONS.filter((c) => c.owned);
