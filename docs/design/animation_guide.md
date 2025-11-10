# Arcanean Animation Guide
## Cosmic Motion & Magical Transitions

---

## Animation Philosophy

Animation in Arcanea breathes life into the interface, transforming static elements into magical, living experiences. Every motion serves purpose: guiding attention, providing feedback, delighting users, and reinforcing the cosmic, creative nature of the platform.

**Core Principles:**

1. **Purposeful Movement** - Never animate for decoration alone
2. **Magical Timing** - Smooth, flowing, natural curves
3. **Light-Based Effects** - Glow, shimmer, illuminate, radiate
4. **Respect Performance** - 60fps target, GPU-accelerated
5. **Honor Accessibility** - Respect `prefers-reduced-motion`

**Animation Personality:**
- Cosmic and fluid (like stars drifting)
- Gentle yet confident (not jarring)
- Responsive and immediate (feedback)
- Delightful but not distracting

---

## Timing & Easing

### Duration Scale

```javascript
const duration = {
  instant:  100,  // Micro-interactions, immediate feedback
  fast:     200,  // Quick transitions, hover states
  normal:   300,  // Standard UI animations
  smooth:   500,  // Card movements, page transitions
  flowing:  800,  // Complex choreography, multi-element
  cosmic:   1200, // Hero animations, page loads
  ambient:  3000, // Background effects, subtle atmosphere
  eternal:  8000  // Infinite loops, cosmic drift
}
```

**Usage Guidelines:**
- **Instant (100ms)**: Hover effects, button press, cursor feedback
- **Fast (200ms)**: Small element transitions, tooltips
- **Normal (300ms)**: Modal open/close, tab switching, standard fade
- **Smooth (500ms)**: Card lifts, drawer slides, larger movements
- **Flowing (800ms)**: Page transitions, multi-step animations
- **Cosmic (1200ms)**: Hero section reveals, major state changes
- **Ambient (3000ms+)**: Glow pulses, background particles, atmosphere

### Easing Functions

```javascript
const easing = {
  // Standard easing
  linear:         'linear',
  easeIn:         'cubic-bezier(0.4, 0, 1, 1)',
  easeOut:        'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut:      'cubic-bezier(0.4, 0, 0.2, 1)',

  // Arcanean custom easing
  magic:          'cubic-bezier(0.34, 1.56, 0.64, 1)',    // Overshoot bounce
  glow:           'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth glow
  cosmic:         'cubic-bezier(0.22, 1, 0.36, 1)',       // Gentle ease
  luminor:        'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Playful bounce

  // Specialized
  springGentle:   'cubic-bezier(0.5, 1.5, 0.5, 1)',      // Gentle spring
  springBounce:   'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy spring
}
```

**When to Use Each:**
- **Linear**: Progress bars, loading indicators
- **EaseOut**: Elements entering the scene
- **EaseIn**: Elements leaving the scene
- **EaseInOut**: Transitions between states
- **Magic**: Special moments, creation events, celebrations
- **Glow**: Pulsing effects, shimmer, light effects
- **Cosmic**: Large movements, page transitions
- **Luminor**: AI companion interactions, playful moments

---

## Core Animation Patterns

### Fade Animations

**Fade In**
```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fade-in 300ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
```

**Fade Out**
```css
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-out {
  animation: fade-out 200ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
```

**Cross Fade**
```css
.cross-fade-enter {
  opacity: 0;
  animation: fade-in 400ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.cross-fade-exit {
  opacity: 1;
  animation: fade-out 300ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
```

---

### Slide Animations

**Slide In (from bottom)**
```css
@keyframes slide-in-bottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slide-in-bottom 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

**Slide In (from right)**
```css
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Slide Out**
```css
@keyframes slide-out-bottom {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

---

### Scale Animations

**Scale In (modal/popup appearance)**
```css
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-enter {
  animation: scale-in 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

**Scale Out**
```css
@keyframes scale-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

**Pulse Scale (attention grabber)**
```css
@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse-scale 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
```

---

## Magical Effects

### Glow Animations

**Luminor Glow (AI companion presence)**
```css
@keyframes luminor-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(var(--luminor-color), 0.3),
                0 0 40px rgba(var(--luminor-color), 0.15);
  }
  50% {
    box-shadow: 0 0 30px rgba(var(--luminor-color), 0.5),
                0 0 60px rgba(var(--luminor-color), 0.25);
  }
}

.luminor-presence {
  animation: luminor-glow 3s ease-in-out infinite;
}
```

**Cosmic Glow (ambient background)**
```css
@keyframes cosmic-glow {
  0%, 100% {
    box-shadow: 0 0 40px rgba(91, 139, 217, 0.2),
                0 0 80px rgba(91, 139, 217, 0.1);
  }
  50% {
    box-shadow: 0 0 60px rgba(91, 139, 217, 0.3),
                0 0 120px rgba(91, 139, 217, 0.15);
  }
}

.cosmic-ambient {
  animation: cosmic-glow 8s ease-in-out infinite;
}
```

**Essence Glow (created content)**
```css
@keyframes essence-glow {
  0% {
    filter: drop-shadow(0 0 8px rgba(var(--academy-color), 0.3));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(var(--academy-color), 0.5));
  }
  100% {
    filter: drop-shadow(0 0 8px rgba(var(--academy-color), 0.3));
  }
}

.essence-card {
  animation: essence-glow 4s ease-in-out infinite;
}
```

---

### Shimmer & Sparkle

**Shimmer Effect (loading, processing)**
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    rgba(91, 139, 217, 0) 0%,
    rgba(91, 139, 217, 0.2) 50%,
    rgba(91, 139, 217, 0) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s ease-in-out infinite;
}
```

**Sparkle Burst (creation moment)**
```css
@keyframes sparkle-burst {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) rotate(360deg);
  }
}

.sparkle {
  animation: sparkle-burst 800ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

**Light Ray Sweep**
```css
@keyframes light-sweep {
  0% {
    transform: translateX(-100%) skewX(-20deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) skewX(-20deg);
    opacity: 0;
  }
}

.light-ray {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: light-sweep 2s ease-in-out;
}
```

---

### Particle Effects

**Cosmic Drift (floating particles)**
```css
@keyframes cosmic-drift {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

.particle {
  animation: cosmic-drift 20s ease-in-out infinite;
}

/* Stagger particles for natural movement */
.particle:nth-child(2) { animation-delay: -5s; }
.particle:nth-child(3) { animation-delay: -10s; }
.particle:nth-child(4) { animation-delay: -15s; }
```

**Star Twinkle**
```css
@keyframes star-twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.star {
  animation: star-twinkle 3s ease-in-out infinite;
  animation-delay: calc(var(--star-index) * 0.3s);
}
```

**Energy Wave (creation energy)**
```css
@keyframes energy-wave {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.energy-wave {
  position: absolute;
  border: 2px solid var(--academy-color);
  border-radius: 50%;
  animation: energy-wave 2s ease-out infinite;
}
```

---

### Academy-Specific Animations

**Atlantean - Water Flow**
```css
@keyframes water-flow {
  0% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(-10px) scaleY(1.05);
  }
  100% {
    transform: translateY(0) scaleY(1);
  }
}

.atlantean-flow {
  animation: water-flow 4s ease-in-out infinite;
}

/* Ripple effect */
@keyframes water-ripple {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.ripple {
  animation: water-ripple 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

**Draconic - Fire Flicker**
```css
@keyframes fire-flicker {
  0%, 100% {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
  25% {
    opacity: 0.9;
    transform: scaleY(1.05) translateY(-2px);
  }
  50% {
    opacity: 1;
    transform: scaleY(0.98) translateY(2px);
  }
  75% {
    opacity: 0.95;
    transform: scaleY(1.02) translateY(-1px);
  }
}

.draconic-flame {
  animation: fire-flicker 2s ease-in-out infinite;
}

/* Wing Sweep */
@keyframes wing-sweep {
  0% {
    transform: rotateY(0deg) translateX(0);
  }
  50% {
    transform: rotateY(15deg) translateX(10px);
  }
  100% {
    transform: rotateY(0deg) translateX(0);
  }
}

.dragon-wing {
  animation: wing-sweep 3s ease-in-out infinite;
}
```

**Creation & Light - Prismatic Shift**
```css
@keyframes prismatic-shift {
  0% {
    filter: hue-rotate(0deg) brightness(1);
  }
  25% {
    filter: hue-rotate(90deg) brightness(1.1);
  }
  50% {
    filter: hue-rotate(180deg) brightness(1);
  }
  75% {
    filter: hue-rotate(270deg) brightness(1.1);
  }
  100% {
    filter: hue-rotate(360deg) brightness(1);
  }
}

.prismatic-element {
  animation: prismatic-shift 6s linear infinite;
}

/* Light Pulse */
@keyframes light-pulse {
  0%, 100% {
    opacity: 0.8;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.6),
                0 0 60px rgba(255, 215, 0, 0.3);
  }
}

.creation-light {
  animation: light-pulse 2s ease-in-out infinite;
}
```

---

## Interaction Animations

### Hover States

**Button Lift**
```css
.btn {
  transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(91, 139, 217, 0.35),
              0 0 32px rgba(91, 139, 217, 0.2);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(91, 139, 217, 0.3);
}
```

**Card Hover**
```css
.card {
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(91, 139, 217, 0.25),
              0 0 64px rgba(91, 139, 217, 0.15);
}
```

**Link Underline**
```css
.link {
  position: relative;
  text-decoration: none;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.link:hover::after {
  width: 100%;
}
```

---

### Click/Tap Feedback

**Button Press**
```css
@keyframes button-press {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.btn:active {
  animation: button-press 200ms ease;
}
```

**Ripple Effect (Material-style)**
```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  animation: ripple 600ms ease-out;
}
```

---

### Loading States

**Spinner**
```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(91, 139, 217, 0.2);
  border-top-color: #5c8bd9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

**Cosmic Loader (particles orbiting)**
```css
@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(30px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(30px) rotate(-360deg);
  }
}

.cosmic-loader .particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #5c8bd9;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(91, 139, 217, 0.8);
  animation: orbit 2s linear infinite;
}

.cosmic-loader .particle:nth-child(2) {
  animation-delay: -0.5s;
}

.cosmic-loader .particle:nth-child(3) {
  animation-delay: -1s;
}

.cosmic-loader .particle:nth-child(4) {
  animation-delay: -1.5s;
}
```

**Progress Bar Fill**
```css
@keyframes progress-fill {
  from {
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    transform: scaleX(var(--progress));
    transform-origin: left;
  }
}

.progress-bar-fill {
  animation: progress-fill 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

**Skeleton Loading**
```css
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(91, 139, 217, 0.1) 25%,
    rgba(91, 139, 217, 0.2) 50%,
    rgba(91, 139, 217, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 2s ease-in-out infinite;
}
```

---

## Page Transitions

### Route Changes

**Page Enter**
```css
.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 500ms cubic-bezier(0.22, 1, 0.36, 1);
}

.page-exit {
  opacity: 1;
}

.page-exit-active {
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0.4, 0, 1, 1);
}
```

**Slide Transition (between pages)**
```css
.slide-enter {
  transform: translateX(100%);
}

.slide-enter-active {
  transform: translateX(0);
  transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-exit {
  transform: translateX(0);
}

.slide-exit-active {
  transform: translateX(-100%);
  transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

### Modal Transitions

**Modal Appear**
```css
.modal-backdrop-enter {
  opacity: 0;
}

.modal-backdrop-enter-active {
  opacity: 1;
  transition: opacity 300ms ease;
}

.modal-content-enter {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-content-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Micro-Interactions

### Toggle Switch
```css
@keyframes toggle-slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(20px);
  }
}

.toggle-thumb {
  transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
}

.toggle[data-state="checked"] .toggle-thumb {
  transform: translateX(20px);
}
```

### Checkbox Check
```css
@keyframes check-mark {
  0% {
    stroke-dashoffset: 20;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.checkbox-checkmark {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
}

.checkbox[data-state="checked"] .checkbox-checkmark {
  animation: check-mark 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

### Counter Increment
```css
@keyframes count-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.counter-digit {
  animation: count-up 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Special Event Animations

### Essence Creation Complete

```css
@keyframes creation-complete {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  30% {
    transform: scale(1.2);
    opacity: 1;
  }
  50% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.creation-complete {
  animation: creation-complete 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Accompanying particle burst */
@keyframes particle-burst {
  0% {
    transform: scale(0) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1) translate(
      calc(var(--x) * 100px),
      calc(var(--y) * 100px)
    );
    opacity: 0;
  }
}
```

### Remix Connection

```css
@keyframes remix-connect {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.remix-line {
  stroke-dasharray: 100;
  animation: remix-connect 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

### Level Up / Achievement

```css
@keyframes achievement-appear {
  0% {
    transform: translateY(-100%) scale(0);
    opacity: 0;
  }
  40% {
    transform: translateY(10%) scale(1.1);
    opacity: 1;
  }
  60% {
    transform: translateY(0) scale(0.95);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.achievement-badge {
  animation: achievement-appear 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Performance Optimization

### GPU Acceleration

Use GPU-accelerated properties for smooth 60fps:
```css
/* ✅ GPU-accelerated (performant) */
transform: translate3d(0, 0, 0);
transform: translateX(10px);
transform: translateY(10px);
transform: scale(1.2);
transform: rotate(45deg);
opacity: 0.5;

/* ❌ Avoid (causes repaints) */
top: 10px;
left: 10px;
width: 100px;
height: 100px;
margin: 10px;
```

### Will-Change Optimization

```css
/* Apply before animation starts */
.element-about-to-animate {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.element-animation-done {
  will-change: auto;
}
```

### Reduce Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Keep essential feedback */
  .essential-feedback {
    transition: opacity 150ms ease;
  }
}
```

---

## Animation Choreography

### Staggered Lists

```javascript
// React example with Framer Motion
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={item}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### Sequential Animations

```css
.sequence-1 {
  animation: fade-in 300ms ease 0ms forwards;
}

.sequence-2 {
  animation: fade-in 300ms ease 100ms forwards;
}

.sequence-3 {
  animation: fade-in 300ms ease 200ms forwards;
}

.sequence-4 {
  animation: fade-in 300ms ease 300ms forwards;
}
```

---

## Implementation Examples

### Framer Motion (React)

```tsx
import { motion } from 'framer-motion';

// Button with magical hover
<motion.button
  whileHover={{
    scale: 1.05,
    y: -2,
    boxShadow: '0 8px 32px rgba(91, 139, 217, 0.35)'
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  Create Essence
</motion.button>

// Staggered cards
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

<motion.div variants={container} initial="hidden" animate="show">
  {cards.map(card => (
    <motion.div
      key={card.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      <Card {...card} />
    </motion.div>
  ))}
</motion.div>
```

### CSS Keyframe Library

```css
/* Import into global styles */
@import './animations/cosmic-effects.css';
@import './animations/luminor-interactions.css';
@import './animations/academy-themes.css';
@import './animations/transitions.css';

/* Use with utility classes */
.animate-fade-in { animation: fade-in 300ms ease forwards; }
.animate-slide-in { animation: slide-in 400ms cosmic forwards; }
.animate-glow { animation: cosmic-glow 3s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
```

---

## Animation Checklist

Before shipping any animation:

- [ ] Runs at 60fps on target devices
- [ ] Duration feels natural (not too fast/slow)
- [ ] Easing curve matches motion type
- [ ] GPU-accelerated properties used
- [ ] `will-change` added/removed appropriately
- [ ] `prefers-reduced-motion` respected
- [ ] Doesn't block user interaction
- [ ] Serves a functional purpose
- [ ] Enhances rather than distracts
- [ ] Consistent with Arcanean style

---

## Quick Reference

**Durations**: Instant(100ms) → Fast(200ms) → Normal(300ms) → Smooth(500ms) → Flowing(800ms) → Cosmic(1200ms)

**Easing**: magic, glow, cosmic, luminor

**Effects**: Glow, Shimmer, Sparkle, Drift, Flow, Flicker, Pulse

**Interactions**: Hover lift, Press scale, Ripple, Underline

**Academy**: Atlantean (flow/ripple), Draconic (fire/wing), Creation (prism/light)

---

**"Motion is the breath of magic. Animate with purpose, delight with subtlety."**
