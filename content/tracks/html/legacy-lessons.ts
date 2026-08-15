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
        ar: "شكل صفحة HTML",
      },
      summary: {
        en: "Every page starts with `<!DOCTYPE html>`, then `<html>`, `<head>`, and `<body>`.",
        ar: "كل صفحة بتبدأ بـ `<!DOCTYPE html>`، وبعدين `<html>` و `<head>` و `<body>`.",
      },
      paragraphs: [
        {
          en: "`<!DOCTYPE html>` must be line 1. It tells the browser to use modern HTML. Skip it, and the page can look broken (`quirks mode`).",
          ar: "`<!DOCTYPE html>` لازم يكون السطر الأول. بيقول للمتصفح يستخدم HTML الحديث. من غيره الصفحة ممكن تبوظ (`quirks mode`).",
        },
        {
          en: "Inside `<head>`, put two `<meta>` tags early: `charset=\"UTF-8\"` so Arabic and emoji read right, and `name=\"viewport\"` so the page fits phones.",
          ar: "جوّه `<head>`، حط وسمين `<meta>` بدري: `charset=\"UTF-8\"` عشان العربي والإيموجي يتقروا صح، و `name=\"viewport\"` عشان الصفحة تتظبط على الموبايل.",
        },
        {
          en: "`<html>` is the root. Set `lang` on it (`lang=\"en\"` or `lang=\"ar\"`) so screen readers speak the right language. `<head>` is extra info (title, meta). `<body>` is what people see — including one `<h1>`.",
          ar: "`<html>` هو جذر الصفحة. حط عليه `lang` (`lang=\"en\"` أو `lang=\"ar\"`) عشان قارئ الشاشة ينطق صح. `<head>` معلومات زيادة (title و meta). `<body>` اللي الناس بتشوفه — وفيه `<h1>` واحد.",
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
    <!-- Page title shows in the tab -->
    <title>Hello HTML</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is the body.</p>
  </body>
</html>`,
      expectedOutput: {
        en: "A page titled Hello HTML with the heading Welcome",
        ar: "صفحة عنوانها Hello HTML وفيها عنوان Welcome",
      },
      visualHint: {
        en: "Build the page shell: doctype → lang → charset → viewport → title → body.",
        ar: "ابنِ هيكل الصفحة: doctype → lang → charset → viewport → title → body.",
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
        ar: "البنية الـ semantic",
      },
      summary: {
        en: "`header`, `nav`, `main`, `section`, `article`, and `footer` name what a part of the page *is* — not only how it looks.",
        ar: "`header` و `nav` و `main` و `section` و `article` و `footer` بيسمّوا جزء الصفحة إيه — مش الشكل بس.",
      },
      paragraphs: [
        {
          en: "`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` tell the browser what that part of the page is. Screen readers and search engines read this too.",
          ar: "`<header>` و `<nav>` و `<main>` و `<section>` و `<article>` و `<footer>` بيقولوا للمتصفح الجزء ده إيه. قارئ الشاشة ومحرك البحث بيقروا كده كمان.",
        },
        {
          en: "Use one `<main>` per page for the main content. `<section>` groups related things under a heading. `<article>` wraps something that can stand alone — like a post or a card.",
          ar: "استخدم `<main>` واحد في الصفحة للمحتوى الأساسي. `<section>` بيجمّع حاجات ليها علاقة تحت عنوان. `<article>` بيلف حاجة تقدر تقف لوحدها — زي بوست أو كارت.",
        },
        {
          en: "Don’t stack many `<div>`s when a real semantic tag fits. Semantic tags give screen readers free `landmarks` to jump around the page.",
          ar: "متكترش `<div>` لو في tag semantic مناسب. الوسوم دي بتدي قارئ الشاشة `landmarks` يقفز بيها في الصفحة ببلاش.",
        },
        {
          en: "Most of these tags are **block** — they start on a new line and take the full width (`div`, `p`, `header`, `main`). **Inline** tags sit inside a line of text (`span`, `a`, `strong`). Use block for page parts, inline for bits of text.",
          ar: "معظم الوسوم دي **block** — بتبدأ سطر جديد وبتاخد العرض كله (`div` و `p` و `header` و `main`). وسوم **inline** بتقعد جوّه سطر النص (`span` و `a` و `strong`). استخدم block لأجزاء الصفحة، و inline لقطع النص.",
        },
      ],
      keyPoints: [
        {
          en: "Semantic = meaning for tools and people",
          ar: "Semantic = معنى للأدوات وللناس",
        },
        {
          en: "One `<main>` per page",
          ar: "`<main>` واحد لكل صفحة",
        },
        {
          en: "Pick tags by job, not by looks",
          ar: "اختار الـ tags حسب الشغل، مش الشكل",
        },
        {
          en: "Semantic tags give screen readers free landmarks",
          ar: "الوسوم الـ semantic بتدي قارئ الشاشة landmarks ببلاش",
        },
        {
          en: "Block = sections of the page · Inline = pieces of text",
          ar: "Block = أقسام الصفحة · Inline = قطع النص",
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
        en: "Headings make the page outline. Paragraphs hold the story.",
        ar: "العناوين بتعمل outline الصفحة. الفقرات بتشيل الكلام.",
      },
      paragraphs: [
        {
          en: "`<h1>` to `<h6>` go from most important to least. Use them in order. Don’t jump from `<h1>` to `<h4>` only to make text smaller — that is a CSS job.",
          ar: "من `<h1>` لـ `<h6>` من الأهم للأقل. استخدمهم بالترتيب. متقفزش من `<h1>` لـ `<h4>` عشان الخط يصغر بس — ده شغل CSS.",
        },
        {
          en: "`<p>` is one paragraph. Keep one idea in each `<p>` so the page is easy to read.",
          ar: "`<p>` فقرة واحدة. خلّي فكرة واحدة في كل `<p>` عشان الصفحة تتقرا بسهولة.",
        },
        {
          en: "Headings and paragraphs are the skeleton. Next lesson adds inline tags like `<strong>` and `<em>`.",
          ar: "العناوين والفقرات هما الهيكل. الدرس الجاي بيضيف وسوم inline زي `<strong>` و `<em>`.",
        },
      ],
      keyPoints: [
        {
          en: "Heading order = page outline",
          ar: "ترتيب العناوين = outline الصفحة",
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
        en: "Inline tags that add meaning — not only bold or italic looks.",
        ar: "وسوم inline بتضيف معنى — مش شكل bold أو italic بس.",
      },
      paragraphs: [
        {
          en: "Use `<strong>` when the words are important. Use `<em>` when you stress a word. `<b>` and `<i>` are look-only — use them when there is no extra meaning.",
          ar: "استخدم `<strong>` لما الكلام مهم. استخدم `<em>` لما بتشدّد على كلمة. `<b>` و `<i>` للشكل بس — استخدمهم لما مفيش معنى زيادة.",
        },
        {
          en: "`<mark>` highlights text. `<del>` / `<ins>` show delete and add. `<s>` marks text that is no longer true. Don’t use `<u>` just for style — underline looks like a link.",
          ar: "`<mark>` بيظلّل النص. `<del>` / `<ins>` بيبينوا حذف وإضافة. `<s>` لنص بقى غلط. متستخدمش `<u>` للشكل بس — الخط تحت النص باين زي لينك.",
        },
        {
          en: "`<q>` is a short quote in a line. `<blockquote>` is a longer quote. Add `<cite>` for the source. `<code>` and `<abbr title=\"...\">` mark code and short names.",
          ar: "`<q>` اقتباس قصير جوّه السطر. `<blockquote>` اقتباس أطول. ضيف `<cite>` للمصدر. `<code>` و `<abbr title=\"...\">` للكود والأسماء المختصرة.",
        },
        {
          en: "`<span>` has no meaning by itself. Use it only as a hook for CSS or JavaScript. Prefer `<strong>`, `<em>`, `<mark>`, or `<code>` when the words mean something.",
          ar: "`<span>` ملهوش معنى لوحده. استخدمه بس كـ hook لـ CSS أو JavaScript. فضّل `<strong>` و `<em>` و `<mark>` أو `<code>` لما الكلام ليه معنى.",
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
          ar: "متحطش خط تحت نص عادي عشان يبان لينك",
        },
        {
          en: "`<span>` = styling hook · semantic tags = meaning",
          ar: "`<span>` = hook للتنسيق · الوسوم الـ semantic = المعنى",
        },
      ],
      code: `<p>
  Learn <strong>HTML</strong> with <em>clarity</em>.
  Press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save.
  Use <code>&lt;section&gt;</code> — output <samp>block</samp>.
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
<p>
  Price: <span class="price">$19</span>
  <!-- span only for CSS — no extra meaning -->
</p>
<blockquote>
  <p>Longer quoted passage for articles and docs.</p>
  <footer>— <cite>MDN Web Docs</cite></footer>
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
          en: "Write clear link text — not “click here”. If you use `target=\"_blank\"`, also add `rel=\"noopener noreferrer\"`.",
          ar: "اكتب نص اللينك واضح — مش “اضغط هنا”. لو استخدمت `target=\"_blank\"`، حط كمان `rel=\"noopener noreferrer\"`.",
        },
        {
          en: "`alt` describes the image for screen readers and when the image fails to load. Pure decoration can use `alt=\"\"`.",
          ar: "`alt` بيوصف الصورة لقارئ الشاشة ولما الصورة متتحملش. الصورة الديكور بس ممكن `alt=\"\"`.",
        },
        {
          en: "If you pick the file, prefer `webp` or `avif`. Always set `width` and `height` (or CSS) so the page does not jump (`layout shift`).",
          ar: "لو إنت اللي بتختار الملف، فضّل `webp` أو `avif`. دايمًا حط `width` و `height` (أو CSS) عشان الصفحة متقفزش (`layout shift`).",
        },
      ],
      keyPoints: [
        {
          en: "Meaningful `href` + link text",
          ar: "`href` ونص لينك ليهم معنى",
        },
        {
          en: "Always think about `alt` — it is not extra decoration",
          ar: "فكّر في `alt` دايمًا — مش زينة زيادة",
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
          en: "`<ul>` is a bullet list — use it when order does not matter. `<ol>` is a numbered list — use it for steps. Each item is an `<li>`.",
          ar: "`<ul>` قائمة نقط — استخدمها لما الترتيب مش مهم. `<ol>` قائمة أرقام — استخدمها للخطوات. كل عنصر `<li>`.",
        },
        {
          en: "You can put a list inside an `<li>` for sub-steps, but don’t nest too deep. On `<ol>`, `start` can change the first number.",
          ar: "تقدر تحط قائمة جوّه `<li>` لخطوات فرعية، بس متعمّقش أوي. على `<ol>`، `start` يقدر يغيّر أول رقم.",
        },
        {
          en: "`<dl>`, `<dt>`, and `<dd>` are for a word and its meaning — like a small glossary.",
          ar: "`<dl>` و `<dt>` و `<dd>` للكلمة ومعناها — زي قاموس صغير.",
        },
      ],
      keyPoints: [
        {
          en: "`ul` = bullets, `ol` = numbers",
          ar: "`ul` = نقط، `ol` = أرقام",
        },
        {
          en: "Only `<li>` directly inside `ul`/`ol`",
          ar: "جوّه `ul`/`ol` حط `<li>` مباشرة بس",
        },
        {
          en: "`dl` for a word and its meaning",
          ar: "`dl` للكلمة ومعناها",
        },
        {
          en: "Don’t nest lists too deep",
          ar: "متعمّقش القوائم أوي",
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
        en: "Forms collect data. A `<label>`, a `name`, and the right `type` make them easy to use.",
        ar: "الـ form بتجمع بيانات. `<label>` و `name` و `type` الصح بيخلّوها سهلة.",
      },
      paragraphs: [
        {
          en: "Put fields inside `<form>`. Every field needs a `<label>` — match `for` with the input `id`, or wrap the input inside the `<label>`.",
          ar: "حط الحقول جوّه `<form>`. كل حقل محتاج `<label>` — طابق `for` مع `id` الـ input، أو لف الـ input جوّه الـ `<label>`.",
        },
        {
          en: "`name` is what the server receives — don’t skip it. Pick `type` on purpose: `email`, `password`, `number`, `checkbox`, `radio`, `file`. Each one changes the keyboard and how the field works.",
          ar: "`name` هو اللي السيرفر بياخده — متنساهوش. اختار `type` بوعي: `email` و `password` و `number` و `checkbox` و `radio` و `file`. كل واحد بيغيّر الكيبورد وطريقة الشغل.",
        },
        {
          en: "Buttons need a `type` too: `submit` sends the form (the default inside `<form>`), `button` does nothing on its own and waits for JavaScript, and `reset` clears every field back to its default.",
          ar: "الأزرار كمان محتاجة `type`: `submit` بيبعت الفورم (وهو الافتراضي جوّه `<form>`)، `button` مبيعملش حاجة لوحده ومستني `JavaScript`، و `reset` بيمسح كل الحقول لقيمتها الافتراضية.",
        },
        {
          en: "Handy beginner attributes: `placeholder` (hint text), `value` (starting value), `checked` (for checkboxes/radios), `disabled` / `readonly`, `maxlength` / `minlength`, and `required`. On the form itself, `action` is where data goes and `method` is usually `get` or `post`.",
          ar: "خصائص مفيدة للمبتدئ: `placeholder` (نص تلميح)، `value` (قيمة البداية)، `checked` (للـ checkbox/radio)، `disabled` / `readonly`، `maxlength` / `minlength`، و `required`. على الفورم نفسه، `action` هو مكان البيانات و `method` غالبًا `get` أو `post`.",
        },
        {
          en: "Group related radios or checkboxes with `<fieldset>` and a `<legend>` — screen readers announce the group name. Next lesson goes deeper on `inputmode`, `autocomplete`, and `pattern` for better mobile UX.",
          ar: "جمّع الـ radios أو checkboxes المرتبطة بـ `<fieldset>` و `<legend>` — قارئ الشاشة بيعلن اسم المجموعة. الدرس الجاي بيتعمّق في `inputmode` و `autocomplete` و `pattern` لتجربة موبايل أحسن.",
        },
      ],
      keyPoints: [
        {
          en: "Label every input (`for` + `id` or wrap)",
          ar: "اعمل `label` لكل `input` (`for` + `id` أو لف)",
        },
        {
          en: "`name` for submit · `type` for behavior",
          ar: "`name` للإرسال · `type` للسلوك",
        },
        {
          en: "Buttons need `type`: `submit`, `button`, or `reset`",
          ar: "الأزرار محتاجة `type`: `submit` أو `button` أو `reset`",
        },
        {
          en: "Learn `placeholder`, `value`, `checked`, `disabled`, `maxlength`, `required`",
          ar: "اتعلّم `placeholder` و `value` و `checked` و `disabled` و `maxlength` و `required`",
        },
        {
          en: "`action` + `method` on `<form>` control where data goes",
          ar: "`action` + `method` على `<form>` بيحددوا فين بتروح البيانات",
        },
        {
          en: "Related radios/checkboxes: `<fieldset>` + `<legend>`",
          ar: "Radios/checkboxes مرتبطة: `<fieldset>` + `<legend>`",
        },
      ],
      code: `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input
    id="email"
    name="email"
    type="email"
    placeholder="you@example.com"
    maxlength="120"
    required
  />

  <fieldset>
    <legend>Plan</legend>
    <label><input type="radio" name="plan" value="free" /> Free</label>
    <label><input type="radio" name="plan" value="pro" /> Pro</label>
  </fieldset>

  <label>
    <input type="checkbox" name="terms" value="yes" required />
    I agree to the terms
  </label>

  <button type="submit">Create account</button>
</form>`,
      expectedOutput: {
        en: "Signup form with email, plan radios, and a checkbox",
        ar: "فورم تسجيل فيه email و radios للخطة و checkbox",
      },
      visualHint: {
        en: "Watch focus move label → email → plan → checkbox → submit.",
        ar: "اتفرّج على الـ focus وهو بيمشي label → email → الخطة → checkbox → submit.",
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
          en: "`scope=\"col\"` / `scope=\"row\"` on `<th>` tells screen readers which header goes with which cell.",
          ar: "`scope=\"col\"` / `scope=\"row\"` على `<th>` بيقول لقارئ الشاشة أنهي عنوان مع أنهي خلية.",
        },
        {
          en: "For page layout, use CSS. Use tables only to compare rows of related data.",
          ar: "لتخطيط الصفحة استخدم CSS. استخدم tables بس عشان تقارن صفوف بيانات ليها علاقة.",
        },
        {
          en: "Beginner styling tips (CSS, not more HTML): use `border-collapse: collapse` so cell borders look clean, add padding on `th`/`td`, and give `th` a light background. Wrap wide tables in a scrollable container so mobile users can still read them. Don’t use tables to build your whole page layout.",
          ar: "نصائح تنسيق للمبتدئ (CSS مش HTML زيادة): استخدم `border-collapse: collapse` عشان الحدود تبقى مرتبة، زوّد padding على `th`/`td`، وادي `th` خلفية فاتحة. لف الجداول العريضة في حاوية scroll عشان الموبايل يقراها. متستخدمش tables لبناء layout الصفحة كلها.",
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
        {
          en: "Style with CSS: `border-collapse`, padding, header background",
          ar: "ستايل بـ CSS: `border-collapse` و padding وخلفية الهيدر",
        },
      ],
      code: `<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #cbd5e1; padding: 0.5rem 0.75rem; }
  th { background: #e2e8f0; text-align: start; }
</style>

<table>
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
        en: "How screen readers hear your HTML — plus ARIA, keyboard, and focus rules you can ship.",
        ar: "إزاي قارئ الشاشة بيسمع HTML — وكمان قواعد ARIA والكيبورد والـ focus تقدر تنشرها.",
      },
      paragraphs: [
        {
          en: "Screen readers (NVDA, VoiceOver, JAWS) read the accessibility tree from your DOM — not from CSS looks. Native tags (`button`, `a`, `label`, landmarks) already give name, role, and value.",
          ar: "قارئ الشاشة (NVDA و VoiceOver و JAWS) بيقرأ accessibility tree من الـ DOM — مش من شكل CSS. الوسوم الأصلية (`button` و `a` و `label` و landmarks) بتدي الاسم والدور والقيمة جاهزين.",
        },
        {
          en: "Keyboard must work: `Tab` order, `Enter`/`Space` to activate, `Escape` to close a dialog. Every mouse action needs a keyboard way, and a visible focus style.",
          ar: "الكيبورد لازم يشتغل: ترتيب `Tab`، `Enter`/`Space` للتفعيل، `Escape` لقفل الـ dialog. كل حركة ماوس محتاجة طريقة كيبورد، و focus ظاهر.",
        },
        {
          en: "ARIA adds to native HTML — it does not replace it. Use `aria-expanded`, `aria-live`, or `aria-labelledby` only when no native tag fits. Keep one `<main>` and honest heading order.",
          ar: "ARIA بتزوّد على HTML الأصلي — مش بتبدّله. استخدم `aria-expanded` أو `aria-live` أو `aria-labelledby` بس لما مفيش tag أصلي ينفع. خلّي `<main>` واحد وترتيب عناوين صادق.",
        },
        {
          en: "After the screen changes, move focus. Opening a dialog moves focus inside. Closing it sends focus back to the button that opened it. Tell users about live updates with `aria-live` — don’t swap text in silence.",
          ar: "بعد ما الشاشة تتغيّر، حرّك الـ focus. فتح dialog بينقل الـ focus جوّه. قفله بيرجّع الـ focus للزرار اللي فتحه. قول للمستخدم التحديثات بـ `aria-live` — متغيّرش النص في صمت.",
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
        en: "How Google finds your page: HTML in the first response, a unique `<title>`, links, and honest structured data. Core Web Vitals are in Pro.",
        ar: "إزاي Google بيلاقي صفحتك: HTML في أول رد، `<title>` فريد، لينكات، و structured data صادق. Core Web Vitals في Pro.",
      },
      paragraphs: [
        {
          en: "Search engines fetch a URL, read HTML, follow links, then index. They do not look at CSS first. Put real headings, paragraphs, and `<a href>` links in the first HTML. An empty `<div id=\"root\">` waiting for JavaScript is hard to index.",
          ar: "محرك البحث بيجيب URL، بيقرأ HTML، بيتبع اللينكات، وبعدين بيعمل index. مش بيبص على CSS الأول. حط عناوين وفقرات و `<a href>` حقيقية في أول HTML. `<div id=\"root\">` فاضي مستني JavaScript صعب يتفهرس.",
        },
        {
          en: "If the main text appears only after a slow `fetch` on the phone, Google may miss it. For marketing and docs, prefer `SSR` or `SSG`: send the page shell and main text from the server, then add extra UI. Don’t write the whole article inside `useEffect`.",
          ar: "لو النص الأساسي بيظهر بس بعد `fetch` بطيء على الموبايل، Google ممكن يفوته. لصفحات التسويق والدروس، فضّل `SSR` أو `SSG`: ابعت هيكل الصفحة والنص من السيرفر، وبعدين زوّد الـ UI. متكتبش المقال كله جوّه `useEffect`.",
        },
        {
          en: "`<title>` is the strongest tag you control: unique per URL, easy to read, matching the visible `<h1>`, about 50–60 characters. Meta `description` is not a ranking score, but it often becomes the search snippet — write one honest sentence (~150–160 characters). `rel=\"canonical\"` (full HTTPS URL) says which copy of the page is the main one.",
          ar: "`<title>` أقوى tag بتتحكم فيه: فريد لكل URL، سهل يتقرا، مطابق لـ `<h1>` الظاهر، حوالي 50–60 حرف. Meta `description` مش درجة ترتيب، بس غالبًا بتبقى جملة نتيجة البحث — اكتب جملة صادقة (~150–160 حرف). `rel=\"canonical\"` (رابط HTTPS كامل) بيقول أنهي نسخة هي الأساسية.",
        },
        {
          en: "Internal links with clear text help crawlers (`Learn HTML forms` is better than `click here`). Use one `<h1>`, honest heading order, and landmarks (`<main>`, `<nav>`, `<article>`). Fake 404 pages (status 200 + “not found”) and `javascript:` / `#` links do not help ranking.",
          ar: "اللينكات الداخلية بنص واضح بتساعد الـ crawlers (`Learn HTML forms` أحسن من `click here`). استخدم `<h1>` واحد، ترتيب عناوين صادق، و landmarks (`<main>` و `<nav>` و `<article>`). صفحات 404 مزيفة (status 200 + “not found”) ولينكات `javascript:` / `#` مش بتساعد الترتيب.",
        },
        {
          en: "`JSON-LD` can say the page is an Article, Course, or FAQ — only if it matches what people see. Fake rich results get ignored. After each deploy, check unique titles, working canonicals, and no accidental `noindex` in Search Console. Indexing is not instant.",
          ar: "`JSON-LD` يقدر يقول الصفحة Article أو Course أو FAQ — بس لو مطابق اللي الناس بتشوفه. النتائج الغنية المزيفة بتتتجاهل. بعد كل deploy، اتأكد من titles فريدة و canonicals شغالة ومفيش `noindex` بالغلط في Search Console. الـ index مش فوري.",
        },
      ],
      keyPoints: [
        {
          en: "Indexable HTML in the first response — not an empty `<div id=\"root\">`",
          ar: "HTML يتفهرس في أول رد — مش `<div id=\"root\">` فاضي",
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
  <title>FrontendCraft — HTML lab</title>
  <meta name="description" content="Learn HTML with interactive labs and live sandboxes." />
  <link rel="canonical" href="https://example.com/html" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "HTML lab",
    "description": "Interactive HTML labs and live sandboxes."
  }
  </script>
</head>
<body>
  <main>
    <h1>HTML lab</h1>
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
        en: "`audio`, `video`, and `iframe` add media — with controls, captions, and no surprise sound.",
        ar: "`audio` و `video` و `iframe` بيضيفوا media — مع controls و captions ومن غير صوت مفاجئ.",
      },
      paragraphs: [
        {
          en: "`<video>` and `<audio>` need `controls`. Without it, people cannot play, pause, or change volume.",
          ar: "`<video>` و `<audio>` محتاجين `controls`. من غيرها الناس مش هتقدر تشغّل أو توقّف أو تغيّر الصوت.",
        },
        {
          en: "Add more than one `<source>` so the browser can pick a format it knows. Add `<track kind=\"captions\">` so video works for people who cannot hear — and anyone watching on mute.",
          ar: "حط أكتر من `<source>` عشان المتصفح يختار صيغة بيعرفها. حط `<track kind=\"captions\">` عشان الفيديو يشتغل للي مش بيسمعوا — ولأي حد بيتفرج والصوت مقفول.",
        },
        {
          en: "`<iframe>` puts another page inside yours. Always give it a `title` for screen readers. Add `sandbox` to limit what that page can do. Use `loading=\"lazy\"` so off-screen frames do not slow the first load.",
          ar: "`<iframe>` بيحط صفحة تانية جوّه صفحتك. دايمًا حط `title` لقارئ الشاشة. حط `sandbox` عشان تحدد الصفحة دي تعمل إيه. استخدم `loading=\"lazy\"` عشان الإطارات برة الشاشة متبطّأش أول تحميل.",
        },
        {
          en: "Never autoplay sound. It is rude, and browsers often block it. The user should press play — not the page.",
          ar: "متشغّلش صوت لوحدك. ده مزعج، والمتصفح غالبًا بيمنعه. المستخدم هو اللي يضغط play — مش الصفحة.",
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
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  <track kind="captions" src="/captions.vtt" srclang="en" label="English" />
</video>

<iframe
  title="Course map"
  src="about:blank"
  loading="lazy"
  width="640"
  height="200"
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
