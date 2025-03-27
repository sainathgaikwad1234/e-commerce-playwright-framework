// import { defineConfig, devices } from "@playwright/test";

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // require('dotenv').config();

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// // export default defineConfig({
// //   use: {
// //     headless: false, // This makes all tests run in headed mode by default
// //     // Optional: slow down execution to see actions more clearly
// //     launchOptions: {
// //       slowMo: 500, // Slows down Playwright operations by 500ms
// //     },
// //     /* Base URL to use in actions like `await page.goto('/')`. */
// //     baseURL: "https://www.saucedemo.com",

// //     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
// //     trace: "on-first-retry",
// //   },
// //   testDir: "./tests",
// //   /* Run tests in files in parallel */
// //   fullyParallel: true,
// //   /* Fail the build on CI if you accidentally left test.only in the source code. */
// //   forbidOnly: !!process.env.CI,
// //   /* Retry on CI only */
// //   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
// //   // Removed duplicate 'use' property

// //   /* Configure projects for major browsers */
// //   projects: [
// //     {
// //       name: "chromium",
// //       use: { ...devices["Desktop Chrome"] },
// //     },

// //     {
// //       name: "firefox",
// //       use: { ...devices["Desktop Firefox"] },
// //     },

// //     {
// //       name: "webkit",
// //       use: { ...devices["Desktop Safari"] },
// //     },

// //     /* Test against mobile viewports. */
// //     {
// //       name: "mobile-chrome",
// //       use: { ...devices["Pixel 5"] },
// //     },
// //     {
// //       name: "mobile-safari",
// //       use: { ...devices["iPhone 13"] },
// //     },
// //   ],
// // });

// export default defineConfig({
//   testDir: "./tests",
//   timeout: 30000,

//   // Other config

//   projects: [
//     // SauceDemo tests
//     {
//       name: "saucedemo-chrome",
//       use: {
//         ...devices["Desktop Chrome"],
//         baseURL: "https://www.saucedemo.com",
//       },
//       testMatch: /.*sauce-demo.spec.ts/,
//     },

//     // The Internet tests
//     {
//       name: "internet-chrome",
//       use: {
//         ...devices["Desktop Chrome"],
//         baseURL: "https://the-internet.herokuapp.com",
//       },
//       testMatch: /.*internet.spec.ts/,
//     },

//     // DemoQA tests
//     {
//       name: "demoqa-chrome",
//       use: {
//         ...devices["Desktop Chrome"],
//         baseURL: "https://demoqa.com",
//       },
//       testMatch: /.*demoqa.spec.ts/,
//     },

//     // Generic tests that work across sites
//     {
//       name: "cross-site-chrome",
//       use: {
//         ...devices["Desktop Chrome"],
//       },
//       testMatch: /.*\.(test|spec)\.(js|ts)/,
//       testIgnore: /.*\.(sauce-demo|internet|demoqa)\.spec\.ts/,
//     },

//     // Add Firefox and WebKit variants
//   ],
// });

// pages/the-internet/file-download-page.ts

// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  /* Maximum time one test can run for */
  timeout: 30 * 1000,

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
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
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
        baseURL: "https://www.saucedemo.com",
      },
    },
  ],

  /* Run local dev server before tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  /* Global setup/teardown */
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),

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
    navigationTimeout: 30000,

    /* Default action timeout */
    actionTimeout: 15000,
  },
});
