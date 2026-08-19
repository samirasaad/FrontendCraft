import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
import {
  LOCALE_BOOTSTRAP_SCRIPT,
  LOCALE_COOKIE,
  localeDir,
  parseLocale,
} from "@/lib/locale";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrontendCraft — Learn Frontend by Building",
  description:
    "Become a frontend developer through interactive lessons, real challenges, and hands-on playgrounds. Bilingual, visual, and built for builders — not spectators.",
  applicationName: "FrontendCraft",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={locale}
      dir={localeDir(locale)}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOTSTRAP_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-slate-950 text-slate-100">
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
