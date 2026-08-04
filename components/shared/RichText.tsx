import type { ReactNode } from "react";

const CODE_CLASS =
  "mx-0.5 inline-block rounded-md border border-cyan-300/20 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[0.9em] font-medium leading-none text-cyan-100 [unicode-bidi:isolate]";

/**
 * Renders lesson prose with `` `tech terms` `` as LTR <code> chips.
 * Keeps Arabic sentence flow while isolating English tokens for bidi.
 */
export function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          const code = part.slice(1, -1);
          return (
            <code key={index} dir="ltr" className={CODE_CLASS}>
              {code}
            </code>
          );
        }
        return <TextChunk key={index} text={part} />;
      })}
    </span>
  );
}

/** Keep Latin runs and bare HTML tags from flipping Arabic punctuation. */
function TextChunk({ text }: { text: string }): ReactNode {
  if (!text) return null;
  const chunks = text.split(
    /(<\/?[A-Za-z][\w:-]*[^>]*>|[A-Za-z][A-Za-z0-9+.#/_-]{1,})/g,
  );
  return chunks.map((chunk, i) => {
    if (
      /^<\/?[A-Za-z][\w:-]*[^>]*>$/.test(chunk) ||
      /^[A-Za-z][A-Za-z0-9+.#/_-]{1,}$/.test(chunk)
    ) {
      return (
        <bdi key={i} dir="ltr" className="[unicode-bidi:isolate]">
          {chunk}
        </bdi>
      );
    }
    return <span key={i}>{chunk}</span>;
  });
}
