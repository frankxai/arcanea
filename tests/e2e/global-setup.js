/**
 * Global Setup for Playwright E2E Tests
 * Runs once before all test suites
 */

const { chromium } = require('@playwright/test');

async function globalSetup() {
  console.log('🔧 Global Setup: Initializing test environment...');
  
  // Create browser for global operations if needed
  const browser = await chromium.launch();
  
  // Any global setup operations can go here
  // For example:
  // - Create test users
  // - Seed database
  // - Set up test data files
  
  console.log('✅ Global Setup complete');
  
  // Store browser reference if needed across tests
  global.__BROWSER_GLOBAL__ = browser;
}

module.exports = globalSetup;
