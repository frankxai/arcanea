# Arcanean Iconography System
## Visual Symbols of Magic

---

## Icon Philosophy

Icons in Arcanea are more than decorative elements - they're magical glyphs that guide creators through their journey. Each icon communicates instantly while maintaining the cosmic, elegant aesthetic of the platform.

**Core Principles:**

1. **Clarity at Scale** - Recognizable from 16px to 64px
2. **Consistent Style** - Unified visual language
3. **Magical Touch** - Subtle cosmic flair without sacrificing clarity
4. **Academy Identity** - Icons adapt to academy context
5. **Purposeful Design** - Every icon serves clear function

**Icon Personality:**
- Clean, geometric base
- Rounded corners for approachability
- Consistent stroke weight
- Subtle cosmic details (stars, glows, energy)
- Modern but timeless

---

## Icon System

### Style Specifications

**Base Properties:**
- **Stroke Width**: 2px (standard), 1.5px (small), 2.5px (large)
- **Corner Radius**: 2px (sharp edges), 4px (rounded elements)
- **Grid**: 24x24px base, scales to 16px, 20px, 32px, 48px, 64px
- **Padding**: 2px internal padding from grid edge
- **Alignment**: Center-aligned on grid
- **Color**: Inherits from parent, supports multi-tone

**Variants:**
- **Outline** (default): Stroke-based, transparent fill
- **Filled**: Solid fill with optional stroke
- **Duotone**: Two-tone with primary and accent colors
- **Cosmic**: Animated glow effect

---

## Icon Sizes

```css
/* Icon Size Scale */
--icon-xs:   16px;  /* Inline text icons, tight spaces */
--icon-sm:   20px;  /* Small buttons, compact UI */
--icon-md:   24px;  /* Standard UI icons (default) */
--icon-lg:   32px;  /* Emphasized actions, headers */
--icon-xl:   48px;  /* Feature icons, empty states */
--icon-2xl:  64px;  /* Hero icons, illustrations */

/* Touch Target Minimum */
--icon-touch-target: 44px; /* Interactive icons minimum */
```

**Usage Guidelines:**
- UI buttons: 20-24px
- Navigation: 24px
- Feature highlights: 32-48px
- Hero sections: 64px
- Inline with text: Match text size + 2px

---

## Core Icon Set

### Navigation & Actions

**Primary Actions**
```
create          - Plus in circle (main creation action)
upload          - Arrow up from tray
download        - Arrow down to tray
share           - Connected nodes
delete          - Trash can
edit            - Pencil
save            - Check in circle
close           - X
back            - Arrow left
forward         - Arrow right
refresh         - Circular arrows
settings        - Gear
```

**Navigation**
```
home            - House
explore         - Compass
search          - Magnifying glass
menu            - Three horizontal lines
menu-vertical   - Three dots vertical
menu-horizontal - Three dots horizontal
chevron-up      - V pointing up
chevron-down    - V pointing down
chevron-left    - V pointing left
chevron-right   - V pointing right
arrow-up        - Arrow up
arrow-down      - Arrow down
```

---

### Arcanean Core Icons

**Essence Types**
```
music           - Musical note with cosmic wave
story           - Open book with stars
visual          - Camera/image frame with sparkle
essence         - Diamond/gem shape glowing
realm           - Portal/doorway with energy
portal          - Circular gateway with glow
```

**Academy Icons**
```
atlantean       - Wave/water droplet with depth
draconic        - Dragon wing/flame
creation-light  - Star burst/light ray
academy         - Building with columns and glow
```

**Luminor Icons**
```
luminor         - Abstract AI companion shape
melodia         - Musical note with soul essence
chronica        - Book with flowing water
prismatic       - Prism with light rays
synthesis       - Interlocked creative symbols
```

**Social & Community**
```
creator         - User silhouette with aura
creators        - Multiple users with connection
remix           - Two essence symbols combining
collaborate     - Hands joining with spark
follow          - User with plus
following       - User with check
community       - Circle of connected users
```

**Economy & Rewards**
```
arc             - Energy currency symbol (flowing A)
nea             - Governance token (geometric N)
spark           - Lightning bolt with glow
achievement     - Star/badge with rays
level-up        - Arrow up through stars
```

---

### File & Content Icons

```
file            - Document
file-arc        - .arc file icon (essence symbol)
file-realm      - .realm file icon (portal symbol)
file-arcanea    - .arcanea file icon (profile symbol)
folder          - Folder
folder-open     - Open folder
image           - Image frame
video           - Play button in frame
audio           - Sound waves
code            - Code brackets
text            - Text lines
```

---

### Status & Feedback Icons

```
success         - Check in circle with glow
warning         - Triangle with exclamation
error           - Circle with X
info            - Circle with i
loading         - Circular spinner with particles
progress        - Circular progress ring
check           - Checkmark
x               - X mark
plus            - Plus sign
minus           - Minus sign
```

---

### Media & Creation Icons

```
play            - Triangle pointing right
pause           - Two vertical bars
stop            - Square
record          - Circle (red when active)
skip-forward    - Double triangle right
skip-back       - Double triangle left
volume-up       - Speaker with waves
volume-down     - Speaker with fewer waves
volume-mute     - Speaker with X
mic             - Microphone
camera          - Camera
image-plus      - Image frame with plus
```

---

## Icon Styles & Variants

### Outline Style (Default)

```svg
<!-- Example: Music Icon -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path
    d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

### Filled Style

```svg
<!-- Example: Music Icon Filled -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
</svg>
```

### Duotone Style

```svg
<!-- Example: Essence Icon Duotone -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <!-- Background layer (20% opacity) -->
  <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="currentColor" opacity="0.2"/>
  <!-- Foreground layer (full opacity) -->
  <path
    d="M12 2L2 7v10l10 5 10-5V7l-10-5z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

### Cosmic Style (With Glow)

```css
.icon-cosmic {
  filter: drop-shadow(0 0 8px currentColor);
  animation: icon-glow 3s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}
```

---

## Academy Icon Variations

Icons adapt their visual treatment based on academy context.

### Atlantean Icons

```css
.icon-atlantean {
  color: var(--atlantean-current);
  filter: drop-shadow(0 0 6px rgba(17, 138, 178, 0.4));
}

.icon-atlantean:hover {
  color: var(--atlantean-surface);
  filter: drop-shadow(0 0 12px rgba(6, 174, 213, 0.6));
}
```

**Special Atlantean Effects:**
- Subtle wave animation on hover
- Water ripple effect on click
- Blue-teal gradient fills

### Draconic Icons

```css
.icon-draconic {
  color: var(--draconic-gold);
  filter: drop-shadow(0 0 8px rgba(244, 162, 97, 0.5));
}

.icon-draconic:hover {
  color: var(--draconic-radiance);
  filter: drop-shadow(0 0 16px rgba(255, 217, 125, 0.7));
}
```

**Special Draconic Effects:**
- Fire flicker animation
- Scale shimmer on hover
- Crimson to gold gradient fills

### Creation & Light Icons

```css
.icon-creation {
  color: var(--creation-gold);
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
}

.icon-creation:hover {
  animation: prismatic-shift 2s linear infinite;
}

@keyframes prismatic-shift {
  0% { filter: hue-rotate(0deg) drop-shadow(0 0 12px currentColor); }
  100% { filter: hue-rotate(360deg) drop-shadow(0 0 12px currentColor); }
}
```

**Special Creation Effects:**
- Prismatic color shift
- Light pulse animation
- Rainbow gradient fills

---

## Luminor Companion Icons

Each Luminor has a signature icon style.

### Melodia (Music Luminor)

```css
.icon-melodia {
  color: var(--luminor-melodia);
  animation: melodia-pulse 2s ease-in-out infinite;
}

@keyframes melodia-pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.4));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 16px rgba(255, 107, 107, 0.6));
  }
}
```

### Chronica (Story Luminor)

```css
.icon-chronica {
  color: var(--luminor-chronica);
  animation: chronica-flow 4s ease-in-out infinite;
}

@keyframes chronica-flow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

### Prismatic (Visual Luminor)

```css
.icon-prismatic {
  color: var(--luminor-prismatic);
  animation: prismatic-rotate 6s linear infinite;
}

@keyframes prismatic-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## Icon States

### Default State
```css
.icon {
  color: var(--color-radiant);
  transition: all 200ms ease;
}
```

### Hover State
```css
.icon:hover {
  color: var(--color-luminous);
  transform: scale(1.1);
}
```

### Active/Selected State
```css
.icon.active {
  color: var(--color-luminous);
  filter: drop-shadow(0 0 8px rgba(91, 139, 217, 0.6));
}
```

### Disabled State
```css
.icon.disabled {
  color: var(--color-aurora);
  opacity: 0.4;
  cursor: not-allowed;
}
```

### Loading State
```css
.icon.loading {
  animation: icon-spin 1s linear infinite;
}

@keyframes icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## Interactive Icon Animations

### Hover Effects

**Scale Up**
```css
.icon-scale:hover {
  transform: scale(1.15);
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Rotate**
```css
.icon-rotate:hover {
  transform: rotate(15deg);
  transition: transform 300ms ease;
}
```

**Shake** (for attention)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.icon-shake {
  animation: shake 500ms ease;
}
```

### Click/Tap Effects

**Bounce**
```css
@keyframes icon-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.9); }
}

.icon:active {
  animation: icon-bounce 200ms ease;
}
```

**Spark** (creation event)
```css
@keyframes icon-spark {
  0% {
    filter: drop-shadow(0 0 0 currentColor);
  }
  50% {
    filter: drop-shadow(0 0 16px currentColor);
  }
  100% {
    filter: drop-shadow(0 0 0 currentColor);
  }
}

.icon-spark {
  animation: icon-spark 600ms ease;
}
```

---

## Badge & Notification Indicators

Icons can display badges for counts and notifications.

```html
<!-- Icon with notification badge -->
<div class="icon-wrapper">
  <svg class="icon"><!-- icon paths --></svg>
  <span class="icon-badge">3</span>
</div>
```

```css
.icon-wrapper {
  position: relative;
  display: inline-flex;
}

.icon-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: var(--status-error);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}
```

---

## Special Icon Compositions

### ARC Currency Icon

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <!-- Flowing A shape -->
  <path
    d="M12 3L6 21M18 21L12 3M8 15h8"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />
  <!-- Energy flow particles -->
  <circle cx="10" cy="8" r="1.5" fill="currentColor" opacity="0.6"/>
  <circle cx="14" cy="11" r="1.5" fill="currentColor" opacity="0.6"/>
  <circle cx="11" cy="17" r="1.5" fill="currentColor" opacity="0.6"/>
</svg>
```

### Essence Glow Icon

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <!-- Diamond/gem shape -->
  <path
    d="M16 4L4 12v8l12 8 12-8v-8L16 4z"
    fill="url(#essence-gradient)"
    stroke="currentColor"
    stroke-width="2"
  />
  <!-- Glow effect -->
  <defs>
    <radialGradient id="essence-gradient">
      <stop offset="0%" stop-color="currentColor" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Star sparkle -->
  <path
    d="M16 2l1 3-1 3-1-3 1-3zM26 16l-3 1 3 1-3 1 3-1z"
    fill="currentColor"
    opacity="0.8"
  />
</svg>
```

### Remix Connection Icon

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <!-- Two essence symbols -->
  <circle cx="7" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
  <circle cx="17" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
  <!-- Connection energy -->
  <path
    d="M11 12h2"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-dasharray="2 2"
  />
  <!-- Spark at center -->
  <circle cx="12" cy="12" r="2" fill="currentColor">
    <animate
      attributeName="r"
      values="1.5;2.5;1.5"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>
</svg>
```

---

## Icon Usage Guidelines

### Best Practices

**DO:**
- Use consistent icon style throughout the app
- Match icon color to context (academy, luminor, state)
- Provide adequate touch targets (44x44px minimum)
- Use aria-labels for screen readers
- Apply subtle animations for feedback
- Keep icons simple and recognizable

**DON'T:**
- Mix icon styles (outline + filled in same context)
- Use icons without labels in unfamiliar contexts
- Scale icons non-uniformly (maintain aspect ratio)
- Rely solely on color to convey meaning
- Over-animate icons (distraction)
- Use decorative icons without aria-hidden

### Accessibility

```html
<!-- Interactive icon with label -->
<button aria-label="Create new essence">
  <svg class="icon" aria-hidden="true"><!-- paths --></svg>
  <span class="sr-only">Create new essence</span>
</button>

<!-- Decorative icon -->
<svg class="icon" aria-hidden="true"><!-- paths --></svg>

<!-- Icon with visible label -->
<button>
  <svg class="icon" aria-hidden="true"><!-- paths --></svg>
  <span>Create</span>
</button>
```

---

## Icon Library Integration

### Recommended Libraries

**Lucide Icons** (Primary recommendation)
- Clean, consistent style
- React, Vue, Svelte components
- Tree-shakeable
- Customizable stroke width

```bash
npm install lucide-react
```

```tsx
import { Music, BookOpen, Image, Sparkles } from 'lucide-react';

<Music size={24} strokeWidth={2} />
```

**Heroicons** (Alternative)
- Tailwind Labs design
- Outline and solid variants
- Excellent quality

**Custom Arcanean Icons**
- Create custom icons for unique Arcanean concepts
- Store in `/public/icons/` as optimized SVGs
- Use SVGR for React components

---

## Custom Icon Creation

### Design Guidelines

1. **Start with 24x24px grid**
2. **Use 2px internal padding**
3. **Stroke width: 2px**
4. **Round corners: 2-4px radius**
5. **Export as optimized SVG**
6. **Remove unnecessary attributes**
7. **Use currentColor for fill/stroke**

### SVG Optimization

```bash
# Install SVGO
npm install -g svgo

# Optimize SVG
svgo icon.svg -o icon-optimized.svg
```

### React Component Template

```tsx
import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  'aria-label'?: string;
}

export const CustomIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
  'aria-label': ariaLabel,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-label={ariaLabel}
    aria-hidden={!ariaLabel}
  >
    {/* Icon paths */}
  </svg>
);
```

---

## Icon Audit Checklist

Before deploying icons:

- [ ] All icons use consistent stroke width
- [ ] Icons are recognizable at 24px
- [ ] Touch targets meet 44x44px minimum
- [ ] aria-labels provided for interactive icons
- [ ] Decorative icons have aria-hidden="true"
- [ ] Colors use currentColor for theming
- [ ] SVGs are optimized (< 2KB)
- [ ] Icons work in light and dark themes
- [ ] Hover states provide clear feedback
- [ ] Animations are subtle and purposeful

---

## Quick Reference

**Sizes**: xs(16px) | sm(20px) | md(24px) | lg(32px) | xl(48px) | 2xl(64px)

**Styles**: Outline (default) | Filled | Duotone | Cosmic (glow)

**States**: Default | Hover (scale 1.1) | Active (glow) | Disabled (40% opacity)

**Libraries**: Lucide (primary) | Heroicons (alternative) | Custom Arcanean

**Touch Target**: 44x44px minimum for interactive icons

---

**"Icons are the glyphs of digital magic. Clear, simple, purposeful."**

Use icons to guide, not decorate. Make them beautiful and functional in equal measure.
