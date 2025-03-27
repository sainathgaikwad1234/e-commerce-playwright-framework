// pages/sauce-demo/sauce-demo-base-page.ts
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class SauceDemoBasePage extends BasePage {
  constructor(page: Page) {
    super(page, "https://www.saucedemo.com");
  }

  /**
   * Get current site domain
   */
  getCurrentSite(): string {
    return "https://www.saucedemo.com";
  }
}
