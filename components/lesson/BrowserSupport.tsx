"use client";

import { Globe2 } from "lucide-react";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { baselineLabel, browserNames } from "@/lib/browser-support";
import type { BrowserSupportInfo } from "@/lib/types";

const BROWSERS = ["chrome", "firefox", "safari", "edge"] as const;

const accent: Record<(typeof BROWSERS)[number], string> = {
  chrome: "border-yellow-400/30 bg-yellow-400/10 text-yellow-100",
  firefox: "border-orange-400/30 bg-orange-400/10 text-orange-100",
  safari: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  edge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
};

const baselineTone: Record<BrowserSupportInfo["baseline"], string> = {
  widely: "border-emerald-400/35 bg-emerald-400/15 text-emerald-100",
  newly: "border-amber-400/35 bg-amber-400/15 text-amber-100",
  limited: "border-rose-400/35 bg-rose-400/15 text-rose-100",
};

export function BrowserSupport({
  support,
  compact = false,
}: {
  support: BrowserSupportInfo;
  compact?: boolean;
}) {
  const { locale } = useLanguage();

  return (
    <section
      className={
        compact
          ? "rounded-2xl border border-white/10 bg-slate-950/50 p-3"
          : "rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-slate-950/50 to-cyan-400/5 p-5 sm:p-6"
      }
    >
      <div
        className={`mb-3 flex flex-wrap items-center justify-between gap-2 ${compact ? "mb-2" : ""}`}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
          <Globe2 size={compact ? 14 : 16} className="text-emerald-300" />
          {t("browserSupportTitle", locale)}
        </div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${baselineTone[support.baseline]}`}
        >
          {loc(baselineLabel[support.baseline], locale)}
        </span>
      </div>

      {!compact ? (
        <p className="mb-3 text-xs text-slate-400">
          {t("browserSupportHint", locale)}
        </p>
      ) : null}

      <div
        className={`grid gap-2 ${compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"}`}
      >
        {BROWSERS.map((id) => (
          <div
            key={id}
            className={`rounded-xl border px-2.5 py-2 ${accent[id]}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
              {loc(browserNames[id], locale)}
            </p>
            <p className={`font-mono ${compact ? "text-xs" : "text-sm"} font-semibold`}>
              {support[id]}
            </p>
          </div>
        ))}
      </div>

      {support.notes ? (
        <p className={`text-xs leading-5 text-slate-400 ${compact ? "mt-2" : "mt-3"}`}>
          <RichText text={loc(support.notes, locale)} />
        </p>
      ) : null}

      {support.fallback ? (
        <p
          className={`rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-xs leading-5 text-slate-300 ${compact ? "mt-2" : "mt-3"}`}
        >
          <span className="font-semibold text-emerald-200">
            {t("browserFallback", locale)}:{" "}
          </span>
          <RichText text={loc(support.fallback, locale)} />
        </p>
      ) : null}
    </section>
  );
}
