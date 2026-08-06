import { L } from "@/content/helpers";
import type { LocalizedString } from "@/lib/types";

/** User-facing track wording — see content/i18n/glossary.ts for full terminology. */
export const trackTerms = {
  singular: L("track", "مسار"),
  plural: L("tracks", "مسارات"),
  html: L("HTML Fundamentals", "أساسيات HTML"),
  css: L("CSS Foundations", "أساسيات CSS"),
  js: L("JavaScript Core", "أساسيات JavaScript"),
  jsShort: L("JS Core", "أساسيات JS"),
  openHtml: L("Start HTML Fundamentals", "ابدأ أساسيات HTML"),
  openJs: L("Start JavaScript Core", "ابدأ أساسيات JavaScript"),
  all: L("All tracks", "جميع المسارات"),
  browse: L("Browse all tracks", "استعرض جميع المسارات"),
  empty: L(
    "Lessons for this track are coming soon.",
    "دروس هذا المسار ستتوفر قريبًا.",
  ),
  teaches: L("What you'll build", "ما ستبنيه"),
} as const satisfies Record<string, LocalizedString>;
