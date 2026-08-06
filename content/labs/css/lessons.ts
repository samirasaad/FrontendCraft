import { withProductionInsights } from "@/content/labs/_insights";
import { attachBrowserWalkthrough, assertBrowserWalkthroughCoverage } from "@/content/labs/_attach-browser-walkthrough";
import { CSS_CURRICULUM_ORDER } from "@/content/labs/css/curriculum-order";
import { cssBrowserWalkthrough } from "@/content/labs/css/browser-walkthrough";
import { extraLessons } from "@/content/labs/css/extra-lessons";
import { cssInsights } from "@/content/labs/css/insights";
import { modernLessons } from "@/content/labs/css/modern-lessons";
import {
  assertCssLessonActivityCoverage,
  cssLessonActivities,
} from "@/content/labs/css/lesson-activities";
import type { Lesson } from "@/lib/types";

export { CSS_CURRICULUM_ORDER };

assertCssLessonActivityCoverage(CSS_CURRICULUM_ORDER);
assertBrowserWalkthroughCoverage(
  CSS_CURRICULUM_ORDER,
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
  [...modernLessons, ...extraLessons]
    .map((lesson) => withProductionInsights(lesson, cssInsights))
    .map(withLabExtras)
    .map((lesson) => attachBrowserWalkthrough(lesson, cssBrowserWalkthrough)),
);

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
