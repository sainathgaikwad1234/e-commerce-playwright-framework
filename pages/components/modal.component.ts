// pages/components/modal.component.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base-page";

export class ModalComponent extends BasePage {
  readonly modal: Locator;
  readonly header: Locator;
  readonly body: Locator;
  readonly footer: Locator;
  readonly closeButton: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page, modalSelector: string) {
    super(page);
    this.modal = page.locator(modalSelector);
    this.header = this.modal.locator(".modal-header, .modal-title, header");
    this.body = this.modal.locator(
      ".modal-body, .modal-content > div:not(.modal-header):not(.modal-footer), main"
    );
    this.footer = this.modal.locator(".modal-footer, footer");
    this.closeButton = this.modal.locator(
      'button.close, [aria-label="Close"], button:has-text("×")'
    );
    this.confirmButton = this.modal.locator(
      'button:has-text("OK"), button:has-text("Yes"), button:has-text("Confirm"), [data-test="confirm"]'
    );
    this.cancelButton = this.modal.locator(
      'button:has-text("Cancel"), button:has-text("No"), [data-test="cancel"]'
    );
  }

  /**
   * Wait for modal to be visible
   */
  async waitForModal(timeout = 5000): Promise<void> {
    await this.modal.waitFor({ state: "visible", timeout });
  }

  /**
   * Get modal title
   */
  async getTitle(): Promise<string> {
    return (await this.header.textContent()) || "";
  }

  /**
   * Get modal body text
   */
  async getBodyText(): Promise<string> {
    return (await this.body.textContent()) || "";
  }

  /**
   * Click close button
   */
  async close(): Promise<void> {
    await this.closeButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }

  /**
   * Click confirm button
   */
  async confirm(): Promise<void> {
    await this.confirmButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }

  /**
   * Click cancel button
   */
  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }

  /**
   * Check if modal is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.modal.isVisible();
  }

  /**
   * Fill modal form field (if modal contains a form)
   */
  async fillField(fieldName: string, value: string): Promise<void> {
    const field = this.modal.locator(`[name="${fieldName}"], #${fieldName}`);
    await field.fill(value);
  }
}
