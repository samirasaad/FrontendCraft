"use client";

import type { ReactNode } from "react";

type Lang = "html" | "css" | "javascript" | "tsx";

type TokenKind =
  | "plain"
  | "tag"
  | "attr"
  | "string"
  | "comment"
  | "keyword"
  | "number"
  | "punct";

const KIND_CLASS: Record<TokenKind, string> = {
  plain: "text-slate-200",
  tag: "text-cyan-300",
  attr: "text-emerald-300/90",
  string: "text-amber-200/90",
  comment: "text-slate-500 italic",
  keyword: "text-fuchsia-300/90",
  number: "text-orange-300",
  punct: "text-slate-400",
};

function push(tokens: { kind: TokenKind; text: string }[], kind: TokenKind, text: string) {
  if (!text) return;
  const last = tokens[tokens.length - 1];
  if (last && last.kind === kind) last.text += text;
  else tokens.push({ kind, text });
}

function tokenizeMarkup(code: string) {
  const tokens: { kind: TokenKind; text: string }[] = [];
  const re =
    /(<!--[\s\S]*?-->)|(<\/?[A-Za-z][\w:-]*)|(\/?>)|(=)|("[^"]*"|'[^']*')|([^\s<>="'\/]+)|(\s+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    if (m[1]) push(tokens, "comment", m[1]);
    else if (m[2]) push(tokens, "tag", m[2]);
    else if (m[3]) push(tokens, "punct", m[3]);
    else if (m[4]) push(tokens, "punct", m[4]);
    else if (m[5]) push(tokens, "string", m[5]);
    else if (m[6]) push(tokens, "attr", m[6]);
    else if (m[7]) push(tokens, "plain", m[7]);
  }
  return tokens;
}

function tokenizeScript(code: string) {
  const tokens: { kind: TokenKind; text: string }[] = [];
  const keywords = new Set([
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "true",
    "false",
    "null",
    "undefined",
    "new",
    "class",
    "import",
    "export",
    "from",
    "async",
    "await",
    "typeof",
    "interface",
    "type",
  ]);
  const re =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)|(\b\d+\.?\d*\b)|(\b[A-Za-z_$][\w$]*\b)|([{}()[\];,.:=<>+\-*/%!?&|]+)|(\s+)|([^\s])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    if (m[1]) push(tokens, "comment", m[1]);
    else if (m[2]) push(tokens, "string", m[2]);
    else if (m[3]) push(tokens, "number", m[3]);
    else if (m[4])
      push(tokens, keywords.has(m[4]) ? "keyword" : "plain", m[4]);
    else if (m[5]) push(tokens, "punct", m[5]);
    else if (m[6]) push(tokens, "plain", m[6]);
    else if (m[7]) push(tokens, "plain", m[7]);
  }
  return tokens;
}

function tokenizeCss(code: string) {
  const tokens: { kind: TokenKind; text: string }[] = [];
  const re =
    /(\/\*[\s\S]*?\*\/)|([.#]?[A-Za-z_-][\w-]*)|(:[A-Za-z-]+)|("[^"]*"|'[^']*')|([{}:;,()]+)|(\s+)|([^\s])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    if (m[1]) push(tokens, "comment", m[1]);
    else if (m[2]) push(tokens, "tag", m[2]);
    else if (m[3]) push(tokens, "keyword", m[3]);
    else if (m[4]) push(tokens, "string", m[4]);
    else if (m[5]) push(tokens, "punct", m[5]);
    else if (m[6]) push(tokens, "plain", m[6]);
    else if (m[7]) push(tokens, "attr", m[7]);
  }
  return tokens;
}

function tokenize(code: string, language: Lang) {
  if (language === "html") return tokenizeMarkup(code);
  if (language === "css") return tokenizeCss(code);
  return tokenizeScript(code);
}

/** Lightweight highlighted code panel — no Prism/Shiki dependency. */
export function LessonActivityCodeSnippet({
  code,
  language = "html",
  label,
}: {
  code: string;
  language?: Lang;
  label?: string;
}) {
  const tokens = tokenize(code, language);

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/25 bg-slate-950/90 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
      <div
        dir="ltr"
        className="flex items-center border-b border-white/10 px-3.5 py-1.5"
      >
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
          {label ?? language}
        </span>
      </div>
      <pre
        dir="ltr"
        className="overflow-x-auto px-3.5 py-3 text-start font-mono text-sm leading-5 sm:text-[15px]"
      >
        <code>
          {tokens.map((tok, i) => (
            <span key={`${i}-${tok.kind}`} className={KIND_CLASS[tok.kind]}>
              {tok.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function htmlLooksPreviewable(code: string): boolean {
  const hasVisibleTag =
    /<(p|h[1-6]|ul|ol|li|a|img|button|nav|main|header|footer|strong|em|b|i|mark|table|label|input|details|section|article|blockquote)\b/i.test(
      code,
    );
  const hasVisibleText = />\s*[^<\s][\s\S]*?</.test(code) || /<img\b/i.test(code);
  return hasVisibleTag && hasVisibleText;
}

export function wrapActivityPreviewHtml(code: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:12px;font:16px/1.45 system-ui,sans-serif;color:#0f172a;background:#fff}
    img{max-width:100%;height:auto}
    ul,ol{margin:0;padding-inline-start:1.25rem}
  </style></head><body>${code}</body></html>`;
}

export function ActivityOptionLetter({
  children,
  tone = "idle",
}: {
  children: ReactNode;
  tone?: "idle" | "selected" | "correct" | "wrong";
}) {
  const shell =
    tone === "selected"
      ? "border-sky-300/60 bg-sky-400/20 text-sky-50 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
      : tone === "correct"
        ? "border-emerald-400/55 bg-emerald-400/20 text-emerald-100"
        : tone === "wrong"
          ? "border-rose-400/55 bg-rose-400/20 text-rose-100"
          : "border-white/15 bg-white/5 text-slate-200";

  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold transition ${shell}`}
    >
      {children}
    </span>
  );
}
