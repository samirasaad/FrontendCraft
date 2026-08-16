"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HubShell } from "@/components/layout/HubShell";
import {
  PlayPauseButton,
  useAutoPlay,
} from "@/components/shared/PlayPauseButton";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { t } from "@/content/i18n/ui-strings";
import { RTL_FLIP } from "@/lib/rtl";
import { LAB_LOOP_S } from "@/lib/motion-pace";
import type { Locale } from "@/lib/types";

const STEP_MS = 5200;
const DEMO_CLICK_MS = 1600;

const ROADMAP_LAYERS = [
  {
    id: "html",
    bodyKey: "roadmapHtmlBody" as const,
    jobKey: "roadmapJobStructure" as const,
    techKey: "roadmapTechHtml" as const,
  },
  {
    id: "css",
    bodyKey: "roadmapCssBody" as const,
    jobKey: "roadmapJobLook" as const,
    techKey: "roadmapTechCss" as const,
  },
  {
    id: "js",
    bodyKey: "roadmapJsBody" as const,
    jobKey: "roadmapJobBehavior" as const,
    techKey: "roadmapTechJs" as const,
  },
  {
    id: "react",
    bodyKey: "roadmapReactBody" as const,
    jobKey: "roadmapJobComponents" as const,
    techKey: "roadmapTechReact" as const,
  },
] as const;

const LAYER_SNIPPETS = [
  ["<h2>Welcome back</h2>", "<p>Save your progress…</p>", "<button>Save</button>"],
  [
    ".card { padding: 1rem;",
    "        border-radius: 16px; }",
    "button { background: orange; }",
  ],
  [
    'button.addEventListener("click", () => {',
    "  saved = true;",
    "});",
  ],
  [
    "function SaveCard({ saved }) {",
    "  return <article>…</article>;",
    "}",
  ],
] as const;

function TagChip({ children }: { children: string }) {
  return (
    <span className="rounded bg-orange-400/15 px-1.5 py-0.5 font-mono text-xs font-medium text-orange-200">
      {children}
    </span>
  );
}

function CssChip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 font-mono text-xs text-amber-100">
      {children}
    </span>
  );
}

function RoadmapViz({
  focus,
  locale,
  playing,
  reduce,
  saved,
  onToggleSave,
}: {
  focus: number;
  locale: Locale;
  playing: boolean;
  reduce: boolean;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const hasLook = focus >= 1;
  const hasBehavior = focus >= 2;
  const hasComponents = focus >= 3;
  const canClick = hasBehavior;
  const snippet = LAYER_SNIPPETS[focus];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div
        dir="ltr"
        className="shrink-0 border-b border-white/10 bg-black/25 px-3 py-2.5"
      >
        <p className="mb-1.5 text-xs font-medium text-slate-400">
          {t("roadmapVizAdding", locale)}
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.pre
            key={focus}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="overflow-x-auto font-mono text-xs leading-5 text-cyan-100"
          >
            {snippet.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.pre>
        </AnimatePresence>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden p-3 sm:p-4">
        {hasComponents ? (
          <div className="mb-1.5 flex items-center justify-between gap-2 px-0.5">
            <span className="font-mono text-xs text-sky-300">
              {"<SaveCard"}
              <span className="text-amber-200">
                {" "}
                saved={saved ? "{true}" : "{false}"}
              </span>
              {">"}
            </span>
            <span className="rounded-full border border-sky-300/25 bg-sky-400/10 px-2 py-0.5 text-xs font-medium text-sky-100">
              {t("roadmapVizProp", locale)}
            </span>
          </div>
        ) : null}

        <motion.article
          animate={{
            borderColor: hasLook
              ? hasComponents
                ? "rgba(125,211,252,0.45)"
                : "rgba(251,191,36,0.4)"
              : "rgba(251,146,60,0.5)",
            backgroundColor: hasLook
              ? "rgba(30,41,59,0.92)"
              : "rgba(15,23,42,0.25)",
            padding: hasLook ? 16 : 12,
            borderRadius: hasLook ? 16 : 4,
          }}
          transition={{ duration: 0.7 }}
          className={`relative flex min-h-0 flex-col border ${hasLook ? "" : "border-dashed"} ${hasComponents ? "ring-1 ring-sky-300/20 ring-offset-2 ring-offset-slate-950" : ""}`}
        >
          {hasLook && !hasBehavior ? (
            <div className="mb-2 flex flex-wrap gap-1.5">
              <CssChip>padding</CssChip>
              <CssChip>border-radius</CssChip>
              <CssChip>background</CssChip>
            </div>
          ) : null}

          <div className="flex items-start gap-2">
            {!hasLook ? <TagChip>{"<h2>"}</TagChip> : null}
            <h3
              className={`min-w-0 flex-1 tracking-tight ${
                hasLook
                  ? "font-display text-lg font-semibold text-orange-50"
                  : "font-mono text-sm font-semibold text-slate-300"
              }`}
            >
              {t("roadmapDemoTitle", locale)}
            </h3>
          </div>
          <div className="mt-1.5 flex items-start gap-2">
            {!hasLook ? <TagChip>{"<p>"}</TagChip> : null}
            <p
              className={`min-w-0 flex-1 leading-relaxed ${
                hasLook ? "text-sm text-slate-300" : "font-mono text-xs text-slate-500"
              }`}
            >
              {t("roadmapDemoBody", locale)}
            </p>
          </div>

          <div
            className={`relative mt-3 flex min-h-10 items-center ${
              hasLook ? "justify-between gap-3" : "gap-2"
            }`}
          >
            {!hasLook ? <TagChip>{"<button>"}</TagChip> : null}
            <motion.button
              type="button"
              disabled={!canClick}
              onClick={() => {
                if (!canClick) return;
                onToggleSave();
              }}
              aria-label={
                saved
                  ? t("roadmapDemoBtnDone", locale)
                  : t("roadmapDemoBtnIdle", locale)
              }
              aria-pressed={canClick ? saved : undefined}
              animate={
                hasBehavior && playing && !reduce && !saved
                  ? { scale: [1, 1.05, 1] }
                  : { scale: 1 }
              }
              transition={{
                duration: LAB_LOOP_S,
                repeat: hasBehavior && playing && !reduce && !saved ? Infinity : 0,
                ease: "easeInOut",
              }}
              className={`relative font-semibold ${
                canClick ? "cursor-pointer" : "cursor-default"
              } ${
                hasLook
                  ? saved
                    ? "rounded-full bg-cyan-300 px-4 py-2 text-xs text-slate-950"
                    : "rounded-full bg-orange-300 px-4 py-2 text-xs text-slate-950"
                  : "rounded border border-white/20 px-2.5 py-1.5 text-left font-mono text-xs text-slate-400"
              } ${canClick ? "transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300" : ""}`}
            >
              {saved
                ? t("roadmapDemoBtnDone", locale)
                : t("roadmapDemoBtnIdle", locale)}
              {hasBehavior && playing && !reduce && !saved ? (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -end-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-200"
                  animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.9, 0.2, 0.9] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              ) : null}
            </motion.button>

            {hasBehavior && !hasComponents ? (
              <span className="ms-auto flex items-center gap-1.5 font-mono text-xs text-cyan-200/90">
                <span className="rounded bg-cyan-400/15 px-1.5 py-0.5 text-cyan-100">
                  {t("roadmapVizClick", locale)}
                </span>
                <span aria-hidden>→</span>
                <span>{t("roadmapVizState", locale)}</span>
              </span>
            ) : null}
          </div>
        </motion.article>

        {hasComponents ? (
          <p className="mt-1.5 text-end font-mono text-xs text-sky-300/80">
            {"</SaveCard>"}
          </p>
        ) : hasBehavior ? (
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {t("roadmapVizTryClick", locale)}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function StartRoadmap() {
  const { locale, dir } = useLanguage();
  const { playClick } = useSound();
  const { playing, setPlaying, toggle, reduce } = useAutoPlay(true);
  const [focus, setFocus] = useState(0);
  const [saved, setSaved] = useState(false);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const Arrow = ArrowRight;

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(
      () => setFocus((f) => (f + 1) % ROADMAP_LAYERS.length),
      STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  useEffect(() => {
    if (focus < 2) {
      setSaved(false);
      return;
    }
    if (!playing || reduce) return;
    const id = window.setTimeout(() => setSaved(true), DEMO_CLICK_MS);
    return () => window.clearTimeout(id);
  }, [focus, playing, reduce]);

  const active = ROADMAP_LAYERS[focus];
  const hasComponents = focus >= 3;

  function selectLayer(
    i: number,
    opts?: { pause?: boolean; moveFocus?: boolean },
  ) {
    playClick();
    setFocus(i);
    if (opts?.pause !== false) setPlaying(false);
    if (opts?.moveFocus) stepRefs.current[i]?.focus();
  }

  function onToggleSave() {
    playClick();
    setSaved((value) => !value);
    setPlaying(false);
  }

  function onStepListKeyDown(event: KeyboardEvent<HTMLOListElement>) {
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (focus + 1) % ROADMAP_LAYERS.length
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (focus - 1 + ROADMAP_LAYERS.length) % ROADMAP_LAYERS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? ROADMAP_LAYERS.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    selectLayer(next, { moveFocus: true });
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-5 py-2 sm:gap-6">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <h1
          id="roadmap-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-[2.35rem] sm:leading-tight"
        >
          {t("roadmapTitle", locale)}
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-400">
          {t("hubTagline", locale)}{" "}
          <span className="text-slate-500">{t("roadmapHint", locale)}</span>
        </p>
      </motion.header>

      <section
        className="min-h-0 w-full shrink overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:rounded-3xl"
        aria-labelledby="roadmap-heading"
      >
        <div className="grid lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.2fr)]">
          <div className="relative flex flex-col border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-e lg:p-6">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -start-12 top-0 h-28 w-28 rounded-full bg-orange-400/15 blur-3xl"
              animate={
                reduce || !playing
                  ? undefined
                  : { opacity: [0.3, 0.55, 0.3] }
              }
              transition={{
                duration: LAB_LOOP_S,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <ol
              className="relative space-y-0.5"
              role="listbox"
              aria-labelledby="roadmap-heading"
              aria-activedescendant={`roadmap-step-${active.id}`}
              onKeyDown={onStepListKeyDown}
            >
              {ROADMAP_LAYERS.map((layer, i) => {
                const on = focus === i;
                const done = i < focus;
                return (
                  <li key={layer.id}>
                    <button
                      id={`roadmap-step-${layer.id}`}
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={on}
                      tabIndex={on ? 0 : -1}
                      onClick={() => selectLayer(i)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-start outline-none transition focus-visible:ring-2 focus-visible:ring-orange-300/60 ${
                        on
                          ? "bg-orange-300 text-slate-950"
                          : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                          on
                            ? "bg-slate-950 text-orange-200"
                            : done
                              ? "bg-orange-300/20 text-orange-100"
                              : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[13px] font-semibold leading-tight ${
                            on ? "text-slate-950" : "text-inherit"
                          }`}
                        >
                          {t(layer.techKey, locale)}
                          <span
                            className={`font-medium ${on ? "text-slate-700" : "text-slate-500"}`}
                          >
                            {" · "}
                            {t(layer.jobKey, locale)}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="relative mt-4 min-h-[4.75rem] border-t border-white/8 pt-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[13px] leading-relaxed text-slate-400"
                >
                  {t(active.bodyKey, locale)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative bg-[radial-gradient(ellipse_at_30%_20%,rgba(251,146,60,0.14),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(34,211,238,0.08),transparent_45%)] p-4 sm:p-5 lg:p-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-400">
                {t("roadmapPreviewLabel", locale)}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1" aria-hidden>
                  {ROADMAP_LAYERS.map((layer, i) => (
                    <span
                      key={layer.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === focus
                          ? "w-5 bg-orange-300"
                          : i < focus
                            ? "w-3 bg-white/35"
                            : "w-3 bg-white/12"
                      }`}
                    />
                  ))}
                </div>
                <PlayPauseButton playing={playing} onToggle={toggle} />
              </div>
            </div>

            <div className="flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-white/12 bg-slate-950/90 sm:min-h-[24rem]">
              <div className="flex shrink-0 items-center gap-1.5 border-b border-white/10 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                <span className="h-2 w-2 rounded-full bg-amber-300/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ms-2 truncate font-mono text-xs text-slate-500">
                  {hasComponents ? "SaveCard.tsx" : "save-card.html"}
                </span>
                <span className="ms-auto hidden truncate font-mono text-xs text-slate-500 sm:inline">
                  {t(active.techKey, locale)} · {t(active.jobKey, locale)}
                </span>
              </div>

              {playing && !reduce ? (
                <motion.div
                  key={`progress-${focus}`}
                  className={`h-0.5 shrink-0 bg-gradient-to-r from-orange-400 to-amber-300 ${
                    dir === "rtl" ? "origin-right" : "origin-left"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              ) : (
                <div className="h-0.5 shrink-0 bg-white/5" />
              )}

              <RoadmapViz
                focus={focus}
                locale={locale}
                playing={playing}
                reduce={reduce}
                saved={saved}
                onToggleSave={onToggleSave}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <Link
          href="/html"
          onClick={() => playClick()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(251,146,60,0.18)] transition hover:brightness-110"
        >
          {t("roadmapStartCta", locale)}
          <Arrow size={16} className={RTL_FLIP} />
        </Link>
        <Link
          href="/tracks"
          onClick={() => playClick()}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          {t("browseTracks", locale)}
          <Arrow size={14} className={RTL_FLIP} />
        </Link>
      </div>
    </div>
  );
}

function TrackHubInner() {
  return (
    <HubShell fitViewport>
      <StartRoadmap />
    </HubShell>
  );
}

export function TrackHub() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <TrackHubInner />
      </SoundProvider>
    </LanguageProvider>
  );
}
