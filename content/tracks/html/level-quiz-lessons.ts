import { levelQuizLesson } from "@/content/tracks/_level-quiz-lesson";
import {
  htmlLevelQuizzes,
} from "@/content/tracks/html/level-quizzes";
import { HTML_LEVEL_QUIZ_SLUGS } from "@/lib/level-quiz/capstones";
import type { LessonDraft } from "@/content/tracks/_insights";

export const htmlLevelQuizLessons: LessonDraft[] = [
  levelQuizLesson(
    "html-quiz-beginner",
    HTML_LEVEL_QUIZ_SLUGS.beginner,
    "beginner",
    htmlLevelQuizzes[HTML_LEVEL_QUIZ_SLUGS.beginner],
  ),
  levelQuizLesson(
    "html-quiz-intermediate",
    HTML_LEVEL_QUIZ_SLUGS.intermediate,
    "intermediate",
    htmlLevelQuizzes[HTML_LEVEL_QUIZ_SLUGS.intermediate],
  ),
  levelQuizLesson(
    "html-quiz-advanced",
    HTML_LEVEL_QUIZ_SLUGS.advanced,
    "advanced",
    htmlLevelQuizzes[HTML_LEVEL_QUIZ_SLUGS.advanced],
  ),
  levelQuizLesson(
    "html-quiz-pro",
    HTML_LEVEL_QUIZ_SLUGS.pro,
    "pro",
    htmlLevelQuizzes[HTML_LEVEL_QUIZ_SLUGS.pro],
  ),
];
