import type { LocalizedString, Tier } from "@/lib/types";

/**
 * Canonical HTML curriculum order (1-based numbers in the sidebar).
 * Kept separate from lessons.ts so activity coverage checks cannot create import cycles.
 */
export const HTML_CURRICULUM_ORDER = [
  // Beginner
  "document-anatomy",
  "html-comments",
  "semantic-structure",
  "text-headings",
  "text-formatting",
  "inline-vs-block",
  "links-images",
  "lists",
  "classes-and-ids",
  "global-attributes",
  "html-beginner-quiz",
  // Intermediate
  "forms-inputs",
  "form-ux-attributes",
  "tables",
  "details-summary",
  "html-intermediate-quiz",
  // Advanced
  "media-embed",
  "native-dialog",
  "html-native-interactive",
  "picture-source",
  "browser-compatibility",
  "meta-seo",
  "head-social-meta",
  "accessibility-basics",
  "html-architecture-partials",
  "sr-practice",
  "html-advanced-quiz",
  // Pro (pitfalls is the capstone)
  "html-core-web-vitals",
  "html-perf-media",
  "html-security-hardening",
  "html-speculation-rules",
  "html-global-rtl",
  "html-browser-apis",
  "html-common-pitfalls",
  "html-pro-quiz",
  // CheatSheet
  "html-cheatsheet",
] as const;

export type CurriculumTreeBranch = {
  id: string;
  title: LocalizedString;
  slugs: readonly string[];
};

/** Topic sub-trees under each HTML level. */
export const HTML_CURRICULUM_TREE: Partial<
  Record<Tier, readonly CurriculumTreeBranch[]>
> = {
  beginner: [
    {
      id: "shell",
      title: { en: "Page shell", ar: "هيكل الصفحة" },
      slugs: ["document-anatomy", "html-comments"],
    },
    {
      id: "meaning",
      title: { en: "Text & meaning", ar: "النص والمعنى" },
      slugs: [
        "semantic-structure",
        "text-headings",
        "text-formatting",
        "inline-vs-block",
      ],
    },
    {
      id: "connect",
      title: { en: "Links & lists", ar: "اللينكات والـ lists" },
      slugs: ["links-images", "lists"],
    },
    {
      id: "hooks",
      title: { en: "Classes & attributes", ar: "الـ classes والـ attributes" },
      slugs: ["classes-and-ids", "global-attributes"],
    },
    {
      id: "check",
      title: { en: "Level check", ar: "اختبار المستوى" },
      slugs: ["html-beginner-quiz"],
    },
  ],
  intermediate: [
    {
      id: "forms",
      title: { en: "Forms", ar: "الفورمز" },
      slugs: ["forms-inputs", "form-ux-attributes"],
    },
    {
      id: "layout",
      title: { en: "Tables & details", ar: "الجداول و details" },
      slugs: ["tables", "details-summary"],
    },
    {
      id: "check",
      title: { en: "Level check", ar: "اختبار المستوى" },
      slugs: ["html-intermediate-quiz"],
    },
  ],
  advanced: [
    {
      id: "media",
      title: { en: "Media & native UI", ar: "الميديا و native UI" },
      slugs: [
        "media-embed",
        "native-dialog",
        "html-native-interactive",
        "picture-source",
      ],
    },
    {
      id: "compat",
      title: { en: "Compatibility", ar: "التوافق" },
      slugs: ["browser-compatibility"],
    },
    {
      id: "find",
      title: { en: "SEO & social", ar: "SEO والسوشيال" },
      slugs: ["meta-seo", "head-social-meta"],
    },
    {
      id: "a11y",
      title: { en: "Accessibility", ar: "إمكانية الوصول" },
      slugs: ["accessibility-basics", "sr-practice"],
    },
    {
      id: "arch",
      title: { en: "Architecture", ar: "الهيكل" },
      slugs: ["html-architecture-partials"],
    },
    {
      id: "check",
      title: { en: "Level check", ar: "اختبار المستوى" },
      slugs: ["html-advanced-quiz"],
    },
  ],
  pro: [
    {
      id: "speed",
      title: { en: "Speed", ar: "السرعة" },
      slugs: ["html-core-web-vitals", "html-perf-media"],
    },
    {
      id: "protect",
      title: { en: "Security & APIs", ar: "الأمان و APIs" },
      slugs: [
        "html-security-hardening",
        "html-speculation-rules",
        "html-browser-apis",
      ],
    },
    {
      id: "rtl",
      title: { en: "Global & RTL", ar: "عالمي و RTL" },
      slugs: ["html-global-rtl"],
    },
    {
      id: "capstone",
      title: { en: "Capstone", ar: "الخاتمة" },
      slugs: ["html-common-pitfalls"],
    },
    {
      id: "check",
      title: { en: "Level check", ar: "اختبار المستوى" },
      slugs: ["html-pro-quiz"],
    },
  ],
};
