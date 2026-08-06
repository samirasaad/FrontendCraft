import type { BrowserWalkthrough, Lesson } from "@/lib/types";

/** Attach DevTools walkthrough when defined for the lesson slug. */
export function attachBrowserWalkthrough(
  lesson: Lesson,
  map: Record<string, BrowserWalkthrough>,
): Lesson {
  const browserWalkthrough = map[lesson.slug];
  if (!browserWalkthrough) return lesson;
  return {
    ...lesson,
    content: {
      ...lesson.content,
      browserWalkthrough,
    },
  };
}

/** Runtime guard — every curriculum slug needs a DevTools walkthrough. */
export function assertBrowserWalkthroughCoverage(
  slugs: readonly string[],
  map: Record<string, BrowserWalkthrough>,
  trackLabel: string,
) {
  for (const slug of slugs) {
    const walkthrough = map[slug];
    if (!walkthrough || walkthrough.steps.length < 3) {
      throw new Error(
        `${trackLabel} browser walkthrough missing or too short for "${slug}" (need at least 3 steps, got ${walkthrough?.steps.length ?? 0})`,
      );
    }
  }
}
