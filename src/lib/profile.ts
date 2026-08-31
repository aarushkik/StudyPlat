import { isSupabaseConfigured, supabase } from './supabase';

/**
 * One row per signed-in student.
 *
 * Deliberately flat and small: the map itself is generated from the course id,
 * so the only thing worth storing is *which* course and *what has been
 * cleared*. Storing the generated map would mean a schema migration every time
 * a unit title changes.
 *
 * Snake case here matches the column names exactly, so the mapping to and from
 * the app's camel case happens in one place rather than at every call site.
 */
export interface ProfileRow {
  id: string;
  course_id: string | null;
  experience_level_id: string | null;
  goal_score_id: string | null;
  exam_timeframe_id: string | null;
  placement_level_id: string | null;
  onboarded: boolean;
  xp: number;
  gems: number;
  streak_days: number;
  last_session_on: string | null;
  completed_stops: string[];
  /** Per-skill tally as JSON: { [skillTag]: { seen, correct } }. */
  skills: Record<string, { seen: number; correct: number }> | null;
  sessions: number;
  perfect_sessions: number;
  best_streak: number;
  equipped_companion: string | null;
  streak_shield_used: boolean;
}

/** The same thing in the shape the app's contexts use. */
export interface Profile {
  courseId: string | null;
  experienceLevelId: string | null;
  goalScoreId: string | null;
  examTimeframeId: string | null;
  placementLevelId: string | null;
  onboarded: boolean;
  xp: number;
  gems: number;
  streakDays: number;
  lastSessionOn: string | null;
  completedStops: string[];
  skills: Record<string, { seen: number; correct: number }>;
  sessions: number;
  perfectSessions: number;
  bestStreak: number;
  equippedId: string | null;
  streakShieldUsed: boolean;
}

export const EMPTY_PROFILE: Profile = {
  courseId: null,
  experienceLevelId: null,
  goalScoreId: null,
  examTimeframeId: null,
  placementLevelId: null,
  onboarded: false,
  xp: 0,
  gems: 0,
  streakDays: 0,
  lastSessionOn: null,
  completedStops: [],
  skills: {},
  sessions: 0,
  perfectSessions: 0,
  bestStreak: 0,
  equippedId: null,
  streakShieldUsed: false,
};

function fromRow(row: ProfileRow): Profile {
  return {
    courseId: row.course_id,
    experienceLevelId: row.experience_level_id,
    goalScoreId: row.goal_score_id,
    examTimeframeId: row.exam_timeframe_id,
    placementLevelId: row.placement_level_id,
    onboarded: row.onboarded,
    xp: row.xp ?? 0,
    gems: row.gems ?? 0,
    streakDays: row.streak_days ?? 0,
    lastSessionOn: row.last_session_on,
    completedStops: row.completed_stops ?? [],
    skills: row.skills ?? {},
    sessions: row.sessions ?? 0,
    perfectSessions: row.perfect_sessions ?? 0,
    bestStreak: row.best_streak ?? 0,
    equippedId: row.equipped_companion ?? null,
    streakShieldUsed: row.streak_shield_used ?? false,
  };
}

function toRow(userId: string, p: Partial<Profile>): Partial<ProfileRow> & { id: string } {
  const row: Partial<ProfileRow> & { id: string } = { id: userId };
  if ('courseId' in p) row.course_id = p.courseId ?? null;
  if ('experienceLevelId' in p) row.experience_level_id = p.experienceLevelId ?? null;
  if ('goalScoreId' in p) row.goal_score_id = p.goalScoreId ?? null;
  if ('examTimeframeId' in p) row.exam_timeframe_id = p.examTimeframeId ?? null;
  if ('placementLevelId' in p) row.placement_level_id = p.placementLevelId ?? null;
  if ('onboarded' in p) row.onboarded = Boolean(p.onboarded);
  if ('xp' in p) row.xp = p.xp ?? 0;
  if ('gems' in p) row.gems = p.gems ?? 0;
  if ('streakDays' in p) row.streak_days = p.streakDays ?? 0;
  if ('lastSessionOn' in p) row.last_session_on = p.lastSessionOn ?? null;
  if ('completedStops' in p) row.completed_stops = p.completedStops ?? [];
  if ('skills' in p) row.skills = p.skills ?? {};
  if ('sessions' in p) row.sessions = p.sessions ?? 0;
  if ('perfectSessions' in p) row.perfect_sessions = p.perfectSessions ?? 0;
  if ('bestStreak' in p) row.best_streak = p.bestStreak ?? 0;
  if ('equippedId' in p) row.equipped_companion = p.equippedId ?? null;
  if ('streakShieldUsed' in p) row.streak_shield_used = p.streakShieldUsed ?? false;
  return row;
}

/**
 * Read a student's profile.
 *
 * Returns `null` when there is no row yet — a first sign-in — which the caller
 * reads as "send them through onboarding". A *failed* read also returns null
 * but sets `ok: false`, because those two cases must not be confused: treating
 * a network failure as a new user would wipe a real profile on the next save.
 */
export async function fetchProfile(userId: string): Promise<{ ok: boolean; profile: Profile | null }> {
  if (!isSupabaseConfigured) return { ok: false, profile: null };

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) return { ok: false, profile: null };
  return { ok: true, profile: data ? fromRow(data as ProfileRow) : null };
}

/** Create or update the row. Only the keys present in `patch` are written. */
export async function saveProfile(userId: string, patch: Partial<Profile>): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const { error } = await supabase.from('profiles').upsert(toRow(userId, patch), { onConflict: 'id' });
  return !error;
}

/**
 * Advance the streak for a session finished today.
 *
 * Kept here rather than in the UI so the rule is written once: same day is a
 * no-op, the next day increments, and any longer gap starts again at one.
 * Dates are compared as plain YYYY-MM-DD in the device's own zone, which is
 * what a student means by "today".
 *
 * `shieldDays` is how many missed days an equipped companion covers — Ember
 * one, Fen two. A shielded gap continues the streak *at its length*, adding
 * nothing: the shield is protection, not a free day, and a student who skipped
 * Tuesday should not come back to a longer streak than one who did not.
 * Whether the shield is then spent is the caller's decision, because only the
 * caller knows if it had one left.
 */
export function nextStreak(
  streakDays: number,
  lastSessionOn: string | null,
  today: string,
  shieldDays = 0,
): number {
  if (lastSessionOn === today) return Math.max(1, streakDays);
  if (!lastSessionOn) return 1;

  const gap = Math.round(
    (Date.parse(`${today}T00:00:00`) - Date.parse(`${lastSessionOn}T00:00:00`)) / 86_400_000,
  );
  if (gap === 1) return streakDays + 1;
  // A gap of two is one missed day, so the shield covers `shieldDays + 1`.
  if (gap > 1 && gap <= shieldDays + 1) return Math.max(1, streakDays);
  return 1;
}

/** Today as YYYY-MM-DD in the device's timezone. */
export function todayKey(d = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
