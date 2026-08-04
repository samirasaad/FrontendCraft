"use client";

import { useEffect, useState } from "react";
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
import { LAB_LOOP_S, LAB_STEP_MS } from "@/lib/motion-pace";

const STEP_MS = LAB_STEP_MS;

const ROADMAP_LAYERS = [
  {
    id: "html",
    titleKey: "roadmapHtmlTitle" as const,
    bodyKey: "roadmapHtmlBody" as const,
    previewKey: "roadmapPreviewHtml" as const,
    jobKey: "roadmapJobStructure" as const,
    techKey: "roadmapTechHtml" as const,
  },
  {
    id: "css",
    titleKey: "roadmapCssTitle" as const,
    bodyKey: "roadmapCssBody" as const,
    previewKey: "roadmapPreviewCss" as const,
    jobKey: "roadmapJobLook" as const,
    techKey: "roadmapTechCss" as const,
  },
  {
    id: "js",
    titleKey: "roadmapJsTitle" as const,
    bodyKey: "roadmapJsBody" as const,
    previewKey: "roadmapPreviewJs" as const,
    jobKey: "roadmapJobBehavior" as const,
    techKey: "roadmapTechJs" as const,
  },
  {
    id: "react",
    titleKey: "roadmapReactTitle" as const,
    bodyKey: "roadmapReactBody" as const,
    previewKey: "roadmapPreviewReact" as const,
    jobKey: "roadmapJobComponents" as const,
    techKey: "roadmapTechReact" as const,
  },
] as const;

function StartRoadmap() {
  const { locale, dir } = useLanguage();
  const { playClick } = useSound();
  const { playing, setPlaying, toggle, reduce } = useAutoPlay(true);
  const [focus, setFocus] = useState(0);
  const Arrow = ArrowRight;

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(
      () => setFocus((f) => (f + 1) % ROADMAP_LAYERS.length),
      STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const active = ROADMAP_LAYERS[focus];
  const hasLook = focus >= 1;
  const hasBehavior = focus >= 2;
  const hasComponents = focus >= 3;
  const saved = hasBehavior;

  function selectLayer(i: number) {
    playClick();
    setFocus(i);
    setPlaying(false);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-hidden py-3 sm:gap-5 sm:py-4">
      {/* 1 — single hero: brand owns the viewport */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {t("brand", locale)}
        </h1>
        <p className="mt-1.5 text-base text-slate-400 sm:text-lg">
          {t("hubTagline", locale)}
        </p>
      </motion.div>

      {/* 2 — quiet, left-aligned section label (not a second hero) */}
      <div className="shrink-0">
        <h2
          id="roadmap-heading"
          className="text-sm font-semibold text-slate-300"
        >
          {t("roadmapTitle", locale)}
        </h2>
        <p className="mt-0.5 max-w-xl text-[13px] leading-relaxed text-slate-500">
          {t("roadmapHint", locale)}
        </p>
      </div>

      {/* 3+7 — preview-led card, content-tight (no stretch gaps) */}
      <section
        className="min-h-0 w-full shrink overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 sm:rounded-3xl"
        aria-labelledby="roadmap-heading"
      >
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Support column: step list only */}
          <div className="relative border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-e lg:p-6">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -start-12 top-0 h-28 w-28 rounded-full bg-orange-400/15 blur-3xl"
              animate={
                reduce || !playing
                  ? undefined
                  : { opacity: [0.3, 0.55, 0.3] }
              }
              transition={{ duration: LAB_LOOP_S, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 4 — no status pills; 5 — list is the only step control */}
            <ol className="relative space-y-1">
              {ROADMAP_LAYERS.map((layer, i) => {
                const on = focus === i;
                return (
                  <li key={layer.id}>
                    <button
                      type="button"
                      onClick={() => selectLayer(i)}
                      aria-current={on ? "step" : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-start transition ${
                        on
                          ? "bg-orange-400/10"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                          on
                            ? "bg-orange-300 text-slate-950"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`min-w-0 flex-1 text-[13px] font-semibold leading-tight ${
                          on ? "text-orange-50" : "text-slate-300"
                        }`}
                      >
                        {t(layer.titleKey, locale)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="relative mt-3 min-h-[4.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[12px] leading-relaxed text-slate-400"
                >
                  {t(active.bodyKey, locale)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Lead column: live preview — fixed frame so steps never resize the page */}
          <div className="relative bg-[radial-gradient(ellipse_at_30%_20%,rgba(251,146,60,0.16),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(34,211,238,0.1),transparent_45%)] p-4 sm:p-5 lg:p-6">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {t("roadmapPreviewLabel", locale)}
              </p>
              <div className="flex items-center gap-2">
                {/* Glanceable progress — not a second control */}
                <div className="flex gap-1" aria-hidden>
                  {ROADMAP_LAYERS.map((layer, i) => (
                    <span
                      key={layer.id}
                      className={`h-1 w-4 rounded-full ${
                        i === focus
                          ? "bg-orange-300"
                          : i < focus
                            ? "bg-white/30"
                            : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <PlayPauseButton playing={playing} onToggle={toggle} />
              </div>
            </div>

            <div className="flex h-[20rem] flex-col overflow-hidden rounded-xl border border-white/15 bg-slate-950/90 sm:h-[22rem]">
              <div className="flex shrink-0 items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                <span className="h-2 w-2 rounded-full bg-amber-300/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ms-2 truncate font-mono text-[9px] text-slate-500">
                  {hasComponents ? "SaveCard.tsx" : "app / save-card"}
                </span>
                <span className="ms-auto hidden truncate font-mono text-[9px] text-slate-600 sm:inline">
                  {t(active.jobKey, locale)} · {t(active.techKey, locale)}
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

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
                <div className="mb-2 min-h-4 shrink-0 font-mono text-[10px] text-sky-300/80">
                  {hasComponents ? "<SaveCard saved={true} />" : "\u00A0"}
                </div>
                <motion.article
                  animate={{
                    borderColor: hasLook
                      ? active.id === "css"
                        ? "rgba(251,191,36,0.45)"
                        : active.id === "react"
                          ? "rgba(125,211,252,0.45)"
                          : "rgba(255,255,255,0.14)"
                      : "rgba(251,146,60,0.45)",
                    backgroundColor: hasLook
                      ? "rgba(30,41,59,0.85)"
                      : "rgba(15,23,42,0.35)",
                    padding: hasLook ? 14 : 12,
                    borderRadius: hasLook ? 14 : 4,
                  }}
                  transition={{ duration: 0.7 }}
                  className={`flex min-h-0 flex-1 flex-col border ${hasLook ? "" : "border-dashed"}`}
                >
                  <div className="min-h-4 shrink-0 font-mono text-[9px] text-orange-200/60">
                    {!hasLook ? "<h2> <p> <button>" : "\u00A0"}
                  </div>

                  <h3
                    className={`shrink-0 font-semibold tracking-tight ${
                      hasLook
                        ? "font-[family-name:var(--font-display)] text-base text-orange-50"
                        : "font-mono text-sm text-slate-400"
                    }`}
                  >
                    {t("roadmapDemoTitle", locale)}
                  </h3>
                  <p
                    className={`mt-1 shrink-0 leading-snug ${
                      hasLook
                        ? "text-[12px] text-slate-300"
                        : "font-mono text-[11px] text-slate-500"
                    }`}
                  >
                    {t("roadmapDemoBody", locale)}
                  </p>

                  <div
                    className={`mt-3 flex min-h-9 shrink-0 items-center ${
                      hasLook
                        ? "justify-between gap-3"
                        : "flex-col items-stretch gap-2"
                    }`}
                  >
                    <motion.button
                      type="button"
                      tabIndex={-1}
                      animate={
                        hasBehavior && playing && !reduce
                          ? { scale: [1, 1.04, 1] }
                          : { scale: 1 }
                      }
                      transition={{
                        duration: LAB_LOOP_S,
                        repeat:
                          hasBehavior && playing && !reduce ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      className={`font-semibold ${
                        hasLook
                          ? saved
                            ? "rounded-full bg-cyan-300 px-3.5 py-1.5 text-[11px] text-slate-950"
                            : "rounded-full bg-orange-300 px-3.5 py-1.5 text-[11px] text-slate-950"
                          : "rounded border border-white/20 px-2 py-1 text-left font-mono text-[11px] text-slate-400"
                      }`}
                    >
                      {saved
                        ? t("roadmapDemoBtnDone", locale)
                        : t("roadmapDemoBtnIdle", locale)}
                    </motion.button>

                    <span className="min-h-5 font-mono text-[9px] text-cyan-200/70">
                      {hasComponents
                        ? "props · state"
                        : hasBehavior
                          ? "onClick → setState"
                          : "\u00A0"}
                    </span>
                  </div>

                  <p className="mt-auto pt-2.5 text-[10px] leading-snug text-slate-500">
                    {!hasLook
                      ? t("roadmapDemoWaitingCss", locale)
                      : !hasBehavior
                        ? t("roadmapDemoWaitingJs", locale)
                        : hasComponents
                          ? t("roadmapDemoReactNote", locale)
                          : t("roadmapDemoJsNote", locale)}
                  </p>
                </motion.article>
              </div>

              <div className="min-h-[3.25rem] shrink-0 border-t border-white/10 px-3 py-2.5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={active.id}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    className="text-[12px] leading-relaxed text-slate-300"
                  >
                    {t(active.previewKey, locale)}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — primary CTA for the whole screen, outside the card */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href="/html"
          onClick={() => playClick()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110"
        >
          {t("roadmapStartCta", locale)}
          <Arrow size={16} className={RTL_FLIP} />
        </Link>
        <Link
          href="/tracks"
          onClick={() => playClick()}
          className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          {t("browseTracks", locale)}
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
