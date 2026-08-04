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
    L("Document shell", "هيكل المستند"),
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Title</title>
  </head>
  <body></body>
</html>`,
    L("Always start here — `doctype` + lang + `charset` + `viewport`.", "دايمًا ابدأ من هنا — `doctype` + `lang` + `charset` + `viewport`."),
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
    L("`Landmarks`", "`Landmarks`"),
    `<header></header>
<nav aria-label="Primary"></nav>
<main id="main"></main>
<footer></footer>`,
    L("One main. Name every `nav` `landmark`.", "`main` واحد. سمّي كل `nav` `landmark`."),
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
    L("`Heading outline`", "مخطط العناوين"),
    `<h1>Page</h1>
<h2>Section</h2>
<h3>Subsection</h3>`,
    L("Don't `skip` `levels` for `styling` — `CSS` is for looks.", "متقفزش مستويات عشان الشكل — الشكل بـ `CSS`."),
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
    L("Label + input", "`Label` + `input`"),
    `<label>
  Email
  <input type="email" name="email" required autocomplete="email" />
</label>`,
    L("Placeholder ≠ label. Prefer `wrapping` `labels`.", "الـ `placeholder` ≠ `label`. لفّ الـ `label` حول الـ `input`."),
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
    L("Mobile `UX` `attributes`", "خصائص `UX` للموبايل"),
    `<input
  name="phone"
  type="tel"
  inputmode="tel"
  autocomplete="tel"
  pattern="[0-9+\\-\\s]{8,}"
/>`,
    L("`inputmode` shapes the `keyboard`; `autocomplete` speeds fills; `pattern` validates.", "`inputmode` بيشكل الكيبورد؛ `autocomplete` بيسرّع التعبئة؛ `pattern` للتحقق."),
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
    L("Native dialog", "`<dialog>` الأصلي"),
    `<dialog id="confirm">
  <form method="dialog">
    <p>Delete lesson progress?</p>
    <button value="cancel">Cancel</button>
    <button value="ok">Delete</button>
  </form>
</dialog>`,
    L("Use `showModal()` for a native `backdrop` + `focus` trap.", "استخدم `showModal()` لـ `backdrop` و `focus` trap أصلي."),
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
    L("Details `accordion`", "أكورديون `<details>`"),
    `<details>
  <summary>What is the Event Loop?</summary>
  <p>It coordinates the call stack and task queues.</p>
</details>`,
    L("Zero-`JS` `disclosure` — great for FAQs. Mind `name` for exclusive groups.", "`Disclosure` من غير `JS` — ممتاز لـ `FAQ`. استخدم `name` للمجموعات الحصرية."),
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
    L("Responsive picture", "`<picture>` متجاوب"),
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
    L("Sized lazy image", "صورة `lazy` بمقاس"),
    `<img
  src="/lesson.webp"
  alt="Sandbox preview"
  width="640"
  height="360"
  loading="lazy"
  decoding="async"
/>`,
    L("Width/height fights `CLS`; lazy for `below-the-fold` only.", "`width`/`height` ضد `CLS`؛ `lazy` للصور تحت الشاشة بس."),
    {
      id: "img-lazy",
      category: "media",
      previewHtml: `<img src="https://picsum.photos/seed/craft/280/158" alt="Sandbox preview" width="280" height="158" />
<p class="chip">width · height · loading=lazy</p>`,
      support: support("77+", "75+", "15.4+", "79+", "widely"),
    },
  ),
  cheatCard(
    L("Open Graph + Twitter", "`Open Graph` + `Twitter`"),
    `<meta property="og:title" content="FrontendCraft" />
<meta property="og:description" content="Interactive HTML lab" />
<meta property="og:image" content="https://example.com/og.png" />
<meta name="twitter:card" content="summary_large_image" />`,
    L("Social previews read these from the initial `HTML` `<head>`.", "معاينات السوشيال بتقرأ دول من `<head>` في أول `HTML`."),
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
    L("Theme color & favicons", "`theme-color` و `favicons`"),
    `<meta name="theme-color" content="#020617" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    L("SVG favicon + ICO `fallback` covers desktop; apple-touch for iOS home screen.", "`SVG` + `ICO` للديسكتوب؛ `apple-touch` لشاشة `iOS`."),
    {
      id: "theme-favicon",
      category: "head",
      previewHtml: `<p class="chip" style="background:#020617;color:#67e8f9">theme-color #020617</p>
<p>favicon.ico · icon.svg · apple-touch-icon</p>`,
      support: support("73+", "36+", "15+", "79+", "widely"),
    },
  ),
  cheatCard(
    L("`Button` vs link", "`button` مقابل `link`"),
    `<a href="/javascript">Open JS track</a>
<button type="button">Mark complete</button>`,
    L("`Links` navigate. `Buttons` trigger actions in-place.", "اللينك للتنقّل. الزر لفعل في نفس الصفحة."),
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
  cheatCard(
    L("`Skip link`", "`Skip link`"),
    `<body>
  <a href="#main">Skip to content</a>
  <header>…</header>
  <main id="main">…</main>
</body>`,
    L("First focusable control — jump past repeated `chrome`.", "أول عنصر قابل للتركيز — اقفز بعد الـ `chrome` المتكرر."),
    {
      id: "skip-link",
      category: "structure",
      previewHtml: `<a href="#main" style="display:inline-block;padding:4px 8px;background:#dbeafe;border-radius:8px">Skip to content</a>
<p style="margin:8px 0 0;color:#64748b">→ #main</p>`,
      boilerplate: `<body>
  <a href="#main">Skip to content</a>
  <header>
    <nav aria-label="Primary">…</nav>
  </header>
  <main id="main">
    <h1>Lesson</h1>
  </main>
</body>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Lists", "القوائم"),
    `<ul>
  <li>Unordered item</li>
</ul>
<ol>
  <li>Ordered step</li>
</ol>
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>`,
    L("`ul`/`ol` need `<li>` `children`. Use `dl` for `term` → `definition` pairs.", "`ul`/`ol` محتاجين أولاد `<li>`. استخدم `dl` لأزواج مصطلح → تعريف."),
    {
      id: "lists",
      category: "structure",
      previewHtml: `<ul style="margin:0;padding-left:18px"><li>Unordered</li></ul>
<ol style="margin:8px 0 0;padding-left:18px"><li>Ordered</li></ol>
<p style="margin:8px 0 0"><strong>Term</strong> — definition</p>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("`Article` + section", "`<article>` + `<section>`"),
    `<main>
  <article>
    <h1>Lesson title</h1>
    <section aria-labelledby="tips">
      <h2 id="tips">Tips</h2>
      <p>Self-contained content belongs in article.</p>
    </section>
  </article>
</main>`,
    L("`article` can stand alone; `section` needs a `heading`.", "`article` يقدر يعيش لوحده؛ `section` محتاج `heading`."),
    {
      id: "article-section",
      category: "structure",
      previewHtml: `<article style="padding:8px;background:#fff;border-radius:8px;border:1px solid #cbd5e1">
  <strong>article</strong>
  <section style="margin-top:6px;padding:6px;background:#f1f5f9;border-radius:6px">section · Tips</section>
</article>`,
      support: support("5+", "4+", "5+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Text `semantics`", "`semantics` للنص"),
    `<p>
  Prefer <strong>strong</strong> for importance and
  <em>em</em> for stress — not only for looks.
  Inline <code>code</code> stays in English.
</p>`,
    L("`strong`/`em` carry meaning; `b`/`i` are presentational.", "`strong`/`em` ليهم معنى؛ `b`/`i` للشكل."),
    {
      id: "text-semantics",
      category: "structure",
      previewHtml: `<p style="margin:0">Prefer <strong>strong</strong> and <em>em</em>. Inline <code>code</code>.</p>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Fieldset + legend", "`<fieldset>` + `<legend>`"),
    `<fieldset>
  <legend>Account</legend>
  <label>
    Email
    <input type="email" name="email" autocomplete="email" required />
  </label>
</fieldset>`,
    L("Group related `controls` — legend names the group for `AT`.", "جمّع الـ `controls` المرتبطة — الـ legend بيسمّي المجموعة لـ `AT`."),
    {
      id: "fieldset",
      category: "forms",
      previewHtml: `<fieldset style="border:1px solid #cbd5e1;border-radius:10px;padding:8px">
  <legend>Account</legend>
  <label style="display:grid;gap:4px">Email
    <input type="email" />
  </label>
</fieldset>`,
      boilerplate: `<form>
  <fieldset>
    <legend>Account</legend>
    <label>
      Email
      <input type="email" name="email" autocomplete="email" required />
    </label>
    <label>
      Password
      <input type="password" name="password" autocomplete="new-password" required />
    </label>
  </fieldset>
  <button type="submit">Create account</button>
</form>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Select + options", "`<select>` + `options`"),
    `<label>
  Track
  <select name="track" required>
    <option value="">Choose…</option>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
  </select>
</label>`,
    L("First empty option forces an intentional choice when `required`.", "خيار فاضي أول حاجة بيفرض اختيار واعي مع `required`."),
    {
      id: "select",
      category: "forms",
      previewHtml: `<label style="display:grid;gap:4px">Track
  <select>
    <option>Choose…</option>
    <option>HTML</option>
    <option>CSS</option>
  </select>
</label>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Datalist suggestions", "اقتراحات `<datalist>`"),
    `<label>
  Framework
  <input name="fw" list="frameworks" />
</label>
<datalist id="frameworks">
  <option value="React"></option>
  <option value="Vue"></option>
  <option value="Svelte"></option>
</datalist>`,
    L("Suggestions only — `users` can still type free text.", "اقتراحات بس — المستخدم يقدر يكتب نص حر."),
    {
      id: "datalist",
      category: "forms",
      previewHtml: `<label style="display:grid;gap:4px">Framework
  <input list="fw" placeholder="Start typing…" />
</label>
<datalist id="fw">
  <option value="React"></option>
  <option value="Vue"></option>
</datalist>
<p class="chip">datalist · free text ok</p>`,
      support: support("20+", "4+", "12.1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("`Button` types", "أنواع `button`"),
    `<form>
  <button type="submit">Save</button>
  <button type="reset">Reset</button>
  <button type="button">Cancel</button>
</form>`,
    L("`Default` inside a form is `submit` — set `type` explicitly.", "الافتراضي جوّه form هو `submit` — حط `type` صراحة."),
    {
      id: "button-types",
      category: "forms",
      previewHtml: `<button type="submit">Save</button>
<button type="reset">Reset</button>
<button type="button">Cancel</button>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Search `landmark`", "`landmark` البحث"),
    `<search>
  <form role="search" action="/search">
    <label>
      Search lessons
      <input type="search" name="q" />
    </label>
    <button type="submit">Search</button>
  </form>
</search>`,
    L("Prefer `<search>` — `fallback` is `<form role=\"search\">`.", "فضّل `<search>` — الـ `fallback` هو `<form role=\"search\">`."),
    {
      id: "search",
      category: "interactive",
      previewHtml: `<form style="display:flex;gap:6px;align-items:end">
  <label style="display:grid;gap:4px;flex:1">Search
    <input type="search" placeholder="lessons…" />
  </label>
  <button type="submit">Go</button>
</form>
<p class="chip">&lt;search&gt; · Newly</p>`,
      boilerplate: `<search>
  <form action="/search">
    <label>
      Search lessons
      <input type="search" name="q" autocomplete="off" />
    </label>
    <button type="submit">Search</button>
  </form>
</search>`,
      support: support("135+", "136+", "17+", "135+", "newly", {
        notes: L(
          "Older engines treat unknown tags as generic — keep a labeled search form inside.",
          "المحركات الأقدم بتعامل الـ tags المجهولة كعامة — خلّي form بحث متسمّى جوّه.",
        ),
        fallback: L(
          'Use <form role="search"> on older browsers.',
          'استخدم <form role="search"> على المتصفحات الأقدم.',
        ),
      }),
    },
  ),
  cheatCard(
    L("Popover", "`Popover`"),
    `<button type="button" popovertarget="tips">Tips</button>
<div id="tips" popover>
  <p>Native top-layer tip — light dismiss.</p>
  <button type="button" popovertarget="tips" popovertargetaction="hide">
    Close
  </button>
</div>`,
    L("Menus/tooltips without a `modal` dialog — not a full `focus` trap.", "`menus`/`tooltips` من غير `dialog` `modal` — مش `focus trap` كامل."),
    {
      id: "popover",
      category: "interactive",
      previewHtml: `<button type="button">Tips</button>
<div style="margin-top:8px;padding:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff">
  Native top-layer tip
</div>
<p class="chip">popover · Newly</p>`,
      boilerplate: `<button type="button" popovertarget="menu">Open menu</button>
<div id="menu" popover>
  <ul>
    <li><a href="/html">HTML</a></li>
    <li><a href="/css">CSS</a></li>
  </ul>
  <button type="button" popovertarget="menu" popovertargetaction="hide">
    Close
  </button>
</div>`,
      support: support("114+", "125+", "17+", "114+", "newly", {
        notes: L(
          "Baseline Newly — keep an in-page fallback for older engines.",
          "Baseline Newly — سيّب fallback في الصفحة للمحركات الأقدم.",
        ),
        fallback: L(
          "Custom overlay with focus management, or keep the content visible in-page.",
          "overlay مخصص مع إدارة focus، أو سيّب المحتوى ظاهر في الصفحة.",
        ),
      }),
    },
  ),
  cheatCard(
    L("`Table` with `headers`", "جدول بـ `headers`"),
    `<table>
  <caption>Track progress</caption>
  <thead>
    <tr>
      <th scope="col">Track</th>
      <th scope="col">Lessons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">HTML</th>
      <td>23</td>
    </tr>
  </tbody>
</table>`,
    L("Use `tables` for data — `th` + `scope` + `caption` for `AT`.", "الجداول للبيانات — `th` + `scope` + `caption` لـ `AT`."),
    {
      id: "table",
      category: "structure",
      previewHtml: `<table style="width:100%;border-collapse:collapse;font-size:12px">
  <caption style="text-align:start;font-weight:700;margin-bottom:4px">Track progress</caption>
  <thead>
    <tr><th style="border-bottom:1px solid #cbd5e1;text-align:start">Track</th><th style="border-bottom:1px solid #cbd5e1;text-align:start">Lessons</th></tr>
  </thead>
  <tbody>
    <tr><th style="text-align:start">HTML</th><td>23</td></tr>
  </tbody>
</table>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Video + captions", "`<video>` + `captions`"),
    `<video controls width="640" height="360" poster="/poster.jpg">
  <source src="/lesson.webm" type="video/webm" />
  <source src="/lesson.mp4" type="video/mp4" />
  <track kind="captions" srclang="en" src="/captions.vtt" label="English" default />
</video>`,
    L("Always offer `controls` + a `caption` track when speech matters.", "دايمًا حط `controls` و track ترجمة لما الكلام يهم."),
    {
      id: "video-track",
      category: "media",
      previewHtml: `<div style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:16px;text-align:center">
  ▶ video · controls
  <p style="margin:6px 0 0;font-size:11px;color:#94a3b8">track kind=captions</p>
</div>`,
      boilerplate: `<video
  controls
  width="640"
  height="360"
  poster="/poster.jpg"
  preload="metadata"
>
  <source src="/lesson.webm" type="video/webm" />
  <source src="/lesson.mp4" type="video/mp4" />
  <track
    kind="captions"
    srclang="en"
    src="/captions.vtt"
    label="English"
    default
  />
  <p>
    Download the
    <a href="/lesson.mp4">lesson video</a>
    or read the
    <a href="/transcript">transcript</a>.
  </p>
</video>`,
      support: support("3+", "3.5+", "3.1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("Lazy iframe embed", "`iframe` `lazy`"),
    `<iframe
  title="Event Loop demo"
  src="https://example.com/embed"
  loading="lazy"
  width="640"
  height="360"
></iframe>`,
    L("Always set `title`. `Lazy-load` non-critical embeds.", "حط `title` دايمًا. أخّر الـ embeds غير الحرجة."),
    {
      id: "iframe-lazy",
      category: "media",
      previewHtml: `<div style="border:1px dashed #94a3b8;border-radius:8px;padding:18px;text-align:center;background:#f8fafc">
  iframe · title · loading=lazy
</div>`,
      support: support("77+", "121+", "16.4+", "79+", "widely", {
        notes: L(
          "Prefer click-to-load for heavy third-party players when you can.",
          "فضّل click-to-load لمشغّلات الطرف التالت التقيلة لما تقدر.",
        ),
      }),
    },
  ),
  cheatCard(
    L("`LCP` image priority", "أولوية صورة `LCP`"),
    `<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
<img
  src="/hero.webp"
  alt="Learner at a code playground"
  width="1200"
  height="630"
  fetchpriority="high"
/>`,
    L("Size the `hero`, preload when known, never `loading=\"lazy\"` above the fold.", "حط مقاس للـ `hero`، preload لما تعرفه، ومتعملش lazy فوق الشاشة."),
    {
      id: "lcp-priority",
      category: "media",
      previewHtml: `<img src="https://picsum.photos/seed/lcp/280/148" alt="Hero" width="280" height="148" />
<p class="chip">fetchpriority=high · no lazy</p>`,
      support: support("102+", "132+", "17.2+", "102+", "newly", {
        notes: L(
          "Hint only — browsers still load without it.",
          "تلميح بس — المتصفحات بتحمّل من غيره.",
        ),
        fallback: L(
          "Omit fetchpriority; keep width/height and a correct src.",
          "سيّب fetchpriority؛ خلّي width/height و src صح.",
        ),
      }),
    },
  ),
  cheatCard(
    L("`SEO` essentials", "أساسيات `SEO`"),
    `<title>FrontendCraft — HTML track</title>
<meta name="description" content="Interactive HTML learning lab" />
<link rel="canonical" href="https://example.com/html" />
<meta name="robots" content="index,follow" />`,
    L("Unique title + `description` + `canonical` in the first `HTML` `response`.", "`title` فريد + `description` + `canonical` في أول استجابة `HTML`."),
    {
      id: "seo-meta",
      category: "head",
      previewHtml: `<p style="margin:0;font-weight:700;color:#1d4ed8">FrontendCraft — HTML track</p>
<p style="margin:4px 0 0;color:#475569;font-size:12px">Interactive HTML learning lab</p>
<p class="chip">canonical · robots</p>`,
      boilerplate: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FrontendCraft — HTML track</title>
  <meta name="description" content="Interactive HTML learning lab" />
  <link rel="canonical" href="https://example.com/html" />
  <meta name="robots" content="index,follow" />
</head>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
  cheatCard(
    L("`JSON-LD` `Article`", "`JSON-LD` `Article`"),
    `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Document Anatomy",
  "author": { "@type": "Organization", "name": "FrontendCraft" }
}
</script>`,
    L("Must match `visible` `content` — fake rich results get ignored.", "لازم يطابق المحتوى الظاهر — النتائج المزيفة بتتتجاهل."),
    {
      id: "json-ld",
      category: "head",
      previewHtml: `<p class="chip">application/ld+json</p>
<p style="margin:6px 0 0;font-family:ui-monospace,monospace;font-size:11px">@type: Article</p>
<p style="margin:4px 0 0;color:#64748b;font-size:11px">headline matches &lt;h1&gt;</p>`,
      boilerplate: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Document Anatomy",
  "description": "Every page starts with DOCTYPE, html, head, and body.",
  "author": {
    "@type": "Organization",
    "name": "FrontendCraft"
  },
  "mainEntityOfPage": "https://example.com/html/learn?lesson=document-anatomy"
}
</script>`,
      support: support("1+", "1+", "1+", "12+", "widely"),
    },
  ),
];
