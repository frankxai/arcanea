# Tailwind CSS Styling - Action Plan
## Arcanea Frontend - February 2, 2026

---

## Overview

This action plan addresses all styling inconsistencies found in the Tailwind CSS audit across both Arcanea projects.

**Projects**:
1. `/arcanea-ecosystem/arcanea/apps/web/` - Main MVP (70-75% complete)
2. `/arcanea.ai/` - Landing page/marketing site

**Total Issues**: 21 issues across 3 priority levels
**Estimated Effort**: 18-20 hours (2-3 days)

---

## Priority 0 - Blocking Production 🔴

**Deadline**: End of day (Feb 2, 2026)
**Estimated Time**: 4 hours

### Issue: Dynamic Tailwind Class Generation

**Status**: 2 of 7 instances fixed ✅

**Problem**: Template literal class names won't generate in production builds.

**Files Remaining**:

#### 1. `/components/landing/how-it-works.tsx` (2 instances)

**Lines**: 110, 119

**Current Code**:
```tsx
isActive ? `text-${step.color}` : 'text-text-muted group-hover:text-white'
```

**Fix**:
```tsx
// Add color map at component level
const stepColorMap: Record<string, string> = {
  'atlantean-teal': 'text-atlantean-teal',
  'gold-bright': 'text-gold-bright',
  'creation-prism-purple': 'text-creation-prism-purple',
  'draconic-crimson': 'text-draconic-crimson',
};

// Use in className
className={cn(
  'transition-colors',
  isActive ? stepColorMap[step.color] : 'text-text-muted group-hover:text-white'
)}
```

**Time**: 30 minutes

---

#### 2. `/components/landing/testimonials-v2.tsx` (3 instances)

**Lines**: 151, 172, 183

**Current Code**:
```tsx
// Line 151
<Quote className={`w-8 h-8 text-${activeTestimonial.color}`} />

// Line 172
className={`w-14 h-14 rounded-full bg-${activeTestimonial.color}/20 flex items-center justify-center text-lg font-semibold text-${activeTestimonial.color}`}

// Line 183
<div className={`text-xs text-${activeTestimonial.color} mt-1`}>
```

**Fix**:
```tsx
// Add color maps
const textColorMap: Record<string, string> = {
  'atlantean-teal': 'text-atlantean-teal',
  'gold-bright': 'text-gold-bright',
  'creation-prism-purple': 'text-creation-prism-purple',
  'draconic-crimson': 'text-draconic-crimson',
};

const bgColorMap: Record<string, string> = {
  'atlantean-teal': 'bg-atlantean-teal/20',
  'gold-bright': 'bg-gold-bright/20',
  'creation-prism-purple': 'bg-creation-prism-purple/20',
  'draconic-crimson': 'bg-draconic-crimson/20',
};

// Use in components
<Quote className={cn('w-8 h-8', textColorMap[activeTestimonial.color])} />

<div className={cn(
  'w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold',
  bgColorMap[activeTestimonial.color],
  textColorMap[activeTestimonial.color]
)}>

<div className={cn('text-xs mt-1', textColorMap[activeTestimonial.color])}>
```

**Time**: 45 minutes

---

### Verification

**Build Test**:
```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web
pnpm run build
```

**Expected Output**: No warnings about missing Tailwind classes

**Visual QA**:
- [ ] Hero section stats show colored numbers
- [ ] Feature cards show colored "Learn more" on hover
- [ ] How It Works steps show colored active state
- [ ] Testimonials show colored accents

**Time**: 30 minutes

---

## Priority 1 - Critical Consistency 🟠

**Deadline**: End of week (Feb 7, 2026)
**Estimated Time**: 8-10 hours

### Issue 1: arcanea.ai Missing Design System

**Impact**: Landing page doesn't match brand standards

**Actions**:

#### A. Update Tailwind Config

**File**: `/arcanea.ai/tailwind.config.ts`

**Action**: Replace entire file with canonical config

```bash
# Backup current config
cp /mnt/c/Users/frank/Arcanea/arcanea.ai/tailwind.config.ts /mnt/c/Users/frank/Arcanea/arcanea.ai/tailwind.config.ts.backup

# Copy canonical config
cp /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web/tailwind.config.ts /mnt/c/Users/frank/Arcanea/arcanea.ai/tailwind.config.ts
```

**Manual Edits**:
```typescript
// Update content paths
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
],
```

**Time**: 30 minutes

---

#### B. Update Global CSS

**File**: `/arcanea.ai/app/globals.css`

**Action**: Replace with canonical Arcanean color system

```bash
# Backup current CSS
cp /mnt/c/Users/frank/Arcanea/arcanea.ai/app/globals.css /mnt/c/Users/frank/Arcanea/arcanea.ai/app/globals.css.backup

# Copy canonical CSS
cp /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web/app/globals.css /mnt/c/Users/frank/Arcanea/arcanea.ai/app/globals.css
```

**Manual Edits**:
- Keep existing custom animations if unique to arcanea.ai
- Merge scrollbar styles
- Keep any arcanea.ai-specific utilities

**Time**: 1 hour

---

#### C. Add Canonical Fonts

**File**: `/arcanea.ai/app/globals.css`

**Add at top** (if not already from copy):
```css
/* Import distinctive fonts - Cinzel (display) + Crimson Pro (body) */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
```

**Time**: 15 minutes

---

#### D. Add cn() Utility

**File**: `/arcanea.ai/lib/utils.ts` (create if doesn't exist)

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Install dependencies**:
```bash
cd /mnt/c/Users/frank/Arcanea/arcanea.ai
npm install clsx tailwind-merge
```

**Time**: 15 minutes

---

#### E. Update Component Imports

**Files**: All component files using hardcoded `arcane.*` classes

**Find**:
```bash
cd /mnt/c/Users/frank/Arcanea/arcanea.ai
grep -r "arcane-" components/ app/ --include="*.tsx" --include="*.jsx"
```

**Replace Patterns**:
- `arcane-crystal` → `atlantean-teal` or `atlantean-aqua`
- `arcane-fire` → `draconic-crimson` or `draconic-gold`
- `arcane-water` → `atlantean-teal`
- `arcane-cosmic` → `cosmic-deep` or `cosmic-surface`
- `arcane-shadow` → `cosmic-void`

**Time**: 3 hours

---

#### F. Test arcanea.ai

**Visual Regression**:
- [ ] Landing page maintains design
- [ ] Navigation matches style
- [ ] Spatial Studio uses new colors
- [ ] Guardian panels show proper colors
- [ ] All fonts load correctly (Cinzel headings, Crimson Pro body)

**Build Test**:
```bash
cd /mnt/c/Users/frank/Arcanea/arcanea.ai
npm run build
```

**Time**: 1 hour

---

### Issue 2: Hardcoded Colors in Components

**Impact**: Difficult to maintain, theme, or update colors

**Count**: 25 instances across both projects

**Strategy**: Create utility classes instead of inline styles

#### A. Create Gradient Utilities

**File**: `arcanea-ecosystem/apps/web/app/globals.css` (add to @layer utilities)

```css
@layer utilities {
  /* Atlantean Gradients */
  .bg-atlantean-glow-radial {
    background: radial-gradient(
      circle,
      hsl(var(--atlantean-teal) / 0.15) 0%,
      transparent 70%
    );
  }

  .bg-atlantean-orb {
    background: radial-gradient(
      circle,
      hsl(var(--atlantean-aqua) / 0.2) 0%,
      transparent 60%
    );
  }

  /* Draconic Gradients */
  .bg-draconic-fire-radial {
    background: radial-gradient(
      circle,
      hsl(var(--draconic-gold) / 0.15) 0%,
      transparent 70%
    );
  }

  /* Creation Gradients */
  .bg-creation-light-radial {
    background: radial-gradient(
      circle,
      hsl(var(--creation-gold-pure) / 0.12) 0%,
      transparent 70%
    );
  }

  /* Aurora Text Gradient */
  .text-aurora {
    background: linear-gradient(
      90deg,
      hsl(var(--atlantean-teal)),
      hsl(var(--atlantean-aqua)),
      hsl(var(--gold-bright)),
      hsl(var(--atlantean-teal))
    );
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: aurora-shift 8s ease infinite;
  }

  @keyframes aurora-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
}
```

**Time**: 1 hour

---

#### B. Replace Hardcoded Colors in Components

**Files with hardcoded colors**:

1. `/components/landing/hero-section.tsx` (11 instances)
2. `/components/magic/text-reveal.tsx` (1 instance)
3. `/components/magic/luminor-orb.tsx` (estimated 3 instances)
4. `/components/luminor/luminor-selection-grid.tsx` (estimated 2 instances)
5. `/components/landing/wisdoms-section.tsx` (estimated 2 instances)
6. `/components/landing/luminor-showcase.tsx` (estimated 2 instances)

**Pattern**:

```tsx
// BEFORE
style={{ background: 'radial-gradient(circle, rgba(127,255,212,0.15) 0%, transparent 70%)' }}

// AFTER
className="bg-atlantean-glow-radial"

// OR if unique
style={{ background: 'radial-gradient(circle, hsl(var(--atlantean-teal) / 0.15) 0%, transparent 70%)' }}
```

**Time**: 3 hours

---

#### C. Test All Visual Effects

- [ ] Gradient orbs animate smoothly
- [ ] Text aurora effect works
- [ ] Glow effects show proper colors
- [ ] No visual regressions

**Time**: 30 minutes

---

## Priority 2 - Polish & Documentation 🟡

**Deadline**: Next sprint (Feb 14, 2026)
**Estimated Time**: 6 hours

### Issue 1: Color Token Alignment

**Problem**: Minor discrepancies between design docs and implementation

**Actions**:

#### Option A: Update Documentation
Update CLAUDE.md and design system docs to reflect actual implementation:
- Atlantean Teal: #26cccc (not #7fffd4)
- Gold Bright: #ffcc33 (not #ffd700)

#### Option B: Update CSS Variables
Update globals.css to match exact hex values from docs:
```css
--atlantean-teal: 174 100% 75%; /* #7fffd4 */
--gold-bright: 51 100% 50%;    /* #ffd700 */
```

**Decision Required**: Consult with design team

**Time**: 1 hour

---

### Issue 2: ESLint Rules

**Goal**: Prevent future styling issues

**Actions**:

#### A. Install ESLint Plugins

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web
pnpm add -D eslint-plugin-tailwindcss
```

#### B. Configure Rules

**File**: `.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended"
  ],
  "plugins": ["tailwindcss"],
  "rules": {
    "tailwindcss/no-custom-classname": "warn",
    "tailwindcss/classnames-order": "warn",
    "no-template-curly-in-string": "error"
  }
}
```

#### C. Add Custom Rules (Future)

Create custom ESLint plugin for Arcanea-specific rules:
- Detect dynamic class generation
- Detect hardcoded hex/rgb colors
- Enforce cn() utility usage

**Time**: 2 hours

---

### Issue 3: Design System Documentation

**Goal**: Single source of truth for all design tokens

**Actions**:

#### A. Create Design Token Docs

**File**: `docs/DESIGN_TOKENS.md`

**Content**:
- Complete color palette with HSL and hex values
- Animation reference
- Typography scale
- Spacing system
- Component examples

**Time**: 2 hours

---

#### B. Auto-generate from CSS Variables (Future)

Script to parse globals.css and generate markdown docs automatically.

**Time**: 4 hours (next sprint)

---

## Maintenance Plan

### Code Review Checklist

For all new PRs touching styles, verify:

- [ ] No dynamic class generation (`className={text-${var}}`)
- [ ] No hardcoded colors (hex, rgb, rgba)
- [ ] Uses cn() utility for conditional classes
- [ ] Uses design tokens from globals.css
- [ ] Proper dark mode support
- [ ] Accessible focus states
- [ ] Responsive breakpoints tested

### Weekly Audits

Every Monday:
1. Run ESLint on all component files
2. Search for new hardcoded colors: `grep -r "#[0-9a-f]\{6\}" components/`
3. Check for dynamic classes: `grep -r 'className={`.*\${' components/`
4. Review and update design token docs

### Monthly Reviews

Every 1st of month:
1. Full Tailwind audit across all projects
2. Design system consistency check
3. Performance analysis (bundle size, unused CSS)
4. Update this action plan

---

## Success Metrics

### Code Quality
- [ ] Zero dynamic class generation instances
- [ ] < 5 hardcoded color instances (only for unique effects)
- [ ] 100% cn() utility usage in component files
- [ ] Zero build warnings related to Tailwind

### Consistency
- [ ] All projects use same color tokens
- [ ] All projects use same animation system
- [ ] All projects use same typography
- [ ] Design system documentation up to date

### Performance
- [ ] CSS bundle < 100KB (gzipped)
- [ ] No unused Tailwind classes in production
- [ ] Lighthouse score > 90 for styling

### Developer Experience
- [ ] ESLint catches styling issues before PR
- [ ] Clear documentation for all design tokens
- [ ] Easy to add new colors/animations
- [ ] Fast feedback on styling changes

---

## Timeline

### Day 1 (Feb 2) - P0 Critical
- [x] Fix features-v2.tsx dynamic classes
- [x] Fix hero-section.tsx dynamic classes
- [ ] Fix how-it-works.tsx dynamic classes
- [ ] Fix testimonials-v2.tsx dynamic classes
- [ ] Verify production build
- [ ] Visual QA

### Day 2-3 (Feb 3-4) - P1 Consistency
- [ ] Update arcanea.ai Tailwind config
- [ ] Update arcanea.ai globals.css
- [ ] Add cn() utility to arcanea.ai
- [ ] Update arcanea.ai component classes
- [ ] Create gradient utility classes
- [ ] Replace hardcoded colors (arcanea-ecosystem)
- [ ] Replace hardcoded colors (arcanea.ai)
- [ ] Full visual regression test

### Week 2 (Feb 9-11) - P2 Polish
- [ ] Resolve color token discrepancies
- [ ] Add ESLint rules
- [ ] Create design token documentation
- [ ] Team training on new patterns

### Ongoing
- [ ] Weekly audits
- [ ] Monthly reviews
- [ ] Update documentation
- [ ] Maintain ESLint rules

---

## Resources

### Documentation
- [Tailwind CSS Audit Report](./TAILWIND_CSS_AUDIT_REPORT.md)
- [Fixes Applied](./TAILWIND_FIXES_APPLIED.md)
- [Arcanean Design System](./arcanea-ecosystem/arcanea/apps/web/styles/themes/arcanean-colors.css)
- [Tailwind Config](./arcanea-ecosystem/arcanea/apps/web/tailwind.config.ts)

### Tools
- Tailwind CSS IntelliSense (VS Code extension)
- Tailwind CSS Prettier Plugin
- ESLint Plugin for Tailwind

### References
- [Tailwind Dynamic Classes Issue](https://github.com/tailwindlabs/tailwindcss/discussions/10476)
- [Best Practices for Design Tokens](https://css-tricks.com/what-are-design-tokens/)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

**Plan Created By**: Arcanea Frontend Specialist
**Date**: February 2, 2026
**Last Updated**: February 2, 2026
**Status**: In Progress (Day 1 of 3)
