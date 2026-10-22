import { test, expect } from "@playwright/test";
for (const locale of ["tr", "en"]) {
  test(`${locale} navigation, theme and coffee story work across browsers`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("banner").getByRole("combobox").selectOption("dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const trigger = page.getByRole("article").first().locator("summary");
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Tab");
    expect(
      await page
        .getByRole("dialog")
        .evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await page
      .getByRole("banner")
      .getByRole("link", {
        name: locale === "tr" ? "English" : "Türkçe",
        exact: true,
      })
      .click();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      locale === "tr" ? "en" : "tr",
    );
    expect(errors).toEqual([]);
  });
}
