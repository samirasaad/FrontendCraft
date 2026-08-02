import {
  L,
  cheatCard,
  pitfall,
  realWorldExample,
  simpleExample,
} from "@/content/helpers";
import type { Lesson } from "@/lib/types";

export const extraLessons: Lesson[] = [
  {
    id: "html-pro-1",
    order: 11,
    slug: "html-perf-media",
    tier: "pro",
    readMinutes: 9,
    icon: "Zap",
    visualizer: "media-stage",
    content: {
      title: L("Pro: Media & Loading Performance", "Pro: Media & Loading Performance"),
      summary: L(
        "Heavy images and embeds are the usual Core Web Vitals killers — budget them.",
        "الصور والـ embeds التقيلة غالبًا بتقتل Core Web Vitals — حط لهم ميزانية.",
      ),
      paragraphs: [
        L(
          "Always set `width`/`height` (or aspect-ratio CSS) to reduce CLS. Prefer modern formats (WebP/AVIF) with fallbacks.",
          "حط `width`/`height` (أو aspect-ratio) عشان تقلل CLS. فضّل WebP/AVIF مع fallback.",
        ),
        L(
          "Use `loading=\"lazy\"` for below-the-fold media. Preload only the LCP image when you know it.",
          "استخدم `loading=\"lazy\"` للصور تحت الشاشة. Preload لصورة LCP بس لما تبقى متأكد.",
        ),
        L(
          "Iframes are expensive — lazy-load embeds and give them a faceted click-to-load pattern when possible.",
          "الـ iframes غالية — أخّر تحميلها واستخدم نمط click-to-load لما تقدر.",
        ),
      ],
      keyPoints: [
        L("Reserve space to avoid CLS", "احجز مساحة عشان تتجنب CLS"),
        L("Lazy-load non-critical media", "أخّر تحميل الميديا غير الحرجة"),
        L("Preload LCP carefully", "Preload لـ LCP بحذر"),
      ],
      examples: [
        simpleExample(
          `<img
  src="/hero.avif"
  alt="Learner at a code playground"
  width="1200"
  height="630"
  decoding="async"
/>`,
          "Sized hero image — stable layout",
          "صورة hero بمقاس ثابت — layout مستقر",
        ),
        realWorldExample(
          `<img
  src="/lesson.webp"
  alt=""
  width="640"
  height="360"
  loading="lazy"
  decoding="async"
/>
<iframe
  title="Event Loop demo"
  src="https://example.com/embed"
  loading="lazy"
  width="640"
  height="360"
></iframe>`,
          "Lazy image + lazy iframe with title",
          "صورة iframe متأخرة مع title",
        ),
      ],
      visualHint: L(
        "Media mounts without shoving the page around.",
        "الميديا بتظهر من غير ما تزق الصفحة.",
      ),
      deepDive: [
        L(
          "CLS happens when late-loaded media discovers its size after first paint. Intrinsic size attributes let the browser reserve the box early.",
          "CLS بيحصل لما الميديا تكتشف حجمها بعد أول paint. مقاسات width/height بتخلّي المتصفح يحجز الصندوق بدري.",
        ),
        L(
          "For SPAs, also watch client-side route transitions inserting images without dimensions.",
          "في الـ SPAs، راقب كمان انتقالات الـ route وهي بتدخل صور من غير مقاسات.",
        ),
      ],
      pitfalls: pitfall(
        `<img src="huge.png" alt="Hero" />`,
        L(
          "No dimensions + eager full-res download.",
          "من غير مقاسات + تحميل كامل فورًا.",
        ),
        `<img src="hero.avif" alt="Hero" width="1200" height="630" />`,
        L(
          "Reserve space and ship an efficient format.",
          "احجز مساحة وابعت فورمات أخف.",
        ),
      ),
    },
  },
  {
    id: "html-pro-2",
    order: 12,
    slug: "html-architecture-partials",
    tier: "pro",
    readMinutes: 10,
    icon: "Layers",
    visualizer: "semantic-blocks",
    content: {
      title: L("Pro: Document Architecture", "Pro: Document Architecture"),
      summary: L(
        "Think in reusable regions — header, main, templates — before you sprinkle divs.",
        "فكّر بمناطق قابلة لإعادة الاستخدام — header و main وقوالب — قبل ما ترش `div`.",
      ),
      paragraphs: [
        L(
          "Keep one `<main>` landmark. Split recurring chrome (nav/footer) so content pages stay focused.",
          "خلّي `<main>` واحد. افصل الـ chrome المتكرر (nav/footer) عشان صفحات المحتوى تفضل مركزة.",
        ),
        L(
          "In component frameworks, your component tree should still emit sensible landmarks and heading ranks.",
          "في أطر المكونات، الـ tree لسه لازم يطلع landmarks ومراتب headings معقولة.",
        ),
        L(
          "Prefer server-rendered meaningful HTML for critical content — JS can enhance, not invent the whole document.",
          "فضّل HTML معنوي من السيرفر للمحتوى الحرج — JS يعزّز، مش يخترع المستند كله.",
        ),
      ],
      keyPoints: [
        L("Landmarks first", "Landmarks أولًا"),
        L("One main per page", "main واحد لكل صفحة"),
        L("Enhance, don't replace, HTML", "عزّز HTML ومتستبدلوش"),
      ],
      examples: [
        simpleExample(
          `<body>
  <a href="#content">Skip</a>
  <header>...</header>
  <main id="content">...</main>
  <footer>...</footer>
</body>`,
          "Skip link + landmark shell",
          "Skip link + هيكل landmarks",
        ),
        realWorldExample(
          `<body>
  <header>
    <p>FrontendCraft</p>
    <nav aria-label="Tracks">...</nav>
  </header>
  <main id="content">
    <article>
      <h1>HTML Forms</h1>
      <section aria-labelledby="tips">
        <h2 id="tips">Tips</h2>
      </section>
    </article>
  </main>
</body>`,
          "Article inside main with labeled section",
          "article جوه main مع section متسماة",
        ),
      ],
      visualHint: L(
        "Blocks lock into a clear page architecture.",
        "البلوكات بتتركب في معمارية صفحة واضحة.",
      ),
      deepDive: [
        L(
          "Document outline algorithms and AT landmark navigation both reward predictable structure. Random heading ranks break that contract.",
          "خوارزميات الـ outline وتنقّل الـ landmarks بيكافئوا هيكل متوقع. مراتب headings عشوائية بتكسر العقد ده.",
        ),
      ],
      pitfalls: pitfall(
        `<div id="app"></div><!-- JS injects everything -->`,
        L(
          "Empty shells hurt SEO, a11y, and first paint meaning.",
          "أصداف فاضية بتضر SEO والوصول ومعنى أول paint.",
        ),
        `<main id="app">
  <h1>Tracks</h1>
  <!-- progressive enhancement -->
</main>`,
        L(
          "Ship meaningful HTML, enhance with JS.",
          "ابعت HTML معنوي، وعزّزه بـ JS.",
        ),
      ),
    },
  },
  {
    id: "html-pit-1",
    order: 13,
    slug: "html-pitfall-buttons-links",
    tier: "pitfalls",
    readMinutes: 7,
    icon: "AlertTriangle",
    visualizer: "link-image",
    content: {
      title: L("Pitfall: Buttons vs Links", "Pitfall: Buttons vs Links"),
      summary: L(
        "Links navigate. Buttons do actions. Mixing them breaks expectations.",
        "اللينك للتنقّل. الزر للفعل. الخلط بيكسر التوقعات.",
      ),
      paragraphs: [
        L(
          "If it goes to a URL, use `<a href>`. If it triggers an in-page action, use `<button type=\"button\">`.",
          "لو بيروح URL استخدم `<a href>`. لو فعل جوه الصفحة استخدم `<button type=\"button\">`.",
        ),
        L(
          "`<a href=\"#\" onclick>` and `<div onclick>` are the usual accessibility traps.",
          "`<a href=\"#\" onclick>` و `<div onclick>` من أشهر فخاخ الوصول.",
        ),
        L(
          "Submit buttons inside forms should be `type=\"submit\"` (the default) — explicit is better when you also have action buttons.",
          "زر الإرسال في الفورم `type=\"submit\"` — والصراحة أحسن لو عندك أزرار أفعال تانية.",
        ),
      ],
      keyPoints: [
        L("a = navigation", "a = تنقّل"),
        L("button = action", "button = فعل"),
        L("Never div-as-button", "متعملش div كأنه زر"),
      ],
      examples: [
        simpleExample(
          `<a href="/javascript">Open JS track</a>
<button type="button">Mark complete</button>`,
          "Link for nav, button for action",
          "لينك للتنقّل وزر للفعل",
        ),
        realWorldExample(
          `<form>
  <button type="button" id="preview">Preview</button>
  <button type="submit">Publish lesson</button>
</form>`,
          "Explicit button types in a form",
          "أنواع أزرار صريحة جوه فورم",
        ),
      ],
      visualHint: L(
        "The link flies away; the button stays and acts.",
        "اللينك بيطير لمكان؛ الزر بيفضل ويعمل فعل.",
      ),
      deepDive: [
        L(
          "Activation keys differ: links use Enter, buttons use Enter/Space. Faking either role without the keyboard map breaks AT users.",
          "مفاتيح التفعيل تختلف: اللينك Enter، الزر Enter/Space. تزييف الدور من غير خريطة كيبورد بيكسر وصول المستخدم.",
        ),
      ],
      pitfalls: pitfall(
        `<a href="#" onclick="save()">Save</a>`,
        L(
          "Fake navigation for an action.",
          "تنقّل مزيف لفعل.",
        ),
        `<button type="button" onclick="save()">Save</button>`,
        L(
          "Real button semantics + keyboard support.",
          "زر حقيقي + دعم كيبورد.",
        ),
      ),
    },
  },
  {
    id: "html-pit-2",
    order: 14,
    slug: "html-pitfall-div-soup",
    tier: "pitfalls",
    readMinutes: 8,
    icon: "AlertTriangle",
    visualizer: "document-tree",
    content: {
      title: L("Pitfall: Div Soup & Invalid Nesting", "Pitfall: Div Soup & Invalid Nesting"),
      summary: L(
        "Browsers forgive bad nesting by silently moving nodes — your CSS/JS then chase ghosts.",
        "المتصفح بيسامح nesting غلط بنقل nodes في صمت — وبعدين CSS/JS بيجروا ورا أشباح.",
      ),
      paragraphs: [
        L(
          "Invalid examples: `<p><div></div></p>`, interactive content nested illegally, headings jammed for style.",
          "أمثلة باطلة: `<p><div></div></p>`، محتوى تفاعلي متداخل غلط، عناوين متزاحمة للشكل.",
        ),
        L(
          "Prefer validators and the Elements panel to see the *post-repair* DOM, not only your source.",
          "استخدم validators ولوحة Elements عشان تشوف الـ DOM بعد التصليح، مش السورس بس.",
        ),
        L(
          "Replace anonymous wrappers with semantic sections when they represent real regions.",
          "بدّل اللفّافات المجهولة بـ sections دلالية لما تمثّل مناطق حقيقية.",
        ),
      ],
      keyPoints: [
        L("Invalid HTML gets auto-fixed", "HTML الباطل بيتصلّح لوحده"),
        L("Inspect the repaired DOM", "افحص الـ DOM بعد التصليح"),
        L("Semantics over wrappers", "الدلالة قبل اللفّافات"),
      ],
      examples: [
        simpleExample(
          `<!-- browser may close the p before the div -->
<p>Intro<div class="note">Note</div></p>`,
          "Invalid nesting — DOM may split unexpectedly",
          "تداخل باطل — الـ DOM ممكن يتقسم بشكل مفاجئ",
        ),
        realWorldExample(
          `<section class="note">
  <h2>Note</h2>
  <p>Intro details for the lesson.</p>
</section>`,
          "Valid section with heading + paragraph",
          "section صحيحة بـ heading وفقرة",
        ),
      ],
      visualHint: L(
        "The tree rewrites itself when nesting breaks rules.",
        "الشجرة بتعيد كتابة نفسها لما الـ nesting يكسر القواعد.",
      ),
      deepDive: [
        L(
          "The HTML parser’s adoption agency / foster parenting rules relocate nodes. Debugging “why isn’t my CSS matching?” often starts there.",
          "قواعد الـ parser بتنقل الـ nodes. كتير من أسئلة “ليه الـ CSS مش ماسك؟” بتبدأ من هنا.",
        ),
      ],
      pitfalls: pitfall(
        `<p><div>card</div></p>`,
        L(
          "Block inside `<p>` is invalid.",
          "Block جوه `<p>` باطل.",
        ),
        `<div><p>card</p></div>`,
        L(
          "Or use `<section>` / `<article>` for the card.",
          "أو استخدم `<section>` / `<article>` للكارت.",
        ),
      ),
    },
  },
  {
    id: "html-sheet-1",
    order: 15,
    slug: "html-cheatsheet",
    tier: "cheatsheet",
    readMinutes: 5,
    icon: "BookCopy",
    visualizer: "document-tree",
    content: {
      title: L("HTML Essentials CheatSheet", "HTML Essentials CheatSheet"),
      summary: L(
        "Copy-ready snippets for the skeleton, landmarks, forms, and media.",
        "snippets جاهزة للنسخ: الهيكل، landmarks، الفورم، والميديا.",
      ),
      paragraphs: [
        L(
          "Keep this open while you scaffold a new page — then jump back to deeper lessons for the why.",
          "سيبه مفتوح وانت بتبني صفحة جديدة — وارجع للدروس الأعمق عشان الـ why.",
        ),
        L(
          "Technical tag names stay in English in both locales on purpose.",
          "أسماء الـ tags التقنية بتفضل إنجليزي في اللغتين عن قصد.",
        ),
        L(
          "One click copies a card. Paste into the playground and tweak attributes live.",
          "ضغطة بتنسخ الكارت. حطه في الـ playground وعدّل الـ attributes مباشرة.",
        ),
      ],
      keyPoints: [
        L("Skeleton → landmarks → content", "هيكل → landmarks → محتوى"),
        L("Label every control", "سمّي كل control"),
        L("Media needs size + text alternative", "الميديا محتاجة مقاس وبديل نصي"),
      ],
      examples: [
        simpleExample(
          `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>Demo</title></head>
  <body><main><h1>Hi</h1></main></body>
</html>`,
          "Minimal valid document",
          "مستند صالح مختصر",
        ),
        realWorldExample(
          `<form>
  <label>Name <input name="name" required /></label>
  <button type="submit">Save</button>
</form>`,
          "Labeled form control",
          "control فورم بـ label",
        ),
      ],
      visualHint: L(
        "Cards assemble into a tiny document tree.",
        "الكروت بتتركب كـ document tree صغير.",
      ),
      deepDive: [
        L(
          "A cheatsheet is a map, not the territory — when a snippet surprises you, open the matching Beginner/Pro lesson.",
          "الـ CheatSheet خريطة مش الأرض — لو snippet فاجأك، افتح الدرس المناسب في Beginner/Pro.",
        ),
      ],
      pitfalls: pitfall(
        `<!-- copying markup without checking nesting -->`,
        L(
          "Blind paste can invent invalid trees.",
          "اللصق الأعمى ممكن يعمل trees باطلة.",
        ),
        `<!-- paste → validate → run in playground -->`,
        L(
          "Verify structure before you style or hydrate.",
          "اتأكد من الهيكل قبل الـ style أو الـ hydrate.",
        ),
      ),
      cheatCards: [
        cheatCard(
          L("Document shell", "Document shell"),
          `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>Title</title>\n  </head>\n  <body></body>\n</html>`,
          L("Always start here.", "دايمًا ابدأ من هنا."),
        ),
        cheatCard(
          L("Landmarks", "Landmarks"),
          `<header></header>\n<nav aria-label="Primary"></nav>\n<main></main>\n<footer></footer>`,
          L("One main. Name your navs.", "main واحد. سمّي الـ nav."),
        ),
        cheatCard(
          L("Heading outline", "Heading outline"),
          `<h1>Page</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>`,
          L("Don't skip levels for styling.", "متقفزش مستويات عشان الشكل."),
        ),
        cheatCard(
          L("Label + input", "Label + input"),
          `<label>\n  Email\n  <input type="email" name="email" required />\n</label>`,
          L("Placeholder ≠ label.", "الـ placeholder ≠ label."),
        ),
        cheatCard(
          L("Image", "Image"),
          `<img src="/x.webp" alt="Description" width="640" height="360" loading="lazy" />`,
          L("Alt + size + lazy when offscreen.", "alt + مقاس + lazy لو برا الشاشة."),
        ),
        cheatCard(
          L("Button vs link", "Button vs link"),
          `<a href="/path">Navigate</a>\n<button type="button">Act</button>`,
          L("Pick the element that matches intent.", "اختار العنصر على حسب النية."),
        ),
      ],
    },
  },
];
