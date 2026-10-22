type Environment = Record<string, string | undefined>;

/** Resolve one production origin for canonical URLs and crawler metadata. */
export function getSiteUrl(env: Environment): URL {
  const configured = env.SITE_URL?.trim();
  const value =
    configured ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  try {
    const url = new URL(value);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      throw new Error("Invalid origin");
    return new URL(url.origin);
  } catch {
    throw new Error(
      "SITE_URL must be an absolute HTTP(S) URL without credentials.",
    );
  }
}
export const site = {
  url: getSiteUrl(process.env),
  isPreview: process.env.VERCEL_ENV === "preview",
  title: "Yâren — Her fincanda ortak bir hikâye.",
  description:
    "Geleneksel Türk kahvesi, karakterli espresso ve özenle demlenen filtre kahve. Yâren ile her fincanda ortak bir hikâyeye katıl.",
};
