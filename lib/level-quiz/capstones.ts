import type { Lesson } from "@/lib/types";

/** Standalone level-quiz lesson slug per tier (last item before the next tier). */
export const HTML_LEVEL_QUIZ_SLUGS = {
  beginner: "html-beginner-quiz",
  intermediate: "html-intermediate-quiz",
  advanced: "html-advanced-quiz",
  pro: "html-pro-quiz",
} as const;

export const CSS_LEVEL_QUIZ_SLUGS = {
  beginner: "css-beginner-quiz",
  intermediate: "css-intermediate-quiz",
  advanced: "css-advanced-quiz",
  pro: "css-pro-quiz",
} as const;

export const HTML_LEVEL_QUIZ_LESSON_SLUGS = Object.values(HTML_LEVEL_QUIZ_SLUGS);
export const CSS_LEVEL_QUIZ_LESSON_SLUGS = Object.values(CSS_LEVEL_QUIZ_SLUGS);

const LEVEL_QUIZ_SLUGS = new Set<string>([
  ...HTML_LEVEL_QUIZ_LESSON_SLUGS,
  ...CSS_LEVEL_QUIZ_LESSON_SLUGS,
]);

export function isLevelQuizLesson(lesson: Pick<Lesson, "slug" | "icon">): boolean {
  return LEVEL_QUIZ_SLUGS.has(lesson.slug) || lesson.icon === "Trophy";
}
