import { L } from "@/content/helpers";
import type { LessonQuiz, QuizOption, QuizQuestion } from "@/lib/types";

function opt(id: string, en: string, ar: string): QuizOption {
  return { id, label: L(en, ar) };
}

function q(
  id: string,
  prompt: ReturnType<typeof L>,
  options: QuizOption[],
  correctId: string,
  explanation: ReturnType<typeof L>,
  extra?: Partial<Pick<QuizQuestion, "code" | "language" | "hint">>,
): QuizQuestion {
  return {
    id,
    prompt,
    options,
    correctId,
    explanation,
    ...extra,
  };
}

/** Multi-question quizzes keyed by lesson slug — every lesson gets 3–6 questions. */
export const htmlQuizzes: Record<string, LessonQuiz> = {
  "document-anatomy": {
    title: L("Document anatomy check", "اختبار تشريح الـ document"),
    questions: [
      q(
        "q1",
        L(
          "What does this opening line unlock in the browser?",
          "السطر ده بيفعّل إيه في المتصفح؟",
        ),
        [
          opt("a", "Quirks mode forever", "Quirks mode للأبد"),
          opt(
            "b",
            "Standards mode for modern HTML",
            "Standards mode لـ HTML الحديث",
          ),
          opt("c", "Only needed for XHTML", "محتاجينه لـ XHTML بس"),
          opt(
            "d",
            "It loads JavaScript automatically",
            "بيحمّل JavaScript لوحده",
          ),
        ],
        "b",
        L(
          "`<!DOCTYPE html>` tells the browser to use standards mode — the modern HTML parsing rules.",
          "`<!DOCTYPE html>` بيقول للمتصفح يستخدم standards mode — قواعد HTML الحديثة.",
        ),
        {
          code: `<!DOCTYPE html>`,
          language: "html",
          hint: L(
            "Put it on the very first line, before `<html>`.",
            "حطه في أول سطر قبل `<html>`.",
          ),
        },
      ),
      q(
        "q2",
        L(
          "Which shell is the modern baseline?",
          "أنهي هيكل هو الأساس الحديث؟",
        ),
        [
          opt(
            "a",
            "Add DOCTYPE + lang + charset",
            "ضيف DOCTYPE و lang و charset",
          ),
          opt(
            "b",
            'Wrap everything in <div id="root">',
            'لف كله في <div id="root">',
          ),
          opt("c", "Replace <head> with <meta>", "بدّل <head> بـ <meta>"),
          opt(
            "d",
            "Skip <body> on landing pages",
            "شيل <body> في الـ landing pages",
          ),
        ],
        "a",
        L(
          "A real document needs `<!DOCTYPE html>`, `lang` on `<html>`, and charset early in `<head>`.",
          "الـ document الحقيقي محتاج `<!DOCTYPE html>` و `lang` على `<html>` و charset بدري في `<head>`.",
        ),
        {
          code: `<html>\n  <head></head>\n  <body></body>\n</html>`,
          language: "html",
        },
      ),
      q(
        "q3",
        L("Where should charset live?", "الـ charset المفروض يعيش فين؟"),
        [
          opt("a", "Anywhere in <body>", "في أي حتة في <body>"),
          opt(
            "b",
            "After the first 1024 bytes is fine",
            "بعد أول 1024 bytes عادي",
          ),
          opt(
            "c",
            "In <head>, as early as possible",
            "في <head> بدري قد ما تقدر",
          ),
          opt("d", "Only in CSS @charset", "في CSS @charset بس"),
        ],
        "c",
        L(
          'Browsers sniff encoding early — put `<meta charset="UTF-8">` near the top of `<head>`.',
          'المتصفحات بتقرأ الـ encoding بدري — حط `<meta charset="UTF-8">` في أول `<head>`.',
        ),
        {
          code: `<head>\n  <title>FrontendCraft</title>\n  <meta charset="UTF-8" />\n</head>`,
          language: "html",
        },
      ),
      q(
        "q4",
        L(
          "Why put `lang` on the `<html>` element?",
          "ليه تحط `lang` على عنصر `<html>`؟",
        ),
        [
          opt(
            "a",
            "Helps AT pick pronunciation and spell-check language",
            "بيساعد AT يختار النطق ولغة التدقيق",
          ),
          opt("b", "Required for CSS Grid only", "مطلوب لـ CSS Grid بس"),
          opt("c", "It sets the favicon", "بيحدد الـ favicon"),
          opt("d", "It disables JavaScript", "بيعطّل JavaScript"),
        ],
        "a",
        L(
          "`lang` tells assistive tech and browsers which language the page uses.",
          "`lang` بيقول لـ assistive tech والمتصفحات لغة الصفحة.",
        ),
        {
          code: `<html lang="ar">`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "Where does the page title shown in the browser tab belong?",
          "عنوان الصفحة اللي في تاب المتصفح مكانه فين؟",
        ),
        [
          opt("a", "In <body> as the first h1", "في <body> كأول h1"),
          opt("b", "In <head> inside <title>", "في <head> جوّه <title>"),
          opt("c", "In a CSS file", "في ملف CSS"),
          opt("d", "In a meta og:title only", "في meta og:title بس"),
        ],
        "b",
        L(
          "`<title>` lives in `<head>` — it drives tabs, bookmarks, and search snippets.",
          "`<title>` مكانه في `<head>` — بيخدم التابات والـ bookmarks ونتائج البحث.",
        ),
      ),
    ],
  },

  "semantic-structure": {
    title: L("Semantic structure check", "اختبار الـ semantic structure"),
    questions: [
      q(
        "q1",
        L(
          "Pick the landmark shell screen readers can jump through:",
          "اختار هيكل landmarks قارئات الشاشة تقدر تقفز عليه:",
        ),
        [
          opt("a", "Div soup with classes", "Div soup بـ classes"),
          opt("b", "header + nav + main + footer", "header + nav + main + footer"),
          opt("c", "Only nested spans", "spans متداخلة بس"),
          opt("d", "One giant section for everything", "section واحدة لكل حاجة"),
        ],
        "b",
        L(
          "Native landmarks give assistive tech jump targets without ARIA gymnastics.",
          "الـ landmarks الأصلية بتدي assistive tech قفزات من غير ARIA زيادة.",
        ),
        {
          code: `<div class="header"></div>\n<div class="main"></div>`,
          language: "html",
        },
      ),
      q(
        "q2",
        L("How many `<main>` elements should a page have?", "كام `<main>` في الصفحة؟"),
        [
          opt("a", "As many as you want", "قد ما تحب"),
          opt("b", "One primary <main>", "<main> أساسي واحد"),
          opt("c", "Zero — use div#content", "صفر — استخدم div#content"),
          opt("d", "One per section", "واحد لكل section"),
        ],
        "b",
        L(
          "One `<main>` marks the primary content region for the page.",
          "`<main>` واحد بيعلّم منطقة المحتوى الأساسية في الصفحة.",
        ),
      ),
      q(
        "q3",
        L(
          "When should you prefer `<article>` over a plain `<div>`?",
          "إمتى تفضّل `<article>` عن `<div>` عادي؟",
        ),
        [
          opt("a", "Whenever you need a box", "لما تحتاج صندوق"),
          opt(
            "b",
            "For self-contained content that could stand alone",
            "لمحتوى مستقل يقدر يعيش لوحده",
          ),
          opt("c", "Only inside tables", "جوّه tables بس"),
          opt("d", "Never — article is deprecated", "أبدًا — article deprecated"),
        ],
        "b",
        L(
          "`<article>` is for self-contained pieces (posts, cards) — choose by meaning, not looks.",
          "`<article>` للمحتوى المستقل (posts و cards) — اختار بالمعنى مش بالشكل.",
        ),
      ),
      q(
        "q4",
        L(
          "When is `<section>` a better fit than `<article>`?",
          "إمتى `<section>` أنسب من `<article>`؟",
        ),
        [
          opt(
            "a",
            "Thematic grouping inside a page, not a standalone piece",
            "تجميع موضوعي جوّه الصفحة، مش قطعة مستقلة",
          ),
          opt("b", "Any div replacement", "بديل لأي div"),
          opt("c", "Only for footers", "للـ footers بس"),
          opt("d", "Never — section is deprecated", "أبدًا — section deprecated"),
        ],
        "a",
        L(
          "`<section>` groups related content with a heading; `<article>` is self-contained.",
          "`<section>` بيجمّع محتوى مرتبط بعنوان؛ `<article>` محتوى مستقل.",
        ),
      ),
      q(
        "q5",
        L(
          "What is `<aside>` typically used for?",
          "`<aside>` غالبًا بتستخدم لإيه؟",
        ),
        [
          opt(
            "a",
            "Tangential content (sidebar, pull quotes, related links)",
            "محتوى جانبي (sidebar، اقتباسات، لينكات مرتبطة)",
          ),
          opt("b", "The main article body", "جسم المقال الأساسي"),
          opt("c", "Replacing <nav>", "بدل <nav>"),
          opt("d", "Hidden SEO keywords", "كلمات SEO مخفية"),
        ],
        "a",
        L(
          "`<aside>` marks content indirectly related to the main flow — sidebars, ads, tips.",
          "`<aside>` بيعلّم محتوى مرتبط بشكل غير مباشر — sidebars وإعلانات ونصائح.",
        ),
      ),
    ],
  },

  "text-headings": {
    title: L("Headings check", "اختبار الـ headings"),
    questions: [
      q(
        "q1",
        L("How many `<h1>` headings should a page usually have?", "كام `<h1>` المفروض في الصفحة؟"),
        [
          opt("a", "One main <h1>", "<h1> رئيسي واحد"),
          opt("b", "One per paragraph", "واحد لكل فقرة"),
          opt("c", "Skip h1 and start at h3", "تخطّي h1 وابدأ من h3"),
          opt("d", "As many as your design needs", "قد ما الديزاين محتاج"),
        ],
        "a",
        L(
          "One clear `<h1>` is the page’s main title in the document outline.",
          "`<h1>` واضح واحد هو عنوان الصفحة في الـ outline.",
        ),
      ),
      q(
        "q2",
        L(
          "What is wrong with jumping from `<h1>` straight to `<h4>`?",
          "إيه الغلط في القفز من `<h1>` لـ `<h4>` مباشرة؟",
        ),
        [
          opt("a", "Browsers refuse to render it", "المتصفح مش هيعرضه"),
          opt(
            "b",
            "It breaks a logical outline for readers and AT",
            "بيكسر outline منطقي للقراء و AT",
          ),
          opt("c", "CSS cannot style h4 after h1", "CSS مش بيشتغل على h4 بعد h1"),
          opt("d", "Nothing — levels are only visual", "مفيش — المستويات شكل بس"),
        ],
        "b",
        L(
          "Heading levels communicate hierarchy — don’t skip levels for styling.",
          "مستويات الـ headings بتعبّر عن hierarchy — متتخطّاش levels عشان الشكل.",
        ),
      ),
      q(
        "q3",
        L(
          "Which is the better way to make a subtitle look smaller?",
          "أحسن طريقة تخلي subtitle أصغر شكلًا؟",
        ),
        [
          opt(
            "a",
            "Use a lower heading level only for size",
            "استخدم heading أقل بس عشان المقاس",
          ),
          opt(
            "b",
            "Keep the correct heading level and style with CSS",
            "خلّي مستوى الـ heading صح وستايل بـ CSS",
          ),
          opt("c", "Wrap text in <font size>", "لف النص في <font size>"),
          opt("d", "Use <h1> twice with different colors", "استخدم <h1> مرتين بألوان مختلفة"),
        ],
        "b",
        L(
          "Semantics first: pick the right heading level, then style appearance with CSS.",
          "الـ semantics أولًا: اختار مستوى الـ heading الصح، وبعدين الشكل بـ CSS.",
        ),
      ),
      q(
        "q4",
        L(
          "Why do heading levels matter for screen readers?",
          "ليه مستويات الـ headings مهمة لقارئات الشاشة؟",
        ),
        [
          opt(
            "a",
            "They build a document outline users can navigate",
            "بتبني outline المستخدم يقدر يتنقل فيه",
          ),
          opt("b", "They set font size only", "بتحدد حجم الخط بس"),
          opt("c", "They replace alt text", "بديل alt text"),
          opt("d", "They enable lazy loading", "بتفعّل lazy loading"),
        ],
        "a",
        L(
          "AT users jump by heading level — a logical outline is a navigation map.",
          "مستخدمي AT بيقفزوا بالـ heading level — outline منطقي خريطة تنقل.",
        ),
      ),
      q(
        "q5",
        L(
          "Which practice misuses headings?",
          "أنهي ممارسة بتسيء استخدام headings؟",
        ),
        [
          opt(
            "a",
            "Picking h3 because it looks smaller in the design",
            "اختيار h3 عشان أصغر في الديزاين",
          ),
          opt(
            "b",
            "One h1 for the page title",
            "h1 واحد لعنوان الصفحة",
          ),
          opt("c", "Nested sections each with a heading", "sections متداخلة كل واحدة بعنوان"),
          opt("d", "Using CSS for visual size", "استخدام CSS للمقاس الشكلي"),
        ],
        "a",
        L(
          "Heading levels express structure, not appearance — never pick a level for styling.",
          "مستويات الـ headings بتعبّر عن الـ structure مش الشكل — متختارش level عشان الستايل.",
        ),
      ),
    ],
  },

  "text-formatting": {
    title: L("Text formatting check", "اختبار تنسيق النص"),
    questions: [
      q(
        "q1",
        L(
          "Which tag marks strong importance for assistive tech?",
          "أنهي tag بيعلّم أهمية قوية لـ assistive tech؟",
        ),
        [
          opt("a", "CSS-only bold", "bold بـ CSS بس"),
          opt("b", "Semantic <strong>", "<strong> semantic"),
          opt("c", "Stylistic <b> only", "<b> شكلي بس"),
          opt("d", "<span class=\"loud\">", "<span class=\"loud\">"),
        ],
        "b",
        L(
          "`<strong>` means importance. `<b>` is usually stylistic; CSS bold alone is not semantic.",
          "`<strong>` تعني أهمية. `<b>` غالبًا شكلي؛ الـ bold من CSS لوحده مش semantic.",
        ),
        {
          code: `<span style="font-weight:bold">Important</span>`,
          language: "html",
        },
      ),
      q(
        "q2",
        L("When is `<em>` the right choice?", "إمتى `<em>` هو الاختيار الصح؟"),
        [
          opt("a", "To italicize a whole article for looks", "عشان تميل مقال كامل للشكل"),
          opt(
            "b",
            "To stress emphasis that changes meaning",
            "للتأكيد اللي بيغيّر المعنى",
          ),
          opt("c", "Instead of headings", "بدل الـ headings"),
          opt("d", "For every foreign word forever", "لكل كلمة أجنبية دايمًا"),
        ],
        "b",
        L(
          "`<em>` conveys stress/emphasis. Use CSS for pure visual italics.",
          "`<em>` بيوصل تأكيد/emphasis. استخدم CSS للإمالة الشكلية بس.",
        ),
      ),
      q(
        "q3",
        L("What does `<mark>` communicate?", "`<mark>` بيوصل إيه؟"),
        [
          opt("a", "Deleted text", "نص محذوف"),
          opt(
            "b",
            "Relevance / highlight in context",
            "أهمية / تظليل في السياق",
          ),
          opt("c", "A keyboard shortcut", "اختصار كيبورد"),
          opt("d", "Inline code", "كود جوّه السطر"),
        ],
        "b",
        L(
          "`<mark>` highlights text as relevant in the current context (e.g. search hits).",
          "`<mark>` بيظلّل النص كمهم في السياق الحالي (زي نتائج البحث).",
        ),
      ),
      q(
        "q4",
        L(
          "When should you use `<pre>` with `<code>`?",
          "إمتى تستخدم `<pre>` مع `<code>`؟",
        ),
        [
          opt(
            "a",
            "Multi-line code blocks that preserve whitespace",
            "بلوكات كود متعددة الأسطر تحافظ على المسافات",
          ),
          opt("b", "Any inline variable name", "أي اسم متغير inline"),
          opt("c", "Bold important warnings", "تحذيرات مهمة عريضة"),
          opt("d", "Replacing headings", "بدل headings"),
        ],
        "a",
        L(
          "`<pre>` keeps formatting; wrap `<code>` inside for semantic code blocks.",
          "`<pre>` بيحافظ على التنسيق؛ لف `<code>` جوّاه لبلوكات كود semantic.",
        ),
        {
          code: `<pre><code>const x = 1;</code></pre>`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "What does `<abbr title=\"…\">` provide?",
          "`<abbr title=\"…\">` بيوفر إيه؟",
        ),
        [
          opt(
            "a",
            "An expansion tooltip for abbreviations",
            "tooltip يشرح اختصار",
          ),
          opt("b", "Automatic translation", "ترجمة تلقائية"),
          opt("c", "Bold styling", "ستايل عريض"),
          opt("d", "Link to a glossary page only", "لينك لصفحة glossary بس"),
        ],
        "a",
        L(
          "`<abbr>` marks abbreviations; `title` gives the full form on hover.",
          "`<abbr>` بيعلّم الاختصارات؛ `title` بيدي الصيغة الكاملة عند hover.",
        ),
        {
          code: `<abbr title="HyperText Markup Language">HTML</abbr>`,
          language: "html",
        },
      ),
    ],
  },

  "links-images": {
    title: L("Links & images check", "اختبار اللينكات والصور"),
    questions: [
      q(
        "q1",
        L("Which link is usable and crawlable?", "أنهي لينك قابل للاستخدام والزحف؟"),
        [
          opt("a", "onclick-only span", "span بـ onclick بس"),
          opt("b", "Real <a href=\"...\">", "<a href=\"...\"> حقيقي"),
          opt("c", "div with role=link and no href", "div بـ role=link من غير href"),
          opt("d", "button that fakes navigation only", "button بيعمل navigation وهمي بس"),
        ],
        "b",
        L(
          "Real `<a href>` works with keyboard, middle-click, and crawlers.",
          "`<a href>` الحقيقي بيشتغل مع الكيبورد و middle-click والزواحف.",
        ),
      ),
      q(
        "q2",
        L("What must a meaningful image include?", "الصورة المعنوية لازم تتضمن إيه؟"),
        [
          opt("a", "Only a CSS background", "background CSS بس"),
          opt("b", "src + meaningful alt", "src + alt معنوي"),
          opt("c", "Empty alt on every photo", "alt فاضي على كل صورة"),
          opt("d", "title instead of alt", "title بدل alt"),
        ],
        "b",
        L(
          "`src` loads the image; meaningful `alt` describes it when it conveys information.",
          "`src` بيحمّل الصورة؛ `alt` معنوي بيوصفها لما توصل معلومة.",
        ),
      ),
      q(
        "q3",
        L(
          "When should `alt=\"\"` be used on an image?",
          "إمتى تستخدم `alt=\"\"`؟",
        ),
        [
          opt(
            "a",
            "On decorative images that add no information",
            "على الصور الديكورية اللي مفيهاش معلومة",
          ),
          opt("b", "On every product photo", "على كل صور المنتجات"),
          opt("c", "Never — alt is always required text", "أبدًا — alt نص مطلوب دايمًا"),
          opt("d", "Only when the image fails to load", "لما الصورة تفشل في التحميل بس"),
        ],
        "a",
        L(
          "Empty `alt` marks decorative images so screen readers can skip them.",
          "`alt` الفاضي بيعلّم الصور الديكورية عشان قارئات الشاشة تعدّيها.",
        ),
      ),
      q(
        "q4",
        L(
          "Which link text is best for accessibility and SEO?",
          "أنهي نص لينك أحسن للوصولية و SEO؟",
        ),
        [
          opt(
            "a",
            "Descriptive text like \"View pricing plans\"",
            "نص وصفي زي \"View pricing plans\"",
          ),
          opt("b", "Click here", "Click here"),
          opt("c", "Read more (with no context)", "Read more (من غير سياق)"),
          opt("d", "The raw URL as link text", "الـ URL نفسه كنص لينك"),
        ],
        "a",
        L(
          "Link text should describe the destination — avoid vague \"click here\".",
          "نص اللينك يوصف الوجهة — تجنّب \"click here\" الغامض.",
        ),
      ),
      q(
        "q5",
        L(
          "When using `target=\"_blank\"`, what should you add?",
          "لما تستخدم `target=\"_blank\"`، إيه اللي تضيفه؟",
        ),
        [
          opt(
            "a",
            "rel=\"noopener noreferrer\" (and warn users in context)",
            "rel=\"noopener noreferrer\" (وحذّر المستخدم في السياق)",
          ),
          opt("b", "download attribute always", "download attribute دايمًا"),
          opt("c", "role=\"link\"", "role=\"link\""),
          opt("d", "Nothing — _blank is always safe", "ولا حاجة — _blank آمن دايمًا"),
        ],
        "a",
        L(
          "`noopener noreferrer` closes a tab-napping hole and limits referrer leakage.",
          "`noopener noreferrer` بيسدّ ثغرة tab-napping ويقلّل تسريب الـ referrer.",
        ),
        {
          code: `<a href="https://example.com" target="_blank" rel="noopener noreferrer">Docs</a>`,
          language: "html",
        },
      ),
      q(
        "q6",
        L(
          "Why set width and height on `<img>`?",
          "ليه تحط width و height على `<img>`؟",
        ),
        [
          opt(
            "a",
            "Reserve layout space and reduce CLS",
            "تحجز مساحة layout وتقلّل CLS",
          ),
          opt("b", "HTML requires square images", "HTML بيفرض صور مربعة"),
          opt("c", "It replaces alt text", "بديل alt text"),
          opt("d", "It forces lazy loading", "بيفرض lazy loading"),
        ],
        "a",
        L(
          "Intrinsic dimensions let the browser paint a placeholder before the image loads.",
          "المقاسات الداخلية بتخلي المتصفح يرسم placeholder قبل تحميل الصورة.",
        ),
      ),
    ],
  },

  lists: {
    title: L("Lists check", "اختبار القوائم"),
    questions: [
      q(
        "q1",
        L("Which list fits a step-by-step recipe?", "أنهي list تناسب خطوات وصفة؟"),
        [
          opt("a", "<ul>", "<ul>"),
          opt("b", "<ol>", "<ol>"),
          opt("c", "<dl> only", "<dl> بس"),
          opt("d", "Divs with numbers painted in CSS", "divs وأرقام بـ CSS"),
        ],
        "b",
        L(
          "`<ol>` is for ordered sequences where order matters.",
          "`<ol>` للتسلسل المرتب لما الترتيب يهم.",
        ),
      ),
      q(
        "q2",
        L("What belongs inside `<ul>` / `<ol>`?", "إيه اللي جوّه `<ul>` / `<ol>`؟"),
        [
          opt("a", "Only <li> children (directly)", "أولاد <li> مباشرة"),
          opt("b", "Random <p> siblings", "<p> أخوات عشوائية"),
          opt("c", "Bare text nodes only", "نص فاضي بس"),
          opt("d", "Nested <table> as the only child", "<table> متداخل كابن وحيد"),
        ],
        "a",
        L(
          "List children should be `<li>` elements — keep the structure valid.",
          "أولاد الـ list لازم `<li>` — خلّي الـ structure صحيح.",
        ),
      ),
      q(
        "q3",
        L("When is `<dl>` the right tool?", "إمتى `<dl>` هي الأداة الصح؟"),
        [
          opt("a", "Any bulleted marketing list", "أي قائمة نقاط تسويقية"),
          opt(
            "b",
            "Term/definition pairs (name → meaning)",
            "أزواج مصطلح/تعريف",
          ),
          opt("c", "Navigation menus only", "قوائم التنقل بس"),
          opt("d", "Replacing headings", "بدل الـ headings"),
        ],
        "b",
        L(
          "`<dl>` groups terms (`<dt>`) with definitions (`<dd>`).",
          "`<dl>` بيجمّع المصطلحات (`<dt>`) مع التعريفات (`<dd>`).",
        ),
      ),
      q(
        "q4",
        L(
          "How should nested lists be structured?",
          "إزاي تبني lists متداخلة؟",
        ),
        [
          opt(
            "a",
            "Nest a new <ul>/<ol> inside an <li>",
            "تداخل <ul>/<ol> جديد جوّه <li>",
          ),
          opt("b", "Put <li> directly inside another <li>", "حط <li> مباشرة جوّه <li>"),
          opt("c", "Use divs between list items", "استخدم divs بين عناصر القائمة"),
          opt("d", "Skip <li> on inner levels", "شيل <li> في المستويات الداخلية"),
        ],
        "a",
        L(
          "Valid nesting: the inner list lives inside a parent `<li>`.",
          "التداخل الصحيح: الـ list الداخلية جوّه `<li>` أب.",
        ),
      ),
      q(
        "q5",
        L(
          "Why wrap navigation links in a list?",
          "ليه تلف لينكات التنقل في list؟",
        ),
        [
          opt(
            "a",
            "Screen readers announce item count and list semantics",
            "قارئات الشاشة بتعلن عدد العناصر و semantics القائمة",
          ),
          opt("b", "Browsers require it for CSS", "المتصفح بيفرضه لـ CSS"),
          opt("c", "It enables lazy loading", "بيفعّل lazy loading"),
          opt("d", "It replaces <nav>", "بديل <nav>"),
        ],
        "a",
        L(
          "`<nav><ul><li><a>…` gives AT a clear menu structure.",
          "`<nav><ul><li><a>…` بيدي AT هيكل menu واضح.",
        ),
        {
          code: `<nav aria-label="Main">\n  <ul>\n    <li><a href="/">Home</a></li>\n  </ul>\n</nav>`,
          language: "html",
        },
      ),
    ],
  },

  "forms-inputs": {
    title: L("Forms check", "اختبار الـ forms"),
    questions: [
      q(
        "q1",
        L("How should a label connect to an input?", "اللابل ترتبط بالإدخال إزاي؟"),
        [
          opt("a", "Placeholder text only", "placeholder بس"),
          opt(
            "b",
            "<label for> matching the input id",
            "<label for> يطابق id الإدخال",
          ),
          opt("c", "A nearby <span> with no association", "<span> قريب من غير ربط"),
          opt("d", "title attribute alone", "خاصية title لوحدها"),
        ],
        "b",
        L(
          "`for` + `id` (or wrapping) associates the accessible name with the control.",
          "`for` + `id` (أو اللف) بيربط الاسم الـ accessible بالـ control.",
        ),
      ),
      q(
        "q2",
        L(
          "Why prefer `type=\"email\"` over a plain text field for emails?",
          "ليه `type=\"email\"` أحسن من text عادي للإيميل؟",
        ),
        [
          opt("a", "It emails the form for you", "بيبعت الإيميل لوحده"),
          opt(
            "b",
            "Better mobile keyboards + basic validation hints",
            "كيبورد موبايل أحسن + تلميحات validation",
          ),
          opt("c", "It encrypts the value", "بيشفّر القيمة"),
          opt("d", "It is required by CSS Grid", "مطلوب من CSS Grid"),
        ],
        "b",
        L(
          "Input types improve UX (keyboards) and give the browser useful constraints.",
          "أنواع الـ input بتحسّن UX (الكيبورد) وبتدي المتصفح قيود مفيدة.",
        ),
      ),
      q(
        "q3",
        L(
          "What should a submit control usually be?",
          "الـ submit control غالبًا يكون إيه؟",
        ),
        [
          opt("a", "<div onclick=\"submit()\">", "<div onclick=\"submit()\">"),
          opt("b", "<button type=\"submit\">", "<button type=\"submit\">"),
          opt("c", "<a href=\"#\">Submit</a>", "<a href=\"#\">Submit</a>"),
          opt("d", "<span role=\"button\">", "<span role=\"button\">"),
        ],
        "b",
        L(
          "Native submit buttons work with Enter in fields and without custom JS.",
          "زرار submit الأصلي بيشتغل مع Enter جوّه الحقول ومن غير JS مخصوص.",
        ),
      ),
      q(
        "q4",
        L(
          "Why does every form control need a `name` attribute?",
          "ليه كل form control محتاج `name`؟",
        ),
        [
          opt(
            "a",
            "So submitted data is keyed in the request",
            "عشان بيانات الإرسال تتسمّى في الطلب",
          ),
          opt("b", "For CSS styling only", "للستايل CSS بس"),
          opt("c", "It replaces id", "بديل id"),
          opt("d", "Browsers ignore unnamed inputs", "المتصفح بيتجاهل inputs من غير name"),
        ],
        "a",
        L(
          "Without `name`, the field is not included in form submission.",
          "من غير `name`، الحقل مش بيتبعت مع الـ form.",
        ),
      ),
      q(
        "q5",
        L(
          "What do `<fieldset>` and `<legend>` provide?",
          "`<fieldset>` و `<legend>` بيوفروا إيه؟",
        ),
        [
          opt(
            "a",
            "Grouped controls with an accessible group label",
            "controls مجمّعة بلابل مجموعة accessible",
          ),
          opt("b", "Automatic validation", "validation تلقائي"),
          opt("c", "CSS grid layout", "layout CSS grid"),
          opt("d", "Encryption of values", "تشفير القيم"),
        ],
        "a",
        L(
          "`<legend>` names the group; `<fieldset>` draws a semantic boundary for related inputs.",
          "`<legend>` بيسمّي المجموعة؛ `<fieldset>` بيرسم حدود semantic لحقول مرتبطة.",
        ),
        {
          code: `<fieldset>\n  <legend>Shipping address</legend>\n  …\n</fieldset>`,
          language: "html",
        },
      ),
    ],
  },

  tables: {
    title: L("Tables check", "اختبار الجداول"),
    questions: [
      q(
        "q1",
        L("What are HTML tables for?", "HTML tables معمولة لإيه؟"),
        [
          opt("a", "Page layout columns", "أعمدة تخطيط الصفحة"),
          opt("b", "Tabular data", "بيانات جدولية"),
          opt("c", "Centering logos", "توسيط اللوجوهات"),
          opt("d", "Replacing CSS Grid", "بدل CSS Grid"),
        ],
        "b",
        L(
          "Tables express data relationships — use CSS for layout.",
          "الجداول بتعبّر عن علاقات البيانات — استخدم CSS للـ layout.",
        ),
      ),
      q(
        "q2",
        L("Why mark header cells with `<th>`?", "ليه نعلّم رؤوس الأعمدة بـ `<th>`؟"),
        [
          opt("a", "It makes text bold only", "بيخلي النص عريض بس"),
          opt(
            "b",
            "It associates headers with data for AT",
            "بيربط الرؤوس بالبيانات لـ AT",
          ),
          opt("c", "Browsers require it for borders", "المتصفح بيفرضه للحدود"),
          opt("d", "It enables colspan automatically", "بيفعّل colspan لوحده"),
        ],
        "b",
        L(
          "`<th>` (often with `scope`) gives screen readers the header context for each cell.",
          "`<th>` (غالبًا مع `scope`) بيدي قارئات الشاشة سياق الرأس لكل خلية.",
        ),
      ),
      q(
        "q3",
        L("What does a `<caption>` do?", "`<caption>` بيعمل إيه؟"),
        [
          opt("a", "Hides the table from crawlers", "بيخفي الجدول من الزواحف"),
          opt(
            "b",
            "Names/describes the table for everyone",
            "بيسمّي/يوصف الجدول للجميع",
          ),
          opt("c", "Sorts rows automatically", "بيرتّب الصفوف لوحده"),
          opt("d", "Replaces thead", "بدل thead"),
        ],
        "b",
        L(
          "`<caption>` is the accessible title of the table.",
          "`<caption>` هو عنوان الجدول الـ accessible.",
        ),
      ),
      q(
        "q4",
        L(
          "Why split a table with `<thead>` and `<tbody>`?",
          "ليه تقسّم جدول بـ `<thead>` و `<tbody>`؟",
        ),
        [
          opt(
            "a",
            "Clear header/body structure for AT and styling",
            "structure رأس/جسم واضح لـ AT والستايل",
          ),
          opt("b", "Required for borders only", "مطلوب للحدود بس"),
          opt("c", "It enables sorting automatically", "بيفعّل sorting لوحده"),
          opt("d", "It replaces <th>", "بديل <th>"),
        ],
        "a",
        L(
          "`<thead>` / `<tbody>` separate header rows from data rows semantically.",
          "`<thead>` / `<tbody>` بيفصلوا صفوف الرؤوس عن صفوف البيانات semantically.",
        ),
      ),
      q(
        "q5",
        L(
          "What does `scope=\"col\"` on `<th>` do?",
          "إيه اللي `scope=\"col\"` على `<th>` بيعمله؟",
        ),
        [
          opt(
            "a",
            "Associates the header with its column cells",
            "بيربط الرأس بخلايا العمود",
          ),
          opt("b", "Makes text bold only", "بيخلي النص عريض بس"),
          opt("c", "Enables colspan", "بيفعّل colspan"),
          opt("d", "Hides the column", "بيخفي العمود"),
        ],
        "a",
        L(
          "`scope` helps screen readers map headers to the correct cells.",
          "`scope` بيساعد قارئات الشاشة تربط الرؤوس بالخلايا الصح.",
        ),
      ),
    ],
  },

  "form-ux-attributes": {
    title: L("Form UX attributes check", "اختبار attributes الـ form UX"),
    questions: [
      q(
        "q1",
        L("What does `required` do on an input?", "`required` بيعمل إيه على input؟"),
        [
          opt("a", "Styles the field red forever", "بيلون الحقل أحمر للأبد"),
          opt(
            "b",
            "Blocks submit until the field has a value",
            "بيمنع الإرسال لحد ما الحقل يبقى فيه قيمة",
          ),
          opt("c", "Sends the form twice", "بيبعت الـ form مرتين"),
          opt("d", "Enables autocomplete", "بيفعّل autocomplete"),
        ],
        "b",
        L(
          "Native constraint validation can require a value before submit.",
          "الـ validation الأصلي يقدر يفرض قيمة قبل الإرسال.",
        ),
      ),
      q(
        "q2",
        L("Why set `autocomplete` tokens?", "ليه تحط `autocomplete`؟"),
        [
          opt("a", "To disable all browsers", "عشان تقفل كل المتصفحات"),
          opt(
            "b",
            "So browsers can fill known user data safely",
            "عشان المتصفح يملأ بيانات المستخدم المعروفة بأمان",
          ),
          opt("c", "It is required for CSS", "مطلوب لـ CSS"),
          opt("d", "To replace labels", "بدل اللابلز"),
        ],
        "b",
        L(
          "Correct autocomplete tokens improve UX and password-manager support.",
          "tokens الـ autocomplete الصح بتحسّن UX ودعم مدير كلمات المرور.",
        ),
      ),
      q(
        "q3",
        L("What is `inputmode` mainly for?", "`inputmode` أساسًا لإيه؟"),
        [
          opt(
            "a",
            "Hinting the on-screen keyboard type",
            "تلميح لنوع كيبورد الشاشة",
          ),
          opt("b", "Validating credit cards alone", "validation للكروت لوحده"),
          opt("c", "Replacing type=email", "بدل type=email"),
          opt("d", "Encrypting keystrokes", "تشفير الضغطات"),
        ],
        "a",
        L(
          "`inputmode` hints which mobile keyboard to show — it is not full validation.",
          "`inputmode` بيلمّح لكيبورد الموبايل — مش validation كامل.",
        ),
      ),
      q(
        "q4",
        L(
          "What does the `pattern` attribute do?",
          "attribute `pattern` بيعمل إيه؟",
        ),
        [
          opt(
            "a",
            "Regex constraint checked before submit",
            "قيود regex بتتفحص قبل الإرسال",
          ),
          opt("b", "CSS background pattern", "pattern خلفية CSS"),
          opt("c", "Autocomplete token", "token autocomplete"),
          opt("d", "Placeholder text", "نص placeholder"),
        ],
        "a",
        L(
          "`pattern` adds native regex validation — pair with a clear error message.",
          "`pattern` بيضيف validation regex أصلي — مع رسالة خطأ واضحة.",
        ),
        {
          code: `<input type="text" pattern="[0-9]{5}" title="5 digits" />`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "When are `min` and `max` useful on inputs?",
          "إمتى `min` و `max` مفيدين على inputs؟",
        ),
        [
          opt(
            "a",
            "Numeric/date ranges with native constraint hints",
            "نطاقات رقمية/تاريخ مع تلميحات constraint أصلية",
          ),
          opt("b", "Font size limits", "حدود حجم الخط"),
          opt("c", "Replacing labels", "بديل labels"),
          opt("d", "Only on checkboxes", "على checkboxes بس"),
        ],
        "a",
        L(
          "`min` / `max` give browsers built-in range validation for numbers and dates.",
          "`min` / `max` بيدوا المتصفح validation نطاق مدمج للأرقام والتواريخ.",
        ),
      ),
    ],
  },

  "details-summary": {
    title: L("Details & summary check", "اختبار details و summary"),
    questions: [
      q(
        "q1",
        L(
          "Which pattern builds a native disclosure widget?",
          "أنهي نمط بيعمل disclosure أصلي؟",
        ),
        [
          opt("a", "div + JS class toggle only", "div + JS class toggle بس"),
          opt("b", "<details> + <summary>", "<details> + <summary>"),
          opt("c", "select without options", "select من غير options"),
          opt("d", "hidden iframe", "iframe مخفي"),
        ],
        "b",
        L(
          "`<details>` / `<summary>` give expand/collapse with built-in keyboard behavior.",
          "`<details>` / `<summary>` بيدي فتح/قفل مع سلوك كيبورد مدمج.",
        ),
      ),
      q(
        "q2",
        L("Where does the visible toggle label go?", "فين نص زرار الفتح الظاهر؟"),
        [
          opt("a", "Only in aria-label on a div", "في aria-label على div بس"),
          opt("b", "Inside <summary>", "جوّه <summary>"),
          opt("c", "In a sibling <h1> only", "في <h1> أخ بس"),
          opt("d", "In CSS content", "في CSS content"),
        ],
        "b",
        L(
          "`<summary>` is the disclosure label users activate.",
          "`<summary>` هو عنوان الـ disclosure اللي المستخدم بيفعّله.",
        ),
      ),
      q(
        "q3",
        L(
          "What does the `open` attribute mean on `<details>`?",
          "`open` على `<details>` تعني إيه؟",
        ),
        [
          opt("a", "The widget starts expanded", "الودجت بيبدأ مفتوح"),
          opt("b", "It locks forever", "بيتقفل للأبد"),
          opt("c", "It disables summary", "بيعطّل summary"),
          opt("d", "It submits a form", "بيبعت form"),
        ],
        "a",
        L(
          "`open` sets the default expanded state.",
          "`open` بيحدد حالة الفتح الافتراضية.",
        ),
      ),
      q(
        "q4",
        L(
          "Is `<summary>` required inside `<details>`?",
          "`<summary>` مطلوب جوّه `<details>`؟",
        ),
        [
          opt(
            "a",
            "Yes — it provides the disclosure label",
            "أيوه — بيدي عنوان الـ disclosure",
          ),
          opt("b", "No — use aria-label on details instead", "لا — استخدم aria-label على details"),
          opt("c", "Only when open is set", "بس لما open موجود"),
          opt("d", "Only for forms", "للـ forms بس"),
        ],
        "a",
        L(
          "`<summary>` is the clickable label — without it the widget has no visible toggle.",
          "`<summary>` هو اللابل القابل للضغط — من غيره مفيش toggle ظاهر.",
        ),
      ),
      q(
        "q5",
        L(
          "Caution when building exclusive accordions with `<details>`?",
          "تحذير لما تبني accordions حصرية بـ `<details>`؟",
        ),
        [
          opt(
            "a",
            "Multiple can stay open unless you add JS to close others",
            "أكتر من واحد ممكن يفضل مفتوح من غير JS يقفل الباقي",
          ),
          opt("b", "Browsers only allow one per page", "المتصفح يسمح بواحد بس في الصفحة"),
          opt("c", "summary cannot contain headings", "summary مش ممكن يحتوي headings"),
          opt("d", "details cannot nest", "details مش بتتداخل"),
        ],
        "a",
        L(
          "Native `<details>` does not auto-close siblings — exclusive behavior needs script.",
          "`<details>` الأصلي مش بيقفل الإخوة لوحده — السلوك الحصري محتاج script.",
        ),
      ),
    ],
  },

  "media-embed": {
    title: L("Media & embeds check", "اختبار الوسائط والـ embeds"),
    questions: [
      q(
        "q1",
        L("What should playable video include for accessibility?", "الفيديو القابل للتشغيل يحتاج إيه للوصولية؟"),
        [
          opt("a", "Autoplay with sound always", "autoplay بصوت دايمًا"),
          opt(
            "b",
            "controls (and captions when there is speech)",
            "controls (و captions لو فيه كلام)",
          ),
          opt("c", "No UI — surprise play", "من غير UI — تشغيل مفاجئ"),
          opt("d", "Flash fallback only", "Flash fallback بس"),
        ],
        "b",
        L(
          "Give users controls; caption spoken content.",
          "ادي المستخدم controls؛ وغطّي الكلام بـ captions.",
        ),
      ),
      q(
        "q2",
        L("Why give iframes a `title`?", "ليه الـ iframe محتاج `title`؟"),
        [
          opt("a", "It sets the visual font", "بيحدد الخط"),
          opt(
            "b",
            "It names the frame for assistive tech",
            "بيسمّي الإطار لـ assistive tech",
          ),
          opt("c", "Browsers block untitled iframes", "المتصفح بيمنع iframes من غير title"),
          opt("d", "It enables fullscreen", "بيفعّل fullscreen"),
        ],
        "b",
        L(
          "A descriptive `title` tells screen reader users what the embed is.",
          "`title` وصفي بيقول لمستخدمي قارئات الشاشة الـ embed ده إيه.",
        ),
      ),
      q(
        "q3",
        L("Best practice for autoplay audio?", "أفضل ممارسة لـ autoplay للصوت؟"),
        [
          opt("a", "Always autoplay loud", "autoplay عالي دايمًا"),
          opt(
            "b",
            "Avoid surprise audio — require a user gesture",
            "تجنّب صوت مفاجئ — لازم user gesture",
          ),
          opt("c", "Autoplay only on mobile", "autoplay على الموبايل بس"),
          opt("d", "Mute is never allowed", "الـ mute ممنوع"),
        ],
        "b",
        L(
          "Unexpected sound fails accessibility expectations — opt-in playback.",
          "الصوت المفاجئ بيكسر توقعات الوصولية — خلّي التشغيل اختياري.",
        ),
      ),
      q(
        "q4",
        L(
          "How do you add captions to HTML video?",
          "إزاي تضيف captions لفيديو HTML؟",
        ),
        [
          opt(
            "a",
            "<track kind=\"captions\" src=\"…\" srclang=\"…\">",
            "<track kind=\"captions\" src=\"…\" srclang=\"…\">",
          ),
          opt("b", "alt attribute on <video>", "alt attribute على <video>"),
          opt("c", "title on <source>", "title على <source>"),
          opt("d", "CSS ::after content", "CSS ::after content"),
        ],
        "a",
        L(
          "`<track>` delivers timed text tracks — captions for spoken content.",
          "`<track>` بيوصل مسارات نصية مؤقتة — captions للكلام.",
        ),
        {
          code: `<video controls>\n  <track kind="captions" src="subs.vtt" srclang="en" />\n</video>`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "Why add a `poster` on `<video>`?",
          "ليه تضيف `poster` على `<video>`؟",
        ),
        [
          opt(
            "a",
            "Placeholder image before playback starts",
            "صورة placeholder قبل ما التشغيل يبدأ",
          ),
          opt("b", "Required for autoplay", "مطلوب لـ autoplay"),
          opt("c", "It replaces captions", "بديل captions"),
          opt("d", "It enables lazy loading", "بيفعّل lazy loading"),
        ],
        "a",
        L(
          "`poster` shows a still frame so users see content before pressing play.",
          "`poster` بيعرض إطار ثابت عشان المستخدم يشوف محتوى قبل play.",
        ),
      ),
    ],
  },

  "browser-compatibility": {
    title: L("Browser compatibility check", "اختبار توافق المتصفحات"),
    questions: [
      q(
        "q1",
        L(
          "Safest way to gate a newly available API?",
          "أأمن طريقة تقيّد بيها API جديد؟",
        ),
        [
          opt("a", "User-agent sniffing", "شمّ user-agent"),
          opt("b", "Feature detection", "Feature detection"),
          opt("c", "Assume every engine is Chrome", "افترض إن كل engine كروم"),
          opt("d", "Comment out the feature forever", "عطّل الميزة للأبد"),
        ],
        "b",
        L(
          "Feature detection asks the engine — UA strings lie and rot.",
          "Feature detection بيسأل الـ engine — نصوص الـ UA بتكذب وبتتعفن.",
        ),
        {
          code: `if ("showModal" in HTMLDialogElement.prototype) { … }`,
          language: "javascript",
        },
      ),
      q(
        "q2",
        L("What is W3C Baseline useful for?", "W3C Baseline مفيد في إيه؟"),
        [
          opt(
            "a",
            "Knowing how widely a web feature is supported",
            "تعرف الميزة مدعومة قد إيه على الويب",
          ),
          opt("b", "Replacing all CSS", "بدل كل CSS"),
          opt("c", "Hosting images", "استضافة الصور"),
          opt("d", "Writing SQL", "كتابة SQL"),
        ],
        "a",
        L(
          "Baseline summarizes support so you can plan fallbacks.",
          "Baseline بيلخّص الدعم عشان تخطط للـ fallbacks.",
        ),
      ),
      q(
        "q3",
        L(
          "Before shipping a Newly Baseline feature you should…",
          "قبل ما تنشر ميزة Baseline Newly المفروض…",
        ),
        [
          opt("a", "Ship with no fallback", "تنشر من غير fallback"),
          opt(
            "b",
            "Plan detection + progressive enhancement",
            "تخطط detection + progressive enhancement",
          ),
          opt("c", "Block all non-Chrome users", "تمنع غير مستخدمي كروم"),
          opt("d", "Delete older docs", "تمسح الدوكس القديمة"),
        ],
        "b",
        L(
          "Detect support and keep a usable path for older engines.",
          "اكتشف الدعم وخلّي مسار قابل للاستخدام للمحركات الأقدم.",
        ),
      ),
      q(
        "q4",
        L(
          "What is progressive enhancement?",
          "إيه progressive enhancement؟",
        ),
        [
          opt(
            "a",
            "Start with a working baseline, layer enhancements when supported",
            "ابدأ بـ baseline شغّال، وزّود تحسينات لما الدعم موجود",
          ),
          opt("b", "Block old browsers entirely", "امنع المتصفحات القديمة بالكامل"),
          opt("c", "Ship only the newest API", "انشر أحدث API بس"),
          opt("d", "Detect by user-agent string only", "اكتشف بـ user-agent string بس"),
        ],
        "a",
        L(
          "Core content works everywhere; newer features enhance when available.",
          "المحتوى الأساسي يشتغل في كل حتة؛ الميزات الأحدث بتزود لما متاحة.",
        ),
      ),
      q(
        "q5",
        L(
          "Why avoid user-agent sniffing for feature gating?",
          "ليه نتجنّب user-agent sniffing لتقييد الميزات؟",
        ),
        [
          opt(
            "a",
            "UA strings lie, change, and rot — feature detection is reliable",
            "نصوص UA بتكذب وتتغيّر — feature detection أوثق",
          ),
          opt("b", "It is slower than CSS", "أبطأ من CSS"),
          opt("c", "Browsers ban it", "المتصفحات بتمنعه"),
          opt("d", "It breaks HTML parsing", "بيكسر parsing HTML"),
        ],
        "a",
        L(
          "Test capabilities, not browser brands — UA sniffing breaks on updates and spoofing.",
          "اختبر القدرات مش ماركات المتصفح — UA sniffing بيتكسر مع التحديثات والتزييف.",
        ),
      ),
    ],
  },

  "native-dialog": {
    title: L("Native dialog check", "اختبار الـ dialog الأصلي"),
    questions: [
      q(
        "q1",
        L("How should you open a modal dialog?", "تفتح modal dialog إزاي؟"),
        [
          opt("a", "Toggle a CSS class on a div", "تبدّل class على div"),
          opt("b", "dialog.showModal()", "dialog.showModal()"),
          opt("c", "window.alert only", "window.alert بس"),
          opt("d", "display:none forever", "display:none للأبد"),
        ],
        "b",
        L(
          "`showModal()` gives top-layer, backdrop, and focus trap from the engine.",
          "`showModal()` بيدي top-layer و backdrop و focus trap من الـ engine.",
        ),
      ),
      q(
        "q2",
        L("What does Escape typically do on a modal dialog?", "Escape عادةً بيعمل إيه؟"),
        [
          opt("a", "Nothing", "ولا حاجة"),
          opt("b", "Dismisses / closes the modal", "بيقفل الـ modal"),
          opt("c", "Submits the form", "بيبعت الـ form"),
          opt("d", "Reloads the page", "بيرفرّش الصفحة"),
        ],
        "b",
        L(
          "Native modal dialogs handle Escape dismissal by default.",
          "الـ modal الأصلي بيتعامل مع قفل Escape افتراضيًا.",
        ),
      ),
      q(
        "q3",
        L(
          "Why prefer `<dialog>` over a custom overlay div?",
          "ليه `<dialog>` أحسن من overlay div مخصوص؟",
        ),
        [
          opt(
            "a",
            "Built-in accessibility & top-layer behavior",
            "سلوك accessibility و top-layer مدمج",
          ),
          opt("b", "It is the only way to use CSS", "الطريقة الوحيدة لـ CSS"),
          opt("c", "It blocks all JavaScript", "بيمنع كل JavaScript"),
          opt("d", "It replaces <form>", "بدل <form>"),
        ],
        "a",
        L(
          "The platform handles focus, backdrop, and layering when you use the native element.",
          "المنصة بتتولى الـ focus والـ backdrop والطبقات لما تستخدم العنصر الأصلي.",
        ),
      ),
      q(
        "q4",
        L(
          "How can a form inside `<dialog>` close the modal on submit?",
          "إزاي form جوّه `<dialog>` يقفل الـ modal عند الإرسال؟",
        ),
        [
          opt(
            "a",
            "<form method=\"dialog\"> with a submit button",
            "<form method=\"dialog\"> مع زرار submit",
          ),
          opt("b", "method=\"post\" only", "method=\"post\" بس"),
          opt("c", "autocomplete=\"off\"", "autocomplete=\"off\""),
          opt("d", "role=\"form\" on a div", "role=\"form\" على div"),
        ],
        "a",
        L(
          "`method=\"dialog\"` closes the dialog and returns the submitter as `returnValue`.",
          "`method=\"dialog\"` بيقفل الـ dialog ويرجّع الـ submitter كـ `returnValue`.",
        ),
        {
          code: `<dialog id="d">\n  <form method="dialog">\n    <button value="ok">Save</button>\n  </form>\n</dialog>`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "What does the modal dialog focus trap do?",
          "focus trap في modal dialog بيعمل إيه؟",
        ),
        [
          opt(
            "a",
            "Keeps Tab cycling inside the dialog while open",
            "Tab يدور جوّه الـ dialog طول ما مفتوح",
          ),
          opt("b", "Disables all keyboard input", "بيعطّل كل إدخال الكيبورد"),
          opt("c", "Focuses the browser URL bar", "يركّز على شريط URL"),
          opt("d", "Only works with aria-modal", "بيشتغل مع aria-modal بس"),
        ],
        "a",
        L(
          "`showModal()` traps focus so users cannot Tab into the page behind.",
          "`showModal()` بيحبس الـ focus عشان المستخدم ما يقدرش Tab للصفحة ورا.",
        ),
      ),
    ],
  },

  "picture-source": {
    title: L("Picture & source check", "اختبار picture و source"),
    questions: [
      q(
        "q1",
        L("What is `<picture>` mainly for?", "`<picture>` أساسًا لإيه؟"),
        [
          opt(
            "a",
            "Art direction / format / density choices",
            "اختيارات art direction / format / density",
          ),
          opt("b", "Replacing <video>", "بدل <video>"),
          opt("c", "Storing passwords", "تخزين كلمات المرور"),
          opt("d", "Defining fonts", "تعريف الخطوط"),
        ],
        "a",
        L(
          "`<picture>` lets you pick sources by media, type, or density.",
          "`<picture>` بيخلّيك تختار مصادر حسب media أو type أو density.",
        ),
      ),
      q(
        "q2",
        L("Why keep an `<img>` inside `<picture>`?", "ليه تسيب `<img>` جوّه `<picture>`؟"),
        [
          opt(
            "a",
            "It is the final fallback + required content image",
            "هو الـ fallback النهائي وصورة المحتوى المطلوبة",
          ),
          opt("b", "Browsers ignore img otherwise", "المتصفح بيتجاهل img غير كده"),
          opt("c", "Only for SEO keywords", "للكلمات المفتاحية بس"),
          opt("d", "It disables lazy loading", "بيعطّل lazy loading"),
        ],
        "a",
        L(
          "The `<img>` is what renders (with alt) when no source matches — and always carries alt.",
          "`<img>` هو اللي بيتعرض (مع alt) لما مفيش source مناسب — ودايمًا شايل alt.",
        ),
      ),
      q(
        "q3",
        L(
          "What does `<source type=\"image/avif\">` communicate?",
          "`<source type=\"image/avif\">` بيوصل إيه؟",
        ),
        [
          opt(
            "a",
            "Offer AVIF when the browser supports it",
            "قدّم AVIF لو المتصفح بيدعمه",
          ),
          opt("b", "Force download of a PDF", "فرض تحميل PDF"),
          opt("c", "Enable CSS Grid", "تفعيل CSS Grid"),
          opt("d", "Mute audio", "كتم الصوت"),
        ],
        "a",
        L(
          "`type` helps the browser pick a supported image format.",
          "`type` بيساعد المتصفح يختار فورمات صورة مدعوم.",
        ),
      ),
      q(
        "q4",
        L(
          "When is the `media` attribute on `<source>` used?",
          "إمتى attribute `media` على `<source>` بيستخدم؟",
        ),
        [
          opt(
            "a",
            "Art direction — pick a crop for a viewport breakpoint",
            "Art direction — اختار crop لـ viewport breakpoint",
          ),
          opt("b", "Lazy loading hint", "تلميح lazy loading"),
          opt("c", "Alt text override", "بديل alt text"),
          opt("d", "SEO keywords", "كلمات SEO"),
        ],
        "a",
        L(
          "`media` selects sources by viewport — different crops for different screens.",
          "`media` بيختار مصادر حسب الـ viewport — crops مختلفة لشاشات مختلفة.",
        ),
        {
          code: `<source media="(min-width: 800px)" srcset="wide.jpg" />`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "Resolution switching vs art direction — which uses `srcset` on `<img>`?",
          "Resolution switching مقابل art direction — أنهي بيستخدم `srcset` على `<img>`؟",
        ),
        [
          opt(
            "a",
            "Resolution switching (density/size variants of the same crop)",
            "Resolution switching (variants density/مقاس لنفس الـ crop)",
          ),
          opt("b", "Art direction only", "Art direction بس"),
          opt("c", "Neither — srcset is deprecated", "ولا واحد — srcset deprecated"),
          opt("d", "Both always require picture", "الاتنين دايمًا محتاجين picture"),
        ],
        "a",
        L(
          "Same composition at different resolutions → `srcset` on `<img>`; different crops → `<picture>` + `media`.",
          "نفس التكوين بمقاسات مختلفة → `srcset` على `<img>`؛ crops مختلفة → `<picture>` + `media`.",
        ),
      ),
    ],
  },

  "accessibility-basics": {
    title: L("Accessibility basics check", "اختبار أساسيات الوصولية"),
    questions: [
      q(
        "q1",
        L(
          "Which control is ready for keyboard + screen readers?",
          "أنهي control جاهز للكيبورد و screen readers؟",
        ),
        [
          opt("a", "Div with onclick", "Div بـ onclick"),
          opt("b", "Native <button>", "<button> أصلي"),
          opt("c", "Span with cursor:pointer", "Span بـ cursor:pointer"),
          opt("d", "Background image only", "صورة خلفية بس"),
        ],
        "b",
        L(
          "Native `<button>` ships role, focus, and Enter/Space for free.",
          "`<button>` الأصلي بيجيب role و focus و Enter/Space من غير تعب.",
        ),
        {
          code: `<div onclick="save()">Save</div>`,
          language: "html",
        },
      ),
      q(
        "q2",
        L("Why does visible focus matter?", "ليه الـ focus الظاهر مهم؟"),
        [
          opt(
            "a",
            "Keyboard users need to see where they are",
            "مستخدمي الكيبورد محتاجين يشوفوا هم فين",
          ),
          opt("b", "It speeds up CSS parsing", "بيسرّع parsing الـ CSS"),
          opt("c", "It is only for developers", "للمطورين بس"),
          opt("d", "Browsers ban outline always", "المتصفح بيمنع outline دايمًا"),
        ],
        "a",
        L(
          "Don’t remove focus styles without providing a clear replacement.",
          "متشلّش ستايل الـ focus من غير بديل واضح.",
        ),
      ),
      q(
        "q3",
        L("Name vs role — which statement is true?", "الاسم مقابل الـ role — أنهي جملة صح؟"),
        [
          opt(
            "a",
            "Accessible name is how AT announces the control",
            "الاسم الـ accessible هو اللي AT بتعلن بيه الـ control",
          ),
          opt("b", "Role replaces the need for labels", "الـ role بيلغي اللابلز"),
          opt("c", "Only color conveys name", "اللون لوحده بيوصل الاسم"),
          opt("d", "Placeholders are enough as names", "الـ placeholders تكفي كأسماء"),
        ],
        "a",
        L(
          "Labels (and names) tell assistive tech what the control is called.",
          "اللابلز (والأسماء) بتقول لـ assistive tech اسم الـ control.",
        ),
      ),
      q(
        "q4",
        L(
          "When should you reach for ARIA?",
          "إمتى تلجأ لـ ARIA؟",
        ),
        [
          opt(
            "a",
            "When native HTML cannot express the needed semantics/state",
            "لما HTML الأصلي مش قادر يعبّر عن الـ semantics/state المطلوب",
          ),
          opt("b", "Instead of labels on every input", "بدل labels على كل input"),
          opt("c", "To replace all buttons with divs", "عشان تبدّل كل buttons بـ divs"),
          opt("d", "Always — ARIA beats native HTML", "دايمًا — ARIA أحسن من HTML الأصلي"),
        ],
        "a",
        L(
          "First rule of ARIA: use native HTML when it can do the job.",
          "أول قاعدة في ARIA: استخدم HTML الأصلي لما يقدر يعمل المطلوب.",
        ),
      ),
      q(
        "q5",
        L(
          "Why must interactive controls be keyboard reachable?",
          "ليه الـ controls التفاعلية لازم تكون reachable بالكيبورد؟",
        ),
        [
          opt(
            "a",
            "Many users navigate without a mouse",
            "كتير من المستخدمين بيتنقلوا من غير ماوس",
          ),
          opt("b", "Browsers require it for CSS", "المتصفح بيفرضه لـ CSS"),
          opt("c", "It speeds up image loading", "بيسرّع تحميل الصور"),
          opt("d", "Only for screen reader users", "لمستخدمي screen reader بس"),
        ],
        "a",
        L(
          "Keyboard access is a baseline — Tab, Enter, and Space must work.",
          "الوصول بالكيبورد baseline — Tab و Enter و Space لازم يشتغلوا.",
        ),
      ),
    ],
  },

  "meta-seo": {
    title: L("Meta & SEO check", "اختبار الـ meta و SEO"),
    questions: [
      q(
        "q1",
        L(
          "Which pattern is ready for crawl → render → index?",
          "أنهي نمط جاهز لمسار crawl → render → index؟",
        ),
        [
          opt("a", "Empty CSR shell", "CSR shell فاضي"),
          opt(
            "b",
            "SSR title + main + real links",
            "SSR title + main + لينكات حقيقية",
          ),
          opt("c", "Images only, no text", "صور بس من غير نص"),
          opt("d", "iframe-only homepage", "homepage من iframe بس"),
        ],
        "b",
        L(
          "Ship title, primary copy, and real `<a href>` links in the first HTML.",
          "اطلع title والنص الأساسي ولينكات `<a href>` في أول HTML.",
        ),
      ),
      q(
        "q2",
        L("What does a canonical link help with?", "اللينك الـ canonical بيساعد في إيه؟"),
        [
          opt(
            "a",
            "Pointing crawlers at the preferred URL",
            "توجيه الزواحف للـ URL المفضّل",
          ),
          opt("b", "Compressing images", "ضغط الصور"),
          opt("c", "Enabling dark mode", "تفعيل الوضع الداكن"),
          opt("d", "Replacing h1", "بدل h1"),
        ],
        "a",
        L(
          "Canonical hints which URL should be treated as the primary version.",
          "الـ canonical بيلمّح أنهي URL هو النسخة الأساسية.",
        ),
      ),
      q(
        "q3",
        L("Why write a unique `<title>` per page?", "ليه `<title>` فريد لكل صفحة؟"),
        [
          opt(
            "a",
            "Tabs, bookmarks, and search results use it",
            "التابات والـ bookmarks ونتائج البحث بتستخدمه",
          ),
          opt("b", "It sets the H1 automatically", "بيضبط H1 لوحده"),
          opt("c", "It is ignored by browsers", "المتصفح بيتجاهله"),
          opt("d", "It enables Service Workers", "بيفعّل Service Workers"),
        ],
        "a",
        L(
          "Title is primary metadata for humans and crawlers.",
          "الـ title metadata أساسية للبشر والزواحف.",
        ),
      ),
      q(
        "q4",
        L(
          "What is a meta description mainly for?",
          "meta description أساسًا لإيه؟",
        ),
        [
          opt(
            "a",
            "Search snippet text — not a ranking guarantee",
            "نص snippet في البحث — مش ضمان ترتيب",
          ),
          opt("b", "Replacing the h1", "بديل h1"),
          opt("c", "Encrypting page content", "تشفير محتوى الصفحة"),
          opt("d", "Setting favicon", "تحديد favicon"),
        ],
        "a",
        L(
          "A clear meta description can appear in results — write for humans, one per page.",
          "meta description واضح ممكن يظهر في النتائج — اكتبه للبشر، واحد لكل صفحة.",
        ),
        {
          code: `<meta name="description" content="Learn semantic HTML…" />`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "What does `<meta name=\"robots\" content=\"noindex\">` tell crawlers?",
          "`<meta name=\"robots\" content=\"noindex\">` بيقول للزواحف إيه؟",
        ),
        [
          opt(
            "a",
            "Do not index this page in search results",
            "ما تفهرسش الصفحة في نتائج البحث",
          ),
          opt("b", "Block all CSS", "امنع كل CSS"),
          opt("c", "Disable JavaScript", "عطّل JavaScript"),
          opt("d", "Force canonical URL", "فرض canonical URL"),
        ],
        "a",
        L(
          "Use `noindex` deliberately for staging, thank-you pages, or duplicates you don’t want indexed.",
          "استخدم `noindex` بقصد لصفحات staging أو thank-you أو duplicates مش عايزها تتفهرس.",
        ),
      ),
    ],
  },

  "head-social-meta": {
    title: L("Social meta check", "اختبار social meta"),
    questions: [
      q(
        "q1",
        L("What are Open Graph tags mainly for?", "وسوم Open Graph أساسًا لإيه؟"),
        [
          opt(
            "a",
            "Rich link previews on social platforms",
            "معاينات لينك غنية على السوشيال",
          ),
          opt("b", "Database indexing", "فهرسة قواعد البيانات"),
          opt("c", "Replacing CSS", "بدل CSS"),
          opt("d", "Authenticating users", "توثيق المستخدمين"),
        ],
        "a",
        L(
          "og:title / og:image / og:description shape how shares look.",
          "og:title و og:image و og:description بتحدد شكل المشاركة.",
        ),
      ),
      q(
        "q2",
        L("Where do social meta tags belong?", "فين مكان social meta؟"),
        [
          opt("a", "In <body> only", "في <body> بس"),
          opt("b", "In <head>", "في <head>"),
          opt("c", "In a CSS file", "في ملف CSS"),
          opt("d", "In localStorage", "في localStorage"),
        ],
        "b",
        L(
          "Metadata for crawlers and apps belongs in `<head>`.",
          "الـ metadata للزواحف والتطبيقات مكانها في `<head>`.",
        ),
      ),
      q(
        "q3",
        L(
          "Why keep og:image dimensions reasonable?",
          "ليه مقاسات og:image تفضل معقولة؟",
        ),
        [
          opt(
            "a",
            "Faster fetches and cleaner previews",
            "تحميل أسرع ومعاينة أنظف",
          ),
          opt("b", "HTML forbids large images", "HTML بيمنع الصور الكبيرة"),
          opt("c", "It enables WebGL", "بيفعّل WebGL"),
          opt("d", "It sets favicon size", "بيحدد مقاس الـ favicon"),
        ],
        "a",
        L(
          "Huge share images slow crawlers and look broken when cropped.",
          "صور المشاركة الضخمة بتبطّئ الزواحف وبتنكسر مع القص.",
        ),
      ),
      q(
        "q4",
        L(
          "What do Twitter Card tags (`twitter:card`, etc.) control?",
          "وسوم Twitter Card (`twitter:card`، إلخ) بتتحكم في إيه؟",
        ),
        [
          opt(
            "a",
            "How links preview on X/Twitter",
            "شكل معاينة اللينكات على X/Twitter",
          ),
          opt("b", "Database connection strings", "connection strings لقواعد البيانات"),
          opt("c", "CSS theme colors", "ألوان ثيم CSS"),
          opt("d", "Service Worker scope", "نطاق Service Worker"),
        ],
        "a",
        L(
          "Twitter reads its own meta tags — mirror og:* where sensible and add twitter:* specifics.",
          "Twitter بيقرأ meta tags خاصة — زوّد og:* حيث ينفع و twitter:* للتفاصيل.",
        ),
      ),
      q(
        "q5",
        L(
          "Why should og:image URLs be absolute?",
          "ليه og:image URLs تكون absolute؟",
        ),
        [
          opt(
            "a",
            "Crawlers fetching previews may not resolve relative paths",
            "زواحف المعاينة ممكن ما تحلّش relative paths",
          ),
          opt("b", "HTML forbids relative images", "HTML بيمنع relative images"),
          opt("c", "It enables lazy loading", "بيفعّل lazy loading"),
          opt("d", "Required for alt text", "مطلوب لـ alt text"),
        ],
        "a",
        L(
          "Use full `https://…` URLs so social crawlers can fetch the image reliably.",
          "استخدم URLs كاملة `https://…` عشان زواحف السوشيال تجيب الصورة بثقة.",
        ),
        {
          code: `<meta property="og:image" content="https://example.com/share.jpg" />`,
          language: "html",
        },
      ),
    ],
  },

  "sr-practice": {
    title: L("Screen reader practice check", "اختبار ممارسة قارئات الشاشة"),
    questions: [
      q(
        "q1",
        L(
          "Which pattern is ready for keyboard + screen readers?",
          "أنهي نمط جاهز للكيبورد و screen readers؟",
        ),
        [
          opt(
            "a",
            "Focusable control inside aria-hidden",
            "control عليه focus جوّه aria-hidden",
          ),
          opt(
            "b",
            "Native control + clear name + matching state",
            "Native control + اسم واضح + state مطابق",
          ),
          opt("c", "Click-only div", "div بالضغط بس"),
          opt("d", "Outline:none with no replacement", "outline:none من غير بديل"),
        ],
        "b",
        L(
          "Never leave Tab stops inside `aria-hidden`. Prefer native controls with honest names/state.",
          "متسيبش Tab جوّه `aria-hidden`. فضّل native controls بأسماء و state صادقة.",
        ),
      ),
      q(
        "q2",
        L("What does `aria-expanded` communicate?", "`aria-expanded` بيوصل إيه؟"),
        [
          opt(
            "a",
            "Whether a disclosure/control is open",
            "هل الـ disclosure/control مفتوح",
          ),
          opt("b", "Font size", "حجم الخط"),
          opt("c", "Network speed", "سرعة الشبكة"),
          opt("d", "Color theme", "ثيم اللون"),
        ],
        "a",
        L(
          "Keep ARIA state in sync with the visible UI.",
          "خلّي حالة ARIA متزامنة مع الـ UI الظاهر.",
        ),
      ),
      q(
        "q3",
        L(
          "Why avoid `aria-hidden=\"true\"` on a focusable subtree?",
          "ليه نتجنّب `aria-hidden=\"true\"` على subtree قابل للـ focus؟",
        ),
        [
          opt(
            "a",
            "Users can Tab to something AT cannot announce",
            "المستخدم يقدر Tab لحاجة AT مش هتعلنها",
          ),
          opt("b", "It crashes Chrome", "بيكرّش كروم"),
          opt("c", "It disables CSS", "بيعطّل CSS"),
          opt("d", "It is required by HTML5", "مطلوب من HTML5"),
        ],
        "a",
        L(
          "Hidden from AT but still focusable is a classic trap — hide or inert the whole path.",
          "مخفي من AT ولسه عليه focus فخ كلاسيكي — اخفي أو inert المسار كله.",
        ),
      ),
      q(
        "q4",
        L(
          "What is a skip link for?",
          "skip link معمول لإيه؟",
        ),
        [
          opt(
            "a",
            "Let keyboard users jump past repetitive nav to main content",
            "مستخدمي الكيبورد يقفزوا على nav المتكرر للمحتوى الأساسي",
          ),
          opt("b", "Skip all headings", "تخطّي كل headings"),
          opt("c", "Hide the footer from everyone", "إخفاء footer عن الكل"),
          opt("d", "Disable Tab key", "تعطيل Tab"),
        ],
        "a",
        L(
          "First focusable link → `#main` saves AT and keyboard users from tabbing through chrome.",
          "أول لينك focusable → `#main` بيوفر على AT والكيبورد tabbing في الـ chrome.",
        ),
        {
          code: `<a href="#main" class="skip-link">Skip to content</a>`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "When is `aria-live` appropriate?",
          "إمتى `aria-live` مناسب؟",
        ),
        [
          opt(
            "a",
            "Sparingly — for important dynamic status updates",
            "بحذر — لتحديثات status ديناميكية مهمة",
          ),
          opt("b", "On every div that re-renders", "على كل div بيتعمل re-render"),
          opt("c", "Instead of visible text", "بدل النص الظاهر"),
          opt("d", "Always on the body", "دايمًا على body"),
        ],
        "a",
        L(
          "Live regions interrupt — use for toasts/errors, not routine UI churn.",
          "الـ live regions بتقطع — استخدمها للـ toasts/errors، مش كل تحديث UI.",
        ),
      ),
    ],
  },

  "html-core-web-vitals": {
    title: L("Core Web Vitals check", "اختبار Core Web Vitals"),
    questions: [
      q(
        "q1",
        L(
          "Which markup helps LCP and CLS together?",
          "أنهي markup بيساعد LCP و CLS مع بعض؟",
        ),
        [
          opt("a", "Lazy hero with no size", "Hero lazy من غير مقاس"),
          opt(
            "b",
            "Sized hero with high fetch priority",
            "Hero بمقاس وأولوية جلب عالية",
          ),
          opt("c", "Background-only hero", "Hero خلفية بس"),
          opt("d", "Unsized iframe hero", "iframe hero من غير مقاس"),
        ],
        "b",
        L(
          "Width/height reserve layout (CLS); skip lazy on LCP; fetchpriority helps the critical image.",
          "العرض/الارتفاع بيحجزوا الـ layout (CLS)؛ متعملش lazy على LCP؛ fetchpriority بيساعد الصورة الحرجة.",
        ),
        {
          code: `<img src="/hero.jpg" alt="Hero" loading="lazy" />`,
          language: "html",
        },
      ),
      q(
        "q2",
        L("What does CLS measure?", "CLS بيقيس إيه؟"),
        [
          opt("a", "Unexpected layout shifts", "تحركات layout مفاجئة"),
          opt("b", "DNS lookup time only", "وقت DNS بس"),
          opt("c", "Bundle size in KB", "حجم الـ bundle بـ KB"),
          opt("d", "Number of H1s", "عدد الـ H1"),
        ],
        "a",
        L(
          "Reserve space for media and ads so content doesn’t jump.",
          "احجز مساحة للصور والإعلانات عشان المحتوى ميتحركش.",
        ),
      ),
      q(
        "q3",
        L("When should `loading=\"lazy\"` be avoided?", "إمتى تتجنّب `loading=\"lazy\"`؟"),
        [
          opt(
            "a",
            "On the likely LCP / above-the-fold hero",
            "على صورة LCP / الـ hero فوق الزيّة",
          ),
          opt("b", "On every tiny icon", "على كل أيقونة صغيرة"),
          opt("c", "Never — always lazy everything", "أبدًا — lazy على كل حاجة"),
          opt("d", "Only on SVGs", "على SVG بس"),
        ],
        "a",
        L(
          "Lazy-loading the LCP image can delay the largest paint.",
          "lazy على صورة LCP ممكن يأخّر أكبر paint.",
        ),
      ),
      q(
        "q4",
        L(
          "What does INP measure?",
          "INP بيقيس إيه؟",
        ),
        [
          opt(
            "a",
            "Responsiveness to user interactions",
            "استجابة تفاعلات المستخدم",
          ),
          opt("b", "Largest image bytes", "حجم أكبر صورة"),
          opt("c", "Number of H1 elements", "عدد عناصر H1"),
          opt("d", "DNS lookup time", "وقت DNS lookup"),
        ],
        "a",
        L(
          "INP tracks how quickly the page responds after taps/clicks — markup choices affect what loads first.",
          "INP بيتتبع سرعة استجابة الصفحة بعد taps/clicks — اختيارات الـ markup بتأثر على اللي بيتحمّل الأول.",
        ),
      ),
      q(
        "q5",
        L(
          "A common CLS culprit in HTML markup is…",
          "سبب CLS شائع في markup HTML هو…",
        ),
        [
          opt(
            "a",
            "Images and embeds inserted without reserved dimensions",
            "صور و embeds من غير مقاسات محجوزة",
          ),
          opt("b", "Using semantic headings", "استخدام headings semantic"),
          opt("c", "Adding alt text", "إضافة alt text"),
          opt("d", "A single h1", "h1 واحد"),
        ],
        "a",
        L(
          "Unsized media pushes content down when it arrives — always reserve space.",
          "وسائط من غير مقاس بتزق المحتوى لما توصل — احجز مساحة دايمًا.",
        ),
      ),
    ],
  },

  "html-perf-media": {
    title: L("Media performance check", "اختبار أداء الوسائط"),
    questions: [
      q(
        "q1",
        L(
          "Why set width and height on images?",
          "ليه تحط width و height على الصور؟",
        ),
        [
          opt(
            "a",
            "To reduce layout shift when they load",
            "تقلّل تحرك الـ layout وقت التحميل",
          ),
          opt("b", "HTML requires square images", "HTML بيفرض صور مربعة"),
          opt("c", "It disables caching", "بيعطّل الكاش"),
          opt("d", "It replaces alt text", "بدل نص الـ alt"),
        ],
        "a",
        L(
          "Intrinsic size hints let the browser reserve space before bytes arrive.",
          "تلميح المقاس بيخلّي المتصفح يحجز مساحة قبل ما البايتس توصل.",
        ),
      ),
      q(
        "q2",
        L("What does `decoding=\"async\"` hint?", "`decoding=\"async\"` بيلمّح إيه؟"),
        [
          opt(
            "a",
            "Decode off the critical path when possible",
            "فك التشفير بعيد عن المسار الحرج لما ينفع",
          ),
          opt("b", "Delete EXIF always", "امسح EXIF دايمًا"),
          opt("c", "Force sync paint", "فرض paint متزامن"),
          opt("d", "Enable WebSockets", "تفعيل WebSockets"),
        ],
        "a",
        L(
          "Async decoding can keep scrolling smoother while images decode.",
          "الـ decoding الـ async ممكن يخلّي السكرول أنعم أثناء فك الصور.",
        ),
      ),
      q(
        "q3",
        L(
          "Best default for below-the-fold images?",
          "أفضل افتراضي لصور تحت الزيّة؟",
        ),
        [
          opt("a", "loading=\"lazy\"", "loading=\"lazy\""),
          opt("b", "fetchpriority=\"high\" always", "fetchpriority=\"high\" دايمًا"),
          opt("c", "No src until click", "من غير src لحد الضغط"),
          opt("d", "Base64 everything", "Base64 لكل حاجة"),
        ],
        "a",
        L(
          "Lazy-load offscreen images; keep heroes eager and prioritized.",
          "lazy للصور اللي بره الشاشة؛ خلّي الـ heroes Eager وبأولوية.",
        ),
      ),
      q(
        "q4",
        L(
          "What does `srcset` on `<img>` enable?",
          "إيه اللي `srcset` على `<img>` بيفعّله؟",
        ),
        [
          opt(
            "a",
            "Pick appropriate resolution for the device viewport/DPR",
            "اختيار resolution مناسب لـ viewport/DPR الجهاز",
          ),
          opt("b", "Lazy load video", "lazy load للفيديو"),
          opt("c", "Replace alt text", "بديل alt text"),
          opt("d", "Force WebP always", "فرض WebP دايمًا"),
        ],
        "a",
        L(
          "`srcset` + `sizes` let the browser download a right-sized image.",
          "`srcset` + `sizes` بيخلو المتصفح يحمّل صورة بالمقاس المناسب.",
        ),
        {
          code: `<img src="hero.jpg" srcset="hero-800.jpg 800w, hero-1600.jpg 1600w" sizes="100vw" alt="Hero" />`,
          language: "html",
        },
      ),
      q(
        "q5",
        L(
          "When should `fetchpriority=\"high\"` be used?",
          "إمتى تستخدم `fetchpriority=\"high\"`؟",
        ),
        [
          opt(
            "a",
            "On the likely LCP image — sparingly",
            "على صورة LCP المحتملة — بحذر",
          ),
          opt("b", "On every below-fold thumbnail", "على كل thumbnail تحت الزيّة"),
          opt("c", "On decorative icons only", "على أيقونات ديكورية بس"),
          opt("d", "Never — it is deprecated", "أبدًا — deprecated"),
        ],
        "a",
        L(
          "High priority nudges the critical hero image ahead of less important assets.",
          "أولوية عالية بتقدّم صورة الـ hero الحرجة على assets أقل أهمية.",
        ),
      ),
    ],
  },

  "html-architecture-partials": {
    title: L("HTML architecture check", "اختبار هندسة HTML"),
    questions: [
      q(
        "q1",
        L(
          "Why split UI into reusable HTML partials/components?",
          "ليه نقسم الـ UI لـ partials/components قابلة لإعادة الاستخدام؟",
        ),
        [
          opt(
            "a",
            "Consistency + easier maintenance",
            "اتساق + صيانة أسهل",
          ),
          opt("b", "Browsers only allow 3 files", "المتصفح بيسمح بـ 3 ملفات بس"),
          opt("c", "It disables CSS", "بيعطّل CSS"),
          opt("d", "It removes the need for semantics", "بيلغي الحاجة للـ semantics"),
        ],
        "a",
        L(
          "Shared partials keep structure consistent across pages.",
          "الـ partials المشتركة بتخلي الـ structure ثابت عبر الصفحات.",
        ),
      ),
      q(
        "q2",
        L(
          "What should stay in HTML even when a framework renders it?",
          "إيه اللي يفضل في HTML حتى مع framework؟",
        ),
        [
          opt(
            "a",
            "Meaningful structure and accessible names",
            "structure معنوي وأسماء accessible",
          ),
          opt("b", "Only empty mount nodes", "mount nodes فاضية بس"),
          opt("c", "Inline styles for everything", "inline styles لكل حاجة"),
          opt("d", "Comment nodes only", "nodes تعليقات بس"),
        ],
        "a",
        L(
          "Frameworks still emit HTML — keep it semantic and accessible.",
          "الـ frameworks برضه بتطلع HTML — خلّيه semantic و accessible.",
        ),
      ),
      q(
        "q3",
        L(
          "Danger of copy-pasting large HTML blobs everywhere?",
          "خطر قص ولصق HTML كبير في كل حتة؟",
        ),
        [
          opt(
            "a",
            "Drift — fixes don’t propagate",
            "اختلاف النسخ — الإصلاحات مش بتتوزع",
          ),
          opt("b", "Faster LCP always", "LCP أسرع دايمًا"),
          opt("c", "Automatic a11y", "a11y تلقائي"),
          opt("d", "Free CDN", "CDN مجاني"),
        ],
        "a",
        L(
          "Partials/components give you one place to fix structure.",
          "الـ partials/components بتديك مكان واحد تصلّح فيه الـ structure.",
        ),
      ),
      q(
        "q4",
        L(
          "Why must `id` values be unique in the document?",
          "ليه قيم `id` لازم تكون فريدة في الـ document؟",
        ),
        [
          opt(
            "a",
            "Labels, anchors, and scripts target ids — duplicates break associations",
            "labels و anchors و scripts بتستهدف ids — التكرار بيكسر الربط",
          ),
          opt("b", "CSS requires unique ids only", "CSS بيفرض ids فريدة بس"),
          opt("c", "Browsers crash on duplicates", "المتصفح بيكرّش مع التكرار"),
          opt("d", "It affects image loading order", "بيأثر على ترتيب تحميل الصور"),
        ],
        "a",
        L(
          "Duplicate ids make `for`/`href`/`getElementById` unreliable — generate once per partial.",
          "ids مكررة بتخلي `for`/`href`/`getElementById` غير موثوق — ولّد id مرة واحدة لكل partial.",
        ),
      ),
      q(
        "q5",
        L(
          "Why keep landmarks consistent across partials?",
          "ليه landmarks تفضل ثابتة عبر الـ partials؟",
        ),
        [
          opt(
            "a",
            "Users and AT learn one navigation map across pages",
            "المستخدم و AT يتعلّموا خريطة تنقل واحدة عبر الصفحات",
          ),
          opt("b", "Browsers require identical HTML", "المتصفح بيفرض HTML متطابق"),
          opt("c", "It disables CSS", "بيعطّل CSS"),
          opt("d", "It removes need for alt text", "بيلغي الحاجة لـ alt text"),
        ],
        "a",
        L(
          "Shared header/nav/footer partials should expose the same landmark structure every time.",
          "partials الـ header/nav/footer المشتركة لازم تطلع نفس هيكل landmarks كل مرة.",
        ),
      ),
    ],
  },

  "html-security-hardening": {
    title: L("HTML security hardening check", "اختبار تقوية أمان HTML"),
    questions: [
      q(
        "q1",
        L("What belongs on an external `target=\"_blank\"` link?", "إيه اللي يتحط على لينك خارجي `target=\"_blank\"`؟"),
        [
          opt("a", "`rel=\"noopener noreferrer\"`", "`rel=\"noopener noreferrer\"`"),
          opt("b", "`download` always", "`download` دايمًا"),
          opt("c", "`aria-hidden=\"true\"`", "`aria-hidden=\"true\"`"),
          opt("d", "Nothing", "ولا حاجة"),
        ],
        "a",
        L("`noopener` blocks opener access and `noreferrer` suppresses referrer data.", "`noopener` بيمنع opener access و`noreferrer` بيمنع referrer data."),
      ),
      q(
        "q2",
        L("What is the safest default for a third-party iframe?", "إيه الـ default الأكثر أمانًا لـ iframe طرف تالت؟"),
        [
          opt("a", "Start with `sandbox`, then grant only needed tokens", "ابدأ بـ `sandbox` وبعدها امنح tokens المطلوبة بس"),
          opt("b", "Give it every `allow` permission", "ادّيه كل `allow` permissions"),
          opt("c", "Remove its title", "شيل الـ title"),
          opt("d", "Put it in a hidden div", "حطه في div مخفي"),
        ],
        "a",
        L("Sandboxing is least privilege: restore capabilities one at a time only when the embed needs them.", "Sandboxing هو least privilege: رجّع capabilities واحدة واحدة بس لما الـ embed يحتاجها."),
      ),
      q(
        "q3",
        L("Why are API keys in a hidden input unsafe?", "ليه API keys في hidden input مش آمنة؟"),
        [
          opt("a", "Hidden fields are still visible and editable in the browser", "الـ hidden fields لسه ظاهرة وقابلة للتعديل في المتصفح"),
          opt("b", "They stop form submission", "بتوقف إرسال الـ form"),
          opt("c", "They break CSS", "بتكسر CSS"),
          opt("d", "They remove HTTPS", "بتشيل HTTPS"),
        ],
        "a",
        L("Anything in client-visible HTML can be inspected. Keep secrets and authorization on the server.", "أي حاجة في HTML ظاهر للعميل ممكن تتفحص. خلّي الأسرار والـ authorization على السيرفر."),
      ),
      q(
        "q4",
        L("Which autocomplete token fits a sign-in password?", "أنهي autocomplete token يناسب password تسجيل الدخول؟"),
        [
          opt("a", "`current-password`", "`current-password`"),
          opt("b", "`new-password` always", "`new-password` دايمًا"),
          opt("c", "`off` for security", "`off` للأمان"),
          opt("d", "`cc-number`", "`cc-number`"),
        ],
        "a",
        L("Use `current-password` for an existing sign-in credential; tokens express the field’s intent.", "استخدم `current-password` لـ sign-in credential موجود؛ الـ tokens بتوصف نية الحقل."),
      ),
      q(
        "q5",
        L("What must you audit besides a form’s `action`?", "إيه اللي لازم تراجعه غير `action` بتاع الـ form؟"),
        [
          opt("a", "Each submit button’s `formaction`", "`formaction` بتاع كل submit button"),
          opt("b", "Only the page title", "عنوان الصفحة بس"),
          opt("c", "The favicon color", "لون الـ favicon"),
          opt("d", "The CSS reset", "CSS reset"),
        ],
        "a",
        L("A submitter can override the destination with `formaction`, creating a separate data egress path.", "الـ submitter ممكن يغيّر الوجهة بـ `formaction` وده بيعمل مسار خروج بيانات مختلف."),
      ),
    ],
  },

  "html-speculation-rules": {
    title: L("Speculation Rules check", "اختبار Speculation Rules"),
    questions: [
      q(
        "q1",
        L("Which element carries Speculation Rules JSON?", "أنهي عنصر بيحمل Speculation Rules JSON؟"),
        [
          opt("a", "`<script type=\"speculationrules\">`", "`<script type=\"speculationrules\">`"),
          opt("b", "`<meta name=\"prerender\">`", "`<meta name=\"prerender\">`"),
          opt("c", "`<link rel=\"instant\">`", "`<link rel=\"instant\">`"),
          opt("d", "`<template>`", "`<template>`"),
        ],
        "a",
        L("Supporting browsers parse JSON inside `<script type=\"speculationrules\">`.", "المتصفحات الداعمة بتقرأ JSON جوّه `<script type=\"speculationrules\">`."),
      ),
      q(
        "q2",
        L("How does `prerender` differ from `prefetch`?", "إزاي `prerender` مختلف عن `prefetch`؟"),
        [
          opt("a", "It prepares a rendered future page, not only its response", "بيجهّز صفحة مستقبلية مترسومة، مش response بس"),
          opt("b", "It only changes link color", "بيغيّر لون اللينك بس"),
          opt("c", "It works only cross-origin", "بيشتغل cross-origin بس"),
          opt("d", "It deletes browser cache", "بيمسح browser cache"),
        ],
        "a",
        L("Prefetch warms a response; prerender does more work to make activation fast.", "Prefetch بيسخّن response؛ prerender بيعمل شغل أكتر عشان activation يبقى سريع."),
      ),
      q(
        "q3",
        L("Which URL should never be prerendered?", "أنهي URL عمره ما يتعمله prerender؟"),
        [
          opt("a", "`/logout`", "`/logout`"),
          opt("b", "`/products/keyboard`", "`/products/keyboard`"),
          opt("c", "`/html/forms`", "`/html/forms`"),
          opt("d", "`/blog/article`", "`/blog/article`"),
        ],
        "a",
        L("Logout and other mutating routes can cause side effects before a user commits to navigation.", "Logout وroutes تانية بتغيّر state ممكن تعمل side effects قبل ما المستخدم يقرر يتنقل."),
      ),
      q(
        "q4",
        L("What is the conservative starting scope for rules?", "إيه النطاق المحافظ للبداية بالقواعد؟"),
        [
          opt("a", "High-confidence same-origin read-only URLs", "URLs same-origin وread-only عالية الثقة"),
          opt("b", "Every link on every page", "كل لينك في كل صفحة"),
          opt("c", "Cross-origin payment routes", "Payment routes cross-origin"),
          opt("d", "All delete controls", "كل delete controls"),
        ],
        "a",
        L("Small, likely, same-origin destinations limit wasted bandwidth and risk.", "وجهات صغيرة ومحتملة وsame-origin بتقلل bandwidth المهدور والمخاطرة."),
      ),
      q(
        "q5",
        L("What must work when a browser ignores Speculation Rules?", "إيه اللي لازم يشتغل لما المتصفح يتجاهل Speculation Rules؟"),
        [
          opt("a", "Normal meaningful links and the destination page", "لينكات عادية meaningful وصفحة الوجهة"),
          opt("b", "Only a loading spinner", "Loading spinner بس"),
          opt("c", "A user-agent check", "User-agent check"),
          opt("d", "No navigation at all", "مفيش navigation خالص"),
        ],
        "a",
        L("The API is progressive enhancement: ordinary `<a href>` navigation remains the baseline.", "الـ API هي progressive enhancement: navigation عادي بـ `<a href>` يفضل الـ baseline."),
      ),
    ],
  },

  "html-global-rtl": {
    title: L("Global & RTL HTML check", "اختبار HTML العالمي و RTL"),
    questions: [
      q(
        "q1",
        L(
          "What should an Arabic-first bilingual lesson page usually set on `<html>`?",
          "صفحة درس bilingual عربية-أولًا عادة تحط إيه على `<html>`؟",
        ),
        [
          opt("a", '`lang="ar" dir="rtl"`', '`lang="ar" dir="rtl"`'),
          opt("b", "Nothing — CSS handles language", "ولا حاجة — CSS بيحل اللغة"),
          opt("c", '`lang="en" dir="rtl"` always', '`lang="en" dir="rtl"` دايمًا'),
          opt("d", "Only a class name", "class name بس"),
        ],
        "a",
        L(
          "Root `lang` and `dir` declare the document default for browsers and AT.",
          "Root `lang` و `dir` بيعلنوا افتراضي المستند للمتصفحات و AT.",
        ),
      ),
      q(
        "q2",
        L(
          "Best way to keep an English API token readable inside Arabic RTL copy?",
          "أحسن طريقة تخلي token API إنجليزي مقروء جوّه نص عربي RTL؟",
        ),
        [
          opt("a", "Wrap it in `<bdi>` or `dir=\"ltr\"`", "لفّه في `<bdi>` أو `dir=\"ltr\"`"),
          opt("b", "UPPERCASE the whole paragraph", "كبّر الفقرة كلها"),
          opt("c", "Remove spaces only", "شيل المسافات بس"),
          opt("d", "Put it in alt text", "حطه في alt text"),
        ],
        "a",
        L(
          "Bidirectional isolation prevents the token from scrambling neighboring Arabic letters.",
          "عزل bidi بيمنع الـ token يبوّظ الحروف العربية اللي حواليه.",
        ),
      ),
      q(
        "q3",
        L(
          "Inside an RTL checkout form, email and OTP fields should usually be…",
          "جوّه فورم checkout RTL، حقول الإيميل و OTP غالبًا تكون…",
        ),
        [
          opt("a", '`dir="ltr"` (often with a matching inputmode)', '`dir="ltr"` (غالبًا مع inputmode مناسب)'),
          opt("b", "Forced `dir=\"rtl\"` always", "`dir=\"rtl\"` إجباري دايمًا"),
          opt("c", "Missing labels on purpose", "من غير labels عمدًا"),
          opt("d", "type=hidden", "type=hidden"),
        ],
        "a",
        L(
          "LTR controls keep caret movement and pasted codes predictable on RTL pages.",
          "كنترولز LTR بتخلي حركة الـ caret واللصق متوقعين في صفحات RTL.",
        ),
      ),
      q(
        "q4",
        L("When is `dir=\"auto\"` most useful?", "إمتى `dir=\"auto\"` يكون مفيد أكتر؟"),
        [
          opt(
            "a",
            "User-generated names/comments of unknown direction",
            "أسماء/تعليقات مستخدم باتجاه غير معروف",
          ),
          opt("b", "Replacing lang on every page", "بدل lang على كل صفحة"),
          opt("c", "Hiding focus outlines", "إخفاء outlines الـ focus"),
          opt("d", "Disabling zoom", "تعطيل الزوم"),
        ],
        "a",
        L(
          "`dir=\"auto\"` infers direction from content — great for UGC, less ideal for fixed chrome.",
          "`dir=\"auto\"` بيستنتج الاتجاه من المحتوى — ممتاز لـ UGC، أقل مثالية للـ chrome الثابت.",
        ),
      ),
      q(
        "q5",
        L(
          "A dialog teleported to `document.body` on an RTL app should…",
          "dialog اتنقل لـ `document.body` في تطبيق RTL المفروض…",
        ),
        [
          opt(
            "a",
            "Set or inherit `dir`/`lang` on the dialog root",
            "يحط أو يورّث `dir`/`lang` على جذر الـ dialog",
          ),
          opt("b", "Drop all labels", "يشيل كل اللابلز"),
          opt("c", "Use positive tabindex everywhere", "يستخدم tabindex موجب في كل حتة"),
          opt("d", "Force English only", "يفرض إنجليزي بس"),
        ],
        "a",
        L(
          "Teleported UI can escape page direction — carry `lang`/`dir` with the portal root.",
          "الـ UI المتنقل ممكن يخرج من اتجاه الصفحة — انقل `lang`/`dir` مع جذر الـ portal.",
        ),
      ),
    ],
  },

  "html-common-pitfalls": {
    title: L("HTML pitfalls check", "اختبار أخطاء HTML الشائعة"),
    questions: [
      q(
        "q1",
        L(
          "What is a common pitfall with clickable non-buttons?",
          "إيه فخ شائع مع عناصر قابلة للضغط مش أزرار؟",
        ),
        [
          opt(
            "a",
            "Div/span click handlers without keyboard support",
            "div/span بـ click من غير دعم كيبورد",
          ),
          opt("b", "Using <button type=\"button\">", "استخدام <button type=\"button\">"),
          opt("c", "Providing a visible label", "توفير لابل ظاهر"),
          opt("d", "Using semantic landmarks", "استخدام landmarks معنوية"),
        ],
        "a",
        L(
          "Fake controls miss focus, Enter/Space, and proper roles — use native elements.",
          "الـ controls المزيفة بتضيع focus و Enter/Space والـ roles — استخدم عناصر أصلية.",
        ),
      ),
      q(
        "q2",
        L(
          "Why is empty or missing alt on informative images a problem?",
          "ليه alt فاضي/ناقص على صور معلوماتية مشكلة؟",
        ),
        [
          opt(
            "a",
            "AT users miss the information in the image",
            "مستخدمي AT بيضيعوا معلومة الصورة",
          ),
          opt("b", "CSS cannot load the file", "CSS مش بيقدر يحمّل الملف"),
          opt("c", "It breaks flexbox", "بيكسر flexbox"),
          opt("d", "It disables caching", "بيعطّل الكاش"),
        ],
        "a",
        L(
          "Informative images need text alternatives; decorative ones can use empty alt.",
          "الصور المعلوماتية محتاجة بديل نصي؛ الديكورية ينفع alt فاضي.",
        ),
      ),
      q(
        "q3",
        L(
          "What goes wrong with unlabeled form inputs?",
          "إيه اللي بيحصل مع inputs من غير label؟",
        ),
        [
          opt(
            "a",
            "No reliable accessible name",
            "مفيش اسم accessible موثوق",
          ),
          opt("b", "HTML stops parsing", "HTML بيبطل parsing"),
          opt("c", "HTTPS fails", "HTTPS بيفشل"),
          opt("d", "Images won’t load", "الصور مش هتتحمّل"),
        ],
        "a",
        L(
          "Placeholders are not labels — associate a real `<label>`.",
          "الـ placeholders مش labels — اربط `<label>` حقيقي.",
        ),
      ),
      q(
        "q4",
        L(
          "What is wrong with an empty `<a href=\"#\">` used as a button?",
          "إيه الغلط في `<a href=\"#\">` فاضي مستخدم كزرار؟",
        ),
        [
          opt(
            "a",
            "Announces a link, may jump to top, and lacks button semantics",
            "بيتعلن كلينك، ممكن يقفز لفوق، ومفيهوش semantics زرار",
          ),
          opt("b", "Nothing — anchors are always buttons", "ولا حاجة — anchors دايمًا buttons"),
          opt("c", "It improves SEO", "بيحسّن SEO"),
          opt("d", "It is required for forms", "مطلوب للـ forms"),
        ],
        "a",
        L(
          "Use `<button type=\"button\">` for actions; `<a href>` for navigation with a real destination.",
          "استخدم `<button type=\"button\">` للأ actions؛ `<a href>` للتنقل لوجهة حقيقية.",
        ),
      ),
      q(
        "q5",
        L(
          "Using `<h3>` only because it looks smaller is a pitfall because…",
          "استخدام `<h3>` بس عشان أصغر شكلًا فخ لأن…",
        ),
        [
          opt(
            "a",
            "It misrepresents document structure to AT",
            "بيمثّل structure الـ document غلط لـ AT",
          ),
          opt("b", "Browsers refuse to render h3", "المتصفح بيرفض يعرض h3"),
          opt("c", "CSS cannot style h3", "CSS مش بيقدر يستايل h3"),
          opt("d", "It breaks HTTPS", "بيكسر HTTPS"),
        ],
        "a",
        L(
          "Pick heading levels for hierarchy, not font size — style with CSS instead.",
          "اختار مستويات headings للـ hierarchy مش حجم الخط — وستايل بـ CSS.",
        ),
      ),
    ],
  },

  "html-cheatsheet": {
    title: L("CheatSheet check", "اختبار الـ CheatSheet"),
    questions: [
      q(
        "q1",
        L(
          "Before copying a Newly Baseline snippet into production, you should…",
          "قبل ما تنسخ snippet من Baseline Newly للإنتاج، المفروض…",
        ),
        [
          opt("a", "Ship it everywhere with no fallback", "تنشره في كل حتة من غير fallback"),
          opt(
            "b",
            "Check Baseline + plan a fallback",
            "تراجع Baseline وتحط خطة fallback",
          ),
          opt("c", "Delete the docs", "تمسح الدوكس"),
          opt("d", "Inline it as a comment only", "تحطه كـ comment بس"),
        ],
        "b",
        L(
          "Cheat cards include compatibility badges so you can decide before paste.",
          "كروت الـ CheatSheet فيها شارات توافق عشان تقرر قبل اللصق.",
        ),
      ),
      q(
        "q2",
        L(
          "What should you verify after pasting a snippet?",
          "إيه اللي تراجعه بعد لصق snippet؟",
        ),
        [
          opt(
            "a",
            "Semantics, names, and keyboard path still work",
            "الـ semantics والأسماء ومسار الكيبورد لسه شغّالين",
          ),
          opt("b", "That all text is Lorem", "إن كل النص Lorem"),
          opt("c", "That outlines are removed", "إن الـ outlines اتشالت"),
          opt("d", "That labels were deleted", "إن اللابلز اتمسحت"),
        ],
        "a",
        L(
          "Snippets are starting points — keep accessibility intact in your page.",
          "الـ snippets بداية — خلّي الوصولية سليمة في صفحتك.",
        ),
      ),
      q(
        "q3",
        L(
          "Cheat sheets are most useful when you…",
          "الـ CheatSheet مفيدة أكتر لما…",
        ),
        [
          opt(
            "a",
            "Use them as quick recall, then practice in the playground",
            "تستخدمها للتذكرة السريعة وبعدين تتدرّب في الـ playground",
          ),
          opt("b", "Memorize without trying code", "تحفظ من غير ما تجرّب كود"),
          opt("c", "Skip the Concept tab forever", "تتخطّى تاب Concept للأبد"),
          opt("d", "Only read Arabic or only English", "تقرأ عربي بس أو إنجليزي بس"),
        ],
        "a",
        L(
          "Recall + practice beats copying blindly.",
          "التذكرة + الممارسة أحسن من النسخ الأعمي.",
        ),
      ),
      q(
        "q4",
        L(
          "Before pasting a snippet marked Newly Baseline, check…",
          "قبل ما تلصق snippet معلّم Newly Baseline، راجع…",
        ),
        [
          opt(
            "a",
            "Baseline status and whether your audience’s browsers support it",
            "حالة Baseline وهل متصفحات جمهورك بتدعمه",
          ),
          opt("b", "That it removes all labels", "إنه بيشيل كل labels"),
          opt("c", "That it uses only divs", "إنه بيستخدم divs بس"),
          opt("d", "That outlines are removed", "إن outlines اتشالت"),
        ],
        "a",
        L(
          "Cheat cards show compatibility — verify before shipping to production.",
          "كروت الـ CheatSheet بتعرض التوافق — تأكد قبل الإنتاج.",
        ),
      ),
      q(
        "q5",
        L(
          "After pasting HTML from a cheat card, you should fix…",
          "بعد لصق HTML من cheat card، صلّح…",
        ),
        [
          opt(
            "a",
            "ids, labels, and alt text to match your page context",
            "ids و labels و alt text عشان يناسبوا صفحتك",
          ),
          opt("b", "Remove all semantic tags", "شيل كل tags semantic"),
          opt("c", "Delete the title tag", "امسح title tag"),
          opt("d", "Replace buttons with divs", "بدّل buttons بـ divs"),
        ],
        "a",
        L(
          "Snippets are templates — adapt names and copy for your real UI.",
          "الـ snippets قوالب — عدّل الأسماء والنص لـ UI الحقيقي.",
        ),
      ),
    ],
  },
};

/** Runtime guard used by the HTML lesson assembler. */
export function assertHtmlQuizCoverage(slugs: readonly string[]) {
  for (const slug of slugs) {
    const quiz = htmlQuizzes[slug];
    if (
      !quiz ||
      quiz.questions.length < 3 ||
      quiz.questions.length > 6
    ) {
      throw new Error(
        `HTML quiz missing or invalid length for lesson "${slug}" (need 3–6 questions, got ${quiz?.questions.length ?? 0})`,
      );
    }
  }
}
