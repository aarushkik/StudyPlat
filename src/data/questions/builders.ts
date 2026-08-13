import type { PlacementQuestion, QuestionDifficulty, Stimulus } from '@/types';

/**
 * Question builders shared by every course bank.
 *
 * They auto-number ids, stamp the course, and rotate the correct choice so it
 * is not always in the same position — a bank where the answer is usually "B"
 * is a bank students learn to game rather than learn from.
 *
 * `inUnit` tags everything built after it, so a stop on the map can draw
 * questions from the unit named on its own plaque.
 */

const CHOICE_IDS = ['a', 'b', 'c', 'd', 'e'];

/** Per-subject question builders that auto-number ids and set the courseId. */
export function subject(courseId: string) {
  let n = 0;
  let currentUnit: number | undefined;
  // Correct answers are rotated to varied positions so they aren't always "B".
  // Each subject starts at a different offset (derived from its id) and then
  // cycles through the choice positions, keeping the distribution balanced.
  let mcSeq = 0;
  const startOffset = [...courseId].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  const mc = (
    difficulty: QuestionDifficulty,
    skillTag: string,
    prompt: string,
    choices: string[],
    correctIndex: number,
    explanation: string,
    stimulus?: Stimulus,
  ): PlacementQuestion => {
    n += 1;
    const len = choices.length;
    const target = (startOffset + mcSeq) % len;
    mcSeq += 1;
    // Rotate so the correct choice lands at `target`, preserving the others' order.
    const shift = (target - correctIndex + len) % len;
    const rotated: string[] = new Array(len);
    for (let i = 0; i < len; i += 1) rotated[(i + shift) % len] = choices[i];
    return {
      id: `${courseId}-q${n}`,
      courseId,
      difficulty,
      type: stimulus ? 'stimulus' : 'multiple_choice',
      prompt,
      stimulus,
      choices: rotated.map((text, i) => ({ id: CHOICE_IDS[i], text })),
      correctAnswerId: CHOICE_IDS[target],
      explanation,
      skillTag,
      unit: currentUnit,
    };
  };
  const sa = (
    difficulty: QuestionDifficulty,
    skillTag: string,
    prompt: string,
    acceptedAnswers: string[],
    explanation: string,
  ): PlacementQuestion => {
    n += 1;
    return {
      id: `${courseId}-q${n}`,
      courseId,
      difficulty,
      type: 'short_answer',
      prompt,
      acceptedAnswers,
      explanation,
      skillTag,
      unit: currentUnit,
    };
  };
  /**
   * Tag everything built after this call with a unit index. Called once per
   * block rather than threaded through every question, which keeps the
   * question lists readable — they are already four arguments deep.
   */
  const inUnit = (index: number) => {
    currentUnit = index;
  };
  return { mc, sa, inUnit };
}

