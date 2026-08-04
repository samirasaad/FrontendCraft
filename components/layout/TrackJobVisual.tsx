"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PlayPauseButton,
  useAutoPlay,
} from "@/components/shared/PlayPauseButton";
import { t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_ENTER_S, LAB_LOOP_S, LAB_STEP_MS } from "@/lib/motion-pace";
import type { Locale, TrackId } from "@/lib/types";

export const TRACK_JOB_KEYS: Record<
  TrackId,
  {
    job:
      | "trackJobHtml"
      | "trackJobCss"
      | "trackJobJs"
      | "trackJobReact"
      | "trackJobTw"
      | "trackJobA11y"
      | "trackJobSeo";
    hint:
      | "trackJobHtmlHint"
      | "trackJobCssHint"
      | "trackJobJsHint"
      | "trackJobReactHint"
      | "trackJobTwHint"
      | "trackJobA11yHint"
      | "trackJobSeoHint";
    body:
      | "trackJobHtmlBody"
      | "trackJobCssBody"
      | "trackJobJsBody"
      | "trackJobReactBody"
      | "trackJobTwBody"
      | "trackJobA11yBody"
      | "trackJobSeoBody";
  }
> = {
  html: {
    job: "trackJobHtml",
    hint: "trackJobHtmlHint",
    body: "trackJobHtmlBody",
  },
  css: {
    job: "trackJobCss",
    hint: "trackJobCssHint",
    body: "trackJobCssBody",
  },
  javascript: {
    job: "trackJobJs",
    hint: "trackJobJsHint",
    body: "trackJobJsBody",
  },
  react: {
    job: "trackJobReact",
    hint: "trackJobReactHint",
    body: "trackJobReactBody",
  },
  tailwind: {
    job: "trackJobTw",
    hint: "trackJobTwHint",
    body: "trackJobTwBody",
  },
  accessibility: {
    job: "trackJobA11y",
    hint: "trackJobA11yHint",
    body: "trackJobA11yBody",
  },
  seo: {
    job: "trackJobSeo",
    hint: "trackJobSeoHint",
    body: "trackJobSeoBody",
  },
};

function useStep(
  length: number,
  ms: number,
  enabled: boolean,
  freezeAt?: number,
) {
  const initial = freezeAt ?? 0;
  const [step, setStep] = useState(initial);
  useEffect(() => {
    if (!enabled || length < 2) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % length),
      ms,
    );
    return () => window.clearInterval(id);
  }, [enabled, length, ms]);
  if (freezeAt !== undefined && !enabled) return freezeAt;
  return step;
}

function Stage({
  children,
  hero,
  caption,
  playing,
  onTogglePlay,
  controls = true,
}: {
  children: ReactNode;
  hero?: boolean;
  caption?: string;
  playing: boolean;
  onTogglePlay: () => void;
  controls?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-orange-950/20 ${
        hero ? "rounded-2xl" : "rounded-xl"
      }`}
    >
      <div
        className={`flex items-center gap-1 border-b border-white/10 ${
          hero ? "px-4 py-2" : "px-2 py-1"
        }`}
      >
        <span
          className={`rounded-full bg-rose-400/60 ${hero ? "h-2 w-2" : "h-1.5 w-1.5"}`}
          aria-hidden
        />
        <span
          className={`rounded-full bg-amber-300/60 ${hero ? "h-2 w-2" : "h-1.5 w-1.5"}`}
          aria-hidden
        />
        <span
          className={`rounded-full bg-emerald-400/60 ${hero ? "h-2 w-2" : "h-1.5 w-1.5"}`}
          aria-hidden
        />
        {controls ? (
          <div className="ms-auto">
            <PlayPauseButton
              playing={playing}
              onToggle={onTogglePlay}
              compact={!hero}
            />
          </div>
        ) : null}
      </div>
      <div
        aria-hidden
        className={
          hero
            ? "h-[240px] overflow-hidden p-4 sm:h-[280px] sm:p-5"
            : "h-[148px] overflow-hidden p-2.5"
        }
      >
        {children}
      </div>
      {caption ? (
        <div
          className={`border-t border-white/10 ${
            hero ? "px-5 py-3.5 sm:px-6" : "px-3 py-2"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={caption}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={`leading-relaxed ${
                hero ? "text-sm text-slate-200" : "text-[10px] text-slate-400"
              }`}
            >
              {caption}
            </motion.p>
          </AnimatePresence>
        </div>
      ) : null}
    </div>
  );
}

type SceneProps = {
  hero: boolean;
  animate: boolean;
  locale: Locale;
  playing: boolean;
  onTogglePlay: () => void;
  controls: boolean;
  /** When set and not animating, freeze the scene on this step (quiet preview). */
  freezeAt?: number;
};

function HtmlScene({
  hero,
  animate,
  locale,
  playing,
  onTogglePlay,
  controls,
  freezeAt,
}: SceneProps) {
  const step = useStep(4, LAB_STEP_MS, animate, freezeAt);
  const rows = [
    {
      tag: "<h2>",
      close: "</h2>",
      text: "Welcome back",
      role: "heading",
      tint: "text-orange-300",
      ring: "rgba(251,146,60,0.55)",
      glow: "0 0 20px rgba(251,146,60,0.18)",
    },
    {
      tag: "<p>",
      close: "</p>",
      text: "Save your progress…",
      role: "text",
      tint: "text-cyan-300",
      ring: "rgba(34,211,238,0.4)",
      glow: "0 0 16px rgba(34,211,238,0.12)",
    },
    {
      tag: "<button>",
      close: "</button>",
      text: "Save",
      role: "control",
      tint: "text-amber-200",
      ring: "rgba(251,191,36,0.45)",
      glow: "0 0 18px rgba(251,191,36,0.16)",
    },
  ] as const;
  const visible = Math.min(step, 3);
  const active = step > 0 && step <= 3 ? step - 1 : -1;
  const captions = [
    t("trackCapHtml0", locale),
    t("trackCapHtml1", locale),
    t("trackCapHtml2", locale),
    t("trackCapHtml3", locale),
  ];

  return (
    <Stage
      hero={hero}
      caption={controls ? captions[step] : undefined}
      playing={playing}
      onTogglePlay={onTogglePlay}
      controls={controls}
    >
      <div
        className={`mx-auto grid h-full max-w-4xl gap-3 ${
          hero
            ? "sm:grid-cols-[1.15fr_auto_1fr] sm:items-stretch sm:gap-4"
            : ""
        }`}
      >
        {/* Markup source */}
        <div
          className={`relative flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 ${
            hero ? "p-3.5" : "p-2"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
              index.html
            </span>
            <motion.span
              key={step}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-full bg-orange-400/15 px-1.5 py-0.5 font-mono text-[8px] text-orange-200/90"
            >
              {step === 0 ? "empty" : `${visible} node${visible === 1 ? "" : "s"}`}
            </motion.span>
          </div>

          <AnimatePresence mode="popLayout">
            {step === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex flex-1 flex-col justify-center gap-1.5 font-mono text-slate-600 ${
                  hero ? "text-[12px]" : "text-[9px]"
                }`}
              >
                <p>&lt;!DOCTYPE html&gt;</p>
                <p>&lt;html&gt;</p>
                <p className="ps-3 text-slate-700">&lt;body&gt;</p>
                <motion.p
                  animate={
                    animate
                      ? { opacity: [0.35, 1, 0.35] }
                      : { opacity: 0.5 }
                  }
                  transition={{
                    duration: LAB_LOOP_S,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="ps-6 text-orange-300/70"
                >
                  ▍
                </motion.p>
                <p className="ps-3 text-slate-700">&lt;/body&gt;</p>
                <p>&lt;/html&gt;</p>
              </motion.div>
            ) : (
              <motion.div
                key="rows"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex flex-1 flex-col justify-center ${
                  hero ? "gap-2" : "gap-1"
                }`}
              >
                {rows.map((row, i) => {
                  const on = i < visible;
                  const lit = i === active;
                  return (
                    <motion.div
                      key={row.tag}
                      initial={false}
                      animate={{
                        opacity: on ? 1 : 0.2,
                        y: on ? 0 : 6,
                        scale: lit ? 1.02 : 1,
                        borderColor: lit
                          ? row.ring
                          : on
                            ? "rgba(255,255,255,0.14)"
                            : "rgba(255,255,255,0.05)",
                        boxShadow: lit ? row.glow : "0 0 0 transparent",
                        backgroundColor: lit
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0)",
                      }}
                      transition={{
                        duration: LAB_ENTER_S,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`flex items-center gap-1.5 rounded-lg border border-dashed font-mono ${
                        hero
                          ? "px-2.5 py-2 text-[12px]"
                          : "px-1.5 py-1 text-[9px]"
                      }`}
                    >
                      <span className={on ? row.tint : "text-slate-700"}>
                        {row.tag}
                      </span>
                      <span
                        className={`min-w-0 truncate ${
                          on ? "text-slate-100" : "text-slate-700"
                        }`}
                      >
                        {row.text}
                      </span>
                      <span className={on ? "text-slate-600" : "text-slate-800"}>
                        {row.close}
                      </span>
                      {on ? (
                        <motion.span
                          layout
                          className={`ms-auto rounded px-1 py-0.5 font-mono uppercase tracking-wide ${
                            lit
                              ? "bg-white/10 text-slate-200"
                              : "text-slate-500"
                          } ${hero ? "text-[9px]" : "text-[7px]"}`}
                        >
                          {row.role}
                        </motion.span>
                      ) : null}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hero ? (
          <>
            {/* Flow arrow */}
            <div className="hidden flex-col items-center justify-center sm:flex">
              <motion.div
                animate={
                  animate
                    ? {
                        x: [0, 4, 0],
                        opacity: [0.4, 1, 0.4],
                      }
                    : { opacity: 0.5 }
                }
                transition={{
                  duration: LAB_LOOP_S,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-300/25 bg-orange-400/10 text-orange-200"
              >
                <span className="text-sm rtl:rotate-180">→</span>
              </motion.div>
              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-wider text-slate-500">
                parse
              </p>
            </div>

            {/* Live page + DOM */}
            <div className="grid min-h-0 grid-rows-[1fr_auto] gap-2.5">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950">
                <div className="flex items-center gap-1 border-b border-white/10 px-2.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/50" />
                  <span className="ms-1.5 font-mono text-[8px] text-slate-500">
                    preview
                  </span>
                </div>
                <div className="flex h-[104px] flex-col justify-center gap-2 px-4 sm:h-[118px]">
                  <AnimatePresence mode="popLayout">
                    {visible === 0 ? (
                      <motion.p
                        key="blank"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center font-mono text-[11px] text-slate-600"
                      >
                        blank page
                      </motion.p>
                    ) : null}
                    {visible > 0 ? (
                      <motion.h2
                        key="h2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          color:
                            active === 0
                              ? "rgb(254 215 170)"
                              : "rgb(248 250 252)",
                        }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: LAB_ENTER_S }}
                        className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight"
                      >
                        Welcome back
                      </motion.h2>
                    ) : null}
                    {visible > 1 ? (
                      <motion.p
                        key="p"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          color:
                            active === 1
                              ? "rgb(165 243 252)"
                              : "rgb(148 163 184)",
                        }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: LAB_ENTER_S }}
                        className="text-[12px] leading-snug"
                      >
                        Save your progress…
                      </motion.p>
                    ) : null}
                    {visible > 2 ? (
                      <motion.button
                        key="btn"
                        type="button"
                        tabIndex={-1}
                        initial={{ opacity: 0, y: 8, scale: 0.94 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: active === 2 ? [1, 1.04, 1] : 1,
                          boxShadow:
                            active === 2
                              ? [
                                  "0 0 0 rgba(251,146,60,0)",
                                  "0 0 18px rgba(251,146,60,0.45)",
                                  "0 0 0 rgba(251,146,60,0)",
                                ]
                              : "0 0 0 rgba(0,0,0,0)",
                        }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{
                          duration: active === 2 ? LAB_LOOP_S : LAB_ENTER_S,
                          repeat: active === 2 && animate ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                        className="w-fit rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-3 py-1 text-[11px] font-bold text-slate-950"
                      >
                        Save
                      </motion.button>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
                  DOM outline
                </p>
                <ul className="mt-1.5 space-y-1 font-mono text-[11px]">
                  {rows.map((row, i) => {
                    const on = i < visible;
                    const lit = i === active;
                    return (
                      <motion.li
                        key={row.role}
                        initial={false}
                        animate={{
                          opacity: on ? 1 : 0.25,
                          x: on ? 0 : -4,
                          color: lit
                            ? i === 0
                              ? "rgb(254 215 170)"
                              : i === 1
                                ? "rgb(165 243 252)"
                                : "rgb(253 230 138)"
                            : on
                              ? "rgb(203 213 225)"
                              : "rgb(71 85 105)",
                        }}
                        transition={{ duration: LAB_ENTER_S }}
                        className="flex items-center gap-1.5"
                      >
                        <span className="text-slate-600">└</span>
                        <span>{row.role}</span>
                        {lit ? (
                          <motion.span
                            layoutId="dom-pulse"
                            className="ms-auto h-1.5 w-1.5 rounded-full bg-orange-300"
                            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{
                              duration: LAB_LOOP_S,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ) : null}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Stage>
  );
}

function CssScene({
  hero,
  animate,
  locale,
  playing,
  onTogglePlay,
  controls,
  freezeAt,
}: SceneProps) {
  const step = useStep(3, LAB_STEP_MS, animate, freezeAt);
  const painted = step >= 1;
  const captions = [
    t("trackCapCss0", locale),
    t("trackCapCss1", locale),
    t("trackCapCss2", locale),
  ];

  return (
    <Stage
      hero={hero}
      caption={controls ? captions[step] : undefined}
      playing={playing}
      onTogglePlay={onTogglePlay}
      controls={controls}
    >
      <div
        className={`mx-auto grid max-w-4xl ${
          hero ? "gap-4 sm:grid-cols-2" : "relative"
        }`}
      >
        <motion.div
          animate={{
            opacity: hero ? 1 : painted ? 0.25 : 1,
            scale: !hero && painted ? 0.96 : 1,
          }}
          className={`rounded-xl border border-dashed border-white/20 ${
            hero ? "p-5" : "p-2"
          }`}
        >
          <p
            className={`mb-3 font-mono text-slate-500 ${
              hero ? "text-xs" : "text-[7px]"
            }`}
          >
            before · structure only
          </p>
          <div className="h-2.5 w-1/2 rounded-full bg-white/20" />
          <div className="mt-2.5 h-2 w-3/4 rounded-full bg-white/10" />
          <div
            className={`mt-4 rounded border border-white/20 ${
              hero ? "h-9 w-24" : "h-4 w-10"
            }`}
          />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            opacity: painted ? 1 : hero ? 0.35 : 0,
            y: painted || hero ? 0 : 10,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className={`overflow-hidden rounded-xl border border-amber-300/45 bg-slate-800/95 shadow-lg shadow-orange-400/10 ${
            hero ? "relative p-5" : "absolute inset-0 p-2"
          }`}
        >
          {painted ? (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/20 to-transparent"
              animate={
                animate
                  ? { x: ["-40%", "120%"], opacity: [0, 0.7, 0] }
                  : { opacity: 0 }
              }
              transition={{ duration: LAB_LOOP_S, repeat: Infinity, repeatDelay: 1 }}
            />
          ) : null}
          <p
            className={`relative mb-3 font-mono text-amber-200/80 ${
              hero ? "text-xs" : "text-[7px]"
            }`}
          >
            after · color · gap · radius
          </p>
          <div className="relative h-2.5 w-1/2 rounded-full bg-orange-200" />
          <div className="relative mt-2.5 h-2 w-3/4 rounded-full bg-slate-400/55" />
          <div
            className={`relative mt-4 rounded-full bg-orange-300 ${
              hero ? "h-9 w-24" : "h-4 w-10"
            }`}
          />
        </motion.div>
      </div>
    </Stage>
  );
}

function JsScene({
  hero,
  animate,
  locale,
  playing,
  onTogglePlay,
  controls,
  freezeAt,
}: SceneProps) {
  const step = useStep(4, LAB_STEP_MS, animate, freezeAt);
  const clicked = step >= 1;
  const saved = step >= 2;
  const captions = [
    t("trackCapJs0", locale),
    t("trackCapJs1", locale),
    t("trackCapJs2", locale),
    t("trackCapJs3", locale),
  ];

  return (
    <Stage
      hero={hero}
      caption={controls ? captions[step] : undefined}
      playing={playing}
      onTogglePlay={onTogglePlay}
      controls={controls}
    >
      <div
        className={`mx-auto flex max-w-4xl items-stretch ${
          hero ? "gap-5" : "gap-2"
        }`}
      >
        <div
          className={`min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-800/85 ${
            hero ? "p-5" : "p-2"
          }`}
        >
          <div className="h-2.5 w-1/2 rounded-full bg-orange-200/80" />
          <div className="mt-2.5 h-2 w-3/4 rounded-full bg-slate-500/45" />
          <motion.div
            animate={
              clicked && animate
                ? { scale: [1, 0.92, 1.04, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.45 }}
            className={`mt-4 flex items-center justify-center rounded-full font-mono font-bold text-slate-950 ${
              saved ? "bg-cyan-300" : "bg-orange-300"
            } ${hero ? "h-10 px-5 text-sm" : "h-5 px-2 text-[8px]"}`}
          >
            {saved ? "Saved ✓" : "Save"}
          </motion.div>
        </div>

        <div
          className={`flex shrink-0 flex-col justify-between gap-2 ${
            hero ? "w-36" : "w-[4.5rem] sm:w-24"
          }`}
        >
          <motion.div
            animate={{
              borderColor:
                clicked && !saved
                  ? "rgba(34,211,238,0.55)"
                  : "rgba(255,255,255,0.1)",
              backgroundColor:
                clicked && !saved
                  ? "rgba(34,211,238,0.12)"
                  : "rgba(15,23,42,0.5)",
            }}
            className={`rounded-xl border text-center font-mono ${
              hero ? "px-3 py-3 text-xs" : "px-1.5 py-1 text-[7px]"
            }`}
          >
            <p className="text-slate-500">event</p>
            <p className={clicked ? "text-cyan-200" : "text-slate-600"}>
              {clicked ? "click" : "—"}
            </p>
          </motion.div>
          <motion.div
            animate={{
              borderColor: saved
                ? "rgba(34,211,238,0.55)"
                : "rgba(255,255,255,0.1)",
              backgroundColor: saved
                ? "rgba(34,211,238,0.12)"
                : "rgba(15,23,42,0.5)",
            }}
            className={`rounded-xl border text-center font-mono ${
              hero ? "px-3 py-3 text-xs" : "px-1.5 py-1 text-[7px]"
            }`}
          >
            <p className="text-slate-500">state.saved</p>
            <p className={saved ? "font-bold text-cyan-200" : "text-slate-600"}>
              {saved ? "true" : "false"}
            </p>
          </motion.div>
        </div>
      </div>
    </Stage>
  );
}

function ReactScene({
  hero,
  animate,
  locale,
  playing,
  onTogglePlay,
  controls,
  freezeAt,
}: SceneProps) {
  const step = useStep(3, LAB_STEP_MS, animate, freezeAt);
  const showSecond = step >= 1;
  const captions = [
    t("trackCapReact0", locale),
    t("trackCapReact1", locale),
    t("trackCapReact2", locale),
  ];

  return (
    <Stage
      hero={hero}
      caption={controls ? captions[step] : undefined}
      playing={playing}
      onTogglePlay={onTogglePlay}
      controls={controls}
    >
      <div className="mx-auto max-w-4xl">
        <p
          className={`mb-3 font-mono text-sky-300/85 ${
            hero ? "text-sm" : "text-[8px]"
          }`}
        >
          {"<App>"}
        </p>
        <div
          className={`ms-1 grid grid-cols-2 border-s border-sky-300/30 ${
            hero ? "gap-4 ps-4" : "gap-1.5 ps-2.5"
          }`}
        >
          <motion.div
            layout
            className={`rounded-xl border border-sky-300/35 bg-slate-800/90 ${
              hero ? "p-4" : "p-1.5"
            }`}
          >
            <p
              className={`font-mono text-sky-200/70 ${
                hero ? "text-xs" : "text-[7px]"
              }`}
            >
              {"<SaveCard />"}
            </p>
            <div className="mt-2 h-2 w-3/4 rounded-full bg-orange-200/70" />
            <div
              className={`mt-2 rounded-full bg-cyan-300 ${
                hero ? "h-5 w-14" : "h-2.5 w-7"
              }`}
            />
          </motion.div>

          <AnimatePresence>
            {showSecond ? (
              <motion.div
                key="clone"
                initial={animate ? { opacity: 0, x: -20, scale: 0.9 } : false}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className={`rounded-xl border border-sky-300/35 bg-slate-800/90 ${
                  hero ? "p-4" : "p-1.5"
                }`}
              >
                <p
                  className={`font-mono text-sky-200/70 ${
                    hero ? "text-xs" : "text-[7px]"
                  }`}
                >
                  {"<SaveCard />"}
                </p>
                <div className="mt-2 h-2 w-3/4 rounded-full bg-orange-200/70" />
                <div
                  className={`mt-2 rounded-full bg-cyan-300 ${
                    hero ? "h-5 w-14" : "h-2.5 w-7"
                  }`}
                />
              </motion.div>
            ) : (
              <div
                className={`flex items-center justify-center rounded-xl border border-dashed border-white/10 font-mono text-slate-600 ${
                  hero ? "text-xs" : "text-[7px]"
                }`}
              >
                empty slot
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}

function TwScene({
  hero,
  animate,
  locale,
  playing,
  onTogglePlay,
  controls,
  freezeAt,
}: SceneProps) {
  const utilities = ["flex", "gap-2", "rounded-xl", "px-3", "bg-orange-300"];
  const step = useStep(utilities.length + 2, LAB_STEP_MS, animate, freezeAt);
  const shown = Math.min(step, utilities.length);
  const assembled = step > utilities.length;
  const captionList = [
    t("trackCapTw0", locale),
    ...utilities.map((u) => `${t("trackCapTwApply", locale)} \`${u}\``),
    t("trackCapTwDone", locale),
  ];

  return (
    <Stage
      hero={hero}
      caption={controls ? captionList[Math.min(step, captionList.length - 1)] : undefined}
      playing={playing}
      onTogglePlay={onTogglePlay}
      controls={controls}
    >
      <div className="mx-auto max-w-4xl">
        <div className={`mb-3 flex flex-wrap ${hero ? "gap-2" : "gap-1"}`}>
          {utilities.map((cls, i) => (
            <motion.span
              key={cls}
              initial={false}
              animate={{
                opacity: i < shown ? 1 : 0.2,
                y: i < shown ? 0 : 4,
                scale:
                  i < shown && animate && i === shown - 1 ? [1, 1.08, 1] : 1,
              }}
              className={`rounded-md bg-teal-400/15 font-mono text-teal-200 ${
                hero ? "px-2.5 py-1 text-xs" : "px-1 py-0.5 text-[7px]"
              }`}
            >
              {cls}
            </motion.span>
          ))}
        </div>
        <motion.div
          animate={{
            opacity: assembled ? 1 : 0.35,
            y: assembled ? 0 : 6,
          }}
          className={`flex items-center gap-3 border border-teal-300/25 bg-slate-800/85 ${
            assembled ? "rounded-xl" : "rounded"
          } ${hero ? "px-5 py-4" : "px-2 py-1.5"}`}
        >
          <div className="h-2.5 flex-1 rounded-full bg-orange-200/75" />
          <div
            className={`bg-orange-300 font-mono font-bold text-slate-950 ${
              assembled ? "rounded-xl" : "rounded-sm"
            } ${hero ? "h-9 px-4 text-xs" : "h-4 px-2 text-[7px]"}`}
          >
            Save
          </div>
        </motion.div>
      </div>
    </Stage>
  );
}

function A11yScene({
  hero,
  animate,
  locale,
  playing,
  onTogglePlay,
  controls,
  freezeAt,
}: SceneProps) {
  const step = useStep(4, LAB_STEP_MS, animate, freezeAt);
  const focused = step >= 1;
  const labeled = step >= 2;
  const ready = step >= 3;
  const captions = [
    t("trackCapA11y0", locale),
    t("trackCapA11y1", locale),
    t("trackCapA11y2", locale),
    t("trackCapA11y3", locale),
  ];

  return (
    <Stage
      hero={hero}
      caption={controls ? captions[step] : undefined}
      playing={playing}
      onTogglePlay={onTogglePlay}
      controls={controls}
    >
      <div className="mx-auto flex h-full max-w-lg flex-col justify-center gap-3">
        <motion.div
          animate={{
            boxShadow: focused
              ? "0 0 0 3px rgba(52,211,153,0.85)"
              : "0 0 0 0px rgba(52,211,153,0)",
            borderColor: focused
              ? "rgba(52,211,153,0.55)"
              : "rgba(255,255,255,0.12)",
          }}
          className={`inline-flex items-center self-start border bg-orange-300 font-mono font-bold text-slate-950 ${
            hero ? "h-11 rounded-xl px-5 text-sm" : "h-8 rounded-lg px-3 text-xs"
          }`}
        >
          Save
        </motion.div>
        <div
          className={`space-y-1.5 font-mono ${hero ? "text-xs" : "text-[10px]"}`}
        >
          <motion.p
            animate={{ opacity: labeled ? 1 : 0.25 }}
            className="text-emerald-200"
          >
            aria-label=&quot;Save progress&quot;
          </motion.p>
          <motion.p
            animate={{ opacity: ready ? 1 : 0.25 }}
            className="text-slate-400"
          >
            tabIndex=0 · role=&quot;button&quot;
          </motion.p>
        </div>
      </div>
    </Stage>
  );
}

function SeoScene({
  hero,
  animate,
  locale,
  playing,
  onTogglePlay,
  controls,
  freezeAt,
}: SceneProps) {
  const step = useStep(4, LAB_STEP_MS, animate, freezeAt);
  const hasTitle = step >= 1;
  const hasMeta = step >= 2;
  const live = step >= 3;
  const captions = [
    t("trackCapSeo0", locale),
    t("trackCapSeo1", locale),
    t("trackCapSeo2", locale),
    t("trackCapSeo3", locale),
  ];

  return (
    <Stage
      hero={hero}
      caption={controls ? captions[step] : undefined}
      playing={playing}
      onTogglePlay={onTogglePlay}
      controls={controls}
    >
      <div className="mx-auto flex h-full max-w-xl flex-col justify-center gap-3">
        <div
          className={`rounded-xl border border-white/10 bg-slate-900/80 ${
            hero ? "p-4" : "p-2.5"
          }`}
        >
          <p
            className={`mb-2 font-mono uppercase tracking-wider text-slate-500 ${
              hero ? "text-[10px]" : "text-[8px]"
            }`}
          >
            Search preview
          </p>
          <motion.p
            animate={{ opacity: hasTitle ? 1 : 0.2 }}
            className={`font-semibold text-sky-300 ${
              hero ? "text-base" : "text-xs"
            }`}
          >
            Save your progress — FrontendCraft
          </motion.p>
          <motion.p
            animate={{ opacity: hasMeta ? 1 : 0.15 }}
            className={`mt-1 leading-relaxed text-emerald-300/90 ${
              hero ? "text-sm" : "text-[10px]"
            }`}
          >
            frontendcraft.dev/save
          </motion.p>
          <motion.p
            animate={{ opacity: live ? 1 : 0.15 }}
            className={`mt-1.5 leading-relaxed text-slate-400 ${
              hero ? "text-sm" : "text-[10px]"
            }`}
          >
            Learn structure, look, and behavior in an interactive lab.
          </motion.p>
        </div>
      </div>
    </Stage>
  );
}

const PREVIEW_STEP: Record<string, number> = {
  html: 3,
  css: 2,
  javascript: 3,
  react: 2,
  tailwind: 6,
  accessibility: 3,
  seo: 3,
};

/** Animated scene per track — same Save UI, different job. */
export function TrackJobVisual({
  trackId,
  variant = "card",
  /** Live = play/pause + captions. Preview = quiet frozen frame (picker). */
  interactive = true,
}: {
  trackId: string;
  variant?: "card" | "hero";
  interactive?: boolean;
}) {
  const { locale } = useLanguage();
  const { playing, toggle } = useAutoPlay(interactive);
  const hero = variant === "hero";
  const freezeAt = interactive ? undefined : PREVIEW_STEP[trackId];

  const props: SceneProps = {
    hero,
    animate: interactive && playing,
    locale,
    playing,
    onTogglePlay: toggle,
    controls: interactive,
    freezeAt,
  };

  if (trackId === "html") return <HtmlScene {...props} />;
  if (trackId === "css") return <CssScene {...props} />;
  if (trackId === "javascript") return <JsScene {...props} />;
  if (trackId === "react") return <ReactScene {...props} />;
  if (trackId === "tailwind") return <TwScene {...props} />;
  if (trackId === "accessibility") return <A11yScene {...props} />;
  if (trackId === "seo") return <SeoScene {...props} />;
  return null;
}
