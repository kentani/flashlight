const { defineConfig, devices } = require('@playwright/test')
const port = process.env.PLAYWRIGHT_PORT || '3001'

module.exports = defineConfig({
  testDir: './test/e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}/flashlight/`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: `NUXT_GENERATE_DIR=dist yarn generate --fail-on-error && yarn start --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}/`,
    timeout: 120000,
    reuseExistingServer: false
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
