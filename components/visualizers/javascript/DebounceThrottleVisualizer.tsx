"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LabStage,
  labEase,
} from "@/components/visualizers/html/LabStage";
import { LAB_STEP_MS } from "@/lib/motion-pace";
import { useAutoPlay } from "@/components/shared/PlayPauseButton";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

const STEPS = [
  {
    id: "flood",
    chip: "flood",
    tip: {
      en: "Raw scroll/input flood — every event hits the main thread.",
      ar: "فيضان scroll/input خام — كل event بيضرب الـ main thread.",
    },
    fired: [true, true, true, true, true, true],
    label: { en: "6/6 handlers ran", ar: "6/6 handlers اشتغلوا" },
    markup: "onScroll={(e) => heavyWork(e)}",
  },
  {
    id: "debounce",
    chip: "debounce",
    tip: {
      en: "Debounce — wait for quiet, then run once (search, resize).",
      ar: "Debounce — استنى الهدوء، وبعدين نفّذ مرة (بحث، resize).",
    },
    fired: [false, false, false, false, false, true],
    label: { en: "1 run after quiet", ar: "تنفيذ واحد بعد الهدوء" },
    markup: "const onSearch = debounce(queryApi, 300)",
  },
  {
    id: "throttle",
    chip: "throttle",
    tip: {
      en: "Throttle — cap the rate (scroll position, pointer move).",
      ar: "Throttle — قيّد المعدل (موضع السكرول، حركة المؤشر).",
    },
    fired: [true, false, false, true, false, false],
    label: { en: "2 runs · rate capped", ar: "تنفيذين · معدل محدود" },
    markup: "const onScroll = throttle(updateUI, 100)",
  },
  {
    id: "pick",
    chip: "pick",
    tip: {
      en: "Pick: debounce for “after typing”, throttle for “while moving”.",
      ar: "الاختيار: debounce لـ “بعد الكتابة”، throttle لـ “أثناء الحركة”.",
    },
    fired: [true, false, false, true, false, true],
    label: {
      en: "right tool · calm main thread",
      ar: "الأداة الصح · main thread هادي",
    },
    markup: `// typing → debounce\n// scroll → throttle (or rAF)`,
  },
] as const;

export function DebounceThrottleVisualizer() {
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
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "Debounce و Throttle" : "Debounce & throttle"}
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
            <div className="rounded-xl border border-cyan-400/25 bg-slate-950/60 p-3">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-cyan-200/70">
                {ar ? "أحداث واردة" : "incoming events"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {current.fired.map((on, i) => (
                  <motion.span
                    key={`${current.id}-${i}`}
                    initial={reduce ? false : { scale: 0.85, opacity: 0.4 }}
                    animate={{
                      scale: on ? 1 : 0.9,
                      opacity: on ? 1 : 0.35,
                    }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className={`rounded-md border px-2 py-1.5 font-mono text-[10px] font-semibold ${
                      on
                        ? "border-emerald-300/45 bg-emerald-400/20 text-emerald-50"
                        : "border-white/10 bg-slate-900/70 text-slate-500"
                    }`}
                  >
                    e{i + 1}
                  </motion.span>
                ))}
              </div>
              <p className="mt-2 font-mono text-[11px] text-slate-200">
                {ar ? current.label.ar : current.label.en}
              </p>
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
    </LabStage>
  );
}
