import { insight, L } from "@/content/helpers";
import type { ProductionInsights } from "@/content/tracks/_insights";

export const cssInsights: Record<string, ProductionInsights> = {
  "cascade-specificity": {
    underTheHood: insight(
      [
        L(
          "During style resolution the engine walks every matched rule for an element and builds a candidate set per property. Each candidate carries origin (user-agent, author, inline), importance, specificity triple (IDs, classes, elements), and document order.",
          "أثناء حل الأنماط المحرك يمر على كل قاعدة مطابقة للعنصر ويبني مجموعة مرشحة لكل خاصية. كل مرشح يحمل المصدر (user-agent أو author أو inline) والأهمية وثلاثية specificity (IDs وclasses وعناصر) وترتيب المستند.",
        ),
        L(
          "The cascade compares candidates in a fixed order: origin and importance first, then specificity as a tuple (not a single number), then source order within the same sheet. A tie at every step lets the next rule in document order win.",
          "الـ cascade يقارن المرشحين بترتيب ثابت: المصدر والأهمية أولًا، ثم specificity كمجموعة (مش رقم واحد)، ثم ترتيب المصدر داخل نفس الورقة. التعادل في كل خطوة يخلي القاعدة التالية في ترتيب المستند تفوز.",
        ),
        L(
          "Winning values become computed styles cached on the element. Changing a class, attribute, or media condition invalidates that cache and triggers a style recalc pass before layout runs again.",
          "القيم الفائزة بتتحول لـ computed styles متخزنة على العنصر. تغيير class أو attribute أو شرط media بيبطل الكاش ويشغّل مرور style recalc قبل ما الـ layout يشتغل تاني.",
        ),
      ],
      {
        bullets: [
          L(
            "Specificity is a tuple (a, b, c): inline styles and !important sit outside the tuple comparison",
            "Specificity مجموعة (a, b, c): الأنماط inline و!important خارج مقارنة المجموعة",
          ),
          L(
            "@layer reorders author-origin sheets before specificity is compared",
            "@layer بيعيد ترتيب أوراق author-origin قبل مقارنة specificity",
          ),
          L(
            "Inheritance is a separate pass: inherited properties flow from parent computed values, not from the winning rule directly",
            "الوراثة مرور منفصل: الخصائص الموروثة بتيجي من computed values الأب، مش من القاعدة الفائزة مباشرة",
          ),
          L(
            "Style invalidation is property-scoped when possible — a color change may skip full layout if no geometry changes",
            "إبطال الأنماط بيكون محدود بالخاصية لما يمكن — تغيير لون ممكن يتخطى layout كامل لو مفيش تغيير هندسي",
          ),
        ],
        code: `/* specificity: (0, 1, 1) beats (0, 1, 0) */
.card .title { color: navy; }
.card--featured .title { color: #0ea5e9; }`,
        codeCaption: L("Later rule wins only when specificity ties", "القاعدة اللاحقة تفوز بس لما specificity يتعادل"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Cascade overrides can silently remove focus outlines or hide content when a more-specific selector targets the same element. Screen readers still read DOM text even when visibility or clip rules win in the cascade.",
          "تجاوزات cascade ممكن تشيل focus outlines أو تخفي محتوى بصمت لما selector أعلى specificity يستهدف نفس العنصر. قارئات الشاشة لسه بتقرأ نص DOM حتى لو قواعد visibility أو clip كسبت في cascade.",
        ),
        L(
          "State pseudo-classes (:hover, :focus-visible) participate in the same cascade. A global reset with equal or higher specificity can erase keyboard focus styling that hover rules leave intact.",
          "pseudo-classes الحالة (:hover, :focus-visible) بتشارك في نفس cascade. reset عام بنفس أو أعلى specificity ممكن يمسح تنسيق focus الكيبورد بينما قواعد hover تفضل.",
        ),
      ],
      {
        bullets: [
          L("Never remove :focus-visible without a stronger replacement", "متشيلش :focus-visible من غير بديل أوضح"),
          L("visibility:hidden and display:none remove content from the accessibility tree differently", "visibility:hidden وdisplay:none بيشيلوا المحتوى من accessibility tree بشكل مختلف"),
          L("Test keyboard focus after component-level cascade overrides", "اختبر focus الكيبورد بعد تجاوزات cascade على مستوى المكوّن"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "CSS does not change HTML semantics, but rules that hide primary copy or collapse layout can affect what users and crawlers perceive as above-the-fold content.",
          "CSS مش بتغير دلالات HTML، لكن قواعد تخفي النص الأساسي أو تطوي layout ممكن تأثر على اللي المستخدمين والزواحف يشوفوه فوق الطية.",
        ),
        L(
          "Heavy specificity and !important increase stylesheet size and recalc cost on large DOMs. Simpler selector trees keep style passes predictable during hydration and route changes.",
          "specificity الثقيلة و!important بتكبّر stylesheet وتكلفة recalc على DOM كبير. أشجار selectors أبسط بتخلي مرورات الأنماط متوقعة أثناء hydration وتغيير المسارات.",
        ),
      ],
      {
        bullets: [
          L("Avoid hiding headings or main copy with fragile display rules", "تجنب إخفاء العناوين أو النص الأساسي بقواعد display هشة"),
          L("Keep critical text in HTML — do not rely on ::before for unique content", "خلّي النص الحرج في HTML — متعتمدش على ::before لمحتوى فريد"),
          L("Ship readable structure before layering visual overrides", "انشر هيكل مقروء قبل طبقات التجاوزات البصرية"),
        ],
      },
    ),
  },

  "box-model": {
    underTheHood: insight(
      [
        L(
          "Each element generates one or more boxes: content, padding, border, and margin areas. The used width and height depend on box-sizing — content-box adds padding and border outside the declared width, border-box includes them inside.",
          "كل عنصر بيولّد صندوق أو أكثر: content وpadding وborder وmargin. العرض والارتفاع المستخدمين يعتمدوا على box-sizing — content-box بيضيف padding وborder بره العرض المعلن، border-box بيدخلهم جوه.",
        ),
        L(
          "Vertical margins between block-level siblings in normal flow can collapse: the larger margin wins and the gap between boxes shrinks. Flex, grid, and new block formatting contexts suppress collapse between their children.",
          "الهوامش العمودية بين إخوة block في normal flow ممكن تندمج: الهامش الأكبر يفوز والفجوة بين الصناديق بتصغر. Flex وgrid وblock formatting contexts جديدة بتمنع الانهيار بين أطفالها.",
        ),
        L(
          "Padding extends the background painting area but not the margin box. Borders sit on the edge between padding and margin and participate in hit-testing for pointer events.",
          "Padding بيمد منطقة رسم الخلفية لكن مش صندوق margin. Borders على الحافة بين padding وmargin وبتشارك في hit-testing لأحداث المؤشر.",
        ),
      ],
      {
        bullets: [
          L(
            "Used width = min(max(min-content, width), max-content) adjusted by box-sizing and min/max constraints",
            "العرض المستخدم = min(max(min-content, width), max-content) معدّل بـ box-sizing وقيود min/max",
          ),
          L(
            "Adjacent vertical margins collapse to max(margin-top, margin-bottom) unless a BFC, flex, or grid item separates them",
            "الهوامش العمودية المتجاورة بتندمج لـ max(margin-top, margin-bottom) إلا لو BFC أو flex أو grid item فصل بينهم",
          ),
          L(
            "overflow: hidden/auto creates a scroll container and a new block formatting context",
            "overflow: hidden/auto بيعمل scroll container وblock formatting context جديد",
          ),
          L(
            "Percentage heights resolve against the containing block height — undefined if the parent has no explicit height",
            "الارتفاعات النسبية بتتحسب من ارتفاع containing block — غير معرّف لو الأب مالوش ارتفاع صريح",
          ),
        ],
        code: `* { box-sizing: border-box; }
.card {
  width: 20rem;
  padding: 1rem;
  border: 1px solid #cbd5e1;
}`,
        codeCaption: L("border-box keeps declared width stable", "border-box بيخلي العرض المعلن ثابت"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Padding and margin affect touch target size. A visually small control with tight padding may fail minimum target guidelines even when the border box looks acceptable.",
          "Padding وmargin بيأثروا على حجم هدف اللمس. عنصر تحكم صغير بصريًا بـ padding ضيق ممكن يفشل إرشادات الحد الأدنى للهدف حتى لو border box شكله مقبول.",
        ),
        L(
          "Negative margins can pull focusable elements under overlapping content, breaking tab order predictability. Overflow clipping can hide focus rings that extend outside the box.",
          "الهوامش السالبة ممكن تسحب عناصر قابلة للتركيز تحت محتوى متداخل وتكسر توقع ترتيب Tab. قص overflow ممكن يخفي حلقات focus اللي بتخرج بره الصندوق.",
        ),
      ],
      {
        bullets: [
          L("Ensure interactive targets meet ~44×44px including padding", "تأكد إن أهداف التفاعل ~44×44px شاملة padding"),
          L("Do not clip focus outlines with overflow:hidden on parents", "متقصش focus outlines بـ overflow:hidden على الآباء"),
          L("Margin collapse can separate visual spacing from document flow gaps", "انهيار margin ممكن يفصل المسافة البصرية عن فجوات document flow"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Layout shifts from late-applied box model rules hurt CLS. Declaring box-sizing early prevents width jumps when padding or borders load after first paint.",
          "تحركات layout من قواعد box model المتأخرة بتضر CLS. إعلان box-sizing بدري بيمنع قفزات العرض لما padding أو borders تحمّل بعد أول paint.",
        ),
        L(
          "Content clipped by overflow:hidden is still in the DOM for crawlers but invisible to users — avoid hiding primary text inside overflow containers.",
          "المحتوى المقصوص بـ overflow:hidden لسه في DOM للزواحف لكن غير مرئي للمستخدمين — تجنب إخفاء النص الأساسي جوه حاويات overflow.",
        ),
      ],
      {
        bullets: [
          L("Set box-sizing globally in a low-specificity reset", "حط box-sizing عالميًا في reset قليل specificity"),
          L("Reserve space for images and embeds to limit CLS", "احجز مساحة للصور والتضمينات لتقليل CLS"),
          L("Fixed heights on text containers can clip content at zoom levels", "ارتفاعات ثابتة على حاويات النص ممكن تقص محتوى عند مستويات zoom"),
        ],
      },
    ),
  },

  "units-sizing": {
    underTheHood: insight(
      [
        L(
          "Absolute units (px) map to device pixels after rounding. Relative units resolve at computed-value time: rem against the root font-size, em against the element or property font-size, and % against the containing block on each axis.",
          "الوحدات المطلقة (px) بتتحول لبكسلات الجهاز بعد التقريب. الوحدات النسبية بتتحسب وقت computed-value: rem من font-size الجذر، em من font-size العنصر أو الخاصية، و% من containing block على كل محور.",
        ),
        L(
          "Viewport units (vw, vh, dvh, svh) resolve against the viewport size, which mobile browsers adjust when UI chrome shows or hides. min(), max(), and clamp() evaluate their arguments and return a single used value.",
          "وحدات viewport (vw, vh, dvh, svh) بتتحسب من حجم viewport اللي متصفحات الموبايل بتعدّله لما واجهة المتصفح تظهر أو تختفي. min() وmax() وclamp() بيقيّموا المعاملات ويرجعوا قيمة مستخدمة واحدة.",
        ),
        L(
          "aspect-ratio sets a preferred aspect ratio used during intrinsic sizing. Combined with width or max-width it lets the engine derive height without an explicit block-size declaration.",
          "aspect-ratio بيحدد نسبة عرض إلى ارتفاع مفضلة تُستخدم أثناء intrinsic sizing. مع width أو max-width المحرك يقدر يشتق الارتفاع من غير إعلان block-size صريح.",
        ),
      ],
      {
        bullets: [
          L(
            "rem cascades from :root — changing html font-size rescales every rem-based declaration",
            "rem بتتورث من :root — تغيير font-size في html بيعيد قياس كل إعلانات rem",
          ),
          L(
            "Percentage widths resolve against the containing block width; percentage heights need a definite parent height",
            "عرض % بيتحسب من عرض containing block؛ ارتفاع % محتاج ارتفاع أب محدد",
          ),
          L(
            "dvh tracks the dynamic viewport — 100vh on mobile often includes browser chrome and clips content",
            "dvh بيتتبع viewport الديناميكي — 100vh على الموبايل غالبًا بيشمل شريط المتصفح ويقص المحتوى",
          ),
          L(
            "clamp(min, preferred, max) is computed once per element per style recalc",
            "clamp(min, preferred, max) بيتحسب مرة لكل عنصر في كل style recalc",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Users who increase root font-size or browser zoom depend on rem and em scaling. Fixed pixel typography and spacing can make text unreadable or truncate labels at 200% zoom.",
          "المستخدمين اللي بيكبّروا font-size الجذر أو zoom المتصفح بيعتمدوا على تكبير rem وem. typography ومسافات بـ px ثابتة ممكن تخلي النص غير مقروء أو تقص التسميات عند zoom 200%.",
        ),
        L(
          "Minimum touch targets and line length (measure) affect reading comfort. ch and rem units help keep line length near 45–75 characters across zoom levels.",
          "الحد الأدنى لأهداف اللمس وطول السطر (measure) بيأثروا على راحة القراءة. وحدات ch وrem بتساعد تخلي طول السطر قريب من 45–75 حرف عبر مستويات zoom.",
        ),
      ],
      {
        bullets: [
          L("Prefer rem for type and spacing so user font settings apply", "فضّل rem للخط والمسافات عشان إعدادات خط المستخدم تتطبق"),
          L("Test layouts at 200% browser zoom and large text OS settings", "اختبر layouts عند zoom 200% وإعدادات نص كبير في النظام"),
          L("Avoid locking critical UI copy to single-line fixed heights", "تجنب تثبيت نص واجهة حرج على ارتفاعات سطر واحد ثابتة"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Mobile-first fluid sizing reduces horizontal overflow and horizontal scroll penalties. Content that overflows the viewport can be clipped or require awkward sideways scrolling on small screens.",
          "المقاسات السائلة mobile-first بتقلل overflow الأفقي وعقوبات التمرير الجانبي. المحتوى اللي بيفيض viewport ممكن يتقص أو يحتاج تمرير جانبي مزعج على الشاشات الصغيرة.",
        ),
        L(
          "Large layout shifts from unsized media hurt Core Web Vitals. Reserving aspect-ratio or min-height for hero and embed regions stabilizes LCP and CLS scores.",
          "تحركات layout كبيرة من ميديا غير مُقاسة بتضر Core Web Vitals. حجز aspect-ratio أو min-height لمناطق hero والتضمين بيثبّت درجات LCP وCLS.",
        ),
      ],
      {
        bullets: [
          L("Use min(100%, max-width) patterns to prevent horizontal overflow", "استخدم أنماط min(100%, max-width) لمنع overflow الأفقي"),
          L("Reserve dimensions for images and video embeds before load", "احجز أبعاد للصور وتضمينات الفيديو قبل التحميل"),
          L("Fluid type with clamp() scales headings without breakpoint sprawl", "خط سائل بـ clamp() بيكبّر العناوين من غير انتشار breakpoints"),
        ],
      },
    ),
  },

  "colors-typography": {
    underTheHood: insight(
      [
        L(
          "Color values are parsed into a canonical form (sRGB, OKLCH, etc.) at computed-value time. Gradients interpolate in the color space of the function — mixing hue in HSL differs visually from mixing in sRGB.",
          "قيم الألوان بتتparse لصيغة قياسية (sRGB أو OKLCH وغيرها) وقت computed-value. التدرجات بتعمل interpolation في color space الدالة — خلط hue في HSL يختلف بصريًا عن الخلط في sRGB.",
        ),
        L(
          "Font-size establishes the em unit for descendants. line-height can be unitless (a multiplier of font-size) or absolute; unitless values inherit as multipliers and scale better with user preferences.",
          "font-size بيحدد وحدة em للأبناء. line-height ممكن تكون بدون وحدة (مضاعف font-size) أو مطلقة؛ القيم بدون وحدة بتتورث كمضاعفات وتتكيف أحسن مع تفضيلات المستخدم.",
        ),
        L(
          "Web fonts load asynchronously: the engine may render fallback metrics first (FOIT/FOUT) until the custom face is ready. font-display controls that swap behavior.",
          "خطوط الويب بتحمّل بشكل غير متزامن: المحرك ممكن يرسم مقاييس fallback أولًا (FOIT/FOUT) لحد ما الخط المخصص يجهز. font-display بيتحكم في سلوك التبديل.",
        ),
      ],
      {
        bullets: [
          L(
            "Line boxes stack using half-leading above and below each glyph — line-height sets total line box height",
            "صناديق السطر بتتراص بـ half-leading فوق وتحت كل حرف — line-height بيحدد ارتفاع line box الكلي",
          ),
          L(
            "font-weight maps to available faces in the font family — synthetic bold may render if no bold face exists",
            "font-weight بيتحول لوجوه متاحة في عائلة الخط — bold اصطناعي ممكن يترسم لو مفيش وجه bold",
          ),
          L(
            "letter-spacing and word-spacing apply after shaping — complex scripts may ignore them",
            "letter-spacing وword-spacing بتتطبق بعد shaping — الكتابات المعقدة ممكن تتجاهلهم",
          ),
          L(
            "color and background-color paint in separate phases — text color does not tint background images",
            "color وbackground-color بيترسموا في مراحل منفصلة — لون النص مش بيلون صور الخلفية",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "WCAG contrast ratios compare foreground and background computed colors. Semi-transparent text over images or gradients needs testing at every background variation, not just a single screenshot.",
          "نسب تباين WCAG بتقارن ألوان المقدمة والخلفية المحسوبة. نص شبه شفاف فوق صور أو تدرجات محتاج اختبار عند كل تغيير خلفية، مش screenshot واحد.",
        ),
        L(
          "Typography affects dyslexia and low-vision readers: line length, line-height, and weight matter as much as color. Never use color alone to signal errors, links, or required fields.",
          "الطباعة بتأثر على قارئي عسر القراءة وضعاف البصر: طول السطر وline-height والوزن مهمة زي اللون. متستخدمش اللون لوحده لإشارات الأخطاء أو الروابط أو الحقول المطلوبة.",
        ),
      ],
      {
        bullets: [
          L("Aim for 4.5:1 body text and 3:1 large text against backgrounds", "استهدف 4.5:1 لنص الجسم و3:1 للنص الكبير على الخلفيات"),
          L("Pair color cues with icons, text, or patterns for state", "اقرن إشارات اللون بأيقونات أو نص أو أنماط للحالة"),
          L("Respect prefers-contrast: more when users request higher contrast", "احترم prefers-contrast: more لما المستخدم يطلب تباين أعلى"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Readable typography keeps users on page longer — a soft engagement signal. Tiny gray text on white may pass automated checks in one state but fail in sunlight or on low-quality displays.",
          "طباعة مقروءة بتخلي المستخدمين على الصفحة أطول — إشارة engagement ناعمة. نص رمادي صغير على أبيض ممكن يعدي فحوص آلية في حالة واحدة لكن يفشل في الشمس أو شاشات ضعيفة.",
        ),
        L(
          "Web font weight and subsetting affect LCP. Preload only critical faces; excessive font families delay first meaningful paint.",
          "وزن خط الويب والـ subsetting بيأثروا على LCP. اعمل preload للوجوه الحرجة بس؛ عائلات خطوط كتيرة بتأخر أول paint ذي معنى.",
        ),
      ],
      {
        bullets: [
          L("Limit web font families and weights to what the UI actually uses", "قلّل عائلات الخطوط والأوزان لما الواجهة فعلًا بتستخدمه"),
          L("Keep body copy in HTML — crawlers index text, not CSS color tokens alone", "خلّي نص الجسم في HTML — الزواحف بتفهرس النص مش color tokens لوحدها"),
          L("Use system font stacks for fast first paint on content-heavy pages", "استخدم system font stacks لأول paint سريع على صفحات غنية بالمحتوى"),
        ],
      },
    ),
  },

  "display-flow": {
    underTheHood: insight(
      [
        L(
          "Normal flow lays out block boxes sequentially in the block direction and inline boxes within line boxes in the inline direction. Each block stretches to the width of its containing block unless constrained.",
          "Normal flow بيرتب صناديق block بالتسلسل في اتجاه block وصناديق inline داخل line boxes في اتجاه inline. كل block بيتمدد لعرض containing block إلا لو مقيّد.",
        ),
        L(
          "Changing display swaps formatting context participation: block-level boxes generate block containers; inline-level boxes participate in inline formatting; display:none removes the subtree from layout and rendering entirely.",
          "تغيير display بيبدّل مشاركة formatting context: صناديق block-level بتولّد block containers؛ صناديق inline-level بتشارك في inline formatting؛ display:none بيشيل الشجرة الفرعية من layout والرسم تمامًا.",
        ),
        L(
          "Anonymous block and inline boxes are synthesized when block and inline content mix illegally in the DOM — the engine repairs structure before layout runs.",
          "صناديق block وinline مجهولة بتتولّد لما محتوى block وinline يختلط بشكل غير صالح في DOM — المحرك بيصلح الهيكل قبل layout.",
        ),
      ],
      {
        bullets: [
          L(
            "Inline boxes ignore width and vertical margin; height follows line box metrics",
            "صناديق inline بتتجاهل width وmargin العمودي؛ الارتفاع يتبع مقاييس line box",
          ),
          L(
            "inline-block creates an atomic inline box that accepts block-level properties inside",
            "inline-block بيعمل صندوق inline ذري يقبل خصائص block-level جواه",
          ),
          L(
            "display:none skips layout and paint; visibility:hidden keeps layout space but hides painting",
            "display:none بيتخطى layout وpaint؛ visibility:hidden بيحتفظ بمساحة layout لكن يخفي الرسم",
          ),
          L(
            "Flow root is the initial containing block — positioned descendants resolve against nearest positioned ancestor",
            "جذر flow هو initial containing block — الأبناء positioned بيتحلوا من أقرب أب positioned",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "display:none and visibility:hidden behave differently for assistive technology when combined with aria-hidden. Removing an element from flow with display:none typically removes it from the accessibility tree.",
          "display:none وvisibility:hidden بيتصرفوا بشكل مختلف مع assistive technology مع aria-hidden. إزالة عنصر من flow بـ display:none عادة بيشيله من accessibility tree.",
        ),
        L(
          "Changing display for responsive patterns does not change semantic roles. A list styled as flex rows is still a list to screen readers if the HTML is ul/li.",
          "تغيير display لأنماط responsive مش بيغير الأدوار الدلالية. قائمة متنسقة كصفوف flex لسه قائمة لقارئات الشاشة لو HTML هو ul/li.",
        ),
      ],
      {
        bullets: [
          L("Do not use display:none to hide content that should remain available to AT", "متستخدمش display:none لإخفاء محتوى لازم يفضل متاحًا لـ AT"),
          L("Preserve heading and list semantics regardless of display value", "احتفظ بدلالات العناوين والقوائم بغض النظر عن قيمة display"),
          L("Table display roles map to table semantics — avoid div tables for data grids", "أدوار table display بترتبط بدلالات الجدول — تجنب div tables لشبكات البيانات"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Content in normal document flow is easiest for crawlers and reader mode to extract in source order. Heavy reliance on display reordering without meaningful DOM order can confuse content extraction heuristics.",
          "المحتوى في document flow العادي أسهل للزواحف وreader mode للاستخراج بترتيب المصدر. الاعتماد الكبير على إعادة ترتيب display من غير DOM order ذي معنى ممكن يلخبط heuristics الاستخراج.",
        ),
        L(
          "display:none content is usually still in HTML source and may be indexed, but hidden primary copy can look like cloaking if it differs from visible text.",
          "محتوى display:none عادة لسه في مصدر HTML وممكن يتفهرس، لكن نسخ أساسية مخفية ممكن تبان كـ cloaking لو اختلفت عن النص الظاهر.",
        ),
      ],
      {
        bullets: [
          L("Keep article body in logical source order before flex/grid visual tweaks", "خلّي جسم المقال بترتيب مصدر منطقي قبل تعديلات flex/grid البصرية"),
          L("Avoid hiding SEO-critical text with off-screen or zero-size flow tricks", "تجنب إخفاء نص مهم لـ SEO بخدع flow خارج الشاشة أو بحجم صفر"),
          L("Reader mode extracts flow content — test with Safari or Firefox reader view", "Reader mode بيستخرج محتوى flow — اختبر بـ Safari أو Firefox reader view"),
        ],
      },
    ),
  },

  "backgrounds-borders": {
    underTheHood: insight(
      [
        L(
          "Background layers paint back-to-front in declaration order. Each layer can set color, image, position, size, and repeat independently. background-clip controls whether paint extends into padding, border, or content boxes.",
          "طبقات الخلفية بترسم من الخلف للأمام بترتيب الإعلان. كل طبقة ممكن تحدد لون وصورة وموضع وحجم وتكرار بشكل مستقل. background-clip بيتحكم هل الرسم يمتد لـ padding أو border أو content boxes.",
        ),
        L(
          "Borders occupy space in the border box and affect used width under content-box sizing. outline draws after layout in a separate pass and does not change box dimensions or reflow siblings.",
          "Borders بتاخد مساحة في border box وبتلعب على العرض المستخدم تحت content-box sizing. outline بيرسم بعد layout في مرور منفصل ومش بيغير أبعاد الصندوق أو يعمل reflow للإخوة.",
        ),
        L(
          "border-radius clips backgrounds and children when overflow is hidden. Large radii on unequal sides use elliptical corner curves computed per corner.",
          "border-radius بيقص الخلفيات والأبناء لما overflow hidden. نصف قطر كبير على جوانب غير متساوية بيستخدم منحنيات زاوية بيضاوية محسوبة لكل زاوية.",
        ),
      ],
      {
        bullets: [
          L(
            "Multiple backgrounds stack: first declared layer paints on top",
            "خلفيات متعددة تتراكم: أول طبقة معلنة بترسم فوق",
          ),
          L(
            "border-box vs padding-box in background-clip changes where gradients stop",
            "border-box مقابل padding-box في background-clip بيغيّر وين التدرجات بتوقف",
          ),
          L(
            "outline-offset draws outside the border edge without affecting hit targets unless combined with padding",
            "outline-offset بيرسم بره حافة border من غير ما يأثر على hit targets إلا مع padding",
          ),
          L(
            "box-shadow is painted like an outer border but does not participate in layout",
            "box-shadow بيرسم كحد خارجي لكن مش بيشارك في layout",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Background images are decorative unless given a text alternative in HTML. Low-contrast text over busy backgrounds fails contrast checks — a semi-transparent overlay layer is a paint fix, not a semantic one.",
          "صور الخلفية زخرفية إلا لو أُعطيت بديل نصي في HTML. نص ضعيف التباين فوق خلفيات مزدحمة بيفشل فحوص التباين — طبقة overlay شبه شفافة إصلاح رسم مش دلالي.",
        ),
        L(
          "Focus outlines must remain visible on custom-styled buttons and links. Replacing border-based focus with outline preserves layout while meeting keyboard visibility requirements.",
          "حلقات focus لازم تفضل ظاهرة على أزرار وروابط مخصصة الشكل. استبدال focus المعتمد على border بـ outline يحافظ على layout ويلبي متطلبات وضوح الكيبورد.",
        ),
      ],
      {
        bullets: [
          L("Use outline or box-shadow for :focus-visible — borders shift layout", "استخدم outline أو box-shadow لـ :focus-visible — borders بتزق layout"),
          L("Mark decorative backgrounds aria-hidden in HTML when adjacent to text", "علّم الخلفيات الزخرفية aria-hidden في HTML لما تكون جنب نص"),
          L("Test contrast on every background layer behind text", "اختبر التباين على كل طبقة خلفية ورا النص"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Large background images loaded via CSS are not discoverable in img srcset and may delay LCP if they cover hero regions. Prefer HTML img or picture for meaningful hero imagery.",
          "صور خلفية كبيرة محمّلة بـ CSS مش قابلة للاكتشاف في img srcset وممكن تأخر LCP لو بتغطي مناطق hero. فضّل HTML img أو picture لصور hero ذات معنى.",
        ),
        L(
          "Heavy box-shadow and blur filters increase paint cost on scroll. Simpler surfaces improve INP on pages with many cards or sticky headers.",
          "box-shadow ثقيل وفلاتر blur بيزيدوا تكلفة paint عند التمرير. أسطح أبسط بتحسّن INP على صفحات فيها كروت كتير أو headers sticky.",
        ),
      ],
      {
        bullets: [
          L("Put LCP hero images in HTML with fetchpriority when possible", "حط صور hero LCP في HTML مع fetchpriority لما يمكن"),
          L("Avoid text baked into background images — crawlers cannot read it", "تجنب نص محروق في صور الخلفية — الزواحف مش بتقرأه"),
          L("Compress and size CSS background assets like any other image", "اضغط وقِس أصول خلفية CSS زي أي صورة تانية"),
        ],
      },
    ),
  },

  "flexbox-basics": {
    underTheHood: insight(
      [
        L(
          "A flex container establishes a flex formatting context. Children become flex items measured along the main axis, then free space is distributed via flex-grow, flex-shrink, and flex-basis before cross-axis alignment runs.",
          "حاوية flex بتنشئ flex formatting context. الأطفال بيبقوا flex items يتقاسوا على main axis، وبعدين المساحة الحرة تتوزع عبر flex-grow وflex-shrink وflex-basis قبل ما محاذاة cross-axis تشتغل.",
        ),
        L(
          "The default min-size for flex items is auto, which resolves to the content minimum and can block shrinking. The engine will not shrink an item below its min-content size unless min-width or min-height is overridden.",
          "الحد الأدنى الافتراضي لعناصر flex هو auto، بيتحل لأقل محتوى وممكن يمنع التصغير. المحرك مش هيصغّر عنصر تحت min-content size إلا لو min-width أو min-height اتعدّل.",
        ),
        L(
          "align-content applies only when flex-wrap creates multiple lines. justify-content and align-items operate on the current line's main and cross axes respectively.",
          "align-content بتتطبق بس لما flex-wrap يعمل أسطر متعددة. justify-content وalign-items بيشتغلوا على main axis وcross axis للسطر الحالي على التوالي.",
        ),
      ],
      {
        bullets: [
          L(
            "Free space = container inner main size minus sum of flex base sizes and gaps",
            "المساحة الحرة = الحجم الداخلي للحاوية على main axis ناقص مجموع flex base sizes والفجوات",
          ),
          L(
            "flex-grow distributes positive free space proportionally to grow factors",
            "flex-grow بيوزع المساحة الحرة الموجبة بنسبة عوامل النمو",
          ),
          L(
            "flex-shrink removes negative free space — shrink factor 0 prevents compression",
            "flex-shrink بيشيل المساحة الحرة السالبة — shrink factor 0 بيمنع الضغط",
          ),
          L(
            "auto margins on flex items absorb leftover space on their axis",
            "هوامش auto على flex items بتمتص المساحة المتبقية على محورها",
          ),
        ],
        code: `.row { display: flex; gap: 1rem; }
.copy { flex: 1; min-width: 0; }`,
        codeCaption: L("min-width: 0 allows text flex items to shrink below content width", "min-width: 0 بيسمح لعناصر flex النصية تصغر تحت عرض المحتوى"),
      },
    ),
    accessibility: insight(
      [
        L(
          "The order property changes visual order but not tab sequence or screen reader reading order, which follow DOM order. Reordering for aesthetics can confuse keyboard users if focus jumps unexpectedly.",
          "خاصية order بتغيّر الترتيب البصري لكن مش تسلسل Tab أو ترتيب قراءة قارئ الشاشة اللي بيتبع DOM order. إعادة الترتيب للجمال ممكن تلخبط مستخدمي الكيبورد لو focus بيقفز بشكل غير متوقع.",
        ),
        L(
          "Flex alignment can clip focus rings or truncate text without an accessible name change. Ensure expanded or collapsed flex regions expose state with aria-expanded or similar.",
          "محاذاة flex ممكن تقص حلقات focus أو تقطع نص من غير تغيير اسم وصول. تأكد إن مناطق flex الموسّعة أو المطوية بتعرض الحالة بـ aria-expanded أو ما شابه.",
        ),
      ],
      {
        bullets: [
          L("Keep meaningful DOM order — do not rely on order for structure", "خلّي DOM order ذا معنى — متعتمدش على order للهيكل"),
          L("Preserve visible focus when align-items: center clips outlines", "احتفظ بـ focus ظاهر لما align-items: center يقص outlines"),
          L("Label icon-only flex toolbar buttons with aria-label", "سمّي أزرار شريط flex بالأيقونة فقط بـ aria-label"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Flex is presentation-only. Primary article content should appear in source order before flex reordering so crawlers and reader mode extract headings and paragraphs logically.",
          "Flex للعرض بس. محتوى المقال الأساسي لازم يظهر بترتيب المصدر قبل إعادة ترتيب flex عشان الزواحف وreader mode يستخرجوا العناوين والفقرات بمنطق.",
        ),
        L(
          "Horizontal flex rows that never wrap can cause overflow on narrow viewports, hiding off-screen content from mobile users and increasing bounce rates.",
          "صفوف flex أفقية ما بتلفش أبدًا ممكن تسبب overflow على شاشات ضيقة وتخفي محتوى خارج الشاشة من مستخدمي الموبايل وتزيد معدل الارتداد.",
        ),
      ],
      {
        bullets: [
          L("Use flex-wrap or responsive direction changes before content overflows", "استخدم flex-wrap أو تغيير direction responsive قبل ما المحتوى يفيض"),
          L("Place nav links in HTML order that matches visual priority", "رتّب روابط التنقل في HTML بترتيب يطابق الأولوية البصرية"),
          L("Avoid hiding primary copy in overflow:hidden flex children", "تجنب إخفاء نسخ أساسية في أطفال flex بـ overflow:hidden"),
        ],
      },
    ),
  },

  "css-grid": {
    underTheHood: insight(
      [
        L(
          "Grid layout runs in two phases: track sizing resolves column and row sizes from template tracks, fr units, and minmax constraints, then items are placed into cells by line numbers or named areas.",
          "Grid layout بيشتغل بمرحلتين: track sizing بيحل أحجام الأعمدة والصفوف من template tracks ووحدات fr وقيود minmax، وبعدين العناصر بتتحط في خلايا بأرقام الخطوط أو areas مسماة.",
        ),
        L(
          "The fr unit receives leftover space after fixed, max-content, and min-content contributions are satisfied. minmax(0, 1fr) sets a zero minimum so long content cannot inflate the track beyond its share.",
          "وحدة fr بتاخد المساحة المتبقية بعد ما تتحقق مساهمات fixed وmax-content وmin-content. minmax(0, 1fr) بيحدد حد أدنى صفر عشان محتوى طويل ما يكبّرش الـ track فوق نصيبه.",
        ),
        L(
          "auto-fit collapses empty tracks and stretches remaining columns; auto-fill keeps empty tracks as gaps. Both repeat minmax patterns for intrinsic responsive grids without explicit breakpoints.",
          "auto-fit بيطوي tracks فاضية ويمد الأعمدة المتبقية؛ auto-fill بيحتفظ بالـ tracks الفاضية كفجوات. الاتنين بيكرروا أنماط minmax لشبكات responsive داخلية من غير breakpoints صريحة.",
        ),
      ],
      {
        bullets: [
          L(
            "Explicit tracks come from grid-template; implicit tracks appear for overflow items",
            "الـ tracks الصريحة من grid-template؛ الـ implicit tracks بتظهر للعناصر الزائدة",
          ),
          L(
            "gap is applied between tracks — it does not add to track size like margin",
            "gap بين الـ tracks — مش بيضاف لحجم الـ track زي margin",
          ),
          L(
            "grid-area shorthand sets row-start, column-start, row-end, column-end in one declaration",
            "grid-area shorthand بيحدد row-start وcolumn-start وrow-end وcolumn-end في إعلان واحد",
          ),
          L(
            "Subgrid (where supported) passes parent track lines into nested grids",
            "Subgrid (حيث مدعوم) بيمرّر خطوط tracks الأب للشبكات المتداخلة",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Grid placement can separate visual position from DOM order. Screen readers traverse DOM, not grid cells — a sidebar placed in column two via grid-column may still be read first if it appears first in HTML.",
          "وضع grid ممكن يفصل الموضع البصري عن DOM order. قارئات الشاشة بتمشي على DOM مش خلايا grid — sidebar في العمود الثاني بـ grid-column ممكن يتقرأ أولًا لو ظهر أولًا في HTML.",
        ),
        L(
          "Dense packing (grid-auto-flow: dense) fills holes visually but can scramble reading order relative to source. Use only when content order is truly interchangeable.",
          "التعبئة الكثيفة (grid-auto-flow: dense) بتملأ الفجوات بصريًا لكن ممكن تخلط ترتيب القراءة عن المصدر. استخدمها بس لما ترتيب المحتوى قابل للتبديل فعلًا.",
        ),
      ],
      {
        bullets: [
          L("Put main content first in DOM even if grid places it elsewhere", "حط المحتوى الرئيسي أولًا في DOM حتى لو grid حطه في مكان تاني"),
          L("Avoid grid-auto-flow: dense for article or form layouts", "تجنب grid-auto-flow: dense لتخطيطات المقالات أو النماذج"),
          L("Ensure keyboard tab order follows a logical path through grid items", "تأكد إن ترتيب Tab الكيبورد يتبع مسارًا منطقيًا عبر عناصر grid"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Grid excels at page shells but semantic HTML structure still drives outline and crawl order. A grid that visually reorders hero, nav, and article without thoughtful source order hurts extraction.",
          "Grid ممتاز لـ page shells لكن هيكل HTML الدلالي لسه بيحرّك outline وترتيب الزحف. grid يعيد ترتيب hero وnav ومقال بصريًا من غير ترتيب مصدر مدروس بيضر الاستخراج.",
        ),
        L(
          "auto-fit card grids reduce breakpoint maintenance and keep content visible across widths — fewer hidden-off-screen columns than fixed multi-column layouts.",
          "شبكات كروت auto-fit بتقلل صيانة breakpoints وتخلي المحتوى ظاهر عبر العروض — أعمدة مخفية أقل من layouts أعمدة ثابتة.",
        ),
      ],
      {
        bullets: [
          L("Source-order main before aside in HTML for article pages", "رتّب main قبل aside في HTML لصفحات المقالات"),
          L("Do not hide SEO text in zero-width grid tracks", "متخفيش نص SEO في grid tracks بعرض صفر"),
          L("Test reader mode and mobile reflow — grid may collapse to one column", "اختبر reader mode وreflow الموبايل — grid ممكن ينهار لعمود واحد"),
        ],
      },
    ),
  },

  "positioning": {
    underTheHood: insight(
      [
        L(
          "position: static participates in normal flow. relative keeps the box in flow but can offset painting and becomes a containing block for absolute descendants. absolute and fixed remove the box from flow entirely.",
          "position: static بيشارك في normal flow. relative بيحتفظ بالصندوق في flow لكن ممكن يزحزح الرسم ويبقى containing block لأبناء absolute. absolute وfixed بيشيلوا الصندوق من flow تمامًا.",
        ),
        L(
          "The containing block for absolute elements is the nearest ancestor with position not static (or a transform/filter ancestor in some cases). Inset properties resolve percentages against that ancestor padding box.",
          "containing block لعناصر absolute هو أقرب أب position مش static (أو أب transform/filter في حالات). inset properties بتحل النسب من padding box ذلك الأب.",
        ),
        L(
          "sticky is relative until a scroll threshold is crossed, then behaves like fixed within its scroll container. An ancestor with overflow other than visible creates a containing block that can trap sticky behavior.",
          "sticky نسبي لحد ما عتبة scroll تتعدى، وبعدين يتصرف كـ fixed داخل scroll container. أب بـ overflow غير visible بيعمل containing block ممكن يحبس سلوك sticky.",
        ),
      ],
      {
        bullets: [
          L(
            "fixed positions against the viewport (or transform ancestor in modern browsers)",
            "fixed بيتحدد بالنسبة لـ viewport (أو أب transform في المتصفحات الحديثة)",
          ),
          L(
            "z-index only compares siblings within the same stacking context",
            "z-index بيقارن الإخوة داخل نفس stacking context بس",
          ),
          L(
            "positioned elements with z-index: auto still create stacking contexts when opacity or transform applies",
            "عناصر positioned بـ z-index: auto لسه بتنشئ stacking contexts لما opacity أو transform يتطبق",
          ),
          L(
            "sticky needs a defined inset (top, bottom, etc.) and scrollable overflow room to stick",
            "sticky محتاج inset معرّف (top أو bottom وغيرها) ومساحة overflow قابلة للتمرير عشان يلتصق",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Fixed and sticky headers can obscure focused elements when the page scrolls. Scroll-padding-top on html offsets anchor links and focus scroll-into-view below fixed chrome.",
          "Headers ثابتة وsticky ممكن تغطي عناصر مركّزة لما الصفحة تتمرر. scroll-padding-top على html بيزحزح روابط anchor وfocus scroll-into-view تحت chrome الثابت.",
        ),
        L(
          "Modals positioned with fixed need focus trap and aria-modal. Background content behind a high z-index overlay remains in the tab order unless inert or aria-hidden is applied.",
          "Modals بـ fixed محتاجة focus trap وaria-modal. المحتوى خلف overlay z-index عالي لسه في ترتيب Tab إلا لو طُبّق inert أو aria-hidden.",
        ),
      ],
      {
        bullets: [
          L("Set scroll-padding-top to match fixed header height", "حط scroll-padding-top يطابق ارتفاع header الثابت"),
          L("Trap focus inside modals and restore focus on close", "احبس focus داخل modals وارجّع focus عند الإغلاق"),
          L("Do not rely on z-index alone to hide interactive content from AT", "متعتمدش على z-index لوحده لإخفاء محتوى تفاعلي من AT"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "position:absolute content off-screen is a known spam technique — crawlers may discount or penalize hidden text. Use absolute positioning for UI affordances, not to stuff keywords.",
          "محتوى position:absolute خارج الشاشة تقنية spam معروفة — الزواحف ممكن تخصم أو تعاقب نص مخفي. استخدم absolute positioning لعناصر واجهة، مش لحشو كلمات مفتاحية.",
        ),
        L(
          "Sticky nav improves internal navigation UX, which supports engagement. Ensure fixed headers do not cover h1 or breadcrumb content on load.",
          "تنقل sticky بيحسّن UX التنقل الداخلي ويدعم التفاعل. تأكد إن headers الثابتة ما تغطيش h1 أو breadcrumb عند التحميل.",
        ),
      ],
      {
        bullets: [
          L("Never hide primary copy with off-screen absolute positioning", "متخفيش النسخ الأساسية بـ absolute positioning خارج الشاشة"),
          L("Keep breadcrumbs and h1 visible below sticky headers", "خلّي breadcrumbs وh1 ظاهرين تحت headers sticky"),
          L("Limit z-index arms races — they obscure stacking bugs and hurt maintainability", "قلّل حروب z-index — بتغطي أخطاء stacking وتضر الصيانة"),
        ],
      },
    ),
  },

  "responsive-media": {
    underTheHood: insight(
      [
        L(
          "Media queries are evaluated during style recalculation when viewport dimensions or user preferences change. Matching rules append to the cascade at the same specificity as their non-query counterparts.",
          "Media queries بتتقيّم أثناء style recalculation لما أبعاد viewport أو تفضيلات المستخدم تتغير. القواعد المطابقة بتتضاف للـ cascade بنفس specificity نظيراتها بدون query.",
        ),
        L(
          "Container queries (@container) resolve against a size container ancestor instead of the viewport. The container must establish containment (size, inline-size, or normal) for queries to apply.",
          "Container queries (@container) بتحل من أب size container بدل viewport. الحاوية لازم تنشئ containment (size أو inline-size أو normal) عشان الـ queries تتطبق.",
        ),
        L(
          "Preference media features (prefers-reduced-motion, prefers-color-scheme, prefers-contrast) map to OS settings and re-evaluate without a resize event.",
          "ميزات media التفضيلية (prefers-reduced-motion وprefers-color-scheme وprefers-contrast) بترتبط بإعدادات النظام وتُعاد تقييمها من غير حدث resize.",
        ),
      ],
      {
        bullets: [
          L(
            "min-width queries are inclusive — (min-width: 48rem) matches at exactly 48rem",
            "استعلامات min-width شاملة — (min-width: 48rem) بتطابق عند 48rem بالضبط",
          ),
          L(
            "Mobile-first stacks min-width overrides; desktop-first uses max-width to peel rules away",
            "Mobile-first يكدس تجاوزات min-width؛ desktop-first يستخدم max-width لسحب القواعد",
          ),
          L(
            "@container queries enable component-level breakpoints independent of viewport width",
            "@container queries بتفعّل breakpoints على مستوى المكوّن مستقلة عن عرض viewport",
          ),
          L(
            "prefers-reduced-motion: reduce should disable or shorten nonessential animations at the engine level",
            "prefers-reduced-motion: reduce لازم يعطّل أو يقصّر animations غير أساسية على مستوى المحرك",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Responsive layouts must work at 320px width and 400% zoom, not just designer breakpoints. Touch targets need adequate spacing at every matched media query branch.",
          "Layouts responsive لازم تشتغل عند عرض 320px وzoom 400%، مش breakpoints المصمم بس. أهداف اللمس محتاجة مسافات كافية عند كل فرع media query مطابق.",
        ),
        L(
          "Honor prefers-reduced-motion by removing parallax, large transitions, and infinite loops. Motion triggered only above certain breakpoints should still respect the preference.",
          "احترم prefers-reduced-motion بإزالة parallax وtransitions كبيرة وحلقات لا نهائية. الحركة اللي بتتشغل فوق breakpoints معينة لازم برضه تحترم التفضيل.",
        ),
      ],
      {
        bullets: [
          L("Test keyboard and screen reader at each major breakpoint", "اختبر الكيبورد وقارئ الشاشة عند كل breakpoint رئيسي"),
          L("Do not hide skip links or focus styles on small screens", "متخفيش skip links أو أنماط focus على الشاشات الصغيرة"),
          L("Support prefers-reduced-motion in all @media branches", "ادعم prefers-reduced-motion في كل فروع @media"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Google uses mobile-first indexing — the narrow viewport experience should contain the same primary content as desktop, not a stripped alternate.",
          "Google بيستخدم mobile-first indexing — تجربة viewport الضيق لازم فيها نفس المحتوى الأساسي زي desktop، مش نسخة مختصرة بديلة.",
        ),
        L(
          "Content-driven breakpoints reduce unnecessary CSS and layout thrash. Fluid grids with minmax often outperform dozens of device-named media queries for crawlable, consistent markup.",
          "Breakpoints مدفوعة بالمحتوى بتقلل CSS غير ضروري وlayout thrash. شبكات سائلة بـ minmax غالبًا أحسن من عشرات media queries بأسماء أجهزة لـ markup قابل للزحف ومتسق.",
        ),
      ],
      {
        bullets: [
          L("Serve the same HTML to all viewports — adapt with CSS, not separate URLs", "قدّم نفس HTML لكل viewports — تكيّف بـ CSS مش URLs منفصلة"),
          L("Avoid hiding H1 or main copy only on mobile", "تجنب إخفاء H1 أو النسخ الرئيسية على الموبايل بس"),
          L("Use srcset and sizes in HTML for responsive images — not CSS background alone", "استخدم srcset وsizes في HTML للصور المتجاوبة — مش خلفية CSS لوحدها"),
        ],
      },
    ),
  },

  "custom-properties": {
    underTheHood: insight(
      [
        L(
          "Custom properties are ordinary inherited properties stored on elements. Unlike preprocessor variables, they survive in the cascade and resolve where var() appears, typically at computed-value time.",
          "Custom properties خصائص موروثة عادية مخزنة على العناصر. بعكس متغيرات preprocessor، بتفضل في cascade وتتحل حيث يظهر var()، عادة وقت computed-value.",
        ),
        L(
          "var(--name, fallback) substitutes the fallback when the custom property is invalid or unset at the use site. Tokens can be redefined on a subtree without re-parsing the stylesheet.",
          "var(--name, fallback) بيستبدل fallback لما custom property غير صالحة أو غير معرّفة عند موقع الاستخدام. Tokens ممكن تُعاد تعريفها على subtree من غير إعادة parse للـ stylesheet.",
        ),
        L(
          "Registered custom properties (@property) can specify syntax, inheritance, and initial values, enabling typed animation of custom properties in supporting engines.",
          "Custom properties مسجّلة (@property) ممكن تحدد syntax ووراثة وقيم أولية، وتمكّن تحريك custom properties مكتوبة في محركات تدعم ذلك.",
        ),
      ],
      {
        bullets: [
          L(
            "Custom properties inherit like color — a child reads --token from the nearest defined ancestor",
            "Custom properties بتتورث زي color — الابن يقرأ --token من أقرب أب معرّف",
          ),
          L(
            "var() is resolved per property — one token can feed multiple declarations simultaneously",
            "var() بيتحل لكل خاصية — token واحد ممكن يغذي إعلانات متعددة معًا",
          ),
          L(
            "Runtime theme switches update computed styles without rebuilding the CSSOM from scratch",
            "تبديلات theme وقت التشغيل بتحدّث computed styles من غير إعادة بناء CSSOM من الصفر",
          ),
          L(
            "Invalid values at var() use the fallback or invalidate the whole property",
            "قيم غير صالحة عند var() بتستخدم fallback أو تبطل الخاصية كلها",
          ),
        ],
        code: `:root { --accent: #0284c7; }
.card { border-color: var(--accent, #64748b); }
.card--warn { --accent: #d97706; }`,
        codeCaption: L("Local --accent overrides inherit on the subtree", "تجاوز --accent محلي يورث على الشجرة الفرعية"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Theme tokens should preserve contrast in both light and dark schemes. Swapping --text and --surface without re-checking contrast breaks WCAG when prefers-color-scheme changes.",
          "tokens الثيم لازم تحافظ على التباين في الوضعين الفاتح والداكن. تبديل --text و--surface من غير إعادة فحص التباين بيكسر WCAG لما prefers-color-scheme يتغير.",
        ),
        L(
          "Focus ring tokens (--focus-ring) keep keyboard visibility consistent across components. Document token meaning in design systems so teams do not assign decorative colors to semantic slots.",
          "tokens حلقة focus (--focus-ring) بتخلي وضوح الكيبورد متسق عبر المكوّنات. وثّق معنى الـ token في أنظمة التصميم عشان الفرق ما تحطش ألوان زخرفية على فتحات دلالية.",
        ),
      ],
      {
        bullets: [
          L("Test token pairs at 4.5:1 in every theme variant", "اختبر أزواج tokens عند 4.5:1 في كل متغير ثيم"),
          L("Expose high-contrast overrides when prefers-contrast: more matches", "اعرض تجاوزات تباين عالي لما prefers-contrast: more يطابق"),
          L("Name tokens by role (--text-muted), not hex value (--gray-500)", "سمّي tokens بالدور (--text-muted)، مش قيمة hex (--gray-500)"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Custom properties do not hide content from crawlers — they are styling only. Critical copy must remain in HTML regardless of which --token colors it.",
          "Custom properties مش بتخفي محتوى من الزواحف — للتنسيق بس. النسخ الحرجة لازم تفضل في HTML بغض النظر عن --token اللي بيلونها.",
        ),
        L(
          "Dark mode via prefers-color-scheme avoids flash of wrong theme on load when tokens are defined in :root early. Late-injected theme CSS can cause CLS and brief unreadable contrast.",
          "الوضع الداكن عبر prefers-color-scheme بيتجنب وميض ثيم غلط عند التحميل لما tokens معرّفة في :root بدري. CSS ثيم متأخر ممكن يسبب CLS وتباين غير مقروء لفترة قصيرة.",
        ),
      ],
      {
        bullets: [
          L("Define theme tokens in critical CSS or early :root block", "عرّف theme tokens في CSS حرج أو كتلة :root مبكرة"),
          L("Do not put unique page copy inside content: on pseudo-elements fed by variables", "متحطش نسخ صفحة فريدة في content على pseudo-elements مغذاة بمتغيرات"),
          L("Semantic HTML structure is independent of token naming", "هيكل HTML الدلالي مستقل عن تسمية tokens"),
        ],
      },
    ),
  },

  "transitions-transforms": {
    underTheHood: insight(
      [
        L(
          "Transitions interpolate between old and new computed values over a duration when a property change is detected. Only properties listed in transition-property participate — others snap instantly.",
          "Transitions بتعمل interpolation بين computed values القديمة والجديدة على مدة لما يُكتشف تغيير خاصية. بس الخصائص في transition-property بتشارك — الباقي بيقفز فورًا.",
        ),
        L(
          "transform and opacity changes often run on the compositor thread without triggering layout or paint of siblings. width, height, and top changes typically force layout and are more expensive.",
          "تغييرات transform وopacity غالبًا بتشتغل على compositor thread من غير layout أو paint للإخوة. width وheight وtop عادة بتفرض layout وأغلى.",
        ),
        L(
          "Declaring transition on the resting state ensures enter, hover, focus, and exit paths share timing. Interrupted transitions blend from the current midpoint, not always from the start keyframe.",
          "إعلان transition على الحالة الساكنة بيضمن مسارات الدخول وhover وfocus والخروج تشارك التوقيت. transitions المقطوعة بتدمج من نقطة المنتصف الحالية، مش دايمًا من بداية keyframe.",
        ),
      ],
      {
        bullets: [
          L(
            "Compositor promotion creates a GPU layer — will-change: transform hints the engine ahead of animation",
            "ترقية compositor بتنشئ طبقة GPU — will-change: transform بيعطي تلميح للمحرك قبل التحريك",
          ),
          L(
            "transform establishes a containing block for fixed descendants and a new stacking context",
            "transform بتنشئ containing block لأبناء fixed وstacking context جديد",
          ),
          L(
            "transition-timing-function maps elapsed time to interpolation progress (ease, cubic-bezier)",
            "transition-timing-function بيربط الوقت المنقضي بتقدم interpolation (ease أو cubic-bezier)",
          ),
          L(
            "Multiple properties can share one transition shorthand with comma-separated durations",
            "خصائص متعددة ممكن تشارك transition shorthand واحد بمدد مفصولة بفواصل",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Motion from transforms can trigger vestibular symptoms. prefers-reduced-motion: reduce should set transition: none or replace movement with opacity-only feedback.",
          "حركة من transforms ممكن تسبب أعراض جهاز الاتزان. prefers-reduced-motion: reduce لازم يحط transition: none أو يستبدل الحركة بـ feedback بالشفافية فقط.",
        ),
        L(
          "Transitions must not be the only indicator of success or error. Pair animated state changes with text, aria-live announcements, or persistent visual cues.",
          "Transitions ما تكونش المؤشر الوحيد للنجاح أو الخطأ. اقترن تغييرات الحالة المتحركة بنص أو إعلانات aria-live أو إشارات بصرية دائمة.",
        ),
      ],
      {
        bullets: [
          L("Wrap decorative motion in @media (prefers-reduced-motion: no-preference)", "لف الحركة الزخرفية في @media (prefers-reduced-motion: no-preference)"),
          L("Keep focus indicators instant or high-contrast — do not fade them in slowly", "خلّي مؤشرات focus فورية أو عالية التباين — متظهرهاش ببطء"),
          L("Limit parallax and large translateY on scroll for accessibility", "قلّل parallax وtranslateY كبير عند التمرير للوصول"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Compositor-friendly animations rarely block the main thread, which helps INP on interactive pages. Layout-thrashing hover effects on long lists can delay input response.",
          "animations صديقة compositor نادرًا ما توقف main thread، وده بيساعد INP على صفحات تفاعلية. تأثيرات hover اللي تعمل layout thrash على قوائم طويلة ممكن تأخر استجابة الإدخال.",
        ),
        L(
          "Content hidden with transform: scale(0) or off-screen translate is still in the DOM. Do not use transforms to conceal primary text from users while leaving it for crawlers.",
          "محتوى مخفي بـ transform: scale(0) أو translate خارج الشاشة لسه في DOM. متستخدمش transforms لإخفاء نص أساسي عن المستخدمين وتركه للزواحف.",
        ),
      ],
      {
        bullets: [
          L("Animate transform and opacity — not width or margin — on hot paths", "حرّك transform وopacity — مش width أو margin — على المسارات الساخنة"),
          L("Avoid infinite decorative transitions on above-the-fold hero regions", "تجنب transitions زخرفية لا نهائية على مناطق hero فوق الطية"),
          L("Test Lighthouse performance with motion enabled and disabled", "اختبر أداء Lighthouse مع الحركة مفعّلة ومعطّلة"),
        ],
      },
    ),
  },

  "css-animations": {
    underTheHood: insight(
      [
        L(
          "@keyframes define intermediate computed values at percentage offsets along a timeline. The animation property binds a keyframe name to duration, timing, iteration count, direction, and fill mode.",
          "@keyframes بتحدد computed values وسيطة عند نسب مئوية على خط زمني. خاصية animation بتربط اسم keyframe بمدة وتوقيت وعدد تكرار واتجاه وfill mode.",
        ),
        L(
          "animation-fill-mode: forwards retains the last keyframe computed values after the animation ends; backwards applies the first keyframe before start. both combines the two.",
          "animation-fill-mode: forwards بيحتفظ بآخر computed values من keyframe بعد انتهاء animation؛ backwards يطبق أول keyframe قبل البداية. both يجمع الاثنين.",
        ),
        L(
          "CSS animations and the Web Animations API can run on the compositor for transform and opacity. Main-thread animations on layout properties can drop frames during scroll.",
          "CSS animations وWeb Animations API ممكن يشتغلوا على compositor لـ transform وopacity. animations على main thread لخصائص layout ممكن تفقد إطارات أثناء التمرير.",
        ),
      ],
      {
        bullets: [
          L(
            "0% and 100% keyframes map to animation start and end; from/to are aliases",
            "keyframes 0% و100% بترتبط ببداية ونهاية animation؛ from/to أسماء بديلة",
          ),
          L(
            "animation-iteration-count: infinite loops until removed or paused",
            "animation-iteration-count: infinite بيلف لحد الإزالة أو الإيقاف المؤقت",
          ),
          L(
            "animation-play-state: paused freezes at the current computed value",
            "animation-play-state: paused بيجمّد عند computed value الحالي",
          ),
          L(
            "Multiple animations on one element run in parallel, comma-separated in the shorthand",
            "animations متعددة على عنصر واحد بتشتغل بالتوازي، مفصولة بفواصل في shorthand",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Infinite or large looping animations distract readers and harm users with vestibular disorders. prefers-reduced-motion should replace loops with a static end state or instant completion.",
          "animations متكررة أو حلقات كبيرة بتشتت القراء وتضر مستخدمي اضطرابات الاتزان. prefers-reduced-motion لازم يستبدل الحلقات بحالة نهائية ثابتة أو إكمال فوري.",
        ),
        L(
          "Loading spinners need accessible names (aria-busy, aria-label) because motion alone does not convey status to screen readers. Pause nonessential animation when the tab is hidden with visibility API or animation-play-state.",
          "spinners التحميل محتاجة أسماء وصول (aria-busy أو aria-label) لأن الحركة لوحدها ما توصلش الحالة لقارئات الشاشة. أوقف animation غير أساسية لما التبويب مخفي.",
        ),
      ],
      {
        bullets: [
          L("Provide a static alternative under prefers-reduced-motion: reduce", "وفّر بديل ثابت تحت prefers-reduced-motion: reduce"),
          L("Label progress and loading animations for assistive technology", "سمّي animations التقدم والتحميل للتقنيات المساعدة"),
          L("Avoid flashing more than three times per second — seizure risk", "تجنب الوميض أكثر من ثلاث مرات في الثانية — خطر نوبات"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Decorative animations do not add indexable content. Meaningful status should appear in HTML text, not only in animated bars or icons.",
          "animations الزخرفية ما بتضيفش محتوى قابل للفهرسة. الحالة ذات المعنى لازم تظهر في نص HTML، مش بس في أشرطة أو أيقونات متحركة.",
        ),
        L(
          "Heavy infinite animations on LCP elements compete for main-thread time and can delay paint. Defer decorative motion until after first contentful paint when possible.",
          "animations لا نهائية ثقيلة على عناصر LCP بتنافس وقت main thread وممكن تأخر paint. أجّل الحركة الزخرفية لما يمكن بعد first contentful paint.",
        ),
      ],
      {
        bullets: [
          L("Expose load and error state in visible text, not animation alone", "اعرض حالة التحميل والخطأ في نص ظاهر، مش animation لوحده"),
          L("Pause off-screen animations to save battery and main-thread budget", "أوقف animations خارج الشاشة لتوفير البطارية وميزانية main thread"),
          L("Use CSS animation for UI polish — not to inject primary copy", "استخدم CSS animation لتلميع الواجهة — مش لحقن النسخ الأساسية"),
        ],
      },
    ),
  },

  "logical-properties": {
    underTheHood: insight(
      [
        L(
          "Logical properties map to physical sides during style computation using the element writing-mode and direction. margin-inline-start becomes margin-left in horizontal-tb ltr and margin-right in horizontal-tb rtl.",
          "الخصائص المنطقية بتتحول لجوانب فيزيائية أثناء style computation باستخدام writing-mode وdirection للعنصر. margin-inline-start بتبقى margin-left في horizontal-tb ltr وmargin-right في horizontal-tb rtl.",
        ),
        L(
          "block-size and inline-size replace width and height in vertical writing modes — the same declaration adapts without a separate stylesheet per direction.",
          "block-size وinline-size بيستبدلوا width وheight في أوضاع كتابة عمودية — نفس الإعلان يتكيف من غير stylesheet منفصلة لكل اتجاه.",
        ),
        L(
          "Percentage resolution on logical axes uses the containing block inline or block size, which flips with writing-mode on the element or ancestor.",
          "حل النسب على المحاور المنطقية بيستخدم حجم inline أو block لـ containing block، اللي بيتقلب مع writing-mode على العنصر أو الأب.",
        ),
      ],
      {
        bullets: [
          L(
            "writing-mode: vertical-rl swaps which physical edge is block-start",
            "writing-mode: vertical-rl بيبدّل أي حافة فيزيائية هي block-start",
          ),
          L(
            "direction: rtl on an element flips inline-start and inline-end mapping",
            "direction: rtl على عنصر بيقلب ربط inline-start وinline-end",
          ),
          L(
            "inset-inline and margin-inline are shorthands for start and end longhands",
            "inset-inline وmargin-inline اختصارات لـ longhands البداية والنهاية",
          ),
          L(
            "border-start-start-radius targets the corner at block-start and inline-start",
            "border-start-start-radius تستهدف الزاوية عند block-start وinline-start",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Logical CSS complements HTML dir and lang — it does not set language or reading direction. Screen readers use the document and element lang attributes for pronunciation and navigation.",
          "CSS المنطقي يكمل dir وlang في HTML — مش بيحدد اللغة أو اتجاه القراءة. قارئات الشاشة بتستخدم lang للمستند والعنصر للنطق والتنقل.",
        ),
        L(
          "Mirroring only padding while leaving iconography or asymmetric affordances unchanged can confuse RTL users. Test mixed Arabic and English paragraphs, not isolated mirrored screenshots.",
          "عكس padding بس وترك الأيقونات أو عناصر التفاعل غير المتماثلة زي ما هي ممكن يلخبط مستخدمي RTL. اختبر فقرات عربية وإنجليزية مخلوطة، مش screenshots معكوسة معزولة.",
        ),
      ],
      {
        bullets: [
          L("Set dir and lang on html or localized subtrees in markup", "حط dir وlang على html أو subtrees محلية في markup"),
          L("Keep focus order aligned with inline reading direction", "خلّي ترتيب focus متوافق مع اتجاه القراءة inline"),
          L("Flip directional icons (chevrons, back arrows) in RTL contexts", "اقلب الأيقونات الاتجاهية (chevrons وأسهم الرجوع) في سياقات RTL"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "hreflang and lang metadata tell crawlers which locale a page serves. Logical layout keeps presentation correct but does not replace language signals in HTML.",
          "hreflang وlang metadata بيقولوا للزواحف أي locale تخدمه الصفحة. التخطيط المنطقي يحافظ على العرض الصح لكن ما يستبدلش إشارات اللغة في HTML.",
        ),
        L(
          "One HTML template with logical CSS scales to RTL markets without duplicate URLs or mirrored markup forks — cleaner for canonical and maintenance.",
          "قالب HTML واحد مع CSS منطقي يتوسع لأسواق RTL من غير URLs مكررة أو فروع markup معكوسة — أنظف للـ canonical والصيانة.",
        ),
      ],
      {
        bullets: [
          L("Use hreflang links for each localized URL variant", "استخدم روابط hreflang لكل متغير URL محلي"),
          L("Avoid separate LTR-only and RTL-only DOM trees for the same content", "تجنب أشجار DOM LTR وRTL منفصلة لنفس المحتوى"),
          L("Keep translated headings in HTML — logical CSS only adjusts spacing", "خلّي العناوين المترجمة في HTML — CSS المنطقي يعدّل المسافات بس"),
        ],
      },
    ),
  },

  "css-common-pitfalls": {
    underTheHood: insight(
      [
        L(
          "Most CSS bugs are cascade or containing-block mismatches, not parser errors. The engine applies exactly what the cascade resolves — the wrong mental model makes valid CSS look broken.",
          "معظم أخطاء CSS هي عدم تطابق cascade أو containing block، مش أخطاء parser. المحرك بيطبق بالضبط ما يحلّه cascade — النموذج الذهني الغلط يخلي CSS صحيحة تبان معطوبة.",
        ),
        L(
          "A single property change can trigger a long invalidation chain: style recalc, layout, paint, and composite. Fixing the root cause (box model, flow, specificity) beats stacking overrides.",
          "تغيير خاصية واحدة ممكن يشغّل سلسلة invalidation طويلة: style recalc وlayout وpaint وcomposite. إصلاح السبب الجذري (box model أو flow أو specificity) أحسن من تكديس overrides.",
        ),
        L(
          "DevTools computed panel shows the winning value after cascade, inheritance, and used-value steps — it is the ground truth for debugging, not the stylesheet source order alone.",
          "لوحة computed في DevTools بتعرض القيمة الفائزة بعد cascade والوراثة وخطوات used-value — هي الحقيقة للتصحيح، مش ترتيب مصدر stylesheet لوحده.",
        ),
      ],
      {
        bullets: [
          L(
            "Unexpected width often traces to content-box + padding + border, not a broken width declaration",
            "عرض غير متوقع غالبًا من content-box + padding + border، مش إعلان width معطوب",
          ),
          L(
            "Absolute children anchor to the nearest positioned ancestor — missing position: relative on the intended parent is a common bug",
            "أطفال absolute يتربطوا بأقرب أب positioned — نسيان position: relative على الأب المقصود خطأ شائع",
          ),
          L(
            "!important wins locally but poisons future cascade layers — specificity fixes scale better",
            "!important يفوز محليًا لكن يسمّم طبقات cascade المستقبلية — إصلاحات specificity تتوسع أحسن",
          ),
          L(
            "Flex overflow often needs min-width: 0 on the shrinking child, not overflow: hidden on the parent alone",
            "overflow في flex غالبًا محتاج min-width: 0 على الابن اللي بيصغر، مش overflow: hidden على الأب لوحده",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Pitfalls that remove focus styles or rely on hover-only feedback exclude keyboard and assistive technology users. Every interactive fix should include :focus-visible parity.",
          "أخطاء تشيل أنماط focus أو تعتمد على feedback للـ hover بس بتستبعد مستخدمي الكيبورد والتقنيات المساعدة. كل إصلاح تفاعلي لازم يشمل :focus-visible.",
        ),
        L(
          "Fixed pixel widths and 100vh heroes break at zoom and on small viewports, clipping controls users need to complete tasks. Fluid min() patterns preserve operability.",
          "عروض px ثابتة وheroes 100vh بتتكسر عند zoom وعلى شاشات صغيرة وتقص عناصر تحكم المستخدم محتاجها. أنماط min() السائلة تحافظ على قابلية التشغيل.",
        ),
      ],
      {
        bullets: [
          L("Never fix hover styles by removing outline on :focus", "متصلحش أنماط hover بإزالة outline على :focus"),
          L("Replace margin-collapse hacks with gap in flex or grid", "استبدل حيل اندماج margin بـ gap في flex أو grid"),
          L("Test keyboard navigation after every layout fix", "اختبر تنقل الكيبورد بعد كل إصلاح layout"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Layout bugs that hide headings, clip article text, or push content below endless scroll hurt engagement and crawl quality signals. Stable box model and flow keep primary copy visible.",
          "أخطاء layout تخفي عناوين أو تقص نص مقال أو تدفع محتوى تحت scroll لا نهائي بتضر engagement وإشارات جودة الزحف. box model وflow ثابتين يخلّوا النسخ الأساسية ظاهرة.",
        ),
        L(
          "z-index wars and !important stacks increase CSS payload and recalc cost on large pages, indirectly affecting performance scores crawlers and users notice.",
          "حروب z-index و/stacks !important بتكبّر حمولة CSS وتكلفة recalc على صفحات كبيرة، وتأثر بشكل غير مباشر على درجات الأداء اللي الزواحف والمستخدمين يلاحظوها.",
        ),
      ],
      {
        bullets: [
          L("Fix root layout causes before adding SEO-visible content wrappers", "اصلح أسباب layout الجذرية قبل إضافة wrappers محتوى ظاهرة لـ SEO"),
          L("Keep H1 and article body in normal flow and visible at all breakpoints", "خلّي H1 وجسم المقال في normal flow وظاهرين عند كل breakpoints"),
          L("Measure CLS after fixing box model and viewport height pitfalls", "قِس CLS بعد إصلاح أخطاء box model وارتفاع viewport"),
        ],
      },
    ),
  },

  "css-cheatsheet": {
    underTheHood: insight(
      [
        L(
          "Every cheatsheet pattern compiles to the same engine primitives: formatting contexts, cascade layers, used-value resolution, and paint phases. Copying a snippet applies those mechanics whether or not you name them.",
          "كل نمط في cheatsheet يترجم لنفس بدائيات المحرك: formatting contexts وطبقات cascade وحل used-value ومراحل paint. نسخ snippet يطبق هذه الميكانيكا سواء سمّيتها أو لا.",
        ),
        L(
          "Shorthand properties expand into longhands before cascade comparison — order within the shorthand matters when values override each other in the same declaration.",
          "خصائص shorthand تتوسع لـ longhands قبل مقارنة cascade — الترتيب داخل shorthand مهم لما القيم تتجاوز بعض في نفس الإعلان.",
        ),
        L(
          "Tailwind and utility classes are thin aliases over standard CSS. The cascade still resolves them with the same specificity and source-order rules as hand-written declarations.",
          "Tailwind وفئات utility أسماء مستعارة رفيعة فوق CSS قياسي. cascade لسه بيحلّها بنفس specificity وقواعد ترتيب المصدر زي الإعلانات المكتوبة يدويًا.",
        ),
      ],
      {
        bullets: [
          L(
            "display: flex and display: grid create new formatting contexts with different measurement algorithms",
            "display: flex وdisplay: grid ينشئوا formatting contexts جديدة بخوارزميات قياس مختلفة",
          ),
          L(
            "Token snippets using var() resolve at computed-value time on the element subtree",
            "snippets tokens بـ var() تتحل وقت computed-value على subtree العنصر",
          ),
          L(
            "Motion snippets should gate on prefers-reduced-motion at the same specificity as the animation",
            "snippets الحركة لازم تتبوّب على prefers-reduced-motion بنفس specificity الـ animation",
          ),
          L(
            "Reset snippets (*, ::before, ::before) affect inheritance and pseudo-element defaults globally",
            "snippets reset (* و::before) بتأثر على الوراثة وافتراضات pseudo-elements عالميًا",
          ),
        ],
      },
    ),
    accessibility: insight(
      [
        L(
          "Copied layout snippets rarely include focus styles. Paste patterns for buttons, links, and cards, then add :focus-visible rules before shipping.",
          "snippets layout المنسوخة نادرًا ما تشمل أنماط focus. الصق أنماط أزرار وروابط وكروت، وبعدين ضيف قواعد :focus-visible قبل النشر.",
        ),
        L(
          "Cheatsheet grids and flex rows need testing at 200% zoom and with keyboard-only navigation. A compact desktop snippet may overflow or trap focus on mobile.",
          "شبكات وصفوف flex في cheatsheet محتاجة اختبار عند zoom 200% وتنقل كيبورد فقط. snippet desktop مضغوط ممكن يفيض أو يحبس focus على الموبايل.",
        ),
      ],
      {
        bullets: [
          L("Add focus-visible styles to every copied interactive pattern", "ضيف أنماط focus-visible لكل نمط تفاعلي منسوخ"),
          L("Verify contrast when swapping token values in a snippet", "تحقق من التباين لما تبدّل قيم tokens في snippet"),
          L("Include skip links and landmarks in page shell snippets", "ضمّن skip links وlandmarks في snippets هيكل الصفحة"),
        ],
      },
    ),
    seo: insight(
      [
        L(
          "Snippets style existing HTML — they do not create indexable content. Pair card and hero patterns with semantic markup (article, h1, p) in the document.",
          "Snippets تنسّق HTML موجود — ما بتنشئش محتوى قابل للفهرسة. اقترن أنماط كروت وhero بـ markup دلالي (article وh1 وp) في المستند.",
        ),
        L(
          "Performance-oriented snippets (contain, content-visibility) affect when off-screen content paints. Use them on long lists, not on above-the-fold hero copy crawlers need immediately.",
          "snippets موجهة للأداء (contain وcontent-visibility) بتأثر على متى يُرسم المحتوى خارج الشاشة. استخدمها على قوائم طويلة، مش على نسخ hero فوق الطية اللي الزواحف محتاجاها فورًا.",
        ),
      ],
      {
        bullets: [
          L("Wrap snippet markup in semantic tags before publishing", "لف markup الـ snippet في tags دلالية قبل النشر"),
          L("Do not paste decorative-only patterns where H1 or main text should live", "متلصقش أنماط زخرفية فقط حيث لازم يعيش H1 أو النص الرئيسي"),
          L("Adapt fluid sizing snippets — do not ship fixed pixel widths from cards blindly", "عدّل snippets المقاسات السائلة — متنشرش عروض px ثابتة من الكروت بلا تفكير"),
        ],
      },
    ),
  },

};
