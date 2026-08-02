"use client";

import { useMemo, useState } from "react";
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
  type SandpackFiles,
} from "@codesandbox/sandpack-react";
import { Check, Copy, Play, RotateCcw, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import { loc, t } from "@/content/i18n/ui-strings";
import type { CodeExample, TrackId } from "@/lib/types";

interface CodeRunnerProps {
  examples: CodeExample[];
}

const sandpackTheme = {
  colors: {
    surface1: "#020617",
    surface2: "#0f172a",
    surface3: "#1e293b",
    clickable: "#67e8f9",
    base: "#e2e8f0",
    disabled: "#64748b",
    hover: "#fde047",
    accent: "#fde047",
    error: "#f87171",
    errorSurface: "#450a0a",
  },
  syntax: {
    plain: "#e2e8f0",
    comment: {
      color: "#64748b",
      fontStyle: "italic" as const,
    },
    keyword: "#22d3ee",
    tag: "#fde047",
    punctuation: "#94a3b8",
    definition: "#67e8f9",
    property: "#a5f3fc",
    static: "#fde047",
    string: "#86efac",
  },
  font: {
    body: "inherit",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    size: "13px",
    lineHeight: "1.65",
  },
};

function wrapHtmlSnippet(code: string): string {
  if (/<!DOCTYPE/i.test(code) || /<html[\s>]/i.test(code)) return code;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FrontendCraft Playground</title>
    <style>
      body {
        margin: 0;
        padding: 1.25rem;
        font-family: ui-sans-serif, system-ui, sans-serif;
        background: #0f172a;
        color: #e2e8f0;
        line-height: 1.5;
      }
      a { color: #67e8f9; }
    </style>
  </head>
  <body>
${code}
  </body>
</html>`;
}

function isHtmlTrack(trackId: TrackId) {
  return trackId === "html" || trackId === "css" || trackId === "tailwind";
}

function RunControls({
  sourceCode,
  expectedHint,
}: {
  sourceCode: string;
  expectedHint: string;
}) {
  const { locale } = useLanguage();
  const { playClick } = useSound();
  const { sandpack } = useSandpack();
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);

  async function handleCopy() {
    playClick();
    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function handleRun() {
    playClick();
    setRunning(true);
    sandpack.runSandpack();
    window.setTimeout(() => setRunning(false), 400);
  }

  function handleRestore() {
    playClick();
    sandpack.resetAllFiles();
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-slate-200">
        <Terminal size={16} className="text-yellow-300" />
        <span className="font-medium">{t("playground", locale)}</span>
        <span className="hidden text-[11px] text-slate-500 sm:inline">
          · {t("liveSandbox", locale)}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleRestore}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10"
        >
          <RotateCcw size={14} />
          {t("restoreCode", locale)}
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10"
        >
          {copied ? (
            <Check size={14} className="text-cyan-300" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? t("copied", locale) : t("copy", locale)}
        </button>
        <button
          type="button"
          onClick={handleRun}
          disabled={running}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-300 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:brightness-110 disabled:opacity-70"
        >
          <Play size={14} />
          {running ? t("running", locale) : t("run", locale)}
        </button>
      </div>
      <p className="w-full text-[11px] text-slate-500">
        {t("expectedHint", locale)}:{" "}
        <span className="font-mono text-yellow-200/80">{expectedHint}</span>
      </p>
    </div>
  );
}

function CodeRunnerInner({
  code,
  expectedHint,
  trackId,
}: {
  code: string;
  expectedHint: string;
  trackId: TrackId;
}) {
  const htmlMode = isHtmlTrack(trackId);

  const files = useMemo((): SandpackFiles => {
    if (htmlMode) {
      return { "/index.html": { code: wrapHtmlSnippet(code), active: true } };
    }
    return { "/index.js": { code, active: true } };
  }, [code, htmlMode]);

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-[0_0_40px_rgba(15,23,42,0.5)]">
      <SandpackProvider
        template={htmlMode ? "static" : "vanilla"}
        theme={sandpackTheme}
        files={files}
        options={{
          autorun: false,
          autoReload: false,
          recompileMode: "delayed",
          recompileDelay: 300,
          classes: {
            "sp-wrapper": "!bg-transparent !border-0 !rounded-none",
            "sp-layout": "!bg-transparent !border-0 !rounded-none",
            "sp-stack": "!bg-slate-950",
            "sp-editor": "!bg-slate-950",
            "sp-tabs": "!bg-slate-950 !border-white/10",
            "sp-console": "!bg-black/40 !border-white/10",
            "sp-preview-container": "!bg-slate-950",
          },
        }}
      >
        <RunControls sourceCode={code} expectedHint={expectedHint} />
        <SandpackLayout className="!block !rounded-none !border-0">
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            showRunButton={false}
            wrapContent
            className="min-h-[220px] !rounded-none"
            style={{ height: 260 }}
          />
          {htmlMode ? (
            <div className="border-t border-white/10">
              <p className="border-b border-white/10 bg-black/20 px-4 py-2 text-[11px] uppercase tracking-wider text-slate-500">
                Preview
              </p>
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                showRestartButton={false}
                showNavigator={false}
                style={{ height: 220 }}
              />
            </div>
          ) : (
            <div className="border-t border-white/10 bg-black/30">
              <p className="border-b border-white/10 px-4 py-2 text-[11px] uppercase tracking-wider text-slate-500">
                Console
              </p>
              <SandpackConsole
                showHeader={false}
                showSyntaxError
                style={{ height: 160 }}
                className="!bg-transparent font-mono text-sm [&_.sp-console-item]:!text-yellow-200"
              />
            </div>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </section>
  );
}

export function CodeRunner({ examples }: CodeRunnerProps) {
  const { locale } = useLanguage();
  const { trackId } = useProgress();
  const { playClick } = useSound();
  const safeExamples =
    examples.length > 0
      ? examples
      : [
          {
            id: "simple" as const,
            label: { en: "Simple", ar: "Simple" },
            code: "// empty",
            expectedOutput: { en: "", ar: "" },
          },
        ];
  const [activeId, setActiveId] = useState(safeExamples[0].id);
  const active =
    safeExamples.find((ex) => ex.id === activeId) ?? safeExamples[0];
  const expectedHint = loc(active.expectedOutput, locale).replace(/\\n/g, "\n");

  return (
    <div className="space-y-3">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={t("playground", locale)}
      >
        {safeExamples.map((ex) => {
          const selected = ex.id === active.id;
          const label =
            ex.id === "realWorld"
              ? t("exampleRealWorld", locale)
              : t("exampleSimple", locale);
          return (
            <button
              key={ex.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                if (ex.id !== active.id) playClick();
                setActiveId(ex.id);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                selected
                  ? "bg-gradient-to-r from-yellow-300 to-cyan-300 text-slate-950"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <CodeRunnerInner
        key={`${trackId}-${active.id}-${active.code}-${locale}`}
        code={active.code}
        expectedHint={expectedHint}
        trackId={trackId}
      />
    </div>
  );
}
