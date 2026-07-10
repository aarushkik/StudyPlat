/**
 * Correct-answer streak (combo) logic.
 *
 * Milestones fire every 5 in a row (5, 10, 15, 20, …) and the helpers are
 * open-ended, so longer practice sessions and lessons keep celebrating higher
 * streaks without any changes here.
 */

/** Milestones happen every STREAK_STEP correct answers. */
export const STREAK_STEP = 5;

/** The streak badge appears once the streak reaches this count. */
export const STREAK_VISIBLE_THRESHOLD = 2;

/** True when `streak` is a celebration milestone (5, 10, 15, …). */
export function isStreakMilestone(streak: number): boolean {
  return streak >= STREAK_STEP && streak % STREAK_STEP === 0;
}

/** Label shown in the badge / overlay, e.g. "5 IN A ROW". */
export function getStreakMilestoneLabel(streak: number): string {
  return `${streak} IN A ROW`;
}

/** The next milestone strictly above `streak` (e.g. 0 → 5, 5 → 10, 7 → 10). */
export function getNextStreakMilestone(streak: number): number {
  return Math.floor(streak / STREAK_STEP) * STREAK_STEP + STREAK_STEP;
}
