import type {
  PlacementLevel,
  PlacementQuestion,
  PlacementQuiz,
  QuestionDifficulty,
  Stimulus,
} from '@/types';

/**
 * The question banks, and the placement quiz built on top of them.
 *
 * Original study scaffolding written against each course's published unit
 * outline — not real exam content. Every course carries forty questions, four
 * per unit, each tagged with the unit it belongs to so a stop on the map can
 * ask about the topic on its own plaque rather than about the course at large.
 *
 * The banks themselves live one file per course under `./questions`.
 */

import { apBiologyQuestions } from './questions/apBiology';
import { apCalcABQuestions } from './questions/apCalcAB';
import { apWorldQuestions } from './questions/apWorld';
import { apUSHQuestions } from './questions/apUSH';
import { apCSAQuestions } from './questions/apCSA';
import { apChemQuestions } from './questions/apChem';
import { apPsychQuestions } from './questions/apPsych';
import { apEngLangQuestions } from './questions/apEngLang';

const quizIntros: Record<string, string> = {
  'ap-biology': `Let's see how much AP Biology already lives in your DNA. Answer honestly — this just finds your best starting point.`,
  'ap-calc-ab': `Time to find your limit! A few AP Calculus questions to place you at the right level.`,
  'ap-world': `Let's map your AP World History knowledge across time and place. No pressure — just finding where to start.`,
  'ap-us-history': `A quick tour through American history to place your AP U.S. History journey.`,
  'ap-csa': `Let's trace some code together. A few AP CS A questions to find your starting level.`,
  'ap-chem': `Let's find the right formula for you. A short AP Chemistry check to place your level.`,
  'ap-psych': `Let's explore what you already know about the mind. A quick AP Psychology placement check.`,
  'ap-eng-lang': `Let's read your rhetorical instincts. A short AP English Language placement check.`,
};

const questionsByCourse: Record<string, PlacementQuestion[]> = {
  'ap-biology': apBiologyQuestions,
  'ap-calc-ab': apCalcABQuestions,
  'ap-world': apWorldQuestions,
  'ap-us-history': apUSHQuestions,
  'ap-csa': apCSAQuestions,
  'ap-chem': apChemQuestions,
  'ap-psych': apPsychQuestions,
  'ap-eng-lang': apEngLangQuestions,
};

/** The starting levels a student can be placed into. */
export const PLACEMENT_LEVELS: Record<string, PlacementLevel> = {
  beginner: {
    id: 'beginner',
    title: 'Beginner',
    headline: 'Start at Unit 1 foundations',
    description: 'For students who are new or want a fresh start.',
  },
  builder: {
    id: 'builder',
    title: 'Builder',
    headline: 'Start with early unit lessons and guided practice',
    description: 'For students who know some ideas but need structure.',
  },
  ap_ready: {
    id: 'ap_ready',
    title: 'AP Ready',
    headline: 'Start with AP-style practice and targeted review',
    description: 'For students who understand the course and need exam practice.',
  },
  advanced_review: {
    id: 'advanced_review',
    title: 'Advanced Review',
    headline: 'Start with challenge questions, weak-area review, and boss battles',
    description: 'For students who are close to exam-ready.',
  },
};

/**
 * Get the placement quiz for a course. Falls back to AP Biology so the flow
 * always has questions during development.
 */
export function getPlacementQuiz(courseId: string | null): PlacementQuiz {
  const id = courseId && questionsByCourse[courseId] ? courseId : 'ap-biology';
  return { courseId: id, intro: quizIntros[id], questions: questionsByCourse[id] };
}

/** Deterministic shuffle — the same stop asks the same questions every time. */
function shuffleBy<T>(items: T[], key: string): T[] {
  let a = ([...key].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) * 2654435761) >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * The questions one stop should ask.
 *
 * Its own unit first, so the plaque and the questions agree. A unit holds four
 * and a tier-six boss asks for twelve, so the rest of the course is appended
 * as a fallback — running out mid-session would be worse than a slightly
 * off-topic tail.
 *
 * The selection happens here rather than in the quiz screen because only this
 * function knows where the unit's questions end. Taking a seeded *window* into
 * the combined list, which is what the generic picker does, walks straight
 * past the prefix and asks about the wrong unit.
 */
export function questionsForStop(
  courseId: string | null,
  unit: number,
  count: number,
  key: string,
): PlacementQuestion[] {
  const all = getPlacementQuiz(courseId).questions;
  const own = shuffleBy(all.filter((q) => q.unit === unit), key);
  const rest = shuffleBy(all.filter((q) => q.unit !== unit), key);
  return [...own, ...rest].slice(0, Math.max(1, count));
}

/**
 * The placement quiz samples across the whole course rather than running all
 * forty questions — it is meant to find a level, not to be the course.
 */
export function placementQuestions(courseId: string | null, count = 8): PlacementQuestion[] {
  const all = getPlacementQuiz(courseId).questions;
  const step = Math.max(1, Math.floor(all.length / count));
  const out: PlacementQuestion[] = [];
  for (let i = 0; i < all.length && out.length < count; i += step) out.push(all[i]);
  return out;
}

/**
 * How many questions a session can actually run for this course.
 *
 * The quiz engine draws from a fixed bank and silently clamps to its length,
 * so anything that *displays* a count has to clamp with it. Otherwise a card
 * offering twelve questions opens a quiz that says "1 / 8", and the number the
 * student was shown was never true.
 */
export function drillSize(courseId: string | null, wanted: number): number {
  return Math.max(1, Math.min(wanted, getPlacementQuiz(courseId).questions.length));
}
