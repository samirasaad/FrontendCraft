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
  "css-beginner-quiz",
  // Intermediate
  "flexbox-basics",
  "css-grid",
  "positioning",
  "responsive-media",
  "css-intermediate-quiz",
  // Advanced
  "custom-properties",
  "transitions-transforms",
  "css-animations",
  "logical-properties",
  "css-advanced-quiz",
  // Pro
  "css-common-pitfalls",
  "css-pro-quiz",
  // CheatSheet
  "css-cheatsheet",
] as const;
