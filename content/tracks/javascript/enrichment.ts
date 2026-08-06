import {
  L,
  pitfall,
  hardExample,
  mediumExample,
  simpleExample,
} from "@/content/helpers";
import type { LegacyLesson } from "@/content/tracks/_legacy";
import { defaultInsights } from "@/content/tracks/_insights";
import {
  jsFallbackTiers,
  jsMediumExamples,
} from "@/content/tracks/javascript/legacy-example-tiers";
import { javascriptInsights } from "@/content/tracks/javascript/insights";
import type {
  CodeExample,
  Lesson,
  LocalizedString,
  PitfallExample,
} from "@/lib/types";

interface Overlay {
  hard: CodeExample;
  deepDive: LocalizedString[];
  pitfalls: PitfallExample;
}

const overlays: Record<string, Overlay> = {
  "var-let-const": {
    hard: hardExample(
      `// UI cart quantity — mutate count, never rebind the cart object
const cart = { items: [], total: 0 };

function addItem(name, price) {
  cart.items.push({ name, price });
  cart.total += price;
}

let checkoutStep = 1; // step can change
addItem("Keyboard", 40);
checkoutStep = 2;

console.log(cart.total, checkoutStep, cart.items.length);`,
      "40 2 1",
    ),
    deepDive: [
      L(
        "In V8, `let`/`const` live in the declarative environment record of a block. Accessing them before initialization throws a Temporal Dead Zone (TDZ) error — unlike `var`, which is hoisted as `undefined`.",
        "في V8، `let`/`const` عايشين في declarative environment record بتاع الـ block. لو قرأتهم قبل الـ initialization هتحصل Temporal Dead Zone (TDZ) — عكس `var` اللي بيتعمل له hoist كـ `undefined`.",
      ),
      L(
        "`const` freezes the binding, not the heap object. Mutating `cart.items` is fine; `cart = {}` is not. That distinction keeps React-style state updates intentional.",
        "`const` بيقفل الـ binding مش الـ object في الـ heap. تعدّل `cart.items` عادي؛ `cart = {}` لأ. الفرق ده بيخلّي تحديثات الـ state أوضح.",
      ),
    ],
    pitfalls: pitfall(
      `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// prints 3, 3, 3`,
      L(
        "`var` is function-scoped — every timeout shares one `i`.",
        "`var` function-scoped — كل الـ timeouts بيشاركوا نفس `i`.",
      ),
      `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// prints 0, 1, 2`,
      L(
        "`let` creates a fresh binding per iteration.",
        "`let` بيعمل binding جديدة لكل لفة في الـ loop.",
      ),
    ),
  },
  "data-types": {
    hard: hardExample(
      `// Formatting API user prefs without mutating the response
const apiUser = { name: "Samira", tags: ["js", "html"] };

const viewModel = {
  ...apiUser,
  tags: [...apiUser.tags, "css"],
  displayName: apiUser.name.toUpperCase(),
};

console.log(apiUser.tags.join(","));
console.log(viewModel.tags.join(","));`,
      "js,html\njs,html,css",
    ),
    deepDive: [
      L(
        "Primitives are stored by value (often in registers / stack slots). Objects live on the heap; variables hold references (pointers) the GC tracks.",
        "الـ Primitives بتتخزن by value (غالبًا في registers / stack). الـ objects على الـ heap؛ الـ variables بتشيل references والـ GC بيتتبعها.",
      ),
      L(
        "Shallow copies (`{...obj}`, `[...arr]`) duplicate only the top level. Nested objects still share references — use `structuredClone` when you need a deep snapshot.",
        "الـ shallow copy بتكرر المستوى الأول بس. الـ nested objects لسه shared — استخدم `structuredClone` لو محتاج deep snapshot.",
      ),
    ],
    pitfalls: pitfall(
      `const a = { score: 1 };
const b = a;
b.score = 99;
// a.score is also 99 — surprise shared mutation`,
      L(
        "Assignment copied the reference, not the object.",
        "الـ assignment نسخ الـ reference مش الـ object.",
      ),
      `const a = { score: 1 };
const b = { ...a };
b.score = 99;
// a.score stays 1`,
      L(
        "Spread creates a new top-level object.",
        "الـ spread بيعمل object جديد على المستوى الأول.",
      ),
    ),
  },
  equality: {
    hard: hardExample(
      `// Guard UI flags coming from query strings / forms
function isEnabled(flag) {
  return flag === true || flag === "true";
}

console.log(isEnabled(true));
console.log(isEnabled("true"));
console.log(isEnabled(1)); // loose APIs still fail closed with ===`,
      "true\ntrue\nfalse",
    ),
    deepDive: [
      L(
        "`==` applies the Abstract Equality Comparison algorithm (type coercion tables in the ECMAScript spec). That is why `[] == false` can surprise you.",
        "`==` بيطبق Abstract Equality Comparison (جداول الـ coercion في مواصفات ECMAScript). عشان كده `[] == false` ممكن تفاجئك.",
      ),
      L(
        "`===` is SameValue-ish for most cases (except `NaN`). Prefer explicit conversions: `Number(x)`, `Boolean(x)`, then `===`.",
        "`===` أقرب لـ SameValue في أغلب الحالات (ماعدا `NaN`). فضّل conversion واضح: `Number(x)` بعدين `===`.",
      ),
    ],
    pitfalls: pitfall(
      `if (userId == true) {
  // "1" and 1 both sneak in via coercion
}`,
      L(
        "Loose checks invite type bugs from APIs and forms.",
        "الـ loose checks بتجيب bugs من الـ APIs والفورم.",
      ),
      `if (userId === 1 || userId === "1") {
  // intentional, explicit cases only
}`,
      L(
        "List the shapes you accept — no silent coercion.",
        "اكتب الأشكال المقبولة صراحة — من غير coercion صامت.",
      ),
    ),
  },
  "functions-scope": {
    hard: hardExample(
      `// Closure keeps private UI state for a counter widget
function createCounter(start = 0) {
  let value = start;
  return {
    inc: () => ++value,
    get: () => value,
  };
}

const likes = createCounter(2);
likes.inc();
console.log(likes.get());`,
      "3",
    ),
    deepDive: [
      L(
        "Lexical scope is resolved at authoring time. Closures retain references to outer environment records, which is why they can outlive the function call that created them.",
        "الـ lexical scope بيتحدد وقت الكتابة. الـ closures بتمسك references لـ outer environment records — عشان كده تقدر تعيش أطول من الـ call اللي عملها.",
      ),
      L(
        "Too many long-lived closures holding large objects can delay GC. Null out big captured refs when a widget unmounts if you build manual cleanup.",
        "closures كتير ماسكة objects كبيرة ممكن تأخر الـ GC. لو عندك cleanup يدوي، فك الـ refs الكبيرة لما الـ widget يتشال.",
      ),
    ],
    pitfalls: pitfall(
      `function makeHandlers() {
  var buttons = [];
  for (var i = 0; i < 3; i++) {
    buttons.push(() => i);
  }
  return buttons.map((fn) => fn());
}
// [3, 3, 3]`,
      L(
        "Shared `var` binding across iterations.",
        "`var` واحدة متشتركة بين كل اللفات.",
      ),
      `function makeHandlers() {
  return [0, 1, 2].map((i) => () => i).map((fn) => fn());
}
// [0, 1, 2]`,
      L(
        "Each callback closes over its own `i`.",
        "كل callback بيقفل على `i` الخاصة بيه.",
      ),
    ),
  },
  "arrow-this": {
    hard: hardExample(
      `// React-ish class method scheduling UI updates
const store = {
  items: ["a"],
  commit(item) {
    this.items = [...this.items, item];
  },
  schedule(item) {
    setTimeout(() => this.commit(item), 0);
  },
};

store.schedule("b");
setTimeout(() => console.log(store.items.join(",")), 10);`,
      "a,b",
    ),
    deepDive: [
      L(
        "Ordinary functions set `this` from the call site (or `undefined` in strict mode). Arrows close over `this` like any other lexical variable — they never get their own.",
        "الـ ordinary functions بتاخد `this` من الـ call site. الـ arrows بتقفل على `this` زي أي lexical variable — ومش بتمتلك واحدة خاصة.",
      ),
      L(
        "That is why arrows shine as callbacks inside methods, and fail as object methods that expect dynamic `this`.",
        "عشان كده ممتازة كـ callbacks جوه methods، وضعيفة كـ object methods محتاجة dynamic `this`.",
      ),
    ],
    pitfalls: pitfall(
      `const ui = {
  label: "Save",
  onClick: () => console.log(this.label),
};
ui.onClick(); // undefined (or global)`,
      L(
        "Arrow as method does not bind to `ui`.",
        "الـ arrow كـ method مش بترتبط بـ `ui`.",
      ),
      `const ui = {
  label: "Save",
  onClick() {
    console.log(this.label);
  },
};
ui.onClick(); // Save`,
      L(
        "Use a regular method when `this` should be the object.",
        "استخدم regular method لما `this` يكون الـ object.",
      ),
    ),
  },
  "arrays-hof": {
    hard: hardExample(
      `// Normalize cart lines from an API payload
const payload = [
  { id: 1, price: 20, qty: 2, active: true },
  { id: 2, price: 5, qty: 1, active: false },
  { id: 3, price: 12, qty: 3, active: true },
];

const total = payload
  .filter((line) => line.active)
  .map((line) => line.price * line.qty)
  .reduce((sum, n) => sum + n, 0);

console.log(total);`,
      "76",
    ),
    deepDive: [
      L(
        "`map`/`filter` allocate new arrays — great for readability, but in hot paths over huge lists consider a single `for` loop or `for…of` to cut intermediate allocations.",
        "`map`/`filter` بيعملوا arrays جديدة — حلوين للقراءة، بس في hot paths على lists ضخمة فكّر في `for` واحد تقلل الـ allocations.",
      ),
      L(
        "`reduce` is powerful but easy to abuse. If you are building another array, `map`/`filter` (or `flatMap`) usually communicates intent better.",
        "`reduce` قوي بس سهل يتعمل فيه abuse. لو بتبني array تانية، `map`/`filter` أوضح.",
      ),
    ],
    pitfalls: pitfall(
      `const nums = [1, 2, 3];
nums.map((n) => {
  nums.push(n * 10); // mutating while iterating
});`,
      L(
        "Mutating the source during HOFs invites chaos.",
        "تعديل المصدر أثناء الـ HOFs بيسبب فوضى.",
      ),
      `const nums = [1, 2, 3];
const next = nums.map((n) => n * 10);
console.log(next);`,
      L(
        "Return new data; leave the source alone.",
        "ارجع data جديدة؛ سيب المصدر في حاله.",
      ),
    ),
  },
  "objects-destructuring": {
    hard: hardExample(
      `// Pull only what a profile card needs from a fat API user
function toCard({ name, avatarUrl = "/default.png", role = "member" }) {
  return { title: name, image: avatarUrl, badge: role };
}

const api = {
  name: "Nour",
  email: "n@x.com",
  role: "admin",
  meta: { lastLogin: "today" },
};

console.log(JSON.stringify(toCard(api)));`,
      '{"title":"Nour","image":"/default.png","badge":"admin"}',
    ),
    deepDive: [
      L(
        "Destructuring is syntactic sugar over property access. Defaults apply only when the value is `undefined` (not `null`).",
        "الـ Destructuring سكر نحوي فوق property access. الـ defaults بتشتغل مع `undefined` بس (مش `null`).",
      ),
      L(
        "In function params, destructuring documents the dependency surface — callers see exactly which fields matter.",
        "في الـ params، الـ destructuring بيوضّح الـ API — مين ينادي يشوف أنهي fields مهمة.",
      ),
    ],
    pitfalls: pitfall(
      `const user = undefined;
const { name } = user; // TypeError`,
      L(
        "Cannot destructure `null`/`undefined`.",
        "مينفعش تعمل destructure لـ `null`/`undefined`.",
      ),
      `const user = undefined;
const { name } = user ?? {};
console.log(name); // undefined`,
      L(
        "Provide a fallback object before unpacking.",
        "حط object احتياطي قبل ما تفك.",
      ),
    ),
  },
  promises: {
    hard: hardExample(
      `function saveDraft(text) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, chars: text.length }), 200);
  });
}

saveDraft("hello UI")
  .then((res) => console.log(res.ok, res.chars))
  .catch((err) => console.error(err));`,
      "true 8",
    ),
    deepDive: [
      L(
        "Promise reactions (`.then` handlers) enqueue as microtasks. They run after the current stack clears, before the next macrotask (timeout/message).",
        "handlers بتاعة `.then` بتتخش كـ microtasks. بتتنفّذ بعد ما الـ stack يفضى، وقبل الـ macrotask الجاية.",
      ),
      L(
        "Unhandled rejections surface as `unhandledrejection` — always return/await promises or attach `.catch` in UI flows.",
        "الـ rejections من غير catch بتظهر كـ `unhandledrejection` — دايمًا ارجع/await أو حط `.catch` في مسارات الـ UI.",
      ),
    ],
    pitfalls: pitfall(
      `doWork().then((v) => {
  mightThrow(v);
});
// rejection can become unhandled`,
      L(
        "Errors inside `then` need a following `catch`.",
        "الأخطاء جوه `then` محتاجة `catch` بعدها.",
      ),
      `doWork()
  .then((v) => mightThrow(v))
  .catch((err) => console.error(err));`,
      L(
        "Chain `.catch` (or use async/await try/catch).",
        "اربط `.catch` (أو استخدم async/await try/catch).",
      ),
    ),
  },
  "async-await-fetch": {
    hard: hardExample(
      `async function loadTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (!res.ok) throw new Error("HTTP " + res.status);
  const todo = await res.json();
  return {
    title: todo.title,
    done: Boolean(todo.completed),
  };
}

loadTodos().then((card) => console.log(card.done, card.title.slice(0, 12)));`,
      "false delectus au",
    ),
    deepDive: [
      L(
        "`await` splits an async function into promise continuations under the hood — sugar over generators + promises in engines historically, now a first-class completion style.",
        "`await` بتقسم الـ async function لاستكمالات Promise — سكر فوق نموذج الـ promises في الـ engines.",
      ),
      L(
        "Parallelize independent awaits with `Promise.all` instead of awaiting in series when waterfalls hurt UX latency.",
        "لو الطلبات مستقلة، استخدم `Promise.all` بدل await ورا بعض عشان تقلل latency.",
      ),
    ],
    pitfalls: pitfall(
      `const data = await fetch(url).then((r) => r.json());
// ignores HTTP 404/500 — still parses body`,
      L(
        "`fetch` only rejects on network failure, not HTTP errors.",
        "`fetch` بيرفض في فشل الشبكة بس، مش أخطاء HTTP.",
      ),
      `const res = await fetch(url);
if (!res.ok) throw new Error("HTTP " + res.status);
const data = await res.json();`,
      L(
        "Check `res.ok` (or status) before trusting JSON.",
        "افحص `res.ok` قبل ما تثق في الـ JSON.",
      ),
    ),
  },
  "event-loop": {
    hard: hardExample(
      `// Keep input snappy: defer heavy work
console.log("paint UI");

queueMicrotask(() => console.log("normalize state"));

setTimeout(() => console.log("analytics ping"), 0);

console.log("accept keypress");`,
      "paint UI\naccept keypress\nnormalize state\nanalytics ping",
    ),
    deepDive: [
      L(
        "Each event loop turn: run one macrotask → drain the microtask queue → optional render. Promise handlers beat `setTimeout(0)`.",
        "كل لفة: macrotask → تفريغ microtasks → (اختياري) render. handlers الـ Promise قبل `setTimeout(0)`.",
      ),
      L(
        "Long sync work monopolizes the call stack and janks the UI. Break it up with `await`/`scheduler`/`setTimeout` chunks.",
        "الشغل الـ sync الطويل بيمسك الـ call stack ويجمد الـ UI. قسّمه بـ `await` أو chunks بـ `setTimeout`.",
      ),
    ],
    pitfalls: pitfall(
      `setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
// expecting timeout first — wrong`,
      L(
        "Microtasks run before the next timer macrotask.",
        "الـ Microtasks قبل الـ timer macrotask.",
      ),
      `Promise.resolve().then(() => console.log("promise"));
setTimeout(() => console.log("timeout"), 0);
// promise, then timeout`,
      L(
        "Learn the ordering — it explains racey UI bugs.",
        "اتعلّم الترتيب — بيفسّر bugs سباق في الـ UI.",
      ),
    ),
  },
};

function fallbackOverlay(lesson: LegacyLesson): Overlay {
  return {
    hard: jsFallbackTiers.hard,
    deepDive: [
      L(
        "Engines parse, compile (often JIT), and optimize hot functions. Write clear code first — readability beats micro-tweaks until you measure.",
        "الـ engines بتعمل parse وcompile (غالبًا JIT) وتحسين للدوال الساخنة. اكتب code واضح الأول — القياس قبل أي micro-optimization.",
      ),
      L(
        "When debugging, watch values, references, and async timing separately. Most 'weird' bugs are one of those three.",
        "وأنت بتعمل debugging، افصل: القيم، الـ references، وتوقيت الـ async. أغلب الـ bugs الغريبة من الثلاثة دول.",
      ),
    ],
    pitfalls: pitfall(
      `// vague check — easy to misuse
if (value) {
  doWork(value);
}`,
      L(
        "Truthy checks hide empty strings, `0`, and unexpected types.",
        "فحوصات truthy بتخفي empty string و `0` وأنواع غير متوقعة.",
      ),
      `if (value !== undefined && value !== null) {
  doWork(value);
}`,
      L(
        "Be explicit about the states you allow.",
        "كن صريح في الحالات المسموحة.",
      ),
    ),
  };
}

export function enrichLegacyLesson(lesson: LegacyLesson, order: number): Lesson {
  const overlay = overlays[lesson.slug] ?? fallbackOverlay(lesson);
  const pack =
    javascriptInsights[lesson.slug] ??
    defaultInsights(lesson.content.title.en, lesson.content.title.ar);
  return {
    id: lesson.id,
    order,
    slug: lesson.slug,
    tier: lesson.difficulty,
    readMinutes: lesson.readMinutes + 2,
    icon: lesson.icon,
    visualizer: lesson.visualizer,
    content: {
      title: lesson.content.title,
      summary: lesson.content.summary,
      paragraphs: lesson.content.paragraphs,
      keyPoints: lesson.content.keyPoints,
      examples: [
        simpleExample(
          lesson.content.code,
          lesson.content.expectedOutput.en,
          lesson.content.expectedOutput.ar,
        ),
        jsMediumExamples[lesson.slug] ?? jsFallbackTiers.medium,
        overlay.hard,
      ],
      visualHint: lesson.content.visualHint,
      underTheHood: pack.underTheHood,
      accessibility: pack.accessibility,
      seo: pack.seo,
      pitfalls: overlay.pitfalls,
    },
  };
}
