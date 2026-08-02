"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Pause, Play, SkipForward } from "lucide-react";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import type { PipelineStep } from "@/lib/types";

export const defaultHtmlPipeline: PipelineStep[] = [
  {
    id: "parse",
    title: { en: "1. Parse HTML", ar: "1. Parse HTML" },
    detail: {
      en: "Bytes → tokens → nodes. The tokenizer builds the early DOM skeleton.",
      ar: "Bytes → tokens → nodes. الـ tokenizer بيبني هيكل الـ DOM الأول.",
    },
  },
  {
    id: "dom",
    title: { en: "2. DOM Tree", ar: "2. DOM Tree" },
    detail: {
      en: "Elements nest into a live tree — Parent → Child → Text nodes.",
      ar: "العناصر بتتعشّش في شجرة حية — Parent → Child → Text.",
    },
  },
  {
    id: "cssom",
    title: { en: "3. CSSOM", ar: "3. CSSOM" },
    detail: {
      en: "Stylesheets resolve into a CSS Object Model that maps selectors to rules.",
      ar: "الـ stylesheets بتتحول لـ CSSOM بيربط selectors بالقواعد.",
    },
  },
  {
    id: "render",
    title: { en: "4. Render Tree", ar: "4. Render Tree" },
    detail: {
      en: "DOM + CSSOM merge. `display:none` drops out; visibility may stay.",
      ar: "DOM + CSSOM بيتدمّجوا. `display:none` بيطلع برّه؛ visibility ممكن تفضل.",
    },
  },
  {
    id: "layout",
    title: { en: "5. Layout (Reflow)", ar: "5. Layout (Reflow)" },
    detail: {
      en: "Geometry: boxes get x/y/width/height. Missing image size → CLS risk.",
      ar: "الهندسة: الصناديق تاخد x/y/width/height. مقاس صورة ناقص → خطر CLS.",
    },
  },
  {
    id: "paint",
    title: { en: "6. Paint & Composite", ar: "6. Paint & Composite" },
    detail: {
      en: "Pixels hit layers; the compositor draws the frame you see.",
      ar: "البكسلز على layers؛ الـ compositor بيرسم الفريم اللي بتشوفه.",
    },
  },
];

export function RenderPipeline({
  steps = defaultHtmlPipeline,
}: {
  steps?: PipelineStep[];
}) {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (index >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(
      () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
      1400,
    );
    return () => window.clearTimeout(id);
  }, [playing, index, steps.length]);

  const current = steps[index];

  return (
    <section className="rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-400/10 via-slate-950/50 to-cyan-400/5 p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-100">
          <Cpu size={16} className="text-violet-300" />
          {t("pipelineTitle", locale)}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              playClick();
              setPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-100"
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            {playing ? t("simPause", locale) : t("simPlay", locale)}
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setPlaying(false);
              setIndex((i) => Math.min(i + 1, steps.length - 1));
            }}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-100"
          >
            <SkipForward size={12} />
            {t("simStep", locale)}
          </button>
        </div>
      </div>
      <p className="mb-4 text-xs text-slate-400">{t("pipelineHint", locale)}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {steps.map((step, i) => {
          const active = i === index;
          const done = i < index;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                playClick();
                setPlaying(false);
                setIndex(i);
              }}
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold transition ${
                active
                  ? "border-violet-300/50 bg-violet-300/25 text-violet-50"
                  : done
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                    : "border-white/10 bg-slate-950/40 text-slate-400"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="rounded-2xl border border-violet-400/20 bg-slate-950/60 p-4"
        >
          <p className="mb-2 text-sm font-semibold text-violet-50">
            {loc(current.title, locale)}
          </p>
          <p className="text-sm leading-6 text-slate-300">
            {loc(current.detail, locale)}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
