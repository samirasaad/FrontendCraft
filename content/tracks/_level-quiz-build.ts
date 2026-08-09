import { L } from "@/content/helpers";
import { validateLevelQuiz } from "@/lib/level-quiz/engine";
import type { LevelQuestion, LevelQuizDefinition } from "@/lib/level-quiz/types";

export function levelQuiz(
  id: string,
  tier: LevelQuizDefinition["tier"],
  titleEn: string,
  titleAr: string,
  questions: LevelQuestion[],
): LevelQuizDefinition {
  const quiz: LevelQuizDefinition = {
    id,
    tier,
    title: L(titleEn, titleAr),
    questions,
  };
  validateLevelQuiz(quiz);
  return quiz;
}

export function O(id: string, en: string, ar: string) {
  return { id, label: L(en, ar) };
}
