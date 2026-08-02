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
    en: "Start learning",
    ar: "ابدأ التعلم",
  },
  backToTracks: {
    en: "All tracks",
    ar: "كل الـ tracks",
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
  lessons: { en: "Core Lessons", ar: "الدروس الأساسية" },
  progress: { en: "Your progress", ar: "تقدمك" },
  completed: { en: "completed", ar: "مكتمل" },
  markComplete: { en: "Mark as complete", ar: "علّم كمكتمل" },
  markIncomplete: { en: "Mark as incomplete", ar: "رجع لغير مكتمل" },
  difficulty: { en: "Difficulty", ar: "المستوى" },
  readTime: { en: "min read", ar: "دقيقة قراءة" },
  explanation: { en: "Simplified explanation", ar: "شرح مبسّط" },
  keyPoints: { en: "Key takeaways", ar: "النقاط المهمة" },
  visualLab: { en: "Motion lab", ar: "معمل الحركة" },
  playground: { en: "Code playground", ar: "Code playground" },
  liveSandbox: { en: "Live sandbox", ar: "Sandbox مباشر" },
  expectedHint: { en: "Expected", ar: "المتوقع" },
  output: { en: "Console", ar: "Console" },
  run: { en: "Run code", ar: "Run code" },
  running: { en: "Running…", ar: "بيشتغل…" },
  copy: { en: "Copy", ar: "انسخ" },
  copied: { en: "Copied!", ar: "اتنسخ!" },
  restoreCode: { en: "Restore original", ar: "رجّع الأصلي" },
  next: { en: "Next lesson", ar: "الدرس اللي بعده" },
  prev: { en: "Previous", ar: "السابق" },
  openMenu: { en: "Open lessons", ar: "افتح الدروس" },
  closeMenu: { en: "Close menu", ar: "اقفل القائمة" },
  langEn: { en: "EN", ar: "EN" },
  langAr: { en: "عربي", ar: "عربي" },
  beginner: { en: "Beginner", ar: "مبتدئ" },
  intermediate: { en: "Intermediate", ar: "متوسط" },
  advanced: { en: "Advanced", ar: "متقدم" },
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
