import { L } from "@/content/helpers";
import type { LocalizedString } from "@/lib/types";

/** User-facing curriculum wording — replaces legacy "track" (not the live playground "lab"). */
export const labTerms = {
  singular: L("lab", "معمل"),
  plural: L("labs", "معامل"),
  html: L("HTML lab", "معمل HTML"),
  js: L("JavaScript lab", "معمل JavaScript"),
  jsShort: L("JS lab", "معمل JS"),
  openHtml: L("Open HTML lab", "افتح معمل HTML"),
  openJs: L("Open JS lab", "افتح معمل JS"),
  all: L("All labs", "كل المعامل"),
  browse: L("Browse all labs", "شوف كل المعامل"),
  empty: L(
    "Lessons for this lab are coming soon.",
    "دروس المعمل ده هتيجي قريب.",
  ),
  teaches: L("What this lab teaches", "المعمل ده بيعلّمك إيه"),
} as const satisfies Record<string, LocalizedString>;
