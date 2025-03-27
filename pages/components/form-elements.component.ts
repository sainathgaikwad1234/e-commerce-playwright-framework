// pages/components/form-elements.component.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base-page";

export class FormElementsComponent extends BasePage {
  readonly form: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly cancelButton: Locator;
  readonly requiredFields: Locator;
  readonly errorMessages: Locator;
  readonly formGroups: Locator;

  constructor(page: Page, formSelector: string) {
    super(page);
    this.form = page.locator(formSelector);
    this.submitButton = this.form.locator(
      'button[type="submit"], input[type="submit"]'
    );
    this.resetButton = this.form.locator(
      'button[type="reset"], input[type="reset"]'
    );
    this.cancelButton = this.form.locator(
      'button[type="button"]:has-text("Cancel")'
    );
    this.requiredFields = this.form.locator(
      "[required], .required, .mandatory"
    );
    this.errorMessages = this.form.locator(
      '.error, .invalid-feedback, [role="alert"]'
    );
    this.formGroups = this.form.locator(".form-group, .field");
  }

  /**
   * Fill input field
   */
  async fillField(fieldName: string, value: string): Promise<void> {
    const field = this.form.locator(
      `[name="${fieldName}"], #${fieldName}, [data-test="${fieldName}"]`
    );
    await field.fill(value);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(fieldName: string, value: string): Promise<void> {
    const dropdown = this.form.locator(
      `[name="${fieldName}"], #${fieldName}, [data-test="${fieldName}"]`
    );
    await dropdown.selectOption(value);
  }

  /**
   * Check or uncheck a checkbox
   */
  async setCheckbox(fieldName: string, checked: boolean): Promise<void> {
    const checkbox = this.form.locator(
      `[name="${fieldName}"], #${fieldName}, [data-test="${fieldName}"]`
    );

    if ((await checkbox.isChecked()) !== checked) {
      await checkbox.click();
    }
  }

  /**
   * Select a radio button
   */
  async selectRadio(groupName: string, value: string): Promise<void> {
    await this.form
      .locator(
        `input[type="radio"][name="${groupName}"][value="${value}"], #${value}`
      )
      .check();
  }

  /**
   * Submit the form
   */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Reset the form
   */
  async reset(): Promise<void> {
    if (await this.resetButton.isVisible()) {
      await this.resetButton.click();
    }
  }

  /**
   * Cancel form
   */
  async cancel(): Promise<void> {
    if (await this.cancelButton.isVisible()) {
      await this.cancelButton.click();
    }
  }

  /**
   * Get all error messages
   */
  async getErrorMessages(): Promise<string[]> {
    const messages: string[] = [];
    const errorElements = await this.errorMessages.all();

    for (const error of errorElements) {
      const text = await error.textContent();
      if (text) messages.push(text.trim());
    }

    return messages;
  }

  /**
   * Check if field has error
   */
  async hasFieldError(fieldName: string): Promise<boolean> {
    const fieldGroup = this.form
      .locator(`[name="${fieldName}"]`)
      .first()
      .locator(
        'xpath=ancestor::div[contains(@class, "form-group") or contains(@class, "field")]'
      );

    if ((await fieldGroup.count()) > 0) {
      return await fieldGroup
        .locator('.error, .invalid-feedback, [role="alert"]')
        .isVisible();
    }

    return false;
  }

  /**
   * Get field error message
   */
  async getFieldErrorMessage(fieldName: string): Promise<string> {
    const fieldGroup = this.form
      .locator(`[name="${fieldName}"]`)
      .first()
      .locator(
        'xpath=ancestor::div[contains(@class, "form-group") or contains(@class, "field")]'
      );

    if ((await fieldGroup.count()) > 0) {
      const errorElement = fieldGroup.locator(
        '.error, .invalid-feedback, [role="alert"]'
      );
      if (await errorElement.isVisible()) {
        return (await errorElement.textContent()) || "";
      }
    }

    return "";
  }

  /**
   * Get all required field names
   */
  async getRequiredFieldNames(): Promise<string[]> {
    const names: string[] = [];
    const requiredElements = await this.requiredFields.all();

    for (const element of requiredElements) {
      const name = await element.getAttribute("name");
      if (name) names.push(name);
    }

    return names;
  }
}
