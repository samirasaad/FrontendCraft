import { L, pitfall } from "@/content/helpers";
import type { PitfallExample } from "@/lib/types";

/** All HTML wrong/right pairs — shown only inside the Pitfalls tier. */
export const collectedHtmlPitfalls: PitfallExample[] = [
  pitfall(
    `<html>
  <body>...</body>
</html>`,
    L(
      "No doctype / lang / charset — quirks and a11y suffer.",
      "من غير `doctype`/`lang`/`charset` — `quirks` و `a11y` بيتضرروا.",
    ),
    `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>App</title></head>
  <body>...</body>
</html>`,
    L(
      "Start every page from a complete, modern skeleton.",
      "ابدأ كل صفحة من هيكل حديث مكتمل.",
    ),
    L("Document shell", "هيكل المستند"),
  ),
  pitfall(
    `<div class="header">...</div>
<div class="main">...</div>`,
    L("Classes are not `semantics`.", "الـ classes مش `semantics`."),
    `<header>...</header>
<main>...</main>`,
    L(
      "Use the element that already means the role.",
      "استخدم العنصر اللي معناه هو الدور نفسه.",
    ),
    L("Semantic landmarks", "`Landmarks` الـ `semantic`"),
  ),
  pitfall(
    `<p class="title">Big text</p>`,
    L("Styled paragraphs are not `headings`.", "فقرة بشكل عنوان مش `heading`."),
    `<h2>Big text</h2>`,
    L(
      "Pick the correct rank; style with CSS.",
      "اختار المستوى الصح؛ والشكل من CSS.",
    ),
    L("Headings", "العناوين"),
  ),
  pitfall(
    `<a href="/x"><img src="x.png"></a>`,
    L(
      "Missing alt → empty accessible name.",
      "من غير alt → اسم وصول فاضي.",
    ),
    `<a href="/x"><img src="x.png" alt="Open track X" /></a>`,
    L("Give the link a spoken name.", "ادي للينك اسم يتقال."),
    L("`Links` & `images`", "اللينكات والصور"),
  ),
  pitfall(
    `<div>• Item</div>`,
    L("Fake bullets are not lists.", "نقط مزيفة مش `lists`."),
    `<ul><li>Item</li></ul>`,
    L(
      "Real lists expose list semantics to AT.",
      "الـ lists الحقيقية بتدي semantics لقارئ الشاشة.",
    ),
    L("Lists", "القوائم"),
  ),
  pitfall(
    `<input placeholder="Email" />`,
    L(
      "Placeholder is not a label — it disappears while typing.",
      "الـ `placeholder` مش `label` — بيختفي وأنت بتكتب.",
    ),
    `<label>Email <input type="email" name="email" /></label>`,
    L(
      "Visible label stays while the user types.",
      "الـ label يفضل ظاهر والمستخدم بيكتب.",
    ),
    L("Forms & labels", "النماذج والـ `labels`"),
  ),
  pitfall(
    `<div class="row"><div>Beginner</div><div>3/3</div></div>`,
    L("Div grids are not `data tables`.", "شبكات الـ `div` مش جداول بيانات."),
    `<table>...</table>`,
    L(
      "Use tables for tabular data, not page layout.",
      "استخدم الجداول لبيانات جدولية مش لـ layout الصفحة.",
    ),
    L("`Tables`", "الجداول"),
  ),
  pitfall(
    `<div role="button">Save</div>`,
    L(
      "Fake buttons need full keyboard support — easy to get wrong.",
      "أزرار مزيفة محتاجة دعم كيبورد كامل — سهل تتغلط.",
    ),
    `<button type="button">Save</button>`,
    L(
      "Native elements ship the hard parts.",
      "العناصر الأصلية بتجيب الجزء الصعب جاهز.",
    ),
    L("Accessibility controls", "عناصر التحكم و`accessibility`"),
  ),
  pitfall(
    `<title>Untitled</title>`,
    L(
      "Default titles waste the richest SERP text.",
      "عناوين افتراضية بتضيع أهم نص في نتائج البحث.",
    ),
    `<title>FrontendCraft — JavaScript track</title>`,
    L("Specific, human `titles` win clicks.", "عنوان واضح وبشري بيكسب نقرات."),
    L("Meta & SEO", "الـ `meta` و `SEO`"),
  ),
  pitfall(
    `<video src="x.mp4" autoplay></video>`,
    L(
      "Autoplay without controls/captions hurts users.",
      "Autoplay من غير controls/captions بيضر المستخدم.",
    ),
    `<video controls playsinline>
  <source src="x.mp4" type="video/mp4" />
</video>`,
    L(
      "Give control to the user; add tracks when you can.",
      "سيّب التحكم للمستخدم؛ وزوّد tracks لما تقدر.",
    ),
    L("Media", "الوسائط"),
  ),
  pitfall(
    `<a href="#" onclick="save()">Save</a>`,
    L("Fake navigation for an action.", "تنقّل مزيف لفعل."),
    `<button type="button" onclick="save()">Save</button>`,
    L(
      "Real button semantics + keyboard support.",
      "زر حقيقي + دعم كيبورد.",
    ),
    L("Buttons vs links", "الأزرار مقابل اللينكات"),
  ),
  pitfall(
    `<p><div>card</div></p>`,
    L("`Block` inside `<p>` is invalid.", "`Block` جوه `<p>` باطل."),
    `<div><p>card</p></div>`,
    L(
      "Or use `<section>` / `<article>` for the card.",
      "أو استخدم `<section>` / `<article>` للكارت.",
    ),
    L("Invalid nesting", "تداخل غير صالح"),
  ),
];
