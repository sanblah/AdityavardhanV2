import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/bespoke", "/lookbook", "/journal", "/appointment"];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return Math.ceil(doc.scrollWidth - doc.clientWidth);
  });
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("mobile layout", () => {
  for (const route of routes) {
    test(`${route} renders without horizontal overflow`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await expectNoHorizontalOverflow(page);
      await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();
    });
  }

  test("mobile navigation opens, links, and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /toggle menu/i }).click();
    await expect(page.getByRole("navigation", { name: /mobile/i })).toBeVisible();
    await page.getByRole("link", { name: /bespoke/i }).click();
    await expect(page).toHaveURL(/\/bespoke$/);
    await expect(page.getByRole("navigation", { name: /mobile/i })).toBeHidden();
    await expectNoHorizontalOverflow(page);
  });

  test("homepage background video loads on mobile", async ({ page }) => {
    await page.goto("/");
    const heroVideo = page.locator("video").first();

    await expect(heroVideo).toHaveAttribute("playsinline", "");
    await expect(heroVideo).toHaveAttribute("muted", "");
    await expect
      .poll(async () => heroVideo.locator("source").first().getAttribute("src"), {
        timeout: 3_500,
      })
      .toBe("/videos/hero-video-optimized.mp4");
    await expect
      .poll(async () => heroVideo.evaluate((video: HTMLVideoElement) => video.currentTime), {
        timeout: 6_000,
      })
      .toBeGreaterThan(0);
  });

  test("homepage lookbook preview opens and closes on backdrop tap", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /view piece 1 in full/i }).click();
    await expect(page.getByRole("dialog", { name: /lookbook image viewer/i })).toBeVisible();
    await page.mouse.click(8, 8);
    await expect(page.getByRole("dialog", { name: /lookbook image viewer/i })).toBeHidden();
  });

  test("lookbook filters and lightbox remain usable", async ({ page }) => {
    await page.goto("/lookbook");
    await page.getByRole("button", { name: /ethnicwear/i }).click();
    await page.getByRole("button", { name: /open ethnicwear image 1/i }).click();
    await expect(page.getByRole("dialog", { name: /lookbook gallery viewer/i })).toBeVisible();
    await page.getByRole("button", { name: /next image/i }).click();
    await page.getByRole("button", { name: /close gallery/i }).click();
    await expect(page.getByRole("dialog", { name: /lookbook gallery viewer/i })).toBeHidden();
  });

  test("appointment flow can select date, time, and submit", async ({ page }) => {
    await page.goto("/appointment");
    await page.locator("button:not([disabled])").filter({ hasText: /^[0-9]+$/ }).first().click();
    await page.getByRole("button", { name: "10:00 AM" }).click();
    await page.getByRole("button", { name: /next/i }).click();
    await page.getByLabel(/full name/i).fill("Mobile Test User");
    await page.getByLabel(/email address/i).fill("mobile@example.com");
    await page.getByRole("button", { name: /request appointment/i }).click();
    await expect(page.getByText(/appointment confirmed/i)).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
