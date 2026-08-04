"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
  type SandpackFiles,
} from "@codesandbox/sandpack-react";
import {
  Check,
  Columns2,
  Copy,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Rows2,
  ArrowLeftRight,
  Terminal,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { useSound } from "@/context/SoundContext";
import { loc, t } from "@/content/i18n/ui-strings";
import { DEMO_IMG_PATH, STUDENTS_CODING_SVG } from "@/lib/demo-assets";
import { RTL_FLIP } from "@/lib/rtl";
import type { CodeExample, TrackId } from "@/lib/types";

interface CodeRunnerProps {
  examples: CodeExample[];
  /** When set (e.g. from CheatSheet), overrides the active example code. */
  seedCode?: string | null;
  onClearSeed?: () => void;
}

type SplitOrientation = "side" | "stack";

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
    mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    size: "14px",
    lineHeight: "1.7",
  },
};

const PREVIEW_BODY_CSS =
  "body { margin: 1rem; font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a; } img, video, iframe { max-width: 100%; height: auto; }";

/** Keep source/preview shell LTR; preserve an explicit dir= on lesson demos (e.g. RTL lesson). */
function ensureLtrHtmlDocument(
  code: string,
  headPreview: { title: string; body: string },
): string {
  const trimmed = code.trim();

  if (/<!DOCTYPE/i.test(trimmed) || /<html[\s>]/i.test(trimmed)) {
    let doc = trimmed;
    if (!/<html[^>]*\bdir\s*=/i.test(doc)) {
      doc = doc.replace(/<html(\s|>)/i, '<html dir="ltr"$1');
    }
    // Keep large lesson images visible inside the narrow preview pane.
    if (!/img\s*,\s*video\s*,\s*iframe\s*\{[^}]*max-width/i.test(doc)) {
      const previewStyle = `<style data-fc-preview>${PREVIEW_BODY_CSS}</style>`;
      if (/<\/head>/i.test(doc)) {
        doc = doc.replace(/<\/head>/i, `${previewStyle}</head>`);
      } else if (/<body\b/i.test(doc)) {
        doc = doc.replace(/<body\b[^>]*>/i, (m) => `${m}${previewStyle}`);
      }
    }
    return doc;
  }

  // Head-only lesson templates (meta/social) — mount into a readable document.
  if (/^<head\b/i.test(trimmed) && !/<body\b/i.test(trimmed)) {
    return `<!DOCTYPE html>
<html lang="en" dir="ltr">
${trimmed}
  <body>
    <style>${PREVIEW_BODY_CSS}</style>
    <main>
      <h1>${headPreview.title}</h1>
      <p>${headPreview.body}</p>
    </main>
  </body>
</html>`;
  }

  const bodyOnly = trimmed.match(/^<body\b[^>]*>([\s\S]*)<\/body>\s*$/i);
  const inner = bodyOnly ? bodyOnly[1].trim() : trimmed;

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Document</title>
    <style>${PREVIEW_BODY_CSS}</style>
  </head>
  <body>
${inner}
  </body>
</html>`;
}

function isHtmlTrack(trackId: TrackId) {
  return (
    trackId === "html" ||
    trackId === "css" ||
    trackId === "tailwind" ||
    trackId === "accessibility" ||
    trackId === "seo"
  );
}

function SplitToggle({
  orientation,
  editorFirst,
  onOrientation,
  onSwap,
}: {
  orientation: SplitOrientation;
  editorFirst: boolean;
  onOrientation: (next: SplitOrientation) => void;
  onSwap: () => void;
}) {
  const { locale } = useLanguage();
  const { playClick } = useSound();

  const btn = (active: boolean) =>
    `inline-flex h-7 w-7 items-center justify-center rounded-md transition ${
      active
        ? "bg-white/10 text-cyan-200"
        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
    }`;

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="group"
      aria-label={t("splitLayout", locale)}
    >
      <button
        type="button"
        title={t("splitSideBySide", locale)}
        aria-label={t("splitSideBySide", locale)}
        aria-pressed={orientation === "side"}
        onClick={() => {
          playClick();
          onOrientation("side");
        }}
        className={btn(orientation === "side")}
      >
        <Columns2 size={14} />
      </button>
      <button
        type="button"
        title={t("splitStacked", locale)}
        aria-label={t("splitStacked", locale)}
        aria-pressed={orientation === "stack"}
        onClick={() => {
          playClick();
          onOrientation("stack");
        }}
        className={btn(orientation === "stack")}
      >
        <Rows2 size={14} />
      </button>
      <button
        type="button"
        title={t("splitSwap", locale)}
        aria-label={t("splitSwap", locale)}
        aria-pressed={!editorFirst}
        onClick={() => {
          playClick();
          onSwap();
        }}
        className={btn(!editorFirst)}
      >
        <ArrowLeftRight size={14} />
      </button>
    </div>
  );
}

function IconAction({
  label,
  onClick,
  pressed,
  disabled,
  accent,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition disabled:opacity-50 ${
        accent
          ? "bg-gradient-to-br from-yellow-300 to-cyan-300 text-slate-950 hover:brightness-110"
          : pressed
            ? "bg-white/10 text-cyan-200"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

/** Soft flash on the preview frame when live code changes. */
function PreviewPulse({ children }: { children: ReactNode }) {
  const { sandpack } = useSandpack();
  const [pulse, setPulse] = useState(false);
  const prevCode = useRef<string | null>(null);
  const codeSignature = useMemo(
    () =>
      Object.keys(sandpack.files)
        .sort()
        .map((path) => `${path}:${sandpack.files[path]?.code ?? ""}`)
        .join("\n"),
    [sandpack.files],
  );

  useEffect(() => {
    if (prevCode.current === null) {
      prevCode.current = codeSignature;
      return;
    }
    if (prevCode.current === codeSignature) return;
    prevCode.current = codeSignature;
    setPulse(true);
    const id = window.setTimeout(() => setPulse(false), 450);
    return () => window.clearTimeout(id);
  }, [codeSignature]);

  return (
    <div
      className={`h-full min-h-0 transition-shadow duration-300 ${
        pulse ? "preview-pulse" : ""
      }`}
    >
      {children}
    </div>
  );
}

function RunControls({
  sourceCode,
  fullscreen,
  onToggleFullscreen,
  showSplit,
  orientation,
  editorFirst,
  onOrientation,
  onSwap,
}: {
  sourceCode: string;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  showSplit: boolean;
  orientation: SplitOrientation;
  editorFirst: boolean;
  onOrientation: (next: SplitOrientation) => void;
  onSwap: () => void;
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
    <div className="flex flex-col gap-2 border-b border-white/10 px-3 py-2 lg:flex-row lg:items-center lg:gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-sm text-slate-200">
          <Terminal size={14} className="shrink-0 text-yellow-300" />
          <span className="truncate font-medium">{t("playground", locale)}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-0.5 ps-5 lg:ps-0">
        {showSplit ? (
          <>
            <SplitToggle
              orientation={orientation}
              editorFirst={editorFirst}
              onOrientation={onOrientation}
              onSwap={onSwap}
            />
            <span className="mx-1 h-4 w-px bg-white/10" aria-hidden />
          </>
        ) : null}
        <IconAction
          label={
            fullscreen
              ? t("playgroundExitFullscreen", locale)
              : t("playgroundFullscreen", locale)
          }
          pressed={fullscreen}
          onClick={() => {
            playClick();
            onToggleFullscreen();
          }}
        >
          {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </IconAction>
        <IconAction label={t("restoreCode", locale)} onClick={handleRestore}>
          <RotateCcw size={14} />
        </IconAction>
        <IconAction
          label={copied ? t("copied", locale) : t("copy", locale)}
          onClick={handleCopy}
        >
          {copied ? (
            <Check size={14} className="text-cyan-300" />
          ) : (
            <Copy size={14} />
          )}
        </IconAction>
        <IconAction
          label={running ? t("running", locale) : t("run", locale)}
          onClick={handleRun}
          disabled={running}
          accent
        >
          <Play size={14} className={RTL_FLIP} />
        </IconAction>
      </div>
    </div>
  );
}

function PanelChrome({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-0 min-w-0 flex-col overflow-hidden border-white/10 ${className}`}
    >
      <p className="shrink-0 border-b border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function CodeRunnerInner({
  code,
  trackId,
}: {
  code: string;
  trackId: TrackId;
}) {
  const htmlMode = isHtmlTrack(trackId);
  const { locale } = useLanguage();
  const [fullscreen, setFullscreen] = useState(false);
  const [orientation, setOrientation] = useState<SplitOrientation>("side");
  const [editorFirst, setEditorFirst] = useState(true);

  const files = useMemo((): SandpackFiles => {
    if (htmlMode) {
      return {
        "/index.html": {
          code: ensureLtrHtmlDocument(code, {
            title: t("headPreviewTitle", locale),
            body: t("headPreviewBody", locale),
          }),
          active: true,
        },
        // Local demo image so <img src="students-coding.svg"> works offline in preview.
        [`/${DEMO_IMG_PATH}`]: { code: STUDENTS_CODING_SVG },
      };
    }
    return { "/index.js": { code, active: true } };
  }, [code, htmlMode, locale]);

  useEffect(() => {
    if (!fullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setFullscreen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen]);

  const paneHeight = "100%";
  const workspaceClass = fullscreen
    ? "h-full min-h-0 flex-1"
    : "h-[min(68vh,560px)] min-h-[420px]";

  const splitGridClass =
    orientation === "side"
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-rows-2 grid-rows-[minmax(0,1fr)_minmax(0,1fr)]";

  const editorPanel = (
    <PanelChrome
      label={htmlMode ? t("editorHtml", locale) : t("editorJs", locale)}
      className="h-full"
    >
      <div dir="ltr" className="h-full min-h-0">
        <SandpackCodeEditor
          showLineNumbers
          showInlineErrors
          showRunButton={false}
          wrapContent
          className="!h-full !min-h-0 !rounded-none [&_.cm-editor]:!h-full [&_.cm-editor]:!text-start [&_.cm-scroller]:!h-full"
          style={{ height: paneHeight, direction: "ltr" }}
        />
      </div>
    </PanelChrome>
  );

  const outputPanel = htmlMode ? (
    <PanelChrome label={t("preview", locale)} className="h-full">
      <PreviewPulse>
        <div dir="ltr" className="h-full min-h-0">
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            showRestartButton={false}
            showNavigator={false}
            className="!h-full !min-h-0 !rounded-none [&_.sp-preview-container]:!h-full [&_iframe]:!h-full"
            style={{ height: paneHeight, flex: 1, direction: "ltr" }}
          />
        </div>
      </PreviewPulse>
    </PanelChrome>
  ) : (
    <PanelChrome label={t("output", locale)} className="h-full">
      <SandpackConsole
        showHeader={false}
        showSyntaxError
        style={{ height: paneHeight }}
        className="!h-full !bg-transparent font-mono text-sm [&_.sp-console-item]:!text-yellow-200"
      />
    </PanelChrome>
  );

  const panels = editorFirst
    ? [editorPanel, outputPanel]
    : [outputPanel, editorPanel];

  return (
    <section
      className={
        fullscreen
          ? "fixed inset-0 z-[80] flex h-dvh max-h-dvh flex-col overflow-hidden border-0 bg-slate-950 shadow-none"
          : "overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-[0_0_40px_rgba(15,23,42,0.5)]"
      }
      aria-modal={fullscreen || undefined}
      role={fullscreen ? "dialog" : undefined}
      aria-label={
        fullscreen ? t("playgroundFullscreen", locale) : undefined
      }
    >
      <SandpackProvider
        template={htmlMode ? "static" : "vanilla"}
        theme={sandpackTheme}
        files={files}
        options={{
          autorun: true,
          autoReload: true,
          recompileMode: "delayed",
          recompileDelay: 400,
          classes: {
            "sp-wrapper": fullscreen
              ? "!bg-transparent !border-0 !rounded-none !flex !min-h-0 !h-full !flex-1 !flex-col"
              : "!bg-transparent !border-0 !rounded-none !flex !flex-col",
            "sp-layout": "!bg-transparent !border-0 !rounded-none !flex !min-h-0 !h-full !flex-1 !flex-col",
            "sp-stack": "!bg-slate-950 !h-full !min-h-0",
            "sp-editor": "!bg-slate-950 !h-full !min-h-0",
            "sp-code-editor": "!h-full !min-h-0",
            "sp-tabs": "!bg-slate-950 !border-white/10",
            "sp-console": "!bg-black/40 !border-white/10 !h-full",
            "sp-preview": "!h-full !min-h-0 !flex !flex-col",
            "sp-preview-container": "!bg-slate-950 !h-full !min-h-0 !flex-1",
            "sp-preview-iframe": "!bg-white !h-full !min-h-0",
          },
        }}
      >
        <div className="shrink-0">
          <RunControls
            sourceCode={code}
            fullscreen={fullscreen}
            onToggleFullscreen={() => setFullscreen((value) => !value)}
            showSplit
            orientation={orientation}
            editorFirst={editorFirst}
            onOrientation={setOrientation}
            onSwap={() => setEditorFirst((v) => !v)}
          />
        </div>
        <div className={`grid min-h-0 ${splitGridClass} ${workspaceClass}`}>
          <div
            className={`flex min-h-0 min-w-0 flex-col overflow-hidden ${
              orientation === "side"
                ? "border-b border-white/10 sm:border-b-0 sm:border-e"
                : "border-b border-white/10"
            }`}
          >
            {panels[0]}
          </div>
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
            {panels[1]}
          </div>
        </div>
      </SandpackProvider>
    </section>
  );
}

export function CodeRunner({
  examples,
  seedCode,
  onClearSeed,
}: CodeRunnerProps) {
  const { locale } = useLanguage();
  const { trackId } = useProgress();
  const { playClick } = useSound();
  const safeExamples =
    examples.length > 0
      ? examples
      : [
          {
            id: "simple" as const,
            label: { en: "Simple", ar: "بسيط" },
            code: "// empty",
            expectedOutput: { en: "", ar: "" },
          },
        ];
  const [activeId, setActiveId] = useState(safeExamples[0].id);
  const active =
    safeExamples.find((ex) => ex.id === activeId) ?? safeExamples[0];
  const seeded = Boolean(seedCode?.trim());
  const runnerCode = seeded ? seedCode! : active.code;

  return (
    <div className="space-y-3" dir={locale === "ar" ? "rtl" : "ltr"}>
      {seeded ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2.5">
          <p className="text-xs font-medium text-emerald-100 sm:text-sm">
            {t("cheatSeedBanner", locale)}
          </p>
          {onClearSeed ? (
            <button
              type="button"
              onClick={() => {
                playClick();
                onClearSeed();
              }}
              className="shrink-0 rounded-full border border-emerald-300/35 bg-emerald-300/15 px-3 py-1 text-[11px] font-semibold text-emerald-50 hover:bg-emerald-300/25"
            >
              {t("cheatSeedClear", locale)}
            </button>
          ) : null}
        </div>
      ) : (
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
                : ex.id === "simple"
                  ? t("exampleSimple", locale)
                  : loc(ex.label, locale);
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
      )}
      <CodeRunnerInner
        key={`${trackId}-${seeded ? "seed" : active.id}-${runnerCode.slice(0, 48)}`}
        code={runnerCode}
        trackId={trackId}
      />
    </div>
  );
}
