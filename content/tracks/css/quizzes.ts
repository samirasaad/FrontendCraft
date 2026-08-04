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
  hint?: ReturnType<typeof L>,
): QuizQuestion {
  return { id, prompt, options, correctId, explanation, ...(hint ? { hint } : {}) };
}

type QuizSpec = {
  title: string;
  arTitle: string;
  fact: string;
  arFact: string;
  wrong: string;
  arWrong: string;
  hint1: string;
  arHint1: string;
  hint2: string;
  arHint2: string;
  hint3: string;
  arHint3: string;
};

function quiz(spec: QuizSpec): LessonQuiz {
  return {
    title: L(`${spec.title} check`, `اختبار ${spec.arTitle}`),
    questions: [
      q(
        "q1",
        L(`What is the most useful takeaway from ${spec.title}?`, `إيه أهم فكرة من ${spec.arTitle}؟`),
        [
          opt("a", spec.fact, spec.arFact),
          opt("b", spec.wrong, spec.arWrong),
          opt("c", "Add `!important` to every rule", "ضيف `!important` لكل قاعدة"),
        ],
        "a",
        L(spec.fact, spec.arFact),
        L(spec.hint1, spec.arHint1),
      ),
      q(
        "q2",
        L(`Which habit keeps ${spec.title} maintainable?`, `أي عادة بتخلي ${spec.arTitle} قابلة للصيانة؟`),
        [
          opt("a", "Test the result at more than one size and state", "اختبر النتيجة بأكتر من مقاس وحالة"),
          opt("b", "Copy values without inspecting the context", "انسخ القيم من غير فحص السياق"),
          opt("c", "Rely only on a screenshot", "اعتمد على `screenshot` بس"),
        ],
        "a",
        L("CSS is contextual: inspect layout, state, and available space.", "`CSS` مرتبطة بالسياق: افحص `layout` والحالة والمساحة المتاحة."),
        L(spec.hint2, spec.arHint2),
      ),
      q(
        "q3",
        L(`When debugging ${spec.title}, what should you inspect first?`, `لما تعمل \`debug\` لـ ${spec.arTitle}، تفحص إيه الأول؟`),
        [
          opt("a", "The computed styles and the relevant layout container", "الـ `computed styles` و`layout container` المرتبطة"),
          opt("b", "Random properties until something moves", "`properties` عشوائية لحد ما حاجة تتحرك"),
          opt("c", "Only the HTML text content", "نص `HTML` بس"),
        ],
        "a",
        L("Computed styles reveal the values that actually won and the container explains layout behavior.", "`Computed styles` بتكشف القيم اللي كسبت فعلًا والـ `container` بتفسر سلوك `layout`."),
        L(spec.hint3, spec.arHint3),
      ),
    ],
  };
}

const specs: Record<string, QuizSpec> = {
  "cascade-specificity": {
    title: "the cascade", arTitle: "الـ `cascade`",
    fact: "`Specificity` breaks ties after origin and importance.", arFact: "الـ `specificity` بتحل التعادل بعد `origin` و`importance`.",
    wrong: "Source order always beats an ID selector.", arWrong: "ترتيب المصدر دايمًا يكسب `ID selector`.",
    hint1: "Add two rules to the same element and see which color wins.", arHint1: "ضيف قاعدتين لنفس العنصر واتفرّج أنهي لون بيكسب.",
    hint2: "Resize the preview and toggle a class to see if the winner changes.", arHint2: "غيّر العرض وبدّل `class` وشوف الفائز بيتغيّر ولا لأ.",
    hint3: "Open DevTools Computed and check which rule is crossed out.", arHint3: "افتح `DevTools Computed` وشوف أنهي قاعدة متشطبة.",
  },
  "box-model": {
    title: "the box model", arTitle: "`box model`",
    fact: "`border-box` includes padding and border in a declared width.", arFact: "`border-box` بتضم `padding` و`border` في الـ `width` المعلن.",
    wrong: "Margin is inside the border.", arWrong: "الـ `margin` جوه الـ `border`.",
    hint1: "Switch `box-sizing` and watch whether the total width changes.", arHint1: "بدّل `box-sizing` واتفرّج العرض الكلي بيتغيّر ولا لأ.",
    hint2: "Try the same rule at a narrow and wide preview size.", arHint2: "جرّب نفس القاعدة بعرض ضيق وواسع.",
    hint3: "Inspect the box-model diagram in DevTools first.", arHint3: "افحص رسم `box model` في `DevTools` الأول.",
  },
  "units-sizing": {
    title: "responsive sizing", arTitle: "المقاسات المتجاوبة",
    fact: "`clamp()` can express a minimum, fluid value, and maximum.", arFact: "`clamp()` تقدر تعبر عن حد أدنى وقيمة سائلة وحد أقصى.",
    wrong: "`vw` is always the best unit for body text.", arWrong: "`vw` دايمًا أفضل `unit` لنص الجسم.",
    hint1: "Resize the preview and watch a `clamp()` heading scale.", arHint1: "غيّر العرض واتفرّج عنوان `clamp()` بيكبر.",
    hint2: "Compare `rem` spacing at two different root font sizes.", arHint2: "قارن مسافات `rem` بحجمين مختلفين لخط الـ `root`.",
    hint3: "Check computed `font-size` and `width` before changing units.", arHint3: "افحص `font-size` و`width` المحسوبين قبل ما تغيّر `units`.",
  },
  "colors-typography": {
    title: "color and typography", arTitle: "الألوان والخط",
    fact: "Readable contrast and line-height are part of usable typography.", arFact: "`contrast` المقروء و`line-height` جزء من `typography` قابلة للاستخدام.",
    wrong: "Color can be the only indicator of state.", arWrong: "اللون ممكن يكون مؤشر الحالة الوحيد.",
    hint1: "Change `line-height` and read the paragraph aloud.", arHint1: "غيّر `line-height` واقرأ الفقرة بصوت عالي.",
    hint2: "Test the same text on light and dark backgrounds.", arHint2: "جرّب نفس النص على خلفية فاتحة وغامقة.",
    hint3: "Check contrast and computed color values in DevTools.", arHint3: "افحص `contrast` وقيم اللون المحسوبة في `DevTools`.",
  },
  "display-flow": {
    title: "normal flow", arTitle: "`normal flow`",
    fact: "Block elements stack in normal flow by default.", arFact: "عناصر `block` بتترص في `normal flow` افتراضيًا.",
    wrong: "`display` changes an element's HTML meaning.", arWrong: "`display` بتغير معنى عنصر `HTML`.",
    hint1: "Toggle `display` on the tag and watch how it sits in the page.", arHint1: "بدّل `display` على الـ `tag` واتفرّج مكانه في الصفحة.",
    hint2: "Try the layout with one element set to `inline-block`.", arHint2: "جرّب الـ `layout` وعنصر واحد `inline-block`.",
    hint3: "Inspect whether the element is block or inline in Computed.", arHint3: "افحص في `Computed` العنصر `block` ولا `inline`.",
  },
  "backgrounds-borders": {
    title: "backgrounds and borders", arTitle: "الخلفيات والحدود",
    fact: "An `outline` can show focus without taking box-model space.", arFact: "`outline` تقدر تظهر `focus` من غير مساحة في `box model`.",
    wrong: "Borders never affect the element size.", arWrong: "الحدود عمرها ما بتأثر على مقاس العنصر.",
    hint1: "Add an `outline` and see if nearby layout shifts.", arHint1: "ضيف `outline` واتفرّج الـ `layout` جنبها بيتحرك ولا لأ.",
    hint2: "Change `border-radius` and check the shape at two sizes.", arHint2: "غيّر `border-radius` وشوف الشكل بمقاسين.",
    hint3: "Compare border width in the box-model diagram first.", arHint3: "قارن عرض الـ `border` في رسم `box model` الأول.",
  },
  "flexbox-basics": {
    title: "flexbox", arTitle: "`Flexbox`",
    fact: "`justify-content` works on the main axis.", arFact: "`justify-content` بتشتغل على `main axis`.",
    wrong: "Flexbox is designed for two-dimensional tracks.", arWrong: "`Flexbox` متصممة لـ `tracks` ثنائية الأبعاد.",
    hint1: "Change `justify-content` and watch items spread or bunch up.", arHint1: "غيّر `justify-content` واتفرّج العناصر بتتوزع إزاي.",
    hint2: "Resize the row and see if items wrap or shrink.", arHint2: "صغّر الصف وشوف العناصر بتلف ولا بتصغر.",
    hint3: "Inspect flex direction and alignment in DevTools.", arHint3: "افحص اتجاه `flex` والمحاذاة في `DevTools`.",
  },
  "css-grid": {
    title: "CSS Grid", arTitle: "`CSS Grid`",
    fact: "Grid coordinates columns and rows together.", arFact: "`Grid` بتنسق الأعمدة والصفوف مع بعض.",
    wrong: "Grid cannot create responsive card layouts.", arWrong: "`Grid` مش بتقدر تعمل `card layouts` `responsive`.",
    hint1: "Edit `grid-template-columns` and resize to see columns reflow.", arHint1: "عدّل `grid-template-columns` وغيّر العرض واتفرّج الأعمدة.",
    hint2: "Try `auto-fit` with `minmax()` at narrow and wide widths.", arHint2: "جرّب `auto-fit` مع `minmax()` بعرض ضيق وواسع.",
    hint3: "Inspect track sizes in the grid overlay first.", arHint3: "افحص مقاسات `tracks` في overlay الـ `grid` الأول.",
  },
  "positioning": {
    title: "positioning", arTitle: "`Positioning`",
    fact: "An absolute child uses its positioned ancestor as an anchor.", arFact: "`child` `absolute` بتستخدم `ancestor` `positioned` كـ `anchor`.",
    wrong: "`absolute` elements remain in normal flow.", arWrong: "عناصر `absolute` بتفضل في `normal flow`.",
    hint1: "Switch `position` on the parent and watch where the badge lands.", arHint1: "بدّل `position` على الأب واتفرّج الـ `badge` بيروح فين.",
    hint2: "Scroll the page to test whether `sticky` sticks.", arHint2: "اعمل scroll وشوف `sticky` بيلزق ولا لأ.",
    hint3: "Check computed `position` and offset values first.", arHint3: "افحص `position` المحسوبة وقيم الـ `offset` الأول.",
  },
  "responsive-media": {
    title: "responsive media", arTitle: "الميديا المتجاوبة",
    fact: "Breakpoints should respond to content pressure, not phone names.", arFact: "`Breakpoints` لازم تستجيب لضغط المحتوى، مش أسماء الموبايلات.",
    wrong: "Every interface needs the same fixed breakpoints.", arWrong: "كل واجهة محتاجة نفس `breakpoints` الثابتة.",
    hint1: "Resize the preview slowly and note when the layout breaks.", arHint1: "صغّر العرض ببطء ولاحظ إمتى الـ `layout` بيتكسر.",
    hint2: "Toggle reduced motion and see if animations still run.", arHint2: "فعّل `reduced motion` وشوف الـ `animations` لسه شغالة.",
    hint3: "Check which media query is active in DevTools.", arHint3: "افحص أنهي `media query` شغالة في `DevTools`.",
  },
  "custom-properties": {
    title: "custom properties", arTitle: "`Custom Properties`",
    fact: "Custom properties inherit and can provide theme tokens.", arFact: "`Custom properties` بتتورث وممكن توفر `theme tokens`.",
    wrong: "CSS variables are compile-time constants only.", arWrong: "`CSS variables` `constants` وقت `compile` بس.",
    hint1: "Change a `--token` and watch linked rules update.", arHint1: "غيّر `--token` واتفرّج القواعد المربوطة بتتحدّث.",
    hint2: "Remove a token and see if the fallback value appears.", arHint2: "شيل `token` وشوف قيمة `fallback` بتظهر ولا لأ.",
    hint3: "Inspect inherited custom properties in Computed.", arHint3: "افحص `custom properties` الموروثة في `Computed`.",
  },
  "transitions-transforms": {
    title: "transitions and transforms", arTitle: "`Transitions` و`Transforms`",
    fact: "Transform and opacity are good candidates for focused motion.", arFact: "`Transform` و`opacity` مرشحين كويسين لحركة مركزة.",
    wrong: "Every property should animate forever.", arWrong: "كل `property` لازم تتحرك للأبد.",
    hint1: "Hover or focus the button and watch the motion.", arHint1: "اعمل `hover` أو `focus` على الزر واتفرّج الحركة.",
    hint2: "Enable reduced motion and confirm the effect turns off.", arHint2: "فعّل `reduced motion` وتأكد التأثير بيتقفل.",
    hint3: "Check which properties have a transition in Computed.", arHint3: "افحص أنهي `properties` عليها `transition` في `Computed`.",
  },
  "css-animations": {
    title: "CSS animations", arTitle: "`CSS Animations`",
    fact: "`@keyframes` defines stages of an animation.", arFact: "`@keyframes` بتحدد مراحل `animation`.",
    wrong: "Animation should be the only way to communicate status.", arWrong: "`Animation` لازم تكون الطريقة الوحيدة لتوصيل الحالة.",
    hint1: "Replay the animation and watch each stage.", arHint1: "شغّل الـ `animation` تاني واتفرّج كل مرحلة.",
    hint2: "Toggle reduced motion and see if the animation stops.", arHint2: "بدّل `reduced motion` وشوف الـ `animation` بتقف ولا لأ.",
    hint3: "Inspect animation name and duration in Computed.", arHint3: "افحص اسم `animation` و`duration` في `Computed`.",
  },
  "logical-properties": {
    title: "logical properties", arTitle: "`Logical Properties`",
    fact: "`margin-inline` follows the writing direction.", arFact: "`margin-inline` بتتبع اتجاه الكتابة.",
    wrong: "`left` and `right` automatically work for every RTL component.", arWrong: "`left` و`right` بيشتغلوا تلقائيًا لكل مكوّن `RTL`.",
    hint1: "Switch `dir` between `ltr` and `rtl` and watch spacing flip.", arHint1: "بدّل `dir` بين `ltr` و`rtl` واتفرّج المسافات بتتقلب.",
    hint2: "Compare `margin-inline-start` with physical `margin-left`.", arHint2: "قارن `margin-inline-start` مع `margin-left` العادي.",
    hint3: "Check `dir` on the element and parent in DevTools.", arHint3: "افحص `dir` على العنصر والأب في `DevTools`.",
  },
  "css-common-pitfalls": {
    title: "CSS pitfalls", arTitle: "أخطاء `CSS`",
    fact: "Computed styles show which declaration actually won.", arFact: "`Computed styles` بتبين أي `declaration` كسبت فعلًا.",
    wrong: "Adding `!important` is always the first fix.", arWrong: "إضافة `!important` دايمًا أول إصلاح.",
    hint1: "Compare the red and green rules side by side.", arHint1: "قارن القاعدة الحمرا والخضرا جنب بعض.",
    hint2: "Rebuild the green fix in the playground before checking.", arHint2: "ابنِ الإصلاح الأخضر في `playground` قبل ما تتأكد.",
    hint3: "Open Computed and find the winning value first.", arHint3: "افتح `Computed` ودور على القيمة الفائزة الأول.",
  },
  "css-cheatsheet": {
    title: "the CSS CheatSheet", arTitle: "`CSS CheatSheet`",
    fact: "Copy a pattern, then adapt and test it in context.", arFact: "انسخ `pattern`، وبعدها عدّلها واختبرها في السياق.",
    wrong: "A cheat sheet replaces understanding layout.", arWrong: "`Cheat sheet` بتستبدل فهم `layout`.",
    hint1: "Pick one card, preview it, then change one value.", arHint1: "اختار كارت واحد، عاينه، وبعدين غيّر قيمة واحدة.",
    hint2: "Paste the snippet into your component and resize.", arHint2: "الصق الـ `snippet` في مكوّنك وغيّر العرض.",
    hint3: "Read the card note before copying the code.", arHint3: "اقرأ ملاحظة الكارت قبل ما تنسخ الكود.",
  },
};

export const cssQuizzes: Record<string, LessonQuiz> = Object.fromEntries(
  Object.entries(specs).map(([slug, spec]) => [slug, quiz(spec)]),
);

export function assertCssQuizCoverage(order: readonly string[]) {
  const missing = order.filter((slug) => !cssQuizzes[slug]);
  if (missing.length) {
    throw new Error(`Missing CSS quiz for lesson slug(s): ${missing.join(", ")}`);
  }
}
