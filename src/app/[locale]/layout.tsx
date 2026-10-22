import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { serif, sans } from "../fonts";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/types";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/preferences/theme-provider";
import "../globals.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);
  const image = `/brand/og-${locale}.png`;
  return {
    metadataBase: site.url,
    title: copy.meta.title,
    description: copy.meta.description,
    applicationName: "Yâren",
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en", "x-default": "/tr" },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      alternateLocale: locale === "tr" ? "en_GB" : "tr_TR",
      siteName: "Yâren",
      title: copy.meta.title,
      description: copy.meta.description,
      url: `/${locale}`,
      images: [{ url: image, width: 1200, height: 630, alt: copy.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: [image],
    },
    robots: { index: !site.isPreview, follow: !site.isPreview },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: "/apple-icon.png",
    },
  };
}
export const viewport: Viewport = {
  themeColor: "#f7f2e9",
  colorScheme: "light dark",
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable}`}
    >
      <body>
        <ThemeProvider>
          <a href="#icerik" className="skip-link">
            {copy.common.skip}
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
