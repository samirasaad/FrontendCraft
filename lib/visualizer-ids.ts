/**
 * Canonical visualizer ids per track.
 * Keep in sync with registries under components/visualizers (HTML map lives in Visualizer.tsx).
 * Defined here (no React) so content + UI can share typed ids without cycles.
 */

/** Sentinel on level-quiz lessons — Concept lab is not rendered for these. */
export const LEVEL_QUIZ_VISUALIZER_ID = "level-quiz" as const;

export const HTML_VISUALIZER_IDS = [
  "document-tree",
  "semantic-blocks",
  "heading-ladder",
  "text-format",
  "link-image",
  "list-stack",
  "form-flow",
  "table-grid",
  "a11y-check",
  "sr-ready",
  "seo-crawl",
  "cwv-lab",
  "meta-card",
  "media-stage",
  "media-perf-lab",
  "details-accordion",
  "baseline-compat",
  "native-dialog",
  "picture-source",
  "cheatsheet-lab",
  "html-security-lab",
  "html-speculation-lab",
  "html-global-rtl-lab",
  "html-pitfalls-lab",
  LEVEL_QUIZ_VISUALIZER_ID,
] as const;

export type HtmlVisualizerId = (typeof HTML_VISUALIZER_IDS)[number];

export const CSS_VISUALIZER_IDS = [
  "cascade-lab",
  "box-model-lab",
  "sizing-lab",
  "type-color-lab",
  "flow-lab",
  "surface-lab",
  "flexbox-lab",
  "grid-lab",
  "positioning-lab",
  "responsive-lab",
  "variables-lab",
  "motion-lab",
  "animation-lab",
  "logical-layout-lab",
  "css-pitfalls-lab",
  "css-cheatsheet-lab",
  LEVEL_QUIZ_VISUALIZER_ID,
] as const;

export type CssVisualizerId = (typeof CSS_VISUALIZER_IDS)[number];

export const JAVASCRIPT_VISUALIZER_IDS = [
  "memory-lock",
  "primitive-vs-reference",
  "equality",
  "scope",
  "this-context",
  "array-hof",
  "destructuring",
  "promises",
  "async-await",
  "event-loop",
  "debounce-throttle-lab",
  "memory-leaks-lab",
] as const;

export type JavascriptVisualizerId = (typeof JAVASCRIPT_VISUALIZER_IDS)[number];

export type VisualizerId =
  | HtmlVisualizerId
  | CssVisualizerId
  | JavascriptVisualizerId;

export const HTML_VISUALIZER_ID_SET = new Set<string>(HTML_VISUALIZER_IDS);
export const CSS_VISUALIZER_ID_SET = new Set<string>(CSS_VISUALIZER_IDS);
export const JAVASCRIPT_VISUALIZER_ID_SET = new Set<string>(
  JAVASCRIPT_VISUALIZER_IDS,
);

export function isHtmlVisualizerId(id: string): id is HtmlVisualizerId {
  return HTML_VISUALIZER_ID_SET.has(id);
}

export function isCssVisualizerId(id: string): id is CssVisualizerId {
  return CSS_VISUALIZER_ID_SET.has(id);
}
