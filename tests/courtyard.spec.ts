import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const [locale, heading] of [
  ["tr", "Her fincanda ortak bir hikâye."],
  ["en", "Every cup, a story shared."],
] as const) {
  test(`localized courtyard ${locale} renders complete content`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.getByRole("article")).toHaveCount(3);
    await expect(page.getByRole("form")).toBeVisible();
  });
}
test("theme persists and system mode follows the device", async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tr");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const theme = page.getByRole("banner").getByLabel("Görünüm");
  await theme.selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#201d18",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const other = await context.newPage();
  await other.goto("/en");
  await expect(other.locator("html")).toHaveAttribute("data-theme", "dark");
  await theme.selectOption("light");
  await expect(other.locator("html")).toHaveAttribute("data-theme", "light");
  await theme.selectOption("system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#f7f2e9",
  );
  await other.close();
});
test("language switch preserves the chosen section", async ({ page }) => {
  await page.goto("/tr#hikayemiz");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en#hikayemiz$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Every cup, a story shared.",
  );
});
test("coffee story is modal, scrollable, and restores keyboard focus", async ({
  page,
}) => {
  await page.goto("/tr");
  const trigger = page
    .getByRole("article", { name: "Türk Kahvesi", exact: true })
    .getByText("Hikâyesini keşfet", { exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Bir fincanın kırk yıllık hatırı");
  await page.keyboard.press("Tab");
  expect(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test("coffee finder can go back, recommend, open a story, and restart", async ({
  page,
}) => {
  await page.goto("/en#kahveni-bul");
  const finder = page.getByRole("region", { name: "Find your coffee" });
  await expect(
    finder.getByRole("button", { name: "Next", exact: true }),
  ).toBeDisabled();
  await finder.getByRole("radio", { name: "A conversation" }).check();
  await finder.getByRole("button", { name: "Next", exact: true }).click();
  await finder.getByRole("radio", { name: "Intense" }).check();
  await finder.getByRole("button", { name: "Back", exact: true }).click();
  await expect(
    finder.getByRole("radio", { name: "A conversation" }),
  ).toBeChecked();
  await finder.getByRole("button", { name: "Next", exact: true }).click();
  await finder.getByRole("button", { name: "Next", exact: true }).click();
  await finder.getByRole("radio", { name: "5–10 minutes" }).check();
  await finder.getByRole("button", { name: "Find my coffee" }).click();
  await expect(
    finder.getByRole("heading", { name: "Turkish Coffee", exact: true }),
  ).toBeVisible();
  await finder.getByText("Explore its story", { exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await finder.getByRole("button", { name: "Start again" }).click();
  await expect(
    finder.getByRole("radio", { name: "A conversation" }),
  ).not.toBeChecked();
});
for (const locale of ["tr", "en"]) {
  for (const theme of ["light", "dark"]) {
    for (const width of [375, 1440]) {
      test(`accessible ${locale} ${theme} courtyard and story at ${width}px`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.addInitScript(
          (theme) => localStorage.setItem("yaren-theme", theme),
          theme,
        );
        await page.goto(`/${locale}`);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        const toggle = page.getByRole("banner").getByRole("button");
        if (width === 375) await toggle.click();
        async function checkAccessibility() {
          const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          expect(
            result.violations.filter((v) =>
              ["serious", "critical"].includes(v.impact || ""),
            ),
          ).toEqual([]);
        }
        await checkAccessibility();
        if (width === 375) await toggle.click();
        await page.getByRole("article").first().locator("summary").click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await checkAccessibility();
      });
    }
  }
}
test("story has a readable no-JavaScript fallback", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en");
  const article = page.getByRole("article", {
    name: "Turkish Coffee",
    exact: true,
  });
  await article.locator("summary").click();
  await expect(article).toContainText("A small cup, a lasting bond");
  await expect(article.locator("details")).toHaveAttribute("open", "");
  await context.close();
});

test("English form errors and success remain localised without saving a draft", async ({
  page,
}) => {
  await page.goto("/en");
  const form = page.getByRole("form", { name: "Yâren contact form" });
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(form).toContainText("Please tell us your name.");
  await expect(
    form.getByRole("textbox", { name: "Your name", exact: true }),
  ).toBeFocused();
  await form
    .getByRole("textbox", { name: "Your name", exact: true })
    .fill("Alex");
  await form
    .getByRole("textbox", { name: "Email address" })
    .fill("alex@invalid");
  await form
    .getByRole("textbox", { name: "Your message", exact: true })
    .fill("Hello Yâren");
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(form).toContainText("Please enter a valid email address.");
  await form
    .getByRole("textbox", { name: "Email address" })
    .fill("alex@example.com");
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message is ready. Thank you!",
  );
  expect(
    await page.evaluate(() =>
      Object.keys(localStorage).filter((key) => key !== "yaren-theme"),
    ),
  ).toEqual([]);
});
test("localized canonical and language alternatives match the route", async ({
  page,
  request,
}) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(308);
  expect(root.headers()["location"]).toBe("/tr");
  await page.goto("/en");
  await expect(page).toHaveTitle("Yâren — Every cup, a story shared.");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${process.env.SITE_URL || "http://localhost:3000"}/en`,
  );
  await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute(
    "href",
    /\/tr$/,
  );
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    "href",
    /\/en$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/brand\/og-en.png$/,
  );
  const bad = await request.get("/de");
  expect(bad.status()).toBe(404);
});
