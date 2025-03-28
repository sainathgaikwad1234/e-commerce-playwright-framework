// }

// pages/sauce-demo/product-details-page.ts
import { Page, Locator } from "@playwright/test";
import { SauceDemoBasePage } from "./sauce-demo-base-page";

export class ProductDetailsPage extends SauceDemoBasePage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;
  readonly productImage: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator(".inventory_details_name");
    this.productDescription = page.locator(".inventory_details_desc");
    this.productPrice = page.locator(".inventory_details_price");
    this.addToCartButton = page.locator('button[id^="add-to-cart"]');
    this.removeButton = page.locator('button[id^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
    this.productImage = page.locator(".inventory_details_img");
  }

  /**
   * Navigate to product details page
   * @param productId Product ID
   */
  async goto(productId: string): Promise<void> {
    await this.navigate(`/inventory-item.html?id=${productId}`);
  }

  /**
   * Get product name
   */
  async getProductName(): Promise<string> {
    return await this.getText(this.productName);
  }

  /**
   * Get product description
   */
  async getProductDescription(): Promise<string> {
    return await this.getText(this.productDescription);
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  /**
   * Add product to cart
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Remove product from cart
   */
  async removeFromCart(): Promise<void> {
    if (await this.isElementPresent(this.removeButton)) {
      await this.removeButton.click();
    } else {
      throw new Error("Remove button is not visible or does not exist.");
    }
  }

  /**
   * Go back to products page
   */
  async goBackToProducts(): Promise<void> {
    await this.backButton.click();
  }

  /**
   * Check if product is in cart
   */
  async isProductInCart(): Promise<boolean> {
    return await this.removeButton.isVisible();
  }
}
