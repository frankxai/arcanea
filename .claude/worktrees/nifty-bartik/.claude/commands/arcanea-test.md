# Arcanea Test Command

Run comprehensive tests across the Arcanea monorepo.

## Your Task

You are the **Test Automation Specialist** for Arcanea. Run tests, analyze failures, and ensure code quality.

## Test Strategy

### Phase 1: Quick Health Check (1 min)
```bash
# Type checking across all packages
pnpm turbo type-check

# Lint all apps and packages
pnpm turbo lint
```

### Phase 2: Unit Tests (2 min)
```bash
# Run all unit tests
pnpm turbo test

# Run tests with coverage
pnpm turbo test -- --coverage
```

### Phase 3: Integration Tests (3 min)
```bash
# Test database connections
pnpm turbo test:integration

# Test API routes
pnpm turbo test:api
```

### Phase 4: E2E Tests (5 min)
```bash
# Run Playwright tests
pnpm turbo test:e2e

# Run with UI mode for debugging
pnpm turbo test:e2e -- --ui
```

## Test Coverage Goals

- **Unit Tests**: > 80% coverage
- **Integration Tests**: All critical paths
- **E2E Tests**: Happy path + error scenarios

## Common Test Patterns

### Testing React Components
```typescript
import { render, screen } from '@testing-library/react';
import { LuminorAvatar } from '@arcanea/ui';

test('renders avatar with correct personality', () => {
  render(<LuminorAvatar personality="ATHENA" />);
  expect(screen.getByRole('img')).toHaveAttribute('alt', 'Athena');
});
```

### Testing API Routes
```typescript
import { POST } from './route';

test('creates creation successfully', async () => {
  const request = new Request('http://localhost:3000/api/creations', {
    method: 'POST',
    body: JSON.stringify({ title: 'Test Creation' })
  });

  const response = await POST(request);
  expect(response.status).toBe(201);
});
```

### Testing Supabase Integration
```typescript
import { createServerClient } from '@/lib/supabase/server';

test('fetches user profile', async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', 'user-id')
    .single();

  expect(error).toBeNull();
  expect(data).toHaveProperty('username');
});
```

## Failure Analysis

When tests fail:
1. **Read error message carefully**
2. **Check test file** for outdated expectations
3. **Run single test** to isolate issue
4. **Check recent changes** that might affect test
5. **Fix code or update test** as needed

## Test Report Format

```markdown
## Test Results

### Summary
- ✅ 234 tests passed
- ❌ 3 tests failed
- ⏭️ 5 tests skipped
- 📊 Coverage: 82%

### Failures

#### 1. Creation API endpoint returns 500
**File**: `apps/web/app/api/creations/route.test.ts:45`
**Error**: `TypeError: Cannot read property 'id' of undefined`
**Fix**: Add null check for user session

#### 2. LuminorAvatar renders wrong color
**File**: `packages/ui/components/LuminorAvatar.test.tsx:23`
**Error**: Expected gold-500, received gold-400
**Fix**: Update color palette in theme

### Coverage Report
- **Statements**: 82% (3240/3950)
- **Branches**: 78% (1240/1590)
- **Functions**: 85% (890/1047)
- **Lines**: 82% (3180/3877)

### Recommendations
1. Add tests for error handling in creation API
2. Increase coverage for Guardian AI module
3. Add E2E tests for onboarding flow
```

## Autonomy Level

- Run all tests autonomously
- Analyze failures and suggest fixes
- Update tests if changes are obvious
- Ask user for guidance on complex failures

---

Run tests early, run tests often. Quality is not an accident 🎯
