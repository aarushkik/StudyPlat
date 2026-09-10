import { apCourses } from '@/data/apCourses';
import type { OnboardingState } from '@/types/onboarding';

/** Validate stored enum strings before they reach indexed UI data. */
export function sanitizeOnboarding(value: OnboardingState): OnboardingState {
  const oneOf = <T extends string>(candidate: T | null, choices: readonly T[]): T | null =>
    candidate !== null && choices.includes(candidate) ? candidate : null;
  return {
    courseId: apCourses.some((course) => course.id === value.courseId) ? value.courseId : null,
    experienceLevelId: oneOf(value.experienceLevelId, ['new', 'basic', 'several_units', 'ap_questions', 'exam_ready']),
    goalScoreId: oneOf(value.goalScoreId, ['score5', 'score4', 'score3', 'grade', 'unsure']),
    examTimeframeId: oneOf(value.examTimeframeId, ['this_spring', 'next_year', 'for_class', 'unsure']),
    startChoice: oneOf(value.startChoice, ['scratch', 'find_level']),
    placementLevelId: oneOf(value.placementLevelId, ['beginner', 'builder', 'ap_ready', 'advanced_review']),
  };
}
