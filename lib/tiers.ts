import type { Locale, Tier } from "@/lib/types";
import { t, type UiKey } from "@/content/i18n/ui-strings";

export const TIER_ORDER: Tier[] = [
  "beginner",
  "intermediate",
  "advanced",
  "pro",
  "pitfalls",
  "cheatsheet",
];

export type TierFilter = "all" | Tier;

export const TIER_FILTERS: TierFilter[] = ["all", ...TIER_ORDER];

const TIER_UI_KEY: Record<Tier, UiKey> = {
  beginner: "tierBeginner",
  intermediate: "tierIntermediate",
  advanced: "tierAdvanced",
  pro: "tierPro",
  pitfalls: "tierPitfalls",
  cheatsheet: "tierCheatsheet",
};

const TIER_BLURB_KEY: Record<Tier, UiKey> = {
  beginner: "tierBeginnerBlurb",
  intermediate: "tierIntermediateBlurb",
  advanced: "tierAdvancedBlurb",
  pro: "tierProBlurb",
  pitfalls: "tierPitfallsBlurb",
  cheatsheet: "tierCheatsheetBlurb",
};

export function tierLabel(tier: Tier, locale: Locale): string {
  return t(TIER_UI_KEY[tier], locale);
}

export function tierBlurb(tier: Tier, locale: Locale): string {
  return t(TIER_BLURB_KEY[tier], locale);
}

export function tierBadgeClass(tier: Tier): string {
  switch (tier) {
    case "beginner":
      return "border-emerald-400/35 bg-emerald-400/10 text-emerald-200";
    case "intermediate":
      return "border-yellow-300/35 bg-yellow-300/10 text-yellow-100";
    case "advanced":
      return "border-rose-400/35 bg-rose-400/10 text-rose-100";
    case "pro":
      return "border-violet-400/35 bg-violet-400/10 text-violet-100";
    case "pitfalls":
      return "border-orange-400/35 bg-orange-400/10 text-orange-100";
    case "cheatsheet":
      return "border-cyan-400/35 bg-cyan-400/10 text-cyan-100";
  }
}

export function tierEmoji(tier: Tier): string {
  switch (tier) {
    case "beginner":
      return "🟢";
    case "intermediate":
      return "🟡";
    case "advanced":
      return "🔴";
    case "pro":
      return "⚡";
    case "pitfalls":
      return "⚠️";
    case "cheatsheet":
      return "📑";
  }
}
