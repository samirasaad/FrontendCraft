import {
  L,
  cheatCard,
  realWorldExample,
  simpleExample,
} from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";
import { collectedHtmlPitfalls } from "@/content/tracks/html/collected-pitfalls";

export const extraLessons: LessonDraft[] = [
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
    },
  },
  {
    id: "html-pit-1",
    order: 13,
    slug: "html-common-pitfalls",
    tier: "pitfalls",
    readMinutes: 12,
    icon: "AlertTriangle",
    visualizer: "document-tree",
    content: {
      title: L("HTML Common Pitfalls", "HTML Common Pitfalls"),
      summary: L(
        "Every classic HTML trap in one lesson — wrong vs right, side by side.",
        "كل فخاخ HTML الكلاسيكية في درس واحد — غلط مقابل صح جنب بعض.",
      ),
      paragraphs: [
        L(
          "Other HTML lessons stay focused on teaching. All the traps live in this single Pitfalls lesson.",
          "دروس HTML التانية مركزة على الشرح. كل الفخاخ عايشة في درس Pitfalls واحد.",
        ),
        L(
          "Scan each card: skeleton, semantics, headings, links, lists, forms, tables, a11y, SEO, media, buttons vs links, and nesting.",
          "اتفرّج على كل كارت: الهيكل، الـ semantics، العناوين، اللينكات، القوائم، الفورم، الجداول، الوصول، الـ SEO، الميديا، الأزرار مقابل اللينكات، والـ nesting.",
        ),
        L(
          "When a card clicks for you, jump back to the matching Beginner/Pro lesson and rebuild it in the playground.",
          "لما كارت يوضّحلك، ارجع للدرس المناسب في Beginner/Pro وابنِه تاني في الـ playground.",
        ),
      ],
      keyPoints: [
        L("One Pitfalls lesson for the whole track", "درس Pitfalls واحد للـ track كله"),
        L("Wrong vs right on every card", "غلط مقابل صح في كل كارت"),
        L("Revisit the matching lesson after each card", "ارجع للدرس المناسب بعد كل كارت"),
      ],
      examples: [
        simpleExample(
          `<a href="/javascript">Open JS track</a>
<button type="button">Mark complete</button>`,
          "Link for nav, button for action",
          "لينك للتنقّل وزر للفعل",
        ),
        realWorldExample(
          `<section class="note">
  <h2>Note</h2>
  <p>Valid nesting beats div soup.</p>
</section>`,
          "Valid section with heading + paragraph",
          "section صحيحة بـ heading وفقرة",
        ),
      ],
      visualHint: L(
        "The tree stays honest when nesting follows the rules.",
        "الشجرة بتفضل صادقة لما الـ nesting يمشي على القواعد.",
      ),
      pitfalls: collectedHtmlPitfalls,
    },
  },
  {
    id: "html-sheet-1",
    order: 14,
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
