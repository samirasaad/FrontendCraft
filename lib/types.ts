export type Locale = "en" | "ar";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type TrackId = "javascript" | "html" | "css" | "tailwind";

export type TrackStatus = "available" | "coming-soon";

export interface LocalizedString {
  en: string;
  ar: string;
}

/** Visualizer ids are namespaced as `track:kind` or plain string per track. */
export type VisualizerId = string;

export interface LessonContent {
  title: LocalizedString;
  summary: LocalizedString;
  paragraphs: LocalizedString[];
  keyPoints: LocalizedString[];
  code: string;
  expectedOutput: LocalizedString;
  visualHint: LocalizedString;
}

export interface Lesson {
  id: string;
  order: number;
  slug: string;
  difficulty: Difficulty;
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
