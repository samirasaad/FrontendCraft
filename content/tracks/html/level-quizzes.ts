import { L } from "@/content/helpers";
import { levelQuiz, O } from "@/content/tracks/_level-quiz-build";
import { HTML_LEVEL_QUIZ_SLUGS } from "@/lib/level-quiz/capstones";
import type { LevelQuestion, LevelQuizDefinition } from "@/lib/level-quiz/types";

// ─── Beginner (capstone: lists) ─────────────────────────────────────────────

const beginnerQuestions: LevelQuestion[] = [
  {
    id: "b-easy-mcq-doctype",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "What does this first line tell the browser?",
      "السطر الأول ده بيقول للمتصفح إيه؟",
    ),
    options: [
      O("a", "This page is only for old phones", "الصفحة للموبايلات القديمة بس"),
      O("b", "This is a modern HTML page", "دي صفحة HTML حديثة"),
      O("c", "Load JavaScript now", "حمّل JavaScript دلوقتي"),
      O("d", "Skip the rest of the file", "تخطّى باقي الملف"),
    ],
    correctId: "b",
    explanation: L(
      "Put `<!DOCTYPE html>` on line 1. It tells the browser: treat this file as modern HTML.",
      "حط `<!DOCTYPE html>` في السطر الأول. بيقول للمتصفح: الملف ده HTML حديث.",
    ),
    hint: L(
      "It is the very first line — before `<html>`.",
      "ده أول سطر خالص — قبل `<html>`.",
    ),
    code: `<!DOCTYPE html>`,
    language: "html",
  },
  {
    id: "b-easy-click-h1",
    type: "click-element",
    difficulty: "easy",
    prompt: L(
      "Click the big page title.",
      "اضغط على عنوان الصفحة الكبير.",
    ),
    markup: `<h1 data-target="title" style="margin:0 0 12px;font-size:22px">Fruit shop</h1>
<p data-target="intro" style="margin:0 0 12px">We sell apples.</p>
<a data-target="link" href="/buy" style="color:#0e7490">Buy apples</a>`,
    correctTargetId: "title",
    explanation: L(
      "The big title is `<h1>`. The sentence is a `<p>`. The blue text is an `<a>` link.",
      "العنوان الكبير `<h1>`. الجملة `<p>`. النص الأزرق لينك `<a>`.",
    ),
    demoHtml: `<h1 style="font:22px system-ui;margin:0">Fruit shop</h1><p style="font:16px system-ui">We sell apples.</p>`,
  },
  {
    id: "b-med-mcq-li",
    type: "mcq",
    difficulty: "medium",
    prompt: L(
      "Each row in this list should use which tag?",
      "كل سطر في القائمة دي يستخدم أنهي وسم؟",
    ),
    options: [
      O("a", "<li>", "<li>"),
      O("b", "<p>", "<p>"),
      O("c", "<div>", "<div>"),
      O("d", "<span>", "<span>"),
    ],
    correctId: "a",
    explanation: L(
      "A list is `<ul>` or `<ol>`. Each item inside it is `<li>`.",
      "القائمة `<ul>` أو `<ol>`. كل عنصر جوّهها `<li>`.",
    ),
    hint: L(
      "A list row is not a paragraph and not a box.",
      "سطر القائمة مش فقرة ومش صندوق.",
    ),
    code: `<ul>\n  <li>Eggs</li>\n  ??? Milk\n</ul>`,
    language: "html",
  },
  {
    id: "b-med-arrange-doc",
    type: "arrange-steps",
    difficulty: "medium",
    prompt: L(
      "Drag each node into page order, from top to bottom.",
      "اسحب كل node ترتيب الصفحة، من فوق لتحت.",
    ),
    items: [
      { id: "n7", label: L("<body>", "<body>") },
      { id: "n1", label: L("<!DOCTYPE html>", "<!DOCTYPE html>") },
      { id: "n9", label: L("<h1>Hello</h1>", "<h1>Hello</h1>") },
      { id: "n3", label: L("<head>", "<head>") },
      { id: "n10", label: L("</html>", "</html>") },
      { id: "n2", label: L('<html lang="en">', '<html lang="en">') },
      { id: "n6", label: L("</head>", "</head>") },
      { id: "n8", label: L("</body>", "</body>") },
      { id: "n5", label: L("<title>App</title>", "<title>App</title>") },
    ],
    correctOrder: ["n1", "n2", "n3", "n5", "n6", "n7", "n9", "n8", "n10"],
    explanation: L(
      "`<!DOCTYPE html>` then `<html>`, then `<head>` with `<title>`, close the head, then `<body>` with the heading people see, then close body and html.",
      "`<!DOCTYPE html>` بعدين `<html>`، بعدين `<head>` وفيها `<title>`، قفل الـ head، بعدين `<body>` والعنوان اللي الناس بتشوفه، بعدين قفل body و html.",
    ),
  },
  {
    id: "b-med-match-semantic",
    type: "match-pairs",
    difficulty: "medium",
    prompt: L(
      "Connect each tag node to what it does on the page.",
      "وصّل كل وسم باللي بيعمله في الصفحة.",
    ),
    left: [
      { id: "l1", label: L("<nav>", "<nav>") },
      { id: "l2", label: L("<main>", "<main>") },
      { id: "l3", label: L("<h1>", "<h1>") },
    ],
    right: [
      { id: "r1", label: L("The big page title", "عنوان الصفحة الكبير") },
      { id: "r2", label: L("The main content of this page", "المحتوى الأساسي للصفحة") },
      { id: "r3", label: L("The menu links", "لينكات القائمة") },
    ],
    correctPairs: { l1: "r3", l2: "r2", l3: "r1" },
    explanation: L(
      "`<nav>` = menu. `<main>` = the unique page content. `<h1>` = the main title.",
      "`<nav>` = القائمة. `<main>` = محتوى الصفحة. `<h1>` = العنوان الرئيسي.",
    ),
    demoHtml: `<style>
      body{margin:0;font:15px/1.4 system-ui,sans-serif;color:#0f172a;background:#fff}
      nav{background:#e0f2fe;padding:8px 12px;font-weight:600}
      main{padding:12px}
      h1{margin:0 0 6px;font-size:20px}
      p{margin:0;color:#475569}
    </style>
    <nav>Home · About</nav>
    <main>
      <h1>Fruit shop</h1>
      <p>We sell apples.</p>
    </main>`,
  },
  {
    id: "b-med-dom-main",
    type: "dom-tree",
    difficulty: "medium",
    prompt: L(
      "A shop page has a logo at the top, a fruit article in the middle, and contact at the bottom. Click the node that should wrap only the article.",
      "صفحة محل: لوجو فوق، مقال فاكهة في النص، وتواصل تحت. اضغط الـ node اللي يلف المقال بس.",
    ),
    tree: {
      id: "html",
      tag: "html",
      children: [
        {
          id: "head",
          tag: "head",
          children: [{ id: "title", tag: "title", label: L("Fruit shop", "محل فاكهة") }],
        },
        {
          id: "body",
          tag: "body",
          children: [
            { id: "header", tag: "header", label: L("Logo · Menu", "لوجو · قائمة") },
            { id: "main", tag: "main", label: L("Why we love apples", "ليه بنحب التفاح") },
            { id: "footer", tag: "footer", label: L("Contact · ©", "تواصل · ©") },
          ],
        },
      ],
    },
    correctNodeId: "main",
    explanation: L(
      "The article is unique to this page, so it goes in `<main>`. Logo/menu stay in `<header>`. Contact stays in `<footer>`. Do not pick `<body>` — that box holds all three.",
      "المقال خاص بالصفحة دي، فمكانه `<main>`. اللوجو والقائمة في `<header>`. التواصل في `<footer>`. متختارش `<body>` — الصندوق ده ماسك التلاتة.",
    ),
    hint: L(
      "Not the whole page (`<body>`). Not the top bar. The middle article box.",
      "مش الصفحة كلها (`<body>`). مش الشريط فوق. صندوق المقال في النص.",
    ),
  },
  {
    id: "b-hard-spot-fake-list",
    type: "click-element",
    difficulty: "hard",
    prompt: L(
      "Two trees look like lists. Click the fake one.",
      "شجرتين شكلهم قوائم. اضغط المزيفة.",
    ),
    markup: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-family:ui-sans-serif,system-ui,sans-serif;color:#0f172a">
  <div data-target="fake" data-label="A" style="text-align:start;border:2px dashed #94a3b8;border-radius:16px;padding:12px;background:#f8fafc;cursor:pointer">
    <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#64748b;margin-bottom:10px">A</div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
      <span style="width:10px;height:10px;border-radius:99px;background:#94a3b8"></span>
      <span style="font:600 13px ui-monospace,monospace">&lt;div&gt;</span>
    </div>
    <div style="margin-left:12px;padding-left:12px;border-left:2px solid #cbd5e1">
      <div style="display:flex;align-items:center;gap:8px;margin:6px 0">
        <span style="width:8px;height:8px;border-radius:99px;background:#cbd5e1"></span>
        <span style="font:13px ui-monospace,monospace">&lt;div&gt;</span>
        <span>• Milk</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin:6px 0">
        <span style="width:8px;height:8px;border-radius:99px;background:#cbd5e1"></span>
        <span style="font:13px ui-monospace,monospace">&lt;div&gt;</span>
        <span>• Eggs</span>
      </div>
    </div>
  </div>
  <div data-target="real" data-label="B" style="text-align:start;border:2px solid #22d3ee;border-radius:16px;padding:12px;background:#ecfeff;cursor:pointer">
    <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#0e7490;margin-bottom:10px">B</div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
      <span style="width:10px;height:10px;border-radius:99px;background:#22d3ee"></span>
      <span style="font:600 13px ui-monospace,monospace">&lt;ul&gt;</span>
    </div>
    <div style="margin-left:12px;padding-left:12px;border-left:2px solid #67e8f9">
      <div style="display:flex;align-items:center;gap:8px;margin:6px 0">
        <span style="width:8px;height:8px;border-radius:99px;background:#34d399"></span>
        <span style="font:13px ui-monospace,monospace">&lt;li&gt;</span>
        <span>Milk</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin:6px 0">
        <span style="width:8px;height:8px;border-radius:99px;background:#34d399"></span>
        <span style="font:13px ui-monospace,monospace">&lt;li&gt;</span>
        <span>Eggs</span>
      </div>
    </div>
  </div>
</div>`,
    correctTargetId: "fake",
    explanation: L(
      "A is fake: `<div>` boxes with a typed • . B is a real list: `<ul>` with `<li>` inside.",
      "A مزيفة: صناديق `<div>` وعلامة •. B قائمة حقيقية: `<ul>` وفيها `<li>`.",
    ),
    hint: L(
      "Grey `<div>` tree = fake. Cyan `<ul>` tree = real.",
      "شجرة `<div>` الرمادي = مزيفة. شجرة `<ul>` السماوي = حقيقية.",
    ),
  },
  {
    id: "b-hard-predict-list",
    type: "predict-visual",
    difficulty: "hard",
    prompt: L(
      "Look at the code. Which tree shows Apple nested under Fruit?",
      "بص على الكود. أنهي شجرة بتبيّن Apple جوّه Fruit؟",
    ),
    code: `<ul>
  <li>Fruit
    <ul>
      <li>Apple</li>
    </ul>
  </li>
</ul>`,
    language: "html",
    options: [
      {
        id: "flat",
        previewHtml: `<div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#0f172a;padding:10px">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
    <span style="width:10px;height:10px;border-radius:99px;background:#22d3ee"></span>
    <span style="font:600 13px ui-monospace,monospace;background:#ecfeff;border:1px solid #a5f3fc;border-radius:999px;padding:4px 10px">&lt;ul&gt;</span>
  </div>
  <div style="margin-left:14px;padding-left:12px;border-left:2px solid #67e8f9">
    <div style="display:flex;align-items:center;gap:8px;margin:8px 0">
      <span style="width:8px;height:8px;border-radius:99px;background:#34d399"></span>
      <span style="font:13px ui-monospace,monospace;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:999px;padding:3px 10px">&lt;li&gt; Fruit</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin:8px 0">
      <span style="width:8px;height:8px;border-radius:99px;background:#34d399"></span>
      <span style="font:13px ui-monospace,monospace;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:999px;padding:3px 10px">&lt;li&gt; Apple</span>
    </div>
  </div>
</div>`,
        label: L("Fruit and Apple as two top items", "Fruit و Apple عنصرين فوق"),
      },
      {
        id: "nested",
        previewHtml: `<div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#0f172a;padding:10px">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
    <span style="width:10px;height:10px;border-radius:99px;background:#22d3ee"></span>
    <span style="font:600 13px ui-monospace,monospace;background:#ecfeff;border:1px solid #a5f3fc;border-radius:999px;padding:4px 10px">&lt;ul&gt;</span>
  </div>
  <div style="margin-left:14px;padding-left:12px;border-left:2px solid #67e8f9">
    <div style="display:flex;align-items:center;gap:8px;margin:8px 0">
      <span style="width:8px;height:8px;border-radius:99px;background:#34d399"></span>
      <span style="font:13px ui-monospace,monospace;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:999px;padding:3px 10px">&lt;li&gt; Fruit</span>
    </div>
    <div style="margin-left:16px;padding-left:12px;border-left:2px solid #a7f3d0">
      <div style="display:flex;align-items:center;gap:8px;margin:8px 0">
        <span style="width:8px;height:8px;border-radius:99px;background:#22d3ee"></span>
        <span style="font:13px ui-monospace,monospace;background:#ecfeff;border:1px solid #a5f3fc;border-radius:999px;padding:3px 10px">&lt;ul&gt;</span>
      </div>
      <div style="margin-left:16px;padding-left:12px;border-left:2px solid #67e8f9">
        <div style="display:flex;align-items:center;gap:8px;margin:8px 0">
          <span style="width:8px;height:8px;border-radius:99px;background:#34d399"></span>
          <span style="font:13px ui-monospace,monospace;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:999px;padding:3px 10px">&lt;li&gt; Apple</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
        label: L("Apple nested under Fruit", "Apple جوّه Fruit"),
      },
    ],
    correctId: "nested",
    explanation: L(
      "Put the inner `<ul>` inside the Fruit `<li>`. If you put it next to Fruit, Apple becomes a second top item.",
      "حط `<ul>` الداخلية جوّه `<li>` بتاعة Fruit. لو حطيتها جنبها، Apple هتبقى عنصر تاني فوق.",
    ),
  },
  {
    id: "b-rw-a11y-link",
    type: "accessibility",
    difficulty: "real-world",
    prompt: L(
      "The link says only “click here”. What should you write instead?",
      "اللينك مكتوب عليه «click here» بس. تكتب إيه بدله؟",
    ),
    scenario: L(
      "The homepage has `<a href=\"/sale\">click here</a>` three times.",
      "الصفحة فيها `<a href=\"/sale\">click here</a>` ثلاث مرات.",
    ),
    options: [
      O("a", "Keep “click here”", "سيّب click here"),
      O("b", "Write what the link opens, like “Summer sale”", "اكتب اللي اللينك بيفتحه، زي «تخفيضات الصيف»"),
      O("c", "Change `<a>` to a `<div>`", "بدّل `<a>` بـ `<div>`"),
      O("d", "Hide the words", "خبّي الكلام"),
    ],
    correctId: "b",
    explanation: L(
      "The words inside `<a>…</a>` should say the destination. “Click here” tells nobody where they go.",
      "الكلام جوّه `<a>…</a>` لازم يقول الوجهة. «click here» مش بتقول هتروح فين.",
    ),
  },
  {
    id: "b-rw-click-href",
    type: "click-element",
    difficulty: "real-world",
    prompt: L(
      "Click the real link — the node that has `href`.",
      "اضغط اللينك الحقيقي — الـ node اللي فيه `href`.",
    ),
    markup: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-family:ui-sans-serif,system-ui,sans-serif;color:#0f172a">
  <div data-target="fake" data-label="A" style="border:2px dashed #94a3b8;border-radius:16px;padding:12px;background:#f8fafc;cursor:pointer">
    <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#64748b;margin-bottom:10px">A</div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="width:10px;height:10px;border-radius:99px;background:#94a3b8"></span>
      <span style="font:600 13px ui-monospace,monospace">&lt;span&gt;</span>
    </div>
    <div style="margin-left:12px;padding:8px 10px;border-left:2px solid #cbd5e1;color:#2563eb;text-decoration:underline">Read the docs</div>
  </div>
  <div data-target="real" data-label="B" style="border:2px solid #22d3ee;border-radius:16px;padding:12px;background:#ecfeff;cursor:pointer">
    <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#0e7490;margin-bottom:10px">B</div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">
      <span style="width:10px;height:10px;border-radius:99px;background:#22d3ee"></span>
      <span style="font:600 13px ui-monospace,monospace">&lt;a&gt;</span>
      <span style="font:12px ui-monospace,monospace;background:#fff;border:1px solid #a5f3fc;border-radius:999px;padding:2px 8px;color:#0f766e">href="/docs"</span>
    </div>
    <div style="margin-left:12px;padding:8px 10px;border-left:2px solid #67e8f9;color:#0e7490">Read the docs</div>
  </div>
</div>`,
    correctTargetId: "real",
    explanation: L(
      "A real link is `<a href=\"/docs\">`. A blue `<span>` only looks like a link — it does not open a page.",
      "اللينك الحقيقي `<a href=\"/docs\">`. الـ `<span>` الأزرق شكله لينك بس — مش بيفتح صفحة.",
    ),
    hint: L(
      "Find the node with `href=\"/docs\"`.",
      "دور على الـ node اللي فيه `href=\"/docs\"`.",
    ),
  },
];

// ─── Intermediate (capstone: details-summary) ────────────────────────────────

const intermediateQuestions: LevelQuestion[] = [
  {
    id: "i-easy-mcq-input",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "Which `type` gives built-in email validation?",
      "أي `type` يوفّر تحققاً مدمجاً من البريد الإلكتروني؟",
    ),
    options: [
      O("a", 'type="text"', 'type="text"'),
      O("b", 'type="email"', 'type="email"'),
      O("c", 'type="search"', 'type="search"'),
      O("d", 'type="url"', 'type="url"'),
    ],
    correctId: "b",
    explanation: L(
      "`type=\"email\"` hints the browser to validate format and can show an email keyboard on mobile.",
      "`type=\"email\"` يوجّه المتصفح للتحقق من التنسيق وقد يعرض لوحة مفاتيح بريد على الجوال.",
    ),
    code: `<input type="email" name="contact" />`,
    language: "html",
  },
  {
    id: "i-easy-click-summary",
    type: "click-element",
    difficulty: "easy",
    prompt: L(
      "Click the element users activate to toggle a `<details>` panel.",
      "انقر على العنصر الذي يُفعّله المستخدم لفتح وإغلاق لوحة `<details>`.",
    ),
    markup: `<details data-target="details">
  <summary data-target="summary">Shipping FAQ</summary>
  <p data-target="panel">We ship in 3–5 days.</p>
</details>`,
    correctTargetId: "summary",
    explanation: L(
      "`<summary>` is the native disclosure control for `<details>` — no JavaScript required.",
      "`<summary>` هو عنصر التحكم الأصلي لـ `<details>` — دون الحاجة إلى JavaScript.",
    ),
    demoHtml: `<details><summary>Shipping FAQ</summary><p>We ship in 3–5 days.</p></details>`,
  },
  {
    id: "i-med-fill-details",
    type: "fill-code",
    difficulty: "medium",
    prompt: L(
      "Complete the wrapper element for a native disclosure widget.",
      "أكمل عنصر الغلاف لأداة الإظهار/الإخفاء الأصلية.",
    ),
    template: `{{open}}\n  <summary>More info</summary>\n  <p>Hidden content</p>\n</details>`,
    blankId: "open",
    correctAnswers: ["<details>", "<details>"],
    language: "html",
    explanation: L(
      "`<details>` + `<summary>` is the built-in expand/collapse pattern in HTML.",
      "`<details>` + `<summary>` هو نمط التوسيع/الطي المدمج في HTML.",
    ),
    hint: L("It is not a `<div>` or `<section>`.", "ليس `<div>` ولا `<section>`."),
  },
  {
    id: "i-med-match-form",
    type: "match-pairs",
    difficulty: "medium",
    prompt: L(
      "Match each control to its best use.",
      "طابق كل عنصر تحكم مع أفضل استخدام له.",
    ),
    left: [
      { id: "l1", label: L("<textarea>", "<textarea>") },
      { id: "l2", label: L('<input type="checkbox">', '<input type="checkbox">') },
      { id: "l3", label: L("<select>", "<select>") },
    ],
    right: [
      { id: "r1", label: L("Multi-line message", "رسالة متعددة الأسطر") },
      { id: "r2", label: L("Pick one from many options", "اختيار واحد من عدة خيارات") },
      { id: "r3", label: L("Toggle an on/off setting", "تبديل إعداد تشغيل/إيقاف") },
    ],
    correctPairs: { l1: "r1", l2: "r3", l3: "r2" },
    explanation: L(
      "Pick the native control whose semantics match the data you collect.",
      "اختر عنصر التحكم الأصلي الذي تطابق دلالاته البيانات التي تجمعها.",
    ),
  },
  {
    id: "i-med-arrange-form",
    type: "arrange-steps",
    difficulty: "medium",
    prompt: L(
      "Order the steps to build an accessible labeled text field.",
      "رتّب خطوات بناء حقل نصي مُسمّى بشكل مُتاح.",
    ),
    items: [
      { id: "s1", label: L('Add <label for="name">Name</label>', 'أضف <label for="name">Name</label>') },
      { id: "s2", label: L('Add <input id="name" name="name" type="text">', 'أضف <input id="name" name="name" type="text">') },
      { id: "s3", label: L("Wrap both in <form>", "غلّفهما في <form>") },
      { id: "s4", label: L("Match label `for` with input `id`", "طابق `for` في label مع `id` في input") },
    ],
    correctOrder: ["s3", "s1", "s2", "s4"],
    explanation: L(
      "Explicit `<label for>` + matching `id` gives the input an accessible name.",
      "`<label for>` الصريح مع `id` مطابق يمنح الحقل اسماً مُتاحاً.",
    ),
  },
  {
    id: "i-med-spot-table",
    type: "spot-bug",
    difficulty: "medium",
    prompt: L(
      "Spot the cell tag used where a header cell belongs.",
      "حدد وسم الخلية المستخدم مكان خلية عنوان.",
    ),
    code: `<table>
  <thead>
    <tr>
      <td>Name</td>
      <td>Score</td>
    </tr>
  </thead>
</table>`,
    language: "html",
    bugToken: "<td>",
    explanation: L(
      "Header cells in `<thead>` should use `<th scope=\"col\">` — not `<td>`.",
      "خلايا العناوين في `<thead>` يجب أن تستخدم `<th scope=\"col\">` — وليس `<td>`.",
    ),
  },
  {
    id: "i-hard-before-details",
    type: "before-after",
    difficulty: "hard",
    prompt: L(
      "Which side shows a `<details>` element opened by default?",
      "أي جانب يعرض عنصر `<details>` مفتوحاً افتراضياً؟",
    ),
    beforeHtml: `<details><summary>Plan</summary><p>Basic</p></details>`,
    afterHtml: `<details open><summary>Plan</summary><p>Basic</p></details>`,
    options: [
      O("a", "Left (before)", "اليسار (قبل)"),
      O("b", "Right (after)", "اليمين (بعد)"),
    ],
    correctId: "b",
    explanation: L(
      "The boolean `open` attribute starts the disclosure in the expanded state.",
      "السمة المنطقية `open` تبدأ عنصر الإظهار في الحالة الموسّعة.",
    ),
  },
  {
    id: "i-hard-dom-td",
    type: "dom-tree",
    difficulty: "hard",
    prompt: L(
      "Select the data cell that holds “42”.",
      "اختر خلية البيانات التي تحتوي «42».",
    ),
    tree: {
      id: "table",
      tag: "table",
      children: [
        {
          id: "thead",
          tag: "thead",
          children: [
            {
              id: "hrow",
              tag: "tr",
              children: [
                { id: "th1", tag: "th", label: L("Name", "الاسم") },
                { id: "th2", tag: "th", label: L("Score", "الدرجة") },
              ],
            },
          ],
        },
        {
          id: "tbody",
          tag: "tbody",
          children: [
            {
              id: "drow",
              tag: "tr",
              children: [
                { id: "td1", tag: "td", label: L("Sara", "سارة") },
                { id: "td2", tag: "td", label: L("42", "42") },
              ],
            },
          ],
        },
      ],
    },
    correctNodeId: "td2",
    explanation: L(
      "`<td>` carries body data; `<th>` labels columns or rows.",
      "`<td>` يحمل بيانات الجسم؛ `<th>` يُسمّي الأعمدة أو الصفوف.",
    ),
  },
  {
    id: "i-rw-a11y-label",
    type: "accessibility",
    difficulty: "real-world",
    prompt: L(
      "Checkout shows a placeholder but no label. What helps screen-reader users most?",
      "صفحة الدفع تعرض placeholder دون label. ما الذي يفيد مستخدمي قارئ الشاشة أكثر؟",
    ),
    scenario: L(
      "`<input type=\"text\" placeholder=\"Promo code\">` sits alone with no `<label>`.",
      "`<input type=\"text\" placeholder=\"Promo code\">` بمفرده دون `<label>`.",
    ),
    options: [
      O("a", "Rely on placeholder as the name", "الاعتماد على placeholder كاسم"),
      O("b", "Add a visible <label for=\"promo\">Promo code</label>", "أضف <label for=\"promo\">Promo code</label> مرئياً"),
      O("c", "Use autofocus only", "استخدم autofocus فقط"),
      O("d", "Wrap input in <div role=\"textbox\">", "غلّف الحقل في <div role=\"textbox\">"),
    ],
    correctId: "b",
    explanation: L(
      "Placeholders disappear on input and are weak names. A real `<label>` persists.",
      "الـ placeholder يختفي عند الكتابة ولا يصلح اسماً قوياً. `<label>` حقيقي يبقى ظاهراً.",
    ),
  },
  {
    id: "i-rw-timeline-submit",
    type: "timeline",
    difficulty: "real-world",
    prompt: L(
      "Order the native form submission flow.",
      "رتّب تسلسل إرسال النموذج الأصلي.",
    ),
    items: [
      { id: "t1", label: L("User activates submit control", "المستخدم يُفعّل زر الإرسال") },
      { id: "t2", label: L("Browser runs constraint validation", "المتصفح ينفّذ constraint validation") },
      { id: "t3", label: L("Form data encodes per method/enctype", "بيانات النموذج تُرمّز حسب method/enctype") },
      { id: "t4", label: L("Navigation or fetch to action URL", "تنقل أو fetch إلى action URL") },
    ],
    correctOrder: ["t1", "t2", "t3", "t4"],
    explanation: L(
      "Validation runs before the request is built — invalid fields block submit.",
      "التحقق يعمل قبل بناء الطلب — الحقول غير الصالحة تمنع الإرسال.",
    ),
  },
];

// ─── Advanced (capstone: sr-practice) ────────────────────────────────────────

const advancedQuestions: LevelQuestion[] = [
  {
    id: "a-easy-mcq-alt",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "When is `alt` required on `<img>`?",
      "متى تكون `alt` مطلوبة على `<img>`؟",
    ),
    options: [
      O("a", "Never — decorative images skip it", "أبداً — الصور الزخرفية تتخطاها"),
      O("b", "Always — even decorative images need alt=\"\"", "دائماً — حتى الزخرفية تحتاج alt=\"\""),
      O("c", "Only when the image is a link", "فقط عندما تكون الصورة رابطاً"),
      O("d", "Only above the fold", "فقط فوق الطية الأولى"),
    ],
    correctId: "b",
    explanation: L(
      "Every `<img>` needs `alt`. Meaningful images get descriptive text; decorative ones use `alt=\"\"`.",
      "كل `<img>` تحتاج `alt`. الصور ذات المعنى تحصل على نص وصفي؛ الزخرفية تستخدم `alt=\"\"`.",
    ),
    code: `<img src="chart.png" alt="Q3 revenue up 12%">`,
    language: "html",
  },
  {
    id: "a-easy-click-picture",
    type: "click-element",
    difficulty: "easy",
    prompt: L(
      "Click the element that picks an image source for a viewport width.",
      "انقر على العنصر الذي يختار مصدر صورة لعرض معيّن.",
    ),
    markup: `<picture data-target="picture">
  <source data-target="source" media="(min-width: 800px)" srcset="hero-wide.jpg" />
  <img data-target="img" src="hero.jpg" alt="Team" />
</picture>`,
    correctTargetId: "source",
    explanation: L(
      "`<source>` inside `<picture>` selects art direction or resolution per media query.",
      "`<source>` داخل `<picture>` يختار اتجاه الصورة أو الدقة حسب media query.",
    ),
    demoHtml: `<picture><source media="(min-width:800px)" srcset="wide.jpg"><img src="narrow.jpg" alt="Team"></picture>`,
  },
  {
    id: "a-med-a11y-sr",
    type: "accessibility",
    difficulty: "medium",
    prompt: L(
      "A dialog opens but focus stays on the page behind it. Best first fix?",
      "يُفتح dialog لكن التركيز يبقى على الصفحة خلفه. ما أول إصلاح مناسب؟",
    ),
    scenario: L(
      "`<dialog open>` shows a modal, yet Tab still reaches the header links underneath.",
      "`<dialog open>` يعرض نافذة modal، لكن Tab ما زال يصل لروابط الترويسة تحته.",
    ),
    options: [
      O("a", "Add `aria-hidden=\"true\"` on <body>", "أضف `aria-hidden=\"true\"` على <body>"),
      O("b", "Call `dialog.showModal()` and trap focus inside", "استدعِ `dialog.showModal()` واحبس التركيز داخله"),
      O("c", "Set `tabindex=\"-1\"` on every link", "ضع `tabindex=\"-1\"` على كل رابط"),
      O("d", "Remove the dialog and use alert()", "احذف dialog واستخدم alert()"),
    ],
    correctId: "b",
    explanation: L(
      "Native modal dialogs opened with `showModal()` get focus trapping and inert backdrop behavior.",
      "نوافذ dialog الأصلية المفتوحة بـ `showModal()` تحصل على حبس تركيز وسلوك خلفية inert.",
    ),
  },
  {
    id: "a-med-fill-dialog",
    type: "fill-code",
    difficulty: "medium",
    prompt: L(
      "Complete the native modal element tag.",
      "أكمل وسم عنصر النافذة المنبثقة الأصلي.",
    ),
    template: `{{tag}} id="settings">\n  <form method="dialog">\n    <button>Close</button>\n  </form>\n</dialog>`,
    blankId: "tag",
    correctAnswers: ["<dialog", "<dialog>", "<dialog "],
    language: "html",
    explanation: L(
      "`<dialog>` is the semantic modal primitive — pair it with `showModal()` in script.",
      "`<dialog>` هو عنصر النافذة المنبثقة الدلالي — اربطه بـ `showModal()` في script.",
    ),
  },
  {
    id: "a-med-match-seo",
    type: "match-pairs",
    difficulty: "medium",
    prompt: L(
      "Match each `<head>` tag to its primary SEO or sharing role.",
      "طابق كل وسم في `<head>` مع دوره الأساسي في SEO أو المشاركة.",
    ),
    left: [
      { id: "l1", label: L("<title>", "<title>") },
      { id: "l2", label: L('<meta name="description">', '<meta name="description">') },
      { id: "l3", label: L('<link rel="canonical">', '<link rel="canonical">') },
    ],
    right: [
      { id: "r1", label: L("Preferred URL for duplicates", "الرابط المفضّل للنسخ المكررة") },
      { id: "r2", label: L("Snippet text in search results", "نص المقتطف في نتائج البحث") },
      { id: "r3", label: L("Browser tab and primary result title", "عنوان التبويب والنتيجة الرئيسية") },
    ],
    correctPairs: { l1: "r3", l2: "r2", l3: "r1" },
    explanation: L(
      "Title, description, and canonical each signal different things to crawlers and users.",
      "title و description و canonical كلٌّ يُشير لأمر مختلف لمحركات البحث والمستخدمين.",
    ),
  },
  {
    id: "a-med-responsive-picture",
    type: "responsive",
    difficulty: "medium",
    prompt: L(
      "At which breakpoint does the wide hero source apply?",
      "عند أي نقطة توقف يُطبَّق مصدر الصورة العريضة؟",
    ),
    code: `<picture>
  <source media="(min-width: 768px)" srcset="hero-wide.jpg" />
  <img src="hero.jpg" alt="Launch" style="width:100%;height:120px;object-fit:cover" />
</picture>`,
    breakpoints: [
      { id: "mobile", label: L("Mobile 360px", "جوال 360px"), width: 360 },
      { id: "tablet", label: L("Tablet 768px", "جهاز لوحي 768px"), width: 768 },
      { id: "desktop", label: L("Desktop 1024px", "سطح مكتب 1024px"), width: 1024 },
    ],
    correctBreakpointId: "tablet",
    explanation: L(
      "`(min-width: 768px)` matches at 768px and above — the wide asset loads there.",
      "`(min-width: 768px)` يطابق عند 768px فما فوق — هناك تُحمَّل الأصول العريضة.",
    ),
  },
  {
    id: "a-hard-spot-missing-alt",
    type: "spot-bug",
    difficulty: "hard",
    prompt: L(
      "Spot the informative image missing required alternative text.",
      "حدد الصورة المعلوماتية التي تفتقد النص البديل المطلوب.",
    ),
    code: `<img src="logo.svg" alt="">
<img src="team.jpg">
<img src="divider.png" alt="">`,
    language: "html",
    bugToken: `src="team.jpg"`,
    explanation: L(
      "Informative photos need descriptive `alt`. Decorative images use empty `alt=\"\"`.",
      "الصور المعلوماتية تحتاج `alt` وصفياً. الزخرفية تستخدم `alt=\"\"` فارغاً.",
    ),
  },
  {
    id: "a-hard-arrange-dialog",
    type: "arrange-steps",
    difficulty: "hard",
    prompt: L(
      "Order steps to open an accessible modal dialog.",
      "رتّب خطوات فتح dialog modal مُتاح.",
    ),
    items: [
      { id: "s1", label: L("Place primary action inside <dialog>", "ضع الإجراء الرئيسي داخل <dialog>") },
      { id: "s2", label: L("Add <button type=\"button\">Open</button> trigger", "أضف زر فتح <button type=\"button\">Open</button>") },
      { id: "s3", label: L("Call dialog.showModal() on click", "استدعِ dialog.showModal() عند النقر") },
      { id: "s4", label: L("Provide <form method=\"dialog\"> to close", "وفّر <form method=\"dialog\"> للإغلاق") },
    ],
    correctOrder: ["s1", "s4", "s2", "s3"],
    explanation: L(
      "Structure the dialog first, wire close affordance, then hook the open trigger to `showModal()`.",
      "ابنِ هيكل dialog أولاً، ثم ربط الإغلاق، ثم ربط زر الفتح بـ `showModal()`.",
    ),
  },
  {
    id: "a-rw-browser-picture",
    type: "browser-sim",
    difficulty: "real-world",
    prompt: L(
      "Add CSS so the `<img>` fills its frame without distortion (`object-fit`).",
      "أضف CSS ليملأ `<img>` الإطار دون تشويه (`object-fit`).",
    ),
    html: `<img src="https://picsum.photos/400/200" alt="Hero" style="width:100%;height:140px" />`,
    starterCss: `img {\n  \n}`,
    targetSubstring: "object-fit",
    explanation: L(
      "`object-fit: cover` crops gracefully inside a fixed box — common for hero images.",
      "`object-fit: cover` يقصّ بأناقة داخل صندوق ثابت — شائع لصور hero.",
    ),
    hint: L("Try `object-fit: cover;`", "جرّب `object-fit: cover;`"),
  },
  {
    id: "a-rw-build-landmarks",
    type: "build-layout",
    difficulty: "real-world",
    prompt: L(
      "Stack semantic landmarks top-to-bottom: header, main, footer.",
      "رتّب المعالم الدلالية من الأعلى للأسفل: header، main، footer.",
    ),
    blocks: [
      { id: "footer", label: L("<footer>", "<footer>") },
      { id: "header", label: L("<header>", "<header>") },
      { id: "main", label: L("<main>", "<main>") },
    ],
    correctOrder: ["header", "main", "footer"],
    previewCss: "body{margin:0;font:14px system-ui}",
    explanation: L(
      "Landmark order mirrors reading order — banner, primary content, then site footer.",
      "ترتيب المعالم يعكس ترتيب القراءة — الشعار، المحتوى الرئيسي، ثم تذييل الموقع.",
    ),
  },
];

// ─── Pro (capstone: html-common-pitfalls) ────────────────────────────────────

const proQuestions: LevelQuestion[] = [
  {
    id: "p-easy-mcq-noopener",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "Why add `rel=\"noopener\"` to `target=\"_blank\"` links?",
      "لماذا تُضاف `rel=\"noopener\"` لروابط `target=\"_blank\"`؟",
    ),
    options: [
      O("a", "Opens links faster", "تفتح الروابط أسرع"),
      O("b", "Prevents the new page from accessing `window.opener`", "تمنع الصفحة الجديدة من الوصول إلى `window.opener`"),
      O("c", "Required for HTTPS only", "مطلوبة لـ HTTPS فقط"),
      O("d", "Enables prefetch", "تُفعّل prefetch"),
    ],
    correctId: "b",
    explanation: L(
      "Without `noopener`, the opened tab can navigate your page via `window.opener` — a tab-nabbing risk.",
      "بدون `noopener`، يمكن للتبويب المفتوح التحكم بصفحتك عبر `window.opener` — خطر tab-nabbing.",
    ),
    code: `<a href="https://example.com" target="_blank" rel="noopener noreferrer">External</a>`,
    language: "html",
  },
  {
    id: "p-easy-console-query",
    type: "console",
    difficulty: "easy",
    prompt: L(
      "What does this log when the element exists?",
      "ماذا يُسجّل هذا عندما يكون العنصر موجوداً؟",
    ),
    code: `const el = document.querySelector('#missing');
console.log(el === null);`,
    correctAnswer: "true",
    explanation: L(
      "`querySelector` returns `null` when no match — compare with `=== null`.",
      "`querySelector` يُرجع `null` عند عدم وجود تطابق — قارن بـ `=== null`.",
    ),
  },
  {
    id: "p-med-spot-xss",
    type: "spot-bug",
    difficulty: "medium",
    prompt: L(
      "Spot the inline handler that invites XSS.",
      "حدد المعالج المضمّن الذي يفتح باب XSS.",
    ),
    code: `<button onclick="location='?q=' + userInput">Search</button>`,
    language: "html",
    bugToken: "onclick",
    explanation: L(
      "Inline event handlers mixing user input are XSS magnets — use script listeners and sanitize.",
      "معالجات الأحداث المضمّنة مع مدخلات المستخدم مغناطيس XSS — استخدم مستمعات script ونظّف المدخلات.",
    ),
  },
  {
    id: "p-med-arrange-lazy",
    type: "arrange-steps",
    difficulty: "medium",
    prompt: L(
      "Order best practices for lazy-loading below-the-fold images.",
      "رتّب أفضل الممارسات لتحميل الصور أسفل الطية بشكل كسول.",
    ),
    items: [
      { id: "s1", label: L("Keep width/height to reserve space", "احتفظ بـ width/height لحجز المساحة") },
      { id: "s2", label: L('Add loading="lazy" on below-fold <img>', 'أضف loading="lazy" على <img> أسفل الطية') },
      { id: "s3", label: L("Do not lazy-load the LCP hero image", "لا تستخدم lazy-load لصورة LCP hero") },
      { id: "s4", label: L("Provide meaningful alt text", "وفّر نص alt ذا معنى") },
    ],
    correctOrder: ["s4", "s1", "s3", "s2"],
    explanation: L(
      "Accessibility and layout stability come first; never lazy-load your LCP candidate.",
      "إمكانية الوصول واستقرار التخطيط أولاً؛ لا تستخدم lazy-load لمرشح LCP.",
    ),
  },
  {
    id: "p-med-match-security",
    type: "match-pairs",
    difficulty: "medium",
    prompt: L(
      "Match each attribute to the risk it mitigates.",
      "طابق كل سمة مع الخطر الذي تخفّفه.",
    ),
    left: [
      { id: "l1", label: L('rel="noopener"', 'rel="noopener"') },
      { id: "l2", label: L('rel="noreferrer"', 'rel="noreferrer"') },
      { id: "l3", label: L('autocomplete="off" on sensitive fields', 'autocomplete="off" على الحقول الحساسة') },
    ],
    right: [
      { id: "r1", label: L("Tab-nabbing via window.opener", "Tab-nabbing عبر window.opener") },
      { id: "r2", label: L("Referrer leakage to third parties", "تسرّب Referrer لأطراف ثالثة") },
      { id: "r3", label: L("Browser saving secrets in autofill", "حفظ المتصفح للأسرار في autofill") },
    ],
    correctPairs: { l1: "r1", l2: "r2", l3: "r3" },
    explanation: L(
      "Small attribute choices close real security and privacy holes in markup.",
      "خيارات السمات الصغيرة تغلق ثغرات أمن وخصوصية حقيقية في الترميز.",
    ),
  },
  {
    id: "p-med-timeline-render",
    type: "timeline",
    difficulty: "medium",
    prompt: L(
      "Order the critical rendering path milestones.",
      "رتّب محطات مسار العرض الحرجة.",
    ),
    items: [
      { id: "t1", label: L("Parse HTML → DOM", "تحليل HTML → DOM") },
      { id: "t2", label: L("Parse CSS → CSSOM", "تحليل CSS → CSSOM") },
      { id: "t3", label: L("Build render tree", "بناء render tree") },
      { id: "t4", label: L("Layout then paint", "Layout ثم paint") },
    ],
    correctOrder: ["t1", "t2", "t3", "t4"],
    explanation: L(
      "DOM and CSSOM merge into the render tree before layout calculates geometry.",
      "DOM و CSSOM يُدمجان في render tree قبل أن يحسب layout الهندسة.",
    ),
  },
  {
    id: "p-hard-before-defer",
    type: "before-after",
    difficulty: "hard",
    prompt: L(
      "Which side avoids render-blocking script?",
      "أي جانب يتجنب script الذي يعيق العرض؟",
    ),
    beforeHtml: `<!DOCTYPE html><html><head><script src="app.js"></script></head><body><h1>Hi</h1></body></html>`,
    afterHtml: `<!DOCTYPE html><html><head><script src="app.js" defer></script></head><body><h1>Hi</h1></body></html>`,
    options: [
      O("a", "Left — parser-blocking script", "اليسار — script يعيق المحلّل"),
      O("b", "Right — deferred script", "اليمين — script مؤجّل"),
    ],
    correctId: "b",
    explanation: L(
      "`defer` downloads in parallel but runs after HTML parse — better for non-critical bundles.",
      "`defer` يُحمّل بالتوازي لكنه يعمل بعد تحليل HTML — أفضل للحزم غير الحرجة.",
    ),
  },
  {
    id: "p-hard-fill-rel",
    type: "fill-code",
    difficulty: "hard",
    prompt: L(
      "Complete the safest `rel` value for external tabs.",
      "أكمل قيمة `rel` الأكثر أماناً للتبويبات الخارجية.",
    ),
    template: `<a href="https://partner.com" target="_blank" rel="{{rel}}">Partner</a>`,
    blankId: "rel",
    correctAnswers: [
      "noopener noreferrer",
      "noreferrer noopener",
      "noopener",
      "noreferrer",
    ],
    language: "html",
    explanation: L(
      "`noopener noreferrer` is the modern default pairing for untrusted `target=\"_blank\"` links.",
      "`noopener noreferrer` هو الاقتران الافتراضي الحديث لروابط `target=\"_blank\"` غير الموثوقة.",
    ),
  },
  {
    id: "p-rw-css-detective-inline",
    type: "css-detective",
    difficulty: "real-world",
    prompt: L(
      "Which inline style on the hero image hurts maintainability most?",
      "أي نمط مضمّن على صورة hero يضرّ بقابلية الصيانة أكثر؟",
    ),
    code: `<img
  src="hero.jpg"
  alt="Launch"
  style="width:100%;height:400px;object-fit:cover;display:block;margin:0 auto"
/>`,
    properties: [
      { id: "width", label: "width:100%" },
      { id: "object-fit", label: "object-fit:cover" },
      { id: "margin", label: "margin:0 auto" },
      { id: "display", label: "display:block" },
    ],
    correctPropertyId: "width",
    explanation: L(
      "Repeated layout rules in `style` resist theming — move shared presentation to CSS classes.",
      "قواعد التخطيط المتكررة في `style` تقاوم التنسيق — انقل العرض المشترك إلى classes في CSS.",
    ),
    hint: L(
      "Think about what belongs in a stylesheet vs one-off markup.",
      "فكّر فيما يخص stylesheet مقابل ترميز لمرة واحدة.",
    ),
  },
  {
    id: "p-rw-mini-cls",
    type: "mini-code",
    difficulty: "real-world",
    prompt: L(
      "Add CSS to reserve space and reduce layout shift for this hero image.",
      "أضف CSS لحجز المساحة وتقليل layout shift لصورة hero هذه.",
    ),
    html: `<img src="gallery-12.jpg" alt="Conference hall" width="800" height="600" />`,
    starterCss: `img {\n  max-width: 100%;\n  height: auto;\n}`,
    requiredCss: ["aspect-ratio"],
    explanation: L(
      "`aspect-ratio` (or explicit width/height) reserves space before the image loads — cutting CLS.",
      "`aspect-ratio` (أو width/height صريحين) يحجز المساحة قبل تحميل الصورة — فيقلّ CLS.",
    ),
    hint: L("Try `aspect-ratio: 4 / 3;`", "جرّب `aspect-ratio: 4 / 3;`"),
    demoHtml: `<img src="gallery.jpg" alt="Hall" width="800" height="600" style="max-width:100%;aspect-ratio:4/3">`,
  },
];

// ─── Registry ────────────────────────────────────────────────────────────────

export const htmlLevelQuizzes: Record<string, LevelQuizDefinition> = {
  [HTML_LEVEL_QUIZ_SLUGS.beginner]: levelQuiz(
    "html-beginner-level",
    "beginner",
    "HTML Beginner Level Quiz",
    "اختبار مستوى HTML للمبتدئين",
    beginnerQuestions,
  ),
  [HTML_LEVEL_QUIZ_SLUGS.intermediate]: levelQuiz(
    "html-intermediate-level",
    "intermediate",
    "HTML Intermediate Level Quiz",
    "اختبار مستوى HTML المتوسط",
    intermediateQuestions,
  ),
  [HTML_LEVEL_QUIZ_SLUGS.advanced]: levelQuiz(
    "html-advanced-level",
    "advanced",
    "HTML Advanced Level Quiz",
    "اختبار مستوى HTML المتقدم",
    advancedQuestions,
  ),
  [HTML_LEVEL_QUIZ_SLUGS.pro]: levelQuiz(
    "html-pro-level",
    "pro",
    "HTML Pro Level Quiz",
    "اختبار مستوى HTML الاحترافي",
    proQuestions,
  ),
};

export function assertHtmlLevelQuizCoverage(slugs: readonly string[]): void {
  const missing = slugs.filter((slug) => !htmlLevelQuizzes[slug]);
  if (missing.length > 0) {
    throw new Error(
      `Missing HTML level quiz for capstone slug(s): ${missing.join(", ")}`,
    );
  }
}
