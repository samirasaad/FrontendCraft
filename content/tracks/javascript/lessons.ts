import { withProductionInsights } from "@/content/tracks/_insights";
import { enrichLegacyLesson } from "@/content/tracks/javascript/enrichment";
import { extraLessons } from "@/content/tracks/javascript/extra-lessons";
import { javascriptInsights } from "@/content/tracks/javascript/insights";
import { legacyLessons } from "@/content/tracks/javascript/legacy-lessons";
import type { Lesson } from "@/lib/types";

const coreLessons: Lesson[] = legacyLessons.map((lesson, index) =>
  enrichLegacyLesson(lesson, index + 1),
);

export const lessons: Lesson[] = [...coreLessons, ...extraLessons].map(
  (lesson) => withProductionInsights(lesson, javascriptInsights),
);

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
