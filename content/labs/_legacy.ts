import type { LocalizedString, VisualizerId } from "@/lib/types";

/** Pre-curriculum-v2 lesson shape (code + expectedOutput only). */
export interface LegacyLesson {
  id: string;
  order: number;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  readMinutes: number;
  icon: string;
  visualizer: VisualizerId;
  content: {
    title: LocalizedString;
    summary: LocalizedString;
    paragraphs: LocalizedString[];
    keyPoints: LocalizedString[];
    code: string;
    expectedOutput: LocalizedString;
    visualHint: LocalizedString;
  };
}
