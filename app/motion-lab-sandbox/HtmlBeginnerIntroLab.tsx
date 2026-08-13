"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TrackStage, labEase } from "@/components/visualizers/html/TrackStage";
import { useLanguage } from "@/context/LanguageContext";
import { LAB_STEP_MS } from "@/lib/motion-pace";
import { RECORD_LAB_STEP_MS } from "./sandbox-pace";

type Beat = {
  id: string;
  label: { en: string; ar: string };
  code: string;
};

const BEATS: Beat[] = [
  {
    id: "pages",
    label: { en: "HTML makes pages", ar: "HTML يعمل صفحات" },
    code: "<h1>Hello</h1>",
  },
  {
    id: "wrap",
    label: { en: "Tags wrap text", ar: "الـ tags تحيط بالنص" },
    code: "<p>Hello world</p>",
  },
  {
    id: "types",
    label: { en: "Tags change the look", ar: "كل tag شكل مختلف" },
    code: "<button>",
  },
  {
    id: "nest",
    label: { en: "Tags inside tags", ar: "tags داخل tags" },
    code: "<article>…</article>",
  },
  {
    id: "link",
    label: { en: "Links use href", ar: "اللينكات تستخدم href" },
    code: '<a href="…">',
  },
];

export function HtmlBeginnerIntroLab({
  playing,
  recordPace = false,
}: {
  playing: boolean;
  recordPace?: boolean;
}) {
  const { locale } = useLanguage();
  const reduce = !!useReducedMotion();
  const [step, setStep] = useState(0);
  const ar = locale === "ar";
  const beat = BEATS[step];
  const stepMs = recordPace ? RECORD_LAB_STEP_MS : LAB_STEP_MS;

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((i) => (i + 1) % BEATS.length),
      stepMs,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing, stepMs]);

  return (
    <TrackStage className="h-full max-h-full min-h-0 overflow-hidden" title={ar ? beat.label.ar : beat.label.en}>
      <div className="flex min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={beat.id}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: labEase }}
            className="flex min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden"
          >
            <CodeLine code={beat.code} beatId={beat.id} ar={ar} />
            <BeatPreview beatId={beat.id} ar={ar} />
          </motion.div>
        </AnimatePresence>
      </div>
    </TrackStage>
  );
}

function CodeLine({ code, beatId, ar }: { code: string; beatId: string; ar: boolean }) {
  return (
    <div
      dir="ltr"
      data-beginner-code
      className="shrink-0 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center"
    >
      {beatId === "wrap" ? (
        <WrapCode ar={ar} />
      ) : (
        <p className="font-mono text-xl font-medium text-white sm:text-2xl">{code}</p>
      )}
    </div>
  );
}

function WrapCode({ ar }: { ar: boolean }) {
  const text = ar ? "مرحبًا" : "Hello";
  return (
    <p className="font-mono text-xl sm:text-2xl">
      <span className="text-cyan-300">&lt;p&gt;</span>
      <span className="mx-2 font-sans text-2xl font-semibold text-white sm:text-3xl">{text}</span>
      <span className="text-cyan-300">&lt;/p&gt;</span>
    </p>
  );
}

const PREVIEW_TEXT = { color: "#0a0a0a" } as const;
const PREVIEW_LINK = { color: "#1e3a8a" } as const;

function BeatPreview({ beatId, ar }: { beatId: string; ar: boolean }) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <BrowserFrame>
        {beatId === "pages" ? (
          <h1 className="text-5xl font-bold sm:text-6xl" style={PREVIEW_TEXT}>
            {ar ? "مرحبًا" : "Hello"}
          </h1>
        ) : null}

        {beatId === "wrap" ? (
          <p className="text-4xl font-medium sm:text-5xl" style={PREVIEW_TEXT}>
            {ar ? "مرحبًا" : "Hello"}
          </p>
        ) : null}

        {beatId === "types" ? (
          <button
            type="button"
            className="rounded-xl bg-neutral-950 px-10 py-5 text-2xl font-bold text-white sm:text-3xl"
          >
            {ar ? "زر" : "Button"}
          </button>
        ) : null}

        {beatId === "nest" ? (
          <h2 className="text-4xl font-bold sm:text-5xl" style={PREVIEW_TEXT}>
            {ar ? "عنوان" : "Title"}
          </h2>
        ) : null}

        {beatId === "link" ? (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-4xl font-bold underline decoration-2 underline-offset-4 sm:text-5xl"
            style={PREVIEW_LINK}
          >
            {ar ? "عنّا" : "About"}
          </a>
        ) : null}
      </BrowserFrame>
    </div>
  );
}

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-full min-h-0 w-full max-w-none flex-1 flex-col overflow-hidden rounded-xl border-2 border-slate-300 bg-white [color-scheme:light]"
      style={PREVIEW_TEXT}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div
        className="flex min-h-0 flex-1 items-center justify-center bg-white p-6 sm:p-10"
        style={PREVIEW_TEXT}
      >
        {children}
      </div>
    </div>
  );
}
