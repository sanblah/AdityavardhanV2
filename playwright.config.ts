import { defineConfig, devices } from "@playwright/test";

const port = 3102;
const isProductionVerification = process.env.PLAYWRIGHT_PROD === "1";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: isProductionVerification
      ? `npm run start -- --port ${port}`
      : `npm run dev -- --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    {
      name: "mobile-safari-small",
      use: {
        ...devices["iPhone SE"],
        browserName: "chromium",
      },
    },
    {
      name: "mobile-chrome-modern",
      use: {
        ...devices["Pixel 7"],
        browserName: "chromium",
      },
    },
  ],
});
