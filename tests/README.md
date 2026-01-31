# Arcanea Testing Infrastructure

Comprehensive testing setup for the Arcanea ecosystem covering JavaScript unit tests, Python integration tests, and end-to-end browser testing.

## Test Structure

```
tests/
├── setup.js                    # Jest setup and mocks
├── unit/
│   ├── storage.test.js        # Unit tests for storage system
│   └── cli.test.js            # Unit tests for CLI
├── integration/
│   ├── mcp_test.py            # MCP client integration tests
│   └── knowledge_test.py      # Knowledge base integration tests
└── e2e/
    ├── games.spec.js          # E2E tests for Games System
    ├── business.spec.js       # E2E tests for Business OS
    ├── global-setup.js        # Playwright global setup
    └── global-teardown.js     # Playwright global teardown
```

## Configuration Files

- `jest.config.js` - Jest unit testing configuration
- `playwright.config.js` - Playwright E2E testing configuration
- `pytest.ini` - Pytest integration testing configuration
- `.github/workflows/test.yml` - CI/CD pipeline
- `requirements.txt` - Python test dependencies

## Running Tests

### Unit Tests (JavaScript)
```bash
# Run all unit tests
npm test

# Run with watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npx jest tests/unit/storage.test.js
```

### Integration Tests (Python)
```bash
# Run all integration tests
pytest tests/integration/

# Run with coverage
pytest tests/integration/ --cov=. --cov-report=html

# Run specific test file
pytest tests/integration/mcp_test.py -v

# Run specific marker
pytest -m "mcp" -v
```

### E2E Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (for debugging)
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/e2e/games.spec.js
```

### Run All Tests
```bash
npm run test:all
```

## Test Categories

### Unit Tests
Fast, isolated tests for individual functions and modules:
- Storage operations (save/load/export/import)
- CLI command handling
- Utility functions

### Integration Tests
Tests for system integrations:
- MCP client connection and tool invocation
- Knowledge base storage and semantic search
- Circuit breaker and retry logic
- Pattern extraction and knowledge sharing

### E2E Tests
Full browser automation tests:
- Games System: XP earning, level progression, skill unlocks
- Business OS: Time tracking, revenue, clients, invoices
- Cross-system data persistence

## CI/CD Pipeline

Tests run automatically on:
- Push to main/master/develop branches
- Pull requests to main/master/develop

Jobs include:
1. JavaScript Unit Tests (Node 18.x, 20.x)
2. Python Integration Tests (Python 3.9-3.12)
3. E2E Tests (Playwright)
4. Code Quality (ESLint, Prettier, flake8, black)
5. Security Scan (npm audit, Trivy)
6. Build Verification

## Coverage

Coverage reports generated for:
- JavaScript: `coverage/` directory
- Python: `coverage/python/` directory
- E2E: `test-results/` directory

Upload to Codecov on successful CI runs.

## Test Best Practices

1. **AAA Pattern**: Arrange, Act, Assert
2. **Descriptive Names**: Test names should describe the behavior
3. **One Assertion**: Ideally one assertion per test
4. **Mock External Dependencies**: Don't call real services
5. **Clean Up**: Use beforeEach/afterEach for setup/teardown
6. **Test Isolation**: Tests should not depend on each other

## Markers (Python)

- `@pytest.mark.unit` - Unit tests
- `@pytest.mark.integration` - Integration tests
- `@pytest.mark.e2e` - E2E tests
- `@pytest.mark.slow` - Slow tests (>5 seconds)
- `@pytest.mark.mcp` - MCP client tests
- `@pytest.mark.knowledge` - Knowledge base tests
- `@pytest.mark.smoke` - Smoke tests
- `@pytest.mark.critical` - Critical path tests

## Continuous Integration

The GitHub Actions workflow:
1. Runs on every push and PR
2. Tests on multiple Node.js and Python versions
3. Generates coverage reports
4. Uploads artifacts on failure
5. Comments test results on PRs

## Maintenance

- Update tests when features change
- Add tests for new features
- Review and update test data regularly
- Monitor test execution time
- Keep test dependencies updated
