"use client";

import { useMemo } from "react";

/** Turn the beat's HTML snippet into something visible in the phone preview. */
function toPreviewHtml(code: string): {
  html: string;
  plain?: string;
  dir?: "ltr" | "rtl";
  lang?: string;
} {
  const trimmed = code.trim();

  const langMatch = trimmed.match(/\blang\s*=\s*["']([^"']+)["']/i);
  const dirMatch = trimmed.match(/\bdir\s*=\s*["'](rtl|ltr)["']/i);
  const lang = langMatch?.[1];
  // Arabic lang implies RTL in the tip preview (unless dir is explicitly ltr)
  const dir: "ltr" | "rtl" | undefined = dirMatch
    ? (dirMatch[1] as "ltr" | "rtl")
    : lang === "ar"
      ? "rtl"
      : lang
        ? "ltr"
        : undefined;

  // Comment describing broken output — show that text
  const commentShow = trimmed.match(/<!--\s*browser shows:\s*([\s\S]*?)\s*-->/i);
  if (commentShow) {
    return { html: "", plain: commentShow[1].trim(), dir, lang };
  }

  // Fake bullet list (no real tags)
  if (!trimmed.includes("<") && /[•·]/.test(trimmed)) {
    const lines = trimmed
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `<p class="fake-bullet">${escapeHtml(l)}</p>`)
      .join("");
    return { html: `<div class="fake-list">${lines}</div>`, dir, lang };
  }

  // Plain non-HTML
  if (!trimmed.includes("<")) {
    return { html: "", plain: trimmed, dir, lang };
  }

  let html = trimmed
    // Soften ellipsis placeholders so they don't look like broken tags
    .replace(/>…</g, ">&hellip;<")
    .replace(/…/g, "&hellip;");

  // <html>/<body> get stripped by the browser inside a div — extract visible content
  const bodyInner = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]?.trim();
  const isDocShell =
    /^\s*<!DOCTYPE/i.test(html) || /^\s*<html[\s>]/i.test(html);

  if (bodyInner != null || (isDocShell && (lang || dir))) {
    const sample =
      bodyInner && bodyInner.length > 0
        ? bodyInner
        : lang === "ar" || dir === "rtl"
          ? "مرحبا"
          : lang
            ? "Hello"
            : "???";
    const rtlClass = dir === "rtl" ? " hint-rtl-body" : "";
    return {
      html: `<p class="lang-preview${rtlClass}">${sample}</p>`,
      dir,
      lang,
    };
  }

  if (isDocShell) {
    return {
      html: `<p class="doc-note">${dir === "rtl" || lang === "ar" ? "مرحبا" : "Page content"}</p>`,
      dir,
      lang,
    };
  }

  // Lone meta charset — show that Unicode works
  if (
    /^\s*<meta[\s>]/i.test(html) ||
    (/<meta[\s>]/i.test(html) &&
      !/<body[\s>]/i.test(html) &&
      !/<(img|ul|ol|h1|h2|a|button|label|header|nav|main)\b/i.test(html))
  ) {
    if (/charset/i.test(html)) {
      return { html: "", plain: "Hello 👋", dir, lang };
    }
  }

  // Semantic landmarks — add light labels via data attrs for CSS
  html = html
    .replace(/<header(\s|>)/gi, '<header data-tag="header"$1')
    .replace(/<nav(\s|>)/gi, '<nav data-tag="nav"$1')
    .replace(/<main(\s|>)/gi, '<main data-tag="main"$1')
    .replace(/<footer(\s|>)/gi, '<footer data-tag="footer"$1')
    .replace(/<div(\s[^>]*class="([^"]*)"[^>]*)>/gi, '<div$1 data-tag="div.$2">')
    .replace(/<div>/gi, '<div data-tag="div">');

  // Broken image without alt stays visibly broken; with alt, show alt text as fallback
  if (/<img\b/i.test(html)) {
    const hasAlt = /\balt\s*=\s*("[^"]*"|'[^']*')/i.test(html);
    if (!hasAlt) {
      html = html.replace(
        /<img\b([^>]*)>/i,
        '<div class="broken-img" role="img" aria-label="missing alt"><span>?</span><code>&lt;img&gt; no alt</code></div>',
      );
    } else {
      html = html.replace(
        /<img\b([^>]*)>/i,
        '<div class="alt-img" role="img"><span class="alt-img__badge">alt</span><p class="alt-img__text"></p></div>',
      );
      const altMatch = trimmed.match(/\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
      const altText = altMatch?.[2] ?? altMatch?.[3] ?? "";
      html = html.replace(
        '<p class="alt-img__text"></p>',
        `<p class="alt-img__text">${escapeHtml(altText)}</p>`,
      );
    }
  }

  return { html, dir, lang };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function HintLivePreview({
  code,
  bad = false,
  good = false,
  compact = false,
}: {
  code: string;
  bad?: boolean;
  good?: boolean;
  compact?: boolean;
}) {
  const prepared = useMemo(() => toPreviewHtml(code), [code]);

  return (
    <div
      className={`hint-live-preview relative flex min-h-0 flex-1 flex-col overflow-hidden border-[3px] bg-white text-black ${
        compact ? "rounded-xl" : "rounded-2xl"
      } ${
        good
          ? "border-emerald-600 ring-2 ring-emerald-500"
          : bad
            ? "border-red-600 ring-2 ring-red-500"
            : "border-cyan-500"
      }`}
      dir={prepared.dir}
      lang={prepared.lang}
      style={{ color: "#000000" }}
    >
      <div
        className={`min-h-0 flex-1 overflow-hidden ${compact ? "p-2 text-[11px]" : "p-3 text-sm"}`}
        style={{ colorScheme: "light", color: "#000000" }}
      >
        {prepared.plain != null ? (
          <p
            className={`flex h-full items-center font-black leading-snug ${
              prepared.dir === "rtl" ? "justify-end text-end" : "justify-center text-center"
            } ${compact ? "text-base" : "text-xl"}`}
            style={{ color: bad ? "#7f1d1d" : "#000000" }}
          >
            {prepared.plain}
          </p>
        ) : (
          <div
            className={`hint-live-preview__body h-full ${
              prepared.dir === "rtl" ? "hint-live-preview__body--rtl" : ""
            }`}
            // Controlled sandbox snippets only — never user input
            dangerouslySetInnerHTML={{ __html: prepared.html }}
          />
        )}
      </div>
    </div>
  );
}
