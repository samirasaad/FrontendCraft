import type { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  {
    id: "1",
    order: 1,
    slug: "var-let-const",
    difficulty: "beginner",
    readMinutes: 6,
    icon: "Box",
    visualizer: "memory-lock",
    content: {
      title: {
        en: "var, let & const",
        ar: "var, let & const",
      },
      summary: {
        en: "How JavaScript stores variables in memory — and which boxes can be locked.",
        ar: "إزاي JavaScript بتخزن الـ variables في الـ memory — وإيه الصناديق اللي ممكن تقفلها.",
      },
      paragraphs: [
        {
          en: "Think of memory as labeled boxes. `var` is the old sticky note: function-scoped and easy to overwrite by mistake.",
          ar: "تخيّل الـ memory صناديق ليها أسماء. `var` زي ورقة لاصقة قديمة: function-scoped وسهلة تتكتب فوقها بالغلط.",
        },
        {
          en: "`let` is a modern box you can reopen and change. `const` is a locked lid — the binding cannot be reassigned.",
          ar: "`let` صندوق حديث تقدر تفتحه وتغيّر اللي جواه. `const` غطاؤه مقفول — مينفعش تعمل reassign للـ binding.",
        },
        {
          en: "Prefer `const` by default. Switch to `let` only when the value must change. Avoid `var` in modern code.",
          ar: "ابدأ بـ `const`. استخدم `let` بس لو الـ value لازم تتغير. وابتعد عن `var` في الـ code الحديث.",
        },
      ],
      keyPoints: [
        {
          en: "`var` is function-scoped and hoisted in surprising ways",
          ar: "`var` هي function-scoped وبيتعمل لها hoist بشكل ممكن يفاجئك",
        },
        {
          en: "`let` / `const` are block-scoped (`{}`)",
          ar: "`let` و `const` هما block-scoped (`{}`)",
        },
        {
          en: "`const` locks the binding, not deep object contents",
          ar: "`const` بيقفل الـ binding، مش المحتوى الداخلي للـ object",
        },
      ],
      code: `const PI = 3.14;
let score = 0;
score = score + 10;

// PI = 3; // ❌ TypeError: Assignment to constant variable

console.log(PI, score);`,
      expectedOutput: {
        en: "3.14 10",
        ar: "3.14 10",
      },
      visualHint: {
        en: "Watch the const box lock while let stays editable.",
        ar: "راقب صندوق `const` وهو بيتقفل، و`let` بيفضل editable.",
      },
    },
  },
  {
    id: "2",
    order: 2,
    slug: "data-types",
    difficulty: "beginner",
    readMinutes: 7,
    icon: "Layers",
    visualizer: "primitive-vs-reference",
    content: {
      title: {
        en: "Data Types: Primitive vs Reference",
        ar: "Data Types: Primitive vs Reference",
      },
      summary: {
        en: "Copying a number copies the value. Copying an object copies the address.",
        ar: "نسخ الـ number بينسخ الـ value. نسخ الـ object بينسخ الـ address في الـ memory.",
      },
      paragraphs: [
        {
          en: "Primitives (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) live as values. Assigning them copies the value into a new box.",
          ar: "الـ Primitives (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) بتتخزن كـ value. لما تنسخها، بتنسخ الـ value نفسها في صندوق جديد.",
        },
        {
          en: "Objects and arrays are references. Two variables can point at the same heap object — mutate one, and both see the change.",
          ar: "الـ objects والـ arrays هما references. اتنين variables ممكن يشيروا لنفس الـ object في الـ heap — لو عملت mutate من واحد، الاتنين هيشوفوا التغيير.",
        },
        {
          en: "Need a real copy? Clone carefully (`structuredClone`, spread for shallow copies) instead of assuming assignment duplicates data.",
          ar: "عايز copy حقيقية؟ استخدم clone بوعي (`structuredClone` أو spread للـ shallow copy) ومتفتكرش إن الـ assignment بيعمل duplicate كامل.",
        },
      ],
      keyPoints: [
        {
          en: "Primitives copy by value",
          ar: "الـ Primitives بتعمل copy by value",
        },
        {
          en: "Objects/arrays copy by reference",
          ar: "الـ objects / arrays بتعمل copy by reference",
        },
        {
          en: "Shared references explain many 'weird' bugs",
          ar: "الـ shared references بتفسر bugs غريبة كتير",
        },
      ],
      code: `let a = 5;
let b = a;
b = 9;
console.log(a, b); // 5 9  ← separate values

const user1 = { name: "Samira" };
const user2 = user1;
user2.name = "Omar";
console.log(user1.name); // Omar  ← same object`,
      expectedOutput: {
        en: "5 9\\nOmar",
        ar: "5 9\\nOmar",
      },
      visualHint: {
        en: "Yellow chip = value copy. Cyan arrow = shared address.",
        ar: "الشارة الصفراء = value copy. السهم السماوي = shared address.",
      },
    },
  },
  {
    id: "3",
    order: 3,
    slug: "equality",
    difficulty: "beginner",
    readMinutes: 5,
    icon: "Scale",
    visualizer: "equality",
    content: {
      title: {
        en: "Equality: == vs ===",
        ar: "Equality: == vs ===",
      },
      summary: {
        en: "`==` coerces types. `===` demands the same type and value.",
        ar: "`==` بيعمل type coercion. `===` عايز نفس الـ type ونفس الـ value.",
      },
      paragraphs: [
        {
          en: "Loose equality (`==`) tries to make types match before comparing. That is why `0 == false` is `true` — surprising and risky.",
          ar: "الـ loose equality (`==`) بتحاول تخلّي الـ types متشابهة قبل المقارنة. عشان كده `0 == false` بتطلع `true` — مفاجئة وخطيرة.",
        },
        {
          en: "Strict equality (`===`) skips coercion. Different types? Instant `false`. This is the default you want almost everywhere.",
          ar: "الـ strict equality (`===`) من غير coercion. types مختلفة؟ على طول `false`. دي الـ default اللي تستخدمها في أغلب الأماكن.",
        },
        {
          en: "Exception to learn later: `NaN === NaN` is `false` — use `Number.isNaN` for that check.",
          ar: "استثناء هتتعلمه بعدين: `NaN === NaN` بتطلع `false` — استخدم `Number.isNaN` للـ check ده.",
        },
      ],
      keyPoints: [
        {
          en: "Prefer `===` and `!==` by default",
          ar: "فضّل `===` و `!==` كـ default",
        },
        {
          en: "`==` hides type coercion bugs",
          ar: "`==` بيخفي bugs بتاعة type coercion",
        },
        {
          en: "Compare intentional conversions explicitly",
          ar: "لو هتعمل type conversion، اعملها بوضوح قبل المقارنة",
        },
      ],
      code: `console.log(0 == false);   // true  (coercion)
console.log(0 === false);  // false (strict)
console.log("5" == 5);     // true
console.log("5" === 5);    // false`,
      expectedOutput: {
        en: "true\\nfalse\\ntrue\\nfalse",
        ar: "true\\nfalse\\ntrue\\nfalse",
      },
      visualHint: {
        en: "Loose scale bends types; strict matcher snaps only on exact pairs.",
        ar: "الـ loose scale بيلوي الـ types؛ الـ strict matcher بيقبل الـ pairs المطابقة بس.",
      },
    },
  },
  {
    id: "4",
    order: 4,
    slug: "functions-scope",
    difficulty: "intermediate",
    readMinutes: 8,
    icon: "Focus",
    visualizer: "scope",
    content: {
      title: {
        en: "Functions & Scope",
        ar: "Functions & Scope",
      },
      summary: {
        en: "Scope is the spotlight: who can see which variables.",
        ar: "الـ Scope زي spotlight: مين يقدر يشوف أنهي variables.",
      },
      paragraphs: [
        {
          en: "Every function creates a local scope. Variables declared inside are hidden from the outside world.",
          ar: "كل function بتعمل local scope. الـ variables اللي جواها متتشافش من بره.",
        },
        {
          en: "Inner scopes can read outer variables (lexical scope / closures). Outer scopes cannot peek into inner ones.",
          ar: "الـ inner scope يقدر يقرأ variables من بره (lexical scope / closures). الـ outer scope مينفعش يبص لجوه.",
        },
        {
          en: "Shadowing happens when an inner name hides an outer one — useful, but easy to confuse while debugging.",
          ar: "الـ Shadowing بيحصل لما اسم جوه يغطي على اسم بره — مفيد، بس سهل يلبّسك وأنت بتعمل debugging.",
        },
      ],
      keyPoints: [
        {
          en: "Functions create local scopes",
          ar: "الـ Functions بتعمل local scope",
        },
        {
          en: "Inner → outer visibility (not the reverse)",
          ar: "الرؤية من inner → outer (مش العكس)",
        },
        {
          en: "Closures remember their birth scope",
          ar: "الـ Closures بتفضل فاكرة الـ scope اللي اتولدت فيه",
        },
      ],
      code: `const globalMsg = "hello";

function greet(name) {
  const local = "hi";
  return local + " " + name + " | " + globalMsg;
}

console.log(greet("JS"));
// console.log(local); // ❌ ReferenceError`,
      expectedOutput: {
        en: "hi JS | hello",
        ar: "hi JS | hello",
      },
      visualHint: {
        en: "The spotlight reveals only variables visible from the current scope.",
        ar: "الـ spotlight بيورّي الـ variables المرئية من الـ scope الحالي بس.",
      },
    },
  },
  {
    id: "5",
    order: 5,
    slug: "arrow-this",
    difficulty: "intermediate",
    readMinutes: 8,
    icon: "Target",
    visualizer: "this-context",
    content: {
      title: {
        en: "Arrow Functions & this",
        ar: "Arrow Functions & this",
      },
      summary: {
        en: "Arrow functions inherit `this` from where they were written — not how they are called.",
        ar: "الـ Arrow functions بتاخد `this` من مكان كتابتها — مش من طريقة الـ call.",
      },
      paragraphs: [
        {
          en: "Regular functions get a dynamic `this` based on the call site (`obj.method()`, `call`, `apply`, `bind`).",
          ar: "الـ regular functions بتاخد `this` dynamic حسب الـ call site (`obj.method()`, `call`, `apply`, `bind`).",
        },
        {
          en: "Arrow functions have no own `this`. They lexically capture the surrounding `this` — perfect for callbacks inside methods.",
          ar: "الـ Arrow functions مفيش عندها `this` خاص. بتاخد `this` lexical من حواليها — ممتازة للـ callbacks جوه الـ methods.",
        },
        {
          en: "Do not use arrows as object methods when you need `this` to mean the object itself.",
          ar: "متستخدمش arrow كـ method للـ object لو محتاج `this` يعني الـ object نفسه.",
        },
      ],
      keyPoints: [
        {
          en: "Arrows = lexical `this`",
          ar: "Arrow = lexical `this`",
        },
        {
          en: "Regular functions = dynamic `this`",
          ar: "Regular functions = dynamic `this`",
        },
        {
          en: "Pick the style that matches the context you need",
          ar: "اختار الأسلوب اللي يناسب الـ context اللي محتاجه",
        },
      ],
      code: `const counter = {
  count: 0,
  bump() {
    const add = () => {
      this.count += 1; // lexical this → counter
    };
    add();
  },
};

counter.bump();
console.log(counter.count);`,
      expectedOutput: {
        en: "1",
        ar: "1",
      },
      visualHint: {
        en: "The cyan target locks to the lexical owner for arrow callbacks.",
        ar: "الهدف السماوي بيتثبت على الـ lexical owner للـ arrow callback.",
      },
    },
  },
  {
    id: "6",
    order: 6,
    slug: "arrays-hof",
    difficulty: "intermediate",
    readMinutes: 9,
    icon: "ListFilter",
    visualizer: "array-hof",
    content: {
      title: {
        en: "Arrays & Higher-Order Functions",
        ar: "Arrays & Higher-Order Functions",
      },
      summary: {
        en: "Transform lists with a conveyor: map reshapes, filter keeps, reduce accumulates.",
        ar: "حوّل الـ lists زي conveyor: `map` بيشكل، `filter` بيصفّي، `reduce` بيجمّع.",
      },
      paragraphs: [
        {
          en: "`map` returns a new array with each item transformed. Original stays untouched if you avoid mutation inside.",
          ar: "`map` بيرجع array جديدة بعد transform لكل item. الأصلية بتفضل زي ما هي لو مجتش عدّلت (mutation) جوه.",
        },
        {
          en: "`filter` keeps items that pass a test. `reduce` folds the whole list into one value (sum, object, string…).",
          ar: "`filter` بيسيب الـ items اللي تعدّي الـ test. `reduce` بيطوي الـ list كلها لـ value واحدة (sum, object, string…).",
        },
        {
          en: "Chain them for readable pipelines instead of nested `for` loops packed with temporary variables.",
          ar: "اربطهم ورا بعض كـ pipeline مقروء بدل nested `for` loops مليانة temporary variables.",
        },
      ],
      keyPoints: [
        {
          en: "`map` → transform each item",
          ar: "`map` → transform لكل item",
        },
        {
          en: "`filter` → keep matching items",
          ar: "`filter` → خلّي الـ items المناسبة",
        },
        {
          en: "`reduce` → accumulate to one result",
          ar: "`reduce` → accumulate لنتيجة واحدة",
        },
      ],
      code: `const prices = [10, 25, 40, 5];

const discounted = prices.map((p) => p * 0.9);
const bigOnes = discounted.filter((p) => p >= 20);
const total = bigOnes.reduce((sum, p) => sum + p, 0);

console.log(discounted);
console.log(bigOnes);
console.log(total);`,
      expectedOutput: {
        en: "[9, 22.5, 36, 4.5]\\n[22.5, 36]\\n58.5",
        ar: "[9, 22.5, 36, 4.5]\\n[22.5, 36]\\n58.5",
      },
      visualHint: {
        en: "Items travel the belt: reshape → keep → combine.",
        ar: "الـ items بتمشي على الـ belt: reshape → keep → combine.",
      },
    },
  },
  {
    id: "7",
    order: 7,
    slug: "objects-destructuring",
    difficulty: "intermediate",
    readMinutes: 7,
    icon: "Gift",
    visualizer: "destructuring",
    content: {
      title: {
        en: "Objects & Destructuring",
        ar: "Objects & Destructuring",
      },
      summary: {
        en: "Unpack properties into variables like opening a gift into labeled trays.",
        ar: "فك الـ properties لـ variables زي ما بتفتح هدية وتحطها في صواني بأسماء.",
      },
      paragraphs: [
        {
          en: "Objects group related data as key/value pairs. Dot or bracket notation reads properties.",
          ar: "الـ object بيجمّع data مرتبطة كـ key/value pairs. الـ dot أو bracket notation بتقرا الـ properties.",
        },
        {
          en: "Destructuring pulls keys into local variables in one line — cleaner function params and clearer intent.",
          ar: "الـ Destructuring بيسحب الـ keys لـ local variables في سطر واحد — function params أنضف ونية أوضح.",
        },
        {
          en: "Rename, defaults, and nested unpacking are all supported. Same idea works for arrays too.",
          ar: "تقدر تعمل rename، وdefaults، وnested unpacking. نفس الفكرة شغّالة مع الـ arrays كمان.",
        },
      ],
      keyPoints: [
        {
          en: "Objects store keyed data",
          ar: "الـ Objects بتخزن keyed data",
        },
        {
          en: "Destructure to extract what you need",
          ar: "استخدم Destructuring تستخرج اللي محتاجه",
        },
        {
          en: "Defaults & renaming keep code resilient",
          ar: "الـ defaults والـ renaming بتخلّي الـ code أقوى",
        },
      ],
      code: `const user = { name: "Nour", role: "dev", city: "Cairo" };

const { name, role: job, city = "Unknown" } = user;
console.log(name, job, city);

function greet({ name }) {
  return "Hello, " + name;
}
console.log(greet(user));`,
      expectedOutput: {
        en: "Nour dev Cairo\\nHello, Nour",
        ar: "Nour dev Cairo\\nHello, Nour",
      },
      visualHint: {
        en: "The gift opens and labels fly into named trays.",
        ar: "الهدية بتتفتح والـ labels بتطير للصواني المسماة.",
      },
    },
  },
  {
    id: "8",
    order: 8,
    slug: "promises",
    difficulty: "advanced",
    readMinutes: 10,
    icon: "Timer",
    visualizer: "promises",
    content: {
      title: {
        en: "Asynchronous JS & Promises",
        ar: "Asynchronous JS & Promises",
      },
      summary: {
        en: "A Promise is a restaurant order ticket: pending → fulfilled or rejected.",
        ar: "الـ Promise زي تذكرة طلب في مطعم: pending → fulfilled أو rejected.",
      },
      paragraphs: [
        {
          en: "JS is single-threaded. Long waits (network, timers) must not freeze the main thread — so work becomes async.",
          ar: "JavaScript هي single-threaded. الانتظار الطويل (network, timers) مش لازم يجمد الـ main thread — عشان كده الشغل بيبقى async.",
        },
        {
          en: "A Promise represents a future value. Attach `.then` for success and `.catch` for failure.",
          ar: "الـ Promise بتمثل future value. اربط `.then` للنجاح و `.catch` للفشل.",
        },
        {
          en: "Prefer returning promises and composing them over nesting callbacks (callback hell).",
          ar: "فضّل ترجع Promises وتركّبها بدل ما تعشّش callbacks جوه بعض (callback hell).",
        },
      ],
      keyPoints: [
        {
          en: "States: pending → fulfilled | rejected",
          ar: "الـ States: pending → fulfilled | rejected",
        },
        {
          en: "`.then` / `.catch` / `.finally`",
          ar: "`.then` / `.catch` / `.finally`",
        },
        {
          en: "Compose async steps instead of nesting",
          ar: "ركّب خطوات الـ async بدل الـ nesting",
        },
      ],
      code: `function orderFood(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("🍕 ready"), ms);
  });
}

orderFood(800)
  .then((meal) => console.log(meal))
  .catch((err) => console.error(err));`,
      expectedOutput: {
        en: "🍕 ready  (after ~800ms)",
        ar: "🍕 ready  (بعد حوالي 800ms)",
      },
      visualHint: {
        en: "Follow the waiter ticket from pending to fulfilled.",
        ar: "اتبع تذكرة الطلب من pending لحد fulfilled.",
      },
    },
  },
  {
    id: "9",
    order: 9,
    slug: "async-await-fetch",
    difficulty: "advanced",
    readMinutes: 10,
    icon: "Network",
    visualizer: "async-await",
    content: {
      title: {
        en: "Async / Await & Fetch",
        ar: "Async / Await & Fetch",
      },
      summary: {
        en: "Write async code that reads like sync — while packets travel the network line.",
        ar: "اكتب async code يبان كأنه sync — والـ packets بتسافر على خط الـ network.",
      },
      paragraphs: [
        {
          en: "`async` functions always return a Promise. `await` pauses that function until the Promise settles — without blocking the whole page.",
          ar: "الـ `async` function دايمًا بترجع Promise. `await` بيوقف الـ function دي لحد ما الـ Promise تخلص — من غير ما توقف الصفحة كلها.",
        },
        {
          en: "`fetch` starts an HTTP request and returns a Promise. Remember to check `response.ok` and parse JSON with `response.json()`.",
          ar: "`fetch` بيبدأ HTTP request ويرجع Promise. متتنساش تفحص `response.ok` وتعمل parse للـ JSON بـ `response.json()`.",
        },
        {
          en: "Wrap awaits in `try/catch` for readable error handling — the modern twin of `.catch`.",
          ar: "حط الـ `await` جوه `try/catch` لـ error handling مقروء — النسخة الحديثة من `.catch`.",
        },
      ],
      keyPoints: [
        {
          en: "`async` → returns a Promise",
          ar: "`async` → بترجع Promise",
        },
        {
          en: "`await` → wait inside async functions",
          ar: "`await` → استنى جوه async functions",
        },
        {
          en: "`try/catch` for fetch failures",
          ar: "`try/catch` لأخطاء الـ fetch",
        },
      ],
      code: `async function loadUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    console.log(data.name);
  } catch (err) {
    console.error(err.message);
  }
}

loadUser();`,
      expectedOutput: {
        en: "Leanne Graham  (from the public API)",
        ar: "Leanne Graham  (من الـ public API)",
      },
      visualHint: {
        en: "Watch the packet leave, travel, and return as JSON.",
        ar: "راقب الـ packet وهي بتطلع، وتسافر، وترجع JSON.",
      },
    },
  },
  {
    id: "10",
    order: 10,
    slug: "event-loop",
    difficulty: "advanced",
    readMinutes: 11,
    icon: "Workflow",
    visualizer: "event-loop",
    content: {
      title: {
        en: "Event Loop & Call Stack",
        ar: "Event Loop & Call Stack",
      },
      summary: {
        en: "The call stack runs now. The queue waits its turn. The event loop is the traffic cop.",
        ar: "الـ Call Stack بيشغّل دلوقتي. الـ Queue بيستنى دوره. الـ Event Loop زي شرطي المرور.",
      },
      paragraphs: [
        {
          en: "Synchronous calls push frames onto the call stack and pop when finished. Overflow that stack and you get a crash.",
          ar: "الـ synchronous calls بتعمل push لـ frames على الـ Call Stack وبتتعمل pop لما تخلص. لو حصل stack overflow، بيحصل crash.",
        },
        {
          en: "Timers, promises, and I/O land in task queues. When the stack is empty, the event loop moves the next job in.",
          ar: "الـ timers والـ Promises والـ I/O بيروحوا لـ task queues. لما الـ Call Stack يفضى، الـ Event Loop بيدخل الـ job اللي بعده.",
        },
        {
          en: "Microtasks (Promise jobs) run before the next macrotask (timeout). That ordering explains many interview puzzles.",
          ar: "الـ Microtasks (Promise jobs) بتتنفّذ قبل الـ macrotask الجاية (`setTimeout`). الترتيب ده بيحل interview puzzles كتير.",
        },
      ],
      keyPoints: [
        {
          en: "Stack = what runs now",
          ar: "Call Stack = اللي بيتنفّذ دلوقتي",
        },
        {
          en: "Queue = what waits",
          ar: "Queue = اللي بيستنى",
        },
        {
          en: "Microtasks before macrotasks",
          ar: "Microtasks قبل Macrotasks",
        },
      ],
      code: `console.log("A");

setTimeout(() => console.log("C (macrotask)"), 0);

Promise.resolve().then(() => console.log("B (microtask)"));

console.log("D");`,
      expectedOutput: {
        en: "A\\nD\\nB (microtask)\\nC (macrotask)",
        ar: "A\\nD\\nB (microtask)\\nC (macrotask)",
      },
      visualHint: {
        en: "Frames climb the stack; queued tasks wait, then enter.",
        ar: "الـ frames بتطلع على الـ Call Stack؛ الـ queued tasks بتستنى وبعدين تدخل.",
      },
    },
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
