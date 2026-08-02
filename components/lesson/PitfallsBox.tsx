"use client";

import { AlertTriangle, Check, X } from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import type { PitfallExample } from "@/lib/types";

export function PitfallsBox({ pitfalls }: { pitfalls: PitfallExample }) {
  const { locale } = useLanguage();

  return (
    <section className="rounded-3xl border border-orange-400/30 bg-gradient-to-br from-orange-400/10 via-slate-950/40 to-emerald-400/5 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-orange-100">
        <AlertTriangle size={16} className="text-orange-300" />
        {t("commonPitfalls", locale)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-rose-400/25 bg-rose-400/5 p-4">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-200">
            <X size={14} />
            {t("wrongWay", locale)}
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-5 text-rose-100/90">
            {pitfalls.wrong.code}
          </pre>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {loc(pitfalls.wrong.note, locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-4">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
            <Check size={14} />
            {t("rightWay", locale)}
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-5 text-emerald-100/90">
            {pitfalls.right.code}
          </pre>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {loc(pitfalls.right.note, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
