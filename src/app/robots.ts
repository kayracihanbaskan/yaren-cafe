import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.isPreview
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
}
