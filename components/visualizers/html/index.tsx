"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, Shield, Volume2 } from "lucide-react";
import { DomTreeEngine } from "@/components/visualizers/html/DomTreeEngine";
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

/** Interactive DOM Tree Graph Engine — live Parent → Child → Text simulation. */
export function DocumentTreeVisualizer() {
  return <DomTreeEngine />;
}

const LANDMARKS = [
  { id: "header", tag: "header", role: "banner", span: "col-span-2" },
  { id: "nav", tag: "nav", role: "navigation", span: "col-span-2" },
  { id: "main", tag: "main", role: "main", span: "col-span-2" },
  { id: "article", tag: "article", role: "article", span: "col-span-2 ms-4" },
  { id: "footer", tag: "footer", role: "contentinfo", span: "col-span-2" },
] as const;

export function SemanticBlocksVisualizer() {
  const { playClick } = useSound();
  const reduce = useReducedMotion();
  const [on, setOn] = useState<Record<string, boolean>>({
    header: true,
    nav: true,
    main: true,
    article: true,
    footer: true,
  });

  const healthy = on.main && on.article;

  return (
    <LabStage>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {LANDMARKS.map((block) => {
          const active = on[block.id];
          return (
            <motion.button
              key={block.id}
              type="button"
              whileTap={reduce ? undefined : { scale: 0.96 }}
              onClick={() => {
                playClick();
                setOn((prev) => ({ ...prev, [block.id]: !prev[block.id] }));
              }}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold transition ${
                active
                  ? "border-amber-300/45 bg-amber-400/20 text-amber-50"
                  : "border-white/10 bg-slate-950/50 text-slate-500"
              }`}
              aria-pressed={active}
            >
              &lt;{block.tag}&gt;
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-white/10 bg-slate-950/60 p-2">
        <AnimatePresence mode="popLayout">
          {LANDMARKS.filter((b) => on[b.id]).map((block, i) => (
            <motion.div
              key={block.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
              transition={{ ...labSpring, delay: reduce ? 0 : i * 0.04 }}
              className={`${block.span} rounded-lg border border-amber-300/35 bg-gradient-to-r from-amber-400/20 to-orange-400/5 px-2.5 py-2`}
            >
              <p className="font-mono text-[11px] font-semibold text-amber-50">
                &lt;{block.tag}&gt;
              </p>
              <p className="text-[9px] uppercase tracking-wider text-amber-200/60">
                role: {block.role}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {healthy ? (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-[10px] font-medium text-emerald-300"
          >
            main → article nesting looks healthy
          </motion.p>
        ) : null}
      </AnimatePresence>
    </LabStage>
  );
}

export function HeadingLadderVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const levels = [
    { tag: "h1", label: "Page title", size: "text-base" },
    { tag: "h2", label: "Section", size: "text-sm" },
    { tag: "h3", label: "Subsection", size: "text-xs" },
    { tag: "h4", label: "Sub-detail", size: "text-[11px]" },
    { tag: "h5", label: "Minor", size: "text-[10px]" },
    { tag: "h6", label: "Finest", size: "text-[10px]" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % levels.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing, levels.length]);

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="relative space-y-1 overflow-hidden">
        {levels.map((level, i) => {
          const on = i <= active;
          const current = i === active;
          return (
            <motion.div
              key={level.tag}
              initial={false}
              animate={{
                opacity: on ? 1 : 0.28,
                x: on ? 0 : -4,
              }}
              transition={{ duration: 0.3, ease: labEase }}
              className="relative"
              style={{ marginInlineStart: i * 10 }}
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className="absolute -top-1 start-2.5 h-1 w-px bg-orange-300/40"
                />
              ) : null}
              <div
                className={`rounded-lg border px-2 py-1 font-mono leading-tight ${level.size} ${
                  current
                    ? "border-orange-300/55 bg-orange-400/25 text-orange-50 shadow-[0_0_16px_rgba(251,146,60,0.18)]"
                    : "border-orange-300/25 bg-orange-400/10 text-orange-100/80"
                }`}
              >
                <span className="font-semibold">&lt;{level.tag}&gt;</span>
                <span className="ms-1.5 text-[10px] text-orange-200/70">
                  {level.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </LabStage>
  );
}

type FormatTag = {
  tag: string;
  sample: string;
  hint: string;
  prefix?: string;
  title?: string;
  datetime?: string;
};

const FORMAT_TAGS: FormatTag[] = [
  { tag: "strong", sample: "important", hint: "strong importance" },
  { tag: "em", sample: "emphasis", hint: "stressed emphasis" },
  { tag: "mark", sample: "highlight", hint: "marked / relevant" },
  { tag: "small", sample: "fine print", hint: "side comments" },
  { tag: "del", sample: "removed", hint: "deleted text" },
  { tag: "ins", sample: "added", hint: "inserted text" },
  { tag: "s", sample: "no longer true", hint: "strikethrough meaning" },
  { tag: "u", sample: "unarticulated", hint: "spelling hint / label" },
  { tag: "code", sample: "npm run", hint: "inline code" },
  { tag: "kbd", sample: "Ctrl+S", hint: "keyboard input" },
  { tag: "samp", sample: "OK 200", hint: "sample output" },
  { tag: "var", sample: "x", hint: "variable / placeholder" },
  { tag: "sub", sample: "2", hint: "subscript", prefix: "H" },
  { tag: "sup", sample: "2", hint: "superscript", prefix: "x" },
  {
    tag: "abbr",
    sample: "HTML",
    hint: "abbreviation",
    title: "HyperText Markup Language",
  },
  { tag: "q", sample: "short quote", hint: "inline quote" },
  { tag: "cite", sample: "MDN", hint: "work title" },
  {
    tag: "time",
    sample: "Aug 2, 2026",
    hint: "date / time",
    datetime: "2026-08-02",
  },
  { tag: "b", sample: "stylistic bold", hint: "bold without stress" },
  { tag: "i", sample: "stylistic italic", hint: "alternate voice" },
];

/** Render real formatting so the card shows the visual shape of the tag. */
function FormatPreview({ item }: { item: FormatTag }) {
  const text = item.sample;
  const styled = (() => {
    switch (item.tag) {
      case "strong":
        return <strong className="font-bold text-orange-50">{text}</strong>;
      case "em":
        return <em className="italic text-orange-50">{text}</em>;
      case "b":
        return <b className="font-bold text-orange-50">{text}</b>;
      case "i":
        return <i className="italic text-orange-50">{text}</i>;
      case "mark":
        return (
          <mark className="rounded-sm bg-yellow-300/85 px-0.5 text-slate-950">
            {text}
          </mark>
        );
      case "small":
        return <small className="text-[10px] text-slate-300">{text}</small>;
      case "del":
        return <del className="text-rose-200/90 line-through">{text}</del>;
      case "ins":
        return (
          <ins className="text-emerald-200 underline decoration-emerald-300/80">
            {text}
          </ins>
        );
      case "s":
        return <s className="text-slate-400 line-through">{text}</s>;
      case "u":
        return (
          <u className="text-orange-50 underline decoration-orange-300/70">
            {text}
          </u>
        );
      case "code":
        return (
          <code className="rounded bg-slate-950/80 px-1 font-mono text-[10px] text-cyan-200">
            {text}
          </code>
        );
      case "kbd":
        return (
          <kbd className="rounded border border-white/20 bg-slate-950/70 px-1 font-mono text-[10px] text-amber-100 shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]">
            {text}
          </kbd>
        );
      case "samp":
        return (
          <samp className="font-mono text-[10px] text-lime-200/90">{text}</samp>
        );
      case "var":
        return <var className="italic text-violet-200">{text}</var>;
      case "sub":
        return (
          <>
            {item.prefix}
            <sub className="text-[10px] text-orange-50">{text}</sub>
          </>
        );
      case "sup":
        return (
          <>
            {item.prefix}
            <sup className="text-[10px] text-orange-50">{text}</sup>
          </>
        );
      case "abbr":
        return (
          <abbr
            title={item.title}
            className="cursor-help text-orange-50 underline decoration-dotted"
          >
            {text}
          </abbr>
        );
      case "q":
        return <q className="italic text-orange-50">{text}</q>;
      case "cite":
        return <cite className="italic text-sky-200">{text}</cite>;
      case "time":
        return (
          <time dateTime={item.datetime} className="text-orange-50">
            {text}
          </time>
        );
      default:
        return <span className="text-orange-50">{text}</span>;
    }
  })();

  return (
    <span className="inline-flex max-w-full items-baseline gap-1 truncate text-[11px] leading-snug text-slate-200">
      {styled}
    </span>
  );
}

export function TextFormatVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % FORMAT_TAGS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const current = FORMAT_TAGS[active];

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <p className="mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300">
        &lt;{current.tag}&gt; — {current.hint}
      </p>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {FORMAT_TAGS.map((item, i) => {
          const on = i === active;
          return (
            <motion.div
              key={item.tag}
              animate={{
                opacity: on ? 1 : 0.5,
                scale: on && !reduce ? 1.03 : 1,
                borderColor: on
                  ? "rgba(251,146,60,0.55)"
                  : "rgba(255,255,255,0.1)",
                backgroundColor: on
                  ? "rgba(251,146,60,0.18)"
                  : "rgba(15,23,42,0.45)",
              }}
              transition={{ duration: 0.28, ease: labEase }}
              className="rounded-lg border px-2 py-1.5"
            >
              <div className="flex items-start justify-between gap-1">
                <p className="font-mono text-[10px] font-semibold text-orange-100/90">
                  &lt;{item.tag}&gt;
                </p>
              </div>
              <div className="mt-1 border-t border-white/5 pt-1">
                <FormatPreview item={item} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </LabStage>
  );
}

export function LinkImageVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 3), LAB_STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: phase === 0 ? [0, -3, 0] : 0,
                  boxShadow:
                    phase === 0
                      ? [
                          "0 0 0 rgba(34,211,238,0)",
                          "0 0 18px rgba(34,211,238,0.35)",
                          "0 0 0 rgba(34,211,238,0)",
                        ]
                      : "0 0 0 rgba(34,211,238,0)",
                }
          }
          transition={{ duration: 1.2 }}
          className="rounded-full border border-cyan-300/40 bg-cyan-400/15 px-4 py-2 font-mono text-xs text-cyan-50"
        >
          &lt;a href=&quot;/lesson&quot;&gt;
        </motion.div>

        <div className="relative flex h-8 w-full max-w-[180px] items-center justify-center">
          <motion.div
            aria-hidden
            className="h-px w-full origin-top bg-gradient-to-b from-cyan-300/80 to-orange-300/80"
            style={{ width: 2, height: "100%" }}
            animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: LAB_LOOP_S, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute text-cyan-200"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: LAB_LOOP_S, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>

        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  opacity: phase >= 1 ? 1 : 0.55,
                  scale: phase === 1 ? 1.03 : 1,
                }
          }
          className="relative flex h-24 w-40 flex-col justify-between overflow-hidden rounded-2xl border border-orange-300/35 bg-gradient-to-br from-orange-400/35 via-amber-500/15 to-slate-950 p-2.5"
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_55%)]"
            animate={reduce ? undefined : { opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
          />
          <span className="relative text-[10px] font-semibold text-orange-50">
            &lt;img&gt;
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={phase >= 2 ? "alt" : "wait"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative rounded-md border border-orange-200/30 bg-slate-950/50 px-1.5 py-0.5 font-mono text-[10px] text-orange-100"
            >
              {phase >= 2 ? 'alt="Chart up 20%"' : "alt=?"}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
    </LabStage>
  );
}

export function ListStackVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const kinds = [
    { label: "ul", items: ["• HTML", "• CSS"], tint: "border-cyan-300/35 bg-cyan-400/10" },
    { label: "ol", items: ["1. One", "2. Two"], tint: "border-orange-300/35 bg-orange-400/10" },
    { label: "dl", items: ["dt Term", "dd Def"], tint: "border-amber-300/35 bg-amber-400/10" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % kinds.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing, kinds.length]);

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="grid grid-cols-3 gap-2">
        {kinds.map((kind, i) => {
          const on = i === active;
          return (
            <motion.div
              key={kind.label}
              animate={{
                y: on && !reduce ? -4 : 0,
                scale: on ? 1.03 : 0.97,
                opacity: on ? 1 : 0.55,
              }}
              transition={{ duration: 0.35, ease: labEase }}
              className={`rounded-xl border p-2 ${kind.tint} ${
                on ? "shadow-[0_0_18px_rgba(251,146,60,0.18)]" : ""
              }`}
            >
              <p className="mb-2 text-center font-mono text-[10px] font-semibold text-orange-100">
                &lt;{kind.label}&gt;
              </p>
              {kind.items.map((item, j) => (
                <motion.div
                  key={item}
                  initial={false}
                  animate={
                    on && !reduce
                      ? { opacity: [0.4, 1], x: [4, 0] }
                      : { opacity: 0.85, x: 0 }
                  }
                  transition={{ delay: j * 0.12, duration: 0.35 }}
                  className="mb-1 rounded-md bg-slate-950/40 px-2 py-1 font-mono text-[10px] text-orange-50"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          );
        })}
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
  const { dir } = useLanguage();
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
    <LabStage playing={playing} onTogglePlay={toggle}>
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
    <LabStage playing={playing} onTogglePlay={toggle}>
      <p className="mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300">
        {current.status}
      </p>

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

/** Build a data table one layer at a time — structure, not AT walk. */
const TABLE_BUILD = [
  {
    id: "shell",
    tag: "<table>",
    line: "Start with a table — for data, not page layout.",
    showCaption: false,
    showHead: false,
    rows: 0,
    showScope: false,
  },
  {
    id: "caption",
    tag: "<caption>",
    line: "Caption titles the whole table for everyone.",
    showCaption: true,
    showHead: false,
    rows: 0,
    showScope: false,
  },
  {
    id: "thead",
    tag: "<thead> + <th>",
    line: "Column headers live in thead — Name and Score.",
    showCaption: true,
    showHead: true,
    rows: 0,
    showScope: false,
  },
  {
    id: "row1",
    tag: "<tbody> + <tr>",
    line: "First data row — row header + value.",
    showCaption: true,
    showHead: true,
    rows: 1,
    showScope: false,
  },
  {
    id: "row2",
    tag: "<tr>",
    line: "More rows stack — same columns, related values.",
    showCaption: true,
    showHead: true,
    rows: 2,
    showScope: false,
  },
  {
    id: "row3",
    tag: "<tr>",
    line: "Full scoreboard — three players, two columns.",
    showCaption: true,
    showHead: true,
    rows: 3,
    showScope: false,
  },
  {
    id: "scope",
    tag: 'scope="col|row"',
    line: "scope tells assistive tech which header applies.",
    showCaption: true,
    showHead: true,
    rows: 3,
    showScope: true,
  },
] as const;

const TABLE_ROWS = [
  { name: "Nour", score: "42" },
  { name: "Sam", score: "90" },
  { name: "Ava", score: "95" },
] as const;

export function TableGridVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = TABLE_BUILD[step];

  useEffect(() => {
    if (reduce) {
      setStep(TABLE_BUILD.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % TABLE_BUILD.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="mb-3 flex min-h-8 items-center gap-2">
        <span className="shrink-0 rounded-md border border-orange-300/35 bg-orange-400/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-orange-100">
          {current.tag}
        </span>
        <p className="text-sm leading-relaxed text-slate-300">
          {current.line}
        </p>
      </div>

      {/* Full table always laid out — layers fade in so height never jumps */}
      <div className="rounded-xl border border-dashed border-orange-300/40 bg-slate-950/40">
        <table className="w-full border-collapse text-[11px]">
          <motion.caption
            animate={{ opacity: current.showCaption ? 1 : 0 }}
            transition={{ duration: 0.35, ease: labEase }}
            className="border-b border-orange-300/20 bg-orange-400/10 px-3 py-2 text-start"
          >
            <span className="font-semibold text-orange-50">Scoreboard</span>
          </motion.caption>
          <thead>
            <motion.tr
              animate={{ opacity: current.showHead ? 1 : 0 }}
              transition={{ duration: 0.35, ease: labEase }}
            >
              {(["Name", "Score"] as const).map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="border border-orange-300/15 bg-orange-400/12 px-2.5 py-2 text-start text-[11px] font-semibold text-orange-50"
                >
                  <span className="inline-flex flex-wrap items-center gap-1.5">
                    {label}
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
            {TABLE_ROWS.map((row, i) => (
              <motion.tr
                key={row.name}
                animate={{ opacity: current.rows > i ? 1 : 0 }}
                transition={{ duration: 0.35, ease: labEase }}
              >
                <th
                  scope="row"
                  className="border border-orange-300/15 bg-slate-950/55 px-2.5 py-2 text-start text-[11px] font-semibold text-amber-100/90"
                >
                  <span className="inline-flex flex-wrap items-center gap-1.5">
                    {row.name}
                    <motion.span
                      animate={{ opacity: current.showScope ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: labEase }}
                      className="font-mono text-[8px] font-medium text-slate-400"
                    >
                      scope=&quot;row&quot;
                    </motion.span>
                  </span>
                </th>
                <td className="border border-orange-300/15 bg-slate-950/35 px-2.5 py-2 font-mono text-[11px] text-slate-200">
                  {row.score}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {TABLE_BUILD.map((s, i) => (
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

/** Screen-reader walk — name · role · value as focus moves through native HTML. */
const A11Y_STEPS = [
  {
    id: "skip",
    focus: "skip" as const,
    tip: "Skip link — first Tab target before chrome.",
    speech: "Skip to content, link",
    name: "Skip to content",
    role: "link",
    value: "—",
  },
  {
    id: "button",
    focus: "button" as const,
    tip: "Native button exposes name, role, and expanded state.",
    speech: "More info, button, collapsed",
    name: "More info",
    role: "button",
    value: "collapsed",
  },
  {
    id: "image",
    focus: "image" as const,
    tip: "Meaningful alt becomes the image's accessible name.",
    speech: "Sales grew 20% in March, image",
    name: "Sales grew 20% in March",
    role: "image",
    value: "—",
  },
  {
    id: "input",
    focus: "input" as const,
    tip: "label + input association → accessible name.",
    speech: "Email, edit text",
    name: "Email",
    role: "textbox",
    value: "blank",
  },
  {
    id: "live",
    focus: "live" as const,
    tip: "aria-live announces async UI without stealing focus.",
    speech: "Saved",
    name: "Saved",
    role: "status",
    value: "polite",
  },
] as const;

export function A11yCheckVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = A11Y_STEPS[step];

  useEffect(() => {
    if (reduce) {
      setStep(A11Y_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % A11Y_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function ring(id: (typeof A11Y_STEPS)[number]["focus"]) {
    return current.focus === id
      ? "0 0 0 2px rgba(251,146,60,0.55)"
      : "0 0 0 0 rgba(0,0,0,0)";
  }

  function dim(id: (typeof A11Y_STEPS)[number]["focus"]) {
    return current.focus === id ? 1 : 0.45;
  }

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <p className="mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300">
        {current.tip}
      </p>

      {/* Fixed-height stage: UI always fully laid out */}
      <div className="space-y-2.5 rounded-xl border border-emerald-400/25 bg-slate-950/50 p-3">
        <motion.a
          href="#main"
          tabIndex={-1}
          animate={{ boxShadow: ring("skip"), opacity: dim("skip") }}
          transition={{ duration: 0.3, ease: labEase }}
          className="inline-flex rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1.5 text-[11px] font-medium text-emerald-100"
          onClick={(e) => e.preventDefault()}
        >
          Skip to content
          <span className="ms-1.5 font-mono text-[9px] text-slate-500">
            &lt;a href=&quot;#main&quot;&gt;
          </span>
        </motion.a>

        <motion.button
          type="button"
          tabIndex={-1}
          animate={{ boxShadow: ring("button"), opacity: dim("button") }}
          transition={{ duration: 0.3, ease: labEase }}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-slate-900/70 px-2.5 py-2 text-start text-[11px] font-medium text-slate-100"
        >
          <span>
            More info
            <span className="ms-1.5 font-mono text-[9px] font-normal text-slate-500">
              aria-expanded=&quot;false&quot;
            </span>
          </span>
          <span className="font-mono text-[9px] text-slate-500">&lt;button&gt;</span>
        </motion.button>

        <motion.div
          animate={{ boxShadow: ring("image"), opacity: dim("image") }}
          transition={{ duration: 0.3, ease: labEase }}
          className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-slate-900/70 px-2.5 py-2"
        >
          <div
            aria-hidden
            className="flex h-9 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-400/15 font-mono text-[9px] text-emerald-200/80"
          >
            img
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] text-slate-200">
              alt=&quot;Sales grew 20% in March&quot;
            </p>
            <p className="font-mono text-[9px] text-slate-500">
              accessible name from alt
            </p>
          </div>
        </motion.div>

        <motion.label
          animate={{ boxShadow: ring("input"), opacity: dim("input") }}
          transition={{ duration: 0.3, ease: labEase }}
          className="block rounded-lg border border-white/10 bg-slate-900/70 px-2.5 py-2"
        >
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-slate-100">Email</span>
            <span className="font-mono text-[9px] text-slate-500">
              &lt;label for&gt; + &lt;input&gt;
            </span>
          </div>
          <div className="flex h-7 items-center rounded-md border border-white/10 bg-slate-950/80 px-2 font-mono text-[10px] text-slate-500">
            type=&quot;email&quot;
          </div>
        </motion.label>

        <motion.div
          animate={{ boxShadow: ring("live"), opacity: dim("live") }}
          transition={{ duration: 0.3, ease: labEase }}
          className="rounded-lg border border-dashed border-emerald-400/30 bg-emerald-400/5 px-2.5 py-2"
        >
          <p className="font-mono text-[9px] text-emerald-200/70">
            aria-live=&quot;polite&quot;
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-emerald-100">
            {current.focus === "live" ? "Saved" : "…"}
          </p>
        </motion.div>
      </div>

      {/* AT announcement panel — fixed slot */}
      <div className="mt-3 rounded-xl border border-cyan-400/25 bg-cyan-950/30 px-3 py-2.5">
        <div className="mb-1.5 flex items-center gap-1.5 text-cyan-200/80">
          <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            Screen reader
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: labEase }}
            className="min-h-5 font-mono text-[12px] font-medium text-cyan-50"
          >
            “{current.speech}”
          </motion.p>
        </AnimatePresence>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {(
            [
              ["name", current.name],
              ["role", current.role],
              ["value", current.value],
            ] as const
          ).map(([key, val]) => (
            <div
              key={key}
              className="rounded-md border border-white/10 bg-slate-950/50 px-1.5 py-1"
            >
              <p className="font-mono text-[8px] uppercase tracking-wide text-slate-500">
                {key}
              </p>
              <p className="truncate font-mono text-[10px] text-slate-200">
                {val}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {A11Y_STEPS.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === step ? "bg-emerald-300" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </LabStage>
  );
}

/** SEO crawl lab — first HTML response → SERP (CWV lives in Pro performance). */
const SEO_STEPS = [
  {
    id: "csr",
    tip: "CSR-only shell — crawler gets an empty root, thin index.",
    title: false,
    desc: false,
    canonical: false,
    body: false,
    mode: "csr" as const,
  },
  {
    id: "title",
    tip: "<title> in the first HTML — tab + SERP title.",
    title: true,
    desc: false,
    canonical: false,
    body: false,
    mode: "ssr" as const,
  },
  {
    id: "desc",
    tip: "meta description — honest snippet under the result.",
    title: true,
    desc: true,
    canonical: false,
    body: false,
    mode: "ssr" as const,
  },
  {
    id: "canonical",
    tip: 'rel="canonical" — one preferred URL for duplicates.',
    title: true,
    desc: true,
    canonical: true,
    body: false,
    mode: "ssr" as const,
  },
  {
    id: "body",
    tip: "Primary copy in <main> — indexable in the first response.",
    title: true,
    desc: true,
    canonical: true,
    body: true,
    mode: "ssr" as const,
  },
] as const;

export function SeoCrawlVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SEO_STEPS[step];

  useEffect(() => {
    if (reduce) {
      setStep(SEO_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % SEO_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="mb-2 flex min-h-8 items-center gap-2">
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${
            current.mode === "csr"
              ? "border-rose-300/35 bg-rose-400/15 text-rose-100"
              : "border-emerald-300/35 bg-emerald-400/15 text-emerald-100"
          }`}
        >
          {current.mode === "csr" ? "CSR shell" : "SSR HTML"}
        </span>
        <p className="text-sm leading-relaxed text-slate-300">
          {current.tip}
        </p>
      </div>

      {/* Browser tab — fixed slot */}
      <div className="rounded-lg border border-white/10 bg-slate-900/90 px-3 py-2">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          <span className="ms-1 text-[9px] text-slate-500">browser tab</span>
        </div>
        <p className="min-h-4 font-mono text-xs text-orange-100">
          {current.title ? (
            <>
              &lt;title&gt;FrontendCraft — HTML&lt;/title&gt;
            </>
          ) : (
            <span className="text-slate-500">untitled document</span>
          )}
        </p>
      </div>

      {/* SERP + body — always full height via opacity */}
      <div className="mt-2.5 space-y-2 rounded-xl border border-orange-300/25 bg-slate-950/50 p-3">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-orange-200/60">
          Search result preview
        </p>

        <motion.p
          animate={{ opacity: current.title ? 1 : 0.25 }}
          transition={{ duration: 0.3, ease: labEase }}
          className={`text-sm font-semibold leading-snug ${
            current.title ? "text-sky-300" : "text-slate-600"
          }`}
        >
          FrontendCraft — HTML track
        </motion.p>

        <motion.p
          animate={{ opacity: current.canonical ? 1 : 0.25 }}
          transition={{ duration: 0.3, ease: labEase }}
          className="truncate font-mono text-[10px] text-emerald-300/80"
        >
          {current.canonical
            ? "https://example.com/html · rel=\"canonical\""
            : "example.com/html"}
        </motion.p>

        <motion.p
          animate={{ opacity: current.desc ? 1 : 0.25 }}
          transition={{ duration: 0.3, ease: labEase }}
          className={`min-h-10 text-sm leading-relaxed ${
            current.desc ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Learn HTML with interactive labs and live sandboxes.
        </motion.p>

        <motion.div
          animate={{
            opacity: current.body ? 1 : 0.3,
            borderColor: current.body
              ? "rgba(251,146,60,0.35)"
              : "rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.3, ease: labEase }}
          className="rounded-lg border border-dashed bg-slate-900/60 px-2.5 py-2"
        >
          <p className="font-mono text-[9px] text-slate-500">
            &lt;main&gt; in first response
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-orange-50">
            {current.body ? (
              <>
                <span className="text-orange-200/80">&lt;h1&gt;</span> HTML
                track
              </>
            ) : (
              <span className="text-slate-600">&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</span>
            )}
          </p>
        </motion.div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {SEO_STEPS.map((s, i) => (
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

/** Pro CWV lab — LCP / INP / CLS as product metrics. */
const CWV_STEPS = [
  {
    id: "lcp-bad",
    tip: "LCP — oversized hero without size or preload paints late.",
    focus: "lcp" as const,
    good: false,
    scores: { lcp: "4.2s", inp: "—", cls: "—" },
  },
  {
    id: "lcp-good",
    tip: "LCP fix — sized image + fetchpriority / preload.",
    focus: "lcp" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "—", cls: "—" },
  },
  {
    id: "inp-bad",
    tip: "INP — heavy main-thread work delays the click.",
    focus: "inp" as const,
    good: false,
    scores: { lcp: "1.8s", inp: "380ms", cls: "—" },
  },
  {
    id: "inp-good",
    tip: "INP fix — light handlers; defer non-critical JS.",
    focus: "inp" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "120ms", cls: "—" },
  },
  {
    id: "cls-bad",
    tip: "CLS — unsized media / late banner shoves content.",
    focus: "cls" as const,
    good: false,
    scores: { lcp: "1.8s", inp: "120ms", cls: "0.28" },
  },
  {
    id: "cls-good",
    tip: "CLS fix — width/height (or aspect-ratio) reserved.",
    focus: "cls" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "120ms", cls: "0.04" },
  },
  {
    id: "pass",
    tip: "Field targets — LCP < 2.5s · INP < 200ms · CLS < 0.1",
    focus: "all" as const,
    good: true,
    scores: { lcp: "1.8s", inp: "120ms", cls: "0.04" },
  },
] as const;

export function CwvLabVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = CWV_STEPS[step];

  useEffect(() => {
    if (reduce) {
      setStep(CWV_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % CWV_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const metrics = [
    {
      id: "LCP",
      key: "lcp" as const,
      label: "largest paint",
      score: current.scores.lcp,
    },
    {
      id: "INP",
      key: "inp" as const,
      label: "interaction",
      score: current.scores.inp,
    },
    {
      id: "CLS",
      key: "cls" as const,
      label: "layout shift",
      score: current.scores.cls,
    },
  ];

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <p className="mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300">
        {current.tip}
      </p>

      {/* Mini page stage — fixed height */}
      <div className="relative overflow-hidden rounded-xl border border-orange-300/25 bg-slate-950/50 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-orange-200/60">
            page paint
          </span>
          <span
            className={`rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-semibold ${
              current.good
                ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                : "border-rose-300/40 bg-rose-400/15 text-rose-100"
            }`}
          >
            {current.good ? "good" : "needs work"}
          </span>
        </div>

        {/* LCP hero */}
        <motion.div
          animate={{
            opacity: current.focus === "lcp" || current.focus === "all" ? 1 : 0.45,
            y: current.focus === "lcp" && !current.good && !reduce ? [0, 2, 0] : 0,
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
            {current.focus === "lcp" && !current.good
              ? "hero img · no size · lazy"
              : "hero · width/height · high priority"}
          </span>
        </motion.div>

        {/* Content + INP button */}
        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 flex-1 rounded-full bg-white/10" />
          <div className="h-2 w-1/3 rounded-full bg-white/10" />
        </div>
        <motion.button
          type="button"
          tabIndex={-1}
          animate={{
            opacity: current.focus === "inp" || current.focus === "all" ? 1 : 0.45,
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
          {current.focus === "inp" && !current.good
            ? "Click… (main thread busy)"
            : "Click — snappy response"}
        </motion.button>

        {/* CLS shove block */}
        <motion.div
          animate={{
            opacity: current.focus === "cls" || current.focus === "all" ? 1 : 0.45,
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
            duration: current.focus === "cls" && !current.good ? LAB_LOOP_S : 0.35,
            ease: labEase,
            repeat:
              current.focus === "cls" && !current.good && !reduce
                ? Infinity
                : 0,
          }}
          className="rounded-lg border border-dashed bg-slate-900/70 px-2.5 py-2"
        >
          <p className="font-mono text-[10px] text-slate-300">
            {current.focus === "cls" && !current.good
              ? "banner injects → content shifts"
              : "reserved space · stable layout"}
          </p>
        </motion.div>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
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

      <div className="mt-3 flex justify-center gap-1.5">
        {CWV_STEPS.map((s, i) => (
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

const OG_STEPS = [
  {
    id: "title",
    tip: "<title> + og:title — first thing previews show.",
    title: true,
    desc: false,
    image: false,
  },
  {
    id: "desc",
    tip: "og:description — short line under the title.",
    title: true,
    desc: true,
    image: false,
  },
  {
    id: "image",
    tip: "og:image — absolute HTTPS URL in the first HTML.",
    title: true,
    desc: true,
    image: true,
  },
] as const;

/** Open Graph unfurl — head tags → share preview (Head & Social Meta lesson). */
export function MetaCardVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = OG_STEPS[step];

  useEffect(() => {
    if (reduce) {
      setStep(OG_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % OG_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <p className="mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300">
        {current.tip}
      </p>

      <div className="overflow-hidden rounded-xl border border-orange-300/35 bg-slate-950/60">
        <motion.div
          animate={{ opacity: current.image ? 1 : 0.35 }}
          transition={{ duration: 0.35, ease: labEase }}
          className="flex h-14 items-center justify-center bg-gradient-to-r from-orange-400/35 via-amber-300/15 to-cyan-400/20"
        >
          <span className="font-mono text-[10px] text-orange-100/80">
            {current.image ? 'og:image · https://…/og.png' : "og:image pending…"}
          </span>
        </motion.div>
        <div className="space-y-1 p-3">
          <p className="text-[9px] uppercase tracking-wider text-orange-200/60">
            og:title · share card
          </p>
          <motion.p
            animate={{ opacity: current.title ? 1 : 0.3 }}
            className="text-sm font-semibold text-orange-50"
          >
            Document Anatomy
          </motion.p>
          <motion.p
            animate={{ opacity: current.desc ? 1 : 0.3 }}
            className="min-h-10 text-sm leading-relaxed text-slate-300"
          >
            Learn the HTML document shell with interactive labs.
          </motion.p>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[9px] text-slate-500">
        <span className={current.title ? "text-orange-200/80" : ""}>
          &lt;meta property=&quot;og:title&quot;&gt;
        </span>
        <span className={current.desc ? "text-orange-200/80" : ""}>
          og:description
        </span>
        <span className={current.image ? "text-orange-200/80" : ""}>
          og:image
        </span>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {OG_STEPS.map((s, i) => (
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
    <LabStage playing={playing} onTogglePlay={toggle}>
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

/** Browser Compatibility & Baseline — engines, Baseline band, detect → fallback. */
const BASELINE_FEATURES = [
  {
    id: "details",
    feature: "<details> / <summary>",
    baseline: "widely" as const,
    tip: "Baseline Widely — ship as the default path.",
    engines: { chrome: "ok", firefox: "ok", safari: "ok", edge: "ok" },
    detect: false,
    fallback: false,
    code: "<details><summary>…",
    verdict: "Safe default",
  },
  {
    id: "lazy",
    feature: 'loading="lazy"',
    baseline: "widely" as const,
    tip: "Widely supported — still never lazy-load the LCP hero.",
    engines: { chrome: "ok", firefox: "ok", safari: "ok", edge: "ok" },
    detect: false,
    fallback: false,
    code: '<img loading="lazy" …>',
    verdict: "Safe (below fold)",
  },
  {
    id: "dialog",
    feature: "<dialog> showModal()",
    baseline: "newly" as const,
    tip: "Baseline Newly — Safari needs 15.4+; don't assume parity.",
    engines: { chrome: "ok", firefox: "ok", safari: "lag", edge: "ok" },
    detect: false,
    fallback: false,
    code: "dialog.showModal()",
    verdict: "Needs a policy",
  },
  {
    id: "detect",
    feature: "<dialog> showModal()",
    baseline: "newly" as const,
    tip: "Feature-detect the API — never sniff the user-agent.",
    engines: { chrome: "ok", firefox: "ok", safari: "lag", edge: "ok" },
    detect: true,
    fallback: false,
    code: "'showModal' in HTMLDialogElement.prototype",
    verdict: "Ask the engine",
  },
  {
    id: "fallback",
    feature: "<dialog> showModal()",
    baseline: "newly" as const,
    tip: "Progressive enhance — keep usable HTML if the API is missing.",
    engines: { chrome: "ok", firefox: "ok", safari: "lag", edge: "ok" },
    detect: true,
    fallback: true,
    code: "canModal ? showModal() : fallback()",
    verdict: "Enhance, don't brick",
  },
  {
    id: "popover",
    feature: "popover attribute",
    baseline: "newly" as const,
    tip: "Newly available menus/tooltips — plan a non-top-layer fallback.",
    engines: { chrome: "ok", firefox: "ok", safari: "lag", edge: "ok" },
    detect: true,
    fallback: true,
    code: '<div popover>…</div>',
    verdict: "Detect + fallback",
  },
  {
    id: "limited",
    feature: "bleeding-edge API",
    baseline: "limited" as const,
    tip: "Baseline Limited — never ship as the only path.",
    engines: {
      chrome: "ok",
      firefox: "lag",
      safari: "no",
      edge: "ok",
    },
    detect: true,
    fallback: true,
    code: "if (supported) enhance()",
    verdict: "Gate hard",
  },
] as const;

const ENGINES = [
  { id: "chrome" as const, label: "Chrome", short: "Chr", tint: "#60a5fa" },
  { id: "firefox" as const, label: "Firefox", short: "FF", tint: "#fb923c" },
  { id: "safari" as const, label: "Safari", short: "Saf", tint: "#67e8f9" },
  { id: "edge" as const, label: "Edge", short: "Edg", tint: "#38bdf8" },
] as const;

const BASELINE_BANDS = [
  { id: "widely" as const, label: "Widely", hint: "default" },
  { id: "newly" as const, label: "Newly", hint: "plan" },
  { id: "limited" as const, label: "Limited", hint: "gate" },
] as const;

function baselineStyle(band: "widely" | "newly" | "limited") {
  switch (band) {
    case "widely":
      return "border-emerald-300/40 bg-emerald-400/15 text-emerald-100";
    case "newly":
      return "border-amber-300/40 bg-amber-400/15 text-amber-100";
    case "limited":
      return "border-rose-300/40 bg-rose-400/15 text-rose-100";
  }
}

function baselineGlow(band: "widely" | "newly" | "limited") {
  switch (band) {
    case "widely":
      return "rgba(52,211,153,0.55)";
    case "newly":
      return "rgba(251,191,36,0.55)";
    case "limited":
      return "rgba(251,113,133,0.55)";
  }
}

function engineStyle(state: "ok" | "lag" | "no") {
  switch (state) {
    case "ok":
      return {
        border: "rgba(52,211,153,0.55)",
        bg: "rgba(52,211,153,0.16)",
        text: "text-emerald-200",
        label: "ok",
        pulse: "rgba(52,211,153,0.35)",
      };
    case "lag":
      return {
        border: "rgba(251,191,36,0.55)",
        bg: "rgba(251,191,36,0.16)",
        text: "text-amber-100",
        label: "lag",
        pulse: "rgba(251,191,36,0.35)",
      };
    case "no":
      return {
        border: "rgba(251,113,133,0.55)",
        bg: "rgba(251,113,133,0.14)",
        text: "text-rose-200",
        label: "no",
        pulse: "rgba(251,113,133,0.3)",
      };
  }
}

export function BaselineCompatVisualizer() {
  const reduce = useReducedMotion();
  const { playClick } = useSound();
  const { dir } = useLanguage();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = BASELINE_FEATURES[step];
  const bandIndex = BASELINE_BANDS.findIndex((b) => b.id === current.baseline);
  const flow = dir === "rtl" ? -1 : 1;

  useEffect(() => {
    if (reduce) {
      setStep(BASELINE_FEATURES.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % BASELINE_FEATURES.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  function goTo(index: number) {
    playClick();
    setStep(index);
  }

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="mb-2 flex min-h-9 items-start gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.verdict}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: labEase }}
            className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${baselineStyle(current.baseline)}`}
          >
            {current.verdict}
          </motion.span>
        </AnimatePresence>
        <p className="text-sm leading-relaxed text-slate-300">
          {current.tip}
        </p>
      </div>

      {/* Mini browser stage */}
      <div className="overflow-hidden rounded-xl border border-cyan-400/25 bg-slate-950/60">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-slate-900/80 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
          <span className="ms-2 truncate rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9px] text-slate-400">
            caniuse · Baseline · MDN
          </span>
        </div>

        <div className="space-y-3 p-3">
          {/* Feature + Baseline badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.feature + current.id}
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.25, ease: labEase }}
                className="font-mono text-[12px] font-semibold text-cyan-50"
              >
                {current.feature}
              </motion.p>
            </AnimatePresence>
            <motion.span
              key={current.baseline}
              animate={{
                boxShadow: `0 0 0 1px ${baselineGlow(current.baseline)}, 0 0 18px ${baselineGlow(current.baseline)}`,
              }}
              transition={{ duration: 0.35, ease: labEase }}
              className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${baselineStyle(current.baseline)}`}
            >
              Baseline {current.baseline}
            </motion.span>
          </div>

          {/* Baseline spectrum with traveling marker */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-1">
              {BASELINE_BANDS.map((band) => {
                const active = band.id === current.baseline;
                return (
                  <div
                    key={band.id}
                    className={`rounded-lg border px-2 py-1.5 text-center transition-colors ${
                      active
                        ? baselineStyle(band.id)
                        : "border-white/10 bg-white/[0.03] text-slate-500"
                    }`}
                  >
                    <p className="text-[10px] font-semibold">{band.label}</p>
                    <p className="font-mono text-[8px] opacity-70">{band.hint}</p>
                  </div>
                );
              })}
            </div>
            {!reduce ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-1 h-0.5 rounded-full bg-cyan-300"
                animate={{
                  left: `${(bandIndex / 3) * 100 + 4}%`,
                  width: "25%",
                  backgroundColor: baselineGlow(current.baseline),
                }}
                transition={{ ...labSpring }}
              />
            ) : null}
          </div>

          {/* Engine matrix with scan pulse */}
          <div className="relative">
            {!reduce ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-8 rounded-lg bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
                animate={{ left: ["-10%", "110%"] }}
                transition={{
                  duration: LAB_LOOP_S,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.6,
                }}
              />
            ) : null}
            <div className="grid grid-cols-4 gap-1.5">
              {ENGINES.map((engine, i) => {
                const state = current.engines[engine.id];
                const style = engineStyle(state);
                return (
                  <motion.div
                    key={engine.id}
                    initial={false}
                    animate={{
                      borderColor: style.border,
                      backgroundColor: style.bg,
                      scale: state === "no" && !reduce ? [1, 0.96, 1] : 1,
                      boxShadow:
                        state !== "ok"
                          ? `0 0 12px ${style.pulse}`
                          : "0 0 0 transparent",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: labEase,
                      delay: reduce ? 0 : i * 0.05,
                    }}
                    className="relative overflow-hidden rounded-lg border px-1.5 py-2 text-center"
                  >
                    <span
                      aria-hidden
                      className="mx-auto mb-1 block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: engine.tint }}
                    />
                    <p className="text-[10px] font-semibold text-slate-100">
                      {engine.short}
                    </p>
                    <p className={`mt-0.5 font-mono text-[9px] font-bold uppercase ${style.text}`}>
                      {style.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-1.5 text-center text-[8px] text-slate-500">
              Chrome · Firefox · Safari · Edge
            </p>
          </div>

          {/* Live code chip */}
          <AnimatePresence mode="wait">
            <motion.pre
              key={current.code}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: labEase }}
              className="overflow-x-auto rounded-lg border border-white/10 bg-black/35 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-yellow-100/90"
            >
              {current.code}
            </motion.pre>
          </AnimatePresence>

          {/* Detect → fallback pipeline */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
            <motion.div
              animate={{
                opacity: current.detect ? 1 : 0.35,
                borderColor: current.detect
                  ? "rgba(34,211,238,0.5)"
                  : "rgba(255,255,255,0.1)",
                backgroundColor: current.detect
                  ? "rgba(34,211,238,0.12)"
                  : "rgba(15,23,42,0.45)",
                boxShadow: current.detect
                  ? "0 0 16px rgba(34,211,238,0.2)"
                  : "0 0 0 transparent",
              }}
              transition={{ duration: 0.3, ease: labEase }}
              className="rounded-lg border px-2.5 py-2"
            >
              <p className="font-mono text-[9px] text-cyan-200/80">
                1 · feature detect
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-slate-300">
                Ask the engine at runtime
              </p>
            </motion.div>

            <motion.div
              animate={{
                opacity: current.detect ? 1 : 0.25,
                x: current.detect && !reduce ? [0, 3 * flow, 0] : 0,
                color: current.fallback
                  ? "rgb(110 231 183)"
                  : "rgb(103 232 249)",
              }}
              transition={{
                duration: LAB_LOOP_S,
                repeat: current.detect && !reduce ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center"
            >
              <ChevronRight size={16} className={RTL_FLIP} />
            </motion.div>

            <motion.div
              animate={{
                opacity: current.fallback ? 1 : 0.35,
                borderColor: current.fallback
                  ? "rgba(52,211,153,0.5)"
                  : "rgba(255,255,255,0.1)",
                backgroundColor: current.fallback
                  ? "rgba(52,211,153,0.12)"
                  : "rgba(15,23,42,0.45)",
                boxShadow: current.fallback
                  ? "0 0 16px rgba(52,211,153,0.2)"
                  : "0 0 0 transparent",
              }}
              transition={{ duration: 0.3, ease: labEase }}
              className="rounded-lg border px-2.5 py-2"
            >
              <p className="font-mono text-[9px] text-emerald-200/80">
                2 · fallback
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-slate-300">
                Usable HTML without the API
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {BASELINE_FEATURES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Step ${i + 1}: ${s.feature}`}
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
    <LabStage playing={playing} onTogglePlay={toggle}>
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

export function MediaStageVisualizer() {
  const reduce = useReducedMotion();
  const { playing, toggle } = useAutoPlay(true);
  const sources = ["AVIF", "WebP", "JPG"];
  const [source, setSource] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(
      () => setSource((s) => (s + 1) % sources.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, playing, sources.length]);

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-orange-300/35 bg-gradient-to-br from-orange-400/25 via-slate-900 to-slate-950">
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,146,60,0.25),transparent_50%)]"
          animate={reduce ? undefined : { opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: LAB_LOOP_S, repeat: Infinity }}
        />
        <div className="relative flex h-28 flex-col items-center justify-center gap-2 p-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={sources[source]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-full border border-orange-200/30 bg-slate-950/50 px-2 py-0.5 font-mono text-[10px] text-orange-100"
            >
              &lt;source type=&quot;image/{sources[source].toLowerCase()}&quot;&gt;
            </motion.span>
          </AnimatePresence>
          <motion.span
            animate={
              playing && !reduce
                ? { scale: [1, 1.08, 1], boxShadow: ["0 0 0 rgba(251,146,60,0)", "0 0 20px rgba(251,146,60,0.45)", "0 0 0 rgba(251,146,60,0)"] }
                : { scale: 1 }
            }
            transition={{ duration: LAB_LOOP_S, repeat: playing && !reduce ? Infinity : 0 }}
            className="rounded-full bg-orange-300 px-3 py-1 text-xs font-bold text-slate-950"
          >
            {playing ? "▶ video" : "❚❚ pause"}
          </motion.span>
        </div>
        <motion.div
          className="h-1 bg-white/10"
          aria-hidden
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-300 to-cyan-300"
            animate={
              reduce
                ? { width: "40%" }
                : { width: playing ? ["8%", "72%", "8%"] : "35%" }
            }
            transition={{
              duration: LAB_LOOP_S,
              repeat: playing && !reduce ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
      <motion.div
        animate={reduce ? undefined : { x: [0, 4, 0] }}
        transition={{ duration: LAB_LOOP_S, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-3 w-full max-w-xs rounded-xl border border-dashed border-amber-300/40 bg-slate-950/40 px-3 py-2 text-center font-mono text-[11px] text-amber-100"
      >
        &lt;iframe title=&quot;Demo&quot; loading=&quot;lazy&quot;&gt;
      </motion.div>
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
    <LabStage playing={playing} onTogglePlay={toggle}>
      <p className="mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300">
        {current.tip}
      </p>

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
    title: "External tab: unsafe",
    code: `<a target="_blank">Partner docs</a>`,
    detail: "New page can reach window.opener",
    state: "unsafe",
  },
  {
    title: "Close the opener",
    code: `rel="noopener noreferrer"`,
    detail: "No opener control · no referrer leak",
    state: "safe",
  },
  {
    title: "Sandbox the embed",
    code: `sandbox="allow-forms allow-scripts"`,
    detail: "Third-party frame gets minimum capability",
    state: "safe",
  },
  {
    title: "Name sensitive data",
    code: `autocomplete="one-time-code"`,
    detail: "Browser and password manager understand intent",
    state: "safe",
  },
] as const;

export function HtmlSecurityLabVisualizer() {
  const reduce = useReducedMotion();
  const { playClick } = useSound();
  const { dir } = useLanguage();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SECURITY_STEPS[step];
  const safe = current.state === "safe";
  const flow = dir === "rtl" ? -1 : 1;

  useEffect(() => {
    if (reduce) {
      setStep(SECURITY_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((index) => (index + 1) % SECURITY_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  function goTo(index: number) {
    playClick();
    setStep(index);
  }

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="mb-3 flex items-center gap-2">
        <motion.div
          animate={{
            backgroundColor: safe ? "rgba(16,185,129,0.18)" : "rgba(251,113,133,0.18)",
            borderColor: safe ? "rgba(110,231,183,0.55)" : "rgba(253,164,175,0.55)",
          }}
          className="rounded-lg border p-1.5"
        >
          <Shield
            size={16}
            className={safe ? "text-emerald-200" : "text-rose-200"}
          />
        </motion.div>
        <div>
          <p className="text-[11px] font-semibold text-slate-100">{current.title}</p>
          <p className={`text-[9px] font-semibold ${safe ? "text-emerald-300" : "text-rose-300"}`}>
            {safe ? "trust boundary protected" : "trust boundary exposed"}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/65">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-slate-900/80 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
          <span className="ms-2 font-mono text-[9px] text-slate-500">markup security review</span>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <motion.div
            animate={{
              borderColor: safe ? "rgba(110,231,183,0.32)" : "rgba(253,164,175,0.45)",
              opacity: step < 2 ? 1 : 0.58,
            }}
            className="rounded-lg border bg-slate-900/70 p-2.5"
          >
            <p className="mb-1 font-mono text-[8px] uppercase tracking-wider text-slate-500">your page</p>
            <p className="font-mono text-[10px] text-yellow-100/90">{step < 2 ? "target=_blank" : "<iframe / form>"}</p>
          </motion.div>
          <motion.div
            aria-hidden
            animate={{
              x: safe || reduce ? 0 : [0, 5 * flow, 0],
              color: safe ? "rgb(110 231 183)" : "rgb(251 113 133)",
            }}
            transition={{ duration: LAB_LOOP_S, repeat: safe || reduce ? 0 : Infinity }}
          >
            <ChevronRight size={18} className={RTL_FLIP} />
          </motion.div>
          <motion.div
            animate={{
              borderColor: safe ? "rgba(110,231,183,0.5)" : "rgba(253,164,175,0.45)",
              backgroundColor: safe ? "rgba(6,78,59,0.28)" : "rgba(76,5,25,0.28)",
            }}
            className="rounded-lg border p-2.5"
          >
            <p className="mb-1 font-mono text-[8px] uppercase tracking-wider text-slate-400">
              {step < 2 ? "external origin" : step === 2 ? "embed origin" : "browser-held data"}
            </p>
            <p className={`text-[10px] font-semibold ${safe ? "text-emerald-100" : "text-rose-100"}`}>
              {safe ? "minimum access granted" : "opener access possible"}
            </p>
          </motion.div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.code}
            initial={reduce ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.24, ease: labEase }}
            className="mx-3 mb-3 rounded-lg border border-white/10 bg-black/30 px-2.5 py-2"
          >
            <code className="font-mono text-[10px] text-cyan-100">{current.code}</code>
            <p className="mt-1 text-[9px] text-slate-400">{current.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {SECURITY_STEPS.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Step ${index + 1}: ${item.title}`}
            aria-current={index === step ? "step" : undefined}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all ${index === step ? "w-5 bg-emerald-300" : "w-1.5 bg-slate-600 hover:bg-slate-400"}`}
          />
        ))}
      </div>
    </LabStage>
  );
}

const SPECULATION_STEPS = [
  { title: "Click and wait", mode: "cold", detail: "Next LCP waits for navigation" },
  { title: "Prefetch response", mode: "prefetch", detail: "Likely same-origin document is warm" },
  { title: "Prerender safely", mode: "prerender", detail: "Read-only destination is rendered in background" },
  { title: "Navigate instant", mode: "instant", detail: "Activation makes the next LCP feel fast" },
] as const;

export function HtmlSpeculationLabVisualizer() {
  const reduce = useReducedMotion();
  const { playClick } = useSound();
  const { dir } = useLanguage();
  const { playing, toggle } = useAutoPlay(true);
  const [step, setStep] = useState(0);
  const current = SPECULATION_STEPS[step];
  const flow = dir === "rtl" ? -1 : 1;

  useEffect(() => {
    if (reduce) {
      setStep(SPECULATION_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((index) => (index + 1) % SPECULATION_STEPS.length),
      LAB_STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  function goTo(index: number) {
    playClick();
    setStep(index);
  }

  const warmed = step >= 1;
  const rendered = step >= 2;
  const instant = step === 3;

  return (
    <LabStage playing={playing} onTogglePlay={toggle}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold text-slate-100">{current.title}</p>
          <p className="text-[9px] text-cyan-200/75">{current.detail}</p>
        </div>
        <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] ${instant ? "border-emerald-300/45 bg-emerald-400/15 text-emerald-100" : "border-cyan-300/35 bg-cyan-400/10 text-cyan-100"}`}>
          next LCP {instant ? "warm" : "pending"}
        </span>
      </div>

      <div className="rounded-xl border border-cyan-400/20 bg-slate-950/60 p-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="rounded-lg border border-white/10 bg-slate-900/70 p-2">
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">current page</p>
            <p className="mt-1 text-[10px] font-semibold text-slate-200">Collection</p>
          </div>
          <motion.div
            aria-hidden
            animate={{
              x: warmed && !reduce ? [0, 5 * flow, 0] : 0,
              color: warmed ? "rgb(103 232 249)" : "rgb(100 116 139)",
            }}
            transition={{ duration: LAB_LOOP_S, repeat: warmed && !reduce ? Infinity : 0 }}
          >
            <ChevronRight size={18} className={RTL_FLIP} />
          </motion.div>
          <motion.div
            animate={{
              borderColor: rendered ? "rgba(110,231,183,0.5)" : warmed ? "rgba(103,232,249,0.5)" : "rgba(255,255,255,0.1)",
              backgroundColor: rendered ? "rgba(6,78,59,0.3)" : warmed ? "rgba(8,47,73,0.32)" : "rgba(15,23,42,0.55)",
              boxShadow: rendered ? "0 0 18px rgba(52,211,153,0.18)" : "0 0 0 transparent",
            }}
            className="rounded-lg border p-2"
          >
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">next document</p>
            <p className="mt-1 text-[10px] font-semibold text-slate-200">
              {rendered ? "Product detail rendered" : warmed ? "Response prefetched" : "Not requested"}
            </p>
          </motion.div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            { label: "network", active: warmed },
            { label: "render", active: rendered },
            { label: "activate", active: instant },
          ].map(({ label, active }) => (
            <motion.div
              key={label}
              animate={{
                opacity: active ? 1 : 0.35,
                borderColor: active ? "rgba(103,232,249,0.45)" : "rgba(255,255,255,0.1)",
              }}
              className="rounded-md border bg-white/3 px-1.5 py-1.5 text-center font-mono text-[8px] text-cyan-100"
            >
              {active ? <Check className="mx-auto mb-0.5" size={10} /> : null}
              {label}
            </motion.div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-rose-300/25 bg-rose-400/6 px-2.5 py-2">
          <p className="font-mono text-[9px] font-semibold text-rose-200">/logout · excluded</p>
          <p className="mt-0.5 text-[9px] text-rose-100/70">Never prerender routes that mutate state or consume tokens.</p>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {SPECULATION_STEPS.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Step ${index + 1}: ${item.title}`}
            aria-current={index === step ? "step" : undefined}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all ${index === step ? "w-5 bg-cyan-300" : "w-1.5 bg-slate-600 hover:bg-slate-400"}`}
          />
        ))}
      </div>
    </LabStage>
  );
}

/** Global & Bidirectional HTML — RTL root → isolate token → LTR inputs. */
const RTL_STEPS = [
  {
    id: "ltr-root",
    tip: {
      en: "Default LTR document — fine for English-only chrome.",
      ar: "مستند LTR افتراضي — مناسب لـ chrome إنجليزي بس.",
    },
    rootDir: "ltr" as const,
    isolate: false,
    ltrInputs: false,
  },
  {
    id: "rtl-root",
    tip: {
      en: "Arabic-first product: lang=ar + dir=rtl on <html>.",
      ar: "منتج عربي-أولًا: lang=ar + dir=rtl على <html>.",
    },
    rootDir: "rtl" as const,
    isolate: false,
    ltrInputs: false,
  },
  {
    id: "isolate",
    tip: {
      en: "Isolate English tokens with <bdi> so Arabic letters stay ordered.",
      ar: "اعزل tokens إنجليزية بـ <bdi> عشان الحروف العربية تفضل مرتبة.",
    },
    rootDir: "rtl" as const,
    isolate: true,
    ltrInputs: false,
  },
  {
    id: "inputs",
    tip: {
      en: "Email / OTP fields keep dir=ltr inside an RTL form.",
      ar: "حقول الإيميل / OTP تفضل dir=ltr جوّه فورم RTL.",
    },
    rootDir: "rtl" as const,
    isolate: true,
    ltrInputs: true,
  },
  {
    id: "portal",
    tip: {
      en: "Teleported dialog carries dir/lang — don’t orphan direction.",
      ar: "الـ dialog المتنقل بيشيل dir/lang — متسيبش الاتجاه يتيم.",
    },
    rootDir: "rtl" as const,
    isolate: true,
    ltrInputs: true,
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
    <LabStage playing={playing} onTogglePlay={toggle}>
      <p className="mb-2 min-h-11 shrink-0 text-sm leading-relaxed text-slate-300">
        {current.tip[locale]}
      </p>

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

      <div className="mt-3 flex justify-center gap-1.5">
        {RTL_STEPS.map((s, i) => (
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
