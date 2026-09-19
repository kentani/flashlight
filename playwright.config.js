const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './test/e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3001/flashlight/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'NUXT_GENERATE_DIR=dist yarn generate --fail-on-error && yarn start --port 3001',
    url: 'http://127.0.0.1:3001/flashlight/',
    timeout: 120000,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], browserName: 'chromium' }
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['iPhone 13'], browserName: 'chromium' }
    }
  ],
  workers: 1
})
