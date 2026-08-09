"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  TrackStage,
  labEase,
} from "@/components/visualizers/html/TrackStage";
import { LAB_STEP_MS } from "@/lib/motion-pace";
import { useAutoPlay } from "@/components/shared/PlayPauseButton";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

const STEPS = [
  {
    id: "live",
    chip: "live",
    tip: {
      en: "Mounted view — listener + timer attached; graph is reachable.",
      ar: "الـ view متثبت — listener + timer مربوطين؛ الجراف reachable.",
    },
    retained: true,
    nodes: ["View", "Listener", "Timer"],
    status: { en: "alive · referenced", ar: "حي · عليه مرجع" },
    markup: `useEffect(() => {
  window.addEventListener("resize", onResize);
  const id = setInterval(tick, 1000);
}, []);`,
  },
  {
    id: "orphan",
    chip: "orphan",
    tip: {
      en: "View unmounted — but the listener still holds the closure.",
      ar: "الـ view اتشال — لكن الـ listener لسه ماسك الـ closure.",
    },
    retained: true,
    nodes: ["Ghost View", "Listener", "Timer"],
    status: { en: "leak · still reachable", ar: "leak · لسه reachable" },
    markup: `// forgot cleanup
// View gone → Listener keeps it alive`,
  },
  {
    id: "cleanup",
    chip: "cleanup",
    tip: {
      en: "Cleanup removes listeners and clears timers — edges drop.",
      ar: "الـ cleanup بيشيل listeners وبيصفّر timers — الحواف بتسقط.",
    },
    retained: false,
    nodes: ["View ✕", "Listener ✕", "Timer ✕"],
    status: { en: "edges cut", ar: "الحواف اتقطعت" },
    markup: `return () => {
  window.removeEventListener("resize", onResize);
  clearInterval(id);
};`,
  },
  {
    id: "gc",
    chip: "GC",
    tip: {
      en: "Nothing reachable → GC can reclaim. Prefer weak caches too.",
      ar: "مفيش حاجة reachable → الـ GC يقدر يسترد. فضّل weak caches كمان.",
    },
    retained: false,
    nodes: ["∅ heap"],
    status: { en: "reclaimed", ar: "اتسترد" },
    markup: "// no strong refs left\n// WeakMap / WeakRef for caches",
  },
] as const;

export function MemoryLeaksVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const ar = locale === "ar";

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  return (
    <TrackStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "Memory leaks" : "Memory leaks"}
      caption={ar ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: labEase }}
            className="w-full max-w-md space-y-3"
          >
            <div
              className={`rounded-xl border p-3 ${
                current.retained
                  ? "border-rose-300/35 bg-rose-400/10"
                  : "border-emerald-300/35 bg-emerald-400/10"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  {ar ? "جراف المراجع" : "reference graph"}
                </p>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold ${
                    current.retained
                      ? "border-rose-300/40 bg-rose-400/15 text-rose-100"
                      : "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                  }`}
                >
                  {ar ? current.status.ar : current.status.en}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {current.nodes.map((node, i) => (
                  <motion.div
                    key={`${current.id}-${node}`}
                    initial={reduce ? false : { scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.25 }}
                    className={`rounded-lg border px-3 py-2 font-mono text-[11px] font-semibold ${
                      current.retained
                        ? "border-rose-300/40 bg-slate-950/50 text-rose-50"
                        : "border-emerald-300/40 bg-slate-950/50 text-emerald-50"
                    }`}
                  >
                    {node}
                  </motion.div>
                ))}
              </div>
            </div>

            <pre
              dir="ltr"
              className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
            >
              {current.markup}
            </pre>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-cyan-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {s.chip}
            </button>
          ))}
        </div>
      </div>
    </TrackStage>
  );
}
