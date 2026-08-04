import type { LegacyLesson } from "@/content/tracks/_legacy";

export const legacyLessons: LegacyLesson[] = [
  {
    id: "html-1",
    order: 1,
    slug: "document-anatomy",
    difficulty: "beginner",
    readMinutes: 6,
    icon: "FileText",
    visualizer: "document-tree",
    content: {
      title: {
        en: "Document Anatomy",
        ar: "تشريح المستند",
      },
      summary: {
        en: "Every page starts with `<!DOCTYPE html>`, then `<html>`, `<head>`, and `<body>`.",
        ar: "كل صفحة بتبدأ بـ `<!DOCTYPE html>`، وبعدين `<html>` و `<head>` و `<body>`.",
      },
      paragraphs: [
        {
          en: "`<!DOCTYPE html>` must be the very first line — it tells the browser to use `modern HTML mode`. Without it, `quirks mode` can break `layout`.",
          ar: "`<!DOCTYPE html>` لازم يكون أول سطر في الملف — بيقول للمتصفح يستخدم `modern HTML mode`. من غيره ممكن يدخل `quirks mode` ويكسر الـ `layout`.",
        },
        {
          en: "Inside `<head>`, two `<meta>` tags matter early: `charset=\"UTF-8\"` so text (including Arabic and emoji) reads correctly, and `name=\"viewport\"` so the page scales properly on phones.",
          ar: "جوّه الـ `<head>`، وسمين `<meta>` مهمين بدري: `charset=\"UTF-8\"` عشان النص (بالعربي والإيموجي كمان) يتقرا صح، و `name=\"viewport\"` عشان الصفحة تتظبط على الموبايل.",
        },
        {
          en: "`<html>` is the `root` — set `lang` on it (`lang=\"en\"` / `lang=\"ar\"`) so screen readers pick the right pronunciation. `<head>` holds `metadata`; `<body>` holds one `<h1>` plus everything users actually see.",
          ar: "`<html>` هو الـ `root` — حط عليه `lang` (`lang=\"en\"` / `lang=\"ar\"`) عشان قارئات الشاشة تنطق صح. `<head>` للـ `metadata`؛ `<body>` فيه `<h1>` واحد وكل حاجة المستخدم بيشوفها.",
        },
      ],
      keyPoints: [
        {
          en: "`<!DOCTYPE html>` is always the first line",
          ar: "`<!DOCTYPE html>` دايمًا أول سطر",
        },
        {
          en: "`<head>` = metadata, `<body>` = visible content",
          ar: "`<head>` = `metadata`، `<body>` = المحتوى الظاهر",
        },
        {
          en: "Set `lang` on `<html>`",
          ar: "حط `lang` على `<html>`",
        },
        {
          en: "`<meta charset=\"UTF-8\">` belongs early inside `<head>`",
          ar: "`<meta charset=\"UTF-8\">` مكانه بدري جوّه الـ `<head>`",
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
        en: "Build the shell: doctype → lang → charset → viewport → title → body.",
        ar: "ابنِ الهيكل: doctype → lang → charset → viewport → title → body.",
      },
    },
  },
  {
    id: "html-2",
    order: 2,
    slug: "semantic-structure",
    difficulty: "beginner",
    readMinutes: 9,
    icon: "Layers",
    visualizer: "semantic-blocks",
    content: {
      title: {
        en: "Semantic Structure",
        ar: "البنية الـ `semantic`",
      },
      summary: {
        en: "`header`, `nav`, `main`, `section`, `article`, `footer` describe meaning — not just boxes.",
        ar: "`header` و `nav` و `main` و `section` و `article` و `footer` بتوصف المعنى — مش بس صناديق.",
      },
      paragraphs: [
        {
          en: "`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` describe what a region *is* — not just how it looks. Browsers, screen readers, and search engines all read this structure.",
          ar: "`<header>` و `<nav>` و `<main>` و `<section>` و `<article>` و `<footer>` بتوصف إيه طبيعة المنطقة — مش شكلها بس. المتصفح وقارئات الشاشة ومحركات البحث كلهم بيقروا البنية دي.",
        },
        {
          en: "Use exactly one `<main>` per page for the primary content. `<section>` groups related content under a heading; `<article>` wraps something self-contained like a blog post or card.",
          ar: "استخدم `<main>` واحد بس لكل صفحة للمحتوى الأساسي. `<section>` بتجمع محتوى مرتبط تحت `heading`؛ `<article>` بتلف حاجة مستقلة زي بوست أو كارت.",
        },
        {
          en: "Don’t build a soup of nested `<div>`s when a semantic tag already fits — it costs nothing extra and gives screen reader users free navigation landmarks.",
          ar: "متعملش شوربة `<div>` متداخلة لو في `semantic tag` مناسب أصلًا — مش هيكلفك حاجة زيادة، وهيدّي لمستخدمي قارئات الشاشة `landmarks` للتنقل ببلاش.",
        },
      ],
      keyPoints: [
        {
          en: "Semantics = meaning for tools and people",
          ar: "`Semantics` = معنى للأدوات والناس",
        },
        {
          en: "One `<main>` per page",
          ar: "`<main>` واحد لكل صفحة",
        },
        {
          en: "Choose tags by role, not by looks",
          ar: "اختار الـ `tags` حسب الدور، مش الشكل",
        },
        {
          en: "Semantic tags give screen readers free navigation landmarks",
          ar: "الـ `semantic tags` بتدّي قارئات الشاشة `landmarks` تنقل ببلاش",
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
        en: "Landmark regions: `header` → `main` → `footer`",
        ar: "مناطق الصفحة: `header` → `main` → `footer`",
      },
      visualHint: {
        en: "Walk header → nav → main → section → article → footer — tree, page preview, and screen-reader roles light up together.",
        ar: "امشي header → nav → main → section → article → footer — الشجرة ومعاينة الصفحة وأدوار قارئ الشاشة بتنور مع بعض.",
      },
    },
  },
  {
    id: "html-3",
    order: 3,
    slug: "text-headings",
    difficulty: "beginner",
    readMinutes: 6,
    icon: "Heading",
    visualizer: "heading-ladder",
    content: {
      title: {
        en: "Text & Headings",
        ar: "النص والعناوين",
      },
      summary: {
        en: "Headings make hierarchy. Paragraphs and inline tags shape readable text.",
        ar: "الـ `headings` بتعمل `hierarchy`. الـ `paragraphs` ووسوم الـ `inline` بتشكّل نص مقروء.",
      },
      paragraphs: [
        {
          en: "`<h1>` through `<h6>` build the page outline, from most to least important. Use them in order — don’t skip from `<h1>` to `<h4>` just to get a smaller size; that’s a job for CSS.",
          ar: "من `<h1>` لـ `<h6>` بيبنوا `outline` الصفحة، من الأهم للأقل. استخدمهم بالترتيب — متقفزش من `<h1>` لـ `<h4>` عشان بس الحجم يصغر؛ ده شغل الـ `CSS`.",
        },
        {
          en: "`<p>` wraps a paragraph of text. Keep one idea per paragraph so both the reading flow and the document outline stay easy to follow.",
          ar: "`<p>` بتلف فقرة نص. خلّي فكرة واحدة لكل فقرة عشان القراءة والـ `outline` يفضلوا سهل متابعتهم.",
        },
        {
          en: "Headings and paragraphs are the skeleton of readable content — inline formatting tags like `<strong>` and `<em>` build on top of them in the next lesson.",
          ar: "الـ `headings` والـ `paragraphs` هما هيكل المحتوى المقروء — وسوم التنسيق الـ `inline` زي `<strong>` و `<em>` بتبني عليهم في الدرس اللي بعده.",
        },
      ],
      keyPoints: [
        {
          en: "Heading order = document outline",
          ar: "ترتيب الـ `headings` = `document outline`",
        },
        {
          en: "Style with CSS, structure with HTML",
          ar: "الشكل بـ `CSS`، والبنية بـ `HTML`",
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
        en: "Full `h1`–`h6` ladder + a clear paragraph",
        ar: "سلم `h1`–`h6` كامل + فقرة واضحة",
      },
      visualHint: {
        en: "Steps climb the full ladder from h1 to h6.",
        ar: "الدرجات بتطلع السلم كامل من `h1` لـ `h6`.",
      },
    },
  },
  {
    id: "html-3b",
    order: 4,
    slug: "text-formatting",
    difficulty: "beginner",
    readMinutes: 5,
    icon: "Highlighter",
    visualizer: "text-format",
    content: {
      title: {
        en: "Text Formatting",
        ar: "تنسيق النص",
      },
      summary: {
        en: "Common inline (and quote) tags that add meaning — not only bold or italic looks.",
        ar: "أشهر وسوم الـ `inline` (والاقتباس) اللي بتضيف معنى — مش شكل `bold` أو `italic` بس.",
      },
      paragraphs: [
        {
          en: "Prefer semantic tags: `<strong>` for importance, `<em>` for stress. `<b>` and `<i>` are purely stylistic — use them only when there is no extra meaning to convey.",
          ar: "فضّل وسوم الـ `semantic`: `<strong>` للأهمية، `<em>` للتشديد. `<b>` و `<i>` للشكل بس — استخدمهم لما مفيش معنى زيادة عايز توصله.",
        },
        {
          en: "Edits and highlights: `<mark>` highlights relevance, `<del>` / `<ins>` show removals and additions, and `<s>` marks text that’s no longer accurate. Avoid `<u>` for plain styling — an underline usually reads as a link.",
          ar: "تعديلات وتمييز: `<mark>` للتمييز، `<del>` / `<ins>` للحذف والإضافة، و `<s>` لنص بقى غير صحيح. تجنّب `<u>` للتزيين بس — الخط تحت النص بيتقرا غالبًا كإنه `link`.",
        },
        {
          en: "For quotes, `<q>` handles a short inline quote and `<blockquote>` a longer one, both paired with `<cite>` for the source. For technical bits, `<code>` and `<abbr title=\"...\">` add real meaning beyond plain text.",
          ar: "للاقتباس، `<q>` لاقتباس قصير جوّه السطر، و `<blockquote>` للأطول، واتنينهم بيترافقوا مع `<cite>` للمصدر. وللحاجات التقنية، `<code>` و `<abbr title=\"...\">` بيضيفوا معنى حقيقي أكتر من نص عادي.",
        },
      ],
      keyPoints: [
        {
          en: "Meaning first — CSS can restyle any tag",
          ar: "المعنى أولًا — `CSS` يقدر يستايل أي `tag`",
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
          ar: "متظللش نص عادي عشان يبان `link`",
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
        en: "Semantic formatting: emphasis, `code`/`kbd`, `sub`/`sup`, `mark`/`del`/`ins`, quotes",
        ar: "تنسيق semantic: emphasis و `code`/`kbd` و `sub`/`sup` و `mark`/`del`/`ins` والاقتباس",
      },
      visualHint: {
        en: "Common formatting tags light up one by one — meaning, not only style.",
        ar: "أشهر `formatting tags` بتنور واحدة ورا التانية — المعنى، مش الشكل بس.",
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
        ar: "اللينكات والصور",
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
          ar: "`alt` بيوصف الصورة للـ `accessibility` ولما الصورة متتحملش. الصور الديكور ممكن `alt=\"\"`.",
        },
        {
          en: "Prefer modern formats (`webp`/`avif`) when you control assets, and always set width/height or CSS to reduce layout shift.",
          ar: "فضّل صيغ حديثة (`webp`/`avif`) لما تتحكم في الأصول، وحدد `width`/`height` أو `CSS` تقلل `layout shift`.",
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
<img
  src="students-coding.svg"
  alt="Students coding together"
  width="800"
  height="450"
/>`,
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
        ar: "القوائم",
      },
      summary: {
        en: "`ul` for bullets, `ol` for order, `dl` for terms and definitions.",
        ar: "`ul` للنقاط، `ol` للترتيب، `dl` للمصطلحات والتعريفات.",
      },
      paragraphs: [
        {
          en: "`<ul>` makes an unordered (bulleted) list — use it when order doesn’t matter, like a set of features. `<ol>` makes an ordered (numbered) list — use it when order matters, like steps in a recipe. Either way, each item is an `<li>`.",
          ar: "`<ul>` بتعمل قائمة `unordered` (نقط) — استخدمها لما الترتيب مش مهم، زي مجموعة مميزات. `<ol>` بتعمل قائمة `ordered` (أرقام) — استخدمها لما الترتيب مهم، زي خطوات وصفة. في الحالتين، كل عنصر `<li>`.",
        },
        {
          en: "Nest a list inside an `<li>` when you need sub-steps, but keep nesting shallow. The `start` attribute on `<ol>` can change where numbering begins.",
          ar: "تقدر تعشّش `list` جوّه `<li>` لما تحتاج خطوات فرعية، بس خليه `shallow`. خاصية `start` على `<ol>` تقدر تغيّر بداية الترقيم.",
        },
        {
          en: "`<dl>`, `<dt>`, `<dd>` are a third kind of list — built for term/definition pairs, like a glossary.",
          ar: "`<dl>` و `<dt>` و `<dd>` نوع تالت من القوائم — مصمم لأزواج مصطلح/تعريف، زي القاموس.",
        },
      ],
      keyPoints: [
        {
          en: "`ul` = unordered, `ol` = ordered",
          ar: "`ul` = `unordered`، `ol` = `ordered`",
        },
        {
          en: "Only `<li>` directly inside `ul`/`ol`",
          ar: "جوّه `ul`/`ol` حط `<li>` مباشرة بس",
        },
        {
          en: "`dl` for term → definition pairs",
          ar: "`dl` لأزواج `term` → `definition`",
        },
        {
          en: "Keep nested lists shallow",
          ar: "خلّي القوائم المتداخلة `shallow`",
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
        ar: "العناصر بتنزل في `stacks`: `unordered` و `ordered` و `definition`.",
      },
    },
  },
  {
    id: "html-6",
    order: 7,
    slug: "forms-inputs",
    difficulty: "intermediate",
    readMinutes: 6,
    icon: "FormInput",
    visualizer: "form-flow",
    content: {
      title: {
        en: "Forms & Inputs",
        ar: "النماذج والـ `inputs`",
      },
      summary: {
        en: "Forms collect data. Labels, names, and input types make them usable and accessible.",
        ar: "الـ `forms` بتجمع `data`. الـ `labels` والـ `names` وأنواع الـ `input` بتخليها `usable` و `accessible`.",
      },
      paragraphs: [
        {
          en: "Wrap controls in `<form>`. Every control needs a `<label>` — connect it with matching `for`/`id`, or wrap the input inside the `<label>` itself.",
          ar: "حط الـ `controls` جوّه `<form>`. كل `control` محتاج `<label>` — اربطه بـ `for`/`id` متطابقين، أو لف الـ `input` جوّه الـ `<label>` نفسه.",
        },
        {
          en: "`name` is what actually gets submitted, so don’t skip it. Choose `type` on purpose too — `email`, `password`, `number`, `checkbox`, `radio`, `file`… each changes the keyboard and behavior users get.",
          ar: "`name` هو اللي فعلًا بيتبعت، فمتنساهوش. واختار `type` بوعي كمان — `email` و `password` و `number` و `checkbox` و `radio` و `file`… كل واحد بيغيّر الكيبورد والسلوك اللي المستخدم بيشوفه.",
        },
        {
          en: "Buttons need a `type` too: `submit` sends the form (the default inside `<form>`), `button` does nothing on its own and waits for JavaScript, and `reset` clears every field back to its default.",
          ar: "الأزرار كمان محتاجة `type`: `submit` بيبعت الفورم (وهو الافتراضي جوّه `<form>`)، `button` مبيعملش حاجة لوحده ومستني `JavaScript`، و `reset` بيمسح كل الحقول لقيمتها الافتراضية.",
        },
        {
          en: "Attributes like `required`, `min`, `max`, and `pattern` give free, built-in validation before any JavaScript runs.",
          ar: "خصائص زي `required` و `min` و `max` و `pattern` بتديك التحقق من البيانات (Input Validation) جاهز ببلاش قبل أي `JavaScript`.",
        },
      ],
      keyPoints: [
        {
          en: "Label every input",
          ar: "اعمل `label` لكل `input`",
        },
        {
          en: "`name` matters for submission, `type` matters for behavior",
          ar: "`name` مهم في الـ `submission`، و `type` مهم في السلوك",
        },
        {
          en: "Buttons need an explicit `type`: `submit`, `button`, or `reset`",
          ar: "الأزرار محتاجة `type` واضح: `submit` أو `button` أو `reset`",
        },
        {
          en: "Native validation attributes help before JavaScript",
          ar: "خصائص التحقق من البيانات الأصلية بتساعد قبل `JavaScript`",
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
        ar: "فورم تسجيل accessible فيه email + password",
      },
      visualHint: {
        en: "Watch focus move label → email → password → checkbox → submit.",
        ar: "اتفرّج على الـ `focus` وهو بيمشي `label` → `email` → `password` → `checkbox` → `submit`.",
      },
    },
  },
  {
    id: "html-7",
    order: 8,
    slug: "tables",
    difficulty: "intermediate",
    readMinutes: 5,
    icon: "Table",
    visualizer: "table-grid",
    content: {
      title: {
        en: "Tables",
        ar: "الجداول",
      },
      summary: {
        en: "Tables are for tabular data — not page layout.",
        ar: "الـ `tables` للبيانات الجدولية — مش لـ `layout` الصفحة.",
      },
      paragraphs: [
        {
          en: "Structure: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`. Use `<caption>` to title the table.",
          ar: "البنية: `<table>` و `<thead>` و `<tbody>` و `<tr>` و `<th>` و `<td>`. استخدم `<caption>` لعنوان الجدول.",
        },
        {
          en: "`scope=\"col\"` / `scope=\"row\"` on `<th>` clarifies headers for `assistive tech`.",
          ar: "`scope=\"col\"` / `scope=\"row\"` على `<th>` بيوضّح الـ `headers` لتقنيات المساعدة.",
        },
        {
          en: "For layout grids, use CSS — tables for comparing rows of related values.",
          ar: "لـ `layout grids` استخدم `CSS` — الـ `tables` لمقارنة صفوف قيم مرتبطة.",
        },
      ],
      keyPoints: [
        {
          en: "Data tables ≠ layout tables",
          ar: "`Data tables` ≠ `layout tables`",
        },
        {
          en: "Caption + scope improve accessibility",
          ar: "الـ `caption` والـ `scope` بيحسّنوا الـ `accessibility`",
        },
        {
          en: "Separate head and body sections",
          ar: "افصل أقسام `head` و `body`",
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
        ar: "اتفرّج على الجدول بيتبني طبقة طبقة — `caption`، بعدين `headers`، بعدين الصفوف، بعدين `scope`.",
      },
    },
  },
  {
    id: "html-8",
    order: 17,
    slug: "accessibility-basics",
    difficulty: "advanced",
    readMinutes: 6,
    icon: "HeartHandshake",
    visualizer: "a11y-check",
    content: {
      title: {
        en: "Accessibility (a11y) & Screen Readers",
        ar: "إمكانية الوصول (`a11y`) وقارئات الشاشة",
      },
      summary: {
        en: "Dedicated a11y lesson — how NVDA/VoiceOver hear your HTML, plus ARIA, keyboard, and focus rules you can ship.",
        ar: "درس `a11y` مخصص — إزاي `NVDA`/`VoiceOver` بيسمعوا `HTML`، وكمان قواعد `ARIA` والكيبورد والـ `focus` تقدر تنشرها.",
      },
      paragraphs: [
        {
          en: "Screen readers (NVDA, VoiceOver, JAWS) walk the accessibility tree built from your DOM — not from what CSS paints. Native elements (`button`, `a`, `label`, landmarks) expose name, role, and value for free.",
          ar: "قارئات الشاشة (`NVDA` و `VoiceOver` و `JAWS`) بتمشي على `accessibility tree` من الـ `DOM` — مش من شكل `CSS`. العناصر الأصلية (`button` و `a` و `label` والـ `landmarks`) بتعرض الاسم والدور والقيمة ببلاش.",
        },
        {
          en: "The keyboard path is non-negotiable: `Tab` order, `Enter`/`Space` to activate, `Escape` to dismiss dialogs. Every mouse action needs a keyboard equivalent and a visible focus style.",
          ar: "مسار الكيبورد أساسي: ترتيب `Tab`، `Enter`/`Space` للتفعيل، `Escape` لقفل الـ `dialogs`. كل فعل ماوس محتاج بديل كيبورد و `focus` ظاهر.",
        },
        {
          en: "ARIA supplements native HTML — it never replaces it. Reach for `aria-expanded`, `aria-live`, or `aria-labelledby` only when no native element fits, and keep one `<main>` with honest heading ranks.",
          ar: "`ARIA` بتكمّل `HTML` الأصلي — مش بتستبدله. استخدم `aria-expanded` أو `aria-live` أو `aria-labelledby` لما مفيش عنصر أصلي يأدي الغرض، وخلّي `<main>` واحد بمراتب `headings` صادقة.",
        },
        {
          en: "Manage focus after view changes — opening a dialog moves focus inside it, closing returns focus to the button that opened it. Announce async results with a polite `aria-live` region instead of a silent swap.",
          ar: "أدِر الـ `focus` بعد تغيّر الشاشة — فتح `dialog` بينقل الـ `focus` جوّه، وقفله بيرجّعه للزر اللي فتحه. أعلن نتائج `async` بـ `aria-live` مهذب بدل تغيير صامت.",
        },
      ],
      keyPoints: [
        {
          en: "Native controls first — ARIA only when needed",
          ar: "`Native controls` أولًا — `ARIA` عند الحاجة بس",
        },
        {
          en: "Name, role, value must stay in sync with UI state",
          ar: "الاسم والدور والقيمة لازم يطابقوا حالة الـ `UI`",
        },
        {
          en: "Keyboard + visible focus for every action",
          ar: "كيبورد + `focus` ظاهر لكل فعل",
        },
        {
          en: "Test with NVDA or VoiceOver on real pages",
          ar: "اختبر بـ `NVDA` أو `VoiceOver` على صفحات حقيقية",
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
<img
  src="https://placehold.co/640x360/1e293b/94a3b8.jpg?text=Sales+chart"
  alt="Sales grew 20% in March"
/>
<nav aria-label="Primary">…</nav>`,
      expectedOutput: {
        en: "Skip link, named landmarks, expandable control, meaningful alt",
        ar: "Skip link و landmarks مسمّاة و control قابل للتوسيع و `alt` مفهوم",
      },
      visualHint: {
        en: "Focus walks native controls — the panel shows what a screen reader announces (name · role · value).",
        ar: "الـ `focus` بيمشي على `native controls` — اللوحة بتوريك إيه اللي الـ `screen reader` بتعلنه (`name` · `role` · `value`).",
      },
    },
  },
  {
    id: "html-9",
    order: 15,
    slug: "meta-seo",
    difficulty: "advanced",
    readMinutes: 8,
    icon: "Globe",
    visualizer: "seo-crawl",
    content: {
      title: {
        en: "SEO Insights",
        ar: "رؤى `SEO`",
      },
      summary: {
        en: "Advanced SEO for HTML — how crawlers discover, render, and index pages; SSR vs CSR; titles, descriptions, canonicals, links, and structured data. Core Web Vitals live in Pro.",
        ar: "`SEO` متقدم للـ `HTML` — إزاي الـ `crawlers` بتكتشف الصفحة وترندرها وتفهرسها؛ `SSR` مقابل `CSR`؛ `titles` و `descriptions` و `canonicals` واللينكات و `structured data`. `Core Web Vitals` في Pro.",
      },
      paragraphs: [
        {
          en: "Search engines do not “see” your CSS paint first — they fetch a URL, parse HTML, follow links, and build an index. Crawl → render → index is the mental model, and Googlebot strongly prefers meaningful markup already in the first HTTP response: real headings, paragraphs, and `<a href>` links, not an empty `<div id=\"root\">` waiting for JavaScript.",
          ar: "محركات البحث مش بتشوف رسم `CSS` الأول — بتجيب `URL`، بتحلل `HTML`، بتتبع اللينكات، وبتبني فهرس. `Crawl` → `render` → `index` هو النموذج الذهني، و`Googlebot` بيفضّل `markup` معنوي موجود في أول استجابة `HTTP`: `headings` وفقرات و`<a href>` حقيقية، مش `<div id=\"root\">` فاضي مستني `JavaScript`.",
        },
        {
          en: "Primary copy that only appears after a slow client-side fetch is at risk, especially on mobile. Treat SSR or SSG as the default for marketing and docs pages — ship the document shell and main content from the server, then hydrate UI enhancements after. Don’t invent the whole article inside `useEffect`.",
          ar: "النص الأساسي اللي بيظهر بس بعد `fetch` بطيء على الـ `client` في خطر، خصوصًا على الموبايل. اعتبر `SSR` أو `SSG` الافتراضي لصفحات التسويق والـ `docs` — اطلع `document shell` والمحتوى الأساسي من السيرفر، وبعدين `hydrate` تحسينات الـ `UI`. متخترعش المقال كله جوّه `useEffect`.",
        },
        {
          en: "`<title>` is the strongest on-page signal you control: unique per URL, human-readable, matching the visible `<h1>`, roughly 50–60 characters. Meta `description` doesn’t rank pages directly but usually becomes the search snippet, so write one honest ~150–160 character sentence per page. `rel=\"canonical\"` (absolute HTTPS URL) tells search engines the preferred version when the same content is reachable multiple ways.",
          ar: "`<title>` أقوى إشارة بتتحكم فيها: فريد لكل `URL`، مقروء للبشر، ومتوافق مع `<h1>` الظاهر، وحوالي 50–60 حرف. الـ `Meta description` مش بترتب الصفحة مباشرة لكنها غالبًا بتبقى `snippet` النتيجة، فاكتب جملة صادقة حوالي 150–160 حرف لكل صفحة. و `rel=\"canonical\"` (رابط `HTTPS` مطلق) بيقول لمحركات البحث النسخة المفضّلة لما نفس المحتوى يوصل بأكتر من طريقة.",
        },
        {
          en: "Internal links with descriptive anchor text pass crawl paths and context (`Learn HTML forms` beats `click here`). One logical `<h1>`, honest heading ranks, and landmarks (`<main>`, `<nav>`, `<article>`) help both users and crawlers read the outline. Soft 404s and `javascript:`/`#` stubs don’t pass any equity.",
          ar: "اللينكات الداخلية بنص `anchor` وصفي بتمرّر مسارات الزحف والسياق (`Learn HTML forms` أحسن من `click here`). `<h1>` منطقي واحد ومراتب `headings` صادقة و`landmarks` (`<main>` و`<nav>` و`<article>`) بتساعد المستخدمين والـ `crawlers` يفهموا الـ `outline`. Soft 404s و stubs من نوع `javascript:`/`#` مش بتمرّر أي `equity`.",
        },
        {
          en: "Structured data (JSON-LD) can clarify type — Article, Course, FAQ — but only when it matches visible content; fake rich results get ignored or penalized. After every deploy, sanity-check unique titles/descriptions, working canonicals, and no accidental `noindex` in Search Console — indexing isn’t instant.",
          ar: "`Structured data` (`JSON-LD`) بيوضّح النوع — `Article` أو `Course` أو `FAQ` — بس لما يطابق المحتوى الظاهر؛ النتائج الغنية المزيفة بتتتجاهل أو تتعاقب. بعد كل `deploy`، افحص إن الـ `titles`/`descriptions` فريدة والـ `canonicals` شغالة ومفيش `noindex` بالغلط في `Search Console` — الفهرسة مش فورية.",
        },
      ],
      keyPoints: [
        {
          en: "Indexable HTML in the first response — not an empty mount node",
          ar: "`HTML` قابل للفهرسة في أول استجابة — مش `mount node` فاضي",
        },
        {
          en: "SSR/SSG for primary copy — CSR enhances after",
          ar: "`SSR`/`SSG` للنص الأساسي — `CSR` يعزّز بعدين",
        },
        {
          en: "Unique title + description + canonical per URL",
          ar: "`title` + `description` + `canonical` فريدين لكل `URL`",
        },
        {
          en: "Descriptive internal links + honest heading outline",
          ar: "لينكات داخلية وصفية + `outline` `headings` صادق",
        },
        {
          en: "JSON-LD only when it matches visible content",
          ar: "`JSON-LD` بس لما يطابق المحتوى الظاهر",
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
        ar: "مستند قابل للزحف — metadata في `head` و `JSON-LD` ومحتوى `main` ولينك حقيقي",
      },
      visualHint: {
        en: "Watch CSR thin HTML become SSR — title, description, canonical, then indexable body.",
        ar: "اتفرّج على `HTML` الـ `CSR` الرفيع يتحول لـ `SSR` — title و `description` و `canonical` وبعدين `body` قابل للفهرسة.",
      },
    },
  },
  {
    id: "html-10",
    order: 11,
    slug: "media-embed",
    difficulty: "advanced",
    readMinutes: 6,
    icon: "Clapperboard",
    visualizer: "media-stage",
    content: {
      title: {
        en: "Media & Embeds",
        ar: "الوسائط والـ `embeds`",
      },
      summary: {
        en: "`audio`, `video`, and `iframe` bring rich media — responsibly.",
        ar: "`audio` و `video` و `iframe` بيجيبوا media غني — بمسؤولية.",
      },
      paragraphs: [
        {
          en: "Both `<video>` and `<audio>` need the `controls` attribute — without it, users get a silent element with no way to play, pause, or adjust volume themselves.",
          ar: "`<video>` و `<audio>` الاتنين محتاجين خاصية `controls` — من غيرها المستخدم بياخد عنصر ساكت من غير أي طريقة يشغّل أو يوقّف أو يظبط الصوت بنفسه.",
        },
        {
          en: "Provide multiple `<source>`s so the browser picks a format it supports, and add `<track kind=\"captions\">` so video content works for deaf and hard-of-hearing users (and anyone watching on mute).",
          ar: "وفّر أكتر من `<source>` عشان المتصفح يختار الصيغة اللي بيدعمها، وضيف `<track kind=\"captions\">` عشان محتوى الفيديو يشتغل للصم وضعاف السمع (وأي حد بيتفرج بصوت مقفول).",
        },
        {
          en: "`<iframe>` embeds third-party content — always give it a `title` so screen readers can announce what it is, add `sandbox` to limit what the embedded page can do, and use `loading=\"lazy\"` so off-screen embeds don’t slow the initial page load.",
          ar: "`<iframe>` بيضم محتوى طرف تالت — دايمًا حط له `title` عشان قارئات الشاشة تعلن إيه هو، وضيف `sandbox` عشان تحدد الصفحة المضمّنة تعمل إيه، واستخدم `loading=\"lazy\"` عشان الـ `embeds` البعيدة عن الشاشة متبطئش تحميل الصفحة الأول.",
        },
        {
          en: "Never autoplay sound — it’s jarring and often against browser policy anyway. Media should be opt-in: the user presses play, not the page.",
          ar: "متشغّلش صوت تلقائي — ده مزعج، وغالبًا ضد سياسة المتصفح أصلًا. الـ `media` لازم تكون باختيار المستخدم: هو اللي بيضغط `play`، مش الصفحة.",
        },
      ],
      keyPoints: [
        {
          en: "`controls` on both `<video>` and `<audio>`",
          ar: "`controls` على `<video>` و `<audio>` الاتنين",
        },
        {
          en: "Multiple `<source>`s for format fallback",
          ar: "أكتر من `<source>` كـ `fallback` للصيغة",
        },
        {
          en: "`<track kind=\"captions\">` for video accessibility",
          ar: "`<track kind=\"captions\">` لـ `accessibility` الفيديو",
        },
        {
          en: "Give iframes a `title`, `sandbox`, and `loading=\"lazy\"`",
          ar: "ادّي الـ `iframe` `title` و `sandbox` و `loading=\"lazy\"`",
        },
        {
          en: "Avoid surprise autoplay audio",
          ar: "تجنّب `autoplay` للصوت بالمفاجأة",
        },
      ],
      code: `<video
  controls
  width="640"
  poster="https://placehold.co/640x360/0f172a/38bdf8.jpg?text=Video+poster"
>
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
        ar: "مشغّل فيديو accessible + `iframe` بعنوان و `lazy`",
      },
      visualHint: {
        en: "A media stage plays while an embed frame slides into place.",
        ar: "منصة media بتشتغل وإطار الـ embed بينزلق لمكانه.",
      },
    },
  },
];
