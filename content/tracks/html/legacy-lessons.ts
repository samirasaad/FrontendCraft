import type { LegacyLesson } from "@/content/tracks/_legacy";

export const legacyLessons: LegacyLesson[] = [
  {
    id: "html-1",
    order: 1,
    slug: "document-anatomy",
    difficulty: "beginner",
    readMinutes: 6,
    icon: "FileCode",
    visualizer: "document-tree",
    content: {
      title: {
        en: "Document Anatomy",
        ar: "Document Anatomy",
      },
      summary: {
        en: "Every page starts with `<!DOCTYPE html>`, then `<html>`, `<head>`, and `<body>`.",
        ar: "كل صفحة بتبدأ بـ `<!DOCTYPE html>`، وبعدين `<html>` و `<head>` و `<body>`.",
      },
      paragraphs: [
        {
          en: "`<!DOCTYPE html>` tells the browser to use modern HTML mode. Without it, quirks mode can break layout.",
          ar: "`<!DOCTYPE html>` بيقول للمتصفح يستخدم modern HTML mode. من غيره ممكن يدخل quirks mode ويكسر الـ layout.",
        },
        {
          en: "`<html>` is the root. Put language on it (`lang=\"en\"` / `lang=\"ar\"`). `<head>` holds metadata; `<body>` holds what users see.",
          ar: "`<html>` هو الـ root. حط عليه اللغة (`lang=\"en\"` / `lang=\"ar\"`). `<head>` للـ metadata؛ `<body>` للي المستخدم بيشوفه.",
        },
        {
          en: "Keep one `<h1>` as the page’s main title. Nest sections logically so the document outline stays clear.",
          ar: "خلّي `<h1>` واحد للعنوان الرئيسي. رتّب الـ sections منطقي عشان الـ document outline يفضل واضح.",
        },
      ],
      keyPoints: [
        {
          en: "Always include `<!DOCTYPE html>`",
          ar: "دايمًا حط `<!DOCTYPE html>`",
        },
        {
          en: "`<head>` = metadata, `<body>` = visible content",
          ar: "`<head>` = metadata، `<body>` = المحتوى الظاهر",
        },
        {
          en: "Set `lang` on `<html>`",
          ar: "حط `lang` على `<html>`",
        },
      ],
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello HTML</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is the body.</p>
  </body>
</html>`,
      expectedOutput: {
        en: "A page titled Hello HTML with heading Welcome",
        ar: "صفحة عنوانها Hello HTML وفيها heading Welcome",
      },
      visualHint: {
        en: "Watch the document tree assemble from doctype to body.",
        ar: "راقب الـ document tree وهو بيتركب من doctype لحد body.",
      },
    },
  },
  {
    id: "html-2",
    order: 2,
    slug: "semantic-structure",
    difficulty: "beginner",
    readMinutes: 7,
    icon: "LayoutTemplate",
    visualizer: "semantic-blocks",
    content: {
      title: {
        en: "Semantic Structure",
        ar: "Semantic Structure",
      },
      summary: {
        en: "`header`, `nav`, `main`, `section`, `article`, `footer` describe meaning — not just boxes.",
        ar: "`header` و `nav` و `main` و `section` و `article` و `footer` بتوصف المعنى — مش بس صناديق.",
      },
      paragraphs: [
        {
          en: "Semantic tags help browsers, screen readers, and SEO understand your page regions.",
          ar: "الـ semantic tags بتساعد المتصفح وscreen readers والـ SEO يفهموا مناطق الصفحة.",
        },
        {
          en: "Prefer `<main>` once per page for primary content. Use `<section>` for thematic groups and `<article>` for self-contained pieces.",
          ar: "فضّل `<main>` مرة واحدة في الصفحة للمحتوى الأساسي. استخدم `<section>` للمجموعات و `<article>` للقطع المستقلة.",
        },
        {
          en: "Avoid soup of nested `<div>`s when a semantic element already fits the role.",
          ar: "متعملش شوربة `<div>` متداخلة لو فيه semantic element مناسب للدور.",
        },
      ],
      keyPoints: [
        {
          en: "Semantics = meaning for tools and people",
          ar: "Semantics = معنى للأدوات والناس",
        },
        {
          en: "One `<main>` per page",
          ar: "`<main>` واحد لكل صفحة",
        },
        {
          en: "Choose tags by role, not by looks",
          ar: "اختار الـ tags حسب الدور، مش الشكل",
        },
      ],
      code: `<body>
  <header>
    <nav>…</nav>
  </header>
  <main>
    <article>
      <h1>Post title</h1>
      <p>Content…</p>
    </article>
  </main>
  <footer>© 2026</footer>
</body>`,
      expectedOutput: {
        en: "Landmark regions: header → main → footer",
        ar: "مناطق الصفحة: header → main → footer",
      },
      visualHint: {
        en: "Landmark blocks light up as a readable page skeleton.",
        ar: "الـ landmark blocks بتولّع كهيكل صفحة مقروء.",
      },
    },
  },
  {
    id: "html-3",
    order: 3,
    slug: "text-headings",
    difficulty: "beginner",
    readMinutes: 5,
    icon: "Type",
    visualizer: "heading-ladder",
    content: {
      title: {
        en: "Text & Headings",
        ar: "Text & Headings",
      },
      summary: {
        en: "Headings make hierarchy. Paragraphs and inline tags shape readable text.",
        ar: "الـ Headings بتعمل hierarchy. الـ paragraphs والـ inline tags بتشكّل نص مقروء.",
      },
      paragraphs: [
        {
          en: "Use `<h1>`–`<h6>` in order. Don’t skip levels just for styling — CSS handles size.",
          ar: "استخدم `<h1>`–`<h6>` بالترتيب. متتخطاش levels عشان الشكل — الـ CSS هو اللي بيتحكم في الحجم.",
        },
        {
          en: "`<p>` for paragraphs. Inline helpers: `<strong>`, `<em>`, `<code>`, `<mark>`, `<br>` sparingly.",
          ar: "`<p>` للفقرات. مساعدات inline: `<strong>` و `<em>` و `<code>` و `<mark>`، و `<br>` بحذر.",
        },
        {
          en: "`<blockquote>` and `<cite>` quote sources cleanly. Lists come next for structured items.",
          ar: "`<blockquote>` و `<cite>` للاقتباس بشكل نظيف. الـ lists جاية بعدها للعناصر المرتبة.",
        },
      ],
      keyPoints: [
        {
          en: "Heading order = document outline",
          ar: "ترتيب الـ headings = document outline",
        },
        {
          en: "Style with CSS, structure with HTML",
          ar: "الشكل بـ CSS، والبنية بـ HTML",
        },
        {
          en: "Prefer semantic inline tags over bare spans",
          ar: "فضّل inline tags ذات معنى بدل span فاضي",
        },
      ],
      code: `<h1>Site title</h1>
<h2>Section</h2>
<p>Learn <strong>HTML</strong> with <em>clarity</em>.</p>
<p>Inline <code>&lt;code&gt;</code> looks like this.</p>`,
      expectedOutput: {
        en: "Clear heading ladder + emphasized text",
        ar: "سلم headings واضح + نص مؤكد",
      },
      visualHint: {
        en: "Steps climb from h1 down the heading ladder.",
        ar: "الدرجات بتطلع من h1 على سلم الـ headings.",
      },
    },
  },
  {
    id: "html-4",
    order: 4,
    slug: "links-images",
    difficulty: "beginner",
    readMinutes: 6,
    icon: "Link2",
    visualizer: "link-image",
    content: {
      title: {
        en: "Links & Images",
        ar: "Links & Images",
      },
      summary: {
        en: "`<a href>` connects pages. `<img>` needs `src` and meaningful `alt`.",
        ar: "`<a href>` بيربط الصفحات. `<img>` محتاجة `src` و `alt` له معنى.",
      },
      paragraphs: [
        {
          en: "Use descriptive link text — avoid “click here”. `target=\"_blank\"` should include `rel=\"noopener noreferrer\"`.",
          ar: "اكتب نص لينك واضح — متكتبش “اضغط هنا”. لو `target=\"_blank\"` حط `rel=\"noopener noreferrer\"`.",
        },
        {
          en: "`alt` describes the image for accessibility and when the image fails to load. Decorative images can use `alt=\"\"`.",
          ar: "`alt` بيوصف الصورة للـ accessibility ولما الصورة متتحملش. الصور الديكور ممكن `alt=\"\"`.",
        },
        {
          en: "Prefer modern formats (`webp`/`avif`) when you control assets, and always set width/height or CSS to reduce layout shift.",
          ar: "فضّل صيغ حديثة (`webp`/`avif`) لما تتحكم في الأصول، وحدد width/height أو CSS تقلل layout shift.",
        },
      ],
      keyPoints: [
        {
          en: "Meaningful `href` + link text",
          ar: "`href` ونص لينك ليهم معنى",
        },
        {
          en: "`alt` is required thinking, not optional decoration",
          ar: "`alt` تفكير أساسي، مش زينة اختيارية",
        },
        {
          en: "Secure external tabs with `rel`",
          ar: "أمّن التابات الخارجية بـ `rel`",
        },
      ],
      code: `<a href="/about">About us</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External site
</a>
<img src="/hero.webp" alt="Students coding together" width="800" height="450" />`,
      expectedOutput: {
        en: "Internal link, safe external link, accessible image",
        ar: "لينك داخلي، لينك خارجي آمن، وصورة accessible",
      },
      visualHint: {
        en: "A link arrow jumps while an image card fades in with alt text.",
        ar: "سهم اللينك بيقفز وكارت الصورة بيظهر مع نص الـ alt.",
      },
    },
  },
  {
    id: "html-5",
    order: 5,
    slug: "lists",
    difficulty: "beginner",
    readMinutes: 5,
    icon: "List",
    visualizer: "list-stack",
    content: {
      title: {
        en: "Lists",
        ar: "Lists",
      },
      summary: {
        en: "`ul` for bullets, `ol` for order, `dl` for terms and definitions.",
        ar: "`ul` للنقاط، `ol` للترتيب، `dl` للمصطلحات والتعريفات.",
      },
      paragraphs: [
        {
          en: "Each item is an `<li>`. Nest lists when you need sub-steps — keep nesting shallow.",
          ar: "كل عنصر `<li>`. تقدر تعشّش lists للخطوات الفرعية — بس خليه shallow.",
        },
        {
          en: "`<ol>` is perfect for recipes and ranked steps. Start attribute can change numbering.",
          ar: "`<ol>` ممتازة للوصفات والخطوات المرتبة. خاصية `start` تقدر تغيّر الترقيم.",
        },
        {
          en: "`<dl>`, `<dt>`, `<dd>` shine for glossaries and key/value explainers.",
          ar: "`<dl>` و `<dt>` و `<dd>` ممتازين للقاموس وشرح key/value.",
        },
      ],
      keyPoints: [
        {
          en: "`ul` = unordered, `ol` = ordered",
          ar: "`ul` = unordered، `ol` = ordered",
        },
        {
          en: "Only `<li>` directly inside `ul`/`ol`",
          ar: "جوّه `ul`/`ol` حط `<li>` مباشرة بس",
        },
        {
          en: "`dl` for term → definition pairs",
          ar: "`dl` لأزواج term → definition",
        },
      ],
      code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>
<ol>
  <li>Open editor</li>
  <li>Write markup</li>
</ol>
<dl>
  <dt>Semantic</dt>
  <dd>HTML that describes meaning</dd>
</dl>`,
      expectedOutput: {
        en: "Bullet list + numbered list + definition list",
        ar: "bullet list + numbered list + definition list",
      },
      visualHint: {
        en: "Items drop into unordered, ordered, and definition stacks.",
        ar: "العناصر بتنزل في stacks: unordered و ordered و definition.",
      },
    },
  },
  {
    id: "html-6",
    order: 6,
    slug: "forms-inputs",
    difficulty: "intermediate",
    readMinutes: 9,
    icon: "FormInput",
    visualizer: "form-flow",
    content: {
      title: {
        en: "Forms & Inputs",
        ar: "Forms & Inputs",
      },
      summary: {
        en: "Forms collect data. Labels, names, and input types make them usable and accessible.",
        ar: "الـ Forms بتجمع data. الـ labels والـ names وأنواع الـ input بتخليها usable و accessible.",
      },
      paragraphs: [
        {
          en: "Wrap controls in `<form>`. Every control needs a `<label>` (via `for`/`id` or wrapping).",
          ar: "حط الـ controls جوّه `<form>`. كل control محتاج `<label>` (بـ `for`/`id` أو wrapping).",
        },
        {
          en: "`name` is what gets submitted. Choose `type` wisely: `email`, `password`, `number`, `checkbox`, `radio`, `file`…",
          ar: "`name` هو اللي بيتبعت في الـ submit. اختار `type` بوعي: `email` و `password` و `number` و `checkbox` و `radio` و `file`…",
        },
        {
          en: "Use `required`, `min`, `max`, `pattern` for basic HTML validation before JavaScript.",
          ar: "استخدم `required` و `min` و `max` و `pattern` لـ HTML validation أساسي قبل JavaScript.",
        },
      ],
      keyPoints: [
        {
          en: "Label every input",
          ar: "اعمل label لكل input",
        },
        {
          en: "`name` matters for submission",
          ar: "`name` مهم في الـ submission",
        },
        {
          en: "Native validation attributes help early",
          ar: "خصائص الـ validation الأصلية بتساعد بدري",
        },
      ],
      code: `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="pass">Password</label>
  <input id="pass" name="password" type="password" minlength="8" required />

  <button type="submit">Create account</button>
</form>`,
      expectedOutput: {
        en: "Accessible signup form with email + password",
        ar: "form تسجيل accessible فيه email + password",
      },
      visualHint: {
        en: "Fields fill, validate, then submit pulses down the wire.",
        ar: "الحقول بتتملّى وتعمل validate، وبعدين الـ submit بيبعت الإشارة.",
      },
    },
  },
  {
    id: "html-7",
    order: 7,
    slug: "tables",
    difficulty: "intermediate",
    readMinutes: 7,
    icon: "Table",
    visualizer: "table-grid",
    content: {
      title: {
        en: "Tables",
        ar: "Tables",
      },
      summary: {
        en: "Tables are for tabular data — not page layout.",
        ar: "الـ Tables للبيانات الجدولية — مش لـ layout الصفحة.",
      },
      paragraphs: [
        {
          en: "Structure: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`. Use `<caption>` to title the table.",
          ar: "البنية: `<table>` و `<thead>` و `<tbody>` و `<tr>` و `<th>` و `<td>`. استخدم `<caption>` لعنوان الجدول.",
        },
        {
          en: "`scope=\"col\"` / `scope=\"row\"` on `<th>` clarifies headers for assistive tech.",
          ar: "`scope=\"col\"` / `scope=\"row\"` على `<th>` بيوضّح الـ headers لتقنيات المساعدة.",
        },
        {
          en: "For layout grids, use CSS — tables for comparing rows of related values.",
          ar: "لـ layout grids استخدم CSS — الـ tables لمقارنة صفوف قيم مرتبطة.",
        },
      ],
      keyPoints: [
        {
          en: "Data tables ≠ layout tables",
          ar: "Data tables ≠ layout tables",
        },
        {
          en: "Caption + scope improve accessibility",
          ar: "الـ caption والـ scope بيحسّنوا الـ accessibility",
        },
        {
          en: "Separate head and body sections",
          ar: "افصل أقسام head و body",
        },
      ],
      code: `<table>
  <caption>Scoreboard</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Nour</th>
      <td>42</td>
    </tr>
  </tbody>
</table>`,
      expectedOutput: {
        en: "Accessible 2-column scoreboard table",
        ar: "جدول نتائج accessible بعمودين",
      },
      visualHint: {
        en: "Cells assemble into a glowing data grid.",
        ar: "الخلايا بتتجمّع في data grid مضيء.",
      },
    },
  },
  {
    id: "html-8",
    order: 8,
    slug: "accessibility-basics",
    difficulty: "intermediate",
    readMinutes: 12,
    icon: "Accessibility",
    visualizer: "a11y-check",
    content: {
      title: {
        en: "Accessibility (a11y) & Screen Readers",
        ar: "Accessibility (a11y) & Screen Readers",
      },
      summary: {
        en: "Dedicated a11y lesson — how NVDA/VoiceOver hear your HTML, plus ARIA, keyboard, and focus rules you can ship.",
        ar: "درس a11y مخصص — إزاي NVDA/VoiceOver بيسمعوا HTML، وكمان قواعد ARIA والكيبورد والـ focus تقدر تنشرها.",
      },
      paragraphs: [
        {
          en: "Screen readers (NVDA, VoiceOver, JAWS) walk the accessibility tree built from your DOM — not from what CSS paints. Native elements (`button`, `a`, `label`, landmarks) expose name, role, and value automatically.",
          ar: "قارئات الشاشة (NVDA و VoiceOver و JAWS) بتمشي على accessibility tree من الـ DOM — مش من شكل CSS. العناصر الأصلية (`button` و `a` و `label` والـ landmarks) بتعرض الاسم والدور والقيمة تلقائيًا.",
        },
        {
          en: "Keyboard path is non-negotiable: `Tab` / `Shift+Tab` for order, `Enter` / `Space` to activate controls, Escape to dismiss dialogs. Every mouse action needs a keyboard equivalent and a visible focus style.",
          ar: "مسار الكيبورد أساسي: `Tab` / `Shift+Tab` للترتيب، `Enter` / `Space` للتفعيل، Escape لقفل الـ dialogs. كل فعل ماوس محتاج بديل كيبورد و focus ظاهر.",
        },
        {
          en: "ARIA supplements native HTML — never replace it. Reach for `aria-expanded`, `aria-live`, `aria-labelledby`, and roles only when no native element fits. Prefer one `<main>`, skip links, and honest heading ranks.",
          ar: "ARIA بتكمّل HTML الأصلي — مش بتستبدله. استخدم `aria-expanded` و `aria-live` و `aria-labelledby` والـ roles لما مفيش عنصر أصلي. فضّل `<main>` واحد و skip links ومراتب headings صادقة.",
        },
        {
          en: "Manage focus after view changes (open dialog → focus inside; close → return to invoker). Announce async results with a polite `aria-live` region instead of silent UI swaps.",
          ar: "أدِر الـ focus بعد تغيّر الشاشة (افتح dialog → focus جوّه؛ اقفل → ارجع للزر). أعلن نتائج async بـ `aria-live` مهذب بدل تغيير صامت.",
        },
      ],
      keyPoints: [
        {
          en: "Native controls first — ARIA only when needed",
          ar: "Native controls أولًا — ARIA عند الحاجة بس",
        },
        {
          en: "Name, role, value must stay in sync with UI state",
          ar: "الاسم والدور والقيمة لازم يطابقوا حالة الـ UI",
        },
        {
          en: "Keyboard + visible focus for every action",
          ar: "كيبورد + focus ظاهر لكل فعل",
        },
        {
          en: "Test with NVDA or VoiceOver on real pages",
          ar: "اختبر بـ NVDA أو VoiceOver على صفحات حقيقية",
        },
      ],
      code: `<a href="#main">Skip to content</a>
<main id="main">
  <h1>Lesson title</h1>
  <button type="button" aria-expanded="false" aria-controls="panel">
    More info
  </button>
  <div id="panel" hidden>Details for screen readers and keyboard users.</div>
</main>
<img src="/chart.png" alt="Sales grew 20% in March" />
<nav aria-label="Primary">…</nav>`,
      expectedOutput: {
        en: "Skip link, named landmarks, expandable control, meaningful alt",
        ar: "Skip link و landmarks مسمّاة و control قابل للتوسيع و alt مفهوم",
      },
      visualHint: {
        en: "Focus ring travels across controls as checks turn green.",
        ar: "حلقة الـ focus بتتحرك على الـ controls والـ checks بتخضر.",
      },
    },
  },
  {
    id: "html-9",
    order: 9,
    slug: "meta-seo",
    difficulty: "intermediate",
    readMinutes: 12,
    icon: "Search",
    visualizer: "meta-card",
    content: {
      title: {
        en: "SEO & Performance Insights",
        ar: "SEO & Performance Insights",
      },
      summary: {
        en: "Dedicated SEO lesson — how Googlebot indexes HTML, SSR vs CSR, Core Web Vitals (LCP, INP, CLS), and a clean `<head>`.",
        ar: "درس SEO مخصص — إزاي Googlebot بيفهرس HTML، و SSR مقابل CSR، و Core Web Vitals (LCP و INP و CLS)، و `<head>` نضيف.",
      },
      paragraphs: [
        {
          en: "Googlebot and other crawlers prefer meaningful HTML in the first response. Semantic structure beats div soup; empty client-only shells delay discovery of titles, headings, and internal links.",
          ar: "Googlebot والـ crawlers بيفضّلوا HTML معنوي في أول استجابة. الهيكل الـ semantic أحسن من div soup؛ الـ shells الفاضية على الـ client بتأخّر اكتشاف العناوين والـ headings واللينكات الداخلية.",
        },
        {
          en: "SSR/SSG (or solid prerender) puts primary copy, `<title>`, meta description, and canonical in the initial HTML. CSR can enhance UI — it should not invent the whole document after hydration.",
          ar: "SSR/SSG (أو prerender محترم) بيحط النص الأساسي و `<title>` و meta description و canonical في أول HTML. CSR يقدر يعزّز الـ UI — مش يخترع المستند كله بعد الـ hydration.",
        },
        {
          en: "Core Web Vitals are product metrics: LCP (largest contentful paint), INP (interaction responsiveness), CLS (layout shift). Sized images, stable fonts, and avoiding late-injected banners protect CLS; light JS protects INP.",
          ar: "Core Web Vitals مقاييس منتج: LCP و INP و CLS. صور بمقاس وخطوط ثابتة وتجنّب بنرات متأخرة بيحموا CLS؛ JS خفيف بيحمي INP.",
        },
        {
          en: "Every page needs a unique `<title>`, honest meta description, `charset`, `viewport`, and preferably `rel=\"canonical\"`. Deep social tags (Open Graph / Twitter) live in the Head & Social Meta lesson — fundamentals stay here.",
          ar: "كل صفحة محتاجة `<title>` فريد و meta description صادق و `charset` و `viewport` ويفضّل `rel=\"canonical\"`. وسوم السوشيال العميقة في درس Head & Social Meta — الأساسيات هنا.",
        },
      ],
      keyPoints: [
        {
          en: "Indexable HTML in the first response",
          ar: "HTML قابل للفهرسة في أول استجابة",
        },
        {
          en: "Unique title + description + canonical per URL",
          ar: "title + description + canonical فريدين لكل URL",
        },
        {
          en: "Guard LCP, INP, and CLS like product bugs",
          ar: "عامل LCP و INP و CLS زي bugs منتج",
        },
        {
          en: "Semantic landmarks and headings help crawlers and users",
          ar: "Landmarks و headings الـ semantic بتساعد crawlers والمستخدمين",
        },
      ],
      code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FrontendCraft — HTML track</title>
  <meta name="description" content="Learn HTML with interactive labs and live sandboxes." />
  <link rel="canonical" href="https://example.com/html" />
</head>
<body>
  <main>
    <h1>HTML track</h1>
    <p>Primary copy ships in the first HTML response.</p>
  </main>
</body>`,
      expectedOutput: {
        en: "Crawlable head + visible main content (SSR-friendly)",
        ar: "head قابل للزحف + محتوى main ظاهر (مناسب لـ SSR)",
      },
      visualHint: {
        en: "A browser tab and share card populate from meta tags.",
        ar: "تاب المتصفح وكارت المشاركة بيتملّوا من الـ meta tags.",
      },
    },
  },
  {
    id: "html-10",
    order: 10,
    slug: "media-embed",
    difficulty: "advanced",
    readMinutes: 8,
    icon: "Clapperboard",
    visualizer: "media-stage",
    content: {
      title: {
        en: "Media & Embeds",
        ar: "Media & Embeds",
      },
      summary: {
        en: "`audio`, `video`, and `iframe` bring rich media — responsibly.",
        ar: "`audio` و `video` و `iframe` بيجيبوا media غني — بمسؤولية.",
      },
      paragraphs: [
        {
          en: "Provide multiple `<source>`s when possible. Include `controls` and captions/tracks for video accessibility.",
          ar: "وفّر أكتر من `<source>` لما تقدر. حط `controls` و captions/tracks لـ accessibility الفيديو.",
        },
        {
          en: "`iframe` embeds third-party apps. Use `title`, sandboxing, and lazy loading when appropriate.",
          ar: "`iframe` بيضم تطبيقات طرف تالت. استخدم `title` و sandboxing و lazy loading لما يناسب.",
        },
        {
          en: "Don’t autoplay sound. Respect data and attention — media should be opt-in.",
          ar: "متشغّلش صوت تلقائي. احترم الداتا والانتباه — الـ media لازم تكون باختيار المستخدم.",
        },
      ],
      keyPoints: [
        {
          en: "`controls` for playable media",
          ar: "`controls` للـ media القابلة للتشغيل",
        },
        {
          en: "Title and sandbox iframes",
          ar: "عنوان و sandbox للـ iframes",
        },
        {
          en: "Avoid surprise autoplay audio",
          ar: "تجنّب autoplay للصوت بالمفاجأة",
        },
      ],
      code: `<video controls width="640" poster="/poster.jpg">
  <source src="/intro.webm" type="video/webm" />
  <source src="/intro.mp4" type="video/mp4" />
  <track kind="captions" src="/captions.vtt" srclang="en" label="English" />
</video>

<iframe
  title="Map"
  src="https://example.com/map"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
></iframe>`,
      expectedOutput: {
        en: "Accessible video player + titled lazy iframe",
        ar: "مشغّل فيديو accessible + iframe بعنوان و lazy",
      },
      visualHint: {
        en: "A media stage plays while an embed frame slides into place.",
        ar: "منصة media بتشتغل وإطار الـ embed بينزلق لمكانه.",
      },
    },
  },
];
