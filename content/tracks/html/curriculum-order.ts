/**
 * Canonical HTML curriculum order (1-based numbers in the sidebar).
 * Kept separate from lessons.ts so quiz coverage checks cannot create import cycles.
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
  "native-dialog",
  "picture-source",
  "browser-compatibility",
  "meta-seo",
  "head-social-meta",
  "accessibility-basics",
  "html-architecture-partials",
  "sr-practice",
  // Pro (pitfalls is the capstone)
  "html-core-web-vitals",
  "html-perf-media",
  "html-security-hardening",
  "html-speculation-rules",
  "html-global-rtl",
  "html-common-pitfalls",
  // CheatSheet
  "html-cheatsheet",
] as const;
