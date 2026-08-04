import { L, realWorldExample, simpleExample } from "@/content/helpers";
import type { LessonDraft } from "@/content/tracks/_insights";
import type { Tier } from "@/lib/types";

type LessonSpec = {
  slug: string;
  tier: Extract<Tier, "beginner" | "intermediate" | "advanced">;
  /** Estimated minutes for concept + lab + quiz. */
  readMinutes: number;
  title: [string, string];
  summary: [string, string];
  paragraphs: [string, string][];
  points: [string, string][];
  icon: string;
  visualizer: string;
  simple: string;
  real: string;
  visualHint: [string, string];
};

const html = (style: string, body: string) => `<style>
${style}
</style>
${body}`;

function lesson(spec: LessonSpec, index: number): LessonDraft {
  return {
    id: `css-${index + 1}`,
    order: 0,
    slug: spec.slug,
    tier: spec.tier,
    readMinutes: spec.readMinutes,
    icon: spec.icon,
    visualizer: spec.visualizer,
    content: {
      title: L(...spec.title),
      summary: L(...spec.summary),
      paragraphs: spec.paragraphs.map(([en, ar]) => L(en, ar)),
      keyPoints: spec.points.map(([en, ar]) => L(en, ar)),
      examples: [
        simpleExample(
          spec.simple,
          `Simple practice — ${spec.title[0]}`,
          `تمرين بسيط — ${spec.title[1]}`,
        ),
        realWorldExample(
          spec.real,
          `Real-world pattern — ${spec.title[0]}`,
          `نمط واقعي — ${spec.title[1]}`,
        ),
      ],
      visualHint: L(...spec.visualHint),
    },
  };
}

const specs: LessonSpec[] = [
  {
    slug: "cascade-specificity", tier: "beginner", readMinutes: 5, icon: "Layers", visualizer: "cascade-lab",
    title: ["The Cascade & Specificity", "الـ `Cascade` و `Specificity`"],
    summary: ["Learn why one CSS rule wins when several rules target the same element.", "اتعلّم ليه قاعدة `CSS` بتكسب لما كذا قاعدة تستهدف نفس العنصر."],
    paragraphs: [
      ["The `cascade` resolves competing declarations by origin, importance, specificity, then source order. Later code wins only when the earlier tests tie.", "الـ `cascade` بتحل التعارض حسب المصدر و`importance` و`specificity` وبعدها ترتيب الكود. اللي جاي بعد كده يكسب بس لما اللي قبله يتعادلوا."],
      ["`Specificity` is a selector weight: IDs beat classes, and classes beat element selectors. It is not a reason to keep adding IDs.", "الـ `specificity` وزن للـ `selector`: الـ `IDs` تكسب الـ `classes`، والـ `classes` تكسب أسماء العناصر. مش سبب إنك تزوّد `IDs`."],
      ["Keep selectors shallow and use component classes. That makes overrides intentional instead of an `!important` arms race.", "خلّي الـ `selectors` بسيطة واستخدم `component classes`. كده الـ `overrides` تبقى مقصودة بدل حرب `!important`."],
    ],
    points: [["`importance` comes before `specificity`", "`importance` قبل `specificity`"], ["Later wins only on a tie", "المتأخر يكسب بس في التعادل"], ["Prefer low-specificity component classes", "فضّل `component classes` قليلة `specificity`"]],
    simple: html(`p { color: steelblue; }\n.note { color: tomato; }`, `<p class="note">The class rule wins.</p>`),
    real: html(`.card { border: 2px solid #94a3b8; }\n.card--featured { border-color: #0ea5e9; }`, `<article class="card card--featured">Featured CSS lesson</article>`),
    visualHint: ["Add or remove a class on the element and see which color wins.", "غيّر `class` واحد على العنصر واتفرّج أنهي لون بيكسب."],
  },
  {
    slug: "box-model", tier: "beginner", readMinutes: 5, icon: "Box", visualizer: "box-model-lab",
    title: ["The CSS Box Model", "نموذج الصندوق في `CSS`"],
    summary: ["Every visible element is content surrounded by `padding`, `border`, and `margin`.", "كل عنصر ظاهر هو محتوى حوالينه `padding` و`border` و`margin`."],
    paragraphs: [
      ["Content is the area for text or media. `padding` adds breathing room inside the `border`; `margin` creates space outside it.", "الـ `content` هي مساحة النص أو الميديا. الـ `padding` بيزوّد نفس جوه الـ `border`؛ والـ `margin` بيعمل مسافة بره."],
      ["With `content-box`, declared `width` excludes `padding` and `border`. `border-box` includes them, which makes component sizing predictable.", "مع `content-box`، الـ `width` المعلن مش بيشمل `padding` و`border`. `border-box` بيشملهم وده بيخلي مقاسات المكوّن متوقعة."],
      ["Vertical margins can collapse between normal-flow blocks. Use `padding`, `flex`/`grid` gaps, or a new formatting context when you need reliable spacing.", "الـ `margins` العمودية ممكن تندمج بين `blocks` في الـ `normal flow`. استخدم `padding` أو `gaps` أو `formatting context` جديد لو محتاج مسافات ثابتة."],
    ],
    points: [["`padding` is inside; `margin` is outside", "`padding` جوه؛ `margin` بره"], ["Use `border-box` globally", "استخدم `border-box` بشكل عام"], ["`gap` avoids many margin surprises", "`gap` بتتجنب مفاجآت `margin` كتير"]],
    simple: html(`.box { box-sizing: border-box; width: 220px; padding: 24px; border: 4px solid #38bdf8; margin: 16px; background: #e0f2fe; }`, `<div class="box">220px stays 220px wide.</div>`),
    real: html(`* { box-sizing: border-box; }\n.card { width: 100%; max-width: 320px; padding: 1.25rem; border: 1px solid #cbd5e1; border-radius: 12px; }`, `<article class="card"><h2>Lesson card</h2><p>Predictable sizing.</p></article>`),
    visualHint: ["Switch between `content-box` and `border-box`, then resize the panel.", "بدّل بين `content-box` و`border-box`، وبعدين غيّر مقاس اللوحة."],
  },
  {
    slug: "units-sizing", tier: "beginner", readMinutes: 5, icon: "Ruler", visualizer: "sizing-lab",
    title: ["Units & Responsive Sizing", "الوحدات والمقاسات المتجاوبة"],
    summary: ["Choose units that match the thing you are sizing: text, containers, or viewport.", "اختار `units` مناسبة للي بتقيسه: نص أو `container` أو `viewport`."],
    paragraphs: [
      ["Pixels are useful for crisp borders and deliberate limits. `rem` follows the root font size, so it is a strong default for typography and spacing.", "الـ `pixels` مفيدة للحدود الدقيقة والحدود المقصودة. `rem` بتتبع حجم خط الـ `root`، فممتازة للخطوط والمسافات."],
      ["Percentages resolve against a containing block, while viewport units resolve against the viewport. Neither is automatically responsive without sensible constraints.", "النسب المئوية بتتحسب بالنسبة للـ `containing block`، و`viewport units` بالنسبة للشاشة. ولا واحدة `responsive` تلقائيًا من غير حدود منطقية."],
      ["Combine `min()`, `max()`, `clamp()`, `max-width`, and `aspect-ratio` to express a range instead of forcing one fixed size.", "اجمع `min()` و`max()` و`clamp()` و`max-width` و`aspect-ratio` عشان تعبّر عن مدى بدل مقاس ثابت."],
    ],
    points: [["Use `rem` for scalable spacing", "استخدم `rem` لمسافات قابلة للتكبير"], ["Constrain fluid widths with `max-width`", "قيّد العروض السائلة بـ `max-width`"], ["`clamp()` expresses safe ranges", "`clamp()` بتعبر عن مدى آمن"]],
    simple: html(`h1 { font-size: clamp(2rem, 7vw, 4.5rem); }\n.wrap { width: min(92%, 70rem); margin-inline: auto; }`, `<main class="wrap"><h1>Fluid, not wild</h1></main>`),
    real: html(`.video { width: min(100%, 48rem); aspect-ratio: 16 / 9; background: #0f172a; color: white; display: grid; place-items: center; }`, `<section class="video">Responsive video area</section>`),
    visualHint: ["Resize the preview and watch `clamp()` scale the heading.", "غيّر عرض المعاينة واتفرّج على `clamp()` وهي بتكبّر العنوان."],
  },
  {
    slug: "colors-typography", tier: "beginner", readMinutes: 5, icon: "Palette", visualizer: "type-color-lab",
    title: ["Color & Typography", "الألوان و`Typography`"],
    summary: ["Build readable text systems before decorating a page with color.", "ابنِ نظام نص مقروء قبل ما تزيّن الصفحة بالألوان."],
    paragraphs: [
      ["Color can be written as named values, `hex`, `rgb()`, `hsl()`, or modern color functions. Pick a token system so the same meaning uses the same value.", "اللون ممكن يتكتب بأسماء أو `hex` أو `rgb()` أو `hsl()` أو `functions` حديثة. اختار `token system` عشان نفس المعنى يستخدم نفس القيمة."],
      ["Typography is more than `font-size`: `line-height` controls reading rhythm, `font-weight` changes emphasis, and measure limits tiring long lines.", "الـ `typography` مش `font-size` بس: `line-height` بتنظم الإيقاع، `font-weight` بتغيّر التأكيد، و`measure` بتحد السطور المرهقة."],
      ["Check contrast for text and focus indicators. A beautiful low-contrast palette can make the interface unusable outdoors or for low-vision readers.", "راجع `contrast` للنص ومؤشرات الـ `focus`. `palette` جميلة ضعيفة التباين ممكن تخلي الواجهة مش نافعة في الشمس أو لضعاف البصر."],
    ],
    points: [["Use semantic color tokens", "استخدم `color tokens` معنوية"], ["Set a comfortable `line-height`", "حط `line-height` مريحة"], ["Contrast is a usability requirement", "التباين مطلب قابلية استخدام"]],
    simple: html(`body { color: #172033; font: 1rem/1.6 system-ui; }\nh1 { color: #075985; letter-spacing: -0.02em; }`, `<h1>Readable heading</h1><p>Comfortable body text has room to breathe.</p>`),
    real: html(`.notice { max-width: 60ch; padding: 1rem; background: #ecfeff; color: #164e63; border-inline-start: 4px solid #0891b2; }`, `<aside class="notice"><strong>Tip:</strong> Keep line length near 45–75 characters.</aside>`),
    visualHint: ["Tweak `font-size` or `line-height` and read the paragraph aloud.", "عدّل `font-size` أو `line-height` واقرأ الفقرة بصوت عالي."],
  },
  {
    slug: "display-flow", tier: "beginner", readMinutes: 5, icon: "Square", visualizer: "flow-lab",
    title: ["Display & Normal Flow", "`Display` والـ `Normal Flow`"],
    summary: ["Understand the default layout algorithm before reaching for positioning.", "افهم الـ `layout` الافتراضي قبل ما تلجأ للـ `positioning`."],
    paragraphs: [
      ["Block boxes normally stack and stretch across available inline space. Inline content flows inside lines and ignores `width` and vertical `margin` in familiar ways.", "الـ `block boxes` عادة بتترص وبتتمدد في مساحة الـ `inline` المتاحة. الـ `inline content` بيمشي جوه السطور وبتتجاهل `width` و`margin` العمودي بشكل معروف."],
      ["`display` changes how a box participates in layout, not its semantic meaning. An inline element can become block, but it remains the same HTML element.", "`display` بتغير مشاركة الصندوق في الـ `layout`، مش معناه. عنصر `inline` ممكن يبقى `block` لكنه يفضل نفس عنصر `HTML`."],
      ["Use flow for document content, `flex` for one axis, and `grid` for two axes. That choice reduces magic offsets and fragile layouts.", "استخدم `flow` لمحتوى المستند، `flex` لمحور واحد، و`grid` لمحورين. الاختيار ده يقلل `offsets` السحرية و`layouts` الهشة."],
    ],
    points: [["Blocks stack by default", "الـ `blocks` بتترص افتراضيًا"], ["Inline boxes flow with text", "الـ `inline boxes` بتمشي مع النص"], ["`display` changes layout participation", "`display` بتغير المشاركة في الـ `layout`"]],
    simple: html(`.tag { display: inline-block; padding: .25rem .5rem; background: #dbeafe; border-radius: 999px; }\n.panel { display: block; padding: 1rem; background: #f8fafc; }`, `<span class="tag">Inline-block tag</span><div class="panel">A normal block panel</div>`),
    real: html(`article { max-width: 65ch; margin: auto; }\narticle p { margin-block: 1em; }\nmark { display: inline; background: #fef08a; }`, `<article><h1>Article flow</h1><p>Text keeps a readable <mark>inline rhythm</mark>.</p><p>Blocks stack naturally.</p></article>`),
    visualHint: ["Toggle `display` between `block` and `inline-block` on the tag.", "بدّل `display` بين `block` و`inline-block` على الـ `tag`."],
  },
  {
    slug: "backgrounds-borders", tier: "beginner", readMinutes: 5, icon: "Paintbrush", visualizer: "surface-lab",
    title: ["Backgrounds & Borders", "الخلفيات والحدود"],
    summary: ["Layer color, images, radius, and borders to create clear surfaces.", "ركّب لون وصور و`radius` وحدود عشان تعمل `surfaces` واضحة."],
    paragraphs: [
      ["`background-color` paints behind content and `padding` by default. Background images can be layered, positioned, and sized independently from the element's content.", "`background-color` بتترسم ورا المحتوى والـ `padding` افتراضيًا. صور الخلفية ممكن تتراكب وتتحدد وتتقاس بشكل مستقل."],
      ["Borders consume space in the box model, while `outline` does not. Use `outline` for focus because it remains visible without moving nearby layout.", "الحدود بتاخد مساحة في `box model`، لكن `outline` لا. استخدم `outline` للـ `focus` عشان يفضل ظاهر من غير ما يزق الـ `layout`."],
      ["`border-radius` should support the component shape, not hide structure. Keep interactive states visible even on subtle surfaces.", "`border-radius` لازم تخدم شكل المكوّن، مش تخفي الهيكل. خلّي الحالات التفاعلية ظاهرة حتى على `surfaces` هادية."],
    ],
    points: [["Backgrounds can be layered", "الخلفيات ممكن تتراكب"], ["Borders affect size", "الحدود بتأثر على المقاس"], ["Use `outline` for visible focus", "استخدم `outline` للـ `focus` الظاهر"]],
    simple: html(`.tile { padding: 1.5rem; border: 2px solid #7dd3fc; border-radius: 1rem; background: linear-gradient(135deg, #ecfeff, #eff6ff); }`, `<div class="tile">A layered surface</div>`),
    real: html(`.hero { padding: 3rem 1.5rem; color: white; border-radius: 1.25rem; background: linear-gradient(#0f172acc, #0f172acc), radial-gradient(circle at top, #38bdf8, #0f172a); }\n.hero:focus-within { outline: 3px solid #facc15; outline-offset: 4px; }`, `<section class="hero"><h1>Build surfaces</h1><button>Start lesson</button></section>`),
    visualHint: ["Change `border-radius` or add an `outline` and see what moves.", "غيّر `border-radius` أو ضيف `outline` واتفرّج إيه اللي بيتحرك."],
  },
  {
    slug: "flexbox-basics", tier: "intermediate", readMinutes: 5, icon: "Columns2", visualizer: "flexbox-lab",
    title: ["Flexbox Basics", "أساسيات `Flexbox`"],
    summary: ["Align and distribute items along one responsive axis.", "حاذي ووزّع العناصر على محور `responsive` واحد."],
    paragraphs: [
      ["A flex container creates a main axis and cross axis. `flex-direction` chooses the main direction; alignment properties operate relative to those axes.", "الـ `flex container` بتعمل `main axis` و`cross axis`. `flex-direction` بتختار الاتجاه؛ وخصائص المحاذاة بتشتغل بالنسبة للمحاور دي."],
      ["`justify-content` distributes free space on the main axis, while `align-items` aligns items on the cross axis. `gap` adds space without child margins.", "`justify-content` بتوزع المساحة الحرة على `main axis`، و`align-items` بتحاذي على `cross axis`. `gap` بتضيف مسافة من غير `margins` على الأطفال."],
      ["Let items grow or shrink deliberately with `flex`. A common pattern is a flexible content area beside a fixed-size icon or action.", "خلّي العناصر تكبر أو تصغر بقصد بـ `flex`. نمط شائع: محتوى مرن جنب أيقونة أو `action` بمقاس ثابت."],
    ],
    points: [["Flex is one-dimensional", "`Flex` أحادي البعد"], ["`justify` main, `align` cross", "`justify` للمحور الرئيسي و`align` للعرضي"], ["Prefer `gap` over child margins", "فضّل `gap` عن `margins` الأطفال"]],
    simple: html(`.row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1rem; background: #f1f5f9; }`, `<div class="row"><strong>CSS lesson</strong><button>Open</button></div>`),
    real: html(`.card { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem; border: 1px solid #cbd5e1; }\n.icon { flex: 0 0 2.5rem; display: grid; place-items: center; border-radius: 50%; background: #bae6fd; }\n.copy { flex: 1; }`, `<article class="card"><div class="icon">CSS</div><div class="copy"><strong>Flex card</strong><p>Copy grows while the icon stays stable.</p></div></article>`),
    visualHint: ["Change `justify-content` or `align-items` and watch the row shift.", "غيّر `justify-content` أو `align-items` واتفرّج الصف بيتحرك إزاي."],
  },
  {
    slug: "css-grid", tier: "intermediate", readMinutes: 5, icon: "LayoutGrid", visualizer: "grid-lab",
    title: ["CSS Grid", "`CSS Grid`"],
    summary: ["Create rows and columns together for page and component layouts.", "اعمل صفوف وأعمدة مع بعض للصفحات والمكوّنات."],
    paragraphs: [
      ["Grid is two-dimensional: the container defines tracks, then children occupy cells or named areas. It is ideal when rows and columns must coordinate.", "`Grid` ثنائي الأبعاد: الـ `container` بتحدد `tracks`، وبعدها الأطفال بيشغلوا `cells` أو `areas` مسماة. ممتاز لما الصفوف والأعمدة تتنسق."],
      ["`fr` shares leftover space after fixed and intrinsic sizes are resolved. `minmax(0, 1fr)` prevents long content from forcing a track wider than expected.", "`fr` بتقسم المساحة الباقية بعد المقاسات الثابتة والداخلية. `minmax(0, 1fr)` بتمنع محتوى طويل يوسّع `track` بالغلط."],
      ["`auto-fit` with `minmax()` creates responsive card grids without guessing device-specific column counts.", "`auto-fit` مع `minmax()` بتعمل `card grids` `responsive` من غير تخمين عدد الأعمدة لكل جهاز."],
    ],
    points: [["Grid coordinates two axes", "`Grid` بتنسق محورين"], ["`fr` divides remaining space", "`fr` بتقسم المساحة الباقية"], ["`minmax` enables fluid cards", "`minmax` بتمكّن كروت سائلة"]],
    simple: html(`.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .75rem; }\n.grid > * { padding: 1rem; background: #dbeafe; }`, `<div class="grid"><div>1</div><div>2</div><div>3</div></div>`),
    real: html(`.catalog { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem; }\n.lesson { padding: 1rem; border: 1px solid #cbd5e1; border-radius: .75rem; }`, `<section class="catalog"><article class="lesson">Cascade</article><article class="lesson">Flexbox</article><article class="lesson">Grid</article></section>`),
    visualHint: ["Edit `grid-template-columns` and resize to see columns reflow.", "عدّل `grid-template-columns` وغيّر العرض واتفرّج الأعمدة بتتغيّر."],
  },
  {
    slug: "positioning", tier: "intermediate", readMinutes: 6, icon: "Move", visualizer: "positioning-lab",
    title: ["Positioning", "`Positioning`"],
    summary: ["Use `relative`, `absolute`, `fixed`, and `sticky` positioning without escaping layout by accident.", "استخدم `relative` و`absolute` و`fixed` و`sticky` من غير ما تهرب من الـ `layout` بالغلط."],
    paragraphs: [
      ["`static` is normal flow. `relative` keeps its normal space but can become the containing block for absolute descendants.", "`static` هو الـ `normal flow`. `relative` بيحتفظ بمكانه وبيقدر يبقى `containing block` لأطفال `absolute`."],
      ["`absolute` and `fixed` boxes are removed from normal flow. Use them for overlays and anchored affordances, not for ordinary page geometry.", "صناديق `absolute` و`fixed` بتخرج من `normal flow`. استخدمها للـ `overlays` والعناصر المربوطة، مش لهندسة الصفحة العادية."],
      ["`sticky` participates in flow until it reaches an inset threshold. It needs a scrolling context with enough room, and overflow ancestors can change its behavior.", "`sticky` بتشارك في `flow` لحد ما توصل `inset` معين. محتاجة `scroll context` بمساحة كفاية، و`overflow ancestors` ممكن يغيّر سلوكها."],
      ["Positioning also creates a stacking context, so `z-index` only settles fights between positioned siblings, not the whole page.", "الـ `positioning` بتعمل كمان `stacking context`، فـ `z-index` بيحسم بس بين إخوة `positioned`، مش الصفحة كلها."],
    ],
    points: [["`relative` anchors absolute children", "`relative` بتربط أطفال `absolute`"], ["`absolute` leaves normal flow", "`absolute` بتخرج من `normal flow`"], ["`sticky` needs an inset like `top`", "`sticky` محتاجة `inset` زي `top`"], ["`z-index` only compares positioned elements", "`z-index` بيقارن بس عناصر `positioned`"]],
    simple: html(`.badge-wrap { position: relative; width: 14rem; padding: 2rem; background: #e0f2fe; }\n.badge { position: absolute; top: -.5rem; right: -.5rem; padding: .25rem .5rem; background: #0284c7; color: white; border-radius: 999px; }`, `<div class="badge-wrap">Course card <span class="badge">New</span></div>`),
    real: html(`.toolbar { position: sticky; top: 0; z-index: 1; padding: .75rem; background: white; border-bottom: 1px solid #cbd5e1; }`, `<div class="toolbar">Lesson tools stay visible while you scroll.</div><p style="min-height:180px">Scroll space</p>`),
    visualHint: ["Switch `position` values and scroll to test `sticky`.", "بدّل قيم `position` واعمل scroll عشان تجرب `sticky`."],
  },
  {
    slug: "responsive-media", tier: "intermediate", readMinutes: 5, icon: "Tablet", visualizer: "responsive-lab",
    title: ["Responsive Media", "الميديا المتجاوبة"],
    summary: ["Make layouts adapt to available space, not a list of phone names.", "خلّي `layouts` تتكيف مع المساحة المتاحة، مش قائمة أسماء موبايلات."],
    paragraphs: [
      ["Start with a small, readable base layout and enhance where the content needs a new arrangement. Media queries are conditions, not device labels.", "ابدأ بـ `layout` صغيرة ومقروءة وحسّن لما المحتوى يحتاج ترتيب جديد. `Media queries` شروط، مش أسماء أجهزة."],
      ["Container-friendly components and fluid grids often reduce breakpoint count. Use a query when a component actually runs out of room.", "المكوّنات المناسبة للـ `containers` والـ `grids` السائلة غالبًا بتقلل عدد `breakpoints`. استخدم `query` لما المكوّن فعلاً يضيق."],
      ["Respect user preferences such as reduced motion. Responsive work includes input, zoom, text scaling, and comfortable tap targets.", "احترم تفضيلات المستخدم زي تقليل الحركة. الشغل `responsive` يشمل `input` و`zoom` وتكبير النص وأهداف لمس مريحة."],
    ],
    points: [["Mobile-first adds enhancements", "`Mobile-first` بتضيف تحسينات"], ["Break on content pressure", "اعمل `breakpoint` عند ضغط المحتوى"], ["Honor reduced motion", "احترم `reduced motion`"]],
    simple: html(`.nav { display: grid; gap: .5rem; }\n@media (min-width: 42rem) { .nav { grid-template-columns: repeat(3, 1fr); } }`, `<nav class="nav"><a href="#">Learn</a><a href="#">Practice</a><a href="#">Review</a></nav>`),
    real: html(`.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem; }\n@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; transition-duration: 0.01ms !important; } }`, `<section class="cards"><article>Any width</article><article>Content-led</article><article>Respectful</article></section>`),
    visualHint: ["Resize the preview and watch the layout break at the breakpoint.", "غيّر عرض المعاينة واتفرّج الـ `layout` بتتغيّر عند الـ `breakpoint`."],
  },
  {
    slug: "custom-properties", tier: "advanced", readMinutes: 5, icon: "Variable", visualizer: "variables-lab",
    title: ["Custom Properties", "`Custom Properties`"],
    summary: ["Use CSS variables as design tokens that inherit through your component tree.", "استخدم `CSS variables` كـ `design tokens` بتتورث في شجرة المكوّنات."],
    paragraphs: [
      ["Custom properties inherit and are resolved where `var()` is used. Define stable semantic names such as `--surface` and `--text` rather than naming a token after a single color.", "`Custom properties` بتتورث وبتتحل مكان استخدام `var()`. عرّف أسماء معنوية ثابتة زي `--surface` و`--text` بدل تسمية `token` بلون واحد."],
      ["A local custom property can theme one component without duplicating every declaration. Fallback values keep a component usable when a token is absent.", "`Custom property` محلية ممكن تعمل `theme` لمكوّن واحد من غير تكرار كل `declarations`. `Fallback values` بتخلي المكوّن شغال لو `token` ناقص."],
      ["Variables are not preprocessor constants: they participate in cascade and can change at runtime. That makes them useful for themes and state.", "`Variables` مش `constants` بتاعة `preprocessor`: بتشارك في `cascade` وممكن تتغير وقت التشغيل. ده بيخليها مفيدة للـ `themes` والحالات."],
    ],
    points: [["Tokens inherit", "الـ `tokens` بتتورث"], ["Name tokens by purpose", "سمّي `tokens` حسب الغرض"], ["`var()` accepts a fallback", "`var()` بتقبل `fallback`"]],
    simple: html(`:root { --accent: #0284c7; }\n.button { padding: .6rem 1rem; color: white; background: var(--accent); border: 0; border-radius: .5rem; }`, `<button class="button">Save progress</button>`),
    real: html(`.card { --accent: #7c3aed; padding: 1rem; border-inline-start: 4px solid var(--accent, #64748b); }\n.card--warning { --accent: #d97706; }`, `<article class="card">Default theme</article><article class="card card--warning">Warning theme</article>`),
    visualHint: ["Change a `--token` value and watch every linked rule update.", "غيّر قيمة `--token` واتفرّج كل القواعد المربوطة بتتحدّث."],
  },
  {
    slug: "transitions-transforms", tier: "advanced", readMinutes: 5, icon: "Sparkles", visualizer: "motion-lab",
    title: ["Transitions & Transforms", "`Transitions` و`Transforms`"],
    summary: ["Add focused, performant feedback to state changes.", "ضيف `feedback` مركز وأداؤه كويس لتغييرات الحالة."],
    paragraphs: [
      ["A transition interpolates between computed values when a property changes. Declare it on the resting state so hover, focus, and exit all animate.", "الـ `transition` بتعمل `interpolation` بين `computed values` لما `property` تتغير. عرّفها على `resting state` عشان `hover` و`focus` والخروج كلهم يتحركوا."],
      ["Transform changes visual geometry without reflowing siblings. `opacity` and `transform` are usually cheaper to animate than layout-affecting properties.", "`Transform` بتغير الشكل البصري من غير `reflow` للإخوة. `opacity` و`transform` غالبًا أرخص في التحريك من `properties` بتأثر على `layout`."],
      ["Motion should communicate cause and effect, not delay work. Provide a reduced-motion path for people who get motion sickness or need calmer UI.", "الحركة لازم توضح السبب والنتيجة، مش تأخر الشغل. وفّر مسار `reduced-motion` للي بيتعبوا من الحركة أو محتاجين `UI` أهدى."],
    ],
    points: [["Transition the resting state", "حط `transition` على `resting state`"], ["Prefer `transform` and `opacity`", "فضّل `transform` و`opacity`"], ["Keep motion purposeful", "خلّي الحركة لها هدف"]],
    simple: html(`button { padding: .7rem 1rem; transition: transform 160ms ease, background 160ms ease; }\nbutton:hover, button:focus-visible { transform: translateY(-2px); background: #bae6fd; }`, `<button>Hover or focus me</button>`),
    real: html(`.lesson { transition: box-shadow 180ms ease, transform 180ms ease; }\n.lesson:hover { transform: scale(1.02); box-shadow: 0 12px 24px #0f172a22; }\n@media (prefers-reduced-motion: reduce) { .lesson { transition: none; } }`, `<article class="lesson">Subtle, optional feedback</article>`),
    visualHint: ["Hover or focus the button and watch the `transform` kick in.", "اعمل `hover` أو `focus` على الزر واتفرّج `transform` بتشتغل."],
  },
  {
    slug: "css-animations", tier: "advanced", readMinutes: 5, icon: "Film", visualizer: "animation-lab",
    title: ["CSS Animations", "`CSS Animations`"],
    summary: ["Use keyframes for multi-step motion with a clear lifecycle.", "استخدم `keyframes` لحركة متعددة المراحل وليها `lifecycle` واضح."],
    paragraphs: [
      ["`@keyframes` names stages of an animation; `animation` applies timing, duration, iteration, direction, and fill behavior to an element.", "`@keyframes` بتسمي مراحل `animation`؛ و`animation` بتطبق `timing` و`duration` و`iteration` و`direction` و`fill behavior` على العنصر."],
      ["Animations are best for meaningful entrance, status, or progress cues. Avoid infinite decorative movement that competes with reading.", "`Animations` أحسن لإشارات دخول أو حالة أو تقدم لها معنى. تجنب الحركة الزخرفية اللانهائية اللي بتنافس القراءة."],
      ["Pause or reduce nonessential animation for `prefers-reduced-motion`. Never rely on an animation alone to convey a critical status.", "أوقف أو قلل الحركة غير الضرورية مع `prefers-reduced-motion`. متعتمدش على `animation` لوحدها لتوصيل حالة مهمة."],
    ],
    points: [["Keyframes define stages", "`Keyframes` بتحدد المراحل"], ["Animation has a lifecycle", "`Animation` ليها `lifecycle`"], ["Reduced motion is essential", "`Reduced motion` أساسية"]],
    simple: html(`@keyframes pop { 0% { transform: scale(.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }\n.badge { animation: pop 240ms ease-out both; padding: .5rem; background: #dcfce7; }`, `<span class="badge">Completed!</span>`),
    real: html(`@keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }\n.bar { height: .5rem; background: #e2e8f0; overflow: hidden; }\n.bar::before { content: ""; display:block; height:100%; background:#22c55e; transform-origin:left; animation:progress 1s ease-out both; }\n@media (prefers-reduced-motion: reduce) { .bar::before { animation: none; transform: scaleX(1); } }`, `<div class="bar" aria-label="Lesson progress: complete"></div>`),
    visualHint: ["Replay the animation and toggle `prefers-reduced-motion`.", "شغّل الـ `animation` تاني وبدّل `prefers-reduced-motion`."],
  },
  {
    slug: "logical-properties", tier: "advanced", readMinutes: 5, icon: "ArrowLeftRight", visualizer: "logical-layout-lab",
    title: ["Logical Properties & RTL", "`Logical Properties` و`RTL`"],
    summary: ["Write layout rules that follow reading direction instead of hard-coded left and right.", "اكتب `layout rules` بتتبع اتجاه القراءة بدل `left` و`right` الثابتين."],
    paragraphs: [
      ["Inline runs in the writing direction; block runs perpendicular to it. Logical properties describe those axes, so a UI can adapt to RTL and vertical writing.", "`Inline` بيمشي في اتجاه الكتابة؛ و`block` عمودي عليه. `Logical properties` بتوصف المحاور دي، فـ `UI` تقدر تتكيف مع `RTL` والكتابة العمودية."],
      ["Use `margin-inline`, `padding-block`, `inset-inline-start`, and `border-inline-start` instead of physical left/right where direction should follow language.", "استخدم `margin-inline` و`padding-block` و`inset-inline-start` و`border-inline-start` بدل `left`/`right` لما الاتجاه لازم يتبع اللغة."],
      ["Set `dir` in HTML for document direction; CSS logical properties complement it. Test mixed Arabic and English content, not just a mirrored screenshot.", "حط `dir` في `HTML` لاتجاه المستند؛ و`CSS logical properties` بتكمله. اختبر محتوى عربي وإنجليزي مخلوط، مش `screenshot` مقلوبة بس."],
    ],
    points: [["Inline follows writing direction", "`Inline` بتتبع اتجاه الكتابة"], ["Use logical spacing by default", "استخدم `logical spacing` افتراضيًا"], ["HTML `dir` sets document direction", "`HTML dir` بتحدد اتجاه المستند"]],
    simple: html(`.note { padding-inline: 1rem; padding-block: .75rem; border-inline-start: 4px solid #0ea5e9; background: #f0f9ff; }`, `<p class="note">This border starts at reading start.</p>`),
    real: html(`.card { margin-inline: auto; padding: 1rem; max-inline-size: 36rem; border-start-start-radius: 1rem; border-end-end-radius: 1rem; background: #f8fafc; }`, `<article class="card" dir="rtl"><h2>درس CSS</h2><p>المسافات تتبع الاتجاه تلقائيًا.</p></article>`),
    visualHint: ["Switch `dir` between `ltr` and `rtl` and watch spacing flip.", "بدّل `dir` بين `ltr` و`rtl` واتفرّج المسافات بتتقلب."],
  },
];

export const modernLessons: LessonDraft[] = specs.map(lesson);
