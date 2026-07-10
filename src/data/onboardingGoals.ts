import type { Achievement, CourseCategory, ExamTimeframe, ExperienceLevel, ScoreGoal } from '@/types';

/** Screen 1 — how much of the subject the student already knows. */
export const experienceLevels: ExperienceLevel[] = [
  { id: 'new', label: 'Total beginner — teach me everything', bars: 1 },
  { id: 'basic', label: 'I know a few bits and pieces', bars: 2 },
  { id: 'several_units', label: 'I’ve got several units down', bars: 3 },
  { id: 'ap_questions', label: 'I can take on AP-style questions', bars: 4 },
  { id: 'exam_ready', label: 'I’m basically exam-ready', bars: 5 },
];

/** Screen 2 — the AP score the student is chasing. */
export const scoreGoals: ScoreGoal[] = [
  { id: 'score5', label: 'A 5 — go for the top', description: 'Aim for the highest AP score.' },
  { id: 'score4', label: 'A 4 or higher', description: 'A strong, college-ready score.' },
  { id: 'score3', label: 'A 3 or higher', description: 'Pass and earn credit.' },
  { id: 'grade', label: 'Boost my class grade', description: 'Do better in the class itself.' },
  { id: 'unsure', label: 'Not sure yet', description: 'Stu will help you aim.' },
];

/** Screen 3 — when the AP exam is happening. */
export const examTimeframes: ExamTimeframe[] = [
  { id: 'this_spring', label: 'This spring', description: 'Exam season is around the corner.' },
  { id: 'next_year', label: 'Next year', description: 'Plenty of runway to prep.' },
  { id: 'for_class', label: 'Just for my class', description: 'Studying alongside coursework.' },
  { id: 'unsure', label: 'Not sure yet', description: 'No pressure — we’ll pace it.' },
];

/**
 * Screen 3 — the "quest ahead" milestones, tailored per subject family.
 * Icons are Ionicons names.
 */
export const achievementsByCategory: Record<CourseCategory, Achievement[]> = {
  stem: [
    { icon: 'layers-outline', title: 'Master the core concepts', description: 'Lock in the ideas every unit builds on.' },
    { icon: 'construct-outline', title: 'Train on AP-style problems', description: 'Get fluent in how the exam actually asks things.' },
    { icon: 'rocket-outline', title: 'Gear up for test day', description: 'Crush weak spots with smart review and boss battles.' },
  ],
  history: [
    { icon: 'book-outline', title: 'Master the key ideas', description: 'Build the foundation every unit needs.' },
    { icon: 'documents-outline', title: 'Decode source-based questions', description: 'Read, reason, and answer like the AP wants.' },
    { icon: 'ribbon-outline', title: 'Build exam-day confidence', description: 'Crush weak spots with smart review and boss battles.' },
  ],
  english: [
    { icon: 'reader-outline', title: 'Read like a detective', description: 'Break down passages and prompts with ease.' },
    { icon: 'create-outline', title: 'Sharpen your arguments', description: 'Nail evidence, reasoning, and structure.' },
    { icon: 'rocket-outline', title: 'Gear up for test day', description: 'Crush weak skills with smart review and boss battles.' },
  ],
};
