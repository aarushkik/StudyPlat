import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getQuestMap, headStartFor } from '@/data/questMap';
import {
  companionById,
  companionsFor,
  STARTER_COMPANION_ID,
  type CompanionEffect,
  type CompanionStatus,
} from '@/data/companions';
import { nextStreak, todayKey } from '@/lib/profile';
import type { QuestMap, QuestNodeState } from '@/types/quest';
import { useOnboarding } from './OnboardingContext';

/**
 * Progress along the quest map for the current session.
 *
 * The trail is walked in order, so progress is just the set of cleared node
 * ids: a node is complete if it's in the set, *current* if it's the first one
 * that isn't, and locked after that. Keeping it derived means the map can never
 * show two "start here" nodes or strand a reachable one behind a locked gate.
 *
 * State is held here and mirrored to the student's Supabase profile by
 * `ProfileSync`, which hydrates this provider on sign-in and writes changes
 * back. Nothing in a screen knows about the network.
 */
/** One question's outcome, reduced to what is worth keeping. */
export interface AnswerOutcome {
  skillTag: string;
  correct: boolean;
}

/** How many of each skill have been seen and got right. */
export type SkillTally = Record<string, { seen: number; correct: number }>;

/** Everything `ProfileSync` can restore. Every field optional and additive. */
export interface QuestHydration {
  xp?: number;
  gems?: number;
  streakDays?: number;
  completedStops?: string[];
  lastSessionOn?: string | null;
  skills?: SkillTally;
  sessions?: number;
  perfectSessions?: number;
  bestStreak?: number;
  equippedId?: string | null;
  streakShieldUsed?: boolean;
}

interface QuestContextValue {
  map: QuestMap;
  /** Cleared node ids — the placement head start plus everything played. */
  completed: string[];
  /**
   * Only the stops this student actually played. This is what gets persisted:
   * the head start is recomputed from the placement level on load, so saving
   * it too would double-count it on every sign-in.
   */
  earned: string[];
  /** The node the student should tap next, or null once the map is finished. */
  currentNodeId: string | null;
  stateOf: (nodeId: string) => QuestNodeState;
  xp: number;
  gems: number;
  streakDays: number;
  /** Lessons finished today, against the daily goal. */
  todayCount: number;
  dailyGoal: number;
  /**
   * Bank a finished session. Pass the stop's id to clear it on the map; drills
   * from the training ground have no id and only contribute XP and streak.
   *
   * `answers` is what a session actually got right and wrong, by skill. It is
   * the only source for the weakest-category list and for every achievement
   * that counts accuracy, so a session that forgets to pass it silently stops
   * the app learning anything about the student.
   */
  recordSession: (earnedXp: number, nodeId?: string, answers?: AnswerOutcome[]) => void;
  /** Per-skill tally, keyed by the question's `skillTag`. */
  skills: SkillTally;
  /** Sessions finished, ever. */
  sessions: number;
  /** Sessions finished with nothing wrong. */
  perfectSessions: number;
  /** The longest streak ever reached, which the current one may be below. */
  bestStreak: number;
  /** The day the last session was banked, as YYYY-MM-DD. */
  lastSessionOn: string | null;
  /**
   * The roster with each companion's real standing — owned, and how far along
   * the unlock is. Derived, so beating a fifth boss unlocks Marrow the moment
   * it happens rather than never.
   */
  companions: CompanionStatus[];
  /** The equipped companion's id. Always one this student owns. */
  equippedId: string;
  /** Equip an owned companion. Ignored for one that is still locked. */
  equip: (id: string) => void;
  /**
   * What the equipped companion changes, or null.
   *
   * The quiz reads this to decide whether to offer a hint, a retry, an
   * elimination or a re-ask; `recordSession` reads it for everything that
   * changes what a session pays. One value rather than a set of booleans
   * because exactly one companion is equipped at a time.
   */
  ability: CompanionEffect | null;
  /** True once a shield has covered a missed day in the current streak. */
  streakShieldUsed: boolean;
  /** Adopt a stored profile. Called once per sign-in by `ProfileSync`. */
  hydrate: (next: QuestHydration) => void;
  /** Drop everything, for sign-out. */
  reset: () => void;
}

const QuestContext = createContext<QuestContextValue | null>(null);

export function QuestProvider({ children }: { children: React.ReactNode }) {
  const { courseId, placementLevelId } = useOnboarding();
  const map = useMemo(() => getQuestMap(courseId), [courseId]);

  // Placement decides where the trail opens; everything before that is history.
  const seeded = useMemo(
    () => map.order.slice(0, headStartFor(placementLevelId)),
    [map, placementLevelId],
  );

  const [earned, setEarned] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [gems, setGems] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [lastSessionOn, setLastSessionOn] = useState<string | null>(null);
  const [todayCount, setTodayCount] = useState(0);
  const [skills, setSkills] = useState<SkillTally>({});
  const [sessions, setSessions] = useState(0);
  const [perfectSessions, setPerfectSessions] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [equippedRaw, setEquippedRaw] = useState<string>(STARTER_COMPANION_ID);
  const [streakShieldUsed, setStreakShieldUsed] = useState(false);
  // `recordSession` must read the latest value without re-creating itself on
  // every session; a stale closure here silently freezes the streak.
  const lastSessionOnRef = useRef<string | null>(null);
  // Same reason: the streak rule below needs the live ability and shield state
  // without `recordSession` being rebuilt — and re-created every time either
  // changes, it would go stale mid-session.
  const abilityRef = useRef<CompanionEffect | null>(null);
  const shieldDaysRef = useRef(0);
  const shieldUsedRef = useRef(false);

  const completed = useMemo(() => [...seeded, ...earned], [seeded, earned]);
  const completedSet = useMemo(() => new Set(completed), [completed]);

  const currentNodeId = useMemo(
    () => map.order.find((id) => !completedSet.has(id)) ?? null,
    [map, completedSet],
  );

  const companions = useMemo(
    () => companionsFor({ completed, map, skills, bestStreak, sessions }),
    [completed, map, skills, bestStreak, sessions],
  );

  /**
   * The equipped companion, resolved against what is actually owned.
   *
   * Unlocks are derived from progress, and progress can move backwards on
   * sign-out or a fresh device. Falling back to the starter rather than
   * trusting the stored id means a session can never be running an ability the
   * student no longer has.
   */
  const equippedId = useMemo(() => {
    const owned = companions.find((c) => c.id === equippedRaw && c.owned);
    return owned ? owned.id : STARTER_COMPANION_ID;
  }, [companions, equippedRaw]);

  const equipped = useMemo(() => companionById(equippedId), [equippedId]);
  const ability = equipped?.effect ?? null;

  // Kept in refs for `recordSession`, which must not be rebuilt per change or
  // it goes stale mid-session. Written in an effect rather than during render:
  // a ref mutated while rendering is read by whichever pass happens to run
  // last, which under a double render is not necessarily the committed one.
  useEffect(() => {
    abilityRef.current = ability;
    shieldDaysRef.current = equipped?.shieldDays ?? 0;
  }, [ability, equipped]);

  useEffect(() => {
    shieldUsedRef.current = streakShieldUsed;
  }, [streakShieldUsed]);

  const equip = useCallback(
    (id: string) => {
      setEquippedRaw((prev) => (companions.some((c) => c.id === id && c.owned) ? id : prev));
    },
    [companions],
  );

  const stateOf = useCallback(
    (nodeId: string): QuestNodeState => {
      if (completedSet.has(nodeId)) return 'complete';
      return nodeId === currentNodeId ? 'current' : 'locked';
    },
    [completedSet, currentNodeId],
  );

  const recordSession = useCallback((earnedXp: number, nodeId?: string, answers: AnswerOutcome[] = []) => {
    if (nodeId) setEarned((prev) => (prev.includes(nodeId) ? prev : [...prev, nodeId]));

    if (answers.length > 0) {
      setSkills((prev) => {
        const next: SkillTally = { ...prev };
        for (const a of answers) {
          const cur = next[a.skillTag] ?? { seen: 0, correct: 0 };
          next[a.skillTag] = { seen: cur.seen + 1, correct: cur.correct + (a.correct ? 1 : 0) };
        }
        return next;
      });
      if (answers.every((a) => a.correct)) setPerfectSessions((p) => p + 1);
    }
    setSessions((s) => s + 1);
    setXp((prev) => prev + earnedXp);
    // Gems are the slower currency: one per session, whether or not it cleared
    // a stop, so practice is worth something too. Pilot and Vesper double it.
    setGems((prev) => prev + (abilityRef.current === 'gems' ? 2 : 1));
    setTodayCount((prev) => prev + 1);

    // The streak rule lives in one place; see `nextStreak`.
    // Compute the new streak once, from the day *before* this session, then
    // use it for both counters. Advancing `lastSessionOn` first would make the
    // second call see "same day" and quietly return the old value.
    const today = todayKey();
    setStreakDays((prev) => {
      const shield =
        abilityRef.current === 'shield' && !shieldUsedRef.current ? shieldDaysRef.current : 0;
      const next = nextStreak(prev, lastSessionOnRef.current, today, shield);
      // A shield is spent only when it actually saved something — when the
      // streak survived a gap it would not have survived unshielded. Spending
      // it on every session would mean it was never there when it mattered.
      if (shield > 0 && next > 1 && nextStreak(prev, lastSessionOnRef.current, today) === 1) {
        setStreakShieldUsed(true);
        shieldUsedRef.current = true;
      }
      // A streak that broke anyway starts clean, shield and all.
      if (next === 1) {
        setStreakShieldUsed(false);
        shieldUsedRef.current = false;
      }
      setBestStreak((best) => Math.max(best, next));
      return next;
    });
    lastSessionOnRef.current = today;
    setLastSessionOn(today);
  }, []);

  const hydrate = useCallback(
    (next: QuestHydration) => {
      if (next.xp !== undefined) setXp(next.xp);
      if (next.gems !== undefined) setGems(next.gems);
      if (next.streakDays !== undefined) setStreakDays(next.streakDays);
      if (next.completedStops !== undefined) setEarned(next.completedStops);
      if (next.lastSessionOn !== undefined) {
        setLastSessionOn(next.lastSessionOn);
        lastSessionOnRef.current = next.lastSessionOn;
      }
      if (next.skills !== undefined) setSkills(next.skills);
      if (next.sessions !== undefined) setSessions(next.sessions);
      if (next.perfectSessions !== undefined) setPerfectSessions(next.perfectSessions);
      if (next.bestStreak !== undefined) setBestStreak(next.bestStreak);
      if (next.equippedId !== undefined) setEquippedRaw(next.equippedId ?? STARTER_COMPANION_ID);
      if (next.streakShieldUsed !== undefined) {
        setStreakShieldUsed(next.streakShieldUsed);
        shieldUsedRef.current = next.streakShieldUsed;
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setEarned([]);
    setXp(0);
    setGems(0);
    setStreakDays(0);
    setTodayCount(0);
    setLastSessionOn(null);
    lastSessionOnRef.current = null;
    setSkills({});
    setSessions(0);
    setPerfectSessions(0);
    setBestStreak(0);
    setEquippedRaw(STARTER_COMPANION_ID);
    setStreakShieldUsed(false);
    shieldUsedRef.current = false;
  }, []);

  const value = useMemo<QuestContextValue>(
    () => ({
      map,
      completed,
      earned,
      currentNodeId,
      stateOf,
      xp,
      gems,
      streakDays,
      todayCount,
      dailyGoal: 3,
      lastSessionOn,
      skills,
      sessions,
      perfectSessions,
      bestStreak,
      companions,
      equippedId,
      equip,
      ability,
      streakShieldUsed,
      recordSession,
      hydrate,
      reset,
    }),
    [map, completed, earned, currentNodeId, stateOf, xp, gems, streakDays, todayCount, lastSessionOn, skills, sessions, perfectSessions, bestStreak, companions, equippedId, equip, ability, streakShieldUsed, recordSession, hydrate, reset],
  );

  return <QuestContext.Provider value={value}>{children}</QuestContext.Provider>;
}

/** Access quest progress. Must be used under <QuestProvider>. */
export function useQuest(): QuestContextValue {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error('useQuest must be used within a QuestProvider');
  return ctx;
}
