// // tests/cross-site/all-elements-test.spec.ts
import { test, expect } from "@playwright/test";
// import { DragDropPage } from "../../pages/the-internet/drag-drop-page";

// test("Drag and drop @internet", async ({ page }) => {
//   const dragDropPage = new DragDropPage(page);

//   // Navigate to the page
//   await dragDropPage.goto();

//   // Get initial column texts
//   const initialAText = await dragDropPage.getColumnAText();
//   const initialBText = await dragDropPage.getColumnBText();

//   // Perform drag and drop
//   await dragDropPage.dragAToB();

//   // Verify columns were swapped
//   expect(await dragDropPage.getColumnAText()).toBe(initialBText);
//   expect(await dragDropPage.getColumnBText()).toBe(initialAText);
// });

// In the test.describe block:
test("Drag and drop @internet @mouse", async ({ page, browserName }) => {
  // Skip for WebKit browsers
  if (
    browserName === "webkit" ||
    browserName.includes("Safari") ||
    browserName.includes("Mobile Safari")
  ) {
    console.log(`Skipping drag and drop test in browser: ${browserName}`);
    test.skip();
    return;
  }

  // Rest of the existing test code remains the same
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  // ...
});
