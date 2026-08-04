import { withProductionInsights } from "@/content/tracks/_insights";
import { HTML_CURRICULUM_ORDER } from "@/content/tracks/html/curriculum-order";
import { enrichLegacyLesson } from "@/content/tracks/html/enrichment";
import { extraLessons } from "@/content/tracks/html/extra-lessons";
import { htmlInsights } from "@/content/tracks/html/insights";
import { legacyLessons } from "@/content/tracks/html/legacy-lessons";
import { modernLessons } from "@/content/tracks/html/modern-lessons";
import {
  assertHtmlQuizCoverage,
  htmlQuizzes,
} from "@/content/tracks/html/quizzes";
import type { Lesson } from "@/lib/types";

export { HTML_CURRICULUM_ORDER };

assertHtmlQuizCoverage(HTML_CURRICULUM_ORDER);

const coreLessons: Lesson[] = legacyLessons.map((lesson) =>
  enrichLegacyLesson(lesson, lesson.order),
);

function withLabExtras(lesson: Lesson): Lesson {
  const quiz = htmlQuizzes[lesson.slug];
  if (!quiz) {
    throw new Error(`Missing HTML quiz for lesson slug: ${lesson.slug}`);
  }

  return {
    ...lesson,
    content: {
      ...lesson.content,
      quiz,
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
    .map(withLabExtras),
);

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
