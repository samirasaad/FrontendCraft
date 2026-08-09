import type { Locale, LocalizedString } from "@/lib/types";

export const ui = {
  brand: { en: "FrontendCraft", ar: "FrontendCraft" },
  hubTagline: {
    en: "Learn frontend by building, not watching.",
    ar: "تعلّم تطوير الواجهات بالبناء، لا بالمشاهدة.",
  },
  heroWidgetEyebrow: {
    en: "Live concept",
    ar: "مفهوم مباشر",
  },
  heroWidgetTitle: {
    en: "Event Loop",
    ar: "Event Loop",
  },
  heroWidgetCaption: {
    en: "Stack runs now — Queue waits — Loop connects them.",
    ar: "يعمل Call Stack الآن — Queue ينتظر — Event Loop يربط بينهما.",
  },
  chooseTrack: {
    en: "Choose your track",
    ar: "اختر مسارك",
  },
  chooseTrackHint: {
    en: "Build frontend skills that stick — lessons, challenges, playgrounds.",
    ar: "ابنِ مهارات تطوير واجهات دائمة — دروس، تحديات، وملاعب تطبيقية.",
  },
  trackPathLabel: {
    en: "Live now",
    ar: "متاح الآن",
  },
  trackUpcomingLabel: {
    en: "Coming up",
    ar: "قريبًا",
  },
  trackPathNav: {
    en: "Tracks",
    ar: "المسارات",
  },
  trackStartCta: {
    en: "Start with HTML",
    ar: "ابدأ بـ HTML",
  },
  trackEnter: {
    en: "Start learning",
    ar: "ابدأ التعلّم",
  },
  trackPeekLabel: {
    en: "Live concept",
    ar: "مفهوم مباشر",
  },
  trackStartHere: {
    en: "Start here",
    ar: "ابدأ من هنا",
  },
  trackLive: {
    en: "Live",
    ar: "متاح",
  },
  trackLockedHint: {
    en: "Opens soon",
    ar: "قريبًا",
  },
  trackUtilityLabel: {
    en: "Optional speed layer",
    ar: "طبقة سرعة اختيارية",
  },
  trackUtilityHint: {
    en: "Tailwind isn't another language. It's simply a faster way to write CSS once you understand CSS itself.",
    ar: "Tailwind ليس لغة جديدة — إنه طريقة أسرع لكتابة CSS بعد فهم CSS نفسه.",
  },
  trackJobHtml: { en: "Structure", ar: "البنية" },
  trackJobCss: { en: "Styling", ar: "التنسيق" },
  trackJobJs: { en: "Behavior", ar: "السلوك" },
  trackJobReact: { en: "Components", ar: "المكونات" },
  trackJobTw: { en: "Faster CSS", ar: "CSS أسرع" },
  trackJobA11y: { en: "Inclusive UI", ar: "واجهة شاملة" },
  trackJobSeo: { en: "Discoverability", ar: "الظهور في البحث" },
  trackJobHtmlHint: {
    en: "What the browser reads before anything looks good.",
    ar: "ما يقرأه المتصفح قبل أن يبدو أي شيء جيدًا.",
  },
  trackJobCssHint: {
    en: "Why a page feels like a product, not a bare document.",
    ar: "لماذا تبدو الصفحة كمنتج وليس كمستند فارغ.",
  },
  trackJobJsHint: {
    en: "How clicks, forms, and live updates actually work.",
    ar: "كيف تعمل النقرات والنماذج والتحديثات المباشرة.",
  },
  trackJobReactHint: {
    en: "Build once as a component — reuse it anywhere in the app.",
    ar: "ابنِ مرة كمكوّن — وأعد استخدامه في أي مكان بالتطبيق.",
  },
  trackJobTwHint: {
    en: "A faster way to write CSS once you understand CSS itself.",
    ar: "طريقة أسرع لكتابة CSS بعد فهم CSS نفسه.",
  },
  trackJobA11yHint: {
    en: "Same product — more people can complete the task.",
    ar: "نفس المنتج — المزيد من المستخدمين يمكنهم إكمال المهمة.",
  },
  trackJobSeoHint: {
    en: "Help the right people find what you built.",
    ar: "ساعد الأشخاص المناسبين في العثور على ما بنيته.",
  },
  trackJobHtmlBody: {
    en: "HTML is the document. You place content in tags so the browser knows what is a heading, what is a paragraph, and what is a button — structure and meaning, with no styling yet.",
    ar: "HTML هو المستند. تضع المحتوى في وسوم ليعرف المتصفح ما هو العنوان وما هي الفقرة وما هو الزر — بنية ومعنى، دون تنسيق بعد.",
  },
  trackJobCssBody: {
    en: "CSS is the look layer. Same HTML stays in place; you add color, spacing, type, and radius until the bare document feels like a real product UI.",
    ar: "CSS هي طبقة المظهر. يبقى HTML كما هو؛ تضيف اللون والمسافات والخطوط والحواف حتى يصبح المستند واجهة منتج حقيقية.",
  },
  trackJobJsBody: {
    en: "JavaScript is behavior. When the user clicks, an event runs, state changes, and the UI updates — the page stops being a static picture.",
    ar: "JavaScript هو السلوك. عند النقر يعمل حدث، تتغير الحالة، وتتحدث الواجهة — الصفحة لا تبقى صورة ثابتة.",
  },
  trackJobReactBody: {
    en: "React packages HTML, CSS, and JS into reusable components. You build SaveCard once, pass props, and drop it anywhere the app needs that same UI.",
    ar: "React يجمع HTML و CSS و JS في مكونات قابلة لإعادة الاستخدام. تبني SaveCard مرة، تمرر props، وتضعه حيث يحتاج التطبيق نفس الواجهة.",
  },
  trackJobTwBody: {
    en: "Tailwind is still CSS — just written as utilities in your markup (`flex`, `gap-2`, `rounded-xl`) so you ship the same look with less custom stylesheet work.",
    ar: "Tailwind هو CSS أيضًا — مكتوب كـ utilities في markup (`flex` و `gap-2` و `rounded-xl`) للحصول على نفس المظهر بجهد أقل في ملفات الأنماط.",
  },
  trackJobA11yBody: {
    en: "Accessibility makes the UI usable with keyboard, screen readers, and clear contrast. Same product — more people can complete the task.",
    ar: "إمكانية الوصول تجعل الواجهة قابلة للاستخدام بلوحة المفاتيح وقارئ الشاشة وتباين واضح. نفس المنتج — المزيد من المستخدمين يمكنهم إكمال المهمة.",
  },
  trackJobSeoBody: {
    en: "SEO is how search engines read your page: clear titles, meta descriptions, and meaningful structure so the right people can find what you built.",
    ar: "SEO هو كيف تقرأ محركات البحث صفحتك: عناوين واضحة وبيانات وصفية وبنية ذات معنى حتى يجد الأشخاص المناسبون ما بنيته.",
  },
  trackCapHtml0: {
    en: "Start from an empty document…",
    ar: "ابدأ من مستند فارغ…",
  },
  trackCapHtml1: {
    en: "Add a heading — meaning first.",
    ar: "أضف عنوانًا — المعنى أولًا.",
  },
  trackCapHtml2: {
    en: "Add supporting text under it.",
    ar: "أضف نصًا توضيحيًا تحته.",
  },
  trackCapHtml3: {
    en: "Add a control the user can press.",
    ar: "أضف عنصر تحكم يمكن للمستخدم النقر عليه.",
  },
  trackCapCss0: {
    en: "Bones only — structure with no paint.",
    ar: "البنية فقط — بدون تنسيق.",
  },
  trackCapCss1: {
    en: "CSS paints color, space, and radius.",
    ar: "CSS يضيف اللون والمسافات والحواف.",
  },
  trackCapCss2: {
    en: "Same content — now it looks like a product.",
    ar: "نفس المحتوى — الآن يبدو كمنتج.",
  },
  trackCapJs0: {
    en: "Looks ready — still static.",
    ar: "يبدو جاهزًا — لا يزال ثابتًا.",
  },
  trackCapJs1: {
    en: "A click fires an event…",
    ar: "النقرة تشغّل حدثًا…",
  },
  trackCapJs2: {
    en: "…JavaScript updates state.",
    ar: "…JavaScript يحدّث الحالة.",
  },
  trackCapJs3: {
    en: "UI re-renders — the button says Saved.",
    ar: "الواجهة تعيد الرسم — الزر يعرض Saved.",
  },
  trackCapReact0: {
    en: "Define SaveCard once…",
    ar: "عرّف SaveCard مرة…",
  },
  trackCapReact1: {
    en: "Reuse it anywhere in the tree.",
    ar: "أعد استخدامه في أي مكان بالشجرة.",
  },
  trackCapReact2: {
    en: "Same props and behavior — two places.",
    ar: "نفس props والسلوك — في مكانين.",
  },
  trackCapTw0: {
    en: "Write utilities instead of a long stylesheet…",
    ar: "اكتب utilities بدل ملف أنماط طويل…",
  },
  trackCapTwApply: {
    en: "Apply",
    ar: "طبّق",
  },
  trackCapTwDone: {
    en: "Same CSS result — quicker to ship.",
    ar: "نفس نتيجة CSS — أسرع في الإنجاز.",
  },
  trackCapA11y0: {
    en: "Looks fine — but can everyone use it?",
    ar: "يبدو جيدًا — لكن هل يمكن للجميع استخدامه؟",
  },
  trackCapA11y1: {
    en: "Add a visible keyboard focus ring.",
    ar: "أضف حلقة تركيز واضحة للوحة المفاتيح.",
  },
  trackCapA11y2: {
    en: "Name the control for assistive tech.",
    ar: "سمّ عنصر التحكم لتقنيات المساعدة.",
  },
  trackCapA11y3: {
    en: "Now keyboard and screen readers can Save.",
    ar: "الآن يمكن للوحة المفاتيح وقارئ الشاشة الحفظ.",
  },
  trackCapSeo0: {
    en: "A page with no search signals…",
    ar: "صفحة بلا إشارات بحث…",
  },
  trackCapSeo1: {
    en: "Write a clear title for the result.",
    ar: "اكتب عنوانًا واضحًا لنتيجة البحث.",
  },
  trackCapSeo2: {
    en: "Add a meta description under it.",
    ar: "أضف وصفًا meta تحته.",
  },
  trackCapSeo3: {
    en: "Search can preview — and people can click.",
    ar: "يمكن للبحث عرض معاينة — والمستخدمون يمكنهم النقر.",
  },
  trackJobDemoLabel: {
    en: "What you'll build",
    ar: "ما ستبنيه",
  },
  browseTracks: {
    en: "Browse all tracks",
    ar: "استعرض جميع المسارات",
  },
  backHome: {
    en: "Home",
    ar: "الرئيسية",
  },
  roadmapTitle: {
    en: "How a real UI is built",
    ar: "كيف تُبنى واجهة حقيقية",
  },
  roadmapHint: {
    en: "Structure → styling → behavior, then React components. Same UI grows in order.",
    ar: "البنية → التنسيق → السلوك، ثم مكونات React. نفس الواجهة تنمو بالترتيب.",
  },
  roadmapHtmlTitle: {
    en: "HTML — what the browser reads first",
    ar: "HTML — ما يقرأه المتصفح أولًا",
  },
  roadmapHtmlBody: {
    en: "Every page starts here. You place content in tags so the browser knows what's a heading, a paragraph, and a button — meaning before any styling.",
    ar: "كل صفحة تبدأ من هنا. تضع المحتوى في وسوم ليعرف المتصفح ما هو العنوان والفقرة والزر — المعنى قبل أي تنسيق.",
  },
  roadmapCssTitle: {
    en: "CSS — why it looks like a product",
    ar: "CSS — لماذا يبدو كمنتج",
  },
  roadmapCssBody: {
    en: "Structure alone isn't enough. Spacing, color, type, and layout turn a bare document into UI people actually want to use.",
    ar: "البنية وحدها لا تكفي. المسافات واللون والخطوط والتخطيط تحوّل المستند الفارغ إلى واجهة يريد المستخدمون استخدامها.",
  },
  roadmapJsTitle: {
    en: "JavaScript — how the page reacts",
    ar: "JavaScript — كيف تتفاعل الصفحة",
  },
  roadmapJsBody: {
    en: "Without this, nothing responds. Listen for a click, update state, change the UI — the page stops being a static picture.",
    ar: "بدونه لا شيء يستجيب. استمع للنقرة، حدّث الحالة، غيّر الواجهة — الصفحة لا تبقى صورة ثابتة.",
  },
  roadmapReactTitle: {
    en: "React — build once, reuse everywhere",
    ar: "React — ابنِ مرة وأعد الاستخدام في كل مكان",
  },
  roadmapReactBody: {
    en: "Still HTML, CSS, and JS — organized into reusable components with props and state, so the same Save card can live anywhere in an app.",
    ar: "لا يزال HTML و CSS و JS — منظّمين في مكونات قابلة لإعادة الاستخدام مع props و state، حتى يمكن استخدام نفس البطاقة في أي مكان بالتطبيق.",
  },
  roadmapPreviewHtml: {
    en: "Step: structure. A title, a line of text, and a button — the browser knows what each piece means.",
    ar: "الخطوة: البنية. عنوان وسطر نص وزر — المتصفح يعرف معنى كل جزء.",
  },
  roadmapPreviewCss: {
    en: "Step: styling. Spacing, color, and radius turn bare tags into a readable card.",
    ar: "الخطوة: التنسيق. المسافات واللون والحواف تحوّل الوسوم إلى بطاقة مقروءة.",
  },
  roadmapPreviewJs: {
    en: "Step: behavior. A click runs JS, state flips to “Saved”, and the button label updates.",
    ar: "الخطوة: السلوك. النقرة تشغّل JS، الحالة تصبح Saved، ونص الزر يتحدّث.",
  },
  roadmapPreviewReact: {
    en: "Step: components. Same card and behavior — wrapped as <SaveCard /> with reusable props and state.",
    ar: "الخطوة: المكونات. نفس البطاقة والسلوك — ملفوفة في <SaveCard /> مع props و state قابلة لإعادة الاستخدام.",
  },
  roadmapPreviewLabel: {
    en: "Watch the same UI grow",
    ar: "شاهد نمو الواجهة نفسها",
  },
  roadmapJobStructure: { en: "Structure", ar: "البنية" },
  roadmapJobLook: { en: "Styling", ar: "التنسيق" },
  roadmapJobBehavior: { en: "Behavior", ar: "السلوك" },
  roadmapJobComponents: { en: "Components", ar: "المكونات" },
  roadmapDemoTitle: {
    en: "Welcome back",
    ar: "مرحبًا بعودتك",
  },
  roadmapDemoBody: {
    en: "Save your progress and keep learning.",
    ar: "احفظ تقدمك وتابع التعلّم.",
  },
  roadmapDemoBtnIdle: { en: "Save", ar: "احفظ" },
  roadmapDemoBtnDone: { en: "Saved ✓", ar: "تم الحفظ ✓" },
  roadmapDemoWaitingCss: {
    en: "Plain document — styling (CSS) not applied yet",
    ar: "مستند عادي — التنسيق (CSS) لم يُطبّق بعد",
  },
  roadmapDemoWaitingJs: {
    en: "Looks ready — waiting for JS to handle the click",
    ar: "يبدو جاهزًا — بانتظار JS لمعالجة النقرة",
  },
  roadmapDemoJsNote: {
    en: "JS handled the click · state updated · UI re-rendered",
    ar: "JS عالج النقرة · الحالة تحدّثت · الواجهة أعيد رسمها",
  },
  roadmapDemoReactNote: {
    en: "<SaveCard saved={true} /> · props + state · reusable",
    ar: "<SaveCard saved={true} /> · props + state · reusable",
  },
  roadmapTechHtml: { en: "HTML", ar: "HTML" },
  roadmapTechCss: { en: "CSS", ar: "CSS" },
  roadmapTechJs: { en: "JavaScript", ar: "JavaScript" },
  roadmapTechReact: { en: "React", ar: "React" },
  roadmapStartCta: {
    en: "Start with HTML",
    ar: "ابدأ بـ HTML",
  },
  roadmapNow: {
    en: "You are here",
    ar: "أنت هنا",
  },
  roadmapLocked: {
    en: "Next",
    ar: "التالي",
  },
  comingSoon: {
    en: "Coming soon",
    ar: "قريبًا",
  },
  openTrack: {
    en: "View lessons",
    ar: "عرض الدروس",
  },
  backToTracks: {
    en: "All tracks",
    ar: "جميع المسارات",
  },
  backToCurriculum: {
    en: "Lessons",
    ar: "الدروس",
  },
  curriculumToc: {
    en: "Table of contents",
    ar: "جدول المحتويات",
  },
  levelsTree: {
    en: "Levels",
    ar: "المستويات",
  },
  expandAll: { en: "Expand all", ar: "توسيع الكل" },
  collapseAll: { en: "Collapse all", ar: "طيّ الكل" },
  startCurriculum: {
    en: "Start first lesson",
    ar: "ابدأ أول درس",
  },
  continueLearning: {
    en: "Continue learning",
    ar: "تابع التعلّم",
  },
  lessonsCount: {
    en: "lessons",
    ar: "دروس",
  },
  emptyTrack: {
    en: "Lessons for this track are coming soon.",
    ar: "دروس هذا المسار ستتوفر قريبًا.",
  },
  tagline: {
    en: "Build frontend skills that stick",
    ar: "ابنِ مهارات تطوير واجهات دائمة",
  },
  searchPlaceholder: {
    en: "Search lessons…",
    ar: "ابحث في الدروس…",
  },
  lessons: { en: "Lessons", ar: "الدروس" },
  progress: { en: "Your progress", ar: "تقدمك" },
  completed: { en: "completed", ar: "مكتمل" },
  markComplete: { en: "Mark as complete", ar: "علّم كمكتمل" },
  markIncomplete: { en: "Mark as incomplete", ar: "تعليم كغير مكتمل" },
  difficulty: { en: "Tier", ar: "المستوى" },
  filterAll: { en: "All", ar: "الكل" },
  tierBeginner: { en: "Beginner", ar: "مبتدئ" },
  tierIntermediate: { en: "Intermediate", ar: "متوسط" },
  tierAdvanced: { en: "Advanced", ar: "متقدم" },
  tierPro: { en: "Pro", ar: "احترافي" },
  tierPitfalls: { en: "Pitfalls", ar: "أخطاء شائعة" },
  tierCheatsheet: { en: "CheatSheet", ar: "CheatSheet" },
  tierBeginnerBlurb: {
    en: "Fundamental building blocks",
    ar: "أساسيات البناء",
  },
  tierIntermediateBlurb: {
    en: "Practical usage & patterns",
    ar: "استخدام عملي وأنماط",
  },
  tierAdvancedBlurb: {
    en: "Under the hood & engine execution",
    ar: "تحت الغطا وتنفيذ الـ engine",
  },
  tierProBlurb: {
    en: "Performance, memory & architecture",
    ar: "أداء وذاكرة وهندسة",
  },
  tierPitfallsBlurb: {
    en: "Tricky edge cases & gotchas",
    ar: "حالات خادعة وأخطاء شائعة",
  },
  tierCheatsheetBlurb: {
    en: "Fast visual reference cards",
    ar: "كروت مرجع سريع",
  },
  tierProgress: { en: "tier progress", ar: "تقدم المستوى" },
  readTime: { en: "min read", ar: "دقيقة قراءة" },
  explanation: { en: "Simplified explanation", ar: "شرح مبسّط" },
  keyPoints: { en: "Key takeaways", ar: "النقاط المهمة" },
  visualExperiments: { en: "Experiments", ar: "تجارب" },
  explainMore: { en: "Explain more / Under the hood", ar: "شرح أعمق / Under the hood" },
  explainMoreHint: {
    en: "Deep dive — engine, memory, and call-stack context",
    ar: "تعمّق — المحرك والذاكرة وسياق call stack",
  },
  underTheHood: {
    en: "Under the Hood (Engine Mechanics)",
    ar: "Under the Hood (ميكانيكا الـ Engine)",
  },
  underTheHoodHint: {
    en: "How the browser builds meaning — DOM, accessibility tree, parse repairs, and the render path",
    ar: "كيف يبني المتصفح المعنى — DOM وشجرة إمكانية الوصول وإصلاحات التحليل ومسار الرسم",
  },
  seeInBrowser: {
    en: "See it in the browser",
    ar: "اعرضه في المتصفح",
  },
  seeInBrowserHint: {
    en: "Open DevTools and verify this lesson yourself — step by step",
    ar: "افتح DevTools وتحقق بنفسك — خطوة بخطوة",
  },
  seeInBrowserShortcut: {
    en: "Shortcut: F12 or right-click → Inspect (Mac: Cmd+Option+I)",
    ar: "اختصار: F12 أو كليك يمين → Inspect (Mac: Cmd+Option+I)",
  },
  accessibilityTitle: {
    en: "Accessibility (a11y) Best Practices",
    ar: "Accessibility (a11y) Best Practices",
  },
  accessibilityHint: {
    en: "How NVDA / VoiceOver / TalkBack hear this — landmarks, names, keyboard, and focus",
    ar: "كيف يسمع NVDA / VoiceOver / TalkBack هذا — المعالم والأسماء ولوحة المفاتيح والتركيز",
  },
  seoTitle: {
    en: "SEO Insights",
    ar: "SEO Insights",
  },
  seoHint: {
    en: "How crawlers and reader mode use structure — main content, headings, links, rich results",
    ar: "كيف تستخدم الزواحف ووضع القراءة البنية — المحتوى الرئيسي والعناوين والروابط والنتائج الغنية",
  },
  insightCodeLabel: { en: "Reference snippet", ar: "مقتطف مرجعي" },
  commonPitfalls: { en: "Common pitfalls & anti-patterns", ar: "أخطاء شائعة و anti-patterns" },
  pitfallsHint: {
    en: "Scan the mistake, then the fix — rebuild the green side in the playground.",
    ar: "راجع الخطأ ثم الحل — وأعد بناء الجانب الأخضر في ملعب التطبيق.",
  },
  wrongWay: { en: "Avoid", ar: "تجنّب" },
  rightWay: { en: "Prefer", ar: "فضّل" },
  exampleSimple: { en: "Simple", ar: "بسيط" },
  exampleMedium: { en: "Medium", ar: "متوسط" },
  exampleHard: { en: "Hard", ar: "صعب" },
  cheatSheetTitle: { en: "Interactive CheatSheet", ar: "CheatSheet تفاعلي" },
  cheatSheetHint: {
    en: "Search, filter, expand a card, copy, or open it in Live",
    ar: "ابحث، صفّ، وسّع بطاقة، انسخ، أو افتحها في Live",
  },
  cheatSearchPlaceholder: {
    en: "Search cards, tags, or snippets…",
    ar: "ابحث في البطاقات أو الوسوم أو المقتطفات…",
  },
  cheatSearchEmpty: {
    en: "No cards match that search.",
    ar: "لا توجد بطاقات مطابقة لهذا البحث.",
  },
  cheatExpand: { en: "Expand", ar: "توسيع" },
  cheatClose: { en: "Close", ar: "إغلاق" },
  cheatSeedBanner: {
    en: "Loaded from CheatSheet — edit freely in the playground",
    ar: "تم التحميل من CheatSheet — عدّل بحرية في ملعب التطبيق",
  },
  cheatSeedClear: { en: "Back to examples", ar: "العودة للأمثلة" },
  snippetCopied: { en: "Snippet copied", ar: "تم نسخ المقتطف" },
  cheatFilterAll: { en: "All", ar: "الكل" },
  cheatFilterStructure: {
    en: "Layout & Structure",
    ar: "التخطيط والبنية",
  },
  cheatFilterForms: { en: "Forms", ar: "Forms" },
  cheatFilterMedia: { en: "Media", ar: "Media" },
  cheatFilterInteractive: {
    en: "Interactive & Dialogs",
    ar: "Interactive & Dialogs",
  },
  cheatFilterHead: { en: "Head & Meta", ar: "Head & Meta" },
  cheatFilterEmpty: {
    en: "No cards in this category yet.",
    ar: "لا توجد بطاقات في هذه الفئة بعد.",
  },
  livePreview: { en: "Live preview", ar: "معاينة مباشرة" },
  copyCode: { en: "Copy Code", ar: "نسخ الكود" },
  copyTailwind: { en: "Copy Tailwind", ar: "نسخ Tailwind" },
  copyBoilerplate: { en: "Copy Boilerplate", ar: "نسخ القالب الأساسي" },
  codeCopiedToast: { en: "Code copied to clipboard", ar: "تم نسخ الكود" },
  tailwindCopiedToast: {
    en: "Tailwind snippet copied",
    ar: "تم نسخ مقتطف Tailwind",
  },
  boilerplateCopiedToast: {
    en: "Boilerplate copied to clipboard",
    ar: "تم نسخ القالب الأساسي",
  },
  domTreeTitle: {
    en: "DOM Tree Graph Engine",
    ar: "DOM Tree Graph Engine",
  },
  domTreeHint: {
    en: "Watch Parent → Child → Text reveal. Use Play, Pause, Stop, or Step.",
    ar: "شاهد Parent → Child → Text. استخدم Play أو Pause أو Stop أو Step.",
  },
  simPlay: { en: "Play", ar: "تشغيل" },
  simPause: { en: "Pause", ar: "إيقاف" },
  simStop: { en: "Stop", ar: "وقف" },
  simStep: { en: "Step", ar: "خطوة" },
  simReplay: { en: "Replay", ar: "إعادة" },
  simScreenReader: { en: "Screen Reader view", ar: "عرض قارئ الشاشة" },
  pipelineTitle: {
    en: "Browser Rendering Pipeline",
    ar: "Browser Rendering Pipeline",
  },
  pipelineHint: {
    en: "Parse → DOM → CSSOM → Render → Layout → Paint — step through how engines build a frame",
    ar: "Parse → DOM → CSSOM → Render → Layout → Paint — تابع خطوة بخطوة كيف يبني المحرك إطارًا",
  },
  compareTitle: {
    en: "Practice: Bad vs Screen-Reader Ready",
    ar: "Practice: Bad vs Screen-Reader Ready",
  },
  compareHint: {
    en: "Scan bad barriers vs semantic patterns — then try the challenge below",
    ar: "راجع الحواجز الخاطئة مقابل الأنماط الدلالية — ثم جرّب التحدي أدناه",
  },
  challengeTitle: {
    en: "Quick challenge",
    ar: "تحدي سريع",
  },
  challengeCorrect: { en: "Correct!", ar: "صح!" },
  challengeWrong: { en: "Not quite.", ar: "ليس تمامًا." },
  challengeHintBar: {
    en: "Optional: check your understanding in Lesson activity",
    ar: "اختياري: راجع فهمك في نشاط الدرس",
  },
  openInLive: {
    en: "Open in Live coding",
    ar: "افتح في Live coding",
  },
  deepDive: {
    en: "Deep dive",
    ar: "تعمّق",
  },
  lessonTablist: {
    en: "Lesson sections",
    ar: "أقسام الدرس",
  },
  lessonTabConcept: {
    en: "Concept",
    ar: "المفهوم",
  },
  lessonTabLive: {
    en: "Playground",
    ar: "ملعب",
  },
  lessonTabActivity: {
    en: "Lesson activity",
    ar: "نشاط الدرس",
  },
  lessonTabLevelQuiz: {
    en: "Level quiz",
    ar: "اختبار المستوى",
  },
  levelQuizProgress: {
    en: "Question {current} of {total}",
    ar: "سؤال {current} من {total}",
  },
  levelQuizSubmit: { en: "Submit answer", ar: "إرسال الإجابة" },
  levelQuizCheck: { en: "Check", ar: "تحقق" },
  levelQuizTryAgain: { en: "Try again", ar: "حاول مجددًا" },
  levelQuizGetHint: { en: "Need a hint?", ar: "محتاج تلميح؟" },
  levelQuizShowAnswer: { en: "Show me the answer", ar: "أرني الإجابة" },
  levelQuizWrong: { en: "Not quite — that's not the right answer.", ar: "ليس تمامًا — هذه ليست الإجابة الصحيحة." },
  levelQuizCorrect: { en: "Correct! Nice work.", ar: "صح! شغل ممتاز." },
  levelQuizAttemptsLeft: {
    en: "You have {n} more tries, or tap “Show me the answer”.",
    ar: "متبقي {n} محاولات، أو اضغط «أرني الإجابة».",
  },
  levelQuizNoAttemptsLeft: {
    en: "Here's the answer — read the explanation, then continue.",
    ar: "هذه الإجابة — اقرأ الشرح ثم تابع.",
  },
  levelQuizShakeHint: {
    en: "Pick a different answer and submit again.",
    ar: "اختر إجابة أخرى وأرسلها مجددًا.",
  },
  levelQuizWhy: { en: "Why?", ar: "لماذا؟" },
  levelQuizPagePreview: { en: "Page preview", ar: "معاينة الصفحة" },
  levelQuizTapElement: { en: "Tap the element name", ar: "اضغط اسم العنصر" },
  levelQuizRevealHint: { en: "Reveal hint", ar: "إظهار تلميح" },
  levelQuizWatchExplanation: { en: "Watch explanation", ar: "شاهد الشرح" },
  levelQuizShowDemo: { en: "Show interactive demo", ar: "عرض العرض التفاعلي" },
  levelQuizReplay: { en: "Replay", ar: "إعادة" },
  levelQuizContinue: { en: "Next question", ar: "السؤال التالي" },
  levelQuizVisualExplanation: { en: "Visual explanation", ar: "شرح مرئي" },
  levelQuizDifficulty_easy: { en: "Warm-up", ar: "تسخين" },
  levelQuizDifficulty_medium: { en: "Practice", ar: "تدريب" },
  levelQuizDifficulty_hard: { en: "Challenge", ar: "تحدي" },
  "levelQuizDifficulty_real-world": { en: "Real world", ar: "واقعي" },
  levelQuizPassed: { en: "Level cleared!", ar: "أكملت المستوى!" },
  levelQuizKeepGoing: { en: "Keep practicing!", ar: "واصل التدريب!" },
  levelQuizBannerBody: {
    en: "10 interactive challenges — drag, code, spot bugs, and more. Clear this level to unlock the next tier.",
    ar: "١٠ تحديات تفاعلية — سحب وكود واكتشاف أخطاء والمزيد. أكمل هذا المستوى للانتقال للمرحلة التالية.",
  },
  levelQuizStart: { en: "Start level quiz", ar: "ابدأ اختبار المستوى" },
  levelQuizHintBar: {
    en: "Ready for the level quiz? Open the Level quiz tab",
    ar: "جاهز لاختبار المستوى؟ افتح تبويب اختبار المستوى",
  },
  lessonTabLiveEmpty: {
    en: "No playground for this lesson yet — stay on Concept or jump to Lesson activity.",
    ar: "لا يوجد ملعب تطبيق لهذا الدرس بعد — ابقَ في المفهوم أو انتقل لنشاط الدرس.",
  },
  lessonTabActivityEmpty: {
    en: "No lesson activity on this lesson yet.",
    ar: "لا يوجد نشاط لهذا الدرس بعد.",
  },
  activityTitle: {
    en: "Knowledge check",
    ar: "مراجعة سريعة",
  },
  activityProgress: {
    en: "Question {current} of {total}",
    ar: "سؤال {current} من {total}",
  },
  activityNext: {
    en: "Next question",
    ar: "السؤال التالي",
  },
  activityFinish: {
    en: "See results",
    ar: "عرض النتائج",
  },
  activityComplete: {
    en: "Activity complete",
    ar: "اكتمل النشاط",
  },
  activityScore: {
    en: "You got {score} of {total} right",
    ar: "أجبت بشكل صحيح على {score} من {total}",
  },
  activityExplanation: {
    en: "Explanation",
    ar: "التفسير",
  },
  activityHint: {
    en: "Hint",
    ar: "نصيحة",
  },
  activityRetry: {
    en: "Try again",
    ar: "حاول مجددًا",
  },
  activityContinue: {
    en: "Continue learning",
    ar: "تابع التعلّم",
  },
  activityCongratsPerfect: {
    en: "Perfect score!",
    ar: "درجة كاملة!",
  },
  activityCongratsGreat: {
    en: "Great work!",
    ar: "عمل رائع!",
  },
  activityCongratsKeepGoing: {
    en: "Almost there!",
    ar: "أوشكت على الإكمال!",
  },
  activityCongratsHighBody: {
    en: "You’re ready for the next lesson — keep the momentum going.",
    ar: "أنت جاهز للدرس التالي — حافظ على الزخم.",
  },
  activityCongratsReviewBody: {
    en: "A quick review on Concept can lock this in before you move on.",
    ar: "مراجعة سريعة في المفهوم تثبّت ما تعلمته قبل المتابعة.",
  },
  activityCongratsNextLesson: {
    en: "Go to next lesson",
    ar: "الانتقال للدرس التالي",
  },
  activityCongratsReviewLesson: {
    en: "Review this lesson",
    ar: "مراجعة هذا الدرس",
  },
  activityCongratsStayOnLesson: {
    en: "Stay on this lesson",
    ar: "البقاء في هذا الدرس",
  },
  activityCongratsDismiss: {
    en: "Close and review this lesson",
    ar: "إغلاق ومراجعة هذا الدرس",
  },
  nextLessonArrow: { en: "Next lesson", ar: "الدرس التالي" },
  browserSupportTitle: {
    en: "Browser Compatibility",
    ar: "توافق المتصفحات",
  },
  browserSupportHint: {
    en: "Minimum versions + W3C Baseline status — and a fallback when legacy engines matter",
    ar: "أقل إصدارات + حالة W3C Baseline — و fallback لما الـ engines القديمة تهم",
  },
  browserFallback: { en: "Fallback", ar: "بديل" },
  playground: { en: "Code playground", ar: "ملعب الكود" },
  liveSandbox: { en: "Live sandbox", ar: "Sandbox مباشر" },
  expectedHint: { en: "Expected", ar: "المتوقع" },
  output: { en: "Console", ar: "الكونسول" },
  editorHtml: { en: "HTML", ar: "HTML" },
  editorCss: { en: "CSS", ar: "CSS" },
  editor: { en: "Editor", ar: "المحرر" },
  editorJs: { en: "JavaScript", ar: "JavaScript" },
  run: { en: "Run code", ar: "تشغيل الكود" },
  running: { en: "Running…", ar: "جارٍ التشغيل…" },
  copy: { en: "Copy", ar: "نسخ" },
  copied: { en: "Copied!", ar: "تم النسخ!" },
  restoreCode: { en: "Restore original", ar: "استعادة الأصل" },
  playgroundFullscreen: { en: "Full screen", ar: "شاشة كاملة" },
  playgroundExitFullscreen: { en: "Exit full screen", ar: "خروج من الشاشة الكاملة" },
  splitSideBySide: { en: "Side by side", ar: "جنبًا إلى جنب" },
  splitStacked: { en: "Stacked", ar: "مكدّس عموديًا" },
  splitSwap: { en: "Swap panels", ar: "تبديل اللوحات" },
  splitLayout: { en: "Split layout", ar: "تقسيم العرض" },
  preview: { en: "Preview", ar: "معاينة" },
  headPreviewTitle: { en: "Head tags preview", ar: "معاينة تاجات الـ head" },
  headPreviewBody: {
    en: "This page ships the head markup from the lesson. Check the tab title and Elements panel.",
    ar: "تعرض هذه الصفحة markup الـ head من الدرس. تحقق من عنوان التبويب ولوحة Elements.",
  },
  sfxOn: { en: "SFX on", ar: "المؤثرات مفعّلة" },
  sfxOff: { en: "SFX off", ar: "المؤثرات معطّلة" },
  next: { en: "Next lesson", ar: "الدرس التالي" },
  prev: { en: "Previous", ar: "السابق" },
  openMenu: { en: "Open lessons", ar: "فتح الدروس" },
  closeMenu: { en: "Close menu", ar: "إغلاق القائمة" },
  langEn: { en: "EN", ar: "EN" },
  langAr: { en: "عربي", ar: "عربي" },
  beginner: { en: "Beginner", ar: "مبتدئ" },
  intermediate: { en: "Intermediate", ar: "متوسط" },
  advanced: { en: "Advanced", ar: "متقدم" },
  pro: { en: "Pro", ar: "احترافي" },
  pitfalls: { en: "Pitfalls", ar: "أخطاء شائعة" },
  cheatsheet: { en: "CheatSheet", ar: "CheatSheet" },
  noResults: {
    en: "No lessons match your search.",
    ar: "لا توجد دروس مطابقة للبحث.",
  },
  selectLesson: {
    en: "Pick a lesson from the sidebar to begin.",
    ar: "اختر درسًا من القائمة للبدء.",
  },
  notFoundTitle: {
    en: "Page not found",
    ar: "الصفحة غير موجودة",
  },
  notFoundBody: {
    en: "That link may be old or mistyped. Head home or pick a track to keep learning.",
    ar: "قد يكون الرابط قديمًا أو غير صحيح. ارجع للرئيسية أو اختر مسارًا لمتابعة التعلّم.",
  },
  notFoundHome: {
    en: "Back home",
    ar: "الرئيسية",
  },
  notFoundTracks: {
    en: "Browse tracks",
    ar: "استعراض المسارات",
  },
} as const satisfies Record<string, LocalizedString>;

export type UiKey = keyof typeof ui;

export function t(key: UiKey, locale: Locale): string {
  return ui[key][locale];
}

export function loc(value: LocalizedString, locale: Locale): string {
  return value[locale];
}
