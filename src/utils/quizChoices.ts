import type { PlacementQuestion } from '../types';

export function choiceCanBeSubmitted(question: PlacementQuestion | undefined, selected: string | null, eliminated: string | null): boolean {
  return selected !== null && selected !== eliminated && Boolean(question?.choices?.some((choice) => choice.id === selected));
}

/** A repeatable companion assist which never eliminates the correct answer. */
export function eliminatedChoiceFor(question: PlacementQuestion): string | null {
  const wrong = question.choices?.filter((choice) => choice.id !== question.correctAnswerId) ?? [];
  if (!wrong.length) return null;
  const seed = [...question.id].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return wrong[seed % wrong.length].id;
}
