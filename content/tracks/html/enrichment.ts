import {
  L,
  pitfall,
  realWorldExample,
  simpleExample,
} from "@/content/helpers";
import type { LegacyLesson } from "@/content/tracks/_legacy";
import { defaultInsights } from "@/content/tracks/_insights";
import { htmlInsights } from "@/content/tracks/html/insights";
import type {
  CodeExample,
  Lesson,
  LocalizedString,
  PitfallExample,
} from "@/lib/types";

interface Overlay {
  realWorld: CodeExample;
  deepDive: LocalizedString[];
  pitfalls: PitfallExample;
}

const overlays: Record<string, Overlay> = {
  "document-anatomy": {
    realWorld: realWorldExample(
      `<!DOCTYPE html>
<html lang="ar">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FrontendCraft — Tracks</title>
  </head>
  <body>
    <header><h1>FrontendCraft</h1></header>
    <main><p>Choose a track to start.</p></main>
  </body>
</html>`,
      "Valid shell with lang, charset, viewport, header/main",
      "هيكل سليم: lang و charset و viewport و header/main",
    ),
    deepDive: [
      L(
        "Browsers build a DOM tree from tokens. A missing doctype triggers quirks mode — legacy layout rules that break modern CSS assumptions.",
        "المتصفح بيبني DOM tree من tokens. من غير doctype ممكن يدخل quirks mode ويكسر افتراضات CSS الحديثة.",
      ),
      L(
        "`lang` helps accessibility tools and search. `charset` must appear early so bytes decode correctly before the rest of the document streams in.",
        "`lang` بيساعد أدوات الوصول والبحث. `charset` لازم بدري عشان فك التشفير يبقى صح قبل باقي الصفحة.",
      ),
    ],
    pitfalls: pitfall(
      `<html>
  <body>...</body>
</html>`,
      L(
        "No doctype / lang / charset — quirks and a11y suffer.",
        "من غير doctype/lang/charset — quirks و a11y بيتضرروا.",
      ),
      `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>App</title></head>
  <body>...</body>
</html>`,
      L(
        "Start every page from a complete, modern skeleton.",
        "ابدأ كل صفحة من هيكل حديث مكتمل.",
      ),
    ),
  },
  "semantic-structure": {
    realWorld: realWorldExample(
      `<body>
  <header>
    <p>FrontendCraft</p>
    <nav aria-label="Primary"><a href="/js">JS</a></nav>
  </header>
  <main>
    <article>
      <h1>Event Loop</h1>
      <p>Stack runs now. Queue waits.</p>
    </article>
  </main>
  <footer><small>© FrontendCraft</small></footer>
</body>`,
      "Landmark regions: header, nav, main, article, footer",
      "مناطق landmarks: header و nav و main و article و footer",
    ),
    deepDive: [
      L(
        "Accessibility tree maps landmarks from semantic elements. Screen readers jump by region — `<div>` soup offers no landmarks.",
        "شجرة الوصول بتبني landmarks من العناصر الدلالية. قارئ الشاشة بينط بين المناطق — شوربة `<div>` مفيهاش landmarks.",
      ),
      L(
        "SEO and reader mode also prefer a clear outline with one primary `<h1>` inside `<main>`.",
        "الـ SEO و Reader Mode بيفضّلوا outline واضح مع `<h1>` أساسي جوه `<main>`.",
      ),
    ],
    pitfalls: pitfall(
      `<div class="header">...</div>
<div class="main">...</div>`,
      L(
        "Classes are not semantics.",
        "الـ classes مش semantics.",
      ),
      `<header>...</header>
<main>...</main>`,
      L(
        "Use the element that already means the role.",
        "استخدم العنصر اللي معناه هو الدور نفسه.",
      ),
    ),
  },
};

function fallbackOverlay(lesson: LegacyLesson): Overlay {
  const code = lesson.content.code;
  return {
    realWorld: realWorldExample(
      code,
      lesson.content.expectedOutput.en,
      lesson.content.expectedOutput.ar,
    ),
    deepDive: [
      L(
        "Browsers parse HTML into a DOM. Invalid nesting gets repaired automatically — which can move nodes in surprising ways. Validate structure early.",
        "المتصفح بيحول HTML لـ DOM. الـ nesting الغلط بيتصلّح لوحده — وممكن ينقل nodes بشكل يفاجئك. راجع الهيكل بدري.",
      ),
      L(
        "Prefer progressive enhancement: meaningful HTML first, then CSS/JS. That baseline stays usable when scripts fail.",
        "فضّل progressive enhancement: HTML معنوي الأول، بعدين CSS/JS. الأساس يفضل يشتغل حتى لو السكربت وقع.",
      ),
    ],
    pitfalls: pitfall(
      `<!-- presentational markup with no meaning -->
<div onclick="go()">Click</div>`,
      L(
        "Non-button click targets hurt keyboard and SR users.",
        "عنصر مش زر عليه click بيضر الكيبورد وقارئ الشاشة.",
      ),
      `<button type="button" onclick="go()">Click</button>`,
      L(
        "Use real controls (`button`, `a`) for actions/links.",
        "استخدم عناصر حقيقية (`button`, `a`) للأفعال والروابط.",
      ),
    ),
  };
}

const specific: Record<string, Partial<Overlay>> = {
  "text-headings": {
    realWorld: realWorldExample(
      `<article>
  <h1>Ship your first page</h1>
  <h2>Structure</h2>
  <h3>Document outline</h3>
  <h4>Ranks in order</h4>
  <h5>Rare deep nesting</h5>
  <h6>Finest label</h6>
  <p>Use h1–h6 as an outline — CSS handles size.</p>
</article>`,
      "Full outline: h1 → h2 → h3 → h4 → h5 → h6",
      "Outline كامل: h1 → h2 → h3 → h4 → h5 → h6",
    ),
    deepDive: [
      L(
        "Heading levels communicate hierarchy to AT. Skipping levels (h1 → h4) confuses the outline.",
        "مستويات العناوين بتوصف الهرم لأدوات الوصول. القفز (h1 → h4) بيشوّش الـ outline.",
      ),
    ],
    pitfalls: pitfall(
      `<p class="title">Big text</p>`,
      L(
        "Styled paragraphs are not headings.",
        "فقرة بشكل عنوان مش heading.",
      ),
      `<h2>Big text</h2>`,
      L(
        "Pick the correct rank; style with CSS.",
        "اختار المستوى الصح؛ والشكل من CSS.",
      ),
    ),
  },
  "text-formatting": {
    realWorld: realWorldExample(
      `<article>
  <h1>Release notes</h1>
  <p>
    Fixed <code>focus</code> trap. Press <kbd>Esc</kbd> to close.
    <mark>Breaking:</mark> <del>v1 API</del> <ins>v2 API</ins>.
  </p>
  <p>
    Shipped <time datetime="2026-08-02">Aug 2, 2026</time>.
    See <cite>HTML Living Standard</cite>.
  </p>
  <blockquote>
    <p>Prefer native semantics over CSS-only emphasis.</p>
  </blockquote>
</article>`,
      "Docs-style formatting: code, kbd, mark, del/ins, time, cite",
      "تنسيق docs: code و kbd و mark و del/ins و time و cite",
    ),
    deepDive: [
      L(
        "`<strong>` and `<em>` change how AT announces text. `<b>` / `<i>` usually do not — use them only when the look is stylistic.",
        "`<strong>` و `<em>` بيغيّروا إعلان AT. `<b>` / `<i>` غالبًا لأ؛ استخدمهم لما الشكل stylistic بس.",
      ),
      L(
        "`<abbr title>` and `<time datetime>` add machine-readable meaning behind the visible text.",
        "`<abbr title>` و `<time datetime>` بيضيفوا معنى مقروء للآلة ورا النص الظاهر.",
      ),
    ],
    pitfalls: pitfall(
      `<span style="font-weight:bold">Important</span>`,
      L(
        "CSS bold alone does not mark importance for AT.",
        "الـ bold من CSS لوحده مش بيعلّم الأهمية لـ AT.",
      ),
      `<strong>Important</strong>`,
      L(
        "`<strong>` carries importance; style it with CSS if needed.",
        "`<strong>` بيحمل الأهمية؛ استايله بـ CSS لو محتاج.",
      ),
    ),
  },
  "links-images": {
    realWorld: realWorldExample(
      `<a href="/javascript">
  <img src="/og.png" alt="" width="80" height="80" />
  <span>Start JavaScript track</span>
</a>`,
      "Link with decorative image (empty alt) + text",
      "لينك مع صورة ديكور (alt فاضي) + نص",
    ),
    deepDive: [
      L(
        "`alt` describes the image’s purpose. Decorative images use `alt=\"\"`. Linked images without text need meaningful alt.",
        "`alt` بيوصف غرض الصورة. الديكور `alt=\"\"`. صورة لينك من غير نص محتاجة alt مفيد.",
      ),
    ],
    pitfalls: pitfall(
      `<a href="/x"><img src="x.png"></a>`,
      L(
        "Missing alt → empty accessible name.",
        "من غير alt → اسم وصول فاضي.",
      ),
      `<a href="/x"><img src="x.png" alt="Open track X" /></a>`,
      L(
        "Give the link a spoken name.",
        "ادي للينك اسم يتقال.",
      ),
    ),
  },
  lists: {
    realWorld: realWorldExample(
      `<nav aria-label="Lessons">
  <ol>
    <li><a href="#b1">Beginner</a></li>
    <li><a href="#p1">Pro tips</a></li>
  </ol>
</nav>`,
      "Ordered lesson nav list",
      "قائمة دروس مرتبة",
    ),
    deepDive: [
      L(
        "`ul` for unordered groups, `ol` for ranked steps, `dl` for term/definition pairs (API fields, glossaries).",
        "`ul` لمجموعات، `ol` لخطوات مرتبة، `dl` لمصطلح/تعريف.",
      ),
    ],
    pitfalls: pitfall(
      `<div>• Item</div>`,
      L(
        "Fake bullets are not lists.",
        "نقط مزيفة مش lists.",
      ),
      `<ul><li>Item</li></ul>`,
      L(
        "Real lists expose list semantics to AT.",
        "الـ lists الحقيقية بتدي semantics لقارئ الشاشة.",
      ),
    ),
  },
  "forms-inputs": {
    realWorld: realWorldExample(
      `<form action="/api/subscribe" method="post">
  <label>
    Email
    <input type="email" name="email" required autocomplete="email" />
  </label>
  <button type="submit">Join waitlist</button>
</form>`,
      "Labeled email field + submit",
      "حقل إيميل بـ label + submit",
    ),
    deepDive: [
      L(
        "Labels associate via wrapping or `for`/`id`. That hit target and accessible name are what make forms usable on mobile and with SR.",
        "الـ label بيتربط باللف أو `for`/`id`. ده بيوسّع منطقة الضغط وبيبني accessible name.",
      ),
    ],
    pitfalls: pitfall(
      `<input placeholder="Email" />`,
      L(
        "Placeholder is not a label — it disappears while typing.",
        "الـ placeholder مش label — بيختفي وأنت بتكتب.",
      ),
      `<label>Email <input type="email" name="email" /></label>`,
      L(
        "Visible label stays while the user types.",
        "الـ label يفضل ظاهر والمستخدم بيكتب.",
      ),
    ),
  },
  tables: {
    realWorld: realWorldExample(
      `<table>
  <caption>Track progress</caption>
  <thead>
    <tr><th scope="col">Tier</th><th scope="col">Done</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Beginner</th><td>3/3</td></tr>
  </tbody>
</table>`,
      "Captioned table with scoped headers",
      "جدول بـ caption و headers محددة النطاق",
    ),
    deepDive: [
      L(
        "`scope` and `<th>` build the header/cell relationships AT announce while navigating tables.",
        "`scope` و `<th>` بيبنوا علاقة الهيدر بالخلية اللي قارئ الشاشة بيعلنها.",
      ),
    ],
    pitfalls: pitfall(
      `<div class="row"><div>Beginner</div><div>3/3</div></div>`,
      L(
        "Div grids are not data tables.",
        "شبكات الـ div مش جداول بيانات.",
      ),
      `<table>...</table>`,
      L(
        "Use tables for tabular data, not page layout.",
        "استخدم الجداول لبيانات جدولية مش لـ layout الصفحة.",
      ),
    ),
  },
  "accessibility-basics": {
    realWorld: realWorldExample(
      `<button type="button" aria-pressed="false">SFX off</button>
<a href="#main">Skip to content</a>
<main id="main" tabindex="-1">
  <h1>Lessons</h1>
</main>`,
      "Named control + skip link + main target",
      "زر مسمّى + skip link + هدف main",
    ),
    deepDive: [
      L(
        "Accessible name computation uses content, `aria-label`, labelledby, etc. Decorative noise in names hurts usability.",
        "حساب الـ accessible name بياخد المحتوى و `aria-label` وغيرها. الضوضاء في الاسم بتضر الاستخدام.",
      ),
    ],
    pitfalls: pitfall(
      `<div role="button">Save</div>`,
      L(
        "Fake buttons need full keyboard support — easy to get wrong.",
        "أزرار مزيفة محتاجة دعم كيبورد كامل — سهل تتغلط.",
      ),
      `<button type="button">Save</button>`,
      L(
        "Native elements ship the hard parts.",
        "العناصر الأصلية بتجيب الجزء الصعب جاهز.",
      ),
    ),
  },
  "meta-seo": {
    realWorld: realWorldExample(
      `<head>
  <title>FrontendCraft — Learn HTML in the browser</title>
  <meta name="description" content="Interactive HTML labs with live sandboxes and bilingual lessons." />
  <link rel="canonical" href="https://example.com/html" />
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Course","name":"HTML track"}
  </script>
</head>
<body>
  <main>
    <h1>HTML track</h1>
    <a href="/html/forms-inputs">Learn HTML forms</a>
  </main>
</body>`,
      "SSR-ready head + main + descriptive link",
      "head جاهز لـ SSR + main + لينك وصفي",
    ),
    deepDive: [
      L(
        "Titles drive the SERP headline; descriptions often become the snippet (CTR). Keep both unique per route and aligned with the visible `<h1>` — no keyword stuffing.",
        "العناوين بتصنع عنوان النتائج؛ الوصف غالبًا بيبقى الـ snippet (CTR). خلّيهم فريدين لكل route ومتوافقين مع `<h1>` الظاهر — من غير حشو كلمات.",
      ),
      L(
        "Canonical consolidates duplicates. Prefer one absolute HTTPS URL and link to that same URL in your nav — mixed variants fight each other.",
        "الـ canonical بيجمّع النسخ المكررة. فضّل URL HTTPS مطلق واحد ولينكات الـ nav لنفس النسخة — النسخ المختلطة بتتصارع.",
      ),
      L(
        "Empty CSR shells delay crawl discovery. Ship primary copy in the first HTML; hydrate UI after. Social OG tags are covered in Head & Social Meta.",
        "CSR shells الفاضية بتأخّر اكتشاف الزحف. اطلع النص الأساسي في أول HTML؛ وبعدين hydrate للـ UI. وسوم OG في درس Head & Social Meta.",
      ),
    ],
    pitfalls: pitfall(
      `<title>Untitled</title>
<div id="root"></div>`,
      L(
        "Default title + empty mount — thin SERP and delayed indexing.",
        "عنوان افتراضي + mount فاضي — SERP ضعيف وفهرسة متأخرة.",
      ),
      `<title>FrontendCraft — HTML track</title>
<main>
  <h1>HTML track</h1>
  <a href="/html/forms-inputs">Learn HTML forms</a>
</main>`,
      L(
        "Specific title + crawlable body + real links win discovery and clicks.",
        "عنوان واضح + body قابل للزحف + لينكات حقيقية بيكسبوا الاكتشاف والنقرات.",
      ),
    ),
  },
  "media-embed": {
    realWorld: realWorldExample(
      `<figure>
  <video controls playsinline poster="/poster.jpg">
    <source src="/intro.mp4" type="video/mp4" />
    <track kind="captions" srclang="en" src="/intro.vtt" default />
  </video>
  <figcaption>Event Loop in 60s</figcaption>
</figure>`,
      "Video with captions + figcaption",
      "فيديو بكابشنز و figcaption",
    ),
    deepDive: [
      L(
        "Captions and transcripts are not optional extras — they are core a11y and also help SEO/indexing of spoken content.",
        "الكابشنز والتفريغ مش إضافات — أساسيات وصول وكمان بتفيد الـ SEO.",
      ),
    ],
    pitfalls: pitfall(
      `<video src="x.mp4" autoplay></video>`,
      L(
        "Autoplay without controls/captions hurts users.",
        "Autoplay من غير controls/captions بيضر المستخدم.",
      ),
      `<video controls playsinline>
  <source src="x.mp4" type="video/mp4" />
</video>`,
      L(
        "Give control to the user; add tracks when you can.",
        "سيّب التحكم للمستخدم؛ وزوّد tracks لما تقدر.",
      ),
    ),
  },
};

export function enrichLegacyLesson(lesson: LegacyLesson, order: number): Lesson {
  const base = overlays[lesson.slug] ?? fallbackOverlay(lesson);
  const patch = specific[lesson.slug] ?? {};
  const overlay: Overlay = {
    realWorld: patch.realWorld ?? base.realWorld,
    deepDive: patch.deepDive ?? base.deepDive,
    pitfalls: patch.pitfalls ?? base.pitfalls,
  };

  const pack =
    htmlInsights[lesson.slug] ??
    defaultInsights(lesson.content.title.en, lesson.content.title.ar);

  return {
    id: lesson.id,
    order,
    slug: lesson.slug,
    tier: lesson.difficulty,
    readMinutes: lesson.readMinutes + 2,
    icon: lesson.icon,
    visualizer: lesson.visualizer,
    content: {
      title: lesson.content.title,
      summary: lesson.content.summary,
      paragraphs: lesson.content.paragraphs,
      keyPoints: lesson.content.keyPoints,
      examples: [
        simpleExample(
          lesson.content.code,
          lesson.content.expectedOutput.en,
          lesson.content.expectedOutput.ar,
        ),
        overlay.realWorld,
      ],
      visualHint: lesson.content.visualHint,
      underTheHood: pack.underTheHood,
      accessibility: pack.accessibility,
      seo: pack.seo,
      // Pitfalls cards are collected into Pro: Common Pitfalls only.
    },
  };
}
