/**
 * Verification script for testing infrastructure
 * Run this to verify all test files are properly configured
 */

const fs = require('fs');
const path = require('path');

const files = [
  'jest.config.js',
  'playwright.config.js',
  'pytest.ini',
  '.github/workflows/test.yml',
  'tests/setup.js',
  'tests/unit/storage.test.js',
  'tests/unit/cli.test.js',
  'tests/integration/mcp_test.py',
  'tests/integration/knowledge_test.py',
  'tests/e2e/games.spec.js',
  'tests/e2e/business.spec.js',
  'tests/e2e/global-setup.js',
  'tests/e2e/global-teardown.js',
  'requirements.txt',
  'codecov.yml',
  'tests/README.md'
];

console.log('🔍 Verifying Arcanea Testing Infrastructure\n');

let allFound = true;

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${file} (${size} KB)`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFound = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allFound) {
  console.log('\n✅ All test infrastructure files are present!');
  console.log('\nNext steps:');
  console.log('1. Run: npm install (to install test dependencies)');
  console.log('2. Run: npm test (to run unit tests)');
  console.log('3. Run: npx playwright install (to install browsers)');
  console.log('4. Run: npm run test:e2e (to run E2E tests)');
  console.log('5. Run: pytest tests/integration/ (to run Python tests)');
  process.exit(0);
} else {
  console.log('\n❌ Some files are missing. Please check the errors above.');
  process.exit(1);
}
