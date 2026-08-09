import { withProductionInsights } from "@/content/tracks/_insights";
import { attachBrowserWalkthrough, assertBrowserWalkthroughCoverage } from "@/content/tracks/_attach-browser-walkthrough";
import { CSS_CURRICULUM_ORDER } from "@/content/tracks/css/curriculum-order";
import { cssBrowserWalkthrough } from "@/content/tracks/css/browser-walkthrough";
import { extraLessons } from "@/content/tracks/css/extra-lessons";
import { cssInsights } from "@/content/tracks/css/insights";
import { modernLessons } from "@/content/tracks/css/modern-lessons";
import {
  assertCssLessonActivityCoverage,
  cssLessonActivities,
} from "@/content/tracks/css/lesson-activities";
import {
  assertCssLevelQuizCoverage,
} from "@/content/tracks/css/level-quizzes";
import { cssLevelQuizLessons } from "@/content/tracks/css/level-quiz-lessons";
import {
  CSS_LEVEL_QUIZ_LESSON_SLUGS,
  isLevelQuizLesson,
} from "@/lib/level-quiz/capstones";
import type { Lesson } from "@/lib/types";

export { CSS_CURRICULUM_ORDER };

const CONTENT_LESSON_SLUGS = CSS_CURRICULUM_ORDER.filter(
  (slug) => !CSS_LEVEL_QUIZ_LESSON_SLUGS.includes(slug as (typeof CSS_LEVEL_QUIZ_LESSON_SLUGS)[number]),
);

assertCssLessonActivityCoverage(CONTENT_LESSON_SLUGS);
assertCssLevelQuizCoverage(CSS_LEVEL_QUIZ_LESSON_SLUGS);
assertBrowserWalkthroughCoverage(
  CONTENT_LESSON_SLUGS,
  cssBrowserWalkthrough,
  "CSS",
);

function withLabExtras(lesson: Lesson): Lesson {
  const activity = cssLessonActivities[lesson.slug];
  if (!activity) {
    throw new Error(`Missing CSS lesson activity for lesson slug: ${lesson.slug}`);
  }

  return { ...lesson, content: { ...lesson.content, activity } };
}

function orderCurriculum(list: Lesson[]): Lesson[] {
  const bySlug = new Map(list.map((lesson) => [lesson.slug, lesson]));
  const ordered: Lesson[] = [];

  for (const [index, slug] of CSS_CURRICULUM_ORDER.entries()) {
    const lesson = bySlug.get(slug);
    if (!lesson) {
      throw new Error(`CSS curriculum missing lesson slug: ${slug}`);
    }
    ordered.push({ ...lesson, order: index + 1 });
    bySlug.delete(slug);
  }

  if (bySlug.size > 0) {
    throw new Error(
      `CSS lessons not listed in CSS_CURRICULUM_ORDER: ${[...bySlug.keys()].join(", ")}`,
    );
  }

  return ordered;
}

export const lessons: Lesson[] = orderCurriculum(
  [...modernLessons, ...extraLessons, ...cssLevelQuizLessons]
    .map((lesson) => withProductionInsights(lesson, cssInsights))
    .map((lesson) => (isLevelQuizLesson(lesson) ? lesson : withLabExtras(lesson)))
    .map((lesson) => attachBrowserWalkthrough(lesson, cssBrowserWalkthrough)),
);

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
