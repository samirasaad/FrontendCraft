import { assembleTrackLessons, getLessonById as byId, getLessonBySlug as bySlug } from "@/content/tracks/_assemble-lessons";
import { CSS_CURRICULUM_ORDER } from "@/content/tracks/css/curriculum-order";
import { cssBrowserWalkthrough } from "@/content/tracks/css/browser-walkthrough";
import { extraLessons } from "@/content/tracks/css/extra-lessons";
import { cssInsights } from "@/content/tracks/css/insights";
import { modernLessons } from "@/content/tracks/css/modern-lessons";
import { cssLessonActivities } from "@/content/tracks/css/lesson-activities";
import { assertCssLevelQuizCoverage } from "@/content/tracks/css/level-quizzes";
import { cssLevelQuizLessons } from "@/content/tracks/css/level-quiz-lessons";
import { CSS_LEVEL_QUIZ_LESSON_SLUGS } from "@/lib/level-quiz/capstones";
import { CSS_VISUALIZER_ID_SET } from "@/lib/visualizer-ids";
import type { Lesson } from "@/lib/types";

export { CSS_CURRICULUM_ORDER };

export const lessons: Lesson[] = assembleTrackLessons({
  trackLabel: "CSS",
  order: CSS_CURRICULUM_ORDER,
  levelQuizSlugs: CSS_LEVEL_QUIZ_LESSON_SLUGS,
  bodies: [...modernLessons, ...extraLessons, ...cssLevelQuizLessons],
  insights: cssInsights,
  activities: cssLessonActivities,
  walkthroughs: cssBrowserWalkthrough,
  assertLevelQuizzes: assertCssLevelQuizCoverage,
  knownVisualizerIds: CSS_VISUALIZER_ID_SET,
});

export function getLessonById(id: string): Lesson | undefined {
  return byId(lessons, id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return bySlug(lessons, slug);
}
