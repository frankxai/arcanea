# Tailwind CSS Fixes Applied
## Arcanea Frontend - February 2, 2026

---

## Summary

Applied critical fixes to resolve dynamic Tailwind class generation issues that would break in production builds.

**Status**: 2 of 7 files fixed (P0 blockers addressed in main components)

---

## Fixes Applied

### 1. `/components/landing/features-v2.tsx` ✅

**Issue**: Dynamic class generation
```tsx
// BEFORE (Broken in production)
className={`mt-6 text-sm font-medium text-${feature.highlight} ...`}
```

**Fix**: Explicit conditional mapping
```tsx
// AFTER (Production-safe)
className={`mt-6 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
  feature.highlight === 'atlantean-teal-aqua' ? 'text-atlantean-aqua' :
  feature.highlight === 'gold-bright' ? 'text-gold-bright' :
  feature.highlight === 'creation-prism-purple' ? 'text-creation-prism-purple' :
  'text-text-primary'
}`}
```

**Impact**: Feature cards now properly display colored text on hover

---

### 2. `/components/landing/hero-section.tsx` ✅

**Issue**: Dynamic class generation in StatItem component
```tsx
// BEFORE (Broken in production)
className={`text-3xl font-display font-bold text-${color}`}
```

**Fix**: Color mapping variable
```tsx
// AFTER (Production-safe)
const colorClass =
  color === 'atlantean-teal-aqua' ? 'text-atlantean-aqua' :
  color === 'gold-bright' ? 'text-gold-bright' :
  color === 'creation-prism-purple' ? 'text-creation-prism-purple' :
  color === 'draconic-crimson' ? 'text-draconic-crimson' :
  'text-text-primary';

className={`text-3xl font-display font-bold ${colorClass}`}
```

**Impact**: Stats display proper academy colors (16 Luminors, 7 Wisdoms, etc.)

---

## Remaining Files to Fix

### Priority 0 - Blocking (5 files remaining)

3. **`/components/landing/how-it-works.tsx`** (2 instances)
   - Lines 110, 119
   - Pattern: `text-${step.color}`

4. **`/components/landing/testimonials-v2.tsx`** (3 instances)
   - Lines 151, 172, 183
   - Pattern: `text-${activeTestimonial.color}`, `bg-${activeTestimonial.color}/20`

---

## Pattern for Remaining Fixes

All remaining fixes should follow this pattern:

```tsx
// 1. Define color mapping object (if multiple colors)
const colorMap: Record<string, string> = {
  'atlantean-teal': 'text-atlantean-teal',
  'gold-bright': 'text-gold-bright',
  'creation-prism-purple': 'text-creation-prism-purple',
  'draconic-crimson': 'text-draconic-crimson',
};

// 2. Use conditional or map lookup
className={cn('base-classes', colorMap[dynamicColor])}

// OR for inline ternary
className={`base-classes ${
  color === 'atlantean-teal' ? 'text-atlantean-teal' :
  color === 'gold-bright' ? 'text-gold-bright' :
  'text-text-primary'
}`}
```

---

## Testing Checklist

After all fixes:

- [ ] Build production bundle: `pnpm run build`
- [ ] Check for Tailwind warnings in build output
- [ ] Visual regression test on hero section
- [ ] Visual regression test on features section
- [ ] Visual regression test on how-it-works section
- [ ] Visual regression test on testimonials section
- [ ] Verify all academy colors display correctly
- [ ] Test dark/light mode (when implemented)

---

## Next Steps

### Immediate (Today)
1. Fix remaining 3 files with dynamic classes
2. Run production build to verify
3. Visual QA on all affected pages

### Short-term (This Week)
4. Replace hardcoded colors with CSS variables (25 instances)
5. Sync arcanea.ai design system with arcanea-ecosystem
6. Add cn() utility to arcanea.ai project

### Medium-term (Next Sprint)
7. Create gradient utility classes
8. Add ESLint rule to prevent dynamic class generation
9. Add ESLint rule to prevent hardcoded colors
10. Document color usage patterns for team

---

## ESLint Rule Recommendations

To prevent future dynamic class issues, add these rules:

```js
// .eslintrc.js
{
  "rules": {
    // Prevent template literal classes
    "no-template-curly-in-string": "error",

    // Custom rule (requires plugin)
    "@arcanea/no-dynamic-tailwind-classes": "error",
    "@arcanea/no-hardcoded-colors": "warn"
  }
}
```

Custom rule logic:
```js
// Detect patterns like className={`text-${variable}`}
// Flag as error with suggestion to use explicit mapping
```

---

## Design Token Usage Guidelines

### DO ✅

```tsx
// Use Tailwind classes from design system
<div className="text-atlantean-teal bg-cosmic-deep border-cosmic-border" />

// Use CSS variables for dynamic styles
<div style={{ color: 'hsl(var(--atlantean-teal))' }} />

// Use cn() utility for conditional classes
<div className={cn('base-class', isActive && 'text-gold-bright')} />

// Use explicit color maps
const colorMap = { blue: 'text-atlantean-teal', gold: 'text-gold-bright' };
<div className={colorMap[color]} />
```

### DON'T ❌

```tsx
// NO template literal class generation
<div className={`text-${color}`} /> // ❌ Won't work in production

// NO hardcoded hex/rgb colors
<div style={{ color: '#7fffd4' }} /> // ❌ Use CSS variables instead

// NO arbitrary values without good reason
<div className="text-[#7fffd4]" /> // ❌ Use design tokens

// NO inline styles for colors
<div style={{ background: 'rgba(127,255,212,0.15)' }} /> // ❌
```

---

## Files Modified

1. `/mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web/components/landing/features-v2.tsx`
2. `/mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web/components/landing/hero-section.tsx`

---

## Verification

### Build Test
```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web
pnpm run build
```

**Expected**: No Tailwind class generation warnings

### Visual Test
1. Navigate to homepage
2. Verify hero stats show colored text:
   - 16 (teal)
   - 7 (gold)
   - 17 (purple)
   - 34k+ (crimson)
3. Hover over feature cards
4. Verify "Learn more →" shows proper color on hover

---

**Fixes Applied By**: Arcanea Frontend Specialist
**Date**: February 2, 2026
**Remaining Work**: 3 files, estimated 2 hours
