// pages/components/table.component.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base-page";

export class TableComponent extends BasePage {
  readonly table: Locator;
  readonly headers: Locator;
  readonly rows: Locator;
  readonly cells: Locator;
  readonly paginationNext: Locator;
  readonly paginationPrevious: Locator;
  readonly searchInput: Locator;
  readonly rowsPerPageSelector: Locator;

  constructor(page: Page, tableSelector: string) {
    super(page);
    this.table = page.locator(tableSelector);
    this.headers = this.table.locator("thead th");
    this.rows = this.table.locator("tbody tr");
    this.cells = this.table.locator("tbody td");
    this.paginationNext = page.locator(
      'button[aria-label="Next page"], .pagination-next'
    );
    this.paginationPrevious = page.locator(
      'button[aria-label="Previous page"], .pagination-previous'
    );
    this.searchInput = page.locator('input[type="search"]');
    this.rowsPerPageSelector = page.locator('select[name="pagination-limit"]');
  }

  /**
   * Get all table data
   */
  async getAllData(): Promise<string[][]> {
    const rowElements = await this.rows.all();
    const tableData: string[][] = [];

    for (const row of rowElements) {
      const cellElements = await row.locator("td").all();
      const rowData: string[] = [];

      for (const cell of cellElements) {
        rowData.push((await cell.textContent()) || "");
      }

      tableData.push(rowData);
    }

    return tableData;
  }

  /**
   * Get header values
   */
  async getHeaderValues(): Promise<string[]> {
    const headerElements = await this.headers.all();
    const headerValues: string[] = [];

    for (const header of headerElements) {
      headerValues.push((await header.textContent()) || "");
    }

    return headerValues;
  }

  /**
   * Get row count
   */
  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  /**
   * Click on a header to sort (if sortable)
   */
  async clickHeader(columnIndex: number): Promise<void> {
    const headers = await this.headers.all();
    if (columnIndex < headers.length) {
      await headers[columnIndex].click();
    }
  }

  /**
   * Get cell value
   */
  async getCellValue(rowIndex: number, columnIndex: number): Promise<string> {
    return (
      (await this.table
        .locator(
          `tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`
        )
        .textContent()) || ""
    );
  }

  /**
   * Go to next page
   */
  async goToNextPage(): Promise<void> {
    if (await this.paginationNext.isEnabled()) {
      await this.paginationNext.click();
    }
  }

  /**
   * Go to previous page
   */
  async goToPreviousPage(): Promise<void> {
    if (await this.paginationPrevious.isEnabled()) {
      await this.paginationPrevious.click();
    }
  }

  /**
   * Search table
   */
  async search(text: string): Promise<void> {
    if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(text);
      await this.page.waitForTimeout(500); // Allow table to update
    }
  }

  /**
   * Set rows per page
   */
  async setRowsPerPage(value: string): Promise<void> {
    if (await this.rowsPerPageSelector.isVisible()) {
      await this.rowsPerPageSelector.selectOption(value);
      await this.page.waitForTimeout(500); // Allow table to update
    }
  }
}
