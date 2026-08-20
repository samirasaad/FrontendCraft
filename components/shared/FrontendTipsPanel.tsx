"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedString } from "@/lib/types";
import { RichText } from "@/components/shared/RichText";

type TipCategoryId =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "React"
  | "Git"
  | "UI/UX"
  | "General";

type TipSide = {
  title: LocalizedString;
  explanation: LocalizedString;
  code?: string;
};

type TipPair = {
  id: string;
  category: TipCategoryId;
  dont: TipSide;
  do: TipSide;
  why: LocalizedString;
};

function pick(value: LocalizedString, locale: "en" | "ar") {
  return locale === "ar" ? value.ar : value.en;
}

const CATEGORY_LABELS: Record<TipCategoryId, LocalizedString> = {
  HTML: { en: "HTML", ar: "HTML" },
  CSS: { en: "CSS", ar: "CSS" },
  JavaScript: { en: "JavaScript", ar: "JavaScript" },
  React: { en: "React", ar: "React" },
  Git: { en: "Git", ar: "Git" },
  "UI/UX": { en: "UI/UX", ar: "UI/UX" },
  General: { en: "General", ar: "عام" },
};

/** Related DO / DON'T pairs — senior mentoring a junior, spoken Egyptian Arabic. */
const TIP_PAIRS: TipPair[] = [
  {
    id: "buttons",
    category: "HTML",
    dont: {
      title: {
        en: "Clickable `<div>` as a button",
        ar: "تعمل زرار بـ `<div>` قابل للنقر",
      },
      explanation: {
        en: "I know it feels faster, but a div doesn’t know it’s a button — keyboard and screen readers get lost.",
        ar: "فاهم إن دي أسرع، بس الـ div مش عارف إنه زرار — الكيبورد وقارئات الشاشة بتتوه.",
      },
      code: `<div onClick={save}>Save</div>`,
    },
    do: {
      title: {
        en: "Use a real `<button>`",
        ar: "استخدم `<button>` حقيقي",
      },
      explanation: {
        en: "If someone can click it like a button, give them a real button. Browser already did the hard work.",
        ar: "لو اليوزر بيضغطه زي الزرار، اديله زرار حقيقي. المتصفح خلّص الشغل الصعب.",
      },
      code: `<button type="button">Save</button>`,
    },
    why: {
      en: "You get Enter/Space, focus, and accessibility without writing extra code.",
      ar: "هتاخد Enter/Space والـ focus والـ accessibility من غير كود زيادة.",
    },
  },
  {
    id: "links",
    category: "HTML",
    dont: {
      title: {
        en: "Vague “click here” links",
        ar: "لينك غامض زي “click here”",
      },
      explanation: {
        en: "“Click here” tells nobody the destination — especially someone jumping link-to-link with a screen reader.",
        ar: "“click here” مش بتقول لحد رايح فين — خصوصًا اللي بيعدّي لينك ورا لينك بقارئ شاشة.",
      },
      code: `<a href="/sale">click here</a>`,
    },
    do: {
      title: {
        en: "Put the destination in the text",
        ar: "حط الوجهة جوّه النص",
      },
      explanation: {
        en: "Write the link like you’d tell a teammate where to go: “Summer sale”, not “click here”.",
        ar: "اكتب اللينك كأنك بتقول لزميلك رايح فين: “عرض الصيف”، مش “اضغط هنا”.",
      },
      code: `<a href="/sale">Summer sale</a>`,
    },
    why: {
      en: "People decide faster, and assistive tools announce something useful.",
      ar: "الناس تقرر أسرع، والأدوات المساعدة تقول حاجة مفيدة.",
    },
  },
  {
    id: "images",
    category: "HTML",
    dont: {
      title: {
        en: "Empty or useless `alt`",
        ar: "`alt` فاضي أو مالوش لازمة",
      },
      explanation: {
        en: "`alt=\"image\"` is like saying “there’s a thing” — it doesn’t help anyone understand the photo.",
        ar: "`alt=\"image\"` زي ما تقول “في حاجة” — مش بتساعد حد يفهم الصورة.",
      },
      code: `<img src="bag.jpg" alt="image" />`,
    },
    do: {
      title: {
        en: "Write `alt` that describes it",
        ar: "اكتب `alt` يوصف الصورة",
      },
      explanation: {
        en: "Describe what’s useful in the image. If it’s only decoration, empty alt is fine.",
        ar: "وصف اللي مفيد في الصورة. لو ديكور بس، `alt` فاضي تمام.",
      },
      code: `<img src="bag.jpg" alt="Brown leather bag" />`,
    },
    why: {
      en: "Screen readers can share the meaning you’d see with your eyes.",
      ar: "قارئات الشاشة تقدر توصّل المعنى اللي انت شايفه بعينك.",
    },
  },
  {
    id: "forms-labels",
    category: "HTML",
    dont: {
      title: {
        en: "Label floating with no link",
        ar: "label عايم من غير ربط",
      },
      explanation: {
        en: "A plain span next to an input looks labeled, but the browser doesn’t connect them.",
        ar: "الـ span جنب الـ input شكله label، بس المتصفح مش رابطهم ببعض.",
      },
      code: `<span>Email</span>\n<input />`,
    },
    do: {
      title: {
        en: "Glue `label` to the input",
        ar: "اربط الـ `label` بالـ input",
      },
      explanation: {
        en: "Hook `htmlFor` to the input `id`. Then tapping the text focuses the field — that’s the habit.",
        ar: "اربط `htmlFor` بـ `id` بتاع الـ input. الضغط على الكلام بيركّز الحقل — دي العادة الصح.",
      },
      code: `<label htmlFor="email">Email</label>\n<input id="email" />`,
    },
    why: {
      en: "Forms feel bigger and kinder — especially on mobile and with assistive tech.",
      ar: "الفورم يحس أكبر وأرحم — خصوصًا على الموبايل ومع الأدوات المساعدة.",
    },
  },
  {
    id: "form-button-type",
    category: "HTML",
    dont: {
      title: {
        en: "Bare `<button>` inside a form",
        ar: "`<button>` من غير type جوّه فورم",
      },
      explanation: {
        en: "Inside a form, a button submits by default. That’s why your “Preview” suddenly reloads the page.",
        ar: "جوّه الفورم الزرار بيعمل submit لوحده. عشان كده “Preview” فجأة بيعمل ريلود.",
      },
      code: `<form>\n  <button>Preview</button>\n</form>`,
    },
    do: {
      title: {
        en: "Set `type=\"button\"` when needed",
        ar: "حط `type=\"button\"` لما تحتاج",
      },
      explanation: {
        en: "Be explicit: submit buttons submit, action buttons stay `type=\"button\"`.",
        ar: "كن صريح: زرار الإرسال يعمل submit، وزرار الأكشن يفضل `type=\"button\"`.",
      },
      code: `<button type="button">Preview</button>`,
    },
    why: {
      en: "You stop those mystery reloads while people are still editing.",
      ar: "هتوقف الريلود الغريب والناس لسه بتعدّل.",
    },
  },
  {
    id: "semantic-html",
    category: "HTML",
    dont: {
      title: {
        en: "A wall of random `<div>`s",
        ar: "حائط من `<div>` عشوائي",
      },
      explanation: {
        en: "Divs are boxes. If everything is a box, nothing has meaning — not for you, not for tools.",
        ar: "الـ div علبة. لو كل حاجة علبة، مفيش معنى — لا ليك ولا للأدوات.",
      },
      code: `<div>\n  <div>Title</div>\n  <div>…</div>\n</div>`,
    },
    do: {
      title: {
        en: "Use real landmarks",
        ar: "استخدم تاجات حقيقية",
      },
      explanation: {
        en: "Reach for `header`, `main`, `nav`, `button` when that’s what the piece actually is.",
        ar: "استخدم `header` و `main` و `nav` و `button` لما القطعة تكون كده فعلًا.",
      },
      code: `<header>…</header>\n<main>…</main>\n<footer>…</footer>`,
    },
    why: {
      en: "Structure helps humans skim and helps tools navigate.",
      ar: "الهيكل بيساعد الناس تقرأ بسرعة والأدوات تتنقل.",
    },
  },
  {
    id: "css-colors",
    category: "CSS",
    dont: {
      title: {
        en: "Hardcode the same color 40 times",
        ar: "تكتب نفس اللون 40 مرة بإيدك",
      },
      explanation: {
        en: "Copying `#38bdf8` everywhere works… until design changes the brand and you chase forty places.",
        ar: "نسخ `#38bdf8` في كل حتة بتمشي… لحد ما الديزاين يغيّر البراند وتلف ورا أربعين مكان.",
      },
      code: `.btn { color: #38bdf8; }\n.link { color: #38bdf8; }`,
    },
    do: {
      title: {
        en: "One CSS variable, reuse everywhere",
        ar: "متغير CSS واحد واستخدمه في كل حتة",
      },
      explanation: {
        en: "Put the brand color in `:root` once, then reference it. That’s how seniors keep themes sane.",
        ar: "حط لون البراند في `:root` مرة، وبعدين استدعيه. كده الثيم بيفضل مرتب.",
      },
      code: `:root { --brand: #38bdf8; }\n.btn { color: var(--brand); }`,
    },
    why: {
      en: "One change updates the whole UI — no treasure hunt.",
      ar: "تعديل واحد يعدّل الواجهة كلها — من غير لعبة كنز.",
    },
  },
  {
    id: "css-important",
    category: "CSS",
    dont: {
      title: {
        en: "`!important` everywhere",
        ar: "`!important` في كل سطر",
      },
      explanation: {
        en: "`!important` is a fire extinguisher, not a daily tool. Spray it everywhere and CSS becomes a fight.",
        ar: "`!important` طفاية حريق، مش أداة يومية. لو رشيته في كل حتة، الـ CSS يبقى خناقة.",
      },
      code: `.card { margin: 0 !important; }`,
    },
    do: {
      title: {
        en: "Fix the cascade cleanly",
        ar: "صلّح الـ cascade بهدوء",
      },
      explanation: {
        en: "Make the selector clearer or give the component its own class. Win the cascade without yelling.",
        ar: "خلي الـ selector أوضح أو ادي للمكوّن class خاصة. اكسب الـ cascade من غير صياح.",
      },
      code: `.card { margin: 0; }\n.card--tight { margin: 0; }`,
    },
    why: {
      en: "Future changes stay predictable instead of “who wins this war?”",
      ar: "التعديلات الجاية تبقى متوقعة بدل “مين هيكسب الخناقة؟”.",
    },
  },
  {
    id: "box-sizing",
    category: "CSS",
    dont: {
      title: {
        en: "Widths that ignore padding",
        ar: "عرض بيتجاهل الـ padding",
      },
      explanation: {
        en: "You set width 300px, add padding, and suddenly it’s wider. That’s not you — that’s content-box math.",
        ar: "حاطط عرض 300px، تزود padding، يطلع أعرض. مش غلطتك — دي حسابات content-box.",
      },
      code: `.box { width: 300px; padding: 20px; }`,
    },
    do: {
      title: {
        en: "Turn on `border-box` once",
        ar: "شغّل `border-box` مرة واحدة",
      },
      explanation: {
        en: "Set `box-sizing: border-box` globally so width means “the whole box,” padding included.",
        ar: "شغّل `box-sizing: border-box` مرة لكل المشروع عشان العرض يبقى “العلبة كلها” شامل الـ padding.",
      },
      code: `*, *::before, *::after {\n  box-sizing: border-box;\n}`,
    },
    why: {
      en: "Layout math stops surprising you every afternoon.",
      ar: "حسابات اللayout هتبطل تفاجئك كل شوية.",
    },
  },
  {
    id: "mobile-first",
    category: "CSS",
    dont: {
      title: {
        en: "Desktop first, phone later… maybe",
        ar: "ديسكتوب الأول والموبايل… بعدين يمكن",
      },
      explanation: {
        en: "Building huge then shrinking is like packing a suitcase then sitting on it — messy and fragile.",
        ar: "تبني كبير وبعدين تصغّر زي ما تعبّي شنطة وتقعد عليها — فوضى وسهلة تبوظ.",
      },
      code: `/* desktop styles… */\n@media (max-width: 640px) { … }`,
    },
    do: {
      title: {
        en: "Phone first, then grow up",
        ar: "موبايل الأول، وبعدين كبّر",
      },
      explanation: {
        en: "Write the small-screen base first, then enhance with `min-width`. Growing is easier than shrinking.",
        ar: "اكتب أساس الموبايل الأول، وبعدين حسّن بـ `min-width`. التكبير أسهل من التصغير.",
      },
      code: `/* mobile base */\n@media (min-width: 640px) {\n  /* desktop boost */\n}`,
    },
    why: {
      en: "Most people meet your UI on a phone — start where they start.",
      ar: "أغلب الناس بتشوف الواجهة من الموبايل — ابدأ من مكانهم.",
    },
  },
  {
    id: "js-const",
    category: "JavaScript",
    dont: {
      title: {
        en: "`let` for everything",
        ar: "`let` على كل حاجة",
      },
      explanation: {
        en: "If everything is `let`, anything can get overwritten by accident — including the values you meant to keep.",
        ar: "لو كل حاجة `let`، أي قيمة ممكن تتكتب فوقها بالغلط — حتى اللي كنت عايز تثبتها.",
      },
      code: `let userId = "42";\nuserId = null; // oops`,
    },
    do: {
      title: {
        en: "Start with `const`",
        ar: "ابدأ بـ `const`",
      },
      explanation: {
        en: "Default to `const`. Reach for `let` only when you truly need to reassign. Small habit, big safety.",
        ar: "ابدأ بـ `const`. استخدم `let` بس لما تحتاج تعيد التعيين فعلًا. عادة صغيرة وحماية كبيرة.",
      },
      code: `const userId = "42";\nlet retries = 0;`,
    },
    why: {
      en: "The language helps catch mistakes before users do.",
      ar: "اللغة نفسها تساعدك تمسك الغلط قبل ما اليوزر يشوفه.",
    },
  },
  {
    id: "js-equals",
    category: "JavaScript",
    dont: {
      title: {
        en: "Compare with sneaky `==`",
        ar: "تقارن بـ `==` الماكر",
      },
      explanation: {
        en: "`==` quietly converts types. That’s how you get “why is this true?” bugs at 1am.",
        ar: "`==` بيحوّل الأنواع في السكوت. كده تطلع باجز “ازاي دي true؟” الساعة 1 بالليل.",
      },
      code: `if (value == "0") { … }`,
    },
    do: {
      title: {
        en: "Always prefer `===`",
        ar: "دايمًا فضّل `===`",
      },
      explanation: {
        en: "Use `===` so the comparison is honest: same type, same value. No silent conversions.",
        ar: "استخدم `===` عشان المقارنة تكون صريحة: نفس النوع ونفس القيمة. من غير تحويل سري.",
      },
      code: `if (value === "ready") {\n  start();\n}`,
    },
    why: {
      en: "You’ll spend less time chasing weird equality bugs.",
      ar: "هتضيع وقت أقل ورا باجز المساواة الغريبة.",
    },
  },
  {
    id: "js-names",
    category: "JavaScript",
    dont: {
      title: {
        en: "Names like `x`, `data`, `thing`",
        ar: "أسماء زي `x` و `data` و `thing`",
      },
      explanation: {
        en: "Vague names force your brain to remember context. Two weeks later, even you won’t know what `data` is.",
        ar: "الأسماء الغامضة بتخلي دماغك تحفظ السياق. بعد أسبوعين حتى انت مش هتعرف `data` دي إيه.",
      },
      code: `const data = getStuff();\nconst x = data.y;`,
    },
    do: {
      title: {
        en: "Name it like a human",
        ar: "سمّيها زي بني آدم",
      },
      explanation: {
        en: "Name the thing after what it holds: `cartTotal`, `userId`. Your future self will thank you.",
        ar: "سمّي الحاجة على اللي جوّها: `cartTotal`، `userId`. انت في المستقبل هتشكرك.",
      },
      code: `const cartTotal = items.reduce(...);`,
    },
    why: {
      en: "Readable names make reviews faster and bugs rarer.",
      ar: "الأسماء الواضحة بتخلي المراجعة أسرع والباجز أقل.",
    },
  },
  {
    id: "js-dry",
    category: "JavaScript",
    dont: {
      title: {
        en: "Paste the same logic twice",
        ar: "تلصق نفس المنطق مرتين",
      },
      explanation: {
        en: "Copy-paste feels quick, then you fix a bug in one place and forget the other. Classic junior trap.",
        ar: "اللصق بيحس سريع، بعدين تصلّح باج في مكان وتنسى التاني. فخ كلاسيكي.",
      },
      code: `// same 8 lines… twice`,
    },
    do: {
      title: {
        en: "Extract one reusable function",
        ar: "طلّع فانكشن واحدة تتعاد استخدامها",
      },
      explanation: {
        en: "If you pasted it twice, pull it into a function. One brain, one fix.",
        ar: "لو لصقتها مرتين، طلّعها في فانكشن. عقل واحد، تصليح واحد.",
      },
      code: `function formatPrice(n) {\n  return n.toFixed(2);\n}`,
    },
    why: {
      en: "Duplication is where bugs hide and grow.",
      ar: "التكرار هو المكان اللي الباجز بتتكبّر فيه.",
    },
  },
  {
    id: "react-keys",
    category: "React",
    dont: {
      title: {
        en: "Array index as `key`",
        ar: "الـ index كـ `key`",
      },
      explanation: {
        en: "Index keys look fine until the list reorders — then React reuses the wrong row’s state.",
        ar: "الـ index keys شكلها تمام لحد ما الليست تترتّب — ساعتها React بيعيد استخدام state الصف الغلط.",
      },
      code: `{items.map((item, i) => (\n  <Row key={i} />\n))}`,
    },
    do: {
      title: {
        en: "Stable ID as `key`",
        ar: "`key` بـ ID ثابت",
      },
      explanation: {
        en: "Give each item a stable id key so React can track the real item, not its temporary position.",
        ar: "ادي لكل عنصر key بـ id ثابت عشان React يتابع العنصر الحقيقي، مش مكانه المؤقت.",
      },
      code: `{items.map((item) => (\n  <Row key={item.id} {...item} />\n))}`,
    },
    why: {
      en: "You avoid silent UI mix-ups that are painful to debug.",
      ar: "هتتجنب خلط واجهة صامت وصعب يتتتبع.",
    },
  },
  {
    id: "react-components",
    category: "React",
    dont: {
      title: {
        en: "One mega component for the page",
        ar: "component عملاق لكل الصفحة",
      },
      explanation: {
        en: "A 400-line page component is hard to read, hard to test, and scary to touch.",
        ar: "component الصفحة بـ 400 سطر صعب يتقرأ، صعب يتختبر، ومخيف تتلمسه.",
      },
      code: `function Page() {\n  // 400 lines…\n}`,
    },
    do: {
      title: {
        en: "One job per component",
        ar: "كل component لها شغلة واحدة",
      },
      explanation: {
        en: "Split the page into pieces with one clear job each. Small components age better.",
        ar: "قسّم الصفحة لقطع، كل واحدة ليها شغلة واضحة. الـ components الصغيرة بتعيش أحسن.",
      },
      code: `<Header />\n<ProductList />\n<CartSummary />`,
    },
    why: {
      en: "Changes stay local — you edit one piece without breaking five others.",
      ar: "التعديل يفضل محلي — تعدّل حتة من غير ما تبوّظ خمسة تانيين.",
    },
  },
  {
    id: "react-lists",
    category: "React",
    dont: {
      title: {
        en: "Hand-write 20 list items",
        ar: "تكتب 20 عنصر في الليست بإيدك",
      },
      explanation: {
        en: "Hand-writing every card means one typo becomes twenty bugs waiting to happen.",
        ar: "كتابة كل كارت بإيدك معناها غلطة واحدة تبقى عشرين باج مستنيينك.",
      },
      code: `<UserCard … />\n<UserCard … />\n<UserCard … />`,
    },
    do: {
      title: {
        en: "Render with `map()`",
        ar: "اعرض بـ `map()`",
      },
      explanation: {
        en: "Keep the data in an array and map it to components. One pattern, any length.",
        ar: "خلي الداتا في array واعمل لها map لـ components. نمط واحد، أي طول.",
      },
      code: `{users.map((u) => (\n  <UserCard key={u.id} user={u} />\n))}`,
    },
    why: {
      en: "Lists stay clean when the data grows — and it always grows.",
      ar: "الليست تفضل نظيفة لما الداتا تكبر — وهي دايمًا هتكبر.",
    },
  },
  {
    id: "ux-loading",
    category: "UI/UX",
    dont: {
      title: {
        en: "Blank screen while loading",
        ar: "شاشة فاضية وهي بتحميل",
      },
      explanation: {
        en: "A blank wait feels like a freeze. People don’t know if they should wait or refresh.",
        ar: "الانتظار الفاضي بيحس فرِيز. الناس مش عارفة تستنى ولا تعمل ريفرش.",
      },
      code: `{isLoading ? null : <List />}`,
    },
    do: {
      title: {
        en: "Show spinner or skeleton",
        ar: "وري spinner أو skeleton",
      },
      explanation: {
        en: "Show a spinner or skeleton so users see “we’re working on it” while data loads.",
        ar: "وري spinner أو skeleton عشان اليوزر يشوف “احنا شغالين” والداتا بتتحمّل.",
      },
      code: `{isLoading ? <Spinner /> : <List />}`,
    },
    why: {
      en: "Trust goes up when people can see progress.",
      ar: "الثقة بتزيد لما الناس تشوف إن في تقدم.",
    },
  },
  {
    id: "ux-empty",
    category: "UI/UX",
    dont: {
      title: {
        en: "Empty results = silence",
        ar: "مفيش نتائج = سكوت",
      },
      explanation: {
        en: "Silence looks broken. Users think the feature failed, not that the list is empty.",
        ar: "السكوت شكله بايظ. اليوزر يفتكر الميزة وقعت، مش إن الليست فاضية.",
      },
      code: `{items.length === 0 ? null : <List />}`,
    },
    do: {
      title: {
        en: "Say it + give a next step",
        ar: "قول كده + ادي خطوة تانية",
      },
      explanation: {
        en: "Tell them there’s nothing yet, and suggest what to try next. Guide, don’t abandon.",
        ar: "قول مفيش حاجة لسه، واقترح يجربوا إيه بعدين. وجّه، متسيبش.",
      },
      code: `<p>No results. Try another filter.</p>`,
    },
    why: {
      en: "Empty states are part of the product, not an afterthought.",
      ar: "الحالة الفاضية جزء من المنتج، مش حاجة بنفتكرها آخر لحظة.",
    },
  },
  {
    id: "ux-errors",
    category: "UI/UX",
    dont: {
      title: {
        en: "Scary / useless error text",
        ar: "رسالة خطأ مخيفة أو مالهاش لازمة",
      },
      explanation: {
        en: "`Error 500` scares people and teaches them nothing about how to recover.",
        ar: "`Error 500` بتخوّف الناس ومش بتعلّمهم يعملوا إيه بعد كده.",
      },
      code: `<p>Error 500</p>`,
    },
    do: {
      title: {
        en: "Helpful errors with a next move",
        ar: "خطأ مفيد وفيه خطوة تانية",
      },
      explanation: {
        en: "Say what failed in human words, then give one clear next step.",
        ar: "قول إيه اللي وقع بكلام بني آدم، وبعدين ادي خطوة واضحة.",
      },
      code: `<p>Couldn’t save. Check your connection.</p>`,
    },
    why: {
      en: "Good errors turn panic into action.",
      ar: "رسالة الخطأ الكويسة بتحوّل الفزع لفعل.",
    },
  },
  {
    id: "ux-colors",
    category: "UI/UX",
    dont: {
      title: {
        en: "12 random colors on one screen",
        ar: "12 لون عشوائي على شاشة واحدة",
      },
      explanation: {
        en: "Too many colors make everything shout. When everything shouts, nothing important wins.",
        ar: "ألوان كتير بتخلي كل حاجة تعيط. لما الكل بيعيط، مفيش حاجة مهمة بتكسب.",
      },
    },
    do: {
      title: {
        en: "Tiny palette, reuse it",
        ar: "باليت صغيرة وامسك فيها",
      },
      explanation: {
        en: "Pick a small palette and stick to it. Restraint is what makes UI look senior.",
        ar: "اختار باليت صغيرة وامسك فيها. الانتظام ده اللي بيخلي الواجهة شكلها سنيور.",
      },
    },
    why: {
      en: "Hierarchy becomes obvious when color isn’t fighting itself.",
      ar: "الترتيب بيبان لما الألوان مش بتتخانق مع بعض.",
    },
  },
  {
    id: "ux-spacing",
    category: "UI/UX",
    dont: {
      title: {
        en: "Random gaps everywhere",
        ar: "مسافات عشوائية في كل حتة",
      },
      explanation: {
        en: "8px here and 23px there looks “fine” until you notice the whole page feels uneven.",
        ar: "8px هنا و23px هناك شكلها “ماشية” لحد ما تلاحظ الصفحة كلها مبعترة.",
      },
    },
    do: {
      title: {
        en: "Keep spacing consistent",
        ar: "خلي المسافات ثابتة",
      },
      explanation: {
        en: "Pick a spacing scale and reuse it. Rhythm is quiet design work that people feel.",
        ar: "اختار مقياس مسافات وامسك فيه. الإيقاع شغل هادي بس الناس بتحسّه.",
      },
    },
    why: {
      en: "Consistent spacing makes reading calmer and scanning faster.",
      ar: "المسافات الثابتة بتخلي القراءة أهدى والمسح أسرع.",
    },
  },
  {
    id: "git-secrets",
    category: "Git",
    dont: {
      title: {
        en: "Commit API keys / `.env`",
        ar: "تعمل كوميت لـ API keys أو `.env`",
      },
      explanation: {
        en: "One accidental commit can put secrets in Git history forever — even if you delete the file later.",
        ar: "كوميت بالغلط واحد يقدر يحط الأسرار في تاريخ Git للأبد — حتى لو مسحت الملف بعدين.",
      },
      code: `git add .env.local`,
    },
    do: {
      title: {
        en: "Hide secrets with `.gitignore`",
        ar: "خبّي الأسرار بـ `.gitignore`",
      },
      explanation: {
        en: "Put secrets in env files, ignore them in Git, and load them at runtime. That’s the safe default.",
        ar: "حط الأسرار في ملفات env، تجاهلها في Git، وحمّلها وقت التشغيل. ده الافتراضي الآمن.",
      },
      code: `.env.local\n*.pem`,
    },
    why: {
      en: "Leaks are expensive, public, and hard to fully undo.",
      ar: "التسريب غالي، بيبان، وصعب يتصلح بالكامل.",
    },
  },
  {
    id: "devtools",
    category: "General",
    dont: {
      title: {
        en: "Guess for an hour",
        ar: "تخمّن ساعة كاملة",
      },
      explanation: {
        en: "Random code changes without looking at tools burn time. Seniors check the evidence first.",
        ar: "تغييرات عشوائية من غير أدوات بتضيّع وقت. السنيور بيشوف الدليل الأول.",
      },
    },
    do: {
      title: {
        en: "Open DevTools first",
        ar: "افتح DevTools الأول",
      },
      explanation: {
        en: "Before guessing, open Console and Network. Half the answers are already waiting there.",
        ar: "قبل ما تخمّن، افتح Console و Network. نص الإجابات قاعدة مستنياك هناك.",
      },
    },
    why: {
      en: "Debugging is detective work — start with the clues.",
      ar: "الديباج شغل تحقيق — ابدأ من الأدلة.",
    },
  },
  {
    id: "console-errors",
    category: "General",
    dont: {
      title: {
        en: "Ignore red console errors",
        ar: "تتجاهل أخطاء الـ console الحمرا",
      },
      explanation: {
        en: "Shipping with red console errors is like leaving warning lights on and hoping for the best.",
        ar: "تشيب والـ console أحمر زي ما تسيب لمبة التحذير شغالة وتتمنّى خير.",
      },
    },
    do: {
      title: {
        en: "Fix red before you call it done",
        ar: "صلّح الأحمر قبل ما تقول خلصت",
      },
      explanation: {
        en: "Treat console errors as blockers. Clear them before you say the feature is finished.",
        ar: "اعتبِر أخطاء الـ console مانع. صلّحها قبل ما تقول الميزة خلصت.",
      },
    },
    why: {
      en: "Those red lines are usually broken behavior waiting to surprise users.",
      ar: "السطور الحمرا غالبًا سلوك بايظ مستني يفاجئ اليوزر.",
    },
  },
  {
    id: "mobile-test",
    category: "General",
    dont: {
      title: {
        en: "Only check desktop, then ship",
        ar: "تشيك ديسكتوب بس وبعدين شيب",
      },
      explanation: {
        en: "Desktop-perfect can still be unusable on a phone. Don’t discover that after release.",
        ar: "الديسكتوب ممكن يكون تمام والموبايل بايظ. متكتشفش ده بعد الريليز.",
      },
    },
    do: {
      title: {
        en: "Test mobile early",
        ar: "جرّب الموبايل بدري",
      },
      explanation: {
        en: "Open phone sizes early and check taps, scroll, and spacing while changes are still cheap.",
        ar: "افتح مقاس الموبايل بدري وشوف اللمس والسكرول والمسافات والتعديل لسه رخيص.",
      },
    },
    why: {
      en: "Most layout bugs are obvious the first time you try a phone width.",
      ar: "أغلب مشاكل الديزاين بتبان من أول ما تجرب عرض الموبايل.",
    },
  },
  {
    id: "a11y-keyboard",
    category: "General",
    dont: {
      title: {
        en: "Mouse-only “finished” UI",
        ar: "واجهة “خلصت” بس بالماوس",
      },
      explanation: {
        en: "If it only works with a mouse, it isn’t finished — lots of people navigate with a keyboard.",
        ar: "لو بتشتغل بالماوس بس، دي مش خلصت — ناس كتير بتتنقل بالكيبورد.",
      },
    },
    do: {
      title: {
        en: "Finish with keyboard checks",
        ar: "خلّص بتجربة الكيبورد",
      },
      explanation: {
        en: "Tab through the flow once. If focus disappears or loops weirdly, fix that before you ship.",
        ar: "عدّي بـ Tab على الفلو مرة. لو الفوكس اختفى أو لف غريب، صلّح قبل الشيب.",
      },
    },
    why: {
      en: "Keyboard access is basic craft, not a luxury feature.",
      ar: "الوصول بالكيبورد أساسيات صنعة، مش رفاهية.",
    },
  },
  {
    id: "reduced-motion",
    category: "CSS",
    dont: {
      title: {
        en: "Flashy motion for everyone",
        ar: "حركة قوية على الكل",
      },
      explanation: {
        en: "Cool animations can make some people dizzy or sick. Motion isn’t neutral for everyone.",
        ar: "الأنيميشن الحلو ممكن يدوّخ ناس أو يضايقهم. الحركة مش محايدة للكل.",
      },
      code: `.hero { animation: spin 1s infinite; }`,
    },
    do: {
      title: {
        en: "Respect `prefers-reduced-motion`",
        ar: "احترم `prefers-reduced-motion`",
      },
      explanation: {
        en: "When someone asks for less motion, pause the decorative stuff. Keep the product usable.",
        ar: "لما حد يطلب حركة أقل، وقف الزخرفة. خلّي المنتج قابل للاستخدام.",
      },
      code: `@media (prefers-reduced-motion: reduce) {\n  * { animation: none; }\n}`,
    },
    why: {
      en: "Respecting comfort is part of shipping like a professional.",
      ar: "احترام راحة الناس جزء من إنك تشيب زي محترف.",
    },
  },
];

const CATEGORIES: TipCategoryId[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Git",
  "UI/UX",
  "General",
];

function TipHalf({
  side,
  tone,
  locale,
}: {
  side: TipSide;
  tone: "do" | "dont";
  locale: "en" | "ar";
}) {
  const isDo = tone === "do";
  const shell = isDo
    ? "border-emerald-400/30 bg-linear-to-br from-emerald-950/45 via-slate-950/70 to-slate-900/50"
    : "border-rose-400/30 bg-linear-to-br from-rose-950/45 via-slate-950/70 to-slate-900/50";
  const badge = isDo
    ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
    : "border-rose-300/40 bg-rose-400/15 text-rose-100";
  const bar = isDo ? "bg-emerald-400" : "bg-rose-400";

  return (
    <div className={`flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border ${shell}`}>
      <div className={`h-1 w-full ${bar}`} />
      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <span
          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-black tracking-wide ${badge}`}
          dir="rtl"
        >
          {isDo ? "كود نينجا" : "كود عادي"}
        </span>
        <h3
          className="mt-2.5 text-base font-black leading-snug text-white"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <RichText text={pick(side.title, locale)} />
        </h3>
        <div className="mt-1.5 space-y-1">
          <p className="text-sm leading-relaxed text-slate-200" dir="ltr">
            <RichText text={side.explanation.en} />
          </p>
          <p className="text-sm leading-relaxed text-slate-300" dir="rtl">
            <RichText text={side.explanation.ar} />
          </p>
        </div>
        {side.code ? (
          <pre
            dir="ltr"
            className="mt-2.5 max-h-24 overflow-auto rounded-xl border border-white/10 bg-black/40 p-2.5 font-mono text-[11px] leading-5 text-cyan-100"
          >
            {side.code}
          </pre>
        ) : null}
      </div>
    </div>
  );
}

export function FrontendTipsPanel() {
  const { locale } = useLanguage();
  const [category, setCategory] = useState<"all" | TipCategoryId>("all");

  const filtered = useMemo(() => {
    return TIP_PAIRS.filter(
      (pair) => category === "all" || pair.category === category,
    );
  }, [category]);

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-950 via-slate-900/90 to-cyan-950/40 p-3 shadow-[0_0_60px_-28px_rgba(34,211,238,0.35)] backdrop-blur-xl sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            Code Ninja Series
          </p>
          <h2 className="mt-1 text-xl font-black leading-tight text-white sm:text-2xl">
            {locale === "ar"
              ? "ازاي تخلي الكود بتاعك نينجا"
              : "How to make your code ninja"}
          </h2>
          <p
            className="mt-1.5 text-sm text-slate-400"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {locale === "ar"
              ? "سنيور بيشرح لجونيور: كود عادي ← كود نينجا. إنجليزي + عربي يومي."
              : "A senior explaining to a junior: ordinary code → ninja code."}
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-100">
          {filtered.length} pairs
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            category === "all"
              ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-50"
              : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
          }`}
          onClick={() => setCategory("all")}
        >
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {CATEGORIES.map((id) => (
          <button
            key={id}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              category === id
                ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-50"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
            }`}
            onClick={() => setCategory(id)}
          >
            {pick(CATEGORY_LABELS[id], locale)}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4">
        {filtered.map((pair, index) => {
          const categoryLabel = pick(CATEGORY_LABELS[pair.category], locale);

          return (
            <motion.article
              key={pair.id}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/3 p-3 sm:p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {String(index + 1).padStart(2, "0")} · {categoryLabel}
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-600" dir="rtl">
                  كود عادي ← كود نينجا
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <TipHalf side={pair.dont} tone="dont" locale={locale} />
                <TipHalf side={pair.do} tone="do" locale={locale} />
              </div>

              <div className="mt-3 rounded-xl border border-white/8 bg-black/25 px-3 py-2.5">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-200/90">
                  Why?
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-200" dir="ltr">
                  <RichText text={pair.why.en} />
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-300" dir="rtl">
                  <RichText text={pair.why.ar} />
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
