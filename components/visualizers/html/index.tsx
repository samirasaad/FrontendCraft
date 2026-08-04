"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, Shield, Volume2, X } from "lucide-react";
import {
  LabStage,
  labEase,
  labSpring,
} from "@/components/visualizers/html/LabStage";
import { LAB_LOOP_S, LAB_STEP_MS } from "@/lib/motion-pace";
import { useAutoPlay } from "@/components/shared/PlayPauseButton";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { RTL_FLIP } from "@/lib/rtl";

/** Document shell — doctype → lang → charset → viewport → title → body. */
const DOC_STEPS = [
  {
    id: "doctype",
    chip: "doctype",
    tip: {
      en: "`<!DOCTYPE html>` first — standards mode, not quirks.",
      ar: "`<!DOCTYPE html>` الأول — وضع standards، مش quirks.",
    },
    markup: "<!DOCTYPE html>",
    show: {
      doctype: true,
      html: false,
      charset: false,
      viewport: false,
      title: false,
      body: false,
    },
  },
  {
    id: "html",
    chip: "lang",
    tip: {
      en: "`lang` on `<html>` — screen readers pick the right voice.",
      ar: "`lang` على `<html>` — قارئ الشاشة يختار النطق الصح.",
    },
    markup: '<html lang="en">\n  …\n</html>',
    show: {
      doctype: true,
      html: true,
      charset: false,
      viewport: false,
      title: false,
      body: false,
    },
  },
  {
    id: "charset",
    chip: "charset",
    tip: {
      en: "`charset` early in `<head>` — Arabic, emoji, and Latin decode right.",
      ar: "`charset` بدري في `<head>` — العربي والإيموجي يتقراوا صح.",
    },
    markup: `<head>
  <meta charset="UTF-8" />
</head>`,
    show: {
      doctype: true,
      html: true,
      charset: true,
      viewport: false,
      title: false,
      body: false,
    },
  },
  {
    id: "viewport",
    chip: "viewport",
    tip: {
      en: "`viewport` meta — phones scale the page instead of zooming out.",
      ar: "`viewport` — الموبايل يكبّر الصفحة صح بدل ما يصغّرها.",
    },
    markup: `<meta name="viewport"
  content="width=device-width, initial-scale=1" />`,
    show: {
      doctype: true,
      html: true,
      charset: true,
      viewport: true,
      title: false,
      body: false,
    },
  },
  {
    id: "title",
    chip: "title",
    tip: {
      en: "`<title>` lives in `<head>` — it names the browser tab.",
      ar: "`<title>` جوّه `<head>` — اسم تاب المتصفح.",
    },
    markup: "<title>Hello HTML</title>",
    show: {
      doctype: true,
      html: true,
      charset: true,
      viewport: true,
      title: true,
      body: false,
    },
  },
  {
    id: "body",
    chip: "body",
    tip: {
      en: "`<body>` is what users see — one `<h1>` plus content.",
      ar: "`<body>` اللي المستخدم بيشوفه — `<h1>` واحد + محتوى.",
    },
    markup: `<body>
  <h1>Welcome</h1>
  <p>This is the body.</p>
</body>`,
    show: {
      doctype: true,
      html: true,
      charset: true,
      viewport: true,
      title: true,
      body: true,
    },
  },
] as const;

function DocNode({
  label,
  active,
  lit,
  indent = 0,
  delay = 0,
  reduce,
  children,
}: {
  label: string;
  active: boolean;
  lit: boolean;
  indent?: number;
  delay?: number;
  reduce: boolean | null;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -6 }}
      animate={{
        opacity: active ? 1 : 0.22,
        x: active ? 0 : -4,
      }}
      transition={{ delay, duration: 0.28, ease: labEase }}
      style={{ marginInlineStart: indent * 12 }}
      className="space-y-1"
    >
      <div
        className={`rounded-lg border px-2.5 py-1.5 font-mono text-[11px] leading-none ${
          lit
            ? "border-cyan-300/55 bg-cyan-400/20 text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
            : active
              ? "border-white/12 bg-slate-950/70 text-slate-200"
              : "border-white/5 bg-slate-950/30 text-slate-500"
        }`}
      >
        {label}
      </div>
      {children}
    </motion.div>
  );
}

export function DocumentTreeVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = DOC_STEPS[step];
  const ar = locale === "ar";
  const s = current.show;

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((i) => (i + 1) % DOC_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const tabLabel = s.title
    ? "Hello HTML"
    : ar
      ? "بدون عنوان"
      : "untitled";

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "تشريح المستند" : "Document anatomy"}
      caption={ar ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
        <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2">
          {/* Nested document tree */}
          <div className="rounded-xl border border-white/10 bg-slate-950/55 p-3">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-cyan-200/65">
              {ar ? "شجرة المستند" : "document tree"}
            </p>
            <div className="space-y-1">
              <DocNode
                label="<!DOCTYPE html>"
                active={s.doctype}
                lit={current.id === "doctype"}
                reduce={reduce}
              />
              <DocNode
                label='<html lang="en">'
                active={s.html}
                lit={current.id === "html"}
                indent={1}
                delay={0.04}
                reduce={reduce}
              >
                <DocNode
                  label="<head>"
                  active={s.charset || s.viewport || s.title}
                  lit={
                    current.id === "charset" ||
                    current.id === "viewport" ||
                    current.id === "title"
                  }
                  indent={1}
                  delay={0.06}
                  reduce={reduce}
                >
                  <DocNode
                    label='<meta charset="UTF-8">'
                    active={s.charset}
                    lit={current.id === "charset"}
                    indent={1}
                    delay={0.08}
                    reduce={reduce}
                  />
                  <DocNode
                    label='<meta name="viewport">'
                    active={s.viewport}
                    lit={current.id === "viewport"}
                    indent={1}
                    delay={0.1}
                    reduce={reduce}
                  />
                  <DocNode
                    label="<title>Hello HTML</title>"
                    active={s.title}
                    lit={current.id === "title"}
                    indent={1}
                    delay={0.12}
                    reduce={reduce}
                  />
                </DocNode>
                <DocNode
                  label="<body>"
                  active={s.body}
                  lit={current.id === "body"}
                  indent={1}
                  delay={0.14}
                  reduce={reduce}
                >
                  <DocNode
                    label="<h1>Welcome</h1>"
                    active={s.body}
                    lit={current.id === "body"}
                    indent={1}
                    delay={0.16}
                    reduce={reduce}
                  />
                  <DocNode
                    label="<p>…</p>"
                    active={s.body}
                    lit={current.id === "body"}
                    indent={1}
                    delay={0.18}
                    reduce={reduce}
                  />
                </DocNode>
              </DocNode>
            </div>
          </div>

          {/* Mini browser preview */}
          <div className="flex min-h-[220px] flex-col overflow-hidden rounded-xl border border-orange-300/25 bg-slate-950/60">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-slate-900/80 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              <motion.span
                key={tabLabel}
                initial={reduce ? false : { opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                className={`ms-1 truncate rounded-md px-2 py-0.5 font-mono text-[10px] ${
                  s.title
                    ? "bg-orange-400/15 text-orange-100"
                    : "bg-white/5 text-slate-500"
                }`}
              >
                {tabLabel}
              </motion.span>
            </div>

            <div className="relative flex flex-1 flex-col p-3">
              <AnimatePresence mode="wait">
                {current.id === "doctype" ? (
                  <motion.div
                    key="mode"
                    initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-1 flex-col items-center justify-center gap-2"
                  >
                    <span className="rounded-full border border-emerald-300/40 bg-emerald-400/15 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-100">
                      standards mode
                    </span>
                    <p className="text-center text-[11px] text-slate-400">
                      {ar ? "من غير doctype → quirks" : "no doctype → quirks"}
                    </p>
                  </motion.div>
                ) : s.body ? (
                  <motion.div
                    key="body"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex flex-1 flex-col justify-center"
                  >
                    <h1 className="text-lg font-bold text-orange-50">
                      {ar ? "أهلًا" : "Welcome"}
                    </h1>
                    <p className="mt-1 text-sm text-slate-300">
                      {ar ? "ده محتوى الـ body." : "This is the body."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="meta"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-1 flex-col justify-center gap-1.5"
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                      {ar ? "ميتا في الـ head" : "head metadata"}
                    </p>
                    {(
                      [
                        ["lang", s.html, 'lang="en"'],
                        ["charset", s.charset, "UTF-8"],
                        ["viewport", s.viewport, "width=device-width"],
                        ["title", s.title, "Hello HTML"],
                      ] as const
                    ).map(([id, on, value]) => (
                      <motion.div
                        key={id}
                        animate={{
                          opacity: on ? 1 : 0.28,
                          borderColor: on
                            ? current.id === id ||
                              (id === "lang" && current.id === "html")
                              ? "rgba(34,211,238,0.45)"
                              : "rgba(255,255,255,0.12)"
                            : "rgba(255,255,255,0.06)",
                        }}
                        className="flex items-center justify-between rounded-lg border bg-slate-900/60 px-2.5 py-1.5"
                      >
                        <span className="font-mono text-[10px] text-slate-400">
                          {id}
                        </span>
                        <span className="font-mono text-[10px] text-cyan-100">
                          {on ? value : "…"}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <pre
          dir="ltr"
          className="w-full max-w-lg overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {DOC_STEPS.map((beat, i) => (
            <button
              key={beat.id}
              type="button"
              aria-label={beat.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-cyan-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {beat.chip}
            </button>
          ))}
        </div>
      </div>
    </LabStage>
  );
}

/** Landmark page — header → nav → main → section → article → footer. */
const SEMANTIC_STEPS = [
  {
    id: "header",
    chip: "header",
    role: "banner",
    tip: {
      en: "`<header>` — page chrome / brand. Maps to landmark role `banner`.",
      ar: "`<header>` — شريط الصفحة والبراند. بيتحول لـ landmark اسمه `banner`.",
    },
    markup: `<header>
  <p>FrontendCraft</p>
</header>`,
    show: {
      header: true,
      nav: false,
      main: false,
      section: false,
      article: false,
      footer: false,
    },
  },
  {
    id: "nav",
    chip: "nav",
    role: "navigation",
    tip: {
      en: "`<nav>` — primary links. Screen readers get a free `navigation` jump.",
      ar: "`<nav>` — اللينكات الأساسية. قارئ الشاشة ياخد قفزة `navigation` ببلاش.",
    },
    markup: `<header>
  <nav>
    <a href="/">Home</a>
    <a href="/learn">Learn</a>
  </nav>
</header>`,
    show: {
      header: true,
      nav: true,
      main: false,
      section: false,
      article: false,
      footer: false,
    },
  },
  {
    id: "main",
    chip: "main",
    role: "main",
    tip: {
      en: "Exactly one `<main>` per page — the primary content landmark.",
      ar: "`<main>` واحد بس لكل صفحة — landmark المحتوى الأساسي.",
    },
    markup: `<main>
  <h1>Today’s lesson</h1>
</main>`,
    show: {
      header: true,
      nav: true,
      main: true,
      section: false,
      article: false,
      footer: false,
    },
  },
  {
    id: "section",
    chip: "section",
    role: "region",
    tip: {
      en: "`<section>` groups related content under a heading — not a random wrapper.",
      ar: "`<section>` بتجمع محتوى مرتبط تحت عنوان — مش غلاف عشوائي.",
    },
    markup: `<main>
  <section>
    <h2>Semantic tags</h2>
  </section>
</main>`,
    show: {
      header: true,
      nav: true,
      main: true,
      section: true,
      article: false,
      footer: false,
    },
  },
  {
    id: "article",
    chip: "article",
    role: "article",
    tip: {
      en: "`<article>` = self-contained unit (post, card) you could syndicate alone.",
      ar: "`<article>` = وحدة مستقلة (بوست، كارت) تقدر تنشرها لوحدها.",
    },
    markup: `<section>
  <article>
    <h3>Why semantics matter</h3>
    <p>Meaning beats empty divs.</p>
  </article>
</section>`,
    show: {
      header: true,
      nav: true,
      main: true,
      section: true,
      article: true,
      footer: false,
    },
  },
  {
    id: "footer",
    chip: "footer",
    role: "contentinfo",
    tip: {
      en: "`<footer>` closes the page — landmark role `contentinfo`.",
      ar: "`<footer>` بيقفل الصفحة — landmark اسمه `contentinfo`.",
    },
    markup: `<footer>
  <p>© 2026 FrontendCraft</p>
</footer>`,
    show: {
      header: true,
      nav: true,
      main: true,
      section: true,
      article: true,
      footer: true,
    },
  },
] as const;

function LandmarkBlock({
  tag,
  role,
  active,
  lit,
  reduce,
  children,
  className = "",
}: {
  tag: string;
  role: string;
  active: boolean;
  lit: boolean;
  reduce: boolean | null;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{
        opacity: active ? 1 : 0.18,
        y: active ? 0 : 4,
        scale: lit ? 1.01 : 1,
      }}
      transition={{ duration: 0.32, ease: labEase }}
      className={`rounded-lg border px-2 py-1.5 ${
        lit
          ? "border-cyan-300/55 bg-cyan-400/15 shadow-[0_0_16px_rgba(34,211,238,0.16)]"
          : active
            ? "border-amber-300/30 bg-amber-400/10"
            : "border-white/5 bg-slate-950/40"
      } ${className}`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={`font-mono text-[10px] font-semibold ${
            lit ? "text-cyan-50" : active ? "text-amber-50" : "text-slate-500"
          }`}
        >
          &lt;{tag}&gt;
        </span>
        <span
          className={`text-[8px] uppercase tracking-wider ${
            lit ? "text-cyan-200/70" : "text-slate-500"
          }`}
        >
          {role}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

export function SemanticBlocksVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SEMANTIC_STEPS[step];
  const ar = locale === "ar";
  const s = current.show;

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((i) => (i + 1) % SEMANTIC_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const landmarks = SEMANTIC_STEPS.filter((beat) => s[beat.id]).map((beat) => ({
    tag: beat.chip,
    role: beat.role,
    lit: beat.id === current.id,
  }));

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "الهيكل الدلالي" : "Semantic structure"}
      caption={ar ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
        <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2">
          {/* Nested landmark tree */}
          <div className="rounded-xl border border-white/10 bg-slate-950/55 p-3">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-cyan-200/65">
              {ar ? "شجرة الـ landmarks" : "landmark tree"}
            </p>
            <div className="space-y-1">
              <DocNode
                label="<header>"
                active={s.header}
                lit={current.id === "header"}
                reduce={reduce}
              >
                <DocNode
                  label="<nav>"
                  active={s.nav}
                  lit={current.id === "nav"}
                  indent={1}
                  delay={0.04}
                  reduce={reduce}
                />
              </DocNode>
              <DocNode
                label="<main>"
                active={s.main}
                lit={current.id === "main"}
                delay={0.06}
                reduce={reduce}
              >
                <DocNode
                  label="<section>"
                  active={s.section}
                  lit={current.id === "section"}
                  indent={1}
                  delay={0.08}
                  reduce={reduce}
                >
                  <DocNode
                    label="<article>"
                    active={s.article}
                    lit={current.id === "article"}
                    indent={1}
                    delay={0.1}
                    reduce={reduce}
                  />
                </DocNode>
              </DocNode>
              <DocNode
                label="<footer>"
                active={s.footer}
                lit={current.id === "footer"}
                delay={0.12}
                reduce={reduce}
              />
            </div>
          </div>

          {/* Mini page + AT roles */}
          <div className="flex min-h-[220px] flex-col gap-2">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-amber-300/25 bg-slate-950/60 p-2">
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-amber-200/60">
                {ar ? "معاينة الصفحة" : "page preview"}
              </p>
              <div className="flex min-h-0 flex-1 flex-col gap-1">
                <LandmarkBlock
                  tag="header"
                  role="banner"
                  active={s.header}
                  lit={current.id === "header"}
                  reduce={reduce}
                >
                  {s.nav ? (
                    <LandmarkBlock
                      tag="nav"
                      role="navigation"
                      active={s.nav}
                      lit={current.id === "nav"}
                      reduce={reduce}
                      className="mt-1"
                    >
                      <p className="mt-0.5 font-mono text-[9px] text-slate-400">
                        Home · Learn
                      </p>
                    </LandmarkBlock>
                  ) : (
                    <p className="mt-0.5 text-[9px] text-slate-400">
                      FrontendCraft
                    </p>
                  )}
                </LandmarkBlock>

                <LandmarkBlock
                  tag="main"
                  role="main"
                  active={s.main}
                  lit={current.id === "main"}
                  reduce={reduce}
                  className="min-h-0 flex-1"
                >
                  {s.section ? (
                    <LandmarkBlock
                      tag="section"
                      role="region"
                      active={s.section}
                      lit={current.id === "section"}
                      reduce={reduce}
                      className="mt-1"
                    >
                      <p className="mt-0.5 text-[9px] font-semibold text-slate-300">
                        {ar ? "الـ tags المعنوية" : "Semantic tags"}
                      </p>
                      {s.article ? (
                        <LandmarkBlock
                          tag="article"
                          role="article"
                          active={s.article}
                          lit={current.id === "article"}
                          reduce={reduce}
                          className="mt-1"
                        >
                          <p className="mt-0.5 text-[9px] text-slate-400">
                            {ar
                              ? "المعنى أحسن من div فاضي."
                              : "Meaning beats empty divs."}
                          </p>
                        </LandmarkBlock>
                      ) : null}
                    </LandmarkBlock>
                  ) : s.main ? (
                    <p className="mt-1 text-[10px] font-semibold text-amber-50">
                      {ar ? "درس النهاردة" : "Today’s lesson"}
                    </p>
                  ) : null}
                </LandmarkBlock>

                <LandmarkBlock
                  tag="footer"
                  role="contentinfo"
                  active={s.footer}
                  lit={current.id === "footer"}
                  reduce={reduce}
                >
                  {s.footer ? (
                    <p className="mt-0.5 text-[9px] text-slate-400">
                      © 2026 FrontendCraft
                    </p>
                  ) : null}
                </LandmarkBlock>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950/55 px-2.5 py-2">
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                {ar ? "قارئ الشاشة يشوف" : "screen reader sees"}
              </p>
              <div className="flex flex-wrap gap-1">
                <AnimatePresence mode="popLayout">
                  {landmarks.map((lm) => (
                    <motion.span
                      key={lm.role}
                      layout
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`rounded-full border px-2 py-0.5 font-mono text-[9px] ${
                        lm.lit
                          ? "border-cyan-300/50 bg-cyan-400/20 text-cyan-50"
                          : "border-white/10 bg-white/5 text-slate-300"
                      }`}
                    >
                      {lm.role}
                    </motion.span>
                  ))}
                </AnimatePresence>
                {landmarks.length === 0 ? (
                  <span className="text-[10px] text-slate-500">…</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <pre
          dir="ltr"
          className="w-full max-w-lg overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {SEMANTIC_STEPS.map((beat, i) => (
            <button
              key={beat.id}
              type="button"
              aria-label={beat.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-cyan-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {beat.chip}
            </button>
          ))}
        </div>
      </div>
    </LabStage>
  );
}

type HeadingLevel = {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level: number;
  label: { en: string; ar: string };
  sample: { en: string; ar: string };
  tip: { en: string; ar: string };
  size: string;
};

const HEADING_LEVELS: HeadingLevel[] = [
  {
    tag: "h1",
    level: 1,
    label: { en: "Page title", ar: "عنوان الصفحة" },
    sample: { en: "FrontendCraft HTML", ar: "FrontendCraft HTML" },
    tip: {
      en: "One clear `<h1>` per page — the document’s top of the outline.",
      ar: "`<h1>` واحد واضح لكل صفحة — قمة الـ outline.",
    },
    size: "text-xl sm:text-2xl",
  },
  {
    tag: "h2",
    level: 2,
    label: { en: "Section", ar: "قسم" },
    sample: { en: "Text & headings", ar: "النص والعناوين" },
    tip: {
      en: "`<h2>` opens a major section under the page title.",
      ar: "`<h2>` بيفتح قسم كبير تحت عنوان الصفحة.",
    },
    size: "text-lg sm:text-xl",
  },
  {
    tag: "h3",
    level: 3,
    label: { en: "Subsection", ar: "قسم فرعي" },
    sample: { en: "Why order matters", ar: "ليه الترتيب مهم" },
    tip: {
      en: "Step down one level — never jump `h1` → `h3` for looks.",
      ar: "انزل مستوى واحد — متنطّش من `h1` لـ `h3` عشان الشكل.",
    },
    size: "text-base sm:text-lg",
  },
  {
    tag: "h4",
    level: 4,
    label: { en: "Detail", ar: "تفصيلة" },
    sample: { en: "Outline tips", ar: "نصايح الـ outline" },
    tip: {
      en: "Deeper headings nest under the previous section.",
      ar: "العناوين الأعمق بتعشّش تحت القسم السابق.",
    },
    size: "text-sm sm:text-base",
  },
  {
    tag: "h5",
    level: 5,
    label: { en: "Minor note", ar: "ملاحظة صغيرة" },
    sample: { en: "Style with CSS", ar: "الشكل من CSS" },
    tip: {
      en: "Need a big look? Keep the rank — restyle with CSS.",
      ar: "عايز شكل كبير؟ خلّي الرتبة — والشكل من CSS.",
    },
    size: "text-sm",
  },
  {
    tag: "h6",
    level: 6,
    label: { en: "Finest label", ar: "أدق تسمية" },
    sample: { en: "Fine print heading", ar: "عنوان دقيق" },
    tip: {
      en: "Full ladder `h1`–`h6` — then a `<p>` carries the story.",
      ar: "السلم كامل `h1`–`h6` — وبعدين `<p>` بيحمل القصة.",
    },
    size: "text-xs sm:text-sm",
  },
];

/** Extra beats after the ladder: trap → fix → paragraph. */
type HeadingBeat =
  | { kind: "level"; index: number }
  | { kind: "skip" }
  | { kind: "fix" }
  | { kind: "paragraph" };

const HEADING_BEATS: HeadingBeat[] = [
  ...HEADING_LEVELS.map((_, index) => ({ kind: "level" as const, index })),
  { kind: "skip" },
  { kind: "fix" },
  { kind: "paragraph" },
];

export function HeadingLadderVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % HEADING_BEATS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const beat = HEADING_BEATS[step];
  const climbIndex =
    beat.kind === "level"
      ? beat.index
      : beat.kind === "skip"
        ? 2
        : HEADING_LEVELS.length - 1;
  const revealThrough =
    beat.kind === "level"
      ? beat.index
      : beat.kind === "skip"
        ? 0
        : HEADING_LEVELS.length - 1;
  const showSkipTrap = beat.kind === "skip";
  const showParagraph = beat.kind === "paragraph" || beat.kind === "fix";

  const caption =
    beat.kind === "skip"
      ? locale === "ar"
        ? "غلط شائع: `h1` وبعدين `h3` — الـ outline اتكسر."
        : "Common trap: `h1` then `h3` — the outline breaks."
      : beat.kind === "fix"
        ? locale === "ar"
          ? "الصح: مستوى واحد كل مرة — `h1` → `h2` → `h3`…"
          : "Prefer: one level at a time — `h1` → `h2` → `h3`…"
        : beat.kind === "paragraph"
          ? locale === "ar"
            ? "بعد العناوين: `<p>` بيحمل الفكرة — مش عنوان تاني."
            : "After headings: a `<p>` carries the idea — not another heading."
          : locale === "ar"
            ? HEADING_LEVELS[beat.index].tip.ar
            : HEADING_LEVELS[beat.index].tip.en;

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "النص والعناوين" : "Text & headings"}
      caption={caption}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-orange-300/25 bg-gradient-to-br from-slate-950 via-slate-950/90 to-orange-950/30">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            </div>
            <span className="font-mono text-[9px] text-slate-500">
              {locale === "ar" ? "معاينة الصفحة" : "page preview"}
            </span>
          </div>

          <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-3 sm:p-4">
            {showSkipTrap ? (
              <div className="space-y-2">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-rose-300/40 bg-rose-400/10 px-3 py-2"
                >
                  <p className="font-mono text-[10px] text-rose-200/80">
                    &lt;h1&gt;
                  </p>
                  <p className="text-lg font-bold text-rose-50">
                    FrontendCraft HTML
                  </p>
                </motion.div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 }}
                  className="ms-6 rounded-lg border border-dashed border-rose-300/45 bg-rose-400/5 px-3 py-2"
                >
                  <p className="font-mono text-[10px] text-rose-200/70">
                    &lt;h3&gt; · skipped h2
                  </p>
                  <p className="text-base font-semibold text-rose-100/90">
                    {locale === "ar" ? "قسم فرعي؟" : "Subsection?"}
                  </p>
                  <p className="mt-1 text-[10px] text-rose-200/65">
                    {locale === "ar"
                      ? "قارئ الشاشة بيحس إن في مستوى ناقص"
                      : "AT hears a missing level in the outline"}
                  </p>
                </motion.div>
              </div>
            ) : (
              HEADING_LEVELS.map((level, i) => {
                const visible = i <= revealThrough;
                const isCurrent =
                  beat.kind === "level"
                    ? i === beat.index
                    : beat.kind === "fix" || beat.kind === "paragraph"
                      ? i === climbIndex
                      : false;
                const Tag = level.tag;
                return (
                  <motion.div
                    key={level.tag}
                    initial={false}
                    animate={{
                      opacity: visible ? 1 : 0.18,
                      y: visible ? 0 : 4,
                      filter: visible ? "blur(0px)" : "blur(0.5px)",
                    }}
                    transition={{ duration: 0.35, ease: labEase }}
                    style={{ marginInlineStart: i * 8 }}
                    className="relative"
                  >
                    {i > 0 ? (
                      <span
                        aria-hidden
                        className="absolute -top-2 start-3 h-2 w-px bg-orange-300/35"
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`w-full rounded-xl border px-3 py-2 text-start transition ${
                        isCurrent
                          ? "border-orange-300/55 bg-orange-400/20 shadow-[0_0_20px_rgba(251,146,60,0.2)]"
                          : visible
                            ? "border-orange-300/20 bg-orange-400/8"
                            : "border-white/5 bg-white/[0.02]"
                      }`}
                    >
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-orange-200/75">
                          &lt;{level.tag}&gt;
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500">
                          {locale === "ar" ? level.label.ar : level.label.en}
                        </span>
                      </div>
                      <Tag
                        className={`font-semibold leading-snug ${level.size} ${
                          isCurrent ? "text-orange-50" : "text-orange-100/85"
                        }`}
                      >
                        {locale === "ar" ? level.sample.ar : level.sample.en}
                      </Tag>
                    </button>
                  </motion.div>
                );
              })
            )}

            <AnimatePresence>
              {showParagraph && !showSkipTrap ? (
                <motion.p
                  key="story-p"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.35, ease: labEase }}
                  className="ms-2 rounded-xl border border-cyan-300/25 bg-cyan-400/10 px-3 py-2.5 text-sm leading-relaxed text-cyan-50"
                >
                  <span className="me-2 font-mono text-[10px] text-cyan-200/70">
                    &lt;p&gt;
                  </span>
                  {locale === "ar"
                    ? "العناوين بتبني الـ outline. الفقرات بتحكي القصة — فكرة واحدة لكل فقرة."
                    : "Headings build the outline. Paragraphs carry the story — one idea per paragraph."}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          key={beat.kind === "level" ? HEADING_LEVELS[beat.index].tag : beat.kind}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`shrink-0 rounded-xl border px-3 py-2.5 ${
            showSkipTrap
              ? "border-rose-300/35 bg-rose-400/10"
              : beat.kind === "fix" || beat.kind === "paragraph"
                ? "border-emerald-300/35 bg-emerald-400/10"
                : "border-orange-300/30 bg-orange-400/10"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {showSkipTrap
              ? locale === "ar"
                ? "تجنّب"
                : "Avoid"
              : beat.kind === "fix" || beat.kind === "paragraph"
                ? locale === "ar"
                  ? "فضّل"
                  : "Prefer"
                : locale === "ar"
                  ? "الرتبة"
                  : "Rank"}
          </p>
          <p
            dir="ltr"
            className="mt-1 font-mono text-[11px] leading-5 text-slate-100"
          >
            {showSkipTrap
              ? "<h1>…</h1>  <h3>…</h3>  ✗"
              : beat.kind === "paragraph"
                ? "<h2>…</h2>  <p>One idea…</p>"
                : beat.kind === "fix"
                  ? "<h1> → <h2> → <h3>"
                  : `<${HEADING_LEVELS[beat.index].tag}>${
                      locale === "ar"
                        ? HEADING_LEVELS[beat.index].sample.ar
                        : HEADING_LEVELS[beat.index].sample.en
                    }</${HEADING_LEVELS[beat.index].tag}>`}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {HEADING_BEATS.map((b, i) => {
            const label =
              b.kind === "level"
                ? b.index + 1
                : b.kind === "skip"
                  ? "!"
                  : b.kind === "fix"
                    ? "✓"
                    : "p";
            return (
              <button
                key={`${b.kind}-${i}`}
                type="button"
                aria-label={
                  b.kind === "level"
                    ? `<${HEADING_LEVELS[b.index].tag}>`
                    : b.kind
                }
                aria-current={i === step ? "step" : undefined}
                onClick={() => goTo(i)}
                className={`min-w-6 rounded-full px-2 py-1 font-mono text-[10px] font-semibold transition ${
                  i === step
                    ? "bg-orange-300 text-slate-950"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                }`}
              >
                {b.kind === "level" ? `h${label}` : label}
              </button>
            );
          })}
        </div>
      </div>
    </LabStage>
  );
}

type FormatStep = {
  tag: string;
  tip: { en: string; ar: string };
  sample: { en: string; ar: string };
  markup: string;
  prefix?: string;
  title?: string;
  datetime?: string;
};

const FORMAT_STEPS: FormatStep[] = [
  {
    tag: "strong",
    tip: {
      en: "`<strong>` marks importance — not just bold looks.",
      ar: "`<strong>` بيعلّم أهمية — مش bold شكل بس.",
    },
    sample: { en: "important", ar: "مهم" },
    markup: "<strong>important</strong>",
  },
  {
    tag: "em",
    tip: {
      en: "`<em>` is stressed emphasis for meaning.",
      ar: "`<em>` تشديد له معنى.",
    },
    sample: { en: "emphasis", ar: "تشديد" },
    markup: "<em>emphasis</em>",
  },
  {
    tag: "b",
    tip: {
      en: "`<b>` is stylistic bold — no extra importance.",
      ar: "`<b>` غامق شكلي — من غير أهمية زيادة.",
    },
    sample: { en: "stylistic bold", ar: "غامق شكلي" },
    markup: "<b>stylistic bold</b>",
  },
  {
    tag: "i",
    tip: {
      en: "`<i>` is stylistic italic / alternate voice.",
      ar: "`<i>` مائل شكلي / صوت بديل.",
    },
    sample: { en: "stylistic italic", ar: "مائل شكلي" },
    markup: "<i>stylistic italic</i>",
  },
  {
    tag: "mark",
    tip: {
      en: "`<mark>` highlights relevant text.",
      ar: "`<mark>` بيميّز نص مهم.",
    },
    sample: { en: "highlight", ar: "تمييز" },
    markup: "<mark>highlight</mark>",
  },
  {
    tag: "del",
    tip: {
      en: "`<del>` shows removed text in an edit.",
      ar: "`<del>` بيورّي نص اتشال في تعديل.",
    },
    sample: { en: "removed", ar: "اتشال" },
    markup: "<del>removed</del>",
  },
  {
    tag: "ins",
    tip: {
      en: "`<ins>` shows inserted text in an edit.",
      ar: "`<ins>` بيورّي نص اتضاف في تعديل.",
    },
    sample: { en: "added", ar: "اتضاف" },
    markup: "<ins>added</ins>",
  },
  {
    tag: "s",
    tip: {
      en: "`<s>` marks text that is no longer accurate.",
      ar: "`<s>` لنص مش دقيق دلوقتي.",
    },
    sample: { en: "outdated", ar: "قديم" },
    markup: "<s>outdated</s>",
  },
  {
    tag: "code",
    tip: {
      en: "`<code>` for short inline code.",
      ar: "`<code>` لكود قصير جوّه السطر.",
    },
    sample: { en: "npm run", ar: "npm run" },
    markup: "<code>npm run</code>",
  },
  {
    tag: "kbd",
    tip: {
      en: "`<kbd>` for keyboard keys and shortcuts.",
      ar: "`<kbd>` لمفاتيح الكيبورد والاختصارات.",
    },
    sample: { en: "Ctrl+S", ar: "Ctrl+S" },
    markup: "<kbd>Ctrl</kbd>+<kbd>S</kbd>",
  },
  {
    tag: "samp",
    tip: {
      en: "`<samp>` for sample program output.",
      ar: "`<samp>` لعيّنة ناتج برنامج.",
    },
    sample: { en: "OK 200", ar: "OK 200" },
    markup: "<samp>OK 200</samp>",
  },
  {
    tag: "var",
    tip: {
      en: "`<var>` for a variable or placeholder.",
      ar: "`<var>` لمتغير أو placeholder.",
    },
    sample: { en: "x", ar: "x" },
    markup: "<var>x</var>",
  },
  {
    tag: "sub",
    tip: {
      en: "`<sub>` for subscripts like H₂O.",
      ar: "`<sub>` للنص تحت السطر زي H₂O.",
    },
    sample: { en: "2", ar: "2" },
    markup: "H<sub>2</sub>O",
    prefix: "H",
  },
  {
    tag: "sup",
    tip: {
      en: "`<sup>` for superscripts like E=mc².",
      ar: "`<sup>` للنص فوق السطر زي E=mc².",
    },
    sample: { en: "2", ar: "2" },
    markup: "E=mc<sup>2</sup>",
    prefix: "x",
  },
  {
    tag: "abbr",
    tip: {
      en: "`<abbr title>` expands an abbreviation.",
      ar: "`<abbr title>` بيوضّح الاختصار.",
    },
    sample: { en: "HTML", ar: "HTML" },
    markup: '<abbr title="HyperText Markup Language">HTML</abbr>',
    title: "HyperText Markup Language",
  },
  {
    tag: "time",
    tip: {
      en: "`<time datetime>` makes dates machine-readable.",
      ar: "`<time datetime>` بيخلّي التاريخ مقروء للآلة.",
    },
    sample: { en: "Aug 2, 2026", ar: "٢ أغسطس ٢٠٢٦" },
    markup: '<time datetime="2026-08-02">Aug 2, 2026</time>',
    datetime: "2026-08-02",
  },
  {
    tag: "q",
    tip: {
      en: "`<q>` for a short inline quote.",
      ar: "`<q>` لاقتباس قصير جوّه السطر.",
    },
    sample: { en: "short quote", ar: "اقتباس قصير" },
    markup: "<q>short quote</q>",
  },
  {
    tag: "cite",
    tip: {
      en: "`<cite>` for the title of a work.",
      ar: "`<cite>` لعنوان عمل.",
    },
    sample: { en: "MDN", ar: "MDN" },
    markup: "<cite>MDN</cite>",
  },
  {
    tag: "small",
    tip: {
      en: "`<small>` for fine print / side notes.",
      ar: "`<small>` للطباعة الصغيرة / ملاحظات جانبية.",
    },
    sample: { en: "fine print", ar: "طباعة صغيرة" },
    markup: "<small>fine print</small>",
  },
  {
    tag: "u",
    tip: {
      en: "`<u>` for unarticulated annotation — don’t fake a link.",
      ar: "`<u>` لتظليل غير ملفوظ — متقلّدش لينك.",
    },
    sample: { en: "annotated", ar: "مظلّل" },
    markup: "<u>annotated</u>",
  },
];

export function TextFormatVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % FORMAT_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const current = FORMAT_STEPS[step];
  const sample = locale === "ar" ? current.sample.ar : current.sample.en;

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const rendered = (() => {
    switch (current.tag) {
      case "strong":
        return <strong className="font-bold text-orange-50">{sample}</strong>;
      case "em":
        return <em className="italic text-orange-50">{sample}</em>;
      case "b":
        return <b className="font-bold text-orange-50">{sample}</b>;
      case "i":
        return <i className="italic text-orange-50">{sample}</i>;
      case "mark":
        return (
          <mark className="rounded-sm bg-yellow-300/90 px-1 text-slate-950">
            {sample}
          </mark>
        );
      case "del":
        return <del className="text-rose-200 line-through">{sample}</del>;
      case "ins":
        return (
          <ins className="text-emerald-200 underline decoration-emerald-300/80">
            {sample}
          </ins>
        );
      case "s":
        return <s className="text-slate-400 line-through">{sample}</s>;
      case "code":
        return (
          <code className="rounded bg-slate-950/80 px-1.5 font-mono text-cyan-200">
            {sample}
          </code>
        );
      case "kbd":
        return (
          <kbd className="rounded border border-white/20 bg-slate-950/70 px-1.5 font-mono text-sm text-amber-100 shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]">
            {sample}
          </kbd>
        );
      case "samp":
        return (
          <samp className="font-mono text-lime-200/90">{sample}</samp>
        );
      case "var":
        return <var className="italic text-violet-200">{sample}</var>;
      case "sub":
        return (
          <span className="text-orange-50">
            {current.prefix}
            <sub>{sample}</sub>O
          </span>
        );
      case "sup":
        return (
          <span className="text-orange-50">
            E=mc
            <sup>{sample}</sup>
          </span>
        );
      case "abbr":
        return (
          <abbr
            title={current.title}
            className="cursor-help text-orange-50 underline decoration-dotted"
          >
            {sample}
          </abbr>
        );
      case "time":
        return (
          <time dateTime={current.datetime} className="text-orange-50">
            {sample}
          </time>
        );
      case "q":
        return <q className="italic text-orange-50">{sample}</q>;
      case "cite":
        return <cite className="italic text-sky-200">{sample}</cite>;
      case "small":
        return <small className="text-sm text-slate-300">{sample}</small>;
      case "u":
        return (
          <u className="text-orange-50 underline decoration-orange-300/70">
            {sample}
          </u>
        );
      default:
        return sample;
    }
  })();

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "تنسيق النص" : "Text formatting"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.tag}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: labEase }}
            className="flex w-full max-w-md flex-col items-center gap-4"
          >
            <p className="text-center text-lg leading-relaxed text-slate-200 sm:text-xl">
              {current.tag === "sub" || current.tag === "sup" ? (
                <motion.span
                  animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                  transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
                  className="inline-block"
                >
                  {rendered}
                </motion.span>
              ) : (
                <>
                  <span className="text-slate-400">
                    {locale === "ar" ? "اتعلّم " : "Learn "}
                  </span>
                  <motion.span
                    animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                    transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
                    className="inline-block"
                  >
                    {rendered}
                  </motion.span>
                  <span className="text-slate-400">
                    {locale === "ar" ? " بوضوح." : " clearly."}
                  </span>
                </>
              )}
            </p>

            <pre
              dir="ltr"
              className="w-full overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-center font-mono text-[11px] leading-5 text-cyan-100"
            >
              {current.markup}
            </pre>
          </motion.div>
        </AnimatePresence>

        <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5">
          {FORMAT_STEPS.map((s, i) => (
            <button
              key={s.tag}
              type="button"
              aria-label={`<${s.tag}>`}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-orange-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {s.tag}
            </button>
          ))}
        </div>
      </div>
    </LabStage>
  );
}

const LINK_IMAGE_STEPS = [
  {
    id: "link",
    tip: {
      en: "Clear link text + a real `href`.",
      ar: "نص لينك واضح + `href` حقيقي.",
    },
    markup: '<a href="/about">About us</a>',
  },
  {
    id: "external",
    tip: {
      en: "New tab? Add `rel=\"noopener noreferrer\"`.",
      ar: "تاب جديد؟ حط `rel=\"noopener noreferrer\"`.",
    },
    markup:
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Docs</a>',
  },
  {
    id: "img",
    tip: {
      en: "Images need meaningful `alt` and size.",
      ar: "الصور محتاجة `alt` مفيد ومقاس.",
    },
    markup:
      '<img src="students-coding.svg" alt="Students coding" width="800" height="450" />',
  },
] as const;

export function LinkImageVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % LINK_IMAGE_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const current = LINK_IMAGE_STEPS[step];

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "اللينكات والصور" : "Links & images"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: labEase }}
            className="flex w-full max-w-sm flex-col items-center gap-4"
          >
            {current.id === "link" ? (
              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="rounded-full border border-cyan-300/45 bg-cyan-400/15 px-5 py-2.5 text-sm font-semibold text-cyan-50 underline decoration-cyan-300/60 underline-offset-4"
                animate={reduce ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: LAB_LOOP_S, repeat: Infinity, ease: "easeInOut" }}
              >
                {locale === "ar" ? "من نحن" : "About us"}
              </motion.a>
            ) : null}

            {current.id === "external" ? (
              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-400/15 px-5 py-2.5 text-sm font-semibold text-amber-50 underline decoration-amber-300/50 underline-offset-4"
                animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
                transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
              >
                {locale === "ar" ? "وثائق" : "Docs"}
                <span className="rounded bg-amber-400/20 px-1.5 py-0.5 font-mono text-[9px]">
                  rel ✓
                </span>
              </motion.a>
            ) : null}

            {current.id === "img" ? (
              <div className="w-full space-y-2">
                <motion.img
                  src="/students-coding.svg"
                  alt={
                    locale === "ar" ? "طلاب بيبرمجوا مع بعض" : "Students coding"
                  }
                  width={800}
                  height={450}
                  className="h-auto w-full rounded-xl border border-orange-300/40 bg-slate-900 object-cover"
                  animate={reduce ? undefined : { scale: [1, 1.015, 1] }}
                  transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
                />
                <p
                  dir="ltr"
                  className="text-center font-mono text-[11px] text-orange-100/90"
                >
                  alt=&quot;Students coding&quot; · 800×450
                </p>
              </div>
            ) : null}

            <pre
              dir="ltr"
              className="w-full overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-center font-mono text-[11px] leading-5 text-cyan-100"
            >
              {current.markup}
            </pre>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-1.5">
          {LINK_IMAGE_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.id}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === step
                  ? "w-4 bg-cyan-300"
                  : "w-1.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </LabStage>
  );
}

const LIST_STEPS = [
  {
    id: "ul",
    tip: {
      en: "`<ul>` — unordered bullets when order doesn’t matter.",
      ar: "`<ul>` — نقط بدون ترتيب لما الترتيب مش مهم.",
    },
    markup: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
    tint: "border-cyan-300/40 from-cyan-400/15",
    chip: "ul",
  },
  {
    id: "ol",
    tip: {
      en: "`<ol>` — numbered steps when order matters.",
      ar: "`<ol>` — خطوات مرقّمة لما الترتيب مهم.",
    },
    markup: `<ol>
  <li>Open editor</li>
  <li>Write markup</li>
  <li>Check preview</li>
</ol>`,
    tint: "border-orange-300/40 from-orange-400/15",
    chip: "ol",
  },
  {
    id: "dl",
    tip: {
      en: "`<dl>` — term (`dt`) + definition (`dd`) pairs.",
      ar: "`<dl>` — أزواج مصطلح (`dt`) + تعريف (`dd`).",
    },
    markup: `<dl>
  <dt>Semantic</dt>
  <dd>HTML that describes meaning</dd>
  <dt>List</dt>
  <dd>Grouped related items</dd>
</dl>`,
    tint: "border-amber-300/40 from-amber-400/15",
    chip: "dl",
  },
  {
    id: "nest",
    tip: {
      en: "Nest another list inside an `<li>` — keep nesting shallow.",
      ar: "عشّش قائمة جوّه `<li>` — خليه shallow.",
    },
    markup: `<ul>
  <li>HTML
    <ul>
      <li>Links</li>
      <li>Lists</li>
    </ul>
  </li>
  <li>CSS</li>
</ul>`,
    tint: "border-violet-300/40 from-violet-400/15",
    chip: "nest",
  },
] as const;

export function ListStackVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % LIST_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const current = LIST_STEPS[step];

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const itemsEn =
    current.id === "ul"
      ? ["HTML", "CSS", "JavaScript"]
      : current.id === "ol"
        ? ["Open editor", "Write markup", "Check preview"]
        : current.id === "dl"
          ? null
          : null;
  const itemsAr =
    current.id === "ul"
      ? ["HTML", "CSS", "JavaScript"]
      : current.id === "ol"
        ? ["افتح المحرر", "اكتب الـ markup", "راجع المعاينة"]
        : null;
  const items = locale === "ar" ? itemsAr : itemsEn;

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "القوائم" : "Lists"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: labEase }}
            className={`w-full max-w-md rounded-2xl border bg-gradient-to-br ${current.tint} via-slate-950/70 to-slate-950 px-4 py-4 sm:px-5`}
          >
            <p className="mb-3 font-mono text-[11px] font-semibold text-orange-100/90">
              &lt;{current.id === "nest" ? "ul" : current.chip}&gt;
              {current.id === "nest" ? (
                <span className="ms-2 text-[10px] font-normal text-violet-200/80">
                  + nested &lt;ul&gt;
                </span>
              ) : null}
            </p>

            {current.id === "ul" && items ? (
              <ul className="list-disc space-y-2 ps-5 text-sm text-cyan-50">
                {items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.1, duration: 0.3, ease: labEase }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            ) : null}

            {current.id === "ol" && items ? (
              <ol className="list-decimal space-y-2 ps-5 text-sm text-orange-50">
                {items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.1, duration: 0.3, ease: labEase }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ol>
            ) : null}

            {current.id === "dl" ? (
              <dl className="space-y-3 text-sm">
                {(
                  locale === "ar"
                    ? [
                        ["Semantic", "HTML بيوصف المعنى"],
                        ["List", "عناصر مرتبطة متجمّعة"],
                      ]
                    : [
                        ["Semantic", "HTML that describes meaning"],
                        ["List", "Grouped related items"],
                      ]
                ).map(([dt, dd], j) => (
                  <motion.div
                    key={dt}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: j * 0.12, duration: 0.3, ease: labEase }}
                  >
                    <dt className="font-semibold text-amber-100">{dt}</dt>
                    <dd className="mt-0.5 ps-3 text-amber-50/85">{dd}</dd>
                  </motion.div>
                ))}
              </dl>
            ) : null}

            {current.id === "nest" ? (
              <ul className="list-disc space-y-2 ps-5 text-sm text-violet-50">
                <motion.li
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: labEase }}
                >
                  HTML
                  <ul className="mt-1.5 list-[circle] space-y-1 ps-5 text-violet-100/90">
                    <motion.li
                      initial={reduce ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12, duration: 0.3 }}
                    >
                      {locale === "ar" ? "اللينكات" : "Links"}
                    </motion.li>
                    <motion.li
                      initial={reduce ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {locale === "ar" ? "القوائم" : "Lists"}
                    </motion.li>
                  </ul>
                </motion.li>
                <motion.li
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.3, ease: labEase }}
                >
                  CSS
                </motion.li>
              </ul>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <pre
          dir="ltr"
          className="w-full max-w-md overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {LIST_STEPS.map((s, i) => (
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

/** Native <details>/<summary> accordion — open, exclusive name, zero JS. */
const DETAILS_ITEMS = [
  {
    id: "q1",
    summary: "What is semantic HTML?",
    body: "Elements that describe meaning — not just boxes.",
  },
  {
    id: "q2",
    summary: "Is CSS available?",
    body: "Coming soon on FrontendCraft.",
  },
  {
    id: "q3",
    summary: "Can I practice in the sandbox?",
    body: "Yes — every lesson has a live playground.",
  },
] as const;

const DETAILS_STEPS = [
  {
    id: "closed",
    tip: "Closed by default — content stays in the DOM, hidden until open.",
    openId: null as string | null,
    showName: false,
    exclusive: false,
  },
  {
    id: "open-one",
    tip: "<summary> is the toggle — click/Enter/Space flips open.",
    openId: "q1",
    showName: false,
    exclusive: false,
  },
  {
    id: "name",
    tip: 'Shared name="faq" groups exclusive disclosures.',
    openId: "q1",
    showName: true,
    exclusive: false,
  },
  {
    id: "switch",
    tip: "Open another — siblings with the same name close.",
    openId: "q2",
    showName: true,
    exclusive: true,
  },
  {
    id: "third",
    tip: "Still one open at a time — native accordion, zero JS.",
    openId: "q3",
    showName: true,
    exclusive: true,
  },
] as const;

export function DetailsAccordionVisualizer() {
  const reduce = useReducedMotion();
  const { locale, dir } = useLanguage();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = DETAILS_STEPS[step];
  const closedRotate = dir === "rtl" ? 180 : 0;

  useEffect(() => {
    if (reduce) {
      setStep(DETAILS_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % DETAILS_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "Details و Summary" : "Details & summary"}
      caption={current.tip}
    >
      <div className="mb-2 flex min-h-8 items-center gap-2">
        <span className="shrink-0 rounded-md border border-amber-300/35 bg-amber-400/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-100">
          {current.showName ? 'name="faq"' : "<details>"}
        </span>
        <p className="text-sm leading-relaxed text-slate-300">
          {current.tip}
        </p>
      </div>

      {/* Fixed-height FAQ — all panels always laid out */}
      <div className="space-y-2 rounded-xl border border-amber-300/25 bg-slate-950/50 p-2.5">
        <p className="px-0.5 font-mono text-[9px] text-amber-200/60">
          &lt;details{current.showName ? ' name="faq"' : ""}&gt;
        </p>

        {DETAILS_ITEMS.map((item) => {
          const open = current.openId === item.id;
          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-lg border transition-colors ${
                open
                  ? "border-amber-300/45 bg-amber-400/10"
                  : "border-white/10 bg-slate-900/70"
              }`}
            >
              <motion.div
                animate={{
                  boxShadow: open
                    ? "inset 0 0 0 1px rgba(251,191,36,0.25)"
                    : "inset 0 0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.3, ease: labEase }}
                className="flex items-center gap-2 px-2.5 py-2"
              >
                <motion.span
                  aria-hidden
                  animate={{ rotate: open ? 90 : closedRotate }}
                  transition={{ duration: 0.28, ease: labEase }}
                  className="flex h-4 w-4 shrink-0 items-center justify-center text-amber-200/80"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-amber-50">
                    {item.summary}
                  </p>
                  <p className="font-mono text-[9px] text-slate-500">
                    &lt;summary&gt;
                    {open ? (
                      <span className="ms-1.5 text-amber-200/70">open</span>
                    ) : null}
                  </p>
                </div>
              </motion.div>

              {/* Fixed body slot — content stays in DOM; open only reveals it */}
              <motion.div
                animate={{ opacity: open ? 1 : 0.28 }}
                transition={{ duration: 0.35, ease: labEase }}
                className="min-h-10 border-t border-white/5 px-2.5 py-2"
              >
                <p
                  className={`text-[11px] leading-relaxed ${
                    open ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {item.body}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 font-mono text-[9px] text-slate-500">
        <span
          className={
            current.openId ? "text-amber-200/80" : "text-slate-500"
          }
        >
          open attribute
        </span>
        <span aria-hidden>·</span>
        <span
          className={
            current.showName ? "text-amber-200/80" : "text-slate-500"
          }
        >
          name group
        </span>
        <span aria-hidden>·</span>
        <span
          className={
            current.exclusive ? "text-emerald-300/90" : "text-slate-500"
          }
        >
          exclusive accordion
        </span>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {DETAILS_STEPS.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === step ? "bg-amber-300" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </LabStage>
  );
}

const FORM_STEPS = [
  {
    id: "email",
    label: "Email",
    type: "email",
    name: "email",
    value: "sam@craft.dev",
    status: "Focus email — label is tied with for/id",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    name: "password",
    value: "••••••••",
    status: "Focus password — name is what gets submitted",
  },
  {
    id: "terms",
    label: "I agree to the terms",
    type: "checkbox",
    name: "terms",
    value: "on",
    status: "Checkbox needs a wrapping label too",
  },
  {
    id: "submit",
    label: "Create account",
    type: "submit",
    name: "",
    value: "",
    status: "Submit — required fields already validated by HTML",
  },
] as const;

export function FormFlowVisualizer() {
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  const current = FORM_STEPS[step];
  const emailDone = step > 0;
  const passDone = step > 1;
  const termsDone = step > 2;
  const submitting = step === 3;

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % FORM_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  useEffect(() => {
    if (reduce || !playing || current.type === "checkbox" || current.type === "submit") {
      setTyped(current.value.length);
      return;
    }
    setTyped(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setTyped(Math.min(n, current.value.length));
      if (n >= current.value.length) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, [step, reduce, playing, current.type, current.value]);

  function fieldValue(id: "email" | "password") {
    if (id === "email") {
      if (step === 0) return FORM_STEPS[0].value.slice(0, typed);
      return emailDone ? FORM_STEPS[0].value : "";
    }
    if (step === 1) return FORM_STEPS[1].value.slice(0, typed);
    return passDone ? FORM_STEPS[1].value : "";
  }

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "تدفّق الفورم" : "Form flow"}
      caption={current.status}
    >
      <form
        className="space-y-2.5 rounded-xl border border-orange-300/25 bg-slate-950/50 p-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="font-mono text-[10px] text-orange-200/70">
          &lt;form method=&quot;post&quot;&gt;
        </p>

        {/* Email */}
        <motion.label
          htmlFor="lab-email"
          animate={{
            boxShadow:
              step === 0
                ? "0 0 0 2px rgba(251,146,60,0.35)"
                : "0 0 0 0 rgba(0,0,0,0)",
          }}
          className="block rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
        >
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-orange-50">
              Email
            </span>
            <span className="font-mono text-[9px] text-slate-500">
              type=&quot;email&quot; required
            </span>
          </div>
          <div
            id="lab-email"
            className={`flex h-8 items-center rounded-lg border px-2.5 font-mono text-[11px] ${
              step === 0
                ? "border-orange-300/50 bg-slate-950 text-orange-50"
                : "border-white/10 bg-slate-950/70 text-slate-300"
            }`}
          >
            <span className="truncate">
              {fieldValue("email") || (
                <span className="text-slate-600">name=&quot;email&quot;</span>
              )}
            </span>
            {step === 0 && !reduce ? (
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
                className="ms-0.5 inline-block h-3.5 w-0.5 bg-orange-300"
              />
            ) : null}
          </div>
        </motion.label>

        {/* Password */}
        <motion.label
          htmlFor="lab-pass"
          animate={{
            boxShadow:
              step === 1
                ? "0 0 0 2px rgba(251,146,60,0.35)"
                : "0 0 0 0 rgba(0,0,0,0)",
          }}
          className="block rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
        >
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-orange-50">
              Password
            </span>
            <span className="font-mono text-[9px] text-slate-500">
              type=&quot;password&quot; minlength=&quot;8&quot;
            </span>
          </div>
          <div
            id="lab-pass"
            className={`flex h-8 items-center rounded-lg border px-2.5 font-mono text-[11px] tracking-wider ${
              step === 1
                ? "border-orange-300/50 bg-slate-950 text-orange-50"
                : "border-white/10 bg-slate-950/70 text-slate-300"
            }`}
          >
            <span className="truncate">
              {fieldValue("password") || (
                <span className="tracking-normal text-slate-600">
                  name=&quot;password&quot;
                </span>
              )}
            </span>
            {step === 1 && !reduce ? (
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
                className="ms-0.5 inline-block h-3.5 w-0.5 bg-orange-300"
              />
            ) : null}
          </div>
        </motion.label>

        {/* Checkbox */}
        <motion.label
          animate={{
            boxShadow:
              step === 2
                ? "0 0 0 2px rgba(251,146,60,0.35)"
                : "0 0 0 0 rgba(0,0,0,0)",
          }}
          className="flex cursor-default items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2"
        >
          <motion.span
            animate={{
              backgroundColor: termsDone || step === 2 ? "#fb923c" : "transparent",
              borderColor:
                termsDone || step === 2
                  ? "rgba(251,146,60,0.9)"
                  : "rgba(255,255,255,0.25)",
              scale: step === 2 && !reduce ? [1, 1.12, 1] : 1,
            }}
            transition={{ duration: 0.35 }}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold text-slate-950"
          >
            {termsDone || step === 2 ? "✓" : ""}
          </motion.span>
          <span className="text-[11px] text-slate-200">
            I agree to the terms
            <span className="ms-1.5 font-mono text-[9px] text-slate-500">
              &lt;input type=&quot;checkbox&quot;&gt;
            </span>
          </span>
        </motion.label>

        {/* Submit */}
        <motion.button
          type="button"
          animate={{
            scale: submitting && !reduce ? [1, 1.03, 1] : 1,
            boxShadow: submitting
              ? "0 0 22px rgba(251,146,60,0.4)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{
            duration: LAB_LOOP_S,
            repeat: submitting && !reduce ? Infinity : 0,
          }}
          className="w-full rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-4 py-2.5 text-center text-xs font-bold text-slate-950"
        >
          {submitting ? "Submitting…" : "Create account"}
          <span className="ms-1.5 font-mono text-[9px] font-semibold opacity-70">
            type=&quot;submit&quot;
          </span>
        </motion.button>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {["label + input", "name", "type", "required"].map((chip, i) => {
            const lit = step >= i;
            return (
              <motion.span
                key={chip}
                animate={{
                  opacity: lit ? 1 : 0.35,
                  borderColor: lit
                    ? "rgba(52,211,153,0.45)"
                    : "rgba(255,255,255,0.1)",
                  backgroundColor: lit
                    ? "rgba(52,211,153,0.12)"
                    : "rgba(15,23,42,0.4)",
                }}
                className="rounded-full border px-2 py-0.5 font-mono text-[9px] text-emerald-100/90"
              >
                {lit ? "✓ " : ""}
                {chip}
              </motion.span>
            );
          })}
        </div>
      </form>
    </LabStage>
  );
}

/** Build a data table one layer at a time — structure, not page layout. */
const TABLE_BUILD = [
  {
    id: "shell",
    chip: "table",
    tip: {
      en: "`<table>` is for tabular data — not page layout.",
      ar: "`<table>` للبيانات الجدولية — مش لـ layout الصفحة.",
    },
    markup: "<table>\n  …\n</table>",
    showCaption: false,
    showHead: false,
    rows: 0,
    showScope: false,
    showLayoutTrap: false,
  },
  {
    id: "caption",
    chip: "caption",
    tip: {
      en: "`<caption>` titles the whole table for everyone.",
      ar: "`<caption>` بيسمّي الجدول كله للجميع.",
    },
    markup: "<table>\n  <caption>Scoreboard</caption>\n</table>",
    showCaption: true,
    showHead: false,
    rows: 0,
    showScope: false,
    showLayoutTrap: false,
  },
  {
    id: "thead",
    chip: "thead",
    tip: {
      en: "`<thead>` + `<th>` — column headers for Name and Score.",
      ar: "`<thead>` + `<th>` — عناوين أعمدة للاسم والنتيجة.",
    },
    markup: `<thead>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
</thead>`,
    showCaption: true,
    showHead: true,
    rows: 0,
    showScope: false,
    showLayoutTrap: false,
  },
  {
    id: "tbody",
    chip: "tbody",
    tip: {
      en: "`<tbody>` holds data rows — related values per column.",
      ar: "`<tbody>` بيحمل صفوف البيانات — قيم مرتبطة لكل عمود.",
    },
    markup: `<tbody>
  <tr>
    <th>Nour</th>
    <td>42</td>
  </tr>
</tbody>`,
    showCaption: true,
    showHead: true,
    rows: 1,
    showScope: false,
    showLayoutTrap: false,
  },
  {
    id: "rows",
    chip: "rows",
    tip: {
      en: "More `<tr>` rows stack — same columns, comparable values.",
      ar: "صفوف `<tr>` زيادة — نفس الأعمدة وقيم قابلة للمقارنة.",
    },
    markup: `<tr><th>Sam</th><td>90</td></tr>
<tr><th>Ava</th><td>95</td></tr>`,
    showCaption: true,
    showHead: true,
    rows: 3,
    showScope: false,
    showLayoutTrap: false,
  },
  {
    id: "scope",
    chip: "scope",
    tip: {
      en: '`scope="col"` / `scope="row"` ties cells to the right headers.',
      ar: '`scope="col"` / `scope="row"` بيربط الخلايا بالـ headers الصح.',
    },
    markup: `<th scope="col">Name</th>
<th scope="row">Nour</th>`,
    showCaption: true,
    showHead: true,
    rows: 3,
    showScope: true,
    showLayoutTrap: false,
  },
  {
    id: "layout",
    chip: "≠ layout",
    tip: {
      en: "Trap: don’t use tables for page layout — use CSS.",
      ar: "فخ: متستخدمش الجداول لـ layout الصفحة — استخدم CSS.",
    },
    markup: "<!-- layout → CSS Grid / Flexbox -->\n<!-- tables → data only -->",
    showCaption: false,
    showHead: false,
    rows: 0,
    showScope: false,
    showLayoutTrap: true,
  },
] as const;

const TABLE_ROWS = [
  { name: "Nour", score: "42" },
  { name: "Sam", score: "90" },
  { name: "Ava", score: "95" },
] as const;

export function TableGridVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = TABLE_BUILD[step];

  useEffect(() => {
    if (reduce) {
      setStep(TABLE_BUILD.length - 2);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % TABLE_BUILD.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const colName = locale === "ar" ? "الاسم" : "Name";
  const colScore = locale === "ar" ? "النتيجة" : "Score";
  const captionLabel = locale === "ar" ? "لوحة النتائج" : "Scoreboard";

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "الجداول" : "Tables"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <AnimatePresence mode="wait">
          {current.showLayoutTrap ? (
            <motion.div
              key="layout-trap"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: labEase }}
              className="grid min-h-0 flex-1 gap-2 sm:grid-cols-2"
            >
              <div className="rounded-xl border border-rose-300/40 bg-rose-400/10 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-rose-200/80">
                  {locale === "ar" ? "تجنّب" : "Avoid"}
                </p>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] text-rose-100/90">
                  <div className="rounded-md border border-rose-300/30 bg-rose-400/10 px-2 py-3 text-center">
                    nav
                  </div>
                  <div className="rounded-md border border-rose-300/30 bg-rose-400/10 px-2 py-3 text-center">
                    aside
                  </div>
                  <div className="col-span-2 rounded-md border border-dashed border-rose-300/35 bg-rose-400/5 px-2 py-4 text-center">
                    &lt;table&gt; as layout ✗
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-emerald-300/40 bg-emerald-400/10 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-200/80">
                  {locale === "ar" ? "فضّل" : "Prefer"}
                </p>
                <div className="space-y-1.5 font-mono text-[10px] text-emerald-50">
                  <div className="rounded-md border border-emerald-300/35 bg-emerald-400/15 px-2 py-2">
                    CSS Grid / Flexbox
                  </div>
                  <div className="rounded-md border border-emerald-300/35 bg-emerald-400/15 px-2 py-2">
                    &lt;table&gt; → data only ✓
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="data-table"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: labEase }}
              className="min-h-0 flex-1 overflow-hidden rounded-xl border border-orange-300/35 bg-gradient-to-br from-orange-400/10 via-slate-950/80 to-slate-950"
            >
              <table className="w-full border-collapse text-[11px]">
                <motion.caption
                  animate={{
                    opacity: current.showCaption ? 1 : 0.15,
                    height: current.showCaption ? "auto" : 28,
                  }}
                  transition={{ duration: 0.35, ease: labEase }}
                  className="border-b border-orange-300/20 bg-orange-400/10 px-3 py-2 text-start"
                >
                  <span className="inline-flex items-center gap-2 font-semibold text-orange-50">
                    {current.showCaption ? captionLabel : "…"}
                    {current.showCaption ? (
                      <span className="font-mono text-[9px] font-normal text-orange-200/70">
                        &lt;caption&gt;
                      </span>
                    ) : null}
                  </span>
                </motion.caption>
                <thead>
                  <motion.tr
                    animate={{ opacity: current.showHead ? 1 : 0.12 }}
                    transition={{ duration: 0.35, ease: labEase }}
                  >
                    {([colName, colScore] as const).map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="border border-orange-300/15 bg-orange-400/12 px-2.5 py-2 text-start text-[11px] font-semibold text-orange-50"
                      >
                        <span className="inline-flex flex-wrap items-center gap-1.5">
                          {current.showHead ? label : "·"}
                          <motion.span
                            animate={{ opacity: current.showScope ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: labEase }}
                            className="font-mono text-[8px] font-medium text-orange-200/70"
                          >
                            scope=&quot;col&quot;
                          </motion.span>
                        </span>
                      </th>
                    ))}
                  </motion.tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row, i) => {
                    const visible = current.rows > i;
                    return (
                      <motion.tr
                        key={row.name}
                        initial={false}
                        animate={{
                          opacity: visible ? 1 : 0.1,
                          y: visible ? 0 : 4,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: labEase,
                          delay: visible && !reduce ? i * 0.05 : 0,
                        }}
                      >
                        <th
                          scope="row"
                          className="border border-orange-300/15 bg-slate-950/55 px-2.5 py-2 text-start text-[11px] font-semibold text-amber-100/90"
                        >
                          <span className="inline-flex flex-wrap items-center gap-1.5">
                            {visible ? row.name : "·"}
                            <motion.span
                              animate={{
                                opacity: current.showScope && visible ? 1 : 0,
                              }}
                              transition={{ duration: 0.3, ease: labEase }}
                              className="font-mono text-[8px] font-medium text-slate-400"
                            >
                              scope=&quot;row&quot;
                            </motion.span>
                          </span>
                        </th>
                        <td className="border border-orange-300/15 bg-slate-950/35 px-2.5 py-2 font-mono text-[11px] text-slate-200">
                          {visible ? row.score : "·"}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        <pre
          dir="ltr"
          className="shrink-0 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {TABLE_BUILD.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-orange-300 text-slate-950"
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

/** Screen-reader walk — name · role · value as focus moves through native HTML. */
const A11Y_STEPS = [
  {
    id: "skip",
    chip: "skip",
    tip: {
      en: "Skip link — first Tab target before chrome.",
      ar: "Skip link — أول هدف لـ Tab قبل الـ chrome.",
    },
    speech: { en: "Skip to content, link", ar: "تخطي للمحتوى، رابط" },
    preview: { en: "Skip to content", ar: "تخطي للمحتوى" },
    markup: '<a href="#main">Skip to content</a>',
  },
  {
    id: "button",
    chip: "button",
    tip: {
      en: "Native `<button>` exposes name, role, and state.",
      ar: "`<button>` الأصلي بيعرض الاسم والـ role والحالة.",
    },
    speech: {
      en: "More info, button, collapsed",
      ar: "مزيد من المعلومات، زر، مطوي",
    },
    preview: { en: "More info", ar: "مزيد من المعلومات" },
    markup: '<button type="button" aria-expanded="false">\n  More info\n</button>',
  },
  {
    id: "alt",
    chip: "alt",
    tip: {
      en: "Meaningful `alt` becomes the image’s accessible name.",
      ar: "`alt` الهادف بيبقى الاسم الـ accessible للصورة.",
    },
    speech: {
      en: "Sales grew 20% in March, image",
      ar: "المبيعات زادت 20% في مارس، صورة",
    },
    preview: { en: 'alt="Sales grew 20%…"', ar: 'alt="المبيعات زادت 20%…"' },
    markup: '<img src="chart.svg" alt="Sales grew 20% in March" />',
  },
  {
    id: "label",
    chip: "label",
    tip: {
      en: "`<label for>` + `<input>` → accessible name.",
      ar: "`<label for>` + `<input>` → اسم accessible.",
    },
    speech: { en: "Email, edit text", ar: "البريد، نص قابل للتعديل" },
    preview: { en: "Email", ar: "البريد" },
    markup: `<label for="email">Email</label>
<input id="email" type="email" />`,
  },
  {
    id: "live",
    chip: "live",
    tip: {
      en: "`aria-live` announces updates without stealing focus.",
      ar: "`aria-live` بيعلن التحديث من غير ما يسرق الـ focus.",
    },
    speech: { en: "Saved", ar: "اتحفظ" },
    preview: { en: "Saved", ar: "اتحفظ" },
    markup: '<p role="status" aria-live="polite">Saved</p>',
  },
] as const;

export function A11yCheckVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = A11Y_STEPS[step];

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % A11Y_STEPS.length),
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
      title={locale === "ar" ? "فحص الوصولية" : "Accessibility check"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
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
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3">
              <p className="text-sm font-semibold text-emerald-50">
                {locale === "ar" ? current.preview.ar : current.preview.en}
              </p>
            </div>

            <div className="rounded-xl border border-cyan-400/25 bg-cyan-950/30 px-3 py-2.5">
              <div className="mb-1 flex items-center gap-1.5 text-cyan-200/80">
                <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {locale === "ar" ? "قارئ الشاشة" : "Screen reader"}
                </span>
              </div>
              <p className="font-mono text-[12px] font-medium text-cyan-50">
                “{locale === "ar" ? current.speech.ar : current.speech.en}”
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
          {A11Y_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-emerald-300 text-slate-950"
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

/** Bad vs Screen-Reader Ready — practice flips (sr-practice lesson). */
const SR_READY_STEPS = [
  {
    id: "button",
    chip: "button",
    tip: {
      en: "Actions need a real `<button>` — not a clickable `div`.",
      ar: "الأفعال محتاجة `<button>` حقيقي — مش `div` قابل للضغط.",
    },
    bad: {
      code: `<div class="btn" onclick="save()">Save</div>`,
      hear: { en: "(not in Tab order)", ar: "(مش في ترتيب Tab)" },
    },
    good: {
      code: `<button type="button">Save</button>`,
      hear: { en: "Save, button", ar: "حفظ، زر" },
    },
  },
  {
    id: "link",
    chip: "link",
    tip: {
      en: "Navigation needs a real `href` — not a fake `span`.",
      ar: "التنقّل محتاج `href` حقيقي — مش `span` مزيف.",
    },
    bad: {
      code: `<span onclick="location='/js'">Open JS</span>`,
      hear: { en: "(no link role)", ar: "(مفيش role رابط)" },
    },
    good: {
      code: `<a href="/javascript">Open JS track</a>`,
      hear: { en: "Open JS track, link", ar: "افتح مسار JS، رابط" },
    },
  },
  {
    id: "alt",
    chip: "alt",
    tip: {
      en: "Meaningful `alt` names the image for AT.",
      ar: "`alt` الهادف بيسمّي الصورة لـ AT.",
    },
    bad: {
      code: `<img src="chart.svg" />`,
      hear: { en: "image", ar: "صورة" },
    },
    good: {
      code: `<img src="chart.svg" alt="Sales grew 20% in March" />`,
      hear: {
        en: "Sales grew 20% in March, image",
        ar: "المبيعات زادت 20% في مارس، صورة",
      },
    },
  },
  {
    id: "label",
    chip: "label",
    tip: {
      en: "Visible `<label>` beats placeholder-only names.",
      ar: "`<label>` الظاهر أحسن من اسم placeholder بس.",
    },
    bad: {
      code: `<input type="email" placeholder="Email" />`,
      hear: { en: "edit text", ar: "نص قابل للتعديل" },
    },
    good: {
      code: `<label for="email">Email</label>\n<input id="email" type="email" />`,
      hear: { en: "Email, edit text", ar: "البريد، نص قابل للتعديل" },
    },
  },
  {
    id: "live",
    chip: "live",
    tip: {
      en: "`aria-live` announces status — a silent toast is missed.",
      ar: "`aria-live` بيعلن الحالة — toast صامت بيتفوت.",
    },
    bad: {
      code: `<p class="toast">Saved!</p>`,
      hear: { en: "(silence)", ar: "(صمت)" },
    },
    good: {
      code: `<p role="status" aria-live="polite">Saved!</p>`,
      hear: { en: "Saved!", ar: "اتحفظ!" },
    },
  },
] as const;

export function SrReadyVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SR_READY_STEPS[step];

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % SR_READY_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const ar = locale === "ar";

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "غلط مقابل جاهز للـ SR" : "Bad vs SR ready"}
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
            className="grid w-full max-w-md gap-2 sm:grid-cols-2"
          >
            <div className="rounded-xl border border-rose-300/40 bg-rose-400/10 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-rose-200/80">
                {ar ? "غلط" : "Bad"}
              </p>
              <pre
                dir="ltr"
                className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-[10px] leading-4 text-rose-50/90"
              >
                {current.bad.code}
              </pre>
              <div className="mt-2 flex items-start gap-1.5 text-rose-100/70">
                <Volume2 className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                <p className="font-mono text-[10px]">
                  “{ar ? current.bad.hear.ar : current.bad.hear.en}”
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-300/40 bg-emerald-400/10 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-200/80">
                {ar ? "جاهز" : "Ready"}
              </p>
              <pre
                dir="ltr"
                className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-[10px] leading-4 text-emerald-50/90"
              >
                {current.good.code}
              </pre>
              <div className="mt-2 flex items-start gap-1.5 text-emerald-100/80">
                <Volume2 className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                <p className="font-mono text-[10px]">
                  “{ar ? current.good.hear.ar : current.good.hear.en}”
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {SR_READY_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-emerald-300 text-slate-950"
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

/** SEO crawl lab — first HTML response → SERP (CWV lives in Pro performance). */
const SEO_STEPS = [
  {
    id: "title",
    chip: "title",
    tip: {
      en: "`<title>` in the first HTML — tab + SERP title.",
      ar: "`<title>` في أول HTML — تاب المتصفح + عنوان النتائج.",
    },
    serpTitle: true,
    serpDesc: false,
    serpUrl: false,
    serpBody: false,
    markup: "<title>FrontendCraft — HTML</title>",
  },
  {
    id: "desc",
    chip: "desc",
    tip: {
      en: "`meta description` — honest snippet under the result.",
      ar: "`meta description` — مقتطف صادق تحت النتيجة.",
    },
    serpTitle: true,
    serpDesc: true,
    serpUrl: false,
    serpBody: false,
    markup:
      '<meta name="description" content="Learn HTML with interactive labs." />',
  },
  {
    id: "canonical",
    chip: "canonical",
    tip: {
      en: '`rel="canonical"` — one preferred URL for duplicates.',
      ar: '`rel="canonical"` — رابط مفضّل واحد للنسخ المكررة.',
    },
    serpTitle: true,
    serpDesc: true,
    serpUrl: true,
    serpBody: false,
    markup: '<link rel="canonical" href="https://example.com/html" />',
  },
  {
    id: "body",
    chip: "main",
    tip: {
      en: "Primary copy in `<main>` — indexable in the first response.",
      ar: "المحتوى الأساسي في `<main>` — قابل للفهرسة من أول رد.",
    },
    serpTitle: true,
    serpDesc: true,
    serpUrl: true,
    serpBody: true,
    markup: "<main>\n  <h1>HTML track</h1>\n  <p>…</p>\n</main>",
  },
] as const;

export function SeoCrawlVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SEO_STEPS[step];

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % SEO_STEPS.length),
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
      title={locale === "ar" ? "زحف الـ SEO" : "SEO crawl"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
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
            <div className="space-y-2 rounded-xl border border-orange-300/30 bg-slate-950/60 p-3">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-orange-200/60">
                {locale === "ar" ? "معاينة نتيجة البحث" : "Search result"}
              </p>
              <p
                className={`text-sm font-semibold leading-snug ${
                  current.serpTitle ? "text-sky-300" : "text-slate-600"
                }`}
              >
                FrontendCraft — HTML track
              </p>
              <p
                className={`truncate font-mono text-[10px] ${
                  current.serpUrl ? "text-emerald-300/80" : "text-slate-600"
                }`}
              >
                {current.serpUrl
                  ? 'https://example.com/html · rel="canonical"'
                  : "example.com/html"}
              </p>
              <p
                className={`min-h-8 text-sm leading-relaxed ${
                  current.serpDesc ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {locale === "ar"
                  ? "اتعلم HTML بمعامل تفاعلية وصناديق حية."
                  : "Learn HTML with interactive labs and live sandboxes."}
              </p>
              <div
                className={`rounded-lg border border-dashed px-2.5 py-2 ${
                  current.serpBody
                    ? "border-orange-300/40 bg-orange-400/10"
                    : "border-white/10 bg-slate-900/50"
                }`}
              >
                <p className="font-mono text-[9px] text-slate-500">&lt;main&gt;</p>
                <p className="mt-0.5 text-[11px] font-medium text-orange-50">
                  {current.serpBody ? (
                    <>
                      <span className="text-orange-200/80">&lt;h1&gt;</span>{" "}
                      {locale === "ar" ? "مسار HTML" : "HTML track"}
                    </>
                  ) : (
                    <span className="text-slate-600">…</span>
                  )}
                </p>
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
          {SEO_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-orange-300 text-slate-950"
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

/** Pro CWV lab — LCP / INP / CLS as product metrics. */
const CWV_STEPS = [
  {
    id: "lcp-bad",
    chip: "LCP ✗",
    tip: {
      en: "LCP — oversized hero without size or preload paints late.",
      ar: "LCP — hero كبير من غير مقاس أو preload بيتأخر.",
    },
    focus: "lcp" as const,
    good: false,
    scores: { lcp: "4.2s", inp: "—", cls: "—" },
    markup: '<img src="hero.jpg" loading="lazy" />',
    hero: { en: "hero · no size · lazy", ar: "hero · من غير مقاس · lazy" },
    click: { en: "Click — waiting…", ar: "اضغط — مستني…" },
    shift: { en: "layout idle", ar: "الـ layout ثابت" },
  },
  {
    id: "lcp-good",
    chip: "LCP ✓",
    tip: {
      en: "LCP fix — sized image + `fetchpriority=\"high\"` / preload.",
      ar: "إصلاح LCP — صورة بمقاس + `fetchpriority=\"high\"` / preload.",
    },
    focus: "lcp" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "—", cls: "—" },
    markup:
      '<img src="hero.jpg" width="1200" height="630" fetchpriority="high" />',
    hero: {
      en: "hero · width/height · high priority",
      ar: "hero · مقاس · أولوية عالية",
    },
    click: { en: "Click — ready", ar: "اضغط — جاهز" },
    shift: { en: "layout idle", ar: "الـ layout ثابت" },
  },
  {
    id: "inp-bad",
    chip: "INP ✗",
    tip: {
      en: "INP — heavy main-thread work delays the click.",
      ar: "INP — شغل ثقيل على الـ main thread بيأخر الضغط.",
    },
    focus: "inp" as const,
    good: false,
    scores: { lcp: "1.8s", inp: "380ms", cls: "—" },
    markup: "onClick={() => heavySyncWork()}",
    hero: {
      en: "hero · width/height · high priority",
      ar: "hero · مقاس · أولوية عالية",
    },
    click: {
      en: "Click… (main thread busy)",
      ar: "اضغط… (الـ main thread مشغول)",
    },
    shift: { en: "layout idle", ar: "الـ layout ثابت" },
  },
  {
    id: "inp-good",
    chip: "INP ✓",
    tip: {
      en: "INP fix — light handlers; defer non-critical JS.",
      ar: "إصلاح INP — handlers خفيفة؛ أجّل JS غير الحرج.",
    },
    focus: "inp" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "120ms", cls: "—" },
    markup: "onClick={() => queueMicrotask(work)}\n<script defer src=\"app.js\">",
    hero: {
      en: "hero · width/height · high priority",
      ar: "hero · مقاس · أولوية عالية",
    },
    click: { en: "Click — snappy response", ar: "اضغط — استجابة سريعة" },
    shift: { en: "layout idle", ar: "الـ layout ثابت" },
  },
  {
    id: "cls-bad",
    chip: "CLS ✗",
    tip: {
      en: "CLS — unsized media / late banner shoves content.",
      ar: "CLS — ميديا من غير مقاس / بانر متأخر بيزق المحتوى.",
    },
    focus: "cls" as const,
    good: false,
    scores: { lcp: "1.8s", inp: "120ms", cls: "0.28" },
    markup: "<aside class=\"ad\">…late inject…</aside>",
    hero: {
      en: "hero · width/height · high priority",
      ar: "hero · مقاس · أولوية عالية",
    },
    click: { en: "Click — snappy response", ar: "اضغط — استجابة سريعة" },
    shift: {
      en: "banner injects → content shifts",
      ar: "البانر يدخل → المحتوى يتحرك",
    },
  },
  {
    id: "cls-good",
    chip: "CLS ✓",
    tip: {
      en: "CLS fix — `width`/`height` (or `aspect-ratio`) reserved.",
      ar: "إصلاح CLS — احجز `width`/`height` (أو `aspect-ratio`).",
    },
    focus: "cls" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "120ms", cls: "0.04" },
    markup: '<aside style="aspect-ratio: 16/5; min-height: 120px">…</aside>',
    hero: {
      en: "hero · width/height · high priority",
      ar: "hero · مقاس · أولوية عالية",
    },
    click: { en: "Click — snappy response", ar: "اضغط — استجابة سريعة" },
    shift: {
      en: "reserved space · stable layout",
      ar: "مساحة محجوزة · layout ثابت",
    },
  },
  {
    id: "pass",
    chip: "pass",
    tip: {
      en: "Field targets — LCP < 2.5s · INP < 200ms · CLS < 0.1",
      ar: "أهداف الميدان — LCP < 2.5s · INP < 200ms · CLS < 0.1",
    },
    focus: "all" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "120ms", cls: "0.04" },
    markup: "/* ship checklist */\nLCP ✓  INP ✓  CLS ✓",
    hero: {
      en: "hero · width/height · high priority",
      ar: "hero · مقاس · أولوية عالية",
    },
    click: { en: "Click — snappy response", ar: "اضغط — استجابة سريعة" },
    shift: {
      en: "reserved space · stable layout",
      ar: "مساحة محجوزة · layout ثابت",
    },
  },
] as const;

export function CwvLabVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = CWV_STEPS[step];
  const ar = locale === "ar";

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % CWV_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const metrics = [
    {
      id: "LCP",
      key: "lcp" as const,
      label: ar ? "أكبر رسم" : "largest paint",
      score: current.scores.lcp,
    },
    {
      id: "INP",
      key: "inp" as const,
      label: ar ? "تفاعل" : "interaction",
      score: current.scores.inp,
    },
    {
      id: "CLS",
      key: "cls" as const,
      label: ar ? "إزاحة" : "layout shift",
      score: current.scores.cls,
    },
  ];

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title="Core Web Vitals"
      caption={ar ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-orange-300/25 bg-slate-950/50 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-orange-200/60">
              {ar ? "رسم الصفحة" : "page paint"}
            </span>
            <span
              className={`rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-semibold ${
                current.good
                  ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                  : "border-rose-300/40 bg-rose-400/15 text-rose-100"
              }`}
            >
              {current.good
                ? ar
                  ? "جيد"
                  : "good"
                : ar
                  ? "يحتاج شغل"
                  : "needs work"}
            </span>
          </div>

          <motion.div
            animate={{
              opacity:
                current.focus === "lcp" || current.focus === "all" ? 1 : 0.45,
              y:
                current.focus === "lcp" && !current.good && !reduce
                  ? [0, 2, 0]
                  : 0,
              borderColor:
                current.focus === "lcp"
                  ? current.good
                    ? "rgba(52,211,153,0.5)"
                    : "rgba(251,113,133,0.5)"
                  : "rgba(255,255,255,0.1)",
            }}
            transition={{ duration: 0.35, ease: labEase }}
            className="mb-2 flex h-14 items-center justify-center rounded-lg border bg-gradient-to-r from-orange-400/25 via-amber-300/10 to-cyan-400/15"
          >
            <span className="font-mono text-[10px] text-orange-100/90">
              {ar ? current.hero.ar : current.hero.en}
            </span>
          </motion.div>

          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-white/10" />
            <div className="h-2 w-1/3 rounded-full bg-white/10" />
          </div>
          <motion.button
            type="button"
            tabIndex={-1}
            animate={{
              opacity:
                current.focus === "inp" || current.focus === "all" ? 1 : 0.45,
              scale:
                current.focus === "inp" && !current.good && !reduce
                  ? [1, 0.96, 1]
                  : 1,
              boxShadow:
                current.focus === "inp"
                  ? current.good
                    ? "0 0 0 2px rgba(52,211,153,0.45)"
                    : "0 0 0 2px rgba(251,113,133,0.45)"
                  : "0 0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.4, ease: labEase }}
            className="mb-2 w-full rounded-lg bg-orange-300/90 px-3 py-2 text-center text-[11px] font-bold text-slate-950"
          >
            {ar ? current.click.ar : current.click.en}
          </motion.button>

          <motion.div
            animate={{
              opacity:
                current.focus === "cls" || current.focus === "all" ? 1 : 0.45,
              y:
                current.focus === "cls" && !current.good && !reduce
                  ? [0, 10, 0]
                  : 0,
              borderColor:
                current.focus === "cls"
                  ? current.good
                    ? "rgba(52,211,153,0.5)"
                    : "rgba(251,113,133,0.5)"
                  : "rgba(255,255,255,0.1)",
            }}
            transition={{
              duration:
                current.focus === "cls" && !current.good ? LAB_LOOP_S : 0.35,
              ease: labEase,
              repeat:
                current.focus === "cls" && !current.good && !reduce
                  ? Infinity
                  : 0,
            }}
            className="rounded-lg border border-dashed bg-slate-900/70 px-2.5 py-2"
          >
            <p className="font-mono text-[10px] text-slate-300">
              {ar ? current.shift.ar : current.shift.en}
            </p>
          </motion.div>
        </div>

        <div className="grid w-full max-w-md grid-cols-3 gap-1.5">
          {metrics.map((metric) => {
            const active =
              current.focus === "all" || current.focus === metric.key;
            const lit = active && current.good;
            const warn = active && !current.good;
            return (
              <motion.div
                key={metric.id}
                animate={{
                  borderColor: lit
                    ? "rgba(52,211,153,0.5)"
                    : warn
                      ? "rgba(251,113,133,0.45)"
                      : "rgba(255,255,255,0.1)",
                  backgroundColor: lit
                    ? "rgba(52,211,153,0.12)"
                    : warn
                      ? "rgba(251,113,133,0.1)"
                      : "rgba(15,23,42,0.45)",
                  opacity: active ? 1 : 0.45,
                }}
                transition={{ duration: 0.3, ease: labEase }}
                className="rounded-lg border px-2 py-1.5 text-center"
              >
                <p
                  className={`font-mono text-[11px] font-bold ${
                    lit
                      ? "text-emerald-300"
                      : warn
                        ? "text-rose-300"
                        : "text-slate-500"
                  }`}
                >
                  {metric.id}
                </p>
                <p className="font-mono text-[10px] text-slate-300">
                  {metric.score}
                </p>
                <p className="text-[8px] text-slate-500">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>

        <pre
          dir="ltr"
          className="w-full max-w-md overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {CWV_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-orange-300 text-slate-950"
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

const OG_STEPS = [
  {
    id: "title",
    chip: "og:title",
    tip: {
      en: "`og:title` — first line share previews show.",
      ar: "`og:title` — أول سطر في معاينة المشاركة.",
    },
    showTitle: true,
    showDesc: false,
    showImage: false,
    showTheme: false,
    markup: '<meta property="og:title" content="Document Anatomy" />',
  },
  {
    id: "desc",
    chip: "og:desc",
    tip: {
      en: "`og:description` — short line under the title.",
      ar: "`og:description` — سطر قصير تحت العنوان.",
    },
    showTitle: true,
    showDesc: true,
    showImage: false,
    showTheme: false,
    markup:
      '<meta property="og:description" content="Learn the HTML document shell." />',
  },
  {
    id: "image",
    chip: "og:image",
    tip: {
      en: "`og:image` — absolute HTTPS URL in the first HTML.",
      ar: "`og:image` — رابط HTTPS مطلق في أول HTML.",
    },
    showTitle: true,
    showDesc: true,
    showImage: true,
    showTheme: false,
    markup: '<meta property="og:image" content="https://…/og.png" />',
  },
  {
    id: "theme",
    chip: "theme",
    tip: {
      en: "`theme-color` + Twitter card — browser chrome & X previews.",
      ar: "`theme-color` + Twitter card — شريط المتصفح ومعاينة X.",
    },
    showTitle: true,
    showDesc: true,
    showImage: true,
    showTheme: true,
    markup: `<meta name="theme-color" content="#0f172a" />
<meta name="twitter:card" content="summary_large_image" />`,
  },
] as const;

/** Open Graph unfurl — head tags → share preview (Head & Social Meta lesson). */
export function MetaCardVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = OG_STEPS[step];

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % OG_STEPS.length),
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
      title={locale === "ar" ? "ميتـا السوشيال" : "Social meta"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
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
              className={`overflow-hidden rounded-xl border bg-slate-950/60 ${
                current.showTheme
                  ? "border-violet-300/40"
                  : "border-orange-300/35"
              }`}
              style={
                current.showTheme
                  ? { boxShadow: "inset 0 3px 0 0 #0f172a" }
                  : undefined
              }
            >
              <div
                className={`flex h-14 items-center justify-center ${
                  current.showImage
                    ? "bg-gradient-to-r from-orange-400/40 via-amber-300/20 to-cyan-400/25"
                    : "bg-slate-900/80"
                }`}
              >
                <span className="font-mono text-[10px] text-orange-100/80">
                  {current.showImage
                    ? "og:image · https://…/og.png"
                    : "og:image …"}
                </span>
              </div>
              <div className="space-y-1 p-3">
                <p className="text-[9px] uppercase tracking-wider text-orange-200/60">
                  {current.showTheme ? "twitter:card · theme-color" : "og share card"}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    current.showTitle ? "text-orange-50" : "text-slate-600"
                  }`}
                >
                  {locale === "ar" ? "تشريح المستند" : "Document Anatomy"}
                </p>
                <p
                  className={`min-h-8 text-sm leading-relaxed ${
                    current.showDesc ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {locale === "ar"
                    ? "اتعلم هيكل مستند HTML بمعامل تفاعلية."
                    : "Learn the HTML document shell with interactive labs."}
                </p>
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
          {OG_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-orange-300 text-slate-950"
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

/** Native <dialog> — showModal, backdrop, focus, Escape / method=dialog. */
const DIALOG_STEPS = [
  {
    id: "idle",
    tip: "Invoker button waits — prefer showModal() over a custom div overlay.",
    open: false,
    focus: "invoker" as const,
    call: "idle",
  },
  {
    id: "showModal",
    tip: "showModal() — top layer + ::backdrop; focus moves inside.",
    open: true,
    focus: "dialog" as const,
    call: "showModal()",
  },
  {
    id: "named",
    tip: "Name the dialog — aria-labelledby points at the title.",
    open: true,
    focus: "title" as const,
    call: "showModal()",
  },
  {
    id: "escape",
    tip: "Escape (or method=\"dialog\") closes and restores focus.",
    open: true,
    focus: "cancel" as const,
    call: "close()",
  },
  {
    id: "restored",
    tip: "Focus returns to the invoker when possible.",
    open: false,
    focus: "invoker" as const,
    call: "closed",
  },
] as const;

export function NativeDialogVisualizer() {
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = DIALOG_STEPS[step];

  useEffect(() => {
    if (reduce) {
      setStep(1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % DIALOG_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function ring(target: (typeof DIALOG_STEPS)[number]["focus"]) {
    return current.focus === target
      ? "0 0 0 2px rgba(251,146,60,0.55)"
      : "0 0 0 0 rgba(0,0,0,0)";
  }

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "Dialog الأصلي" : "Native dialog"}
      caption={
        locale === "ar"
        ? "`<dialog>` + `showModal()` — مودال أصلي بـ focus trap."
        : "`<dialog>` + `showModal()` — native modal with focus trap."
      }
    >
      <div className="mb-2 flex min-h-8 items-center gap-2">
        <span className="shrink-0 rounded-md border border-orange-300/35 bg-orange-400/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-orange-100">
          {current.call}
        </span>
        <p className="text-sm leading-relaxed text-slate-300">
          {current.tip}
        </p>
      </div>

      {/* Fixed stage: page + reserved dialog layer */}
      <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
        {/* Page chrome */}
        <div className="p-3">
          <p className="mb-2 font-mono text-[9px] text-slate-500">
            &lt;main&gt; under the dialog
          </p>
          <div className="mb-2 h-2 w-2/3 rounded-full bg-white/10" />
          <div className="mb-3 h-2 w-1/2 rounded-full bg-white/10" />
          <motion.button
            type="button"
            tabIndex={-1}
            animate={{
              boxShadow: ring("invoker"),
              opacity: current.open ? 0.45 : 1,
            }}
            transition={{ duration: 0.3, ease: labEase }}
            className="rounded-lg bg-orange-300 px-3 py-2 text-[11px] font-bold text-slate-950"
          >
            Open confirm
            <span className="ms-1.5 font-mono text-[9px] font-semibold opacity-70">
              #open
            </span>
          </motion.button>
        </div>

        {/* Backdrop — always laid out */}
        <motion.div
          aria-hidden
          animate={{ opacity: current.open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: labEase }}
          className="pointer-events-none absolute inset-0 bg-slate-950/70"
        />

        {/* Dialog panel — fixed slot centered */}
        <motion.div
          role="presentation"
          animate={{
            opacity: current.open ? 1 : 0,
            scale: current.open ? 1 : 0.96,
            y: current.open ? 0 : 8,
            boxShadow:
              current.focus === "dialog"
                ? "0 0 0 2px rgba(251,146,60,0.45), 0 20px 40px rgba(0,0,0,0.45)"
                : "0 20px 40px rgba(0,0,0,0.4)",
          }}
          transition={{ duration: 0.35, ease: labEase }}
          className="absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-xl border border-orange-300/40 bg-slate-900 p-3"
        >
          <p className="mb-1 font-mono text-[9px] text-orange-200/70">
            &lt;dialog aria-labelledby=&quot;dlg-title&quot;&gt;
          </p>
          <motion.h2
            id="dlg-title"
            animate={{ boxShadow: ring("title") }}
            transition={{ duration: 0.3, ease: labEase }}
            className="rounded-md px-1 text-sm font-semibold text-orange-50"
          >
            Confirm
          </motion.h2>
          <p className="mt-1 px-1 text-[11px] text-slate-300">
            Reset progress?
          </p>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.button
              type="button"
              tabIndex={-1}
              animate={{ boxShadow: ring("cancel") }}
              transition={{ duration: 0.3, ease: labEase }}
              className="flex-1 rounded-lg border border-white/15 bg-slate-950/80 px-2 py-1.5 text-[11px] font-medium text-slate-200"
            >
              Cancel
              <span className="ms-1 font-mono text-[8px] text-slate-500">
                method=&quot;dialog&quot;
              </span>
            </motion.button>
            <button
              type="button"
              tabIndex={-1}
              className="flex-1 rounded-lg bg-orange-300 px-2 py-1.5 text-[11px] font-bold text-slate-950"
            >
              Reset
            </button>
          </form>
          <p className="mt-2 font-mono text-[9px] text-slate-500">
            ::backdrop · top layer · focus trap
          </p>
        </motion.div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[9px] text-slate-500">
        <span className={current.open ? "text-orange-200/90" : ""}>
          showModal()
        </span>
        <span aria-hidden>·</span>
        <span
          className={
            current.focus === "title" || current.focus === "dialog"
              ? "text-orange-200/90"
              : ""
          }
        >
          named + focused
        </span>
        <span aria-hidden>·</span>
        <span
          className={
            current.focus === "cancel" || current.call === "closed"
              ? "text-emerald-300/90"
              : ""
          }
        >
          Escape / close → invoker
        </span>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {DIALOG_STEPS.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === step ? "bg-orange-300" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </LabStage>
  );
}

const BASELINE_STEPS = [
  {
    id: "widely",
    chip: "widely",
    tip: {
      en: "Baseline Widely — safe to ship as the default path.",
      ar: "Baseline Widely — آمن كمسار افتراضي.",
    },
    feature: "<details> / <summary>",
    markup: "<details>\n  <summary>More</summary>\n  …\n</details>",
    engines: { chrome: "ok", firefox: "ok", safari: "ok", edge: "ok" },
  },
  {
    id: "newly",
    chip: "newly",
    tip: {
      en: "Baseline Newly — needs a support policy or fallback.",
      ar: "Baseline Newly — محتاج سياسة دعم أو fallback.",
    },
    feature: "<dialog> showModal()",
    markup: "dialog.showModal()",
    engines: { chrome: "ok", firefox: "ok", safari: "lag", edge: "ok" },
  },
  {
    id: "detect",
    chip: "detect",
    tip: {
      en: "Feature-detect the API — never sniff the user-agent.",
      ar: "اعمل feature-detect للـ API — متشمّش الـ user-agent.",
    },
    feature: "showModal in prototype",
    markup: "'showModal' in HTMLDialogElement.prototype",
    engines: { chrome: "ok", firefox: "ok", safari: "lag", edge: "ok" },
  },
  {
    id: "limited",
    chip: "limited",
    tip: {
      en: "Baseline Limited — never ship as the only path.",
      ar: "Baseline Limited — متخلّيهوش المسار الوحيد.",
    },
    feature: "bleeding-edge API",
    markup: "if (supported) enhance()\nelse fallback()",
    engines: { chrome: "ok", firefox: "lag", safari: "no", edge: "ok" },
  },
] as const;

function bandStyle(band: "widely" | "newly" | "detect" | "limited") {
  if (band === "widely")
    return "border-emerald-300/40 bg-emerald-400/15 text-emerald-100";
  if (band === "newly" || band === "detect")
    return "border-amber-300/40 bg-amber-400/15 text-amber-100";
  return "border-rose-300/40 bg-rose-400/15 text-rose-100";
}

function engineLabel(state: "ok" | "lag" | "no") {
  if (state === "ok") return { cls: "border-emerald-300/40 bg-emerald-400/15 text-emerald-100", text: "ok" };
  if (state === "lag") return { cls: "border-amber-300/40 bg-amber-400/15 text-amber-100", text: "lag" };
  return { cls: "border-rose-300/40 bg-rose-400/15 text-rose-100", text: "no" };
}

export function BaselineCompatVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = BASELINE_STEPS[step];

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % BASELINE_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const engines = [
    { id: "chrome" as const, label: "Chrome" },
    { id: "firefox" as const, label: "Firefox" },
    { id: "safari" as const, label: "Safari" },
    { id: "edge" as const, label: "Edge" },
  ];

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "التوافق و Baseline" : "Browser & Baseline"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-sm font-semibold text-cyan-50">
                {current.feature}
              </p>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${bandStyle(current.id)}`}
              >
                {current.chip}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {engines.map((engine) => {
                const state = current.engines[engine.id];
                const style = engineLabel(state);
                return (
                  <div
                    key={engine.id}
                    className={`rounded-lg border px-1.5 py-2 text-center ${style.cls}`}
                  >
                    <p className="text-[10px] font-semibold">{engine.label}</p>
                    <p className="mt-0.5 font-mono text-[9px] font-bold uppercase">
                      {style.text}
                    </p>
                  </div>
                );
              })}
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
          {BASELINE_STEPS.map((s, i) => (
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

/** <picture> & <source> — format waterfall + art direction + img fallback. */
const PICTURE_STEPS = [
  {
    id: "shell",
    tip: "<picture> lists candidates — browser picks the first match.",
    mode: "format" as const,
    active: -1,
    viewport: "desktop" as const,
    picked: "…",
  },
  {
    id: "avif",
    tip: "type=\"image/avif\" — modern format first when supported.",
    mode: "format" as const,
    active: 0,
    viewport: "desktop" as const,
    picked: "hero.avif",
  },
  {
    id: "webp",
    tip: "No AVIF? Fall through to WebP.",
    mode: "format" as const,
    active: 1,
    viewport: "desktop" as const,
    picked: "hero.webp",
  },
  {
    id: "img",
    tip: "Trailing <img> is required — JPEG fallback + alt + size.",
    mode: "format" as const,
    active: 2,
    viewport: "desktop" as const,
    picked: "hero.jpg",
  },
  {
    id: "mobile",
    tip: "media=\"(max-width: 640px)\" — art-directed mobile crop.",
    mode: "art" as const,
    active: 0,
    viewport: "mobile" as const,
    picked: "hero-mobile.avif",
  },
  {
    id: "desktop",
    tip: "Wider viewport — desktop source wins; CLS stays stable.",
    mode: "art" as const,
    active: 1,
    viewport: "desktop" as const,
    picked: "hero.avif",
  },
] as const;

const FORMAT_SOURCES = [
  { tag: 'type="image/avif"', file: "hero.avif" },
  { tag: 'type="image/webp"', file: "hero.webp" },
  { tag: "<img> fallback", file: "hero.jpg" },
] as const;

const ART_SOURCES = [
  { tag: "media max-width 640px", file: "hero-mobile.avif" },
  { tag: "desktop source", file: "hero.avif" },
  { tag: "<img> fallback", file: "hero.jpg" },
] as const;

export function PictureSourceVisualizer() {
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = PICTURE_STEPS[step];
  const rows = current.mode === "format" ? FORMAT_SOURCES : ART_SOURCES;
  const isMobile = current.viewport === "mobile";

  useEffect(() => {
    if (reduce) {
      setStep(PICTURE_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % PICTURE_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "Picture و Source" : "Picture & source"}
      caption={
        locale === "ar"
        ? "`<picture>` بيختار المصدر الأنسب حسب الشاشة."
        : "`<picture>` picks the best source for the screen."
      }
    >
      <div className="mb-2 flex min-h-8 items-center gap-2">
        <span className="shrink-0 rounded-md border border-cyan-300/35 bg-cyan-400/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-100">
          {current.mode === "format" ? "type=" : "media="}
        </span>
        <p className="text-sm leading-relaxed text-slate-300">
          {current.tip}
        </p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-[1fr_1.1fr]">
        {/* Viewport preview — fixed height */}
        <div className="rounded-xl border border-orange-300/25 bg-slate-950/50 p-2.5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-orange-200/60">
              viewport
            </span>
            <span className="font-mono text-[9px] text-slate-500">
              {isMobile ? "≤640px" : "desktop"}
            </span>
          </div>
          <motion.div
            animate={{
              width: isMobile ? "42%" : "100%",
            }}
            transition={{ duration: 0.4, ease: labEase }}
            className="mx-auto overflow-hidden rounded-lg border border-orange-300/30 bg-slate-900"
          >
            <motion.div
              key={current.picked}
              initial={reduce ? false : { opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: labEase }}
              className="flex h-28 items-center justify-center bg-gradient-to-br from-orange-400/30 via-amber-300/10 to-cyan-400/20"
            >
              <span className="px-2 text-center font-mono text-[10px] text-orange-50">
                {current.picked}
              </span>
            </motion.div>
            <p className="border-t border-white/5 px-2 py-1 font-mono text-[8px] text-slate-500">
              width/height on &lt;img&gt; · CLS safe
            </p>
          </motion.div>
        </div>

        {/* Source list — always full rows */}
        <div className="rounded-xl border border-cyan-400/25 bg-slate-950/50 p-2.5">
          <p className="mb-2 font-mono text-[9px] text-cyan-200/70">
            &lt;picture&gt;
          </p>
          <div className="space-y-1.5">
            {rows.map((row, i) => {
              const active = current.active === i;
              const passed = current.active > i;
              return (
                <motion.div
                  key={`${current.mode}-${row.file}`}
                  animate={{
                    borderColor: active
                      ? "rgba(34,211,238,0.55)"
                      : passed
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.12)",
                    backgroundColor: active
                      ? "rgba(34,211,238,0.12)"
                      : "rgba(15,23,42,0.5)",
                    opacity: passed && !active ? 0.45 : 1,
                  }}
                  transition={{ duration: 0.3, ease: labEase }}
                  className="rounded-lg border px-2 py-1.5"
                >
                  <p className="font-mono text-[10px] text-slate-200">
                    {i < rows.length - 1 ? (
                      <>&lt;source {row.tag} /&gt;</>
                    ) : (
                      <>&lt;img src=&quot;{row.file}&quot; alt… /&gt;</>
                    )}
                  </p>
                  <p className="font-mono text-[8px] text-slate-500">
                    {active ? (
                      <>
                        <span className={`inline-block ${RTL_FLIP}`}>→</span>{" "}
                        chosen
                      </>
                    ) : passed ? (
                      "skipped"
                    ) : (
                      "candidate"
                    )}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {PICTURE_STEPS.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === step ? "bg-cyan-300" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </LabStage>
  );
}

const MEDIA_STEPS = [
  {
    id: "video",
    chip: "video",
    tip: {
      en: "`<video controls>` — let the user start playback.",
      ar: "`<video controls>` — خلّي المستخدم يبدأ التشغيل.",
    },
    markup: `<video controls width="640" poster="poster.jpg">
  …
</video>`,
  },
  {
    id: "sources",
    chip: "source",
    tip: {
      en: "Multiple `<source>`s — browser picks the first it can play.",
      ar: "أكتر من `<source>` — المتصفح بيختار أول واحد يقدر يشغّله.",
    },
    markup: `<source src="intro.webm" type="video/webm" />
<source src="intro.mp4" type="video/mp4" />`,
  },
  {
    id: "captions",
    chip: "track",
    tip: {
      en: "`<track kind=\"captions\">` — captions are part of accessibility.",
      ar: "`<track kind=\"captions\">` — الترجمة جزء من الـ accessibility.",
    },
    markup: `<track
  kind="captions"
  srclang="en"
  src="captions.vtt"
  label="English"
  default
/>`,
  },
  {
    id: "iframe",
    chip: "iframe",
    tip: {
      en: "`iframe` needs `title`, prefer `loading=\"lazy\"` + `sandbox`.",
      ar: "`iframe` محتاج `title`، وفضّل `loading=\"lazy\"` + `sandbox`.",
    },
    markup: `<iframe
  title="Map"
  src="https://example.com/map"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
></iframe>`,
  },
  {
    id: "autoplay",
    chip: "no autoplay",
    tip: {
      en: "Trap: don’t autoplay sound — media should be opt-in.",
      ar: "فخ: متشغّلش صوت تلقائي — الـ media باختيار المستخدم.",
    },
    markup: `<!-- avoid -->
<video src="x.mp4" autoplay></video>
<!-- prefer -->
<video controls src="x.mp4"></video>`,
  },
] as const;

export function MediaStageVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % MEDIA_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const current = MEDIA_STEPS[step];

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "الوسائط والـ embeds" : "Media & embeds"}
      caption={locale === "ar" ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: labEase }}
            className="w-full max-w-md"
          >
            {current.id === "video" ||
            current.id === "sources" ||
            current.id === "captions" ? (
              <div className="overflow-hidden rounded-2xl border border-orange-300/35 bg-gradient-to-br from-orange-400/20 via-slate-900 to-slate-950">
                <div className="relative flex h-36 flex-col items-center justify-center gap-2 p-4">
                  <img
                    src="/students-coding.svg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                  />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <motion.span
                      animate={
                        playing && !reduce && current.id === "video"
                          ? {
                              scale: [1, 1.06, 1],
                              boxShadow: [
                                "0 0 0 rgba(251,146,60,0)",
                                "0 0 18px rgba(251,146,60,0.4)",
                                "0 0 0 rgba(251,146,60,0)",
                              ],
                            }
                          : { scale: 1 }
                      }
                      transition={{
                        duration: LAB_LOOP_S,
                        repeat: playing && !reduce ? Infinity : 0,
                      }}
                      className="rounded-full bg-orange-300 px-3 py-1 text-xs font-bold text-slate-950"
                    >
                      {current.id === "video"
                        ? "▶ controls"
                        : current.id === "sources"
                          ? "webm → mp4"
                          : "CC captions"}
                    </motion.span>
                    {current.id === "sources" ? (
                      <div className="flex gap-1.5">
                        {["webm", "mp4"].map((type, i) => (
                          <motion.span
                            key={type}
                            initial={reduce ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12 }}
                            className="rounded-md border border-cyan-300/35 bg-slate-950/70 px-2 py-0.5 font-mono text-[10px] text-cyan-100"
                          >
                            &lt;source type=&quot;video/{type}&quot;&gt;
                          </motion.span>
                        ))}
                      </div>
                    ) : null}
                    {current.id === "captions" ? (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-md border border-amber-300/40 bg-slate-950/80 px-3 py-1.5 text-center text-[11px] text-amber-50"
                      >
                        {locale === "ar"
                          ? "مرحبا بيك في الدرس…"
                          : "Welcome to the lesson…"}
                      </motion.div>
                    ) : null}
                  </div>
                </div>
                <div className="relative h-1.5 bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-300 to-cyan-300"
                    animate={
                      reduce
                        ? { width: "40%" }
                        : {
                            width:
                              playing && current.id === "video"
                                ? ["10%", "70%", "10%"]
                                : "45%",
                          }
                    }
                    transition={{
                      duration: LAB_LOOP_S,
                      repeat: playing && !reduce && current.id === "video" ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2 font-mono text-[10px] text-slate-400">
                  <span>▶</span>
                  <span>controls</span>
                  {current.id === "captions" ? (
                    <span className="ms-auto rounded bg-amber-400/20 px-1.5 py-0.5 text-amber-100">
                      track
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}

            {current.id === "iframe" ? (
              <div className="overflow-hidden rounded-2xl border border-cyan-300/35 bg-gradient-to-br from-cyan-400/15 via-slate-950 to-slate-950">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-1.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <span className="font-mono text-[9px] text-cyan-200/80">
                    title=&quot;Map&quot; · lazy · sandbox
                  </span>
                </div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-36 flex-col items-center justify-center gap-2 p-4"
                >
                  <div className="rounded-xl border border-dashed border-cyan-300/40 bg-cyan-400/10 px-6 py-8 text-center">
                    <p className="font-mono text-xs text-cyan-50">
                      &lt;iframe&gt;
                    </p>
                    <p className="mt-1 text-[10px] text-cyan-200/70">
                      {locale === "ar" ? "محتوى طرف تالت" : "third-party content"}
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : null}

            {current.id === "autoplay" ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-rose-300/40 bg-rose-400/10 p-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-rose-200/80">
                    {locale === "ar" ? "تجنّب" : "Avoid"}
                  </p>
                  <p className="font-mono text-[11px] text-rose-100">
                    autoplay
                  </p>
                  <p className="mt-1 text-[11px] text-rose-200/70">
                    {locale === "ar"
                      ? "صوت مفاجئ · بيستهلك داتا"
                      : "surprise sound · burns data"}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-300/40 bg-emerald-400/10 p-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-200/80">
                    {locale === "ar" ? "فضّل" : "Prefer"}
                  </p>
                  <p className="font-mono text-[11px] text-emerald-100">
                    controls
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-200/70">
                    {locale === "ar"
                      ? "المستخدم يختار التشغيل"
                      : "user starts playback"}
                  </p>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <pre
          dir="ltr"
          className="w-full max-w-md overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {MEDIA_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-orange-300 text-slate-950"
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

/** Pro Media & Loading Performance — sized / lazy / LCP / iframe budget. */
const MEDIA_PERF_STEPS = [
  {
    id: "cls",
    chip: "size",
    tip: {
      en: "Unsized media shoves the page — reserve `width`/`height` (or aspect-ratio).",
      ar: "ميديا من غير مقاس بتزق الصفحة — احجز `width`/`height` (أو aspect-ratio).",
    },
    good: false,
    metric: "CLS",
    score: { en: "0.28 shift", ar: "إزاحة 0.28" },
    preview: {
      en: "img drops in → text jumps",
      ar: "الصورة تنزل → النص يقفز",
    },
    markup: "<!-- bad -->\n<img src=\"hero.jpg\" />\n<!-- good -->\n<img src=\"hero.jpg\" width=\"1200\" height=\"630\" />",
  },
  {
    id: "lazy",
    chip: "lazy",
    tip: {
      en: '`loading="lazy"` for below-the-fold — don’t lazy the LCP hero.',
      ar: '`loading="lazy"` لتحت الشاشة — متlazy-ش hero الـ LCP.',
    },
    good: true,
    metric: "bytes",
    score: { en: "below-fold deferred", ar: "تحت الشاشة متأجل" },
    preview: {
      en: "gallery cards wait for scroll",
      ar: "كروت الجاليري مستنية السكرول",
    },
    markup: `<img src="card-1.jpg" width="400" height="300" loading="lazy" />
<img src="card-2.jpg" width="400" height="300" loading="lazy" />`,
  },
  {
    id: "lcp",
    chip: "LCP",
    tip: {
      en: "LCP hero — sized + `fetchpriority=\"high\"` (preload only when sure).",
      ar: "Hero الـ LCP — بمقاس + `fetchpriority=\"high\"` (preload لما تبقى متأكد).",
    },
    good: true,
    metric: "LCP",
    score: { en: "1.8s", ar: "1.8ث" },
    preview: {
      en: "hero paints early · high priority",
      ar: "الـ hero بيرسم بدري · أولوية عالية",
    },
    markup: `<link rel="preload" as="image" href="hero.avif" />
<img src="hero.avif" width="1200" height="630" fetchpriority="high" alt="…" />`,
  },
  {
    id: "iframe",
    chip: "iframe",
    tip: {
      en: "Iframes are expensive — lazy-load or click-to-load embeds.",
      ar: "الـ iframes غالية — lazy أو click-to-load للإيمبد.",
    },
    good: true,
    metric: "main",
    score: { en: "on demand", ar: "عند الطلب" },
    preview: {
      en: "poster → load map on click",
      ar: "بوستر → حمّل الخريطة عند الضغط",
    },
    markup: `<iframe
  title="Store map"
  src="https://maps.example/embed"
  loading="lazy"
  width="600"
  height="400"
></iframe>`,
  },
] as const;

export function MediaPerfVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = MEDIA_PERF_STEPS[step];
  const ar = locale === "ar";

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % MEDIA_PERF_STEPS.length),
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
      title={ar ? "أداء الميديا" : "Media performance"}
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
              className={`overflow-hidden rounded-xl border p-3 ${
                current.good
                  ? "border-emerald-300/35 bg-emerald-400/10"
                  : "border-rose-300/35 bg-rose-400/10"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                  {current.metric}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold ${
                    current.good
                      ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                      : "border-rose-300/40 bg-rose-400/15 text-rose-100"
                  }`}
                >
                  {ar ? current.score.ar : current.score.en}
                </span>
              </div>
              <motion.div
                animate={
                  current.id === "cls" && !current.good && !reduce
                    ? { y: [0, 10, 0] }
                    : { y: 0 }
                }
                transition={{
                  duration: LAB_LOOP_S,
                  repeat:
                    current.id === "cls" && !current.good && !reduce
                      ? Infinity
                      : 0,
                  ease: labEase,
                }}
                className="flex h-24 items-center justify-center rounded-lg border border-white/10 bg-slate-950/50"
              >
                <p className="px-3 text-center font-mono text-[11px] text-slate-100">
                  {ar ? current.preview.ar : current.preview.en}
                </p>
              </motion.div>
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
          {MEDIA_PERF_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.chip}
              aria-current={i === step ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === step
                  ? "bg-orange-300 text-slate-950"
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

/** Interactive CheatSheet — filter → cards → preview → Baseline → copy → paste. */
const CHEAT_FILTERS = [
  { id: "all", label: "All" },
  { id: "structure", label: "Structure" },
  { id: "forms", label: "Forms" },
  { id: "media", label: "Media" },
  { id: "interactive", label: "Interactive" },
] as const;

const CHEAT_CARDS = [
  {
    id: "shell",
    title: "Document shell",
    category: "structure",
    snippet: "<!DOCTYPE html>…",
    preview: "html · head · body",
    baseline: "widely" as const,
  },
  {
    id: "label",
    title: "Label + input",
    category: "forms",
    snippet: "<label>Email…",
    preview: "label wraps input",
    baseline: "widely" as const,
  },
  {
    id: "picture",
    title: "Responsive picture",
    category: "media",
    snippet: "<picture><source…",
    preview: "AVIF → WebP → img",
    baseline: "widely" as const,
  },
  {
    id: "dialog",
    title: "Native dialog",
    category: "interactive",
    snippet: "dialog.showModal()",
    preview: "backdrop + focus trap",
    baseline: "newly" as const,
  },
] as const;

const CHEAT_STEPS = [
  {
    id: "overview",
    tip: "CheatSheet cards are filterable — start from All.",
    filter: "all" as const,
    focus: null as string | null,
    showPreview: false,
    copied: false,
    pasted: false,
  },
  {
    id: "filter-structure",
    tip: "Filter by category — Structure patterns only.",
    filter: "structure" as const,
    focus: null,
    showPreview: false,
    copied: false,
    pasted: false,
  },
  {
    id: "focus-shell",
    tip: "Open a card — live preview + snippet side by side.",
    filter: "structure" as const,
    focus: "shell",
    showPreview: true,
    copied: false,
    pasted: false,
  },
  {
    id: "baseline",
    tip: "Check Baseline before you paste Newly features.",
    filter: "interactive" as const,
    focus: "dialog",
    showPreview: true,
    copied: false,
    pasted: false,
  },
  {
    id: "copy",
    tip: "Copy Code (or Boilerplate) in one tap.",
    filter: "interactive" as const,
    focus: "dialog",
    showPreview: true,
    copied: true,
    pasted: false,
  },
  {
    id: "paste",
    tip: "Paste into the playground — tweak live, then ship.",
    filter: "interactive" as const,
    focus: "dialog",
    showPreview: true,
    copied: true,
    pasted: true,
  },
] as const;

function cheatBaselineStyle(band: "widely" | "newly") {
  return band === "widely"
    ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
    : "border-amber-300/40 bg-amber-400/15 text-amber-100";
}

export function CheatSheetLabVisualizer() {
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const { playClick } = useSound();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = CHEAT_STEPS[step];

  useEffect(() => {
    if (reduce) {
      setStep(CHEAT_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % CHEAT_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const visibleCards = CHEAT_CARDS.filter(
    (card) => current.filter === "all" || card.category === current.filter,
  );
  const focused =
    CHEAT_CARDS.find((card) => card.id === current.focus) ?? visibleCards[0];

  function goTo(index: number) {
    playClick();
    setStep(index);
  }

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "مرجع HTML" : "HTML cheatsheet"}
      caption={current.tip}
    >

      {/* Filter chips */}
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {CHEAT_FILTERS.map((chip) => {
          const active = current.filter === chip.id;
          return (
            <motion.span
              key={chip.id}
              animate={{
                scale: active && !reduce ? [1, 1.04, 1] : 1,
                borderColor: active
                  ? "rgba(103,232,249,0.55)"
                  : "rgba(255,255,255,0.1)",
                backgroundColor: active
                  ? "rgba(34,211,238,0.18)"
                  : "rgba(15,23,42,0.55)",
                color: active ? "rgb(224 251 252)" : "rgb(148 163 184)",
              }}
              transition={{ duration: 0.3, ease: labEase }}
              className="rounded-full border px-2.5 py-1 text-[10px] font-semibold"
            >
              {chip.label}
            </motion.span>
          );
        })}
      </div>

      <div className="grid gap-2 sm:grid-cols-[1.15fr_0.85fr]">
        {/* Card grid */}
        <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-white/10 bg-slate-950/50 p-2">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card, i) => {
              const isFocus = current.focus === card.id;
              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
                  animate={{
                    opacity: current.focus && !isFocus ? 0.45 : 1,
                    y: 0,
                    scale: isFocus && !reduce ? 1.02 : 1,
                    borderColor: isFocus
                      ? "rgba(103,232,249,0.55)"
                      : "rgba(255,255,255,0.1)",
                    boxShadow: isFocus
                      ? "0 0 18px rgba(34,211,238,0.2)"
                      : "0 0 0 transparent",
                  }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                  transition={{
                    ...labSpring,
                    delay: reduce ? 0 : i * 0.04,
                  }}
                  className="rounded-lg border bg-gradient-to-br from-slate-900/90 to-cyan-950/20 p-2"
                >
                  <div className="mb-1 flex items-start justify-between gap-1">
                    <p className="text-[10px] font-semibold leading-tight text-cyan-50">
                      {card.title}
                    </p>
                    <span
                      className={`shrink-0 rounded border px-1 py-px font-mono text-[7px] font-bold uppercase ${cheatBaselineStyle(card.baseline)}`}
                    >
                      {card.baseline}
                    </span>
                  </div>
                  <p className="truncate font-mono text-[9px] text-yellow-100/75">
                    {card.snippet}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Focus panel: preview → copy → playground */}
        <div className="relative overflow-hidden rounded-xl border border-cyan-400/25 bg-slate-950/60 p-2.5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
              {current.showPreview ? "live preview" : "pick a card"}
            </p>
            <AnimatePresence>
              {current.copied ? (
                <motion.span
                  initial={reduce ? false : { opacity: 0, y: -6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-100"
                >
                  <Check size={10} />
                  Copied
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={focused?.id ?? "empty"}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: labEase }}
            >
              <div
                className={`mb-2 rounded-lg border px-2.5 py-3 text-center ${
                  current.showPreview
                    ? "border-white/15 bg-white text-slate-800"
                    : "border-dashed border-white/15 bg-slate-900/40 text-slate-500"
                }`}
              >
                <p className="text-[10px] font-semibold">
                  {current.showPreview
                    ? focused?.preview
                    : "Preview appears here"}
                </p>
              </div>

              <p className="mb-2 font-mono text-[10px] text-cyan-100">
                {focused?.title ?? "—"}
              </p>

              <div className="mb-2 flex gap-1.5">
                <motion.span
                  animate={{
                    borderColor: current.copied
                      ? "rgba(103,232,249,0.55)"
                      : "rgba(255,255,255,0.12)",
                    backgroundColor: current.copied
                      ? "rgba(34,211,238,0.2)"
                      : "rgba(255,255,255,0.05)",
                    scale: current.copied && !reduce ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.35, ease: labEase }}
                  className="rounded-full border px-2.5 py-1 text-[9px] font-semibold text-slate-200"
                >
                  Copy Code
                </motion.span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-semibold text-slate-400">
                  Boilerplate
                </span>
              </div>

              <div className="rounded-lg border border-dashed border-amber-300/30 bg-slate-950/50 p-2">
                <p className="mb-1 font-mono text-[8px] uppercase tracking-wider text-amber-200/60">
                  playground
                </p>
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={current.pasted ? "pasted" : "empty"}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-10 overflow-x-auto font-mono text-[9px] leading-relaxed text-yellow-100/85"
                  >
                    {current.pasted
                      ? focused?.snippet ?? "// paste here"
                      : "// paste snippet…"}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pipeline footer */}
          <div className="mt-2.5 flex items-center justify-center gap-1 font-mono text-[8px] text-slate-500">
            <span
              className={
                current.filter !== "all" ? "text-cyan-300" : undefined
              }
            >
              filter
            </span>
            <ChevronRight size={10} className={RTL_FLIP} />
            <span className={current.showPreview ? "text-cyan-300" : undefined}>
              preview
            </span>
            <ChevronRight size={10} className={RTL_FLIP} />
            <span className={current.copied ? "text-cyan-300" : undefined}>
              copy
            </span>
            <ChevronRight size={10} className={RTL_FLIP} />
            <span className={current.pasted ? "text-emerald-300" : undefined}>
              paste
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {CHEAT_STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Step ${i + 1}`}
            aria-current={i === step ? "step" : undefined}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === step
                ? "w-4 bg-cyan-300"
                : "w-1.5 bg-slate-600 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </LabStage>
  );
}

const SECURITY_STEPS = [
  {
    id: "opener",
    chip: "opener",
    tip: {
      en: "`target=_blank` without `rel` — the new page can reach `window.opener`.",
      ar: "`target=_blank` من غير `rel` — الصفحة الجديدة توصل لـ `window.opener`.",
    },
    remote: {
      en: "external origin",
      ar: "أصل خارجي",
    },
    status: {
      en: "opener access possible",
      ar: "وصول للـ opener ممكن",
    },
    boundary: { en: "trust boundary exposed", ar: "حدود الثقة مكشوفة" },
    markup: '<a href="https://partner.example" target="_blank">Docs</a>',
    state: "unsafe" as const,
    lane: "link" as const,
  },
  {
    id: "rel",
    chip: "rel=",
    tip: {
      en: '`rel="noopener noreferrer"` — no opener control, no referrer leak.',
      ar: '`rel="noopener noreferrer"` — مفيش opener، ومفيش تسريب referrer.',
    },
    remote: { en: "external origin", ar: "أصل خارجي" },
    status: {
      en: "minimum access granted",
      ar: "أقل صلاحية مسموحة",
    },
    boundary: { en: "trust boundary protected", ar: "حدود الثقة محمية" },
    markup:
      '<a href="https://partner.example" target="_blank" rel="noopener noreferrer">Docs</a>',
    state: "safe" as const,
    lane: "link" as const,
  },
  {
    id: "sandbox",
    chip: "sandbox",
    tip: {
      en: "Sandbox third-party embeds — grant only the capabilities you need.",
      ar: "اعمل sandbox للإيمبد — امنح الصلاحيات اللي محتاجها بس.",
    },
    remote: { en: "embed origin", ar: "أصل الإيمبد" },
    status: {
      en: "minimum access granted",
      ar: "أقل صلاحية مسموحة",
    },
    boundary: { en: "trust boundary protected", ar: "حدود الثقة محمية" },
    markup:
      '<iframe src="https://widget.example" sandbox="allow-scripts allow-forms" title="Widget"></iframe>',
    state: "safe" as const,
    lane: "embed" as const,
  },
  {
    id: "secrets",
    chip: "secrets",
    tip: {
      en: "Never put tokens in HTML — name sensitive fields for the browser vault.",
      ar: "متحطش tokens في HTML — سمّي الحقول الحساسة لخزنة المتصفح.",
    },
    remote: { en: "browser-held data", ar: "بيانات عند المتصفح" },
    status: {
      en: "vault understands intent",
      ar: "الخزنة فاهمة القصد",
    },
    boundary: { en: "trust boundary protected", ar: "حدود الثقة محمية" },
    markup: `<input name="otp" autocomplete="one-time-code" />
<!-- never: <script>const KEY = "sk_live_…"</script> -->`,
    state: "safe" as const,
    lane: "form" as const,
  },
] as const;

export function HtmlSecurityLabVisualizer() {
  const reduce = useReducedMotion();
  const { playClick } = useSound();
  const { locale, dir } = useLanguage();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SECURITY_STEPS[step];
  const safe = current.state === "safe";
  const flow = dir === "rtl" ? -1 : 1;
  const ar = locale === "ar";

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((index) => (index + 1) % SECURITY_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const localLabel =
    current.lane === "link"
      ? "target=_blank"
      : current.lane === "embed"
        ? "<iframe>"
        : "<input>";

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "أمن HTML" : "HTML security"}
      caption={ar ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
        <div className="flex w-full max-w-md items-center gap-2">
          <motion.div
            animate={{
              backgroundColor: safe
                ? "rgba(16,185,129,0.18)"
                : "rgba(251,113,133,0.18)",
              borderColor: safe
                ? "rgba(110,231,183,0.55)"
                : "rgba(253,164,175,0.55)",
            }}
            className="rounded-lg border p-1.5"
          >
            <Shield
              size={16}
              className={safe ? "text-emerald-200" : "text-rose-200"}
            />
          </motion.div>
          <p
            className={`text-[11px] font-semibold ${
              safe ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {ar ? current.boundary.ar : current.boundary.en}
          </p>
        </div>

        <div className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-slate-950/65">
          <div className="grid gap-2 p-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <motion.div
              animate={{
                borderColor: safe
                  ? "rgba(110,231,183,0.32)"
                  : "rgba(253,164,175,0.45)",
              }}
              className="rounded-lg border bg-slate-900/70 p-2.5"
            >
              <p className="mb-1 font-mono text-[8px] uppercase tracking-wider text-slate-500">
                {ar ? "صفحتك" : "your page"}
              </p>
              <p className="font-mono text-[10px] text-yellow-100/90">
                {localLabel}
              </p>
            </motion.div>
            <motion.div
              aria-hidden
              animate={{
                x: safe || reduce ? 0 : [0, 5 * flow, 0],
                color: safe ? "rgb(110 231 183)" : "rgb(251 113 133)",
              }}
              transition={{
                duration: LAB_LOOP_S,
                repeat: safe || reduce ? 0 : Infinity,
              }}
            >
              <ChevronRight size={18} className={RTL_FLIP} />
            </motion.div>
            <motion.div
              animate={{
                borderColor: safe
                  ? "rgba(110,231,183,0.5)"
                  : "rgba(253,164,175,0.45)",
                backgroundColor: safe
                  ? "rgba(6,78,59,0.28)"
                  : "rgba(76,5,25,0.28)",
              }}
              className="rounded-lg border p-2.5"
            >
              <p className="mb-1 font-mono text-[8px] uppercase tracking-wider text-slate-400">
                {ar ? current.remote.ar : current.remote.en}
              </p>
              <p
                className={`text-[10px] font-semibold ${
                  safe ? "text-emerald-100" : "text-rose-100"
                }`}
              >
                {ar ? current.status.ar : current.status.en}
              </p>
            </motion.div>
          </div>
        </div>

        <pre
          dir="ltr"
          className="w-full max-w-md overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {SECURITY_STEPS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.chip}
              aria-current={index === step ? "step" : undefined}
              onClick={() => goTo(index)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                index === step
                  ? "bg-emerald-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {item.chip}
            </button>
          ))}
        </div>
      </div>
    </LabStage>
  );
}

const SPECULATION_STEPS = [
  {
    id: "cold",
    chip: "cold",
    tip: {
      en: "Cold click — next LCP waits for a full navigation.",
      ar: "ضغط بارد — الـ LCP الجاي مستني navigation كامل.",
    },
    next: { en: "Not requested", ar: "متطلبش" },
    markup: "/* no speculationrules yet */",
  },
  {
    id: "prefetch",
    chip: "prefetch",
    tip: {
      en: "Prefetch likely same-origin HTML — warm the network response.",
      ar: "Prefetch لـ HTML متوقع من نفس الـ origin — سخّن الرد.",
    },
    next: { en: "Response prefetched", ar: "الرد اتعمل له prefetch" },
    markup: `{
  "prefetch": [{
    "source": "list",
    "urls": ["/product/42"],
    "eagerness": "moderate"
  }]
}`,
  },
  {
    id: "prerender",
    chip: "prerender",
    tip: {
      en: "Prerender read-only destinations — never mutate routes.",
      ar: "Prerender للصفحات اللي للقراءة بس — متلمسش routes بتعدّل.",
    },
    next: {
      en: "Product detail rendered",
      ar: "تفاصيل المنتج مترسمة",
    },
    markup: `{
  "prerender": [{
    "source": "list",
    "urls": ["/product/42"],
    "eagerness": "moderate"
  }]
}`,
  },
  {
    id: "activate",
    chip: "activate",
    tip: {
      en: "Activate — navigation feels instant; next LCP is already warm.",
      ar: "Activate — التنقّل بيحس فوري؛ الـ LCP الجاي سخن.",
    },
    next: { en: "Activated instantly", ar: "اتفعّل فورًا" },
    markup: `<script type="speculationrules">
{ "prerender": [{ "urls": ["/product/42"] }] }
</script>
<!-- exclude: /logout, checkout, token URLs -->`,
  },
] as const;

export function HtmlSpeculationLabVisualizer() {
  const reduce = useReducedMotion();
  const { playClick } = useSound();
  const { locale, dir } = useLanguage();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SPECULATION_STEPS[step];
  const flow = dir === "rtl" ? -1 : 1;
  const ar = locale === "ar";

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setStep((index) => (index + 1) % SPECULATION_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  function goTo(index: number) {
    if (index === step) return;
    playClick();
    setStep(index);
  }

  const warmed = step >= 1;
  const rendered = step >= 2;
  const instant = step === 3;

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "قواعد الـ Speculation" : "Speculation rules"}
      caption={ar ? current.tip.ar : current.tip.en}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
        <div className="flex w-full max-w-md items-center justify-between gap-2">
          <span className="text-[10px] font-semibold text-slate-300">
            {ar ? "الصفحة الحالية → الجاية" : "current → next"}
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[9px] ${
              instant
                ? "border-emerald-300/45 bg-emerald-400/15 text-emerald-100"
                : "border-cyan-300/35 bg-cyan-400/10 text-cyan-100"
            }`}
          >
            next LCP {instant ? (ar ? "سخن" : "warm") : ar ? "معلّق" : "pending"}
          </span>
        </div>

        <div className="w-full max-w-md rounded-xl border border-cyan-400/20 bg-slate-950/60 p-3">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="rounded-lg border border-white/10 bg-slate-900/70 p-2">
              <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">
                {ar ? "الحالية" : "current"}
              </p>
              <p className="mt-1 text-[10px] font-semibold text-slate-200">
                {ar ? "المجموعة" : "Collection"}
              </p>
            </div>
            <motion.div
              aria-hidden
              animate={{
                x: warmed && !reduce ? [0, 5 * flow, 0] : 0,
                color: warmed ? "rgb(103 232 249)" : "rgb(100 116 139)",
              }}
              transition={{
                duration: LAB_LOOP_S,
                repeat: warmed && !reduce ? Infinity : 0,
              }}
            >
              <ChevronRight size={18} className={RTL_FLIP} />
            </motion.div>
            <motion.div
              animate={{
                borderColor: rendered
                  ? "rgba(110,231,183,0.5)"
                  : warmed
                    ? "rgba(103,232,249,0.5)"
                    : "rgba(255,255,255,0.1)",
                backgroundColor: rendered
                  ? "rgba(6,78,59,0.3)"
                  : warmed
                    ? "rgba(8,47,73,0.32)"
                    : "rgba(15,23,42,0.55)",
                boxShadow: rendered
                  ? "0 0 18px rgba(52,211,153,0.18)"
                  : "0 0 0 transparent",
              }}
              className="rounded-lg border p-2"
            >
              <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">
                {ar ? "الجاية" : "next"}
              </p>
              <p className="mt-1 text-[10px] font-semibold text-slate-200">
                {ar ? current.next.ar : current.next.en}
              </p>
            </motion.div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {(
              [
                { label: ar ? "شبكة" : "network", active: warmed },
                { label: ar ? "رسم" : "render", active: rendered },
                { label: ar ? "تفعيل" : "activate", active: instant },
              ] as const
            ).map(({ label, active }) => (
              <motion.div
                key={label}
                animate={{
                  opacity: active ? 1 : 0.35,
                  borderColor: active
                    ? "rgba(103,232,249,0.45)"
                    : "rgba(255,255,255,0.1)",
                }}
                className="rounded-md border bg-white/3 px-1.5 py-1.5 text-center font-mono text-[8px] text-cyan-100"
              >
                {active ? <Check className="mx-auto mb-0.5" size={10} /> : null}
                {label}
              </motion.div>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-rose-300/25 bg-rose-400/6 px-2.5 py-2">
            <p className="font-mono text-[9px] font-semibold text-rose-200">
              /logout · excluded
            </p>
            <p className="mt-0.5 text-[9px] text-rose-100/70">
              {ar
                ? "متعملش prerender لـ routes بتعدّل حالة أو تستهلك tokens."
                : "Never prerender routes that mutate state or consume tokens."}
            </p>
          </div>
        </div>

        <pre
          dir="ltr"
          className="w-full max-w-md overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[10px] leading-4 text-cyan-100"
        >
          {current.markup}
        </pre>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {SPECULATION_STEPS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.chip}
              aria-current={index === step ? "step" : undefined}
              onClick={() => goTo(index)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                index === step
                  ? "bg-cyan-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {item.chip}
            </button>
          ))}
        </div>
      </div>
    </LabStage>
  );
}

/** Global & Bidirectional HTML — RTL root → isolate token → LTR inputs. */
const RTL_STEPS = [
  {
    id: "ltr-root",
    chip: "ltr",
    tip: {
      en: "Default LTR document — fine for English-only chrome.",
      ar: "مستند LTR افتراضي — مناسب لـ chrome إنجليزي بس.",
    },
    rootDir: "ltr" as const,
    isolate: false,
    ltrInputs: false,
    markup: '<html lang="en" dir="ltr">',
  },
  {
    id: "rtl-root",
    chip: "rtl",
    tip: {
      en: "Arabic-first product: `lang=ar` + `dir=rtl` on `<html>`.",
      ar: "منتج عربي-أولًا: `lang=ar` + `dir=rtl` على `<html>`.",
    },
    rootDir: "rtl" as const,
    isolate: false,
    ltrInputs: false,
    markup: '<html lang="ar" dir="rtl">',
  },
  {
    id: "isolate",
    chip: "bdi",
    tip: {
      en: "Isolate English tokens with `<bdi>` so Arabic letters stay ordered.",
      ar: "اعزل tokens إنجليزية بـ `<bdi>` عشان الحروف العربية تفضل مرتبة.",
    },
    rootDir: "rtl" as const,
    isolate: true,
    ltrInputs: false,
    markup: 'ابدأ بـ <bdi>&lt;!DOCTYPE html&gt;</bdi> قبل البناء.',
  },
  {
    id: "inputs",
    chip: "inputs",
    tip: {
      en: "Email / OTP fields keep `dir=ltr` inside an RTL form.",
      ar: "حقول الإيميل / OTP تفضل `dir=ltr` جوّه فورم RTL.",
    },
    rootDir: "rtl" as const,
    isolate: true,
    ltrInputs: true,
    markup: `<label>البريد
  <input type="email" dir="ltr" autocomplete="email" />
</label>`,
  },
  {
    id: "portal",
    chip: "dialog",
    tip: {
      en: "Teleported dialog carries `dir`/`lang` — don’t orphan direction.",
      ar: "الـ dialog المتنقل بيشيل `dir`/`lang` — متسيبش الاتجاه يتيم.",
    },
    rootDir: "rtl" as const,
    isolate: true,
    ltrInputs: true,
    markup: '<dialog dir="rtl" lang="ar">…</dialog>',
  },
] as const;

export function HtmlGlobalRtlLabVisualizer() {
  const reduce = useReducedMotion();
  const { playClick } = useSound();
  const { locale } = useLanguage();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = RTL_STEPS[step];
  const rtl = current.rootDir === "rtl";
  const arUi = locale === "ar";

  useEffect(() => {
    if (reduce) {
      setStep(RTL_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % RTL_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    playClick();
    setStep(index);
  }

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={locale === "ar" ? "العالمية و RTL" : "Global & RTL"}
      caption={current.tip[locale]}
    >

      <div className="overflow-hidden rounded-xl border border-cyan-400/25 bg-slate-950/60">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-slate-900/80 px-2.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
          </div>
          <motion.span
            key={current.rootDir}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-2 py-0.5 font-mono text-[9px] text-cyan-100"
          >
            {rtl ? 'lang="ar" dir="rtl"' : 'lang="en" dir="ltr"'}
          </motion.span>
        </div>

        <div className="space-y-2.5 p-3" style={{ direction: current.rootDir }}>
          <p className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-[11px] leading-relaxed text-slate-200">
            {rtl ? "ابدأ بـ " : arUi ? "ابدأ بـ " : "Start with "}
            {current.isolate ? (
              <span
                className="mx-1 inline-block rounded bg-amber-400/20 px-1.5 py-0.5 font-mono text-[10px] text-amber-100"
                style={{ direction: "ltr", unicodeBidi: "isolate" }}
              >
                &lt;!DOCTYPE html&gt;
              </span>
            ) : (
              <span className="font-mono text-[10px] text-amber-100/80">
                &lt;!DOCTYPE html&gt;
              </span>
            )}
            {rtl || arUi ? " قبل بناء الصفحة." : " before building the page."}
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            <motion.label
              animate={{
                borderColor: current.ltrInputs
                  ? "rgba(52,211,153,0.45)"
                  : "rgba(255,255,255,0.1)",
              }}
              className="rounded-lg border bg-slate-950/50 px-2.5 py-2"
            >
              <span className="text-[10px] text-slate-400">
                {arUi ? "البريد" : "Email"}
              </span>
              <div
                className="mt-1 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 font-mono text-[10px] text-slate-300"
                style={{
                  direction: current.ltrInputs ? "ltr" : current.rootDir,
                }}
              >
                you@frontendcraft.dev
              </div>
              {current.ltrInputs ? (
                <p className="mt-1 font-mono text-[8px] text-emerald-300/90">
                  dir=&quot;ltr&quot;
                </p>
              ) : null}
            </motion.label>

            <motion.label
              animate={{
                borderColor: current.ltrInputs
                  ? "rgba(52,211,153,0.45)"
                  : "rgba(255,255,255,0.1)",
              }}
              className="rounded-lg border bg-slate-950/50 px-2.5 py-2"
            >
              <span className="text-[10px] text-slate-400">
                {arUi ? "رمز التحقق" : "OTP"}
              </span>
              <div
                className="mt-1 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 font-mono text-[10px] tracking-[0.2em] text-slate-300"
                style={{
                  direction: current.ltrInputs ? "ltr" : current.rootDir,
                }}
              >
                8 4 2 1 9 0
              </div>
              {current.ltrInputs ? (
                <p className="mt-1 font-mono text-[8px] text-emerald-300/90">
                  dir=&quot;ltr&quot; · autocomplete=&quot;one-time-code&quot;
                </p>
              ) : null}
            </motion.label>
          </div>

          <AnimatePresence>
            {current.id === "portal" ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6 }}
                className="rounded-xl border border-orange-300/40 bg-slate-900 p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                style={{ direction: "rtl" }}
              >
                <p className="font-mono text-[8px] text-orange-200/80">
                  &lt;dialog dir=&quot;rtl&quot; lang=&quot;ar&quot;&gt;
                </p>
                <p className="mt-1 text-[11px] font-semibold text-orange-50">
                  {arUi ? "تأكيد الاشتراك" : "Confirm subscription"}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-300">
                  {arUi
                    ? "الاتجاه اتورّث مع الـ portal — مش اتكسر."
                    : "Direction rides with the portal — not orphaned."}
                </p>
              </motion.div>
            ) : null}
              </AnimatePresence>
        </div>
      </div>

      <pre
        dir="ltr"
        className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-start font-mono text-[11px] leading-5 text-cyan-100"
      >
        {current.markup}
      </pre>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        {RTL_STEPS.map((s, i) => (
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
    </LabStage>
  );
}

type PitfallBeat = {
  id: string;
  title: { en: string; ar: string };
  trap: { en: string; ar: string };
  fix: { en: string; ar: string };
  wrongTag: string;
  rightTag: string;
  wrongPreview: ReactNode;
  rightPreview: ReactNode;
};

const HTML_PITFALL_BEATS: PitfallBeat[] = [
  {
    id: "document",
    title: { en: "Basic document", ar: "مستند أساسي" },
    trap: {
      en: "Missing `DOCTYPE` / `lang` / `charset` drops you into quirks and weak a11y.",
      ar: "من غير `DOCTYPE` / `lang` / `charset` تدخل quirks و a11y ضعيفة.",
    },
    fix: {
      en: "Always start from a complete modern document shell.",
      ar: "دايمًا ابدأ من هيكل مستند حديث مكتمل.",
    },
    wrongTag: "<html><body>…",
    rightTag: "<!DOCTYPE html>",
    wrongPreview: (
      <pre className="w-full rounded-lg border border-rose-300/35 bg-rose-400/10 p-2.5 font-mono text-[10px] leading-4 text-rose-100">
        {`<html>
  <body>...</body>
</html>`}
      </pre>
    ),
    rightPreview: (
      <pre className="w-full rounded-lg border border-emerald-300/35 bg-emerald-400/10 p-2.5 font-mono text-[10px] leading-4 text-emerald-50">
        {`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>...</body>
</html>`}
      </pre>
    ),
  },
  {
    id: "semantics",
    title: { en: "Fake landmarks", ar: "Landmarks مزيفة" },
    trap: {
      en: "`div class=\"header\"` looks like a header — AT hears “group”, not banner.",
      ar: "`div class=\"header\"` شكله هيدر — قارئ الشاشة بيسمع group مش banner.",
    },
    fix: {
      en: "Use `<header>` / `<main>` — the role ships with the tag.",
      ar: "استخدم `<header>` / `<main>` — الدور جاي مع التاج.",
    },
    wrongTag: '<div class="header">',
    rightTag: "<header>",
    wrongPreview: (
      <div className="space-y-1.5">
        <div className="rounded-lg border border-dashed border-rose-300/40 bg-rose-400/10 px-2.5 py-2 font-mono text-[10px] text-rose-100">
          &lt;div class=&quot;header&quot;&gt; Site
        </div>
        <div className="rounded-lg border border-dashed border-rose-300/30 bg-rose-400/5 px-2.5 py-2 font-mono text-[10px] text-rose-100/80">
          &lt;div class=&quot;main&quot;&gt; Content
        </div>
      </div>
    ),
    rightPreview: (
      <div className="space-y-1.5">
        <div className="rounded-lg border border-emerald-300/45 bg-emerald-400/15 px-2.5 py-2 font-mono text-[10px] text-emerald-50">
          &lt;header&gt; Site · role=banner
        </div>
        <div className="rounded-lg border border-emerald-300/35 bg-emerald-400/10 px-2.5 py-2 font-mono text-[10px] text-emerald-50/90">
          &lt;main&gt; Content · role=main
        </div>
      </div>
    ),
  },
  {
    id: "lists",
    title: { en: "Fake bullets", ar: "نقط مزيفة" },
    trap: {
      en: "A `div` with “• Item” is just text — no list semantics for AT.",
      ar: "`div` بنقطة “• Item” نص عادي — مفيش list semantics لقارئ الشاشة.",
    },
    fix: {
      en: "Real `<ul>` / `<ol>` expose list roles and item count.",
      ar: "`<ul>` / `<ol>` الحقيقيين بيدّوا أدوار القائمة وعدد العناصر.",
    },
    wrongTag: "<div>• Item</div>",
    rightTag: "<ul><li>…</li></ul>",
    wrongPreview: (
      <div className="space-y-1 font-mono text-[11px] text-rose-100">
        <p>• Item one</p>
        <p>• Item two</p>
        <p className="text-[9px] text-rose-200/60">not a list to AT</p>
      </div>
    ),
    rightPreview: (
      <ul className="list-disc space-y-1 ps-4 font-mono text-[11px] text-emerald-50">
        <li>Item one</li>
        <li>Item two</li>
        <li className="list-none text-[9px] text-emerald-200/70">
          list · 2 items
        </li>
      </ul>
    ),
  },
  {
    id: "forms",
    title: { en: "Placeholder ≠ label", ar: "Placeholder ≠ label" },
    trap: {
      en: "Placeholder vanishes while typing — the field loses its name.",
      ar: "الـ placeholder بيختفي وأنت بتكتب — الحقل بيفقد اسمه.",
    },
    fix: {
      en: "Keep a visible `<label>` tied with `for` / `id`.",
      ar: "خلّي `<label>` ظاهر مربوط بـ `for` / `id`.",
    },
    wrongTag: 'placeholder="Email"',
    rightTag: "<label>Email …</label>",
    wrongPreview: (
      <div className="rounded-lg border border-rose-300/40 bg-slate-950/60 p-2.5">
        <input
          readOnly
          placeholder="Email"
          className="w-full rounded-md border border-rose-300/30 bg-slate-900 px-2 py-1.5 text-[11px] text-rose-100/50 outline-none"
        />
        <p className="mt-1.5 text-[9px] text-rose-200/60">name disappears on focus</p>
      </div>
    ),
    rightPreview: (
      <label className="block rounded-lg border border-emerald-300/40 bg-slate-950/60 p-2.5">
        <span className="mb-1 block text-[10px] font-semibold text-emerald-100">
          Email
        </span>
        <input
          readOnly
          value="sam@lab.dev"
          className="w-full rounded-md border border-emerald-300/30 bg-slate-900 px-2 py-1.5 text-[11px] text-emerald-50 outline-none"
        />
      </label>
    ),
  },
  {
    id: "buttons",
    title: { en: "Div / link as button", ar: "Div / لينك كأنه زر" },
    trap: {
      en: "`div role=button` or `<a href=\"#\" onclick>` skips native keyboard/Enter.",
      ar: "`div role=button` أو `<a href=\"#\" onclick>` بيتخطى الكيبورد الأصلي.",
    },
    fix: {
      en: "Actions → `<button>`. Navigation → `<a href>` with a real URL.",
      ar: "الأفعال → `<button>`. التنقّل → `<a href>` بـ URL حقيقي.",
    },
    wrongTag: '<div role="button">',
    rightTag: '<button type="button">',
    wrongPreview: (
      <div className="space-y-2">
        <div className="rounded-full border border-rose-300/45 bg-rose-400/15 px-4 py-2 text-center text-[11px] font-semibold text-rose-100">
          Save
        </div>
        <p className="text-center text-[9px] text-rose-200/65">
          no Enter · no Space · fragile
        </p>
      </div>
    ),
    rightPreview: (
      <div className="space-y-2">
        <button
          type="button"
          className="w-full rounded-full border border-emerald-300/45 bg-emerald-400/20 px-4 py-2 text-[11px] font-semibold text-emerald-50"
        >
          Save
        </button>
        <p className="text-center text-[9px] text-emerald-200/70">
          Enter · Space · focus ring included
        </p>
      </div>
    ),
  },
  {
    id: "nesting",
    title: { en: "Invalid nesting", ar: "تداخل غير صالح" },
    trap: {
      en: "`<p><div>…</div></p>` is invalid — the browser silently “fixes” the tree.",
      ar: "`<p><div>…</div></p>` باطل — المتصفح بيصلّح الشجرة في الخلفية.",
    },
    fix: {
      en: "Keep blocks outside paragraphs — use `<section>` / `<div>` wrappers.",
      ar: "خلّي الـ blocks بره الفقرات — استخدم `<section>` / `<div>`.",
    },
    wrongTag: "<p><div>",
    rightTag: "<div><p>",
    wrongPreview: (
      <div className="rounded-lg border border-rose-300/40 bg-rose-400/10 p-3 font-mono text-[10px] leading-5 text-rose-100">
        <span className="text-rose-200/70">&lt;p&gt;</span>
        <br />
        &nbsp;&nbsp;
        <span className="rounded bg-rose-500/30 px-1">&lt;div&gt;card&lt;/div&gt;</span>
        <br />
        <span className="text-rose-200/70">&lt;/p&gt;</span>
        <p className="mt-2 text-[9px] text-rose-200/60">browser rewrites DOM ✗</p>
      </div>
    ),
    rightPreview: (
      <div className="rounded-lg border border-emerald-300/40 bg-emerald-400/10 p-3 font-mono text-[10px] leading-5 text-emerald-50">
        <span className="text-emerald-200/70">&lt;div&gt;</span>
        <br />
        &nbsp;&nbsp;
        <span className="rounded bg-emerald-500/25 px-1">&lt;p&gt;card&lt;/p&gt;</span>
        <br />
        <span className="text-emerald-200/70">&lt;/div&gt;</span>
        <p className="mt-2 text-[9px] text-emerald-200/70">tree stays honest ✓</p>
      </div>
    ),
  },
];

/** Capstone pitfalls lab — wrong vs right morph with play/pause. */
export function HtmlPitfallsLabVisualizer() {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [beat, setBeat] = useState(0);
  const [showFix, setShowFix] = useState(false);

  const current = HTML_PITFALL_BEATS[beat];
  const ar = locale === "ar";

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(() => {
      setShowFix((wasFix) => {
        if (!wasFix) return true;
        setBeat((b) => (b + 1) % HTML_PITFALL_BEATS.length);
        return false;
      });
    }, LAB_STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    if (index === beat) return;
    playClick();
    setBeat(index);
    setShowFix(false);
  }

  const caption = showFix
    ? ar
      ? `✓ الصح: ${current.fix.ar}`
      : `✓ Fix: ${current.fix.en}`
    : ar
      ? `✗ الغلط: ${current.trap.ar}`
      : `✗ Mistake: ${current.trap.en}`;

  return (
    <LabStage
      playing={playing}
      onTogglePlay={toggle}
      title={ar ? "أخطاء HTML الشائعة" : "HTML pitfalls"}
      caption={caption}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/80">
            {ar ? current.title.ar : current.title.en}
          </p>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              showFix
                ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                : "border-rose-300/40 bg-rose-400/15 text-rose-100"
            }`}
          >
            {showFix ? (ar ? "صح" : "right") : ar ? "غلط" : "wrong"}
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <motion.div
            key={`${current.id}-wrong`}
            initial={false}
            animate={{
              opacity: showFix ? 0.35 : 1,
              scale: showFix ? 0.96 : 1,
              filter: showFix ? "grayscale(0.4)" : "none",
            }}
            transition={{ duration: 0.35, ease: labEase }}
            className="flex h-full min-h-[9rem] flex-col rounded-2xl border border-rose-400/35 bg-gradient-to-br from-rose-400/15 via-slate-950/70 to-slate-950/40 p-3"
          >
            <p className="mb-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-200">
              <X size={12} />
              {ar ? "غلط" : "Wrong"}
            </p>
            <code className="mb-2 rounded-md border border-rose-300/20 bg-rose-400/10 px-1.5 py-0.5 font-mono text-[10px] text-rose-100">
              {current.wrongTag}
            </code>
            <div className="flex flex-1 items-center">{current.wrongPreview}</div>
          </motion.div>

          <motion.div
            aria-hidden
            className="flex items-center justify-center"
            animate={
              reduce
                ? undefined
                : {
                    x: showFix ? [0, 4, 0] : 0,
                    scale: showFix ? [1, 1.12, 1] : 1,
                  }
            }
            transition={{ duration: 0.45 }}
          >
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${
                showFix
                  ? "border-emerald-300/45 bg-emerald-400/20 text-emerald-100"
                  : "border-white/15 bg-slate-950/80 text-slate-300"
              } ${RTL_FLIP}`}
            >
              →
            </span>
          </motion.div>

          <motion.div
            key={`${current.id}-right`}
            initial={false}
            animate={{
              opacity: showFix ? 1 : 0.4,
              scale: showFix ? 1 : 0.96,
              boxShadow: showFix
                ? "0 0 28px rgba(52,211,153,0.18)"
                : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.4, ease: labEase }}
            className="flex h-full min-h-[9rem] flex-col rounded-2xl border border-emerald-400/35 bg-gradient-to-br from-emerald-400/15 via-slate-950/70 to-slate-950/40 p-3"
          >
            <p className="mb-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              <Check size={12} />
              {ar ? "صح" : "Right"}
            </p>
            <code className="mb-2 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-100">
              {current.rightTag}
            </code>
            <div className="flex flex-1 items-center">{current.rightPreview}</div>
          </motion.div>
        </div>

        <div className="mt-2.5 flex shrink-0 flex-wrap items-center justify-center gap-1.5">
          {HTML_PITFALL_BEATS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={b.id}
              aria-current={i === beat ? "step" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                i === beat
                  ? showFix
                    ? "bg-emerald-300 text-slate-950"
                    : "bg-rose-300 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {b.id}
            </button>
          ))}
        </div>
      </div>
    </LabStage>
  );
}
