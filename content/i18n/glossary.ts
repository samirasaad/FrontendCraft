/**
 * FrontendCraft terminology glossary.
 *
 * Pick once, use everywhere. When adding copy, check here first.
 *
 * ## Platform terms
 * | Concept   | English   | Arabic        | Notes                          |
 * |-----------|-----------|---------------|--------------------------------|
 * | Brand     | FrontendCraft | FrontendCraft | Product name — never translate |
 * | Domain    | frontend  | تطوير الواجهات | Not "Front-end"                |
 * | Section   | track     | مسار          | Not "craft", "path", or "lab"  |
 * | Unit      | lesson    | درس           | Not "module"                   |
 * | Practice  | challenge | تحدي          |                                |
 * | Code area | playground | ملعب         | Not "lab" or "workspace"       |
 * | Visuals   | experiments | تجارب       | Interactive concept demos      |
 *
 * ## Tech terms (keep in English in both locales)
 * HTML, CSS, JavaScript, React, SEO, UI, props, state, event, DOM,
 * Tailwind, accessibility (a11y), meta, component (when code-related).
 *
 * ## Compact labels (track rail, badges)
 * Use full names in titles: "JavaScript Core", "HTML Fundamentals".
 * Use short forms only where space is tight: JS, HTML, CSS, TW, A11y.
 *
 * ## Conceptual job labels (localize in Arabic)
 * | English        | Arabic              |
 * |----------------|---------------------|
 * | Structure      | البنية              |
 * | Styling        | التنسيق             |
 * | Behavior       | السلوك              |
 * | Components     | المكونات            |
 * | Faster CSS     | CSS أسرع            |
 * | Inclusive UI   | واجهة شاملة         |
 * | Discoverability| الظهور في البحث     |
 *
 * ## Copy structure per track
 * 1. Hook (why care) — tagline + card hint
 * 2. What it is — description + body copy
 *
 * ## Arabic style
 * Use simple, descriptive Modern Standard Arabic (MSA).
 * Keep technical terms in English. Avoid dialect (e.g. معمل، إزاي، دلوقتي، عشان).
 */

export const glossary = {
  frontend: { en: "frontend", ar: "تطوير الواجهات" },
  track: { en: "track", ar: "مسار" },
  tracks: { en: "tracks", ar: "مسارات" },
  lesson: { en: "lesson", ar: "درس" },
  challenge: { en: "challenge", ar: "تحدي" },
  playground: { en: "playground", ar: "ملعب" },

  structure: { en: "Structure", ar: "البنية" },
  styling: { en: "Styling", ar: "التنسيق" },
  behavior: { en: "Behavior", ar: "السلوك" },
  components: { en: "Components", ar: "المكونات" },
  discoverability: { en: "Discoverability", ar: "الظهور في البحث" },
  inclusiveUi: { en: "Inclusive UI", ar: "واجهة شاملة" },
} as const;
