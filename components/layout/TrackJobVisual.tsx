"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PlayPauseButton,
  useAutoPlay,
} from "@/components/shared/PlayPauseButton";
import { t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale, TrackId } from "@/lib/types";

export const TRACK_JOB_KEYS: Record<
  TrackId,
  {
    job:
      | "trackJobHtml"
      | "trackJobCss"
      | "trackJobJs"
      | "trackJobReact"
      | "trackJobTw";
    hint:
      | "trackJobHtmlHint"
      | "trackJobCssHint"
      | "trackJobJsHint"
      | "trackJobReactHint"
      | "trackJobTwHint";
    body:
      | "trackJobHtmlBody"
      | "trackJobCssBody"
      | "trackJobJsBody"
      | "trackJobReactBody"
      | "trackJobTwBody";
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
      className={`relative w-full overflow-hidden border border-white/10 bg-slate-950/80 ${
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
          hero ? "min-h-[210px] p-5 sm:min-h-[240px] sm:p-6" : "p-2.5"
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
  const step = useStep(4, 1600, animate, freezeAt);
  const rows = [
    { tag: "<h2>", text: "Welcome back", role: "heading" },
    { tag: "<p>", text: "Save your progress…", role: "text" },
    { tag: "<button>", text: "Save", role: "control" },
  ] as const;
  const visible = Math.min(step, 3);
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
        className={`mx-auto grid max-w-4xl gap-4 ${
          hero ? "lg:grid-cols-[1.4fr_0.8fr] lg:items-center" : ""
        }`}
      >
        <div className={`space-y-2 ${hero ? "space-y-3" : "space-y-1.5"}`}>
          {rows.map((row, i) => {
            const on = i < visible;
            return (
              <motion.div
                key={row.tag}
                initial={false}
                animate={{
                  opacity: on ? 1 : 0.15,
                  x: on ? 0 : -8,
                  borderColor: on
                    ? i === 0
                      ? "rgba(251,146,60,0.45)"
                      : "rgba(255,255,255,0.18)"
                    : "rgba(255,255,255,0.06)",
                }}
                className={`flex items-center gap-2 rounded-xl border border-dashed font-mono ${
                  hero
                    ? "px-3.5 py-3 text-[13px]"
                    : "px-1.5 py-1 text-[9px]"
                } ${on ? "text-orange-100/90" : "text-slate-600"}`}
              >
                <span className={on ? "text-orange-300/70" : "text-slate-700"}>
                  {row.tag}
                </span>
                <span className="truncate">{row.text}</span>
                {on ? (
                  <span
                    className={`ms-auto font-mono uppercase tracking-wide text-slate-500 ${
                      hero ? "text-[10px]" : "text-[8px]"
                    }`}
                  >
                    {row.role}
                  </span>
                ) : null}
              </motion.div>
            );
          })}
        </div>
        {hero ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              DOM outline
            </p>
            <ul className="mt-2 space-y-1.5 font-mono text-[12px] text-slate-400">
              <li className={visible > 0 ? "text-orange-200/90" : "opacity-30"}>
                └ heading
              </li>
              <li className={visible > 1 ? "text-slate-300" : "opacity-30"}>
                └ text
              </li>
              <li className={visible > 2 ? "text-slate-300" : "opacity-30"}>
                └ control
              </li>
            </ul>
          </div>
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
  const step = useStep(3, 1800, animate, freezeAt);
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
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
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
  const step = useStep(4, 1500, animate, freezeAt);
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
  const step = useStep(3, 1800, animate, freezeAt);
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
  const step = useStep(utilities.length + 2, 1000, animate, freezeAt);
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

const PREVIEW_STEP: Record<string, number> = {
  html: 3,
  css: 2,
  javascript: 3,
  react: 2,
  tailwind: 6,
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
  return null;
}
