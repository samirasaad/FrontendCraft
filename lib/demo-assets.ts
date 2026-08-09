/** Shared demo media for playground Sandpack + motion labs (no external CDN). */
export const STUDENTS_CODING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" role="img" aria-label="Students coding together">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="55%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e0f2fe"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" rx="28" fill="url(#sky)"/>
  <circle cx="680" cy="70" r="42" fill="#fde047" opacity="0.85"/>
  <rect x="70" y="270" width="660" height="120" rx="18" fill="#0f172a" opacity="0.35"/>
  <rect x="140" y="250" width="520" height="22" rx="6" fill="#1e293b"/>
  <rect x="280" y="160" width="240" height="150" rx="12" fill="#334155"/>
  <rect x="292" y="172" width="216" height="118" rx="6" fill="url(#screen)"/>
  <rect x="250" y="308" width="300" height="14" rx="4" fill="#475569"/>
  <rect x="308" y="190" width="120" height="8" rx="3" fill="#0284c7"/>
  <rect x="308" y="210" width="170" height="8" rx="3" fill="#0ea5e9" opacity="0.8"/>
  <rect x="308" y="230" width="90" height="8" rx="3" fill="#38bdf8"/>
  <rect x="308" y="250" width="140" height="8" rx="3" fill="#0284c7" opacity="0.7"/>
  <circle cx="210" cy="175" r="28" fill="#fdba74"/>
  <rect x="175" y="208" width="70" height="55" rx="16" fill="#f97316"/>
  <circle cx="590" cy="175" r="28" fill="#fcd34d"/>
  <rect x="555" y="208" width="70" height="55" rx="16" fill="#22d3ee"/>
  <rect x="0" y="390" width="800" height="60" fill="#0f172a" opacity="0.45"/>
  <text x="400" y="428" text-anchor="middle" fill="#f8fafc" font-family="system-ui,sans-serif" font-size="26" font-weight="700">Students coding</text>
</svg>
`;

export const DEMO_IMG_PATH = "students-coding.svg";

/** CC0 sample video — works in Sandpack preview without bundling binary MP4. */
export const DEMO_VIDEO_MP4 =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const DEMO_VIDEO_VTT = `WEBVTT

00:00.000 --> 00:05.000
Sample captions for the lesson preview.

00:05.000 --> 00:10.000
Replace with your real transcript in production.
`;

export const DEMO_CAPTIONS_VTT_PATH = "captions.vtt";
export const DEMO_INTRO_VTT_PATH = "intro.vtt";
