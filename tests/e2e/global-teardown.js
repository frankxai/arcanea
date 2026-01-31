/**
 * Global Teardown for Playwright E2E Tests
 * Runs once after all test suites complete
 */

async function globalTeardown() {
  console.log('🧹 Global Teardown: Cleaning up...');
  
  // Close global browser if it was created
  if (global.__BROWSER_GLOBAL__) {
    await global.__BROWSER_GLOBAL__.close();
  }
  
  // Any cleanup operations can go here
  // For example:
  // - Clean up test data
  // - Remove temporary files
  // - Reset databases
  
  console.log('✅ Global Teardown complete');
}

module.exports = globalTeardown;
