import type { TrackMeta } from "@/lib/types";

export const cssMeta: TrackMeta = {
  id: "css",
  status: "available",
  order: 3,
  accent: "from-sky-400 to-blue-500",
  icon: "Palette",
  title: { en: "CSS Foundations", ar: "أساسيات CSS" },
  tagline: {
    en: "Why a page feels like a product, not a bare document.",
    ar: "لماذا تبدو الصفحة كمنتج وليس كمستند فارغ.",
  },
  description: {
    en: "Layout, cascade, responsive design, and visual systems — turning structure into polished UI.",
    ar: "التخطيط، التسلسل، التصميم المتجاوب، وأنظمة الشكل — تحويل البنية إلى واجهة منسقة.",
  },
};
