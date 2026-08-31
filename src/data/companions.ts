import { palette } from '@/theme';
import type { PropName } from './props';
import type { QuestMap } from '@/types/quest';
import type { SkillTally } from '@/state/QuestContext';

/**
 * Companions — the collectible half of the quest.
 *
 * Every card here used to be a promise the app did not keep. The ability line
 * was decoration: equipping changed a highlight and nothing else, and `owned`
 * was a hard-coded boolean, so "Beat 5 bosses" stayed locked after fifty. The
 * roster looked like a system and behaved like a picture of one.
 *
 * Two things fix that, and both live in this file:
 *
 * 1. **`effect`** names something a session can actually honour. Every value
 *    is read somewhere real — the quiz screen for the four that change how a
 *    question is asked, `recordSession` for the ones that change what it pays.
 * 2. **`unlock`** carries the condition *as a function of quest state*, so the
 *    card and the thing it is waiting for cannot drift apart. The tag on a
 *    locked card is generated from the same object that decides whether it is
 *    locked.
 *
 * Three abilities were rewritten rather than implemented. Cobalt, Marrow and
 * Orrin described a boss fight with timers and phases — a screen this build
 * does not have — so rather than leave three cards lying, they now name
 * something the boss stops actually do. The four from the Claude Design build
 * are unchanged.
 */

/** What an equipped companion changes. Each one is read somewhere real. */
export type CompanionEffect =
  /** Reveal the explanation before answering, once per session. */
  | 'hint'
  /** Strike out one wrong option, once per session. */
  | 'eliminate'
  /** One second attempt after a wrong answer. */
  | 'retry'
  /** Ask everything missed again at the end of the session. */
  | 'requeue'
  /** Double the gems a session pays. */
  | 'gems'
  /** +20% XP on off-map practice. */
  | 'xpDrill'
  /** +50% XP from a boss stop. */
  | 'xpBoss'
  /** Double XP for a session with nothing wrong. */
  | 'xpPerfect'
  /** Hold the streak through a missed day. */
  | 'shield';

/** Everything an unlock condition is allowed to look at. */
export interface CompanionState {
  completed: string[];
  map: QuestMap;
  skills: SkillTally;
  bestStreak: number;
  sessions: number;
}

interface Unlock {
  /** Shown on the locked card, and as the reason in the tap message. */
  label: string;
  /** Progress towards it. Owned once `have >= need`. */
  measure: (s: CompanionState) => { have: number; need: number };
}

export interface Companion {
  id: string;
  name: string;
  /** What it does in a session, in one line. */
  ability: string;
  /** Its colour on the roster tile. */
  tint: string;
  /**
   * The prop sprite it carries.
   *
   * Chosen for the ability, not decoration: Mira reveals a hint and holds a
   * lantern, Fen keeps a streak through a missed day and pitches a tent. A
   * roster of twelve identical coloured squares told you nothing about any of
   * them; twelve objects are twelve things you can recognise across the app
   * without reading the name.
   */
  emblem: PropName;
  effect: CompanionEffect;
  /** How many missed days a shield covers. Only read for `shield`. */
  shieldDays?: number;
  /** Null for the starter set, which is owned from the first session. */
  unlock: Unlock | null;
}

/** A companion plus where this student stands with it. */
export interface CompanionStatus extends Companion {
  owned: boolean;
  /** Progress towards the unlock. Both 0 for the starter set. */
  have: number;
  need: number;
}

const LOCKED_TINT = '#B8A98D';

/** A skill counts as mastered at 80% over a meaningful number of attempts. */
const MASTERY_PCT = 80;
const MASTERY_MIN = 5;

const bossesBeaten = (s: CompanionState): number => {
  const done = new Set(s.completed);
  return s.map.units.flatMap((u) => u.nodes.filter((n) => n.kind === 'boss')).filter((b) => done.has(b.id))
    .length;
};

const tracksCleared = (s: CompanionState): number => {
  const done = new Set(s.completed);
  return s.map.units.filter((u) => u.nodes.every((n) => done.has(n.id))).length;
};

const mastered = (s: CompanionState): number =>
  Object.values(s.skills).filter((t) => t.seen >= MASTERY_MIN && (t.correct / t.seen) * 100 >= MASTERY_PCT)
    .length;

export const COMPANIONS: Companion[] = [
  {
    id: 'mira',
    name: 'Mira',
    emblem: 'lantern',
    ability: 'Reveals one hint per session',
    effect: 'hint',
    tint: palette.turquoise,
    unlock: null,
  },
  {
    id: 'ember',
    name: 'Ember',
    emblem: 'campfire',
    ability: 'Shields a streak day',
    effect: 'shield',
    shieldDays: 1,
    tint: palette.orange,
    unlock: null,
  },
  {
    id: 'pilot',
    name: 'Pilot',
    emblem: 'chest',
    ability: 'Doubles the gems a session pays',
    effect: 'gems',
    tint: '#3E9E63',
    unlock: null,
  },
  {
    id: 'quill',
    name: 'Quill',
    emblem: 'bookstack',
    ability: 'One retry per session',
    effect: 'retry',
    tint: palette.violet,
    unlock: null,
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    emblem: 'milestone',
    // Was "Freezes a boss timer once" — there is no boss timer to freeze.
    ability: 'Doubles XP for a flawless session',
    effect: 'xpPerfect',
    tint: LOCKED_TINT,
    unlock: { label: '14-day streak', measure: (s) => ({ have: s.bestStreak, need: 14 }) },
  },
  {
    id: 'marrow',
    name: 'Marrow',
    emblem: 'duckboard',
    // Was "Skips one boss phase" — bosses do not have phases in this build.
    ability: '+50% XP from boss stops',
    effect: 'xpBoss',
    tint: LOCKED_TINT,
    unlock: { label: 'Beat 5 bosses', measure: (s) => ({ have: bossesBeaten(s), need: 5 }) },
  },
  {
    id: 'tessel',
    name: 'Tessel',
    emblem: 'forge',
    ability: '+20% XP on practice drills',
    effect: 'xpDrill',
    tint: LOCKED_TINT,
    unlock: { label: 'Master 3 categories', measure: (s) => ({ have: mastered(s), need: 3 }) },
  },
  {
    id: 'nix',
    name: 'Nix',
    emblem: 'signpost',
    ability: 'Strikes out one wrong option',
    effect: 'eliminate',
    tint: LOCKED_TINT,
    unlock: { label: 'Clear 6 tracks', measure: (s) => ({ have: tracksCleared(s), need: 6 }) },
  },
  {
    id: 'fen',
    name: 'Fen',
    emblem: 'tent',
    ability: 'Shields two streak days',
    effect: 'shield',
    shieldDays: 2,
    tint: LOCKED_TINT,
    unlock: { label: '30-day streak', measure: (s) => ({ have: s.bestStreak, need: 30 }) },
  },
  {
    id: 'slate',
    name: 'Slate',
    emblem: 'backpack',
    ability: 'Re-asks anything you get wrong',
    effect: 'requeue',
    tint: LOCKED_TINT,
    unlock: { label: 'Clear 4 tracks', measure: (s) => ({ have: tracksCleared(s), need: 4 }) },
  },
  {
    id: 'vesper',
    name: 'Vesper',
    emblem: 'lighthouse',
    ability: 'Doubles the gems a session pays',
    effect: 'gems',
    tint: LOCKED_TINT,
    unlock: { label: 'Finish 50 sessions', measure: (s) => ({ have: s.sessions, need: 50 }) },
  },
  {
    id: 'orrin',
    name: 'Orrin',
    emblem: 'banner',
    // Was "Starts every boss one phase down" — see Marrow.
    ability: '+50% XP from boss stops',
    effect: 'xpBoss',
    tint: LOCKED_TINT,
    unlock: { label: 'Beat 15 bosses', measure: (s) => ({ have: bossesBeaten(s), need: 15 }) },
  },
];

/** The starter set, owned from the first session. */
export const STARTER_COMPANION_ID = 'mira';

/**
 * The roster, with each companion's real standing.
 *
 * Sorted owned-first, then by how close the unlock is — so the next thing
 * within reach sits at the top of the locked half rather than wherever the
 * list happened to declare it.
 */
export function companionsFor(s: CompanionState): CompanionStatus[] {
  return COMPANIONS.map((c) => {
    if (!c.unlock) return { ...c, owned: true, have: 0, need: 0 };
    const { have, need } = c.unlock.measure(s);
    return { ...c, owned: have >= need, have, need };
  }).sort((a, b) => {
    if (a.owned !== b.owned) return a.owned ? -1 : 1;
    if (a.owned) return 0;
    return b.have / b.need - a.have / a.need;
  });
}

/** The line on a locked card: the condition, and how far along it is. */
export function unlockLabel(c: CompanionStatus): string {
  if (c.owned) return 'Owned';
  return c.unlock ? c.unlock.label : 'Locked';
}

export const companionById = (id: string | null): Companion | undefined =>
  COMPANIONS.find((c) => c.id === id);
