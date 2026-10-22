import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    tr: new URL("/tr", site.url).href,
    en: new URL("/en", site.url).href,
    "x-default": new URL("/tr", site.url).href,
  };
  return (["tr", "en"] as const).map((locale) => ({
    url: languages[locale],
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
