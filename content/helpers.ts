import type {
  CheatCard,
  CodeExample,
  InsightSection,
  LocalizedString,
  PitfallExample,
} from "@/lib/types";

/** Tiny bilingual helper to keep lesson files readable. */
export function L(en: string, ar: string): LocalizedString {
  return { en, ar };
}

export function insight(
  paragraphs: LocalizedString[],
  options?: {
    bullets?: LocalizedString[];
    code?: string;
    codeCaption?: LocalizedString;
  },
): InsightSection {
  return {
    paragraphs,
    ...(options?.bullets ? { bullets: options.bullets } : {}),
    ...(options?.code ? { code: options.code } : {}),
    ...(options?.codeCaption ? { codeCaption: options.codeCaption } : {}),
  };
}

export function simpleExample(
  code: string,
  expectedEn: string,
  expectedAr = expectedEn,
): CodeExample {
  return {
    id: "simple",
    label: L("Simple", "Simple"),
    code,
    expectedOutput: L(expectedEn, expectedAr),
  };
}

export function realWorldExample(
  code: string,
  expectedEn: string,
  expectedAr = expectedEn,
): CodeExample {
  return {
    id: "realWorld",
    label: L("Real-World", "Real-World"),
    code,
    expectedOutput: L(expectedEn, expectedAr),
  };
}

export function pitfall(
  wrongCode: string,
  wrongNote: LocalizedString,
  rightCode: string,
  rightNote: LocalizedString,
  title?: LocalizedString,
): PitfallExample {
  return {
    ...(title ? { title } : {}),
    wrong: { code: wrongCode, note: wrongNote },
    right: { code: rightCode, note: rightNote },
  };
}

export function cheatCard(
  title: LocalizedString,
  snippet: string,
  note: LocalizedString,
): CheatCard {
  return { title, snippet, note };
}
