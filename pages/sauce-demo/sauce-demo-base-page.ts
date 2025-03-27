// // pages/sauce-demo/sauce-demo-base-page.ts
// import { Locator, Page } from "@playwright/test";
// import { BasePage } from "../base-page";

// export class SauceDemoBasePage extends BasePage {
//   constructor(page: Page) {
//     super(page, "https://www.saucedemo.com");
//   }

//   // SauceDemo-specific methods
//   /**
//    * Get current site domain
//    */
//   getCurrentSite(): string {
//     return "https://www.saucedemo.com";
//   }
//   /**
//    * Get text content of a locator
//    * @param locator Locator to extract text from
//    */
//   async getText(locator: Locator): Promise<string> {
//     return (await locator.textContent()) || "";
//   }
// }

// // pages/the-internet/internet-base-page.ts

// export class InternetBasePage extends BasePage {
//   constructor(page: Page) {
//     super(page, "https://the-internet.herokuapp.com");
//   }

//   // The Internet specific methods
// }

// // pages/demoqa/demoqa-base-page.ts

// export class DemoQABasePage extends BasePage {
//   constructor(page: Page) {
//     super(page, "https://demoqa.com");
//   }

//   // DemoQA specific methods

//   /**
//    * Get current site domain
//    */
//   getCurrentSite(): string {
//     return "https://demoqa.com";
//   }
// }
// function getCurrentSite() {
//   throw new Error("Function not implemented.");
// }

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
