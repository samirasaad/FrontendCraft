import { createJiti } from "jiti";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(root, {
  interopDefault: true,
  alias: { "@": root },
});

const html = jiti(resolve(root, "content/tracks/html/lessons.ts")).lessons;
const css = jiti(resolve(root, "content/tracks/css/lessons.ts")).lessons;
const jsLegacy = jiti(
  resolve(root, "content/tracks/javascript/legacy-lessons.ts"),
).legacyLessons;
const jsExtra = jiti(
  resolve(root, "content/tracks/javascript/extra-lessons.ts"),
).extraLessons;
const jsInsights =
  jiti(resolve(root, "content/tracks/javascript/insights.ts"))
    .javascriptInsights ?? {};
const htmlInsights =
  jiti(resolve(root, "content/tracks/html/insights.ts")).htmlInsights ?? {};
const { defaultInsights } = jiti(resolve(root, "content/tracks/_insights.ts"));

function words(s) {
  return (String(s).match(/[A-Za-z0-9_]+|[\u0600-\u06FF]+/g) || []).length;
}
function enWords(ls) {
  if (!ls) return 0;
  if (typeof ls === "string") return words(ls);
  return ls.en ? words(ls.en) : 0;
}
function sectionWords(sec) {
  if (!sec) return 0;
  let n = 0;
  for (const p of sec.paragraphs || []) n += enWords(p);
  for (const b of sec.bullets || []) n += enWords(b);
  if (sec.code) n += Math.round(words(sec.code) * 0.35);
  return n;
}

function packFor(slug, titleEn, titleAr, map) {
  return map[slug] ?? defaultInsights(titleEn || slug, titleAr || slug);
}

function estimateAssembled(lesson, track) {
  const c = lesson.content;
  let w = 0;
  w += enWords(c.summary);
  w += enWords(c.visualHint);
  for (const p of c.paragraphs || []) w += enWords(p);
  for (const p of c.keyPoints || []) w += enWords(p);
  w += sectionWords(c.underTheHood);
  w += sectionWords(c.accessibility);
  w += sectionWords(c.seo);
  for (const ex of c.examples || []) {
    w += enWords(ex.expectedOutput);
    w += enWords(ex.label);
    if (ex.code) w += Math.round(words(ex.code) * 0.25);
  }
  const quizCount = c.activity?.questions?.length ?? 0;
  if (c.activity?.questions) {
    for (const q of c.activity.questions) {
      w += enWords(q.prompt || q.question || q.stem);
      for (const opt of q.options || []) {
        w += Math.round(enWords(opt.label || opt.text || opt) * 0.5);
      }
    }
  }
  if (c.challenge) {
    w += enWords(c.challenge.prompt);
    w += enWords(c.challenge.hint);
  }
  for (const card of c.compareCards || []) {
    w += enWords(card.prompt);
    w += enWords(card.explanation);
  }
  const pits = c.pitfalls
    ? Array.isArray(c.pitfalls)
      ? c.pitfalls
      : [c.pitfalls]
    : [];
  for (const pit of pits) {
    w += enWords(pit.wrong?.note);
    w += enWords(pit.right?.note);
    w += enWords(pit.title);
    if (pit.wrong?.code) w += Math.round(words(pit.wrong.code) * 0.2);
    if (pit.right?.code) w += Math.round(words(pit.right.code) * 0.2);
  }
  for (const card of c.cheatCards || []) {
    w += enWords(card.title);
    w += enWords(card.body || card.summary);
    for (const b of card.bullets || []) w += enWords(b);
  }

  const read = w / 150;
  const lab = 2;
  const quizMins = quizCount
    ? Math.min(4, Math.max(1, Math.round(quizCount * 0.45)))
    : 0;
  const suggested = Math.max(5, Math.min(18, Math.round(read + lab + quizMins)));
  return {
    track,
    slug: lesson.slug,
    tier: lesson.tier,
    current: lesson.readMinutes,
    words: w,
    quizCount,
    suggested,
    delta: suggested - lesson.readMinutes,
    sourceKind: "assembled",
  };
}

/** Estimate paused JS drafts (no activity wiring in export). */
function estimateJsDraft(draft, legacy) {
  const c = draft.content;
  const titleEn = c.title?.en || draft.slug;
  const titleAr = c.title?.ar || draft.slug;
  const pack = packFor(draft.slug, titleEn, titleAr, jsInsights);
  let w = 0;
  w += enWords(c.summary);
  w += enWords(c.visualHint);
  for (const p of c.paragraphs || []) w += enWords(p);
  for (const p of c.keyPoints || []) w += enWords(p);
  if (c.code) w += Math.round(words(c.code) * 0.25);
  w += sectionWords(pack.underTheHood);
  w += sectionWords(pack.accessibility);
  w += sectionWords(pack.seo);
  // examples / activity not attached on paused export — budget typical extras
  const extras = legacy ? 120 : 180;
  w += extras;
  const read = w / 150;
  const lab = 2;
  const quizMins = 2; // typical when revived
  const displayed = Math.max(5, Math.min(18, Math.round(read + lab + quizMins)));
  const currentDisplayed = draft.readMinutes + (legacy ? 2 : 0);
  return {
    track: "js",
    slug: draft.slug,
    tier: draft.tier || draft.difficulty,
    current: currentDisplayed,
    words: w,
    quizCount: 0,
    suggested: displayed,
    delta: displayed - currentDisplayed,
    sourceKind: legacy ? "js-legacy" : "js-extra",
    /** Value to store in the source file. */
    sourceMinutes: legacy ? Math.max(3, displayed - 2) : displayed,
  };
}

const rows = [
  ...html.map((l) => {
    const r = estimateAssembled(l, "html");
    // HTML legacy goes through enrichment (+2). Detect via insights/source.
    const isLegacy = Boolean(
      jiti(resolve(root, "content/tracks/html/legacy-lessons.ts")).legacyLessons.find(
        (x) => x.slug === l.slug,
      ),
    );
    return {
      ...r,
      sourceKind: isLegacy ? "html-legacy" : "html-direct",
      sourceMinutes: isLegacy ? Math.max(3, r.suggested - 2) : r.suggested,
    };
  }),
  ...jsLegacy.map((l) => estimateJsDraft(l, true)),
  ...jsExtra.map((l) => estimateJsDraft(l, false)),
  ...css.map((l) => {
    const r = estimateAssembled(l, "css");
    return { ...r, sourceKind: "css-direct", sourceMinutes: r.suggested };
  }),
];

for (const r of rows) {
  const flag = r.current !== r.suggested ? " *" : "";
  console.log(
    `${r.track}\t${r.slug}\t${r.tier}\t${r.current}->${r.suggested}\tsrc=${r.sourceMinutes}\t${r.words}w\t${r.delta > 0 ? "+" : ""}${r.delta}${flag}`,
  );
}
console.log("---");
console.log(
  "total",
  rows.length,
  "changed",
  rows.filter((r) => r.current !== r.suggested).length,
);

const out = resolve(root, "scripts/read-minutes-estimate.json");
writeFileSync(out, JSON.stringify(rows, null, 2));
console.log("wrote", out);
