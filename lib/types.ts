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

export type TrackId =
  | "javascript"
  | "html"
  | "css"
  | "tailwind"
  | "react"
  | "accessibility"
  | "seo";

export type TrackStatus = "available" | "coming-soon";

export interface LocalizedString {
  en: string;
  ar: string;
}

/** Visualizer ids are plain strings per track. */
export type VisualizerId = string;

export type ExampleKind = "simple" | "medium" | "hard";

export interface CodeExample {
  id: ExampleKind;
  label: LocalizedString;
  /** Playground source — always English (UI locale does not swap templates). */
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

/**
 * CheatSheet categories — Layout, Interactive/Dialogs, Forms, Media, Head & Meta.
 */
export type CheatCategory =
  | "structure"
  | "interactive"
  | "forms"
  | "media"
  | "head";

/** W3C Baseline availability signal. */
export type BaselineStatus = "widely" | "newly" | "limited";

/** Cross-browser support matrix shown in lessons & cheat cards. */
export interface BrowserSupportInfo {
  chrome: string;
  firefox: string;
  safari: string;
  edge: string;
  baseline: BaselineStatus;
  notes?: LocalizedString;
  /** Guidance when targeting older engines. */
  fallback?: LocalizedString;
}

export interface CheatCard {
  /** Stable id for copy toasts / keys. */
  id?: string;
  title: LocalizedString;
  snippet: string;
  note: LocalizedString;
  /** When set, enables category filters on the CheatSheet grid. */
  category?: CheatCategory;
  /** Fuller paste-ready document fragment (Copy Boilerplate / clean HTML). */
  boilerplate?: string;
  /** Optional Tailwind-flavored equivalent for one-click copy. */
  tailwindSnippet?: string;
  /** Mini live preview HTML (injected into a sandboxed iframe). */
  previewHtml?: string;
  /** Per-card browser / Baseline matrix. */
  support?: BrowserSupportInfo;
}

/** Structured bilingual insight block used by Under the Hood / a11y / SEO. */
export interface InsightSection {
  paragraphs: LocalizedString[];
  bullets?: LocalizedString[];
  /** Optional illustrative snippet with copy support in the UI. */
  code?: string;
  codeCaption?: LocalizedString;
}

/** One numbered step for the “See it in the browser” DevTools walkthrough. */
export interface BrowserWalkthroughStep {
  title: LocalizedString;
  detail: LocalizedString;
}

/** DevTools steps shown in the lesson deep dive (Live tab examples). */
export interface BrowserWalkthrough {
  intro?: LocalizedString;
  steps: BrowserWalkthroughStep[];
}

/** ❌ vs ✅ teaching card for scannable practice. */
export interface ComparePair {
  title?: LocalizedString;
  bad: {
    label: LocalizedString;
    code: string;
    note: LocalizedString;
  };
  good: {
    label: LocalizedString;
    code: string;
    note: LocalizedString;
  };
}

/** One step in the browser rendering pipeline visualization. */
export interface PipelineStep {
  id: string;
  title: LocalizedString;
  detail: LocalizedString;
}

/** Single interactive check before advancing a lesson. */
export interface LessonChallenge {
  prompt: LocalizedString;
  options: {
    id: string;
    label: LocalizedString;
    code?: string;
  }[];
  correctId: string;
  explanation: LocalizedString;
}

/** One option in a lesson activity question. */
export interface ActivityOption {
  id: string;
  label: LocalizedString;
}

/** One question inside a lesson activity. */
export interface ActivityQuestion {
  id: string;
  prompt: LocalizedString;
  /** Optional code shown under the prompt. */
  code?: string;
  language?: "html" | "css" | "javascript" | "tsx";
  options: ActivityOption[];
  correctId: string;
  explanation: LocalizedString;
  /** Optional softer hint shown with the explanation. */
  hint?: LocalizedString;
}

/** Multi-question interactive activity for a lesson. */
export interface LessonActivity {
  title?: LocalizedString;
  questions: ActivityQuestion[];
}

export interface LessonContent {
  title: LocalizedString;
  summary: LocalizedString;
  paragraphs: LocalizedString[];
  keyPoints: LocalizedString[];
  /** Simple + Real-World playground examples. Omit to hide Code playground. */
  examples?: CodeExample[];
  visualHint: LocalizedString;
  /** ⚙️ Engine / browser mechanics (accordion). */
  underTheHood: InsightSection;
  /** ♿ Screen readers, ARIA, keyboard & focus. */
  accessibility: InsightSection;
  /** 🔍 Crawling, indexing, Core Web Vitals. */
  seo: InsightSection;
  /**
   * Wrong vs right alert(s). Optional — e.g. HTML keeps these only on
   * Pro: Common Pitfalls instead of every lesson.
   */
  pitfalls?: PitfallExample | PitfallExample[];
  /** Present on CheatSheet-tier lessons. */
  cheatCards?: CheatCard[];
  /**
   * Compatibility matrix — used on dedicated Browser Compatibility lessons
   * (and optionally cheat cards), not on every topic lesson.
   */
  browserSupport?: BrowserSupportInfo;
  /** Extra matrices for side-by-side feature comparison (browser lesson). */
  browserMatrices?: {
    label: LocalizedString;
    support: BrowserSupportInfo;
  }[];
  /** Visual ❌/✅ comparison cards (HTML track scannability). */
  compareCards?: ComparePair[];
  /** DevTools walkthrough — open Elements, Network, Console, etc. */
  browserWalkthrough?: BrowserWalkthrough;
  /** Browser pipeline steps for interactive walkthrough. */
  pipelineSteps?: PipelineStep[];
  /** One-question interactive challenge before advancing. */
  challenge?: LessonChallenge;
  /** Multi-question interactive activity (preferred over challenge when set). */
  activity?: LessonActivity;
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
