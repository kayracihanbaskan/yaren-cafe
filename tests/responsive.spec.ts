import { test, expect } from "@playwright/test";
for (const locale of ["tr", "en"]) {
  for (const width of [768, 1024]) {
    test(`${locale} tablet header shows four links at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}`);
      const header = page.getByRole("banner");
      await expect(header.locator(".menu-toggle")).toBeHidden();
      const links = header
        .getByRole("navigation")
        .getByRole("link")
        .filter({ hasNotText: /^(TR|EN)$/ });
      await expect(links).toHaveCount(4);
      const boxes = [];
      for (const link of await links.all()) {
        await expect(link).toBeVisible();
        boxes.push((await link.boundingBox())!);
      }
      expect(
        Math.max(...boxes.map((b) => b.y)) - Math.min(...boxes.map((b) => b.y)),
      ).toBeLessThan(2);
      const footer = page.getByRole("contentinfo");
      const theme = await footer
        .getByRole("group", {
          name: locale === "tr" ? "Görünüm" : "Appearance",
          exact: true,
        })
        .boundingBox();
      const language = await footer
        .getByRole("group", {
          name: locale === "tr" ? "Dil" : "Language",
          exact: true,
        })
        .boundingBox();
      expect(Math.abs(theme!.y - language!.y)).toBeLessThan(2);
    });
  }
}
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
        const toggle = page.getByRole("banner").locator(".menu-toggle");
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
