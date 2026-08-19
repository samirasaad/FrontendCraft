"use client";

import { Search } from "lucide-react";
import { InsightCode } from "@/components/lesson/InsightCode";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import type { InsightSection } from "@/lib/types";

export function SeoCallout({ section }: { section: InsightSection }) {
  const { locale } = useLanguage();

  if (!section.paragraphs.length) return null;

  return (
    <aside className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-slate-950/50 to-yellow-300/5 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-100">
        <Search size={16} className="text-amber-300" />
        {t("seoTitle", locale)}
      </div>
      <p className="mb-3 text-sm leading-relaxed text-slate-300">{t("seoHint", locale)}</p>
      <div className="space-y-3 text-base leading-7 text-slate-200">
        {section.paragraphs.map((p, i) => (
          <p key={i}>
            <RichText text={loc(p, locale)} />
          </p>
        ))}
      </div>
      {section.bullets?.length ? (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-xl border border-amber-400/15 bg-slate-950/40 px-3 py-2 text-sm text-slate-200"
            >
              <span className="text-amber-300">🔍</span>
              <span>
                <RichText text={loc(b, locale)} />
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {section.code ? (
        <InsightCode code={section.code} caption={section.codeCaption} />
      ) : null}
    </aside>
  );
}
