"use client";

import type { ReactNode } from "react";
import type { TrackId } from "@/lib/types";
import { javascriptVisualizers } from "@/components/visualizers/javascript";
import {
  DocumentTreeVisualizer,
  SemanticBlocksVisualizer,
  HeadingLadderVisualizer,
  TextFormatVisualizer,
  LinkImageVisualizer,
  ListStackVisualizer,
  FormFlowVisualizer,
  TableGridVisualizer,
  A11yCheckVisualizer,
  SeoCrawlVisualizer,
  CwvLabVisualizer,
  MetaCardVisualizer,
  MediaStageVisualizer,
  DetailsAccordionVisualizer,
  BaselineCompatVisualizer,
  NativeDialogVisualizer,
  PictureSourceVisualizer,
  CheatSheetLabVisualizer,
  HtmlSecurityLabVisualizer,
  HtmlSpeculationLabVisualizer,
  HtmlGlobalRtlLabVisualizer,
} from "@/components/visualizers/html";
import { LAB_FRAME_CLASS } from "@/components/visualizers/html/LabStage";

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
  "seo-crawl": () => <SeoCrawlVisualizer />,
  "cwv-lab": () => <CwvLabVisualizer />,
  "meta-card": () => <MetaCardVisualizer />,
  "media-stage": () => <MediaStageVisualizer />,
  "details-accordion": () => <DetailsAccordionVisualizer />,
  "baseline-compat": () => <BaselineCompatVisualizer />,
  "native-dialog": () => <NativeDialogVisualizer />,
  "picture-source": () => <PictureSourceVisualizer />,
  "cheatsheet-lab": () => <CheatSheetLabVisualizer />,
  "html-security-lab": () => <HtmlSecurityLabVisualizer />,
  "html-speculation-lab": () => <HtmlSpeculationLabVisualizer />,
  "html-global-rtl-lab": () => <HtmlGlobalRtlLabVisualizer />,
};

const registries: Partial<Record<TrackId, Record<string, () => ReactNode>>> = {
  javascript: javascriptVisualizers,
  html: htmlVisualizers,
};

export function Visualizer({
  trackId,
  kind,
}: {
  trackId: TrackId;
  kind: string;
}) {
  const render = registries[trackId]?.[kind];
  if (!render) {
    return (
      <div
        className={`${LAB_FRAME_CLASS} flex items-center justify-center rounded-2xl border border-dashed border-white/15 px-4 text-center text-sm text-slate-500`}
      >
        Visualizer unavailable
      </div>
    );
  }
  return (
    <div className={`${LAB_FRAME_CLASS} flex flex-col`}>
      <div className="flex min-h-0 flex-1 flex-col [&_>_*]:h-full [&_>_*]:min-h-0">
        {render()}
      </div>
    </div>
  );
}
