import { test, expect } from "@playwright/test";

test("contact errors guide focus and a valid submission honestly completes the demo", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Yâren iletişim formu" });
  await form.getByRole("button", { name: "Mesajı Gönder" }).click();
  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(3);
  await expect(
    form.getByRole("textbox", { name: "Adın", exact: true }),
  ).toBeFocused();
  for (const field of await form.locator('[aria-invalid="true"]').all()) {
    const errorId = await field.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    await expect(page.locator(`#${errorId}`)).toBeVisible();
  }
  await form.getByRole("textbox", { name: "Adın", exact: true }).fill("   ");
  await form
    .getByRole("textbox", { name: "E-posta adresin", exact: true })
    .fill("bad@email");
  await form.getByRole("textbox", { name: "Mesajın", exact: true }).fill("  ");
  await form.getByRole("button", { name: "Mesajı Gönder" }).click();
  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(3);
  await form
    .getByRole("textbox", { name: "Adın", exact: true })
    .fill("Çağrı Şen");
  await form
    .getByRole("textbox", { name: "E-posta adresin", exact: true })
    .fill("cagri@example.com");
  await form
    .getByRole("textbox", { name: "Mesajın", exact: true })
    .fill("Merhaba Yâren!");
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await form.getByRole("button", { name: "Mesajı Gönder" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Mesajın hazır, teşekkürler!",
  );
  await expect(page.getByRole("status")).toContainText("gönderilmedi");
  expect(posts).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByRole("button", { name: "Yeni bir mesaj yaz" }).click();
  await expect(
    form.getByRole("textbox", { name: "Adın", exact: true }),
  ).toHaveValue("");
  await expect(
    form.getByRole("textbox", { name: "Adın", exact: true }),
  ).toBeFocused();
});

test("mobile disclosure supports Escape and moves focus to the chosen section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /Menüyü (aç|kapat)/ });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Ana navigasyon" })
    .getByRole("link", { name: "Kahvelerimiz" })
    .focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Ana navigasyon" })
    .getByRole("link", { name: "Kahvelerimiz" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#coffee-title")).toBeFocused();
  await expect
    .poll(async () => (await page.locator("#coffee-title").boundingBox())!.y)
    .toBeGreaterThan(75);
  await toggle.click();
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion immediately reveals content and disables smooth scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await expect
    .poll(() => page.locator('[data-reveal="pending"]').count())
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0);
});

test("missing IntersectionObserver leaves coffee content visible", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "IntersectionObserver", { value: undefined });
  });
  await page.goto("/");
  for (const article of await page.getByRole("article").all()) {
    expect(await article.evaluate((el) => getComputedStyle(el).opacity)).toBe(
      "1",
    );
  }
});
