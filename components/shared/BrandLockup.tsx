"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/content/i18n/ui-strings";

const LOGO_SIZE = 36;
const LOGO_SHADOW = "shadow-[0_0_18px_rgba(34,211,238,0.2)]";

/** Shared brand lockup — same logo size, gap, name, and slogan everywhere. */
export function BrandLockup({
  href = "/",
  compact = false,
  onClick,
  className = "",
}: {
  href?: string;
  /** Hide slogan; keep logo + name spacing identical. */
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const { locale } = useLanguage();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex min-w-0 items-center gap-2.5 ${className}`}
    >
      <BrandLogo
        size={LOGO_SIZE}
        className={`${LOGO_SHADOW} transition group-hover:brightness-110`}
      />
      <span className="min-w-0">
        <span className="block truncate font-[family-name:var(--font-display)] text-sm font-bold leading-tight tracking-tight text-white sm:text-base">
          {t("brand", locale)}
        </span>
        {!compact ? (
          <span className="mt-0.5 block text-[11px] leading-snug text-slate-400 sm:text-xs">
            {t("hubTagline", locale)}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
