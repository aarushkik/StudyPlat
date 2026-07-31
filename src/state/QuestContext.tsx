import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getQuestMap, headStartFor } from '@/data/questMap';
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
 * In-memory by design for this milestone — this is the seam where persistence
 * or a backend profile plugs in without touching a single screen.
 */
interface QuestContextValue {
  map: QuestMap;
  /** Cleared node ids. */
  completed: string[];
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
  const [todayCount, setTodayCount] = useState(0);

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
    setTodayCount((prev) => prev + 1);
  }, []);

  const value = useMemo<QuestContextValue>(
    () => ({
      map,
      completed,
      currentNodeId,
      stateOf,
      xp,
      // Gems are a slower currency: one per cleared stop, on top of the seed.
      gems: 12 + completed.length,
      streakDays: 1 + todayCount,
      todayCount,
      dailyGoal: 3,
      recordSession,
    }),
    [map, completed, currentNodeId, stateOf, xp, todayCount, recordSession],
  );

  return <QuestContext.Provider value={value}>{children}</QuestContext.Provider>;
}

/** Access quest progress. Must be used under <QuestProvider>. */
export function useQuest(): QuestContextValue {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error('useQuest must be used within a QuestProvider');
  return ctx;
}
