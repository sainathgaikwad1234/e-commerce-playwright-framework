// pages/the-internet/drag-drop-page.ts
import { Page, Locator } from "@playwright/test";
import { InternetBasePage } from "./internet-base-page";

export class DragDropPage extends InternetBasePage {
  readonly columnA: Locator;
  readonly columnB: Locator;

  constructor(page: Page) {
    super(page);
    this.columnA = page.locator("#column-a");
    this.columnB = page.locator("#column-b");
  }

  /**
   * Navigate to drag and drop page
   */
  async goto(): Promise<void> {
    await this.navigate("/drag_and_drop");
    await this.verifyPageHeader("Drag and Drop");
  }

  /**
   * Drag column A to column B
   */
  async dragAToB(): Promise<void> {
    try {
      // First try using dragTo API
      await this.columnA.dragTo(this.columnB);
      // Add a small wait for the drag operation to complete
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log("dragTo method failed, trying manual drag and drop");
      await this.manualDragDrop();
    }
  }

  /**
   * Manual drag and drop implementation as fallback
   */
  private async manualDragDrop(): Promise<void> {
    const sourceBox = await this.columnA.boundingBox();
    const targetBox = await this.columnB.boundingBox();

    if (!sourceBox || !targetBox) {
      throw new Error("Unable to get bounding boxes for drag and drop");
    }

    // Calculate source and target centers
    const sourceX = sourceBox.x + sourceBox.width / 2;
    const sourceY = sourceBox.y + sourceBox.height / 2;
    const targetX = targetBox.x + targetBox.width / 2;
    const targetY = targetBox.y + targetBox.height / 2;

    // Perform drag and drop
    await this.page.mouse.move(sourceX, sourceY);
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, targetY, { steps: 10 }); // Move in steps for smoother drag
    await this.page.mouse.up();

    // Wait a moment for the DOM to update
    await this.page.waitForTimeout(500);
  }

  /**
   * Get text from column A
   */
  async getColumnAText(): Promise<string> {
    return await this.getText(this.columnA);
  }

  /**
   * Get text from column B
   */
  async getColumnBText(): Promise<string> {
    return await this.getText(this.columnB);
  }

  /**
   * Verify columns were swapped
   * @param initialAText Original text of column A
   * @param initialBText Original text of column B
   * @returns Boolean indicating if swap occurred
   */
  async verifyColumnsSwapped(
    initialAText: string,
    initialBText: string
  ): Promise<boolean> {
    const currentAText = await this.getColumnAText();
    const currentBText = await this.getColumnBText();

    return currentAText === initialBText && currentBText === initialAText;
  }
}
