import { hardExample, mediumExample } from "@/content/helpers";
import type { CodeExample } from "@/lib/types";

/** Medium + hard tiers for JS lessons that lack a dedicated enrichment overlay. */
export const jsFallbackTiers: {
  medium: CodeExample;
  hard: CodeExample;
} = {
  medium: mediumExample(
    `const scores = [12, 18, 9];
const passed = scores.filter((n) => n >= 10);
const average = passed.reduce((sum, n) => sum + n, 0) / passed.length;

console.log(passed.length, average.toFixed(1));`,
    "2 15.0",
    "2 15.0",
  ),
  hard: hardExample(
    `const users = [
  { name: "Ada", score: 12 },
  { name: "Lin", score: 18 },
  { name: "Mo", score: 9 },
];

const report = users
  .filter((u) => u.score >= 10)
  .map((u) => ({ ...u, grade: u.score >= 15 ? "A" : "B" }));

console.log(report.map((r) => r.grade).join(", "));`,
    "B, A",
    "B, A",
  ),
};

export const jsMediumExamples: Record<string, CodeExample> = {
  "var-let-const": mediumExample(
    `let page = 1;
const pageSize = 10;

function nextPage() {
  page += 1;
  return page * pageSize;
}

console.log(nextPage(), nextPage());`,
    "20 30",
    "20 30",
  ),
  "data-types": mediumExample(
    `const settings = { theme: "dark", notifications: true };
const copy = { ...settings, notifications: false };

console.log(settings.notifications, copy.notifications);`,
    "true false",
    "true false",
  ),
  equality: mediumExample(
    `const input = "";
const hasValue = input !== undefined && input !== null && input !== "";

console.log(hasValue, input == null);`,
    "false true",
    "false true",
  ),
  "functions-scope": mediumExample(
    `function makeGreeter(prefix) {
  return function greet(name) {
    return prefix + name;
  };
}

const hi = makeGreeter("Hi, ");
console.log(hi("Samira"));`,
    "Hi, Samira",
    "Hi, Samira",
  ),
  "arrow-this": mediumExample(
    `const counter = {
  count: 0,
  tick() {
    this.count += 1;
    return this.count;
  },
};

console.log(counter.tick(), counter.tick());`,
    "1 2",
    "1 2",
  ),
  "arrays-hof": mediumExample(
    `const lessons = ["HTML", "CSS", "JS"];
const tags = lessons.map((name) => name.toLowerCase());

console.log(tags.join(" · "));`,
    "html · css · js",
    "html · css · js",
  ),
  "objects-destructuring": mediumExample(
    `const user = { id: 7, name: "Samira", role: "learner" };
const { name, ...rest } = user;

console.log(name, rest.id, rest.role);`,
    "Samira 7 learner",
    "Samira 7 learner",
  ),
  promises: mediumExample(
    `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

wait(10).then(() => console.log("ready"));`,
    "ready",
    "ready",
  ),
  "async-await-fetch": mediumExample(
    `async function loadStatus() {
  await new Promise((r) => setTimeout(r, 10));
  return { ok: true, lessons: 3 };
}

loadStatus().then((data) => console.log(data.ok, data.lessons));`,
    "true 3",
    "true 3",
  ),
  "event-loop": mediumExample(
    `console.log("sync");
queueMicrotask(() => console.log("micro"));
setTimeout(() => console.log("timer"), 0);`,
    "sync, micro, timer",
    "sync, micro, timer",
  ),
};
