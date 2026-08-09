import { L } from "@/content/helpers";
import { levelQuiz, O } from "@/content/tracks/_level-quiz-build";
import { CSS_LEVEL_QUIZ_SLUGS } from "@/lib/level-quiz/capstones";
import type { LevelQuestion, LevelQuizDefinition } from "@/lib/level-quiz/types";

// ─── Beginner: box model, cascade, units, colors, display ───────────────────

const beginnerQuestions: LevelQuestion[] = [
  {
    id: "css-beg-e1",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "Which property includes padding and border in the element's total width?",
      "أي خاصية تُضمّ padding و border إلى العرض الكلي للعنصر؟",
    ),
    options: [
      O("content-box", "content-box", "content-box"),
      O("border-box", "border-box", "border-box"),
      O("margin-box", "margin-box", "margin-box"),
      O("padding-box", "padding-box", "padding-box"),
    ],
    correctId: "border-box",
    code: "box-sizing: border-box;",
    language: "css",
    explanation: L(
      "border-box makes width/height include padding and border — the default in most resets.",
      "border-box يجعل width/height يشملان padding و border — وهو الافتراضي في معظم الـ resets.",
    ),
    hint: L("Think about the box model lesson.", "فكّر في درس box model."),
  },
  {
    id: "css-beg-e2",
    type: "fill-code",
    difficulty: "easy",
    prompt: L(
      "Complete the rule to hide an element from layout but keep it in the DOM:",
      "أكمل القاعدة لإخفاء عنصر من التخطيط مع إبقائه في الـ DOM:",
    ),
    template: ".modal { {{blank}}: none; }",
    blankId: "blank",
    correctAnswers: ["display"],
    language: "css",
    explanation: L(
      "display: none removes the element from the layout flow entirely.",
      "display: none يُزيل العنصر من تدفق التخطيط بالكامل.",
    ),
  },
  {
    id: "css-beg-m1",
    type: "match-pairs",
    difficulty: "medium",
    prompt: L(
      "Match each CSS unit to its best use case:",
      "طابق كل وحدة CSS مع حالة الاستخدام الأنسب لها:",
    ),
    left: [
      O("px", "px", "px"),
      O("em", "em", "em"),
      O("rem", "rem", "rem"),
      O("percent", "%", "%"),
    ],
    right: [
      O("r-root", "Root font-size relative", "نسبة لحجم خط الجذر"),
      O("p-parent", "Parent font-size relative", "نسبة لحجم خط الأب"),
      O("f-fixed", "Fixed pixel value", "قيمة ثابتة بالبكسل"),
      O("c-container", "Container width fraction", "جزء من عرض الحاوية"),
    ],
    correctPairs: { px: "f-fixed", em: "p-parent", rem: "r-root", percent: "c-container" },
    explanation: L(
      "rem scales with root font-size (accessible), em with parent, % with container, px is absolute.",
      "rem يتغير مع خط الجذر (accessible)، em مع الأب، % مع الحاوية، و px مطلق.",
    ),
  },
  {
    id: "css-beg-m2",
    type: "css-detective",
    difficulty: "medium",
    prompt: L(
      "Which property wins? Click the declaration that applies to .title:",
      "أي خاصية تفوز؟ انقر على التصريح الذي يُطبَّق على .title:",
    ),
    code: `.title { color: blue; }\n#hero .title { color: red; }\n.title { color: green !important; }`,
    properties: [
      { id: "p1", label: "color: blue;" },
      { id: "p2", label: "color: red;" },
      { id: "p3", label: "color: green !important;" },
    ],
    correctPropertyId: "p3",
    explanation: L(
      "!important beats specificity — even #hero .title loses to it.",
      "!important يتفوق على specificity — حتى #hero .title يخسر أمامه.",
    ),
  },
  {
    id: "css-beg-m3",
    type: "predict-visual",
    difficulty: "medium",
    prompt: L(
      "What does the browser render for these two spans?",
      "ماذا يعرض المتصفح لهذين span؟",
    ),
    code: `<span style="display:block;background:#3b82f6;color:#fff;padding:4px">A</span>\n<span style="display:inline;background:#22c55e;color:#fff;padding:4px">B</span>`,
    language: "html",
    options: [
      {
        id: "stack",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:8px;font-family:sans-serif"><div style="display:block;background:#3b82f6;color:#fff;padding:4px;width:100%">A</div><span style="display:inline;background:#22c55e;color:#fff;padding:4px">B</span></body></html>',
        label: L("A on its own line, B inline", "A في سطر مستقل، B inline"),
      },
      {
        id: "inline",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:8px;font-family:sans-serif"><span style="display:inline;background:#3b82f6;color:#fff;padding:4px">A</span><span style="display:inline;background:#22c55e;color:#fff;padding:4px">B</span></body></html>',
        label: L("Both on one line", "كلاهما في سطر واحد"),
      },
    ],
    correctId: "stack",
    explanation: L(
      "display:block starts a new block formatting context; display:inline flows with text.",
      "display:block يبدأ سياق تنسيق كتلة جديد؛ display:inline يتدفق مع النص.",
    ),
  },
  {
    id: "css-beg-m4",
    type: "spot-bug",
    difficulty: "medium",
    prompt: L(
      "Click the token causing the box to overflow its 200px width:",
      "انقر على الرمز الذي يجعل الصندوق يتجاوز عرض 200px:",
    ),
    code: `.card {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid #333;\n}`,
    language: "css",
    bugToken: "200px",
    explanation: L(
      "Without box-sizing: border-box, padding and border add to the 200px content width.",
      "بدون box-sizing: border-box، يُضاف padding و border إلى عرض المحتوى 200px.",
    ),
    hint: L("Default box-sizing is content-box.", "box-sizing الافتراضي هو content-box."),
  },
  {
    id: "css-beg-h1",
    type: "arrange-steps",
    difficulty: "hard",
    prompt: L(
      "Order the cascade steps from lowest to highest priority:",
      "رتّب خطوات الـ cascade من الأقل إلى الأعلى أولوية:",
    ),
    items: [
      O("s1", "User-agent stylesheet", "User-agent stylesheet"),
      O("s2", "Author stylesheet", "Author stylesheet"),
      O("s3", "!important author rule", "!important author rule"),
      O("s4", "Inline style", "Inline style"),
    ],
    correctOrder: ["s1", "s2", "s4", "s3"],
    explanation: L(
      "Origin order: user-agent < author < inline; !important in author beats inline without !important.",
      "ترتيب المصدر: user-agent < author < inline؛ !important في author يتفوق على inline بدون !important.",
    ),
  },
  {
    id: "css-beg-h2",
    type: "before-after",
    difficulty: "hard",
    prompt: L(
      "A designer wants accessible contrast. Which change fixes the text?",
      "مصمم يريد تباينًا accessible. أي تغيير يُصلح النص؟",
    ),
    beforeHtml:
      '<div style="background:#f0f0f0;padding:16px;font-family:sans-serif"><p style="color:#ccc;font-size:14px">Welcome back</p></div>',
    afterHtml:
      '<div style="background:#f0f0f0;padding:16px;font-family:sans-serif"><p style="color:#333;font-size:14px">Welcome back</p></div>',
    options: [
      O("a", "color: #333", "color: #333"),
      O("b", "font-size: 20px", "font-size: 20px"),
      O("c", "background: #000", "background: #000"),
      O("d", "display: none", "display: none"),
    ],
    correctId: "a",
    explanation: L(
      "#ccc on #f0f0f0 fails WCAG contrast; #333 on light gray passes.",
      "#ccc على #f0f0f0 يفشل تباين WCAG؛ #333 على رمادي فاتح ينجح.",
    ),
  },
  {
    id: "css-beg-rw1",
    type: "browser-sim",
    difficulty: "real-world",
    prompt: L(
      "Add CSS so the card has a 2px solid border and 12px padding:",
      "أضف CSS ليحصل البطاقة على border بسُمك 2px و padding بقيمة 12px:",
    ),
    html: '<div class="card">Product</div>',
    starterCss: `.card {\n  background: #1e293b;\n  color: white;\n  border-radius: 8px;\n}`,
    targetSubstring: "border:",
    explanation: L(
      "border: 2px solid … and padding: 12px are everyday card styles.",
      "border: 2px solid … و padding: 12px من أنماط البطاقات اليومية.",
    ),
    hint: L("You need border and padding properties.", "تحتاج خاصيتي border و padding."),
  },
  {
    id: "css-beg-rw2",
    type: "mini-code",
    difficulty: "real-world",
    prompt: L(
      "Fix the layout: make .wrapper a centered flex row with 16px gap:",
      "أصلح التخطيط: اجعل .wrapper صف flex متمركزًا بفجوة 16px:",
    ),
    html: '<div class="wrapper"><div class="item">1</div><div class="item">2</div></div>',
    starterCss: `.wrapper {\n}\n.item {\n  background: #6366f1;\n  color: white;\n  padding: 12px;\n}`,
    requiredCss: ["display: flex", "gap: 16px"],
    explanation: L(
      "display:flex + justify-content:center + align-items:center + gap is a common nav pattern.",
      "display:flex + justify-content:center + align-items:center + gap نمط شائع للتنقل.",
    ),
  },
];

// ─── Intermediate: flexbox, grid, positioning, responsive ──────────────────

const intermediateQuestions: LevelQuestion[] = [
  {
    id: "css-int-e1",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "Which flex property distributes extra space along the main axis?",
      "أي خاصية flex توزّع المساحة الإضافية على المحور الرئيسي؟",
    ),
    options: [
      O("align-items", "align-items", "align-items"),
      O("justify-content", "justify-content", "justify-content"),
      O("flex-wrap", "flex-wrap", "flex-wrap"),
      O("align-content", "align-content", "align-content"),
    ],
    correctId: "justify-content",
    explanation: L(
      "justify-content aligns/distributes along the main axis; align-items on the cross axis.",
      "justify-content يُحاذي/يوزّع على المحور الرئيسي؛ align-items على المحور العرضي.",
    ),
  },
  {
    id: "css-int-e2",
    type: "match-pairs",
    difficulty: "easy",
    prompt: L(
      "Match layout tool to best use case:",
      "طابق أداة التخطيط مع حالة الاستخدام الأنسب:",
    ),
    left: [
      O("flex", "Flexbox", "Flexbox"),
      O("grid", "CSS Grid", "CSS Grid"),
      O("absolute", "position: absolute", "position: absolute"),
      O("sticky", "position: sticky", "position: sticky"),
    ],
    right: [
      O("r-2d", "Two-dimensional page regions", "مناطق صفحة ثنائية الأبعاد"),
      O("r-1d", "One-dimensional row or column", "صف أو عمود أحادي البعد"),
      O("r-overlay", "Overlay on a positioned parent", "طبقة فوق أب positioned"),
      O("r-scroll", "Stick while scrolling", "يلتصق أثناء التمرير"),
    ],
    correctPairs: { flex: "r-1d", grid: "r-2d", absolute: "r-overlay", sticky: "r-scroll" },
    explanation: L(
      "Flex for 1D distribution, Grid for 2D tracks, absolute for overlays, sticky for scroll headers.",
      "Flex للتوزيع أحادي البعد، Grid للمسارات ثنائية الأبعاد، absolute للطبقات، sticky لرؤوس التمرير.",
    ),
  },
  {
    id: "css-int-m1",
    type: "predict-visual",
    difficulty: "medium",
    prompt: L(
      "With flex-direction: column, where does justify-content place items?",
      "مع flex-direction: column، أين يضع justify-content العناصر؟",
    ),
    code: `.box {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 200px;\n}`,
    language: "css",
    options: [
      {
        id: "v-center",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:0"><div style="display:flex;flex-direction:column;justify-content:center;height:120px;background:#1e293b;gap:4px"><div style="background:#6366f1;color:#fff;padding:8px">A</div><div style="background:#6366f1;color:#fff;padding:8px">B</div></div></body></html>',
        label: L("Vertically centered stack", "مكدس متمركز عموديًا"),
      },
      {
        id: "h-center",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:0"><div style="display:flex;flex-direction:row;justify-content:center;height:120px;background:#1e293b;gap:4px"><div style="background:#6366f1;color:#fff;padding:8px">A</div><div style="background:#6366f1;color:#fff;padding:8px">B</div></div></body></html>',
        label: L("Horizontally centered row", "صف متمركز أفقيًا"),
      },
    ],
    correctId: "v-center",
    explanation: L(
      "flex-direction: column makes the main axis vertical, so justify-content centers vertically.",
      "flex-direction: column يجعل المحور الرئيسي عموديًا، فيُمرّر justify-content عموديًا.",
    ),
  },
  {
    id: "css-int-m2",
    type: "fill-code",
    difficulty: "medium",
    prompt: L(
      "Complete the grid rule for two equal columns:",
      "أكمل قاعدة grid لعمودين متساويين:",
    ),
    template: ".layout {\n  display: grid;\n  grid-template-columns: {{blank}};\n}",
    blankId: "blank",
    correctAnswers: ["1fr 1fr", "repeat(2, 1fr)", "repeat(2,1fr)"],
    language: "css",
    explanation: L(
      "1fr 1fr or repeat(2, 1fr) splits available space into two equal tracks.",
      "1fr 1fr أو repeat(2, 1fr) يقسّم المساحة المتاحة إلى مسارين متساويين.",
    ),
  },
  {
    id: "css-int-m3",
    type: "css-detective",
    difficulty: "medium",
    prompt: L(
      "The tooltip is misplaced. Click the property causing it:",
      "تلميح الأداة في موضع خاطئ. انقر على الخاصية المسببة:",
    ),
    code: `.parent { position: relative; }\n.tooltip {\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n}`,
    properties: [
      { id: "p1", label: "position: relative;" },
      { id: "p2", label: "position: absolute;" },
      { id: "p3", label: "transform: translateX(-50%);" },
    ],
    correctPropertyId: "p2",
    explanation: L(
      "position:absolute removes the tooltip from flow and anchors it to the positioned parent.",
      "position:absolute يُخرج التلميح من التدفق ويربطه بالأب positioned.",
    ),
  },
  {
    id: "css-int-m4",
    type: "responsive",
    difficulty: "medium",
    prompt: L(
      "At which breakpoint does this media query activate?",
      "عند أي breakpoint يُفعَّل هذا media query؟",
    ),
    code: `@media (min-width: 768px) {\n  .sidebar { display: block; }\n}`,
    breakpoints: [
      { id: "bp-mobile", label: L("Mobile (320px)", "Mobile (320px)"), width: 320 },
      { id: "bp-tablet", label: L("Tablet (768px)", "Tablet (768px)"), width: 768 },
      { id: "bp-desktop", label: L("Desktop (1280px)", "Desktop (1280px)"), width: 1280 },
    ],
    correctBreakpointId: "bp-tablet",
    explanation: L(
      "min-width: 768px applies at 768px and above — the common tablet breakpoint.",
      "min-width: 768px يُطبَّق عند 768px فما فوق — breakpoint التابلت الشائع.",
    ),
  },
  {
    id: "css-int-h1",
    type: "build-layout",
    difficulty: "hard",
    prompt: L(
      "Reorder blocks to build a holy-grail layout structure:",
      "أعد ترتيب الكتل لبناء هيكل holy-grail:",
    ),
    blocks: [
      O("header", "header", "header"),
      O("nav", "nav", "nav"),
      O("main", "main", "main"),
      O("aside", "aside", "aside"),
      O("footer", "footer", "footer"),
    ],
    correctOrder: ["header", "nav", "main", "aside", "footer"],
    previewCss: "body { display: grid; grid-template-rows: auto auto 1fr auto; }",
    explanation: L(
      "Semantic order: header → nav → main content → aside → footer.",
      "الترتيب الدلالي: header → nav → main → aside → footer.",
    ),
  },
  {
    id: "css-int-h2",
    type: "spot-bug",
    difficulty: "hard",
    prompt: L(
      "Grid items overlap. Click the token causing implicit row chaos:",
      "عناصر grid تتداخل. انقر على الرمز المسبب لفوضى الصفوف الضمنية:",
    ),
    code: `.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n.item-wide {\n  grid-column: span 3;\n}`,
    language: "css",
    bugToken: "span 3",
    explanation: L(
      "span 3 exceeds the 2-column template, creating extra implicit tracks and layout breaks.",
      "span 3 يتجاوز قالب العمودين، فيُنشئ مسارات ضمنية إضافية ويكسر التخطيط.",
    ),
  },
  {
    id: "css-int-rw1",
    type: "browser-sim",
    difficulty: "real-world",
    prompt: L(
      "Make the image responsive: max-width 100% and height auto:",
      "اجعل الصورة responsive: max-width 100% و height auto:",
    ),
    html: '<img class="hero" src="https://placehold.co/800x400" alt="Hero" />',
    starterCss: `.hero {\n  display: block;\n}`,
    targetSubstring: "max-width: 100%",
    explanation: L(
      "max-width:100%; height:auto prevents overflow while keeping aspect ratio.",
      "max-width:100%; height:auto يمنع التجاوز مع الحفاظ على نسبة العرض إلى الارتفاع.",
    ),
  },
  {
    id: "css-int-rw2",
    type: "arrange-steps",
    difficulty: "real-world",
    prompt: L(
      "Order a mobile-first responsive workflow:",
      "رتّب سير عمل responsive بأسلوب mobile-first:",
    ),
    items: [
      O("s1", "Write base styles for small screens", "اكتب أنماط أساسية للشاشات الصغيرة"),
      O("s2", "Add min-width media queries for larger breakpoints", "أضف media queries بـ min-width لنقاط أكبر"),
      O("s3", "Test at real device widths", "اختبر على عروض أجهزة حقيقية"),
      O("s4", "Use relative units (rem, %) where possible", "استخدم وحدات نسبية (rem, %) حيثما أمكن"),
    ],
    correctOrder: ["s4", "s1", "s2", "s3"],
    explanation: L(
      "Mobile-first: relative units → base mobile CSS → progressive min-width enhancements → test.",
      "Mobile-first: وحدات نسبية → CSS أساسي للموبايل → تحسينات min-width تدريجية → اختبار.",
    ),
  },
];

// ─── Advanced: custom properties, animations, logical properties ─────────────

const advancedQuestions: LevelQuestion[] = [
  {
    id: "css-adv-e1",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "How do you reference a custom property named --brand in CSS?",
      "كيف تُشير إلى custom property باسم --brand في CSS؟",
    ),
    options: [
      O("a", "brand()", "brand()"),
      O("b", "var(--brand)", "var(--brand)"),
      O("c", "$brand", "$brand"),
      O("d", "get(--brand)", "get(--brand)"),
    ],
    correctId: "b",
    code: "color: var(--brand);",
    language: "css",
    explanation: L(
      "Custom properties are read with var(--name) and can include fallbacks: var(--brand, blue).",
      "تُقرأ custom properties بـ var(--name) ويمكن إضافة fallback: var(--brand, blue).",
    ),
  },
  {
    id: "css-adv-e2",
    type: "fill-code",
    difficulty: "easy",
    prompt: L(
      "Declare a custom property --accent with value #6366f1 on :root:",
      "عرّف custom property --accent بقيمة #6366f1 على :root:",
    ),
    template: ":root {\n  {{blank}}: #6366f1;\n}",
    blankId: "blank",
    correctAnswers: ["--accent"],
    language: "css",
    explanation: L(
      "Custom properties must start with -- and are inherited like regular properties.",
      "يجب أن تبدأ custom properties بـ -- وتُورَّث مثل الخصائص العادية.",
    ),
  },
  {
    id: "css-adv-m1",
    type: "match-pairs",
    difficulty: "medium",
    prompt: L(
      "Match physical property to its logical equivalent:",
      "طابق الخاصية الفيزيائية مع المكافئ المنطقي:",
    ),
    left: [
      O("ml", "margin-left", "margin-left"),
      O("pl", "padding-left", "padding-left"),
      O("bl", "border-left", "border-left"),
      O("tl", "text-align: left", "text-align: left"),
    ],
    right: [
      O("mis", "margin-inline-start", "margin-inline-start"),
      O("pis", "padding-inline-start", "padding-inline-start"),
      O("bis", "border-inline-start", "border-inline-start"),
      O("tis", "text-align: start", "text-align: start"),
    ],
    correctPairs: { ml: "mis", pl: "pis", bl: "bis", tl: "tis" },
    explanation: L(
      "Logical properties use inline/block axes so layouts adapt to writing direction.",
      "الخصائص المنطقية تستخدم محوري inline/block لتتكيف مع اتجاه الكتابة.",
    ),
  },
  {
    id: "css-adv-m2",
    type: "predict-visual",
    difficulty: "medium",
    prompt: L(
      "What happens after the animation runs once?",
      "ماذا يحدث بعد تشغيل الـ animation مرة واحدة؟",
    ),
    code: `@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.box {\n  animation: fade 1s forwards;\n}`,
    language: "css",
    options: [
      {
        id: "stay",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:8px;font-family:sans-serif"><div style="opacity:1;background:#6366f1;color:#fff;padding:12px;border-radius:8px">Visible</div></body></html>',
        label: L("Stays at opacity 1", "يبقى عند opacity 1"),
      },
      {
        id: "reset",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:8px;font-family:sans-serif"><div style="opacity:0;background:#6366f1;color:#fff;padding:12px;border-radius:8px">Hidden</div></body></html>',
        label: L("Snaps back to opacity 0", "يعود فجأة إلى opacity 0"),
      },
    ],
    correctId: "stay",
    explanation: L(
      "animation-fill-mode: forwards (shorthand: forwards) keeps the final keyframe state.",
      "animation-fill-mode: forwards (اختصار: forwards) يحافظ على حالة الإطار الأخير.",
    ),
  },
  {
    id: "css-adv-m3",
    type: "css-detective",
    difficulty: "medium",
    prompt: L(
      "The hover transition feels instant. Click the missing timing property:",
      "انتقال hover يبدو فوريًا. انقر على خاصية التوقيت الناقصة:",
    ),
    code: `.btn {\n  background: #6366f1;\n  transition-property: background;\n  transition-duration: 0.3s;\n}`,
    properties: [
      { id: "p1", label: "transition-property: background;" },
      { id: "p2", label: "transition-duration: 0.3s;" },
      { id: "p3", label: "background: #6366f1;" },
    ],
    correctPropertyId: "p2",
    explanation: L(
      "Without transition-duration the change is instant even if transition-property is set.",
      "بدون transition-duration يكون التغيير فوريًا حتى لو وُضعت transition-property.",
    ),
    hint: L("Duration controls how long the transition takes.", "Duration يتحكم بمدة الانتقال."),
  },
  {
    id: "css-adv-m4",
    type: "timeline",
    difficulty: "medium",
    prompt: L(
      "Order the steps to create a reusable theme with custom properties:",
      "رتّب خطوات إنشاء theme قابل لإعادة الاستخدام بـ custom properties:",
    ),
    items: [
      O("s1", "Define tokens on :root", "عرّف tokens على :root"),
      O("s2", "Reference tokens with var()", "أشر إلى tokens بـ var()"),
      O("s3", "Override tokens in a dark theme class", "أعد تعريف tokens في class للوضع الداكن"),
      O("s4", "Use tokens in component rules", "استخدم tokens في قواعد المكوّنات"),
    ],
    correctOrder: ["s1", "s2", "s4", "s3"],
    explanation: L(
      "Define → reference in components → optionally override per theme context.",
      "عرّف → أشر في المكوّنات → أعد التعريف اختياريًا لكل سياق theme.",
    ),
  },
  {
    id: "css-adv-h1",
    type: "spot-bug",
    difficulty: "hard",
    prompt: L(
      "RTL layout breaks. Click the physical property that should be logical:",
      "تخطيط RTL ينكسر. انقر على الخاصية الفيزيائية التي يجب أن تكون منطقية:",
    ),
    code: `.card {\n  margin-left: 1rem;\n  padding-inline-start: 1rem;\n  border-inline-start: 2px solid #6366f1;\n}`,
    language: "css",
    bugToken: "margin-left",
    explanation: L(
      "Mixing margin-left with logical properties breaks in RTL; use margin-inline-start consistently.",
      "خلط margin-left مع الخصائص المنطقية يكسر RTL؛ استخدم margin-inline-start باستمرار.",
    ),
  },
  {
    id: "css-adv-h2",
    type: "before-after",
    difficulty: "hard",
    prompt: L(
      "Which change enables a smooth color shift on hover?",
      "أي تغيير يُمكّن تحول لون سلس عند hover؟",
    ),
    beforeHtml:
      '<button style="background:#6366f1;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-family:sans-serif">Click</button>',
    afterHtml:
      '<button style="background:#6366f1;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-family:sans-serif;transition:background 0.2s">Click</button>',
    options: [
      O("a", "transition: background 0.2s", "transition: background 0.2s"),
      O("b", "animation: spin 1s", "animation: spin 1s"),
      O("c", "transform: scale(2)", "transform: scale(2)"),
      O("d", "display: flex", "display: flex"),
    ],
    correctId: "a",
    explanation: L(
      "transition on the property you animate gives smooth hover feedback without keyframes.",
      "transition على الخاصية التي تُحرّكها يعطي feedback سلسًا عند hover بدون keyframes.",
    ),
  },
  {
    id: "css-adv-rw1",
    type: "mini-code",
    difficulty: "real-world",
    prompt: L(
      "Wire up a dark theme: set --bg to #0f172a on .theme-dark:",
      "فعّل dark theme: اضبط --bg على #0f172a في .theme-dark:",
    ),
    html: '<div class="theme-dark"><p class="text">Hello</p></div>',
    starterCss: `:root { --bg: #ffffff; --text: #0f172a; }\n.theme-dark {\n}\n.text {\n  background: var(--bg);\n  color: var(--text);\n  padding: 16px;\n}`,
    requiredCss: ["--bg: #0f172a"],
    explanation: L(
      "Scoped custom property overrides let one class flip an entire component tree.",
      "إعادة تعريف custom properties ضمن نطاق class تقلب شجرة مكوّنات كاملة.",
    ),
  },
  {
    id: "css-adv-rw2",
    type: "browser-sim",
    difficulty: "real-world",
    prompt: L(
      "Add a @keyframes rule and animation so .badge pulses (opacity 1 → 0.5 → 1):",
      "أضف @keyframes و animation ليجعل .badge ينبض (opacity 1 → 0.5 → 1):",
    ),
    html: '<span class="badge">Live</span>',
    starterCss: `.badge {\n  background: #ef4444;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n}`,
    targetSubstring: "@keyframes",
    explanation: L(
      "@keyframes defines the pulse; animation applies it with duration and iteration.",
      "@keyframes يعرّف النبض؛ animation يُطبّقه مع duration و iteration.",
    ),
    hint: L("You need @keyframes and animation properties.", "تحتاج @keyframes وخصائص animation."),
  },
];

// ─── Pro: pitfalls, specificity, layers, performance ───────────────────────

const proQuestions: LevelQuestion[] = [
  {
    id: "css-pro-e1",
    type: "mcq",
    difficulty: "easy",
    prompt: L(
      "Why is overusing !important considered a pitfall?",
      "لماذا يُعد الإفراط في !important فخًا شائعًا؟",
    ),
    options: [
      O("a", "It slows down parsing only", "يبطئ التحليل فقط"),
      O("b", "It creates specificity wars that are hard to override", "يُنشئ حروب specificity يصعب تجاوزها"),
      O("c", "Browsers ignore it in production", "المتصفحات تتجاهله في الإنتاج"),
      O("d", "It only works in inline styles", "يعمل فقط في inline styles"),
    ],
    correctId: "b",
    explanation: L(
      "Each !important forces future overrides to also use !important — a maintenance trap.",
      "كل !important يُجبر التجاوزات المستقبلية على استخدام !important أيضًا — فخ صيانة.",
    ),
  },
  {
    id: "css-pro-e2",
    type: "match-pairs",
    difficulty: "easy",
    prompt: L(
      "Match selector to its specificity weight (a, b, c):",
      "طابق المحدد مع وزن specificity (a, b, c):",
    ),
    left: [
      O("el", "div", "div"),
      O("cl", ".btn", ".btn"),
      O("id", "#nav", "#nav"),
      O("in", "style=\"…\"", "style=\"…\""),
    ],
    right: [
      O("w0", "(0, 0, 1)", "(0, 0, 1)"),
      O("w1", "(0, 1, 0)", "(0, 1, 0)"),
      O("w2", "(1, 0, 0)", "(1, 0, 0)"),
      O("w3", "(1, 0, 0, 0) inline", "(1, 0, 0, 0) inline"),
    ],
    correctPairs: { el: "w0", cl: "w1", id: "w2", in: "w3" },
    explanation: L(
      "Specificity: inline > IDs > classes/attributes/pseudo-classes > elements.",
      "Specificity: inline > IDs > classes/attributes/pseudo-classes > elements.",
    ),
  },
  {
    id: "css-pro-m1",
    type: "css-detective",
    difficulty: "medium",
    prompt: L(
      "A utility class loses to component styles. Click the @layer rule involved:",
      "class مساعد يخسر أمام أنماط المكوّن. انقر على قاعدة @layer المعنية:",
    ),
    code: `@layer base, components, utilities;\n\n@layer utilities {\n  .hidden { display: none; }\n}\n\n@layer components {\n  .card { display: flex; }\n}`,
    properties: [
      { id: "p1", label: "@layer base, components, utilities;" },
      { id: "p2", label: "@layer utilities {" },
      { id: "p3", label: "@layer components {" },
    ],
    correctPropertyId: "p1",
    explanation: L(
      "Layer order in the declaration defines priority regardless of source order inside layers.",
      "ترتيب الطبقات في التصريح يحدد الأولوية بغض النظر عن ترتيب المصدر داخل الطبقات.",
    ),
  },
  {
    id: "css-pro-m2",
    type: "spot-bug",
    difficulty: "medium",
    prompt: L(
      "Click the selector causing unexpected inheritance:",
      "انقر على المحدد المسبب لوراثة غير متوقعة:",
    ),
    code: `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbutton {\n  all: unset;\n}`,
    language: "css",
    bugToken: "*",
    explanation: L(
      "Universal * resets are convenient but can fight component styles; scope resets carefully.",
      "إعادة تعيين * الشاملة مريحة لكنها تتعارض مع أنماط المكوّنات؛ حدّد نطاق resets بعناية.",
    ),
  },
  {
    id: "css-pro-m3",
    type: "predict-visual",
    difficulty: "medium",
    prompt: L(
      "Two rules target .btn. Which color wins with @layer?",
      "قاعدتان تستهدفان .btn. أي لون يفوز مع @layer؟",
    ),
    code: `@layer theme, overrides;\n\n@layer theme {\n  .btn { background: blue; }\n}\n\n@layer overrides {\n  .btn { background: green; }\n}`,
    language: "css",
    options: [
      {
        id: "green",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:8px"><button style="background:green;color:#fff;border:none;padding:10px 20px;border-radius:6px">Button</button></body></html>',
        label: L("Green (overrides layer)", "أخضر (طبقة overrides)"),
      },
      {
        id: "blue",
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:8px"><button style="background:blue;color:#fff;border:none;padding:10px 20px;border-radius:6px">Button</button></body></html>',
        label: L("Blue (theme layer)", "أزرق (طبقة theme)"),
      },
    ],
    correctId: "green",
    explanation: L(
      "Later-declared layers win; overrides comes after theme in the layer list.",
      "الطبقات المُعرَّفة لاحقًا تفوز؛ overrides تأتي بعد theme في قائمة الطبقات.",
    ),
  },
  {
    id: "css-pro-m4",
    type: "arrange-steps",
    difficulty: "medium",
    prompt: L(
      "Order CSS performance best practices from foundational to advanced:",
      "رتّب أفضل ممارسات أداء CSS من الأساسي إلى المتقدم:",
    ),
    items: [
      O("s1", "Avoid expensive selectors like div div div div", "تجنب محددات مكلفة مثل div div div div"),
      O("s2", "Prefer class selectors over deep nesting", "فضّل محددات class على التداخل العميق"),
      O("s3", "Use contain for isolated components", "استخدم contain للمكوّنات المعزولة"),
      O("s4", "Audit unused CSS in production bundles", "راجع CSS غير المستخدم في حزم الإنتاج"),
    ],
    correctOrder: ["s2", "s1", "s3", "s4"],
    explanation: L(
      "Start with selector hygiene → avoid deep chains → containment → bundle audits.",
      "ابدأ بنظافة المحددات → تجنب السلاسل العميقة → containment → مراجعة الحزم.",
    ),
  },
  {
    id: "css-pro-h1",
    type: "fill-code",
    difficulty: "hard",
    prompt: L(
      "Complete the rule to isolate layout recalculations on .widget:",
      "أكمل القاعدة لعزل إعادة حساب التخطيط على .widget:",
    ),
    template: ".widget {\n  {{blank}}: layout style;\n}",
    blankId: "blank",
    correctAnswers: ["contain"],
    language: "css",
    explanation: L(
      "contain: layout style tells the browser changes inside .widget won't affect outside layout.",
      "contain: layout style يُخبر المتصفح أن التغييرات داخل .widget لن تؤثر على التخطيط الخارجي.",
    ),
  },
  {
    id: "css-pro-h2",
    type: "dom-tree",
    difficulty: "hard",
    prompt: L(
      "Which node should get aria-hidden when this decorative icon is purely visual?",
      "أي عقدة يجب أن تحصل على aria-hidden عندما يكون هذا الأيقون زخرفيًا بحتًا؟",
    ),
    tree: {
      id: "root",
      tag: "button",
      label: L("Submit", "إرسال"),
      children: [
        { id: "icon", tag: "svg", label: L("check icon", "أيقونة صح") },
        { id: "label", tag: "span", label: L("Save", "حفظ") },
      ],
    },
    correctNodeId: "icon",
    explanation: L(
      "Decorative SVGs inside labeled buttons should be aria-hidden so screen readers skip them.",
      "SVGs زخرفية داخل أزرار مُسمّاة يجب أن تكون aria-hidden ليتخطاها قارئ الشاشة.",
    ),
  },
  {
    id: "css-pro-rw1",
    type: "browser-sim",
    difficulty: "real-world",
    prompt: L(
      "Fix the specificity trap: make .btn-primary win without !important:",
      "أصلح فخ specificity: اجعل .btn-primary يفوز بدون !important:",
    ),
    html: '<button class="btn btn-primary">Go</button>',
    starterCss: `.btn { background: gray; color: white; padding: 10px 20px; border: none; }\n.btn-primary { background: #6366f1; }`,
    targetSubstring: ".btn.btn-primary",
    explanation: L(
      "Increasing selector specificity (.btn.btn-primary) beats a single class without !important wars.",
      "رفع specificity للمحدد (.btn.btn-primary) يتفوق على class واحد بدون حروب !important.",
    ),
    hint: L("Combine both classes in one selector.", "اجمع كلا الـ class في محدد واحد."),
  },
  {
    id: "css-pro-rw2",
    type: "accessibility",
    difficulty: "real-world",
    prompt: L(
      "A user reports focus outlines were removed globally. Best fix?",
      "مستخدم يبلغ عن إزالة focus outlines عالميًا. ما أفضل إصلاح؟",
    ),
    scenario: L(
      "The team added * { outline: none } for a cleaner look. Keyboard users cannot see focus.",
      "الفريق أضاف * { outline: none } لمظهر أنظف. مستخدمو لوحة المفاتيح لا يرون focus.",
    ),
    options: [
      O("a", "Remove the global reset and use :focus-visible selectively", "أزل الإعادة العالمية واستخدم :focus-visible انتقائيًا"),
      O("b", "Add outline: none to every component", "أضف outline: none لكل مكوّن"),
      O("c", "Disable keyboard navigation", "عطّل التنقل بلوحة المفاتيح"),
      O("d", "Use display: none on focus", "استخدم display: none على focus"),
    ],
    correctId: "a",
    explanation: L(
      ":focus-visible shows rings for keyboard users while keeping mouse clicks clean.",
      ":focus-visible يُظهر حلقات لمستخدمي لوحة المفاتيح مع إبقاء نقرات الماوس نظيفة.",
    ),
  },
];

const beginnerQuiz = levelQuiz(
  "css-beginner",
  "beginner",
  "CSS Beginner Checkpoint",
  "اختبار CSS للمبتدئين",
  beginnerQuestions,
);

const intermediateQuiz = levelQuiz(
  "css-intermediate",
  "intermediate",
  "CSS Intermediate Checkpoint",
  "اختبار CSS المتوسط",
  intermediateQuestions,
);

const advancedQuiz = levelQuiz(
  "css-advanced",
  "advanced",
  "CSS Advanced Checkpoint",
  "اختبار CSS المتقدم",
  advancedQuestions,
);

const proQuiz = levelQuiz(
  "css-pro",
  "pro",
  "CSS Pro Checkpoint",
  "اختبار CSS الاحترافي",
  proQuestions,
);

export const cssLevelQuizzes: Record<string, LevelQuizDefinition> = {
  [CSS_LEVEL_QUIZ_SLUGS.beginner]: beginnerQuiz,
  [CSS_LEVEL_QUIZ_SLUGS.intermediate]: intermediateQuiz,
  [CSS_LEVEL_QUIZ_SLUGS.advanced]: advancedQuiz,
  [CSS_LEVEL_QUIZ_SLUGS.pro]: proQuiz,
};

export function assertCssLevelQuizCoverage(slugs: readonly string[]): void {
  const missing = slugs.filter((slug) => !cssLevelQuizzes[slug]);
  if (missing.length > 0) {
    throw new Error(
      `Missing CSS level quiz for lesson slug(s): ${missing.join(", ")}`,
    );
  }
}
