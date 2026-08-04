import {
  L,
  pitfall,
  realWorldExample,
  simpleExample,
} from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";
import { cssCheatCards } from "@/content/tracks/css/cheatsheet-cards";

export const extraLessons: LessonDraft[] = [
  {
    id: "css-15",
    order: 0,
    slug: "css-common-pitfalls",
    tier: "pro",
    readMinutes: 11,
    icon: "AlertTriangle",
    visualizer: "css-pitfalls-lab",
    content: {
      title: L("Common CSS Pitfalls", "أخطاء `CSS` الشائعة"),
      summary: L(
        "A capstone of bugs that look like CSS is broken when the layout rule is simply misunderstood.",
        "خاتمة لأخطاء شكلها إن `CSS` بايظة بينما قاعدة الـ `layout` مفهومة غلط.",
      ),
      paragraphs: [
        L(
          "CSS failures are often valid CSS with the wrong mental model: a width grows because of `content-box`, an absolute child has no intended anchor, or a selector loses the cascade.",
          "فشل `CSS` غالبًا `CSS` صحيحة لكن `mental model` غلط: `width` بتكبر بسبب `content-box`، أو `child` `absolute` من غير `anchor` مقصود، أو `selector` بيخسر الـ `cascade`.",
        ),
        L(
          "Read DevTools from the outside in: inspect the box model, computed values, inherited rules, and the containing block before adding another declaration.",
          "اقرأ `DevTools` من بره لجوه: افحص `box model` والقيم المحسوبة والقواعد الموروثة والـ `containing block` قبل ما تزود `declaration`.",
        ),
        L(
          "Each card below pairs a tempting fix with a durable pattern. Rebuild the right side in the playground until you can predict it before running it.",
          "كل كارت تحت بيقرن إصلاح مغري بنمط ثابت. ابنِ الجانب الصح في `playground` لحد ما تتوقعه قبل التشغيل.",
        ),
      ],
      keyPoints: [
        L("Inspect computed styles before overriding", "افحص `computed styles` قبل `override`"),
        L("Keep layout in normal flow when possible", "خلّي `layout` في `normal flow` لما ينفع"),
        L("Use explicit, accessible interaction states", "استخدم حالات تفاعل صريحة ومتاحة"),
      ],
      examples: [
        simpleExample(
          `<style>
* { box-sizing: border-box; }
.panel { width: 240px; padding: 24px; border: 4px solid #38bdf8; }
</style>
<div class="panel">The declared width includes padding and border.</div>`,
          "A predictable box-model baseline",
          "أساس `box-model` متوقع",
        ),
        realWorldExample(
          `<style>
.menu { display: flex; gap: .75rem; flex-wrap: wrap; }
.menu a { padding: .5rem .75rem; border-radius: .5rem; }
.menu a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
</style>
<nav class="menu"><a href="#learn">Learn</a><a href="#practice">Practice</a></nav>`,
          "Normal-flow navigation with a visible keyboard state",
          "تنقل في `normal flow` بحالة كيبورد ظاهرة",
        ),
      ],
      visualHint: L(
        "Compare the red rule with the green rule, then inspect the computed result.",
        "قارن القاعدة الحمرا بالخضرا، وبعدين افحص النتيجة المحسوبة في `DevTools`.",
      ),
      pitfalls: [
        pitfall(
          `.card { width: 300px; padding: 24px; border: 4px solid; }`,
          L("`content-box` makes the rendered card wider than 300px.", "`content-box` بتخلي الكارت أوسع من 300px."),
          `* { box-sizing: border-box; }\n.card { width: 300px; padding: 24px; border: 4px solid; }`,
          L("`border-box` includes padding and border in the width.", "`border-box` بتضم `padding` و`border` جوه الـ `width`."),
          L("Unexpected width", "عرض غير متوقع"),
        ),
        pitfall(
          `.badge { position: absolute; top: 0; right: 0; }`,
          L("The badge anchors to an unexpected ancestor or the page.", "الـ `badge` بتتربط بـ `ancestor` غير متوقع أو بالصفحة."),
          `.card { position: relative; }\n.badge { position: absolute; inset-block-start: 0; inset-inline-end: 0; }`,
          L("Make the intended component the containing block.", "خلّي المكوّن المقصود هو الـ `containing block`."),
          L("Floating badge", "`Badge` طايرة"),
        ),
        pitfall(
          `.button:hover { outline: none; background: #0ea5e9; }`,
          L("Keyboard focus has no equivalent visible state.", "`Focus` الكيبورد مفيش ليها حالة ظاهرة مقابلة."),
          `.button:hover { background: #0ea5e9; }\n.button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }`,
          L("Keep a strong focus indicator for keyboard users.", "سيّب `focus indicator` قوي لمستخدمي الكيبورد."),
          L("Hover-only feedback", "`Feedback` للـ `hover` بس"),
        ),
        pitfall(
          `.title { color: red !important; }`,
          L("`!important` hides the cascade problem and makes future overrides harder.", "`!important` بتخبي مشكلة `cascade` وبتصعّب `overrides` بعدين."),
          `.card--error .title { color: #b91c1c; }`,
          L("Use a clear component state with controlled specificity.", "استخدم `component state` واضحة بـ `specificity` متحكم فيها."),
          L("Specificity escalation", "تصعيد `Specificity`"),
        ),
      ],
    },
  },
  {
    id: "css-16",
    order: 0,
    slug: "css-cheatsheet",
    tier: "cheatsheet",
    readMinutes: 7,
    icon: "BookCopy",
    visualizer: "css-cheatsheet-lab",
    content: {
      title: L("CSS CheatSheet", "`CSS CheatSheet`"),
      summary: L(
        "Copy compact, practical patterns for layout, sizing, theme tokens, and motion.",
        "انسخ أنماط عملية مختصرة للـ `layout` والمقاسات و`theme tokens` والحركة.",
      ),
      paragraphs: [
        L("Use the cards as a recall tool, not a replacement for understanding the cascade and layout algorithms.", "استخدم الكروت كأداة تذكّر، مش بديل عن فهم `cascade` و`layout algorithms`."),
        L("Preview a snippet, copy it, then adjust its values in the live playground for your component.", "عاين `snippet` وانسخها، وبعدها عدّل قيمها في `playground` لمكوّنك."),
        L("Technical CSS stays in English in both locales so the code is ready to paste into a stylesheet.", "`CSS` التقنية بتفضل إنجليزي في اللغتين عشان الكود يبقى جاهز للصق في `stylesheet`."),
      ],
      keyPoints: [
        L("Filter, preview, copy, then adapt", "فلتر، عاين، انسخ، وبعدها عدّل"),
        L("Start from semantic token names", "ابدأ من أسماء `tokens` معنوية"),
        L("Test responsive and focus states", "اختبر `responsive` وحالات `focus`"),
      ],
      examples: [
        simpleExample(`<style>.row { display: flex; gap: .75rem; }</style><div class="row"><span>One</span><span>Two</span></div>`, "A compact flex row", "صف `flex` مختصر"),
        realWorldExample(`<style>.card { padding: 1rem; border-radius: .75rem; background: #f8fafc; }</style><article class="card">Paste and adapt a card pattern.</article>`, "A reusable surface", "`Surface` قابلة لإعادة الاستخدام"),
      ],
      visualHint: L("Choose a card, preview it, and make it yours.", "اختار كارت، عاينه، وخليه بتاعك."),
      cheatCards: cssCheatCards,
    },
  },
];
