import type { TrackMeta } from "@/lib/types";

export const accessibilityMeta: TrackMeta = {
  id: "accessibility",
  status: "coming-soon",
  order: 7,
  accent: "from-emerald-300 to-teal-500",
  icon: "Accessibility",
  title: { en: "Accessibility", ar: "Accessibility" },
  tagline: {
    en: "Same product — more people can complete the task.",
    ar: "نفس المنتج — المزيد من المستخدمين يمكنهم إكمال المهمة.",
  },
  description: {
    en: "Keyboard paths, semantics, contrast, and assistive tech — so every user can use the UI.",
    ar: "مسارات لوحة المفاتيح، الدلالات، التباين، وتقنيات المساعدة — حتى يتمكن كل مستخدم من استخدام الواجهة.",
  },
};
