/**
 * Canonical CSS curriculum order (1-based numbers in the sidebar).
 * Kept separate from lessons.ts so activity coverage checks cannot create import cycles.
 */
export const CSS_CURRICULUM_ORDER = [
  // Beginner
  "cascade-specificity",
  "box-model",
  "units-sizing",
  "colors-typography",
  "display-flow",
  "backgrounds-borders",
  // Intermediate
  "flexbox-basics",
  "css-grid",
  "positioning",
  "responsive-media",
  // Advanced
  "custom-properties",
  "transitions-transforms",
  "css-animations",
  "logical-properties",
  // Pro
  "css-common-pitfalls",
  // CheatSheet
  "css-cheatsheet",
] as const;
