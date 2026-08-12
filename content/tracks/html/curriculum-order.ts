/**
 * Canonical HTML curriculum order (1-based numbers in the sidebar).
 * Kept separate from lessons.ts so activity coverage checks cannot create import cycles.
 */
export const HTML_CURRICULUM_ORDER = [
  // Beginner
  "document-anatomy",
  "semantic-structure",
  "text-headings",
  "text-formatting",
  "inline-vs-block",
  "links-images",
  "lists",
  "classes-and-ids",
  "html-beginner-quiz",
  // Intermediate
  "forms-inputs",
  "form-ux-attributes",
  "tables",
  "details-summary",
  "html-intermediate-quiz",
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
  "html-advanced-quiz",
  // Pro (pitfalls is the capstone)
  "html-core-web-vitals",
  "html-perf-media",
  "html-security-hardening",
  "html-speculation-rules",
  "html-global-rtl",
  "html-browser-apis",
  "html-common-pitfalls",
  "html-pro-quiz",
  // CheatSheet
  "html-cheatsheet",
] as const;
