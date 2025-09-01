import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./global-setup.ts",
  timeout: 60000,
  testDir: "./tests/e2e",
  testMatch: ["**/*.spec.ts"],
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    storageState: "./state/loginAuth.json",
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        baseURL: "https://office.com",
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
