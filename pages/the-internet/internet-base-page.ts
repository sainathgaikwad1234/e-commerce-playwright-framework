// pages/the-internet/internet-base-page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base-page";

export class InternetBasePage extends BasePage {
  readonly pageHeader: Locator;
  readonly footerText: Locator;

  constructor(page: Page) {
    super(page, "https://the-internet.herokuapp.com");
    this.pageHeader = page.locator("h3");
    this.footerText = page.locator("#page-footer");
  }

  /**
   * Get the page header text
   */
  async getPageHeaderText(): Promise<string> {
    return await this.getText(this.pageHeader);
  }

  /**
   * Check if we're on the correct page by header text
   */
  async verifyPageHeader(expectedText: string): Promise<void> {
    const headerText = await this.getPageHeaderText();
    if (!headerText.includes(expectedText)) {
      throw new Error(
        `Expected header to contain "${expectedText}" but got "${headerText}"`
      );
    }
  }
}
