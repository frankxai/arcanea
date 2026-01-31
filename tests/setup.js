/**
 * Jest Test Setup
 * Global setup and utilities for all Jest tests
 */

// Mock localStorage
global.localStorage = {
  store: {},
  getItem: function(key) {
    return this.store[key] || null;
  },
  setItem: function(key, value) {
    this.store[key] = String(value);
  },
  removeItem: function(key) {
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  },
  key: function(index) {
    return Object.keys(this.store)[index] || null;
  },
  get length() {
    return Object.keys(this.store).length;
  }
};

// Mock sessionStorage
global.sessionStorage = {
  store: {},
  getItem: function(key) {
    return this.store[key] || null;
  },
  setItem: function(key, value) {
    this.store[key] = String(value);
  },
  removeItem: function(key) {
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  },
  key: function(index) {
    return Object.keys(this.store)[index] || null;
  },
  get length() {
    return Object.keys(this.store).length;
  }
};

// Mock URL and Blob
global.URL = {
  createObjectURL: jest.fn(() => 'blob:mock-url'),
  revokeObjectURL: jest.fn()
};

global.Blob = class Blob {
  constructor(parts, options) {
    this.parts = parts;
    this.options = options;
    this.size = parts ? parts.join('').length : 0;
  }
};

// Mock FileReader
global.FileReader = class FileReader {
  readAsText(file) {
    this.result = JSON.stringify({ systems: { games: {}, business: {}, gamedev: {} } });
    setTimeout(() => {
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
};

// Mock document and window events
global.document = {
  createElement: jest.fn((tag) => ({
    tagName: tag,
    setAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    click: jest.fn(),
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(() => false),
      toggle: jest.fn()
    }
  })),
  body: {
    appendChild: jest.fn(),
    removeChild: jest.fn()
  },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
};

global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  location: { href: '' },
  localStorage: global.localStorage,
  sessionStorage: global.sessionStorage
};

// Mock console methods to reduce noise during tests
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Mock confirm and alert
global.confirm = jest.fn(() => true);
global.alert = jest.fn();

// Mock fetch
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
  // Clear localStorage
  global.localStorage.clear();
  
  // Clear all mocks
  jest.clearAllMocks();
  
  // Reset console mocks
  global.console.log.mockClear();
  global.console.error.mockClear();
  global.console.warn.mockClear();
  global.console.info.mockClear();
});

// Custom matchers
expect.extend({
  toBeValidJSON(received) {
    let pass = false;
    let message = '';
    
    try {
      JSON.parse(received);
      pass = true;
      message = `expected ${received} not to be valid JSON`;
    } catch (e) {
      pass = false;
      message = `expected ${received} to be valid JSON, but got error: ${e.message}`;
    }
    
    return { pass, message };
  },
  
  toHaveLocalStorageItem(received, key) {
    const pass = global.localStorage.getItem(key) !== null;
    return {
      pass,
      message: () => pass
        ? `expected localStorage not to have item "${key}"`
        : `expected localStorage to have item "${key}"`
    };
  }
});
