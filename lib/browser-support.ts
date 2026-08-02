import type { BrowserSupportInfo, LocalizedString } from "@/lib/types";

export const baselineLabel: Record<
  BrowserSupportInfo["baseline"],
  LocalizedString
> = {
  widely: {
    en: "Baseline: Widely available",
    ar: "Baseline: متاح على نطاق واسع",
  },
  newly: {
    en: "Baseline: Newly available",
    ar: "Baseline: متاح حديثًا",
  },
  limited: {
    en: "Baseline: Limited",
    ar: "Baseline: محدود",
  },
};

export const browserNames = {
  chrome: { en: "Chrome", ar: "Chrome" },
  firefox: { en: "Firefox", ar: "Firefox" },
  safari: { en: "Safari", ar: "Safari" },
  edge: { en: "Edge", ar: "Edge" },
} as const;
