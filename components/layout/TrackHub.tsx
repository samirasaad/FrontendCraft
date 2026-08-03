"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { HubShell } from "@/components/layout/HubShell";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { t } from "@/content/i18n/ui-strings";

const STEP_MS = 6500;

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
  const reduce = useReducedMotion();
  const [focus, setFocus] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const Arrow = ArrowRight;

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

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

  function togglePlay() {
    playClick();
    setPlaying((p) => !p);
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
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
                      className={`flex w-full items-start gap-3 rounded-xl px-2.5 py-2 text-start transition ${
                        on
                          ? "bg-orange-400/10"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                          on
                            ? "bg-orange-300 text-slate-950"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[13px] font-semibold leading-tight ${
                            on ? "text-orange-50" : "text-slate-300"
                          }`}
                        >
                          {t(layer.titleKey, locale)}
                        </span>
                        <AnimatePresence initial={false}>
                          {on ? (
                            <motion.span
                              key="body"
                              initial={
                                reduce ? false : { opacity: 0, height: 0 }
                              }
                              animate={{ opacity: 1, height: "auto" }}
                              exit={
                                reduce ? undefined : { opacity: 0, height: 0 }
                              }
                              className="mt-1 block overflow-hidden text-[12px] leading-relaxed text-slate-400"
                            >
                              {t(layer.bodyKey, locale)}
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Lead column: live preview */}
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
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-pressed={playing}
                  aria-label={
                    playing ? t("simPause", locale) : t("simPlay", locale)
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition hover:border-white/25 hover:bg-slate-900"
                >
                  {playing ? <Pause size={12} /> : <Play size={12} />}
                  {playing ? t("simPause", locale) : t("simPlay", locale)}
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/15 bg-slate-950/90">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                <span className="h-2 w-2 rounded-full bg-amber-300/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ms-2 font-mono text-[9px] text-slate-500">
                  {hasComponents ? "SaveCard.tsx" : "app / save-card"}
                </span>
                <span className="ms-auto font-mono text-[9px] text-slate-600">
                  {t(active.jobKey, locale)} · {t(active.techKey, locale)}
                </span>
              </div>

              {playing && !reduce ? (
                <motion.div
                  key={`progress-${focus}`}
                  className={`h-0.5 bg-gradient-to-r from-orange-400 to-amber-300 ${
                    dir === "rtl" ? "origin-right" : "origin-left"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              ) : (
                <div className="h-0.5 bg-white/5" />
              )}

              <div className="p-4">
                {hasComponents ? (
                  <p className="mb-2 font-mono text-[10px] text-sky-300/80">
                    {"<SaveCard saved={true} />"}
                  </p>
                ) : null}
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
                  className={`border ${hasLook ? "" : "border-dashed"}`}
                >
                  {!hasLook ? (
                    <p className="mb-2 font-mono text-[9px] text-orange-200/60">
                      &lt;h2&gt; &lt;p&gt; &lt;button&gt;
                    </p>
                  ) : null}

                  <h3
                    className={`font-semibold tracking-tight ${
                      hasLook
                        ? "font-[family-name:var(--font-display)] text-base text-orange-50"
                        : "font-mono text-sm text-slate-400"
                    }`}
                  >
                    {t("roadmapDemoTitle", locale)}
                  </h3>
                  <p
                    className={`mt-1 leading-snug ${
                      hasLook
                        ? "text-[12px] text-slate-300"
                        : "font-mono text-[11px] text-slate-500"
                    }`}
                  >
                    {t("roadmapDemoBody", locale)}
                  </p>

                  <div
                    className={`mt-3 flex items-center ${
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
                        duration: 1.6,
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

                    {hasComponents ? (
                      <span className="rounded-md bg-sky-300/15 px-2 py-0.5 font-mono text-[9px] text-sky-200">
                        props · state
                      </span>
                    ) : hasBehavior ? (
                      <span className="font-mono text-[9px] text-cyan-200/70">
                        onClick → setState
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2.5 text-[10px] leading-snug text-slate-500">
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

              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-white/10 px-3 py-2.5"
              >
                <p className="text-[12px] leading-relaxed text-slate-300">
                  {t(active.previewKey, locale)}
                </p>
              </motion.div>
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
          <Arrow
            size={16}
            className={dir === "rtl" ? "rotate-180" : undefined}
          />
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
