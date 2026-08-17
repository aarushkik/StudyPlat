import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { getQuestMap, headStartFor } from '@/data/questMap';
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
   */
  recordSession: (earnedXp: number, nodeId?: string) => void;
  /** The day the last session was banked, as YYYY-MM-DD. */
  lastSessionOn: string | null;
  /** Adopt a stored profile. Called once per sign-in by `ProfileSync`. */
  hydrate: (next: {
    xp?: number;
    gems?: number;
    streakDays?: number;
    completedStops?: string[];
    lastSessionOn?: string | null;
  }) => void;
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
  // `recordSession` must read the latest value without re-creating itself on
  // every session; a stale closure here silently freezes the streak.
  const lastSessionOnRef = useRef<string | null>(null);

  const completed = useMemo(() => [...seeded, ...earned], [seeded, earned]);
  const completedSet = useMemo(() => new Set(completed), [completed]);

  const currentNodeId = useMemo(
    () => map.order.find((id) => !completedSet.has(id)) ?? null,
    [map, completedSet],
  );

  const stateOf = useCallback(
    (nodeId: string): QuestNodeState => {
      if (completedSet.has(nodeId)) return 'complete';
      return nodeId === currentNodeId ? 'current' : 'locked';
    },
    [completedSet, currentNodeId],
  );

  const recordSession = useCallback((earnedXp: number, nodeId?: string) => {
    if (nodeId) setEarned((prev) => (prev.includes(nodeId) ? prev : [...prev, nodeId]));
    setXp((prev) => prev + earnedXp);
    // Gems are the slower currency: one per session, whether or not it cleared
    // a stop, so practice is worth something too.
    setGems((prev) => prev + 1);
    setTodayCount((prev) => prev + 1);

    // The streak rule lives in one place; see `nextStreak`.
    const today = todayKey();
    setStreakDays((prev) => nextStreak(prev, lastSessionOnRef.current, today));
    lastSessionOnRef.current = today;
    setLastSessionOn(today);
  }, []);

  const hydrate = useCallback(
    (next: {
      xp?: number;
      gems?: number;
      streakDays?: number;
      completedStops?: string[];
      lastSessionOn?: string | null;
    }) => {
      if (next.xp !== undefined) setXp(next.xp);
      if (next.gems !== undefined) setGems(next.gems);
      if (next.streakDays !== undefined) setStreakDays(next.streakDays);
      if (next.completedStops !== undefined) setEarned(next.completedStops);
      if (next.lastSessionOn !== undefined) {
        setLastSessionOn(next.lastSessionOn);
        lastSessionOnRef.current = next.lastSessionOn;
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
      recordSession,
      hydrate,
      reset,
    }),
    [map, completed, earned, currentNodeId, stateOf, xp, gems, streakDays, todayCount, lastSessionOn, recordSession, hydrate, reset],
  );

  return <QuestContext.Provider value={value}>{children}</QuestContext.Provider>;
}

/** Access quest progress. Must be used under <QuestProvider>. */
export function useQuest(): QuestContextValue {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error('useQuest must be used within a QuestProvider');
  return ctx;
}
