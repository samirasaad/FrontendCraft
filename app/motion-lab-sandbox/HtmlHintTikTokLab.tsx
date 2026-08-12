"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { loc } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_STEP_MS } from "@/lib/motion-pace";
import { HTML_HINTS } from "./html-hints/hints";
import { HintCodePanel } from "./html-hints/HintCodePanel";
import { HintVisual } from "./html-hints/HintVisual";
import { TikTokBackground } from "./html-hints/TikTokBackground";
import type { HtmlHintId } from "./html-hints/types";
import { RECORD_LAB_STEP_MS, hintBeatMs } from "./sandbox-pace";

const beatEase = [0.22, 1, 0.36, 1] as const;
const beatTransition = { duration: 0.48, ease: beatEase };

export function HtmlHintTikTokLab({
  hintId,
  playing,
  recordPace = false,
}: {
  hintId: HtmlHintId;
  playing: boolean;
  recordPace?: boolean;
}) {
  const hint = HTML_HINTS.find((h) => h.id === hintId) ?? HTML_HINTS[0];
  const { locale } = useLanguage();
  const reduce = !!useReducedMotion();
  const ar = locale === "ar";
  const [step, setStep] = useState(0);
  const beat = hint.beats[step];
  const stepMs = recordPace ? RECORD_LAB_STEP_MS : LAB_STEP_MS;

  useEffect(() => {
    setStep(0);
  }, [hintId]);

  useEffect(() => {
    if (reduce || !playing) return;

    let stepIndex = 0;
    let timeoutId = 0;

    const schedule = () => {
      const beat = hint.beats[stepIndex];
      timeoutId = window.setTimeout(() => {
        stepIndex = (stepIndex + 1) % hint.beats.length;
        setStep(stepIndex);
        schedule();
      }, hintBeatMs(beat.id, stepMs));
    };

    schedule();
    return () => window.clearTimeout(timeoutId);
  }, [reduce, playing, stepMs, hintId, hint.beats]);

  return (
    <div
      data-tiktok-hint-lab
      data-hint-id={hintId}
      className="relative flex h-full min-h-0 w-full flex-col overflow-hidden"
    >
      <TikTokBackground />

      <div className="tiktok-safe relative z-10 flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 px-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300" />
            <span className="bg-gradient-to-r from-yellow-200 to-cyan-200 bg-clip-text text-[9px] font-bold uppercase tracking-[0.18em] text-transparent">
              FrontendCraft
            </span>
            <span className="text-[9px] text-slate-500">·</span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-cyan-200">
              HTML tip
            </span>
          </span>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${hintId}-${beat.id}`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={beatTransition}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="shrink-0 px-4 pt-1 text-center">
              <h2
                className={`font-display text-[1.2rem] font-black leading-none tracking-tight ${
                  beat.id === "hook"
                    ? "hint-hook--wrong text-red-500"
                    : beat.codeTone === "good"
                      ? "hint-hook--right text-emerald-400"
                      : "text-white"
                }`}
              >
                {loc(beat.hook, locale)}
              </h2>
              <p
                className={`mt-1 text-[10px] font-medium leading-tight ${
                  beat.id === "hook"
                    ? "hint-sub--wrong text-red-300"
                    : beat.codeTone === "good"
                      ? "hint-sub--right text-emerald-300"
                      : "text-slate-300"
                }`}
              >
                {loc(beat.sub, locale)}
              </p>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center px-3 py-1.5">
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...beatTransition, delay: 0.06 }}
                className="flex h-full w-full max-h-[min(32%,11.5rem)] items-center justify-center"
              >
                <HintVisual
                  code={beat.code}
                  visual={beat.visual}
                  beatId={beat.id}
                  ar={ar}
                  compact
                />
              </motion.div>
            </div>

            <motion.div
              data-beginner-code
              data-hint-tone={beat.codeTone ?? "muted"}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...beatTransition, delay: 0.1 }}
              className={`tiktok-code-strip mx-2.5 mb-2.5 shrink-0 rounded-lg sm:mx-3 sm:mb-3 ${
                beat.codeTone === "bad"
                  ? "ring-2 ring-red-600"
                  : beat.codeTone === "good"
                    ? "ring-2 ring-emerald-600"
                    : ""
              }`}
            >
              <HintCodePanel code={beat.code} tone={beat.codeTone} compact />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
