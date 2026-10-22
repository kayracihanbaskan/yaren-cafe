import { test, expect } from "@playwright/test";
for (const locale of ["tr", "en"])
  for (const theme of ["light", "dark"]) {
    for (const width of [320, 375, 768, 1440]) {
      test(`${locale} ${theme} fits ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.addInitScript(
          (value) => localStorage.setItem("yaren-theme", value),
          theme,
        );
        await page.goto(`/${locale}`);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      });
    }
    for (const width of [320, 375]) {
      test(`${locale} ${theme} remains readable at ${width}px with 200% text`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.addInitScript(
          (value) => localStorage.setItem("yaren-theme", value),
          theme,
        );
        await page.goto(`/${locale}`);
        await page.evaluate(() => {
          const nodes = Array.from(
            document.querySelectorAll<HTMLElement>("body *"),
          ).filter((node) => node instanceof HTMLElement);
          const sizes = nodes.map((node) =>
            parseFloat(getComputedStyle(node).fontSize),
          );
          nodes.forEach(
            (node, index) => (node.style.fontSize = `${sizes[index] * 2}px`),
          );
        });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        const toggle = page.getByRole("banner").getByRole("button");
        await toggle.click();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await toggle.click();
        await page.getByRole("article").first().locator("summary").click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        expect(
          await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
        ).toBe(true);
        await expect(dialog.getByRole("button")).toBeInViewport();
      });
    }
  }
