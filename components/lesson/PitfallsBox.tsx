"use client";

import { AlertTriangle, ArrowDown, ArrowRight, Check, X } from "lucide-react";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { RTL_FLIP } from "@/lib/rtl";
import type { PitfallExample, PitfallSide } from "@/lib/types";

function SidePanel({
  side,
  tone,
  showNote = true,
}: {
  side: PitfallSide;
  tone: "wrong" | "right";
  showNote?: boolean;
}) {
  const { locale } = useLanguage();
  const isWrong = tone === "wrong";

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border ${
        isWrong
          ? "border-rose-400/35 bg-gradient-to-b from-rose-400/12 via-slate-950/70 to-slate-950/40"
          : "border-emerald-400/35 bg-gradient-to-b from-emerald-400/12 via-slate-950/70 to-slate-950/40"
      }`}
    >
      <div
        className={`flex items-center gap-2 border-b px-3.5 py-2.5 ${
          isWrong
            ? "border-rose-400/20 bg-rose-400/10"
            : "border-emerald-400/20 bg-emerald-400/10"
        }`}
      >
        <p
          className={`inline-flex items-center gap-1.5 text-sm font-bold ${
            isWrong ? "text-rose-100" : "text-emerald-100"
          }`}
        >
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
              isWrong
                ? "bg-rose-400/25 text-rose-100"
                : "bg-emerald-400/25 text-emerald-100"
            }`}
          >
            {isWrong ? (
              <X size={12} strokeWidth={2.5} />
            ) : (
              <Check size={12} strokeWidth={2.5} />
            )}
          </span>
          {t(isWrong ? "wrongWay" : "rightWay", locale)}
        </p>
      </div>

      <pre
        dir="ltr"
        className={`flex-1 overflow-x-auto whitespace-pre-wrap px-3.5 py-3 font-mono text-[12px] leading-5 sm:text-[13px] ${
          showNote ? "border-b" : ""
        } ${
          isWrong
            ? "border-rose-400/15 bg-slate-950/55 text-rose-100/95"
            : "border-emerald-400/15 bg-slate-950/55 text-emerald-100/95"
        }`}
      >
        {side.code}
      </pre>

      {showNote ? (
        <p className="px-3.5 py-3 text-sm leading-relaxed text-slate-300">
          <RichText text={loc(side.note, locale)} />
        </p>
      ) : null}
    </article>
  );
}

function PitfallCard({
  item,
  index,
}: {
  item: PitfallExample;
  index: number;
}) {
  const { locale } = useLanguage();

  return (
    <div className="overflow-hidden rounded-3xl border border-orange-400/25 bg-gradient-to-br from-orange-400/[0.08] via-slate-950/55 to-emerald-400/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
      <div className="flex items-start gap-3 border-b border-white/8 px-4 py-3.5 sm:px-5">
        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-orange-300/30 bg-orange-400/15 font-mono text-[11px] font-bold text-orange-100">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold leading-snug text-white sm:text-base">
            {item.title ? (
              <RichText text={loc(item.title, locale)} />
            ) : locale === "ar" ? (
              `خطأ شائع ${index + 1}`
            ) : (
              `Pitfall ${index + 1}`
            )}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-rose-100/85">
            <RichText text={loc(item.wrong.note, locale)} />
          </p>
        </div>
      </div>

      <div className="grid items-stretch gap-3 p-4 sm:p-5 md:grid-cols-[1fr_auto_1fr]">
        <SidePanel side={item.wrong} tone="wrong" showNote={false} />

        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-300/25 bg-slate-950/80 text-orange-200 shadow-[0_0_22px_rgba(251,146,60,0.12)]">
            <ArrowDown size={16} className="md:hidden" />
            <ArrowRight size={16} className={`hidden md:block ${RTL_FLIP}`} />
          </span>
        </div>

        <SidePanel side={item.right} tone="right" />
      </div>
    </div>
  );
}

export function PitfallsBox({
  pitfalls,
}: {
  pitfalls: PitfallExample | PitfallExample[];
}) {
  const { locale } = useLanguage();
  const items = Array.isArray(pitfalls) ? pitfalls : [pitfalls];

  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-start gap-3 px-1">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-300/30 bg-orange-400/15 text-orange-200">
          <AlertTriangle size={18} />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-orange-50 sm:text-lg">
            {t("commonPitfalls", locale)}
          </h2>
          <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
            {t("pitfallsHint", locale)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <PitfallCard
            key={`${item.wrong.code}-${item.right.code}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
