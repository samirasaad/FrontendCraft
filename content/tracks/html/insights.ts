import { insight, L } from "@/content/helpers";
import type { ProductionInsights } from "@/content/tracks/_insights";

export const htmlInsights: Record<string, ProductionInsights> = {
  "document-anatomy": {
    underTheHood: insight(
      [
        L(
          "Blink and Gecko turn your HTML into a DOM tree — not a simple string. The doctype puts the page in standards mode. Without it, quirks mode keeps old box-model rules that can break modern CSS.",
          "Blink و Gecko بيحوّلوا HTML لشجرة DOM — مش مجرد نص. الـ doctype بيشغّل standards mode. من غيره quirks mode بيخلي قواعد الـ box model القديمة تكسر CSS الحديث.",
        ),
        L(
          "The parser reads the file in chunks. Scripts and styles in `<head>` can pause parsing — that is why `charset` and `viewport` should appear early, before the first paint.",
          "الـ parser بيقرأ الملف على دفعات. Scripts و styles في `<head>` ممكن يوقفوا القراءة — عشان كده `charset` و `viewport` لازم ييجوا بدري، قبل أول paint.",
        ),
        L(
          "The DOM plus the CSSOM build the render tree. Bad nesting (like a `<div>` inside a `<p>`) gets silently repaired. You may not see an error, but the tree can surprise you.",
          "الـ DOM مع CSSOM بيبنوا الـ render tree. التداخل الغلط (زي `<div>` جوّه `<p>`) بيتصلح في الخفاء. ممكن متشوفش error، بس الشجرة تفاجئك.",
        ),
      ],
      {
        bullets: [
          L("Standards mode starts when the doctype is recognized", "standards mode بيبدأ لما الـ doctype يتعرّف"),
          L("Head metadata is processed before body content paints", "metadata الـ head بيتقرأ قبل ما body يترسم"),
          L("Parser repairs invalid markup — validate in DevTools, do not rely on luck", "الـ parser بيصلح markup غلط — اتأكد في DevTools، متعتمدش على الحظ"),
          L("DOM + CSSOM merge into the render tree that actually paints pixels", "DOM + CSSOM بيتدمجوا في render tree اللي بيرسم البيكسلات"),
        ],
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Page title</title>
  </head>
  <body>...</body>
</html>`,
        codeCaption: L("Minimal valid `document shell`", "`Document shell` صالح minimal"),
      },
    ),
    accessibility: insight(
      [
        L(
          "`lang` on `<html>` tells VoiceOver and NVDA how to speak the page. The wrong language makes Arabic or English sound broken. The document `<title>` is the first thing announced when the page loads.",
          "`lang` على `<html>` بيقول لـ VoiceOver و NVDA ينطقوا الصفحة إزاي. اللغة الغلط بتخلي العربي أو الإنجليزي يبان مكسور. `<title>` أول حاجة بتتنادي لما الصفحة تحمل.",
        ),
        L(
          "Put a skip link at the top of `<body>`, before header and nav. Keyboard users Tab once and jump past repeated menus. Without landmarks, screen readers cannot jump to the main content quickly.",
          "حط skip link في أول `<body>`، قبل الهيدر والقائمة. مستخدم الكيبورد يضغط Tab مرة ويتخطى القوائم المتكررة. من غير landmarks، قارئ الشاشة مش هيقدر يقفز للمحتوى الأساسي بسرعة.",
        ),
      ],
      {
        bullets: [
          L("Set `lang` to primary `content` language (ar, en, …)", "حط `lang` للغة المحتوى الأساسية (ar, en, …)"),
          L("`<title>` unique and `descriptive` per route", "`<title>` فريد ووصفي لكل route"),
          L("`Skip link` → `#main` with `visible` `focus` style", "`Skip link` → `#main` بـ `focus` style ظاهر"),
          L("Avoid `title` attribute as substitute for `visible text`", "متستخدمش `title` attribute بدل `visible text`"),
        ],
        code: `<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header>...</header>
  <main id="main" tabindex="-1">...</main>
</body>`,
        codeCaption: L("`Skip link` and main `landmark`", "`Skip link` و main `landmark`"),
      },
    ),
    seo: insight(
      [
        L(
          "Googlebot reads the first HTML response. `<title>`, canonical, meta description, and body text in that first payload get indexed reliably. An empty client-rendered shell delays discovery.",
          "Googlebot بيقرأ أول رد HTML. `<title>` و canonical و meta description ونص الـ body في أول حمولة بيتفهرسوا بثبات. shell فاضي مترسوم على الـ client بيأخّر الاكتشاف.",
        ),
        L(
          "Viewport meta helps mobile-first indexing. A missing viewport can mark the page as not mobile-friendly. A late `charset` can scramble Arabic in search snippets.",
          "Viewport meta بيساعد mobile-first indexing. لو الـ viewport ناقص، الصفحة ممكن تتعلّم إنها مش للموبايل. `charset` متأخر يقدر يبوّظ العربي في snippets البحث.",
        ),
      ],
      {
        bullets: [
          L("Unique `<title>` per `URL` — primary `ranking` signal", "`<title>` فريد لكل `URL` — `ranking` signal أساسي"),
          L("`<link rel=\"canonical\">` in `<head>`", "`<link rel=\"canonical\">` في `<head>`"),
          L("`SSR`/`SSG` `body` text — not empty `<div id=\"root\">`", "`SSR`/`SSG` `body` text — مش `<div id=\"root\">` فاضي"),
          L("Valid `HTML` reduces `parser` repair surprises in `crawlers`", "`HTML` valid يقلل `parser` repair surprises للـ `crawlers`"),
        ],
      },
    ),
  },

  "semantic-structure": {
    underTheHood: insight(
      [
        L(
          "Browsers map HTML elements to accessibility roles via the HTML Accessibility API Mappings (HTML-AAM). `<header>` (scoped to the body) → `banner`, `<nav>` → `navigation`, `<main>` → `main`, `<footer>` → `contentinfo`, `<article>` → `article`. That parallel accessibility tree is what screen readers walk — not your CSS boxes.",
          "المتصفحات بتربط عناصر HTML بـ accessibility roles عبر HTML-AAM. `<header>` (على مستوى الصفحة) → `banner`، `<nav>` → `navigation`، `<main>` → `main`، `<footer>` → `contentinfo`، `<article>` → `article`. دي الـ accessibility tree الموازية اللي قارئات الشاشة بتمشي عليها — مش صناديق CSS.",
        ),
        L(
          "`<header>` / `<footer>` are landmarks only when they are not nested inside another sectioning element (`article`, `section`, `aside`, `nav`). Nested ones stay ordinary headers/footers for that section — so you can have a post `<header>` inside `<article>` without creating a second page `banner`.",
          "`<header>` / `<footer>` بيبقوا landmarks بس لما يكونوش جوّه عنصر sectioning تاني (`article`, `section`, `aside`, `nav`). المتداخلين بيفضلوا header/footer عاديين للقسم ده — فتقدر تحط `<header>` جوّه `<article>` من غير ما تعمل `banner` تاني للصفحة.",
        ),
        L(
          "Do not rely on the old HTML5 “document outline” idea (sections inventing heading ranks). Browsers never shipped a usable outline UI from that algorithm, and the spec retreated. Real structure today = explicit `h1`–`h6` ranks + landmark regions. A bare `<section>` with no accessible name is usually not exposed as a landmark at all.",
          "متعتمدش على فكرة HTML5 القديمة عن document outline (إن الـ sections تخترع مراتب عناوين). المتصفحات عمرها ما شحنت UI outline يعتمد على الخوارزمية دي، والـ spec تراجع عنها. الهيكل الحقيقي النهاردة = مراتب `h1`–`h6` صريحة + مناطق landmarks. `<section>` فاضي من غير اسم وصول غالبًا مش بيتعرض كـ landmark أصلًا.",
        ),
        L(
          "Native tags get their meaning at parse time, almost for free. A soup of `<div class=\"header\">` / `<div class=\"nav\">` stays `generic` in the accessibility tree — screen readers have nothing to jump to, and reader mode must guess harder.",
          "الوسوم الأصلية بتاخد معناها وقت الـ parse، شبه ببلاش. شوربة `<div class=\"header\">` / `<div class=\"nav\">` بتفضل `generic` في accessibility tree — قارئ الشاشة مالوش حاجة يقفز ليها، ووضع القراءة بيتخمّن أصعب.",
        ),
      ],
      {
        bullets: [
          L("HTML-AAM maps tags to roles at parse time — almost zero runtime cost", "HTML-AAM بيربط الـ tags بالـ roles وقت الـ parse — تكلفة شبه صفر"),
          L("Nested <header>/<footer> stay local — only top-level ones become banner/contentinfo", "header/footer المتداخلة محلية — اللي على مستوى الصفحة بس هي banner/contentinfo"),
          L("The old “section outline” algorithm was never shipped — use real h1–h6 ranks", "خوارزمية section outline القديمة ما اتنفذتش — استخدم مراتب h1–h6 الحقيقية"),
          L("div soup stays generic in the accessibility tree — landmarks need native tags", "div soup بيفضل generic في accessibility tree — الـ landmarks محتاجة tags أصلية"),
        ],
        code: `<body>
  <header>
    <p>FrontendCraft</p>
    <nav aria-label="Primary">…</nav>
  </header>
  <main>
    <article>
      <header>
        <h1>Why semantics matter</h1>
        <p>Published <time datetime="2026-08-04">Aug 4</time></p>
      </header>
      <section>
        <h2>Landmarks</h2>
        <p>…</p>
      </section>
    </article>
  </main>
  <footer>
    <nav aria-label="Footer">…</nav>
    <p>© 2026</p>
  </footer>
</body>`,
        codeCaption: L(
          "Page landmarks + a local article header (not a second banner)",
          "Landmarks الصفحة + header محلي للـ article (مش banner تاني)",
        ),
      },
    ),
    accessibility: insight(
      [
        L(
          "Landmark navigation is a core screen-reader skill: VoiceOver rotor, NVDA Elements List, TalkBack. With real `<main>`, `<nav>`, and `<aside>`, users skip header and footer in one jump. `role=\"main\"` on a `<div>` is a last resort — native `<main>` is clearer.",
          "التنقل بالـ landmarks مهارة أساسية لقارئ الشاشة: VoiceOver rotor و NVDA Elements List و TalkBack. مع `<main>` و `<nav>` و `<aside>` حقيقيين، المستخدم يتخطى الهيدر والفوتر بقفزة واحدة. `role=\"main\"` على `<div>` حل أخير — `<main>` الأصلي أوضح.",
        ),
        L(
          "When a page has more than one `<nav>`, label each with `aria-label` or `aria-labelledby` (“Primary”, “Footer”, “Breadcrumb”). Unlabeled duplicates all announce as generic “navigation”, which wastes the landmark list.",
          "لما الصفحة فيها أكتر من `<nav>`، سمّي كل واحدة بـ `aria-label` أو `aria-labelledby` (\"Primary\"، \"Footer\"، \"Breadcrumb\"). المتكرر من غير اسم بيتقال كله \"navigation\" generic وبيضيّع فائدة قائمة الـ landmarks.",
        ),
        L(
          "`<section>` becomes a `region` landmark only when it has an accessible name (usually via a visible heading referenced with `aria-labelledby`, or `aria-label`). Unnamed sections are fine as styling hooks — they just will not appear in the landmark list. Do not wrap the whole page in unlabeled sections hoping for free structure.",
          "`<section>` بيبقى landmark من نوع `region` بس لما يكون ليه accessible name (غالبًا heading ظاهر مربوط بـ `aria-labelledby`، أو `aria-label`). الـ sections من غير اسم مقبولة كغلاف تنسيق — بس مش هتظهر في قائمة landmarks. متلفّش الصفحة كلها في sections من غير اسم وتستنى هيكل ببلاش.",
        ),
        L(
          "Pair landmarks with a skip link as the first focusable control in `<body>`: `Skip to content` → `#main` (on `<main id=\"main\" tabindex=\"-1\">` if you need a focus target). Landmarks help screen-reader users. Skip links help keyboard users who Tab through header and nav.",
          "اربط الـ landmarks بـ skip link كأول عنصر قابل للتركيز في `<body>`: `Skip to content` → `#main` (على `<main id=\"main\" tabindex=\"-1\">` لو محتاج هدف focus). الـ landmarks بتساعد قارئ الشاشة. الـ skip links بتساعد مستخدم الكيبورد اللي بيعدّي على الهيدر والقائمة بـ Tab.",
        ),
      ],
      {
        bullets: [
          L("Label every `<nav>` (and distinct `<aside>`) when duplicates exist", "سمّي كل `<nav>` (و `<aside>` المميزة) لما يتكرروا"),
          L("Name a `<section>` if it should appear as a region landmark", "سمّي `<section>` لو المفروض يظهر كـ region landmark"),
          L("Headings describe sections — never fake a title with styled `<div>`/`<p>`", "العناوين بتوصف الأقسام — متزوّرش عنوان بـ `<div>`/`<p>` مستايل"),
          L("Skip link + one `<main>` = fastest path past repeated header and nav", "Skip link + `<main>` واحد = أسرع طريق بعد الهيدر والقائمة المتكررين"),
          L("Do not re-apply ARIA landmark roles on native landmark elements", "متعيدش أدوار ARIA landmark على عناصر landmark أصلية"),
        ],
        code: `<a class="skip-link" href="#main">Skip to content</a>
<header>
  <nav aria-label="Primary">…</nav>
</header>
<main id="main" tabindex="-1">
  <section aria-labelledby="semantics-h">
    <h2 id="semantics-h">Semantic tags</h2>
    <p>…</p>
  </section>
</main>
<footer>
  <nav aria-label="Footer">…</nav>
</footer>`,
        codeCaption: L(
          "Skip link + labeled navs + named section region",
          "Skip link + navs متسمية + section region لها اسم",
        ),
      },
    ),
    seo: insight(
      [
        L(
          "Crawlers and snippet tools still need a clear HTML structure. Put the main text in `<main>`, posts or products in `<article>`, and header/footer links in `<header>` / `<footer>`. That helps tools split “the page” from “the template”. Semantics are not a ranking hack — they make meaning clearer.",
          "الـ crawlers وأدوات الـ snippets لسه محتاجين هيكل HTML واضح. حط النص الأساسي جوّه `<main>`، والبوستات أو المنتجات جوّه `<article>`، ولينكات الهيدر والفوتر في `<header>` / `<footer>`. ده بيساعد الأدوات تفصل “الصفحة” عن “القالب”. الـ semantics مش حيلة ترتيب — بتوضّح المعنى.",
        ),
        L(
          "Reader mode (Safari, Firefox, etc.) uses heuristics on headings, articles, and boilerplate density. A clean `<article>` with a real heading hierarchy inside `<main>` is far more likely to extract cleanly than a card grid of anonymous `<div>`s with the same visual design.",
          "وضع القراءة (Safari و Firefox وغيرهم) بيستخدم heuristics على العناوين والـ articles وكثافة الـ boilerplate. `<article>` نظيف مع hierarchy عناوين حقيقي جوّه `<main>` أقرب يتستخرج صح من شبكة كروت من `<div>`s مجهولة بنفس الشكل البصري.",
        ),
        L(
          "Structured data (`JSON-LD` Article, BreadcrumbList, …) should match the visible HTML — an `<article>` whose `<h1>` disagrees with `headline` in JSON-LD is a trust smell. Breadcrumbs work best as a real `<nav aria-label=\"Breadcrumb\">` list plus matching BreadcrumbList, not as JSON alone.",
          "الـ structured data (`JSON-LD` Article و BreadcrumbList و…) لازم تطابق الـ HTML الظاهر — `<article>` الـ `<h1>` بتاعه يختلف عن `headline` في JSON-LD علامة ثقة وحشة. الـ breadcrumbs أفضل كـ `<nav aria-label=\"Breadcrumb\">` list حقيقية + BreadcrumbList مطابق، مش JSON لوحده.",
        ),
        L(
          "Do not chase “outline SEO” myths from the old HTML5 outline algorithm. One clear visible `<h1>` that names the page, then honest `h2`/`h3` under it, inside landmarks — that pattern works for people, screen readers, and crawlers.",
          "متطاردش خرافات “outline SEO” من خوارزمية HTML5 outline القديمة. `<h1>` ظاهر واضح بيسمّي الصفحة، وبعدين `h2`/`h3` صادقين تحته، جوّه landmarks — ده النمط اللي ينفع للناس وقارئ الشاشة والـ crawlers.",
        ),
      ],
      {
        bullets: [
          L("Primary copy lives in `<main>` — not only in a hero `<div>`", "النسخ الأساسي جوّه `<main>` — مش في hero `<div>` بس"),
          L("Use `<article>` for posts, docs pages, products, news items", "استخدم `<article>` للبوستات وصفحات التوثيق والمنتجات والأخبار"),
          L("Align visible headings with JSON-LD when you ship rich results", "طابق العناوين الظاهرة مع JSON-LD لما تطلع rich results"),
          L("Breadcrumb: semantic `<nav>` list + matching structured data", "Breadcrumb: قائمة `<nav>` معنوية + structured data مطابق"),
          L("Semantics clarify meaning — they do not replace fast, crawlable HTML", "الـ semantics بتوضّح المعنى — مش بتستبدل HTML سريع وقابل للزحف"),
        ],
        code: `<main>
  <article itemscope itemtype="https://schema.org/Article">
    <h1 itemprop="headline">Semantic HTML in production</h1>
    <p itemprop="description">Landmarks and headings beat div soup.</p>
  </article>
</main>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Semantic HTML in production"
}
</script>`,
        codeCaption: L(
          "Visible article + matching JSON-LD headline",
          "Article ظاهر + headline JSON-LD مطابق",
        ),
      },
    ),
  },

  "text-headings": {
    underTheHood: insight(
      [
        L(
          "Heading elements (`h1`–`h6`) create block-level boxes in the render tree — font size comes from CSS, not the tag alone. Parser never validates hierarchy; browsers render `<h3>` before `<h1>` without error.",
          "Heading elements (`h1`–`h6`) بتعمل block-level boxes في render tree — font size من CSS مش الـ tag لوحده. Parser ما بيvalidate hierarchy؛ browsers بتrender `<h3>` قبل `<h1>` من غير error.",
        ),
        L(
          "Text nodes flow into line boxes during layout — long unbroken strings (URLs, Arabic without spaces) can overflow unless `overflow-wrap: break-word` is set. Subpixel rounding affects line heights across engines.",
          "Text nodes بتflow لـ line boxes أثناء layout — strings طويلة من غير break (URLs, Arabic من غير spaces) ممكن overflow إلا لو `overflow-wrap: break-word`. Subpixel rounding بيأثر line heights عبر engines.",
        ),
        L(
          "`<strong>` and `<em>` carry meaning for screen readers and reader mode. `<b>` / `<i>` are look-only unless you add meaning yourself.",
          "`<strong>` و `<em>` ليهم معنى لقارئ الشاشة ووضع القراءة. `<b>` / `<i>` للشكل بس إلا لو إنت ضفت معنى.",
        ),
      ],
      {
        bullets: [
          L("Font size on headings comes from CSS — the tag name does not set pixel size", "حجم الخط على العناوين جاي من CSS — اسم الـ tag ما بيحددش البيكسلات"),
          L("The parser does not enforce order — h3 before h1 still renders without error", "الـ parser ما بيفرضش الترتيب — h3 قبل h1 لسه بيترسم من غير error"),
          L("Long URLs or unbroken Arabic strings can overflow line boxes without overflow-wrap", "URLs طويلة أو عربي من غير مسافات ممكن يعمل overflow من غير overflow-wrap"),
          L("<strong> and <em> carry semantics; <b> and <i> are stylistic unless you add meaning", "<strong> و <em> ليهم semantics؛ <b> و <i> للشكل إلا لو ضفت معنى"),
        ],
        code: `<main>
  <h1>Product guide</h1>
  <section>
    <h2>Installation</h2>
    <h3>Linux</h3>
    <h4>Ubuntu</h4>
    <h5>LTS notes</h5>
    <h6>Checksum tip</h6>
  </section>
</main>`,
        codeCaption: L("Logical h1–h6 `hierarchy`", "`Hierarchy` منطقي h1–h6"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Screen readers generate heading lists (H key in NVDA) — skipping levels (`h1` → `h4`) confuses document maps. Never use headings for large bold text that is not a section title.",
          "Screen readers بتعمل heading lists (H key في NVDA) — skip levels (`h1` → `h4`) بيلخبط document maps. متستخدمش headings لنص bold كبير مش section title.",
        ),
        L(
          "Visible heading text must match accessible name — do not hide meaning only in icons beside empty `<h2>`. `aria-labelledby` can combine icon + text when needed.",
          "Visible heading text لازم يطابق accessible name — متخبيش المعنى في icons جنب `<h2>` فاضي. `aria-labelledby` يدمج icon + text لو محتاج.",
        ),
      ],
      {
        bullets: [
          L("`Headings` describe sections — not slogans in every `<h3>`", "`Headings` توصف sections — مش slogans في كل `<h3>`"),
          L("`<h1>` `visible`, not only for `SEO` visually `hidden`", "`<h1>` ظاهر مش `SEO` visually `hidden` بس"),
          L("Lang on `elements` for `mixed` Arabic/English `headings`", "`lang` على `elements` للـ `headings` Arabic/English `mixed`"),
          L("Avoid `role=\"heading\"` when native hx exists", "تجنب `role=\"heading\"` لما hx native موجود"),
        ],
        code: `<h2 id="shipping-heading">Shipping options</h2>
<section aria-labelledby="shipping-heading">...</section>`,
        codeCaption: L("Label section via `heading` id", "سمّي section عبر `heading` id"),
      },
    ),
    seo: insight(
      [
        L(
          "Google weights `<h1>` and nearby text heavily for relevance — keyword stuffing in headings triggers quality demotion; write for humans, mirror in title tag.",
          "Google بتدي وزن كبير لـ `<h1>` والنص حواليه للـ relevance — keyword stuffing في headings بيخفّض quality؛ اكتب للناس و mirror في title tag.",
        ),
        L(
          "Featured snippets often pull from `<h2>` question sections — structure FAQs with real headings, not bold paragraphs, for clearer extraction.",
          "Featured snippets غالبًا من sections `<h2>` question — structure FAQs بـ headings حقيقية مش bold paragraphs لاستخراج أوضح.",
        ),
      ],
      {
        bullets: [
          L("`<title>` and `<h1>` aligned but not identical spam", "`<title>` و `<h1>` متوافقين مش spam identical"),
          L("First `paragraph` after `<h1>` summarizes `page intent`", "أول `paragraph` بعد `<h1>` يلخص `page intent`"),
          L("Avoid empty `headings` injected by `CMS templates`", "تجنب `headings` فاضية من `CMS templates`"),
          L("`Table` of contents `links` use fragment ids on `headings`", "TOC `links` تستخدم fragment ids على `headings`"),
        ],
      },
    ),
  },

  "text-formatting": {
    underTheHood: insight(
      [
        L(
          "Inline formatting tags wrap text nodes without breaking the paragraph’s block box. The browser still builds one flow of line boxes — tags only annotate spans inside that flow.",
          "tags التنسيق الـ inline بتلف text nodes من غير ما تكسر block box الفقرة. المتصفح لسه بيبني flow واحد من line boxes — الـ tags بتعلّم spans جوّه الـ flow.",
        ),
        L(
          "`<strong>` / `<em>` map to importance/emphasis in the accessibility tree. `<b>` / `<i>` are presentational by default unless you add meaning with CSS or ARIA carefully.",
          "`<strong>` / `<em>` بيروحوا importance/emphasis في accessibility tree. `<b>` / `<i>` presentational افتراضيًا إلا لو ضفت معنى بحذر.",
        ),
        L(
          "`<time datetime>` and `<abbr title>` store machine-readable values next to visible text — useful for parsers, browsers, and screen-reader expansion.",
          "`<time datetime>` و `<abbr title>` بيخزنوا قيم للآلة جنب النص الظاهر — مفيدة للـ parsers والمتصفح وتوسيع قارئ الشاشة.",
        ),
      ],
      {
        bullets: [
          L("Inline tags annotate spans inside one paragraph flow — they do not break the block box", "وسوم inline بتعلّم spans جوه flow واحد — ما بتكسرش block box الفقرة"),
          L("Machine-readable values live in datetime and abbr title attributes", "القيم المقروءة للآلة في datetime و title على abbr"),
          L("Reader mode and screen readers use semantic emphasis — decorative bold adds noise", "وضع القراءة وقارئ الشاشة بيستخدموا emphasis له معنى — الـ bold الديكور بيزود ضوضاء"),
          L("blockquote creates a block; q stays inline inside a paragraph", "blockquote بلوك؛ q يفضل inline جوه الفقرة"),
        ],
        code: `<p>
  <strong>Note:</strong> press <kbd>Ctrl</kbd>+<kbd>S</kbd>.
  Use <code>npm run build</code>.
</p>`,
        codeCaption: L("`Importance` + `keyboard` + code", "`Importance` + `keyboard` + code"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Screen readers may announce “strong” / “emphasis” for `<strong>` / `<em>`. Overusing them makes pages noisy — reserve for real stress or importance.",
          "الـ screen readers ممكن تعلن “strong” / “emphasis” لـ `<strong>` / `<em>`. الاستخدام الزيادة بيعمل ضوضاء — خلّيهم للتشديد أو الأهمية الحقيقية.",
        ),
        L(
          "`<abbr title>` can expose the expansion. Don’t underline random text with `<u>` in a way that looks like a link.",
          "`<abbr title>` يقدر يعرض التوسيع. متظللش نص عشوائي بـ `<u>` بشكل يبان link.",
        ),
      ],
      {
        bullets: [
          L("Prefer `<strong>` / `<em>` over `bold`/`italic` `spans`", "فضّل `<strong>` / `<em>` عن `spans` `bold`/`italic`"),
          L("Provide `title` on abbreviations when helpful", "حط `title` على الاختصارات لما يفيد"),
          L("Quotes: `q` inline, `blockquote` for blocks", "اقتباس: `q` inline، `blockquote` للبلوك"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Formatting tags rarely rank alone — but clear `<strong>` on key phrases and honest `<time datetime>` help humans and some extractors understand emphasis and freshness.",
          "tags التنسيق نادرًا ما ترتّب لوحدها — لكن `<strong>` واضح على عبارات مهمة و `<time datetime>` صادق بيساعدوا الناس وبعض أدوات الاستخراج.",
        ),
        L(
          "Avoid stuffing keywords inside every `<b>` / `<strong>`. Write for readers; let semantics stay honest.",
          "متحشوّش keywords جوّه كل `<b>` / `<strong>`. اكتب للقارئ؛ سيّب الـ semantics صادقة.",
        ),
      ],
      {
        bullets: [
          L("Meaningful `emphasis` > `decorative` `bold`", "تشديد له معنى > `bold` ديكور"),
          L("`cite` / quotes support `article` clarity", "`cite` / quotes بيوضّحوا المقال"),
        ],
      },
    ),
  },

  "links-images": {
    underTheHood: insight(
      [
        L(
          "`<a href>` is a real link in the DOM. Prefetch hints and clicks go through the network. `href=\"#\"` still jumps (often to the top) — use `<button>` for actions.",
          "`<a href>` لينك حقيقي في الـ DOM. تلميحات prefetch والضغطة بتمشي في الشبكة. `href=\"#\"` لسه بيقفز (غالبًا لفوق) — استخدم `<button>` للأفعال.",
        ),
        L(
          "Images are replaced elements. The layout keeps space only when you set `width`/`height` or CSS `aspect-ratio`. Without size, the page jumps after the image loads (`CLS`).",
          "الصور عناصر replaced. الصفحة بتحجز مساحة بس لما تحط `width`/`height` أو `aspect-ratio`. من غير مقاس، الصفحة بتقفز بعد تحميل الصورة (`CLS`).",
        ),
        L(
          "`loading=\"lazy\"` waits to fetch until the image is near the screen. Never lazy-load the `LCP` hero. Decode runs on the main thread — huge images delay paint if they have no size.",
          "`loading=\"lazy\"` بيستنى ينزّل الصورة لحد ما تقرب من الشاشة. متعملش lazy لصورة `LCP`. الـ decode على الـ main thread — صور ضخمة بتأخّر الـ paint لو مفيش مقاس.",
        ),
      ],
      {
        bullets: [
          L("href=\"#\" still navigates — use <button> for in-page actions", "href=\"#\" لسه بينقل — استخدم <button> لإجراءات جوه الصفحة"),
          L("Images decode on the main thread — large files delay paint without sizing", "الصور بتتفك على main thread — الملفات الكبيرة بتأخر paint من غير أبعاد"),
          L("Lazy loading defers fetch until near the viewport — never lazy the LCP hero", "lazy loading بيأجل التحميل لحد قرب الـ viewport — ما تعملش lazy لصورة الـ hero"),
          L("Replaced elements only reserve space when width/height or aspect-ratio is set", "العناصر replaced بتحجز مساحة لما width/height أو aspect-ratio متحددين"),
        ],
        code: `<img
  src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  alt="Team collaborating in Cairo office"
  width="1200"
  height="630"
  fetchpriority="high"
/>`,
        codeCaption: L("`LCP` image with `dimensions` and alt", "`LCP` image بـ `dimensions` و alt"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Link text must be clear from the words or `aria-label`. A list of “Read more” fails WCAG 2.4.4. If an image is the only link content, `alt` becomes the link name.",
          "نص اللينك لازم يكون واضح من الكلام أو `aria-label`. قائمة “Read more” بتفشل WCAG 2.4.4. لو الصورة هي محتوى اللينك الوحيد، `alt` يبقى اسم اللينك.",
        ),
        L(
          "Keyboard: Tab focuses links; Enter activates. Do not remove focus outlines on `<a>` — VoiceOver reads \"link\" plus accessible name; empty alt on informative images hides content from blind users.",
          "Keyboard: Tab يركز links؛ Enter يفعّل. متشيلش focus outlines على `<a>` — VoiceOver بتقول \"link\" + accessible name؛ alt فاضي على informative images بيخبي content عن blind users.",
        ),
      ],
      {
        bullets: [
          L("Unique link text per `destination` context", "Link text فريد per `destination` context"),
          L("alt describes image function, not filename", "alt يوصف function الصورة مش filename"),
          L("`External` `links`: indicate when policy requires", "`External` `links`: وضّح لما policy يطلب"),
          L("`Skip` `icon-only` `links` without `aria`-label", "متسيبش `icon-only` `links` من غير `aria`-label"),
        ],
        code: `<a href="/pricing">
  View pricing for FrontendCraft Pro
</a>
<a href="/docs" aria-label="Documentation (opens in new tab)">Docs ↗</a>`,
        codeCaption: L("Clear links for screen readers and SEO", "لينكات واضحة لقارئ الشاشة و SEO"),
      },
    ),
    seo: insight(
      [
        L(
          "Googlebot follows `<a href>` URLs — JavaScript-only click handlers without href are invisible to crawlers. Internal links pass PageRank; use real URLs in sitemap-aligned anchors.",
          "Googlebot بيتبع `<a href>` URLs — click handlers JS-only من غير href invisible للـ crawlers. Internal links بتمرر PageRank؛ استخدم URLs حقيقية في anchors متوافقة مع sitemap.",
        ),
        L(
          "Image search uses alt, filename, surrounding text, and structured data — empty alt on product photos wastes discovery. CLS from unsized images hurts ranking via CWV.",
          "Image search بيستخدم alt و filename و surrounding text و structured data — alt فاضي على product photos بيضيّع discovery. CLS من images بدون size بيضر ranking عبر CWV.",
        ),
      ],
      {
        bullets: [
          L("Crawlable `<a href>` for all `indexable` destinations", "`<a href>` قابل للزحف لكل destinations قابلة للفهرسة"),
          L("`Descriptive` alt on informative `images`", "alt وصفي على informative `images`"),
          L("Reserve `image dimensions` — protect `LCP` and `CLS`", "احجز `image dimensions` — احمِ `LCP` و `CLS`"),
          L("Avoid `lazy-loading` `above-the-fold` `hero`", "مت`lazy-load` `hero` `above-the-fold`"),
        ],
      },
    ),
  },

  "lists": {
    underTheHood: insight(
      [
        L(
          "`<ul>`, `<ol>`, and `<dl>` make list boxes in the render tree. Bullet style comes from CSS. Hiding bullets with CSS does **not** remove list meaning for screen readers.",
          "`<ul>` و `<ol>` و `<dl>` بيعملوا صناديق قائمة في الـ render tree. شكل النقط من CSS. إخفاء النقط بـ CSS **مش** بيشيل معنى القائمة عن قارئ الشاشة.",
        ),
        L(
          "Only `<li>` should be direct children of `<ul>/<ol>` — parser will repair invalid markup but accessibility tree item counts may wrong-foot screen readers.",
          "`<li>` بس direct children لـ `<ul>/<ol>` — parser بيصلح markup غلط لكن item counts في accessibility tree ممكن تلخبط screen readers.",
        ),
        L(
          "Nested lists encode hierarchy in the DOM — flattening to divs loses \"item 2 of 5, level 2\" announcements in NVDA.",
          "Nested lists بت encode hierarchy في DOM — flattening لـ divs بيضيع \"item 2 of 5, level 2\" في NVDA.",
        ),
      ],
      {
        bullets: [
          L("list-style: none in CSS does not remove list role — only changes bullets visually", "list-style: none في CSS ما بيشيلش list role — بيغيّر الشكل بس"),
          L("Invalid children inside ul/ol get repaired — item counts for screen readers may be wrong", "أطفال غلط جوّه ul/ol بيتصلحوا — عدد العناصر لقارئ الشاشة ممكن يبقى غلط"),
          L("Nested lists encode level in the DOM — flat divs lose “item 2 of 5, level 2”", "القوائم المتداخلة بتحفظ المستوى في DOM — divs مسطّحة بتفقد “item 2 of 5, level 2”"),
          L("dl pairs dt/dd — broken pairs confuse screen reader pronunciation", "dl بيربط dt/dd — أزواج مكسورة بتلخبط نطق قارئ الشاشة"),
        ],
        code: `<ol>
  <li>Boil water</li>
  <li>Steep tea
    <ul>
      <li>3 minutes green</li>
      <li>5 minutes black</li>
    </ul>
  </li>
</ol>`,
        codeCaption: L("Nested list `hierarchy` in `DOM`", "Nested list `hierarchy` في `DOM`"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Screen readers announce list type and position — \"list, 3 items\". Div-based faux lists skip this context unless you add `role=\"list\"` and `role=\"listitem\"` (Safari had quirks — native lists are safer).",
          "Screen readers بتعلن list type و position — \"list, 3 items\". Faux lists من divs بتتخطى context ده إلا لو `role=\"list\"` و `role=\"listitem\"` (Safari كان فيها quirks — native lists أأمن).",
        ),
        L(
          "Navigation menus should be `<ul>` inside `<nav>` — roving tabindex on `<li>` > `<a>` preserves list semantics and keyboard patterns users expect.",
          "Navigation menus لازم `<ul>` جوه `<nav>` — roving tabindex على `<li>` > `<a>` يحافظ list semantics و keyboard patterns المتوقعة.",
        ),
      ],
      {
        bullets: [
          L("Native lists for `nav`, TOC, and step instructions", "Native lists للـ `nav` و TOC و step instructions"),
          L("If `role`=\"list\" on divs, include `role`=\"`listitem`\" `children`", "لو `role`=\"list\" على divs، ضيف `role`=\"`listitem`\" `children`"),
          L("`<ol start>` and `value` for resumed sequences", "`<ol start>` و `value` لـ resumed sequences"),
          L("`Description` lists for `FAQ` pairs — not fake bullets", "`Description` lists لـ `FAQ` pairs — مش fake bullets"),
        ],
        code: `<nav aria-label="Primary">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/tracks">Labs</a></li>
  </ul>
</nav>`,
        codeCaption: L("Semantic nav list for screen readers", "قائمة nav واضحة لقارئ الشاشة"),
      },
    ),
    seo: insight(
      [
        L(
          "Ordered lists signal step sequences to crawlers — how-to content with `<ol>` aligns with HowTo schema. Unordered lists help feature lists in product pages for snippet bullets.",
          "Ordered lists بت signal step sequences للـ crawlers — how-to content بـ `<ol>` يتوافق مع HowTo schema. Unordered lists بتساعد feature lists في product pages لـ snippet bullets.",
        ),
        L(
          "List items containing only links still pass anchor text — ensure each `<li>` link text is unique and descriptive for internal linking graphs.",
          "List items فيها links بس لسه بتمرر anchor text — تأكد link text في كل `<li>` فريد ووصفي لـ internal linking graphs.",
        ),
      ],
      {
        bullets: [
          L("HowTo steps: `<ol>` + matching `JSON-LD`", "HowTo steps: `<ol>` + `JSON-LD` مطابق"),
          L("Feature bullets in `<ul>` near product `<h1>`", "Feature bullets في `<ul>` قريب من product `<h1>`"),
          L("Avoid empty `<li>` `placeholders` from CMS", "تجنب `<li>` فاضية `placeholders` من CMS"),
          L("TOC lists link to `heading` ids — crawlable fragments", "TOC lists `links` لـ `heading` ids — fragments قابلة للزحف"),
        ],
      },
    ),
  },

  "forms-inputs": {
    underTheHood: insight(
      [
        L(
          "Form controls are replaced elements wired to the browser's form submission pipeline — `method`, `action`, and `enctype` control HTTP semantics. Client-side validation (`required`, `pattern`) runs before submit but does not replace server validation.",
          "Form controls replaced elements مربوطة بـ form submission pipeline — `method`, `action`, و `enctype` بيتحكموا في HTTP semantics. Client-side validation (`required`, `pattern`) قبل submit لكن مايستبدلش server validation.",
        ),
        L(
          "Each input type maps to a platform widget — date pickers, file choosers, and color wells are OS-native. Custom div widgets lose autofill, password managers, and mobile keyboards unless rebuilt carefully.",
          "كل input type بيت map لـ platform widget — date pickers و file choosers و color wells native من OS. Custom div widgets بتفقد autofill و password managers و mobile keyboards إلا لو اتبنت بحرص.",
        ),
        L(
          "Label association (`for` + `id` or wrapping) creates the accessible name computation in the accessibility tree — placeholder is NOT a label and disappears on input.",
          "Label association (`for` + `id` أو wrapping) بتعمل accessible name computation في accessibility tree — placeholder مش label وبيتشال لما user يكتب.",
        ),
      ],
      {
        bullets: [
          L("Each input type maps to an OS-native widget — custom divs lose autofill and mobile keyboards", "كل input type بيروح لـ widget أصلي من النظام — divs مخصصة بتفقد autofill وكيبورد الموبايل"),
          L("Placeholder is not a label — it vanishes when the user types", "Placeholder مش label — بيختفي لما المستخدم يكتب"),
          L("Client-side validation runs before submit — server validation is still required", "التحقق من جهة العميل قبل الإرسال — التحقق من السيرفر لسه مطلوب"),
          L("method, action, and enctype control how the browser sends the HTTP request", "method و action و enctype بيحددوا إزاي المتصفح يبعت طلب HTTP"),
        ],
        code: `<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  required
  aria-describedby="email-hint"
/>
<p id="email-hint">We never share your email.</p>`,
        codeCaption: L("Label, hint, and `autocomplete`", "Label و hint و `autocomplete`"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Tab order follows DOM order — `tabindex=\"0\"` only when necessary; positive tabindex traps keyboard users. Enter submits forms; Space toggles checkboxes — custom widgets must replicate these keys.",
          "Tab order يتبع DOM order — `tabindex=\"0\"` لما ضروري بس؛ positive tabindex بيحبس keyboard users. Enter يsubmit forms؛ Space يtoggle checkboxes — custom widgets لازم ت replicate المفاتيح دي.",
        ),
        L(
          "Error messages link with `aria-describedby` and `aria-invalid=\"true\"` — focus first invalid field on submit so NVDA announces the error immediately.",
          "Error messages مربوطة بـ `aria-describedby` و `aria-invalid=\"true\"` — focus أول invalid field عند submit عشان NVDA تعلن error فورًا.",
        ),
      ],
      {
        bullets: [
          L("`Visible` `focus` ring on all `inputs` and `buttons`", "`Focus` ring ظاهر على `inputs` و `buttons`"),
          L("Group radios/checkboxes with `<fieldset>` + `<legend>`", "Group radios/checkboxes بـ `<fieldset>` + `<legend>`"),
          L("Required fields: `aria`-required or required attribute", "Required fields: `aria`-required أو required attribute"),
          L("Do not disable `submit` without explaining why", "متعطّلش `submit` من غير توضيح ليه"),
        ],
        code: `<input
  aria-invalid="true"
  aria-describedby="err-email"
/>
<span id="err-email" role="alert">Enter a valid email.</span>`,
        codeCaption: L("`Accessible` `validation` error", "`Validation` error `accessible`"),
      },
    ),
    seo: insight(
      [
        L(
          "Forms themselves are rarely indexed — but `landing pages` with forms need indexable headings and copy around the form. Login walls block crawlers unless public marketing content surrounds them.",
          "Forms نادرًا ما تتفهرس — لكن `landing pages` فيها forms محتاجة headings و copy قابلة للفهرسة حوالين الـ form. Login walls بتblock crawlers إلا لو marketing content عام حواليهم.",
        ),
        L(
          "Search forms with GET and query params can create duplicate URLs — use canonical tags when `?q=` pages should not index separately.",
          "Search forms بـ GET و query params ممكن تعمل duplicate URLs — استخدم canonical tags لما صفحات `?q=` مايتفهرسوش منفصل.",
        ),
      ],
      {
        bullets: [
          L("`Indexable` `content` above/below `lead forms`", "محتوى قابل للفهرسة فوق/تحت `lead forms`"),
          L("`Canonical` on parameterized search result pages", "`Canonical` على parameterized search result pages"),
          L("`Server`-`render` form `labels` — not `JS`-only `placeholders`", "`Server`-`render` form `labels` — مش `placeholders` `JS`-only"),
          L("noscript `fallback` for critical contact info", "noscript `fallback` لمعلومات contact حرجة"),
        ],
      },
    ),
  },

  "tables": {
    underTheHood: insight(
      [
        L(
          "Tables create table layout boxes — `display: table` semantics in HTML trigger special layout algorithms (column widths, border collapse). CSS Grid/Flex is for layout; HTML tables remain for tabular data.",
          "Tables بتعمل table layout boxes — semantics `display: table` في HTML بتشغّل layout algorithms خاصة (column widths, border collapse). CSS Grid/Flex للـ layout؛ HTML tables لسه للـ tabular data.",
        ),
        L(
          "`<th scope=\"col|row\">` and `<caption>` are parsed into header cell relationships — browsers expose row/column headers to the accessibility API without JavaScript.",
          "`<th scope=\"col|row\">` و `<caption>` بتتparse لـ header cell relationships — browsers بتعرض row/column headers لـ accessibility API من غير JavaScript.",
        ),
        L(
          "Large tables reflow on resize — horizontal scroll wrappers prevent squashing columns but add focus management complexity for keyboard users traversing wide grids.",
          "Tables كبيرة بتreflow على resize — horizontal scroll wrappers بتمنع squashing columns لكن بتضيف focus management complexity لـ keyboard users في wide grids.",
        ),
      ],
      {
        bullets: [
          L("Table layout uses its own column algorithm — different from CSS Grid", "جدول الـ table layout له خوارزمية أعمدة خاصة — مختلفة عن CSS Grid"),
          L("th scope wires header cells without JavaScript", "th scope بيربط خلايا العناوين من غير JavaScript"),
          L("Wide tables need horizontal scroll wrappers — keyboard focus gets harder", "الجداول العريضة محتاجة scroll أفقي — التركيز بالكيبورد بيبقى أصعب"),
          L("border-collapse and column widths are computed before cell paint", "border-collapse وعرض الأعمدة بيتحسبوا قبل رسم الخلايا"),
        ],
        code: `<table>
  <caption>Q3 sales by region</caption>
  <thead>
    <tr><th scope="col">Region</th><th scope="col">Revenue</th></tr>
  </thead>
  <tbody>...</tbody>
</table>`,
        codeCaption: L("Data `table` with `caption` and `scope`", "Data `table` بـ `caption` و `scope`"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Screen readers navigate tables in table mode (T in NVDA) — layout tables (`role=\"presentation\"` or div grids pretending to be tables) waste user time or misannounce relationships.",
          "Screen readers بتتنقل tables في table mode (T في NVDA) — layout tables (`role=\"presentation\"` أو div grids متظاهرة tables) بتضيع وقت user أو بتعلن relationships غلط.",
        ),
        L(
          "Sortable custom tables need `aria-sort` on headers and keyboard activation — native `<table>` plus progressive enhancement beats div grids for sortable data.",
          "Sortable custom tables محتاجة `aria-sort` على headers و keyboard activation — native `<table>` plus progressive enhancement أحسن من div grids للـ sortable data.",
        ),
      ],
      {
        bullets: [
          L("Never use `tables` for `multi-column` `page layout`", "متستخدمش `tables` لـ `multi-column` `page layout`"),
          L("Associate `<td>` with `headers` via `headers` attribute when needed", "اربط `<td>` بـ `headers` عبر `headers` attribute لو محتاج"),
          L("Sticky `headers`: preserve th `semantics`, not div clones", "Sticky `headers`: احتفظ th `semantics` مش div clones"),
          L("Provide text alternative summary for complex charts-as-`tables`", "Summary text alternative للـ charts-as-`tables` المعقدة"),
        ],
        code: `<th scope="col" aria-sort="ascending">
  Price
</th>`,
        codeCaption: L("Sort state exposed to screen readers", "حالة الترتيب ظاهرة لقارئ الشاشة"),
      },
    ),
    seo: insight(
      [
        L(
          "Google extracts table data for some rich results — pricing comparison pages with semantic tables and clear headers perform better than image-only charts with no HTML fallback.",
          "Google بتستخرج table data لبعض rich results — pricing comparison pages بـ semantic tables و headers واضحة أحسن من charts صور بس من غير HTML fallback.",
        ),
        L(
          "Layout tables dilute semantic signals — product specs in `<dl>` or `<table>` with real headers help snippet quality; div grids hide structured facts from crawlers.",
          "Layout tables بتخفّ semantic signals — product specs في `<dl>` أو `<table>` بـ headers حقيقية بتساعد snippet quality؛ div grids بتخبي structured facts عن crawlers.",
        ),
      ],
      {
        bullets: [
          L("Mark up comparable data with real `<table>` `elements`", "Mark up comparable data بـ `<table>` `elements` حقيقية"),
          L("`Caption` + `headings` describe dataset for `snippets`", "`Caption` + `headings` توصف dataset للـ `snippets`"),
          L("Avoid empty `table` `shells` `filled` only by `client` `JS`", "تجنب `table` `shells` فاضية `filled` بـ `client` `JS` بس"),
          L("`Structured data` Product offers align with `visible` rows", "`Structured data` Product offers متوافقة مع `visible` rows"),
        ],
      },
    ),
  },

  "accessibility-basics": {
    underTheHood: insight(
      [
        L(
          "The accessibility tree is built from DOM + CSS — `display: none` and `visibility: hidden` remove nodes from screen readers; `aria-hidden=\"true\"` hides subtrees while leaving visual paint. Both differ from off-screen positioning.",
          "Accessibility tree مبني من DOM + CSS — `display: none` و `visibility: hidden` بيشيلوا nodes من screen readers؛ `aria-hidden=\"true\"` بيخفي subtrees والـ visual paint لسه موجود. الاتنين مختلفين عن off-screen positioning.",
        ),
        L(
          "Accessible name computation combines label, aria-label, aria-labelledby, and text content — role comes from implicit HTML semantics or explicit ARIA. Mismatch between visual and computed name fails audits.",
          "Accessible name computation بيدمج label و aria-label و aria-labelledby و text content — role من implicit HTML semantics أو ARIA explicit. mismatch بين visual و computed name بيفشل audits.",
        ),
        L(
          "Focus order follows tabindex and DOM sequence — Blink and Gecko update `:focus-visible` heuristics so mouse clicks do not always show rings while keyboard Tab does.",
          "Focus order يتبع tabindex و DOM sequence — Blink و Gecko بيحدّثوا `:focus-visible` heuristics عشان mouse clicks مايعرضوش rings دايمًا بينما keyboard Tab يعرض.",
        ),
      ],
      {
        bullets: [
          L("display:none and visibility:hidden remove nodes from the accessibility tree", "display:none و visibility:hidden بيشيلوا العقد من accessibility tree"),
          L("Accessible name merges label, aria-label, and visible text", "الاسم الوصولي بيدمج label و aria-label والنص الظاهر"),
          L(":focus-visible shows rings for keyboard users, not every mouse click", ":focus-visible بيعرض حلقة لمستخدمي الكيبورد، مش كل كليك ماوس"),
          L("aria-hidden hides a subtree from screen readers while pixels may still paint", "aria-hidden بيخفي جزء عن قارئ الشاشة والبيكسلات ممكن تفضل ظاهرة"),
        ],
        code: `/* Show focus for keyboard, subtle for mouse */
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}`,
        codeCaption: L(":`focus`-`visible` for `keyboard` `users`", ":`focus`-`visible` لـ `keyboard` `users`"),
      },
    ),
    accessibility: insight(
      [
        L(
          "This lesson is the a11y source of truth for the HTML lab — other lessons link concepts here instead of repeating thin tips. NVDA (Windows) and VoiceOver (macOS/iOS) are the pair to practice with.",
          "الدرس ده مصدر a11y للـ HTML lab — الدروس التانية بترجع هنا بدل تكرار نصائح سطحية. NVDA (Windows) و VoiceOver (macOS/iOS) هما اللي تتدرب عليهم.",
        ),
        L(
          "Keyboard: Tab/Shift+Tab move focus; Enter activates links and buttons; Space toggles buttons and checkboxes; Escape closes dialogs. Never trap focus without a dismiss path.",
          "Keyboard: Tab/Shift+Tab ينقلوا focus؛ Enter يفعّل links و buttons؛ Space يtoggle buttons و checkboxes؛ Escape يقفل dialogs. متحبسش focus من غير dismiss path.",
        ),
        L(
          "ARIA pattern checklist: `aria-expanded` + `aria-controls` for disclosures, `aria-live=\"polite\"` for status text, `aria-labelledby` for dialog titles. Prefer native elements before any role=.",
          "Checklist لـ ARIA: `aria-expanded` + `aria-controls` للـ disclosures، `aria-live=\"polite\"` لنص الحالة، `aria-labelledby` لعناوين الـ dialog. فضّل العناصر الأصلية قبل أي role=.",
        ),
      ],
      {
        bullets: [
          L("Every `interactive control` has `accessible name`", "كل `interactive control` لها `accessible name`"),
          L("Color contrast ≥ 4.5:1 for `body` text (AA)", "Color contrast ≥ 4.5:1 لـ `body` text (AA)"),
          L("`aria`-live=\"polite|assertive\" for dynamic updates", "`aria`-live=\"polite|assertive\" للـ dynamic updates"),
          L("Manage `focus` on `route change` and `modal` open/close", "أدِر `focus` على `route change` و `modal` open/close"),
          L("`Skip link` → #main before repeated header and nav", "`Skip link` → #main قبل الهيدر والقائمة المتكررين"),
        ],
        code: `<button type="button" aria-expanded="false" aria-controls="menu">
  Menu
</button>
<ul id="menu" hidden>...</ul>
<div aria-live="polite" id="status"></div>`,
        codeCaption: L("Expandable widget + live status region", "Expandable widget + منطقة حالة live"),
      },
    ),
    seo: insight(
      [
        L(
          "Accessibility overlaps SEO — semantic headings, alt text, descriptive links, and valid HTML help crawlers and users. Google does not use WCAG score as a direct ranking factor but usable pages correlate with engagement.",
          "Accessibility overlaps SEO — semantic headings و alt text و descriptive links و valid HTML بيساعدوا crawlers و users. Google ما بتستخدم WCAG score ranking factor مباشر لكن usable pages بت correlate مع engagement.",
        ),
        L(
          "Hidden content (`display:none`) is often weaker in indexing — do not hide keyword blocks. `aria-hidden` on decorative header bits is fine when the main text stays visible in the DOM.",
          "المحتوى المخفي (`display:none`) غالبًا أضعف في الفهرسة — متخبيش كتل keywords. `aria-hidden` على زينة الهيدر عادي لما النص الأساسي ظاهر في الـ DOM.",
        ),
      ],
      {
        bullets: [
          L("Same HTML improvements help screen readers and crawlers", "نفس تحسينات HTML بتساعد قارئ الشاشة والـ crawlers"),
          L("`Visible` main `content` — not only `aria` `labels`", "Main `content` ظاهر — مش `aria` `labels` بس"),
          L("Mobile usability and a11y share tap `target` sizing", "Mobile usability و a11y بيشاركوا tap `target` sizing"),
          L("Avoid `cloaking` — different `content` for `bots` vs `users`", "تجنب `cloaking` — `content` مختلف للـ `bots` vs `users`"),
        ],
      },
    ),
  },

  "sr-practice": {
    underTheHood: insight(
      [
        L(
          "Assistive tech reads the accessibility tree (name, role, value/state) — not your CSS paint. Bad markup can “look fine” while the tree is empty, wrong, or out of sync with the UI.",
          "قارئ الشاشة بيقرأ الـ accessibility tree (name و role و value/state) — مش رسم CSS. الـ markup الغلط ممكن “شكله حلو” والشجرة فاضية أو غلط أو مش متزامنة مع الـ UI.",
        ),
        L(
          "Accessible name order is usually: associated `<label>`, then `aria-labelledby`, then `aria-label`, then text contents. Fake controls make you rebuild focus, keys, and naming — native elements already do that.",
          "ترتيب الـ accessible name غالبًا: `<label>` مرتبط، بعدين `aria-labelledby`، بعدين `aria-label`، بعدين النص. الـ controls المزيفة بتخليك تعيد focus والمفاتيح والـ naming — الـ native elements بتعمل ده أصلًا.",
        ),
        L(
          "`aria-hidden=\"true\"` hides a subtree from screen readers, but Tab can still land there unless you also hide/remove the controls. Positive `tabindex` almost always fights the DOM order people expect.",
          "`aria-hidden=\"true\"` بيخفي subtree عن screen readers، بس Tab لسه ممكن يوقع هناك إلا لو خفيت/شلّت الـ controls كمان. `tabindex` الموجب غالبًا بيحارب ترتيب الـ DOM اللي الناس متوقعاه.",
        ),
      ],
      {
        bullets: [
          L(
            "Screen readers traverse the accessibility tree — name, role, and value/state, not CSS paint",
            "قارئات الشاشة بتجول في accessibility tree — name و role و value/state، مش رسم CSS",
          ),
          L(
            "Accessible name order: associated label, then aria-labelledby, then aria-label, then text content",
            "ترتيب accessible name: label مرتبط، بعدين aria-labelledby، بعدين aria-label، بعدين النص",
          ),
          L(
            "aria-hidden removes a subtree from screen readers but does not remove elements from the tab order",
            "aria-hidden بيشيل subtree من screen readers لكن ما بيشيلش العناصر من ترتيب Tab",
          ),
          L(
            "Positive tabindex reorders focus away from DOM sequence — breaking predictable keyboard traversal",
            "tabindex الموجب بيعيد ترتيب focus بعيد عن DOM — وده بيكسر تنقّل الكيبورد المتوقع",
          ),
        ],
        code: `<button type="button" aria-expanded="false" aria-controls="panel">
  More info
</button>
<div id="panel" hidden>…</div>
<p role="status" aria-live="polite"></p>`,
        codeCaption: L(
          "Named control + synced state + polite status",
          "control ليه name + state متزامن + polite status",
        ),
      },
    ),
    accessibility: insight(
      [
        L(
          "This lesson is the practice set for the HTML lab. Theory is in Accessibility (a11y). Here you compare bad vs ready until the good pattern feels automatic.",
          "الدرس ده مجموعة الـ practice للـ HTML lab. النظرية في درس Accessibility (a11y). هنا تقارن bad مقابل ready لحد ما النمط الصح يبقى تلقائي.",
        ),
        L(
          "Quick WCAG checks while you scan: meaningful names (2.4.4 / 4.1.2), keyboard works (2.1.1), focus visible (2.4.7 / 2.4.11), skip blocks (2.4.1), status messages (4.1.3).",
          "فحوصات WCAG سريعة وأنت بتتفرّج: names مفهومة (2.4.4 / 4.1.2)، الكيبورد يشتغل (2.1.1)، focus ظاهر (2.4.7 / 2.4.11)، تخطّي البلوكات (2.4.1)، status messages (4.1.3).",
        ),
        L(
          "If stuck: open the matching topic lesson, rebuild the pattern there, Tab through it, then try NVDA or VoiceOver. If screen readers and the visual disagree, fix the markup before adding more ARIA.",
          "لو تلخبطت: افتح درس الموضوع، ابنِ النمط هناك، لف بـ Tab، وبعدين جرّب NVDA أو VoiceOver. لو قارئ الشاشة والشكل مختلفين، صلّح الـ markup قبل ما تزود ARIA.",
        ),
      ],
      {
        bullets: [
          L(
            "Bad → ready pattern → try it in the topic lesson",
            "Bad → ready pattern → جرّبه في درس الموضوع",
          ),
          L(
            "Prefer details / dialog / label over custom widgets",
            "فضّل details / dialog / label عن custom widgets",
          ),
          L(
            "Announce async UI with role=status / aria-live",
            "أعلن async UI بـ role=status / aria-live",
          ),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Semantic HTML helps people and crawlers: one `<main>`, honest headings, real links, and useful `alt` text help a11y and understanding.",
          "الـ semantic HTML بيساعد الناس والـ crawlers: `<main>` واحد، headings صادقة، links حقيقية، و `alt` مفيد بيحسّنوا a11y والفهم.",
        ),
        L(
          "Don’t cloak content. The same clear HTML should serve users, screen readers, and bots. Labels added only in the client often never help the first HTML response.",
          "متعملش cloaking. نفس HTML الواضح يخدم المستخدمين و screen readers والـ bots. الـ labels اللي بتتضاف في الـ client بس غالبًا مش بتساعد أول استجابة HTML.",
        ),
      ],
      {
        bullets: [
          L(
            "Real links and headings help indexing and screen-reader outlines",
            "Links و headings حقيقية بتساعد indexing و screen-reader outlines",
          ),
          L(
            "alt and lang help understanding — not only SEO tricks",
            "alt و lang بيساعدوا الفهم — مش حِيَل SEO بس",
          ),
        ],
      },
    ),
  },

  "browser-compatibility": {
    underTheHood: insight(
      [
        L(
          "Browsers ship different engines (Blink, Gecko, WebKit). HTML/CSS/JS features land on different schedules — Baseline aggregates interoperability so you are not guessing from one caniuse cell.",
          "المتصفحات بتستخدم engines مختلفة (Blink و Gecko و WebKit). ميزات HTML/CSS/JS بتنزل بمواعيد مختلفة — Baseline بيجمّع التوافق عشان متخمّنش من خلية caniuse واحدة.",
        ),
        L(
          "Feature detection (`in` operator, `CSS.supports`, `@supports`) asks the engine at runtime. User-agent sniffing breaks as engines spoof and update — avoid it in production.",
          "Feature detection (`in` و `CSS.supports` و `@supports`) بيسأل الـ engine وقت التشغيل. شمّ الـ user-agent بيتكسر لما الـ engines تقلّد وتتحدث — تجنّبه في الإنتاج.",
        ),
        L(
          "Progressive enhancement keeps a usable HTML path first, then upgrades when APIs exist — the opposite of shipping a Newly Baseline-only control with no fallback.",
          "Progressive enhancement بيخلي معمل HTML يشتغل أولًا، وبعدين يترقّى لما الـ APIs تبقى موجودة — عكس ما تنشر كنترول Newly Baseline من غير fallback.",
        ),
      ],
      {
        bullets: [
          L(
            "Blink, Gecko, and WebKit ship features on independent release trains — the same tag can parse everywhere but behave differently",
            "Blink و Gecko و WebKit بينزلوا ميزات بمواعيد مستقلة — نفس الـ tag ممكن يتparse في كل مكان لكن يتصرف بشكل مختلف",
          ),
          L(
            "Feature detection queries prototypes or CSS support at runtime — UA strings spoof and rot quickly",
            "Feature detection بيسأل الـ prototypes أو دعم CSS وقت التشغيل — سلاسل UA بتتزوّر وتبقى قديمة بسرعة",
          ),
          L(
            "@supports and CSS.supports ask the style engine; the in operator asks the JavaScript object model",
            "@supports و CSS.supports بيسألوا محرك الستايل؛ in operator بيسأل نموذج كائنات JavaScript",
          ),
          L(
            "Progressive enhancement keeps a functional HTML path when newer APIs are absent",
            "Progressive enhancement بيخلي معمل HTML شغال لما APIs أحدث مش موجودة",
          ),
        ],
        code: `if ("showModal" in HTMLDialogElement.prototype) {
  dialog.showModal();
} else {
  location.assign("/confirm");
}`,
        codeCaption: L("Runtime `feature detection`", "`Feature detection` وقت التشغيل"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Compatibility choices affect a11y — a custom dialog polyfill must preserve focus trap and Escape. A missing WebKit feature is not an excuse to ship an inaccessible mouse-only overlay.",
          "اختيارات التوافق بتأثر على a11y — polyfill لـ dialog لازم يحافظ على focus trap و Escape. نقص ميزة في WebKit مش عذر تعمل overlay ماوس بس.",
        ),
        L(
          "When you gate a control behind feature detection, keep the fallback keyboard-operable and announced — same WCAG bar as the modern path.",
          "لما تقفل كنترول ورا feature detection، خلّي الـ fallback يشتغل بالكيبورد ويتعلن — نفس معيار WCAG كالمسار الحديث.",
        ),
      ],
      {
        bullets: [
          L("`Fallbacks` must remain `keyboard` `accessible`", "الـ `fallbacks` لازم تفضل `accessible` بالكيبورد"),
          L("Don't remove `focus` `styles` to “match” old browsers", "متشيلش ستايلات الـ `focus` عشان “تشابه” متصفحات قديمة"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Crawlers use modern evergreens — Baseline Widely HTML is almost always indexable. Problems arise when critical content is only injected after unsupported client APIs fail silently.",
          "الـ crawlers على evergreens حديثة — HTML من Baseline Widely غالبًا قابل للفهرسة. المشاكل لما المحتوى الحرج يتضخ بعد ما APIs على الـ client تفشل بصمت.",
        ),
        L(
          "Prefer SSR for primary copy, layout-stable images, and real links — compatibility polyfills should not delay LCP with huge legacy bundles.",
          "فضّل SSR للنص الأساسي وصور ثابتة layout ولينكات حقيقية — polyfills التوافق متأخرش LCP بحزم legacy ضخمة.",
        ),
      ],
      {
        bullets: [
          L("`Indexable` `HTML` first — enhance after", "`HTML` قابل للفهرسة أولًا — بعدين enhancement"),
          L("Avoid shipping multiple heavy `polyfill` `packs` by `default`", "متنشّرش حزم `polyfill` تقيلة افتراضيًا"),
        ],
      },
    ),
  },

  "meta-seo": {
    underTheHood: insight(
      [
        L(
          "This Advanced lesson is the SEO source of truth for the HTML lab. Crawlers fetch a URL, tokenize HTML into a DOM, extract `<title>` / meta / canonical early, then schedule rendering. Body text present in that first payload is what indexes most reliably.",
          "الدرس Advanced ده مصدر SEO للـ HTML lab. الـ crawlers بتجيب URL، بتعمل tokenize لـ HTML لـ DOM، بتستخرج `<title>` / meta / canonical بدري، وبعدين بتحجز الرندر. نص الـ body الموجود في أول حمولة هو اللي بيتفهرس بأعلى موثوقية.",
        ),
        L(
          "Mental model: crawl → render → index. Discovery uses sitemaps, internal links, and backlinks. The renderer may execute JS later, but primary copy that only appears after a client-only fetch risks delayed or thin indexing — especially on mobile.",
          "النموذج الذهني: crawl → render → index. الاكتشاف بيستخدم sitemaps ولينكات داخلية و backlinks. الـ renderer ممكن يشغّل JS بعدين، لكن النص الأساسي اللي بيظهر بعد fetch من الـ client بس بيخاطر بفهرسة متأخرة أو نحيفة — خصوصًا على الموبايل.",
        ),
        L(
          "SSR/SSG vs CSR: send the page shell and main text from the server; add extra UI after. A client-only `<div id=\"root\">` delays titles, headings, and real links.",
          "SSR/SSG مقابل CSR: ابعت هيكل الصفحة والنص الأساسي من السيرفر؛ وبعدين زوّد الـ UI. `<div id=\"root\">` فاضي على الـ client بيأخّر العناوين والـ headings واللينكات الحقيقية.",
        ),
        L(
          "`rel=\"canonical\"` consolidates duplicates (params, trailing slash, mirrors). JSON-LD clarifies entity type for rich results but must mirror visible content. Page experience (LCP, INP, CLS) lives in Core Web Vitals.",
          "`rel=\"canonical\"` بيجمّع النسخ المكررة (params و trailing slash والمرايا). JSON-LD بيوضّح نوع الكيان للنتائج الغنية لكن لازم يطابق المحتوى الظاهر. تجربة الصفحة (LCP و INP و CLS) في درس Core Web Vitals.",
        ),
      ],
      {
        bullets: [
          L("Crawlers tokenize the first HTML response before scheduling JS render", "الزواحف بتفكك أول استجابة HTML قبل ما تحجز render بالـ JS"),
          L("Canonical merges duplicate URLs — params, trailing slash, mirrors", "canonical بيجمع URLs مكررة — params و trailing slash ومرايا"),
          L("JSON-LD must mirror visible content or rich results get ignored", "JSON-LD لازم يطابق المحتوى الظاهر وإلا rich results تتتجاهل"),
          L("Client-only shells delay discovery of titles and body copy", "shells من الـ client بس بتأخر اكتشاف العناوين ونص الصفحة"),
        ],
        code: `<head>
  <title>FrontendCraft — HTML Lab</title>
  <meta name="description" content="Learn HTML with interactive labs." />
  <link rel="canonical" href="https://example.com/html" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>`,
        codeCaption: L("Core `SEO` `head` `bundle`", "حزمة `head` أساسية للـ `SEO`"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Document title changes on SPA navigation must update `<title>` — VoiceOver announces title changes; stale titles after client routing disorient users and also confuse search snippets.",
          "تغيير عنوان المستند في SPA لازم يحدّث `<title>` — VoiceOver بتعلن التغيير؛ titles قديمة بعد client routing بتلخبط المستخدمين وكمان snippets البحث.",
        ),
        L(
          "`lang` (and `hreflang` for locales) must match the real page language — wrong language hurts screen-reader pronunciation and can confuse international targeting.",
          "`lang` (و `hreflang` للغات) لازم يطابق لغة الصفحة الحقيقية — اللغة الغلط بتضر نطق قارئ الشاشة وممكن تلخبط الاستهداف الدولي.",
        ),
        L(
          "`theme-color` and meta viewport affect readability — user zoom must remain enabled (`maximum-scale=1` disables pinch zoom and fails WCAG).",
          "`theme-color` و meta viewport بيأثروا على القراءة — لازم يفضل zoom المستخدم شغال (`maximum-scale=1` بيعطّل pinch zoom وبيفشل WCAG).",
        ),
      ],
      {
        bullets: [
          L("Update title on `route change` for `SPAs`", "حدّث title على `route change` للـ `SPAs`"),
          L("Never disable `zoom` in `viewport meta`", "متعطّلش `zoom` في `viewport meta`"),
          L("lang + hreflang match actual page language", "lang + hreflang يطابقوا لغة الصفحة الفعلية"),
          L("`Meta` refresh redirects confuse users and screen readers — use `HTTP` 301", "`Meta` refresh بتلخبط المستخدمين وقارئ الشاشة — استخدم `HTTP` 301"),
          L("Descriptive link text helps screen readers and SEO together", "نص اللينك الوصفي بيساعد قارئ الشاشة و SEO مع بعض"),
        ],
        code: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
        codeCaption: L("`Accessible` `viewport` — `zoom` allowed", "`Viewport` `accessible` — `zoom` مسموح"),
      },
    ),
    seo: insight(
      [
        L(
          "Googlebot reads the initial HTML — `<title>`, canonical, meta description, and body copy in the first payload index reliably. Semantic landmarks and real `<a href>` links help crawlers; `javascript:` / `#` stubs and fake 404s (200 + “not found”) do not.",
          "Googlebot بيقرأ أول HTML — `<title>` و canonical و meta description ونص الـ body في أول حمولة بيتفهرسوا بموثوقية. Landmarks و `<a href>` حقيقية بتساعد الـ crawlers؛ stubs من نوع `javascript:` / `#` و صفحات 404 مزيفة (200 + “not found”) لأ.",
        ),
        L(
          "Title crafts the SERP headline; meta description often becomes the snippet (CTR, not a direct ranking factor). Keep both unique, honest, and aligned with the visible `<h1>` and opening paragraph.",
          "الـ title بيصنع عنوان النتائج؛ meta description غالبًا بيبقى الـ snippet (CTR، مش عامل ترتيب مباشر). خلّيهم فريدين وصادقين ومتوافقين مع `<h1>` الظاهر والفقرة الافتتاحية.",
        ),
        L(
          "SSR/SSG is the production default for marketing and docs. Client-rendered shells can still rank after render, but they risk thin first paints and delayed discovery — especially on slow networks.",
          "SSR/SSG هو الافتراضي للإنتاج للتسويق والـ docs. الـ shells المرسومة على الـ client ممكن تترتب بعد الرندر، بس بتخاطر بـ first paint نحيف واكتشاف متأخر — خصوصًا على شبكات بطيئة.",
        ),
        L(
          "Structured data is an enhancer, not a substitute for crawlable HTML. Social tags live in Head & Social Meta; LCP/INP/CLS live in Core Web Vitals.",
          "Structured data محسّن، مش بديل لـ HTML قابل للزحف. وسوم السوشيال في Head & Social Meta؛ LCP/INP/CLS في Core Web Vitals.",
        ),
      ],
      {
        bullets: [
          L("`Indexable` `HTML` in the first `response` — not an empty `mount node`", "`HTML` قابل للفهرسة في أول استجابة — مش `mount node` فاضي"),
          L("Unique title, `description`, `canonical` per route", "title و `description` و `canonical` فريدين لكل route"),
          L("`Descriptive` anchors — never “click here” as the only text", "anchors وصفية — متخليش “click here” النص الوحيد"),
          L("`JSON-LD` must match `visible` `content`", "`JSON-LD` لازم يطابق المحتوى الظاهر"),
          L("`URL` `Inspection` + `coverage` after every `deploy`", "`URL` `Inspection` + `coverage` بعد كل `deploy`"),
        ],
        code: `<!-- Anti-pattern: empty CSR shell -->
<div id="root"></div>
<!-- Better: SSR body with real headings + links -->
<main>
  <h1>HTML lab</h1>
  <a href="/html/forms-inputs">Learn HTML forms</a>
</main>`,
        codeCaption: L("Crawlable `content` vs empty `root`", "محتوى قابل للزحف مقابل `root` فاضي"),
      },
    ),
  },

  "media-embed": {
    underTheHood: insight(
      [
        L(
          "`<video>`, `<audio>`, `<iframe>`, and `<picture>` trigger separate resource loads — media decoders run on dedicated threads but layout and compositing still touch the main thread when dimensions change.",
          "`<video>`, `<audio>`, `<iframe>`, و `<picture>` بتشغّل resource loads منفصلة — media decoders على threads مخصصة لكن layout و compositing لسه بيلمسوا main thread لما dimensions تتغير.",
        ),
        L(
          "Iframes create nested browsing contexts — third-party embeds (YouTube, maps) add their own event loops and cookies. `loading=\"lazy\"` on iframes below fold saves bandwidth.",
          "Iframes بتعمل nested browsing contexts — third-party embeds (YouTube, maps) بيضيفوا event loops و cookies. `loading=\"lazy\"` على iframes below fold يوفر bandwidth.",
        ),
        L(
          "`<source>` within `<video>`/`<picture>` lets the browser pick format — WebP/AVIF reduce bytes; fallback JPEG/PNG ensures compatibility.",
          "`<source>` جوه `<video>`/`<picture>` بتخلي المتصفح يختار format — WebP/AVIF يقللوا bytes؛ fallback JPEG/PNG يضمن compatibility.",
        ),
      ],
      {
        bullets: [
          L("Video and audio decoders run off the main thread — layout still reacts to size changes", "فكّ الفيديو والصوت بيحصل برّه main thread — الـ layout لسه بيتأثر بتغيير الحجم"),
          L("iframes create nested browsing contexts with their own cookies", "iframes بتعمل سياقات تصفح متداخلة بكوكيز خاصة"),
          L("picture/source lets the browser pick WebP/AVIF with JPEG fallback", "picture/source بيخلي المتصفح يختار WebP/AVIF مع JPEG احتياطي"),
          L("lazy on below-fold iframes saves bandwidth on first load", "lazy على iframes تحت الطية بيوفر bandwidth في أول تحميل"),
        ],
        code: `<video
  controls
  width="640"
  height="360"
  poster="https://placehold.co/640x360/0f172a/38bdf8.jpg?text=Video+poster"
>
  <source src="/clip.webm" type="video/webm" />
  <source src="/clip.mp4" type="video/mp4" />
  <track kind="captions" src="/clip.vtt" srclang="en" label="English" />
</video>`,
        codeCaption: L("`Accessible` video with captions", "Video `accessible` بـ captions"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Autoplay with sound fails WCAG — mute autoplay or require user gesture. Provide controls native or custom with keyboard-operable play/pause and visible focus.",
          "Autoplay بصوت بيفشل WCAG — mute autoplay أو user gesture. controls native أو custom بـ keyboard play/pause و focus ظاهر.",
        ),
        L(
          "Iframe embeds need descriptive `title` — \"YouTube video player\" is minimal; include video topic. Keyboard users must Tab into iframe only when intentional — avoid invisible tracking iframes.",
          "Iframe embeds محتاجة `title` وصفي — \"YouTube video player\" minimal؛ ضمّن video topic. Keyboard users Tab للـ iframe لما مقصود — تجنب tracking iframes invisible.",
        ),
      ],
      {
        bullets: [
          L("No autoplay audio; captions for speech `content`", "مفيش autoplay audio؛ captions للـ speech `content`"),
          L("Transcript link for long audio/video", "Transcript link للـ audio/video الطويل"),
          L("Pause/stop for carousels and animated media", "Pause/stop للـ carousels و animated media"),
          L("iframe title describes embedded `content` purpose", "iframe title يوصف embedded `content` purpose"),
        ],
        code: `<iframe
  title="Map: FrontendCraft office in Cairo"
  src="https://maps.example.com/embed"
  loading="lazy"
  width="600"
  height="450"
></iframe>`,
        codeCaption: L("`Descriptive` iframe title", "iframe title وصفي"),
      },
    ),
    seo: insight(
      [
        L(
          "Google indexes video pages with visible surrounding text and VideoObject schema — embed-only pages with no copy rank poorly. Poster images can become LCP — size them explicitly.",
          "Google بتفهرس video pages بـ surrounding text ظاهر و VideoObject schema — embed-only pages من غير copy ranking ضعيف. Poster images ممكن تبقى LCP — size them explicitly.",
        ),
        L(
          "Heavy third-party iframes delay LCP and INP — facade pattern (thumbnail + click-to-load) improves CWV while preserving embed on interaction.",
          "Third-party iframes تقيلة بتأخر LCP و INP — facade pattern (thumbnail + click-to-load) يحسّن CWV ويحافظ embed على interaction.",
        ),
      ],
      {
        bullets: [
          L("Surround embeds with `indexable` `headings` and summary", "حط `headings` و summary قابلة للفهرسة حوالين embeds"),
          L("VideoObject `JSON-LD` with name, `description`, thumbnailUrl", "VideoObject `JSON-LD` بـ name, `description`, thumbnailUrl"),
          L("`Lazy-load` below-fold iframes and videos", "`Lazy-load` iframes و videos below-fold"),
          L("Self-host critical `hero` media when possible", "Self-host `hero` media الحرج لو أمكن"),
        ],
      },
    ),
  },

  "html-core-web-vitals": {
    underTheHood: insight(
      [
        L(
          "This lesson is the Core Web Vitals source of truth for the HTML lab. LCP, INP, and CLS are field metrics from real users (CrUX) — lab tools help debug, but ranking and UX decisions should follow field data.",
          "الدرس ده مصدر Core Web Vitals للـ HTML lab. LCP و INP و CLS مقاييس ميدانية من مستخدمين حقيقيين (CrUX) — أدوات الـ lab بتساعد في الـ debug، لكن قرارات الترتيب والـ UX تمشي مع field data.",
        ),
        L(
          "LCP marks when the largest contentful element paints. Heroes without dimensions, lazy-loaded above-the-fold images, and render-blocking resources push LCP past 2.5s.",
          "LCP بيسجّل لما أكبر عنصر محتوى يpaint. الـ heroes من غير أبعاد والصور lazy فوق الشاشة والموارد اللي بـ block الرندر بيدفعوا LCP فوق 2.5s.",
        ),
        L(
          "INP measures interaction latency across the page lifetime. Long tasks, heavy click handlers, and large JS bundles keep the main thread busy after a tap.",
          "INP بيقيس تأخير التفاعل على عمر الصفحة. الـ long tasks و handlers التقيلة وحزم JS الكبيرة بتشغّل الـ main thread بعد الضغطة.",
        ),
        L(
          "CLS accumulates unexpected layout shifts. Unsized media, late-injected banners, and font swaps that reflow text are the usual HTML-side causes.",
          "CLS بيجمع layout shifts غير متوقعة. ميديا من غير مقاس وبنرات متأخرة و font swaps بتعمل reflow — الأسباب المعتادة من ناحية HTML.",
        ),
      ],
      {
        bullets: [
          L(
            "LCP is recorded when the largest contentful element paints — usually an img or text block in the render tree",
            "LCP بيتسجّل لما أكبر عنصر محتوى يترسم — غالبًا img أو بلوك نص في render tree",
          ),
          L(
            "INP aggregates interaction latency across the page lifetime from input event to next paint",
            "INP بيجمع تأخير التفاعل على عمر الصفحة من حدث الإدخال لحد الرسم الجاي",
          ),
          L(
            "CLS accumulates layout shift scores when elements move after initial paint without user intent",
            "CLS بيجمع درجات layout shift لما عناصر تتحرك بعد الرسم الأول من غير قصد من المستخدم",
          ),
          L(
            "The preload scanner can discover LCP images early — lazy on above-fold candidates delays the metric",
            "preload scanner ممكن يكتشف صور LCP بدري — lazy على مرشحين فوق الشاشة بيأخر المقياس",
          ),
        ],
        code: `<link
  rel="preload"
  as="image"
  href="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  fetchpriority="high"
/>
<img
  src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  alt="…"
  width="1200"
  height="630"
  fetchpriority="high"
/>`,
        codeCaption: L("`LCP`-friendly `hero` `markup`", "`markup` `hero` مناسب لـ `LCP`"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Performance and accessibility overlap — layout shifts disorient keyboard and screen-reader users mid-read. Stable focus order needs a stable layout.",
          "الأداء والوصول متداخلين — الـ layout shifts بتلخبط مستخدمي الكيبورد و screen readers وسط القراءة. ترتيب focus ثابت محتاج layout ثابت.",
        ),
        L(
          "Slow INP feels like a broken control. Users who rely on screen readers already wait for announcements — do not add extra lag on top.",
          "INP البطيء بيحسّس إن الـ control مكسور. مستخدمو التقنيات المساعدة أصلًا بيستنوا إعلانات — متزودش تأخير إدخال بمئات الميلي ثانية.",
        ),
      ],
      {
        bullets: [
          L("Stable `layout` protects reading and `focus` position", "`Layout` ثابت بيحمي القراءة وموضع الـ `focus`"),
          L("`Visible` `focus` must not wait on heavy `JS`", "الـ `focus` الظاهر ممنوع يستنى `JS` تقيل"),
          L("Honor prefers-reduced-motion for `decorative` motion", "احترم prefers-reduced-motion للحركة التزيينية"),
          L("`Announce` async results without blocking the main thread", "أعلن نتائج async من غير ما توقف الـ main thread"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Core Web Vitals feed Google page experience. Meta tags and crawlable HTML (SEO Insights) still matter — but a 4s LCP is not fixed by a better description.",
          "Core Web Vitals بتغذّي Google page experience. الـ meta tags و HTML القابل للزحف (SEO Insights) لسه مهمين — لكن LCP بـ 4 ثواني مش بيتصلح بـ description أحسن.",
        ),
        L(
          "Prefer CrUX / Search Console field data over a one-off Lighthouse green score. Media-specific tactics continue in Media & Loading Performance.",
          "فضّل CrUX / Search Console field data عن Lighthouse أخضر مرة واحدة. تكتيكات الميديا في درس Media & Loading Performance.",
        ),
      ],
      {
        bullets: [
          L("Ship CWV `fixes` like product `bugs`", "اصلح CWV زي `bugs` منتج"),
          L("Watch `Search Console` Experience report", "راقب تقرير Experience في `Search Console`"),
          L("Mobile field data first", "Field data الموبايل أولًا"),
          L("Pair with `SEO` Insights for `crawl` + `metadata`", "اربط مع `SEO` Insights للزحف و `metadata`"),
        ],
      },
    ),
  },

  "html-perf-media": {
    underTheHood: insight(
      [
        L(
          "Builds on Core Web Vitals. Critical rendering path: HTML → DOM, CSS → CSSOM, combined render tree → layout → paint → composite. Blocking resources in `<head>` delay first paint — defer non-critical CSS/JS and inline only tiny critical CSS.",
          "بيكمل درس Core Web Vitals. Critical rendering path: HTML → DOM, CSS → CSSOM, render tree → layout → paint → composite. Blocking resources في `<head>` بتأخر first paint — defer non-critical CSS/JS و inline critical CSS صغير بس.",
        ),
        L(
          "Images without width/height cause layout recalculation when bytes arrive — CLS spikes. `aspect-ratio` in CSS plus explicit attributes reserve space in the layout tree before decode completes.",
          "Images من غير width/height بتسبب layout recalculation لما bytes توصل — CLS spikes. `aspect-ratio` في CSS plus attributes explicit بيحجزوا مساحة في layout tree قبل decode يخلص.",
        ),
        L(
          "Resource hints (`preload`, `prefetch`, `preconnect`, `fetchpriority`) prioritize network queue — preload LCP image/font; prefetch next-page assets; do not preload everything (bandwidth contention).",
          "Resource hints (`preload`, `prefetch`, `preconnect`, `fetchpriority`) بت prioritize network queue — preload LCP image/font؛ prefetch next-page assets؛ متpreload everything (bandwidth contention).",
        ),
      ],
      {
        bullets: [
          L(
            "width and height establish intrinsic size in the layout tree before image bytes decode",
            "width و height بيحددوا الحجم الجوهري في layout tree قبل ما بايتات الصورة تتفكّ",
          ),
          L(
            "loading=lazy defers fetch until the image nears the viewport — intersection observer gates the network request",
            "loading=lazy بيأجل الجلب لحد ما الصورة تقرب من viewport — intersection observer بيفتح طلب الشبكة",
          ),
          L(
            "decoding=async lets decode happen off the critical paint path when the main thread is busy",
            "decoding=async بيخلي فك الترميز يحصل برّه مسار الرسم الحرج لما main thread مشغول",
          ),
          L(
            "defer and async change when script execution interrupts HTML parsing in the tokenizer",
            "defer و async بيغيّروا إمتى تنفيذ السكربت يوقف parsing الـ HTML في الـ tokenizer",
          ),
        ],
        code: `<link
  rel="preload"
  as="image"
  href="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  fetchpriority="high"
/>
<img
  src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero"
  alt="..."
  width="1200"
  height="630"
/>`,
        codeCaption: L("Preload + sized `LCP` image", "Preload + sized `LCP` image"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Lazy-loaded images above the fold may load late — screen reader users still need alt text immediately in HTML. Do not lazy-load hero or logo that defines page identity.",
          "Lazy-loaded images above the fold ممكن تحمّل متأخر — screen reader users محتاجين alt text فورًا في HTML. متlazy-load hero أو logo اللي بيعرّف page identity.",
        ),
        L(
          "Reduced motion: respect `prefers-reduced-motion` — autoplay carousels and parallax harm vestibular users; provide pause controls and static fallbacks.",
          "Reduced motion: احترم `prefers-reduced-motion` — autoplay carousels و parallax بيضروا vestibular users؛ pause controls و static fallbacks.",
        ),
      ],
      {
        bullets: [
          L("alt present in `HTML` even when image lazy-loads", "alt موجود في `HTML` حتى لو image `lazy-load`"),
          L("No autoplay motion without user control", "مفيش autoplay motion من غير user control"),
          L("Poster frames for video — not blank flash", "Poster frames للـ video — مش blank flash"),
          L("Focusable `controls` load before `decorative` media", "Focusable `controls` تحمّل قبل `decorative` media"),
        ],
        code: `@media (prefers-reduced-motion: reduce) {
  .carousel { animation: none; }
}`,
        codeCaption: L("Honor reduced motion preference", "احترم prefers-reduced-motion"),
      },
    ),
    seo: insight(
      [
        L(
          "Core Web Vitals (LCP, INP, CLS) feed Google page experience — unsized media is the top CLS culprit. CrUX field data beats lab scores for ranking signals.",
          "Core Web Vitals (LCP, INP, CLS) بتغذّي Google page experience — unsized media أ top CLS culprit. CrUX field data أهم من lab scores لـ ranking signals.",
        ),
        L(
          "Slow LCP from hero images hurts mobile-first indexing — responsive `<picture>`, CDN, and compression reduce bytes without hiding content from crawlers (alt and surrounding text remain).",
          "LCP بطيء من hero images بيضر mobile-first indexing — responsive `<picture>`, CDN, و compression يقللوا bytes من غير ما يخبوا content عن crawlers (alt و surrounding text يفضلوا).",
        ),
      ],
      {
        bullets: [
          L("`Target` `LCP` < 2.5s on mobile field data", "`Target` `LCP` < 2.5s على mobile field data"),
          L("Reserve space for ads/embeds to prevent `CLS`", "احجز مساحة للـ ads/embeds عشان تمنع `CLS`"),
          L("Preconnect to CDN/font origins in `<head>`", "Preconnect لـ CDN/font origins في `<head>`"),
          L("Monitor CWV in `Search Console` Experience report", "راقب CWV في `Search Console` Experience report"),
        ],
      },
    ),
  },

  "html-architecture-partials": {
    underTheHood: insight(
      [
        L(
          "Server templates, includes, and partials compose HTML at build or request time — the browser always receives one document. Fragment swapping via fetch + innerHTML bypasses full parse benefits unless handled with care.",
          "Server templates و includes و partials بت compose HTML وقت build أو request — المتصفح دايمًا بيستقبل document واحد. Fragment swapping عبر fetch + innerHTML بيتخطى فوائد full parse إلا لو handled بحرص.",
        ),
        L(
          "Landmark structure should survive partial updates — replacing inner `<main>` HTML must preserve id, tabindex for skip targets, and heading hierarchy. Parser reparents invalid fragment inserts.",
          "Landmark structure لازم يعيش partial updates — replace inner `<main>` HTML لازم يحافظ id و tabindex لـ skip targets و heading hierarchy. Parser بيعمل reparent لـ invalid fragment inserts.",
        ),
        L(
          "Web Components and `<template>` clone inert content — scripts inside template do not run until instantiated, useful for client partials without polluting initial parse.",
          "Web Components و `<template>` بينسخوا inert content — scripts جوه template ما بتشتغلش لحد instantiation، مفيد لـ client partials من غير ما تلوّث initial parse.",
        ),
      ],
      {
        bullets: [
          L(
            "The browser always receives one document — server includes compose before the parser sees bytes",
            "المتصفح دايمًا بيستقبل مستند واحد — server includes بتتجمّع قبل ما الـ parser يشوف البايتات",
          ),
          L(
            "Fragment swaps via innerHTML re-run the HTML fragment parser and can reparent invalid inserts",
            "تبديل fragments عبر innerHTML بيشغّل HTML fragment parser تاني ويمكن يعيد ترتيب إدراجات غير صالحة",
          ),
          L(
            "template contents stay inert — scripts inside do not execute until cloneNode instantiates them",
            "محتوى template بيفضل inert — السكربتات جواه ما بتتنفّذش لحد ما cloneNode يفعّلها",
          ),
          L(
            "Landmark and heading structure must survive partial updates or the accessibility tree map breaks",
            "هيكل landmarks والعناوين لازم يعيش partial updates وإلا خريطة accessibility tree بتتكسر",
          ),
        ],
        code: `<main id="main">
  <!-- server partial: article-body.html -->
  <article>...</article>
</main>`,
        codeCaption: L("Partial slots inside stable main", "Partial slots جوه main ثابت"),
      },
    ),
    accessibility: insight(
      [
        L(
          "SPA partial navigation must move focus to `<h1>` or main landmark and update document title — otherwise VoiceOver thinks nothing changed after \"page\" load.",
          "SPA partial navigation لازم ينقل focus لـ `<h1>` أو main landmark ويحدّث document title — وإلا VoiceOver تفتكر مفيش حاجة اتغيرت بعد \"page\" load.",
        ),
        L(
          "Repeated chrome from server partials should use `<nav aria-label>` consistently — partial authors must not duplicate skip links or main landmarks.",
          "Repeated chrome من server partials لازم `<nav aria-label>` consistent — partial authors مايduplicateوش skip links أو main landmarks.",
        ),
      ],
      {
        bullets: [
          L("`Announce` route changes via title + `focus` management", "اعلن route changes عبر title + `focus` management"),
          L("Partial templates include `labels` and alt in the fragment", "Partial templates تinclude `labels` و alt في fragment"),
          L("Do not inject duplicate `#main` or `landmark` `roles`", "متinject duplicate `#main` أو `landmark` `roles`"),
          L("`aria`-live region in `layout` `shell` for async partial loads", "`aria`-live region في `layout` `shell` لـ async partial loads"),
        ],
        code: `document.title = nextPage.title;
main.innerHTML = nextPage.html;
main.querySelector("h1")?.focus();`,
        codeCaption: L("SPA partial with `focus` + title", "SPA partial بـ `focus` + title"),
      },
    ),
    seo: insight(
      [
        L(
          "Partial-driven sites need SSR or prerender for indexable URLs — fetching HTML fragments client-only leaves crawlers with empty main. Each route should return full document server-side.",
          "Partial-driven sites محتاجة SSR أو prerender للـ indexable URLs — fetch HTML fragments client-only بيسيب crawlers بـ main فاضي. كل route يرجع full document server-side.",
        ),
        L(
          "Shared header/footer partials should emit consistent internal links — sitemap URLs must match partial-rendered nav hrefs for crawl depth.",
          "Shared header/footer partials ت emit internal links consistent — sitemap URLs لازم تطابق nav hrefs من partials لـ crawl depth.",
        ),
      ],
      {
        bullets: [
          L("Full `HTML` `document` per `URL` for `Googlebot`", "Full `HTML` `document` per `URL` لـ `Googlebot`"),
          L("`Canonical` in `layout` partial — not per-fragment", "`Canonical` في `layout` partial — مش per-fragment"),
          L("href in `server`-rendered `nav` partials match sitemap", "href في `server`-rendered `nav` partials match sitemap"),
          L("Avoid infinite scroll partials as only archive `index`", "تجنب infinite scroll partials كـ archive `index` الوحيد"),
        ],
      },
    ),
  },

  "html-security-hardening": {
    underTheHood: insight(
      [
        L(
          "`target=\"_blank\"` creates a browsing-context relationship. `rel=\"noopener\"` severs `window.opener`; `noreferrer` also omits the Referer header. Use both deliberately—noreferrer can affect analytics and server behavior.",
          "`target=\"_blank\"` بيعمل علاقة بين browsing contexts. `rel=\"noopener\"` بيفصل `window.opener`؛ و`noreferrer` كمان بيمنع Referer header. استخدم الاتنين بقصد — `noreferrer` ممكن يأثر على analytics وسلوك السيرفر.",
        ),
        L(
          "`sandbox` applies an opaque origin and blocks capabilities until individual tokens restore them. Every token is a permission grant; `allow-scripts` + `allow-same-origin` is especially risky for same-origin content because it may escape the sandbox.",
          "`sandbox` بيطبّق opaque origin وبيقفل capabilities لحد ما tokens منفردة ترجعها. كل token هو permission grant؛ `allow-scripts` + `allow-same-origin` خطرين خصوصًا لمحتوى same-origin لأنه ممكن يفلت من sandbox.",
        ),
        L(
          "Form `action` and submitter `formaction` determine the final request destination. Hidden inputs are still client-readable, so secrets and authorization decisions must remain server-side.",
          "`action` للـ form و`formaction` للـ submitter بيحددوا الوجهة النهائية للـ request. الـ hidden inputs لسه قابلة للقراءة عند العميل، فالأسرار وقرارات authorization لازم تفضل server-side.",
        ),
      ],
      {
        bullets: [
          L(
            "target=_blank creates an opener browsing context — rel=noopener severs window.opener at navigation time",
            "target=_blank بيعمل browsing context فيه opener — rel=noopener بيقطع window.opener وقت التنقل",
          ),
          L(
            "sandbox applies an opaque origin and strips capabilities until each token restores one",
            "sandbox بيطبّق opaque origin ويشيل capabilities لحد ما كل token يرجّع واحدة",
          ),
          L(
            "allow-scripts plus allow-same-origin on same-origin frames can let embedded scripts remove the sandbox",
            "allow-scripts مع allow-same-origin على frames من نفس الـ origin ممكن يخلي السكربتات المضمّنة تشيل الـ sandbox",
          ),
          L(
            "formaction on a submit button overrides the form action URL for that specific submission",
            "formaction على زر إرسال بيتجاوز action URL للفورم في الإرسال ده بالذات",
          ),
        ],
        code: `<a href="https://docs.example.com" target="_blank"
   rel="noopener noreferrer">Docs</a>
<iframe src="https://embed.example" sandbox="allow-forms allow-scripts"></iframe>`,
        codeCaption: L("`External` `tab` + least-privilege iframe", "`Tab` خارجية + iframe بأقل صلاحيات"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Security hardening must not make forms unusable. Precise `autocomplete` values let password managers and screen readers identify a username, current password, new password, or one-time code without guessing.",
          "تقوية الأمان مينفعش تخلي الـ forms غير قابلة للاستخدام. قيم `autocomplete` الدقيقة بتخلي password managers وقارئ الشاشة يميّزوا username أو current password أو new password أو one-time code من غير تخمين.",
        ),
        L(
          "A sandboxed iframe still needs a descriptive `title`, and external links that open a new tab should communicate that change in visible context when it could surprise the user.",
          "iframe معمول له sandbox لسه محتاج `title` وصفي، واللينكات الخارجية اللي بتفتح tab جديدة لازم توضّح التغيير ده في السياق الظاهر لما ممكن يفاجئ المستخدم.",
        ),
      ],
      {
        bullets: [
          L("Keep `visible` `labels` alongside `autocomplete` `tokens`", "سيب `labels` ظاهرة جنب `autocomplete` `tokens`"),
          L("Give every iframe a useful `title`", "ادّي كل iframe `title` مفيد"),
          L("Explain new-`tab` behavior in link context", "اشرح سلوك `tab` الجديدة في سياق اللينك"),
          L("Do not disable password managers as a “`security`” fix", "متقفّليش password managers كحل “أمني”"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Referrer policy is a privacy and measurement trade-off, not an SEO ranking switch. Keep analytics expectations aligned with the policy you set on links, embeds, and pages.",
          "Referrer policy هو trade-off بين privacy والقياس، مش SEO ranking switch. خلّي توقعات analytics متوافقة مع policy اللي بتحطها على links وembeds والصفحات.",
        ),
        L(
          "Security-sensitive pages should not expose credentials, token-bearing URLs, or private data in crawlable HTML. Use server authorization and deliberate indexing controls for pages that should not appear in search.",
          "الصفحات الحساسة أمنيًا مينفعش تعرض credentials أو URLs فيها tokens أو بيانات خاصة في HTML قابل للزحف. استخدم server authorization وindexing controls مقصودة للصفحات اللي مش مفروض تظهر في البحث.",
        ),
      ],
      {
        bullets: [
          L("Do not leak query `tokens` into `links` or `markup`", "متسرّبش query `tokens` في `links` أو `markup`"),
          L("Align `referrer` policy with analytics needs", "ظبّط `referrer` policy مع احتياجات analytics"),
          L("Authorization protects private pages—not `noindex` alone", "Authorization بتحمي الصفحات الخاصة — مش `noindex` لوحده"),
          L("Use crawlable `links` only for intended public destinations", "استخدم `links` قابلة للزحف للوجهات العامة المقصودة بس"),
        ],
      },
    ),
  },

  "html-speculation-rules": {
    underTheHood: insight(
      [
        L(
          "`<script type=\"speculationrules\">` is parsed as structured JSON by supporting browsers. `prefetch` retrieves a future document; `prerender` prepares a document for activation and may run page lifecycle work before a user navigates.",
          "`<script type=\"speculationrules\">` بيتقري كـ structured JSON في المتصفحات الداعمة. `prefetch` بيجيب document مستقبلي؛ و`prerender` بيجهز document للتفعيل وممكن يشغّل page lifecycle قبل ما المستخدم يتنقل.",
        ),
        L(
          "Prerender is not a cache toggle: it uses CPU, memory, and network while the current page is active. Limit it to high-confidence, same-origin, read-only destinations and measure whether activation actually helps.",
          "Prerender مش cache toggle: بيستهلك CPU وmemory وnetwork والصفحة الحالية شغالة. قيّده بوجهات high-confidence وsame-origin وread-only، وقِس هل التفعيل بيساعد فعلًا.",
        ),
        L(
          "Never speculate on routes that mutate state, sign users out, consume tokens, or trigger billing. Side effects must wait for an explicit user gesture and server-side authorization.",
          "ماتتوقعش routes بتغيّر state أو بتعمل sign out أو بتستهلك tokens أو بتشغّل billing. الـ side effects لازم تستنى user gesture صريح وserver-side authorization.",
        ),
      ],
      {
        bullets: [
          L(
            "speculationrules JSON is parsed by supporting engines during document load",
            "JSON بتاع speculationrules بيتقرأ من الـ engines الداعمة أثناء تحميل المستند",
          ),
          L(
            "prefetch warms the HTTP cache — activation still runs a full navigation lifecycle",
            "prefetch بيسخّن HTTP cache — التفعيل لسه بيشغّل دورة تنقل كاملة",
          ),
          L(
            "prerender builds a hidden browsing context with layout and can execute page scripts before the user navigates",
            "prerender بيبني browsing context مخفي فيه layout ويمكن يشغّل سكربتات الصفحة قبل ما المستخدم يتنقل",
          ),
          L(
            "Unsupported browsers ignore the script type entirely — no fallback behavior is needed",
            "المتصفحات غير الداعمة بتتجاهل نوع السكربت بالكامل — مش محتاج سلوك fallback",
          ),
        ],
        code: `<script type="speculationrules">
{ "prefetch": [{ "urls": ["/products/keyboard"] }] }
</script>`,
        codeCaption: L("Conservative `same-origin` `prefetch` rule", "قاعدة `same-origin` `prefetch` محافظة"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Speculation must preserve ordinary navigation: links need meaningful text, keyboard activation, and a fully functional destination when the API is unsupported or disabled by user settings.",
          "Speculation لازم تحافظ على التنقل العادي: اللينكات محتاجة نص meaningful وkeyboard activation ووجهة شغالة بالكامل لما الـ API مش مدعوم أو متعطّل من user settings.",
        ),
        L(
          "Faster activation is only helpful when route changes remain understandable. Update the document title, move focus appropriately for SPA navigation, and never use prerendering to skip confirmation or consent.",
          "Activation أسرع مفيد بس لما route changes تفضل مفهومة. حدّث document title وانقل focus بشكل مناسب في SPA navigation، ومتستخدمش prerender عشان تتخطى confirmation أو consent.",
        ),
      ],
      {
        bullets: [
          L("Real `<a href>` is the `baseline`", "`<a href>` حقيقي هو الـ `baseline`"),
          L("Keep `keyboard` navigation working without support", "خلّي `keyboard` navigation شغال من غير دعم"),
          L("`Announce` route changes with title + `focus`", "اعلن route changes بـ title + `focus`"),
          L("Never pre-commit user actions in the background", "متنفذش user actions مسبقًا في الخلفية"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Speculation Rules are a user-navigation optimization, not an indexing directive. Crawlers still need stable, server-rendered URLs, meaningful internal anchors, and correct canonical metadata.",
          "Speculation Rules هي optimization لتنقل المستخدم، مش indexing directive. الـ crawlers لسه محتاجة URLs ثابتة وserver-rendered وinternal anchors meaningful وcanonical metadata صحيحة.",
        ),
        L(
          "Targeted prerendering can improve next-navigation LCP for real visitors, but aggressive rules can contend with the current page's resources. Evaluate both journeys in field data before expanding coverage.",
          "Prerender مستهدف ممكن يحسن next-navigation LCP للزوار الحقيقيين، لكن قواعد عدوانية ممكن تنافس موارد الصفحة الحالية. قيّم الرحلتين في field data قبل ما توسع التغطية.",
        ),
      ],
      {
        bullets: [
          L("Speculation does not replace crawlable `internal` `links`", "Speculation مش بديل للـ `internal` `links` القابلة للزحف"),
          L("Track next-page `LCP` in real-user data", "راقب `LCP` للصفحة الجاية في real-user data"),
          L("Do not trade current-page `LCP` for blanket prerendering", "متضحّيش بـ `LCP` للصفحة الحالية عشان `prerender` شامل"),
          L("Keep `canonical` URLs independent of speculative rules", "خلّي `canonical` URLs مستقلة عن speculative rules"),
        ],
      },
    ),
  },

  "html-global-rtl": {
    underTheHood: insight(
      [
        L(
          "Browsers apply the Unicode Bidirectional Algorithm. `dir` on an element creates a new embedding/isolation level so nested opposite-direction runs do not reorder surrounding text unexpectedly.",
          "المتصفحات بتطبّق Unicode Bidirectional Algorithm. `dir` على عنصر بيعمل مستوى embedding/isolation جديد عشان النصوص المعاكسة المتداخلة متقلّبش النص حوالينها.",
        ),
        L(
          "`<bdi>` is an isolate by default — ideal for usernames, IDs, and code tokens. `<bdo>` overrides ordering and is rarely needed; prefer isolate + explicit `dir` first.",
          "`<bdi>` isolate افتراضيًا — مثالي لأسماء المستخدمين والـ IDs ورموز الكود. `<bdo>` بيفرض الترتيب ونادرًا ما تحتاجه؛ فضّل isolate + `dir` صريح الأول.",
        ),
        L(
          "Teleporting UI (dialog, popover, portal) can escape the document’s direction context. Set `dir`/`lang` on the teleported root or inherit deliberately from the host page.",
          "نقل الـ UI (dialog و popover و portal) ممكن يخرج من سياق اتجاه المستند. حط `dir`/`lang` على جذر العنصر المنقول أو ورّث بقصد من صفحة الـ host.",
        ),
      ],
      {
        bullets: [
          L(
            "dir creates a new embedding or isolation level in the Unicode bidi algorithm",
            "dir بيعمل مستوى embedding أو isolation جديد في خوارزمية Unicode bidi",
          ),
          L(
            "bdi is an isolate by default — nested opposite-direction runs cannot reorder surrounding text",
            "bdi isolate افتراضيًا — نصوص معاكسة متداخلة مش بتعيد ترتيب النص حوالينها",
          ),
          L(
            "dir=auto resolves direction from the first strong character in the element's text",
            "dir=auto بيحدد الاتجاه من أول حرف قوي في نص العنصر",
          ),
          L(
            "Teleported UI escapes the document direction context unless lang and dir are set on the new root",
            "UI المنقول بيخرج من سياق اتجاه المستند إلا لو lang و dir متحطّين على الجذر الجديد",
          ),
        ],
        code: `<p lang="ar" dir="rtl">
  راجع
  <bdi dir="ltr">API_KEY_42</bdi>
  قبل النشر.
</p>`,
        codeCaption: L("`Isolate` an `LTR` token in `RTL` `copy`", "اعزل token `LTR` جوّه نص `RTL`"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Screen readers use `lang` for voice and pronunciation. Mark language switches on quotations and embedded English lessons so screen readers do not Arabic-pronounce English API names.",
          "قارئات الشاشة بتستخدم `lang` للصوت والنطق. علّم تغيّر اللغة على الاقتباسات ودروس الإنجليزي المضمّنة عشان قارئ الشاشة متنطقش أسماء API بالعربي.",
        ),
        L(
          "Caret movement and announcement order follow bidi. LTR inputs for email/OTP inside RTL pages keep digit reading and editing predictable for keyboard and screen-reader users.",
          "حركة الـ caret وترتيب الإعلان بيتبعوا bidi. حقول LTR للإيميل/OTP جوّه صفحات RTL بتخلي قراءة الأرقام والتعديل متوقعين للكيبورد و screen readers.",
        ),
      ],
      {
        bullets: [
          L("lang on `root` + on language switches", "lang على الـ `root` وعلى تغيّرات اللغة"),
          L("Don’t rely on visual CSS mirroring for screen-reader order", "متعتمدش على عكس CSS البصري لترتيب قارئ الشاشة"),
          L("Keep `focus` order matching reading order after dir flips", "خلّي ترتيب الـ `focus` يطابق القراءة بعد تقلّب dir"),
          L("Test with `NVDA`/`VoiceOver` in both EN and AR documents", "اختبر بـ `NVDA`/`VoiceOver` في مستندات EN و AR"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Correct `hreflang` and localized URLs pair with on-page `lang`. A page labeled `lang=\"ar\"` that is actually English confuses indexing and snippet generation.",
          "`hreflang` و URLs المترجمة بتتوافق مع `lang` في الصفحة. صفحة معلّمة `lang=\"ar\"` وهي إنجليزي بتلخبط الفهرسة وتوليد الـ snippets.",
        ),
        L(
          "RTL templates still need unique titles/descriptions per locale. Do not share one canonical across translated URLs unless they are true duplicates.",
          "قوالب RTL لسه محتاجة titles/descriptions فريدة لكل locale. متشاركش canonical واحد عبر URLs مترجمة إلا لو duplicates حقيقية.",
        ),
      ],
      {
        bullets: [
          L("Match lang to the `visible` locale `content`", "طابق lang مع محتوى الـ locale الظاهر"),
          L("Locale URLs + hreflang for `bilingual` products", "URLs للـ locale + hreflang للمنتجات `bilingual`"),
          L("Separate `canonicals` per language version", "`canonicals` منفصلة لكل نسخة لغة"),
          L("`Crawl` both `RTL` and `LTR` entry pages", "ازحف صفحات الدخول `RTL` و `LTR`"),
        ],
      },
    ),
  },

  "html-common-pitfalls": {
    underTheHood: insight(
      [
        L(
          "Invalid HTML triggers parser repair — `<p><div></div></p>` closes `<p>` early; `<a><button></button></a>` creates unpredictable focus targets. Validator errors predict cross-browser DOM differences.",
          "HTML invalid بيشغّل parser repair — `<p><div></div></p>` بيقفل `<p>` بدري؛ `<a><button></button></a>` focus targets unpredictable. Validator errors بتتوقع DOM differences cross-browser.",
        ),
        L(
          "Multiple `<main>` or skipped heading levels confuse accessibility tree builders — browsers do not error, but screen-reader document maps become unreliable.",
          "`<main>` متعددة أو skipped heading levels بتلخبط accessibility tree builders — browsers ما بتerrorش، لكن خرائط قارئ الشاشة تبقى مش موثوقة.",
        ),
        L(
          "Inline styles and presentational tags (`<font>`, `<center>`) still parse but fight CSS cascade — semantic HTML plus external CSS keeps render tree predictable.",
          "Inline styles و presentational tags (`<font>`, `<center>`) لسه بتparse لكن بتقاتل CSS cascade — semantic HTML plus external CSS يخلي render tree predictable.",
        ),
      ],
      {
        bullets: [
          L(
            "Invalid nesting triggers parser repair — block inside p closes the paragraph early",
            "تداخل غير صالح بيشغّل parser repair — block جوه p بيقفل الفقرة بدري",
          ),
          L(
            "Interactive element nesting creates unpredictable focus targets and activation behavior",
            "تداخل عناصر تفاعلية بيعمل focus targets وسلوك تفعيل غير متوقع",
          ),
          L(
            "Multiple main elements confuse accessibility tree landmark mapping — browsers do not error",
            "عناصر main متعددة بتلخبط landmark mapping في accessibility tree — المتصفحات ما بتطلعش error",
          ),
          L(
            "Skipped heading levels break the document outline that screen readers use for navigation",
            "قفز في مستويات العناوين بيكسر document outline اللي screen readers بتستخدمه للتنقل",
          ),
        ],
        code: `<!-- Wrong -->
<p><div>Broken</div></p>
<!-- Right -->
<div><p>Valid block wrapper</p></div>`,
        codeCaption: L("`Paragraph` cannot contain divs", "`Paragraph` مايحتويش divs"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Div buttons (`<div onclick>`) skip native role and keyboard — common pitfall failing audits instantly. Use `<button>` or `<a href>` with href when navigation.",
          "Div buttons (`<div onclick>`) بتتخطى native role و keyboard — pitfall شائع بيفشل audits فورًا. استخدم `<button>` أو `<a href>` للـ navigation.",
        ),
        L(
          "Placeholder-only inputs, missing alt, and icon links without labels are the top HTML a11y failures — all fixable in markup without JavaScript frameworks.",
          "Placeholder-only inputs و missing alt و icon links من غير labels أ top HTML a11y failures — كلها تتصلح في markup من غير JavaScript frameworks.",
        ),
      ],
      {
        bullets: [
          L("`<button type=\"button\">` for actions — not div", "`<button type=\"button\">` للـ actions — مش div"),
          L("Every `<img>` has alt (empty only if `decorative`)", "كل `<img>` لها alt (فاضي لو `decorative` بس)"),
          L("`Labels` on every form control", "`Labels` على كل form control"),
          L("Do not disable `zoom` or remove `focus` outlines globally", "متعطّلش `zoom` أو تشيل `focus` outlines globally"),
        ],
        code: `<!-- Wrong -->
<div class="btn" onclick="save()">Save</div>
<!-- Right -->
<button type="button" onclick="save()">Save</button>`,
        codeCaption: L("Native `button` vs div click", "Native `button` vs div click"),
      },
    ),
    seo: insight(
      [
        L(
          "Empty client root `<div id=\"root\"></div>` with no SSR is the classic SEO pitfall — Googlebot may index thin pages. Duplicate `<title>`/description across routes dilutes relevance.",
          "Client root فاضي `<div id=\"root\"></div>` من غير SSR classic SEO pitfall — Googlebot ممكن يفهرس thin pages. Duplicate `<title>`/description عبر routes يخفّ relevance.",
        ),
        L(
          "Href=\"#\" and javascript: links do not help ranking — use real URLs. Hidden H1 stacks or keyword stuffing in `<meta keywords>` (ignored) waste effort.",
          "Href=\"#\" و javascript: links مش بيساعدوا الترتيب — استخدم URLs حقيقية. Hidden H1 stacks أو keyword stuffing في `<meta keywords>` (ignored) مجهود ضايع.",
        ),
      ],
      {
        bullets: [
          L("`SSR` primary `content` — not empty `mount node`", "`SSR` primary `content` — مش empty `mount node`"),
          L("Unique title/`description` per route", "Title/`description` فريدين per route"),
          L("Real hrefs in `nav` and pagination", "Real hrefs في `nav` و pagination"),
          L("Fix broken `links` — 404s waste `crawl` budget", "صلّح broken `links` — 404s بتضيع `crawl` budget"),
        ],
      },
    ),
  },

  "html-cheatsheet": {
    underTheHood: insight(
      [
        L(
          "Production HTML sits at the base of the pipeline: parse → DOM + CSSOM → render tree → layout → paint. Every tag choice affects parse, accessibility tree, and crawlable content simultaneously.",
          "Production HTML في قاعدة الـ pipeline: parse → DOM + CSSOM → render tree → layout → paint. كل tag choice بيأثر parse و accessibility tree و crawlable content في نفس الوقت.",
        ),
        L(
          "Validate, semantic landmarks, sized media, labeled forms, and descriptive links form the minimum bar — enhancements layer CSS and JS without replacing missing semantics.",
          "Validate و semantic landmarks و sized media و labeled forms و descriptive links هو minimum bar — enhancements تlayer CSS و JS من غير ما تستبدل semantics ناقصة.",
        ),
        L(
          "Partial hydration and islands still need correct server HTML shell — the cheatsheet is the contract between CMS, SSR framework, and client enhancements.",
          "Partial hydration و islands لسه محتاجين server HTML shell صح — الـ cheatsheet هو العقد بين CMS و SSR framework و client enhancements.",
        ),
      ],
      {
        bullets: [
          L(
            "Parse flows HTML to DOM, CSS to CSSOM, then merges into the render tree for layout and paint",
            "الـ parse بيحوّل HTML لـ DOM و CSS لـ CSSOM، وبعدين يدمجهم في render tree للـ layout والرسم",
          ),
          L(
            "Semantic landmarks become nodes in the accessibility tree that screen readers exposes as navigation shortcuts",
            "landmarks الدلالية بتبقى nodes في accessibility tree اللي screen readers بتعرضها كاختصارات تنقل",
          ),
          L(
            "Native form controls wire directly to the browser submission and validation pipeline",
            "form controls الأصلية مربوطة مباشرة بمسار الإرسال والتحقق في المتصفح",
          ),
          L(
            "Each tag choice affects parse time, a11y tree shape, and crawlable content simultaneously",
            "كل اختيار tag بيأثر وقت الـ parse وشكل a11y tree والمحتوى القابل للزحف في نفس الوقت",
          ),
        ],
        code: `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Unique page title</title>
  <link rel="canonical" href="https://example.com/page" />
</head>
<body>
  <a href="#main">Skip to content</a>
  <header>...</header>
  <main id="main">...</main>
  <footer>...</footer>
</body>
</html>`,
        codeCaption: L("Production `HTML` `skeleton` cheatsheet", "Production `HTML` `skeleton` cheatsheet"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Cheatsheet a11y checklist: lang, skip link, one main, labeled inputs, alt on images, keyboard-focusable controls, aria-live for async, focus management on dialogs — test with Tab + NVDA or VoiceOver.",
          "Cheatsheet a11y checklist: lang, skip link, main واحد, inputs labeled, alt على images, controls keyboard-focusable, aria-live للـ async, focus management على dialogs — اختبر Tab + NVDA أو VoiceOver.",
        ),
        L(
          "First rule: use native elements. Second rule: ARIA names/states when building custom widgets. Never use ARIA to fix bad HTML you could write correctly.",
          "Rule الأول: native elements. Rule التاني: ARIA names/states لما تبني custom widgets. متستخدمش ARIA تصلح HTML كنت تكتبه صح.",
        ),
      ],
      {
        bullets: [
          L("`Tab`, Enter, Space, Escape on every widget", "`Tab`, Enter, Space, Escape على كل widget"),
          L(":`focus`-`visible` `styles` on interactive `elements`", ":`focus`-`visible` `styles` على interactive `elements`"),
          L("Contrast 4.5:1 — do not rely on color alone", "Contrast 4.5:1 — متعتمدش على اللون لوحده"),
          L("`WCAG` 2.2 AA as ship criteria", "`WCAG` 2.2 AA كـ ship criteria"),
        ],
        code: `<label for="q">Search</label>
<input id="q" type="search" />
<button type="submit">Search</button>`,
        codeCaption: L("Minimal `accessible` search form", "Search form `accessible` minimal"),
      },
    ),
    seo: insight(
      [
        L(
          "HTML SEO cheatsheet: unique title + meta description, canonical, crawlable `<a href>`, semantic headings, alt text, JSON-LD matching visible content, sized LCP image, mobile viewport — measure in Search Console and CrUX.",
          "HTML SEO cheatsheet: title + meta description فريدين, canonical, `<a href>` قابل للزحف, semantic headings, alt text, JSON-LD يطابق visible content, LCP image sized, mobile viewport — قِس في Search Console و CrUX.",
        ),
        L(
          "Googlebot reads HTML first — JS enhances but does not replace missing titles, main copy, or internal links. SSR/SSG is the production default for marketing and docs.",
          "Googlebot بيقرأ HTML الأول — JS ي enhance لكن مايستبدلش titles أو main copy أو internal links ناقصة. SSR/SSG هو production default للـ marketing و docs.",
        ),
      ],
      {
        bullets: [
          L("`Indexable` `HTML` in first `response`", "`HTML` قابل للفهرسة في first `response`"),
          L("Sitemap + robots + `canonical` alignment", "Sitemap + robots + `canonical` alignment"),
          L("CWV: `LCP`, `INP`, `CLS` from real `HTML` choices", "CWV: `LCP`, `INP`, `CLS` من `HTML` choices حقيقية"),
          L("Rich results: valid `structured data`", "Rich results: `structured data` valid"),
        ],
      },
    ),
  },

  "form-ux-attributes": {
    underTheHood: insight(
      [
        L(
          "Browsers map `type` and `inputmode` to platform input method editors. `inputmode` is a hint — the engine still stores a string value and runs constraint validation from `type`, `required`, `pattern`, and `min`/`max`.",
          "المتصفحات بتربط `type` و `inputmode` بـ IME المنصة. `inputmode` تلميح — الـ engine لسه بيخزّن string وبيشغّل constraint validation من `type` و `required` و `pattern` و `min`/`max`.",
        ),
        L(
          "`autocomplete` tokens feed into password managers and OS autofill heuristics. Wrong tokens can suppress suggestions entirely on mobile WebKit.",
          "رموز `autocomplete` بتغذي password managers و heuristics الـ autofill. الرمز الغلط ممكن يمنع الاقتراحات تمامًا على WebKit الموبايل.",
        ),
      ],
      {
        bullets: [
          L(
            "inputmode routes to the platform IME without changing stored value type or validation rules",
            "inputmode بيوجّه لـ IME المنصة من غير ما يغيّر نوع القيمة المخزّنة أو قواعد التحقق",
          ),
          L(
            "Constraint validation still runs from type, required, pattern, and min/max regardless of inputmode",
            "constraint validation لسه بيشتغل من type و required و pattern و min/max بغض النظر عن inputmode",
          ),
          L(
            "Autocomplete tokens feed OS autofill heuristics — wrong tokens can silence suggestions on WebKit mobile",
            "رموز autocomplete بتغذي heuristics الـ autofill — الرمز الغلط ممكن يكتم الاقتراحات على WebKit الموبايل",
          ),
          L(
            "Password managers match fields by autocomplete name before scanning visible labels",
            "password managers بتطابق الحقول باسم autocomplete قبل ما تفحص الـ labels الظاهرة",
          ),
        ],
        code: `<input type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9+\\-\\s]{8,}" />`,
        codeCaption: L("Tel stack for mobile `UX`", "حزمة tel لتجربة الموبايل"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Pattern failures must be announced — native tooltip from `title` is weak. Prefer `aria-describedby` error text and keep focus on the invalid field after submit.",
          "فشل pattern لازم يتعلن — tooltip من `title` ضعيف. فضّل نص خطأ بـ `aria-describedby` وخلّي الـ focus على الحقل الغلط بعد الإرسال.",
        ),
        L(
          "OTP fields with `autocomplete=\"one-time-code\"` help VoiceOver users paste SMS codes without hunting the keyboard.",
          "حقول OTP بـ `autocomplete=\"one-time-code\"` بتساعد مستخدمي VoiceOver يلصقوا كود SMS من غير تعب.",
        ),
      ],
      {
        bullets: [
          L("`Visible` label always — not placeholder-only", "label ظاهر دايمًا — مش placeholder بس"),
          L("Describe `pattern` rules in text", "اشرح قواعد `pattern` بالنص"),
          L("Don't trap `focus` inside custom keyboards", "متحبسش الـ `focus` جوه كيبوردات مخصصة"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Form UX attributes rarely affect ranking directly, but conversion and INP do — heavy custom input masks that block the main thread hurt Core Web Vitals.",
          "صفات Form UX نادرًا ما تأثر الترتيب مباشرة، لكن التحويل و INP بتتأثر — masks تقيلة بتعطل الـ main thread بتضر Core Web Vitals.",
        ),
        L(
          "Keep login/checkout forms in the initial HTML when possible so password managers and crawlers that execute limited JS still see controls.",
          "خلّي فورم الدخول/الدفع في HTML الأولي لما تقدر عشان مديري كلمات المرور والـ crawlers يشوفوا الـ controls.",
        ),
      ],
      {
        bullets: [
          L("Prefer native constraints over heavy mask libraries", "فضّل قيود أصلية عن مكتبات mask تقيلة"),
          L("`SSR` critical `checkout` fields", "`SSR` لحقول الـ `checkout` الحرجة"),
        ],
      },
    ),
  },

  "native-dialog": {
    underTheHood: insight(
      [
        L(
          "`showModal()` places the dialog in the top layer above the document, applies a UA `::backdrop`, and runs a focus trap. Closing restores focus to the previously focused element when possible.",
          "`showModal()` بيحط الـ dialog في الـ top layer فوق المستند، وبيطبّق `::backdrop` من المتصفح، وبيشغّل focus trap. القفل بيرجّع الـ focus للعنصر السابق لما ينفع.",
        ),
        L(
          "`form method=\"dialog\"` submits by closing the dialog and exposing `returnValue` — no navigation. This is cheaper than mounting a React portal modal tree for simple confirms.",
          "`form method=\"dialog\"` بيقفل الـ dialog ويعرض `returnValue` — من غير تنقّل. أرخص من portal React لـ confirms بسيطة.",
        ),
      ],
      {
        bullets: [
          L(
            "showModal() promotes the element to the top layer, above regular stacking and popovers",
            "showModal() بيرفع العنصر لـ top layer فوق التكديس العادي والـ popovers",
          ),
          L(
            "The UA paints ::backdrop as a pseudo-element over the inert document below",
            "المتصفح بيرسم ::backdrop كـ pseudo-element فوق المستند inert تحته",
          ),
          L(
            "Focus trap cycles tab order inside the dialog until it closes",
            "focus trap بيدوّر ترتيب Tab جوه الـ dialog لحد ما يتقفل",
          ),
          L(
            "close() and Escape restore focus to the previously focused element in the opener",
            "close() و Escape بيرجّعوا focus للعنصر اللي كان مركّز قبل كده في الفاتح",
          ),
        ],
        code: `dialog.showModal();\ndialog.addEventListener("close", () => {\n  console.log(dialog.returnValue);\n});`,
        codeCaption: L("`Modal` open + returnValue", "فتح `modal` و returnValue"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Name the dialog with `aria-labelledby` (heading) or `aria-label`. NVDA/VoiceOver announce the dialog role and move virtual cursor inside on open.",
          "سمّي الـ dialog بـ `aria-labelledby` (عنوان) أو `aria-label`. NVDA/VoiceOver بيعلنوا role وينقلوا المؤشر لجواه عند الفتح.",
        ),
        L(
          "Don't nest dialogs casually. Ensure the invoker remains in the tab order after close — broken focus is a WCAG failure.",
          "متعشّش dialogs بخفة. تأكد إن الزر اللي فتح لسه في ترتيب Tab بعد القفل — focus مكسور فشل WCAG.",
        ),
      ],
      {
        bullets: [
          L("Prefer native dialog over `role`=dialog divs", "فضّل dialog أصلي عن div بـ `role`=dialog"),
          L("Keep initial `focus` on the first meaningful control", "حط الـ `focus` الأول على أول control مهم"),
          L("`Announce` async results after destructive confirms", "أعلن النتائج بعد تأكيدات حساسة"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Modal content that only exists after a click is often secondary for SEO — keep primary copy in the static document. Don't hide unique product facts exclusively inside dialogs.",
          "محتوى الـ modal اللي بيظهر بعد ضغطة غالبًا ثانوي للـ SEO — سيّب النص الأساسي في المستند الثابت. متخفيش معلومات منتج فريدة جوّه dialogs بس.",
        ),
        L(
          "Heavy portal modals that shift layout on open can worsen CLS — native dialog top-layer painting avoids most reflow of the page underneath.",
          "portal modals تقيلة بتحرّك الـ layout ممكن تزوّد CLS — رسم top-layer الأصلي بيجنّب معظم reflow للصفحة تحت.",
        ),
      ],
      {
        bullets: [
          L("`Indexable` facts stay outside `modals`", "المعلومات القابلة للفهرسة برّه الـ `modals`"),
          L("Native dialog reduces `layout` thrash vs `overlays`", "dialog أصلي بيقلل `layout` thrash مقابل `overlays`"),
        ],
      },
    ),
  },

  "details-summary": {
    underTheHood: insight(
      [
        L(
          "`<details>` toggles an open flag in the DOM; the renderer shows or hides subsequent content without your JS. The accessibility tree exposes an expandable widget wired to `<summary>`.",
          "`<details>` بيبدّل flag مفتوح في الـ DOM؛ الرندر بيظهر أو يخفي المحتوى من غير JS. شجرة الوصول بتعرض ودجت قابلة للتوسيع مربوطة بـ `<summary>`.",
        ),
        L(
          "Exclusive `name` grouping closes sibling details in supporting engines — a tiny amount of UA state instead of accordion libraries.",
          "تجميع `name` الحصري بيقفل details الإخوة في الـ engines الداعمة — حالة بسيطة من المتصفح بدل مكتبات accordion.",
        ),
      ],
      {
        bullets: [
          L(
            "Toggle flips the open IDL attribute — the renderer shows or hides content without script",
            "التبديل بيقلب open IDL attribute — الرندر بيظهر أو يخفي المحتوى من غير سكربت",
          ),
          L(
            "The accessibility tree exposes summary as an expandable button with expanded/collapsed state",
            "accessibility tree بيعرض summary كزرار قابل للتوسيع بحالة expanded/collapsed",
          ),
          L(
            "Exclusive name grouping lets the engine close sibling details when one opens",
            "تجميع name الحصري بيخلي الـ engine يقفل details الإخوة لما واحدة تتفتح",
          ),
          L(
            "The toggle event fires synchronously when open state changes",
            "حدث toggle بينطلق بشكل متزامن لما حالة open تتغيّر",
          ),
        ],
        code: `<details name="faq">\n  <summary>…</summary>\n  <p>…</p>\n</details>`,
        codeCaption: L("Exclusive `FAQ` group", "مجموعة `FAQ` حصرية"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Keyboard users activate summary with Enter/Space. Don't put nested buttons/links that steal the first activation inside summary.",
          "مستخدمي الكيبورد بيفعّلوا summary بـ Enter/Space. متتحطّش أزرار/لينكات جوه summary تسرق أول تفعيل.",
        ),
        L(
          "Ensure expanded content is readable in order — avoid absolute-positioned panels that disappear from the accessibility tree incorrectly.",
          "تأكد إن المحتوى المفتوح مقروء بالترتيب — تجنّب لوحات absolute بتختفي من شجرة الوصول بالغلط.",
        ),
      ],
      {
        bullets: [
          L("One clear summary label", "تسمية summary واضحة"),
          L("Don't fake details with display:none divs + no `keyboard`", "متزوّرش details بـ div و display:none من غير كيبورد"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Content inside closed `<details>` is generally still in the HTML source — Google can index it, but critical H1/product copy should not rely on being tucked only in collapsed FAQs.",
          "المحتوى جوّه `<details>` المقفول عادة لسه في مصدر HTML — Google يقدر يفهرسه، لكن نص H1/المنتج الحرج متعتمدش إنه مختبي في FAQ مقفول بس.",
        ),
        L(
          "FAQPage structured data should match visible Q&A text — including details/summary pairs.",
          "structured data من نوع FAQPage لازم يطابق نص السؤال والجواب الظاهر — بما فيه أزواج details/summary.",
        ),
      ],
      {
        bullets: [
          L("Keep primary `SEO` `copy` outside collapsed-only sections", "سيّب نص `SEO` الأساسي برّه الأقسام المقفولة بس"),
          L("Align `FAQ` schema with details `content`", "طابق `FAQ` schema مع محتوى details"),
        ],
      },
    ),
  },

  "picture-source": {
    underTheHood: insight(
      [
        L(
          "The browser evaluates `<source>` in order: matching `type`/`media`/`srcset` wins, then `<img>` loads. This happens in the preload scanner and image loader — not in your JS.",
          "المتصفح بيقيّم `<source>` بالترتيب: أول `type`/`media`/`srcset` مطابق بيفوز، وبعدين `<img>`. ده بيحصل في preload scanner و image loader — مش في JS.",
        ),
        L(
          "Width/height (or CSS aspect-ratio) reserve layout space before the bytes arrive — critical for CLS when swapping art-directed crops.",
          "width/height (أو aspect-ratio) بيحجزوا مساحة قبل ما البايتات توصل — مهم ضد CLS لما تبدّل قصّات موجّهة.",
        ),
      ],
      {
        bullets: [
          L(
            "The preload scanner evaluates source candidates before paint — selection happens without JS",
            "preload scanner بيقيّم مرشحي source قبل الرسم — الاختيار بيحصل من غير JS",
          ),
          L(
            "Browser walks sources top-down until type, media, and srcset all match",
            "المتصفح بيمشي على المصادر من فوق لتحت لحد ما type و media و srcset يطابقوا",
          ),
          L(
            "The trailing img provides the final URL, alt text, and dimensions for the layout tree",
            "img الأخير بيوفّر URL النهائي ونص alt والأبعاد لـ layout tree",
          ),
          L(
            "Format negotiation happens per-image at fetch time — each candidate can request a different decoder",
            "تفاوض الصيغة بيحصل لكل صورة وقت الجلب — كل مرشح ممكن يطلب decoder مختلف",
          ),
        ],
        code: `<picture>
  <source
    type="image/webp"
    srcset="https://placehold.co/1200x630/0ea5e9/fff.webp?text=WebP"
  />
  <img
    src="https://placehold.co/1200x630/0284c7/fff.jpg?text=JPEG"
    alt="…"
    width="1200"
    height="630"
  />
</picture>`,
        codeCaption: L("Format `waterfall`", "تسلسل الصيغ"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Alt text lives on `<img>`, not on `<source>`. Decorative art-direction still needs an empty `alt=\"\"` when appropriate — never omit the attribute.",
          "نص alt على `<img>` مش على `<source>`. الصور التزيينية لسه محتاجة `alt=\"\"` لما يناسب — متشيلش الصفة.",
        ),
        L(
          "If crops change meaning (product vs lifestyle), ensure alt still describes the chosen visual honestly.",
          "لو القصّة بتغيّر المعنى (منتج مقابل lifestyle)، خلّي alt يوصف المشهد المختار بصدق.",
        ),
      ],
      {
        bullets: [
          L("Alt on the img `fallback` only", "alt على img الـ `fallback` بس"),
          L("Don't convey unique info only in a crop that some viewports never see", "متوصلش معلومة فريدة في قصّة بعض الشاشات مش هتشوفها"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "LCP candidates often are hero `<img>` elements inside `<picture>`. Wrong dimensions or late discovery (lazy on LCP) destroys LCP scores.",
          "مرشحو LCP غالبًا `<img>` جوّه `<picture>`. أبعاد غلط أو اكتشاف متأخر (lazy على LCP) بيهدّ درجات LCP.",
        ),
        L(
          "Google image search indexes the final `<img>` URL; keep meaningful filenames and compressible modern formats with JPEG fallback.",
          "بحث صور Google بيفهرس رابط `<img>` النهائي؛ خلّي أسماء الملفات معنوية وصيغ حديثة مع JPEG fallback.",
        ),
      ],
      {
        bullets: [
          L("Never `lazy-load` the `LCP` image", "متعملش lazy لصورة `LCP`"),
          L("Reserve space to protect `CLS`", "احجز مساحة لحماية `CLS`"),
          L("Prefer `SSR` heroes over `client`-only mounts", "فضّل heroes من السيرفر عن mounts على الـ `client` بس"),
        ],
      },
    ),
  },

  "head-social-meta": {
    underTheHood: insight(
      [
        L(
          "The HTML parser builds the document head early; social crawlers (Slack, LinkedIn, X) typically fetch raw HTML and read `meta`/`link` without executing your SPA bundle.",
          "محلل HTML بيبني الـ head بدري؛ زواحف السوشيال غالبًا بتجيب HTML خام وبتقرأ `meta`/`link` من غير ما تشغّل حزمة الـ SPA.",
        ),
        L(
          "`theme-color` and favicon `link` rels influence browser chrome and bookmarks — they are presentation metadata, not ranking signals.",
          "`theme-color` و روابط الـ favicon بتأثر على واجهة المتصفح والـ bookmarks — metadata للعرض مش إشارات ترتيب.",
        ),
      ],
      {
        bullets: [
          L(
            "The HTML parser builds head metadata during the initial parse — before body scripts run",
            "محلل HTML بيبني metadata الـ head أثناء الـ parse الأولي — قبل ما سكربتات body تشتغل",
          ),
          L(
            "Social unfurl bots typically fetch raw HTML without executing your SPA bundle",
            "بوتات unfurl للسوشيال غالبًا بتجيب HTML خام من غير ما تشغّل حزمة الـ SPA",
          ),
          L(
            "theme-color is read from meta and passed to the browser chrome layer on supported mobile UIs",
            "theme-color بيتقرأ من meta ويتبعت لطبقة واجهة المتصفح على UIs الموبايل الداعمة",
          ),
          L(
            "Favicon link rels are resolved by the network stack during document load, not at paint time",
            "link rels للـ favicon بتتحل من network stack أثناء تحميل المستند، مش وقت الرسم",
          ),
        ],
        code: `<meta property="og:image" content="https://example.com/og.png" />\n<meta name="twitter:card" content="summary_large_image" />`,
        codeCaption: L("Share `preview` essentials", "أساسيات معاينة المشاركة"),
      },
    ),
    accessibility: insight(
      [
        L(
          "`<title>` is the first thing many screen readers announce on navigation — keep it unique and human. Theme-color and favicons don't replace a clear heading structure in `<body>`.",
          "`<title>` أول حاجة كتير من قارئات الشاشة بتعلنها — خلّيه فريد وبشري. theme-color والـ favicon مش بديل لهيكل عناوين واضح في `<body>`.",
        ),
      ],
      {
        bullets: [
          L("Unique `descriptive` `titles` per route", "عناوين وصفية فريدة لكل route"),
          L("Don't stuff keywords into title `at` the cost of clarity", "متحشوّش keywords في العنوان على حساب الوضوح"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Open Graph doesn't replace classic SEO (`title`, meta description, canonical), but broken previews tank CTR from social. Match `og:title` to the visible H1 when possible.",
          "Open Graph مش بديل لـ SEO الكلاسيكي، لكن معاينات مكسورة بتقتل CTR من السوشيال. طابق `og:title` مع H1 الظاهر لما تقدر.",
        ),
        L(
          "Client-side-only meta managers that run after hydration often miss unfurl bots entirely — prefer SSR/SSG head APIs (Next.js Metadata, etc.).",
          "مديرو meta على الـ client بعد الـ hydration غالبًا بيضيعوا بوتات الـ unfurl — فضّل APIs الـ head من SSR/SSG.",
        ),
      ],
      {
        bullets: [
          L("`SSR` social `tags`", "وسوم سوشيال من السيرفر"),
          L("Unique title + `description` + `canonical`", "title + `description` + `canonical` فريدين"),
          L("Test with unfurl debuggers before launch", "اختبر بمعالجات unfurl قبل الإطلاق"),
        ],
      },
    ),
  },

  "inline-vs-block": {
    underTheHood: insight(
      [
        L(
          "In CSS terms, block boxes participate in block layout (stacking vertically). Inline boxes join line boxes inside a paragraph. HTML’s default `display` for each tag is what beginners feel first.",
          "بمصطلحات CSS، صناديق block بتدخل في block layout (تكديس رأسي). صناديق inline بتدخل في line boxes جوّه الفقرة. الـ `display` الافتراضي لكل tag هو اللي المبتدئ بيحسّه أول.",
        ),
        L(
          "You can change display with CSS later (`inline-block`, flex, grid) — but start by picking the right HTML default so the document makes sense without stylesheets.",
          "تقدر تغيّر العرض بـ CSS بعدين (`inline-block` و flex و grid) — لكن ابدأ بالافتراضي الصح في HTML عشان المستند يفضل مفهوم من غير ستايلشيت.",
        ),
      ],
      {
        bullets: [
          L("Block stacks · inline flows in a line", "Block بيتكدّس · inline بيمشي في سطر"),
          L("Don’t put block tags inside inline tags", "متحطش وسوم block جوّه inline"),
          L("`div` block box · `span` inline hook", "`div` صندوق block · `span` hook inline"),
        ],
        code: `<p>Text <a href="/">link</a> and <strong>stress</strong>.</p>
<section><h2>Block section</h2></section>`,
        codeCaption: L("Inline inside `p` · block `section`", "Inline جوّه `p` · `section` بلوك"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Screen readers mostly care about roles and names, not block vs inline. Still, broken nesting can confuse the accessibility tree after parser repair.",
          "قارئات الشاشة بتهتم بالأدوار والأسماء أكتر من block مقابل inline. لكن التداخل الغلط ممكن يلغبط accessibility tree بعد إصلاح الـ parser.",
        ),
      ],
      {
        bullets: [
          L("Prefer semantic tags over empty `div`/`span` soup", "فضّل وسوم semantic عن شوربة `div`/`span`"),
          L("Links and buttons should stay focusable interactive elements", "اللينكات والأزرار تفضل عناصر تفاعلية قابلة للتركيز"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Crawlers read the DOM. Clear block structure with headings helps outline detection more than decorative spans.",
          "الزواحف بتقرأ الـ DOM. بنية block واضحة بعناوين بتساعد الـ outline أكتر من spans ديكور.",
        ),
      ],
      {
        bullets: [
          L("Use headings and landmarks for structure", "استخدم عناوين و landmarks للبنية"),
          L("Don’t fake sections with only styled spans", "متعملش أقسام وهمية بـ spans متسيّقة بس"),
        ],
      },
    ),
  },

  "classes-and-ids": {
    underTheHood: insight(
      [
        L(
          "`id` must be unique in the document — duplicate ids break `getElementById`, fragment links, and label association. Classes are a set of tokens for styling and querying many nodes.",
          "`id` لازم يكون فريد في المستند — تكرار الـ ids بيكسر `getElementById` وروابط الأقسام وربط الـ label. الـ classes مجموعة tokens للتنسيق والاستعلام عن nodes كتير.",
        ),
        L(
          "CSS specificity: `#id` beats `.class` beats element selectors. Prefer classes for reusable UI so you don’t paint yourself into an `#id` corner.",
          "خصوصية CSS: `#id` أقوى من `.class` أقوى من element. فضّل classes لواجهة قابلة لإعادة الاستخدام عشان متتحشرش في `#id`.",
        ),
      ],
      {
        bullets: [
          L("One unique `id` per page", "`id` واحد فريد لكل صفحة"),
          L("Reuse `class` for shared look and behavior", "أعد استخدام `class` للشكل والسلوك المشترك"),
          L("`label for` must match the control `id`", "`label for` لازم يطابق `id` الـ control"),
        ],
        code: `<label for="q">Search</label>
<input id="q" class="input" name="q" />`,
        codeCaption: L("`for`/`id` pair + shared class", "زوج `for`/`id` + class مشترك"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Ids glue labels to inputs and skip targets to landmarks. Missing or duplicated ids hurt keyboard and screen reader users first.",
          "الـ ids بتربط labels بالـ inputs وأهداف التخطي بالـ landmarks. الـ ids الناقصة أو المكررة بتضر مستخدمي الكيبورد وقارئ الشاشة أول.",
        ),
      ],
      {
        bullets: [
          L("Never duplicate an `id`", "متكررش `id`"),
          L("Keep names readable for teammates and screen readers testing", "خلّي الأسماء مقروءة للفريق واختبار screen readers"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Fragment ids (`#section`) help share deep links. Stable, meaningful ids beat auto-generated gibberish when content is cited.",
          "معرفات الأقسام (`#section`) بتساعد مشاركة روابط عميقة. ids ثابتة ومعناها أوضح من نصوص عشوائية مولّدة.",
        ),
      ],
      {
        bullets: [
          L("Use clear fragment ids for important sections", "استخدم ids واضحة للأقسام المهمة"),
          L("Don’t rely on presentational class names for meaning", "معتمدش على أسماء class شكلية كمعنى"),
        ],
      },
    ),
  },

  "html-browser-apis": {
    underTheHood: insight(
      [
        L(
          "Geolocation, Drag and Drop, and Web Storage are browser capabilities exposed to JavaScript. HTML supplies the controls and `draggable` hooks; permissions and quotas are enforced by the browser.",
          "Geolocation و Drag and Drop و Web Storage قدرات متصفح متعرّضة لـ JavaScript. HTML بيدي عناصر التحكم و hooks الـ `draggable`؛ الأذونات والحصص بيفرضها المتصفح.",
        ),
        L(
          "`localStorage` is synchronous and origin-scoped (~5MB typical). Large writes can jank the main thread — keep payloads small or move heavy data to IndexedDB later.",
          "`localStorage` متزامن ومحدود بالـ origin (حوالي 5MB غالبًا). الكتابات الكبيرة ممكن تعلّق الـ main thread — خلّي البيانات صغيرة أو انقل التقيل لـ IndexedDB بعدين.",
        ),
      ],
      {
        bullets: [
          L("APIs need feature detection + permission handling", "الـ APIs محتاجة feature detection + التعامل مع الإذن"),
          L("`draggable` is HTML · events are JavaScript", "`draggable` من HTML · الأحداث من JavaScript"),
          L("Web Storage is not encrypted — never store secrets", "Web Storage مش مشفّر — متخزنش أسرار"),
        ],
        code: `localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");`,
        codeCaption: L("Tiny `localStorage` read/write", "قراءة/كتابة `localStorage` صغيرة"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Drag-and-drop UIs need keyboard and button alternatives. Geolocation prompts should explain purpose in visible UI copy, not only the browser chrome dialog.",
          "واجهات السحب والإفلات محتاجة بدائل كيبورد وأزرار. طلبات الموقع لازم توضّح الغرض في نص ظاهر، مش في حوار المتصفح بس.",
        ),
      ],
      {
        bullets: [
          L("Provide non-drag ways to complete the same task", "وفّر طرق من غير سحب لنفس المهمة"),
          L("Announce status updates with `role=\"status\"` when helpful", "أعلن تحديثات الحالة بـ `role=\"status\"` لما يفيد"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "These APIs don’t replace crawlable HTML content. Prefer progressive enhancement — core info in markup, APIs as extras.",
          "الـ APIs دي مش بديل لمحتوى HTML قابل للزحف. فضّل التحسين التدريجي — المعلومات الأساسية في الـ markup، والـ APIs كإضافة.",
        ),
      ],
      {
        bullets: [
          L("Keep critical content in HTML first", "خلّي المحتوى الحرج في HTML أولًا"),
          L("Don’t gate SEO text behind storage or GPS", "متقفلش نص SEO ورا التخزين أو GPS"),
        ],
      },
    ),
  },

  "html-comments": {
    underTheHood: insight(
      [
        L(
          "HTML comments are tokens the tokenizer recognizes (`<!--` … `-->`). They become Comment nodes in the DOM — visible in Elements, omitted from the rendered box tree. Nested `<!--` is a parse trap: the first `-->` closes the comment.",
          "تعليقات HTML tokens الـ tokenizer بيعرفها (`<!--` … `-->`). بتبقى Comment nodes في الـ DOM — ظاهرة في Elements، ومش داخلة في شجرة الرسم. التعليق المتداخل فخ: أول `-->` بيقفل التعليق.",
        ),
        L(
          "Character references (`&lt;`, `&amp;`) are decoded during parsing. Unescaped `<` in text can start a tag and silently eat content.",
          "مراجع الحروف (`&lt;` و `&amp;`) بتتفك أثناء الـ parsing. `<` من غير escape في النص ممكن يفتح tag ويبلع محتوى.",
        ),
      ],
      {
        bullets: [
          L("Comment nodes exist in the DOM, not on screen", "Comment nodes في الـ DOM مش على الشاشة"),
          L("Do not nest comments", "متعشّشش تعليقات"),
          L("Escape `<` `&` in text with entities", "اعمل escape لـ `<` و `&` في النص بـ entities"),
        ],
        code: `<!-- Explain why, not what -->
<p>Use &lt;section&gt; for sections.</p>`,
        codeCaption: L("Comment + entity in the same source", "تعليق و entity في نفس المصدر"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Comments are not announced by screen readers. Do not hide required instructions in comments. `hidden` content is also skipped — put user-facing help in visible text or a real `<label>`.",
          "التعليقات مش بتعلنها قارئات الشاشة. متخفيش تعليمات مهمة في تعليقات. المحتوى `hidden` كمان بيتتخطى — حط المساعدة في نص ظاهر أو `<label>` حقيقي.",
        ),
      ],
      {
        bullets: [
          L("User help belongs in visible HTML", "مساعدة المستخدم في HTML ظاهر"),
          L("Comments are for developers, not screen readers", "التعليقات للمطورين مش لـ screen readers"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Crawlers generally ignore comments. Do not stuff keywords in comments. Large commented-out blocks still download — delete dead markup instead of commenting megabytes.",
          "الزواحف غالبًا بتجاهل التعليقات. متحشّيش keywords فيها. البلوكات المتعليقة الكبيرة لسه بتتحمّل — امسح الـ markup الميت بدل ما تعلّق ميجابايتات.",
        ),
      ],
      {
        bullets: [
          L("Comments do not rank pages", "التعليقات مش بترتب الصفحات"),
          L("Delete unused markup rather than commenting it forever", "امسح الـ markup الغير مستخدم بدل تعليقه للأبد"),
        ],
      },
    ),
  },

  "global-attributes": {
    underTheHood: insight(
      [
        L(
          "`hidden` maps to the CSS `display: none` used internally — the node stays in the DOM. `data-*` attributes become `dataset` in JavaScript (`data-lesson` → `element.dataset.lesson`). Boolean attributes are true if present, even as `hidden=\"false\"`.",
          "`hidden` بيتوافق مع `display: none` داخليًا — العنصر يفضل في الـ DOM. خصائص `data-*` بتبقى `dataset` في JavaScript (`data-lesson` → `element.dataset.lesson`). الخصائص البوليانية true لو موجودة، حتى `hidden=\"false\"`.",
        ),
      ],
      {
        bullets: [
          L("`hidden` keeps the node; CSS can still override in some cases", "`hidden` بيسيب العنصر؛ CSS أحيانًا يقدر يغلّب"),
          L("`dataset` camelCases `data-foo-bar` → `fooBar`", "`dataset` بيحول `data-foo-bar` → `fooBar`"),
          L("Positive `tabindex` creates a custom Tab sequence — avoid it", "`tabindex` موجب بيعمل ترتيب Tab مخصص — تجنّبه"),
        ],
        code: `<div hidden data-state="draft">…</div>`,
        codeCaption: L("`hidden` + `data-*` on one node", "`hidden` + `data-*` على عنصر واحد"),
      },
    ),
    accessibility: insight(
      [
        L(
          "`title` tooltips are mouse- and often keyboard-unreliable — not a substitute for a `<label>`. `lang` on a subtree fixes pronunciation. `tabindex` on non-interactive `<div>`s creates fake controls without roles.",
          "تلميحات `title` ضعيفة بالماوس والكيبورد — مش بديل لـ `<label>`. `lang` على جزء من الصفحة بيظبط النطق. `tabindex` على `<div>` غير تفاعلي بيعمل controls وهمية من غير roles.",
        ),
      ],
      {
        bullets: [
          L("Visible labels beat `title`", "الـ labels الظاهرة أحسن من `title`"),
          L("Set `lang` on foreign-language quotes", "حط `lang` على الاقتباسات بلغة تانية"),
          L("Prefer native controls over `tabindex` on divs", "فضّل controls أصلية عن `tabindex` على divs"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "`hidden` content is usually not treated as primary ranking copy. Don’t hide the real H1. `data-*` is ignored by search — fine for app state, useless as a ranking signal.",
          "المحتوى `hidden` غالبًا مش بيتعتبر نص ترتيب أساسي. متخفيش الـ H1 الحقيقي. `data-*` بيتتجاهل في البحث — مناسب لحالة التطبيق، مش إشارة ترتيب.",
        ),
      ],
      {
        bullets: [
          L("Keep primary copy visible in HTML", "خلّي النص الأساسي ظاهر في HTML"),
          L("`data-*` is for your app, not crawlers", "`data-*` لتطبيقك مش للزواحف"),
        ],
      },
    ),
  },

  "html-native-interactive": {
    underTheHood: insight(
      [
        L(
          "`<template>` content lives in a DocumentFragment — not in the rendered tree. `popover` uses the top layer (like modal dialogs) with light dismiss. `inert` sets a subtree inert flag so hit-testing and screen readers skip it.",
          "محتوى `<template>` يعيش في DocumentFragment — مش في شجرة الرسم. `popover` بيستخدم الـ top layer (زي الـ dialog المودال) مع إغلاق خفيف. `inert` بيعلّم جزء من الشجرة عشان الضغط و screen readers يتخطوه.",
        ),
      ],
      {
        bullets: [
          L("Clone `template.content` — do not innerHTML the template tag blindly", "انسخ `template.content` — متinnerHTML الـ template بعشوائية"),
          L("Popover is top-layer; dialogs are still the right modal primitive", "Popover في الـ top layer؛ الـ dialog لسه الأداة الصح للمودال"),
          L("`inert` is a blunt instrument — prefer dialog for modals", "`inert` أداة حادة — فضّل dialog للمودال"),
        ],
        code: `<button type="button" popovertarget="p">Open</button>
<div id="p" popover>Hello</div>`,
        codeCaption: L("Minimal native popover", "popover أصلي مختصر"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Popovers still need a named button and a keyboard path (Esc, Tab). `inert` on the wrong ancestor can trap or skip users. Templates are invisible to screen readers until cloned into the document.",
          "الـ popovers لسه محتاجة زرار باسم ومسار كيبورد (Esc و Tab). `inert` على جد أعلى غلط ممكن يحبس أو يتخطى المستخدم. الـ templates مش ظاهرة لـ screen readers لحد ما تتنسخ للمستند.",
        ),
      ],
      {
        bullets: [
          L("Use a real button to open popovers", "استخدم زرار حقيقي لفتح الـ popover"),
          L("Don’t inert the control that must remain usable", "متعطلش الـ control اللي لازم يفضل شغال"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Content only inside `<template>` is not in the initial rendered document — crawlers may miss it. Prefer server-rendered HTML for indexable copy; use templates for repeated UI chrome.",
          "المحتوى جوّه `<template>` بس مش في المستند المرسوم أولًا — الزواحف ممكن تضيعه. فضّل HTML من السيرفر للنص القابل للفهرسة؛ استخدم templates لواجهة متكررة.",
        ),
      ],
      {
        bullets: [
          L("Indexable text belongs outside `<template>`", "النص القابل للفهرسة برة `<template>`"),
          L("Popovers are UI chrome, not primary content", "الـ popovers واجهة مش محتوى أساسي"),
        ],
      },
    ),
  },
};
