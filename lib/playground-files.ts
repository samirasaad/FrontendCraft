import {
  DEMO_CAPTIONS_VTT_PATH,
  DEMO_IMG_PATH,
  DEMO_INTRO_VTT_PATH,
  DEMO_VIDEO_MP4,
  DEMO_VIDEO_VTT,
  STUDENTS_CODING_SVG,
} from "./demo-assets";

export const PLAYGROUND_HTML_FILE = "/index.html";
export const PLAYGROUND_CSS_FILE = "/styles.css";

/** Preview-only baseline — not shown in the editor. */
export const PREVIEW_BODY_CSS = `body {
  margin: 1rem;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: #0f172a;
}

img,
video,
iframe {
  max-width: 100%;
  height: auto;
}

dialog {
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 1rem;
  max-width: min(100%, 24rem);
}

dialog::backdrop {
  background: rgb(15 23 42 / 0.45);
}

details {
  margin-block: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

summary {
  cursor: pointer;
  font-weight: 600;
}`;

const PREVIEW_GUARD_SCRIPT = `<script data-fc-preview-guard>
(() => {
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }
      event.preventDefault();
    },
    true,
  );

  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (form instanceof HTMLFormElement && form.method === "dialog") return;
      event.preventDefault();
    },
    true,
  );
})();
</script>`;

function injectPreviewGuard(html: string): string {
  if (/data-fc-preview-guard/i.test(html)) return html;
  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${PREVIEW_GUARD_SCRIPT}\n  </body>`);
  }
  return `${html}\n${PREVIEW_GUARD_SCRIPT}`;
}

const STYLE_BLOCK_RE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

function extractStyleBlocks(html: string): { html: string; css: string } {
  const parts: string[] = [];
  const stripped = html.replace(STYLE_BLOCK_RE, (_, inner: string) => {
    const trimmed = inner.trim();
    if (trimmed) parts.push(trimmed);
    return "";
  });

  return {
    html: stripped.replace(/\n{3,}/g, "\n\n").trim(),
    css: parts.join("\n\n").trim(),
  };
}

function ensureStylesheetLink(html: string): string {
  if (/<link[^>]+href=["']\/styles\.css["']/i.test(html)) {
    return html;
  }

  const link = '    <link rel="stylesheet" href="/styles.css" />';
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${link}\n  </head>`);
  }
  if (/<head\b/i.test(html)) {
    return html.replace(/<head\b[^>]*>/i, (match) => `${match}\n${link}`);
  }
  return html;
}

function ensureMinimalDocumentHead(html: string): string {
  if (!/<head\b/i.test(html)) return html;

  let out = html;
  if (!/<meta[^>]+charset/i.test(out)) {
    out = out.replace(
      /<head\b[^>]*>/i,
      (match) => `${match}\n    <meta charset="UTF-8" />`,
    );
  }
  if (!/<meta[^>]+name=["']viewport/i.test(out)) {
    out = out.replace(
      /<head\b[^>]*>/i,
      (match) =>
        `${match}\n    <meta name="viewport" content="width=device-width, initial-scale=1" />`,
    );
  }
  if (!/<title\b/i.test(out)) {
    out = out.replace(/<head\b[^>]*>/i, (match) => `${match}\n    <title>Document</title>`);
  }
  return out;
}

function ensureDoctype(html: string): string {
  if (/<!DOCTYPE/i.test(html)) return html;
  if (/<html[\s>]/i.test(html)) return `<!DOCTYPE html>\n${html}`;
  return html;
}

/** Keep source/preview shell LTR; preserve an explicit dir= on lesson demos (e.g. RTL lesson). */
function normalizeHtmlDocument(
  code: string,
  headPreview: { title: string; body: string },
): string {
  const trimmed = code.trim();

  if (/<!DOCTYPE/i.test(trimmed) || /<html[\s>]/i.test(trimmed)) {
    let doc = ensureDoctype(trimmed);
    if (!/<html[^>]*\bdir\s*=/i.test(doc)) {
      doc = doc.replace(/<html(\s|>)/i, '<html dir="ltr"$1');
    }
    if (!/<html[^>]*\blang\s*=/i.test(doc)) {
      doc = doc.replace(/<html(\s|>)/i, '<html lang="en"$1');
    }
    return ensureMinimalDocumentHead(doc);
  }

  if (
    /^<head\b/i.test(trimmed) &&
    /<body\b/i.test(trimmed) &&
    /<\/body>\s*$/i.test(trimmed)
  ) {
    let headBody = trimmed;
    if (!/<meta[^>]+charset/i.test(headBody)) {
      headBody = headBody.replace(
        /<head\b[^>]*>/i,
        (match) => `${match}\n    <meta charset="UTF-8" />`,
      );
    }
    return `<!DOCTYPE html>
<html lang="en" dir="ltr">
${headBody}
</html>`;
  }

  if (/^<head\b/i.test(trimmed) && !/<body\b/i.test(trimmed)) {
    let headPart = trimmed;
    if (!/<link[^>]+href=["']\/styles\.css["']/i.test(headPart)) {
      headPart = headPart.replace(
        /<\/head>/i,
        '    <link rel="stylesheet" href="/styles.css" />\n  </head>',
      );
    }

    return `<!DOCTYPE html>
<html lang="en" dir="ltr">
${headPart}
  <body>
    <main>
      <h1>${headPreview.title}</h1>
      <p>${headPreview.body}</p>
    </main>
  </body>
</html>`;
  }

  const bodyOnly = trimmed.match(/^<body\b[^>]*>([\s\S]*)<\/body>\s*$/i);
  const inner = bodyOnly ? bodyOnly[1].trim() : trimmed;

  const doc = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Document</title>
  </head>
  <body>
${inner}
  </body>
</html>`;
  return doc;
}

function rewritePreviewAssetUrls(html: string): string {
  const svgData = `data:image/svg+xml,${encodeURIComponent(STUDENTS_CODING_SVG)}`;
  const vttData = `data:text/vtt;charset=utf-8,${encodeURIComponent(DEMO_VIDEO_VTT)}`;

  return html
    .replaceAll(`/${DEMO_IMG_PATH}`, svgData)
    .replaceAll(DEMO_IMG_PATH, svgData)
    .replaceAll(`/${DEMO_CAPTIONS_VTT_PATH}`, vttData)
    .replaceAll(DEMO_CAPTIONS_VTT_PATH, vttData)
    .replaceAll(`/${DEMO_INTRO_VTT_PATH}`, vttData)
    .replaceAll(DEMO_INTRO_VTT_PATH, vttData)
    .replaceAll("/clip.vtt", vttData)
    .replaceAll("clip.vtt", vttData)
    .replaceAll("/clip.mp4", DEMO_VIDEO_MP4)
    .replaceAll("clip.mp4", DEMO_VIDEO_MP4);
}

function inlinePreviewStyles(html: string, css: string): string {
  const styleTag = `<style>\n${css}\n</style>`;
  if (/<link[^>]+href=["']\/styles\.css["']/i.test(html)) {
    return html.replace(
      /<link[^>]+href=["']\/styles\.css["'][^>]*>\s*/i,
      `${styleTag}\n    `,
    );
  }
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `    ${styleTag}\n  </head>`);
  }
  return `${styleTag}\n${html}`;
}

/** Lesson-facing editor tabs — full document shell, no preview guard or baseline CSS. */
export function splitPlaygroundEditorSource(
  code: string,
  headPreview: { title: string; body: string },
): { html: string; css: string } {
  const extracted = extractStyleBlocks(code.trim());
  let html = normalizeHtmlDocument(extracted.html, headPreview);
  if (extracted.css.trim()) {
    html = ensureStylesheetLink(html);
  }
  return { html, css: extracted.css };
}

/** Full iframe document for live preview (guard + baseline CSS inlined). */
export function buildPlaygroundPreviewSrcDoc(
  editorHtml: string,
  editorCss: string,
  headPreview: { title: string; body: string },
): string {
  const normalized = normalizeHtmlDocument(editorHtml.trim(), headPreview);
  const extracted = extractStyleBlocks(normalized);
  const lessonCss = [editorCss.trim(), extracted.css]
    .filter((part) => part.length > 0)
    .join("\n\n");
  const html = injectPreviewGuard(ensureStylesheetLink(extracted.html));
  const css = [PREVIEW_BODY_CSS, lessonCss]
    .filter((part) => part.trim().length > 0)
    .join("\n\n");
  const withStyles = inlinePreviewStyles(html, css);
  return rewritePreviewAssetUrls(withStyles);
}

export function buildHtmlPlaygroundFiles(
  code: string,
  headPreview: { title: string; body: string },
): { html: string; css: string } {
  const normalized = normalizeHtmlDocument(code, headPreview);
  const extracted = extractStyleBlocks(normalized);
  const html = injectPreviewGuard(ensureStylesheetLink(extracted.html));
  const css = [PREVIEW_BODY_CSS, extracted.css]
    .filter((part) => part.trim().length > 0)
    .join("\n\n");

  return { html, css };
}

export function formatPlaygroundCopy(html: string, css: string): string {
  if (css.trim()) {
    return `<!-- index.html -->\n${html}\n\n/* styles.css */\n${css}`;
  }
  return html;
}
