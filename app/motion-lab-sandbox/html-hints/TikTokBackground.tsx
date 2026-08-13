"use client";

import { motion, useReducedMotion } from "framer-motion";

/** FrontendCraft campaign atmosphere — matches site Atmosphere + tier accents. */
export function TikTokBackground() {
  const reduce = !!useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-slate-950" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />

      {!reduce ? (
        <>
          <motion.div
            className="absolute -start-16 top-[6%] h-52 w-52 rounded-full bg-yellow-300/[0.11] blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -end-10 top-[22%] h-56 w-56 rounded-full bg-cyan-400/[0.1] blur-3xl"
            animate={{ x: [0, -14, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute start-1/3 bottom-[8%] h-48 w-48 rounded-full bg-violet-400/[0.07] blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        <>
          <div className="absolute -start-16 top-[6%] h-52 w-52 rounded-full bg-yellow-300/[0.09] blur-3xl" />
          <div className="absolute -end-10 top-[22%] h-56 w-56 rounded-full bg-cyan-400/[0.09] blur-3xl" />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(2,6,23,0.5)_100%)]" />

      <div className="absolute inset-x-6 top-[5.5rem] h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
    </div>
  );
}
