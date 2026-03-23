---
name: Testing Patterns
description: TDD workflow and testing strategies
---

# Testing Patterns Skill

## Purpose
Testing strategies and TDD workflow for Arcanea projects.

## TDD Cycle
```
RED    → Write a failing test
GREEN  → Write minimum code to pass
REFACTOR → Clean up, keeping tests green
```

## Test Types
1. **Unit Tests** (Jest/node:test) — Pure functions, utilities
2. **Component Tests** (Testing Library) — React component behavior
3. **Integration Tests** — API routes, database queries
4. **E2E Tests** (Playwright) — Full user workflows

## Naming Convention
```
describe('ComponentName', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange → Act → Assert
  });
});
```

## Playwright E2E Pattern
```typescript
test('creator can navigate through Gates', async ({ page }) => {
  await page.goto('/academy');
  await page.click('[data-testid="gate-foundation"]');
  await expect(page.locator('h1')).toContainText('Foundation');
});
```

## What to Test
- User-visible behavior (not implementation details)
- Error states and edge cases
- Accessibility (keyboard navigation, screen readers)
- Critical business logic (ARC calculations, permissions)

## What NOT to Test
- Third-party library internals
- Styling (unless functional)
- Implementation details that may change