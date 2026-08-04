import { withProductionInsights } from "@/content/tracks/_insights";
import { CSS_CURRICULUM_ORDER } from "@/content/tracks/css/curriculum-order";
import { extraLessons } from "@/content/tracks/css/extra-lessons";
import { cssInsights } from "@/content/tracks/css/insights";
import { modernLessons } from "@/content/tracks/css/modern-lessons";
import {
  assertCssQuizCoverage,
  cssQuizzes,
} from "@/content/tracks/css/quizzes";
import type { Lesson } from "@/lib/types";

export { CSS_CURRICULUM_ORDER };

assertCssQuizCoverage(CSS_CURRICULUM_ORDER);

function withLabExtras(lesson: Lesson): Lesson {
  const quiz = cssQuizzes[lesson.slug];
  if (!quiz) {
    throw new Error(`Missing CSS quiz for lesson slug: ${lesson.slug}`);
  }

  return { ...lesson, content: { ...lesson.content, quiz } };
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
    .map(withLabExtras),
);

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
