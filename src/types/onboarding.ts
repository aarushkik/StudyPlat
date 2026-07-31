import type { GlyphName } from '@/components/icons/Glyph';
import type { PlacementLevelId } from './quiz';

/** How much the student already knows about the chosen subject. */
export type ExperienceLevelId = 'new' | 'basic' | 'several_units' | 'ap_questions' | 'exam_ready';

export interface ExperienceLevel {
  id: ExperienceLevelId;
  label: string;
  /** Plain-language read on what the level means, shown under the label. */
  hint: string;
  /** 1–5 filled bars shown as the level icon. */
  bars: number;
}

/** The AP score the student is aiming for. */
export type ScoreGoalId = 'score5' | 'score4' | 'score3' | 'grade' | 'unsure';

export interface ScoreGoal {
  id: ScoreGoalId;
  label: string;
  description: string;
}

/** When the student plans to take the AP exam. */
export type ExamTimeframeId = 'this_spring' | 'next_year' | 'for_class' | 'unsure';

export interface ExamTimeframe {
  id: ExamTimeframeId;
  label: string;
  description: string;
}

/** How the student wants to begin the course. */
export type StartChoice = 'scratch' | 'find_level';

/** One "quest ahead" milestone on the preview screen. */
export interface Achievement {
  icon: GlyphName;
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
  goalScoreId: ScoreGoalId | null;
  examTimeframeId: ExamTimeframeId | null;
  startChoice: StartChoice | null;
  placementLevelId: PlacementLevelId | null;
}
