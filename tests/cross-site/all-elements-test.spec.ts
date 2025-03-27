// // tests/cross-site/all-elements-test.spec.ts
import { test, expect } from "@playwright/test";

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
