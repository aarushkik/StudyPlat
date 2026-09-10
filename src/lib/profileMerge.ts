import type { Profile } from './profile';

/** Preserve offline work when another device advanced the cloud profile. */
export function mergeProfile(local: Profile, baseline: Profile | null, remote: Profile): Profile {
  if (!baseline) return local;
  if (local.courseId && remote.courseId && local.courseId !== remote.courseId) return local;
  const next = { ...remote };
  const settings = ['courseId', 'experienceLevelId', 'goalScoreId', 'examTimeframeId', 'placementLevelId', 'equippedId'] as const;
  for (const key of settings) if (local[key] !== baseline[key]) next[key] = local[key];
  for (const key of ['xp', 'gems', 'sessions', 'perfectSessions'] as const) {
    next[key] = remote[key] + Math.max(0, local[key] - baseline[key]);
  }
  next.onboarded = local.onboarded || remote.onboarded;
  next.completedStops = [...new Set([...remote.completedStops, ...local.completedStops])];
  next.bestStreak = Math.max(local.bestStreak, remote.bestStreak);
  next.skills = { ...remote.skills };
  for (const [key, value] of Object.entries(local.skills)) {
    const before = baseline.skills[key] ?? { seen: 0, correct: 0 };
    const server = remote.skills[key] ?? { seen: 0, correct: 0 };
    next.skills[key] = {
      seen: server.seen + Math.max(0, value.seen - before.seen),
      correct: server.correct + Math.max(0, value.correct - before.correct),
    };
  }
  if ((local.lastSessionOn ?? '') >= (remote.lastSessionOn ?? '')) {
    next.lastSessionOn = local.lastSessionOn;
    next.streakDays = local.streakDays;
    next.streakShieldUsed = local.streakShieldUsed;
    next.todayCount = local.lastSessionOn === remote.lastSessionOn
      ? (remote.todayCount ?? 0) + Math.max(0, (local.todayCount ?? 0) - (baseline.lastSessionOn === local.lastSessionOn ? baseline.todayCount ?? 0 : 0))
      : local.todayCount;
  }
  return next;
}

/** An explicit guest upgrade adds only the local quest that has not been
 * imported before. A different existing course is left intact. */
export function mergeGuestProfile(guest: Profile, remote: Profile, empty: Profile): Profile | null {
  if (!guest.courseId) return remote;
  if (remote.onboarded && remote.courseId && remote.courseId !== guest.courseId) return null;
  return mergeProfile(guest, empty, remote);
}
