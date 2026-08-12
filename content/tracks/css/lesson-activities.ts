import { assertLessonActivityCoverage } from "@/content/tracks/_assemble-lessons";
import { L } from "@/content/helpers";
import type { LessonActivity, ActivityOption, ActivityQuestion } from "@/lib/types";

function opt(id: string, en: string, ar: string): ActivityOption {
  return { id, label: L(en, ar) };
}

function q(
  id: string,
  prompt: ReturnType<typeof L>,
  options: ActivityOption[],
  correctId: string,
  explanation: ReturnType<typeof L>,
  extra?: Partial<Pick<ActivityQuestion, "code" | "language" | "hint">>,
): ActivityQuestion {
  return {
    id,
    prompt,
    options,
    correctId,
    explanation,
    ...extra,
  };
}

/** Multi-question lesson activities keyed by lesson slug — every lesson gets its own 4 questions. */
export const cssLessonActivities: Record<string, LessonActivity> = {
  "cascade-specificity": {
    title: L("The cascade & specificity check", "نشاط الـ `cascade` و`specificity`"),
    questions: [
      q(
        "q1",
        L("What order does the cascade resolve competing declarations in?", "الـ `cascade` بتحل تعارض الـ `declarations` بأنهي ترتيب؟"),
        [
          opt("a", "Origin, then importance, then specificity, then source order", "المصدر، وبعدين `importance`، وبعدين `specificity`، وبعدين ترتيب المصدر"),
          opt("b", "Source order only — last rule always wins", "ترتيب المصدر بس — آخر قاعدة دايمًا تكسب"),
          opt("c", "Specificity only — selector weight decides everything", "الـ `specificity` بس — وزن الـ `selector` بيحسم كل حاجة"),
          opt("d", "Alphabetical order of selector names", "الترتيب الأبجدي لأسماء الـ `selectors`"),
        ],
        "a",
        L("The cascade checks origin, then `!important`, then specificity, and only falls back to source order when earlier steps tie.", "الـ `cascade` بتفحص المصدر، وبعدين `!important`، وبعدين `specificity`، ومش بترجع لترتيب المصدر إلا لو اتعادلوا قبل كده."),
        { hint: L("Add two rules to the same element and see which color wins.", "ضيف قاعدتين لنفس العنصر واتفرّج أنهي لون بيكسب.") },
      ),
      q(
        "q2",
        L("Which selector has higher specificity: an ID or a class?", "أنهي `selector` `specificity` أعلى: الـ `ID` ولا الـ `class`؟"),
        [
          opt("a", "An ID always beats a class", "الـ `ID` دايمًا يكسب الـ `class`"),
          opt("b", "A class always beats an ID", "الـ `class` دايمًا تكسب الـ `ID`"),
          opt("c", "They are always equal", "بيتساووا دايمًا"),
          opt("d", "It depends on which one is written last", "بيعتمد على أنهي واحد مكتوب الأخير"),
        ],
        "a",
        L("IDs outweigh classes in specificity, and classes outweigh plain element selectors — regardless of source order.", "الـ `IDs` بتغلب الـ `classes` في الـ `specificity`، والـ `classes` بتغلب أسماء العناصر العادية — بغض النظر عن ترتيب المصدر."),
        { code: `#hero { color: teal; }\n.hero { color: coral; }`, language: "css", hint: L("Compare the two rules by selector type, not by which line comes second.", "قارن القاعدتين بنوع الـ `selector`، مش بأنهي سطر جاي تاني.") },
      ),
      q(
        "q3",
        L("Why should you keep selectors shallow with component classes?", "ليه لازم تخلي الـ `selectors` بسيطة باستخدام `component classes`؟"),
        [
          opt("a", "It keeps overrides intentional instead of an `!important` arms race", "بتخلي الـ `overrides` مقصودة بدل حرب `!important`"),
          opt("b", "Deep selectors always render faster", "الـ `selectors` العميقة دايمًا بترندر أسرع"),
          opt("c", "Browsers reject selectors nested more than two levels", "المتصفحات بترفض `selectors` متداخلة أكتر من مستويين"),
          opt("d", "Classes cannot be combined with pseudo-classes", "الـ `classes` مينفعش تتجمع مع `pseudo-classes`"),
        ],
        "a",
        L("Low-specificity component classes make future overrides predictable, so you don't need to escalate with more IDs or `!important`.", "`component classes` قليلة الـ `specificity` بتخلي الـ `overrides` الجاية متوقعة، فمش هتحتاج تصعّد بـ `IDs` أكتر أو `!important`."),
        { hint: L("Think about what happens when a later developer needs to override your rule.", "فكّر إيه اللي بيحصل لما مبرمج تاني يحتاج يعمل `override` لقاعدتك.") },
      ),
      q(
        "q4",
        L("A `.card` rule and a `.card--featured` rule both set `border-color` on the same element. Which one wins, and why?", "قاعدة `.card` وقاعدة `.card--featured` كلاهما بيحددوا `border-color` على نفس العنصر. أنهي وحدة تكسب وليه؟"),
        [
          opt("a", "`.card--featured` — same specificity, so the later source order wins", "`.card--featured` — نفس الـ `specificity`، فترتيب المصدر المتأخر بيكسب"),
          opt("b", "`.card` — the shorter class name always wins", "`.card` — اسم الـ `class` الأقصر دايمًا يكسب"),
          opt("c", "Neither applies because two classes cannot target one element", "ولا واحدة بتتطبق لأن اتنين `class` مينفعش يستهدفوا عنصر واحد"),
          opt("d", "Both apply and the browser averages the colors", "الاتنين بيتطبقوا والمتصفح بيعمل متوسط للألوان"),
        ],
        "a",
        L("Both are single-class selectors with equal specificity, so the tie is broken by source order — whichever is declared later wins.", "الاتنين `selectors` بـ `class` واحد ونفس الـ `specificity`، فالتعادل بينحل بترتيب المصدر — اللي معلن بعدين يكسب."),
        { code: `.card { border-color: #94a3b8; }\n.card--featured { border-color: #0ea5e9; }`, language: "css", hint: L("Count the classes in each selector before deciding who wins.", "احسب عدد الـ `classes` في كل `selector` قبل ما تقرر مين يكسب.") },
      ),
    ],
  },

  "box-model": {
    title: L("The box model check", "نشاط `box model`"),
    questions: [
      q(
        "q1",
        L("What four parts make up the CSS box model, from inside out?", "إيه هي الأربع أجزاء اللي بتكوّن `box model` من جوه لبره؟"),
        [
          opt("a", "Content, padding, border, margin", "`Content`، `padding`، `border`، `margin`"),
          opt("b", "Content, margin, border, padding", "`Content`، `margin`، `border`، `padding`"),
          opt("c", "Border, padding, content, margin", "`Border`، `padding`، `content`، `margin`"),
          opt("d", "Margin, content, padding, border", "`Margin`، `content`، `padding`، `border`"),
        ],
        "a",
        L("Every box is content, wrapped by padding, then a border, then margin as the outermost space.", "كل صندوق هو `content`، ملفوف بـ `padding`، وبعدين `border`، وبعدين `margin` كأبعد مساحة."),
        { hint: L("Inspect the box-model diagram in DevTools first.", "افحص رسم الـ `box model` في `DevTools` الأول.") },
      ),
      q(
        "q2",
        L("With `box-sizing: content-box`, what does a declared `width: 220px` include?", "مع `box-sizing: content-box`، الـ `width: 220px` المعلن بيشمل إيه؟"),
        [
          opt("a", "Only the content — padding and border add extra width", "الـ `content` بس — الـ `padding` والـ `border` بيزودوا عرض إضافي"),
          opt("b", "Content, padding, and border together", "الـ `content` والـ `padding` والـ `border` مع بعض"),
          opt("c", "Content and margin only", "الـ `content` والـ `margin` بس"),
          opt("d", "Nothing — `content-box` ignores width entirely", "مفيش حاجة — `content-box` بتتجاهل الـ `width` خالص"),
        ],
        "a",
        L("`content-box` (the default) excludes padding and border from the declared width, so the rendered box grows past 220px.", "`content-box` (الافتراضي) بتستبعد الـ `padding` والـ `border` من الـ `width` المعلن، فالصندوق النهائي بيكبر عن 220px."),
        { code: `.panel { box-sizing: content-box; width: 220px; padding: 24px; border: 4px solid; }`, language: "css", hint: L("Switch `box-sizing` and watch whether the total rendered width changes.", "بدّل `box-sizing` واتفرّج العرض الكلي بيتغيّر ولا لأ.") },
      ),
      q(
        "q3",
        L("Why does `border-box` make component sizing more predictable?", "ليه `border-box` بتخلي مقاسات المكوّن أكتر توقّع؟"),
        [
          opt("a", "It includes padding and border inside the declared width", "بتضم الـ `padding` والـ `border` جوه الـ `width` المعلن"),
          opt("b", "It removes margin from the layout entirely", "بتشيل الـ `margin` من الـ `layout` خالص"),
          opt("c", "It forces every element to be the same size", "بتجبر كل عنصر يبقى نفس المقاس"),
          opt("d", "It disables borders visually while keeping their space", "بتخفي الحدود بصريًا وتسيب مساحتها"),
        ],
        "a",
        L("Because padding and border are counted inside the declared width, adding them never changes the element's final size.", "بما إن الـ `padding` والـ `border` متحسوبين جوه الـ `width` المعلن، إضافتهم عمرها ما بتغيّر المقاس النهائي للعنصر."),
        { hint: L("Try the same rule at a narrow and wide preview size.", "جرّب نفس القاعدة بعرض ضيق وواسع.") },
      ),
      q(
        "q4",
        L("Why can vertical margins between two stacked paragraphs collapse into a single gap?", "ليه الـ `margins` العمودية بين فقرتين مرصوصتين ممكن تندمج في مسافة واحدة؟"),
        [
          opt("a", "Adjacent margins in normal flow can collapse into the larger of the two", "الـ `margins` المتجاورة في `normal flow` ممكن تندمج في أكبر واحدة فيهم"),
          opt("b", "Margins only apply to the first element on a page", "الـ `margin` بتتطبق بس على أول عنصر في الصفحة"),
          opt("c", "`margin` is always ignored on `<p>` elements", "الـ `margin` دايمًا بتتجاهل على عناصر `<p>`"),
          opt("d", "Padding always overrides margin between siblings", "الـ `padding` دايمًا بتلغي الـ `margin` بين الإخوة"),
        ],
        "a",
        L("Vertical margins between normal-flow block siblings can collapse; using `gap` in flex/grid avoids that surprise entirely.", "الـ `margins` العمودية بين إخوة `block` في `normal flow` ممكن تندمج؛ استخدام `gap` في `flex`/`grid` بيتجنب المفاجأة دي خالص."),
        { hint: L("Compare a plain stack of paragraphs to a flex column using `gap`.", "قارن ترصيص فقرات عادي مع عمود `flex` باستخدام `gap`.") },
      ),
    ],
  },

  "units-sizing": {
    title: L("Units & responsive sizing check", "نشاط الوحدات والمقاسات المتجاوبة"),
    questions: [
      q(
        "q1",
        L("What does `rem` scale relative to?", "الـ `rem` بتتقاس بالنسبة لإيه؟"),
        [
          opt("a", "The root element's font size", "حجم خط عنصر الـ `root`"),
          opt("b", "The parent element's font size", "حجم خط العنصر الأب"),
          opt("c", "The viewport width", "عرض الـ `viewport`"),
          opt("d", "A fixed 16px regardless of settings", "16px ثابتة بغض النظر عن الإعدادات"),
        ],
        "b",
        L("Trick option: `rem` follows the root (`<html>`) font size, not the parent — that's what makes it a reliable default for spacing and text.", "خيار مخادع: `rem` بتتبع خط الـ `root` (`<html>`)، مش الأب — وده اللي بيخليها اختيار موثوق للمسافات والنص."),
        { hint: L("Compare `rem` spacing at two different root font sizes.", "قارن مسافات `rem` بحجمين مختلفين لخط الـ `root`.") },
      ),
      q(
        "q2",
        L("Why is `vw` alone risky for body text size?", "ليه `vw` لوحدها خطر لحجم نص الجسم؟"),
        [
          opt("a", "It scales purely with viewport width and has no built-in min/max", "بتتقاس بعرض الـ `viewport` بس ومفيهاش حد أدنى أو أقصى مدمج"),
          opt("b", "`vw` units are not supported in any modern browser", "وحدات `vw` مش مدعومة في أي متصفح حديث"),
          opt("c", "`vw` only works inside `<table>` elements", "`vw` بتشتغل بس جوه عناصر `<table>`"),
          opt("d", "`vw` cannot be combined with other units", "`vw` مينفعش تتجمع مع وحدات تانية"),
        ],
        "a",
        L("Pure `vw` text can become unreadably tiny or huge at extreme widths since it has no floor or ceiling — `clamp()` fixes that.", "نص بـ `vw` بس ممكن يبقى صغير جدًا أو ضخم عند العروض المتطرفة لأنه من غير حد أدنى أو أقصى — `clamp()` بتحل المشكلة."),
        { code: `h1 { font-size: 7vw; }`, language: "css", hint: L("Resize the preview and watch a pure `vw` heading at very narrow and very wide widths.", "غيّر العرض واتفرّج عنوان بـ `vw` بس عند عرض ضيق جدًا وواسع جدًا.") },
      ),
      q(
        "q3",
        L("What does `clamp(2rem, 7vw, 4.5rem)` express?", "إيه اللي بتعبّر عنه `clamp(2rem, 7vw, 4.5rem)`؟"),
        [
          opt("a", "A minimum of `2rem`, a fluid preferred value of `7vw`, and a maximum of `4.5rem`", "حد أدنى `2rem`، وقيمة سائلة مفضّلة `7vw`، وحد أقصى `4.5rem`"),
          opt("b", "Three separate font sizes applied at three breakpoints", "ثلاث مقاسات خط منفصلة بتتطبق عند ثلاث `breakpoints`"),
          opt("c", "A random value chosen between the three each time the page loads", "قيمة عشوائية من التلاتة كل ما الصفحة تتحمّل"),
          opt("d", "The average of the three values", "متوسط القيم التلاتة"),
        ],
        "a",
        L("`clamp(min, preferred, max)` lets a value scale fluidly with the viewport while never going below the min or above the max.", "`clamp(min, preferred, max)` بتخلي القيمة تتغير بمرونة مع الـ `viewport` من غير ما تنزل تحت الحد الأدنى أو تعدي الحد الأقصى."),
        { hint: L("Resize the preview and watch a `clamp()` heading scale between its bounds.", "غيّر العرض واتفرّج عنوان `clamp()` بيكبر بين حدوده.") },
      ),
      q(
        "q4",
        L("Why combine `min()`/`max-width` with fluid units instead of using one fixed size?", "ليه تجمع `min()`/`max-width` مع وحدات سائلة بدل مقاس ثابت واحد؟"),
        [
          opt("a", "To express a safe range instead of forcing one width on every screen", "عشان تعبّر عن مدى آمن بدل ما تفرض عرض واحد على كل الشاشات"),
          opt("b", "Because percentages stop working without `max-width`", "لأن النسب المئوية بتوقف عن الشغل من غير `max-width`"),
          opt("c", "Fixed sizes are deprecated and no longer valid CSS", "المقاسات الثابتة `deprecated` ومش `CSS` صالحة"),
          opt("d", "`min()` requires a matching `max()` to parse", "`min()` محتاجة `max()` مقابلة عشان تتقرا"),
        ],
        "a",
        L("Percentages and viewport units resolve fluidly but need a `max-width` or `min()` ceiling so content never grows uncomfortably wide.", "النسب المئوية و`viewport units` بتتحسب بمرونة لكن محتاجة سقف `max-width` أو `min()` عشان المحتوى ميكبرش لدرجة غير مريحة."),
        { code: `.wrap { width: min(92%, 70rem); }`, language: "css", hint: L("Check computed `width` at a narrow and a very wide viewport.", "افحص الـ `width` المحسوب عند `viewport` ضيق وواسع جدًا.") },
      ),
    ],
  },

  "colors-typography": {
    title: L("Color & typography check", "نشاط الألوان والـ `typography`"),
    questions: [
      q(
        "q1",
        L("Which of these is NOT a valid way to write a CSS color?", "أنهي واحدة من دول مش طريقة صحيحة لكتابة لون في `CSS`؟"),
        [
          opt("a", "`hsl(200, 80%, 45%)`", "`hsl(200, 80%, 45%)`"),
          opt("b", "`rgb(14, 165, 233)`", "`rgb(14, 165, 233)`"),
          opt("c", "`#0ea5e9`", "`#0ea5e9`"),
          opt("d", "`color(45deg, sky)`", "`color(45deg, sky)`"),
        ],
        "d",
        L("`hex`, `rgb()`, and `hsl()` are all valid color syntaxes; `color(45deg, sky)` is not a real CSS function.", "`hex` و`rgb()` و`hsl()` كلهم صيغ ألوان صحيحة؛ `color(45deg, sky)` مش `function` حقيقية في `CSS`."),
        { hint: L("Think about which functions actually exist in CSS color syntax.", "فكّر في أنهي `functions` فعلاً موجودة في صياغة لون `CSS`.") },
      ),
      q(
        "q2",
        L("What does `line-height` primarily control?", "الـ `line-height` بتتحكم أساسًا في إيه؟"),
        [
          opt("a", "The vertical rhythm and spacing between lines of text", "الإيقاع العمودي والمسافة بين سطور النص"),
          opt("b", "The horizontal letter spacing within a word", "المسافة الأفقية بين حروف الكلمة"),
          opt("c", "The color contrast of the text", "تباين لون النص"),
          opt("d", "The maximum line length in characters", "أقصى طول للسطر بالحروف"),
        ],
        "a",
        L("`line-height` sets the reading rhythm between lines — too tight feels cramped, too loose loses connection between lines.", "الـ `line-height` بتحدد إيقاع القراءة بين السطور — ضيق قوي بيحس بالزحمة، وواسع قوي بيفصل بين السطور."),
        { hint: L("Change `line-height` and read the paragraph aloud.", "غيّر `line-height` واقرأ الفقرة بصوت عالي.") },
      ),
      q(
        "q3",
        L("Why should a design use semantic color tokens instead of naming a variable after a raw color?", "ليه التصميم لازم يستخدم `color tokens` معنوية بدل تسمية متغيّر بلون خام؟"),
        [
          opt("a", "So the same meaning (like an error state) always uses the same value, even if the value later changes", "عشان نفس المعنى (زي حالة الخطأ) دايمًا يستخدم نفس القيمة، حتى لو القيمة اتغيرت بعدين"),
          opt("b", "Because raw color names like `red` are invalid in CSS", "لأن أسماء الألوان الخام زي `red` مش صالحة في `CSS`"),
          opt("c", "Semantic names make the CSS file smaller in bytes", "الأسماء المعنوية بتخلي ملف الـ `CSS` أصغر بالبايت"),
          opt("d", "Browsers only cache semantically named variables", "المتصفحات بتعمل `cache` بس للمتغيرات المسماة معنويًا"),
        ],
        "a",
        L("A token like `--danger` can change its actual color while every place that means \"danger\" updates automatically.", "`token` زي `--danger` ممكن يغيّر لونه الفعلي وكل مكان معناه \"خطر\" بيتحدث لوحده."),
        { hint: L("Think about renaming a color everywhere it's used versus updating one token.", "فكّر في إعادة تسمية لون في كل مكان مستخدم فيه مقابل تحديث `token` واحد.") },
      ),
      q(
        "q4",
        L("Why is contrast a usability requirement, not just a style preference?", "ليه التباين مطلب قابلية استخدام، مش بس تفضيل شكلي؟"),
        [
          opt("a", "Low-contrast text can be unreadable outdoors or for low-vision readers", "النص ضعيف التباين ممكن يبقى مش مقروء في الشمس أو لضعاف البصر"),
          opt("b", "Contrast only matters for `<h1>` headings", "التباين مهم بس لعناوين `<h1>`"),
          opt("c", "High contrast is required only in print stylesheets", "التباين العالي مطلوب بس في `stylesheets` الطباعة"),
          opt("d", "Contrast affects load time but not readability", "التباين بيأثر على وقت التحميل مش على وضوح القراءة"),
        ],
        "a",
        L("A beautiful low-contrast palette can still make an interface unusable in bright sunlight or for readers with limited vision.", "`palette` جميلة ضعيفة التباين ممكن برضو تخلي الواجهة غير قابلة للاستخدام في شمس قوية أو لقراء ذوي رؤية محدودة."),
        { hint: L("Test the same text on light and dark backgrounds.", "جرّب نفس النص على خلفية فاتحة وغامقة.") },
      ),
    ],
  },

  "display-flow": {
    title: L("Display & normal flow check", "نشاط `display` والـ `normal flow`"),
    questions: [
      q(
        "q1",
        L("By default, how do block-level elements arrange themselves?", "افتراضيًا، عناصر `block` بترتب نفسها إزاي؟"),
        [
          opt("a", "They stack vertically and stretch across the available inline space", "بترصّ عموديًا وبتتمدد على مساحة الـ `inline` المتاحة"),
          opt("b", "They flow side by side like inline elements", "بتمشي جنب بعض زي عناصر الـ `inline`"),
          opt("c", "They overlap each other by default", "بتتراكب فوق بعض افتراضيًا"),
          opt("d", "They collapse to zero height until styled", "بتنكمش لارتفاع صفر لحد ما تتنسّق"),
        ],
        "a",
        L("Block boxes stack top to bottom and stretch to fill the available inline space in normal flow.", "صناديق الـ `block` بترصّ من فوق لتحت وبتتمدد لتملأ مساحة الـ `inline` المتاحة في الـ `normal flow`."),
        { hint: L("Toggle `display` on a tag and watch how it sits in the page.", "بدّل `display` على `tag` واتفرّج مكانه في الصفحة.") },
      ),
      q(
        "q2",
        L("If you set `display: block` on a `<span>`, what happens to its HTML meaning?", "لو حطيت `display: block` على `<span>`، إيه اللي بيحصل لمعناه في الـ `HTML`؟"),
        [
          opt("a", "Nothing — it stays a `<span>` semantically, only its layout participation changes", "مفيش حاجة — بيفضل `<span>` من ناحية المعنى، بس مشاركته في الـ `layout` بتتغير"),
          opt("b", "It becomes a `<div>` element internally", "بيبقى عنصر `<div>` من جوه"),
          opt("c", "It loses its ability to hold text content", "بيفقد قدرته إنه يحتوي على نص"),
          opt("d", "The browser throws a parsing error", "المتصفح بيرمي خطأ `parsing`"),
        ],
        "a",
        L("`display` only changes how a box participates in layout, not the element's semantic meaning — it's still the same HTML tag.", "الـ `display` بتغيّر بس مشاركة الصندوق في الـ `layout`، مش معنى العنصر — بيفضل نفس الـ `tag`."),
        { code: `span { display: block; }`, language: "css", hint: L("Inspect the element's tag name in DevTools after changing `display`.", "افحص اسم الـ `tag` في `DevTools` بعد ما تغيّر الـ `display`.") },
      ),
      q(
        "q3",
        L("What is the key difference between inline and block boxes in normal flow?", "إيه الفرق الأساسي بين صناديق `inline` و`block` في الـ `normal flow`؟"),
        [
          opt("a", "Inline content flows within lines and ignores `width` and vertical `margin` in familiar ways", "محتوى `inline` بيمشي جوه السطور وبيتجاهل `width` و`margin` العمودي بشكل معروف"),
          opt("b", "Inline elements always ignore `color` and `font-size`", "عناصر `inline` دايمًا بتتجاهل `color` و`font-size`"),
          opt("c", "Block elements cannot contain inline elements", "عناصر `block` مينفعش تحتوي على عناصر `inline`"),
          opt("d", "Inline elements always start on a new line", "عناصر `inline` دايمًا بتبدأ في سطر جديد"),
        ],
        "a",
        L("Inline boxes flow inside text lines and don't respect `width` or vertical `margin` the way block boxes do.", "صناديق الـ `inline` بتمشي جوه سطور النص ومبتحترمش `width` أو `margin` العمودي زي صناديق الـ `block`."),
        { hint: L("Try setting `width` on an inline element and see if it has any effect.", "جرّب تحط `width` على عنصر `inline` وشوف بيأثر ولا لأ.") },
      ),
      q(
        "q4",
        L("When should you reach for `flex` or `grid` instead of relying on normal flow?", "إمتى المفروض تلجأ لـ `flex` أو `grid` بدل ما تعتمد على `normal flow`؟"),
        [
          opt("a", "When you need to coordinate items along one axis (`flex`) or two axes (`grid`)", "لما تحتاج تنسق عناصر على محور واحد (`flex`) أو محورين (`grid`)"),
          opt("b", "Always — normal flow should never be used for document content", "دايمًا — الـ `normal flow` مايستخدمش خالص لمحتوى المستند"),
          opt("c", "Only when the page has fewer than three elements", "بس لما الصفحة يكون فيها أقل من ثلاث عناصر"),
          opt("d", "Only for printing stylesheets", "بس لـ `stylesheets` الطباعة"),
        ],
        "a",
        L("Use flow for document content, `flex` for one-axis alignment, and `grid` for two-axis layouts — that reduces magic offsets and fragile layouts.", "استخدم `flow` لمحتوى المستند، و`flex` لمحور واحد، و`grid` لمحورين — ده بيقلل الـ `offsets` السحرية والـ `layouts` الهشة."),
        { hint: L("Think about whether you need to align items on one axis or coordinate rows and columns together.", "فكّر لو محتاج تحاذي على محور واحد ولا تنسق صفوف وأعمدة مع بعض.") },
      ),
    ],
  },

  "backgrounds-borders": {
    title: L("Backgrounds & borders check", "نشاط الخلفيات والحدود"),
    questions: [
      q(
        "q1",
        L("What does `background-color` paint by default?", "الـ `background-color` بترسم فين افتراضيًا؟"),
        [
          opt("a", "Behind the content and the padding", "ورا الـ `content` والـ `padding`"),
          opt("b", "Only behind the content, never the padding", "ورا الـ `content` بس، مش الـ `padding` أبدًا"),
          opt("c", "Behind the margin as well", "ورا الـ `margin` كمان"),
          opt("d", "Only visible on `:hover`", "بتظهر بس عند `:hover`"),
        ],
        "a",
        L("By default a background paints the content area and the padding, but not the margin, which stays transparent.", "افتراضيًا الخلفية بترسم منطقة الـ `content` والـ `padding`، لكن مش الـ `margin` اللي بيفضل شفاف."),
        { hint: L("Add padding to an element with a background color and see where the color extends.", "ضيف `padding` لعنصر بلون خلفية وشوف اللون بيوصل لفين.") },
      ),
      q(
        "q2",
        L("Why use `outline` instead of `border` for a focus indicator?", "ليه تستخدم `outline` بدل `border` كمؤشر `focus`؟"),
        [
          opt("a", "`outline` doesn't take up box-model space, so it won't shift nearby layout", "الـ `outline` مبتاخدش مساحة في الـ `box model`، فمش بتزق الـ `layout` اللي جنبها"),
          opt("b", "`border` cannot be styled with a color", "الـ `border` مينفعش تتنسق بلون"),
          opt("c", "`outline` is only visible in print", "الـ `outline` بتبان بس في الطباعة"),
          opt("d", "`border` disables keyboard focus entirely", "الـ `border` بتلغي الـ `focus` بالكيبورد خالص"),
        ],
        "a",
        L("`outline` sits outside the box model and doesn't consume layout space, so adding it won't move sibling elements.", "الـ `outline` بتقعد بره الـ `box model` ومبتاخدش مساحة `layout`، فإضافتها مش بتحرك العناصر جنبها."),
        { code: `.hero:focus-within { outline: 3px solid #facc15; outline-offset: 4px; }`, language: "css", hint: L("Add an `outline` and see if nearby layout shifts.", "ضيف `outline` واتفرّج الـ `layout` جنبها بيتحرك ولا لأ.") },
      ),
      q(
        "q3",
        L("Does a visible `border` affect an element's rendered size?", "الـ `border` الظاهر بيأثر على مقاس العنصر النهائي؟"),
        [
          opt("a", "Yes — border width is part of the box model and adds to the total size (unless offset by `border-box`)", "أيوه — عرض الـ `border` جزء من الـ `box model` وبيزود المقاس الكلي (إلا لو اتعوّض بـ `border-box`)"),
          opt("b", "No — borders are always purely decorative and never affect size", "لأ — الحدود دايمًا زخرفية بس ومش بتأثر على المقاس"),
          opt("c", "Only `border-radius` affects size, not `border-width`", "بس `border-radius` بتأثر على المقاس، مش `border-width`"),
          opt("d", "Borders only affect size on `<img>` elements", "الحدود بتأثر على المقاس بس في عناصر `<img>`"),
        ],
        "a",
        L("Border width is counted in the box model, so it adds to the element's footprint unless `border-box` sizing absorbs it.", "عرض الـ `border` متحسوب في الـ `box model`، فبيزود مساحة العنصر إلا لو `border-box` استوعبته."),
        { hint: L("Compare border width in the box-model diagram first.", "قارن عرض الـ `border` في رسم الـ `box model` الأول.") },
      ),
      q(
        "q4",
        L("What should `border-radius` be used for, according to the lesson?", "الـ `border-radius` المفروض تُستخدم لإيه، حسب الدرس؟"),
        [
          opt("a", "To support the component's shape, without hiding its structure or interactive states", "عشان تدعم شكل المكوّن، من غير ما تخفي هيكله أو حالاته التفاعلية"),
          opt("b", "To completely hide focus and hover states for a cleaner look", "عشان تخفي حالات الـ `focus` والـ `hover` خالص لمظهر أنضف"),
          opt("c", "To replace the need for a background color", "عشان تستغني بيها عن لون الخلفية"),
          opt("d", "It only works on `<button>` elements", "بتشتغل بس على عناصر `<button>`"),
        ],
        "a",
        L("Rounding a shape should support the component, but interactive states like focus and hover must remain visible even on subtle surfaces.", "تدوير الشكل المفروض يدعم المكوّن، لكن الحالات التفاعلية زي الـ `focus` والـ `hover` لازم تفضل ظاهرة حتى على `surfaces` هادية."),
        { hint: L("Change `border-radius` and check the shape at two sizes.", "غيّر `border-radius` وشوف الشكل بمقاسين.") },
      ),
    ],
  },

  "flexbox-basics": {
    title: L("Flexbox basics check", "نشاط أساسيات `Flexbox`"),
    questions: [
      q(
        "q1",
        L("What does `justify-content` control?", "الـ `justify-content` بتتحكم في إيه؟"),
        [
          opt("a", "Distribution of free space along the main axis", "توزيع المساحة الحرة على الـ `main axis`"),
          opt("b", "Alignment of items on the cross axis", "محاذاة العناصر على الـ `cross axis`"),
          opt("c", "The order in which flex items appear in the DOM", "ترتيب ظهور عناصر الـ `flex` في الـ `DOM`"),
          opt("d", "Whether items wrap onto a new line", "لو العناصر بتلف لسطر جديد"),
        ],
        "a",
        L("`justify-content` distributes free space along the main axis, while `align-items` handles the cross axis.", "الـ `justify-content` بتوزع المساحة الحرة على الـ `main axis`، بينما `align-items` بتتعامل مع الـ `cross axis`."),
        { hint: L("Change `justify-content` and watch items spread or bunch up.", "غيّر `justify-content` واتفرّج العناصر بتتوزع إزاي.") },
      ),
      q(
        "q2",
        L("Is Flexbox one-dimensional or two-dimensional?", "الـ `Flexbox` أحادية البعد ولا ثنائية؟"),
        [
          opt("a", "One-dimensional — it aligns items along a single main axis", "أحادية البعد — بتحاذي العناصر على محور رئيسي واحد"),
          opt("b", "Two-dimensional — it coordinates rows and columns together like Grid", "ثنائية البعد — بتنسق الصفوف والأعمدة مع بعض زي الـ `Grid`"),
          opt("c", "Zero-dimensional — it only affects color", "بدون أبعاد — بتأثر على اللون بس"),
          opt("d", "Three-dimensional, including z-index stacking", "ثلاثية الأبعاد، وتشمل ترتيب الـ `z-index`"),
        ],
        "a",
        L("Flexbox aligns and distributes items along one axis at a time; for two-axis coordination, use Grid instead.", "الـ `Flexbox` بتحاذي وتوزع العناصر على محور واحد في المرة؛ للتنسيق الثنائي المحاور استخدم الـ `Grid`."),
        { hint: L("Resize the row and see if items wrap or shrink along one direction.", "صغّر الصف وشوف العناصر بتلف ولا بتصغر في اتجاه واحد.") },
      ),
      q(
        "q3",
        L("What's the advantage of `gap` over margins on flex children?", "إيه ميزة `gap` عن الـ `margins` على أبناء الـ `flex`؟"),
        [
          opt("a", "`gap` spaces items without adding margin to individual children", "الـ `gap` بتبعد العناصر من غير ما تضيف `margin` لكل طفل لوحده"),
          opt("b", "`gap` only works with `display: block`", "الـ `gap` بتشتغل بس مع `display: block`"),
          opt("c", "`gap` removes the need for `justify-content`", "الـ `gap` بتلغي الحاجة لـ `justify-content`"),
          opt("d", "`gap` is identical to `padding` on the container", "الـ `gap` زي الـ `padding` على الـ `container` بالظبط"),
        ],
        "a",
        L("`gap` creates space between flex/grid children directly, avoiding the need to manage individual child margins.", "الـ `gap` بتعمل مسافة بين أبناء الـ `flex`/`grid` مباشرة، من غير ما تحتاج تدير `margin` كل طفل لوحده."),
        { code: `.row { display: flex; gap: 1rem; }`, language: "css", hint: L("Compare a row using `gap` with one relying on child margins.", "قارن صف بيستخدم `gap` بواحد معتمد على `margins` الأطفال.") },
      ),
      q(
        "q4",
        L("In a card with `flex: 0 0 2.5rem` on an icon and `flex: 1` on the copy, what happens when the card gets wider?", "في كارت فيه `flex: 0 0 2.5rem` على الأيقونة و`flex: 1` على النص، إيه اللي بيحصل لما الكارت يكبر؟"),
        [
          opt("a", "The icon stays a fixed 2.5rem while the copy area grows to fill remaining space", "الأيقونة بتفضل ثابتة 2.5rem بينما مساحة النص بتكبر عشان تملأ الباقي"),
          opt("b", "Both the icon and the copy grow proportionally", "الأيقونة والنص كلاهما بيكبروا بنفس النسبة"),
          opt("c", "The icon grows to fill the extra space instead", "الأيقونة هي اللي بتكبر عشان تملأ المساحة الزيادة"),
          opt("d", "The layout breaks because `flex: 0 0` is invalid", "الـ `layout` بيتكسر لأن `flex: 0 0` مش صحيحة"),
        ],
        "a",
        L("`flex: 0 0 2.5rem` means don't grow, don't shrink, basis 2.5rem — so only the `flex: 1` copy area absorbs the extra space.", "`flex: 0 0 2.5rem` معناها متكبرش، متصغرش، ابدأ بـ 2.5rem — فمساحة النص اللي عليها `flex: 1` هي اللي بتاخد المساحة الزيادة."),
        { code: `.icon { flex: 0 0 2.5rem; }\n.copy { flex: 1; }`, language: "css", hint: L("Resize the card and watch which part changes width.", "غيّر عرض الكارت واتفرّج أنهي جزء بيتغيّر عرضه.") },
      ),
    ],
  },

  "css-grid": {
    title: L("CSS Grid check", "نشاط `CSS Grid`"),
    questions: [
      q(
        "q1",
        L("What makes Grid different from Flexbox?", "إيه اللي بيخلي الـ `Grid` مختلفة عن الـ `Flexbox`؟"),
        [
          opt("a", "Grid is two-dimensional — it coordinates rows and columns together", "الـ `Grid` ثنائية الأبعاد — بتنسق الصفوف والأعمدة مع بعض"),
          opt("b", "Grid can only create a single row of items", "الـ `Grid` تقدر تعمل بس صف واحد من العناصر"),
          opt("c", "Grid does not support the `gap` property", "الـ `Grid` مش بتدعم خاصية الـ `gap`"),
          opt("d", "Grid items cannot span more than one cell", "عناصر الـ `Grid` مينفعش تمتد لأكتر من `cell`"),
        ],
        "a",
        L("Grid defines tracks in two dimensions so children can occupy cells or named areas across rows and columns at once.", "الـ `Grid` بتحدد `tracks` في بعدين عشان الأطفال يقدروا يشغلوا `cells` أو `areas` مسماة عبر الصفوف والأعمدة مع بعض."),
        { hint: L("Edit `grid-template-columns` and resize to see columns reflow.", "عدّل `grid-template-columns` وغيّر العرض واتفرّج الأعمدة.") },
      ),
      q(
        "q2",
        L("What does the `fr` unit represent in a grid track?", "الوحدة `fr` بتمثل إيه في `track` الـ `grid`؟"),
        [
          opt("a", "A share of the leftover space after fixed and intrinsic sizes are resolved", "حصة من المساحة الباقية بعد ما تتحسب المقاسات الثابتة والداخلية"),
          opt("b", "A fixed number of pixels, like `1fr = 1px`", "عدد ثابت من البيكسلات، زي `1fr = 1px`"),
          opt("c", "A percentage of the viewport height", "نسبة مئوية من ارتفاع الـ `viewport`"),
          opt("d", "The number of rows in the grid", "عدد الصفوف في الـ `grid`"),
        ],
        "a",
        L("`fr` divides whatever space remains after fixed-size and content-sized tracks are accounted for.", "`fr` بتقسم أي مساحة باقية بعد ما تتحسب الـ `tracks` ذات المقاس الثابت والمحتوى."),
        { code: `.grid { grid-template-columns: 200px 1fr 1fr; }`, language: "css", hint: L("Add a fixed-width column next to `1fr` columns and see how the remaining space splits.", "ضيف عمود بعرض ثابت جنب أعمدة `1fr` وشوف المساحة الباقية بتتقسم إزاي.") },
      ),
      q(
        "q3",
        L("Why does `minmax(0, 1fr)` help prevent a track from growing wider than expected?", "ليه `minmax(0, 1fr)` بتساعد تمنع `track` من إنه يكبر أكتر من المتوقع؟"),
        [
          opt("a", "It sets a minimum of `0`, so long unbreakable content can't force the track wider than its fair share", "بتحط حد أدنى `0`، فمحتوى طويل غير قابل للكسر مايقدرش يوسّع الـ `track` أكتر من حصته"),
          opt("b", "It disables the `fr` unit entirely", "بتلغي وحدة الـ `fr` خالص"),
          opt("c", "It forces the track to always be exactly 0px wide", "بتجبر الـ `track` يبقى بالظبط 0px عرض دايمًا"),
          opt("d", "It only affects row height, not column width", "بتأثر بس على ارتفاع الصف، مش عرض العمود"),
        ],
        "a",
        L("Without `minmax(0, 1fr)`, the implicit minimum size of content (like a long unbroken word) can force a track wider than intended.", "من غير `minmax(0, 1fr)`، الحد الأدنى الضمني لمقاس المحتوى (زي كلمة طويلة مش قابلة للكسر) ممكن يوسّع `track` أكتر من المقصود."),
        { hint: L("Inspect track sizes in the grid overlay first.", "افحص مقاسات الـ `tracks` في الـ overlay بتاع الـ `grid` الأول.") },
      ),
      q(
        "q4",
        L("What does `grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))` create?", "إيه اللي بتعمله `grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))`؟"),
        [
          opt("a", "A responsive card grid that fits as many 14rem+ columns as the width allows", "`grid` كروت `responsive` بتحط أكبر عدد ممكن من الأعمدة بعرض 14rem أو أكتر حسب المساحة"),
          opt("b", "Exactly 14 columns regardless of screen width", "بالظبط 14 عمود بغض النظر عن عرض الشاشة"),
          opt("c", "A grid that only works at one specific breakpoint", "`grid` بتشتغل بس عند `breakpoint` واحد محدد"),
          opt("d", "A single column that never wraps", "عمود واحد بس ومبيلفش أبدًا"),
        ],
        "a",
        L("`auto-fit` with `minmax()` creates responsive card grids without guessing device-specific column counts.", "الـ `auto-fit` مع `minmax()` بتعمل `grids` كروت `responsive` من غير تخمين عدد الأعمدة لكل جهاز."),
        { code: `.catalog { grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); }`, language: "css", hint: L("Try `auto-fit` with `minmax()` at narrow and wide widths.", "جرّب `auto-fit` مع `minmax()` بعرض ضيق وواسع.") },
      ),
    ],
  },

  "positioning": {
    title: L("Positioning check", "نشاط الـ `Positioning`"),
    questions: [
      q(
        "q1",
        L("What does `position: relative` do when no offset is applied?", "إيه اللي بتعمله `position: relative` من غير ما تحط أي `offset`؟"),
        [
          opt("a", "It keeps the element in its normal-flow spot but lets it become a positioning anchor for absolute descendants", "بتخلي العنصر في مكانه الطبيعي في الـ `flow` لكن تخليه `anchor` لأطفاله الـ `absolute`"),
          opt("b", "It removes the element from the page entirely", "بتشيل العنصر من الصفحة خالص"),
          opt("c", "It always moves the element to the top-left corner", "دايمًا بتنقل العنصر لزاوية أعلى الشمال"),
          opt("d", "It behaves exactly like `position: fixed`", "بتتصرف بالظبط زي `position: fixed`"),
        ],
        "a",
        L("`relative` keeps normal-flow space but becomes the containing block for any `absolute` descendants.", "الـ `relative` بتحتفظ بمكانها في الـ `normal flow` لكن بتبقى الـ `containing block` لأي أطفال `absolute`."),
        { hint: L("Switch `position` on the parent and watch where the badge lands.", "بدّل `position` على الأب واتفرّج الـ `badge` بيروح فين.") },
      ),
      q(
        "q2",
        L("What happens to an `absolute` or `fixed` element regarding normal flow?", "إيه اللي بيحصل لعنصر `absolute` أو `fixed` بالنسبة للـ `normal flow`؟"),
        [
          opt("a", "It is removed from normal flow and positioned relative to its containing block", "بيتشال من الـ `normal flow` وبيتحدد مكانه بالنسبة للـ `containing block` بتاعه"),
          opt("b", "It stays in normal flow just like a `static` element", "بيفضل في الـ `normal flow` زي عنصر `static` بالظبط"),
          opt("c", "It pushes all siblings into a new row", "بيدفع كل الإخوة لصف جديد"),
          opt("d", "It can only be used inside `<table>` elements", "مينفعش يتستخدم إلا جوه عناصر `<table>`"),
        ],
        "a",
        L("`absolute` and `fixed` boxes leave normal flow, so surrounding elements act as if they weren't there — best for overlays, not ordinary layout.", "صناديق `absolute` و`fixed` بتخرج من الـ `normal flow`، فالعناصر حواليها بتتصرف كأنها مش موجودة — أنسب للـ `overlays`، مش لهندسة الصفحة العادية."),
        { hint: L("Toggle `position: absolute` on an element and see if the space it used to occupy collapses.", "بدّل `position: absolute` على عنصر وشوف المساحة اللي كان شاغلها بتتقفل ولا لأ.") },
      ),
      q(
        "q3",
        L("What does a `sticky` element need to actually stick?", "عنصر الـ `sticky` محتاج إيه عشان يلزق فعلاً؟"),
        [
          opt("a", "An inset like `top`, plus a scrolling context with enough room", "`inset` زي `top`، وكمان `scroll context` بمساحة كفاية"),
          opt("b", "A `z-index` of at least 9999", "`z-index` على الأقل 9999"),
          opt("c", "`display: flex` on the sticky element itself", "`display: flex` على عنصر الـ `sticky` نفسه"),
          opt("d", "Nothing — `sticky` works identically to `fixed` with no extra setup", "مفيش حاجة — `sticky` بتشتغل زي `fixed` بالظبط من غير إعداد إضافي"),
        ],
        "a",
        L("`sticky` needs an inset threshold like `top: 0` and a scrolling ancestor with enough room; overflow ancestors can also change its behavior.", "الـ `sticky` محتاجة حد `inset` زي `top: 0` و`ancestor` بيعمل `scroll` بمساحة كفاية؛ و`overflow ancestors` كمان ممكن تغيّر سلوكها."),
        { code: `.toolbar { position: sticky; top: 0; }`, language: "css", hint: L("Scroll the page to test whether `sticky` sticks.", "اعمل scroll وشوف `sticky` بيلزق ولا لأ.") },
      ),
      q(
        "q4",
        L("Why does positioning create a stacking context, and what does that mean for `z-index`?", "ليه الـ `positioning` بتعمل `stacking context`، وده يعني إيه بالنسبة للـ `z-index`؟"),
        [
          opt("a", "`z-index` only resolves conflicts between positioned siblings within the same stacking context, not the whole page", "الـ `z-index` بتحسم بس التعارضات بين إخوة `positioned` جوه نفس الـ `stacking context`، مش الصفحة كلها"),
          opt("b", "`z-index` works globally across the entire document regardless of ancestors", "الـ `z-index` بتشتغل عالميًا في المستند كله بغض النظر عن الأسلاف"),
          opt("c", "Stacking contexts only apply to `<img>` elements", "الـ `stacking contexts` بتتطبق بس على عناصر `<img>`"),
          opt("d", "`z-index` has no effect unless `display: grid` is also set", "الـ `z-index` مالهاش تأثير إلا لو `display: grid` متحطة كمان"),
        ],
        "a",
        L("A positioned element creates a stacking context, so `z-index` fights are settled between positioned elements inside the same context — not globally.", "العنصر الـ `positioned` بيعمل `stacking context`، فمعارك الـ `z-index` بتتحسم بين عناصر `positioned` جوه نفس الـ `context` — مش عالميًا."),
        { hint: L("Check computed `position` and offset values first.", "افحص `position` المحسوبة وقيم الـ `offset` الأول.") },
      ),
    ],
  },

  "responsive-media": {
    title: L("Responsive media check", "نشاط الميديا المتجاوبة"),
    questions: [
      q(
        "q1",
        L("What should trigger a media query breakpoint?", "إيه اللي المفروض يشغّل `breakpoint` في `media query`؟"),
        [
          opt("a", "The content actually running out of room, not a specific phone model", "المحتوى فعلاً بيضيق، مش موديل موبايل معين"),
          opt("b", "A fixed list of every known device width", "قائمة ثابتة بكل عرض جهاز معروف"),
          opt("c", "The user's browser brand", "نوع متصفح المستخدم"),
          opt("d", "The number of lessons completed so far", "عدد الدروس المكتملة لحد كده"),
        ],
        "a",
        L("Media queries are conditions about available space, not device labels — break when the layout or content actually needs it.", "الـ `media queries` شروط عن المساحة المتاحة، مش أسماء أجهزة — اعمل `breakpoint` لما الـ `layout` أو المحتوى فعلاً محتاج."),
        { hint: L("Resize the preview slowly and note when the layout breaks.", "صغّر العرض ببطء ولاحظ إمتى الـ `layout` بيتكسر.") },
      ),
      q(
        "q2",
        L("What is the recommended starting point for building a responsive layout?", "إيه نقطة البداية الموصى بيها لبناء `layout` `responsive`؟"),
        [
          opt("a", "A small, readable base layout, enhanced as content needs a new arrangement", "`layout` أساسية صغيرة ومقروءة، وبعدين تتحسن لما المحتوى يحتاج ترتيب جديد"),
          opt("b", "The widest desktop layout first, then shrink it down", "أوسع `layout` لسطح المكتب الأول، وبعدين تصغّرها"),
          opt("c", "A fixed-pixel layout that never changes", "`layout` بمقاس بكسل ثابت مبيتغيرش أبدًا"),
          opt("d", "A layout with no media queries at all", "`layout` من غير أي `media queries` خالص"),
        ],
        "a",
        L("Mobile-first means starting small and adding enhancements — not designing wide first and cutting things down.", "الـ `Mobile-first` معناه إنك تبدأ صغير وتضيف تحسينات — مش تصمم واسع الأول وتقص حاجات."),
        { code: `.nav { display: grid; gap: .5rem; }\n@media (min-width: 42rem) { .nav { grid-template-columns: repeat(3, 1fr); } }`, language: "css", hint: L("Look at which rule is the default and which is inside the media query.", "شوف أنهي قاعدة هي الافتراضية وأنهي واحدة جوه الـ `media query`.") },
      ),
      q(
        "q3",
        L("Why can container-friendly components and fluid grids reduce the number of breakpoints needed?", "ليه المكوّنات المناسبة للـ `containers` والـ `grids` السائلة ممكن تقلل عدد الـ `breakpoints` المطلوبة؟"),
        [
          opt("a", "They adapt continuously to available space instead of jumping only at fixed widths", "بتتكيف باستمرار مع المساحة المتاحة بدل ما تقفز بس عند عروض ثابتة"),
          opt("b", "They disable media queries entirely by default", "بتلغي الـ `media queries` خالص افتراضيًا"),
          opt("c", "They only work on desktop screens", "بتشتغل بس على شاشات سطح المكتب"),
          opt("d", "They require JavaScript to detect screen size", "بتحتاج `JavaScript` عشان تكتشف مقاس الشاشة"),
        ],
        "a",
        L("Fluid grids like `auto-fit`/`minmax()` respond continuously, so you only add a media query when a component truly runs out of room.", "الـ `grids` السائلة زي `auto-fit`/`minmax()` بتستجيب باستمرار، فمابتضيفش `media query` إلا لما مكوّن فعلاً يضيق."),
        { hint: L("Try `auto-fit` with `minmax()` and see how far it adapts before a query is even needed.", "جرّب `auto-fit` مع `minmax()` وشوف بيتكيف لحد فين قبل ما تحتاج `query`.") },
      ),
      q(
        "q4",
        L("Why should `prefers-reduced-motion` be part of responsive work?", "ليه `prefers-reduced-motion` المفروض تكون جزء من الشغل الـ `responsive`؟"),
        [
          opt("a", "Responsive design includes respecting user preferences, not just screen width", "التصميم الـ `responsive` بيشمل احترام تفضيلات المستخدم، مش بس عرض الشاشة"),
          opt("b", "It is only relevant to print stylesheets", "مالهاش علاقة إلا بـ `stylesheets` الطباعة"),
          opt("c", "It disables all CSS on the page", "بتلغي كل الـ `CSS` في الصفحة"),
          opt("d", "It only affects `<video>` elements", "بتأثر بس على عناصر `<video>`"),
        ],
        "a",
        L("Responsive work covers input, zoom, text scaling, and preferences like reduced motion — not only viewport width.", "الشغل الـ `responsive` بيغطي الـ `input` والـ `zoom` وتكبير النص وتفضيلات زي تقليل الحركة — مش بس عرض الـ `viewport`."),
        { code: `@media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms !important; } }`, language: "css", hint: L("Toggle reduced motion and see if animations still run.", "فعّل `reduced motion` وشوف الـ `animations` لسه شغالة.") },
      ),
    ],
  },

  "custom-properties": {
    title: L("Custom properties check", "نشاط الـ `Custom Properties`"),
    questions: [
      q(
        "q1",
        L("Do custom properties inherit through the DOM?", "الـ `custom properties` بتتورث في الـ `DOM`؟"),
        [
          opt("a", "Yes — they inherit and are resolved where `var()` is used", "أيوه — بتتورث وبتتحل مكان استخدام `var()`"),
          opt("b", "No — every element must redeclare the property", "لأ — كل عنصر لازم يعيد تعريف الخاصية"),
          opt("c", "Only inside `<table>` elements", "بس جوه عناصر `<table>`"),
          opt("d", "Only if declared with `!important`", "بس لو اتعرفت بـ `!important`"),
        ],
        "a",
        L("Custom properties inherit like other inherited CSS properties and get resolved wherever `var()` reads them.", "الـ `custom properties` بتتورث زي خصائص `CSS` الموروثة التانية وبتتحل في أي مكان `var()` بتقراها فيه."),
        { hint: L("Change a `--token` value on a parent and watch descendants that use it update.", "غيّر قيمة `--token` على الأب واتفرّج العناصر اللي جواه بتتحدث.") },
      ),
      q(
        "q2",
        L("What is a better custom-property naming approach: `--sky-500` or `--accent`?", "أنهي تسمية `custom property` أفضل: `--sky-500` ولا `--accent`؟"),
        [
          opt("a", "`--accent` — semantic names describe purpose and survive a color change", "`--accent` — الأسماء المعنوية بتوصف الغرض وبتفضل صحيحة حتى لو اللون اتغيّر"),
          opt("b", "`--sky-500` — literal color names are always preferred", "`--sky-500` — أسماء الألوان الحرفية دايمًا أفضل"),
          opt("c", "Both are functionally identical in every case", "الاتنين متطابقين وظيفيًا في كل الحالات"),
          opt("d", "Neither is valid custom-property syntax", "ولا واحدة فيهم صياغة `custom property` صحيحة"),
        ],
        "a",
        L("Semantic names like `--accent` or `--surface` describe purpose, so the token stays meaningful even if the underlying color later changes.", "الأسماء المعنوية زي `--accent` أو `--surface` بتوصف الغرض، فالـ `token` بيفضل له معنى حتى لو اللون اللي وراه اتغيّر بعدين."),
        { hint: L("Imagine rebranding the accent color — which name would need to change?", "تخيل إنك بتغيّر لون التمييز — أنهي اسم هيحتاج يتغيّر؟") },
      ),
      q(
        "q3",
        L("What does the fallback in `var(--accent, #64748b)` do?", "إيه اللي بتعمله الـ `fallback` في `var(--accent, #64748b)`؟"),
        [
          opt("a", "Provides `#64748b` if `--accent` is not defined, keeping the component usable", "بتوفر `#64748b` لو `--accent` مش متعرفة، وده بيخلي المكوّن شغال"),
          opt("b", "Always overrides `--accent` even when it is defined", "دايمًا بتلغي `--accent` حتى لو متعرفة"),
          opt("c", "Only works with numeric values, not colors", "بتشتغل بس مع قيم رقمية، مش ألوان"),
          opt("d", "Requires a matching `@fallback` at-rule", "محتاجة `@fallback` `at-rule` مطابقة"),
        ],
        "a",
        L("The second argument to `var()` is a fallback used only when the custom property is missing or invalid.", "الـ `argument` التاني في `var()` هو `fallback` بيتستخدم بس لو الـ `custom property` ناقصة أو غير صالحة."),
        { code: `.card { border-inline-start: 4px solid var(--accent, #64748b); }`, language: "css", hint: L("Remove the `--accent` declaration and see if the fallback value appears.", "شيل تعريف `--accent` وشوف قيمة الـ `fallback` بتظهر ولا لأ.") },
      ),
      q(
        "q4",
        L("Why are custom properties NOT the same as preprocessor (e.g. Sass) variables?", "ليه الـ `custom properties` مش زي متغيرات الـ `preprocessor` (زي `Sass`)؟"),
        [
          opt("a", "They participate in the cascade and can change at runtime, unlike compile-time constants", "بتشارك في الـ `cascade` وممكن تتغير وقت التشغيل، بعكس الـ `constants` وقت الـ `compile`"),
          opt("b", "They can only hold numeric values", "مينفعش تحمل غير قيم رقمية"),
          opt("c", "They are removed from the final CSS after build", "بتتشال من الـ `CSS` النهائي بعد الـ `build`"),
          opt("d", "They cannot be scoped to a single component", "مينفعش تتحدد لمكوّن واحد بس"),
        ],
        "a",
        L("Custom properties are live and cascade-aware, so a component can override a token locally and even change it at runtime for theming or state.", "الـ `custom properties` حية وواعية بالـ `cascade`، فالمكوّن يقدر يعمل `override` لـ `token` محليًا وحتى يغيّره وقت التشغيل للـ `theme` أو الحالة."),
        { code: `.card--warning { --accent: #d97706; }`, language: "css", hint: L("Change a `--token` and watch linked rules update live in the browser.", "غيّر `--token` واتفرّج القواعد المربوطة بتتحدّث لحظيًا في المتصفح.") },
      ),
    ],
  },

  "transitions-transforms": {
    title: L("Transitions & transforms check", "نشاط الـ `Transitions` و`Transforms`"),
    questions: [
      q(
        "q1",
        L("Where should you declare a `transition` for it to animate hover, focus, and exit states?", "فين المفروض تعرّف الـ `transition` عشان تحرّك حالات الـ `hover` والـ `focus` والخروج؟"),
        [
          opt("a", "On the resting (default) state of the element", "على الحالة المستقرة (الافتراضية) للعنصر"),
          opt("b", "Only inside the `:hover` selector", "بس جوه الـ `selector` بتاع `:hover`"),
          opt("c", "Only inside the `:focus` selector", "بس جوه الـ `selector` بتاع `:focus`"),
          opt("d", "Inside `@keyframes` exclusively", "بس جوه `@keyframes`"),
        ],
        "a",
        L("Declaring `transition` on the resting state means every state change — hover, focus, exit — interpolates smoothly.", "تعريف الـ `transition` على الحالة المستقرة معناه إن أي تغيير حالة — `hover`، `focus`، الخروج — بيتحرك بسلاسة."),
        { code: `button { transition: transform 160ms ease; }\nbutton:hover { transform: translateY(-2px); }`, language: "css", hint: L("Hover or focus the button and watch the motion.", "اعمل `hover` أو `focus` على الزر واتفرّج الحركة.") },
      ),
      q(
        "q2",
        L("Why are `transform` and `opacity` usually cheaper to animate than layout-affecting properties like `width`?", "ليه `transform` و`opacity` غالبًا أرخص في التحريك من خصائص بتأثر على الـ `layout` زي `width`؟"),
        [
          opt("a", "They change visual geometry without triggering a reflow of sibling elements", "بتغيّر الشكل البصري من غير ما تسبب `reflow` للعناصر المجاورة"),
          opt("b", "They are the only properties that support `ease` timing", "هما الخصائص الوحيدة اللي بتدعم `ease` timing"),
          opt("c", "`width` cannot be animated at all in CSS", "الـ `width` مينفعش تتحرك خالص في `CSS`"),
          opt("d", "`transform` disables all other CSS properties during animation", "الـ `transform` بتلغي كل خصائص الـ `CSS` التانية وقت الحركة"),
        ],
        "a",
        L("Animating `width` can force the browser to recompute layout for siblings; `transform`/`opacity` skip that reflow step.", "تحريك الـ `width` ممكن يجبر المتصفح يعيد حساب الـ `layout` للإخوة؛ `transform`/`opacity` بيتخطوا خطوة الـ `reflow` دي."),
        { hint: L("Compare animating `width` versus `transform: scale()` on the same element.", "قارن تحريك `width` مع `transform: scale()` على نفس العنصر.") },
      ),
      q(
        "q3",
        L("What should motion communicate, according to the lesson?", "الحركة المفروض توصّل إيه، حسب الدرس؟"),
        [
          opt("a", "Cause and effect — not delay useful work", "السبب والنتيجة — من غير ما تأخر شغل مفيد"),
          opt("b", "Nothing — motion is purely decorative and has no purpose", "مفيش حاجة — الحركة زخرفية بس ومالهاش هدف"),
          opt("c", "It should always run for at least 3 seconds to be noticed", "لازم تفضل شغالة 3 ثواني على الأقل عشان تتلاحظ"),
          opt("d", "It should replace all text-based feedback", "المفروض تستبدل كل `feedback` نصي"),
        ],
        "a",
        L("Motion should communicate cause and effect clearly, not slow down the user's task.", "الحركة المفروض توضح السبب والنتيجة بوضوح، مش تبطّئ مهمة المستخدم."),
        { hint: L("Think about what a hover animation is telling the user versus just decorating the button.", "فكّر إيه اللي `hover animation` بتقوله للمستخدم مقابل إنها زخرفة بس.") },
      ),
      q(
        "q4",
        L("Why should you provide a `prefers-reduced-motion` path?", "ليه لازم توفر مسار لـ `prefers-reduced-motion`؟"),
        [
          opt("a", "Some people get motion sickness or need a calmer UI", "بعض الناس بيتعبوا من الحركة أو محتاجين `UI` أهدى"),
          opt("b", "It is required only for `<video>` tags", "مطلوبة بس لـ `tags` الـ `<video>`"),
          opt("c", "It makes animations run faster automatically", "بتخلي الـ `animations` تشتغل أسرع تلقائيًا"),
          opt("d", "It has no real effect in modern browsers", "مالهاش تأثير حقيقي في المتصفحات الحديثة"),
        ],
        "a",
        L("Reduced-motion support respects people who get motion sickness or simply prefer a calmer, less animated interface.", "دعم تقليل الحركة بيحترم الناس اللي بيتعبوا من الحركة أو ببساطة بيفضلوا `UI` أهدى وأقل حركة."),
        { code: `@media (prefers-reduced-motion: reduce) { .lesson { transition: none; } }`, language: "css", hint: L("Enable reduced motion and confirm the effect turns off.", "فعّل `reduced motion` وتأكد التأثير بيتقفل.") },
      ),
    ],
  },

  "css-animations": {
    title: L("CSS animations check", "نشاط الـ `CSS Animations`"),
    questions: [
      q(
        "q1",
        L("What does `@keyframes` do?", "إيه اللي بتعمله `@keyframes`؟"),
        [
          opt("a", "Names the stages of an animation", "بتسمي مراحل الـ `animation`"),
          opt("b", "Applies duration and iteration count to an element", "بتطبق الـ `duration` وعدد التكرار على عنصر"),
          opt("c", "Transitions a single property change on hover", "بتحرّك تغيير خاصية واحدة عند الـ `hover`"),
          opt("d", "Defines a custom property token", "بتعرّف `token` لـ `custom property`"),
        ],
        "a",
        L("`@keyframes` names the stages of an animation; the `animation` property then applies timing, duration, and behavior to an element.", "الـ `@keyframes` بتسمي مراحل الـ `animation`؛ وخاصية `animation` بعد كده بتطبق الـ `timing` والـ `duration` والسلوك على العنصر."),
        { code: `@keyframes pop { 0% { transform: scale(.8); } 100% { transform: scale(1); } }`, language: "css", hint: L("Replay the animation and watch each named stage.", "شغّل الـ `animation` تاني واتفرّج كل مرحلة مسماة.") },
      ),
      q(
        "q2",
        L("What kind of animation does the lesson recommend?", "أنهي نوع `animation` الدرس بينصح بيه؟"),
        [
          opt("a", "Meaningful entrance, status, or progress cues", "إشارات دخول أو حالة أو تقدم لها معنى"),
          opt("b", "Infinite decorative movement that competes with reading", "حركة زخرفية لا نهائية بتنافس القراءة"),
          opt("c", "Animation on every single element on the page", "`animation` على كل عنصر في الصفحة"),
          opt("d", "Animations that never stop, regardless of user settings", "حركات ماتوقفش أبدًا بغض النظر عن إعدادات المستخدم"),
        ],
        "a",
        L("Animations work best for meaningful entrance, status, or progress cues — not endless decorative motion.", "الـ `Animations` بتنفع أكتر لإشارات دخول أو حالة أو تقدم لها معنى — مش حركة زخرفية لا نهائية."),
        { hint: L("Think about what the progress-bar animation communicates versus a purely decorative loop.", "فكّر إيه اللي `animation` شريط التقدم بتوصله مقابل حركة زخرفية لا نهائية.") },
      ),
      q(
        "q3",
        L("Should you rely on animation alone to convey a critical status?", "المفروض تعتمد على الـ `animation` لوحدها عشان توصّل حالة مهمة؟"),
        [
          opt("a", "No — never rely on animation alone for critical status", "لأ — متعتمدش على الـ `animation` لوحدها لحالة مهمة"),
          opt("b", "Yes — animation is always sufficient on its own", "أيوه — الـ `animation` دايمًا كافية لوحدها"),
          opt("c", "Only on mobile devices", "بس على أجهزة الموبايل"),
          opt("d", "Only if `prefers-reduced-motion` is disabled by the OS", "بس لو `prefers-reduced-motion` متقفلة من نظام التشغيل"),
        ],
        "a",
        L("A critical status should have a non-animated fallback (text, icon, color) since motion may be reduced or missed.", "الحالة المهمة لازم يكون ليها بديل غير متحرك (نص أو أيقونة أو لون) لأن الحركة ممكن تتقلل أو حد يفوّتها."),
        { hint: L("Toggle reduced motion and see if the animation stops while the status is still communicated.", "بدّل `reduced motion` وشوف الـ `animation` بتقف والحالة لسه واضحة ولا لأ.") },
      ),
      q(
        "q4",
        L("What does `animation: pop 240ms ease-out both;` control together?", "الـ `animation: pop 240ms ease-out both;` بتتحكم في إيه مع بعض؟"),
        [
          opt("a", "The keyframe name, duration, timing function, and fill mode all in one shorthand", "اسم الـ `keyframe` والـ `duration` والـ `timing function` والـ `fill mode` كلهم في `shorthand` واحد"),
          opt("b", "Only the color of the element", "بس لون العنصر"),
          opt("c", "Only whether the animation loops infinitely", "بس لو الـ `animation` بتلف لا نهائي"),
          opt("d", "The element's `z-index` stacking order", "ترتيب الـ `z-index` بتاع العنصر"),
        ],
        "a",
        L("The `animation` shorthand bundles the keyframe name, duration, easing, and fill behavior (`both` keeps start/end styles applied).", "الـ `shorthand` بتاع `animation` بيجمع اسم الـ `keyframe` والـ `duration` والـ `easing` وسلوك الـ `fill` (`both` بتخلي أنماط البداية والنهاية مطبقة)."),
        { code: `.badge { animation: pop 240ms ease-out both; }`, language: "css", hint: L("Inspect animation name and duration in Computed.", "افحص اسم الـ `animation` والـ `duration` في الـ `Computed`.") },
      ),
    ],
  },

  "logical-properties": {
    title: L("Logical properties & RTL check", "نشاط الـ `Logical Properties` و`RTL`"),
    questions: [
      q(
        "q1",
        L("What does the `inline` axis follow?", "محور الـ `inline` بيتبع إيه؟"),
        [
          opt("a", "The writing direction (e.g. left-to-right in English, right-to-left in Arabic)", "اتجاه الكتابة (يعني من الشمال لليمين في الإنجليزي، ومن اليمين للشمال في العربي)"),
          opt("b", "Always the physical left-to-right direction, regardless of language", "دايمًا الاتجاه الفيزيائي من الشمال لليمين، بغض النظر عن اللغة"),
          opt("c", "The vertical top-to-bottom direction only", "الاتجاه العمودي من فوق لتحت بس"),
          opt("d", "The order elements appear in the DOM, never the language", "ترتيب ظهور العناصر في الـ `DOM`، مش اللغة أبدًا"),
        ],
        "a",
        L("Inline runs in the writing direction, so it flips between `ltr` and `rtl` languages; block runs perpendicular to it.", "الـ `inline` بيمشي في اتجاه الكتابة، فبيتقلب بين لغات `ltr` و`rtl`؛ والـ `block` عمودي عليه."),
        { hint: L("Switch `dir` between `ltr` and `rtl` and watch spacing flip.", "بدّل `dir` بين `ltr` و`rtl` واتفرّج المسافات بتتقلب.") },
      ),
      q(
        "q2",
        L("Why does the lesson prefer `margin-inline-start` over `margin-left`?", "ليه الدرس بيفضّل `margin-inline-start` عن `margin-left`؟"),
        [
          opt("a", "It automatically follows reading direction instead of a fixed physical side", "بتتبع اتجاه القراءة تلقائيًا بدل جانب فيزيائي ثابت"),
          opt("b", "`margin-left` is deprecated and no longer works", "الـ `margin-left` `deprecated` ومبقاش شغال"),
          opt("c", "`margin-inline-start` only works with `display: grid`", "الـ `margin-inline-start` بتشتغل بس مع `display: grid`"),
          opt("d", "They are exactly the same in every layout", "هما نفس الحاجة بالظبط في أي `layout`"),
        ],
        "a",
        L("`margin-left` is always the physical left, but `margin-inline-start` follows the writing direction — correct in both LTR and RTL.", "الـ `margin-left` دايمًا الشمال الفيزيائي، لكن `margin-inline-start` بتتبع اتجاه الكتابة — صح في `LTR` و`RTL` الاتنين."),
        { code: `.note { border-inline-start: 4px solid #0ea5e9; }`, language: "css", hint: L("Compare `margin-inline-start` with physical `margin-left` under `dir=\"rtl\"`.", "قارن `margin-inline-start` مع `margin-left` العادي تحت `dir=\"rtl\"`.") },
      ),
      q(
        "q3",
        L("What sets the document's overall writing direction?", "إيه اللي بيحدد اتجاه الكتابة العام للمستند؟"),
        [
          opt("a", "The HTML `dir` attribute, which logical CSS properties then respect", "خاصية `dir` في الـ `HTML`، واللي خصائص الـ `CSS` المنطقية بعد كده بتحترمها"),
          opt("b", "A CSS-only property with no HTML involvement", "خاصية `CSS` بس من غير أي تدخل من الـ `HTML`"),
          opt("c", "The browser's installed language pack", "حزمة اللغة المثبتة في المتصفح"),
          opt("d", "The `lang` attribute alone, without `dir`", "خاصية الـ `lang` بس، من غير `dir`"),
        ],
        "a",
        L("`dir` on the HTML document sets direction; CSS logical properties complement it by adapting spacing and alignment automatically.", "الـ `dir` على مستند الـ `HTML` بتحدد الاتجاه؛ وخصائص الـ `CSS` المنطقية بتكمّلها بتكييف المسافات والمحاذاة تلقائيًا."),
        { hint: L("Check `dir` on the element and its parent in DevTools.", "افحص `dir` على العنصر والأب في `DevTools`.") },
      ),
      q(
        "q4",
        L("Why should you test mixed Arabic and English content instead of just a mirrored screenshot?", "ليه لازم تختبر محتوى عربي وإنجليزي مخلوط بدل `screenshot` مقلوبة بس؟"),
        [
          opt("a", "A mirrored screenshot doesn't reveal real bugs in bidirectional text and logical spacing", "الـ `screenshot` المقلوبة مبتكشفش أخطاء حقيقية في النص ثنائي الاتجاه والمسافات المنطقية"),
          opt("b", "Screenshots cannot be taken in RTL mode at all", "مينفعش تاخد `screenshot` في وضع `RTL` خالص"),
          opt("c", "Arabic text renders identically to English in every browser", "النص العربي بيترندر بنفس شكل الإنجليزي في كل متصفح"),
          opt("d", "Testing mixed content is only needed for print stylesheets", "اختبار المحتوى المخلوط مطلوب بس لـ `stylesheets` الطباعة"),
        ],
        "a",
        L("Real bidirectional content (mixed languages, numbers, punctuation) exposes logical-property and spacing bugs that a simple mirror flip won't show.", "المحتوى الحقيقي ثنائي الاتجاه (لغات مخلوطة، أرقام، علامات ترقيم) بيكشف أخطاء في الخصائص المنطقية والمسافات مش هتظهر بمجرد قلب `screenshot`."),
        { hint: L("Try a card with Arabic heading and English body text together.", "جرّب كارت بعنوان عربي ونص إنجليزي مع بعض.") },
      ),
    ],
  },

  "css-common-pitfalls": {
    title: L("CSS pitfalls check", "نشاط أخطاء `CSS` الشائعة"),
    questions: [
      q(
        "q1",
        L("A `.card` has `width: 300px; padding: 24px; border: 4px solid;` with no `box-sizing` set. Why does it render wider than 300px?", "كارت `.card` عنده `width: 300px; padding: 24px; border: 4px solid;` من غير `box-sizing` محدد. ليه بيترندر أوسع من 300px؟"),
        [
          opt("a", "The default `content-box` excludes padding and border from the declared width", "الـ `content-box` الافتراضية بتستبعد الـ `padding` والـ `border` من الـ `width` المعلن"),
          opt("b", "`padding` always overrides `width` regardless of `box-sizing`", "الـ `padding` دايمًا بتلغي الـ `width` بغض النظر عن `box-sizing`"),
          opt("c", "`border: 4px solid` is invalid without a color and is ignored", "`border: 4px solid` مش صالحة من غير لون وبتتجاهل"),
          opt("d", "The browser rounds all widths up to the nearest 50px", "المتصفح بيقرّب كل العروض لأقرب 50px"),
        ],
        "a",
        L("Without `border-box`, `content-box` is the default, so padding and border add on top of the declared 300px width.", "من غير `border-box`، الـ `content-box` هي الافتراضية، فالـ `padding` والـ `border` بيتضافوا فوق الـ `300px` المعلنة."),
        { code: `.card { width: 300px; padding: 24px; border: 4px solid; }`, language: "css", hint: L("Add `box-sizing: border-box` and compare the rendered width.", "ضيف `box-sizing: border-box` وقارن العرض النهائي.") },
      ),
      q(
        "q2",
        L("A `.badge` has `position: absolute; top: 0; right: 0;` but its parent `.card` has no `position` set. What happens?", "`.badge` عندها `position: absolute; top: 0; right: 0;` لكن الأب `.card` من غير `position` محددة. إيه اللي بيحصل؟"),
        [
          opt("a", "The badge anchors to the nearest positioned ancestor or the page itself, not `.card`", "الـ `badge` بتتربط بأقرب `ancestor` `positioned` أو بالصفحة نفسها، مش بـ `.card`"),
          opt("b", "The badge is hidden until `.card` gets a `z-index`", "الـ `badge` بتفضل مخفية لحد ما `.card` تاخد `z-index`"),
          opt("c", "`position: absolute` is ignored without a `width` on the badge", "الـ `position: absolute` بتتجاهل من غير `width` على الـ `badge`"),
          opt("d", "The badge stays in normal flow next to the card's text", "الـ `badge` بتفضل في الـ `normal flow` جنب نص الكارت"),
        ],
        "a",
        L("An absolute element needs a positioned ancestor to anchor to; without one, it looks for the next positioned ancestor up to the page.", "العنصر الـ `absolute` محتاج `ancestor` `positioned` يترّبط بيه؛ من غيره، بيدور على أقرب `ancestor` `positioned` لحد الصفحة."),
        { code: `.badge { position: absolute; top: 0; right: 0; }`, language: "css", hint: L("Add `position: relative` to `.card` and see if the badge anchors correctly.", "ضيف `position: relative` على `.card` وشوف الـ `badge` بتترّبط صح ولا لأ.") },
      ),
      q(
        "q3",
        L("Why is `.button:hover { outline: none; }` a pitfall, even though it looks clean visually?", "ليه `.button:hover { outline: none; }` غلط، حتى لو شكلها نضيف بصريًا؟"),
        [
          opt("a", "It removes the visible cue keyboard users rely on to see focus", "بتشيل الإشارة الظاهرة اللي مستخدمي الكيبورد بيعتمدوا عليها لمعرفة الـ `focus`"),
          opt("b", "`outline: none` breaks the button's `onclick` handler", "الـ `outline: none` بتكسر الـ `onclick` handler بتاع الزرار"),
          opt("c", "It is invalid CSS and gets silently dropped", "دي `CSS` مش صالحة وبتتشال بصمت"),
          opt("d", "It only affects `<a>` tags, never `<button>`", "بتأثر بس على `<a>`، مش `<button>` أبدًا"),
        ],
        "a",
        L("Removing focus outlines (even on hover rules that leak into focus) leaves keyboard users with no visible indicator — use `:focus-visible` deliberately instead.", "شيل `outline` الفوكس (حتى في قواعد `hover` اللي بتسرّب على الفوكس) بيسيب مستخدمي الكيبورد من غير مؤشر ظاهر — استخدم `:focus-visible` بقصد بدل كده."),
        { code: `.button:hover { outline: none; }\n.button:focus-visible { outline: 3px solid #f59e0b; }`, language: "css", hint: L("Tab to the button with a keyboard and check if you can see where focus is.", "روح للزرار بالكيبورد (Tab) وشوف تقدر تشوف الفوكس فين ولا لأ.") },
      ),
      q(
        "q4",
        L("Why is `!important` described as a last resort rather than a first fix?", "ليه `!important` موصوفة كحل أخير مش إصلاح أول؟"),
        [
          opt("a", "It hides the real specificity problem and makes future overrides harder", "بتخبي مشكلة الـ `specificity` الحقيقية وبتصعّب الـ `overrides` بعدين"),
          opt("b", "It is not valid inside media queries", "مش صالحة جوه الـ `media queries`"),
          opt("c", "It only works on `color` and `background` properties", "بتشتغل بس على خصائص `color` و`background`"),
          opt("d", "Browsers show a console warning every time it's used", "المتصفحات بتظهر تحذير في الـ `console` كل ما تتستخدم"),
        ],
        "a",
        L("Reaching for `!important` masks a cascade/specificity issue instead of fixing it, making the next override even harder to write.", "اللجوء لـ `!important` بيغطي مشكلة `cascade`/`specificity` بدل ما يحلها، وده بيخلي الـ `override` الجاي أصعب في الكتابة."),
        { hint: L("Compare fixing specificity with a clear class versus adding `!important`.", "قارن حل الـ `specificity` بـ `class` واضحة مقابل إضافة `!important`.") },
      ),
    ],
  },

  "css-cheatsheet": {
    title: L("CSS CheatSheet check", "نشاط `CSS CheatSheet`"),
    questions: [
      q(
        "q1",
        L("What is the recommended way to use a cheat sheet snippet in your own component?", "إيه الطريقة الموصى بيها لاستخدام `snippet` من الـ `cheat sheet` في مكوّنك؟"),
        [
          opt("a", "Copy it, then adapt and test its values in your actual context", "انسخها، وبعدين عدّل واختبر قيمها في السياق الحقيقي بتاعك"),
          opt("b", "Paste it exactly as-is and never change any values", "الصقها زي ما هي بالظبط ومتغيّرش أي قيمة"),
          opt("c", "Only use it as a comment for documentation", "استخدمها بس كـ `comment` للتوثيق"),
          opt("d", "Cheat sheets should never be used in real projects", "الـ `cheat sheets` مايتستخدموش خالص في مشاريع حقيقية"),
        ],
        "a",
        L("The cheat sheet is a recall tool: preview a snippet, copy it, then adjust its values for your component instead of pasting blindly.", "الـ `cheat sheet` أداة تذكّر: عاين `snippet`، انسخه، وبعدين عدّل قيمه لمكوّنك بدل ما تلصقه من غير ما تفكر."),
        { hint: L("Pick one card, preview it, then change one value before using it.", "اختار كارت واحد، عاينه، وبعدين غيّر قيمة واحدة قبل ما تستخدمه.") },
      ),
      q(
        "q2",
        L("Why does a custom-property card like `:root { --accent: #38bdf8; }` matter as a starting point?", "ليه كارت `custom property` زي `:root { --accent: #38bdf8; }` مهم كنقطة بداية؟"),
        [
          opt("a", "It sets a semantic theme token you can reuse across components with `var()`", "بتحط `theme token` معنوي تقدر تعيد استخدامه في مكوّنات كتير بـ `var()`"),
          opt("b", "It only works inside the `<head>` tag", "بتشتغل بس جوه `tag` الـ `<head>`"),
          opt("c", "It replaces the need for any other CSS on the page", "بتستغني عن أي `CSS` تاني في الصفحة"),
          opt("d", "`:root` only applies to the first element in the document", "الـ `:root` بتتطبق بس على أول عنصر في المستند"),
        ],
        "a",
        L("Starting from semantic token names on `:root` gives you a reusable base that every component can read with `var(--accent)`.", "البدء بأسماء `tokens` معنوية على `:root` بيدّيك أساس قابل لإعادة الاستخدام أي مكوّن يقدر يقراه بـ `var(--accent)`."),
        { code: `:root { --accent: #38bdf8; }\n.btn { background: var(--accent); }`, language: "css", hint: L("Start from semantic token names before copying component-level snippets.", "ابدأ من أسماء `tokens` معنوية قبل ما تنسخ `snippets` مستوى المكوّن.") },
      ),
      q(
        "q3",
        L("If you copy a flex row snippet from the sheet, what should you still check?", "لو نسخت `snippet` صف `flex` من الشيت، لسه محتاج تتأكد من إيه؟"),
        [
          opt("a", "How it behaves at different widths and with real content, plus focus states if interactive", "بيتصرف إزاي بعروض مختلفة ومع محتوى حقيقي، وحالات الـ `focus` لو تفاعلي"),
          opt("b", "Nothing — cheat sheet snippets are guaranteed to work everywhere unchanged", "مفيش حاجة — `snippets` الـ `cheat sheet` مضمونة تشتغل في كل مكان من غير تغيير"),
          opt("c", "Only whether it compiles without a build step", "بس لو بتشتغل من غير خطوة `build`"),
          opt("d", "Only the snippet's file size", "بس حجم ملف الـ `snippet`"),
        ],
        "a",
        L("Test responsive and focus states after adapting a snippet — a cheat sheet is recall, not a guarantee for every context.", "اختبر حالات الـ `responsive` والـ `focus` بعد ما تعدّل الـ `snippet` — الـ `cheat sheet` أداة تذكّر، مش ضمان لكل سياق."),
        { hint: L("Test responsive and focus states after pasting.", "اختبر حالات الـ `responsive` والـ `focus` بعد اللصق.") },
      ),
      q(
        "q4",
        L("Why does the sheet keep technical CSS in English even in the Arabic locale?", "ليه الشيت بيسيب الـ `CSS` التقنية بالإنجليزي حتى في النسخة العربي؟"),
        [
          opt("a", "So the code stays ready to paste directly into a stylesheet without translation", "عشان الكود يفضل جاهز للصق مباشرة في `stylesheet` من غير ترجمة"),
          opt("b", "Because Arabic cannot be typed in a code editor", "لأن العربي مينفعش يتكتب في `code editor`"),
          opt("c", "Because CSS property names change per language", "لأن أسماء خصائص الـ `CSS` بتتغير حسب اللغة"),
          opt("d", "Because the cheat sheet has no Arabic support at all", "لأن الـ `cheat sheet` مالهاش دعم عربي خالص"),
        ],
        "a",
        L("Property and value names are kept in English (in backticks) so a snippet is copy-paste ready regardless of the reading locale.", "أسماء الخصائص والقيم بتفضل بالإنجليزي (جوه backticks) عشان الـ `snippet` يبقى جاهز للنسخ واللصق بغض النظر عن لغة القراءة."),
        { hint: L("Look at how a card's note mixes Arabic prose with English `code` tokens.", "شوف إزاي ملاحظة الكارت بتخلط نثر عربي مع `tokens` كود إنجليزي.") },
      ),
    ],
  },
};

export function assertCssLessonActivityCoverage(order: readonly string[]) {
  assertLessonActivityCoverage("CSS", order, cssLessonActivities);
}
