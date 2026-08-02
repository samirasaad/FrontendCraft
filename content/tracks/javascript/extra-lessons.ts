import {
  L,
  cheatCard,
  pitfall,
  realWorldExample,
  simpleExample,
} from "@/content/helpers";
import type { Lesson } from "@/lib/types";

export const extraLessons: Lesson[] = [
  {
    id: "js-pro-1",
    order: 11,
    slug: "perf-debounce-throttle",
    tier: "pro",
    readMinutes: 10,
    icon: "Zap",
    visualizer: "event-loop",
    content: {
      title: L("Performance: Debounce & Throttle", "Performance: Debounce & Throttle"),
      summary: L(
        "Stop flooding the main thread — pace expensive handlers on scroll, resize, and search.",
        "متغرقش الـ main thread — نظّم الـ handlers التقيلة على scroll و resize والبحث.",
      ),
      paragraphs: [
        L(
          "Debounce waits for quiet time before running (search boxes). Throttle runs at most once per interval (scroll analytics).",
          "Debounce بيستنى هدوء قبل التنفيذ (بحث). Throttle بينفّذ مرة كل فترة (scroll analytics).",
        ),
        L(
          "Both cut wasted work, layout thrash, and network spam — measurable wins on mid-range phones.",
          "الاتنين بيقللوا شغل ضايع و layout thrash وطلبات شبكة زيادة — فرق محسوس على موبايلات متوسطة.",
        ),
        L(
          "Prefer the platform when possible (`requestAnimationFrame` for visual work) and measure with Performance panel before micro-optimizing.",
          "فضّل أدوات المنصة (`requestAnimationFrame` للشغل البصري) وقِس من Performance panel قبل أي micro-optimization.",
        ),
      ],
      keyPoints: [
        L("Debounce → wait for pause", "Debounce → استنى لما يسكت"),
        L("Throttle → cap frequency", "Throttle → حدّد أقصى معدل"),
        L("Measure first, then optimize", "قِس الأول، بعدين حسّن"),
      ],
      examples: [
        simpleExample(
          `function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

const search = debounce((q) => console.log("query:", q), 200);
search("j");
search("ja");
search("jav");
// only the last call logs after 200ms quiet`,
          "query: jav",
        ),
        realWorldExample(
          `function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

let scrolls = 0;
const onScroll = throttle(() => {
  scrolls += 1;
  console.log("scroll ticks", scrolls);
}, 100);

onScroll();
onScroll();
onScroll();
console.log("done burst");`,
          "scroll ticks 1\ndone burst",
        ),
      ],
      visualHint: L(
        "Watch tasks queue calmly instead of flooding the loop.",
        "راقب المهام وهي بتتخش بهدوء بدل ما تغرق الـ loop.",
      ),
      deepDive: [
        L(
          "Each handler closure retains the timer id. Clearing it prevents piled-up macrotasks that would otherwise wake the page after navigation.",
          "كل handler بيمسك timer id. مسحه بيمنع macrotasks متراكمة تفضل تشتغل بعد ما الصفحة تتغير.",
        ),
        L(
          "For React, start with transition/`useDeferredValue` patterns before hand-rolling debounce — then add debounce at the network edge.",
          "في React ابدأ بـ transition/`useDeferredValue` قبل debounce يدوي — وبعدين حط debounce عند حافة الشبكة.",
        ),
      ],
      pitfalls: pitfall(
        `window.addEventListener("scroll", () => heavyWork());`,
        L(
          "Unpaced scroll handlers jank frames and drain battery.",
          "scroll من غير تنظيم بيكسر الـ frames ويستهلك بطارية.",
        ),
        `window.addEventListener("scroll", throttle(heavyWork, 100));`,
        L(
          "Throttle (or rAF) keeps work within budget.",
          "Throttle (أو rAF) بيخلي الشغل جوه الميزانية.",
        ),
      ),
    },
  },
  {
    id: "js-pro-2",
    order: 12,
    slug: "memory-leaks-refs",
    tier: "pro",
    readMinutes: 11,
    icon: "Cpu",
    visualizer: "memory-lock",
    content: {
      title: L("Memory Leaks & Lingering Refs", "Memory Leaks & Lingering Refs"),
      summary: L(
        "The GC frees what nothing points to — accidental refs keep ghosts alive.",
        "الـ GC بيحرّر اللي مفيش حاجة بتشاور عليه — references بالغلط بتخلّي أشباح تعيش.",
      ),
      paragraphs: [
        L(
          "Classic leaks: listeners not removed, intervals never cleared, caches that grow forever, detached DOM nodes held in arrays.",
          "leaks كلاسيكية: listeners متتشالش، intervals متتقفلش، caches بتتكبر، DOM nodes منفصلة لسه في arrays.",
        ),
        L(
          "Architectural tip: pair every subscribe with an unsubscribe, every `setInterval` with `clearInterval`, every cache with a max size / TTL.",
          "نصيحة هندسية: كل subscribe وراه unsubscribe، كل `setInterval` وراه `clearInterval`، كل cache وراه حد حجم أو TTL.",
        ),
        L(
          "In SPAs, run cleanup on unmount. A single orphaned listener can retain an entire component tree.",
          "في الـ SPAs، اعمل cleanup عند الـ unmount. listener يتيم واحد ممكن يمسك component tree كاملة.",
        ),
      ],
      keyPoints: [
        L("GC needs zero reachable refs", "الـ GC محتاج صفر refs قابلة للوصول"),
        L("Always clean listeners & timers", "دايمًا نظّف listeners والـ timers"),
        L("Bound your caches", "حط حدود للـ caches"),
      ],
      examples: [
        simpleExample(
          `function watch(el, fn) {
  el.addEventListener("click", fn);
  return () => el.removeEventListener("click", fn);
}

const off = watch({ addEventListener() {}, removeEventListener() {} }, () => {});
off();
console.log("listener cleaned");`,
          "listener cleaned",
        ),
        realWorldExample(
          `function createStore() {
  const listeners = new Set();
  return {
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    emit(value) {
      for (const fn of listeners) fn(value);
    },
  };
}

const store = createStore();
const unsub = store.subscribe((v) => console.log("got", v));
store.emit(1);
unsub();
store.emit(2);
console.log("listeners", 0);`,
          "got 1\nlisteners 0",
        ),
      ],
      visualHint: L(
        "Locked boxes that nobody unlocks become leaks.",
        "الصناديق المقفولة اللي محدش بيفتحها بتتحوّل لـ leaks.",
      ),
      deepDive: [
        L(
          "V8’s GC (Scavenge + Mark-Sweep/Compact) collects unreachable graphs. Closures, Maps, and DOM wrappers are common retainers in DevTools Heap snapshots.",
          "GC بتاع V8 بيجمع الـ graphs مش القابلة للوصول. الـ closures و Maps و DOM wrappers من أشهر الـ retainers في Heap snapshots.",
        ),
        L(
          "WeakMap/WeakRef help when you want metadata that should not keep objects alive — advanced, use carefully.",
          "WeakMap/WeakRef مفيدين لما metadata مت upstreamش الـ object حي — متقدم، استخدمهم بحذر.",
        ),
      ],
      pitfalls: pitfall(
        `setInterval(() => sync(), 1000);
// component gone, interval still fires`,
        L(
          "Timers outlive UI without cleanup.",
          "الـ timers بتطول عن الـ UI من غير cleanup.",
        ),
        `const id = setInterval(() => sync(), 1000);
// on unmount:
clearInterval(id);`,
        L(
          "Store the id and clear it in teardown.",
          "خزّن الـ id وامسحه في الـ teardown.",
        ),
      ),
    },
  },
  {
    id: "js-pit-1",
    order: 13,
    slug: "pitfall-float-typeof",
    tier: "pitfalls",
    readMinutes: 8,
    icon: "AlertTriangle",
    visualizer: "equality",
    content: {
      title: L("Floats, typeof null & NaN Traps", "Floats, typeof null & NaN Traps"),
      summary: L(
        "Numbers lie, `typeof null` is wrong historically, and `NaN` never equals itself.",
        "الأرقام بتكذب، `typeof null` غلط تاريخيًا، و `NaN` عمره ما بيساوي نفسه.",
      ),
      paragraphs: [
        L(
          "`0.1 + 0.2 !== 0.3` because IEEE-754 floats. Compare with an epsilon or work in integers (cents).",
          "`0.1 + 0.2 !== 0.3` بسبب IEEE-754. قارن بـ epsilon أو اشتغل بـ integers (قروش).",
        ),
        L(
          "`typeof null === \"object\"` is a legacy bug. Check null with `value === null`.",
          "`typeof null === \"object\"` bug قديم. افحص null بـ `value === null`.",
        ),
        L(
          "Use `Number.isNaN` (not global `isNaN`) and `Number.isFinite` for safe numeric gates.",
          "استخدم `Number.isNaN` (مش `isNaN` العامة) و `Number.isFinite` لبوابات رقمية أأمن.",
        ),
      ],
      keyPoints: [
        L("Float math needs tolerance", "حسابات float محتاجة tolerance"),
        L("`typeof null` is \"object\"", "`typeof null` بتطلع \"object\""),
        L("Prefer Number.isNaN", "فضّل Number.isNaN"),
      ],
      examples: [
        simpleExample(
          `console.log(0.1 + 0.2);
console.log(Math.abs(0.1 + 0.2 - 0.3) < 1e-10);
console.log(typeof null);
console.log(Number.isNaN(NaN));`,
          "0.30000000000000004\ntrue\nobject\ntrue",
        ),
        realWorldExample(
          `function moneyAdd(centsA, centsB) {
  return (centsA + centsB) / 100;
}
console.log(moneyAdd(10, 20).toFixed(2));

function isPresent(value) {
  return value !== null && value !== undefined;
}
console.log(isPresent(null), isPresent(0));`,
          "0.30\nfalse true",
        ),
      ],
      visualHint: L(
        "The equality scale tips on historic quirks.",
        "ميزان المساواة بيتأثر بغرائب تاريخية.",
      ),
      deepDive: [
        L(
          "JS numbers are IEEE-754 double precision. Integers are safe only within Number.MAX_SAFE_INTEGER; beyond that use BigInt.",
          "أرقام JS هي double precision. الـ integers آمنة لحد MAX_SAFE_INTEGER؛ بعده استخدم BigInt.",
        ),
        L(
          "`typeof` is a poor type system — for real apps prefer TypeScript or explicit validators at boundaries.",
          "`typeof` مش type system حقيقي — في التطبيقات فضّل TypeScript أو validators على الحدود.",
        ),
      ],
      pitfalls: pitfall(
        `if (typeof value === "object") {
  // null sneaks in
}`,
        L(
          "`null` passes the object typeof check.",
          "`null` بيعدّي فحص typeof object.",
        ),
        `if (value !== null && typeof value === "object") {
  // real objects / arrays only
}`,
        L(
          "Exclude null explicitly.",
          "استبعد null بصراحة.",
        ),
      ),
    },
  },
  {
    id: "js-pit-2",
    order: 14,
    slug: "pitfall-async-races",
    tier: "pitfalls",
    readMinutes: 9,
    icon: "AlertTriangle",
    visualizer: "async-await",
    content: {
      title: L("Async Race Conditions", "Async Race Conditions"),
      summary: L(
        "Slow responses can overwrite newer UI state if you ignore ordering.",
        "الردود البطيئة ممكن تكتب فوق state أحدث لو تجاهلت الترتيب.",
      ),
      paragraphs: [
        L(
          "Typeahead classic bug: request A leaves, request B leaves, A returns last and shows stale results.",
          "bug البحث الكلاسيكي: طلب A يمشي، B يمشي، A يرجع آخر واحد ويعرض نتائج قديمة.",
        ),
        L(
          "Fix with abort controllers, request ids, or ignoring outdated responses before `setState`.",
          "الحل: AbortController، أو request id، أو تجاهل الردود القديمة قبل `setState`.",
        ),
        L(
          "Also avoid firing overlapping writes without queues — last-write-wins only when you mean it.",
          "وكمان متطلقش كتابات متداخلة من غير طابور — last-write-wins بس لو إنت قاصد.",
        ),
      ],
      keyPoints: [
        L("Newer request should win", "الطلب الأحدث لازم يكسب"),
        L("Abort or ignore stale responses", "Abort أو تجاهل الردود القديمة"),
        L("Make write ordering explicit", "خلّي ترتيب الكتابة صريح"),
      ],
      examples: [
        simpleExample(
          `let latest = 0;
function search(id) {
  const my = ++latest;
  return Promise.resolve("result-" + id).then((value) => {
    if (my !== latest) return "ignored";
    return value;
  });
}

Promise.all([search(1), search(2)]).then(console.log);`,
          "[ 'ignored', 'result-2' ]",
        ),
        realWorldExample(
          `function createSearcher() {
  let controller = null;
  return async function search(q) {
    controller?.abort();
    controller = new AbortController();
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        { signal: controller.signal },
      );
      const data = await res.json();
      return q + " → " + data.id;
    } catch (err) {
      if (err.name === "AbortError") return "aborted";
      throw err;
    }
  };
}

const search = createSearcher();
search("old").then(console.log);
search("new").then(console.log);`,
          "aborted\nnew → 1",
        ),
      ],
      visualHint: L(
        "Packets race — only the newest should paint.",
        "الـ packets بتتسابق — الأحدث بس هو اللي يرسم.",
      ),
      deepDive: [
        L(
          "AbortController cancels the fetch at the network layer when supported, freeing bandwidth and avoiding late handlers.",
          "AbortController يلغي الـ fetch على طبقة الشبكة لما يكون مدعوم، وبيوفّر bandwidth ويمنع handlers متأخرة.",
        ),
        L(
          "In React 18+, transitions help urgent vs non-urgent updates, but they do not replace aborting stale fetches.",
          "في React 18+ الـ transitions بتفصل التحديث العاجل عن غيره، لكنها مش بديل لإلغاء الـ fetches القديمة.",
        ),
      ],
      pitfalls: pitfall(
        `let results;
fetch(url1).then((r) => (results = r));
fetch(url2).then((r) => (results = r));
// slower url1 can win`,
        L(
          "No ordering guard — stale data can win.",
          "مفيش حماية ترتيب — data قديمة ممكن تكسب.",
        ),
        `let seq = 0;
async function load(url) {
  const id = ++seq;
  const data = await fetch(url).then((r) => r.json());
  if (id !== seq) return;
  apply(data);
}`,
        L(
          "Sequence tokens drop outdated responses.",
          "أرقام التسلسل بترمي الردود القديمة.",
        ),
      ),
    },
  },
  {
    id: "js-sheet-1",
    order: 15,
    slug: "js-cheatsheet",
    tier: "cheatsheet",
    readMinutes: 5,
    icon: "BookCopy",
    visualizer: "event-loop",
    content: {
      title: L("JavaScript Essentials CheatSheet", "JavaScript Essentials CheatSheet"),
      summary: L(
        "One-tap cards for the syntax you reach for every day.",
        "كروت بضغطة واحدة للـ syntax اللي بتحتاجه كل يوم.",
      ),
      paragraphs: [
        L(
          "Use this sheet as a warm-up before coding interviews or while building UI features fast.",
          "استخدم الشيت كـ إحماء قبل interviews أو وانت بتبني UI بسرعة.",
        ),
        L(
          "Copy a snippet, paste it in the playground, and tweak — learning sticks with muscle memory.",
          "انسخ snippet، حطه في الـ playground، وعدّل — التعلم بيثبت مع الممارسة.",
        ),
        L(
          "Keep technical terms in English even when you think in Arabic — that matches real codebases.",
          "سيّب المصطلحات التقنية بالإنجليزي حتى لو بتفكّر بالعربي — زي الـ codebases الحقيقية.",
        ),
      ],
      keyPoints: [
        L("Tap card → copy", "اضغط الكارت → انسخ"),
        L("Prefer ===, const, and array pipelines", "فضّل === و const و pipelines الـ arrays"),
        L("Respect microtasks vs macrotasks", "احترم microtasks مقابل macrotasks"),
      ],
      examples: [
        simpleExample(
          `const nums = [1, 2, 3];
console.log(nums.map((n) => n * 2).filter((n) => n > 2));`,
          "[4, 6]",
        ),
        realWorldExample(
          `const state = { user: "Samira", cart: [1, 2] };
const next = { ...state, cart: [...state.cart, 3] };
console.log(next.cart.join("-"));`,
          "1-2-3",
        ),
      ],
      visualHint: L(
        "Cards mirror the mental model of stack vs queue.",
        "الكروت بتعكس نموذج Call Stack مقابل Queue.",
      ),
      deepDive: [
        L(
          "Cheat sheets compress recognition, not mastery. Dive back into Beginner→Pro lessons when a card feels fuzzy.",
          "الـ CheatSheet بيضغط التعرف مش الإتقان. ارجع للدروس من Beginner لـ Pro لو كارت مش واضح.",
        ),
      ],
      pitfalls: pitfall(
        `// memorizing without running code`,
        L(
          "Reading alone fades fast.",
          "القراءة لوحدها بتنسى بسرعة.",
        ),
        `// copy → run → tweak → explain aloud`,
        L(
          "Active recall beats passive scrolling.",
          "الاسترجاع النشط أحسن من السكرول السلبي.",
        ),
      ),
      cheatCards: [
        cheatCard(
          L("const vs let", "const vs let"),
          `const PI = 3.14;\nlet score = 0;\nscore += 1;`,
          L("Default to const; let when rebinding.", "ابدأ بـ const؛ let لما تحتاج rebinding."),
        ),
        cheatCard(
          L("Strict equality", "Strict equality"),
          `a === b\na !== b`,
          L("Skip == unless you truly want coercion.", "سيّب == إلا لو إنت عايز coercion بوضوح."),
        ),
        cheatCard(
          L("Array pipeline", "Array pipeline"),
          `arr.map(fn).filter(pred).reduce(acc, init)`,
          L("Transform → keep → accumulate.", "حوّل → صفّي → جمّع."),
        ),
        cheatCard(
          L("Destructure params", "Destructure params"),
          `function Card({ title, done = false }) {\n  return title + ":" + done;\n}`,
          L("Document the fields you need.", "وضّح الـ fields اللي محتاجها."),
        ),
        cheatCard(
          L("async / await", "async / await"),
          `async function load() {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error("HTTP");\n  return res.json();\n}`,
          L("Always check res.ok.", "دايمًا افحص res.ok."),
        ),
        cheatCard(
          L("Event loop order", "Event Loop order"),
          `console.log("sync");\nPromise.resolve().then(() => console.log("micro"));\nsetTimeout(() => console.log("macro"), 0);`,
          L("sync → microtasks → macrotasks.", "sync → microtasks → macrotasks."),
        ),
      ],
    },
  },
];
