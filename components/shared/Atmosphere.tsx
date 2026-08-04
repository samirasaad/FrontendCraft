/**
 * Soft cinematic film grain (tiled SVG fractal noise).
 * Tuned low-contrast so it adds depth without reading as TV static.
 */
const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
    <filter id="g">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.58  0 0 0 0 0.62  0 0 0 0.55 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#g)"/>
  </svg>`,
);

const GRAIN_URL = `url("data:image/svg+xml,${GRAIN_SVG}")`;

/** Page atmosphere: soft blooms + refined grain (replaces harsh CSS grids). */
export function Atmosphere({
  className = "",
  fixed = false,
  extraBloom = false,
}: {
  className?: string;
  /** Lesson dashboard uses fixed full-viewport atmosphere. */
  fixed?: boolean;
  extraBloom?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${
        fixed ? "fixed inset-0 -z-10 overflow-hidden" : "absolute inset-0 -z-10"
      } ${className}`}
    >
      <div className="absolute -start-20 top-10 h-80 w-80 rounded-full bg-yellow-300/[0.09] blur-3xl" />
      <div className="absolute end-0 top-32 h-96 w-96 rounded-full bg-cyan-400/[0.09] blur-3xl" />
      {extraBloom ? (
        <div className="absolute bottom-0 start-1/3 h-64 w-64 rounded-full bg-lime-300/[0.05] blur-3xl" />
      ) : null}

      {/* Fine grain — soft-light keeps it atmospheric, not crunchy */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-soft-light"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Ultra-soft vignette so edges don’t feel flat */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.45)_100%)]" />
    </div>
  );
}
