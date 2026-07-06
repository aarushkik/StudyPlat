/**
 * Types for the "Find Your Level" placement quiz.
 *
 * A reusable engine consumes these — each AP subject supplies its own set of
 * `PlacementQuestion`s (see `data/placementQuestions.ts`). All content is
 * original placeholder material, never real exam questions.
 */

/** How much a correct answer signals about readiness. Drives scoring weight. */
export type QuestionDifficulty = 'foundation' | 'developing' | 'ap_ready' | 'advanced';

/** Question format the engine knows how to render + grade. */
export type QuestionType = 'multiple_choice' | 'short_answer' | 'stimulus';

/** A selectable answer option. */
export interface AnswerChoice {
  id: string;
  text: string;
}

/** Optional supporting material shown above the prompt. */
export type StimulusKind = 'paragraph' | 'chart' | 'code' | 'formula' | 'image';
export interface Stimulus {
  kind: StimulusKind;
  /** Paragraph text, code, a formula string, or a caption for chart/image. */
  content: string;
  caption?: string;
}

/** A single placement question. */
export interface PlacementQuestion {
  id: string;
  courseId: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  prompt: string;
  stimulus?: Stimulus;
  /** Present for `multiple_choice` and choice-based `stimulus` questions. */
  choices?: AnswerChoice[];
  /** Id of the correct choice (choice-based questions). */
  correctAnswerId?: string;
  /** Accepted answers for `short_answer` (compared case/space-insensitively). */
  acceptedAnswers?: string[];
  explanation: string;
  /** Human-readable skill this question probes, e.g. "Cell structure". */
  skillTag: string;
}

/** The full placement quiz for one subject. */
export interface PlacementQuiz {
  courseId: string;
  intro: string;
  questions: PlacementQuestion[];
}

/** Recommended starting levels a student can be placed into. */
export type PlacementLevelId = 'beginner' | 'builder' | 'ap_ready' | 'advanced_review';

export interface PlacementLevel {
  id: PlacementLevelId;
  title: string;
  headline: string;
  description: string;
  emoji: string;
}

/** Outcome of scoring the quiz. */
export interface PlacementResult {
  level: PlacementLevelId;
  correct: number;
  total: number;
  /** 0–1 weighted readiness score. */
  score: number;
}
