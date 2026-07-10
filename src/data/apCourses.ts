import type { APCourse } from '@/types';

/**
 * Mock AP course catalog. Single source of truth for course selection and for
 * driving category-specific onboarding copy + placement quizzes. Each course
 * renders a custom `CourseIcon` (see `components/icons`) keyed by id. Swap for
 * an API response later with no UI change.
 */
export const apCourses: APCourse[] = [
  { id: 'ap-biology', name: 'AP Biology', shortName: 'Biology', blurb: 'Cells, genetics & life', accent: 'green', category: 'stem' },
  { id: 'ap-calc-ab', name: 'AP Calculus AB', shortName: 'Calculus', blurb: 'Limits, derivatives & integrals', accent: 'violet', category: 'stem' },
  { id: 'ap-world', name: 'AP World History', shortName: 'World History', blurb: 'Empires, trade & change', accent: 'coral', category: 'history' },
  { id: 'ap-us-history', name: 'AP U.S. History', shortName: 'U.S. History', blurb: 'Founding to modern America', accent: 'amber', category: 'history' },
  { id: 'ap-csa', name: 'AP Computer Science A', shortName: 'CS A', blurb: 'Java, objects & algorithms', accent: 'sky', category: 'stem' },
  { id: 'ap-chem', name: 'AP Chemistry', shortName: 'Chemistry', blurb: 'Atoms, bonds & reactions', accent: 'lime', category: 'stem' },
  { id: 'ap-psych', name: 'AP Psychology', shortName: 'Psychology', blurb: 'Mind, brain & behavior', accent: 'pink', category: 'history' },
  { id: 'ap-eng-lang', name: 'AP English Language', shortName: 'English Lang', blurb: 'Rhetoric & argument', accent: 'gold', category: 'english' },
];
