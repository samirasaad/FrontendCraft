import { levelQuizLesson } from "@/content/tracks/_level-quiz-lesson";
import { cssLevelQuizzes } from "@/content/tracks/css/level-quizzes";
import { CSS_LEVEL_QUIZ_SLUGS } from "@/lib/level-quiz/capstones";
import type { LessonDraft } from "@/content/tracks/_insights";

export const cssLevelQuizLessons: LessonDraft[] = [
  levelQuizLesson(
    "css-quiz-beginner",
    CSS_LEVEL_QUIZ_SLUGS.beginner,
    "beginner",
    cssLevelQuizzes[CSS_LEVEL_QUIZ_SLUGS.beginner],
  ),
  levelQuizLesson(
    "css-quiz-intermediate",
    CSS_LEVEL_QUIZ_SLUGS.intermediate,
    "intermediate",
    cssLevelQuizzes[CSS_LEVEL_QUIZ_SLUGS.intermediate],
  ),
  levelQuizLesson(
    "css-quiz-advanced",
    CSS_LEVEL_QUIZ_SLUGS.advanced,
    "advanced",
    cssLevelQuizzes[CSS_LEVEL_QUIZ_SLUGS.advanced],
  ),
  levelQuizLesson(
    "css-quiz-pro",
    CSS_LEVEL_QUIZ_SLUGS.pro,
    "pro",
    cssLevelQuizzes[CSS_LEVEL_QUIZ_SLUGS.pro],
  ),
];
