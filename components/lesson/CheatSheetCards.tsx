"use client";

import { useState } from "react";
import { Check, Copy, LayoutGrid } from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { CheatCard } from "@/lib/types";

export function CheatSheetCards({ cards }: { cards: CheatCard[] }) {
  const { locale } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!cards.length) return null;

  async function handleCopy(snippet: string, index: number) {
    playClick();
    try {
      await navigator.clipboard.writeText(snippet);
      playSuccess();
      setCopiedId(index);
      window.setTimeout(() => setCopiedId(null), 1400);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <section className="rounded-3xl border border-cyan-400/25 bg-cyan-400/5 p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-cyan-100">
        <LayoutGrid size={16} />
        {t("cheatSheetTitle", locale)}
      </div>
      <p className="mb-4 text-xs text-slate-400">{t("cheatSheetHint", locale)}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card, index) => {
          const copied = copiedId === index;
          return (
            <button
              key={`${card.snippet}-${index}`}
              type="button"
              onClick={() => handleCopy(card.snippet, index)}
              className="group rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-start transition hover:border-cyan-400/40 hover:bg-cyan-400/5"
            >
              <span className="mb-2 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-white">
                  {loc(card.title, locale)}
                </span>
                {copied ? (
                  <Check size={14} className="text-cyan-300" />
                ) : (
                  <Copy
                    size={14}
                    className="text-slate-500 transition group-hover:text-cyan-300"
                  />
                )}
              </span>
              <pre className="mb-2 overflow-x-auto whitespace-pre-wrap font-mono text-[11px] leading-5 text-yellow-100/90">
                {card.snippet}
              </pre>
              <span className="text-xs leading-5 text-slate-400">
                {copied ? t("snippetCopied", locale) : loc(card.note, locale)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
