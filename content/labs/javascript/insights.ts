import { insight, L } from "@/content/helpers";
import type { ProductionInsights } from "@/content/labs/_insights";

export const javascriptInsights: Record<string, ProductionInsights> = {
  "var-let-const": {
    underTheHood: insight(
      [
        L(
          "V8 stores `var` bindings on the function/global object and hoists them as `undefined` before the line runs. `let` and `const` live in block-scoped environment records — accessing them in the Temporal Dead Zone (TDZ) throws `ReferenceError` instead of silently returning `undefined`.",
          "V8 بيحفظ `var` على الـ function/global object وبيعمله hoist كـ `undefined` قبل ما السطر ينفّذ. `let` و `const` عايشين في block-scoped environment records — لو قرأتهم في Temporal Dead Zone (TDZ) هيطلع `ReferenceError` مش `undefined` بصمت.",
        ),
        L(
          "`const` freezes the binding, not the object on the heap. Mutating `cart.items.push()` is valid; reassigning `cart = {}` is not. That distinction matters for React state, module singletons, and any pattern where you mutate a stable reference.",
          "`const` بيقفل الـ binding مش الـ object في الـ heap. تعديل `cart.items.push()` عادي؛ `cart = {}` لأ. الفرق ده مهم في React state و module singletons وأي pattern بتعدّل فيه reference ثابت.",
        ),
        L(
          "At runtime V8's Ignition bytecode uses different opcodes for lexical vs var declarations. Hot loops that capture `var` incorrectly can retain stale closures — a common source of subtle bugs in event handlers.",
          "في الـ runtime، Ignition bytecode في V8 بيستخدم opcodes مختلفة للـ lexical مقابل var. Loops ساخنة بتعمل capture غلط لـ `var` ممكن تحتفظ closures قديمة — مصدر شائع لـ bugs خفية في event handlers.",
        ),
      ],
      {
        bullets: [
          L("Prefer `const` by default; use `let` when rebinding is required", "فضّل `const` افتراضيًا؛ استخدم `let` لما محتاج rebind"),
          L("Never use `var` in new code — function scope + hoisting hides bugs", "متستخدمش `var` في code جديد — function scope + hoisting بيخفي bugs"),
          L("TDZ errors are intentional — they catch use-before-init", "أخطاء TDZ مقصودة — بتكشف use-before-init"),
          L("`const` objects remain mutable; only reassignment is blocked", "`const` objects لسه mutable؛ بس reassignment ممنوع"),
        ],
        code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// logs 0, 1, 2 — block scope per iteration`,
        codeCaption: L("Block-scoped `let` in async callbacks", "`let` بـ block scope في async callbacks"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Variable choice rarely touches AT directly, but closure bugs from `var` in loops can leave UI state stale — screen readers then announce outdated counts, labels, or expanded/collapsed states.",
          "اختيار المتغيرات نادرًا ما يأثر على AT مباشرة، لكن closure bugs من `var` في loops ممكن تسيب UI state قديم — و screen readers تعلن counts أو labels أو expanded/collapsed states غلط.",
        ),
        L(
          "When building interactive widgets, bind `let`/`const` per iteration or use `for...of` so keyboard handlers (Enter/Space) always operate on the current item, not a captured index from an old loop.",
          "لما تبني interactive widgets، اربط `let`/`const` لكل iteration أو استخدم `for...of` عشان keyboard handlers (Enter/Space) تشتغل على العنصر الحالي مش index قديم من loop.",
        ),
      ],
      {
        bullets: [
          L("Stale closures → wrong aria-expanded / aria-selected values", "Closures قديمة → قيم aria-expanded / aria-selected غلط"),
          L("Use block scope so focus targets match the active row", "استخدم block scope عشان focus targets تطابق الصف النشط"),
          L("Tab order follows DOM — fix logic before patching ARIA", "ترتيب Tab يتبع DOM — صلّح الـ logic قبل ما تلعب في ARIA"),
        ],
        code: `buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-pressed", "true");
    announce("Selected item " + (index + 1));
  });
});`,
        codeCaption: L("Stable handler per button avoids stale index", "Handler ثابت لكل button يتجنب index قديم"),
      },
    ),
    seo: insight(
      [
        L(
          "Binding semantics do not affect crawlers directly, but `var` hoisting bugs in client-side pagination or filter scripts can prevent content from rendering — Googlebot sees an empty shell until JS executes correctly.",
          "Semantics الـ bindings مش بتأثر على crawlers مباشرة، لكن bugs الـ hoisting في pagination أو filter scripts ممكن تمنع المحتوى من الـ render — Googlebot يشوف shell فاضي لحد ما JS ينفّذ صح.",
        ),
        L(
          "SSR/SSG should not rely on mutable globals (`var` at module scope) that differ between server and client. Hydration mismatches cause layout thrash and hurt CLS when the client re-renders lists or counts.",
          "SSR/SSG ماينفعش يعتمد على globals mutable (`var` على module scope) بتختلف بين server و client. Hydration mismatches بتسبب layout thrash وبتضر CLS لما الـ client يعيد render lists أو counts.",
        ),
      ],
      {
        bullets: [
          L("Hydration bugs from shared mutable state delay meaningful paint", "Hydration bugs من shared mutable state بتأخر meaningful paint"),
          L("Keep list-rendering logic deterministic for crawlers and users", "خلّي list-rendering logic حتمي للـ crawlers والمستخدمين"),
          L("Measure LCP after client scripts init — scope bugs show up there", "قِس LCP بعد init الـ client scripts — scope bugs بتظهر هناك"),
        ],
      },
    ),
  },

  "data-types": {
    underTheHood: insight(
      [
        L(
          "V8 represents primitives (number, string, boolean, null, undefined, symbol, bigint) on the stack or as immediate tagged values. Objects, arrays, and functions live on the heap with hidden classes (Shapes) that V8 uses to optimize property access.",
          "V8 بيمثل primitives (number, string, boolean, null, undefined, symbol, bigint) على الـ stack أو كـ tagged values فورية. Objects و arrays و functions عايشين على الـ heap بـ hidden classes (Shapes) اللي V8 بيستخدمها لتحسين property access.",
        ),
        L(
          "When you mix types on an object — adding properties out of order or deleting keys — V8 may transition to slower dictionary mode. Production code keeps object shapes stable for hot paths.",
          "لما تخلط types على object — تضيف properties بترتيب غريب أو تمسح keys — V8 ممكن يروح لـ dictionary mode أبطأ. Production code بيحافظ على object shapes ثابتة في المسارات الساخنة.",
        ),
        L(
          "Strings are immutable UTF-16 sequences in JS engines. Concatenating in tight loops allocates new heap strings; template literals and array `.join()` behave similarly — profile before optimizing string building in render paths.",
          "Strings immutable UTF-16 sequences في JS engines. Concatenation في loops ضيقة بيعمل heap strings جديدة؛ template literals و `.join()` شبه بعض — profile قبل ما تحسّن string building في render paths.",
        ),
      ],
      {
        bullets: [
          L("Primitives copy by value; objects copy by reference", "Primitives بتتنسخ by value؛ objects by reference"),
          L("Hidden classes reward consistent property order", "Hidden classes بتكافئ ترتيب properties ثابت"),
          L("BigInt and Number are distinct types — no implicit mixing", "BigInt و Number types مختلفة — مفيش mixing ضمني"),
          L("typeof null === 'object' is a legacy quirk — use === null checks", "typeof null === 'object' legacy quirk — استخدم === null"),
        ],
        code: `const user = { id: 1, name: "Sam" };
const copy = user; // same heap reference
copy.name = "Alex";
console.log(user.name); // "Alex"`,
        codeCaption: L("Objects share heap references", "Objects بتشارك heap references"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Type coercion in UI logic causes AT to announce wrong values — e.g. showing `0` items as empty because `if (count)` is falsy, or reading `[object Object]` when concatenating objects into labels.",
          "Type coercion في UI logic بيخلي AT تعلن values غلط — مثلًا `0` items تظهر فاضية لأن `if (count)` falsy، أو `[object Object]` لما تعمل concat لـ objects في labels.",
        ),
        L(
          "Always stringify numbers and dates for visible text and aria-label. Use `Intl.NumberFormat` / `Intl.DateTimeFormat` so VoiceOver and NVDA hear locale-correct output, not raw IEEE values or ISO strings.",
          "دايمًا stringify للأرقام والتواريخ في النص الظاهر و aria-label. استخدم `Intl.NumberFormat` / `Intl.DateTimeFormat` عشان VoiceOver و NVDA يسمعوا output صحيح للـ locale مش IEEE values خام.",
        ),
      ],
      {
        bullets: [
          L("Never rely on implicit string coercion for user-facing labels", "متعتمدش على string coercion ضمني في labels للمستخدم"),
          L("Announce numbers with units: aria-label=\"3 items selected\"", "اعلن الأرقام بوحدات: aria-label=\"3 items selected\""),
          L("Null/undefined guard before setting textContent or aria values", "Guard لـ null/undefined قبل textContent أو aria values"),
        ],
        code: `const count = 0;
el.textContent = count; // "0" — visible zero
el.setAttribute("aria-label", \`\${count} results\`);`,
        codeCaption: L("Explicit rendering preserves zero counts", "Render صريح يحافظ على zero counts"),
      },
    ),
    seo: insight(
      [
        L(
          "Structured data and meta tags need strings — `JSON-LD` injected with wrong types (numbers where strings expected) can invalidate rich results in Search Console.",
          "Structured data و meta tags محتاجة strings — `JSON-LD` متعمل inject بـ types غلط (numbers مكان strings) ممكن يبطل rich results في Search Console.",
        ),
        L(
          "Client-rendered pages that pass objects to `innerHTML` or templates without serialization may output blank or `[object Object]` in the HTML Googlebot receives — always coerce to meaningful text before paint.",
          "صفحات client-rendered بتمرر objects لـ `innerHTML` أو templates من غير serialization ممكن تطلع blank أو `[object Object]` في HTML اللي Googlebot بيستقبله — coerce لنص مفيد قبل paint.",
        ),
      ],
      {
        bullets: [
          L("Schema.org fields expect typed literals — validate before deploy", "حقول Schema.org بتتوقع typed literals — validate قبل deploy"),
          L("SSR must serialize dates/numbers consistently with client", "SSR لازم يسيرialize dates/numbers زي الـ client"),
          L("Avoid rendering undefined into title or meta description", "متعرضش undefined في title أو meta description"),
        ],
      },
    ),
  },

  "equality": {
    underTheHood: insight(
      [
        L(
          "The `===` operator uses SameValue semantics — no coercion. `==` runs Abstract Equality Comparison: null/undefined match each other, numbers and strings coerce, and `0` equals `-0` while `Object.is` distinguishes them.",
          "الـ operator `===` بيستخدم SameValue semantics — من غير coercion. `==` بيشغّل Abstract Equality Comparison: null/undefined يتطابقوا، numbers و strings بتعمل coerce، و `0` يساوي `-0` بينما `Object.is` بيفرق بينهم.",
        ),
        L(
          "V8 fast-paths `===` for SMIs (small integers) and known shapes. Deep equality (`JSON.stringify` or lodash `isEqual`) walks the heap — expensive in hot React memo comparisons; prefer stable IDs.",
          "V8 بيعمل fast-path لـ `===` للـ SMIs (small integers) و shapes معروفة. Deep equality (`JSON.stringify` أو lodash `isEqual`) بيمشي على الـ heap — غالي في React memo comparisons؛ فضّل stable IDs.",
        ),
        L(
          "NaN is the only value where `x !== x`. Use `Number.isNaN` instead of global `isNaN`, which coerces strings and often lies in form validation.",
          "NaN هو القيمة الوحيدة اللي `x !== x`. استخدم `Number.isNaN` بدل global `isNaN` اللي بيعمل coerce للـ strings وغالبًا بيكذب في form validation.",
        ),
      ],
      {
        bullets: [
          L("Default to `===` and `!==` in all production code", "اعتمد `===` و `!==` في كل production code"),
          L("Use `Object.is` for NaN and signed-zero edge cases", "استخدم `Object.is` لـ NaN و signed-zero edge cases"),
          L("Deep compare only at boundaries — API payloads, test assertions", "Deep compare عند الحدود بس — API payloads و test assertions"),
          L("SameValueZero: Map/Set use `===` except NaN matches NaN", "SameValueZero: Map/Set بتستخدم `===` إلا NaN يطابق NaN"),
        ],
        code: `Object.is(NaN, NaN);        // true
Object.is(+0, -0);           // false
NaN === NaN;                 // false`,
        codeCaption: L("Object.is vs === for edge cases", "Object.is مقابل === للحالات الحدية"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Loose equality in form validation (`value == null`) can mark fields valid when users typed `\"0\"` or empty strings — error summaries then fail to link to the right control for screen reader users.",
          "Loose equality في form validation (`value == null`) ممكن يعلّم fields صحيحة لما المستخدم كتب `\"0\"` أو empty strings — error summaries مش بترتبط بالـ control الصح لـ screen reader users.",
        ),
        L(
          "Compare ARIA state strings exactly: `aria-expanded=\"true\"` is not boolean true. Use strict checks before toggling `aria-pressed`, `aria-checked`, and live region updates.",
          "قارن ARIA state strings بالظبط: `aria-expanded=\"true\"` مش boolean true. استخدم strict checks قبل toggle لـ `aria-pressed` و `aria-checked` و live region updates.",
        ),
      ],
      {
        bullets: [
          L("Validate with strict type checks — `value === \"\"` not falsy alone", "Validate بـ strict type checks — `value === \"\"` مش falsy لوحده"),
          L("Compare role/state attributes as strings from getAttribute", "قارن role/state attributes كـ strings من getAttribute"),
          L("Announce validation errors when equality logic flips state", "اعلن validation errors لما equality logic يغيّر state"),
        ],
        code: `const expanded = btn.getAttribute("aria-expanded") === "true";
btn.setAttribute("aria-expanded", expanded ? "false" : "true");`,
        codeCaption: L("Strict string compare for ARIA toggles", "String compare صارم لـ ARIA toggles"),
      },
    ),
    seo: insight(
      [
        L(
          "Canonical URL and href comparisons in client routers often use loose equality — trailing slash mismatches create duplicate routes that Googlebot indexes separately unless redirects are strict.",
          "مقارنات canonical URL و href في client routers غالبًا loose equality — trailing slash mismatches بتعمل duplicate routes Googlebot بيفهرسها منفصلة إلا لو redirects strict.",
        ),
        L(
          "A/B tests comparing `variant == 1` with coerced query params can serve wrong HTML shell to crawlers if params arrive as strings — always normalize types before SSR branch logic.",
          "A/B tests بتقارن `variant == 1` مع query params متعملها coerce ممكن تخدم HTML shell غلط للـ crawlers — normalize types قبل SSR branch logic.",
        ),
      ],
      {
        bullets: [
          L("Normalize URLs with strict rules before emitting canonical link", "Normalize URLs بقواعد strict قبل canonical link"),
          L("SSR flags: compare booleans and enums with ===", "SSR flags: قارن booleans و enums بـ ==="),
          L("Avoid duplicate content from loose path matching", "تجنب duplicate content من loose path matching"),
        ],
      },
    ),
  },

  "functions-scope": {
    underTheHood: insight(
      [
        L(
          "Each function invocation creates a new execution context with its own variable environment and outer reference (scope chain). V8 allocates activation objects; closures retain outer bindings on the heap until nothing references them.",
          "كل function invocation بتعمل execution context جديد بـ variable environment و outer reference (scope chain). V8 بتخصص activation objects؛ closures بتحتفظ outer bindings على الـ heap لحد ما مفيش reference.",
        ),
        L(
          "Hoisting lifts function declarations entirely (name + body) but only the binding for `var`. Named function expressions help stack traces; arrow functions inherit `this` lexically and have no `arguments` object.",
          "Hoisting بيرفع function declarations كاملة (name + body) لكن binding بس لـ `var`. Named function expressions بتساعد stack traces؛ arrow functions بترث `this` lexically ومفيش `arguments` object.",
        ),
        L(
          "Strict mode (`'use strict'`) disables accidental globals from unqualified assignments and makes `this` undefined in plain calls — Blink and Gecko enforce this consistently in modules, which are strict by default.",
          "Strict mode (`'use strict'`) بيمنع accidental globals من unqualified assignments وبيخلي `this` undefined في plain calls — Blink و Gecko بينفذوا ده consistently في modules اللي strict افتراضيًا.",
        ),
      ],
      {
        bullets: [
          L("Closures = function + captured environment (heap)", "Closures = function + captured environment (heap)"),
          L("IIFE pattern rarely needed — use block scope and modules", "IIFE نادرًا محتاج — استخدم block scope و modules"),
          L("Default parameters create their own scope (TDZ-safe)", "Default parameters لها scope خاص (TDZ-safe)"),
          L("Rest/spread are syntax — still function scope rules apply", "Rest/spread syntax — scope rules لسه بتتطبق"),
        ],
        code: `function outer() {
  let count = 0;
  return function inner() {
    count += 1;
    return count;
  };
}
const inc = outer(); // closure retains count on heap`,
        codeCaption: L("Closure keeps outer binding alive", "Closure بيحافظ على outer binding"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Nested functions registered as event listeners must not capture stale DOM refs after route changes — NVDA may focus a detached node while your handler updates aria on the wrong element.",
          "Nested functions مسجلة كـ event listeners ماينفعش تعمل capture لـ DOM refs قديمة بعد route changes — NVDA ممكن تركز node منفصل والـ handler يحدّث aria على element غلط.",
        ),
        L(
          "Expose one named handler per widget when debugging keyboard flows — anonymous closures make it hard to verify Enter/Space behavior in accessibility audits.",
          "اعرض named handler واحد لكل widget لما تdebug keyboard flows — anonymous closures بتصعّب التحقق من Enter/Space في accessibility audits.",
        ),
      ],
      {
        bullets: [
          L("Remove listeners in cleanup — prevents ghost keyboard traps", "شيل listeners في cleanup — يمنع ghost keyboard traps"),
          L("Return focus from modal close handlers defined in outer scope", "رجّع focus من modal close handlers في outer scope"),
          L("Name functions used as callbacks for clearer stack traces in AT", "سمّي functions المستخدمة callbacks لـ stack traces أوضح"),
        ],
        code: `function trapFocus(dialog) {
  function handleTab(e) {
    if (e.key !== "Tab") return;
    // keep focus inside dialog
  }
  dialog.addEventListener("keydown", handleTab);
  return () => dialog.removeEventListener("keydown", handleTab);
}`,
        codeCaption: L("Named inner handler with teardown", "Inner handler مسموّى مع teardown"),
      },
    ),
    seo: insight(
      [
        L(
          "Server components and SSR wrappers are functions too — side effects in module-level IIFEs can run at build time and emit different HTML per deploy, confusing Googlebot's cached snapshots.",
          "Server components و SSR wrappers functions برضه — side effects في module-level IIFEs ممكن تشتغل وقت build وتطلع HTML مختلف كل deploy، وبتلخبط cached snapshots بتاعة Googlebot.",
        ),
        L(
          "Lazy-loaded route chunks wrap scope in closures; if initialization throws, the page stays blank with no indexable body text — wrap bootstraps and log failures to monitoring.",
          "Lazy-loaded route chunks بتلف scope في closures؛ لو initialization رمى error، الصفحة تفضل blank من غير body text قابل للفهرسة — لف bootstraps وسجّل failures في monitoring.",
        ),
      ],
      {
        bullets: [
          L("Keep module init pure — no DOM assumptions at import time", "خلّي module init pure — مفيش DOM assumptions وقت import"),
          L("Fail gracefully so SSR still outputs crawlable fallback", "Fail gracefully عشان SSR يطلع crawlable fallback"),
          L("Code-split handlers should not gate primary content render", "Code-split handlers مايقفلوش primary content render"),
        ],
      },
    ),
  },

  "arrow-this": {
    underTheHood: insight(
      [
        L(
          "Arrow functions capture `this` from the enclosing lexical scope — they never bind their own `this`, `arguments`, `super`, or `new.target`. V8 implements this by storing the lexical `this` in the closure context.",
          "Arrow functions بتعمل capture لـ `this` من enclosing lexical scope — مبتعملش bind لـ `this` أو `arguments` أو `super` أو `new.target`. V8 بتنفّذ ده بحفظ lexical `this` في closure context.",
        ),
        L(
          "Regular functions get `this` from the call site (unless bound). In sloppy mode, plain calls use the global object; in strict mode, `this` is `undefined`. Methods should use regular functions or bind explicitly in class fields.",
          "Regular functions بتاخد `this` من call site (إلا لو bound). في sloppy mode، plain calls بتستخدم global object؛ في strict mode `this` = `undefined`. Methods لازم regular functions أو bind صريح في class fields.",
        ),
        L(
          "React class components relied on `this` binding; modern function components avoid it. Event emitters and DOM APIs still pass dynamic `this` — mixing arrows in prototype methods breaks inheritance chains.",
          "React class components كانت بتعتمد على `this` binding؛ function components الحديثة بتتجنبه. Event emitters و DOM APIs لسه بتمرر dynamic `this` — خلط arrows في prototype methods بيكسر inheritance chains.",
        ),
      ],
      {
        bullets: [
          L("Arrow for callbacks; regular/bound for methods and constructors", "Arrow للـ callbacks؛ regular/bound للـ methods و constructors"),
          L("Class fields with arrow methods allocate per instance — memory tradeoff", "Class fields بـ arrow methods بتخصص per instance — tradeoff في memory"),
          L("Do not use arrow as object literal methods if you need dynamic this", "متستخدمش arrow كـ object literal methods لو محتاج dynamic this"),
          L("`.bind(this)` once in constructor vs arrow field — pick one pattern", "`.bind(this)` مرة في constructor vs arrow field — اختار pattern واحد"),
        ],
        code: `const obj = {
  value: 42,
  read: () => this.value, // undefined in module/strict
  readBound() { return this.value; }, // 42
};`,
        codeCaption: L("Arrow vs method shorthand for this", "Arrow مقابل method shorthand لـ this"),
      },
    ),
    accessibility: insight(
      [
        L(
          "When `this` is wrong in component handlers, toggle state fails silently — buttons look pressed but `aria-pressed` never updates, so VoiceOver reports stale toggle state.",
          "لما `this` غلط في component handlers، toggle state يفشل بصمت — buttons شكلها pressed لكن `aria-pressed` مايتحدثش، VoiceOver بتبلّغ toggle state قديم.",
        ),
        L(
          "Custom elements and class-based widgets must bind `handleKeyDown` correctly so Enter/Space call the same path as click — arrow methods on the class avoid rebinding in connectedCallback.",
          "Custom elements و class-based widgets لازم تعمل bind لـ `handleKeyDown` صح عشان Enter/Space يستدعوا نفس path بتاع click — arrow methods على الـ class بتتجنب rebinding في connectedCallback.",
        ),
      ],
      {
        bullets: [
          L("Same function reference for click and keydown handlers", "نفس function reference لـ click و keydown handlers"),
          L("Verify `this` in prototype methods used with addEventListener", "تحقق من `this` في prototype methods مع addEventListener"),
          L("Focus management in class components needs bound close handlers", "Focus management في class components محتاج bound close handlers"),
        ],
        code: `class Dialog extends HTMLElement {
  close = () => {
    this.hidden = true;
    this.previousFocus?.focus();
  };
}`,
        codeCaption: L("Arrow field preserves this for a11y teardown", "Arrow field يحافظ على this لـ a11y teardown"),
      },
    ),
    seo: insight(
      [
        L(
          "Analytics callbacks using wrong `this` skip pageview beacons — marketing sees traffic drops while Googlebot still crawls; do not conflate analytics gaps with SEO ranking changes.",
          "Analytics callbacks بـ `this` غلط بتتخطى pageview beacons — marketing يشوف traffic drops وGooglebot لسه بيزحف؛ متخلطش analytics gaps مع SEO ranking changes.",
        ),
        L(
          "Infinite scroll handlers that lose `this` stop appending list items — CSR pages become thin content for crawlers that do not execute scroll. Use intersection observers with stable callbacks.",
          "Infinite scroll handlers اللي بتفقد `this` بتوقف append لـ list items — CSR pages بتبقى thin content للـ crawlers اللي مش بتنفّذ scroll. استخدم intersection observers بـ stable callbacks.",
        ),
      ],
      {
        bullets: [
          L("Pagination SSR beats scroll-only CSR for indexable archives", "Pagination SSR أحسن من scroll-only CSR للـ archives القابلة للفهرسة"),
          L("Bind list loaders so lazy content actually mounts", "اعمل bind لـ list loaders عشان lazy content يmount فعلًا"),
          L("Track content paint, not just click handlers firing", "تتبع content paint مش بس click handlers شغالة"),
        ],
      },
    ),
  },

  "arrays-hof": {
    underTheHood: insight(
      [
        L(
          "JavaScript arrays are objects with indexed properties and a `length` property. V8 uses fast elements storage for dense arrays and dictionary mode for sparse ones — `delete arr[0]` or huge indices degrade performance.",
          "Arrays في JavaScript objects بـ indexed properties و `length`. V8 بتستخدم fast elements storage للـ dense arrays و dictionary mode للـ sparse — `delete arr[0]` أو indices كبيرة بتبطّئ الأداء.",
        ),
        L(
          "Higher-order methods (`map`, `filter`, `reduce`) allocate new arrays or single values per call. Chaining `.map().filter().map()` creates intermediate garbage — one loop or `.reduce` can cut GC pressure on large datasets.",
          "Higher-order methods (`map`, `filter`, `reduce`) بتخصص arrays جديدة أو values لكل call. Chain `.map().filter().map()` بيعمل intermediate garbage — loop واحد أو `.reduce` يقلل ضغط GC على datasets كبيرة.",
        ),
        L(
          "`sort` mutates in place and, before ES2019, compared elements as strings. Always pass a comparator for numbers; stable sort is guaranteed in modern engines for equal elements.",
          "`sort` بيعدّل in place وقبل ES2019 كان بيقارن elements كـ strings. دايمًا مرر comparator للأرقام؛ stable sort مضمون في engines حديثة للـ elements المتساوية.",
        ),
      ],
      {
        bullets: [
          L("Prefer `for...of` or indexed loops in hottest paths", "فضّل `for...of` أو indexed loops في أحر مسارات"),
          L("`.flatMap` fuses map+flat — fewer allocations", "`.flatMap` بيدمج map+flat — allocations أقل"),
          L("Do not mutate while iterating — copy first or use filter", "متعدّلش وأنت بتiterate — انسخ الأول أو استخدم filter"),
          L("Typed arrays share buffer memory — different from plain arrays", "Typed arrays بتشارك buffer memory — مختلفة عن plain arrays"),
        ],
        code: `const ids = users
  .filter((u) => u.active)
  .map((u) => u.id);
// one pass alternative:
const ids2 = users.reduce((acc, u) => {
  if (u.active) acc.push(u.id);
  return acc;
}, []);`,
        codeCaption: L("Fused reduce vs chained HOFs", "reduce مدموج مقابل chained HOFs"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Rendering lists with `.map` must produce stable keys and meaningful text — screen readers navigate by position; reordering without keys causes NVDA to re-read the entire list on every update.",
          "Render lists بـ `.map` لازم يطلع stable keys و text مفيد — screen readers بتتنقل بالموقع؛ reordering من غير keys بيخلي NVDA تعيد قراءة القائمة كلها كل update.",
        ),
        L(
          "When filtering hides items, update aria-live regions or focus the first visible row — do not leave focus on a removed DOM node (keyboard trap / silent navigation).",
          "لما filter يخفي items، حدّث aria-live regions أو ركّز focus على أول صف ظاهر — متسيبش focus على DOM node اتشال (keyboard trap / silent navigation).",
        ),
      ],
      {
        bullets: [
          L("Use semantic `<ul>/<li>` or `role=\"list\"` with stable keys", "استخدم `<ul>/<li>` أو `role=\"list\"` بـ stable keys"),
          L("Announce filter results count in aria-live=\"polite\"", "اعلن عدد نتائج filter في aria-live=\"polite\""),
          L("Arrow-key roving tabindex on list items — not mouse-only hover", "Arrow-key roving tabindex على list items — مش hover ماوس بس"),
        ],
        code: `<ul role="list">
  {items.map((item) => (
    <li key={item.id} tabIndex={item.id === activeId ? 0 : -1}>
      {item.label}
    </li>
  ))}
</ul>`,
        codeCaption: L("Stable keys and roving tabindex", "Stable keys و roving tabindex"),
      },
    ),
    seo: insight(
      [
        L(
          "Product listing pages built client-side with empty initial arrays show no products to Googlebot until JS runs — SSR the first page of items or provide `<noscript>` fallback HTML.",
          "صفحات product listing المبنية client-side بـ arrays فاضية في الأول ما بتعرضش products لـ Googlebot لحد ما JS يشتغل — SSR لأول صفحة items أو `<noscript>` fallback HTML.",
        ),
        L(
          "JSON-LD ItemList should mirror visible DOM order from your `.map` render — mismatches between schema and HTML can trigger rich result warnings.",
          "JSON-LD ItemList لازم يطابق ترتيب DOM الظاهر من `.map` render — mismatch بين schema و HTML ممكن يطلع rich result warnings.",
        ),
      ],
      {
        bullets: [
          L("SSR first N items for category pages", "SSR لأول N items في category pages"),
          L("Paginate with crawlable `<a href>` links, not JS-only arrays", "Pagination بـ `<a href>` قابل للزحف مش arrays JS-only"),
          L("Avoid infinite virtual lists as sole indexable content", "تجنب infinite virtual lists كمحتوى قابل للفهرسة الوحيد"),
        ],
      },
    ),
  },

  "objects-destructuring": {
    underTheHood: insight(
      [
        L(
          "Destructuring is syntactic sugar for property lookups and iteration — the engine still reads each key from the object shape. Default values run only when the property is `undefined`, not when it is `null` or `0`.",
          "Destructuring syntactic sugar لـ property lookups و iteration — الـ engine لسه بيقرأ كل key من object shape. Default values بتشتغل لما property = `undefined` بس، مش `null` أو `0`.",
        ),
        L(
          "Rest in objects (`{ a, ...rest }`) copies enumerable own properties into a new object — shallow copy on the heap. Nested objects are still shared references; deep clones need explicit strategies.",
          "Rest في objects (`{ a, ...rest }`) بينسخ enumerable own properties لـ object جديد — shallow copy على الـ heap. Nested objects لسه shared references؛ deep clones محتاجة strategies صريحة.",
        ),
        L(
          "V8 optimizes destructuring in function parameters when call sites pass stable shapes. Renaming fields at every boundary (`{ user_id: userId }`) is cheap — prefer clarity over micro-opts.",
          "V8 بتحسّن destructuring في function parameters لما call sites تمرر shapes ثابتة. Rename fields عند كل boundary (`{ user_id: userId }`) رخيص — فضّل الوضوح على micro-opts.",
        ),
      ],
      {
        bullets: [
          L("Defaults trigger on `undefined` only — guard null separately", "Defaults بتشتغل على `undefined` بس — guard null لوحدها"),
          L("Rest must be last; creates new object allocation", "Rest لازم آخر حاجة؛ بيعمل object allocation جديد"),
          L("Nested destructuring throws if intermediate is null/undefined", "Nested destructuring بيرمي error لو intermediate null/undefined"),
          L("Rename at API boundary to keep domain names consistent", "Rename عند API boundary عشان domain names ثابتة"),
        ],
        code: `const { title, count = 0, meta: { slug } = {} } = page;
// slug safe if meta missing; count defaults only when undefined`,
        codeCaption: L("Nested destructuring with safe defaults", "Nested destructuring بـ defaults آمنة"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Destructuring API responses for UI labels — if you miss a field, `undefined` becomes empty button text. Screen readers announce \"button\" with no name; always fallback: `label ?? 'Untitled'`.",
          "Destructuring لـ API responses في UI labels — لو فاتك field، `undefined` يبقى button text فاضي. Screen readers بتقول \"button\" من غير اسم؛ دايمًا fallback: `label ?? 'Untitled'`.",
        ),
        L(
          "Spreading props onto DOM elements (`{...props}`) can accidentally pass invalid ARIA or duplicate `id` — whitelist attributes for interactive controls.",
          "Spread props على DOM elements (`{...props}`) ممكن يمرر ARIA غلط أو `id` مكرر — whitelist attributes للـ interactive controls.",
        ),
      ],
      {
        bullets: [
          L("Destructure `aria-*` explicitly — do not spread unknown props", "Destructure `aria-*` صراحة — متspread unknown props"),
          L("Fallback strings for alt, aria-label, and visible headings", "Fallback strings لـ alt و aria-label و headings ظاهرة"),
          L("Optional chaining + destructuring for nested CMS content", "Optional chaining + destructuring لـ nested CMS content"),
        ],
        code: `const { ariaLabel, ...rest } = props;
<button aria-label={ariaLabel ?? title} {...rest}>
  {title ?? "Continue"}
</button>`,
        codeCaption: L("Safe a11y props from destructuring", "a11y props آمنة من destructuring"),
      },
    ),
    seo: insight(
      [
        L(
          "Meta objects destructured from CMS JSON must map to `<title>`, `<meta name=\"description\">`, and Open Graph tags on the server — client-only destructuring leaves crawlers with generic shell titles.",
          "Meta objects متعملها destructure من CMS JSON لازم تتربط بـ `<title>` و `<meta name=\"description\">` و Open Graph tags على الـ server — destructuring client-only بيسيب crawlers بعناوين shell عامة.",
        ),
        L(
          "Structured data built from destructured fields needs null checks — omitting undefined keys is fine in JSON-LD; emitting `\"description\": null` is not.",
          "Structured data من fields متعملها destructure محتاج null checks — حذف undefined keys عادي في JSON-LD؛ `\"description\": null` لأ.",
        ),
      ],
      {
        bullets: [
          L("SSR destructuring of page props into head tags", "SSR destructuring لـ page props في head tags"),
          L("Canonical slug from CMS — one source of truth", "Canonical slug من CMS — مصدر حقيقة واحد"),
          L("Validate required SEO fields at build time", "Validate حقول SEO المطلوبة وقت build"),
        ],
      },
    ),
  },

  "promises": {
    underTheHood: insight(
      [
        L(
          "A Promise is a state machine: pending → fulfilled or rejected. V8 schedules `.then` handlers as microtasks — they run before the next macrotask (timers, I/O callbacks) drains the queue.",
          "Promise state machine: pending → fulfilled أو rejected. V8 بتجدول `.then` handlers كـ microtasks — بتشتغل قبل ما macrotask الجاي (timers, I/O callbacks) يفرغ الـ queue.",
        ),
        L(
          "The Promise resolution procedure flattens thenables — returning a Promise inside `.then` chains asynchronously. Unhandled rejections surface as `unhandledrejection` events; always attach `.catch` or try/catch in async functions.",
          "Promise resolution procedure بيعمل flatten للـ thenables — return Promise جوه `.then` بيchain async. Unhandled rejections بتظهر كـ `unhandledrejection` events؛ دايمًا `.catch` أو try/catch في async functions.",
        ),
        L(
          "`Promise.all` fails fast on first rejection; `Promise.allSettled` waits for all; `Promise.race` resolves with the first settled. Choose semantics that match product requirements, not convenience.",
          "`Promise.all` fail fast على أول rejection؛ `Promise.allSettled` يستنى الكل؛ `Promise.race` يresolve بأول settled. اختار semantics اللي تناسب المنتج مش convenience.",
        ),
      ],
      {
        bullets: [
          L("Microtasks drain completely before next macrotask", "Microtasks بتتفرغ كاملة قبل macrotask الجاي"),
          L("Avoid nesting `.then` — flatten with async/await", "تجنب nest `.then` — flatten بـ async/await"),
          L("Return promises from hooks so callers can await errors", "Return promises من hooks عشان callers تعمل await للأخطاء"),
          L("Use `AbortSignal` to cancel fetch promises", "استخدم `AbortSignal` لإلغاء fetch promises"),
        ],
        code: `queueMicrotask(() => console.log("micro"));
setTimeout(() => console.log("macro"), 0);
Promise.resolve().then(() => console.log("promise"));
// micro → promise → macro`,
        codeCaption: L("Microtask vs macrotask ordering", "ترتيب microtask مقابل macrotask"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Promise-driven UI must expose loading, success, and error to AT — use `aria-busy=\"true\"` during pending states and `aria-live=\"polite\"` when data arrives or fails.",
          "UI driven بـ Promises لازم يعرض loading و success و error لـ AT — استخدم `aria-busy=\"true\"` في pending و `aria-live=\"polite\"` لما data توصل أو تفشل.",
        ),
        L(
          "Do not move focus on every microtask tick — batch DOM updates and announce once. NVDA repeats live region text if you spam updates during `Promise.all` resolution.",
          "متنقلش focus على كل microtask tick — batch DOM updates واعلن مرة واحدة. NVDA بتكرر live region text لو spam updates أثناء `Promise.all`.",
        ),
      ],
      {
        bullets: [
          L("Disable submit while promise pending — prevent double POST", "عطّل submit أثناء promise pending — منع double POST"),
          L("Error messages linked with aria-describedby to the field", "Error messages مربوطة بـ aria-describedby للـ field"),
          L("Restore focus to trigger control after modal promise resolves", "رجّع focus للـ trigger control بعد modal promise يresolve"),
        ],
        code: `<div aria-live="polite" aria-busy={loading}>
  {error ? error : loading ? "Loading…" : \`\${count} results\`}
</div>`,
        codeCaption: L("Async state exposed to assistive tech", "Async state معروض لـ assistive tech"),
      },
    ),
    seo: insight(
      [
        L(
          "Content that loads only after a Promise chain may miss Google's render window — critical text and links should resolve on the server or stream in the initial HTML.",
          "محتوى بيload بعد Promise chain ممكن يفوت Google's render window — النص والروابط الحرجة لازم تresolve على server أو تstream في HTML الأولي.",
        ),
        L(
          "Lazy JSON-LD injection via fetch promises can race crawlers — embed structured data in SSR HTML when possible.",
          "Lazy JSON-LD injection عبر fetch promises ممكن يعمل race مع crawlers — embed structured data في SSR HTML لو أمكن.",
        ),
      ],
      {
        bullets: [
          L("SSR data fetching — not client-only Promise on mount", "SSR data fetching — مش client-only Promise on mount"),
          L("Streaming HTML (Suspense/RSC) beats blank shell + promise", "Streaming HTML (Suspense/RSC) أحسن من blank shell + promise"),
          L("Monitor TTFB and LCP when API promises gate paint", "راقب TTFB و LCP لما API promises تقف paint"),
        ],
      },
    ),
  },

  "async-await-fetch": {
    underTheHood: insight(
      [
        L(
          "`async` functions always return a Promise — V8 desugars `await` into `.then` chains on the microtask queue. `await` pauses the async function, not the main thread; other tasks still interleave.",
          "`async` functions دايمًا بترجع Promise — V8 بتعمل desugar لـ `await` لـ `.then` chains على microtask queue. `await` بيوقف async function مش main thread؛ tasks تانية لسه بتتداخل.",
        ),
        L(
          "`fetch` is a Web API backed by the browser network stack (Blink/Gecko). It resolves on microtasks after the response headers arrive; body streaming uses ReadableStream — parse JSON only after checking `response.ok`.",
          "`fetch` Web API مدعوم من network stack (Blink/Gecko). بيresolve على microtasks بعد response headers؛ body streaming بـ ReadableStream — parse JSON بعد ما تتأكد من `response.ok`.",
        ),
        L(
          "Top-level await in modules blocks module graph evaluation — fine for bootstrapping config, dangerous for client bundles that delay hydration. Split critical vs deferred imports.",
          "Top-level await في modules بيقف module graph evaluation — كويس لـ bootstrapping config، خطير على client bundles بتأخر hydration. افصل critical vs deferred imports.",
        ),
      ],
      {
        bullets: [
          L("Always check `response.ok` before `response.json()`", "دايمًا `response.ok` قبل `response.json()`"),
          L("Use `AbortController` for timeouts and navigation cancel", "استخدم `AbortController` للـ timeouts و cancel navigation"),
          L("Parallel independent fetches with `Promise.all` + await", "Fetches مستقلة parallel بـ `Promise.all` + await"),
          L("Retry with backoff — do not hammer failed APIs in await loops", "Retry بـ backoff — متضربش APIs فاشلة في await loops"),
        ],
        code: `const res = await fetch("/api/items", {
  signal: AbortSignal.timeout(8000),
});
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();`,
        codeCaption: L("Production fetch with timeout and status check", "fetch production بـ timeout و status check"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Long `await` chains without loading indicators leave screen reader users on silent pages — pair every fetch with visible focusable status and `aria-busy` on the updating region.",
          "`await` chains طويلة من غير loading indicators بتسيب screen reader users على صفحات صامتة — كل fetch مع status ظاهر قابل للتركيز و `aria-busy` على المنطقة اللي بتتحدث.",
        ),
        L(
          "When fetch fails, move focus to the error alert (`role=\"alert\"`) so NVDA/VoiceOver announce it immediately — do not rely on color alone.",
          "لما fetch يفشل، انقل focus لـ error alert (`role=\"alert\"`) عشان NVDA/VoiceOver تعلن فورًا — متعتمدش على اللون لوحده.",
        ),
      ],
      {
        bullets: [
          L("Skip links and main content should exist before await completes", "Skip links و main content يexist قبل ما await يخلص"),
          L("Autocomplete: debounce fetch + aria-activedescendant", "Autocomplete: debounce fetch + aria-activedescendant"),
          L("Keyboard-submit forms must not lose focus on await", "Forms بـ keyboard-submit مايفقدوش focus على await"),
        ],
        code: `<div role="alert" tabIndex={-1} ref={errorRef}>
  {fetchError && "Could not load results. Try again."}
</div>`,
        codeCaption: L("Focusable alert after failed fetch", "Alert قابل للتركيز بعد fetch فاشل"),
      },
    ),
    seo: insight(
      [
        L(
          "Googlebot executes JavaScript but budgets time — pages that await many client fetches before rendering body content may index partially. Server-fetch data in RSC/SSR for primary copy and nav links.",
          "Googlebot بينفّذ JavaScript لكن بميزانية وقت — صفحات بتawait fetches كتيرة قبل render body ممكن تتفهرس جزئيًا. Server-fetch للـ copy الأساسي و nav links في RSC/SSR.",
        ),
        L(
          "Client-only fetch for meta tags (title/description) is invisible to crawlers — never set document.title only after await on the client for SEO pages.",
          "Client-only fetch لـ meta tags (title/description) invisible للـ crawlers — متعملش document.title بعد await client-only لصفحات SEO.",
        ),
      ],
      {
        bullets: [
          L("Generate canonical URLs on server after fetch", "Generate canonical URLs على server بعد fetch"),
          L("Cache API responses — faster LCP for repeat crawls", "Cache API responses — LCP أسرع للـ crawls المتكررة"),
          L("Preconnect to API origin in `<head>` for critical fetches", "Preconnect لـ API origin في `<head>` للـ fetches الحرجة"),
        ],
      },
    ),
  },

  "event-loop": {
    underTheHood: insight(
      [
        L(
          "The event loop orchestrates the call stack, microtask queue, and macrotask queue. After each macrotask, the engine drains all microtasks (Promises, queueMicrotask) before painting or taking the next timer/I/O callback.",
          "Event loop بينسّق call stack و microtask queue و macrotask queue. بعد كل macrotask، الـ engine بيفرغ كل microtasks (Promises, queueMicrotask) قبل paint أو macrotask/timer/I/O callback الجاي.",
        ),
        L(
          "Long synchronous work blocks rendering and input — INP suffers. Blink posts input events as tasks; if the stack is busy for 200ms+, taps feel laggy. Break work with `scheduler.postTask`, chunks, or Workers.",
          "شغل synchronous طويل بيمنع rendering و input — INP بيتضر. Blink بيعمل post لـ input events كـ tasks؛ لو stack مشغول 200ms+، taps بتحس laggy. قسّم الشغل بـ `scheduler.postTask` أو chunks أو Workers.",
        ),
        L(
          "`requestAnimationFrame` runs before the next repaint — use it for visual updates. `setTimeout(0)` is a macrotask and runs after microtasks; do not confuse rAF timing with Promise timing.",
          "`requestAnimationFrame` بيشتغل قبل repaint الجاي — استخدمه للـ visual updates. `setTimeout(0)` macrotask وبشتغل بعد microtasks؛ متخلطش rAF timing مع Promise timing.",
        ),
      ],
      {
        bullets: [
          L("Microtasks: Promises, queueMicrotask, MutationObserver", "Microtasks: Promises, queueMicrotask, MutationObserver"),
          L("Macrotasks: setTimeout, setInterval, I/O, UI events", "Macrotasks: setTimeout, setInterval, I/O, UI events"),
          L("One macrotask → all microtasks → render (often)", "Macrotask واحد → كل microtasks → render (غالبًا)"),
          L("Workers have separate event loops — message passing only", "Workers لهم event loops منفصلة — message passing بس"),
        ],
        code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1, 4, 3, 2`,
        codeCaption: L("Classic event loop ordering", "ترتيب event loop الكلاسيكي"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Blocking the main thread delays focus ring updates and key repeat — keyboard users see frozen UI while microtasks from a Promise storm still run. Keep input handlers under 50ms.",
          "Block للـ main thread بيأخر focus ring updates و key repeat — keyboard users يشوفوا UI مجمدة و microtasks من Promise storm لسه شغالة. خلّي input handlers تحت 50ms.",
        ),
        L(
          "Defer non-critical work with `requestIdleCallback` or chunked setTimeout so Tab navigation stays responsive — NVDA reads DOM on the main thread in many browsers.",
          "أجّل الشغل غير الحرج بـ `requestIdleCallback` أو chunked setTimeout عشان Tab navigation يفضل responsive — NVDA بتقرأ DOM على main thread في browsers كتير.",
        ),
      ],
      {
        bullets: [
          L("Never sync JSON.parse megabytes on input events", "متعملش JSON.parse ميجabytes على input events"),
          L("Show immediate focus styles — do not wait for await", "اعرض focus styles فورًا — متستناش await"),
          L("Long tasks: announce progress via aria-live periodically", "Long tasks: اعلن progress بـ aria-live دوريًا"),
        ],
        code: `function yieldToMain() {
  return new Promise((r) => setTimeout(r, 0));
}
// chunk heavy loop:
for (const batch of chunks) {
  process(batch);
  await yieldToMain();
}`,
        codeCaption: L("Yield macrotasks to unblock input", "Yield macrotasks لفتح input"),
      },
    ),
    seo: insight(
      [
        L(
          "Main-thread congestion delays First Contentful Paint and LCP — Google CrUX penalizes slow real-user metrics even if lab Lighthouse scores look fine on desktop.",
          "ازدحام main thread بيأخر First Contentful Paint و LCP — Google CrUX بيعاقب metrics بطيئة للمستخدمين الحقيقيين حتى لو Lighthouse على desktop حلو.",
        ),
        L(
          "Third-party scripts enqueue macrotasks and microtasks that starve your content — defer analytics until after `load` or use `partytown` / tag managers with consent gating.",
          "Third-party scripts بتعمل enqueue لـ macrotasks و microtasks بتجوّع المحتوى — أجّل analytics بعد `load` أو استخدم `partytown` / tag managers مع consent gating.",
        ),
      ],
      {
        bullets: [
          L("Break up long tasks > 50ms for INP", "قسّم long tasks > 50ms لـ INP"),
          L("Hydration is main-thread heavy — partial hydrate when possible", "Hydration تقيلة على main thread — partial hydrate لو أمكن"),
          L("Measure Total Blocking Time in Lighthouse CI", "قِس Total Blocking Time في Lighthouse CI"),
        ],
      },
    ),
  },

  "perf-debounce-throttle": {
    underTheHood: insight(
      [
        L(
          "Debounce and throttle schedule macrotasks via `setTimeout` — each reschedule clears or skips timers on the heap. V8 still runs your wrapper on every triggering event until the timer fires; only the expensive inner work is gated.",
          "Debounce و throttle بيجدولوا macrotasks عبر `setTimeout` — كل reschedule بيمسح أو يتخطى timers على الـ heap. V8 لسه بتشغّل wrapper على كل triggering event لحد ما الـ timer يشتغل؛ الشغل التقيل جوه بس هو اللي مت gated.",
        ),
        L(
          "Scroll and resize fire at high frequency — unthrottled handlers force layout reads (offsetHeight) and writes in the same frame, causing layout thrash. Pair throttle with `requestAnimationFrame` for visual reads.",
          "Scroll و resize بيطلعوا events بسرعة عالية — handlers من غير throttle بتفرض layout reads (offsetHeight) و writes في نفس frame، وده layout thrash. اربط throttle بـ `requestAnimationFrame` للـ visual reads.",
        ),
        L(
          "Leading vs trailing debounce changes UX semantics: search boxes usually want trailing (after pause); button double-submit guards want leading edge. Document which edge you implement.",
          "Leading vs trailing debounce بيغيّر UX semantics: search boxes غالبًا trailing (بعد pause)؛ guards لـ double-submit عايزين leading edge. وثّق أي edge بتنفّذه.",
        ),
      ],
      {
        bullets: [
          L("Debounce: wait for quiet — search, resize end", "Debounce: استنى هدوء — search, resize end"),
          L("Throttle: cap rate — scroll analytics, parallax", "Throttle: حدّد معدل — scroll analytics, parallax"),
          L("Cancel timers on unmount to prevent leaks", "الغِ timers عند unmount عشان تمنع leaks"),
          L("Prefer passive `{ passive: true }` on scroll listeners", "فضّل `{ passive: true }` على scroll listeners"),
        ],
        code: `const onResize = throttle(() => {
  requestAnimationFrame(() => {
    layoutChart(container.clientWidth);
  });
}, 100);
window.addEventListener("resize", onResize, { passive: true });`,
        codeCaption: L("Throttle + rAF avoids layout thrash", "Throttle + rAF يتجنب layout thrash"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Debounced search must still announce result updates — when the API returns, set `aria-live=\"polite\"` with the new count. Do not debounce AT announcements the same way as network calls.",
          "Debounced search لازم يعلن result updates — لما API يرجع، حط `aria-live=\"polite\"` بالعدد الجديد. متdebounce AT announcements زي network calls.",
        ),
        L(
          "Throttled keyboard repeat on custom scroll containers can skip focus moves — ensure Arrow/Page keys move roving tabindex every keypress, not once per 100ms throttle window.",
          "Throttled keyboard repeat على custom scroll containers ممكن يتخطى focus moves — تأكد إن Arrow/Page keys تنقل roving tabindex كل keypress مش مرة كل 100ms throttle.",
        ),
      ],
      {
        bullets: [
          L("Announce debounced search results when fetch completes", "اعلن debounced search results لما fetch يخلص"),
          L("Do not throttle focus() or aria-live updates", "متthrottle focus() أو aria-live updates"),
          L("Loading state during debounce — aria-busy on combobox", "Loading state أثناء debounce — aria-busy على combobox"),
        ],
        code: `<input
  aria-autocomplete="list"
  aria-controls="suggestions"
  aria-busy={searchPending}
  onInput={debouncedSearch}
/>`,
        codeCaption: L("Combobox busy state during debounced fetch", "Combobox busy state أثناء debounced fetch"),
      },
    ),
    seo: insight(
      [
        L(
          "Heavy scroll handlers delay LCP element stability — hero images and headings shift when throttled analytics mutate DOM. Keep LCP region free of debounced DOM writes.",
          "Scroll handlers تقيلة بتأخر LCP element stability — hero images و headings بتتحرك لما analytics debounced تعدّل DOM. خلّي LCP region من غير debounced DOM writes.",
        ),
        L(
          "Infinite scroll with throttled fetch can hide content from Googlebot — paginated `<a href>` links remain the reliable index path; throttle is for UX, not sole discovery.",
          "Infinite scroll بـ throttled fetch ممكن يخبي content عن Googlebot — paginated `<a href>` links لسه path الفهرسة الموثوق؛ throttle للـ UX مش للاكتشاف الوحيد.",
        ),
      ],
      {
        bullets: [
          L("Do not debounce initial SSR content paint", "متdebounce initial SSR content paint"),
          L("CLS: throttle layout-affecting DOM updates off critical path", "CLS: throttle layout-affecting DOM updates برّه critical path"),
          L("Measure INP on real scroll/search interactions", "قِس INP على scroll/search interactions حقيقية"),
        ],
      },
    ),
  },

  "memory-leaks-refs": {
    underTheHood: insight(
      [
        L(
          "Garbage collection frees unreachable objects on the heap — but anything still referenced from closures, module scope, DOM nodes, or event listeners stays alive. Detached DOM subtrees referenced from JS are classic leak sources in SPAs.",
          "Garbage collection بتحرر objects unreachable على الـ heap — لكن أي حاجة لسه referenced من closures أو module scope أو DOM nodes أو event listeners بتفضل حية. Detached DOM subtrees referenced من JS مصدر leaks كلاسيكي في SPAs.",
        ),
        L(
          "WeakMap and WeakRef allow caches keyed by objects without preventing GC — use WeakMap for metadata on DOM elements; use WeakRef + FinalizationRegistry only when you truly need post-GC cleanup (advanced).",
          "WeakMap و WeakRef بيسمحوا caches keyed by objects من غير ما يمنعوا GC — استخدم WeakMap لـ metadata على DOM elements؛ WeakRef + FinalizationRegistry لما محتاج post-GC cleanup (advanced).",
        ),
        L(
          "V8 DevTools Memory panel shows retained size — look for growing `Detached HTMLElement` and `(closure)` chains after route changes. AbortController cleanup beats hoping GC saves you.",
          "V8 DevTools Memory panel بيعرض retained size — دور على `Detached HTMLElement` و `(closure)` chains بتكبر بعد route changes. AbortController cleanup أحسن من تمني GC ينقذك.",
        ),
      ],
      {
        bullets: [
          L("Remove listeners in useEffect cleanup / disconnectedCallback", "شيل listeners في useEffect cleanup / disconnectedCallback"),
          L("Clear timers and abort fetches on unmount", "امسح timers و abort fetches عند unmount"),
          L("Avoid storing DOM nodes in module-level Maps", "تجنب تخزين DOM nodes في module-level Maps"),
          L("Profile retained memory after 10+ client navigations", "Profile retained memory بعد 10+ client navigations"),
        ],
        code: `useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal });
  return () => ctrl.abort();
}, [url]);`,
        codeCaption: L("Abort fetch on unmount — break retention", "Abort fetch عند unmount — كسر retention"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Leaked modals and off-screen dialogs still trap Tab focus in some browsers — hidden nodes with `aria-hidden=\"false\"` and positive tabindex leak into the accessibility tree.",
          "Modals leaked و dialogs off-screen لسه بتحبس Tab focus في browsers — hidden nodes بـ `aria-hidden=\"false\"` و tabindex موجب بتتسرب للـ accessibility tree.",
        ),
        L(
          "Stale listeners on removed buttons cause duplicate announcements — NVDA fires twice when ghost handlers update aria-live regions after navigation.",
          "Listeners قديمة على buttons اتشالت بتسبب duplicate announcements — NVDA بتطلع مرتين لما ghost handlers تحدّث aria-live regions بعد navigation.",
        ),
      ],
      {
        bullets: [
          L("Teardown: remove portal nodes and restore focus", "Teardown: شيل portal nodes ورجّع focus"),
          L("Set aria-hidden on inactive route containers", "حط aria-hidden على inactive route containers"),
          L("WeakMap for element→handler if you must cache", "WeakMap لـ element→handler لو لازم cache"),
        ],
        code: `return () => {
  dialog.removeEventListener("keydown", trapFocus);
  trigger.focus();
  dialog.remove();
};`,
        codeCaption: L("Modal teardown restores focus and DOM", "Modal teardown يرجّع focus و DOM"),
      },
    ),
    seo: insight(
      [
        L(
          "Memory bloat slows JS execution over long sessions — Googlebot typically gets a fresh context, but real users hit INP regressions on heavy SPAs that never release listeners.",
          "Memory bloat بيبطّأ JS execution في sessions طويلة — Googlebot غالبًا fresh context، لكن users حقيقيين بيحسوا INP regressions على SPAs تقيلة ما بتفكش listeners.",
        ),
        L(
          "Leaked third-party tags accumulate iframes and scripts — each adds macrotasks that compete with content rendering and inflate Total Blocking Time.",
          "Third-party tags leaked بتجمع iframes و scripts — كل واحد بيضيف macrotasks بتنافس content rendering وترفع Total Blocking Time.",
        ),
      ],
      {
        bullets: [
          L("Audit tag managers after route changes", "Audit tag managers بعد route changes"),
          L("Long-lived SPAs still affect CrUX on return visits", "SPAs طويلة العمر بتأثر CrUX في return visits"),
          L("Lazy routes should unload observers and workers", "Lazy routes تفك observers و workers"),
        ],
      },
    ),
  },

  "pitfall-float-typeof": {
    underTheHood: insight(
      [
        L(
          "IEEE 754 doubles cannot represent all decimals — `0.1 + 0.2 === 0.3` is false. V8 stores most numbers as fast doubles; BigInt is a separate heap type for integers beyond safe precision.",
          "IEEE 754 doubles مش بتمثل كل decimals — `0.1 + 0.2 === 0.3` false. V8 بتحفظ أغلب numbers كـ fast doubles؛ BigInt نوع heap منفصل للـ integers فوق safe precision.",
        ),
        L(
          "`typeof null === 'object'` is a historical bug kept for web compatibility. Use strict null checks (`value === null`) and `Array.isArray` instead of `typeof` for arrays.",
          "`typeof null === 'object'` bug تاريخي متساب للـ web compatibility. استخدم strict null checks (`value === null`) و `Array.isArray` بدل `typeof` للـ arrays.",
        ),
        L(
          "`typeof` on primitives is fast; on objects it reads internal tags. For feature detection prefer `'fetch' in globalThis` over `typeof fetch` when checking API shape, not just existence.",
          "`typeof` على primitives سريع؛ على objects بيقرأ internal tags. للـ feature detection فضّل `'fetch' in globalThis` على `typeof fetch` لما تتحقق من API shape مش existence بس.",
        ),
      ],
      {
        bullets: [
          L("Compare floats with epsilon or use integer cents", "قارن floats بـ epsilon أو integer cents"),
          L("Number.isInteger / Number.isFinite for validation", "Number.isInteger / Number.isFinite للـ validation"),
          L("Never use typeof for null — use === null", "متستخدمش typeof لـ null — استخدم === null"),
          L("typeof undeclared vars throws in modules — not undefined", "typeof undeclared vars بيرمي في modules — مش undefined"),
        ],
        code: `const total = Math.round((0.1 + 0.2) * 100) / 100;
typeof null;        // "object" — pitfall
Array.isArray([]);  // true — reliable`,
        codeCaption: L("Float rounding and typeof pitfalls", "Float rounding و typeof pitfalls"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Floating price math displayed wrong (`$19.999999`) confuses screen readers — format with `Intl.NumberFormat` before setting textContent or aria-valuenow on sliders.",
          "Float price math معروض غلط (`$19.999999`) بيلخبط screen readers — format بـ `Intl.NumberFormat` قبل textContent أو aria-valuenow على sliders.",
        ),
        L(
          "typeof checks on form values (`typeof x === 'number'`) fail for input strings — NVDA reads the visible string while your logic treats it as numeric.",
          "typeof checks على form values (`typeof x === 'number'`) بتفشل لـ input strings — NVDA بتقرأ string ظاهر والـ logic بتتعامل معاه رقم.",
        ),
      ],
      {
        bullets: [
          L("Parse input with Number() then validate isFinite", "Parse input بـ Number() بعدين validate isFinite"),
          L("aria-valuemin/max/now must match formatted display", "aria-valuemin/max/now لازم تطابق formatted display"),
          L("Do not announce raw IEEE strings to users", "متعلنش raw IEEE strings للمستخدمين"),
        ],
        code: `const price = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(totalCents / 100);`,
        codeCaption: L("Accessible currency formatting", "Currency formatting accessible"),
      },
    ),
    seo: insight(
      [
        L(
          "JSON-LD Product offers need numeric price as number type — string prices or float artifacts can invalidate merchant listings in Search Console.",
          "JSON-LD Product offers محتاج price رقمي كـ number type — string prices أو float artifacts ممكن تبطل merchant listings في Search Console.",
        ),
        L(
          "Client-side typeof/feature checks that gate SSR markup can serve empty product schema to crawlers when detection runs only in browser — detect on server or use progressive enhancement.",
          "typeof/feature checks client-side اللي بتقف SSR markup ممكن تخدم product schema فاضي للـ crawlers لما detection يشتغل browser بس — detect على server أو progressive enhancement.",
        ),
      ],
      {
        bullets: [
          L("Store money as integer minor units in APIs", "خزّن money كـ integer minor units في APIs"),
          L("Validate schema numbers at build/deploy", "Validate schema numbers عند build/deploy"),
          L("SSR same numeric output as client hydrate", "SSR نفس numeric output زي client hydrate"),
        ],
      },
    ),
  },

  "pitfall-async-races": {
    underTheHood: insight(
      [
        L(
          "Async races happen when response order differs from request order — slow request A can overwrite fast request B's UI state. Engines do not serialize fetches; you must with abort, request IDs, or stale flags.",
          "Async races لما response order يختلف عن request order — request A البطيء ممكن يكتب فوق UI state بتاع request B السريع. Engines مش بتserialize fetches؛ لازم abort أو request IDs أو stale flags.",
        ),
        L(
          "Microtasks from resolved Promises still run after you navigate away unless aborted — `isMounted` flags are fragile; prefer AbortController tied to component lifecycle.",
          "Microtasks من Promises resolved لسه بتشتغل بعد ما تسيب الصفحة إلا لو aborted — `isMounted` flags fragile؛ فضّل AbortController مربوط بـ component lifecycle.",
        ),
        L(
          "Shared mutable module state (`let latestQuery`) races across tabs and tests — encapsulate in closures or stores with explicit version counters.",
          "Shared mutable module state (`let latestQuery`) بيعمل races عبر tabs و tests — encapsulate في closures أو stores بـ version counters صريحة.",
        ),
      ],
      {
        bullets: [
          L("Abort previous fetch when query changes", "Abort fetch السابق لما query يتغير"),
          L("Compare sequence numbers before setState", "قارن sequence numbers قبل setState"),
          L("Debounce does not fix races — still abort stale responses", "Debounce مايصلحش races — لسه abort stale responses"),
          L("Test rapid input with network throttling", "اختبر rapid input بـ network throttling"),
        ],
        code: `let seq = 0;
async function load(q) {
  const id = ++seq;
  const data = await fetchItems(q);
  if (id !== seq) return; // stale
  render(data);
}`,
        codeCaption: L("Sequence guard against stale responses", "Sequence guard ضد stale responses"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Race losers can announce wrong search results — aria-live reads stale \"42 results\" after the user typed a new query. Only announce after verifying the response matches current input.",
          "Race losers ممكن يعلنوا search results غلط — aria-live بتقرأ stale \"42 results\" بعد ما user كتب query جديد. اعلن بس بعد ما تتأكد response يطابق input الحالي.",
        ),
        L(
          "Focus moved to a loading spinner that gets replaced by stale content traps users — manage focus on the final, verified render only.",
          "Focus اتنقل لـ loading spinner اتبدل بـ stale content بيحبس users — أدِر focus على final verified render بس.",
        ),
      ],
      {
        bullets: [
          L("Clear live region before new fetch starts", "امسح live region قبل fetch جديد"),
          L("Disable results list until response matches query", "عطّل results list لحد ما response يطابق query"),
          L("role=\"status\" for non-interrupting completion", "role=\"status\" لـ completion من غير interrupt"),
        ],
        code: `if (response.query !== inputRef.current.value) return;
liveRegion.textContent = \`\${items.length} results for \${response.query}\`;`,
        codeCaption: L("Announce only matching responses", "اعلن responses المطابقة بس"),
      },
    ),
    seo: insight(
      [
        L(
          "Client routers racing on slug fetches can briefly render wrong canonical title — crawlers snapshotting mid-race index incorrect metadata. Lock metadata updates to verified route id.",
          "Client routers بيعملوا races على slug fetches ممكن يعرضوا canonical title غلط لحظيًا — crawlers بيعملوا snapshot mid-race metadata غلط. قفل metadata updates على verified route id.",
        ),
        L(
          "Hydration races between server HTML and client fetch can replace indexable paragraphs with empty states — pass server data as props and treat client fetch as refresh only.",
          "Hydration races بين server HTML و client fetch ممكن يستبدلوا paragraphs قابلة للفهرسة بـ empty states — مرر server data كـ props و client fetch refresh بس.",
        ),
      ],
      {
        bullets: [
          L("SSR title/description match final client route", "SSR title/description يطابقوا final client route"),
          L("Avoid flash of empty SEO shell on slow API", "تجنب flash of empty SEO shell على API بطيء"),
          L("Use loading skeletons that preserve heading text", "Skeletons تحافظ على heading text"),
        ],
      },
    ),
  },

  "js-cheatsheet": {
    underTheHood: insight(
      [
        L(
          "Modern JS spans language syntax and host APIs — V8 executes spec semantics; browsers add Web APIs on separate threads (network, graphics) bridged back via tasks and microtasks.",
          "JS الحديث بين syntax اللغة و host APIs — V8 بتنفّذ spec semantics؛ browsers بتضيف Web APIs على threads منفصلة (network, graphics) وترجع عبر tasks و microtasks.",
        ),
        L(
          "Production debugging flows: reproduce → Performance/Memory profile → isolate long tasks or retained objects → fix at the boundary (API, render, listener cleanup).",
          "Production debugging: reproduce → Performance/Memory profile → isolate long tasks أو retained objects → fix عند boundary (API, render, listener cleanup).",
        ),
        L(
          "Modules are deferred, strict, and live-bind imports — bundlers tree-shake ESM static imports; dynamic `import()` creates separate chunks loaded as macrotasks.",
          "Modules deferred و strict و live-bind imports — bundlers tree-shake ESM static imports؛ dynamic `import()` chunks منفصلة loaded كـ macrotasks.",
        ),
      ],
      {
        bullets: [
          L("Language: scope, types, equality, async", "Language: scope, types, equality, async"),
          L("Host: DOM, fetch, timers, storage", "Host: DOM, fetch, timers, storage"),
          L("Profile before optimizing hot paths", "Profile قبل optimize hot paths"),
          L("Strict mode + modules by default in new code", "Strict mode + modules افتراضيًا في code جديد"),
        ],
        code: `// Quick mental model
// sync stack → microtasks → render → macrotask
await fetch(url); // microtask resume after I/O macrotask`,
        codeCaption: L("Cheat mental model: task ordering", "Mental model: task ordering"),
      },
    ),
    accessibility: insight(
      [
        L(
          "Every JS UI pattern maps to accessibility requirements: toggles need `aria-pressed`, dialogs need focus trap + Escape, async needs live regions — the cheatsheet is a checklist against WCAG, not optional polish.",
          "كل JS UI pattern ليه accessibility requirements: toggles محتاج `aria-pressed`، dialogs focus trap + Escape، async محتاج live regions — الـ cheatsheet checklist ضد WCAG مش polish اختياري.",
        ),
        L(
          "Test keyboard (Tab, Enter, Space, Escape) and one screen reader (NVDA or VoiceOver) whenever you ship new interactive JS — automated lint catches syntax, not focus order.",
          "اختبر keyboard (Tab, Enter, Space, Escape) و screen reader واحد (NVDA أو VoiceOver) كل ما تship interactive JS جديد — lint automated بيلقط syntax مش focus order.",
        ),
      ],
      {
        bullets: [
          L("Name, role, value, state — keep in sync with JS", "Name, role, value, state — متزامنين مع JS"),
          L("Focus visible and logical tab order", "Focus ظاهر و tab order منطقي"),
          L("Prefer native `<button>` / `<a>` before div onclick", "فضّل native `<button>` / `<a>` قبل div onclick"),
          L("Document keyboard shortcuts in aria-keyshortcuts", "وثّق keyboard shortcuts في aria-keyshortcuts"),
        ],
        code: `// Minimum interactive control
<button type="button" aria-expanded="false" aria-controls="panel">
  Menu
</button>`,
        codeCaption: L("Cheatsheet: accessible toggle trigger", "Cheatsheet: accessible toggle trigger"),
      },
    ),
    seo: insight(
      [
        L(
          "JS cheatsheet for production SEO: critical content in HTML, enhance with JS, measure LCP/INP/CLS, canonical + meta on server, crawlable links, valid JSON-LD.",
          "JS cheatsheet لـ production SEO: critical content في HTML، enhance بـ JS، قِس LCP/INP/CLS، canonical + meta على server، links قابلة للزحف، JSON-LD valid.",
        ),
        L(
          "Googlebot runs JS but prefers fast, stable documents — treat SEO as an HTML contract your JS must not break during hydration or client navigation.",
          "Googlebot بيشغّل JS لكن بيفضّل documents سريعة وثابتة — اعتبر SEO عقد HTML الـ JS مايكسرش أثناء hydration أو client navigation.",
        ),
      ],
      {
        bullets: [
          L("SSR/SSG for titles, headings, nav, main copy", "SSR/SSG للـ titles و headings و nav و main copy"),
          L("Avoid client-only href=\"#\" navigation for SEO pages", "تجنب client-only href=\"#\" navigation لصفحات SEO"),
          L("Monitor Search Console + CrUX weekly", "راقب Search Console + CrUX أسبوعيًا"),
          L("Structured data matches visible content", "Structured data يطابق visible content"),
        ],
      },
    ),
  },
};
