import type { Locale } from "@/lib/types";
import type { QuestionDifficulty } from "@/lib/level-quiz/types";
import { t, type UiKey } from "@/content/i18n/ui-strings";

export function levelQuizDifficultyLabel(
  difficulty: QuestionDifficulty,
  locale: Locale,
): string {
  const key = `levelQuizDifficulty_${difficulty}` as UiKey;
  return t(key, locale);
}
