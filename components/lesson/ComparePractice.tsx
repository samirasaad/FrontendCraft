"use client";

import { ArrowDown, ArrowRight, Check, X } from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { RTL_FLIP } from "@/lib/rtl";
import type { ComparePair } from "@/lib/types";

export function ComparePractice({ cards }: { cards: ComparePair[] }) {
  const { locale } = useLanguage();

  if (!cards.length) return null;

  return (
    <section className="space-y-3">
      <div className="px-1">
        <p className="text-sm font-semibold text-orange-100">
          {t("compareTitle", locale)}
        </p>
        <p className="text-xs text-slate-400">{t("compareHint", locale)}</p>
      </div>
      <div className="grid gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-5"
          >
            {card.title ? (
              <p className="mb-3 text-sm font-semibold text-white">
                {loc(card.title, locale)}
              </p>
            ) : null}
            <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
              <article className="rounded-2xl border border-rose-400/30 bg-rose-400/5 p-4">
                <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-200">
                  <X size={14} />
                  {loc(card.bad.label, locale)}
                </p>
                <pre className="mb-3 overflow-x-auto whitespace-pre-wrap rounded-xl border border-rose-400/15 bg-slate-950/50 p-3 font-mono text-[11px] leading-5 text-rose-100/90">
                  {card.bad.code}
                </pre>
                <p className="text-sm leading-6 text-slate-300">
                  {loc(card.bad.note, locale)}
                </p>
              </article>

              <div
                className="flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
                  <ArrowDown size={16} className="md:hidden" />
                  <ArrowRight
                    size={16}
                    className={`hidden md:block ${RTL_FLIP}`}
                  />
                </span>
              </div>

              <article className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-4">
                <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                  <Check size={14} />
                  {loc(card.good.label, locale)}
                </p>
                <pre className="mb-3 overflow-x-auto whitespace-pre-wrap rounded-xl border border-emerald-400/15 bg-slate-950/50 p-3 font-mono text-[11px] leading-5 text-emerald-100/90">
                  {card.good.code}
                </pre>
                <p className="text-sm leading-6 text-slate-300">
                  {loc(card.good.note, locale)}
                </p>
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
