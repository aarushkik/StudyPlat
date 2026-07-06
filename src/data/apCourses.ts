import type { APCourse } from '@/types';

/**
 * Mock AP course catalog. Single source of truth for course selection and for
 * driving category-specific onboarding copy + placement quizzes. Swap for an
 * API response later with no UI change.
 */
export const apCourses: APCourse[] = [
  { id: 'ap-biology', name: 'AP Biology', shortName: 'Biology', emoji: '🧬', blurb: 'Cells, genetics & life', accent: 'green', category: 'stem' },
  { id: 'ap-calc-ab', name: 'AP Calculus AB', shortName: 'Calculus', emoji: '📐', blurb: 'Limits, derivatives & integrals', accent: 'violet', category: 'stem' },
  { id: 'ap-world', name: 'AP World History', shortName: 'World History', emoji: '🌍', blurb: 'Empires, trade & change', accent: 'coral', category: 'history' },
  { id: 'ap-us-history', name: 'AP U.S. History', shortName: 'U.S. History', emoji: '🦅', blurb: 'Founding to modern America', accent: 'amber', category: 'history' },
  { id: 'ap-csa', name: 'AP Computer Science A', shortName: 'CS A', emoji: '💻', blurb: 'Java, objects & algorithms', accent: 'sky', category: 'stem' },
  { id: 'ap-chem', name: 'AP Chemistry', shortName: 'Chemistry', emoji: '⚗️', blurb: 'Atoms, bonds & reactions', accent: 'lime', category: 'stem' },
  { id: 'ap-psych', name: 'AP Psychology', shortName: 'Psychology', emoji: '🧠', blurb: 'Mind, brain & behavior', accent: 'pink', category: 'history' },
  { id: 'ap-eng-lang', name: 'AP English Language', shortName: 'English Lang', emoji: '✍️', blurb: 'Rhetoric & argument', accent: 'gold', category: 'english' },
];
