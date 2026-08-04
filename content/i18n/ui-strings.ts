import type { Locale, LocalizedString } from "@/lib/types";

export const ui = {
  brand: { en: "FrontendCraft", ar: "FrontendCraft" },
  hubTagline: {
    en: "Learn frontend in a live lab",
    ar: "اتعلّم الفرونت في معمل حي",
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
    ar: "الـ Call Stack بيشغّل دلوقتي — الـ Queue بيستنى — الـ Event Loop بيربطهم.",
  },
  chooseTrack: {
    en: "Pick a lab",
    ar: "اختار معمل",
  },
  chooseTrackHint: {
    en: "Open a lab, watch the idea move, then build it lesson by lesson.",
    ar: "افتح معمل، شوف الفكرة وهي بتتحرك، وبعدين ابنِها درس ورا درس.",
  },
  trackPathLabel: {
    en: "Live now",
    ar: "متاح دلوقتي",
  },
  trackUpcomingLabel: {
    en: "Coming up",
    ar: "جاي قريب",
  },
  trackPathNav: {
    en: "Lab path",
    ar: "مسار المعامل",
  },
  trackStartCta: {
    en: "Enter the HTML lab",
    ar: "ادخل معمل HTML",
  },
  trackEnterLab: {
    en: "Enter the lab",
    ar: "ادخل المعمل",
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
    en: "Lab opens soon",
    ar: "المعمل قريب",
  },
  trackUtilityLabel: {
    en: "Optional speed layer",
    ar: "طبقة سرعة اختيارية",
  },
  trackUtilityHint: {
    en: "Not a new language — Tailwind writes the same CSS faster after you know the basics.",
    ar: "مش لغة جديدة — Tailwind بيكتب نفس الـ CSS أسرع بعد ما تعرف الأساسيات.",
  },
  trackJobHtml: { en: "Structure", ar: "Structure" },
  trackJobCss: { en: "Styling", ar: "Styling" },
  trackJobJs: { en: "Behavior", ar: "Behavior" },
  trackJobReact: { en: "Components", ar: "Components" },
  trackJobTw: { en: "Faster CSS", ar: "CSS أسرع" },
  trackJobA11y: { en: "Inclusive UI", ar: "UI للجميع" },
  trackJobSeo: { en: "Discoverability", ar: "الاكتشاف" },
  trackJobHtmlHint: {
    en: "Tags give the page meaning — before any paint.",
    ar: "الـ tags بتدي الصفحة معنى — قبل أي لون.",
  },
  trackJobCssHint: {
    en: "One styling layer turns bones into a product look.",
    ar: "طبقة styling واحدة بتحوّل العضم لشكل منتج.",
  },
  trackJobJsHint: {
    en: "A click updates state — the UI finally reacts.",
    ar: "ضغطة بتغيّر الـ state — الـ UI أخيرًا بيتفاعل.",
  },
  trackJobReactHint: {
    en: "Build once as a component — reuse it anywhere.",
    ar: "ابنِها مرة كـ component — واستخدمها في أي حتة.",
  },
  trackJobTwHint: {
    en: "Still CSS — utilities just write it faster.",
    ar: "لسه CSS — الـ utilities بتكتبها أسرع بس.",
  },
  trackJobA11yHint: {
    en: "Keyboard, labels, and contrast — everyone can use it.",
    ar: "كيبورد و labels و contrast — الكل يقدر يستخدمه.",
  },
  trackJobSeoHint: {
    en: "Titles and structure help search understand the page.",
    ar: "الـ titles والـ structure بيساعدوا البحث يفهم الصفحة.",
  },
  trackJobHtmlBody: {
    en: "HTML is the document. You place content in tags so the browser knows what is a heading, what is a paragraph, and what is a button — structure and meaning, with no styling yet.",
    ar: "HTML هو الـ document. بتحط المحتوى في tags عشان المتصفح يعرف إيه عنوان وإيه فقرة وإيه زر — structure ومعنى، من غير styling لسه.",
  },
  trackJobCssBody: {
    en: "CSS is the look layer. Same HTML stays in place; you add color, spacing, type, and radius until the bare document feels like a real product UI.",
    ar: "CSS طبقة الشكل. نفس الـ HTML ثابت؛ بتضيف لون ومسافات وخطوط و radius لحد ما الـ document العريان يبقى UI منتج حقيقي.",
  },
  trackJobJsBody: {
    en: "JavaScript is behavior. When the user clicks, an event runs, state changes, and the UI updates — the page stops being a static picture.",
    ar: "JavaScript هو السلوك. لما المستخدم يضغط، event بيشتغل، الـ state بيتغيّر، والـ UI بيتحدّث — الصفحة مبتبقاش صورة ثابتة.",
  },
  trackJobReactBody: {
    en: "React packages HTML, CSS, and JS into reusable components. You build SaveCard once, pass props, and drop it anywhere the app needs that same UI.",
    ar: "React بيلف HTML و CSS و JS في components قابلة لإعادة الاستخدام. بتبني SaveCard مرة، تبعت props، وتحطها في أي حتة الـ app محتاج فيها نفس الـ UI.",
  },
  trackJobTwBody: {
    en: "Tailwind is still CSS — just written as utilities in your markup (`flex`, `gap-2`, `rounded-xl`) so you ship the same look with less custom stylesheet work.",
    ar: "Tailwind لسه CSS — مكتوب كـ utilities في الـ markup (`flex` و `gap-2` و `rounded-xl`) عشان تطلّع نفس الشكل بمجهود stylesheet أقل.",
  },
  trackJobA11yBody: {
    en: "Accessibility makes the UI usable with keyboard, screen readers, and clear contrast. Same product — more people can complete the task.",
    ar: "الـ Accessibility بتخلي الـ UI يشتغل بالكيبورد وقارئ الشاشة وcontrast واضح. نفس المنتج — ناس أكتر تقدر تكمّل المهمة.",
  },
  trackJobSeoBody: {
    en: "SEO is how search engines read your page: clear titles, meta descriptions, and meaningful structure so the right people can find what you built.",
    ar: "الـ SEO هو طريقة محركات البحث في قراءة صفحتك: titles واضحة و meta descriptions و structure له معنى عشان الناس الصح تلقى اللي بنيته.",
  },
  trackCapHtml0: {
    en: "Start from an empty document…",
    ar: "ابدأ من document فاضي…",
  },
  trackCapHtml1: {
    en: "Add a heading — meaning first.",
    ar: "ضيف عنوان — المعنى الأول.",
  },
  trackCapHtml2: {
    en: "Add supporting text under it.",
    ar: "ضيف نص توضيحي تحته.",
  },
  trackCapHtml3: {
    en: "Add a control the user can press.",
    ar: "ضيف control المستخدم يقدر يضغطه.",
  },
  trackCapCss0: {
    en: "Bones only — structure with no paint.",
    ar: "عضم بس — structure من غير لون.",
  },
  trackCapCss1: {
    en: "CSS paints color, space, and radius.",
    ar: "CSS بيرسم اللون والمسافة والـ radius.",
  },
  trackCapCss2: {
    en: "Same content — now it looks like a product.",
    ar: "نفس المحتوى — دلوقتي شكله منتج.",
  },
  trackCapJs0: {
    en: "Looks ready — still static.",
    ar: "شكله جاهز — لسه ثابت.",
  },
  trackCapJs1: {
    en: "A click fires an event…",
    ar: "الضغطة بتشغّل event…",
  },
  trackCapJs2: {
    en: "…JavaScript updates state.",
    ar: "…JavaScript بيحدّث الـ state.",
  },
  trackCapJs3: {
    en: "UI re-renders — the button says Saved.",
    ar: "الـ UI بيعمل re-render — الزر بقى Saved.",
  },
  trackCapReact0: {
    en: "Define SaveCard once…",
    ar: "عرّف SaveCard مرة…",
  },
  trackCapReact1: {
    en: "Reuse it anywhere in the tree.",
    ar: "استخدمه في أي حتة في الـ tree.",
  },
  trackCapReact2: {
    en: "Same props and behavior — two places.",
    ar: "نفس الـ props والسلوك — في مكانين.",
  },
  trackCapTw0: {
    en: "Write utilities instead of a long stylesheet…",
    ar: "اكتب utilities بدل stylesheet طويل…",
  },
  trackCapTwApply: {
    en: "Apply",
    ar: "طبّق",
  },
  trackCapTwDone: {
    en: "Same CSS result — quicker to ship.",
    ar: "نفس نتيجة CSS — أسرع في الشغل.",
  },
  trackCapA11y0: {
    en: "Looks fine — but can everyone use it?",
    ar: "شكله كويس — بس كل الناس تقدر تستخدمه؟",
  },
  trackCapA11y1: {
    en: "Add a visible keyboard focus ring.",
    ar: "ضيف focus ring باين للكيبورد.",
  },
  trackCapA11y2: {
    en: "Name the control for assistive tech.",
    ar: "سمّي الـ control لوسائل المساعدة.",
  },
  trackCapA11y3: {
    en: "Now keyboard and screen readers can Save.",
    ar: "دلوقتي الكيبورد وقارئ الشاشة يقدروا يعملوا Save.",
  },
  trackCapSeo0: {
    en: "A page with no search signals…",
    ar: "صفحة من غير إشارات بحث…",
  },
  trackCapSeo1: {
    en: "Write a clear title for the result.",
    ar: "اكتب title واضح لنتيجة البحث.",
  },
  trackCapSeo2: {
    en: "Add a meta description under it.",
    ar: "ضيف meta description تحته.",
  },
  trackCapSeo3: {
    en: "Search can preview — and people can click.",
    ar: "البحث يقدر يعرض معاينة — والناس تضغط.",
  },
  trackJobDemoLabel: {
    en: "What this track teaches",
    ar: "الـ track ده بيعلّمك إيه",
  },
  browseTracks: {
    en: "Browse all tracks",
    ar: "شوف كل الـ tracks",
  },
  backHome: {
    en: "Home",
    ar: "الرئيسية",
  },
  roadmapTitle: {
    en: "How a real UI is built",
    ar: "إزاي UI حقيقي بيتبني",
  },
  roadmapHint: {
    en: "Structure → styling → behavior, then React components. Same UI grows in order.",
    ar: "Structure → styling → behavior، بعدين React components. نفس الـ UI بيكبر بالترتيب.",
  },
  roadmapHtmlTitle: {
    en: "HTML — what’s on the page",
    ar: "HTML — إيه اللي على الصفحة",
  },
  roadmapHtmlBody: {
    en: "Start here. You write the content and meaning: heading, text, button. No colors yet — just a clear document the browser understands.",
    ar: "ابدأ من هنا. بتكتب المحتوى والمعنى: عنوان ونص وزر. من غير ألوان لسه — document واضح المتصفح بيفهمه.",
  },
  roadmapCssTitle: {
    en: "CSS — how it looks",
    ar: "CSS — شكله عامل إزاي",
  },
  roadmapCssBody: {
    en: "One styling layer: spacing, color, type, layout. This is where the document becomes a product look — still no real clicks yet.",
    ar: "طبقة styling واحدة: مسافات ولون وخطوط و layout. هنا الـ document يبقى شكله منتج — لسه مفيش ضغطات حقيقية.",
  },
  roadmapJsTitle: {
    en: "JavaScript — how it behaves",
    ar: "JavaScript — بيتصرّف إزاي",
  },
  roadmapJsBody: {
    en: "Then you add behavior: listen for a click, update state, change the UI. The page stops being a picture and becomes an app.",
    ar: "بعدين بتضيف سلوك: تسمع ضغطة، تغيّر state، تحدّث الـ UI. الصفحة مبتبقاش صورة وبقت app.",
  },
  roadmapReactTitle: {
    en: "React — components & app UI",
    ar: "React — components و UI للتطبيق",
  },
  roadmapReactBody: {
    en: "Still HTML, CSS, and JS — organized into reusable components with props and state, so the same Save card can live anywhere in an app.",
    ar: "لسه HTML و CSS و JS — متظبطين في components قابلة لإعادة الاستخدام مع props و state، عشان نفس الـ Save card تعيش في أي حتة في الـ app.",
  },
  roadmapPreviewHtml: {
    en: "Job now: structure. We place a title, a line of text, and a button — the browser knows what each piece means.",
    ar: "الوظيفة دلوقتي: structure. بنحط عنوان وسطر نص وزر — المتصفح عارف كل جزء معناه إيه.",
  },
  roadmapPreviewCss: {
    en: "Job now: styling (CSS). Spacing, color, and radius turn bare tags into a readable card — one look layer.",
    ar: "الوظيفة دلوقتي: styling (CSS). المسافات واللون والـ radius بيحوّلوا الـ tags لـ card مقروءة — طبقة شكل واحدة.",
  },
  roadmapPreviewJs: {
    en: "Job now: behavior. A click runs JS, state flips to “Saved”, and the button label updates on screen.",
    ar: "الوظيفة دلوقتي: behavior. ضغطة تشغّل JS، الـ state يبقى Saved، ونص الزر بيتحدّث على الشاشة.",
  },
  roadmapPreviewReact: {
    en: "Job now: components. Same card and same behavior — wrapped as <SaveCard /> with props and state you can reuse.",
    ar: "الوظيفة دلوقتي: components. نفس الـ card ونفس السلوك — متغلفة في <SaveCard /> مع props و state تقدر تعيد استخدامهم.",
  },
  roadmapPreviewLabel: {
    en: "Watch the same UI grow",
    ar: "شوف نفس الـ UI وهو بيكبر",
  },
  roadmapJobStructure: { en: "Structure", ar: "Structure" },
  roadmapJobLook: { en: "Styling", ar: "Styling" },
  roadmapJobBehavior: { en: "Behavior", ar: "Behavior" },
  roadmapJobComponents: { en: "Components", ar: "Components" },
  roadmapDemoTitle: {
    en: "Welcome back",
    ar: "أهلاً بيك تاني",
  },
  roadmapDemoBody: {
    en: "Save your progress and keep learning.",
    ar: "احفظ تقدمك وكمل التعلّم.",
  },
  roadmapDemoBtnIdle: { en: "Save", ar: "احفظ" },
  roadmapDemoBtnDone: { en: "Saved ✓", ar: "اتحفظ ✓" },
  roadmapDemoWaitingCss: {
    en: "Plain document — styling (CSS) not applied yet",
    ar: "Document عادي — الـ styling (CSS) لسه متطبّقش",
  },
  roadmapDemoWaitingJs: {
    en: "Looks ready — waiting for JS to handle the click",
    ar: "شكله جاهز — مستني JS يمسك الضغطة",
  },
  roadmapDemoJsNote: {
    en: "JS handled the click · state updated · UI re-rendered",
    ar: "JS مسك الضغطة · state اتحدّث · الـ UI اتعمله re-render",
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
    ar: "إنت هنا",
  },
  roadmapLocked: {
    en: "Next",
    ar: "بعدين",
  },
  comingSoon: {
    en: "Coming soon",
    ar: "قريبًا",
  },
  openTrack: {
    en: "View curriculum",
    ar: "شوف المنهج",
  },
  backToTracks: {
    en: "All tracks",
    ar: "كل الـ tracks",
  },
  backToCurriculum: {
    en: "Curriculum",
    ar: "المنهج",
  },
  curriculumToc: {
    en: "Table of contents",
    ar: "جدول المحتويات",
  },
  levelsTree: {
    en: "Levels",
    ar: "المستويات",
  },
  expandAll: { en: "Expand all", ar: "افتح الكل" },
  collapseAll: { en: "Collapse all", ar: "اقفل الكل" },
  startCurriculum: {
    en: "Start first lesson",
    ar: "ابدأ أول درس",
  },
  continueLearning: {
    en: "Continue learning",
    ar: "كمّل التعلم",
  },
  lessonsCount: {
    en: "lessons",
    ar: "دروس",
  },
  emptyTrack: {
    en: "Lessons for this track are coming soon.",
    ar: "دروس الـ track ده هتيجي قريب.",
  },
  tagline: {
    en: "Interactive core JavaScript lab",
    ar: "معمل تفاعلي لأساسيات JavaScript",
  },
  searchPlaceholder: {
    en: "Search lessons…",
    ar: "دور على درس…",
  },
  lessons: { en: "Curriculum", ar: "المنهج" },
  progress: { en: "Your progress", ar: "تقدمك" },
  completed: { en: "completed", ar: "مكتمل" },
  markComplete: { en: "Mark as complete", ar: "علّم كمكتمل" },
  markIncomplete: { en: "Mark as incomplete", ar: "رجع لغير مكتمل" },
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
  visualLab: { en: "Motion lab", ar: "معمل الحركة" },
  explainMore: { en: "Explain more / Under the hood", ar: "اشرح أكتر / Under the hood" },
  explainMoreHint: {
    en: "Deep dive — engine, memory, and call-stack context",
    ar: "تعمّق — الـ engine والذاكرة وسياق الـ call stack",
  },
  underTheHood: {
    en: "Under the Hood (Engine Mechanics)",
    ar: "Under the Hood (ميكانيكا الـ Engine)",
  },
  underTheHoodHint: {
    en: "How the browser builds meaning — DOM, accessibility tree, parse repairs, and the render path",
    ar: "إزاي المتصفح بيبني المعنى — DOM و accessibility tree وإصلاحات الـ parse ومسار الـ render",
  },
  accessibilityTitle: {
    en: "Accessibility (a11y) Best Practices",
    ar: "Accessibility (a11y) Best Practices",
  },
  accessibilityHint: {
    en: "How NVDA / VoiceOver / TalkBack hear this — landmarks, names, keyboard, and focus",
    ar: "إزاي NVDA / VoiceOver / TalkBack بيسمعوا ده — landmarks والأسماء والكيبورد والـ focus",
  },
  seoTitle: {
    en: "SEO Insights",
    ar: "SEO Insights",
  },
  seoHint: {
    en: "How crawlers and reader mode use structure — main content, headings, links, rich results",
    ar: "إزاي الزواحف و Reader Mode بيستخدموا الهيكل — المحتوى الأساسي والعناوين واللينكات و rich results",
  },
  insightCodeLabel: { en: "Reference snippet", ar: "Snippet مرجعي" },
  commonPitfalls: { en: "Common pitfalls & anti-patterns", ar: "أخطاء شائعة و anti-patterns" },
  pitfallsHint: {
    en: "Scan the mistake, then the fix — rebuild the green side in the playground.",
    ar: "اتفرّج على الغلط وبعدين الصح — وابنِ الجانب الأخضر في الـ playground.",
  },
  wrongWay: { en: "Avoid", ar: "تجنّب" },
  rightWay: { en: "Prefer", ar: "فضّل" },
  exampleSimple: { en: "Simple", ar: "بسيط" },
  exampleRealWorld: { en: "Real-world", ar: "واقعي" },
  cheatSheetTitle: { en: "Interactive CheatSheet", ar: "CheatSheet تفاعلي" },
  cheatSheetHint: {
    en: "Search, filter, expand a card, copy, or open it in Live",
    ar: "دور، فلتر، وسّع كارت، انسخ، أو افتحه في Live",
  },
  cheatSearchPlaceholder: {
    en: "Search cards, tags, or snippets…",
    ar: "دور في الكروت أو التاجات أو الـ snippets…",
  },
  cheatSearchEmpty: {
    en: "No cards match that search.",
    ar: "مفيش كروت مطابقة للبحث ده.",
  },
  cheatExpand: { en: "Expand", ar: "وسّع" },
  cheatClose: { en: "Close", ar: "اقفل" },
  cheatSeedBanner: {
    en: "Loaded from CheatSheet — edit freely in the playground",
    ar: "متحمّل من الـ CheatSheet — عدّل بحرية في الـ playground",
  },
  cheatSeedClear: { en: "Back to examples", ar: "ارجع للأمثلة" },
  snippetCopied: { en: "Snippet copied", ar: "الـ snippet اتنسخ" },
  cheatFilterAll: { en: "All", ar: "الكل" },
  cheatFilterStructure: {
    en: "Layout & Structure",
    ar: "Layout & Structure",
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
    ar: "مفيش كروت في الفئة دي لسه.",
  },
  livePreview: { en: "Live preview", ar: "معاينة مباشرة" },
  copyCode: { en: "Copy Code", ar: "انسخ الكود" },
  copyTailwind: { en: "Copy Tailwind", ar: "انسخ Tailwind" },
  copyBoilerplate: { en: "Copy Boilerplate", ar: "انسخ Boilerplate" },
  codeCopiedToast: { en: "Code copied to clipboard", ar: "الكود اتنسخ" },
  tailwindCopiedToast: {
    en: "Tailwind snippet copied",
    ar: "Snippet الـ Tailwind اتنسخ",
  },
  boilerplateCopiedToast: {
    en: "Boilerplate copied to clipboard",
    ar: "الـ Boilerplate اتنسخ",
  },
  domTreeTitle: {
    en: "DOM Tree Graph Engine",
    ar: "DOM Tree Graph Engine",
  },
  domTreeHint: {
    en: "Watch Parent → Child → Text reveal. Use Play, Pause, Stop, or Step.",
    ar: "اتفرّج على Parent → Child → Text. استخدم Play أو Pause أو Stop أو Step.",
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
    ar: "Parse → DOM → CSSOM → Render → Layout → Paint — امشي خطوة بخطوة إزاي الـ engine بيرسم فريم",
  },
  compareTitle: {
    en: "Practice: Bad vs Screen-Reader Ready",
    ar: "Practice: Bad vs Screen-Reader Ready",
  },
  compareHint: {
    en: "Scan bad barriers vs semantic patterns — then try the challenge below",
    ar: "اتفرّج على bad barriers مقابل semantic patterns — وبعدين جرّب الـ challenge تحت",
  },
  challengeTitle: {
    en: "Quick challenge",
    ar: "تحدي سريع",
  },
  challengeCorrect: { en: "Correct!", ar: "صح!" },
  challengeWrong: { en: "Not quite.", ar: "لسه." },
  challengeHintBar: {
    en: "Optional: check your understanding in Quiz",
    ar: "اختياري: راجع فهمك من تاب الاختبار",
  },
  openInLive: {
    en: "Open in Live coding",
    ar: "افتح في Live coding",
  },
  deepDive: {
    en: "Deep dive",
    ar: "تعمّق أكتر",
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
    en: "Live",
    ar: "تطبيقي",
  },
  lessonTabQuiz: {
    en: "Quiz",
    ar: "اختبار",
  },
  lessonTabLiveEmpty: {
    en: "No playground for this lesson yet — stay on Concept or jump to Quiz.",
    ar: "مفيش ملعب كود للدرس ده لسه — فضّل على المفهوم أو روح للاختبار.",
  },
  lessonTabQuizEmpty: {
    en: "No quiz on this lesson yet.",
    ar: "مفيش اختبار على الدرس ده لسه.",
  },
  quizTitle: {
    en: "Knowledge check",
    ar: "اختبار سريع",
  },
  quizProgress: {
    en: "Question {current} of {total}",
    ar: "سؤال {current} من {total}",
  },
  quizNext: {
    en: "Next question",
    ar: "السؤال اللي بعده",
  },
  quizFinish: {
    en: "See results",
    ar: "شوف النتيجة",
  },
  quizComplete: {
    en: "Quiz complete",
    ar: "خلصت الاختبار",
  },
  quizScore: {
    en: "You got {score} of {total} right",
    ar: "جبت {score} من {total}",
  },
  quizExplanation: {
    en: "Explanation",
    ar: "التفسير",
  },
  quizHint: {
    en: "Hint",
    ar: "Hint",
  },
  quizRetry: {
    en: "Try again",
    ar: "حاول تاني",
  },
  quizContinue: {
    en: "Continue learning",
    ar: "كمّل التعلم",
  },
  nextLessonArrow: { en: "Next lesson", ar: "الدرس اللي بعده" },
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
  editorJs: { en: "JavaScript", ar: "JavaScript" },
  run: { en: "Run code", ar: "شغّل الكود" },
  running: { en: "Running…", ar: "بيشتغل…" },
  copy: { en: "Copy", ar: "انسخ" },
  copied: { en: "Copied!", ar: "اتنسخ!" },
  restoreCode: { en: "Restore original", ar: "رجّع الأصلي" },
  playgroundFullscreen: { en: "Full screen", ar: "شاشة كاملة" },
  playgroundExitFullscreen: { en: "Exit full screen", ar: "خروج من الشاشة الكاملة" },
  splitSideBySide: { en: "Side by side", ar: "جنب بعض" },
  splitStacked: { en: "Stacked", ar: "فوق بعض" },
  splitSwap: { en: "Swap panels", ar: "بدّل اللوحات" },
  splitLayout: { en: "Split layout", ar: "تقسيم العرض" },
  preview: { en: "Preview", ar: "معاينة" },
  headPreviewTitle: { en: "Head tags preview", ar: "معاينة تاجات الـ head" },
  headPreviewBody: {
    en: "This page ships the head markup from the lesson. Check the tab title and Elements panel.",
    ar: "الصفحة دي بتشحن markup الـ head من الدرس. شوف عنوان التاب ولوحة Elements.",
  },
  sfxOn: { en: "SFX on", ar: "الصوت شغال" },
  sfxOff: { en: "SFX off", ar: "الصوت مقفول" },
  next: { en: "Next lesson", ar: "الدرس اللي بعده" },
  prev: { en: "Previous", ar: "السابق" },
  openMenu: { en: "Open lessons", ar: "افتح الدروس" },
  closeMenu: { en: "Close menu", ar: "اقفل القائمة" },
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
    ar: "مفيش دروس مطابقة للبحث.",
  },
  selectLesson: {
    en: "Pick a lesson from the sidebar to begin.",
    ar: "اختار درس من القائمة عشان تبدأ.",
  },
} as const satisfies Record<string, LocalizedString>;

export type UiKey = keyof typeof ui;

export function t(key: UiKey, locale: Locale): string {
  return ui[key][locale];
}

export function loc(value: LocalizedString, locale: Locale): string {
  return value[locale];
}
