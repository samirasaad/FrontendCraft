import { assembleTrackLessons, getLessonById as byId, getLessonBySlug as bySlug } from "@/content/tracks/_assemble-lessons";
import { HTML_CURRICULUM_ORDER } from "@/content/tracks/html/curriculum-order";
import { enrichLegacyLesson } from "@/content/tracks/html/enrichment";
import { htmlBrowserWalkthrough } from "@/content/tracks/html/browser-walkthrough";
import { extraLessons } from "@/content/tracks/html/extra-lessons";
import { htmlInsights } from "@/content/tracks/html/insights";
import { legacyLessons } from "@/content/tracks/html/legacy-lessons";
import { modernLessons } from "@/content/tracks/html/modern-lessons";
import { htmlLessonActivities } from "@/content/tracks/html/lesson-activities";
import { assertHtmlLevelQuizCoverage } from "@/content/tracks/html/level-quizzes";
import { htmlLevelQuizLessons } from "@/content/tracks/html/level-quiz-lessons";
import { HTML_LEVEL_QUIZ_LESSON_SLUGS } from "@/lib/level-quiz/capstones";
import { HTML_VISUALIZER_ID_SET } from "@/lib/visualizer-ids";
import type { Lesson } from "@/lib/types";

export { HTML_CURRICULUM_ORDER };

const coreLessons = legacyLessons.map((lesson) =>
  enrichLegacyLesson(lesson, lesson.order),
);

export const lessons: Lesson[] = assembleTrackLessons({
  trackLabel: "HTML",
  order: HTML_CURRICULUM_ORDER,
  levelQuizSlugs: HTML_LEVEL_QUIZ_LESSON_SLUGS,
  bodies: [
    ...coreLessons,
    ...modernLessons,
    ...extraLessons,
    ...htmlLevelQuizLessons,
  ],
  insights: htmlInsights,
  activities: htmlLessonActivities,
  walkthroughs: htmlBrowserWalkthrough,
  assertLevelQuizzes: assertHtmlLevelQuizCoverage,
  knownVisualizerIds: HTML_VISUALIZER_ID_SET,
});

export function getLessonById(id: string): Lesson | undefined {
  return byId(lessons, id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return bySlug(lessons, slug);
}
