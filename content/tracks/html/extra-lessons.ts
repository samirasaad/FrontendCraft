import {
  L,
  realWorldExample,
  simpleExample,
} from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";
import { htmlCheatCards } from "@/content/tracks/html/cheatsheet-cards";
import { collectedHtmlPitfalls } from "@/content/tracks/html/collected-pitfalls";

export const extraLessons: LessonDraft[] = [
  {
    id: "html-pro-0",
    order: 19,
    slug: "html-core-web-vitals",
    tier: "pro",
    readMinutes: 11,
    icon: "Gauge",
    visualizer: "cwv-lab",
    content: {
      title: L("Pro: Core Web Vitals", "Pro: Core Web Vitals"),
      summary: L(
        "Dedicated performance lesson — LCP, INP, and CLS as product metrics you ship and measure.",
        "درس أداء مخصص — LCP و INP و CLS كمقاييس منتج بتنشرها وتقيسها.",
      ),
      paragraphs: [
        L(
          "Core Web Vitals are field metrics, not SEO meta tricks: LCP (largest contentful paint), INP (interaction to next paint), and CLS (cumulative layout shift). Treat regressions like product bugs.",
          "Core Web Vitals مقاييس ميدانية، مش حِيَل meta للـ SEO: LCP و INP و CLS. عامل الـ regressions زي bugs منتج.",
        ),
        L(
          "LCP is often a hero `<img>` or large text block. Size it, avoid `loading=\"lazy\"` above the fold, and consider `fetchpriority=\"high\"` / preload when you know the URL.",
          "LCP غالبًا `<img>` hero أو بلوك نص كبير. حط له مقاس، ومتعملش `loading=\"lazy\"` فوق الشاشة، وفكّر في `fetchpriority=\"high\"` / preload لما تعرف الـ URL.",
        ),
        L(
          "INP tracks how fast the UI responds after a tap or click. Keep event handlers light, break up long tasks, and defer non-critical JS so the main thread stays free.",
          "INP بيقيس سرعة رد الـ UI بعد ضغطة. خلّي الـ handlers خفيفة، قطّع الـ long tasks، وأخّر JS غير الحرج عشان الـ main thread يفضل فاضي.",
        ),
        L(
          "CLS spikes from unsized images, late ads, and web fonts that reflow text. Reserve space with `width`/`height` or CSS `aspect-ratio`, and avoid injecting banners above existing content.",
          "CLS بيزيد من صور من غير مقاس وإعلانات متأخرة وخطوط بتعمل reflow. احجز مساحة بـ `width`/`height` أو `aspect-ratio`، ومتحقنش بنرات فوق محتوى موجود.",
        ),
        L(
          "Measure with CrUX / Search Console field data and lab tools (Lighthouse, Web Vitals). Media-specific tactics continue in Pro: Media & Loading Performance.",
          "قِس بـ CrUX / Search Console field data وأدوات lab (Lighthouse و Web Vitals). تكتيكات الميديا في درس Pro: Media & Loading Performance.",
        ),
      ],
      keyPoints: [
        L("LCP < 2.5s · INP < 200ms · CLS < 0.1 (good)", "LCP < 2.5s · INP < 200ms · CLS < 0.1 (جيد)"),
        L("Never lazy-load the LCP element", "متعَمِلش lazy على عنصر LCP"),
        L("Reserve space before bytes arrive", "احجز المساحة قبل ما الـ bytes توصل"),
        L("Field data beats a green lab score alone", "Field data أهم من lab score أخضر لوحده"),
      ],
      examples: [
        simpleExample(
          `<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
<img
  src="/hero.webp"
  alt="Learner at a code playground"
  width="1200"
  height="630"
  fetchpriority="high"
/>`,
          "Sized LCP image with preload hint",
          "صورة LCP بمقاس + preload",
        ),
        realWorldExample(
          `<style>
  .ad-slot { aspect-ratio: 16 / 9; min-height: 180px; }
</style>
<aside class="ad-slot" aria-label="Sponsored">
  <!-- late-loaded creative cannot shove main content -->
</aside>
<button type="button">Save progress</button>`,
          "Reserved slot + light interaction target",
          "مساحة محجوزة + هدف تفاعل خفيف",
        ),
      ],
      visualHint: L(
        "Each vital flips from needs-work to good — watch LCP, then INP, then CLS.",
        "كل vital بيتحول من needs-work لـ good — اتفرّج على LCP وبعدين INP وبعدين CLS.",
      ),
    },
  },
  {
    id: "html-pro-1",
    order: 20,
    slug: "html-perf-media",
    tier: "pro",
    readMinutes: 9,
    icon: "Zap",
    visualizer: "media-stage",
    content: {
      title: L("Pro: Media & Loading Performance", "Pro: Media & Loading Performance"),
      summary: L(
        "Builds on Core Web Vitals — budget heavy images and embeds that usually kill LCP and CLS.",
        "بيكمل درس Core Web Vitals — حط ميزانية للصور والـ embeds التقيلة اللي غالبًا بتقتل LCP و CLS.",
      ),
      paragraphs: [
        L(
          "You already met LCP / INP / CLS in Pro: Core Web Vitals. Here the focus is media markup that usually causes those regressions.",
          "اتعرفت على LCP / INP / CLS في درس Pro: Core Web Vitals. هنا التركيز على markup الميديا اللي غالبًا بيسبب الـ regressions دي.",
        ),
        L(
          "Always set `width`/`height` (or aspect-ratio CSS) to reduce CLS. Prefer modern formats (WebP/AVIF) with fallbacks.",
          "حط `width`/`height` (أو aspect-ratio) عشان تقلل CLS. فضّل WebP/AVIF مع fallback.",
        ),
        L(
          "Use `loading=\"lazy\"` for below-the-fold media. Preload only the LCP image when you know it.",
          "استخدم `loading=\"lazy\"` للصور تحت الشاشة. Preload لصورة LCP بس لما تبقى متأكد.",
        ),
        L(
          "Iframes are expensive — lazy-load embeds and give them a click-to-load pattern when possible.",
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
    order: 21,
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
    order: 22,
    slug: "html-common-pitfalls",
    tier: "pro",
    readMinutes: 12,
    icon: "AlertTriangle",
    visualizer: "document-tree",
    content: {
      title: L("Pro: Common Pitfalls", "Pro: Common Pitfalls"),
      summary: L(
        "Pro capstone — every classic HTML trap in one lesson, wrong vs right side by side.",
        "خاتمة Pro — كل فخاخ HTML الكلاسيكية في درس واحد، غلط مقابل صح جنب بعض.",
      ),
      paragraphs: [
        L(
          "Other HTML lessons stay focused on teaching. All the traps live in this single Pro pitfalls lesson at the end of the tier.",
          "دروس HTML التانية مركزة على الشرح. كل الفخاخ عايشة في درس Pro pitfalls واحد في آخر المستوى.",
        ),
        L(
          "Scan each card: skeleton, semantics, headings, links, lists, forms, tables, a11y, SEO, media, buttons vs links, and nesting.",
          "اتفرّج على كل كارت: الهيكل، الـ semantics، العناوين، اللينكات، القوائم، الفورم، الجداول، الوصول، الـ SEO، الميديا، الأزرار مقابل اللينكات، والـ nesting.",
        ),
        L(
          "When a card clicks for you, jump back to the matching Beginner–Pro lesson and rebuild it in the playground.",
          "لما كارت يوضّحلك، ارجع للدرس المناسب من Beginner لـ Pro وابنِه تاني في الـ playground.",
        ),
      ],
      keyPoints: [
        L("Pro capstone for the whole HTML track", "خاتمة Pro للـ HTML track كله"),
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
    order: 23,
    slug: "html-cheatsheet",
    tier: "cheatsheet",
    readMinutes: 8,
    icon: "BookCopy",
    visualizer: "document-tree",
    content: {
      title: L("HTML Interactive CheatSheet", "HTML Interactive CheatSheet"),
      summary: L(
        "Filterable cards with live previews, copy actions, and browser compatibility — modern HTML at a glance.",
        "كروت قابلة للفلترة مع معاينة مباشرة ونسخ وتوافق متصفحات — HTML الحديث بنظرة.",
      ),
      paragraphs: [
        L(
          "Use the category chips to jump between Structure, Forms, Media, and Interactive & Meta patterns.",
          "استخدم أزرار الفئات للتنقّل بين Structure و Forms و Media و Interactive & Meta.",
        ),
        L(
          "Each card shows a mini live preview, Copy Code, optional Copy Boilerplate, and a Baseline-aware compatibility bar.",
          "كل كارت فيه معاينة مباشرة و Copy Code و Copy Boilerplate اختياري وشريط توافق واعي بـ Baseline.",
        ),
        L(
          "Technical tag names stay in English in both locales on purpose — paste into the playground and tweak live.",
          "أسماء الـ tags التقنية بتفضل إنجليزي في اللغتين عن قصد — حطها في الـ playground وعدّل مباشرة.",
        ),
      ],
      keyPoints: [
        L("Filter → preview → copy → paste in playground", "فلتر → معاينة → نسخ → لصق في الـ playground"),
        L("Prefer boilerplate for full document fragments", "فضّل boilerplate لمقاطع المستند الكاملة"),
        L("Check Baseline before shipping bleeding-edge tags", "راجع Baseline قبل ما تنشر tags جديدة"),
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
          `<dialog id="hi" open>
  <p>Native dialog preview</p>
  <form method="dialog"><button>Close</button></form>
</dialog>`,
          "Dialog preview snippet",
          "snippet معاينة dialog",
        ),
      ],
      visualHint: L(
        "Cards assemble into a tiny document tree.",
        "الكروت بتتركب كـ document tree صغير.",
      ),
      cheatCards: htmlCheatCards,
    },
  },
];
