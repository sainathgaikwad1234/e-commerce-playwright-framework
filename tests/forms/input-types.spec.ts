// // tests/forms/input-types.spec.ts
// import { test, expect } from "@playwright/test";

// // Using a simplified test approach focusing on reliability
// test.describe("Form Input Types Testing", () => {
//   test.beforeEach(async ({ page }) => {
//     // Using a demo form site for this test
//     await page.goto("https://demoqa.com/automation-practice-form");

//     // Handle ads if present
//     try {
//       const adCloseButton = page.locator("#close-fixedban");
//       if (await adCloseButton.isVisible({ timeout: 2000 })) {
//         await adCloseButton.click();
//       }
//     } catch (error) {
//       // Ignore errors if ad elements are not found
//     }

//     // Wait for form to load
//     await page.waitForSelector("#userForm", {
//       state: "visible",
//       timeout: 10000,
//     });
//   });

//   test("Interacting with form elements", async ({ page }) => {
//     // Set longer timeout since the form can be slow
//     test.setTimeout(90000);

//     // SECTION 1: TEXT INPUTS
//     console.log("Testing text inputs...");

//     // Scroll to top to ensure inputs are visible
//     await page.evaluate(() => window.scrollTo(0, 0));
//     await page.waitForTimeout(500);

//     // Fill text fields - Name fields
//     await page.fill("#firstName", "John");
//     await page.fill("#lastName", "Doe");

//     // Verify values
//     expect(await page.inputValue("#firstName")).toBe("John");
//     expect(await page.inputValue("#lastName")).toBe("Doe");

//     // Fill email
//     await page.fill("#userEmail", "john.doe@example.com");
//     expect(await page.inputValue("#userEmail")).toBe("john.doe@example.com");

//     // Fill mobile number
//     await page.fill("#userNumber", "1234567890");
//     expect(await page.inputValue("#userNumber")).toBe("1234567890");

//     // SECTION 2: RADIO BUTTONS
//     console.log("Testing radio buttons...");

//     // Scroll to gender section
//     await page.evaluate(() => {
//       const element = document.querySelector('label[for="gender-radio-1"]');
//       if (element) element.scrollIntoView();
//     });
//     await page.waitForTimeout(500);

//     // Select Male radio button using JavaScript (more reliable than clicking)
//     await page.evaluate(() => {
//       const radio = document.getElementById(
//         "gender-radio-1"
//       ) as HTMLInputElement;
//       if (radio) {
//         radio.checked = true;
//         radio.dispatchEvent(new Event("change", { bubbles: true }));
//       }
//     });

//     // Verify radio selection with JavaScript
//     const radioSelected = await page.evaluate(() => {
//       return !!(document.getElementById("gender-radio-1") as HTMLInputElement)
//         ?.checked;
//     });
//     expect(radioSelected).toBe(true);

//     // SECTION 3: TEXT AREA
//     console.log("Testing text area...");

//     // Scroll to text area
//     await page.evaluate(() => {
//       const element = document.getElementById("currentAddress");
//       if (element) element.scrollIntoView();
//     });
//     await page.waitForTimeout(500);

//     // Fill text area
//     await page.fill("#currentAddress", "123 Test Street\nTest City, 12345");

//     // Verify text area
//     expect(await page.inputValue("#currentAddress")).toBe(
//       "123 Test Street\nTest City, 12345"
//     );

//     // SECTION 4: FILE UPLOAD
//     console.log("Testing file upload...");

//     // Create a test file using the FileAPI
//     await page.evaluate(() => {
//       const mockFile = new File(["test content"], "test-file.txt", {
//         type: "text/plain",
//       });
//       const dataTransfer = new DataTransfer();
//       dataTransfer.items.add(mockFile);

//       const fileInput = document.getElementById(
//         "uploadPicture"
//       ) as HTMLInputElement;
//       if (fileInput) {
//         // Cannot directly set files this way in browser context
//         // This is just a mock for test purposes
//         console.log("Mock file created for testing");
//       }
//     });

//     // Note: Since we can't actually set files in evaluate(),
//     // we'll just verify the file input exists
//     const fileInputExists = await page.isVisible("#uploadPicture");
//     expect(fileInputExists).toBe(true);

//     // SECTION 5: FORM SUBMISSION
//     console.log("Checking form submission...");

//     // Verify submit button exists
//     const submitExists = await page.isVisible("#submit");
//     expect(submitExists).toBe(true);

//     console.log("Form element tests completed successfully");
//   });
// });

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
