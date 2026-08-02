import { withProductionInsights } from "@/content/tracks/_insights";
import {
  defaultHtmlChallenge,
  htmlChallenges,
} from "@/content/tracks/html/challenges";
import { enrichLegacyLesson } from "@/content/tracks/html/enrichment";
import { extraLessons } from "@/content/tracks/html/extra-lessons";
import { htmlInsights } from "@/content/tracks/html/insights";
import { legacyLessons } from "@/content/tracks/html/legacy-lessons";
import { modernLessons } from "@/content/tracks/html/modern-lessons";
import type { Lesson } from "@/lib/types";

/**
 * Canonical HTML curriculum order (1-based numbers in the sidebar).
 * Keep source `order` fields in sync with this list.
 */
export const HTML_CURRICULUM_ORDER = [
  // Beginner
  "document-anatomy",
  "semantic-structure",
  "text-headings",
  "text-formatting",
  "links-images",
  "lists",
  // Intermediate
  "forms-inputs",
  "tables",
  "form-ux-attributes",
  "details-summary",
  // Advanced
  "media-embed",
  "browser-compatibility",
  "native-dialog",
  "picture-source",
  "accessibility-basics",
  "meta-seo",
  "head-social-meta",
  "sr-practice",
  // Pro (pitfalls lives here — end of Pro)
  "html-core-web-vitals",
  "html-perf-media",
  "html-architecture-partials",
  "html-common-pitfalls",
  // CheatSheet
  "html-cheatsheet",
] as const;

const coreLessons: Lesson[] = legacyLessons.map((lesson) =>
  enrichLegacyLesson(lesson, lesson.order),
);

function withLabExtras(lesson: Lesson): Lesson {
  const challenge =
    htmlChallenges[lesson.slug] ??
    defaultHtmlChallenge(lesson.content.title.en);

  return {
    ...lesson,
    content: {
      ...lesson.content,
      challenge,
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
