/** Calendar days in the student's timezone, independent of DST day lengths. */
export function todayKey(date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function dayNumber(key: string | null): number | null {
  if (!key || !/^\d{4}-\d{2}-\d{2}$/.test(key)) return null;
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date.getTime() / 86_400_000;
}

export function daysBetween(previous: string | null, next: string): number | null {
  const before = dayNumber(previous);
  const after = dayNumber(next);
  return before === null || after === null ? null : after - before;
}

export function nextStreak(streakDays: number, lastSessionOn: string | null, today: string, shieldDays = 0): number {
  const streak = Math.max(0, Math.floor(Number.isFinite(streakDays) ? streakDays : 0));
  const gap = daysBetween(lastSessionOn, today);
  if (gap === null || streak === 0) return 1;
  // Changing timezone or setting the clock back must not manufacture days.
  if (gap <= 0) return Math.max(1, streak);
  if (gap === 1) return streak + 1;
  if (gap <= Math.max(0, shieldDays) + 1) return Math.max(1, streak);
  return 1;
}

/** A streak stays visible while the student can still continue it today. */
export function visibleStreak(streakDays: number, lastSessionOn: string | null, today: string, shieldDays = 0): number {
  const gap = daysBetween(lastSessionOn, today);
  if (gap === null || gap > 1 + Math.max(0, shieldDays)) return 0;
  return Math.max(0, streakDays);
}
