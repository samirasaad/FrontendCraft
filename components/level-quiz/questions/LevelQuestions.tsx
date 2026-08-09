"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";
import { LessonActivityCodeSnippet } from "@/components/lesson/lesson-activity/LessonActivityCodeSnippet";
import { LessonActivityOptionCard } from "@/components/lesson/lesson-activity/LessonActivityOptionCard";
import { RichText } from "@/components/shared/RichText";
import { loc, t } from "@/content/i18n/ui-strings";
import { useLanguage } from "@/context/LanguageContext";
import { levelQuizInstruction } from "@/lib/level-quiz/instructions";
import type {
  LevelAnswerValue,
  LevelQuestion,
} from "@/lib/level-quiz/types";

export interface LevelQuestionProps {
  question: LevelQuestion;
  answer: LevelAnswerValue | null;
  onChange: (value: LevelAnswerValue) => void;
  disabled: boolean;
  revealed: boolean;
  feedback: "none" | "correct" | "wrong";
}

function Prompt({ question }: { question: LevelQuestion }) {
  const { locale } = useLanguage();
  return (
    <div className="mb-4 space-y-2">
      <p className="text-sm leading-relaxed text-cyan-200/90">
        <RichText text={loc(levelQuizInstruction(question.type), locale)} />
      </p>
      <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
        <RichText text={loc(question.prompt, locale)} />
      </p>
    </div>
  );
}

function parseTargets(markup: string) {
  const targets: { id: string; label: string }[] = [];
  const re = /data-target="([^"]+)"[^>]*>([^<]*)</g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markup)) !== null) {
    targets.push({ id: m[1], label: m[2].trim() || m[1] });
  }
  return targets;
}

export function LevelQuestionView(props: LevelQuestionProps) {
  const q = props.question;
  switch (q.type) {
    case "click-element":
      return <ClickElement {...props} question={q} />;
    case "build-layout":
      return <BuildLayout {...props} question={q} />;
    case "css-detective":
      return <CssDetective {...props} question={q} />;
    case "spot-bug":
      return <SpotBug {...props} question={q} />;
    case "predict-visual":
      return <PredictVisual {...props} question={q} />;
    case "arrange-steps":
    case "timeline":
      return <ArrangeSteps {...props} question={q} />;
    case "fill-code":
      return <FillCode {...props} question={q} />;
    case "match-pairs":
      return <MatchPairs {...props} question={q} />;
    case "before-after":
      return <BeforeAfter {...props} question={q} />;
    case "browser-sim":
    case "mini-code":
      return <BrowserSim {...props} question={q} />;
    case "dom-tree":
      return <DomTree {...props} question={q} />;
    case "responsive":
      return <Responsive {...props} question={q} />;
    case "accessibility":
    case "mcq":
      return <Mcq {...props} question={q} />;
    case "console":
      return <ConsoleQ {...props} question={q} />;
    default:
      return null;
  }
}

function ClickElement({
  question,
  answer,
  onChange,
  disabled,
  revealed,
  feedback,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "click-element" }> }) {
  const { locale } = useLanguage();
  const targets = parseTargets(question.markup);
  const selected = typeof answer === "string" ? answer : null;
  return (
    <div>
      <Prompt question={question} />
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t("levelQuizPagePreview", locale)}
      </p>
      <div
        className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-white p-4 text-slate-900 shadow-inner"
        dangerouslySetInnerHTML={{ __html: question.markup }}
      />
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t("levelQuizTapElement", locale)}
      </p>
      <div className="flex flex-wrap gap-2">
        {targets.map((t) => {
          const isSel = selected === t.id;
          const isOk = revealed && t.id === question.correctTargetId;
          const isBad = revealed && isSel && !isOk;
          return (
            <motion.button
              key={t.id}
              type="button"
              disabled={disabled}
              whileHover={disabled ? undefined : { scale: 1.03 }}
              onClick={() => onChange(t.id)}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                isOk
                  ? "border-emerald-400 bg-emerald-400/15 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                  : isBad
                    ? "border-rose-400 bg-rose-400/15 text-rose-100"
                    : isSel
                      ? "border-cyan-300 bg-cyan-400/10 text-cyan-100"
                      : "border-white/12 bg-slate-950/50 text-slate-200"
              }`}
            >
              {t.label}
            </motion.button>
          );
        })}
      </div>
      {feedback === "wrong" ? <ShakeHint /> : null}
    </div>
  );
}

function BuildLayout({
  question,
  answer,
  onChange,
  disabled,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "build-layout" }> }) {
  const { locale } = useLanguage();
  const initial = question.blocks.map((b) => b.id);
  const order = Array.isArray(answer) ? (answer as string[]) : initial;
  useEffect(() => {
    if (!Array.isArray(answer)) onChange(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preview = useMemo(() => {
    const items = order
      .map((id) => question.blocks.find((b) => b.id === id))
      .filter(Boolean)
      .map(
        (b) =>
          `<div style="flex:1;min-height:48px;background:#22d3ee33;border:2px solid #22d3ee;border-radius:8px;display:flex;align-items:center;justify-content:center;font:bold 14px system-ui">${loc(b!.label, locale)}</div>`,
      )
      .join("");
    return `<style>${question.previewCss}</style><div style="display:flex;gap:8px;padding:12px">${items}</div>`;
  }, [order, question, locale]);

  return (
    <div>
      <Prompt question={question} />
      <iframe title="layout preview" sandbox="" srcDoc={preview} className="mb-4 h-28 w-full rounded-2xl border border-white/10 bg-white" />
      <Reorder.Group axis="y" values={order} onReorder={(next) => !disabled && onChange(next)} className="space-y-2">
        {order.map((id) => {
          const block = question.blocks.find((b) => b.id === id)!;
          return (
            <Reorder.Item key={id} value={id} dragListener={!disabled} className="flex cursor-grab items-center gap-3 rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3 active:cursor-grabbing">
              <GripVertical size={16} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-100">{loc(block.label, locale)}</span>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}

function CssDetective({
  question,
  answer,
  onChange,
  disabled,
  revealed,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "css-detective" }> }) {
  const selected = typeof answer === "string" ? answer : null;
  const lines = question.code.split("\n");
  return (
    <div>
      <Prompt question={question} />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 font-mono text-sm">
        {lines.map((line, i) => {
          const prop = question.properties.find((p) => line.includes(p.label));
          const pid = prop?.id;
          const isSel = pid && selected === pid;
          const isOk = revealed && pid === question.correctPropertyId;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || !pid}
              onClick={() => pid && onChange(pid)}
              className={`block w-full px-4 py-1.5 text-start transition hover:bg-white/5 ${
                isOk ? "bg-emerald-400/15 text-emerald-100" : isSel ? "bg-cyan-400/10 text-cyan-100" : "text-slate-300"
              }`}
            >
              {line}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SpotBug({
  question,
  answer,
  onChange,
  disabled,
  revealed,
  feedback,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "spot-bug" }> }) {
  const selected = typeof answer === "string" ? answer : null;
  const tokens = question.code.split(/(\s+|[{}();:])/).filter(Boolean);
  return (
    <div>
      <Prompt question={question} />
      <LessonActivityCodeSnippet code={question.code} language={question.language} />
      <div className="mt-3 flex flex-wrap gap-1 font-mono text-sm">
        {tokens.map((token, i) => {
          const isBug = token === question.bugToken;
          const isSel = selected === token;
          const isOk = revealed && isBug && isSel;
          const isBad = revealed && isSel && !isBug;
          if (!/^\s+$/.test(token) && token.length < 20) {
            return (
              <button
                key={`${token}-${i}`}
                type="button"
                disabled={disabled}
                onClick={() => onChange(token)}
                className={`rounded-lg px-1.5 py-0.5 transition ${
                  isOk ? "bg-emerald-400/20 text-emerald-100" : isBad ? "bg-rose-400/20 text-rose-100" : isSel ? "bg-cyan-400/15 text-cyan-100" : "hover:bg-white/10 text-slate-300"
                }`}
              >
                {token}
              </button>
            );
          }
          return <span key={i} className="text-slate-500">{token}</span>;
        })}
      </div>
      {feedback === "correct" ? <Glow /> : null}
    </div>
  );
}

function PredictVisual({
  question,
  answer,
  onChange,
  disabled,
  revealed,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "predict-visual" }> }) {
  const { locale } = useLanguage();
  const selected = typeof answer === "string" ? answer : null;
  return (
    <div>
      <Prompt question={question} />
      <LessonActivityCodeSnippet code={question.code} language={question.language} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {question.options.map((opt, idx) => (
          <motion.button
            key={opt.id}
            type="button"
            disabled={disabled}
            whileHover={disabled ? undefined : { y: -4, rotateY: 6 }}
            onClick={() => onChange(opt.id)}
            className={`overflow-hidden rounded-2xl border text-start transition ${
              revealed && opt.id === question.correctId
                ? "border-emerald-400 ring-2 ring-emerald-300/40"
                : selected === opt.id
                  ? "border-cyan-300"
                  : "border-white/12"
            }`}
          >
            <iframe title={`option-${idx}`} sandbox="" srcDoc={opt.previewHtml} className="h-24 w-full bg-white" />
            {opt.label ? (
              <p className="px-2 py-1 text-xs text-slate-400">{loc(opt.label, locale)}</p>
            ) : null}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function ArrangeSteps({
  question,
  answer,
  onChange,
  disabled,
}: LevelQuestionProps & {
  question: Extract<LevelQuestion, { type: "arrange-steps" | "timeline" }>;
}) {
  const { locale } = useLanguage();
  const initial = question.items.map((i) => i.id);
  const order = Array.isArray(answer) ? (answer as string[]) : initial;
  useEffect(() => {
    if (!Array.isArray(answer)) onChange(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Prompt question={question} />
      <Reorder.Group axis="y" values={order} onReorder={(n) => !disabled && onChange(n)} className="space-y-2">
        {order.map((id) => {
          const item = question.items.find((i) => i.id === id)!;
          return (
            <Reorder.Item key={id} value={id} dragListener={!disabled} className="flex items-center gap-3 rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3">
              <GripVertical size={16} className="shrink-0 text-slate-500" />
              <span className="font-mono text-sm text-cyan-100">{loc(item.label, locale)}</span>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}

function FillCode({
  question,
  answer,
  onChange,
  disabled,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "fill-code" }> }) {
  const val = typeof answer === "string" ? answer : "";
  const parts = question.template.split(`{{${question.blankId}}}`);
  return (
    <div>
      <Prompt question={question} />
      <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 font-mono text-sm text-slate-100">
        {parts[0]}
        <motion.input
          animate={{ boxShadow: val ? "0 0 12px rgba(34,211,238,0.3)" : "none" }}
          disabled={disabled}
          value={val}
          onChange={(e) => onChange(e.target.value)}
          className="mx-1 inline-block min-w-[5rem] rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-2 py-1 text-center text-cyan-100 outline-none"
          placeholder="..."
        />
        {parts[1] ?? ""}
      </div>
    </div>
  );
}

function MatchPairs({
  question,
  answer,
  onChange,
  disabled,
  revealed,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "match-pairs" }> }) {
  const { locale } = useLanguage();
  const pairs =
    typeof answer === "object" && answer && !Array.isArray(answer) && "pairs" in answer
      ? (answer as { pairs: Record<string, string> }).pairs
      : {};
  const [activeLeft, setActiveLeft] = useState<string | null>(null);

  return (
    <div>
      <Prompt question={question} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          {question.left.map((l) => (
            <button
              key={l.id}
              type="button"
              disabled={disabled}
              onClick={() => setActiveLeft(activeLeft === l.id ? null : l.id)}
              className={`w-full rounded-xl border px-3 py-2.5 text-start text-sm font-medium ${
                activeLeft === l.id ? "border-cyan-300 bg-cyan-400/10" : "border-white/12 bg-slate-950/50 text-slate-200"
              }`}
            >
              {loc(l.label, locale)}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {question.right.map((r) => (
            <button
              key={r.id}
              type="button"
              disabled={disabled || !activeLeft}
              onClick={() => {
                if (!activeLeft) return;
                onChange({ pairs: { ...pairs, [activeLeft]: r.id } });
                setActiveLeft(null);
              }}
              className={`w-full rounded-xl border px-3 py-2.5 text-start text-sm ${
                revealed && Object.values(question.correctPairs).includes(r.id)
                  ? "border-emerald-400/40"
                  : "border-white/12 bg-slate-950/50 text-slate-200"
              }`}
            >
              {loc(r.label, locale)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeforeAfter({
  question,
  answer,
  onChange,
  disabled,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "before-after" }> }) {
  const { locale } = useLanguage();
  const [pos, setPos] = useState(50);
  const selected = typeof answer === "string" ? answer : null;
  return (
    <div>
      <Prompt question={question} />
      <div className="relative mb-4 h-36 overflow-hidden rounded-2xl border border-white/10">
        <iframe title="before" sandbox="" srcDoc={question.beforeHtml} className="absolute inset-0 h-full w-full bg-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <iframe title="after" sandbox="" srcDoc={question.afterHtml} className="absolute inset-0 h-full w-full bg-white" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-x-4 bottom-2 z-10" aria-label="Compare" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {question.options.map((opt, i) => (
          <LessonActivityOptionCard
            key={opt.id}
            index={i}
            label={loc(opt.label, locale)}
            selected={selected === opt.id}
            answered={disabled}
            isCorrectOption={false}
            isWrongSelection={false}
            disabled={disabled}
            onSelect={() => onChange(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

function BrowserSim({
  question,
  answer,
  onChange,
  disabled,
}: LevelQuestionProps & {
  question: Extract<LevelQuestion, { type: "browser-sim" | "mini-code" }>;
}) {
  const css =
    typeof answer === "object" && answer && !Array.isArray(answer) && "css" in answer
      ? (answer as { css: string }).css
      : question.type === "browser-sim"
        ? question.starterCss
        : question.starterCss;
  const html = question.type === "browser-sim" ? question.html : question.html;
  const srcDoc = `<style>${css}</style>${html}`;

  return (
    <div>
      <Prompt question={question} />
      <div className="grid gap-3 lg:grid-cols-2">
        <textarea
          disabled={disabled}
          value={css}
          onChange={(e) => onChange({ css: e.target.value })}
          spellCheck={false}
          className="min-h-[140px] rounded-2xl border border-white/10 bg-slate-950/80 p-3 font-mono text-xs text-emerald-100 outline-none focus:border-cyan-300/40"
          dir="ltr"
        />
        <iframe title="live preview" sandbox="" srcDoc={srcDoc} className="min-h-[140px] rounded-2xl border border-white/10 bg-white" />
      </div>
    </div>
  );
}

function DomTree({
  question,
  answer,
  onChange,
  disabled,
  revealed,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "dom-tree" }> }) {
  const { locale } = useLanguage();
  const selected = typeof answer === "string" ? answer : null;

  function Node({ node, depth }: { node: typeof question.tree; depth: number }) {
    const isSel = selected === node.id;
    const isOk = revealed && node.id === question.correctNodeId;
    return (
      <div style={{ marginInlineStart: depth * 14 }}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(node.id)}
          className={`mb-1 rounded-lg border px-2 py-1 font-mono text-xs ${
            isOk ? "border-emerald-400 bg-emerald-400/15 text-emerald-100" : isSel ? "border-cyan-300 bg-cyan-400/10" : "border-white/10 text-slate-300"
          }`}
        >
          &lt;{node.tag}&gt;{node.label ? ` ${loc(node.label, locale)}` : ""}
        </button>
        {node.children?.map((c) => <Node key={c.id} node={c} depth={depth + 1} />)}
      </div>
    );
  }

  return (
    <div>
      <Prompt question={question} />
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <Node node={question.tree} depth={0} />
      </div>
    </div>
  );
}

function Responsive({
  question,
  answer,
  onChange,
  disabled,
  revealed,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "responsive" }> }) {
  const { locale } = useLanguage();
  const [width, setWidth] = useState(question.breakpoints[0]?.width ?? 360);
  const selected = typeof answer === "string" ? answer : null;

  return (
    <div>
      <Prompt question={question} />
      <div className="mb-3 flex flex-wrap gap-2">
        {question.breakpoints.map((bp) => (
          <button
            key={bp.id}
            type="button"
            disabled={disabled}
            onClick={() => {
              setWidth(bp.width);
              onChange(bp.id);
            }}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              revealed && bp.id === question.correctBreakpointId
                ? "border-emerald-400 text-emerald-100"
                : selected === bp.id
                  ? "border-cyan-300 text-cyan-100"
                  : "border-white/12 text-slate-400"
            }`}
          >
            {loc(bp.label, locale)}
          </button>
        ))}
      </div>
      <input type="range" min={320} max={900} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mb-3 w-full" />
      <div className="mx-auto overflow-hidden rounded-xl border border-white/10 bg-white transition-all" style={{ width }}>
        <iframe title="responsive" sandbox="" srcDoc={question.code} className="h-40 w-full" />
      </div>
    </div>
  );
}

function Mcq({
  question,
  answer,
  onChange,
  disabled,
  revealed,
}: LevelQuestionProps & {
  question: Extract<LevelQuestion, { type: "mcq" | "accessibility" }>;
}) {
  const { locale } = useLanguage();
  const selected = typeof answer === "string" ? answer : null;
  const opts = question.type === "accessibility" ? question.options : question.options;
  const correctId = question.correctId;
  return (
    <div>
      <Prompt question={question} />
      {question.type === "accessibility" ? (
        <p className="mb-3 rounded-xl border border-violet-400/20 bg-violet-400/5 px-3 py-2 text-sm text-violet-100">
          <RichText text={loc(question.scenario, locale)} />
        </p>
      ) : question.code ? (
        <LessonActivityCodeSnippet code={question.code} language={question.language ?? "html"} />
      ) : null}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {opts.map((opt, i) => (
          <LessonActivityOptionCard
            key={opt.id}
            index={i}
            label={loc(opt.label, locale)}
            selected={selected === opt.id}
            answered={disabled}
            isCorrectOption={revealed && opt.id === correctId}
            isWrongSelection={revealed && selected === opt.id && opt.id !== correctId}
            disabled={disabled}
            onSelect={() => onChange(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ConsoleQ({
  question,
  answer,
  onChange,
  disabled,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "console" }> }) {
  const val = typeof answer === "string" ? answer : "";
  return (
    <div>
      <Prompt question={question} />
      <LessonActivityCodeSnippet code={question.code} language="javascript" />
      <div className="mt-3 rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-sm">
        <span className="text-emerald-400">&gt; </span>
        <input
          disabled={disabled}
          value={val}
          onChange={(e) => onChange(e.target.value)}
          className="w-[80%] bg-transparent text-emerald-100 outline-none"
          placeholder="type answer..."
          dir="ltr"
        />
      </div>
    </div>
  );
}

function ShakeHint() {
  const { locale } = useLanguage();
  return (
    <p className="mt-2 text-xs text-rose-300">
      {t("levelQuizShakeHint", locale)}
    </p>
  );
}

function Glow() {
  return <div className="mt-2 h-1 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.6)]" />;
}
