// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  /* Maximum time one test can run for */
  timeout: 60 * 1000, // Increased timeout to 60 seconds for more stability

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: [["html"], ["list"]],

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // Firefox-specific settings for compatibility
        launchOptions: {
          firefoxUserPrefs: {
            // Disable Firefox-specific features that can cause issues
            "dom.file.createInChild": true,
            "dom.timeout.background_throttling_max_budget": -1,
            // Add more Firefox preferences as needed
          },
        },
      },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },

    /* Test against branded browsers */
    {
      name: "Microsoft Edge",
      use: {
        channel: "msedge",
        // Edge-specific settings
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
    },
  ],

  /* Configure timeouts, navigation, and other options */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: "https://www.saucedemo.com",

    /* Collect trace when retrying the failed test */
    trace: "on-first-retry",

    /* Capture screenshot after each test failure */
    screenshot: "only-on-failure",

    /* Record video for failing tests */
    video: "on-first-retry",

    /* Configure viewport size */
    viewport: { width: 1280, height: 720 },

    /* Default navigation timeout */
    navigationTimeout: 45000,

    /* Default action timeout */
    actionTimeout: 30000,

    /* Default to headless, can be overridden with --headed flag */
    headless: true,
  },
});
