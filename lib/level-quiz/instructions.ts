import { L } from "@/content/helpers";
import type { LevelQuestionType } from "@/lib/level-quiz/types";
import type { LocalizedString } from "@/lib/types";

const INSTRUCTIONS: Record<LevelQuestionType, LocalizedString> = {
  mcq: L("Choose one answer, then press Submit.", "اختر إجابة واحدة، ثم اضغط إرسال."),
  "click-element": L(
    "Tap the matching part on the mini page. Dashed outlines are clickable.",
    "اضغط الجزء المطلوب في الصفحة الصغيرة. الخطوط المتقطعة ينفع تضغطها.",
  ),
  "build-layout": L(
    "Drag the blocks up or down to put them in the right order.",
    "اسحب البلوكات لأعلى أو لأسفل لترتيبها بالشكل الصحيح.",
  ),
  "css-detective": L(
    "Click the CSS line that is causing the problem.",
    "اضغط على سطر CSS الذي يسبب المشكلة.",
  ),
  "spot-bug": L(
    "Click the wrong piece of code in the snippet.",
    "اضغط على الجزء الخاطئ في الكود.",
  ),
  "predict-visual": L(
    "Look at the code, then pick the preview that matches the result.",
    "انظر للكود، ثم اختر المعاينة التي تطابق النتيجة.",
  ),
  "arrange-steps": L(
    "Drag the steps into the correct order from top to bottom.",
    "اسحب الخطوات بالترتيب الصحيح من الأعلى للأسفل.",
  ),
  timeline: L(
    "Drag the events into the correct order from top to bottom.",
    "اسحب الأحداث بالترتيب الصحيح من الأعلى للأسفل.",
  ),
  "fill-code": L(
    "Type the missing code in the blank box.",
    "اكتب الكود الناقص في المربع الفارغ.",
  ),
  "match-pairs": L(
    "Tap a tag node, then tap what it is for. A line will connect them.",
    "اضغط وسم، بعدين اضغط معناه. هيتوصلوا بخط.",
  ),
  "before-after": L(
    "Slide the bar to compare, then choose the correct answer.",
    "حرّك الشريط للمقارنة، ثم اختر الإجابة الصحيحة.",
  ),
  "browser-sim": L(
    "Edit the CSS on the left. The preview updates on the right.",
    "عدّل CSS على اليسار. المعاينة تتحدّث على اليمين.",
  ),
  "mini-code": L(
    "Add the CSS needed on the left until the preview looks right.",
    "أضف CSS المطلوب على اليسار حتى تبدو المعاينة صحيحة.",
  ),
  "dom-tree": L(
    "Click the node in the tree that answers the question.",
    "اضغط على العقدة في الشجرة التي تجيب على السؤال.",
  ),
  responsive: L(
    "Pick a screen size, then choose when the layout should change.",
    "اختر حجم الشاشة، ثم حدّد متى يتغيّر التخطيط.",
  ),
  accessibility: L(
    "Read the scenario, then pick the best fix.",
    "اقرأ السيناريو، ثم اختر أفضل حل.",
  ),
  console: L(
    "Run the code in your head, then type what prints in the console.",
    "تخيّل تشغيل الكود، ثم اكتب ما يظهر في الـ console.",
  ),
};

export function levelQuizInstruction(type: LevelQuestionType): LocalizedString {
  return INSTRUCTIONS[type];
}
