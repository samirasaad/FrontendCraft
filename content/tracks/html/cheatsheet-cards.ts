import { L, cheatCard, support } from "@/content/helpers";
import type { CheatCard } from "@/lib/types";

const shellBoilerplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FrontendCraft</title>
  </head>
  <body>
    <a href="#main">Skip to content</a>
    <header>
      <p>FrontendCraft</p>
      <nav aria-label="Primary"></nav>
    </header>
    <main id="main">
      <h1>Page title</h1>
    </main>
    <footer>
      <p>© FrontendCraft</p>
    </footer>
  </body>
</html>`;

export const htmlCheatCards: CheatCard[] = [
  cheatCard(
    L("Document shell", "Document shell"),
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Title</title>
  </head>
  <body></body>
</html>`,
    L("Always start here — doctype + lang + charset + viewport.", "دايمًا ابدأ من هنا — doctype + lang + charset + viewport."),
    {
      id: "shell",
      category: "structure",
      previewHtml: `<span class="chip">DOCTYPE</span>
<p><strong>html[lang]</strong> → head → body</p>
<p>charset · viewport · title</p>`,
      boilerplate: shellBoilerplate,
      support: support("4+", "2+", "4+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Landmarks", "Landmarks"),
    `<header></header>
<nav aria-label="Primary"></nav>
<main id="main"></main>
<footer></footer>`,
    L("One main. Name every nav landmark.", "main واحد. سمّي كل nav landmark."),
    {
      id: "landmarks",
      category: "structure",
      previewHtml: `<header style="padding:6px;background:#fff;border-radius:8px;margin-bottom:6px">header</header>
<nav style="padding:6px;background:#dbeafe;border-radius:8px;margin-bottom:6px">nav</nav>
<main style="padding:8px;background:#fff;border-radius:8px;margin-bottom:6px"><strong>main</strong></main>
<footer style="padding:6px;background:#fff;border-radius:8px">footer</footer>`,
      boilerplate: `<body>
  <a href="#main">Skip</a>
  <header><nav aria-label="Primary">…</nav></header>
  <main id="main">…</main>
  <footer>…</footer>
</body>`,
      tailwindSnippet: `<body class="min-h-screen bg-slate-950 text-slate-100">
  <a class="sr-only focus:not-sr-only" href="#main">Skip</a>
  <header class="border-b border-white/10 px-4 py-3">…</header>
  <main id="main" class="mx-auto max-w-3xl px-4 py-8">…</main>
  <footer class="border-t border-white/10 px-4 py-6">…</footer>
</body>`,
      support: support("5+", "4+", "5+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Heading outline", "Heading outline"),
    `<h1>Page</h1>
<h2>Section</h2>
<h3>Subsection</h3>`,
    L("Don't skip levels for styling — CSS is for looks.", "متقفزش مستويات عشان الشكل — الشكل بـ CSS."),
    {
      id: "headings",
      category: "structure",
      previewHtml: `<h1 style="margin:0 0 6px;font-size:18px">Page</h1>
<h2 style="margin:0 0 4px;font-size:15px">Section</h2>
<h3 style="margin:0;font-size:13px">Subsection</h3>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Label + input", "Label + input"),
    `<label>
  Email
  <input type="email" name="email" required autocomplete="email" />
</label>`,
    L("Placeholder ≠ label. Prefer wrapping labels.", "الـ placeholder ≠ label. لفّ الـ label حول الـ input."),
    {
      id: "label-input",
      category: "forms",
      previewHtml: `<label>Email
  <input type="email" placeholder="you@example.com" />
</label>`,
      boilerplate: `<form>
  <label>
    Email
    <input type="email" name="email" required autocomplete="email" inputmode="email" />
  </label>
  <button type="submit">Save</button>
</form>`,
      tailwindSnippet: `<label class="grid gap-1 text-sm font-medium text-slate-200">
  Email
  <input
    class="rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2"
    type="email"
    name="email"
    required
    autocomplete="email"
  />
</label>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Mobile UX attributes", "Mobile UX attributes"),
    `<input
  name="phone"
  type="tel"
  inputmode="tel"
  autocomplete="tel"
  pattern="[0-9+\\-\\s]{8,}"
/>`,
    L("`inputmode` shapes the keyboard; `autocomplete` speeds fills; `pattern` validates.", "`inputmode` بيشكل الكيبورد؛ `autocomplete` بيسرّع التعبئة؛ `pattern` للتحقق."),
    {
      id: "form-ux",
      category: "forms",
      previewHtml: `<label>Phone
  <input type="tel" inputmode="tel" placeholder="+20…" />
</label>
<p class="chip">inputmode · autocomplete · pattern</p>`,
      boilerplate: `<label>
  Phone
  <input
    name="phone"
    type="tel"
    inputmode="tel"
    autocomplete="tel"
    pattern="[0-9+\\-\\s]{8,}"
    required
  />
</label>`,
      support: support(
        "66+",
        "95+",
        "12.1+",
        "79+",
        "widely",
        {
          notes: L(
            "`inputmode` is widely supported; always keep a meaningful `type` as the real fallback.",
            "`inputmode` مدعوم على نطاق واسع؛ خلّي `type` الحقيقي هو الـ fallback.",
          ),
        },
      ),
    },
  ),
  cheatCard(
    L("Native dialog", "Native dialog"),
    `<dialog id="confirm">
  <form method="dialog">
    <p>Delete lesson progress?</p>
    <button value="cancel">Cancel</button>
    <button value="ok">Delete</button>
  </form>
</dialog>`,
    L("Use `showModal()` for a native backdrop + focus trap.", "استخدم `showModal()` لـ backdrop و focus trap أصلي."),
    {
      id: "dialog",
      category: "interactive",
      previewHtml: `<dialog open>
  <strong>Confirm</strong>
  <p style="margin:6px 0">Delete progress?</p>
  <button>Cancel</button>
  <button>Delete</button>
</dialog>`,
      boilerplate: `<button type="button" id="open">Open</button>
<dialog id="confirm">
  <form method="dialog">
    <p>Delete lesson progress?</p>
    <menu>
      <button value="cancel">Cancel</button>
      <button value="ok">Delete</button>
    </menu>
  </form>
</dialog>
<script>
  const d = document.getElementById("confirm");
  document.getElementById("open").onclick = () => d.showModal();
</script>`,
      support: support(
        "37+",
        "98+",
        "15.4+",
        "79+",
        "newly",
        {
          notes: L(
            "Baseline newly available — Safari 15.4+ required for reliable modal behavior.",
            "Baseline newly available — محتاج Safari 15.4+ لسلوك modal موثوق.",
          ),
          fallback: L(
            "Polyfill with a focus-trapped custom modal + `role=\"dialog\"` + `aria-modal=\"true\"` for older Safari.",
            "استخدم modal مخصص بـ focus trap و `role=\"dialog\"` و `aria-modal=\"true\"` لـ Safari القديم.",
          ),
        },
      ),
    },
  ),
  cheatCard(
    L("Details accordion", "Details accordion"),
    `<details>
  <summary>What is the Event Loop?</summary>
  <p>It coordinates the call stack and task queues.</p>
</details>`,
    L("Zero-JS disclosure — great for FAQs. Mind `name` for exclusive groups.", "Disclosure من غير JS — ممتاز لـ FAQ. استخدم `name` للمجموعات الحصرية."),
    {
      id: "details",
      category: "interactive",
      previewHtml: `<details open>
  <summary>What is the Event Loop?</summary>
  <p style="margin:8px 0 0">Coordinates stack + queues.</p>
</details>`,
      boilerplate: `<details name="faq">
  <summary>Shipping CSS?</summary>
  <p>Coming soon on FrontendCraft.</p>
</details>
<details name="faq">
  <summary>Is HTML free?</summary>
  <p>Yes — all lessons are open.</p>
</details>`,
      support: support(
        "12+",
        "49+",
        "6+",
        "79+",
        "widely",
        {
          notes: L(
            "`name` for exclusive accordions is newer — check Safari version if you rely on it.",
            "`name` للـ accordions الحصرية أحدث — راجع إصدار Safari لو معتمد عليه.",
          ),
        },
      ),
    },
  ),
  cheatCard(
    L("Responsive picture", "Responsive picture"),
    `<picture>
  <source type="image/avif" srcset="/hero.avif" />
  <source type="image/webp" srcset="/hero.webp" />
  <img src="/hero.jpg" alt="Learner coding" width="640" height="360" />
</picture>`,
    L("Art direction + format negotiation — always end with `<img>`.", "توجيه بصري + تفاوض صيغ — دايمًا اختم بـ `<img>`."),
    {
      id: "picture",
      category: "media",
      previewHtml: `<picture>
  <img src="https://picsum.photos/seed/frontendcraft/320/180" alt="Learner coding" width="320" height="180" />
</picture>
<p class="chip">AVIF → WebP → JPEG</p>`,
      boilerplate: `<picture>
  <source
    media="(max-width: 640px)"
    srcset="/hero-mobile.avif"
    type="image/avif"
  />
  <source srcset="/hero.avif" type="image/avif" />
  <source srcset="/hero.webp" type="image/webp" />
  <img
    src="/hero.jpg"
    alt="Learner at a code playground"
    width="1200"
    height="630"
    decoding="async"
  />
</picture>`,
      support: support("38+", "38+", "9.1+", "79+", "widely"),
    },
  ),
  cheatCard(
    L("Sized lazy image", "Sized lazy image"),
    `<img
  src="/lesson.webp"
  alt="Sandbox preview"
  width="640"
  height="360"
  loading="lazy"
  decoding="async"
/>`,
    L("Width/height fights CLS; lazy for below-the-fold only.", "width/height ضد CLS؛ lazy للصور تحت الشاشة بس."),
    {
      id: "img-lazy",
      category: "media",
      previewHtml: `<img src="https://picsum.photos/seed/craft/280/158" alt="Sandbox preview" width="280" height="158" />
<p class="chip">width · height · loading=lazy</p>`,
      support: support("77+", "75+", "15.4+", "79+", "widely"),
    },
  ),
  cheatCard(
    L("Open Graph + Twitter", "Open Graph + Twitter"),
    `<meta property="og:title" content="FrontendCraft" />
<meta property="og:description" content="Interactive HTML lab" />
<meta property="og:image" content="https://example.com/og.png" />
<meta name="twitter:card" content="summary_large_image" />`,
    L("Social previews read these from the initial HTML `<head>`.", "معاينات السوشيال بتقرأ دول من `<head>` في أول HTML."),
    {
      id: "og",
      category: "head",
      previewHtml: `<div style="background:#fff;border-radius:12px;padding:10px;border:1px solid #cbd5e1">
  <div style="height:72px;border-radius:8px;background:linear-gradient(135deg,#67e8f9,#fde047)"></div>
  <p style="margin:8px 0 2px;font-weight:700">FrontendCraft</p>
  <p style="margin:0;color:#475569;font-size:12px">Interactive HTML lab</p>
</div>`,
      boilerplate: `<head>
  <meta charset="UTF-8" />
  <title>FrontendCraft — HTML</title>
  <meta name="description" content="Interactive HTML learning lab" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="FrontendCraft" />
  <meta property="og:description" content="Interactive HTML lab" />
  <meta property="og:image" content="https://example.com/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#020617" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
</head>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Theme color & favicons", "Theme color & favicons"),
    `<meta name="theme-color" content="#020617" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    L("SVG favicon + ICO fallback covers desktop; apple-touch for iOS home screen.", "SVG + ICO للديسكتوب؛ apple-touch لشاشة iOS."),
    {
      id: "theme-favicon",
      category: "head",
      previewHtml: `<p class="chip" style="background:#020617;color:#67e8f9">theme-color #020617</p>
<p>favicon.ico · icon.svg · apple-touch-icon</p>`,
      support: support("73+", "36+", "15+", "79+", "widely"),
    },
  ),
  cheatCard(
    L("Button vs link", "Button vs link"),
    `<a href="/javascript">Open JS track</a>
<button type="button">Mark complete</button>`,
    L("Links navigate. Buttons trigger actions in-place.", "اللينك للتنقّل. الزر لفعل في نفس الصفحة."),
    {
      id: "button-link",
      category: "structure",
      previewHtml: `<p><a href="#">Open JS track</a></p>
<button type="button">Mark complete</button>`,
      tailwindSnippet: `<a class="text-cyan-300 underline-offset-4 hover:underline" href="/javascript">Open JS track</a>
<button type="button" class="rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950">
  Mark complete
</button>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
];
