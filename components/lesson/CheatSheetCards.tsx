"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  FileCode2,
  LayoutGrid,
  Sparkles,
  Wind,
} from "lucide-react";
import { BrowserSupport } from "@/components/lesson/BrowserSupport";
import { RichText } from "@/components/shared/RichText";
import { loc, t, type UiKey } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { CheatCard, CheatCategory } from "@/lib/types";

type FilterId = "all" | CheatCategory;

const FILTERS: { id: FilterId; labelKey: UiKey }[] = [
  { id: "all", labelKey: "cheatFilterAll" },
  { id: "structure", labelKey: "cheatFilterStructure" },
  { id: "interactive", labelKey: "cheatFilterInteractive" },
  { id: "forms", labelKey: "cheatFilterForms" },
  { id: "media", labelKey: "cheatFilterMedia" },
  { id: "head", labelKey: "cheatFilterHead" },
];

const categoryLabelKey: Record<CheatCategory, UiKey> = {
  structure: "cheatFilterStructure",
  interactive: "cheatFilterInteractive",
  forms: "cheatFilterForms",
  media: "cheatFilterMedia",
  head: "cheatFilterHead",
};

type ToastState = { message: string; id: number };

function previewDocument(html: string): string {
  if (/<!DOCTYPE/i.test(html) || /<html[\s>]/i.test(html)) {
    return html;
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Preview</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 12px;
    font: 14px/1.45 system-ui, sans-serif;
    color: #111;
    background: #fff;
  }
  button, summary, a { cursor: pointer; }
  dialog {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 14px;
    max-width: 90%;
  }
  dialog::backdrop { background: rgb(0 0 0 / 0.35); }
  details {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px 10px;
  }
  img, video { max-width: 100%; height: auto; }
  label { display: grid; gap: 4px; font-size: 13px; }
  input, select, textarea {
    border: 1px solid #999;
    border-radius: 4px;
    padding: 6px 8px;
    font: inherit;
  }
</style>
</head>
<body>
${html}
</body>
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((card, index) => {
          const cardKey = card.id ?? `${card.snippet.slice(0, 24)}-${index}`;
          const codeCopied = copiedKey === `${cardKey}-code`;
          const twCopied = copiedKey === `${cardKey}-tw`;
          const boilCopied = copiedKey === `${cardKey}-boil`;

          return (
            <article
              key={cardKey}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl transition hover:border-cyan-400/30"
            >
              {card.previewHtml || card.snippet ? (
                <div className="border-b border-white/10 bg-slate-900/80 p-2">
                  <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {t("livePreview", locale)}
                  </p>
                  <iframe
                    title={loc(card.title, locale)}
                    sandbox=""
                    srcDoc={previewDocument(
                      /<!DOCTYPE/i.test(card.snippet) ||
                        /<html[\s>]/i.test(card.snippet)
                        ? card.snippet
                        : (card.previewHtml ?? card.snippet),
                    )}
                    className="h-32 w-full rounded-xl border border-white/10 bg-white"
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    <RichText text={loc(card.title, locale)} />
                  </h3>
                  {card.category ? (
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                      {t(categoryLabelKey[card.category], locale)}
                    </span>
                  ) : null}
                </div>

                <pre
                  dir="ltr"
                  className="max-h-28 overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-950/70 p-3 text-start font-mono text-[11px] leading-5 text-yellow-100/90"
                >
                  {card.snippet}
                </pre>

                <p className="text-xs leading-5 text-slate-400">
                  <RichText text={loc(card.note, locale)} />
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
                  {card.tailwindSnippet ? (
                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          card.tailwindSnippet!,
                          `${cardKey}-tw`,
                          t("tailwindCopiedToast", locale),
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/20"
                    >
                      {twCopied ? <Check size={12} /> : <Wind size={12} />}
                      {twCopied ? t("copied", locale) : t("copyTailwind", locale)}
                    </button>
                  ) : null}
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
                      {boilCopied ? <Check size={12} /> : <FileCode2 size={12} />}
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
            className="pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full border border-cyan-300/40 bg-slate-950/95 px-4 py-2 text-sm font-semibold text-cyan-50 shadow-lg shadow-cyan-500/20 backdrop-blur-xl"
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
