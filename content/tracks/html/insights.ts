import { insight, L } from "@/content/helpers";
import type { ProductionInsights } from "@/content/tracks/_insights";

export const htmlInsights: Record<string, ProductionInsights> = {
  "document-anatomy": {
    underTheHood: insight(
      [
        L(
          "Blink and Gecko tokenize HTML into a DOM tree — not a simple string parse. The doctype triggers standards mode; without it, quirks mode applies legacy box model rules that break modern CSS layouts.",
          "Blink و Gecko بيعملوا tokenize للـ HTML لـ DOM tree — مش parse string بسيط. الـ doctype بيشغّل standards mode؛ من غيره quirks mode بيطبّق box model rules قديمة بتكسر CSS layouts الحديثة.",
        ),
        L(
          "Parsing is incremental: the parser yields while scripts/styles block. `<head>` metadata is processed before `<body>` paints — charset and viewport must appear early so decoding and layout viewport are correct from the first byte.",
          "Parsing incremental: الـ parser بيوقف لما scripts/styles block. metadata في `<head>` بتتprocess قبل ما `<body>` يpaint — charset و viewport لازم بدري عشان decoding و layout viewport صح من أول byte.",
        ),
        L(
          "DOM construction pairs with CSSOM for the render tree — HTML structure directly affects which nodes become layout boxes. Invalid nesting (e.g. `<div>` inside `<p>`) gets repaired by the parser, sometimes unpredictably.",
          "DOM construction بيتزاوج مع CSSOM للـ render tree — HTML structure بيأثر مباشرة على أي nodes تبقى layout boxes. Nesting غلط (مثل `<div>` جوه `<p>`) الـ parser بيصلحه أحيانًا بشكل unpredictable.",
        ),
      ],
      {
        bullets: [
          L("<!DOCTYPE html> + `<html lang>` on every page", "<!DOCTYPE html> + `<html lang>` على كل صفحة"),
          L("`<meta charset=\"UTF-8\">` within first 1024 bytes", "`<meta charset=\"UTF-8\">` في أول 1024 bytes"),
          L("One `<main>`, logical `<header>` / `<footer>` landmarks", "`<main>` واحد و landmarks `<header>` / `<footer>` منطقية"),
          L("Validate HTML — parser fixes hide structural bugs", "Validate HTML — parser fixes بتخبي structural bugs"),
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
        codeCaption: L("Minimal valid document shell", "Document shell صالح minimal"),
      },
    ),
    accessibility: insight(
      [
        L(
          "`lang` on `<html>` sets VoiceOver/NVDA pronunciation and hyphenation — wrong language makes content unreadable. Document title is the first announcement when the page loads.",
          "`lang` على `<html>` بيحدد نطق VoiceOver/NVDA و hyphenation — language غلط بيخلي المحتوى مش مقروء. Document title أول إعلان لما الصفحة تحمّل.",
        ),
        L(
          "Skip links belong at the top of `<body>` before chrome — keyboard users Tab once to bypass repeated nav. Without landmarks, screen readers cannot jump to main content efficiently.",
          "Skip links في أول `<body>` قبل chrome — keyboard users Tab مرة واحدة يتخطوا nav المتكرر. من غير landmarks، screen readers مش هتقدر تقفز للـ main content بسرعة.",
        ),
      ],
      {
        bullets: [
          L("Set `lang` to primary content language (ar, en, …)", "حط `lang` للغة المحتوى الأساسية (ar, en, …)"),
          L("`<title>` unique and descriptive per route", "`<title>` فريد ووصفي لكل route"),
          L("Skip link → `#main` with visible focus style", "Skip link → `#main` بـ focus style ظاهر"),
          L("Avoid `title` attribute as substitute for visible text", "متستخدمش `title` attribute بدل visible text"),
        ],
        code: `<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header>...</header>
  <main id="main" tabindex="-1">...</main>
</body>`,
        codeCaption: L("Skip link and main landmark", "Skip link و main landmark"),
      },
    ),
    seo: insight(
      [
        L(
          "Googlebot reads the initial HTML response — `<title>`, canonical, meta description, and body copy in the first payload are indexed reliably. Client-rendered shells delay discovery.",
          "Googlebot بيقرأ HTML response الأولي — `<title>` و canonical و meta description و body copy في أول payload بتتفهرس بثبات. Shells client-rendered بتأخر discovery.",
        ),
        L(
          "Viewport meta enables mobile-first indexing — missing viewport can classify pages as non-mobile-friendly. Charset misplacement causes mojibake in snippets.",
          "Viewport meta بيفعّل mobile-first indexing — viewport ناقص ممكن يصنّف الصفحات non-mobile-friendly. charset في مكان غلط بيسبب mojibake في snippets.",
        ),
      ],
      {
        bullets: [
          L("Unique `<title>` per URL — primary ranking signal", "`<title>` فريد لكل URL — ranking signal أساسي"),
          L("`<link rel=\"canonical\">` in `<head>`", "`<link rel=\"canonical\">` في `<head>`"),
          L("SSR/SSG body text — not empty `<div id=\"root\">`", "SSR/SSG body text — مش `<div id=\"root\">` فاضي"),
          L("Valid HTML reduces parser repair surprises in crawlers", "HTML valid يقلل parser repair surprises للـ crawlers"),
        ],
      },
    ),
  },

  "semantic-structure": {
    underTheHood: insight(
      [
        L(
          "Semantic elements map to accessibility roles in the accessibility tree — `<nav>`, `<main>`, `<article>` become landmarks without ARIA. The browser builds this parallel tree alongside the DOM for AT.",
          "Semantic elements بتت map لـ accessibility roles في accessibility tree — `<nav>`, `<main>`, `<article>` landmarks من غير ARIA. المتصفح بيبني tree موازي جنب DOM لـ AT.",
        ),
        L(
          "Sectioning content (`article`, `section`, `aside`, `nav`) affects document outline algorithms in spec — while browsers do not expose heading outlines to users consistently, semantics still drive reader mode and search snippet structure.",
          "Sectioning content (`article`, `section`, `aside`, `nav`) بيأثر على document outline algorithms في spec — browsers مش بتعرض heading outlines consistently، لكن semantics لسه بتوجّه reader mode و search snippet structure.",
        ),
        L(
          "Div soup forces the engine to treat everything as generic — no shortcut navigation, heavier heuristic guessing for AT. Native semantics are zero-cost at parse time.",
          "Div soup بيخلي الـ engine يتعامل مع كل حاجة generic — مفيش shortcut navigation، guessing أثقل لـ AT. Native semantics zero-cost وقت parse.",
        ),
      ],
      {
        bullets: [
          L("`<header>` / `<footer>` can repeat per sectioning root", "`<header>` / `<footer>` ممكن يتكرروا per sectioning root"),
          L("One visible `<h1>` per page in most layouts", "`<h1>` ظاهر واحد لكل صفحة في أغلب layouts"),
          L("`<nav>` for major navigation blocks only", "`<nav>` لـ major navigation blocks بس"),
          L("`<article>` for self-contained syndicatable content", "`<article>` لمحتوى self-contained قابل للـ syndication"),
        ],
        code: `<body>
  <header><h1>Site</h1></header>
  <nav aria-label="Primary">...</nav>
  <main>
    <article>
      <h2>Post title</h2>
      <p>...</p>
    </article>
  </main>
</body>`,
        codeCaption: L("Landmark-first page skeleton", "Page skeleton landmarks أولًا"),
      },
    ),
    accessibility: insight(
      [
        L(
          "NVDA and VoiceOver expose landmark lists (D, NVDA+Firefox) — semantic `<main>`, `<nav>`, `<aside>` let users jump instantly. ARIA `role=\"main\"` duplicates native `<main>`; prefer native unless legacy markup forbids it.",
          "NVDA و VoiceOver بيعرضوا landmark lists — semantic `<main>`, `<nav>`, `<aside>` بتخلي users يقفزوا فورًا. ARIA `role=\"main\"` duplicate لـ native `<main>`؛ فضّل native إلا لو legacy markup يمنع.",
        ),
        L(
          "Multiple `<nav>` elements need `aria-label` or `aria-labelledby` to distinguish — \"Primary\", \"Footer\", \"Breadcrumb\" — otherwise AT announces generic \"navigation\" repeatedly.",
          "`<nav>` متعددة محتاجة `aria-label` أو `aria-labelledby` للتمييز — \"Primary\", \"Footer\", \"Breadcrumb\" — وإلا AT بتقول \"navigation\" generic باستمرار.",
        ),
      ],
      {
        bullets: [
          L("Label every `<nav>` when more than one", "سمّي كل `<nav>` لما يكون أكتر من واحد"),
          L("Do not wrap everything in `<div>` — use landmarks", "متلفش كل حاجة في `<div>` — استخدم landmarks"),
          L("Heading levels reflect structure, not font size", "Heading levels تعكس structure مش font size"),
          L("ARIA only when native semantics cannot express intent", "ARIA لما native semantics مش قادرة تعبر intent"),
        ],
        code: `<nav aria-label="Primary">
  <ul>...</ul>
</nav>
<nav aria-label="Footer">
  <ul>...</ul>
</nav>`,
        codeCaption: L("Distinguish multiple nav landmarks", "ميّز nav landmarks متعددة"),
      },
    ),
    seo: insight(
      [
        L(
          "Google uses semantic HTML to infer page structure — `<article>` with `<h1>` helps article rich results; breadcrumb `<nav>` with structured data reinforces hierarchy.",
          "Google بتستخدم semantic HTML عشان تفهم page structure — `<article>` مع `<h1>` بيساعد article rich results؛ breadcrumb `<nav>` مع structured data ي reinforce hierarchy.",
        ),
        L(
          "Main content in `<main>` separates boilerplate for snippet extraction — sidebars in `<aside>`, unrelated links in `<footer>`, so crawlers weight primary copy higher.",
          "Main content في `<main>` بيفصل boilerplate لـ snippet extraction — sidebars في `<aside>`، links غير related في `<footer>`، crawlers تدي وزن أعلى للـ copy الأساسي.",
        ),
      ],
      {
        bullets: [
          L("`<article>` for blog posts, products, news items", "`<article>` للـ blog posts و products و news"),
          L("Breadcrumb HTML + JSON-LD alignment", "Breadcrumb HTML + JSON-LD متطابقين"),
          L("Avoid hiding primary text inside non-semantic divs", "متخبيش primary text في divs non-semantic"),
          L("Heading hierarchy mirrors content importance", "Heading hierarchy يعكس أهمية المحتوى"),
        ],
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
          "`<strong>` and `<em>` carry semantic weight for AT and reader mode — `<b>`/`<i>` are stylistic defaults without emphasis semantics unless redefined in CSS.",
          "`<strong>` و `<em>` لوزن semantic لـ AT و reader mode — `<b>`/`<i>` stylistic defaults من غير emphasis semantics إلا لو redefined في CSS.",
        ),
      ],
      {
        bullets: [
          L("One `<h1>` per document in typical marketing/docs pages", "`<h1>` واحد per document في marketing/docs"),
          L("Do not skip levels for styling — adjust CSS instead", "متskip levels للـ styling — عدّل CSS"),
          L("`<p>` for paragraphs — not double `<br>`", "`<p>` للفقرات — مش double `<br>`"),
          L("Use `<address>`, `<time datetime>` for structured text", "استخدم `<address>`, `<time datetime>` لنص structured"),
        ],
        code: `<main>
  <h1>Product guide</h1>
  <section>
    <h2>Installation</h2>
    <p>Step one…</p>
    <h3>Linux</h3>
  </section>
</main>`,
        codeCaption: L("Logical heading hierarchy", "Heading hierarchy منطقي"),
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
          L("Headings describe sections — not slogans in every `<h3>`", "Headings توصف sections — مش slogans في كل `<h3>`"),
          L("`<h1>` visible, not only for SEO visually hidden", "`<h1>` ظاهر مش SEO visually hidden بس"),
          L("Lang on elements for mixed Arabic/English headings", "`lang` على elements للـ headings Arabic/English mixed"),
          L("Avoid `role=\"heading\"` when native hx exists", "تجنب `role=\"heading\"` لما hx native موجود"),
        ],
        code: `<h2 id="shipping-heading">Shipping options</h2>
<section aria-labelledby="shipping-heading">...</section>`,
        codeCaption: L("Label section via heading id", "سمّي section عبر heading id"),
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
          L("First paragraph after `<h1>` summarizes page intent", "أول paragraph بعد `<h1>` يلخص page intent"),
          L("Avoid empty headings injected by CMS templates", "تجنب headings فاضية من CMS templates"),
          L("Table of contents links use fragment ids on headings", "TOC links تستخدم fragment ids على headings"),
        ],
      },
    ),
  },

  "links-images": {
    underTheHood: insight(
      [
        L(
          "`<a href>` creates a hyperlink relationship in the DOM — prefetch/preconnect hints and click navigate through the network stack. `href=\"#\"` still resolves and may scroll to top; use `<button>` for actions.",
          "`<a href>` بتعمل hyperlink relationship في DOM — prefetch/preconnect hints و click navigate عبر network stack. `href=\"#\"` لسه بيresolve ويمscroll top؛ استخدم `<button>` للـ actions.",
        ),
        L(
          "Images are replaced elements — layout reserves space only when width/height attributes or CSS aspect-ratio exist. Without dimensions, reflow after decode hurts CLS as the render tree repaints.",
          "Images replaced elements — layout بيحجز مساحة لما width/height attributes أو CSS aspect-ratio موجودين. من غير dimensions، reflow بعد decode بيضر CLS لما render tree يrepaint.",
        ),
        L(
          "Lazy loading (`loading=\"lazy\"`) deferrs fetch until near viewport — LCP image must NOT be lazy. Decode happens on main thread; large images block paint without proper sizing.",
          "Lazy loading (`loading=\"lazy\"`) بيأجل fetch لحد near viewport — LCP image مايتlazyش. Decode على main thread؛ images كبيرة بتblock paint من غير sizing صح.",
        ),
      ],
      {
        bullets: [
          L("Descriptive link text — not \"click here\"", "Link text وصفي — مش \"click here\""),
          L("width + height on `<img>` to reserve layout space", "width + height على `<img>` لحجز layout space"),
          L("`<picture>` / srcset for responsive assets", "`<picture>` / srcset لـ responsive assets"),
          L("Decorative images: alt=\"\" — omit from accessibility tree", "Decorative images: alt=\"\" — خارج accessibility tree"),
        ],
        code: `<img
  src="/hero.webp"
  alt="Team collaborating in Cairo office"
  width="1200"
  height="630"
  fetchpriority="high"
/>`,
        codeCaption: L("LCP image with dimensions and alt", "LCP image بـ dimensions و alt"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Link purpose must be clear from text or `aria-label` — lists of \"Read more\" fail WCAG 2.4.4. Image links use `alt` as the link name when no text sibling exists.",
          "Link purpose لازم يكون واضح من text أو `aria-label` — lists من \"Read more\" بتفشل WCAG 2.4.4. Image links بتستخدم `alt` كـ link name لما مفيش text sibling.",
        ),
        L(
          "Keyboard: Tab focuses links; Enter activates. Do not remove focus outlines on `<a>` — VoiceOver reads \"link\" plus accessible name; empty alt on informative images hides content from blind users.",
          "Keyboard: Tab يركز links؛ Enter يفعّل. متشيلش focus outlines على `<a>` — VoiceOver بتقول \"link\" + accessible name؛ alt فاضي على informative images بيخبي content عن blind users.",
        ),
      ],
      {
        bullets: [
          L("Unique link text per destination context", "Link text فريد per destination context"),
          L("alt describes image function, not filename", "alt يوصف function الصورة مش filename"),
          L("External links: indicate when policy requires", "External links: وضّح لما policy يطلب"),
          L("Skip icon-only links without aria-label", "متسيبش icon-only links من غير aria-label"),
        ],
        code: `<a href="/pricing">
  View pricing for FrontendCraft Pro
</a>
<a href="/docs" aria-label="Documentation (opens in new tab)">Docs ↗</a>`,
        codeCaption: L("Descriptive links for AT and SEO", "Links وصفية لـ AT و SEO"),
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
          L("Crawlable `<a href>` for all indexable destinations", "`<a href>` قابل للزحف لكل destinations قابلة للفهرسة"),
          L("Descriptive alt on informative images", "alt وصفي على informative images"),
          L("Reserve image dimensions — protect LCP and CLS", "احجز image dimensions — احمِ LCP و CLS"),
          L("Avoid lazy-loading above-the-fold hero", "متlazy-load hero above-the-fold"),
        ],
      },
    ),
  },

  "lists": {
    underTheHood: insight(
      [
        L(
          "`<ul>`, `<ol>`, and `<dl>` generate list boxes in the render tree — list-style and counters come from CSS. Removing bullets with CSS does not remove list semantics for AT unless `list-style: none` pairs with proper roles (avoid stripping semantics accidentally).",
          "`<ul>`, `<ol>`, `<dl>` بتولّد list boxes في render tree — list-style و counters من CSS. شيل bullets بـ CSS مايشيلش list semantics لـ AT إلا لو `list-style: none` مع roles صح (تجنب strip semantics بالغلط).",
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
          L("`<ul>` unordered, `<ol>` sequential steps", "`<ul>` unordered، `<ol>` sequential steps"),
          L("`<dl>` / `<dt>` / `<dd>` for term-definition pairs", "`<dl>` / `<dt>` / `<dd>` لـ term-definition"),
          L("Do not use lists purely for layout columns", "متستخدمش lists للـ layout columns بس"),
          L("CSS `list-style: none` still keeps list role if `<ul>`", "CSS `list-style: none` لسه list role لو `<ul>`"),
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
        codeCaption: L("Nested list hierarchy in DOM", "Nested list hierarchy في DOM"),
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
          L("Native lists for nav, TOC, and step instructions", "Native lists للـ nav و TOC و step instructions"),
          L("If role=\"list\" on divs, include role=\"listitem\" children", "لو role=\"list\" على divs، ضيف role=\"listitem\" children"),
          L("`<ol start>` and `value` for resumed sequences", "`<ol start>` و `value` لـ resumed sequences"),
          L("Description lists for FAQ pairs — not fake bullets", "Description lists لـ FAQ pairs — مش fake bullets"),
        ],
        code: `<nav aria-label="Primary">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/tracks">Tracks</a></li>
  </ul>
</nav>`,
        codeCaption: L("Semantic nav list for AT", "Nav list semantic لـ AT"),
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
          L("HowTo steps: `<ol>` + matching JSON-LD", "HowTo steps: `<ol>` + JSON-LD مطابق"),
          L("Feature bullets in `<ul>` near product `<h1>`", "Feature bullets في `<ul>` قريب من product `<h1>`"),
          L("Avoid empty `<li>` placeholders from CMS", "تجنب `<li>` فاضية placeholders من CMS"),
          L("TOC lists link to heading ids — crawlable fragments", "TOC lists links لـ heading ids — fragments قابلة للزحف"),
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
          L("`<label for=\"id\">` on every control", "`<label for=\"id\">` على كل control"),
          L("Use native `type=\"email|url|tel|search\"`", "استخدم native `type=\"email|url|tel|search\"`"),
          L("`<button type=\"submit\">` vs `type=\"button\"` explicit", "`<button type=\"submit\">` vs `type=\"button\"` صريح"),
          L("Autocomplete attributes for passwords and addresses", "Autocomplete attributes للـ passwords و addresses"),
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
        codeCaption: L("Label, hint, and autocomplete", "Label و hint و autocomplete"),
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
          L("Visible focus ring on all inputs and buttons", "Focus ring ظاهر على inputs و buttons"),
          L("Group radios/checkboxes with `<fieldset>` + `<legend>`", "Group radios/checkboxes بـ `<fieldset>` + `<legend>`"),
          L("Required fields: aria-required or required attribute", "Required fields: aria-required أو required attribute"),
          L("Do not disable submit without explaining why", "متعطّلش submit من غير توضيح ليه"),
        ],
        code: `<input
  aria-invalid="true"
  aria-describedby="err-email"
/>
<span id="err-email" role="alert">Enter a valid email.</span>`,
        codeCaption: L("Accessible validation error", "Validation error accessible"),
      },
    ),
    seo: insight(
      [
        L(
          "Forms themselves are rarely indexed — but landing pages with forms need indexable headings and copy around the form. Login walls block crawlers unless public marketing content surrounds them.",
          "Forms نادرًا ما تتفهرس — لكن landing pages فيها forms محتاجة headings و copy قابلة للفهرسة حوالين الـ form. Login walls بتblock crawlers إلا لو marketing content عام حواليهم.",
        ),
        L(
          "Search forms with GET and query params can create duplicate URLs — use canonical tags when `?q=` pages should not index separately.",
          "Search forms بـ GET و query params ممكن تعمل duplicate URLs — استخدم canonical tags لما صفحات `?q=` مايتفهرسوش منفصل.",
        ),
      ],
      {
        bullets: [
          L("Indexable content above/below lead forms", "محتوى قابل للفهرسة فوق/تحت lead forms"),
          L("Canonical on parameterized search result pages", "Canonical على parameterized search result pages"),
          L("Server-render form labels — not JS-only placeholders", "Server-render form labels — مش placeholders JS-only"),
          L("noscript fallback for critical contact info", "noscript fallback لمعلومات contact حرجة"),
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
          L("Tables for data — not page layout grids", "Tables للـ data — مش page layout grids"),
          L("`<thead>`, `<tbody>`, `<tfoot>` for structure", "`<thead>`, `<tbody>`, `<tfoot>` للـ structure"),
          L("scope or headers/id for complex tables", "scope أو headers/id للـ complex tables"),
          L("`<caption>` as first child summarizes the table", "`<caption>` كأول child يلخص الـ table"),
        ],
        code: `<table>
  <caption>Q3 sales by region</caption>
  <thead>
    <tr><th scope="col">Region</th><th scope="col">Revenue</th></tr>
  </thead>
  <tbody>...</tbody>
</table>`,
        codeCaption: L("Data table with caption and scope", "Data table بـ caption و scope"),
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
          L("Never use tables for multi-column page layout", "متستخدمش tables لـ multi-column page layout"),
          L("Associate `<td>` with headers via headers attribute when needed", "اربط `<td>` بـ headers عبر headers attribute لو محتاج"),
          L("Sticky headers: preserve th semantics, not div clones", "Sticky headers: احتفظ th semantics مش div clones"),
          L("Provide text alternative summary for complex charts-as-tables", "Summary text alternative للـ charts-as-tables المعقدة"),
        ],
        code: `<th scope="col" aria-sort="ascending">
  Price
</th>`,
        codeCaption: L("Sort state exposed to AT", "Sort state معروض لـ AT"),
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
          L("Mark up comparable data with real `<table>` elements", "Mark up comparable data بـ `<table>` elements حقيقية"),
          L("Caption + headings describe dataset for snippets", "Caption + headings توصف dataset للـ snippets"),
          L("Avoid empty table shells filled only by client JS", "تجنب table shells فاضية filled بـ client JS بس"),
          L("Structured data Product offers align with visible rows", "Structured data Product offers متوافقة مع visible rows"),
        ],
      },
    ),
  },

  "accessibility-basics": {
    underTheHood: insight(
      [
        L(
          "The accessibility tree is built from DOM + CSS — `display: none` and `visibility: hidden` remove nodes from AT; `aria-hidden=\"true\"` hides subtrees while leaving visual paint. Both differ from off-screen positioning.",
          "Accessibility tree مبني من DOM + CSS — `display: none` و `visibility: hidden` بيشيلوا nodes من AT؛ `aria-hidden=\"true\"` بيخفي subtrees والـ visual paint لسه موجود. الاتنين مختلفين عن off-screen positioning.",
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
          L("Native HTML first — ARIA fills gaps only", "Native HTML الأول — ARIA fills gaps بس"),
          L("Four principles: perceivable, operable, understandable, robust", "أربع principles: perceivable, operable, understandable, robust"),
          L("Test with keyboard only + one screen reader", "اختبر keyboard only + screen reader واحد"),
          L("WCAG 2.2 AA is the common production bar", "WCAG 2.2 AA هو production bar الشائع"),
        ],
        code: `/* Show focus for keyboard, subtle for mouse */
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}`,
        codeCaption: L(":focus-visible for keyboard users", ":focus-visible لـ keyboard users"),
      },
    ),
    accessibility: insight(
      [
        L(
          "NVDA (Windows) and VoiceOver (macOS/iOS) are the most common pair to test — they read roles, states, and live regions differently; fixing for spec compliance helps both.",
          "NVDA (Windows) و VoiceOver (macOS/iOS) أشهر pair للاختبار — بيقرأوا roles و states و live regions differently؛ fix للـ spec compliance بيساعد الاتنين.",
        ),
        L(
          "Keyboard: Tab/Shift+Tab move focus; Enter activates links and buttons; Space toggles buttons and checkboxes; Escape closes dialogs. Never trap focus without a dismiss path.",
          "Keyboard: Tab/Shift+Tab ينقلوا focus؛ Enter يفعّل links و buttons؛ Space يtoggle buttons و checkboxes؛ Escape يقفل dialogs. متحبسش focus من غير dismiss path.",
        ),
      ],
      {
        bullets: [
          L("Every interactive control has accessible name", "كل interactive control لها accessible name"),
          L("Color contrast ≥ 4.5:1 for body text (AA)", "Color contrast ≥ 4.5:1 لـ body text (AA)"),
          L("aria-live=\"polite|assertive\" for dynamic updates", "aria-live=\"polite|assertive\" للـ dynamic updates"),
          L("Manage focus on route change and modal open/close", "أدِر focus على route change و modal open/close"),
        ],
        code: `<button type="button" aria-expanded="false" aria-controls="menu">
  Menu
</button>
<ul id="menu" hidden>...</ul>`,
        codeCaption: L("Expandable widget ARIA pattern", "Expandable widget ARIA pattern"),
      },
    ),
    seo: insight(
      [
        L(
          "Accessibility overlaps SEO — semantic headings, alt text, descriptive links, and valid HTML help crawlers and users. Google does not use WCAG score as a direct ranking factor but usable pages correlate with engagement.",
          "Accessibility overlaps SEO — semantic headings و alt text و descriptive links و valid HTML بيساعدوا crawlers و users. Google ما بتستخدم WCAG score ranking factor مباشر لكن usable pages بت correlate مع engagement.",
        ),
        L(
          "Hidden content (`display:none`) is often de-emphasized in indexing — do not hide keyword blocks; `aria-hidden` on decorative chrome is fine when primary copy remains visible in DOM.",
          "Hidden content (`display:none`) غالبًا de-emphasized في indexing — متخبيش keyword blocks؛ `aria-hidden` على decorative chrome عادي لما primary copy ظاهر في DOM.",
        ),
      ],
      {
        bullets: [
          L("Same HTML improvements help AT and crawlers", "نفس HTML improvements بتساعد AT و crawlers"),
          L("Visible main content — not only aria labels", "Main content ظاهر — مش aria labels بس"),
          L("Mobile usability and a11y share tap target sizing", "Mobile usability و a11y بيشاركوا tap target sizing"),
          L("Avoid cloaking — different content for bots vs users", "تجنب cloaking — content مختلف للـ bots vs users"),
        ],
      },
    ),
  },

  "meta-seo": {
    underTheHood: insight(
      [
        L(
          "`<head>` metadata is parsed before body render — `<title>`, `<meta name=\"description\">`, `<link rel=\"canonical\">`, Open Graph, and Twitter cards live here. Blink builds document metadata used by UI and share sheets.",
          "metadata في `<head>` بتتparse قبل body render — `<title>`, `<meta name=\"description\">`, `<link rel=\"canonical\">`, Open Graph, و Twitter cards هنا. Blink بيبني document metadata للـ UI و share sheets.",
        ),
        L(
          "Robots directives (`noindex`, `nofollow`) and canonical URLs tell crawlers how to treat the URL — conflicting canonical vs sitemap entries confuse indexing.",
          "Robots directives (`noindex`, `nofollow`) و canonical URLs بتقول للـ crawlers يتعاملوا إزاي مع URL — canonical متعارض مع sitemap بيلخبط indexing.",
        ),
        L(
          "Hreflang links signal language alternates — must be reciprocal and include self-reference. Charset and viewport remain prerequisites for correct mobile indexing.",
          "Hreflang links بت signal language alternates — لازم reciprocal وتinclude self-reference. Charset و viewport prerequisites للـ mobile indexing الصح.",
        ),
      ],
      {
        bullets: [
          L("Unique title + description per indexable URL", "Title + description فريدين لكل URL قابل للفهرسة"),
          L("One canonical URL per content item", "Canonical URL واحد لكل content item"),
          L("og:image min 1200×630 for reliable previews", "og:image min 1200×630 لـ previews موثوقة"),
          L("robots.txt vs meta robots — know which wins", "robots.txt vs meta robots — اعرف مين يكسب"),
        ],
        code: `<head>
  <title>FrontendCraft — JavaScript Track</title>
  <meta name="description" content="Learn JS from basics to production." />
  <link rel="canonical" href="https://example.com/tracks/js" />
  <meta property="og:title" content="JavaScript Track" />
  <meta property="og:image" content="https://example.com/og/js.png" />
</head>`,
        codeCaption: L("Core SEO meta bundle", "Core SEO meta bundle"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Document title changes on SPA navigation must update `<title>` — VoiceOver announces title changes; stale titles after client routing disorient users.",
          "Document title changes في SPA navigation لازم تحدّث `<title>` — VoiceOver بتعلن title changes؛ titles قديمة بعد client routing بتلخبط users.",
        ),
        L(
          "`theme-color` and meta viewport affect readability — user zoom must remain enabled (`maximum-scale=1` disables pinch zoom and fails WCAG).",
          "`theme-color` و meta viewport بيأثروا readability — user zoom لازم يفضل enabled (`maximum-scale=1` بيعطّل pinch zoom وبيفشل WCAG).",
        ),
      ],
      {
        bullets: [
          L("Update title on route change for SPAs", "حدّث title على route change للـ SPAs"),
          L("Never disable zoom in viewport meta", "متعطّلش zoom في viewport meta"),
          L("lang + hreflang match actual page language", "lang + hreflang يطابقوا page language الفعلي"),
          L("Meta refresh redirects confuse users and AT — use HTTP 301", "Meta refresh redirects بتلخبط users و AT — استخدم HTTP 301"),
        ],
        code: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
        codeCaption: L("Accessible viewport — zoom allowed", "Viewport accessible — zoom مسموح"),
      },
    ),
    seo: insight(
      [
        L(
          "Googlebot renders `<head>` from initial HTML — client-only title updates may miss the crawl window. SSR/SSG meta is the production standard for indexable routes.",
          "Googlebot بيrender `<head>` من initial HTML — title updates client-only ممكن تفوت crawl window. SSR/SSG meta هو production standard للـ indexable routes.",
        ),
        L(
          "Core Web Vitals influence ranking indirectly via page experience — meta tags do not fix slow LCP; pair SEO head work with performance budgets.",
          "Core Web Vitals بتأثر ranking indirectly عبر page experience — meta tags مايصلحوش LCP بطيء؛ اربط SEO head work بـ performance budgets.",
        ),
      ],
      {
        bullets: [
          L("SSR title, description, canonical on every indexable page", "SSR title, description, canonical على كل indexable page"),
          L("JSON-LD validates in Rich Results Test", "JSON-LD validate في Rich Results Test"),
          L("Sitemap lists canonical URLs only", "Sitemap lists canonical URLs بس"),
          L("Monitor indexing in Search Console after deploys", "راقب indexing في Search Console بعد deploys"),
        ],
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
          L("`<video controls>` + poster for preview frame", "`<video controls>` + poster لـ preview frame"),
          L("Captions: `<track kind=\"captions\">` for video", "Captions: `<track kind=\"captions\">` للـ video"),
          L("iframe title attribute required", "iframe title attribute مطلوب"),
          L("preconnect to embed origins when LCP-adjacent", "preconnect لـ embed origins لما LCP-adjacent"),
        ],
        code: `<video controls width="640" height="360" poster="/poster.jpg">
  <source src="/clip.webm" type="video/webm" />
  <source src="/clip.mp4" type="video/mp4" />
  <track kind="captions" src="/clip.vtt" srclang="en" label="English" />
</video>`,
        codeCaption: L("Accessible video with captions", "Video accessible بـ captions"),
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
          L("No autoplay audio; captions for speech content", "مفيش autoplay audio؛ captions للـ speech content"),
          L("Transcript link for long audio/video", "Transcript link للـ audio/video الطويل"),
          L("Pause/stop for carousels and animated media", "Pause/stop للـ carousels و animated media"),
          L("iframe title describes embedded content purpose", "iframe title يوصف embedded content purpose"),
        ],
        code: `<iframe
  title="Map: FrontendCraft office in Cairo"
  src="https://maps.example.com/embed"
  loading="lazy"
  width="600"
  height="450"
></iframe>`,
        codeCaption: L("Descriptive iframe title", "iframe title وصفي"),
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
          L("Surround embeds with indexable headings and summary", "حط headings و summary قابلة للفهرسة حوالين embeds"),
          L("VideoObject JSON-LD with name, description, thumbnailUrl", "VideoObject JSON-LD بـ name, description, thumbnailUrl"),
          L("Lazy-load below-fold iframes and videos", "Lazy-load iframes و videos below-fold"),
          L("Self-host critical hero media when possible", "Self-host hero media الحرج لو أمكن"),
        ],
      },
    ),
  },

  "html-perf-media": {
    underTheHood: insight(
      [
        L(
          "Critical rendering path: HTML → DOM, CSS → CSSOM, combined render tree → layout → paint → composite. Blocking resources in `<head>` delay first paint — defer non-critical CSS/JS and inline only tiny critical CSS.",
          "Critical rendering path: HTML → DOM, CSS → CSSOM, render tree → layout → paint → composite. Blocking resources في `<head>` بتأخر first paint — defer non-critical CSS/JS و inline critical CSS صغير بس.",
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
          L("width/height on `<img>` — primary CLS fix", "width/height على `<img>` — primary CLS fix"),
          L("loading=\"lazy\" below fold; fetchpriority=\"high\" on LCP", "loading=\"lazy\" below fold؛ fetchpriority=\"high\" على LCP"),
          L("Modern formats via `<picture>` — WebP/AVIF + fallback", "Modern formats عبر `<picture>` — WebP/AVIF + fallback"),
          L("defer/async scripts — avoid render-blocking JS", "defer/async scripts — تجنب render-blocking JS"),
        ],
        code: `<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
<img src="/hero.webp" alt="..." width="1200" height="630" />`,
        codeCaption: L("Preload + sized LCP image", "Preload + sized LCP image"),
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
          L("alt present in HTML even when image lazy-loads", "alt موجود في HTML حتى لو image lazy-load"),
          L("No autoplay motion without user control", "مفيش autoplay motion من غير user control"),
          L("Poster frames for video — not blank flash", "Poster frames للـ video — مش blank flash"),
          L("Focusable controls load before decorative media", "Focusable controls تحمّل قبل decorative media"),
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
          L("Target LCP < 2.5s on mobile field data", "Target LCP < 2.5s على mobile field data"),
          L("Reserve space for ads/embeds to prevent CLS", "احجز مساحة للـ ads/embeds عشان تمنع CLS"),
          L("Preconnect to CDN/font origins in `<head>`", "Preconnect لـ CDN/font origins في `<head>`"),
          L("Monitor CWV in Search Console Experience report", "راقب CWV في Search Console Experience report"),
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
          L("One `<main>` per page — partials update inside it", "`<main>` واحد per page — partials update جواه"),
          L("Server includes for header/footer/nav consistency", "Server includes لـ header/footer/nav consistency"),
          L("`<template>` for client clones — not hidden div soup", "`<template>` لـ client clones — مش hidden div soup"),
          L("Validate assembled HTML in CI", "Validate assembled HTML في CI"),
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
          L("Announce route changes via title + focus management", "اعلن route changes عبر title + focus management"),
          L("Partial templates include labels and alt in the fragment", "Partial templates تinclude labels و alt في fragment"),
          L("Do not inject duplicate `#main` or landmark roles", "متinject duplicate `#main` أو landmark roles"),
          L("aria-live region in layout shell for async partial loads", "aria-live region في layout shell لـ async partial loads"),
        ],
        code: `document.title = nextPage.title;
main.innerHTML = nextPage.html;
main.querySelector("h1")?.focus();`,
        codeCaption: L("SPA partial with focus + title", "SPA partial بـ focus + title"),
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
          L("Full HTML document per URL for Googlebot", "Full HTML document per URL لـ Googlebot"),
          L("Canonical in layout partial — not per-fragment", "Canonical في layout partial — مش per-fragment"),
          L("href in server-rendered nav partials match sitemap", "href في server-rendered nav partials match sitemap"),
          L("Avoid infinite scroll partials as only archive index", "تجنب infinite scroll partials كـ archive index الوحيد"),
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
          "Multiple `<main>` or skipped heading levels confuse accessibility tree builders — browsers do not error, but AT document maps become unreliable.",
          "`<main>` متعددة أو skipped heading levels بتلخبط accessibility tree builders — browsers ما بتerrorش، لكن AT document maps بتبقى unreliable.",
        ),
        L(
          "Inline styles and presentational tags (`<font>`, `<center>`) still parse but fight CSS cascade — semantic HTML plus external CSS keeps render tree predictable.",
          "Inline styles و presentational tags (`<font>`, `<center>`) لسه بتparse لكن بتقاتل CSS cascade — semantic HTML plus external CSS يخلي render tree predictable.",
        ),
      ],
      {
        bullets: [
          L("No block elements inside `<p>`", "مفيش block elements جوه `<p>`"),
          L("No interactive nesting: a > button, button > a", "مفيش interactive nesting: a > button, button > a"),
          L("One `<main>`, one logical `<h1>`", "`<main>` واحد، `<h1>` منطقي واحد"),
          L("Run html-validate or W3C validator in CI", "شغّل html-validate أو W3C validator في CI"),
        ],
        code: `<!-- Wrong -->
<p><div>Broken</div></p>
<!-- Right -->
<div><p>Valid block wrapper</p></div>`,
        codeCaption: L("Paragraph cannot contain divs", "Paragraph مايحتويش divs"),
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
          L("Every `<img>` has alt (empty only if decorative)", "كل `<img>` لها alt (فاضي لو decorative بس)"),
          L("Labels on every form control", "Labels على كل form control"),
          L("Do not disable zoom or remove focus outlines globally", "متعطّلش zoom أو تشيل focus outlines globally"),
        ],
        code: `<!-- Wrong -->
<div class="btn" onclick="save()">Save</div>
<!-- Right -->
<button type="button" onclick="save()">Save</button>`,
        codeCaption: L("Native button vs div click", "Native button vs div click"),
      },
    ),
    seo: insight(
      [
        L(
          "Empty client root `<div id=\"root\"></div>` with no SSR is the classic SEO pitfall — Googlebot may index thin pages. Duplicate `<title>`/description across routes dilutes relevance.",
          "Client root فاضي `<div id=\"root\"></div>` من غير SSR classic SEO pitfall — Googlebot ممكن يفهرس thin pages. Duplicate `<title>`/description عبر routes يخفّ relevance.",
        ),
        L(
          "Href=\"#\" and javascript: links do not pass crawl equity — use real URLs. Hidden H1 stacks or keyword stuffing in `<meta keywords>` (ignored) waste effort.",
          "Href=\"#\" و javascript: links ما بيمرروش crawl equity — URLs حقيقية. Hidden H1 stacks أو keyword stuffing في `<meta keywords>` (ignored) مجهود ضايع.",
        ),
      ],
      {
        bullets: [
          L("SSR primary content — not empty mount node", "SSR primary content — مش empty mount node"),
          L("Unique title/description per route", "Title/description فريدين per route"),
          L("Real hrefs in nav and pagination", "Real hrefs في nav و pagination"),
          L("Fix broken links — 404s waste crawl budget", "صلّح broken links — 404s بتضيع crawl budget"),
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
          L("DOCTYPE + lang + charset + viewport + title", "DOCTYPE + lang + charset + viewport + title"),
          L("Landmarks: header, nav, main, footer", "Landmarks: header, nav, main, footer"),
          L("Headings, lists, tables for structure — not divs", "Headings, lists, tables للـ structure — مش divs"),
          L("ARIA only when native HTML insufficient", "ARIA لما native HTML مش كافي"),
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
        codeCaption: L("Production HTML skeleton cheatsheet", "Production HTML skeleton cheatsheet"),
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
          L("Tab, Enter, Space, Escape on every widget", "Tab, Enter, Space, Escape على كل widget"),
          L(":focus-visible styles on interactive elements", ":focus-visible styles على interactive elements"),
          L("Contrast 4.5:1 — do not rely on color alone", "Contrast 4.5:1 — متعتمدش على اللون لوحده"),
          L("WCAG 2.2 AA as ship criteria", "WCAG 2.2 AA كـ ship criteria"),
        ],
        code: `<label for="q">Search</label>
<input id="q" type="search" />
<button type="submit">Search</button>`,
        codeCaption: L("Minimal accessible search form", "Search form accessible minimal"),
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
          L("Indexable HTML in first response", "HTML قابل للفهرسة في first response"),
          L("Sitemap + robots + canonical alignment", "Sitemap + robots + canonical alignment"),
          L("CWV: LCP, INP, CLS from real HTML choices", "CWV: LCP, INP, CLS من HTML choices حقيقية"),
          L("Rich results: valid structured data", "Rich results: structured data valid"),
        ],
      },
    ),
  },
};
