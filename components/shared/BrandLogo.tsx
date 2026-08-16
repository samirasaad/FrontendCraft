"use client";

import { useId } from "react";

/** FrontendCraft mark — code brackets + craft slash (matches favicon). */
export function BrandLogo({
  size = 36,
  className = "",
  title = "FrontendCraft",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const bg = `fc-bg-${uid}`;
  const mark = `fc-mark-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`fc-brand-logo shrink-0 ${className}`}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient
          id={bg}
          x1="2"
          y1="2"
          x2="30"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--fc-logo-bg-from)" />
          <stop offset="1" stopColor="var(--fc-logo-bg-to)" />
        </linearGradient>
        <linearGradient
          id={mark}
          x1="6"
          y1="8"
          x2="26"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--fc-logo-mark-from)" />
          <stop offset="1" stopColor="var(--fc-logo-mark-to)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${bg})`} />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        stroke="var(--fc-logo-ring)"
        strokeOpacity="1"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M12.2 9.2 7.4 16l4.8 6.8"
        stroke={`url(#${mark})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M19.8 9.2 24.6 16l-4.8 6.8"
        stroke={`url(#${mark})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18.2 8.8 13.8 23.2"
        stroke="var(--fc-logo-slash)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
