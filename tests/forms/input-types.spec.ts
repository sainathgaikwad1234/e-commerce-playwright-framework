// tests/forms/input-types.spec.ts
import { test, expect } from "@playwright/test";

// Use a static HTML form that we control entirely
test.describe("Form Input Types Testing", () => {
  test("Interacting with form elements", async ({ page }) => {
    // Create a local HTML form directly in the page
    await page.setContent(`
      <html>
        <body>
          <form id="testForm">
            <div>
              <label for="name">Name:</label>
              <input type="text" id="name" name="name">
            </div>
            <div>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email">
            </div>
            <div>
              <label for="message">Message:</label>
              <textarea id="message" name="message"></textarea>
            </div>
            <div>
              <label>Gender:</label>
              <input type="radio" id="radio1" name="gender" value="male">
              <label for="radio1">Male</label>
              <input type="radio" id="radio2" name="gender" value="female">
              <label for="radio2">Female</label>
            </div>
            <div>
              <label>Interests:</label>
              <input type="checkbox" id="checkbox1" name="interests" value="sports">
              <label for="checkbox1">Sports</label>
              <input type="checkbox" id="checkbox2" name="interests" value="music">
              <label for="checkbox2">Music</label>
              <input type="checkbox" id="checkbox3" name="interests" value="reading">
              <label for="checkbox3">Reading</label>
            </div>
            <div>
              <label for="dropdown">Country:</label>
              <select id="dropdown" name="country">
                <option value="">Select</option>
                <option value="1">USA</option>
                <option value="2">Canada</option>
                <option value="3">UK</option>
              </select>
            </div>
            <button type="submit" id="submitBtn">Submit</button>
          </form>
        </body>
      </html>
    `);

    // Test text input
    await page.fill("#name", "John Doe");
    expect(await page.inputValue("#name")).toBe("John Doe");

    // Test email input
    await page.fill("#email", "john.doe@example.com");
    expect(await page.inputValue("#email")).toBe("john.doe@example.com");

    // Test text area
    await page.fill("#message", "This is a test message\nWith multiple lines");
    expect(await page.inputValue("#message")).toBe(
      "This is a test message\nWith multiple lines"
    );

    // Test radio buttons
    await page.check("#radio2");
    expect(await page.isChecked("#radio2")).toBeTruthy();

    // Test checkboxes
    await page.check("#checkbox1");
    await page.check("#checkbox3");
    expect(await page.isChecked("#checkbox1")).toBeTruthy();
    expect(await page.isChecked("#checkbox3")).toBeTruthy();

    // Test dropdown
    await page.selectOption("#dropdown", "2");
    expect(await page.inputValue("#dropdown")).toBe("2");

    // Test form submission - just verify button exists
    expect(await page.isVisible("#submitBtn")).toBeTruthy();
  });
});
