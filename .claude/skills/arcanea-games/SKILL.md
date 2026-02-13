# /arcanea-games

> *"Through play, we transcend. Through challenge, we evolve."*

## Skill: Arcanea Games Portal

Activate the Arcanea Games development and play system with premium 2026 design standards.

**Guardian:** Draconia (Fire) + Lyria (Sight)
**Frequency:** 528 Hz (Transformation)
**Quality Standard:** Premium/State-of-the-Art

---

## Invocation

```
/arcanea-games                    # Open games portal
/arcanea-games build [type]       # Build new game
/arcanea-games play [game]        # Launch game
/arcanea-games list               # Show all games
```

---

## Design Standards (MANDATORY)

### Typography
- **Primary:** Inter (400, 500, 600, 700)
- **Mono:** JetBrains Mono (code, stats)
- **Display:** Inter 700 (headings only)
- **NO FANTASY FONTS** - No Cinzel, Cormorant, or medieval serifs

### Stack
```yaml
framework: Next.js 15 + React 19
styling: Tailwind CSS v4
animation: Framer Motion 11
state: Zustand 5
icons: Lucide React
components: Radix UI primitives
```

### Color System (Slate-based)
```css
--bg-primary: slate-950 (#020617)
--bg-card: slate-900 (#0f172a)
--bg-elevated: slate-800 (#1e293b)
--border: slate-700/50
--text-primary: slate-50
--text-secondary: slate-400
--accent-fire: orange-500
--accent-water: cyan-400
--accent-earth: amber-600
--accent-wind: violet-400
--accent-void: purple-500
```

### UI Principles
1. **Glassmorphism** - Subtle blur, not heavy gradients
2. **8px grid** - All spacing in multiples of 8
3. **Micro-interactions** - Framer Motion spring physics
4. **Mobile-first** - Touch targets 44px minimum
5. **Accessibility** - WCAG 2.2 AA minimum

---

## Game Types Available

### 1. Elemental Challenges (Browser)
Quick arcade-style games per element:
- **Fire Dodge** - Reflex-based obstacle avoidance
- **Water Flow** - Puzzle routing
- **Earth Build** - Strategy/tower defense
- **Wind Glide** - Endless runner
- **Void Shift** - Dimension-switching puzzle

### 2. Agent Training Arena
- Summon and train Arcanean agents
- Skill progression trees
- Agent fusion mechanics
- Challenge modes

### 3. Story Quests
- Narrative-driven adventures
- Guardian mythology integrated
- Branching dialogue with AI

### 4. Multiplayer Arenas
- Real-time competitive
- Leaderboards
- Seasonal events

---

## File Structure

```
arcanea-game-development/
├── PORTAL/                    # Main games hub
│   ├── app/                   # Next.js app router
│   ├── components/
│   │   ├── ui/               # Radix + Tailwind
│   │   ├── games/            # Game components
│   │   └── shared/           # Common elements
│   └── games/                # Individual games
├── TEMPLATES/                 # Game starters
├── CORE AGENTS/              # Game-specific agents
└── SKILLS MARKETPLACE/       # Purchasable skills
```

---

## Build Command

When `/arcanea-games build` is invoked:

1. **Analyze request** - What type of game?
2. **Select template** - Match to TEMPLATES/
3. **Apply design system** - Premium standards only
4. **Generate components** - React + Framer Motion
5. **Wire state** - Zustand stores
6. **Add polish** - Micro-interactions, sounds
7. **Test** - Playwright E2E
8. **Deploy** - Vercel preview

---

## Quality Gates

Before any game ships:
- [ ] Inter font applied globally
- [ ] Tailwind only (no custom CSS)
- [ ] Framer Motion animations
- [ ] Mobile responsive (375px+)
- [ ] 60fps animations
- [ ] Touch-friendly controls
- [ ] Accessibility audit passed
- [ ] Lighthouse 90+ performance

---

## Anti-Patterns (NEVER DO)

- Fantasy serif fonts (Cinzel, etc.)
- Heavy gradient backgrounds
- Cheesy glow effects
- Raw CSS keyframe animations
- Fixed desktop layouts
- Tiny touch targets
- Generic "game UI" aesthetics

---

*"Premium quality or nothing."*
