/**
 * Shared slow pace for every visualized animation (lesson labs, home hub, track demos).
 * Keep step + loop timings in sync so motion feels consistent across screens.
 */
export const LAB_STEP_MS = 3200;

/** Continuous pulse / orbit loops (seconds). */
export const LAB_LOOP_S = 2.8;

/** Slow continuous spins (linear orbits), derived from the same base pace. */
export const LAB_ORBIT_S = LAB_LOOP_S * 4;

/** Short enter / exit for step content swaps (seconds). */
export const LAB_ENTER_S = 0.35;

/** Framer-friendly infinite easeInOut loop. */
export const labLoop = {
  duration: LAB_LOOP_S,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

/** Framer-friendly infinite linear orbit. */
export const labOrbit = {
  duration: LAB_ORBIT_S,
  repeat: Infinity,
  ease: "linear" as const,
};
