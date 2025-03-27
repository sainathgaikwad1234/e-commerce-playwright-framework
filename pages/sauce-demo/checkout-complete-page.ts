// pages/sauce-demo/checkout-complete-page.ts
import { Page, Locator } from "@playwright/test";
import { SauceDemoBasePage } from "./sauce-demo-base-page";

export class CheckoutCompletePage extends SauceDemoBasePage {
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.ponyExpressImage = page.locator(".pony_express");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Navigate to checkout complete page
   */
  async goto(): Promise<void> {
    await this.navigate("/checkout-complete.html");
  }

  /**
   * Get thank you message
   */
  async getThankYouMessage(): Promise<string> {
    return await this.getText(this.completeHeader);
  }

  /**
   * Get complete text
   */
  async getCompleteText(): Promise<string> {
    return await this.getText(this.completeText);
  }

  /**
   * Go back to products
   */
  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }

  /**
   * Verify checkout completion
   */
  async verifyOrderComplete(): Promise<boolean> {
    const headerText = await this.getThankYouMessage();
    const completeText = await this.getCompleteText();

    return (
      headerText.toLowerCase().includes("thank you") &&
      completeText.toLowerCase().includes("order") &&
      (await this.ponyExpressImage.isVisible())
    );
  }
}
