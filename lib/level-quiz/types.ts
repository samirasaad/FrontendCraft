import type { LocalizedString } from "@/lib/types";

export type QuestionDifficulty = "easy" | "medium" | "hard" | "real-world";

export type LevelQuestionType =
  | "click-element"
  | "build-layout"
  | "css-detective"
  | "spot-bug"
  | "predict-visual"
  | "arrange-steps"
  | "fill-code"
  | "match-pairs"
  | "before-after"
  | "browser-sim"
  | "dom-tree"
  | "responsive"
  | "accessibility"
  | "console"
  | "timeline"
  | "mini-code"
  | "mcq";

export interface LevelQuestionBase {
  id: string;
  type: LevelQuestionType;
  difficulty: QuestionDifficulty;
  prompt: LocalizedString;
  hint?: LocalizedString;
  explanation: LocalizedString;
  /** Optional interactive demo HTML shown via “Show demo”. */
  demoHtml?: string;
}

export interface McqLevelQuestion extends LevelQuestionBase {
  type: "mcq";
  options: { id: string; label: LocalizedString }[];
  correctId: string;
  code?: string;
  language?: "html" | "css" | "javascript";
}

export interface ClickElementQuestion extends LevelQuestionBase {
  type: "click-element";
  markup: string;
  correctTargetId: string;
}

export interface BuildLayoutQuestion extends LevelQuestionBase {
  type: "build-layout";
  blocks: { id: string; label: LocalizedString }[];
  correctOrder: string[];
  previewCss: string;
}

export interface CssDetectiveQuestion extends LevelQuestionBase {
  type: "css-detective";
  code: string;
  properties: { id: string; label: string }[];
  correctPropertyId: string;
}

export interface SpotBugQuestion extends LevelQuestionBase {
  type: "spot-bug";
  code: string;
  language: "html" | "css" | "javascript";
  bugToken: string;
}

export interface PredictVisualQuestion extends LevelQuestionBase {
  type: "predict-visual";
  code: string;
  language: "html" | "css" | "javascript";
  options: { id: string; previewHtml: string; label?: LocalizedString }[];
  correctId: string;
}

export interface ArrangeStepsQuestion extends LevelQuestionBase {
  type: "arrange-steps";
  items: { id: string; label: LocalizedString }[];
  correctOrder: string[];
}

export interface FillCodeQuestion extends LevelQuestionBase {
  type: "fill-code";
  template: string;
  blankId: string;
  correctAnswers: string[];
  language?: "html" | "css" | "javascript";
}

export interface MatchPairsQuestion extends LevelQuestionBase {
  type: "match-pairs";
  left: { id: string; label: LocalizedString }[];
  right: { id: string; label: LocalizedString }[];
  correctPairs: Record<string, string>;
}

export interface BeforeAfterQuestion extends LevelQuestionBase {
  type: "before-after";
  beforeHtml: string;
  afterHtml: string;
  options: { id: string; label: LocalizedString }[];
  correctId: string;
}

export interface BrowserSimQuestion extends LevelQuestionBase {
  type: "browser-sim";
  html: string;
  starterCss: string;
  targetSubstring: string;
}

export interface DomTreeQuestion extends LevelQuestionBase {
  type: "dom-tree";
  tree: DomTreeNode;
  correctNodeId: string;
}

export interface DomTreeNode {
  id: string;
  tag: string;
  label?: LocalizedString;
  children?: DomTreeNode[];
}

export interface ResponsiveQuestion extends LevelQuestionBase {
  type: "responsive";
  code: string;
  breakpoints: { id: string; label: LocalizedString; width: number }[];
  correctBreakpointId: string;
}

export interface AccessibilityQuestion extends LevelQuestionBase {
  type: "accessibility";
  scenario: LocalizedString;
  options: { id: string; label: LocalizedString }[];
  correctId: string;
}

export interface ConsoleQuestion extends LevelQuestionBase {
  type: "console";
  code: string;
  correctAnswer: string;
}

export interface TimelineQuestion extends LevelQuestionBase {
  type: "timeline";
  items: { id: string; label: LocalizedString }[];
  correctOrder: string[];
}

export interface MiniCodeQuestion extends LevelQuestionBase {
  type: "mini-code";
  html: string;
  starterCss: string;
  requiredCss: string[];
}

export type LevelQuestion =
  | McqLevelQuestion
  | ClickElementQuestion
  | BuildLayoutQuestion
  | CssDetectiveQuestion
  | SpotBugQuestion
  | PredictVisualQuestion
  | ArrangeStepsQuestion
  | FillCodeQuestion
  | MatchPairsQuestion
  | BeforeAfterQuestion
  | BrowserSimQuestion
  | DomTreeQuestion
  | ResponsiveQuestion
  | AccessibilityQuestion
  | ConsoleQuestion
  | TimelineQuestion
  | MiniCodeQuestion;

export interface LevelQuizDefinition {
  id: string;
  tier: "beginner" | "intermediate" | "advanced" | "pro";
  title: LocalizedString;
  questions: LevelQuestion[];
}

export type LevelAnswerValue =
  | string
  | string[]
  | Record<string, string>
  | { pairs: Record<string, string> }
  | { css: string };

export interface LevelQuizResult {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
}
