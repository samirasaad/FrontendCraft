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
): QuizQuestion {
  return { id, prompt, options, correctId, explanation };
}

type QuizSpec = { title: string; arTitle: string; fact: string; arFact: string; wrong: string; arWrong: string };

function quiz(spec: QuizSpec): LessonQuiz {
  return {
    title: L(`${spec.title} check`, `اختبار ${spec.arTitle}`),
    questions: [
      q("q1", L(`What is the most useful takeaway from ${spec.title}?`, `إيه أهم فكرة من ${spec.arTitle}؟`), [
        opt("a", spec.fact, spec.arFact),
        opt("b", spec.wrong, spec.arWrong),
        opt("c", "Add !important to every rule", "ضيف !important لكل قاعدة"),
      ], "a", L(spec.fact, spec.arFact)),
      q("q2", L(`Which habit keeps ${spec.title} maintainable?`, `أي عادة بتخلي ${spec.arTitle} قابلة للصيانة؟`), [
        opt("a", "Test the result at more than one size and state", "اختبر النتيجة بأكتر من مقاس وحالة"),
        opt("b", "Copy values without inspecting the context", "انسخ القيم من غير فحص السياق"),
        opt("c", "Rely only on a screenshot", "اعتمد على screenshot بس"),
      ], "a", L("CSS is contextual: inspect layout, state, and available space.", "CSS مرتبطة بالسياق: افحص layout والحالة والمساحة المتاحة.")),
      q("q3", L(`When debugging ${spec.title}, what should you inspect first?`, `لما تعمل debug لـ ${spec.arTitle}، تفحص إيه الأول؟`), [
        opt("a", "The computed styles and the relevant layout container", "الـ computed styles وlayout container المرتبطة"),
        opt("b", "Random properties until something moves", "properties عشوائية لحد ما حاجة تتحرك"),
        opt("c", "Only the HTML text content", "نص HTML بس"),
      ], "a", L("Computed styles reveal the values that actually won and the container explains layout behavior.", "Computed styles بتكشف القيم اللي كسبت فعلًا والـ container بتفسر سلوك layout.")),
    ],
  };
}

const specs: Record<string, QuizSpec> = {
  "cascade-specificity": { title: "the cascade", arTitle: "الـ cascade", fact: "Specificity breaks ties after origin and importance.", arFact: "Specificity بتحل التعادل بعد origin وimportance.", wrong: "Source order always beats an ID selector.", arWrong: "ترتيب المصدر دايمًا يكسب ID selector." },
  "box-model": { title: "the box model", arTitle: "box model", fact: "border-box includes padding and border in a declared width.", arFact: "border-box بتضم padding وborder في الـ width المعلن.", wrong: "Margin is inside the border.", arWrong: "Margin جوه الـ border." },
  "units-sizing": { title: "responsive sizing", arTitle: "المقاسات المتجاوبة", fact: "clamp() can express a minimum, fluid value, and maximum.", arFact: "clamp() تقدر تعبر عن حد أدنى وقيمة سائلة وحد أقصى.", wrong: "vw is always the best unit for body text.", arWrong: "vw دايمًا أفضل unit لنص الجسم." },
  "colors-typography": { title: "color and typography", arTitle: "الألوان والخط", fact: "Readable contrast and line-height are part of usable typography.", arFact: "contrast المقروء وline-height جزء من typography قابلة للاستخدام.", wrong: "Color can be the only indicator of state.", arWrong: "اللون ممكن يكون مؤشر الحالة الوحيد." },
  "display-flow": { title: "normal flow", arTitle: "normal flow", fact: "Block elements stack in normal flow by default.", arFact: "عناصر block بتترص في normal flow افتراضيًا.", wrong: "display changes an element's HTML meaning.", arWrong: "display بتغير معنى عنصر HTML." },
  "backgrounds-borders": { title: "backgrounds and borders", arTitle: "الخلفيات والحدود", fact: "An outline can show focus without taking box-model space.", arFact: "outline تقدر تظهر focus من غير مساحة في box model.", wrong: "Borders never affect the element size.", arWrong: "Borders عمرها ما بتأثر على مقاس العنصر." },
  "flexbox-basics": { title: "flexbox", arTitle: "Flexbox", fact: "justify-content works on the main axis.", arFact: "justify-content بتشتغل على main axis.", wrong: "Flexbox is designed for two-dimensional tracks.", arWrong: "Flexbox متصممة لـ tracks ثنائية الأبعاد." },
  "css-grid": { title: "CSS Grid", arTitle: "CSS Grid", fact: "Grid coordinates columns and rows together.", arFact: "Grid بتنسق الأعمدة والصفوف مع بعض.", wrong: "Grid cannot create responsive card layouts.", arWrong: "Grid مش بتقدر تعمل card layouts responsive." },
  "positioning": { title: "positioning", arTitle: "Positioning", fact: "An absolute child uses its positioned ancestor as an anchor.", arFact: "child absolute بتستخدم ancestor positioned كـ anchor.", wrong: "absolute elements remain in normal flow.", arWrong: "عناصر absolute بتفضل في normal flow." },
  "responsive-media": { title: "responsive media", arTitle: "الميديا المتجاوبة", fact: "Breakpoints should respond to content pressure, not phone names.", arFact: "Breakpoints لازم تستجيب لضغط المحتوى، مش أسماء الموبايلات.", wrong: "Every interface needs the same fixed breakpoints.", arWrong: "كل واجهة محتاجة نفس breakpoints الثابتة." },
  "custom-properties": { title: "custom properties", arTitle: "Custom Properties", fact: "Custom properties inherit and can provide theme tokens.", arFact: "Custom properties بتتورث وممكن توفر theme tokens.", wrong: "CSS variables are compile-time constants only.", arWrong: "CSS variables constants وقت compile بس." },
  "transitions-transforms": { title: "transitions and transforms", arTitle: "Transitions وTransforms", fact: "Transform and opacity are good candidates for focused motion.", arFact: "Transform وopacity مرشحين كويسين لحركة مركزة.", wrong: "Every property should animate forever.", arWrong: "كل property لازم تتحرك للأبد." },
  "css-animations": { title: "CSS animations", arTitle: "CSS Animations", fact: "@keyframes defines stages of an animation.", arFact: "@keyframes بتحدد مراحل animation.", wrong: "Animation should be the only way to communicate status.", arWrong: "Animation لازم تكون الطريقة الوحيدة لتوصيل الحالة." },
  "logical-properties": { title: "logical properties", arTitle: "Logical Properties", fact: "margin-inline follows the writing direction.", arFact: "margin-inline بتتبع اتجاه الكتابة.", wrong: "left and right automatically work for every RTL component.", arWrong: "left وright بيشتغلوا تلقائيًا لكل مكوّن RTL." },
  "css-common-pitfalls": { title: "CSS pitfalls", arTitle: "أخطاء CSS", fact: "Computed styles show which declaration actually won.", arFact: "Computed styles بتبين أي declaration كسبت فعلًا.", wrong: "Adding !important is always the first fix.", arWrong: "إضافة !important دايمًا أول إصلاح." },
  "css-cheatsheet": { title: "the CSS CheatSheet", arTitle: "CSS CheatSheet", fact: "Copy a pattern, then adapt and test it in context.", arFact: "انسخ pattern، وبعدها عدّلها واختبرها في السياق.", wrong: "A cheat sheet replaces understanding layout.", arWrong: "Cheat sheet بتستبدل فهم layout." },
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
