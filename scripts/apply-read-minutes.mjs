import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rows = JSON.parse(
  readFileSync(resolve(root, "scripts/read-minutes-estimate.json"), "utf8"),
);

const files = [
  "content/labs/html/legacy-lessons.ts",
  "content/labs/html/modern-lessons.ts",
  "content/labs/html/extra-lessons.ts",
  "content/labs/javascript/legacy-lessons.ts",
  "content/labs/javascript/extra-lessons.ts",
  "content/labs/css/extra-lessons.ts",
];

const bySlug = Object.fromEntries(rows.map((r) => [r.slug, r]));

let totalUpdates = 0;

for (const rel of files) {
  const path = resolve(root, rel);
  let text = readFileSync(path, "utf8");
  let fileUpdates = 0;

  for (const [slug, row] of Object.entries(bySlug)) {
    const re = new RegExp(
      `(slug:\\s*"${slug}"[\\s\\S]{0,500}?readMinutes:\\s*)\\d+`,
    );
    if (!re.test(text)) continue;
    const next = text.replace(re, `$1${row.sourceMinutes}`);
    if (next !== text) {
      text = next;
      fileUpdates += 1;
      totalUpdates += 1;
      console.log(
        `${rel}: ${slug} -> ${row.sourceMinutes} (display ${row.suggested})`,
      );
    }
  }

  if (fileUpdates) writeFileSync(path, text);
  else console.log(`${rel}: no changes`);
}

// CSS modern specs: inject / replace readMinutes on each slug line block.
const cssModernPath = resolve(root, "content/labs/css/modern-lessons.ts");
let cssText = readFileSync(cssModernPath, "utf8");
let cssUpdates = 0;

for (const row of rows.filter((r) => r.track === "css" && r.sourceKind === "css-direct")) {
  // Specs look like: slug: "box-model", tier: "beginner", icon: ...
  const re = new RegExp(
    `(slug:\\s*"${row.slug}",\\s*tier:\\s*"[^"]+",)(\\s*readMinutes:\\s*\\d+,)?`,
  );
  if (!re.test(cssText)) {
    console.warn(`css modern: slug not found ${row.slug}`);
    continue;
  }
  cssText = cssText.replace(
    re,
    `$1 readMinutes: ${row.sourceMinutes},`,
  );
  cssUpdates += 1;
  totalUpdates += 1;
  console.log(
    `css/modern-lessons.ts: ${row.slug} -> ${row.sourceMinutes}`,
  );
}

if (cssUpdates) writeFileSync(cssModernPath, cssText);

console.log(`---\nUpdated ${totalUpdates} lesson minutes`);
