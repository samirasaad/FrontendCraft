"use client";

import type { ReactNode } from "react";
import {
  A11yCheckVisualizer,
  BaselineCompatVisualizer,
  DetailsAccordionVisualizer,
  DocumentTreeVisualizer,
  FormFlowVisualizer,
  HeadingLadderVisualizer,
  HtmlGlobalRtlLabVisualizer,
  HtmlPitfallsLabVisualizer,
  LinkImageVisualizer,
  ListStackVisualizer,
  NativeDialogVisualizer,
  PictureSourceVisualizer,
  SemanticBlocksVisualizer,
  SeoCrawlVisualizer,
  SrReadyVisualizer,
  TableGridVisualizer,
  TextFormatVisualizer,
} from "@/components/visualizers/html";

const htmlVisualizers: Record<string, () => ReactNode> = {
  "document-tree": () => <DocumentTreeVisualizer />,
  "semantic-blocks": () => <SemanticBlocksVisualizer />,
  "heading-ladder": () => <HeadingLadderVisualizer />,
  "text-format": () => <TextFormatVisualizer />,
  "link-image": () => <LinkImageVisualizer />,
  "list-stack": () => <ListStackVisualizer />,
  "form-flow": () => <FormFlowVisualizer />,
  "table-grid": () => <TableGridVisualizer />,
  "a11y-check": () => <A11yCheckVisualizer />,
  "sr-ready": () => <SrReadyVisualizer />,
  "seo-crawl": () => <SeoCrawlVisualizer />,
  "details-accordion": () => <DetailsAccordionVisualizer />,
  "baseline-compat": () => <BaselineCompatVisualizer />,
  "native-dialog": () => <NativeDialogVisualizer />,
  "picture-source": () => <PictureSourceVisualizer />,
  "html-global-rtl-lab": () => <HtmlGlobalRtlLabVisualizer />,
  "html-pitfalls-lab": () => <HtmlPitfallsLabVisualizer />,
};

/** Sandbox-only visualizer shell — fixed frame, no shared Visualizer changes. */
export function SandboxVisualizer({ kind }: { kind: string }) {
  const render = htmlVisualizers[kind];
  if (!render) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-500">
        Visualizer unavailable
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col [&_>_*]:h-full [&_>_*]:min-h-0 [&_>_*]:w-full">
        {render()}
      </div>
    </div>
  );
}
