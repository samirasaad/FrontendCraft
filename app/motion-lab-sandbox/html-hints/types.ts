import type { LocalizedString } from "@/lib/types";

export type HtmlHintId =
  | "alt"
  | "doctype"
  | "h1"
  | "lang"
  | "href"
  | "semantic"
  | "btn-link"
  | "charset"
  | "lists"
  | "label";

export interface HtmlHintBeat {
  id: string;
  hook: LocalizedString;
  sub: LocalizedString;
  /** Shown in code strip — always LTR */
  code: string;
  codeTone?: "muted" | "bad" | "good";
  visual: string;
}

export interface HtmlHintDefinition {
  id: HtmlHintId;
  title: LocalizedString;
  /** Short caption to paste under the TikTok clip */
  caption: LocalizedString;
  accent: string;
  beats: HtmlHintBeat[];
}

export function htmlHintLabId(id: HtmlHintId): `html-hint-${HtmlHintId}` {
  return `html-hint-${id}`;
}

export function parseHtmlHintLabId(
  lab: string,
): HtmlHintId | null {
  if (!lab.startsWith("html-hint-")) return null;
  return lab.slice("html-hint-".length) as HtmlHintId;
}

export function isHtmlHintLab(lab: string): lab is `html-hint-${HtmlHintId}` {
  return parseHtmlHintLabId(lab) != null;
}
