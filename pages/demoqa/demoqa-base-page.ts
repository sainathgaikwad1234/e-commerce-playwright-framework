// // pages/demoqa/demoqa-base-page.ts
// import { Page, Locator } from "@playwright/test";
// import { BasePage } from "../base-page";

// export class DemoQABasePage extends BasePage {
//   readonly header: Locator;
//   readonly mainContent: Locator;
//   readonly sidebarMenu: Locator;

//   constructor(page: Page) {
//     super(page, "https://demoqa.com");
//     this.header = page.locator(".main-header");
//     this.mainContent = page.locator(".main-content");
//     this.sidebarMenu = page.locator(".left-pannel");
//   }

//   /**
//    * Get the header text of the current page
//    */
//   async getHeaderText(): Promise<string> {
//     return await this.getText(this.header);
//   }

//   /**
//    * Navigate to a section using the sidebar
//    * @param category Main category (e.g., 'Elements', 'Forms')
//    * @param item Specific item within category (optional)
//    */
//   async navigateToSection(category: string, item?: string): Promise<void> {
//     // Expand category if it's not already expanded
//     const categoryElement = this.page.locator(
//       `.element-group:has-text("${category}")`
//     );
//     const isExpanded = (await categoryElement.getAttribute("class")) || "";

//     if (!isExpanded.includes("show")) {
//       await categoryElement.click();
//     }

//     // Click on specific item if provided
//     if (item) {
//       await this.page.locator(`span:has-text("${item}")`).click();
//     }
//   }

//   /**
//    * Handle ads that might appear on DemoQA
//    * Note: DemoQA has ads that can interfere with tests
//    */
//   async handleAds(): Promise<void> {
//     try {
//       // Try to close any visible ads or accept cookies
//       const adCloseButton = this.page.locator("#close-fixedban");
//       if (await adCloseButton.isVisible({ timeout: 2000 })) {
//         await adCloseButton.click();
//       }
//     } catch (error) {
//       // Ignore errors if ad elements are not found
//     }
//   }

//   /**
//    * Scroll to element (DemoQA often requires scrolling)
//    */

//   async navigate(path: string): Promise<void> {
//     await this.page.goto(path);
//   }

//   /**
//    * Get the text content of a locator
//    * @param locator Locator to get text from
//    */
//   async getText(locator: Locator): Promise<string> {
//     return (await locator.textContent()) || "";
//   }
//   async scrollToElement(locator: Locator): Promise<void> {
//     await locator.scrollIntoViewIfNeeded();
//     // Add a small delay to ensure element is properly in view
//     await this.page.waitForTimeout(100);
//   }
// }

// pages/demoqa/demoqa-base-page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base-page";

export class DemoQABasePage extends BasePage {
  readonly header: Locator;
  readonly mainContent: Locator;
  readonly sidebarMenu: Locator;

  constructor(page: Page) {
    super(page, "https://demoqa.com");
    this.header = page.locator(".main-header");
    this.mainContent = page.locator(".main-content");
    this.sidebarMenu = page.locator(".left-pannel");
  }

  /**
   * Get the header text of the current page
   */
  async getHeaderText(): Promise<string> {
    return await this.getText(this.header);
  }

  /**
   * Navigate to a section using the sidebar
   * @param category Main category (e.g., 'Elements', 'Forms')
   * @param item Specific item within category (optional)
   */
  async navigateToSection(category: string, item?: string): Promise<void> {
    // Expand category if it's not already expanded
    const categoryElement = this.page.locator(
      `.element-group:has-text("${category}")`
    );
    const isExpanded = (await categoryElement.getAttribute("class")) || "";

    if (!isExpanded.includes("show")) {
      await categoryElement.click();
    }

    // Click on specific item if provided
    if (item) {
      await this.page.locator(`span:has-text("${item}")`).click();
    }
  }

  /**
   * Handle ads that might appear on DemoQA
   * Note: DemoQA has ads that can interfere with tests
   */
  async handleAds(): Promise<void> {
    try {
      // Try to close any visible ads or accept cookies
      const adCloseButton = this.page.locator("#close-fixedban");
      if (await adCloseButton.isVisible({ timeout: 2000 })) {
        await adCloseButton.click();
      }
    } catch (error) {
      // Ignore errors if ad elements are not found
    }
  }

  /**
   * Get current site domain
   */
  getCurrentSite(): string {
    return "https://demoqa.com";
  }
}
