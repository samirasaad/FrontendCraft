/**
 * Validates HTML/CSS playground examples build into sane preview documents.
 * Run: node scripts/validate-playground-examples.mjs
 * (Compiles lib/playground-files.ts on first run via tsc.)
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const compiledDir = path.join(__dirname, ".compiled");
const compiledFile = path.join(compiledDir, "playground-files.js");

execSync(
  `"${path.join(root, "node_modules/.bin/tsc")}" -p scripts/tsconfig.playground-compile.json`,
  { cwd: root, stdio: "inherit" },
);
execSync(
  `"${path.join(root, "node_modules/.bin/tsc")}" -p scripts/tsconfig.content-compile.json`,
  { cwd: root, stdio: "inherit" },
);

const { buildHtmlPlaygroundFiles, splitPlaygroundEditorSource } = await import(
  pathToFileURL(path.join(compiledDir, "playground-files.js")).href
);
const { hardHtmlDoc, hardCssFromFragment } = await import(
  pathToFileURL(path.join(compiledDir, "content/helpers.js")).href
);

const HEAD_PREVIEW = {
  title: "Preview title",
  body: "Preview body copy for head-only fragments.",
};

const LESSON_FILES = [
  "content/labs/html/modern-lessons.ts",
  "content/labs/html/extra-lessons.ts",
  "content/labs/html/legacy-lessons.ts",
  "content/labs/html/legacy-example-tiers.ts",
  "content/labs/html/enrichment.ts",
  "content/labs/css/modern-lessons.ts",
  "content/labs/css/extra-lessons.ts",
];

function extractFromHelpers(source, file) {
  const examples = [];

  for (const fn of ["simpleExample", "mediumExample"]) {
    const re = new RegExp(`${fn}\\(\\s*\`([\\s\\S]*?)\`\\s*,`, "g");
    let match;
    while ((match = re.exec(source))) {
      examples.push({ file, kind: fn, code: match[1] });
    }
  }

  const hardHtmlRe =
    /hardExample\(\s*hardHtmlDoc\(\s*`([\s\S]*?)`\s*,\s*\{[\s\S]*?\}\s*\)\s*,/g;
  let hardHtmlMatch;
  while ((hardHtmlMatch = hardHtmlRe.exec(source))) {
    const titleMatch = hardHtmlMatch[0].match(/title:\s*"([^"]+)"/);
    examples.push({
      file,
      kind: "hardExample+hardHtmlDoc",
      code: hardHtmlDoc(hardHtmlMatch[1], {
        title: titleMatch?.[1] ?? "Document",
      }),
    });
  }

  const hardCssRe =
    /hardExample\(\s*hardCssFromFragment\(\s*`([\s\S]*?)`\s*,\s*"([^"]+)"\s*\)\s*,/g;
  let hardCssMatch;
  while ((hardCssMatch = hardCssRe.exec(source))) {
    examples.push({
      file,
      kind: "hardExample+hardCssFromFragment",
      code: hardCssFromFragment(hardCssMatch[1], hardCssMatch[2]),
    });
  }

  const hardDirectRe = /hardExample\(\s*`([\s\S]*?)`\s*,/g;
  let hardDirectMatch;
  while ((hardDirectMatch = hardDirectRe.exec(source))) {
    examples.push({ file, kind: "hardExample", code: hardDirectMatch[1] });
  }

  const htmlRe = /html\(\s*`([\s\S]*?)`\s*,\s*`([\s\S]*?)`\s*\)/g;
  let htmlMatch;
  while ((htmlMatch = htmlRe.exec(source))) {
    examples.push({
      file,
      kind: "html()",
      code: `<style>\n${htmlMatch[1]}\n</style>\n${htmlMatch[2]}`,
    });
  }

  const legacyRe = /code:\s*`([\s\S]*?)`\s*,\s*expectedOutput:/g;
  let legacyMatch;
  while ((legacyMatch = legacyRe.exec(source))) {
    examples.push({ file, kind: "legacy-code", code: legacyMatch[1] });
  }

  return examples;
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
}

function visibleText(html) {
  return stripTags(html).replace(/\s+/g, " ").trim();
}

function issuesForExample(entry) {
  const issues = [];
  const label = `${entry.file} (${entry.kind})`;

  if (!entry.code?.trim()) {
    issues.push({ label, kind: "empty-code", message: "Example code is empty" });
    return issues;
  }

  const { html, css } = buildHtmlPlaygroundFiles(entry.code, HEAD_PREVIEW);

  if (!/<!DOCTYPE html>/i.test(html)) {
    issues.push({ label, kind: "no-doctype", message: "Missing doctype after normalize" });
  }

  if (/<body[^>]*>[\s\S]*<head\b/i.test(html)) {
    issues.push({
      label,
      kind: "head-in-body",
      message: "<head> appears inside <body> after normalize",
    });
  }

  const text = visibleText(html);
  const hasVisibleElement =
    /<(main|h[1-6]|p|button|a|input|select|textarea|video|audio|iframe|details|dialog|img|figure|table|ul|ol|nav|header|footer|article|section|form|label|span|div)\b/i.test(
      html,
    );
  const hasCssOnlyVisual =
    /@keyframes\b/i.test(css) ||
    (/::(before|after)\b/i.test(css) && /\.[a-z]/i.test(css));

  if (!text && !hasVisibleElement && !hasCssOnlyVisual) {
    issues.push({
      label,
      kind: "empty-preview",
      message: "No visible body content after normalize",
    });
  }

  if (!/data-fc-preview-guard/i.test(html)) {
    issues.push({
      label,
      kind: "no-preview-guard",
      message: "Preview guard script missing",
    });
  }

  const { html: editorHtml } = splitPlaygroundEditorSource(entry.code, HEAD_PREVIEW);

  if (!/<!DOCTYPE html>/i.test(editorHtml)) {
    issues.push({
      label,
      kind: "editor-no-doctype",
      message: "Editor HTML missing doctype after normalize",
    });
  }

  if (!/<html\b/i.test(editorHtml) || !/<head\b/i.test(editorHtml) || !/<body\b/i.test(editorHtml)) {
    issues.push({
      label,
      kind: "editor-incomplete-shell",
      message: "Editor HTML must include html, head, and body",
    });
  }

  if (/data-fc-preview-guard/i.test(editorHtml)) {
    issues.push({
      label,
      kind: "editor-preview-guard",
      message: "Preview guard must not appear in editor HTML",
    });
  }

  if (/\bbody\s*\{[\s\S]*font-family:\s*system-ui/i.test(editorHtml)) {
    issues.push({
      label,
      kind: "editor-baseline-css",
      message: "Preview baseline CSS must not appear in editor HTML",
    });
  }

  const localMedia = [
    ...entry.code.matchAll(/src=["'](\/[^"']+\.(?:mp4|webm))["']/gi),
  ].map((match) => match[1]);

  for (const mediaPath of localMedia) {
    issues.push({
      label,
      kind: "missing-media",
      message: `References local media ${mediaPath} — use a hosted demo URL or Sandpack virtual file`,
    });
  }

  return issues;
}

const allExamples = LESSON_FILES.flatMap((rel) => {
  const file = path.join(root, rel);
  const source = fs.readFileSync(file, "utf8");
  return extractFromHelpers(source, rel);
});

const issues = allExamples.flatMap(issuesForExample);

console.log(`Checked ${allExamples.length} extracted examples.`);

if (issues.length === 0) {
  console.log("All playground examples passed validation.");
  process.exit(0);
}

console.log(`\nFound ${issues.length} issue(s):\n`);
for (const issue of issues) {
  console.log(`- [${issue.kind}] ${issue.label}: ${issue.message}`);
}
process.exit(1);
