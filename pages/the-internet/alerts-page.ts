// // pages/the-internet/alerts-page.ts
// import { Page, Locator } from "@playwright/test";
// import { InternetBasePage } from "./internet-base-page";

// export class AlertsPage extends InternetBasePage {
//   readonly jsAlertButton: Locator;
//   readonly jsConfirmButton: Locator;
//   readonly jsPromptButton: Locator;
//   readonly resultText: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.jsAlertButton = page.locator('button:has-text("Click for JS Alert")');
//     this.jsConfirmButton = page.locator(
//       'button:has-text("Click for JS Confirm")'
//     );
//     this.jsPromptButton = page.locator(
//       'button:has-text("Click for JS Prompt")'
//     );
//     this.resultText = page.locator("#result");
//   }

//   /**
//    * Navigate to alerts page
//    */
//   async goto(): Promise<void> {
//     await this.navigate("/javascript_alerts");
//     await this.verifyPageHeader("JavaScript Alerts");
//   }

//   /**
//    * Trigger a simple alert
//    */
//   async triggerAlert(): Promise<void> {
//     await this.jsAlertButton.click();
//   }

//   /**
//    * Trigger a confirmation dialog
//    */
//   async triggerConfirm(): Promise<void> {
//     await this.jsConfirmButton.click();
//   }

//   /**
//    * Trigger a prompt dialog
//    */
//   async triggerPrompt(): Promise<void> {
//     await this.jsPromptButton.click();
//   }

//   /**
//    * Get the result text after handling an alert
//    */
//   async getResultText(): Promise<string> {
//     return await this.resultText.textContent() ?? '';
//   }
// }

// pages/the-internet/alerts-page.ts
import { Page, Locator } from "@playwright/test";
import { InternetBasePage } from "./internet-base-page";

export class AlertsPage extends InternetBasePage {
  readonly jsAlertButton: Locator;
  readonly jsConfirmButton: Locator;
  readonly jsPromptButton: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    super(page);
    this.jsAlertButton = page.locator('button:has-text("Click for JS Alert")');
    this.jsConfirmButton = page.locator(
      'button:has-text("Click for JS Confirm")'
    );
    this.jsPromptButton = page.locator(
      'button:has-text("Click for JS Prompt")'
    );
    this.resultText = page.locator("#result");
  }

  /**
   * Navigate to alerts page
   */
  async goto(): Promise<void> {
    await this.navigate("/javascript_alerts");
    await this.verifyPageHeader("JavaScript Alerts");
  }

  /**
   * Trigger a simple alert
   */
  async triggerAlert(): Promise<void> {
    await this.jsAlertButton.click();
  }

  /**
   * Trigger a confirmation dialog
   */
  async triggerConfirm(): Promise<void> {
    await this.jsConfirmButton.click();
  }

  /**
   * Trigger a prompt dialog
   */
  async triggerPrompt(): Promise<void> {
    await this.jsPromptButton.click();
  }

  /**
   * Get the result text after handling an alert
   */
  async getResultText(): Promise<string> {
    return await this.getText(this.resultText);
  }
}
