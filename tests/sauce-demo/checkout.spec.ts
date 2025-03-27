// tests/sauce-demo/checkout.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/sauce-demo/login-page";
import { ProductListPage } from "../../pages/product-list-page";
import { CheckoutPage } from "../../pages/checkout-page";

test.describe("Checkout Process", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    // Verify we're logged in and on the inventory page
    await expect(page).toHaveURL(/inventory.html/);

    // Add items to cart
    const productListPage = new ProductListPage(page);
    await productListPage.addProductToCart(0);
    await productListPage.addProductToCart(1);

    // Navigate to cart
    await productListPage.navigateToCart();

    // Verify we're on the cart page
    await expect(page).toHaveURL(/cart.html/);

    // Click checkout
    await page.locator('[data-test="checkout"]').click();

    // Verify we're on the checkout information page
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test("Complete checkout process with valid information", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Fill information
    await checkoutPage.fillInformation("John", "Doe", "12345");

    // Continue to checkout overview
    await checkoutPage.continueToOverview();

    // Verify we're on the checkout overview page
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Verify order summary has expected elements
    expect(await checkoutPage.getCheckoutItemCount()).toBe(2);
    expect(await checkoutPage.getNumericSubtotal()).toBeGreaterThan(0);
    expect(await checkoutPage.getNumericTax()).toBeGreaterThan(0);
    expect(await checkoutPage.getNumericTotal()).toBeGreaterThan(0);

    // Verify total calculation is correct
    expect(await checkoutPage.verifyTotalCalculation()).toBeTruthy();

    // Complete purchase
    await checkoutPage.finishPurchase();

    // Verify we're on the checkout complete page
    await expect(page).toHaveURL(/checkout-complete.html/);

    // Verify completion message
    const completeHeader = await checkoutPage.getCompleteHeaderText();
    expect(completeHeader.toLowerCase()).toContain("thank you");

    // Return to products
    await checkoutPage.returnToProducts();

    // Verify we're back on the inventory page
    await expect(page).toHaveURL(/inventory.html/);
  });

  test("Checkout with empty information fields", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Try to continue without filling in any information
    await checkoutPage.continueButton.click();

    // Verify error message
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain("First Name is required");

    // Fill first name and try again
    await checkoutPage.firstNameInput.fill("John");
    await checkoutPage.continueButton.click();

    // Verify error message for last name
    const lastNameError = await checkoutPage.getErrorMessage();
    expect(lastNameError).toContain("Last Name is required");

    // Fill last name and try again
    await checkoutPage.lastNameInput.fill("Doe");
    await checkoutPage.continueButton.click();

    // Verify error message for postal code
    const postalCodeError = await checkoutPage.getErrorMessage();
    expect(postalCodeError).toContain("Postal Code is required");
  });

  test("Cancel checkout and return to cart", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Click cancel on information page
    await checkoutPage.cancelInformation();

    // Verify we're back on the cart page
    await expect(page).toHaveURL(/cart.html/);
  });

  test("Cancel checkout from overview and return to products", async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);

    // Fill information and continue to overview
    await checkoutPage.fillInformationAndContinue("John", "Doe", "12345");

    // Cancel from overview page
    await checkoutPage.cancelOverview();

    // Verify we're back on the inventory page
    await expect(page).toHaveURL(/inventory.html/);
  });
});
