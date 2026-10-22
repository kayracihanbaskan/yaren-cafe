import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { serif, sans } from "./fonts";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: site.url,
  title: site.title,
  description: site.description,
  applicationName: "Yâren",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Yâren",
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: !site.isPreview, follow: !site.isPreview },
};
export const viewport: Viewport = {
  themeColor: "#f5f1e8",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#icerik" className="skip-link">
          İçeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
