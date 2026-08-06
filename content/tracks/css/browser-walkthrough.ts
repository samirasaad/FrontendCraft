import { L } from "@/content/helpers";
import type { BrowserWalkthrough } from "@/lib/types";

const liveIntro = L(
  "Open the Live tab, run the example, then follow these DevTools steps.",
  "افتح تبويب Live، شغّل المثال، وبعدين اتبع خطوات DevTools دي.",
);

export const cssBrowserWalkthrough: Record<string, BrowserWalkthrough> = {
  "cascade-specificity": {
    intro: liveIntro,
    steps: [
      {
        title: L("Open DevTools", "افتح DevTools"),
        detail: L(
          "Press F12 (Windows/Linux) or Cmd+Option+I (Mac). Or right-click the preview → Inspect.",
          "اضغط F12 (Windows/Linux) أو Cmd+Option+I (Mac). أو كليك يمين على المعاينة → Inspect.",
        ),
      },
      {
        title: L("Styles — crossed-out rules", "Styles — قواعد مشطوبة"),
        detail: L(
          "Select an element in the Live preview. In the Styles panel, look for rules with strikethrough text — those lost the cascade.",
          "اختار عنصر من المعاينة الحية. في لوحة Styles، دور على قواعد مشطوبة — دي اللي خسرت في الـ cascade.",
        ),
      },
      {
        title: L("Computed — winning value", "Computed — القيمة الفائزة"),
        detail: L(
          "Switch to Computed and find the property you care about (e.g. color). Click the arrow to see which rule actually won.",
          "روح لـ Computed ودور على الخاصية اللي تهمك (مثلاً color). اضغط السهم عشان تشوف القاعدة اللي فعلاً كسبت.",
        ),
      },
      {
        title: L("Specificity in Styles", "Specificity في Styles"),
        detail: L(
          "Hover a selector in Styles — Chrome shows its specificity (0,1,0 etc.). Compare why .card .title beats .title.",
          "مرّر على selector في Styles — Chrome بيعرض الـ specificity (0,1,0 إلخ). قارن ليه .card .title بتغلب .title.",
        ),
      },
    ],
  },

  "box-model": {
    intro: liveIntro,
    steps: [
      {
        title: L("Select a box", "اختار صندوق"),
        detail: L(
          "In the Live preview, click any padded element. It highlights in Elements with the matching node selected.",
          "في المعاينة الحية، اضغط على أي عنصر فيه padding. هيتميّز في Elements والعقدة المناسبة هتتختار.",
        ),
      },
      {
        title: L("Layout — box model diagram", "Layout — رسم الـ box model"),
        detail: L(
          "Open the Layout tab (or the box model in Computed). You should see margin, border, padding, and content as colored layers.",
          "افتح تبويب Layout (أو الـ box model في Computed). المفروض تشوف margin و border و padding و content كطبقات ملونة.",
        ),
      },
      {
        title: L("box-sizing in Computed", "box-sizing في Computed"),
        detail: L(
          "In Computed, check box-sizing. With border-box, width includes padding and border — toggle it in Styles to see the size change.",
          "في Computed، اتأكد من box-sizing. مع border-box، الـ width بيشمل padding و border — غيّره في Styles وشوف الحجم يتغير.",
        ),
      },
      {
        title: L("Margin collapse", "انهيار الـ margin"),
        detail: L(
          "Select stacked block elements. In Layout, adjacent vertical margins may collapse — the diagram shows the used margin, not both added.",
          "اختار عناصر block فوق بعض. في Layout، الـ margins الرأسية المتجاورة ممكن تنهار — الرسم بيعرض الـ margin المستخدم، مش مجموع الاتنين.",
        ),
      },
    ],
  },

  "units-sizing": {
    intro: liveIntro,
    steps: [
      {
        title: L("Computed px values", "قيم px في Computed"),
        detail: L(
          "Select text sized with rem or em. In Computed, font-size shows the final pixel value after the browser resolves relative units.",
          "اختار نص حجمه rem أو em. في Computed، font-size بيعرض القيمة النهائية بالبكسل بعد ما المتصفح يحل الوحدات النسبية.",
        ),
      },
      {
        title: L("Root font-size", "حجم خط الجذر"),
        detail: L(
          "Select the html element in Elements. Check Computed font-size — 1rem equals this root size (often 16px unless changed).",
          "اختار عنصر html في Elements. اتأكد من font-size في Computed — 1rem بيساوي حجم الجذر ده (غالباً 16px لو ماتغيّرش).",
        ),
      },
      {
        title: L("Width and height units", "وحدات العرض والارتفاع"),
        detail: L(
          "Click a sized container. In Computed, width and height show resolved pixels even when you wrote %, vw, or ch in CSS.",
          "اضغط على حاوية ليها أبعاد. في Computed، width و height بيعرضوا بكسل محسوب حتى لو كتبت % أو vw أو ch في CSS.",
        ),
      },
      {
        title: L("min/max clamp", "min/max و clamp"),
        detail: L(
          "Resize the preview narrower. Watch Computed width on a clamp() element — it should stop shrinking at the minimum you set.",
          "صغّر عرض المعاينة. راقب width في Computed على عنصر فيه clamp() — المفروض يوقف يصغر عند الحد الأدنى اللي حددته.",
        ),
      },
    ],
  },

  "colors-typography": {
    intro: liveIntro,
    steps: [
      {
        title: L("Color swatch in Styles", "عينة اللون في Styles"),
        detail: L(
          "Select styled text. In Styles, click the color square next to color — the picker shows hex, rgb, and hwb values.",
          "اختار نص متنسّق. في Styles، اضغط مربع اللون جنب color — الـ picker بيعرض hex و rgb و hwb.",
        ),
      },
      {
        title: L("Contrast ratio", "نسبة التباين"),
        detail: L(
          "With the color picker open on text, Chrome shows contrast against the background. Aim for AA (4.5:1) on body copy.",
          "لما color picker مفتوح على نص، Chrome بيعرض التباين مع الخلفية. استهدف AA (4.5:1) لنص الجسم.",
        ),
      },
      {
        title: L("Font stack in Computed", "Font stack في Computed"),
        detail: L(
          "Select a heading or paragraph. In Computed, font-family shows the full stack and which font actually rendered.",
          "اختار عنوان أو فقرة. في Computed، font-family بيعرض الـ stack كامل والخط اللي اترسم فعلاً.",
        ),
      },
      {
        title: L("line-height and spacing", "line-height والمسافات"),
        detail: L(
          "Check line-height and letter-spacing in Computed. Unitless line-height (e.g. 1.5) scales with font-size — px values do not.",
          "اتأكد من line-height و letter-spacing في Computed. line-height بدون وحدة (مثلاً 1.5) بيتناسب مع font-size — قيم px لا.",
        ),
      },
    ],
  },

  "display-flow": {
    intro: liveIntro,
    steps: [
      {
        title: L("display in Computed", "display في Computed"),
        detail: L(
          "Click a block, inline, or inline-block element. Computed shows the used display value — including changes from hidden or flex parents.",
          "اضغط عنصر block أو inline أو inline-block. Computed بيعرض قيمة display المستخدمة — بما فيها التغييرات من آباء hidden أو flex.",
        ),
      },
      {
        title: L("Inline vs block boxes", "صناديق inline مقابل block"),
        detail: L(
          "Select an inline element inside a paragraph. In Layout, note it flows with text and does not start a new line on its own.",
          "اختار عنصر inline جوه فقرة. في Layout، لاحظ إنه بيمشي مع النص ومش بيبدأ سطر جديد لوحده.",
        ),
      },
      {
        title: L("overflow behavior", "سلوك overflow"),
        detail: L(
          "Find a container with overflow: hidden or auto. Shrink the preview — scrollbars or clipping should match what you set in Styles.",
          "دور على حاوية فيها overflow: hidden أو auto. صغّر المعاينة — الـ scrollbars أو القص لازم يطابقوا اللي في Styles.",
        ),
      },
      {
        title: L("visibility vs display", "visibility مقابل display"),
        detail: L(
          "Toggle visibility: hidden vs display: none in Styles. Hidden keeps layout space; none removes the box from flow entirely.",
          "بدّل visibility: hidden مقابل display: none في Styles. hidden بيحتفظ بالمساحة؛ none بيشيل الصندوق من التدفق تماماً.",
        ),
      },
    ],
  },

  "backgrounds-borders": {
    intro: liveIntro,
    steps: [
      {
        title: L("Background layers in Styles", "طبقات الخلفية في Styles"),
        detail: L(
          "Select a card or hero section. In Styles, expand background — you can see color, image URL, size, and position separately.",
          "اختار card أو قسم hero. في Styles، وسّع background — هتشوف اللون و URL الصورة والحجم والموضع بشكل منفصل.",
        ),
      },
      {
        title: L("Border box in Layout", "Border box في Layout"),
        detail: L(
          "Open Layout for a bordered element. The orange border ring sits between padding and margin in the box model diagram.",
          "افتح Layout لعنصر فيه border. حلقة الـ border البرتقالية بين padding و margin في رسم الـ box model.",
        ),
      },
      {
        title: L("border-radius preview", "معاينة border-radius"),
        detail: L(
          "Click the border-radius values in Styles — Chrome lets you drag handles on the element to tweak corners live.",
          "اضغط قيم border-radius في Styles — Chrome بيخليك تسحب مقابض على العنصر عشان تعدّل الزوايا مباشرة.",
        ),
      },
      {
        title: L("background-clip", "background-clip"),
        detail: L(
          "Try background-clip: text in Styles. The background should only paint inside the letter shapes — check Computed to confirm.",
          "جرب background-clip: text في Styles. الخلفية لازم ترسم جوه شكل الحروف بس — اتأكد في Computed.",
        ),
      },
    ],
  },

  "flexbox-basics": {
    intro: liveIntro,
    steps: [
      {
        title: L("Select the flex container", "اختار حاوية flex"),
        detail: L(
          "Click the parent row or column in the Live preview. In Elements, look for display: flex on that node in Styles.",
          "اضغط الصف أو العمود الأب في المعاينة الحية. في Elements، دور على display: flex على العقدة دي في Styles.",
        ),
      },
      {
        title: L("Flexbox overlay", "طبقة Flexbox"),
        detail: L(
          "In Elements, click the flex badge next to the container (or Layout → Flexbox). Colored overlays show each flex item and gaps.",
          "في Elements، اضغط شارة flex جنب الحاوية (أو Layout → Flexbox). طبقات ملونة بتوضح كل flex item والفجوات.",
        ),
      },
      {
        title: L("justify and align in Styles", "justify و align في Styles"),
        detail: L(
          "Find justify-content and align-items in Styles. Toggle values (center, space-between) and watch items move in the overlay.",
          "دور على justify-content و align-items في Styles. بدّل القيم (center, space-between) وشوف العناصر تتحرك في الطبقة.",
        ),
      },
      {
        title: L("flex item properties", "خصائص flex item"),
        detail: L(
          "Select a child item. Check flex-grow, flex-shrink, and align-self in Computed — they explain why one item stretches and another does not.",
          "اختار عنصر ابن. اتأكد من flex-grow و flex-shrink و align-self في Computed — بيوضحوا ليه عنصر بيتمدد وتاني لأ.",
        ),
      },
    ],
  },

  "css-grid": {
    intro: liveIntro,
    steps: [
      {
        title: L("Select the grid container", "اختار حاوية grid"),
        detail: L(
          "Click the grid layout in the Live preview. The container should show display: grid in Styles.",
          "اضغط تخطيط الـ grid في المعاينة الحية. الحاوية لازم تعرض display: grid في Styles.",
        ),
      },
      {
        title: L("Grid overlay", "طبقة Grid"),
        detail: L(
          "In Elements, click the grid badge (or Layout → Grid). Line numbers, tracks, and gaps appear over the preview.",
          "في Elements، اضغط شارة grid (أو Layout → Grid). أرقام الخطوط والمسارات والفجوات بتظهر فوق المعاينة.",
        ),
      },
      {
        title: L("grid-template in Styles", "grid-template في Styles"),
        detail: L(
          "Read grid-template-columns and grid-template-rows in Styles. Change fr or minmax values and watch tracks resize in the overlay.",
          "اقرأ grid-template-columns و grid-template-rows في Styles. غيّر قيم fr أو minmax وشوف المسارات تتغير في الطبقة.",
        ),
      },
      {
        title: L("Item placement", "وضع العناصر"),
        detail: L(
          "Select a grid child. Computed shows grid-column and grid-row — which cell it occupies and whether it spans multiple tracks.",
          "اختار عنصر ابن في الـ grid. Computed بيعرض grid-column و grid-row — الخلية اللي شاغلها ولو بيمتد على مسارات متعددة.",
        ),
      },
    ],
  },

  "positioning": {
    intro: liveIntro,
    steps: [
      {
        title: L("position in Computed", "position في Computed"),
        detail: L(
          "Select a positioned element (relative, absolute, fixed, or sticky). Computed shows the used position value and offset properties.",
          "اختار عنصر positioned (relative أو absolute أو fixed أو sticky). Computed بيعرض قيمة position المستخدمة وخصائص الإزاحة.",
        ),
      },
      {
        title: L("Containing block", "Containing block"),
        detail: L(
          "For position: absolute, find the nearest positioned ancestor in Elements. The child offsets are relative to that box, not the viewport.",
          "لـ position: absolute، دور على أقرب أب positioned في Elements. الإزاحة بتاعة الابن نسبة للصندوق ده، مش للـ viewport.",
        ),
      },
      {
        title: L("z-index stacking", "تراص z-index"),
        detail: L(
          "Select overlapping elements. In Computed, compare z-index and check which paints on top — stacking only works within the same context.",
          "اختار عناصر متداخلة. في Computed، قارن z-index وشوف مين فوق — التراص بيشتغل جوه نفس السياق بس.",
        ),
      },
      {
        title: L("sticky behavior", "سلوك sticky"),
        detail: L(
          "Scroll the preview with a sticky header selected. Watch top in Computed — the element sticks when its container scrolls past that offset.",
          "اعمل scroll في المعاينة وعنوان sticky مختار. راقب top في Computed — العنصر بيلزق لما الحاوية تعدّي الإزاحة دي.",
        ),
      },
    ],
  },

  "responsive-media": {
    intro: liveIntro,
    steps: [
      {
        title: L("Device toolbar", "شريط الأجهزة"),
        detail: L(
          "Press Ctrl+Shift+M (Cmd+Shift+M on Mac) to open the device toolbar. Pick a phone or tablet preset and reload the preview.",
          "اضغط Ctrl+Shift+M (Cmd+Shift+M على Mac) لفتح شريط الأجهزة. اختار preset موبايل أو تابلت واعمل reload للمعاينة.",
        ),
      },
      {
        title: L("Media queries in Styles", "Media queries في Styles"),
        detail: L(
          "In Styles, look for @media blocks. Resize the viewport — rules inside matching breakpoints activate and others strike through.",
          "في Styles، دور على @media blocks. غيّر عرض الـ viewport — القواعد جوه الـ breakpoints المطابقة تتفعّل والباقي يتشطب.",
        ),
      },
      {
        title: L("Computed at breakpoints", "Computed عند breakpoints"),
        detail: L(
          "Select an element and toggle device widths. Watch Computed values (font-size, display, width) change when a media query kicks in.",
          "اختار عنصر وبدّل عروض الجهاز. راقب قيم Computed (font-size, display, width) تتغير لما media query يشتغل.",
        ),
      },
      {
        title: L("prefers-reduced-motion", "prefers-reduced-motion"),
        detail: L(
          "Open Rendering (Cmd+Shift+P → Emulate CSS prefers-reduced-motion). Animations under that media query should disable or simplify.",
          "افتح Rendering (Cmd+Shift+P → Emulate CSS prefers-reduced-motion). الحركات تحت الـ media query دي لازم تتعطّل أو تتبسّط.",
        ),
      },
    ],
  },

  "custom-properties": {
    intro: liveIntro,
    steps: [
      {
        title: L("Variables on :root", "متغيرات على :root"),
        detail: L(
          "In Elements, select :root or html. In Styles, find --variable names and their values in the :root rule block.",
          "في Elements، اختار :root أو html. في Styles، دور على أسماء --variable وقيمها في قاعدة :root.",
        ),
      },
      {
        title: L("var() in Computed", "var() في Computed"),
        detail: L(
          "Select an element using var(--token). In Computed, the resolved value shows the final color or size after inheritance.",
          "اختار عنصر بيستخدم var(--token). في Computed، القيمة المحلولة بتوضح اللون أو الحجم النهائي بعد الوراثة.",
        ),
      },
      {
        title: L("Override on a subtree", "تجاوز على فرع"),
        detail: L(
          "Find a child that redefines a custom property. Styles shows the local --token — descendants inherit the override, not :root.",
          "دور على ابن بيعرّف custom property من جديد. Styles بيعرض --token المحلي — الأحفاد بيرثوا التجاوز، مش :root.",
        ),
      },
      {
        title: L("Fallback values", "قيم fallback"),
        detail: L(
          "Look for var(--missing, fallback) in Styles. Remove the variable temporarily — Computed should show the fallback you provided.",
          "دور على var(--missing, fallback) في Styles. شيل المتغير مؤقتاً — Computed لازم يعرض الـ fallback اللي كتبته.",
        ),
      },
    ],
  },

  "transitions-transforms": {
    intro: liveIntro,
    steps: [
      {
        title: L("Trigger the transition", "فعّل الـ transition"),
        detail: L(
          "Hover or focus the interactive element in the Live preview. Watch the property animate — select it in Elements before and after.",
          "مرّر أو ركّز على العنصر التفاعلي في المعاينة الحية. راقب الخاصية تتحرك — اختاره في Elements قبل وبعد.",
        ),
      },
      {
        title: L("transition in Styles", "transition في Styles"),
        detail: L(
          "In Styles, read transition-property, duration, and timing-function. Change duration to 2s and replay the interaction.",
          "في Styles، اقرأ transition-property و duration و timing-function. غيّر duration لـ 2s وكرر التفاعل.",
        ),
      },
      {
        title: L("transform in Computed", "transform في Computed"),
        detail: L(
          "Select a transformed element. Computed shows the full transform matrix — rotate, scale, and translate combined.",
          "اختار عنصر متحوّل. Computed بيعرض مصفوفة transform كاملة — rotate و scale و translate مجمّعين.",
        ),
      },
      {
        title: L("prefers-reduced-motion", "prefers-reduced-motion"),
        detail: L(
          "Emulate prefers-reduced-motion in Rendering. Transitions should shorten or turn off if your CSS respects that media query.",
          "فعّل prefers-reduced-motion في Rendering. الـ transitions لازم تقصر أو تتقفل لو CSS بيحترم الـ media query دي.",
        ),
      },
    ],
  },

  "css-animations": {
    intro: liveIntro,
    steps: [
      {
        title: L("Animations panel", "لوحة Animations"),
        detail: L(
          "Open the Animations tab (More tools → Animations). Replay the example and scrub the timeline to freeze a keyframe.",
          "افتح تبويب Animations (More tools → Animations). أعد تشغيل المثال وحرّك الـ timeline عشان توقف عند keyframe.",
        ),
      },
      {
        title: L("@keyframes in Styles", "@keyframes في Styles"),
        detail: L(
          "Find @keyframes in Styles and expand the rule. Each percentage block lists which properties change at that moment.",
          "دور على @keyframes في Styles ووسّع القاعدة. كل نسبة مئوية بتوضح الخصائص اللي بتتغير في اللحظة دي.",
        ),
      },
      {
        title: L("animation shorthand", "اختصار animation"),
        detail: L(
          "On the animated element, read animation-name, duration, and iteration-count in Styles or Computed.",
          "على العنصر المتحرك، اقرأ animation-name و duration و iteration-count في Styles أو Computed.",
        ),
      },
      {
        title: L("prefers-reduced-motion", "prefers-reduced-motion"),
        detail: L(
          "Emulate prefers-reduced-motion. Well-built examples pause or replace infinite animations — verify in the preview.",
          "فعّل prefers-reduced-motion. الأمثلة الجيدة بتوقف أو تستبدل الحركات اللانهائية — اتأكد في المعاينة.",
        ),
      },
    ],
  },

  "logical-properties": {
    intro: liveIntro,
    steps: [
      {
        title: L("direction on html", "direction على html"),
        detail: L(
          "Select html in Elements. Check dir and Computed direction — logical properties map to physical sides based on this.",
          "اختار html في Elements. اتأكد من dir و direction في Computed — الخصائص المنطقية بتتحول لجوانب فيزيائية حسب ده.",
        ),
      },
      {
        title: L("margin-inline vs margin-left", "margin-inline مقابل margin-left"),
        detail: L(
          "Find margin-inline or padding-inline in Styles. Toggle dir=\"rtl\" on html and watch Computed swap which physical side gets the space.",
          "دور على margin-inline أو padding-inline في Styles. بدّل dir=\"rtl\" على html وشوف Computed يبدّل الجانب الفيزيائي اللي بياخد المساحة.",
        ),
      },
      {
        title: L("inline-size and block-size", "inline-size و block-size"),
        detail: L(
          "Select a sized box using logical dimensions. Computed resolves inline-size to width in horizontal writing mode.",
          "اختار صندوق أبعاده منطقية. Computed بيحوّل inline-size لـ width في وضع الكتابة الأفقي.",
        ),
      },
      {
        title: L("border-inline-start", "border-inline-start"),
        detail: L(
          "Inspect border-inline-start in Styles. In LTR it is the left edge; switch to RTL and the same rule paints the right edge.",
          "افحص border-inline-start في Styles. في LTR ده الحافة اليسار؛ حوّل لـ RTL ونفس القاعدة ترسم الحافة اليمين.",
        ),
      },
    ],
  },

  "css-common-pitfalls": {
    intro: liveIntro,
    steps: [
      {
        title: L("Styles — unexpected winner", "Styles — فائز غير متوقع"),
        detail: L(
          "When a style looks wrong, select the element and scan Styles for strikethrough rules. The active rule at the bottom usually explains the surprise.",
          "لما ستايل يبان غلط، اختار العنصر وامسح Styles على القواعد المشطوبة. القاعدة النشطة في الآخر غالباً بتوضح المفاجأة.",
        ),
      },
      {
        title: L("Computed vs authored", "Computed مقابل المكتوب"),
        detail: L(
          "Compare what you wrote in the editor with Computed. Inherited font-size, collapsed margins, and width:100% often differ from what you expect.",
          "قارن اللي كتبته في المحرر مع Computed. font-size الموروث والـ margins المنهارة و width:100% غالباً مختلفين عن توقعك.",
        ),
      },
      {
        title: L("Flex/grid min-size defaults", "قيم min-size الافتراضية في flex/grid"),
        detail: L(
          "Overflowing flex or grid children? Check Computed min-width — auto prevents shrinking below content size unless you set min-width: 0.",
          "أبناء flex أو grid بيطلعوا برة؟ اتأكد من min-width في Computed — auto بيمنع التصغير تحت حجم المحتوى إلا لو حطيت min-width: 0.",
        ),
      },
      {
        title: L("Console — layout warnings", "Console — تحذيرات التخطيط"),
        detail: L(
          "Open Console while resizing. Rarely, deprecated properties or parse errors log in red — fix those before chasing visual bugs.",
          "افتح Console وإنت بتغيّر الحجم. نادراً، خصائص مهجورة أو أخطاء parse بتظهر بالأحمر — صلحها قبل ما تطارد أخطاء الشكل.",
        ),
      },
    ],
  },

  "css-cheatsheet": {
    intro: liveIntro,
    steps: [
      {
        title: L("Open DevTools", "افتح DevTools"),
        detail: L(
          "Press F12 (Windows/Linux) or Cmd+Option+I (Mac). Or right-click the preview → Inspect.",
          "اضغط F12 (Windows/Linux) أو Cmd+Option+I (Mac). أو كليك يمين على المعاينة → Inspect.",
        ),
      },
      {
        title: L("Elements → pick from preview", "Elements → اختيار من المعاينة"),
        detail: L(
          "Use the element picker (Ctrl+Shift+C) and click anything in the Live preview to jump straight to its node and styles.",
          "استخدم أداة اختيار العنصر (Ctrl+Shift+C) واضغط أي حاجة في المعاينة الحية عشان تقفز للعقدة والستايلات مباشرة.",
        ),
      },
      {
        title: L("Styles and Computed workflow", "سير عمل Styles و Computed"),
        detail: L(
          "Debug in Styles (what rules apply, toggle values live). Confirm the final result in Computed (resolved pixels, winning cascade).",
          "صحّح في Styles (إيه القواعد المطبقة، بدّل القيم مباشرة). أكد النتيجة النهائية في Computed (بكسل محسوب، الـ cascade الفائز).",
        ),
      },
      {
        title: L("Layout overlays", "طبقات Layout"),
        detail: L(
          "For flex, grid, and box model lessons, use the Layout tab badges — they are the fastest way to see spacing and tracks.",
          "لدروس flex و grid و box model، استخدم شارات تبويب Layout — دي أسرع طريقة تشوف المسافات والمسارات.",
        ),
      },
    ],
  },
};
