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
        en: "Watch the DOM tree reveal Parent → Child → Text — use Play, Pause, Stop, or Step.",
        ar: "اتفرّج على شجرة الـ DOM وهي بتظهر Parent → Child → Text — استخدم Play أو Pause أو Stop أو Step.",
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
          en: "`<p>` wraps paragraphs. Keep one idea per paragraph so the outline and reading flow stay clear.",
          ar: "`<p>` للفقرات. فكرة واحدة لكل فقرة عشان الـ outline والقراءة يفضلوا واضحين.",
        },
        {
          en: "Inline formatting tags (`<strong>`, `<em>`, `<code>`, …) get their own lesson next — this one stays on headings + paragraphs.",
          ar: "tags التنسيق الـ inline (`<strong>` و `<em>` و `<code>` و…) ليها الدرس اللي بعده — الدرس ده مركز على headings + paragraphs.",
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
          en: "One idea per `<p>`",
          ar: "فكرة واحدة لكل `<p>`",
        },
      ],
      code: `<h1>Site title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h4>Detail</h4>
<h5>Minor note</h5>
<h6>Finest label</h6>
<p>Headings build the outline. Paragraphs carry the story.</p>`,
      expectedOutput: {
        en: "Full h1–h6 ladder + a clear paragraph",
        ar: "سلم h1–h6 كامل + فقرة واضحة",
      },
      visualHint: {
        en: "Steps climb the full ladder from h1 to h6.",
        ar: "الدرجات بتطلع السلم كامل من h1 لـ h6.",
      },
    },
  },
  {
    id: "html-3b",
    order: 4,
    slug: "text-formatting",
    difficulty: "beginner",
    readMinutes: 8,
    icon: "Highlighter",
    visualizer: "text-format",
    content: {
      title: {
        en: "Text Formatting",
        ar: "Text Formatting",
      },
      summary: {
        en: "Common inline (and quote) tags that add meaning — not only bold or italic looks.",
        ar: "أشهر tags الـ inline (والاقتباس) اللي بتضيف معنى — مش شكل bold أو italic بس.",
      },
      paragraphs: [
        {
          en: "Prefer semantic tags: `<strong>` for importance, `<em>` for stress. `<b>` and `<i>` are stylistic when there is no extra meaning.",
          ar: "فضّل tags الـ semantic: `<strong>` للأهمية، `<em>` للتشديد. `<b>` و `<i>` للشكل لما مفيش معنى زيادة.",
        },
        {
          en: "Edits and highlights: `<mark>` highlights relevance, `<del>` / `<ins>` show removals and additions, `<s>` marks outdated text, `<u>` is for unarticulated annotation (use carefully — don’t fake links).",
          ar: "تعديلات وتمييز: `<mark>` للتمييز، `<del>` / `<ins>` للحذف والإضافة، `<s>` لنص قديم، `<u>` لتظليل غير ملفوظ (بحذر — متقلّدش links).",
        },
        {
          en: "Tech & data: `<code>`, `<kbd>`, `<samp>`, `<var>`, `<abbr title>` , `<time datetime>`, plus `<sub>` / `<sup>` for indexes and formulas.",
          ar: "تقني وبيانات: `<code>` و `<kbd>` و `<samp>` و `<var>` و `<abbr title>` و `<time datetime>`، وكمان `<sub>` / `<sup>` للفهارس والمعادلات.",
        },
        {
          en: "Quotes: `<q>` for short inline quotes, `<cite>` for the title of a work, `<blockquote>` + optional `<cite>` for longer quotes. Use `<small>` for side comments / fine print.",
          ar: "اقتباس: `<q>` لاقتباس قصير، `<cite>` لعنوان عمل، `<blockquote>` + `<cite>` اختياري للاقتباس الطويل. `<small>` للتعليقات الجانبية / fine print.",
        },
      ],
      keyPoints: [
        {
          en: "Meaning first — CSS can restyle any tag",
          ar: "المعنى أولًا — CSS يقدر يستايل أي tag",
        },
        {
          en: "`<strong>` / `<em>` ≠ `<b>` / `<i>`",
          ar: "`<strong>` / `<em>` ≠ `<b>` / `<i>`",
        },
        {
          en: "Give `<abbr>` a `title`, `<time>` a `datetime`",
          ar: "ادي `<abbr>` `title`، و `<time>` `datetime`",
        },
        {
          en: "Don’t underline plain text to look like a link",
          ar: "متظللش نص عادي عشان يبان link",
        },
      ],
      code: `<p>
  Learn <strong>HTML</strong> with <em>clarity</em>.
  Press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save.
  Use <code>npm run dev</code> — output <samp>ready</samp>.
</p>
<p>
  H<sub>2</sub>O · E=mc<sup>2</sup> ·
  <abbr title="HyperText Markup Language">HTML</abbr> ·
  <time datetime="2026-08-02">Aug 2, 2026</time>
</p>
<p>
  <mark>Remember</mark>: <del>old copy</del> <ins>new copy</ins>.
  <q>Short quote</q> — <cite>MDN</cite>
</p>
<blockquote>
  <p>Longer quoted passage for articles and docs.</p>
  <footer>— <cite>FrontendCraft</cite></footer>
</blockquote>
<p><small>Fine print and side notes.</small></p>`,
      expectedOutput: {
        en: "Semantic formatting: emphasis, code/kbd, sub/sup, mark/del/ins, quotes",
        ar: "تنسيق semantic: emphasis و code/kbd و sub/sup و mark/del/ins والاقتباس",
      },
      visualHint: {
        en: "Common formatting tags light up one by one — meaning, not only style.",
        ar: "أشهر formatting tags بتولّع واحدة ورا التانية — المعنى، مش الشكل بس.",
      },
    },
  },
  {
    id: "html-4",
    order: 5,
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
    order: 6,
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
    order: 7,
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
        en: "Watch focus move label → email → password → checkbox → submit.",
        ar: "اتفرّج على الـ focus وهو بيمشي label → email → password → checkbox → submit.",
      },
    },
  },
  {
    id: "html-7",
    order: 8,
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
        en: "Watch the table build layer by layer — caption, headers, then rows, then scope.",
        ar: "اتفرّج على الجدول بيتبني طبقة طبقة — caption، بعدين headers، بعدين الصفوف، بعدين scope.",
      },
    },
  },
  {
    id: "html-8",
    order: 15,
    slug: "accessibility-basics",
    difficulty: "advanced",
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
        en: "Focus walks native controls — the panel shows what a screen reader announces (name · role · value).",
        ar: "الـ focus بيمشي على native controls — اللوحة بتوريك إيه اللي الـ screen reader بتعلنه (name · role · value).",
      },
    },
  },
  {
    id: "html-9",
    order: 16,
    slug: "meta-seo",
    difficulty: "advanced",
    readMinutes: 16,
    icon: "Search",
    visualizer: "seo-crawl",
    content: {
      title: {
        en: "SEO Insights",
        ar: "SEO Insights",
      },
      summary: {
        en: "Advanced SEO for HTML — how crawlers discover, render, and index pages; SSR vs CSR; titles, descriptions, canonicals, links, and structured data. Core Web Vitals live in Pro.",
        ar: "SEO متقدم للـ HTML — إزاي الـ crawlers بتكتشف الصفحة وترندرها وتفهرسها؛ SSR مقابل CSR؛ titles و descriptions و canonicals واللينكات و structured data. Core Web Vitals في Pro.",
      },
      paragraphs: [
        {
          en: "Search engines do not “see” your CSS paint first — they fetch a URL, parse HTML, follow links, and build an index. Googlebot and others prefer meaningful markup in the first HTTP response: real headings, paragraphs, and `<a href>` links — not an empty `<div id=\"root\">` waiting for JavaScript.",
          ar: "محركات البحث مش بتشوف رسم CSS الأول — بتجيب URL، بتحلل HTML، بتتبع اللينكات، وبتبني فهرس. Googlebot وغيره بيفضّلوا markup معنوي في أول استجابة HTTP: headings وفقرات و `<a href>` حقيقية — مش `<div id=\"root\">` فاضي مستني JavaScript.",
        },
        {
          en: "Crawl → render → index is the mental model. Discovery happens via sitemaps, internal links, and external links. Rendering may run your JS later, but primary copy that only appears after a slow client fetch is at risk — especially on mobile and slow networks. Treat SSR, SSG, or solid prerender as the default for marketing and docs pages.",
          ar: "Crawl → render → index هو النموذج الذهني. الاكتشاف بيحصل عبر sitemaps ولينكات داخلية وخارجية. الرندر ممكن يشغّل JS بعدين، لكن النص الأساسي اللي بيظهر بعد fetch بطيء على الـ client في خطر — خصوصًا على الموبايل والشبكات البطيئة. اعتبر SSR أو SSG أو prerender محترم الافتراضي لصفحات التسويق والـ docs.",
        },
        {
          en: "CSR can still rank after the crawler renders the page, but empty shells delay discovery of titles, headings, and equity-passing links. Pattern: ship the document shell and primary content from the server; hydrate UI enhancements afterward. Do not invent the whole article in `useEffect`.",
          ar: "CSR لسه ممكن يترتب بعد ما الـ crawler يرندر الصفحة، لكن الـ shells الفاضية بتأخّر اكتشاف العناوين والـ headings واللينكات اللي بتمرّر الـ equity. النمط: اطلع document shell والمحتوى الأساسي من السيرفر؛ وبعدين hydrate لتحسينات الـ UI. متخترعش المقال كله جوّه `useEffect`.",
        },
        {
          en: "`<title>` is the strongest on-page SERP signal you control in HTML. Make it unique per indexable URL, human-readable, and aligned with the visible `<h1>`. Roughly 50–60 characters keeps it from truncating awkwardly. Avoid “Untitled”, duplicated site-wide titles, and keyword stuffing.",
          ar: "`<title>` أقوى إشارة SERP على الصفحة بتتحكم فيها من HTML. خليه فريد لكل URL قابل للفهرسة، مقروء للبشر، ومتوافق مع `<h1>` الظاهر. حوالي 50–60 حرف بيمنع القص الغريب. تجنّب “Untitled” والعناوين المكررة على الموقع كله وحشو الكلمات.",
        },
        {
          en: "Meta description does not directly rank pages, but it often becomes the SERP snippet and drives CTR. Write one honest sentence (about 150–160 characters) that matches the page. Duplicate or missing descriptions waste the richest preview text Google might otherwise invent from body copy.",
          ar: "Meta description مش بترتب الصفحات مباشرة، لكنها غالبًا بتبقى snippet في النتائج وبتأثر على CTR. اكتب جملة صادقة (حوالي 150–160 حرف) تطابق الصفحة. الوصف المكرر أو الناقص بيضيّع أغنى نص معاينة ممكن Google يطلعه من الـ body.",
        },
        {
          en: "`rel=\"canonical\"` tells search engines the preferred URL when the same content is reachable via parameters, trailing slashes, or mirrors. Use absolute HTTPS URLs. Pair with consistent internal linking — do not point nav links at three variants of the same lesson.",
          ar: "`rel=\"canonical\"` بيقول لمحركات البحث الـ URL المفضّل لما نفس المحتوى يوصل عبر parameters أو trailing slashes أو مرايا. استخدم روابط HTTPS مطلقة. واربط ده بلينكات داخلية متسقة — متوجّهش لينكات الـ nav لثلاث نسخ من نفس الدرس.",
        },
        {
          en: "Internal links with descriptive anchor text pass crawl paths and context (`Learn HTML forms` beats `click here`). One logical `<h1>`, honest heading ranks, and landmarks (`<main>`, `<nav>`, `<article>`) help both users and crawlers understand the outline. Soft 404s (HTTP 200 with “not found” copy) and `javascript:` / `#` stubs do not pass equity.",
          ar: "اللينكات الداخلية بنص anchor وصفي بتمرّر مسارات الزحف والسياق (`Learn HTML forms` أحسن من `click here`). `<h1>` منطقي واحد ومراتب headings صادقة و landmarks (`<main>` و `<nav>` و `<article>`) بتساعد المستخدمين والـ crawlers يفهموا الـ outline. Soft 404s (HTTP 200 بنص “not found”) و stubs من نوع `javascript:` / `#` مش بتمرّر equity.",
        },
        {
          en: "Structured data (JSON-LD) can clarify type — Article, Course, FAQ — but it must match visible content. Fake rich results get ignored or penalized. Social preview tags (Open Graph / Twitter) live in Head & Social Meta; page-experience metrics (LCP, INP, CLS) live in Pro: Core Web Vitals.",
          ar: "Structured data (JSON-LD) بيوضّح النوع — Article أو Course أو FAQ — لكن لازم يطابق المحتوى الظاهر. النتائج الغنية المزيفة بتتتجاهل أو تتعاقب. وسوم معاينة السوشيال في درس Head & Social Meta؛ مقاييس تجربة الصفحة (LCP و INP و CLS) في درس Pro: Core Web Vitals.",
        },
        {
          en: "Ops checklist after every deploy: unique titles/descriptions, working canonicals, crawlable nav, no accidental `noindex` on public lessons, and a sanity check in Search Console (coverage + URL inspection). Indexing is not instant — fix the HTML first, then wait for recrawl.",
          ar: "Checklist تشغيل بعد كل deploy: titles/descriptions فريدة، canonicals شغالة، nav قابل للزحف، مفيش `noindex` بالغلط على دروس عامة، وفحص سريع في Search Console (coverage + URL inspection). الفهرسة مش فورية — صلّح HTML الأول، وبعدين استنى إعادة الزحف.",
        },
      ],
      keyPoints: [
        {
          en: "Indexable HTML in the first response — not an empty mount node",
          ar: "HTML قابل للفهرسة في أول استجابة — مش mount node فاضي",
        },
        {
          en: "Unique title + description + canonical per URL",
          ar: "title + description + canonical فريدين لكل URL",
        },
        {
          en: "SSR/SSG for primary copy — CSR enhances after",
          ar: "SSR/SSG للنص الأساسي — CSR يعزّز بعدين",
        },
        {
          en: "Descriptive internal links + honest heading outline",
          ar: "لينكات داخلية وصفية + outline headings صادق",
        },
        {
          en: "JSON-LD only when it matches visible content",
          ar: "JSON-LD بس لما يطابق المحتوى الظاهر",
        },
        {
          en: "Verify indexing in Search Console after deploys",
          ar: "تحقق من الفهرسة في Search Console بعد كل deploy",
        },
      ],
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FrontendCraft — HTML track</title>
  <meta name="description" content="Learn HTML with interactive labs and live sandboxes." />
  <link rel="canonical" href="https://example.com/html" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "HTML track",
    "description": "Interactive HTML labs and live sandboxes."
  }
  </script>
</head>
<body>
  <main>
    <h1>HTML track</h1>
    <p>Primary copy ships in the first HTML response.</p>
    <a href="/html/forms-inputs">Learn HTML forms</a>
  </main>
</body>
</html>`,
      expectedOutput: {
        en: "Crawlable document — head metadata, JSON-LD, main content, real link",
        ar: "مستند قابل للزحف — metadata في head و JSON-LD ومحتوى main ولينك حقيقي",
      },
      visualHint: {
        en: "Watch CSR thin HTML become SSR — title, description, canonical, then indexable body.",
        ar: "اتفرّج على HTML الـ CSR الرفيع يتحول لـ SSR — title و description و canonical وبعدين body قابل للفهرسة.",
      },
    },
  },
  {
    id: "html-10",
    order: 11,
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
