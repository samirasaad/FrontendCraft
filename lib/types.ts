export type Locale = "en" | "ar";

/** Six-tier curriculum used across every track. */
export type Tier =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "pro"
  | "pitfalls"
  | "cheatsheet";

/** @deprecated Use Tier — kept as alias during migration reads. */
export type Difficulty = Tier;

export type TrackId = "javascript" | "html" | "css" | "tailwind";

export type TrackStatus = "available" | "coming-soon";

export interface LocalizedString {
  en: string;
  ar: string;
}

/** Visualizer ids are plain strings per track. */
export type VisualizerId = string;

export type ExampleKind = "simple" | "realWorld";

export interface CodeExample {
  id: ExampleKind;
  label: LocalizedString;
  code: string;
  expectedOutput: LocalizedString;
}

export interface PitfallSide {
  code: string;
  note: LocalizedString;
}

export interface PitfallExample {
  /** Optional label when stacking several pitfalls in one lesson. */
  title?: LocalizedString;
  wrong: PitfallSide;
  right: PitfallSide;
}

export interface CheatCard {
  title: LocalizedString;
  snippet: string;
  note: LocalizedString;
}

/** Structured bilingual insight block used by Under the Hood / a11y / SEO. */
export interface InsightSection {
  paragraphs: LocalizedString[];
  bullets?: LocalizedString[];
  /** Optional illustrative snippet with copy support in the UI. */
  code?: string;
  codeCaption?: LocalizedString;
}

export interface LessonContent {
  title: LocalizedString;
  summary: LocalizedString;
  paragraphs: LocalizedString[];
  keyPoints: LocalizedString[];
  /** Simple + Real-World playground examples. */
  examples: CodeExample[];
  visualHint: LocalizedString;
  /** ⚙️ Engine / browser mechanics (accordion). */
  underTheHood: InsightSection;
  /** ♿ Screen readers, ARIA, keyboard & focus. */
  accessibility: InsightSection;
  /** 🔍 Crawling, indexing, Core Web Vitals. */
  seo: InsightSection;
  /**
   * Wrong vs right alert(s). Optional — e.g. HTML keeps these only on
   * Pitfalls-tier lessons instead of every lesson.
   */
  pitfalls?: PitfallExample | PitfallExample[];
  /** Present on CheatSheet-tier lessons. */
  cheatCards?: CheatCard[];
}

export interface Lesson {
  id: string;
  order: number;
  slug: string;
  tier: Tier;
  readMinutes: number;
  icon: string;
  visualizer: VisualizerId;
  content: LessonContent;
}

export interface TrackMeta {
  id: TrackId;
  status: TrackStatus;
  order: number;
  accent: string;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
  tagline: LocalizedString;
}

export interface TrackDefinition extends TrackMeta {
  lessons: Lesson[];
}
