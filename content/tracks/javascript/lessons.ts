import type { Lesson } from "@/lib/types";

/**
 * JavaScript curriculum paused — lesson sources remain under this folder
 * (legacy-lessons, extra-lessons, enrichment, insights) for a later revive.
 */
export const lessons: Lesson[] = [];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
