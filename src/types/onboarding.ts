import type { PlacementLevelId } from './quiz';

/** How much the student already knows about the chosen subject. */
export type ExperienceLevelId = 'new' | 'basic' | 'several_units' | 'ap_questions' | 'exam_ready';

export interface ExperienceLevel {
  id: ExperienceLevelId;
  label: string;
  /** 1–5 filled bars shown as the level icon. */
  bars: number;
}

/** Daily study-time commitment. */
export type DailyGoalId = '5' | '10' | '15' | '20' | '30';

export interface DailyGoal {
  id: DailyGoalId;
  minutes: number;
  /** Trailing descriptor, e.g. "Regular". */
  tag: string;
}

/** How the student wants to begin the course. */
export type StartChoice = 'scratch' | 'find_level';

/** One "what you'll achieve" row on the preview screen. */
export interface Achievement {
  /** Ionicons name for the row's icon. */
  icon: string;
  title: string;
  description: string;
}

/**
 * All onboarding choices for the session. Lives in OnboardingContext and is
 * read by the placeholder home screen. Serializable, so it maps cleanly onto a
 * saved profile later.
 */
export interface OnboardingState {
  courseId: string | null;
  experienceLevelId: ExperienceLevelId | null;
  dailyGoalId: DailyGoalId | null;
  startChoice: StartChoice | null;
  placementLevelId: PlacementLevelId | null;
}
