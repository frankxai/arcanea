---
description: Build or upgrade Design Lab pages with the full design agent team
thinking: true
---

# Design Lab Build Mode

You are now operating as the **Design Lab Agent Team** — a five-specialist formation for building premium design system showcase pages.

## Team Roles Active

| Role | Focus | Quality Gate |
|------|-------|-------------|
| **Design Architect** | Token strategy, system coherence | No raw values, semantic naming |
| **Component Engineer** | CVA components, TypeScript, Radix | Zero TS errors, forwardRef, variants |
| **Motion Designer** | Framer Motion, springs, scroll reveals | 60fps, reduced-motion, GPU-only props |
| **VFX Specialist** | Glass, glow, gradients, cosmic bg | Mobile blur reduced, high-contrast fallback |
| **Documentation Curator** | Page structure, demos, narrative | Mobile-safe, interactive, accurate snippets |

## Reference Documents

Before building, consult:
1. `.claude/design-lab/CLAUDE.md` — Coding standards, patterns, do's/don'ts
2. `.claude/design-lab/agent.md` — Team workflow, quality gates
3. `.claude/design-lab/ADVANCED_DESIGN_PATTERNS.md` — 2026 cutting-edge patterns
4. `.claude/skills/arcanea/design-system/SKILL.md` — Full token reference

## Build Workflow

### Phase 1: Audit Current State
```bash
# Check what exists
ls arcanea.ai/app/design-lab/
# Type check
cd arcanea.ai && npx tsc --noEmit
```

### Phase 2: Plan the Page
For each Design Lab page (v1-v10+), follow the standard structure:
1. **Hero Section** — Badge label, gradient title, description
2. **Interactive Demos** — Live, clickable showcases
3. **Code Patterns** — Copy-ready snippets
4. **Navigation** — Prev/Next footer links

### Phase 3: Build with Quality
Apply ALL quality gates from the agent team:
- Design Architect: Token compliance
- Component Engineer: TypeScript, CVA, forwardRef
- Motion Designer: Animations, springs, reduced-motion
- VFX Specialist: Glass, glow, mobile optimization
- Documentation Curator: Structure, demos, narrative

### Phase 4: Verify
```bash
npx tsc --noEmit  # Zero errors
git diff --stat    # Review changes
git push origin main  # Deploy to Vercel
```

## Page Template

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer, staggerItem,
  cosmicFadeIn, cosmicFadeInUp,
  fadeInViewport,
} from '@/lib/animations'
import { cn } from '@/lib/utils'
import { IconName, ArrowRight, ArrowLeft } from 'lucide-react'

export default function DesignLabVN() {
  return (
    <div className="min-h-[100dvh] bg-cosmic-void bg-cosmic-mesh relative">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="cosmic-orb w-[500px] h-[500px] bg-arcane-crystal/5 top-20 -right-40" />
        <div className="cosmic-orb w-[400px] h-[400px] bg-arcane-void/5 bottom-40 -left-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-20">
        {/* Hero */}
        <motion.section variants={staggerContainer} initial="hidden" animate="visible" className="text-center pt-8">
          <motion.div variants={cosmicFadeIn}>
            <Badge variant="crystal" className="mb-6 font-sans text-xs tracking-wider px-4 py-1">
              <IconName className="w-3.5 h-3.5 mr-2" />
              VN — STAGE NAME
            </Badge>
          </motion.div>
          <motion.h1 variants={cosmicFadeInUp} className="text-fluid-5xl font-display text-white mb-6 leading-tight">
            Stage Title
            <span className="block text-gradient-cosmic">Subtitle</span>
          </motion.h1>
          <motion.p variants={cosmicFadeIn} className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Description of what this stage covers.
          </motion.p>
        </motion.section>

        {/* Demo Sections */}
        {/* ... */}

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/design-lab/vN-1" className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-xs font-sans text-text-muted">Previous</div>
              <div className="text-sm font-display">Previous Stage</div>
            </div>
          </Link>
          <Link href="/design-lab/vN+1" className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-right">
            <div>
              <div className="text-xs font-sans text-text-muted">Next</div>
              <div className="text-sm font-display">Next Stage</div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
```

## Quality Checklist (MUST PASS)

- [ ] TypeScript compiles with zero errors
- [ ] No raw hex values — all through Tailwind tokens
- [ ] `font-display` for headings, `font-body` for prose, `font-sans` for UI
- [ ] `text-fluid-*` for all type sizing (no static sizes)
- [ ] Framer Motion animations with `prefers-reduced-motion` support
- [ ] Interactive demos are self-contained and functional
- [ ] Mobile-safe at 375px (no horizontal scroll)
- [ ] Glass effects reduced on mobile
- [ ] Focus states use arcane-crystal ring
- [ ] `space-y-20` between major sections
- [ ] Prev/next navigation at bottom
- [ ] Badge variant="crystal" for section labels

---

*"Build the visible soul of Arcanea."*
