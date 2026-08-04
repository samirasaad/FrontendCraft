"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Code2,
  Copy,
  FileCode2,
  LayoutGrid,
  Maximize2,
  Search,
  Sparkles,
  Wind,
  X,
} from "lucide-react";
import { BrowserSupport } from "@/components/lesson/BrowserSupport";
import { RichText } from "@/components/shared/RichText";
import { loc, t, type UiKey } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { RTL_FLIP } from "@/lib/rtl";
import type { CheatCard, CheatCategory } from "@/lib/types";

type FilterId = "all" | CheatCategory;

const CATEGORY_ORDER: CheatCategory[] = [
  "structure",
  "interactive",
  "forms",
  "media",
  "head",
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

function previewSrc(card: CheatCard): string {
  const html =
    /<!DOCTYPE/i.test(card.snippet) || /<html[\s>]/i.test(card.snippet)
      ? card.snippet
      : (card.previewHtml ?? card.snippet);
  return previewDocument(html);
}

function cardMatchesQuery(card: CheatCard, query: string, locale: "en" | "ar") {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    loc(card.title, locale),
    loc(card.note, locale),
    card.snippet,
    card.boilerplate ?? "",
    card.tailwindSnippet ?? "",
    card.category ?? "",
    card.id ?? "",
  ]
    .join("\n")
    .toLowerCase();
  return hay.includes(q);
}

function CardActions({
  card,
  cardKey,
  copiedKey,
  onCopy,
  onOpenLive,
  onExpand,
  dense = false,
}: {
  card: CheatCard;
  cardKey: string;
  copiedKey: string | null;
  onCopy: (text: string, key: string, message: string) => void;
  onOpenLive?: (code: string) => void;
  onExpand?: () => void;
  dense?: boolean;
}) {
  const { locale } = useLanguage();
  const codeCopied = copiedKey === `${cardKey}-code`;
  const twCopied = copiedKey === `${cardKey}-tw`;
  const boilCopied = copiedKey === `${cardKey}-boil`;
  const btn = dense
    ? "px-2.5 py-1 text-[10px]"
    : "px-3 py-1.5 text-[11px]";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() =>
          onCopy(card.snippet, `${cardKey}-code`, t("codeCopiedToast", locale))
        }
        className={`inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 font-semibold text-cyan-100 transition hover:bg-cyan-400/20 ${btn}`}
      >
        {codeCopied ? <Check size={12} /> : <Copy size={12} />}
        {codeCopied ? t("copied", locale) : t("copyCode", locale)}
      </button>
      {card.tailwindSnippet ? (
        <button
          type="button"
          onClick={() =>
            onCopy(
              card.tailwindSnippet!,
              `${cardKey}-tw`,
              t("tailwindCopiedToast", locale),
            )
          }
          className={`inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 font-semibold text-sky-100 transition hover:bg-sky-400/20 ${btn}`}
        >
          {twCopied ? <Check size={12} /> : <Wind size={12} />}
          {twCopied ? t("copied", locale) : t("copyTailwind", locale)}
        </button>
      ) : null}
      {card.boilerplate ? (
        <button
          type="button"
          onClick={() =>
            onCopy(
              card.boilerplate!,
              `${cardKey}-boil`,
              t("boilerplateCopiedToast", locale),
            )
          }
          className={`inline-flex items-center gap-1.5 rounded-full border border-yellow-300/30 bg-yellow-300/10 font-semibold text-yellow-100 transition hover:bg-yellow-300/20 ${btn}`}
        >
          {boilCopied ? <Check size={12} /> : <FileCode2 size={12} />}
          {boilCopied ? t("copied", locale) : t("copyBoilerplate", locale)}
        </button>
      ) : null}
      {onOpenLive ? (
        <button
          type="button"
          onClick={() => onOpenLive(card.boilerplate ?? card.snippet)}
          className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 font-semibold text-emerald-100 transition hover:bg-emerald-400/20 ${btn}`}
        >
          <Code2 size={12} />
          {t("openInLive", locale)}
          <span aria-hidden className={`inline-block ${RTL_FLIP}`}>
            →
          </span>
        </button>
      ) : null}
      {onExpand ? (
        <button
          type="button"
          onClick={onExpand}
          className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 font-semibold text-slate-200 transition hover:bg-white/10 ${btn}`}
        >
          <Maximize2 size={12} />
          {t("cheatExpand", locale)}
        </button>
      ) : null}
    </div>
  );
}

export function CheatSheetCards({
  cards,
  onOpenInLive,
}: {
  cards: CheatCard[];
  /** Paste snippet into Live playground and switch tabs. */
  onOpenInLive?: (code: string) => void;
}) {
  const { locale } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const categories = useMemo(() => {
    const present = new Set<CheatCategory>();
    for (const card of cards) {
      if (card.category) present.add(card.category);
    }
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, [cards]);

  const filters = useMemo(
    () =>
      [
        { id: "all" as const, labelKey: "cheatFilterAll" as UiKey },
        ...categories.map((id) => ({
          id,
          labelKey: categoryLabelKey[id],
        })),
      ] as { id: FilterId; labelKey: UiKey }[],
    [categories],
  );

  useEffect(() => {
    if (filter !== "all" && !categories.includes(filter)) {
      setFilter("all");
    }
  }, [categories, filter]);

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      if (filter !== "all" && card.category !== filter) return false;
      return cardMatchesQuery(card, query, locale);
    });
  }, [cards, filter, query, locale]);

  const expanded = useMemo(() => {
    if (!expandedKey) return null;
    return (
      cards.find(
        (card, index) =>
          (card.id ?? `${card.snippet.slice(0, 24)}-${index}`) === expandedKey,
      ) ?? null
    );
  }, [cards, expandedKey]);

  useEffect(() => {
    if (!expandedKey) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setExpandedKey(null);
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [expandedKey]);

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

  function openLive(code: string) {
    if (!onOpenInLive) return;
    playClick();
    onOpenInLive(code);
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

      <div className="relative">
        <Search
          size={14}
          className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("cheatSearchPlaceholder", locale)}
          className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-2 pe-3 ps-9 text-sm text-slate-100 outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
        />
      </div>

      {categories.length > 0 ? (
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label={t("cheatFilterAll", locale)}
        >
          {filters.map((item) => {
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
          const hasPreview = Boolean(card.previewHtml || card.snippet);

          return (
            <article
              key={cardKey}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl transition hover:border-cyan-400/30"
            >
              {hasPreview ? (
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setExpandedKey(cardKey);
                  }}
                  className="border-b border-white/10 bg-slate-900/80 p-2 text-start transition hover:bg-slate-900"
                >
                  <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {t("livePreview", locale)}
                  </p>
                  <iframe
                    title={loc(card.title, locale)}
                    sandbox=""
                    srcDoc={previewSrc(card)}
                    className="pointer-events-none h-32 w-full rounded-xl border border-white/10 bg-white"
                    tabIndex={-1}
                  />
                </button>
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

                <div className="mt-auto space-y-3">
                  <CardActions
                    card={card}
                    cardKey={cardKey}
                    copiedKey={copiedKey}
                    onCopy={copyText}
                    onOpenLive={onOpenInLive ? openLive : undefined}
                    onExpand={() => {
                      playClick();
                      setExpandedKey(cardKey);
                    }}
                    dense
                  />
                  {card.support ? (
                    <BrowserSupport support={card.support} compact />
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-slate-500">
          {query.trim()
            ? t("cheatSearchEmpty", locale)
            : t("cheatFilterEmpty", locale)}
        </p>
      ) : null}

      <AnimatePresence>
        {expanded ? (
          <motion.div
            key="cheat-expand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/75 p-3 backdrop-blur-md sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={loc(expanded.title, locale)}
            onClick={() => setExpandedKey(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="flex max-h-[min(92dvh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-cyan-300/25 bg-slate-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white">
                    <RichText text={loc(expanded.title, locale)} />
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    <RichText text={loc(expanded.note, locale)} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setExpandedKey(null);
                  }}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                  aria-label={t("cheatClose", locale)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
                {expanded.previewHtml || /<[a-zA-Z!/]/.test(expanded.snippet) ? (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2">
                    <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {t("livePreview", locale)}
                    </p>
                    <iframe
                      title={loc(expanded.title, locale)}
                      sandbox=""
                      srcDoc={previewSrc(expanded)}
                      className="h-56 w-full rounded-xl border border-white/10 bg-white sm:h-72"
                    />
                  </div>
                ) : null}

                <pre
                  dir="ltr"
                  className="max-h-[40vh] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-start font-mono text-[12px] leading-6 text-yellow-100/90"
                >
                  {expanded.snippet}
                </pre>

                <CardActions
                  card={expanded}
                  cardKey={expandedKey!}
                  copiedKey={copiedKey}
                  onCopy={copyText}
                  onOpenLive={
                    onOpenInLive
                      ? (code) => {
                          setExpandedKey(null);
                          openLive(code);
                        }
                      : undefined
                  }
                />

                {expanded.support ? (
                  <BrowserSupport support={expanded.support} />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
