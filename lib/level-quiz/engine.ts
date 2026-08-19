import type {
  LevelAnswerValue,
  LevelQuestion,
  LevelQuizDefinition,
  QuestionDifficulty,
} from "@/lib/level-quiz/types";

export const LEVEL_QUIZ_PASS_RATIO = 0.7;
export const MAX_WRONG_ATTEMPTS = 3;

const DIFFICULTY_TARGETS: Record<QuestionDifficulty, number> = {
  easy: 2,
  medium: 4,
  hard: 2,
  "real-world": 2,
};

export function validateLevelQuiz(quiz: LevelQuizDefinition): void {
  const count = quiz.questions.length;
  if (count < 10 || count > 12) {
    throw new Error(
      `Level quiz "${quiz.id}" must have 10–12 questions (got ${count})`,
    );
  }
  const tally: Record<QuestionDifficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
    "real-world": 0,
  };
  for (const q of quiz.questions) {
    tally[q.difficulty]++;
  }
  for (const [diff, target] of Object.entries(DIFFICULTY_TARGETS)) {
    if (tally[diff as QuestionDifficulty] !== target) {
      throw new Error(
        `Level quiz "${quiz.id}" needs ${target} ${diff} questions (got ${tally[diff as QuestionDifficulty]})`,
      );
    }
  }
}

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, "");
}

export function evaluateLevelAnswer(
  question: LevelQuestion,
  answer: LevelAnswerValue | null,
): boolean {
  if (answer == null) return false;

  switch (question.type) {
    case "mcq":
    case "predict-visual":
    case "accessibility":
    case "before-after":
      return answer === question.correctId;

    case "click-element":
      return answer === question.correctTargetId;

    case "css-detective":
      return answer === question.correctPropertyId;

    case "spot-bug":
      return norm(String(answer)) === norm(question.bugToken);

    case "arrange-steps":
    case "build-layout":
    case "timeline":
      return (
        Array.isArray(answer) &&
        arraysEqual(answer as string[], question.correctOrder)
      );

    case "fill-code":
      return question.correctAnswers.some(
        (v) => norm(String(answer)) === norm(v),
      );

    case "console":
      return norm(String(answer)) === norm(question.correctAnswer);

    case "match-pairs": {
      const pairs =
        typeof answer === "object" &&
        answer !== null &&
        !Array.isArray(answer) &&
        "pairs" in answer
          ? (answer as { pairs: Record<string, string> }).pairs
          : (answer as Record<string, string>);
      if (!pairs || typeof pairs !== "object") return false;
      return Object.entries(question.correctPairs).every(
        ([l, r]) => pairs[l] === r,
      );
    }

    case "dom-tree":
      return answer === question.correctNodeId;

    case "responsive":
      return answer === question.correctBreakpointId;

    case "browser-sim":
    case "mini-code": {
      const css =
        typeof answer === "object" &&
        answer !== null &&
        !Array.isArray(answer) &&
        "css" in answer
          ? (answer as { css: string }).css
          : String(answer);
      const required =
        question.type === "browser-sim"
          ? [question.targetSubstring]
          : question.requiredCss;
      return required.every((needle) => css.includes(needle));
    }

    default:
      return false;
  }
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function levelQuizPercent(score: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
}

export function isLevelQuizPassed(score: number, total: number): boolean {
  if (total <= 0) return false;
  return score / total >= LEVEL_QUIZ_PASS_RATIO;
}
