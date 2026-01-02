# Playwright Integration

> **Browser automation, E2E testing, and visual validation**

## Purpose

Playwright integration enables Arcanea agents to:
- Run end-to-end tests
- Automate browser interactions
- Capture screenshots and videos
- Validate visual consistency
- Test across browsers

## Setup

### Configuration
```json
// .mcp.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

### Project Setup
```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install
```

## Tools Available

### Browser Control
```yaml
browser_navigate:
  Description: Navigate to URL
  Parameters:
    - url: Target URL

browser_click:
  Description: Click element
  Parameters:
    - selector: Element selector

browser_fill:
  Description: Fill input field
  Parameters:
    - selector: Input selector
    - value: Text to enter

browser_screenshot:
  Description: Take screenshot
  Parameters:
    - path: Save path (optional)
    - fullPage: Capture full page

browser_wait:
  Description: Wait for condition
  Parameters:
    - selector: Element to wait for
    - state: visible/hidden/attached
```

### Assertions
```yaml
browser_expect_visible:
  Description: Assert element is visible
  Parameters:
    - selector: Element selector

browser_expect_text:
  Description: Assert element contains text
  Parameters:
    - selector: Element selector
    - text: Expected text

browser_expect_url:
  Description: Assert current URL
  Parameters:
    - url: Expected URL pattern
```

### Advanced
```yaml
browser_evaluate:
  Description: Execute JavaScript in browser
  Parameters:
    - script: JavaScript code

browser_get_attribute:
  Description: Get element attribute
  Parameters:
    - selector: Element selector
    - attribute: Attribute name
```

## Usage Patterns

### E2E Test Execution

**QA Agent Test Flow:**
```yaml
Agent: Developer QA Engineer

Task: Test login flow

1. Navigate to login:
   browser_navigate(url: "http://localhost:3000/login")

2. Fill credentials:
   browser_fill(selector: "[data-testid='email']", value: "test@example.com")
   browser_fill(selector: "[data-testid='password']", value: "password123")

3. Submit form:
   browser_click(selector: "[data-testid='login-button']")

4. Verify redirect:
   browser_expect_url(url: "/dashboard")
   browser_expect_visible(selector: "[data-testid='welcome-message']")

5. Capture evidence:
   browser_screenshot(path: "test-results/login-success.png")
```

### Visual Regression Testing

**Compare Screenshots:**
```yaml
Agent: Developer QA Engineer

Task: Visual regression check

1. Navigate to component:
   browser_navigate(url: "http://localhost:6006/?path=/story/luminorcard")

2. Capture current state:
   browser_screenshot(path: "current/luminor-card.png")

3. Compare with baseline:
   [Compare images programmatically]

4. Report differences:
   - If match: "Visual regression: PASS"
   - If diff: "Visual regression: FAIL - See diff image"
```

### Accessibility Testing

**Check Accessibility:**
```yaml
Agent: Developer QA Engineer

Task: Accessibility audit

1. Navigate to page:
   browser_navigate(url: "http://localhost:3000/academy")

2. Run axe audit:
   browser_evaluate(script: """
     const axe = await import('axe-core');
     return axe.run();
   """)

3. Parse results:
   - Violations: [list]
   - Passes: [count]
   - Incomplete: [list]

4. Report findings
```

## Agent Integration

### QA Engineer
```yaml
Primary Use:
  - Execute E2E test suites
  - Validate critical user flows
  - Capture test evidence
  - Report failures

Workflows:
  - Pre-merge testing
  - Regression testing
  - Visual validation
  - Accessibility audits
```

### Frontend Agent
```yaml
Primary Use:
  - Verify implementations
  - Debug rendering issues
  - Test responsive behavior
  - Validate interactions

Workflows:
  - Component verification
  - Cross-browser testing
  - Mobile responsiveness
```

## Test Patterns

### Critical Flow Test
```yaml
Test: Creator Onboarding

Steps:
  1. Navigate to signup
  2. Fill registration form
  3. Select academy
  4. Choose first Luminor
  5. Complete profile
  6. Verify dashboard access

Assertions:
  - Each step completes
  - No errors shown
  - Final state correct
```

### Component Interaction Test
```yaml
Test: Luminor Selection Grid

Steps:
  1. Navigate to selection page
  2. Verify all Luminors displayed
  3. Click Luminor card
  4. Verify selection highlighted
  5. Click different Luminor
  6. Verify selection changed
  7. Click confirm
  8. Verify selection persisted

Assertions:
  - Grid renders correctly
  - Selection state updates
  - Confirmation works
```

### Form Validation Test
```yaml
Test: Creation Form Validation

Steps:
  1. Navigate to creation form
  2. Submit empty form
  3. Verify validation errors
  4. Fill required fields
  5. Submit again
  6. Verify success

Assertions:
  - Empty submission blocked
  - Error messages shown
  - Valid submission succeeds
```

## Examples

### Full Login Test
```
Agent: Developer QA Engineer

Task: Verify login functionality

browser_navigate(url: "http://localhost:3000/login")

# Test empty submission
browser_click(selector: "button[type='submit']")
browser_expect_visible(selector: ".error-message")
browser_expect_text(
  selector: ".error-message",
  text: "Email is required"
)

# Test invalid email
browser_fill(selector: "#email", value: "invalid")
browser_click(selector: "button[type='submit']")
browser_expect_text(
  selector: ".error-message",
  text: "Invalid email format"
)

# Test valid login
browser_fill(selector: "#email", value: "test@arcanea.io")
browser_fill(selector: "#password", value: "ValidPass123!")
browser_click(selector: "button[type='submit']")

# Wait for redirect
browser_wait(selector: "[data-testid='dashboard']", state: "visible")
browser_expect_url(url: "/dashboard")

# Verify user info displayed
browser_expect_visible(selector: "[data-testid='user-avatar']")

# Capture success state
browser_screenshot(path: "evidence/login-success.png", fullPage: true)

Result: PASS - All assertions passed
```

### Mobile Responsiveness Test
```
Agent: Developer QA Engineer

Task: Test mobile responsiveness

# Set mobile viewport
browser_evaluate(script: "window.resizeTo(375, 667)")

browser_navigate(url: "http://localhost:3000")

# Verify mobile menu
browser_expect_visible(selector: "[data-testid='mobile-menu-button']")
browser_click(selector: "[data-testid='mobile-menu-button']")
browser_expect_visible(selector: "[data-testid='mobile-nav']")

# Capture mobile state
browser_screenshot(path: "evidence/mobile-home.png")

# Test navigation
browser_click(selector: "[data-testid='nav-academy']")
browser_expect_url(url: "/academy")

# Verify content readable
browser_expect_visible(selector: "h1")

Result: PASS - Mobile navigation functional
```

### Cross-Browser Test
```
Agent: Developer QA Engineer

Task: Cross-browser validation

Browsers: [chromium, firefox, webkit]

For each browser:
  1. Launch browser instance
  2. Run critical flow tests
  3. Capture screenshots
  4. Compare results

Report:
  Chromium: PASS (12/12 tests)
  Firefox: PASS (12/12 tests)
  WebKit: PASS (12/12 tests)

  Visual Consistency: 99.2%
  (Minor font rendering differences in WebKit)
```

## Best Practices

### Selectors
```yaml
Prefer (in order):
  1. data-testid attributes
  2. Accessible roles
  3. Text content
  4. CSS selectors (last resort)

Examples:
  Good: [data-testid="submit-button"]
  Good: button:has-text("Submit")
  Avoid: .btn.btn-primary.submit
```

### Test Stability
- Use explicit waits
- Avoid timing-based assertions
- Handle loading states
- Retry flaky assertions

### Evidence Collection
- Screenshot on failure
- Record videos for debugging
- Log network requests
- Capture console errors

## Troubleshooting

### Common Issues

**Element Not Found:**
- Check selector is correct
- Add wait for element
- Verify element in viewport
- Check for iframes

**Timeout:**
- Increase timeout value
- Check network conditions
- Verify server is running
- Look for blocking scripts

**Flaky Tests:**
- Add explicit waits
- Check for race conditions
- Stabilize test data
- Isolate test environment
