/**
 * Jest Configuration for Arcanea
 * Comprehensive testing setup for JavaScript components
 */

module.exports = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // Coverage configuration
  collectCoverageFrom: [
    '*.js',
    '!jest.config.js',
    '!playwright.config.js',
    '!tailwind.config.js',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/dist/**',
    '!**/build/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html', 'json'],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 70,
      branches: 70,
      statements: 80
    }
  },
  
  // Module mapping for imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Test match patterns
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.js',
    '<rootDir>/tests/integration/**/*.test.js',
    '<rootDir>/tests/**/*.spec.js'
  ],
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  
  // Transform configuration
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/.arcanea/',
    '/apps/',
    '/starlight-intelligence-system/'
  ],
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true,
  
  // Fail tests on console errors/warnings in CI
  errorOnDeprecated: true,
  
  // Timeout configuration
  testTimeout: 10000,
  
  // Coverage path ignore patterns
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/dist/',
    '/build/'
  ],
  
  // Reporters
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' > ',
        usePathForSuiteName: true
      }
    ]
  ]
};
