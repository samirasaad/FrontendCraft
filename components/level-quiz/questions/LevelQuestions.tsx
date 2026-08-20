"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
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
    <div className="mb-3">
      <p className="text-sm leading-snug text-cyan-200/80">
        <RichText text={loc(levelQuizInstruction(question.type), locale)} />
      </p>
      <p className="mt-1 text-base font-semibold leading-snug text-white sm:text-lg">
        <RichText text={loc(question.prompt, locale)} />
      </p>
    </div>
  );
}

function parseTargets(markup: string) {
  const targets: { id: string; label: string }[] = [];
  const re = /<([A-Za-z][\w:-]*)\b([^>]*data-target="([^"]+)"[^>]*)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markup)) !== null) {
    const tag = m[1].toLowerCase();
    const attrs = m[2];
    const id = m[3];
    const named = attrs.match(/data-label="([^"]+)"/)?.[1];
    if (named) {
      targets.push({ id, label: named });
      continue;
    }
    const text = markup
      .slice(m.index + m[0].length)
      .split("<")[0]
      .trim();
    targets.push({
      id,
      label: text ? `<${tag}> ${text}` : `<${tag}>`,
    });
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
  feedback,
}: LevelQuestionProps & { question: Extract<LevelQuestion, { type: "click-element" }> }) {
  const { locale } = useLanguage();
  const targets = parseTargets(question.markup);
  const selected = typeof answer === "string" ? answer : null;
  const safeId = selected && /^[A-Za-z][\w-]*$/.test(selected) ? selected : "";
  const selectedLabel = targets.find((item) => item.id === selected)?.label;

    function handlePreviewClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disabled) return;
    const el = (event.target as HTMLElement).closest("[data-target]");
    const id = el?.getAttribute("data-target");
    if (id) onChange(id);
  }

  return (
    <div>
      <Prompt question={question} />
      <p className="mb-2 text-sm font-semibold text-slate-300">
        {t("levelQuizTapPreview", locale)}
      </p>
      <div
        className="html-click-preview mb-3 overflow-hidden rounded-2xl border border-white/10 bg-white p-4 text-slate-900 shadow-inner [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ps-8 [&_ol]:ps-8 [&_ul]:my-2 [&_ol]:my-2 [&_p]:my-2 [&_nav]:mb-2 [&_[data-target]]:cursor-pointer [&_[data-target]]:rounded-sm [&_[data-target]]:outline [&_[data-target]]:outline-2 [&_[data-target]]:outline-dashed [&_[data-target]]:outline-slate-400 [&_[data-target]]:outline-offset-2"
        onClick={handlePreviewClick}
        dangerouslySetInnerHTML={{ __html: question.markup }}
      />
      {safeId ? (
        <style>{`.html-click-preview [data-target="${safeId}"]{outline-color:#38bdf8;outline-style:solid;background:#0c4a6e;color:#e0f2fe}`}</style>
      ) : null}
      {selectedLabel ? (
        <p className="flex items-center gap-2 rounded-xl border border-sky-300/40 bg-sky-400/15 px-3 py-2.5 text-sm text-sky-50 shadow-[0_0_20px_rgba(56,189,248,0.18)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-300/25 text-sky-100">
            ✓
          </span>
          <span>
            <span className="font-semibold text-sky-200">
              {t("levelQuizTapElement", locale)}:{" "}
            </span>
            <span className="font-mono">{selectedLabel}</span>
          </span>
        </p>
      ) : null}
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
                isOk
                  ? "bg-emerald-400/15 text-emerald-100 ring-1 ring-inset ring-emerald-300/30"
                  : isSel
                    ? "bg-sky-400/15 text-sky-50 ring-1 ring-inset ring-sky-300/40"
                    : "text-slate-300"
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
                  isOk
                    ? "bg-emerald-400/20 text-emerald-100 ring-1 ring-emerald-300/40"
                    : isBad
                      ? "bg-rose-400/20 text-rose-100 ring-1 ring-rose-300/35"
                      : isSel
                        ? "bg-sky-400/20 text-sky-50 ring-1 ring-sky-300/45"
                        : "text-slate-300 hover:bg-white/10"
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
            className={`relative cursor-pointer overflow-hidden rounded-2xl border text-start transition ${
              revealed && opt.id === question.correctId
                ? "border-emerald-400 ring-2 ring-emerald-300/40 shadow-[0_0_24px_rgba(52,211,153,0.2)]"
                : selected === opt.id
                  ? "border-sky-300/80 ring-2 ring-sky-300/45 shadow-[0_0_24px_rgba(56,189,248,0.25)]"
                  : "border-white/12 hover:border-sky-300/35"
            }`}
          >
            <iframe
              title={`option-${idx}`}
              sandbox=""
              srcDoc={opt.previewHtml}
              tabIndex={-1}
              className="pointer-events-none h-48 w-full bg-white"
            />
            {opt.label ? (
              <p className="px-3 py-2 text-sm font-medium text-slate-200">{loc(opt.label, locale)}</p>
            ) : null}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function nodeKind(label: string): "doctype" | "open" | "close" | "leaf" {
  const text = label.trim();
  if (!/^</.test(text)) return "leaf";
  if (text.startsWith("<!")) return "doctype";
  if (text.startsWith("</")) return "close";
  if (text.startsWith("<meta") || /<[A-Za-z][^>]*>[\s\S]*<\/[A-Za-z]/.test(text)) {
    return "leaf";
  }
  return "open";
}

function nodeDepths(labels: string[]) {
  let depth = 0;
  return labels.map((label) => {
    const kind = nodeKind(label);
    if (kind === "close") {
      depth = Math.max(0, depth - 1);
      return depth;
    }
    const at = depth;
    if (kind === "open") depth += 1;
    return at;
  });
}

const TREE_OPEN_TAGS = new Set([
  "html",
  "head",
  "body",
  "header",
  "main",
  "footer",
  "nav",
  "section",
  "article",
  "ul",
  "ol",
]);

function treeNodeKind(tag: string, hasChildren: boolean): "open" | "leaf" {
  if (hasChildren || TREE_OPEN_TAGS.has(tag.toLowerCase())) return "open";
  return "leaf";
}

const NODE_DOT: Record<ReturnType<typeof nodeKind>, string> = {
  doctype: "bg-orange-300",
  open: "bg-cyan-300",
  close: "border-2 border-slate-400 bg-transparent",
  leaf: "bg-emerald-300",
};

const NODE_SHELL: Record<ReturnType<typeof nodeKind>, string> = {
  doctype:
    "border-orange-300/40 bg-orange-300/10 text-orange-100",
  open: "border-cyan-300/40 bg-cyan-400/10 text-cyan-100",
  close: "border-white/15 bg-slate-950/80 text-slate-300",
  leaf: "border-emerald-300/35 bg-emerald-400/10 text-emerald-100",
};

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

  const labels = order.map(
    (id) => loc(question.items.find((i) => i.id === id)!.label, locale),
  );
  const depths = nodeDepths(labels);

  return (
    <div>
      <Prompt question={question} />
      <Reorder.Group
        axis="y"
        values={order}
        onReorder={(n) => !disabled && onChange(n)}
        className="relative space-y-2 ps-2"
      >
        <span
          aria-hidden
          className="absolute start-[1.15rem] top-3 bottom-3 w-px bg-white/15"
        />
        {order.map((id, index) => {
          const item = question.items.find((i) => i.id === id)!;
          const label = loc(item.label, locale);
          const kind = nodeKind(label);
          return (
            <Reorder.Item
              key={id}
              value={id}
              dragListener={!disabled}
              style={{ marginInlineStart: depths[index] * 18 }}
              className={`relative z-[1] flex cursor-grab items-center gap-2.5 rounded-full border px-3 py-2 shadow-[0_0_18px_rgba(15,23,42,0.35)] active:cursor-grabbing ${NODE_SHELL[kind]}`}
            >
              <GripVertical size={14} className="shrink-0 opacity-50" />
              <span
                aria-hidden
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${NODE_DOT[kind]}`}
              />
              <span className="font-mono text-[13px] font-medium tracking-tight">
                {label}
              </span>
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
  const { locale } = useLanguage();
  const val = typeof answer === "string" ? answer : "";
  const parts = question.template.split(`{{${question.blankId}}}`);
  return (
    <div>
      <Prompt question={question} />
      <div className="rounded-2xl border border-sky-400/20 bg-slate-950/80 p-4 font-mono text-sm text-slate-100">
        {parts[0]}
        <motion.input
          animate={{ boxShadow: val ? "0 0 12px rgba(56,189,248,0.28)" : "none" }}
          disabled={disabled}
          value={val}
          onChange={(e) => onChange(e.target.value)}
          className="mx-1 inline-block min-w-20 rounded-lg border border-sky-300/35 bg-sky-400/10 px-2 py-1 text-center text-sky-100 outline-none focus:border-sky-300/60"
          placeholder={t("levelQuizFillPlaceholder", locale)}
        />
        {parts[1] ?? ""}
      </div>
    </div>
  );
}

const PAIR_COLORS = ["#22d3ee", "#34d399", "#c4b5fd", "#fb923c"];
const EMPTY_PAIRS: Record<string, string> = {};

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
      : EMPTY_PAIRS;
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [, setTick] = useState(0);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const redraw = () => setTick((n) => n + 1);
    redraw();
    const ro = new ResizeObserver(redraw);
    ro.observe(el);
    window.addEventListener("resize", redraw);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", redraw);
    };
  }, [pairs, activeLeft, locale]);

  const lines = Object.entries(pairs).flatMap(([leftId, rightId], index) => {
    const wrap = wrapRef.current?.getBoundingClientRect();
    const a = leftRefs.current[leftId]?.getBoundingClientRect();
    const b = rightRefs.current[rightId]?.getBoundingClientRect();
    if (!wrap || !a || !b) return [];
    const ok = !revealed || question.correctPairs[leftId] === rightId;
    return [
      {
        x1: a.right - wrap.left,
        y1: a.top + a.height / 2 - wrap.top,
        x2: b.left - wrap.left,
        y2: b.top + b.height / 2 - wrap.top,
        color: ok ? PAIR_COLORS[index % PAIR_COLORS.length] : "#fb7185",
      },
    ];
  });

  function pairColor(leftId: string) {
    const index = Object.keys(pairs).indexOf(leftId);
    if (index < 0) return null;
    const ok = !revealed || question.correctPairs[leftId] === pairs[leftId];
    return ok ? PAIR_COLORS[index % PAIR_COLORS.length] : "#fb7185";
  }

  return (
    <div>
      <Prompt question={question} />
      <p className="mb-3 text-sm text-slate-400">
        {t("levelQuizPairSelectLeft", locale)}
      </p>
      {question.demoHtml ? (
        <iframe
          title={t("levelQuizPagePreview", locale)}
          sandbox=""
          srcDoc={wrapQuizPreview(question.demoHtml)}
          scrolling="no"
          className="mb-4 h-[5.5rem] w-full overflow-hidden rounded-2xl border border-sky-400/20 bg-slate-950 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        />
      ) : null}
      <div ref={wrapRef} className="relative grid items-center gap-4 sm:gap-8 sm:grid-cols-2">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
        >
          {lines.map((line, i) => (
            <path
              key={i}
              d={`M ${line.x1} ${line.y1} C ${line.x1 + 28} ${line.y1}, ${line.x2 - 28} ${line.y2}, ${line.x2} ${line.y2}`}
              fill="none"
              stroke={line.color}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="relative z-[1] space-y-2.5">
          {question.left.map((item) => {
            const color = pairColor(item.id);
            const active = activeLeft === item.id;
            return (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  leftRefs.current[item.id] = el;
                }}
                disabled={disabled}
                onClick={() =>
                  setActiveLeft(activeLeft === item.id ? null : item.id)
                }
                className={`flex w-full items-center gap-2.5 rounded-full border px-3 py-2.5 text-start font-mono text-sm font-medium transition ${
                  active
                    ? "border-sky-300 bg-sky-400/15 text-sky-50 ring-2 ring-sky-300/45 shadow-[0_0_18px_rgba(56,189,248,0.22)]"
                    : color
                      ? "text-white"
                      : "border-white/12 bg-slate-950/55 text-sky-100 hover:border-sky-300/30"
                }`}
                style={
                  color
                    ? { borderColor: `${color}99`, background: `${color}22` }
                    : undefined
                }
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-sky-300"
                  style={color ? { background: color } : undefined}
                />
                {loc(item.label, locale)}
              </button>
            );
          })}
        </div>
        <div className="relative z-[1] space-y-2.5">
          {question.right.map((item) => {
            const leftId = Object.entries(pairs).find(([, r]) => r === item.id)?.[0];
            const color = leftId ? pairColor(leftId) : null;
            return (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  rightRefs.current[item.id] = el;
                }}
                disabled={disabled || !activeLeft}
                onClick={() => {
                  if (!activeLeft) return;
                  onChange({ pairs: { ...pairs, [activeLeft]: item.id } });
                  setActiveLeft(null);
                }}
                className={`w-full rounded-full border px-3 py-2.5 text-start text-sm font-medium transition ${
                  color
                    ? "text-white"
                    : "border-white/12 bg-slate-950/55 text-slate-200 disabled:opacity-50"
                }`}
                style={
                  color
                    ? { borderColor: `${color}99`, background: `${color}22` }
                    : undefined
                }
              >
                {loc(item.label, locale)}
              </button>
            );
          })}
        </div>
      </div>

      {Object.keys(pairs).length > 0 ? (
        <ul className="mt-3 space-y-1.5 sm:hidden">
          {Object.entries(pairs).map(([leftId, rightId], index) => {
            const left = question.left.find((item) => item.id === leftId);
            const right = question.right.find((item) => item.id === rightId);
            if (!left || !right) return null;
            const color = PAIR_COLORS[index % PAIR_COLORS.length];
            const ok = !revealed || question.correctPairs[leftId] === rightId;
            return (
              <li
                key={leftId}
                className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                style={{
                  borderColor: `${ok ? color : "#fb7185"}55`,
                  background: `${ok ? color : "#fb7185"}14`,
                }}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: ok ? color : "#fb7185" }}
                />
                <span className="min-w-0 flex-1 font-mono text-slate-100">
                  {loc(left.label, locale)}
                </span>
                <span className="text-slate-500">→</span>
                <span className="min-w-0 flex-1 text-slate-200">
                  {loc(right.label, locale)}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function wrapQuizPreview(html: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8" />
<style>
  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
    padding: 10px 12px;
    background: #0b1220;
    color: #e2e8f0;
    font: 13px/1.4 ui-sans-serif, system-ui, sans-serif;
  }
  details {
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 10px 12px;
    background: #111827;
  }
  summary {
    cursor: pointer;
    font-weight: 650;
    color: #f8fafc;
  }
  p { margin: 10px 0 0; color: #94a3b8; }
  table { border-collapse: collapse; width: 100%; color: #e2e8f0; }
  th, td { padding: 5px 8px; text-align: start; border-bottom: 1px solid #1e293b; }
  th { color: #f8fafc; }
  caption { text-align: start; font-weight: 700; margin-bottom: 6px; color: #7dd3fc; }
</style></head><body>${html}</body></html>`;
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
      <div className="relative mb-4 h-40 overflow-hidden rounded-2xl border border-sky-400/20 bg-slate-950 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.08)]">
        <iframe
          title="before"
          sandbox=""
          srcDoc={wrapQuizPreview(question.beforeHtml)}
          scrolling="no"
          className="absolute inset-0 h-full w-full overflow-hidden bg-slate-950 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <iframe
          title="after"
          sandbox=""
          srcDoc={wrapQuizPreview(question.afterHtml)}
          scrolling="no"
          className="absolute inset-0 h-full w-full overflow-hidden bg-slate-950 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-sky-300/80 shadow-[0_0_12px_rgba(56,189,248,0.55)]"
          style={{ left: `${pos}%` }}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-slate-950 via-slate-950/90 to-transparent px-3 pb-2.5 pt-8">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {locale === "ar" ? "قبل" : "Before"}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-700 accent-sky-300 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-300 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,189,248,0.55)]"
            aria-label="Compare"
          />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {locale === "ar" ? "بعد" : "After"}
          </span>
        </div>
      </div>
      <div className="grid gap-2">
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
    const kind = treeNodeKind(node.tag, Boolean(node.children?.length));
    const caption = node.label ? loc(node.label, locale) : "";
    return (
      <div style={{ marginInlineStart: depth * 18 }}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(node.id)}
          className={`mb-2 flex w-full max-w-md items-center gap-2.5 rounded-full border px-3 py-2 text-start shadow-[0_0_18px_rgba(15,23,42,0.35)] ${
            isOk
              ? "border-emerald-400 bg-emerald-400/15 text-emerald-100 ring-2 ring-emerald-300/30"
              : isSel
                ? "border-sky-300 bg-sky-400/15 text-sky-50 ring-2 ring-sky-300/45 shadow-[0_0_20px_rgba(56,189,248,0.22)]"
                : NODE_SHELL[kind]
          }`}
        >
          <span
            aria-hidden
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${NODE_DOT[kind]}`}
          />
          <span className="font-mono text-[13px] font-medium tracking-tight">
            &lt;{node.tag}&gt;
          </span>
          {caption ? (
            <span className="truncate text-[12px] font-sans font-normal text-slate-400">
              {caption}
            </span>
          ) : null}
        </button>
        {node.children?.map((c) => (
          <Node key={c.id} node={c} depth={depth + 1} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Prompt question={question} />
      <div className="relative rounded-2xl border border-white/10 bg-slate-950/60 p-4 ps-5">
        <span
          aria-hidden
          className="absolute start-[1.35rem] top-6 bottom-6 w-px bg-white/15"
        />
        <div className="relative z-[1]">
          <Node node={question.tree} depth={0} />
        </div>
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
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              revealed && bp.id === question.correctBreakpointId
                ? "border-emerald-400 text-emerald-100 ring-1 ring-emerald-300/30"
                : selected === bp.id
                  ? "border-sky-300 bg-sky-400/15 text-sky-50 ring-1 ring-sky-300/40"
                  : "border-white/12 text-slate-400 hover:border-sky-300/30"
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
      <div className="mt-3 grid gap-2">
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
  const { locale } = useLanguage();
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
          placeholder={t("levelQuizConsolePlaceholder", locale)}
          dir="ltr"
        />
      </div>
    </div>
  );
}

function ShakeHint() {
  const { locale } = useLanguage();
  return (
    <p className="mt-2 text-base text-rose-300">
      {t("levelQuizShakeHint", locale)}
    </p>
  );
}

function Glow() {
  return <div className="mt-2 h-1 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.6)]" />;
}
