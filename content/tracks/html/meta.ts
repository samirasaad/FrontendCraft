import type { TrackMeta } from "@/lib/types";

export const htmlMeta: TrackMeta = {
  id: "html",
  status: "available",
  order: 1,
  accent: "from-orange-400 to-amber-300",
  icon: "Code2",
  title: { en: "HTML Fundamentals", ar: "أساسيات HTML" },
  tagline: {
    en: "HTML is the page. Tags tell the browser what each part *is*.",
    ar: "HTML هو الصفحة. الـ tags بتقول للمتصفح كل جزء *إيه*.",
  },
  description: {
    en: "Start with the page shell, then text, links, lists, forms, and tables. Later: accessibility, SEO, and speed. You write tags — the browser builds the page people see.",
    ar: "ابدأ بهيكل الصفحة، وبعدين النص واللينكات والقوائم والفورم والجداول. بعدين: إمكانية الوصول و SEO والسرعة. إنت بتكتب tags — المتصفح بيبني الصفحة اللي الناس بتشوفها.",
  },
};
