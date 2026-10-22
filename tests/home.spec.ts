import { test, expect } from "@playwright/test";

test("brand and discovery link lead to the complete coffee collection", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Her fincanda ortak bir hikâye.",
  );
  await page
    .getByRole("link", { name: "Kahveleri Keşfet", exact: true })
    .click();
  await expect(page).toHaveURL(/#kahveler$/);
  await expect(page.locator("#kahveler")).toBeInViewport();
  for (const [name, price] of [
    ["Türk Kahvesi", "₺120"],
    ["Espresso", "₺110"],
    ["Filtre Kahve", "₺140"],
  ]) {
    const article = page
      .getByRole("article")
      .filter({ has: page.getByRole("heading", { name, exact: true }) });
    await expect(article).toBeVisible();
    await expect(article).toContainText(price);
    await expect(article.locator("p").first()).not.toBeEmpty();
    const img = article.getByRole("img");
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0);
  }
});
for (const width of [320, 375, 1440]) {
  test(`layout fits ${width}px without horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
test("server content stays readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(3);
  for (const article of await page.getByRole("article").all())
    await expect(article).toBeVisible();
  await context.close();
});
