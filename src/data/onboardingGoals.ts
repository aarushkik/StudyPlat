import type { Achievement, CourseCategory, DailyGoal, ExperienceLevel } from '@/types';

/** Screen 1 — how much of the subject the student already knows. */
export const experienceLevels: ExperienceLevel[] = [
  { id: 'new', label: 'I’m new to this course', bars: 1 },
  { id: 'basic', label: 'I know some basic ideas', bars: 2 },
  { id: 'several_units', label: 'I understand several units', bars: 3 },
  { id: 'ap_questions', label: 'I can handle AP-style questions', bars: 4 },
  { id: 'exam_ready', label: 'I’m almost exam-ready', bars: 5 },
];

/** Screen 2 — daily study-time commitment. */
export const dailyGoals: DailyGoal[] = [
  { id: '5', minutes: 5, tag: 'Casual' },
  { id: '10', minutes: 10, tag: 'Regular' },
  { id: '15', minutes: 15, tag: 'Serious' },
  { id: '20', minutes: 20, tag: 'Intense' },
  { id: '30', minutes: 30, tag: 'Exam grind' },
];

/**
 * Screen 3 — "what you can achieve in 3 months", tailored per subject family.
 * Icons are Ionicons names.
 */
export const achievementsByCategory: Record<CourseCategory, Achievement[]> = {
  stem: [
    { icon: 'layers-outline', title: 'Build strong unit foundations', description: 'Learn the core concepts step by step.' },
    { icon: 'construct-outline', title: 'Practice AP-style problems', description: 'Get used to the way AP questions are written.' },
    { icon: 'rocket-outline', title: 'Get ready for test day', description: 'Review weak areas with smart practice and boss battles.' },
  ],
  history: [
    { icon: 'book-outline', title: 'Master key ideas and terms', description: 'Build the foundation you need for each unit.' },
    { icon: 'documents-outline', title: 'Practice source-based questions', description: 'Learn how to read, reason, and answer like AP expects.' },
    { icon: 'ribbon-outline', title: 'Build exam confidence', description: 'Review weak areas with smart practice and boss battles.' },
  ],
  english: [
    { icon: 'reader-outline', title: 'Read with purpose', description: 'Learn how to break down passages and prompts.' },
    { icon: 'create-outline', title: 'Build stronger responses', description: 'Practice evidence, reasoning, and structure.' },
    { icon: 'rocket-outline', title: 'Prepare for exam day', description: 'Review weak skills with smart practice and boss battles.' },
  ],
};
