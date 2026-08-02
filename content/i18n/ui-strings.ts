import type { Locale, LocalizedString } from "@/lib/types";

export const ui = {
  brand: { en: "FrontendCraft", ar: "FrontendCraft" },
  hubTagline: {
    en: "Interactive learning lab for the modern web",
    ar: "معمل تعلّم تفاعلي للويب الحديث",
  },
  heroWidgetEyebrow: {
    en: "Live concept",
    ar: "مفهوم مباشر",
  },
  heroWidgetTitle: {
    en: "Event Loop",
    ar: "Event Loop",
  },
  heroWidgetCaption: {
    en: "Stack runs now — Queue waits — Loop connects them.",
    ar: "الـ Call Stack بيشغّل دلوقتي — الـ Queue بيستنى — الـ Event Loop بيربطهم.",
  },
  chooseTrack: {
    en: "Choose a track",
    ar: "اختار track",
  },
  comingSoon: {
    en: "Coming soon",
    ar: "قريبًا",
  },
  openTrack: {
    en: "View curriculum",
    ar: "شوف المنهج",
  },
  backToTracks: {
    en: "All tracks",
    ar: "كل الـ tracks",
  },
  backToCurriculum: {
    en: "Curriculum",
    ar: "المنهج",
  },
  curriculumToc: {
    en: "Table of contents",
    ar: "جدول المحتويات",
  },
  levelsTree: {
    en: "Levels",
    ar: "المستويات",
  },
  expandAll: { en: "Expand all", ar: "افتح الكل" },
  collapseAll: { en: "Collapse all", ar: "اقفل الكل" },
  startCurriculum: {
    en: "Start first lesson",
    ar: "ابدأ أول درس",
  },
  continueLearning: {
    en: "Continue learning",
    ar: "كمّل التعلم",
  },
  curriculumLabPrimers: {
    en: "Lab primers",
    ar: "مقدمات المعمل",
  },
  curriculumLabPrimersHint: {
    en: "Shared references for the whole track — not repeated inside every lesson",
    ar: "مراجع مشتركة للـ track كله — مش متكررة جوّه كل درس",
  },

  lessonsCount: {
    en: "lessons",
    ar: "دروس",
  },
  emptyTrack: {
    en: "Lessons for this track are coming soon.",
    ar: "دروس الـ track ده هتيجي قريب.",
  },
  tagline: {
    en: "Interactive core JavaScript lab",
    ar: "معمل تفاعلي لأساسيات JavaScript",
  },
  searchPlaceholder: {
    en: "Search lessons…",
    ar: "دور على درس…",
  },
  lessons: { en: "Curriculum", ar: "المنهج" },
  progress: { en: "Your progress", ar: "تقدمك" },
  completed: { en: "completed", ar: "مكتمل" },
  markComplete: { en: "Mark as complete", ar: "علّم كمكتمل" },
  markIncomplete: { en: "Mark as incomplete", ar: "رجع لغير مكتمل" },
  difficulty: { en: "Tier", ar: "المستوى" },
  filterAll: { en: "All", ar: "الكل" },
  tierBeginner: { en: "Beginner", ar: "مبتدئ" },
  tierIntermediate: { en: "Intermediate", ar: "متوسط" },
  tierAdvanced: { en: "Advanced", ar: "متقدم" },
  tierPro: { en: "Pro", ar: "Pro" },
  tierPitfalls: { en: "Pitfalls", ar: "أخطاء شائعة" },
  tierCheatsheet: { en: "CheatSheet", ar: "CheatSheet" },
  tierBeginnerBlurb: {
    en: "Fundamental building blocks",
    ar: "أساسيات البناء",
  },
  tierIntermediateBlurb: {
    en: "Practical usage & patterns",
    ar: "استخدام عملي وأنماط",
  },
  tierAdvancedBlurb: {
    en: "Under the hood & engine execution",
    ar: "تحت الغطا وتنفيذ الـ engine",
  },
  tierProBlurb: {
    en: "Performance, memory & architecture",
    ar: "أداء وذاكرة وهندسة",
  },
  tierPitfallsBlurb: {
    en: "Tricky edge cases & gotchas",
    ar: "حالات خادعة وأخطاء شائعة",
  },
  tierCheatsheetBlurb: {
    en: "Fast visual reference cards",
    ar: "كروت مرجع سريع",
  },
  tierProgress: { en: "tier progress", ar: "تقدم المستوى" },
  readTime: { en: "min read", ar: "دقيقة قراءة" },
  explanation: { en: "Simplified explanation", ar: "شرح مبسّط" },
  keyPoints: { en: "Key takeaways", ar: "النقاط المهمة" },
  visualLab: { en: "Motion lab", ar: "معمل الحركة" },
  explainMore: { en: "Explain more / Under the hood", ar: "اشرح أكتر / Under the hood" },
  explainMoreHint: {
    en: "Deep dive — engine, memory, and call-stack context",
    ar: "تعمّق — الـ engine والذاكرة وسياق الـ call stack",
  },
  underTheHood: {
    en: "⚙️ Under the Hood (Engine Mechanics)",
    ar: "⚙️ Under the Hood (ميكانيكا الـ Engine)",
  },
  underTheHoodHint: {
    en: "How V8 / Blink / Gecko process this concept — memory, queues, and the render pipeline",
    ar: "إزاي V8 / Blink / Gecko بيعالجوا المفهوم ده — ذاكرة و queues ومسار الـ render",
  },
  accessibilityTitle: {
    en: "♿ Accessibility (a11y) Best Practices",
    ar: "♿ Accessibility (a11y) Best Practices",
  },
  accessibilityHint: {
    en: "How NVDA / VoiceOver hear this pattern — ARIA, keyboard, and focus",
    ar: "إزاي NVDA / VoiceOver بيسمعوا الـ pattern ده — ARIA والكيبورد والـ focus",
  },
  seoTitle: {
    en: "🔍 SEO Insights",
    ar: "🔍 SEO Insights",
  },
  seoHint: {
    en: "Crawl → render → index, SSR vs CSR, titles, canonicals, links, structured data",
    ar: "Crawl → render → index و SSR مقابل CSR والعناوين والـ canonicals واللينكات و structured data",
  },
  insightCodeLabel: { en: "Reference snippet", ar: "Snippet مرجعي" },
  commonPitfalls: { en: "⚠️ Common Pitfalls & Anti-Patterns", ar: "⚠️ Common Pitfalls & Anti-Patterns" },
  wrongWay: { en: "Anti-pattern (bad practice)", ar: "Anti-pattern (ممارسة غلط)" },
  rightWay: { en: "Modern standard (best practice)", ar: "المعيار الحديث (أفضل ممارسة)" },
  exampleSimple: { en: "Simple", ar: "Simple" },
  exampleRealWorld: { en: "Real-World", ar: "Real-World" },
  cheatSheetTitle: { en: "Interactive CheatSheet", ar: "CheatSheet تفاعلي" },
  cheatSheetHint: {
    en: "Filter by category, preview live, then copy code or a full boilerplate",
    ar: "فلتر حسب الفئة، اتفرّج على preview مباشر، وبعدين انسخ الكود أو boilerplate كامل",
  },
  snippetCopied: { en: "Snippet copied", ar: "الـ snippet اتنسخ" },
  cheatFilterAll: { en: "All", ar: "الكل" },
  cheatFilterStructure: {
    en: "Layout & Structure",
    ar: "Layout & Structure",
  },
  cheatFilterForms: { en: "Forms", ar: "Forms" },
  cheatFilterMedia: { en: "Media", ar: "Media" },
  cheatFilterInteractive: {
    en: "Interactive & Dialogs",
    ar: "Interactive & Dialogs",
  },
  cheatFilterHead: { en: "Head & Meta", ar: "Head & Meta" },
  cheatFilterEmpty: {
    en: "No cards in this category yet.",
    ar: "مفيش كروت في الفئة دي لسه.",
  },
  livePreview: { en: "Live preview", ar: "معاينة مباشرة" },
  copyCode: { en: "Copy Code", ar: "انسخ الكود" },
  copyTailwind: { en: "Copy Tailwind", ar: "انسخ Tailwind" },
  copyBoilerplate: { en: "Copy Boilerplate", ar: "انسخ Boilerplate" },
  codeCopiedToast: { en: "Code copied to clipboard", ar: "الكود اتنسخ" },
  tailwindCopiedToast: {
    en: "Tailwind snippet copied",
    ar: "Snippet الـ Tailwind اتنسخ",
  },
  boilerplateCopiedToast: {
    en: "Boilerplate copied to clipboard",
    ar: "الـ Boilerplate اتنسخ",
  },
  domTreeTitle: {
    en: "DOM Tree Graph Engine",
    ar: "DOM Tree Graph Engine",
  },
  domTreeHint: {
    en: "Watch Parent → Child → Text reveal. Use Play, Pause, Stop, or Step.",
    ar: "اتفرّج على Parent → Child → Text. استخدم Play أو Pause أو Stop أو Step.",
  },
  simPlay: { en: "Play", ar: "Play" },
  simPause: { en: "Pause", ar: "Pause" },
  simStop: { en: "Stop", ar: "Stop" },
  simStep: { en: "Step", ar: "Step" },
  simReplay: { en: "Replay", ar: "Replay" },
  simScreenReader: { en: "Screen Reader view", ar: "Screen Reader view" },
  pipelineTitle: {
    en: "Browser Rendering Pipeline",
    ar: "Browser Rendering Pipeline",
  },
  pipelineHint: {
    en: "Parse → DOM → CSSOM → Render → Layout → Paint — step through how engines build a frame",
    ar: "Parse → DOM → CSSOM → Render → Layout → Paint — امشي خطوة بخطوة إزاي الـ engine بيرسم فريم",
  },
  compareTitle: {
    en: "Practice: Bad vs Screen-Reader Ready",
    ar: "Practice: Bad vs Screen-Reader Ready",
  },
  compareHint: {
    en: "Scan bad barriers vs semantic patterns — then try the challenge below",
    ar: "اتفرّج على bad barriers مقابل semantic patterns — وبعدين جرّب الـ challenge تحت",
  },
  challengeTitle: {
    en: "Quick challenge",
    ar: "تحدي سريع",
  },
  challengeCorrect: { en: "Correct!", ar: "صح!" },
  challengeWrong: { en: "Not quite.", ar: "لسه." },
  challengeHintBar: {
    en: "Try the challenge below",
    ar: "جرّب الـ challenge تحت",
  },
  nextLessonArrow: { en: "Next lesson ➔", ar: "الدرس اللي بعده ➔" },
  browserSupportTitle: {
    en: "Browser Compatibility",
    ar: "توافق المتصفحات",
  },
  browserSupportHint: {
    en: "Minimum versions + W3C Baseline status — and a fallback when legacy engines matter",
    ar: "أقل إصدارات + حالة W3C Baseline — و fallback لما الـ engines القديمة تهم",
  },
  browserFallback: { en: "Fallback", ar: "Fallback" },
  playground: { en: "Code playground", ar: "Code playground" },
  liveSandbox: { en: "Live sandbox", ar: "Sandbox مباشر" },
  expectedHint: { en: "Expected", ar: "المتوقع" },
  output: { en: "Console", ar: "Console" },
  run: { en: "Run code", ar: "Run code" },
  running: { en: "Running…", ar: "بيشتغل…" },
  copy: { en: "Copy", ar: "انسخ" },
  copied: { en: "Copied!", ar: "اتنسخ!" },
  restoreCode: { en: "Restore original", ar: "رجّع الأصلي" },
  sfxOn: { en: "SFX on", ar: "الصوت شغال" },
  sfxOff: { en: "SFX off", ar: "الصوت مقفول" },
  next: { en: "Next lesson", ar: "الدرس اللي بعده" },
  prev: { en: "Previous", ar: "السابق" },
  openMenu: { en: "Open lessons", ar: "افتح الدروس" },
  closeMenu: { en: "Close menu", ar: "اقفل القائمة" },
  langEn: { en: "EN", ar: "EN" },
  langAr: { en: "عربي", ar: "عربي" },
  beginner: { en: "Beginner", ar: "مبتدئ" },
  intermediate: { en: "Intermediate", ar: "متوسط" },
  advanced: { en: "Advanced", ar: "متقدم" },
  pro: { en: "Pro", ar: "Pro" },
  pitfalls: { en: "Pitfalls", ar: "أخطاء شائعة" },
  cheatsheet: { en: "CheatSheet", ar: "CheatSheet" },
  noResults: {
    en: "No lessons match your search.",
    ar: "مفيش دروس مطابقة للبحث.",
  },
  selectLesson: {
    en: "Pick a lesson from the sidebar to begin.",
    ar: "اختار درس من القائمة عشان تبدأ.",
  },
} as const satisfies Record<string, LocalizedString>;

export type UiKey = keyof typeof ui;

export function t(key: UiKey, locale: Locale): string {
  return ui[key][locale];
}

export function loc(value: LocalizedString, locale: Locale): string {
  return value[locale];
}
