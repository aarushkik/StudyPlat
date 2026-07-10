import { apCourses } from './apCourses';
import { examTimeframes, experienceLevels, scoreGoals } from './onboardingGoals';

export { apCourses } from './apCourses';
export { experienceLevels, scoreGoals, examTimeframes, achievementsByCategory } from './onboardingGoals';
export { getPlacementQuiz, PLACEMENT_LEVELS } from './placementQuestions';

/** Look up a course by id. */
export const getCourse = (id: string | null) => apCourses.find((c) => c.id === id);

/** Look up an experience level by id. */
export const getExperienceLevel = (id: string | null) =>
  experienceLevels.find((e) => e.id === id);

/** Look up a score goal by id. */
export const getScoreGoal = (id: string | null) => scoreGoals.find((g) => g.id === id);

/** Look up an exam timeframe by id. */
export const getExamTimeframe = (id: string | null) => examTimeframes.find((t) => t.id === id);
