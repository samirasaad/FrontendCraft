import type {
  BrowserSupportInfo,
  CheatCard,
  CheatCategory,
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
    label: L("Simple", "بسيط"),
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
    label: L("Real-world", "واقعي"),
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

export function support(
  chrome: string,
  firefox: string,
  safari: string,
  edge: string,
  baseline: BrowserSupportInfo["baseline"],
  extras?: {
    notes?: LocalizedString;
    fallback?: LocalizedString;
  },
): BrowserSupportInfo {
  return {
    chrome,
    firefox,
    safari,
    edge,
    baseline,
    ...(extras?.notes ? { notes: extras.notes } : {}),
    ...(extras?.fallback ? { fallback: extras.fallback } : {}),
  };
}

/** Sensible default for evergreen HTML topics. */
export const evergreenSupport = support(
  "90+",
  "90+",
  "14+",
  "90+",
  "widely",
  {
    notes: L(
      "Supported in current evergreen browsers. Verify only if you must support very old corporate engines.",
      "مدعوم في المتصفحات الحديثة. تحقق بس لو محتاج engines قديمة جدًا.",
    ),
  },
);

export function cheatCard(
  title: LocalizedString,
  snippet: string,
  note: LocalizedString,
  options?: {
    id?: string;
    category?: CheatCategory;
    boilerplate?: string;
    tailwindSnippet?: string;
    previewHtml?: string;
    support?: BrowserSupportInfo;
  },
): CheatCard {
  return {
    title,
    snippet,
    note,
    ...(options?.id ? { id: options.id } : {}),
    ...(options?.category ? { category: options.category } : {}),
    ...(options?.boilerplate ? { boilerplate: options.boilerplate } : {}),
    ...(options?.tailwindSnippet
      ? { tailwindSnippet: options.tailwindSnippet }
      : {}),
    ...(options?.previewHtml ? { previewHtml: options.previewHtml } : {}),
    ...(options?.support ? { support: options.support } : {}),
  };
}
