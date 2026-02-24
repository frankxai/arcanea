---
description: Run a comprehensive design quality review on a component or page
thinking: true
---

# Design Review — Quality Gate Protocol

You are conducting a **design quality review** as the Visual QA Agent and Accessibility Guardian working in tandem.

## Reference Documents (Read First)

1. `.claude/agents/departments/design/visual-qa.md` — Quality criteria & grading
2. `.claude/agents/departments/design/accessibility-guardian.md` — WCAG compliance
3. `.claude/agents/departments/design/CLAUDE.md` — Department standards

---

## Step 1: Identify the Target

What are we reviewing? Ask if not clear:
- A specific component file (`components/ui/...`)
- A page or route (`app/...`)
- A Design Lab page (`app/design-lab/...`)
- A PR or set of changes

Read all relevant files before proceeding.

---

## Step 2: Anti-Slop Detection

Scan for generic AI patterns:

### Red Flags (Automatic Grade Reduction)
- [ ] Raw hex values instead of Tailwind tokens
- [ ] Inter/Roboto for display text (should be Cinzel)
- [ ] Generic purple-on-white gradient
- [ ] Cookie-cutter card grids with no personality
- [ ] Padding/margin with arbitrary pixel values instead of spacing scale
- [ ] Stock placeholder text ("Lorem ipsum", "Your amazing feature")
- [ ] Identical border-radius on everything
- [ ] Generic shadow-lg on every card

### Yellow Flags (Needs Attention)
- [ ] More than 3 hover effects of the same type
- [ ] Animation without spring physics (linear/ease defaults)
- [ ] Missing glass morphism hierarchy (everything same blur level)
- [ ] Color accents not mapped to elemental system

---

## Step 3: Design System Compliance

| Check | Pass | Fail |
|-------|------|------|
| Colors from `cosmic-*` / `arcane-*` tokens | | |
| Typography uses `font-display` / `font-body` / `font-sans` | | |
| Spacing uses Tailwind scale (4, 6, 8, 12, 16, 24) | | |
| Border radius from design system | | |
| Glass variants (subtle/standard/strong) used correctly | | |
| Gradients use `text-gradient-*` or `bg-gradient-*` classes | | |
| Animations from `lib/animations.ts` not inline | | |
| CVA variants include elemental set | | |

---

## Step 4: Accessibility Audit

### Structure
- [ ] Semantic HTML (proper heading hierarchy, landmarks)
- [ ] ARIA attributes on custom widgets
- [ ] Alt text on images, aria-label on icon buttons

### Interaction
- [ ] Focus visible: `focus-visible:ring-2 focus-visible:ring-arcane-crystal/50`
- [ ] Touch targets >= 44px
- [ ] Keyboard navigable (Tab, Enter, Escape, Arrow keys)

### Visual
- [ ] Color contrast >= 4.5:1 (text) / 3:1 (large text)
- [ ] `prefers-reduced-motion` respected
- [ ] `prefers-contrast: high` supported
- [ ] No information conveyed by color alone

---

## Step 5: Responsive Review

Test at these breakpoints:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (iPad Pro / small laptop)
- 1280px (laptop)
- 1440px (desktop)
- 1920px (full HD)

Check:
- [ ] No horizontal overflow
- [ ] Text readable without zooming
- [ ] Touch targets adequate on mobile
- [ ] Layout adapts gracefully (no sudden jumps)

---

## Step 6: Performance Impact

- [ ] No layout shifts from animation (use `transform` only)
- [ ] Images use `next/image` with proper sizing
- [ ] Client components minimized (Server Components by default)
- [ ] No heavy dependencies imported unnecessarily

---

## Step 7: Grade & Report

### Grading Scale

| Grade | Criteria |
|-------|----------|
| **S** | Exceptional — museum-quality, zero issues, distinctive character |
| **A** | Excellent — production-ready, minor polish opportunities |
| **B** | Good — functional but missing distinctive character or has a few issues |
| **C** | Needs Work — multiple issues, feels generic |
| **F** | Failing — anti-slop violations, accessibility failures, broken layout |

### Report Format

```
## Design Review: [Component/Page Name]

**Grade: [S/A/B/C/F]**
**Reviewer: Visual QA + Accessibility Guardian**

### Summary
[1-2 sentence overall assessment]

### Strengths
- [What works well]

### Issues Found
- [CRITICAL] Issue description → Fix recommendation
- [MAJOR] Issue description → Fix recommendation
- [MINOR] Issue description → Fix recommendation

### Anti-Slop Score
[Clean / 1-2 flags / Multiple flags]

### Accessibility Score
[Full compliance / Minor gaps / Major gaps]

### Recommended Actions
1. [Priority fix]
2. [Next fix]
3. [Polish item]
```

---

*"Quality is not a gate to pass through — it is the standard we maintain at every step."*
