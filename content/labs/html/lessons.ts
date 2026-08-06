import { withProductionInsights } from "@/content/labs/_insights";
import { attachBrowserWalkthrough, assertBrowserWalkthroughCoverage } from "@/content/labs/_attach-browser-walkthrough";
import { HTML_CURRICULUM_ORDER } from "@/content/labs/html/curriculum-order";
import { enrichLegacyLesson } from "@/content/labs/html/enrichment";
import { htmlBrowserWalkthrough } from "@/content/labs/html/browser-walkthrough";
import { extraLessons } from "@/content/labs/html/extra-lessons";
import { htmlInsights } from "@/content/labs/html/insights";
import { legacyLessons } from "@/content/labs/html/legacy-lessons";
import { modernLessons } from "@/content/labs/html/modern-lessons";
import {
  assertHtmlLessonActivityCoverage,
  htmlLessonActivities,
} from "@/content/labs/html/lesson-activities";
import type { Lesson } from "@/lib/types";

export { HTML_CURRICULUM_ORDER };

assertHtmlLessonActivityCoverage(HTML_CURRICULUM_ORDER);
assertBrowserWalkthroughCoverage(
  HTML_CURRICULUM_ORDER,
  htmlBrowserWalkthrough,
  "HTML",
);

const coreLessons: Lesson[] = legacyLessons.map((lesson) =>
  enrichLegacyLesson(lesson, lesson.order),
);

function withLabExtras(lesson: Lesson): Lesson {
  const activity = htmlLessonActivities[lesson.slug];
  if (!activity) {
    throw new Error(`Missing HTML lesson activity for lesson slug: ${lesson.slug}`);
  }

  return {
    ...lesson,
    content: {
      ...lesson.content,
      activity,
    },
  };
}

function orderCurriculum(list: Lesson[]): Lesson[] {
  const bySlug = new Map(list.map((lesson) => [lesson.slug, lesson]));
  const ordered: Lesson[] = [];

  for (const [index, slug] of HTML_CURRICULUM_ORDER.entries()) {
    const lesson = bySlug.get(slug);
    if (!lesson) {
      throw new Error(`HTML curriculum missing lesson slug: ${slug}`);
    }
    ordered.push({ ...lesson, order: index + 1 });
    bySlug.delete(slug);
  }

  if (bySlug.size > 0) {
    const extras = [...bySlug.keys()].join(", ");
    throw new Error(`HTML lessons not listed in HTML_CURRICULUM_ORDER: ${extras}`);
  }

  return ordered;
}

export const lessons: Lesson[] = orderCurriculum(
  [...coreLessons, ...modernLessons, ...extraLessons]
    .map((lesson) => withProductionInsights(lesson, htmlInsights))
    .map(withLabExtras)
    .map((lesson) => attachBrowserWalkthrough(lesson, htmlBrowserWalkthrough)),
);

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
