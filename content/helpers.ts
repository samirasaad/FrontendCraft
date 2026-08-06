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

export function mediumExample(
  code: string,
  expectedEn: string,
  expectedAr = expectedEn,
): CodeExample {
  return {
    id: "medium",
    label: L("Medium", "متوسط"),
    code,
    expectedOutput: L(expectedEn, expectedAr),
  };
}

export function hardExample(
  code: string,
  expectedEn: string,
  expectedAr = expectedEn,
): CodeExample {
  return {
    id: "hard",
    label: L("Hard", "صعب"),
    code,
    expectedOutput: L(expectedEn, expectedAr),
  };
}

export type HardHtmlDocOptions = {
  title: string;
  lang?: string;
  dir?: "ltr" | "rtl";
  /** Extra lines inside `<head>` after `<title>` (unindented). */
  head?: string;
};

function indentLines(text: string, spaces = 4): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line.length ? `${pad}${line}` : line))
    .join("\n");
}

/** Complete document shell for hard-tier HTML playground examples. */
export function hardHtmlDoc(body: string, options: HardHtmlDocOptions): string {
  const lang = options.lang ?? "en";
  const dir = options.dir ?? (lang === "ar" ? "rtl" : "ltr");
  const headExtra = options.head ? `\n${indentLines(options.head)}` : "";

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${options.title}</title>${headExtra}
  </head>
  <body>
${indentLines(body)}
  </body>
</html>`;
}

/** Hard-tier CSS example: styles in `<head>`, markup in `<body>` (splits to CSS tab). */
export function hardCssDoc(
  options: HardHtmlDocOptions & { styles: string; body: string },
): string {
  return hardHtmlDoc(options.body, {
    title: options.title,
    lang: options.lang,
    dir: options.dir,
    head: `<style>\n${options.styles}\n</style>`,
  });
}

/** Wrap `<style>…</style>` + body fragments into a full hard-tier document. */
export function hardCssFromFragment(combined: string, title: string): string {
  const match = combined.match(/^<style>\s*([\s\S]*?)\s*<\/style>\s*([\s\S]*)$/i);
  if (!match) {
    return hardHtmlDoc(combined.trim(), { title });
  }
  return hardCssDoc({
    title,
    styles: match[1].trim(),
    body: match[2].trim(),
  });
}

/** @deprecated Use hardExample */
export function realWorldExample(
  code: string,
  expectedEn: string,
  expectedAr = expectedEn,
): CodeExample {
  return hardExample(code, expectedEn, expectedAr);
}

export function lessonExamples(
  simple: CodeExample,
  medium: CodeExample,
  hard: CodeExample,
): CodeExample[] {
  return [simple, medium, hard];
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
