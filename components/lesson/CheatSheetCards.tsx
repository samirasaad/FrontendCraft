"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  FileCode2,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { BrowserSupport } from "@/components/lesson/BrowserSupport";
import { loc, t, type UiKey } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { CheatCard, CheatCategory } from "@/lib/types";

type FilterId = "all" | CheatCategory;

const FILTERS: { id: FilterId; labelKey: UiKey }[] = [
  { id: "all", labelKey: "cheatFilterAll" },
  { id: "structure", labelKey: "cheatFilterStructure" },
  { id: "forms", labelKey: "cheatFilterForms" },
  { id: "media", labelKey: "cheatFilterMedia" },
  { id: "interactive", labelKey: "cheatFilterInteractive" },
];

type ToastState = {
  message: string;
  id: number;
};

function previewDocument(html: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 12px;
    font: 13px/1.45 system-ui, sans-serif;
    color: #0f172a;
    background:
      linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  }
  button, summary, a { cursor: pointer; }
  dialog {
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 12px 14px;
    max-width: 90%;
  }
  dialog::backdrop { background: rgb(15 23 42 / 0.35); }
  details {
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 8px 10px;
    background: #fff;
  }
  img, video { max-width: 100%; height: auto; border-radius: 8px; }
  label { display: grid; gap: 4px; font-size: 12px; }
  input, select, textarea {
    border: 1px solid #94a3b8;
    border-radius: 8px;
    padding: 6px 8px;
    font: inherit;
  }
  .chip {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 999px;
    background: #dbeafe;
    color: #1e3a8a;
    font-size: 11px;
    font-weight: 600;
  }
</style>
</head>
<body>${html}</body>
</html>`;
}

export function CheatSheetCards({ cards }: { cards: CheatCard[] }) {
  const { locale } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const [filter, setFilter] = useState<FilterId>("all");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const hasCategories = cards.some((c) => c.category);

  const filtered = useMemo(() => {
    if (filter === "all") return cards;
    return cards.filter((c) => c.category === filter);
  }, [cards, filter]);

  if (!cards.length) return null;

  async function copyText(text: string, key: string, message: string) {
    playClick();
    try {
      await navigator.clipboard.writeText(text);
      playSuccess();
      setCopiedKey(key);
      setToast({ message, id: Date.now() });
      window.setTimeout(() => setCopiedKey(null), 1400);
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setCopiedKey(null);
    }
  }

  return (
    <section className="relative space-y-4 rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/10 via-slate-950/40 to-yellow-300/5 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <LayoutGrid size={16} />
            {t("cheatSheetTitle", locale)}
          </div>
          <p className="text-xs text-slate-400">{t("cheatSheetHint", locale)}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-100">
          <Sparkles size={12} />
          {filtered.length}/{cards.length}
        </span>
      </div>

      {hasCategories ? (
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label={t("cheatFilterAll", locale)}
        >
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  playClick();
                  setFilter(item.id);
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-50"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {t(item.labelKey, locale)}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((card, index) => {
          const cardKey = card.id ?? `${card.snippet.slice(0, 24)}-${index}`;
          const codeCopied = copiedKey === `${cardKey}-code`;
          const boilCopied = copiedKey === `${cardKey}-boil`;

          return (
            <article
              key={cardKey}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl"
            >
              {card.previewHtml ? (
                <div className="border-b border-white/10 bg-slate-900/80 p-2">
                  <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {t("livePreview", locale)}
                  </p>
                  <iframe
                    title={loc(card.title, locale)}
                    sandbox=""
                    srcDoc={previewDocument(card.previewHtml)}
                    className="h-36 w-full rounded-xl border border-white/10 bg-white"
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {loc(card.title, locale)}
                  </h3>
                  {card.category ? (
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                      {t(
                        (
                          {
                            structure: "cheatFilterStructure",
                            forms: "cheatFilterForms",
                            media: "cheatFilterMedia",
                            interactive: "cheatFilterInteractive",
                          } as const
                        )[card.category],
                        locale,
                      )}
                    </span>
                  ) : null}
                </div>

                <pre className="max-h-36 overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-950/70 p-3 font-mono text-[11px] leading-5 text-yellow-100/90">
                  {card.snippet}
                </pre>

                <p className="text-xs leading-5 text-slate-400">
                  {loc(card.note, locale)}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        card.snippet,
                        `${cardKey}-code`,
                        t("codeCopiedToast", locale),
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                  >
                    {codeCopied ? <Check size={12} /> : <Copy size={12} />}
                    {codeCopied ? t("copied", locale) : t("copyCode", locale)}
                  </button>
                  {card.boilerplate ? (
                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          card.boilerplate!,
                          `${cardKey}-boil`,
                          t("boilerplateCopiedToast", locale),
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1.5 text-[11px] font-semibold text-yellow-100 transition hover:bg-yellow-300/20"
                    >
                      {boilCopied ? (
                        <Check size={12} />
                      ) : (
                        <FileCode2 size={12} />
                      )}
                      {boilCopied
                        ? t("copied", locale)
                        : t("copyBoilerplate", locale)}
                    </button>
                  ) : null}
                </div>

                {card.support ? (
                  <BrowserSupport support={card.support} compact />
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-slate-500">
          {t("cheatFilterEmpty", locale)}
        </p>
      ) : null}

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-cyan-300/40 bg-slate-950/95 px-4 py-2 text-sm font-semibold text-cyan-50 shadow-lg shadow-cyan-500/20 backdrop-blur-xl"
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
