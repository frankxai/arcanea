/**
 * Playwright Configuration for Arcanea E2E Tests
 * End-to-end testing configuration for all Arcanea applications
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory
  testDir: './tests/e2e',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'reports/playwright-results.xml' }]
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',
    
    // Collect trace when retrying failed tests
    trace: 'on-first-retry',
    
    // Capture screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video on failure
    video: 'on-first-retry',
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Action timeout
    actionTimeout: 15000,
    
    // Navigation timeout
    navigationTimeout: 30000,
    
    // Test id attribute
    testIdAttribute: 'data-testid'
  },
  
  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    
    // Mobile devices
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    },
    
    // Tablet devices
    {
      name: 'Tablet Chrome',
      use: { ...devices['iPad (gen 7)'] }
    },
    {
      name: 'Tablet Safari',
      use: { ...devices['iPad Mini'] }
    }
  ],
  
  // Run local dev server before starting tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  
  // Expect configuration
  expect: {
    // Maximum time expect() should wait for the condition to be met
    timeout: 5000
  },
  
  // Global setup and teardown
  globalSetup: require.resolve('./tests/e2e/global-setup.js'),
  globalTeardown: require.resolve('./tests/e2e/global-teardown.js')
});
