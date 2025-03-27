// import { Page, Locator } from "@playwright/test";
// import { InternetBasePage } from "../../pages/the-internet/internet-base-page"; // Adjusted the path to match the correct directory structure

// export class FileUploadPage extends InternetBasePage {
//   readonly fileInput: Locator;
//   readonly uploadButton: Locator;
//   readonly uploadedFiles: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.fileInput = page.locator("#file-upload");
//     this.uploadButton = page.locator("#file-submit");
//     this.uploadedFiles = page.locator("#uploaded-files");
//   }

//   async goto(): Promise<void> {
//     await this.navigate("/upload");
//   }

//   async uploadFile(filePath: string): Promise<void> {
//     await this.fileInput.setInputFiles(filePath);
//     await this.uploadButton.click();
//   }

//   async getUploadedFileName(): Promise<string> {
//     return (await this.uploadedFiles.textContent()) || "";
//   }
// }

// // pages/the-internet/drag-drop-page.ts

// export class DragDropPage extends InternetBasePage {
//   readonly columnA: Locator;
//   readonly columnB: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.columnA = page.locator("#column-a");
//     this.columnB = page.locator("#column-b");
//   }

//   async dragAToB(): Promise<void> {
//     if (this.columnA && this.columnB) {
//       await this.columnA.dragTo(this.columnB);
//     } else {
//       throw new Error("One or both columns are undefined.");
//     }
//   }

//   async getColumnAText(): Promise<string> {
//     return (await this.columnA.textContent()) || "";
//   }

//   async getColumnBText(): Promise<string> {
//     return (await this.columnB.textContent()) || "";
//   }
// }

// pages/the-internet/file-upload-page.ts
import { Page, Locator } from "@playwright/test";
import { InternetBasePage } from "./internet-base-page";

export class FileUploadPage extends InternetBasePage {
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFiles: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator("#file-upload");
    this.uploadButton = page.locator("#file-submit");
    this.uploadedFiles = page.locator("#uploaded-files");
  }

  /**
   * Navigate to file upload page
   */
  async goto(): Promise<void> {
    await this.navigate("/upload");
    await this.verifyPageHeader("File Upload");
  }

  /**
   * Upload a file
   * @param filePath Path to the file to upload
   */
  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
    // Wait for upload to complete
    await this.page.waitForSelector("#uploaded-files");
  }

  /**
   * Get the name of the uploaded file
   * @returns Uploaded filename or empty string
   */
  async getUploadedFileName(): Promise<string> {
    return this.getText(this.uploadedFiles);
  }
}
