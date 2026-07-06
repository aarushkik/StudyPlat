import type { AccentName } from '@/theme';

/**
 * Course subject family. Drives which "what you'll achieve" copy and which
 * placement questions a course uses.
 */
export type CourseCategory = 'stem' | 'history' | 'english';

/** An AP course the student can study. */
export interface APCourse {
  id: string;
  /** Full name, e.g. "AP Biology" (used in "How much AP Biology do you know?"). */
  name: string;
  /** Compact label for tight spaces, e.g. "Biology". */
  shortName: string;
  emoji: string;
  blurb: string;
  accent: AccentName;
  category: CourseCategory;
}
