"use client";

import type { ReactNode } from "react";
import type { JavascriptVisualizerId } from "@/lib/visualizer-ids";
import { MemoryLockVisualizer } from "./MemoryLockVisualizer";
import { PrimitiveVsReferenceVisualizer } from "./PrimitiveVsReferenceVisualizer";
import { EqualityVisualizer } from "./EqualityVisualizer";
import { ScopeVisualizer } from "./ScopeVisualizer";
import { ThisContextVisualizer } from "./ThisContextVisualizer";
import { ArrayHofVisualizer } from "./ArrayHofVisualizer";
import { DestructuringVisualizer } from "./DestructuringVisualizer";
import { PromisesVisualizer } from "./PromisesVisualizer";
import { AsyncAwaitVisualizer } from "./AsyncAwaitVisualizer";
import { EventLoopVisualizer } from "./EventLoopVisualizer";
import { DebounceThrottleVisualizer } from "./DebounceThrottleVisualizer";
import { MemoryLeaksVisualizer } from "./MemoryLeaksVisualizer";

export const javascriptVisualizers = {
  "memory-lock": () => <MemoryLockVisualizer />,
  "primitive-vs-reference": () => <PrimitiveVsReferenceVisualizer />,
  equality: () => <EqualityVisualizer />,
  scope: () => <ScopeVisualizer />,
  "this-context": () => <ThisContextVisualizer />,
  "array-hof": () => <ArrayHofVisualizer />,
  destructuring: () => <DestructuringVisualizer />,
  promises: () => <PromisesVisualizer />,
  "async-await": () => <AsyncAwaitVisualizer />,
  "event-loop": () => <EventLoopVisualizer />,
  "debounce-throttle-lab": () => <DebounceThrottleVisualizer />,
  "memory-leaks-lab": () => <MemoryLeaksVisualizer />,
} as const satisfies Record<JavascriptVisualizerId, () => ReactNode>;
