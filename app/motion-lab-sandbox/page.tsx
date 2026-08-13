"use client";

import { Suspense, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { SoundProvider } from "@/context/SoundContext";
import { PlayPauseButton, useAutoPlay } from "@/components/shared/PlayPauseButton";
import type { Locale } from "@/lib/types";
import { HtmlBeginnerIntroLab } from "./HtmlBeginnerIntroLab";
import { HtmlHintTikTokLab } from "./HtmlHintTikTokLab";
import { HTML_HINTS, HTML_HINT_LAB_IDS } from "./html-hints/hints";
import { HintPostCaption } from "./html-hints/HintPostCaption";
import { isHtmlHintLab, parseHtmlHintLabId } from "./html-hints/types";
import { SandboxVisualizer } from "./SandboxVisualizer";
import { TIKTOK_FRAME_H, TIKTOK_FRAME_W } from "./tiktok-frame";
import "./sandbox-lab.css";

const LOCAL_ONLY = true;

const SHIPPED_LABS: { id: string; label: string; kind: string }[] = [
  { id: "document-tree", label: "Document anatomy", kind: "document-tree" },
  { id: "semantic-blocks", label: "Semantic structure", kind: "semantic-blocks" },
  { id: "heading-ladder", label: "Headings ladder", kind: "heading-ladder" },
  { id: "text-format", label: "Text formatting", kind: "text-format" },
  { id: "link-image", label: "Links & images", kind: "link-image" },
  { id: "list-stack", label: "Lists", kind: "list-stack" },
  { id: "form-flow", label: "Forms", kind: "form-flow" },
  { id: "table-grid", label: "Tables", kind: "table-grid" },
  { id: "details-accordion", label: "Details / accordion", kind: "details-accordion" },
  { id: "a11y-check", label: "Accessibility", kind: "a11y-check" },
  { id: "sr-ready", label: "Screen reader ready", kind: "sr-ready" },
  { id: "seo-crawl", label: "SEO crawl", kind: "seo-crawl" },
  { id: "native-dialog", label: "Native dialog", kind: "native-dialog" },
  { id: "picture-source", label: "Picture / source", kind: "picture-source" },
  { id: "baseline-compat", label: "Browser baseline", kind: "baseline-compat" },
  { id: "html-global-rtl-lab", label: "Global & RTL", kind: "html-global-rtl-lab" },
  { id: "html-pitfalls-lab", label: "Common pitfalls", kind: "html-pitfalls-lab" },
];

const ALL_LAB_IDS = [
  ...HTML_HINT_LAB_IDS,
  "html-beginner",
  ...SHIPPED_LABS.map((l) => l.id),
] as const;
type LabId = (typeof ALL_LAB_IDS)[number];

const HINT_TIKTOK_CLIPS = HTML_HINTS.map((hint) => ({
  lab: `html-hint-${hint.id}` as LabId,
  hook: hint.beats[0].hook,
  seconds: "~15s",
}));

const TIKTOK_CLIPS: {
  lab: LabId;
  hook: { en: string; ar: string };
  seconds: string;
}[] = [
  ...HINT_TIKTOK_CLIPS,
  {
    lab: "html-beginner",
    hook: { en: "HTML in 30 seconds", ar: "HTML في ٣٠ ثانية" },
    seconds: "~30s",
  },
  {
    lab: "document-tree",
    hook: { en: "Anatomy of a web page", ar: "تشريح صفحة الويب" },
    seconds: "~25s",
  },
  {
    lab: "semantic-blocks",
    hook: { en: "Semantic HTML explained", ar: "HTML الدلالي ببساطة" },
    seconds: "~30s",
  },
  {
    lab: "heading-ladder",
    hook: { en: "One h1 only — here's why", ar: "ليه عنوان h1 واحد بس؟" },
    seconds: "~20s",
  },
  {
    lab: "link-image",
    hook: { en: "Links & images done right", ar: "اللينكات والصور الصح" },
    seconds: "~25s",
  },
  {
    lab: "form-flow",
    hook: { en: "How HTML forms work", ar: "الفورم في HTML" },
    seconds: "~30s",
  },
];

const UI = {
  pickLab: { en: "Pick a lab", ar: "اختار المعمل" },
  htmlHintsGroup: { en: "HTML hints · TikTok clips", ar: "تلميحات HTML · تيك توك" },
  recordView: { en: "Record view (9:16)", ar: "وضع التسجيل (9:16)" },
  recordClean: { en: "Clean frame", ar: "إطار نظيف" },
  lang: { en: "Language", ar: "اللغة" },
  exit: { en: "Exit · Esc", ar: "خروج · Esc" },
  recordHint: {
    en: "1080×1920 · 9:16 frame · Space = play/pause · ~5s per beat",
    ar: "1080×1920 · إطار 9:16 · مسافة = تشغيل · ~٥ ثواني لكل مشهد",
  },
  title: { en: "Motion lab playground", ar: "معمل الحركة" },
  subtitle: {
    en: "Preview labs and record TikTok clips in English or Arabic.",
    ar: "جرّب المعامل وسجّل مقاطع تيك توك بالإنجليزي أو العربي.",
  },
  tipsTitle: { en: "TikTok recording workflow", ar: "خطوات التسجيل لتيك توك" },
  clipIdeas: { en: "Clip ideas (both languages)", ar: "أفكار مقاطع (اللغتين)" },
  useClip: { en: "Use for record", ar: "استخدم للتسجيل" },
  sandboxBadge: { en: "Local sandbox — gitignored", ar: "محلي — مش على Git" },
} as const;

function isLabId(value: string | null): value is LabId {
  return value != null && (ALL_LAB_IDS as readonly string[]).includes(value);
}

function labLabel(id: LabId, locale: Locale): string {
  const hintId = parseHtmlHintLabId(id);
  if (hintId) {
    const hint = HTML_HINTS.find((h) => h.id === hintId);
    return hint ? (locale === "ar" ? hint.title.ar : hint.title.en) : id;
  }
  if (id === "html-beginner") {
    return locale === "ar" ? "HTML للمبتدئين" : "HTML for absolute beginners";
  }
  const shipped = SHIPPED_LABS.find((l) => l.id === id);
  return shipped?.label ?? id;
}

const RECORD_LAB_FRAME_CLASS =
  "sandbox-lab-frame flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80";

/** Landscape preview for shipped motion labs */
const SANDBOX_LAB_H = "34rem";

function t<K extends keyof typeof UI>(key: K, locale: Locale): string {
  return UI[key][locale];
}

function LanguageToggle({ compact }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();
  return (
    <div
      className={`inline-flex rounded-full border border-white/15 bg-slate-900/80 p-0.5 ${compact ? "" : ""}`}
      role="group"
      aria-label="Language"
    >
      {(["en", "ar"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
            locale === code
              ? "bg-cyan-400/20 text-cyan-100"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {code === "en" ? "EN" : "عربي"}
        </button>
      ))}
    </div>
  );
}

function MotionLabSandboxInner() {
  const searchParams = useSearchParams();
  const { locale, setLocale } = useLanguage();
  const ar = locale === "ar";
  const initialLab = searchParams.get("lab");
  const [lab, setLab] = useState<LabId>(
    isLabId(initialLab) ? initialLab : "html-hint-alt",
  );
  const [recordMode, setRecordMode] = useState(false);
  const [cleanFrame, setCleanFrame] = useState(false);
  const [labEpoch, setLabEpoch] = useState(0);
  const { playing, toggle, setPlaying } = useAutoPlay(true);

  const labFromUrl = searchParams.get("lab");
  const langFromUrl = searchParams.get("lang");
  const recordFromUrl = searchParams.get("record");

  useEffect(() => {
    if (isLabId(labFromUrl)) setLab(labFromUrl);
    if (langFromUrl === "en" || langFromUrl === "ar") setLocale(langFromUrl);
    if (recordFromUrl === "1") {
      setPlaying(true);
      setRecordMode(true);
      setLabEpoch((n) => n + 1);
    }
  }, [labFromUrl, langFromUrl, recordFromUrl, setLocale, setPlaying]);

  // Keep the address bar in sync when picking a lab from the dropdown
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("lab") === lab) return;
    url.searchParams.set("lab", lab);
    window.history.replaceState(null, "", url.toString());
  }, [lab]);

  useEffect(() => {
    if (!recordMode) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setRecordMode(false);
      if (
        (isHtmlHintLab(lab) || lab === "html-beginner") &&
        e.key === " " &&
        e.target === document.body
      ) {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [recordMode, lab, toggle]);

  function enterRecordMode(nextLab?: LabId) {
    if (nextLab) setLab(nextLab);
    setPlaying(true);
    setLabEpoch((n) => n + 1);
    setRecordMode(true);
  }

  const hintId = parseHtmlHintLabId(lab);
  const isHint = hintId != null;

  const frameVars = isHint
    ? ({ "--sandbox-lab-h": TIKTOK_FRAME_H, "--sandbox-lab-w": TIKTOK_FRAME_W } as CSSProperties)
    : ({ "--sandbox-lab-h": SANDBOX_LAB_H } as CSSProperties);

  const labContent = (
    <SandboxLabViewport key={`${lab}-${labEpoch}-${locale}`}>
      {hintId ? (
        <HtmlHintTikTokLab
          hintId={hintId}
          playing={playing}
          recordPace={recordMode}
        />
      ) : lab === "html-beginner" ? (
        <HtmlBeginnerIntroLab playing={playing} recordPace={recordMode} />
      ) : (
        <SandboxVisualizer kind={lab} />
      )}
    </SandboxLabViewport>
  );

  const labPicker = (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-md">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {t("pickLab", locale)}
      </span>
      <select
        value={lab}
        onChange={(e) => setLab(e.target.value as LabId)}
        className="rounded-xl border border-white/15 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-400/40 focus:ring-2"
      >
        <option value="html-beginner">
          {ar ? "★ HTML للمبتدئين" : "★ HTML for absolute beginners"}
        </option>
        <optgroup label={t("htmlHintsGroup", locale)}>
          {HTML_HINTS.map((hint) => (
            <option key={hint.id} value={`html-hint-${hint.id}`}>
              {ar ? hint.title.ar : hint.title.en}
            </option>
          ))}
        </optgroup>
        <optgroup label={ar ? "معامل HTML" : "Shipped HTML motion labs"}>
          {SHIPPED_LABS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  );

  if (recordMode) {
    return (
      <div
        className={`record-mode fixed inset-0 z-50 flex flex-col bg-black ${cleanFrame ? "record-mode--clean" : ""} ${hintId ? "record-mode--with-hint-caption" : ""}`}
        style={
          {
            "--sandbox-lab-h": TIKTOK_FRAME_H,
            "--sandbox-lab-w": TIKTOK_FRAME_W,
          } as CSSProperties
        }
      >
          <div className="record-mode-chrome flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/5 px-4 py-3">
            <p className="min-w-0 truncate text-xs text-slate-400">
              {labLabel(lab, locale)} · {locale.toUpperCase()}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <LanguageToggle compact />
              <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-slate-400">
                <input
                  type="checkbox"
                  checked={cleanFrame}
                  onChange={(e) => setCleanFrame(e.target.checked)}
                  className="rounded border-white/20"
                />
                {t("recordClean", locale)}
              </label>
              {isHtmlHintLab(lab) || lab === "html-beginner" ? (
                <PlayPauseButton playing={playing} onToggle={toggle} />
              ) : null}
              <button
                type="button"
                onClick={() => setRecordMode(false)}
                className="rounded-full border border-white/15 bg-slate-900 px-3 py-1 text-[11px] font-semibold text-slate-200 hover:bg-slate-800"
              >
                {t("exit", locale)}
              </button>
            </div>
          </div>

          <div
            className={`record-mode-stage flex min-h-0 flex-1 flex-col items-center gap-4 px-2 pb-2 ${
              hintId ? "record-mode-stage--with-caption" : ""
            }`}
          >
            <div
              data-record-frame
              className={`${RECORD_LAB_FRAME_CLASS} record-frame tiktok-record-frame`}
            >
              {labContent}
            </div>
            {hintId ? (
              <div className="record-mode-caption w-full max-w-md shrink-0">
                <HintPostCaption hintId={hintId} compact />
              </div>
            ) : null}
          </div>

          <p className="record-mode-footer shrink-0 px-4 pb-3 text-center text-[10px] leading-relaxed text-slate-600">
            {t("recordHint", locale)}
          </p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-dvh max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="inline-flex rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-100">
            {t("sandboxBadge", locale)}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
            {t("title", locale)}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            {t("subtitle", locale)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {t("lang", locale)}
          </span>
          <LanguageToggle />
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        {labPicker}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => enterRecordMode()}
            className="rounded-full border border-rose-400/35 bg-rose-400/10 px-3 py-1.5 text-[11px] font-semibold text-rose-100 hover:bg-rose-400/20"
          >
            {t("recordView", locale)}
          </button>
          {isHtmlHintLab(lab) || lab === "html-beginner" ? (
            <PlayPauseButton playing={playing} onToggle={toggle} />
          ) : null}
        </div>
      </div>

      <div className={isHint ? "flex flex-col items-center" : undefined}>
        <div
          className={`${RECORD_LAB_FRAME_CLASS} ${isHint ? "tiktok-preview-frame" : ""}`}
          style={frameVars}
        >
          {labContent}
        </div>
        {hintId ? (
          <div className="mt-5 w-full max-w-md">
            <HintPostCaption hintId={hintId} />
          </div>
        ) : null}
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          {t("clipIdeas", locale)}
        </h2>
        <ul className="space-y-2">
          {TIKTOK_CLIPS.map((clip) => (
            <li
              key={clip.lab}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/5 bg-slate-950/50 px-3 py-2.5"
            >
              <div className="min-w-0 text-sm">
                <p className="font-medium text-slate-200">
                  {ar ? clip.hook.ar : clip.hook.en}
                </p>
                <p className="text-xs text-slate-500">
                  {clip.seconds} · {labLabel(clip.lab, locale)}
                </p>
                <p className="mt-0.5 text-xs text-slate-600" dir={ar ? "ltr" : "rtl"}>
                  {ar ? clip.hook.en : clip.hook.ar}
                </p>
              </div>
              <button
                type="button"
                onClick={() => enterRecordMode(clip.lab)}
                className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-100 hover:bg-cyan-400/20"
              >
                {t("useClip", locale)}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:p-5">
        <h2 className="mb-2 text-sm font-semibold text-slate-200">
          {t("tipsTitle", locale)}
        </h2>
        <ol className="list-decimal space-y-2 ps-4 text-sm leading-relaxed text-slate-400">
          <li>
            {ar
              ? "اختار EN أو عربي مصري من فوق — سجّل نسختين لنفس المقطع لو حابب."
              : "Pick EN or Egyptian Arabic above — record the same clip twice for both audiences."}
          </li>
          <li>
            {ar
              ? "اضغط «وضع التسجيل» أو زر «استخدم للتسجيل» من قائمة الأفكار."
              : "Hit Record view or Use for record on a clip idea."}
          </li>
          <li>
            {ar
              ? "فعّل «إطار نظيف» يخفي شريط الكود وقت التسجيل."
              : "Turn on Clean frame to hide the code strip while recording."}
          </li>
          <li>
            {ar
              ? "سجّل الإطار المنقط فقط — OBS أو CapCut — 1080×1920."
              : "Crop to the dashed frame in OBS or CapCut — export 1080×1920."}
          </li>
          <li>
            {ar
              ? "كل خطوة ~٥ ثواني — خلّي ٢–٣ خطوات لكل مقطع."
              : "Each step is ~5s — capture 2–3 steps per clip."}
          </li>
        </ol>
        <p className="mt-3 font-mono text-[11px] text-slate-500" dir="ltr">
          /motion-lab-sandbox?lab=document-tree&amp;lang=ar&amp;record=1
        </p>
      </section>

      {LOCAL_ONLY ? (
        <p className="mt-6 text-center text-[11px] text-slate-600">
          {ar ? "التغييرات هنا محلية بس." : "Changes in this folder stay on your machine only."}
        </p>
      ) : null}
    </div>
  );
}

function SandboxLabViewport({ children }: { children: ReactNode }) {
  return (
    <div data-motion-lab-sandbox className="flex-1">
      {children}
    </div>
  );
}

export default function MotionLabSandboxPage() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <Suspense
          fallback={
            <div className="flex min-h-dvh items-center justify-center text-sm text-slate-500">
              Loading…
            </div>
          }
        >
          <MotionLabSandboxInner />
        </Suspense>
      </SoundProvider>
    </LanguageProvider>
  );
}
