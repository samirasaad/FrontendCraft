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
    title: L("Document anatomy check", "اختبار تشريح المستند"),
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
          "المستند الحقيقي محتاج `<!DOCTYPE html>` و `lang` على `<html>` و charset بدري في `<head>`.",
        ),
        {
          code: `<html>\n  <head></head>\n  <body></body>\n</html>`,
          language: "html",
          hint: L(
            "Compare each option — look for `DOCTYPE`, `lang`, and `charset`.",
            "قارن كل اختيار — دور على `DOCTYPE` و `lang` و `charset`.",
          ),
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
          hint: L(
            "Peek at `<head>` — `charset` belongs near the top.",
            "بص على `<head>` — الـ `charset` مكانه في الأول.",
          ),
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
          hint: L(
            "The `lang` attribute goes on `<html>`, not `<body>`.",
            "خاصية `lang` بتتحط على `<html>`، مش `<body>`.",
          ),
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
        {
          hint: L(
            "Browser tab titles live in `<head>`, inside `<title>`.",
            "عنوان التاب بيعيش في `<head>` جوّه `<title>`.",
          ),
        },
      ),
    ],
  },

  "semantic-structure": {
    title: L("Semantic structure check", "اختبار الهيكل الدلالي"),
    questions: [
      q(
        "q1",
        L(
          "Pick the landmark shell screen readers can jump through:",
          "اختار هيكل landmarks قارئات الشاشة تقدر تقفز عليه:",
        ),
        [
          opt("a", "Div soup with classes", "Div soup بـ classes"),
          opt("b", "header + nav + main + footer", "هيكل من header و nav و main و footer"),
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
          hint: L(
            "Compare the options — real landmark tags beat `div` classes.",
            "قارن الاختيارات — وسوم `landmarks` الحقيقية أحسن من `div` بـ `classes`.",
          ),
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
        {
          hint: L(
            "Think primary content — one `main` region per page.",
            "فكّر في المحتوى الأساسي — منطقة `main` واحدة لكل صفحة.",
          ),
        },
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
        {
          hint: L(
            "Ask: could this content stand alone as its own page?",
            "اسأل: المحتوى ده يقدر يعيش لوحده كصفحة؟",
          ),
        },
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
        {
          hint: L(
            "`<section>` groups related chunks; `<article>` is self-contained.",
            "`<section>` بيجمّع أجزاء مرتبطة؛ `<article>` محتوى مستقل.",
          ),
        },
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
        {
          hint: L(
            "Sidebars and pull quotes usually belong in `<aside>`.",
            "الـ sidebars والاقتباسات الجانبية غالبًا مكانها `<aside>`.",
          ),
        },
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
        {
          hint: L(
            "Count how many `<h1>` tags the page should have.",
            "عد كام `<h1>` المفروض يكون في الصفحة.",
          ),
        },
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
        {
          hint: L(
            "Keep one `<h1>`, then step down with `<h2>`…",
            "خلّي `<h1>` واحد، وبعدين انزل بـ `<h2>`…",
          ),
        },
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
        {
          hint: L(
            "Heading level is about outline meaning — size is a CSS job.",
            "مستوى الـ heading معناه للـ outline — المقاس شغلانة CSS.",
          ),
        },
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
        {
          hint: L(
            "Keep one `<h1>`, then step down with `<h2>`…",
            "خلّي `<h1>` واحد، وبعدين انزل بـ `<h2>`…",
          ),
        },
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
        {
          hint: L(
            "Keep one `<h1>`, then step down with `<h2>`…",
            "خلّي `<h1>` واحد، وبعدين انزل بـ `<h2>`…",
          ),
        },
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
          hint: L(
            "Use meaning tags (`strong`/`em`) not just look tags.",
            "استخدم تاجات المعنى (`strong`/`em`) مش الشكل بس.",
          ),
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
        {
          hint: L(
            "`<em>` is for stress that changes meaning.",
            "`<em>` للتأكيد اللي بيغيّر المعنى.",
          ),
        },
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
        {
          hint: L(
            "`<mark>` highlights what's relevant right now.",
            "`<mark>` بيظلّل اللي مهم في السياق الحالي.",
          ),
        },
      ),
      q(
        "q4",
        L(
          "What does `<time datetime=\"2026-08-02\">Aug 2, 2026</time>` give you over plain text?",
          "`<time datetime=\"2026-08-02\">Aug 2, 2026</time>` بيديك إيه أكتر من نص عادي؟",
        ),
        [
          opt(
            "a",
            "A machine-readable value alongside the human-readable text",
            "قيمة تقرأها الآلة جنب النص اللي بيقراه البني آدم",
          ),
          opt("b", "Automatic timezone conversion everywhere", "تحويل timezone تلقائي في كل حتة"),
          opt("c", "Bold styling for the date", "ستايل عريض للتاريخ"),
          opt("d", "A countdown timer", "عداد تنازلي"),
        ],
        "a",
        L(
          "`datetime` gives browsers, search engines, and AT a parseable value while the visible text stays human-friendly.",
          "`datetime` بيدي المتصفح ومحركات البحث و AT قيمة قابلة للقراءة الآلية، والنص الظاهر يفضل واضح للبني آدم.",
        ),
        {
          code: `<time datetime="2026-08-02">Aug 2, 2026</time>`,
          language: "html",
          hint: L(
            "Look at the `datetime` attribute — it's for machines, not just readers.",
            "بص على خاصية `datetime` — دي للآلة مش للقراءة بس.",
          ),
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
          hint: L(
            "Read the snippet, then match it to the HTML job.",
            "اقرأ الـ `snippet`، وبعدين اختار التاج اللي بيعمل الشغل ده.",
          ),
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
        {
          hint: L(
            "Real links need a working `href`.",
            "اللينكات الحقيقية محتاجة `href` شغال.",
          ),
        },
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
        {
          hint: L(
            "Decide if the image carries info or is decorative.",
            "حدّد الصورة فيها معلومة ولا ديكور.",
          ),
        },
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
        {
          hint: L(
            "Ask: does the image carry info? Then it needs useful `alt`.",
            "اسأل: الصورة فيها معلومة؟ يبقى محتاجة `alt` مفيد.",
          ),
        },
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
          opt("b", "Click here", "\"Click here\" الغامضة"),
          opt("c", "Read more (with no context)", "Read more (من غير سياق)"),
          opt("d", "The raw URL as link text", "الـ URL نفسه كنص لينك"),
        ],
        "a",
        L(
          "Link text should describe the destination — avoid vague \"click here\".",
          "نص اللينك يوصف الوجهة — تجنّب \"click here\" الغامض.",
        ),
        {
          hint: L(
            "A real link needs a working `href`.",
            "اللينك الحقيقي محتاج `href` شغال.",
          ),
        },
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
          hint: L(
            "A new tab that keeps a JS handle on the opener is the real risk here.",
            "الخطر هنا إن التاب الجديدة تفضل ماسكة handle JS على الصفحة اللي فتحتها.",
          ),
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
        {
          hint: L(
            "Reserved space before load is a layout-shift fix, not an alt-text one.",
            "حجز المساحة قبل التحميل حل لـ layout shift، مش موضوع alt text.",
          ),
        },
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
        {
          hint: L(
            "Real lists use `<ul>`, `<ol>`, or `<dl>` — not fake bullets.",
            "القوائم الحقيقية بـ `<ul>` أو `<ol>` أو `<dl>` — مش نقط مزيفة.",
          ),
        },
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
        {
          hint: L(
            "Real lists use `<ul>`, `<ol>`, or `<dl>` — not fake bullets.",
            "القوائم الحقيقية بـ `<ul>` أو `<ol>` أو `<dl>` — مش نقط مزيفة.",
          ),
        },
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
        {
          hint: L(
            "`<dl>` pairs a term (`<dt>`) with its definition (`<dd>`) — think glossary, not bullets.",
            "`<dl>` بتربط مصطلح (`<dt>`) بتعريفه (`<dd>`) — فكّر في قاموس مش نقط.",
          ),
        },
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
        {
          hint: L(
            "Real lists use `<ul>`, `<ol>`, or `<dl>`.",
            "القوائم الحقيقية بـ `<ul>` أو `<ol>` أو `<dl>`.",
          ),
        },
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
          hint: L(
            "Scan the snippet — focus on `<ul>`.",
            "راجع الـ snippet — ركّز على `<ul>`.",
          ),
        },
      ),
    ],
  },

  "forms-inputs": {
    title: L("Forms check", "اختبار النماذج"),
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
        {
          hint: L(
            "Every input needs a visible `<label>`.",
            "كل `input` محتاج `<label>` ظاهر.",
          ),
        },
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
        {
          hint: L(
            "Input types shape the keyboard and give free validation hints — not a formatting choice.",
            "أنواع الـ input بتشكّل الكيبورد وبتدي تلميحات validation ببلاش — مش موضوع تنسيق نص.",
          ),
        },
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
        {
          hint: L(
            "A native button gets Enter-to-submit and focus for free — a div or span doesn't.",
            "الزرار الأصلي بياخد Enter-to-submit والـ focus ببلاش — الـ div أو span لأ.",
          ),
        },
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
        {
          hint: L(
            "`name` is the key the server sees; `id` is just for labels and scripts.",
            "`name` هو المفتاح اللي السيرفر بيشوفه؛ `id` بس للـ labels والسكريبت.",
          ),
        },
      ),
      q(
        "q5",
        L(
          "What happens to a `<button>` inside a `<form>` with no explicit `type`?",
          "إيه اللي بيحصل لـ `<button>` جوّه `<form>` من غير `type` واضح؟",
        ),
        [
          opt(
            "a",
            "It defaults to `type=\"submit\"` and submits the form",
            "بيبقى `type=\"submit\"` افتراضيًا وبيبعت الـ form",
          ),
          opt("b", "It defaults to `type=\"button\"` and does nothing", "بيبقى `type=\"button\"` افتراضيًا ومبيعملش حاجة"),
          opt("c", "It behaves like `type=\"reset\"`", "بيتصرف زي `type=\"reset\"`"),
          opt("d", "It throws an HTML validation error", "بيرمي HTML validation error"),
        ],
        "a",
        L(
          "Inside a `<form>`, a `<button>` without an explicit `type` defaults to `submit` — set `type=\"button\"` on purpose when you don't want that.",
          "جوّه `<form>`، الـ `<button>` من غير `type` واضح بيبقى `submit` افتراضيًا — حط `type=\"button\"` بوعي لما متعايزش الافتراضي ده.",
        ),
        {
          code: `<form>\n  <button>Maybe submits?</button>\n</form>`,
          language: "html",
          hint: L(
            "No explicit `type` on a form button still picks a default — it's not a no-op.",
            "الزرار من غير `type` واضح جوّه form برضه بياخد افتراضي — مش هيبقى من غير تأثير.",
          ),
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
        {
          hint: L(
            "Tables model relationships between rows and columns — not page layout.",
            "الجداول بتعبّر عن علاقة الصفوف بالأعمدة — مش layout الصفحة.",
          ),
        },
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
        {
          hint: L(
            "`<th>` links a header cell to the data cells it describes.",
            "`<th>` بيربط خلية الرأس بخلايا البيانات اللي بتوصفها.",
          ),
        },
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
        {
          hint: L(
            "`<caption>` is the table's own accessible title — not a filter or sort control.",
            "`<caption>` هو عنوان الجدول الـ accessible — مش filter أو sort.",
          ),
        },
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
        {
          hint: L(
            "`<thead>` and `<tbody>` split header rows from data rows semantically.",
            "`<thead>` و `<tbody>` بيفصلوا صفوف الرؤوس عن صفوف البيانات semantically.",
          ),
        },
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
        {
          hint: L(
            "`scope` tells AT which axis (column or row) a header describes.",
            "`scope` بيقول لـ AT الرأس ده بيوصف عمود ولا صف.",
          ),
        },
      ),
    ],
  },

  "form-ux-attributes": {
    title: L("Form UX attributes check", "اختبار خصائص تجربة النماذج"),
    questions: [
      q(
        "q1",
        L(
          "What is true about `inputmode` and `type` together?",
          "إيه الصح في العلاقة بين `inputmode` و `type`؟",
        ),
        [
          opt(
            "a",
            "`inputmode` only hints the on-screen keyboard; `type` still sets the real value behavior",
            "`inputmode` بيلمّح لكيبورد الشاشة بس؛ `type` لسه هو اللي بيحدد سلوك القيمة الحقيقي",
          ),
          opt("b", "`inputmode` replaces `type` entirely", "`inputmode` بيلغي `type` خالص"),
          opt("c", "`type` is ignored once `inputmode` is set", "`type` بيتجاهل لما `inputmode` يتحط"),
          opt("d", "`inputmode` validates the value automatically", "`inputmode` بيعمل validation للقيمة لوحده"),
        ],
        "a",
        L(
          "`inputmode` hints which keyboard to show — keep a correct `type` as the real fallback for value semantics and validation.",
          "`inputmode` بيلمّح لكيبورد الشاشة — خلّي `type` الصحيح هو الـ fallback الحقيقي لمعنى القيمة والـ validation.",
        ),
        {
          hint: L(
            "One attribute changes the software keyboard; the other changes real value behavior.",
            "خاصية بتغيّر كيبورد الشاشة؛ التانية بتغيّر سلوك القيمة الحقيقي.",
          ),
        },
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
        {
          hint: L(
            "Check which attribute helps keyboards or autofill.",
            "بص أي `attribute` بيساعد الكيبورد أو الـ `autofill`.",
          ),
        },
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
        {
          hint: L(
            "Think keyboard shape, not credit-card math.",
            "فكّر في شكل الكيبورد، مش حساب رقم الكارت.",
          ),
        },
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
          hint: L(
            "`pattern` is a regex check, not decoration — look for a validation job.",
            "`pattern` فحص regex مش زينة — دور على وظيفة validation.",
          ),
        },
      ),
      q(
        "q5",
        L(
          "Why pair `pattern` with a `title` or a visible error message?",
          "ليه تربط `pattern` بـ `title` أو رسالة خطأ ظاهرة؟",
        ),
        [
          opt(
            "a",
            "A failed regex alone isn't accessible feedback — users need words, not just a rule",
            "فشل الـ regex لوحده مش feedback واضح — المستخدم محتاج كلام مش قاعدة بس",
          ),
          opt("b", "`title` is required for `pattern` to run at all", "`title` مطلوب عشان `pattern` يشتغل أصلًا"),
          opt("c", "Browsers translate regex into plain language automatically", "المتصفح بيترجم الـ regex للغة بسيطة لوحده"),
          opt("d", "It disables the native validation bubble", "بيعطّل فقاعة الـ validation الأصلية"),
        ],
        "a",
        L(
          "`pattern` adds a regex check but explains nothing on its own — pair it with `title` or a clear error message so users know what's expected.",
          "`pattern` بيضيف فحص regex بس مبيشرحش حاجة لوحده — اربطه بـ `title` أو رسالة خطأ واضحة عشان المستخدم يعرف المطلوب.",
        ),
        {
          hint: L(
            "What happens in a user's head when a regex silently rejects their input?",
            "المستخدم هيحس بإيه لما regex يرفض إدخاله من غير كلمة واحدة؟",
          ),
        },
      ),
    ],
  },

  "details-summary": {
    title: L("Details & summary check", "اختبار الأكورديون بـ `<details>` و `<summary>`"),
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
        {
          hint: L(
            "Toggle open/close with `<details>` and `<summary>`.",
            "افتح واقفل بـ `<details>` و `<summary>`.",
          ),
        },
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
        {
          hint: L(
            "The clickable toggle text lives directly inside `<summary>`, not in a separate label.",
            "نص الـ toggle القابل للضغط جوّه `<summary>` نفسه، مش في label منفصل.",
          ),
        },
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
        {
          hint: L(
            "`open` is a boolean flag for the widget's starting state.",
            "`open` علم boolean لحالة الودجت الأولى.",
          ),
        },
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
        {
          hint: L(
            "Without `<summary>` the widget has no visible toggle text at all.",
            "من غير `<summary>` الودجت مالوش نص toggle ظاهر خالص.",
          ),
        },
      ),
      q(
        "q5",
        L(
          "How can a group of `<details>` become an exclusive accordion (only one open at a time) without custom JS?",
          "إزاي مجموعة `<details>` تبقى accordion حصري (واحد مفتوح بس) من غير JS مخصوص؟",
        ),
        [
          opt(
            "a",
            "Give every `<details>` in the group the same `name` attribute",
            "ادّي كل `<details>` في المجموعة نفس خاصية `name`",
          ),
          opt("b", "Add an `exclusive` attribute to `<details>`", "ضيف خاصية `exclusive` على `<details>`"),
          opt("c", "Nest every `<details>` inside one shared `<summary>`", "حط كل `<details>` جوّه `<summary>` مشترك واحد"),
          opt("d", "It always needs JavaScript — there's no native way", "دايمًا محتاج JavaScript — مفيش طريقة أصلية"),
        ],
        "a",
        L(
          "A shared `name` attribute on sibling `<details>` elements makes them behave like an exclusive accordion in supporting browsers — opening one closes the others, no JS required.",
          "خاصية `name` مشتركة بين `<details>` الإخوة بتخليهم يتصرفوا كـ accordion حصري في المتصفحات الداعمة — فتح واحد بيقفل الباقي من غير JS.",
        ),
        {
          code: `<details name="faq">\n  <summary>Question one</summary>\n  <p>…</p>\n</details>\n<details name="faq">\n  <summary>Question two</summary>\n  <p>…</p>\n</details>`,
          language: "html",
          hint: L(
            "Look for the attribute that groups sibling widgets together — not a script.",
            "دور على الخاصية اللي بتجمّع الودجتس الإخوة مع بعض — مش سكريبت.",
          ),
        },
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
        {
          hint: L(
            "Prefer native HTML — it ships keyboard support for free.",
            "فضّل `HTML` الأصلي — بيجيب دعم الكيبورد جاهز.",
          ),
        },
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
        {
          hint: L(
            "Treat embeds as untrusted — start with a strict `sandbox`.",
            "اعتبر الـ `embeds` غير موثوق — ابدأ بـ `sandbox` مقيّد.",
          ),
        },
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
        {
          hint: L(
            "Prefer native `<video>`/`<audio>` with captions when you can.",
            "فضّل `<video>`/`<audio>` الأصلي مع captions لما تقدر.",
          ),
        },
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
          hint: L(
            "Look for the child element made for timed text tracks.",
            "دور على العنصر الابن المصمم لمسارات النص المؤقتة.",
          ),
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
        {
          hint: L(
            "Prefer native `<video>`/`<audio>` with captions when you can.",
            "فضّل `<video>`/`<audio>` الأصلي مع captions لما تقدر.",
          ),
        },
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
          opt("b", "Feature detection", "Feature detection (فحص دعم الميزة فعليًا)"),
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
          hint: L(
            "Ask the engine directly — checking a property beats reading a UA string.",
            "اسأل الـ engine مباشرة — فحص property أوثق من قراءة UA string.",
          ),
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
        {
          hint: L(
            "Test the API on the object — don't sniff `user-agent` strings.",
            "اختبر الـ API على الـ object — متشمّش `user-agent`.",
          ),
        },
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
          opt("d", "Delete older docs", "تمسح التوثيق القديم"),
        ],
        "b",
        L(
          "Detect support and keep a usable path for older engines.",
          "اكتشف الدعم وخلّي مسار قابل للاستخدام للمحركات الأقدم.",
        ),
        {
          hint: L(
            "Newly Baseline still needs a plan for browsers that lag behind.",
            "Newly Baseline لسه محتاج خطة للمتصفحات المتأخرة.",
          ),
        },
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
        {
          hint: L(
            "Start from a baseline that already works, then layer on extras.",
            "ابدأ من baseline شغّال بالفعل، وزوّد تحسينات فوقه.",
          ),
        },
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
        {
          hint: L(
            "Prefer feature detection over reading the browser name.",
            "فضّل `feature detection` على قراءة اسم المتصفح.",
          ),
        },
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
        {
          hint: L(
            "Native modals use `<dialog>` and `showModal()`.",
            "الـ modals الأصلية بـ `<dialog>` و `showModal()`.",
          ),
        },
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
        {
          hint: L(
            "Native modals use `<dialog>` and `showModal()`.",
            "الـ modals الأصلية بـ `<dialog>` و `showModal()`.",
          ),
        },
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
        {
          hint: L(
            "Native modals use `<dialog>` + `showModal()`.",
            "المودال الأصلي بـ `<dialog>` و `showModal()`.",
          ),
        },
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
          hint: L(
            "Look at the form's `method` attribute — it's the special one for dialogs.",
            "بص على خاصية `method` بتاعة الـ form — دي الخاصة بالـ dialogs.",
          ),
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
        {
          hint: L(
            "`showModal()` keeps Tab cycling inside the dialog, not just Escape to close it.",
            "`showModal()` بيخلي Tab يدور جوّه الـ dialog، مش بس Escape يقفله.",
          ),
        },
      ),
    ],
  },

  "picture-source": {
    title: L("Picture & source check", "اختبار الصور المتجاوبة (`<picture>` و `<source>`)"),
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
        {
          hint: L(
            "Check the final `<img>` — it's always the fallback.",
            "راجع `<img>` في الآخر — هو دايمًا الـ `fallback`.",
          ),
        },
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
        {
          hint: L(
            "Check the final `<img>` — it's always the fallback.",
            "راجع `<img>` في الآخر — هو دايمًا الـ `fallback`.",
          ),
        },
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
        {
          hint: L(
            "`type` is about format negotiation — AVIF, WebP, then a safe fallback.",
            "`type` عن تفاوض الصيغة — AVIF وبعدين WebP وبعدين fallback آمن.",
          ),
        },
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
          hint: L(
            "`media` is art direction — a different crop per viewport, not a format switch.",
            "`media` بتاع art direction — crop مختلف لكل viewport، مش تبديل صيغة.",
          ),
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
        {
          hint: L(
            "Same crop, different sizes is a `srcset` job — different crops need `<picture>`.",
            "نفس الـ crop بمقاسات مختلفة شغلانة `srcset` — crops مختلفة محتاجة `<picture>`.",
          ),
        },
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
          hint: L(
            "A native element ships role, focus, and Enter/Space for free — a div does not.",
            "العنصر الأصلي بيجيب role و focus و Enter/Space ببلاش — الـ div لأ.",
          ),
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
        {
          hint: L(
            "Read the snippet, then match it to the HTML job.",
            "اقرأ الـ `snippet`، وبعدين اختار التاج اللي بيعمل الشغل ده.",
          ),
        },
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
        {
          hint: L(
            "The accessible name is what gets announced — not color or a nearby placeholder.",
            "الاسم الـ accessible هو اللي بيتعلن — مش اللون ولا placeholder قريب.",
          ),
        },
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
        {
          hint: L(
            "First rule of ARIA: reach for it only when native HTML falls short.",
            "أول قاعدة في ARIA: استخدمه بس لما HTML الأصلي يقصّر.",
          ),
        },
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
        {
          hint: L(
            "Many people navigate entirely with Tab, Enter, and Space — no mouse at all.",
            "ناس كتير بيتنقلوا بالكيبورد بس — Tab و Enter و Space من غير ماوس خالص.",
          ),
        },
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
        {
          hint: L(
            "Crawlers need real text and links in the first HTML response.",
            "محركات البحث محتاجة نص ولينكات حقيقية في أول رد `HTML`.",
          ),
        },
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
        {
          hint: L(
            "Real links need a working `href`.",
            "اللينكات الحقيقية محتاجة `href` شغال.",
          ),
        },
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
        {
          hint: L(
            "The tab title lives in `<title>` inside `<head>`.",
            "عنوان التاب في `<title>` جوّه `<head>`.",
          ),
        },
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
          hint: L(
            "This is the snippet text under a search result — not a ranking lever.",
            "ده نص الـ snippet تحت نتيجة البحث — مش عامل ترتيب.",
          ),
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
        {
          hint: L(
            "Social and SEO tags belong in `<head>`.",
            "تاجات الـ SEO والسوشيال مكانها في `<head>`.",
          ),
        },
      ),
    ],
  },

  "head-social-meta": {
    title: L("Social meta check", "اختبار وسوم السوشيال ميديا"),
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
        {
          hint: L(
            "Social preview tags belong in `<head>`.",
            "وسوم معاينة السوشيال مكانها `<head>`.",
          ),
        },
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
        {
          hint: L(
            "Social preview tags belong in `<head>`.",
            "وسوم معاينة السوشيال مكانها `<head>`.",
          ),
        },
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
        {
          hint: L(
            "Social crawlers fetch and crop `og:image` fast — huge files fight that.",
            "زواحف السوشيال بتجيب وتقص `og:image` بسرعة — الملفات الضخمة بتعطّل ده.",
          ),
        },
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
        {
          hint: L(
            "Twitter reads its own `twitter:*` set — og:* alone doesn't fully cover it.",
            "Twitter بيقرا مجموعته الخاصة `twitter:*` — الـ og:* لوحده مش كفاية له.",
          ),
        },
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
          hint: L(
            "A crawler fetching this URL from a different context can't resolve a relative path.",
            "زاحف بيجيب اللينك ده من سياق تاني مش هيقدر يحلّ relative path.",
          ),
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
        {
          hint: L(
            "Check what a keyboard or screen reader would hear/focus.",
            "فكّر إيه اللي الكيبورد أو قارئ الشاشة هيسمعه.",
          ),
        },
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
        {
          hint: L(
            "Prefer native HTML — it ships keyboard support for free.",
            "فضّل `HTML` الأصلي — بيجيب دعم الكيبورد جاهز.",
          ),
        },
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
        {
          hint: L(
            "Check what a keyboard or screen reader would hear/focus.",
            "فكّر إيه اللي الكيبورد أو قارئ الشاشة هيسمعه.",
          ),
        },
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
          hint: L(
            "A real link needs a working `href`.",
            "اللينك الحقيقي محتاج `href` شغال.",
          ),
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
        {
          hint: L(
            "Check what a keyboard or screen reader would hear/focus.",
            "فكّر إيه اللي الكيبورد أو قارئ الشاشة هيسمعه.",
          ),
        },
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
          code: `<img src="https://placehold.co/1200x630/0f172a/38bdf8.jpg?text=Hero" alt="Hero" loading="lazy" />`,
          language: "html",
          hint: L(
            "A lazy hero delays the largest paint — check size and `loading` together.",
            "الـ hero الـ lazy بيأخّر أكبر paint — راجع المقاس و`loading` مع بعض.",
          ),
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
        {
          hint: L(
            "Sized images reserve space before they load.",
            "الصور بمقاس بتحجز مكان قبل ما تتحمّل.",
          ),
        },
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
        {
          hint: L(
            "Hero images load eagerly; below-the-fold can be `lazy`.",
            "صور الـ hero بتتحمّل فورًا؛ تحت الشاشة ممكن `lazy`.",
          ),
        },
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
        {
          hint: L(
            "`INP` is about how fast the page reacts after a tap or click.",
            "`INP` عن سرعة رد الصفحة بعد tap أو click.",
          ),
        },
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
        {
          hint: L(
            "Missing width/height means the browser can't reserve space in advance.",
            "من غير width/height المتصفح مش هيقدر يحجز مساحة قبلها.",
          ),
        },
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
        {
          hint: L(
            "Reserving layout space before the file arrives is a CLS fix, not an `alt` one.",
            "حجز مساحة الـ layout قبل ما الملف يوصل حل لـ CLS، مش موضوع `alt`.",
          ),
        },
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
        {
          hint: L(
            "Ask which resource is in the first screen — prioritize that.",
            "اسأل: أنهي ملف في أول شاشة؟ أولويته أعلى.",
          ),
        },
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
        {
          hint: L(
            "Below the fold means the browser can safely wait to fetch it.",
            "تحت الشاشة يعني المتصفح يقدر يستنى يجيبها براحته.",
          ),
        },
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
          code: `<img
  src="https://placehold.co/800x450/0ea5e9/fff.jpg?text=Hero"
  srcset="https://placehold.co/800x450/0ea5e9/fff.jpg?text=Hero 800w, https://placehold.co/1600x900/0ea5e9/fff.jpg?text=Hero 1600w"
  sizes="100vw"
  alt="Hero"
/>`,
          language: "html",
          hint: L(
            "`srcset` lets the browser pick the right pixel density for the device.",
            "`srcset` بيخلّي المتصفح يختار كثافة البكسل المناسبة للجهاز.",
          ),
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
        {
          hint: L(
            "`fetchpriority=\"high\"` is for the one image that matters most for LCP.",
            "`fetchpriority=\"high\"` للصورة الوحيدة الأهم لـ LCP.",
          ),
        },
      ),
    ],
  },

  "html-architecture-partials": {
    title: L("HTML architecture check", "اختبار هندسة HTML"),
    questions: [
      q(
        "q1",
        L(
          "How many `<main>` landmarks should a page have, even when the UI is split across many components?",
          "كام `<main>` landmark المفروض في الصفحة، حتى لو الـ UI متقسم على components كتير؟",
        ),
        [
          opt("a", "Exactly one", "واحد بالظبط"),
          opt("b", "One per component", "واحد لكل component"),
          opt("c", "None — `<main>` is optional", "ولا واحد — `<main>` اختياري"),
          opt("d", "As many as there are sections", "بعدد الـ sections"),
        ],
        "a",
        L(
          "Keep exactly one `<main>` landmark per page — splitting the UI into components doesn't change that rule.",
          "خلّي `<main>` واحد بس في كل صفحة — تقسيم الـ UI لـ components مبيغيّرش القاعدة دي.",
        ),
        {
          hint: L(
            "One page, one primary content region — no matter how many files render it.",
            "صفحة واحدة، منطقة محتوى أساسية واحدة — مهما كان عدد الملفات اللي بترسمها.",
          ),
        },
      ),
      q(
        "q2",
        L(
          "Why pull recurring header, nav, and footer chrome into their own regions instead of leaving it inside `<main>`?",
          "ليه نسحب الـ header و nav و footer المتكررة لمناطقها الخاصة بدل ما تفضل جوّه `<main>`؟",
        ),
        [
          opt(
            "a",
            "It keeps `<main>` scannable and gives assistive tech clear jump points",
            "بيخلي `<main>` سهل التصفح وبيدي assistive tech نقط قفز واضحة",
          ),
          opt("b", "Browsers require header/footer in separate files", "المتصفح بيفرض header/footer في ملفات منفصلة"),
          opt("c", "It disables CSS inheritance", "بيعطّل وراثة CSS"),
          opt("d", "It removes the need for a `<main>` element", "بيلغي الحاجة لعنصر `<main>`"),
        ],
        "a",
        L(
          "That split keeps `<main>` scannable and gives assistive tech clear jump points.",
          "الفصل ده بيخلي `<main>` سهل التصفح وبيدي التقنية المساعدة نقط قفز واضحة.",
        ),
        {
          hint: L(
            "Landmarks separate page chrome from primary content — check what stays inside `<main>`.",
            "الـ landmarks بتفصل chrome الصفحة عن المحتوى الأساسي — شوف إيه اللي يفضل جوّه `<main>`.",
          ),
        },
      ),
      q(
        "q3",
        L(
          "When a page is assembled from a header partial, page content, and a footer partial, how should heading ranks be chosen?",
          "لما الصفحة متجمّعة من header partial ومحتوى صفحة و footer partial، إزاي تختار مراتب الـ headings؟",
        ),
        [
          opt(
            "a",
            "By the real content hierarchy — one `<h1>`, then nested `<h2>`/`<h3>`, not by desired font size",
            "حسب ترتيب المحتوى الحقيقي — `<h1>` واحد، وبعدين `<h2>`/`<h3>` متداخلة، مش حسب حجم الخط المرغوب",
          ),
          opt("b", "Each partial restarts numbering at `<h1>`", "كل partial يبدأ ترقيمه من `<h1>` تاني"),
          opt("c", "Skip heading levels for smaller partials", "تخطّي مستويات الـ headings في الـ partials الصغيرة"),
          opt("d", "Heading levels only matter inside `<main>`", "مستويات الـ headings مهمة جوّه `<main>` بس"),
        ],
        "a",
        L(
          "Headings need a logical rank too: one `<h1>` per page, then `<h2>`/`<h3>` nested by actual content hierarchy, not by the font size you want.",
          "العناوين لازم مرتبة منطقية كمان: `<h1>` واحد لكل صفحة، وبعدين `<h2>`/`<h3>` متداخلة حسب ترتيب المحتوى الحقيقي، مش حسب حجم الخط اللي عايزه.",
        ),
        {
          hint: L(
            "Headings express hierarchy across the whole document — not per-partial resets.",
            "الـ headings بتعبّر عن hierarchy المستند كله — مش إعادة ضبط لكل partial.",
          ),
        },
      ),
      q(
        "q4",
        L(
          "Per progressive enhancement for critical content, what should JavaScript do to server-rendered HTML?",
          "حسب progressive enhancement للمحتوى الحرج، الـ JavaScript المفروض يعمل إيه في HTML الجاي من السيرفر؟",
        ),
        [
          opt(
            "a",
            "Enhance an already-usable document — add interactivity, not invent it from an empty shell",
            "يعزّز مستند شغّال بالفعل — يضيف تفاعلية، مش يخترعه من قالب فاضي",
          ),
          opt("b", "Replace the server HTML entirely once it loads", "يستبدل HTML السيرفر بالكامل بعد التحميل"),
          opt("c", "Remove landmarks before hydration", "يشيل الـ landmarks قبل الـ hydration"),
          opt("d", "Wait for every image to load before rendering anything", "يستنى كل الصور تتحمّل قبل ما يعرض أي حاجة"),
        ],
        "a",
        L(
          "Prefer server-rendered, meaningful HTML for critical content. JavaScript should enhance an already-usable document — add interactivity — not invent the whole page from an empty shell.",
          "فضّل HTML معنوي من السيرفر للمحتوى الحرج. الـ JavaScript المفروض يعزّز مستند شغال بالفعل — يضيف تفاعلية — مش يخترع الصفحة كلها من قالب فاضي.",
        ),
        {
          hint: L(
            "Picture the page before any JS has run — is there already something useful there?",
            "تخيّل الصفحة قبل ما أي JS يشتغل — فيه حاجة مفيدة موجودة أصلًا؟",
          ),
        },
      ),
      q(
        "q5",
        L(
          "Even when markup is split across many component files, what should the emitted tree still guarantee?",
          "حتى لو الـ markup متقسم على ملفات components كتير، الشجرة الناتجة لازم تضمن إيه؟",
        ),
        [
          opt(
            "a",
            "One `<main>`, sensible landmarks, and correct heading ranks",
            "`<main>` واحد، وlandmarks معقولة، ومراتب headings صح",
          ),
          opt("b", "Identical file names across components", "أسماء ملفات متطابقة بين الـ components"),
          opt("c", "Zero CSS classes", "صفر CSS classes"),
          opt("d", "No JavaScript anywhere", "مفيش JavaScript خالص"),
        ],
        "a",
        L(
          "In component frameworks the same rules apply — your component tree should still emit one main, sensible landmarks, and correct heading ranks, even when the markup is split across many files.",
          "في أطر المكونات نفس القواعد سارية — الـ component tree لسه لازم يطلّع main واحد و landmarks معقولة ومراتب headings صح، حتى لو الـ markup متقسم على ملفات كتير.",
        ),
        {
          hint: L(
            "Splitting files doesn't relax the landmark and heading rules — it just moves the code.",
            "تقسيم الملفات مبيلغيش قواعد الـ landmarks والـ headings — بس بينقل الكود.",
          ),
        },
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
        {
          hint: L(
            "External tabs need `rel=\"noopener noreferrer\"`.",
            "التابات الخارجية محتاجة `rel=\"noopener noreferrer\"`.",
          ),
        },
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
        {
          hint: L(
            "Start with nothing allowed, then grant only the specific permissions the embed needs.",
            "ابدأ من غير أي إذن، وبعدين امنح بس الصلاحيات المحددة اللي الـ embed محتاجها.",
          ),
        },
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
        {
          hint: L(
            "\"Hidden\" only means invisible in the layout — the value ships to every visitor.",
            "\"Hidden\" معناه مخفي في الـ layout بس — القيمة بتوصل لكل زائر.",
          ),
        },
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
        {
          hint: L(
            "Pick the token that says \"an existing password\", not a brand-new one.",
            "اختار الـ token اللي معناه \"باسورد موجود\"، مش باسورد جديد.",
          ),
        },
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
        {
          hint: L(
            "A submit button can carry its own `formaction` that overrides the form's `action`.",
            "زرار الـ submit ممكن يحمل `formaction` خاص بيه بيتخطّى `action` الفورم.",
          ),
        },
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
        {
          hint: L(
            "Never prefetch `logout` or `checkout` URLs.",
            "متعملش `prefetch` لـ `logout` أو `checkout`.",
          ),
        },
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
        {
          hint: L(
            "Never prefetch `logout` or `checkout` URLs.",
            "متعملش `prefetch` لـ `logout` أو `checkout`.",
          ),
        },
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
        {
          hint: L(
            "Speculative navigation should never trigger a state-changing action on its own.",
            "الـ navigation المضارب مايستحقش يعمل فعل بيغيّر state لوحده.",
          ),
        },
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
        {
          hint: L(
            "Start narrow: same-origin, high-confidence, side-effect-free URLs.",
            "ابدأ ضيّق: same-origin وعالي الثقة ومن غير side effects.",
          ),
        },
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
        {
          hint: L(
            "Real links need a working `href`.",
            "اللينكات الحقيقية محتاجة `href` شغال.",
          ),
        },
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
        {
          hint: L(
            "The root element is where document-wide language and direction defaults live.",
            "العنصر الجذر هو مكان افتراضيات اللغة والاتجاه للمستند كله.",
          ),
        },
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
        {
          hint: L(
            "Isolate the LTR token from the surrounding RTL text — don't just shout in caps.",
            "اعزل الـ token الـ LTR عن النص العربي حواليه — مش بس تكبّره.",
          ),
        },
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
        {
          hint: L(
            "Codes and emails paste and type more predictably in a fixed LTR direction.",
            "الأكواد والإيميلات بتتلصق وتتكتب بشكل متوقع أكتر باتجاه LTR ثابت.",
          ),
        },
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
        {
          hint: L(
            "Set `lang` and `dir` on `<html>` first.",
            "حط `lang` و `dir` على `<html>` الأول.",
          ),
        },
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
        {
          hint: L(
            "A node moved to `document.body` no longer inherits the page's `dir`/`lang` by default.",
            "عنصر اتنقل لـ `document.body` مبيورّثش `dir`/`lang` الصفحة تلقائيًا.",
          ),
        },
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
        {
          hint: L(
            "A div with a click handler still doesn't get focus or Enter/Space for free.",
            "الـ div بـ click handler لسه مش بياخد focus ولا Enter/Space ببلاش.",
          ),
        },
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
        {
          hint: L(
            "No alt means AT users get nothing where the image was meant to say something.",
            "من غير alt، مستخدمي AT مش هياخدوا حاجة مكان الصورة اللي كانت المفروض توصل معلومة.",
          ),
        },
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
        {
          hint: L(
            "Every control needs a visible `<label>`.",
            "كل حقل محتاج `<label>` ظاهر.",
          ),
        },
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
        {
          hint: L(
            "A link without a real destination still announces itself as a link, not a button.",
            "لينك من غير وجهة حقيقية لسه بيتعلن كلينك مش كزرار.",
          ),
        },
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
        {
          hint: L(
            "Heading level = outline meaning; size comes from `CSS`.",
            "مستوى الـ heading = معنى الـ outline؛ الحجم من `CSS`.",
          ),
        },
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
          opt("c", "Delete the docs", "تمسح التوثيق"),
          opt("d", "Inline it as a comment only", "تحطه كـ comment بس"),
        ],
        "b",
        L(
          "Cheat cards include compatibility badges so you can decide before paste.",
          "كروت الـ CheatSheet فيها شارات توافق عشان تقرر قبل اللصق.",
        ),
        {
          hint: L(
            "The compatibility bar on a card exists so you check it before shipping.",
            "شريط التوافق على الكارت موجود عشان تراجعه قبل النشر.",
          ),
        },
      ),
      q(
        "q2",
        L(
          "What do the category chips (Structure, Forms, Media, Interactive & Meta) let you do?",
          "أزرار الفئات (Structure و Forms و Media و Interactive & Meta) بتخليك تعمل إيه؟",
        ),
        [
          opt(
            "a",
            "Jump straight to the group of patterns you need",
            "تروح على طول للمجموعة اللي محتاجها",
          ),
          opt("b", "Compile the snippet into JavaScript", "تجمع الـ snippet لـ JavaScript"),
          opt("c", "Sort cards by Baseline score only", "ترتّب الكروت حسب Baseline بس"),
          opt("d", "Translate cards to Arabic", "تترجم الكروت للعربي"),
        ],
        "a",
        L(
          "Use the category chips to jump between Structure, Forms, Media, and Interactive & Meta patterns.",
          "استخدم أزرار الفئات للتنقّل بين Structure و Forms و Media و Interactive & Meta.",
        ),
        {
          hint: L(
            "Chips filter the card list by topic — they don't touch the code itself.",
            "الأزرار بتفلتر قائمة الكروت حسب الموضوع — مش بتلمس الكود نفسه.",
          ),
        },
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
        {
          hint: L(
            "A card is a reminder, not a finish line — the playground is where it sticks.",
            "الكارت تذكرة مش خط نهاية — الـ playground هو مكان الترسيخ.",
          ),
        },
      ),
      q(
        "q4",
        L(
          "What's the difference between a card's `Copy Code` and `Copy Boilerplate` actions?",
          "إيه الفرق بين `Copy Code` و `Copy Boilerplate` على الكارت؟",
        ),
        [
          opt(
            "a",
            "`Copy Code` copies just the snippet; `Copy Boilerplate` wraps it in a full runnable document",
            "`Copy Code` بينسخ الـ snippet بس؛ `Copy Boilerplate` بيلفه في مستند كامل جاهز للتشغيل",
          ),
          opt("b", "They copy the exact same thing twice", "بينسخوا نفس الحاجة مرتين"),
          opt("c", "`Copy Boilerplate` copies only Arabic text", "`Copy Boilerplate` بينسخ النص العربي بس"),
          opt("d", "`Copy Code` requires a paid plan", "`Copy Code` محتاج خطة مدفوعة"),
        ],
        "a",
        L(
          "Each card shows a mini live preview, `Copy Code`, and an optional `Copy Boilerplate` for a full document.",
          "كل كارت فيه معاينة مباشرة و `Copy Code` و `Copy Boilerplate` اختياري للمستند الكامل.",
        ),
        {
          hint: L(
            "One button gives you the fragment; the other wraps it so it runs standalone.",
            "زرار بيديك المقطع بس؛ التاني بيلفه عشان يشتغل لوحده.",
          ),
        },
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
        {
          hint: L(
            "A pasted snippet still has placeholder names — make them match your real page.",
            "الـ snippet الملصوق لسه فيه أسماء placeholder — خليها تناسب صفحتك الحقيقية.",
          ),
        },
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
