import { apCourses } from './apCourses';
import { dailyGoals, experienceLevels } from './onboardingGoals';

export { apCourses } from './apCourses';
export { experienceLevels, dailyGoals, achievementsByCategory } from './onboardingGoals';
export { getPlacementQuiz, PLACEMENT_LEVELS } from './placementQuestions';

/** Look up a course by id. */
export const getCourse = (id: string | null) => apCourses.find((c) => c.id === id);

/** Look up an experience level by id. */
export const getExperienceLevel = (id: string | null) =>
  experienceLevels.find((e) => e.id === id);

/** Look up a daily goal by id. */
export const getDailyGoal = (id: string | null) => dailyGoals.find((g) => g.id === id);
