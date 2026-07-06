import type { PlacementLevelId, PlacementQuestion, PlacementResult, QuestionDifficulty } from '@/types';

/**
 * Weighted placement scoring.
 *
 * Harder questions signal more readiness, so correct answers are weighted by
 * difficulty. The final 0–1 score (earned weight / total weight) maps onto a
 * recommended starting level. Simple and transparent by design — easy to tune.
 */
const DIFFICULTY_WEIGHT: Record<QuestionDifficulty, number> = {
  foundation: 1,
  developing: 2,
  ap_ready: 3,
  advanced: 4,
};

/** A record of which questions the student answered correctly. */
export interface AnsweredQuestion {
  question: PlacementQuestion;
  correct: boolean;
}

/** Map a 0–1 weighted score onto a starting level. */
function levelForScore(score: number): PlacementLevelId {
  if (score < 0.3) return 'beginner';
  if (score < 0.55) return 'builder';
  if (score < 0.8) return 'ap_ready';
  return 'advanced_review';
}

/** Score a completed placement quiz into a recommended level. */
export function scorePlacement(answered: AnsweredQuestion[]): PlacementResult {
  let earned = 0;
  let totalWeight = 0;
  let correctCount = 0;

  for (const { question, correct } of answered) {
    const weight = DIFFICULTY_WEIGHT[question.difficulty];
    totalWeight += weight;
    if (correct) {
      earned += weight;
      correctCount += 1;
    }
  }

  const score = totalWeight === 0 ? 0 : earned / totalWeight;

  return {
    level: levelForScore(score),
    correct: correctCount,
    total: answered.length,
    score,
  };
}
