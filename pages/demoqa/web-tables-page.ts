// // pages/demoqa/web-tables-page.ts
// import { Page, Locator } from "@playwright/test";
// import { DemoQABasePage } from "./demoqa-base-page";

// export class WebTablesPage extends DemoQABasePage {
//   readonly addButton: Locator;
//   readonly searchBox: Locator;
//   readonly table: Locator;
//   readonly tableRows: Locator;
//   readonly pagination: Locator;
//   readonly rowsPerPageSelector: Locator;
//   readonly editButtons: Locator;
//   readonly deleteButtons: Locator;
//   readonly registrationForm: Locator;

//   constructor(page: Page) {
//     super(page);
//     this.addButton = page.locator("#addNewRecordButton");
//     this.searchBox = page.locator("#searchBox");
//     this.table = page.locator(".rt-table");
//     this.tableRows = page.locator(".rt-tr-group:not(.rt-tr-group.-padRow)");
//     this.pagination = page.locator(".rt-pagination");
//     this.rowsPerPageSelector = page.locator(
//       'select[aria-label="rows per page"]'
//     );
//     this.editButtons = page.locator('[title="Edit"]');
//     this.deleteButtons = page.locator('[title="Delete"]');
//     this.registrationForm = page.locator(".modal-content");
//   }

//   /**
//    * Navigate to web tables page
//    */
//   async goto(): Promise<void> {
//     await this.navigate("/webtables");
//     await this.handleAds();
//     await this.page.waitForSelector(".rt-table");
//   }

//   /**
//    * Add a new record to the table
//    */
//   async addRecord(record: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: string;
//     salary: string;
//     department: string;
//   }): Promise<void> {
//     await this.addButton.click();
//     await this.page.waitForSelector(".modal-content");

//     // Fill the registration form
//     await this.page.locator("#firstName").fill(record.firstName);
//     await this.page.locator("#lastName").fill(record.lastName);
//     await this.page.locator("#userEmail").fill(record.email);
//     await this.page.locator("#age").fill(record.age);
//     await this.page.locator("#salary").fill(record.salary);
//     await this.page.locator("#department").fill(record.department);

//     // Submit the form
//     await this.page.locator("#submit").click();

//     // Wait for modal to close
//     await this.page.waitForSelector(".modal-content", { state: "hidden" });
//   }

//   /**
//    * Search for records
//    */
//   async searchRecords(searchText: string): Promise<void> {
//     await this.searchBox.fill(searchText);
//     // Wait for search results to update
//     await this.page.waitForTimeout(500);
//   }

//   /**
//    * Get all rows data
//    */
//   async getTableData(): Promise<string[][]> {
//     const rows = await this.tableRows.all();
//     const tableData: string[][] = [];

//     for (const row of rows) {
//       // Skip empty rows
//       if ((await row.locator(".rt-td").first().textContent()) === " ") {
//         continue;
//       }

//       const cells = await row.locator(".rt-td").all();
//       const rowData: string[] = [];

//       for (const cell of cells) {
//         rowData.push(((await cell.textContent()) || "").trim());
//       }

//       if (rowData.some((text) => text !== "")) {
//         tableData.push(rowData);
//       }
//     }

//     return tableData;
//   }

//   /**
//    * Delete a record by row index
//    */
//   async deleteRecord(rowIndex: number): Promise<void> {
//     const deleteButtons = await this.deleteButtons.all();

//     if (rowIndex < deleteButtons.length) {
//       await deleteButtons[rowIndex].click();
//     } else {
//       throw new Error(
//         `Row index ${rowIndex} is out of range. Only ${deleteButtons.length} rows available.`
//       );
//     }
//   }

//   /**
//    * Edit a record by row index
//    */
//   async editRecord(
//     rowIndex: number,
//     newData: Record<string, string>
//   ): Promise<void> {
//     const editButtons = await this.editButtons.all();

//     if (rowIndex < editButtons.length) {
//       await editButtons[rowIndex].click();
//       await this.page.waitForSelector(".modal-content");

//       // Update fields
//       for (const [field, value] of Object.entries(newData)) {
//         const fieldSelector = `#${field}`;
//         await this.page.locator(fieldSelector).fill(value);
//       }

//       // Submit changes
//       await this.page.locator("#submit").click();

//       // Wait for modal to close
//       await this.page.waitForSelector(".modal-content", { state: "hidden" });
//     } else {
//       throw new Error(
//         `Row index ${rowIndex} is out of range. Only ${editButtons.length} rows available.`
//       );
//     }
//   }

//   /**
//    * Change rows per page
//    */
//   async setRowsPerPage(count: string): Promise<void> {
//     await this.rowsPerPageSelector.selectOption(count);
//   }
// }

// pages/demoqa/web-tables-page.ts
import { Page, Locator } from "@playwright/test";
import { DemoQABasePage } from "./demoqa-base-page";

export class WebTablesPage extends DemoQABasePage {
  readonly addButton: Locator;
  readonly searchBox: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly pagination: Locator;
  readonly rowsPerPageSelector: Locator;
  readonly editButtons: Locator;
  readonly deleteButtons: Locator;
  readonly registrationForm: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = page.locator("#addNewRecordButton");
    this.searchBox = page.locator("#searchBox");
    this.table = page.locator(".rt-table");
    this.tableRows = page.locator(".rt-tr-group:not(.rt-tr-group.-padRow)");
    this.pagination = page.locator(".rt-pagination");
    this.rowsPerPageSelector = page.locator(
      'select[aria-label="rows per page"]'
    );
    this.editButtons = page.locator('[title="Edit"]');
    this.deleteButtons = page.locator('[title="Delete"]');
    this.registrationForm = page.locator(".modal-content");
  }

  /**
   * Navigate to web tables page with direct URL and retry
   */
  async goto(): Promise<void> {
    // Use direct navigation to the web tables page
    await this.page.goto("https://demoqa.com/webtables");

    // Handle ads
    await this.handleAds();

    try {
      // Wait for table to be visible
      await this.page.waitForSelector(".rt-table", {
        state: "visible",
        timeout: 10000,
      });
    } catch (error) {
      console.log("Table not visible on first load, retrying navigation");
      // Retry navigation if table isn't visible
      await this.page.goto("https://demoqa.com/webtables");
      await this.handleAds();
      await this.page.waitForSelector(".rt-table", {
        state: "visible",
        timeout: 10000,
      });
    }

    // Additional wait for the table to be fully loaded
    await this.page.waitForTimeout(2000);
  }

  /**
   * Add a new record with retry mechanism
   */
  async addRecord(record: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;
  }): Promise<void> {
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        // Make sure the add button is visible
        await this.page.waitForSelector("#addNewRecordButton", {
          state: "visible",
          timeout: 5000,
        });

        // Click add button with force option
        await this.addButton.click({ force: true });

        // Wait for modal to appear
        await this.page.waitForSelector(".modal-content", {
          state: "visible",
          timeout: 5000,
        });

        // Fill the form fields
        await this.page.locator("#firstName").fill(record.firstName);
        await this.page.locator("#lastName").fill(record.lastName);
        await this.page.locator("#userEmail").fill(record.email);
        await this.page.locator("#age").fill(record.age);
        await this.page.locator("#salary").fill(record.salary);
        await this.page.locator("#department").fill(record.department);

        // Submit form
        await this.page.locator("#submit").click();

        // Wait for modal to close
        await this.page.waitForSelector(".modal-content", {
          state: "hidden",
          timeout: 5000,
        });

        // Success - break out of the retry loop
        break;
      } catch (error) {
        retryCount++;
        console.log(`Add record attempt ${retryCount} failed:`, error);

        if (retryCount === maxRetries) {
          throw new Error(`Failed to add record after ${maxRetries} attempts`);
        }

        // Wait before retrying
        await this.page.waitForTimeout(1000);
      }
    }

    // Wait for table to update
    await this.page.waitForTimeout(1000);
  }

  /**
   * Search for records with multiple attempts
   */
  async searchRecords(searchText: string): Promise<void> {
    try {
      // Make sure search box is visible
      await this.page.waitForSelector("#searchBox", {
        state: "visible",
        timeout: 5000,
      });

      // Clear existing text
      await this.searchBox.clear();
      await this.page.waitForTimeout(300);

      // Fill with new search text
      await this.searchBox.fill(searchText);

      // Wait for search results to update
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log("Error during search:", error);

      // Try with JavaScript as fallback
      await this.page.evaluate((text) => {
        const searchBox = document.querySelector(
          "#searchBox"
        ) as HTMLInputElement;
        if (searchBox) {
          searchBox.value = "";
          searchBox.value = text;
          searchBox.dispatchEvent(new Event("input", { bubbles: true }));
          searchBox.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, searchText);

      // Wait for search results
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Get all rows data with retry and robust parsing
   */
  async getTableData(): Promise<string[][]> {
    // Wait for table content to update
    await this.page.waitForTimeout(1000);

    try {
      // Get table data using JavaScript for more reliable parsing
      return await this.page.evaluate(() => {
        const tableRows = Array.from(document.querySelectorAll(".rt-tr-group"));
        const tableData: string[][] = [];

        for (const row of tableRows) {
          const cells = Array.from(row.querySelectorAll(".rt-td"));
          const rowData = cells.map((cell) => cell.textContent?.trim() || "");

          // Only include rows with actual data (not empty rows)
          if (rowData.some((text) => text !== "")) {
            tableData.push(rowData);
          }
        }

        return tableData;
      });
    } catch (error) {
      console.log("Error getting table data:", error);

      // Fallback to locator method if JavaScript approach fails
      const rows = await this.tableRows.all();
      const tableData: string[][] = [];

      for (const row of rows) {
        try {
          const cells = await row.locator(".rt-td").all();
          const rowData: string[] = [];

          for (const cell of cells) {
            rowData.push(((await cell.textContent()) || "").trim());
          }

          if (rowData.some((text) => text !== "")) {
            tableData.push(rowData);
          }
        } catch (cellError) {
          // Skip problematic rows
          console.log("Error processing row:", cellError);
        }
      }

      return tableData;
    }
  }

  /**
   * Delete a record with retry
   */
  async deleteRecord(rowIndex: number): Promise<void> {
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        // Get a fresh list of delete buttons
        const deleteButtons = await this.page.locator('[title="Delete"]').all();

        if (rowIndex >= deleteButtons.length) {
          throw new Error(
            `Row index ${rowIndex} is out of range. Only ${deleteButtons.length} rows available.`
          );
        }

        // Click the delete button using JavaScript for reliability
        await this.page.evaluate((index) => {
          const deleteButtons = Array.from(
            document.querySelectorAll('[title="Delete"]')
          );
          if (deleteButtons.length > index) {
            (deleteButtons[index] as HTMLElement).click();
          }
        }, rowIndex);

        // Wait for the table to update
        await this.page.waitForTimeout(1000);

        // Success - break out of retry loop
        break;
      } catch (error) {
        retryCount++;
        console.log(`Delete record attempt ${retryCount} failed:`, error);

        if (retryCount === maxRetries) {
          // On final retry, use force click as last resort
          try {
            const deleteButtons = await this.page
              .locator('[title="Delete"]')
              .all();
            if (rowIndex < deleteButtons.length) {
              await deleteButtons[rowIndex].click({
                force: true,
                timeout: 5000,
              });
              await this.page.waitForTimeout(1000);
            }
          } catch (finalError) {
            throw new Error(
              `Failed to delete record after ${maxRetries} attempts`
            );
          }
        }

        // Wait before retrying
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Edit a record with retry
   */
  async editRecord(
    rowIndex: number,
    newData: Record<string, string>
  ): Promise<void> {
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        // Get a fresh list of edit buttons
        const editButtons = await this.page.locator('[title="Edit"]').all();

        if (rowIndex >= editButtons.length) {
          throw new Error(
            `Row index ${rowIndex} is out of range. Only ${editButtons.length} rows available.`
          );
        }

        // Click the edit button using JavaScript for reliability
        await this.page.evaluate((index) => {
          const editButtons = Array.from(
            document.querySelectorAll('[title="Edit"]')
          );
          if (editButtons.length > index) {
            (editButtons[index] as HTMLElement).click();
          }
        }, rowIndex);

        // Wait for modal to appear
        await this.page.waitForSelector(".modal-content", {
          state: "visible",
          timeout: 5000,
        });

        // Update fields
        for (const [field, value] of Object.entries(newData)) {
          const fieldSelector = `#${field}`;
          await this.page.locator(fieldSelector).clear();
          await this.page.locator(fieldSelector).fill(value);
        }

        // Submit changes
        await this.page.locator("#submit").click();

        // Wait for modal to close
        await this.page.waitForSelector(".modal-content", {
          state: "hidden",
          timeout: 5000,
        });

        // Wait for table to update
        await this.page.waitForTimeout(1000);

        // Success - break out of retry loop
        break;
      } catch (error) {
        retryCount++;
        console.log(`Edit record attempt ${retryCount} failed:`, error);

        if (retryCount === maxRetries) {
          throw new Error(`Failed to edit record after ${maxRetries} attempts`);
        }

        // Wait before retrying
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Change rows per page
   */
  async setRowsPerPage(count: string): Promise<void> {
    try {
      await this.rowsPerPageSelector.selectOption(count);
      // Wait for table to update
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log("Error setting rows per page:", error);
    }
  }
}
