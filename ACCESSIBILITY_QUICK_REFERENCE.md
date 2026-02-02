# Arcanea Accessibility Quick Reference
*For Developers Building Accessible Components*

---

## Quick Checklist

Before submitting any component PR, verify:

- [ ] All interactive elements have accessible names (button text, aria-label, or aria-labelledby)
- [ ] All images have descriptive alt text (or aria-hidden if decorative)
- [ ] Focus states are visible (using ring-atlantean-teal-aqua or ring-arcane-crystal)
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape)
- [ ] Color is not the only indicator of state
- [ ] Forms have proper labels associated with inputs
- [ ] Error messages use role="alert" or aria-live
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Icons are marked aria-hidden="true" if decorative
- [ ] Motion respects prefers-reduced-motion

---

## Common Patterns

### 1. Buttons

```tsx
// ✓ GOOD: Accessible button
<button
  onClick={handleClick}
  aria-label="Delete creation"
  className="p-2 focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua"
>
  <Trash className="w-5 h-5" aria-hidden="true" />
</button>

// ✗ BAD: No accessible name
<button onClick={handleClick}>
  <Trash className="w-5 h-5" />
</button>
```

**Rules**:
- Button text OR aria-label is required
- Icons should have aria-hidden="true"
- Must have visible focus indicator
- Must respond to Enter and Space keys (default for <button>)

---

### 2. Links

```tsx
// ✓ GOOD: Descriptive link
<Link href="/studio" aria-label="Enter Spatial Studio">
  <Button>
    <Sparkles className="w-5 h-5" aria-hidden="true" />
    <span>Studio</span>
  </Button>
</Link>

// ✗ BAD: Generic text
<Link href="/studio">
  <Button>Click here</Button>
</Link>
```

**Rules**:
- Link text must describe destination
- Avoid "click here" or "read more"
- External links should indicate they open in new window
- Focus states inherit from button styles

---

### 3. Forms

```tsx
// ✓ GOOD: Accessible form input
<div className="relative">
  <label htmlFor="user-email" className="sr-only">
    Email address
  </label>
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
  <input
    id="user-email"
    type="email"
    required
    aria-required="true"
    aria-describedby="email-error"
    className="w-full pl-10..."
  />
  {error && (
    <p id="email-error" role="alert" className="text-red-400">
      {error}
    </p>
  )}
</div>

// ✗ BAD: No label, no error association
<div className="relative">
  <input type="email" placeholder="Email" />
  {error && <p>{error}</p>}
</div>
```

**Rules**:
- Every input needs a <label> (can be visually hidden with sr-only)
- Use aria-describedby to associate error messages
- Required fields should have aria-required="true"
- Errors should have role="alert" or aria-live="assertive"

---

### 4. Images

```tsx
// ✓ GOOD: Descriptive alt text
<img
  src={creation.image}
  alt={`${creation.type} creation titled ${creation.title} from ${creation.academy} Academy`}
/>

// ✓ GOOD: Decorative image
<img
  src="/bg-pattern.png"
  alt=""
  role="presentation"
/>

// ✗ BAD: Generic alt text
<img src={creation.image} alt="Creation" />

// ✗ BAD: Missing alt
<img src={creation.image} />
```

**Rules**:
- Alt text should describe the content/function, not just name
- Decorative images get alt="" and role="presentation"
- Never omit alt attribute entirely
- Don't start with "image of" or "picture of"

---

### 5. Icons

```tsx
// ✓ GOOD: Decorative icon with button
<button aria-label="Close modal">
  <X className="w-5 h-5" aria-hidden="true" />
</button>

// ✓ GOOD: Icon with text
<div className="flex items-center gap-2">
  <Heart className="w-4 h-4" aria-hidden="true" />
  <span>42 likes</span>
</div>

// ✗ BAD: Icon only, no label
<button onClick={close}>
  <X className="w-5 h-5" />
</button>
```

**Rules**:
- Icons are always decorative: use aria-hidden="true"
- Icon-only buttons MUST have aria-label
- Icon + text combinations: hide icon, keep text

---

### 6. Loading States

```tsx
// ✓ GOOD: Announced loading
<button disabled={isLoading}>
  {isLoading && (
    <span className="sr-only" role="status" aria-live="polite">
      Loading...
    </span>
  )}
  {isLoading ? (
    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
  ) : (
    "Submit"
  )}
</button>

// ✗ BAD: Visual only
<button disabled={isLoading}>
  {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
</button>
```

**Rules**:
- Loading indicators need sr-only text with role="status"
- Use aria-live="polite" for non-critical updates
- Use aria-live="assertive" for critical alerts
- Disable interactions during loading

---

### 7. Modals/Dialogs

```tsx
// ✓ GOOD: Accessible modal (using Headless UI)
<Dialog open={isOpen} onClose={onClose}>
  <Dialog.Panel>
    <Dialog.Title>Welcome</Dialog.Title>
    <Dialog.Description>
      Sign in to continue
    </Dialog.Description>
    <button onClick={onClose} aria-label="Close dialog">
      <X aria-hidden="true" />
    </button>
    {/* Modal content */}
  </Dialog.Panel>
</Dialog>

// ✗ BAD: DIV-based modal
<div className={isOpen ? "block" : "hidden"}>
  <h3>Welcome</h3>
  <button onClick={onClose}>X</button>
</div>
```

**Rules**:
- Use Dialog component from Headless UI (handles ARIA automatically)
- Dialog.Title is required
- Close button needs aria-label
- Focus should trap inside modal
- Escape key should close

---

### 8. Navigation

```tsx
// ✓ GOOD: Semantic nav with ARIA
<nav aria-label="Main navigation">
  <ul role="list">
    <li><Link href="/studio">Studio</Link></li>
    <li><Link href="/library">Library</Link></li>
  </ul>
</nav>

// ✓ GOOD: Mobile menu
<button
  onClick={toggleMenu}
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  Menu
</button>
{isOpen && (
  <nav id="mobile-menu" aria-label="Mobile navigation">
    {/* Menu items */}
  </nav>
)}

// ✗ BAD: Generic div
<div className="nav">
  <a href="/studio">Studio</a>
</div>
```

**Rules**:
- Use <nav> element
- Add aria-label to distinguish multiple navs
- Menu buttons need aria-expanded and aria-controls
- Close button on mobile should be first in tab order

---

### 9. Status Messages

```tsx
// ✓ GOOD: Error announcement
{error && (
  <div
    role="alert"
    aria-live="assertive"
    className="bg-red-500/10 p-3 rounded"
  >
    {error}
  </div>
)}

// ✓ GOOD: Success message
{success && (
  <div
    role="status"
    aria-live="polite"
    className="bg-green-500/10 p-3 rounded"
  >
    {success}
  </div>
)}

// ✗ BAD: Visual only
{error && <div className="error">{error}</div>}
```

**Rules**:
- Errors: use role="alert" or aria-live="assertive"
- Success/info: use role="status" or aria-live="polite"
- Position in DOM doesn't matter (screen readers will announce)
- Keep messages concise

---

### 10. Color Contrast

```tsx
// ✓ GOOD: High contrast
<p className="text-arcane-200 bg-arcane-shadow">
  Text content
</p>

// ✗ BAD: Low contrast (fails WCAG AA)
<p className="text-arcane-300 bg-arcane-shadow">
  Text content
</p>
```

**Rules**:
- Text contrast: 4.5:1 minimum for normal text
- Large text (18px+): 3:1 minimum
- Test with tools like WebAIM Contrast Checker
- Use arcane-200 or lighter on dark backgrounds
- Don't rely on color alone to convey information

**Arcanea Safe Combinations**:
```tsx
// Dark backgrounds
bg-cosmic-deep or bg-arcane-shadow
  ✓ text-arcane-200 or lighter
  ✓ text-atlantean-teal-aqua
  ✗ text-arcane-300 or darker

// Light backgrounds
bg-white or bg-slate-50
  ✓ text-slate-900
  ✓ text-cosmic-deep
  ✗ text-arcane-200
```

---

## Focus States

All interactive elements MUST have visible focus indicators.

### Button Focus
```tsx
// Ecosystem app (Atlantean theme)
className="focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua focus-visible:ring-offset-2"

// Marketing site (Arcane theme)
className="focus-visible:ring-2 focus-visible:ring-arcane-crystal focus-visible:ring-offset-2"
```

### Custom Focus Styles
```tsx
// High contrast outline
className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-bright"

// Inset ring
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
```

---

## Keyboard Navigation

### Required Key Support

**Buttons**: Enter, Space
**Links**: Enter
**Menus**: Arrow keys, Escape, Tab
**Modals**: Escape to close, Tab trapped inside
**Forms**: Tab, Shift+Tab, Enter to submit

### Custom Keyboard Handlers

```tsx
// ✓ GOOD: Full keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom button
</div>

// ✗ BAD: Only onClick
<div onClick={handleClick}>
  Not keyboard accessible
</div>
```

---

## Testing Checklist

### Automated Tests
```bash
# Run Lighthouse
pnpm lighthouse --only-categories=accessibility

# Run axe-core
npx axe http://localhost:3000

# Type check
pnpm type-check
```

### Manual Tests

**Keyboard Navigation**:
1. Tab through all interactive elements
2. Verify focus indicators are visible
3. Test Enter/Space on buttons
4. Test Escape to close modals
5. Verify no keyboard traps

**Screen Reader** (VoiceOver/NVDA):
1. Navigate by headings (H key)
2. Navigate by landmarks (D key)
3. List all links (Links menu)
4. Verify form labels announced
5. Test error message announcements

**Visual**:
1. Zoom to 200% - verify layout doesn't break
2. Windows High Contrast Mode
3. Disable JavaScript - core content accessible
4. Test with reduced motion enabled

---

## Common Mistakes to Avoid

### 1. DIVs as Buttons
```tsx
// ✗ NEVER DO THIS
<div onClick={handleClick}>Click me</div>

// ✓ USE THIS
<button onClick={handleClick}>Click me</button>
```

### 2. Placeholder as Label
```tsx
// ✗ BAD
<input placeholder="Email" />

// ✓ GOOD
<label htmlFor="email">Email</label>
<input id="email" placeholder="you@example.com" />
```

### 3. Title Attribute for Important Info
```tsx
// ✗ BAD: Not accessible to keyboard/touch users
<button title="Delete">
  <Trash />
</button>

// ✓ GOOD
<button aria-label="Delete">
  <Trash aria-hidden="true" />
</button>
```

### 4. Skipping Heading Levels
```tsx
// ✗ BAD
<h1>Page Title</h1>
<h3>Section (skipped h2!)</h3>

// ✓ GOOD
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

### 5. Color-Only Indicators
```tsx
// ✗ BAD: Color only
<span className={isValid ? "text-green-500" : "text-red-500"}>
  {isValid ? "Valid" : "Invalid"}
</span>

// ✓ GOOD: Icon + color + text
<span className={isValid ? "text-green-500" : "text-red-500"}>
  {isValid ? "✓" : "✗"} {isValid ? "Valid" : "Invalid"}
</span>
```

---

## Utility Classes

### Screen Reader Only
```tsx
// Hidden visually, announced by screen readers
<span className="sr-only">Loading...</span>
```

Implementation:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## Resources

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluator
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Chrome DevTools
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG contrast ratio

### Documentation
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Style Guide](https://a11y-style-guide.com/)

### Headless UI Components (Already Accessible)
- Dialog/Modal
- Menu/Dropdown
- Listbox/Select
- Combobox/Autocomplete
- Switch/Toggle
- Disclosure/Accordion
- Tabs
- Radio Group

*Always prefer Headless UI components - they handle ARIA automatically!*

---

## Getting Help

**Questions about accessibility?**
- Check this guide first
- Review [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)
- Test with screen reader if unsure
- Ask in #frontend-accessibility channel

**Found an accessibility bug?**
- Create issue with "accessibility" label
- Include steps to reproduce
- Test with keyboard and screen reader
- Note WCAG criterion violated

---

*Last updated: 2026-02-02*
*Maintained by: Arcanea Frontend Specialist*
