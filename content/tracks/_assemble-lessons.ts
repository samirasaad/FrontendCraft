import { attachBrowserWalkthrough, assertBrowserWalkthroughCoverage } from "@/content/tracks/_attach-browser-walkthrough";
import {
  withProductionInsights,
  type LessonDraft,
  type ProductionInsights,
} from "@/content/tracks/_insights";
import { isLevelQuizLesson } from "@/lib/level-quiz/capstones";
import type {
  BrowserWalkthrough,
  Lesson,
  LessonActivity,
} from "@/lib/types";

export type AssembleTrackLessonsOptions = {
  /** Used in error messages ("HTML", "CSS", …). */
  trackLabel: string;
  /** Canonical curriculum slug order. */
  order: readonly string[];
  /** Capstone quiz slugs — skipped for activity/walkthrough coverage. */
  levelQuizSlugs: readonly string[];
  /** Lesson bodies before insights / activity / walkthrough attach. */
  bodies: LessonDraft[];
  insights: Record<string, ProductionInsights>;
  activities: Record<string, LessonActivity>;
  walkthroughs: Record<string, BrowserWalkthrough>;
  /** Track-specific level-quiz payload coverage check. */
  assertLevelQuizzes: (quizSlugs: readonly string[]) => void;
  /**
   * Optional: known Concept-lab visualizer ids for this track.
   * When set, every lesson body must reference an id in the set.
   */
  knownVisualizerIds?: ReadonlySet<string>;
};

/** Attach the multi-question activity required for every non–level-quiz lesson. */
export function withLabExtras(
  trackLabel: string,
  lesson: Lesson,
  activities: Record<string, LessonActivity>,
): Lesson {
  const activity = activities[lesson.slug];
  if (!activity) {
    throw new Error(
      `Missing ${trackLabel} lesson activity for lesson slug: ${lesson.slug}`,
    );
  }

  return {
    ...lesson,
    content: {
      ...lesson.content,
      activity,
    },
  };
}

/**
 * Sort lessons to match curriculum order, renumber `order`, and reject
 * missing or orphaned slugs.
 */
export function orderCurriculum(
  trackLabel: string,
  order: readonly string[],
  list: Lesson[],
): Lesson[] {
  const bySlug = new Map(list.map((lesson) => [lesson.slug, lesson]));
  const ordered: Lesson[] = [];

  for (const [index, slug] of order.entries()) {
    const lesson = bySlug.get(slug);
    if (!lesson) {
      throw new Error(`${trackLabel} curriculum missing lesson slug: ${slug}`);
    }
    ordered.push({ ...lesson, order: index + 1 });
    bySlug.delete(slug);
  }

  if (bySlug.size > 0) {
    const extras = [...bySlug.keys()].join(", ");
    throw new Error(
      `${trackLabel} lessons not listed in curriculum order: ${extras}`,
    );
  }

  return ordered;
}

/** Every content lesson needs 3–6 activity questions. */
export function assertLessonActivityCoverage(
  trackLabel: string,
  slugs: readonly string[],
  activities: Record<string, LessonActivity>,
) {
  for (const slug of slugs) {
    const activity = activities[slug];
    const count = activity?.questions.length ?? 0;
    if (!activity || count < 3 || count > 6) {
      throw new Error(
        `${trackLabel} lesson activity missing or invalid length for lesson "${slug}" (need 3–6 questions, got ${count})`,
      );
    }
  }
}

/** Every lesson visualizer id must exist in the track registry. */
export function assertVisualizerIdCoverage(
  trackLabel: string,
  bodies: readonly LessonDraft[],
  knownIds: ReadonlySet<string>,
) {
  const unknown = [
    ...new Set(
      bodies
        .map((lesson) => lesson.visualizer)
        .filter((id) => !knownIds.has(id)),
    ),
  ];
  if (unknown.length > 0) {
    throw new Error(
      `${trackLabel} unknown visualizer id(s): ${unknown.join(", ")}`,
    );
  }
}

/**
 * Shared HTML/CSS (and future track) lesson assembly pipeline:
 * assert coverage → attach insights / activity / walkthrough → order.
 */
export function assembleTrackLessons(
  options: AssembleTrackLessonsOptions,
): Lesson[] {
  const {
    trackLabel,
    order,
    levelQuizSlugs,
    bodies,
    insights,
    activities,
    walkthroughs,
    assertLevelQuizzes,
    knownVisualizerIds,
  } = options;

  const quizSlugSet = new Set<string>(levelQuizSlugs);
  const contentSlugs = order.filter((slug) => !quizSlugSet.has(slug));

  assertLessonActivityCoverage(trackLabel, contentSlugs, activities);
  assertLevelQuizzes(levelQuizSlugs);
  assertBrowserWalkthroughCoverage(contentSlugs, walkthroughs, trackLabel);
  if (knownVisualizerIds) {
    assertVisualizerIdCoverage(trackLabel, bodies, knownVisualizerIds);
  }

  const assembled = bodies
    .map((lesson) => withProductionInsights(lesson, insights))
    .map((lesson) =>
      isLevelQuizLesson(lesson)
        ? lesson
        : withLabExtras(trackLabel, lesson, activities),
    )
    .map((lesson) => attachBrowserWalkthrough(lesson, walkthroughs));

  return orderCurriculum(trackLabel, order, assembled);
}

export function getLessonById(
  lessons: readonly Lesson[],
  id: string,
): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(
  lessons: readonly Lesson[],
  slug: string,
): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
