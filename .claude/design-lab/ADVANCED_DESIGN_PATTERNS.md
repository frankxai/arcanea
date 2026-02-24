# Advanced Design Patterns Reference — 2026

> *"The difference between good and exceptional is the patterns you internalize."*

This document captures cutting-edge design patterns researched from the 2026 ecosystem. It serves as the knowledge backbone for the Design Lab team, v0 generation workflows, and all Arcanea UI work.

---

## 1. Component Architecture Patterns

### 1.1 Compound Components (Radix / shadcn Pattern)

Parent manages shared state via Context; children consume it implicitly.

```tsx
// The Radix/shadcn pattern — what we use
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="glass" />
    <Dialog.Content className="glass-strong rounded-3xl p-8">
      <Dialog.Title className="font-display text-fluid-2xl">Title</Dialog.Title>
      <Dialog.Description className="font-body text-text-secondary">...</Dialog.Description>
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**Arcanea Application:** All complex UI (modals, dropdowns, tabs, accordions) should use compound component patterns. Each sub-component receives Arcanean styling through CVA variants.

### 1.2 Polymorphic Components (Slot Pattern)

Radix's `Slot` component merges props with children, enabling `asChild` composition:

```tsx
// Button that renders as a Link when asChild is used
<Button asChild variant="crystal">
  <Link href="/design-lab/v1">Explore Foundation</Link>
</Button>
```

**Arcanea Application:** All interactive components (Button, Badge, Link) should support `asChild` via Radix Slot. This eliminates wrapper divs and keeps semantic HTML.

### 1.3 Controlled + Uncontrolled (use-controllable-state)

Components that work both ways — controlled by parent or managing their own state:

```tsx
function useControllableState<T>({
  prop, defaultProp, onChange
}: { prop?: T; defaultProp: T; onChange?: (v: T) => void }) {
  const [internal, setInternal] = useState(defaultProp)
  const isControlled = prop !== undefined
  const value = isControlled ? prop : internal
  const setValue = useCallback((next: T) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }, [isControlled, onChange])
  return [value, setValue] as const
}
```

**Arcanea Application:** All form-like components (Select, Toggle, Accordion) should use this pattern for maximum composability.

### 1.4 CVA + Tailwind Variant Architecture

Our established pattern — class-variance-authority for type-safe variants:

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-sans text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-arcane-crystal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-void disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        crystal: 'bg-arcane-crystal/10 text-arcane-crystal border border-arcane-crystal/20 hover:bg-arcane-crystal/20 hover:border-arcane-crystal/30 hover:shadow-lg hover:shadow-arcane-crystal/10',
        fire: 'bg-arcane-fire/10 text-arcane-fire border border-arcane-fire/20 hover:bg-arcane-fire/20',
        void: 'bg-arcane-void/10 text-arcane-void border border-arcane-void/20 hover:bg-arcane-void/20',
        gold: 'bg-arcane-gold/10 text-arcane-gold border border-arcane-gold/20 hover:bg-arcane-gold/20',
        glass: 'glass text-white hover:bg-white/10',
        ghost: 'text-text-secondary hover:text-white hover:bg-white/5',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'crystal', size: 'md' },
  }
)
```

---

## 2. Advanced Animation Patterns (Framer Motion 12)

### 2.1 Variant Propagation

Parent's variant changes cascade to children without explicit `animate` props:

```tsx
const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const glowVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.4 } },
}

<motion.div variants={cardVariants} initial="rest" whileHover="hover">
  <motion.div variants={glowVariants} className="absolute inset-0 bg-arcane-crystal/5 rounded-2xl" />
  {/* Card content — glow auto-appears on hover */}
</motion.div>
```

### 2.2 Layout Animations with layoutId

Shared element transitions between states:

```tsx
// Tab indicator that flows between tabs
{tabs.map((tab) => (
  <button key={tab.id} onClick={() => setActive(tab.id)}>
    {tab.label}
    {active === tab.id && (
      <motion.div layoutId="activeTab" className="absolute bottom-0 h-0.5 bg-arcane-crystal" />
    )}
  </button>
))}
```

### 2.3 Exit Animations with AnimatePresence

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activePanel}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {panels[activePanel]}
  </motion.div>
</AnimatePresence>
```

### 2.4 Spring Physics for Micro-Interactions

```tsx
// Bouncy button press
const tapSpring = { scale: 0.95, transition: { type: 'spring', stiffness: 400, damping: 15 } }

// Gentle hover lift
const hoverSpring = { y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }

// Elastic drag
const dragConstraints = { top: 0, bottom: 0, left: -100, right: 100 }
<motion.div drag="x" dragConstraints={dragConstraints} dragElastic={0.2} />
```

### 2.5 Scroll-Triggered Stagger with Custom Easing

```tsx
const staggerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
```

### 2.6 Gesture-Driven Interactions

```tsx
// Card with tilt on hover (3D perspective)
<motion.div
  whileHover={{ rotateX: -2, rotateY: 5, z: 20 }}
  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
  style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
>
```

---

## 3. Dark Glassmorphism (2026 Premium)

### 3.1 The Arcanea Glass System

Three tiers with specific use cases:

```css
/* Tier 1: Subtle — tooltips, popovers, light overlays */
.glass-subtle {
  background: rgba(18, 24, 38, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(127, 255, 212, 0.08);
}

/* Tier 2: Standard — cards, containers, navigation */
.glass {
  background: rgba(18, 24, 38, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(127, 255, 212, 0.15);
}

/* Tier 3: Strong — modals, sticky headers, critical UI */
.glass-strong {
  background: rgba(18, 24, 38, 0.85);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(127, 255, 212, 0.20);
}
```

### 3.2 Advanced Glass Techniques

**Noise Texture Overlay:**
```css
.glass-premium::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  border-radius: inherit;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

**Inner Light Effect:**
```css
.glass-inner-light {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(127, 255, 212, 0.05);
}
```

**Frosted Edge Glow:**
```css
.glass-edge-glow {
  border-image: linear-gradient(
    135deg,
    rgba(127, 255, 212, 0.3),
    rgba(127, 255, 212, 0.05) 50%,
    rgba(153, 102, 255, 0.2)
  ) 1;
}
```

### 3.3 Mobile Performance

```css
@media (max-width: 768px) {
  .glass { backdrop-filter: blur(8px); }
  .glass-strong { backdrop-filter: blur(12px); }
  .cosmic-orb { filter: blur(40px); } /* reduced from 60px */
}

@media (hover: none) {
  .glow-card::before { display: none; } /* disable mouse-tracking on touch */
}
```

### 3.4 High Contrast Fallbacks

```css
@media (prefers-contrast: high) {
  .glass, .glass-strong, .glass-subtle {
    background: rgba(18, 24, 38, 0.95);
    border-width: 2px;
    backdrop-filter: none;
  }
}
```

---

## 4. Micro-Interactions (2026 Best Practices)

### 4.1 Timing Guidelines

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover feedback | 150-200ms | `ease-out` |
| Button press | 100ms | `spring(400, 15)` |
| Panel expand | 300ms | `[0.25, 0.46, 0.45, 0.94]` |
| Page transition | 400-500ms | `[0.4, 0, 0.2, 1]` |
| Loading shimmer | 1500ms | `linear` (infinite) |
| Scroll reveal | 600ms | `[0.25, 0.46, 0.45, 0.94]` |

### 4.2 Skeleton Loading (Cosmic Pattern)

```tsx
function CosmicSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg bg-cosmic-raised',
      className
    )}>
      <div className="absolute inset-0 shimmer" />
    </div>
  )
}

// Usage — skeleton matches content dimensions
<div className="space-y-4">
  <CosmicSkeleton className="h-8 w-48" />   {/* Title */}
  <CosmicSkeleton className="h-4 w-full" />  {/* Body line 1 */}
  <CosmicSkeleton className="h-4 w-3/4" />   {/* Body line 2 */}
</div>
```

### 4.3 Button State Machine

```tsx
type ButtonState = 'idle' | 'hover' | 'pressed' | 'loading' | 'success' | 'error'

const buttonStates: Record<ButtonState, TargetAndTransition> = {
  idle: { scale: 1 },
  hover: { scale: 1.02, y: -2 },
  pressed: { scale: 0.97 },
  loading: { scale: 1, opacity: 0.7 },
  success: { scale: 1, backgroundColor: 'rgba(0, 255, 136, 0.2)' },
  error: { scale: 1, x: [0, -4, 4, -4, 4, 0] }, // shake
}
```

### 4.4 Optimistic UI Pattern

```tsx
async function handleAction() {
  // 1. Immediately update UI (optimistic)
  setItems(prev => [...prev, optimisticItem])

  // 2. Perform actual operation
  try {
    const result = await serverAction(data)
    // 3a. Replace optimistic with real data
    setItems(prev => prev.map(i => i.id === optimisticItem.id ? result : i))
  } catch {
    // 3b. Rollback on failure
    setItems(prev => prev.filter(i => i.id !== optimisticItem.id))
    toast.error('Action failed')
  }
}
```

---

## 5. Accessibility Patterns (WCAG 2.2)

### 5.1 New WCAG 2.2 Requirements

| Criterion | Level | Requirement | Arcanea Implementation |
|-----------|-------|-------------|----------------------|
| 2.4.11 Focus Not Obscured | AA | Focus indicator must not be hidden by other elements | `z-50` on focused elements, no `overflow: hidden` on focus containers |
| 2.5.7 Dragging Movements | AA | Single-pointer alternative for drag operations | Provide tap/click fallback for all draggable elements |
| 2.5.8 Target Size | AA | Interactive targets >= 24x24 CSS px | Minimum `h-6 w-6`, prefer `h-10 w-10` for touch |
| 3.3.7 Redundant Entry | A | Don't ask users to re-enter same info | Auto-populate from previous form steps |
| 3.3.8 Accessible Auth | AA | No cognitive function tests for login | Support password managers, biometric, passkeys |

### 5.2 Focus Management

```css
/* Arcanea focus ring — visible, on-brand, accessible */
:focus-visible {
  outline: none;
  ring: 2px solid rgba(127, 255, 212, 0.5);
  ring-offset: 2px;
  ring-offset-color: #0b0e14; /* cosmic-void */
}
```

### 5.3 Reduced Motion

```tsx
// Hook for components
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// Usage
const reducedMotion = useReducedMotion()
const transition = reducedMotion
  ? { duration: 0.01 }
  : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
```

### 5.4 Color Contrast

| Token Pair | Ratio | Status |
|------------|-------|--------|
| `text-primary` on `cosmic-void` | 14.5:1 | PASS AAA |
| `text-secondary` on `cosmic-void` | 7.2:1 | PASS AA |
| `text-muted` on `cosmic-void` | 4.8:1 | PASS AA |
| `arcane-crystal` on `cosmic-void` | 12.3:1 | PASS AAA |
| `arcane-fire` on `cosmic-void` | 5.1:1 | PASS AA |
| `arcane-gold` on `cosmic-void` | 11.8:1 | PASS AAA |

---

## 6. Modern Layout Patterns

### 6.1 Bento Grid

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
  <div className="col-span-2 row-span-2 glow-card rounded-2xl p-6">
    {/* Hero card — 2x2 */}
  </div>
  <div className="glow-card rounded-2xl p-6">{/* Standard card */}</div>
  <div className="glow-card rounded-2xl p-6">{/* Standard card */}</div>
  <div className="col-span-2 glow-card rounded-2xl p-6">
    {/* Wide card — 2x1 */}
  </div>
</div>
```

### 6.2 Sticky Section Headers

```tsx
<section>
  <div className="sticky top-16 z-30 glass-strong py-3 px-4 rounded-xl mb-6">
    <h2 className="font-display text-fluid-xl text-white">Section Title</h2>
  </div>
  {/* Section content */}
</section>
```

### 6.3 Container Queries (2026 Native)

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## 7. Next.js 16 Advanced Patterns

### 7.1 Parallel Routes

```
app/
├── design-lab/
│   ├── @modal/          ← Parallel slot for modals
│   │   └── (..)v1/      ← Intercepted route
│   │       └── page.tsx
│   ├── layout.tsx       ← Receives @modal as prop
│   └── page.tsx
```

### 7.2 Streaming with Suspense

```tsx
// Server component with streaming
export default async function Page() {
  return (
    <div>
      <h1>Design Lab</h1>
      <Suspense fallback={<CosmicSkeleton className="h-64 w-full" />}>
        <DesignShowcase />  {/* Streams in when ready */}
      </Suspense>
    </div>
  )
}
```

### 7.3 Server Actions for Interactive Components

```tsx
'use server'

export async function saveDesignPreference(formData: FormData) {
  const theme = formData.get('theme') as string
  await db.preferences.update({ theme })
  revalidatePath('/design-lab')
}
```

---

## 8. v0 Integration Workflow

### 8.1 Generating Components with v0

When using the v0 MCP server to generate components:

**Prompt Template:**
```
Create a [component name] React component using:
- Tailwind CSS with these custom tokens: cosmic-void (#0b0e14), cosmic-deep (#121826), cosmic-surface (#1a2332), arcane-crystal (#7fffd4)
- Dark theme (cosmic-void background)
- Glass morphism: background rgba(18,24,38,0.7), backdrop-filter blur(16px), border 1px solid rgba(127,255,212,0.15)
- Font families: Cinzel (headings), Crimson Pro (body), Inter (UI), JetBrains Mono (code)
- Framer Motion for animations
- TypeScript with proper types
- CVA for variants (crystal, fire, void, gold)
- Radix UI primitives for accessibility
```

### 8.2 Post-Generation Checklist

After v0 generates a component:
1. Replace any raw hex values with Tailwind tokens
2. Add CVA elemental variants if missing
3. Add `forwardRef` and `displayName`
4. Verify focus-visible ring uses arcane-crystal
5. Add reduced motion support
6. Test on mobile viewport (375px)
7. Verify glass tiers match our system

---

## 9. React Three Fiber (3D Web Patterns)

### 9.1 Basic R3F Setup for Arcanea

```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'

function CosmicOrb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#7fffd4"
          emissive="#7fffd4"
          emissiveIntensity={0.3}
          distort={0.3}
          speed={2}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} color="#7fffd4" intensity={0.5} />
      <CosmicOrb />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

### 9.2 Performance Rules

- Mutations in `useFrame`, never in React state
- Use `instancedMesh` for repeated geometries (>100 instances)
- Dispose geometries and materials on unmount
- Use `<Suspense>` for async loading (GLTF models, textures)
- Limit shadow map resolution on mobile

---

## 10. Design System Evolution Checklist

When adding any new component or pattern:

- [ ] Does it use Arcanean tokens (no raw values)?
- [ ] Does it have CVA elemental variants?
- [ ] Does it use compound component pattern if complex?
- [ ] Does it support `asChild` via Radix Slot?
- [ ] Is it accessible (WCAG 2.2 AA)?
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Does it work at 375px viewport width?
- [ ] Does it have proper TypeScript types?
- [ ] Are animations GPU-accelerated (transform/opacity/filter)?
- [ ] Does glass degrade gracefully on mobile?
- [ ] Is there a high-contrast fallback?
- [ ] Is it documented in the Design Lab?

---

*"Master the patterns, then forget them. Let them flow through your work unconsciously."*
