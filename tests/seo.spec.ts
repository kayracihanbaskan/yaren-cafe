import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const origin = process.env.SITE_URL || "http://localhost:3000";
test("search metadata uses the production identity and working brand assets", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Yâren — Her fincanda ortak bir hikâye.");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Türk kahvesi/,
  );
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  expect(new URL(canonical!).href).toBe(new URL("/tr", origin).href);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /^https?:\/\//,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  for (const asset of [
    "/icon.svg",
    "/icon.png",
    "/apple-icon.png",
    "/brand/og-tr.png",
    "/brand/og-en.png",
    "/brand/logo.svg",
  ]) {
    const response = await request.get(asset);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/image\//);
  }
  const structured = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ||
      "{}",
  );
  expect(
    structured["@graph"].map((entry: { "@type": string }) => entry["@type"]),
  ).toEqual(["WebSite", "Brand"]);
});
test("crawler endpoints point at the canonical homepage", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const entries = await sitemap.text();
  expect(entries).toContain(`<loc>${origin}/tr</loc>`);
  expect(entries).toContain(`<loc>${origin}/en</loc>`);
  expect(entries).toContain('hreflang="x-default"');
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Allow: /");
});
for (const width of [375, 1440]) {
  test(`page and navigation have no serious accessibility issues at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    if (width === 375)
      await page.getByRole("button", { name: "Menüyü aç" }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact || ""),
      ),
    ).toEqual([]);
  });
}
test("form stays inactive when JavaScript is disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("form")).toBeHidden();
  await expect(
    page.locator("noscript p").filter({
      hasText: "Formu kullanmak için JavaScript’i etkinleştirebilirsin.",
    }),
  ).toBeVisible();
  await context.close();
});
