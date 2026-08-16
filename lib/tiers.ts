import type { Locale, Tier, TrackId } from "@/lib/types";
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

/** Sidebar lesson filters — omit pitfalls (lessons stay in the curriculum list). */
export const TIER_FILTERS: TierFilter[] = [
  "all",
  "beginner",
  "intermediate",
  "advanced",
  "pro",
  "cheatsheet",
];

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

const HTML_TIER_BLURB_KEY: Record<Tier, UiKey> = {
  beginner: "htmlTierBeginnerBlurb",
  intermediate: "htmlTierIntermediateBlurb",
  advanced: "htmlTierAdvancedBlurb",
  pro: "htmlTierProBlurb",
  pitfalls: "htmlTierPitfallsBlurb",
  cheatsheet: "htmlTierCheatsheetBlurb",
};

export function tierBlurb(
  tier: Tier,
  locale: Locale,
  trackId?: TrackId,
): string {
  if (trackId === "html") return t(HTML_TIER_BLURB_KEY[tier], locale);
  return t(TIER_BLURB_KEY[tier], locale);
}

export function tierBadgeClass(tier: Tier): string {
  switch (tier) {
    case "beginner":
      return "border-sky-400/35 bg-sky-400/10 text-sky-200";
    case "intermediate":
      return "border-yellow-300/35 bg-yellow-300/10 text-yellow-100";
    case "advanced":
      return "border-rose-400/35 bg-rose-400/10 text-rose-100";
    case "pro":
      return "border-violet-400/35 bg-violet-400/10 text-violet-100";
    case "pitfalls":
      return "border-orange-400/35 bg-orange-400/10 text-orange-100";
    case "cheatsheet":
      return "border-[#a10078]/40 bg-[#a10078]/10 text-[#e8a0d0]";
  }
}

export function tierEmoji(tier: Tier): string {
  switch (tier) {
    case "beginner":
      return "🔵";
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

/** Dot color for filter chips (CSS, not emoji). */
export function tierDotClass(tier: Tier | "all"): string {
  switch (tier) {
    case "all":
      return "bg-gradient-to-br from-yellow-300 to-cyan-300";
    case "beginner":
      return "bg-sky-400";
    case "intermediate":
      return "bg-yellow-300";
    case "advanced":
      return "bg-rose-400";
    case "pro":
      return "bg-violet-400";
    case "pitfalls":
      return "bg-orange-400";
    case "cheatsheet":
      return "bg-[#a10078]";
  }
}

/** Nested tree spine under a level. */
export function tierRailClass(tier: Tier): string {
  switch (tier) {
    case "beginner":
      return "border-sky-400/50";
    case "intermediate":
      return "border-yellow-300/50";
    case "advanced":
      return "border-rose-400/50";
    case "pro":
      return "border-violet-400/50";
    case "pitfalls":
      return "border-orange-400/50";
    case "cheatsheet":
      return "border-[#a10078]/70";
  }
}

/** Topic group labels in the curriculum tree. */
export function tierTopicLabelClass(tier: Tier): string {
  switch (tier) {
    case "beginner":
      return "text-sky-300";
    case "intermediate":
      return "text-yellow-200";
    case "advanced":
      return "text-rose-300";
    case "pro":
      return "text-violet-300";
    case "pitfalls":
      return "text-orange-300";
    case "cheatsheet":
      return "text-[#a10078]";
  }
}

/** Inactive filter chip shell — tier-tinted border/text. */
export function tierFilterIdleClass(tier: Tier | "all"): string {
  switch (tier) {
    case "all":
      return "border-white/12 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]";
    case "beginner":
      return "border-sky-400/25 bg-sky-400/[0.06] text-sky-100/90 hover:border-sky-400/40 hover:bg-sky-400/10";
    case "intermediate":
      return "border-yellow-300/25 bg-yellow-300/[0.06] text-yellow-100/90 hover:border-yellow-300/40 hover:bg-yellow-300/10";
    case "advanced":
      return "border-rose-400/25 bg-rose-400/[0.06] text-rose-100/90 hover:border-rose-400/40 hover:bg-rose-400/10";
    case "pro":
      return "border-violet-400/25 bg-violet-400/[0.06] text-violet-100/90 hover:border-violet-400/40 hover:bg-violet-400/10";
    case "pitfalls":
      return "border-orange-400/25 bg-orange-400/[0.06] text-orange-100/90 hover:border-orange-400/40 hover:bg-orange-400/10";
    case "cheatsheet":
      return "border-[#a10078]/30 bg-[#a10078]/10 text-[#e8a0d0] hover:border-[#a10078]/50 hover:bg-[#a10078]/15";
  }
}

/** Active filter chip fill. */
export function tierFilterActiveClass(tier: Tier | "all"): string {
  switch (tier) {
    case "all":
      return "border-transparent bg-gradient-to-r from-yellow-300 to-cyan-300 text-slate-950 shadow-[0_0_20px_-6px_rgba(34,211,238,0.55)]";
    case "beginner":
      return "border-sky-300/50 bg-sky-400 text-slate-950 shadow-[0_0_18px_-6px_rgba(56,189,248,0.55)]";
    case "intermediate":
      return "border-yellow-200/50 bg-yellow-300 text-slate-950 shadow-[0_0_18px_-6px_rgba(253,224,71,0.5)]";
    case "advanced":
      return "border-rose-300/50 bg-rose-400 text-slate-950 shadow-[0_0_18px_-6px_rgba(251,113,133,0.5)]";
    case "pro":
      return "border-violet-300/50 bg-violet-400 text-slate-950 shadow-[0_0_18px_-6px_rgba(167,139,250,0.5)]";
    case "pitfalls":
      return "border-orange-300/50 bg-orange-400 text-slate-950 shadow-[0_0_18px_-6px_rgba(251,146,60,0.5)]";
    case "cheatsheet":
      return "border-[#a10078]/60 bg-[#a10078] text-white shadow-[0_0_18px_-6px_rgba(161,0,120,0.55)]";
  }
}
