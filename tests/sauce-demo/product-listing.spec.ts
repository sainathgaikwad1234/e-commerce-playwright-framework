// tests/sauce-demo/product-listing.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Product Listing Page", () => {
  // Increase timeout for all tests
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    // Login directly
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');

    // Wait for inventory page to fully load
    await page.waitForURL("**/inventory.html");
    await page.waitForSelector(".inventory_item", { state: "visible" });
  });

  test("Display products", async ({ page }) => {
    // Verify products are loaded
    const productCount = await page.locator(".inventory_item").count();
    expect(productCount).toBeGreaterThan(0);

    // Verify first product has the expected elements
    await expect(page.locator(".inventory_item_name").first()).toBeVisible();
    await expect(page.locator(".inventory_item_price").first()).toBeVisible();
    await expect(page.locator(".inventory_item_desc").first()).toBeVisible();
  });

  test("Add products to cart", async ({ page }) => {
    // Find and click the first add to cart button using JavaScript
    await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button[id^="add-to-cart"]')
      );
      if (buttons.length > 0) (buttons[0] as HTMLElement).click();
    });

    // Wait for cart to update
    await page.waitForTimeout(500);

    // Verify cart badge shows 1 item
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  test("Remove products from cart", async ({ page }) => {
    // Add a product to cart using JavaScript
    await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button[id^="add-to-cart"]')
      );
      if (buttons.length > 0) (buttons[0] as HTMLElement).click();
    });

    // Wait for cart to update
    await page.waitForTimeout(500);

    // Verify item was added
    await expect(page.locator(".shopping_cart_badge")).toBeVisible();

    // Remove product using JavaScript
    await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll('button[id^="remove"]')
      );
      if (buttons.length > 0) (buttons[0] as HTMLElement).click();
    });

    // Wait for cart to update
    await page.waitForTimeout(500);

    // Verify cart is empty
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();
  });

  // All other tests in the suite remain as is
});
