# Arcanean Responsive Design
## Magical Experiences Across All Devices

---

## Responsive Philosophy

Arcanea adapts beautifully to every device, from mobile phones to ultrawide displays. The magical experience remains consistent while the interface optimizes for each context - touch vs mouse, portrait vs landscape, small screen vs expansive canvas.

**Core Principles:**

1. **Mobile-First Foundation** - Design starts with constraints, enhances progressively
2. **Content Priority** - Essential magic accessible everywhere, advanced features scale up
3. **Touch-Friendly Always** - Every interaction sized for fingers, enhanced for precision
4. **Performance Conscious** - Lighter experiences on mobile, richer on desktop
5. **Context-Aware** - Adapt to how creators actually use each device

**Design Approach:**
- Mobile: Single column, stacked, essential features
- Tablet: Two-column, side panels, more simultaneous content
- Desktop: Multi-column, floating panels, full feature set
- Ultrawide: Advanced layouts, multiple workspaces

---

## Breakpoints

### Breakpoint System

```css
/* Mobile First Breakpoints */
--breakpoint-xs:   0px;      /* Mobile small (iPhone SE) */
--breakpoint-sm:   640px;    /* Mobile large (iPhone 14 Pro) */
--breakpoint-md:   768px;    /* Tablet portrait (iPad) */
--breakpoint-lg:   1024px;   /* Tablet landscape / Desktop small */
--breakpoint-xl:   1280px;   /* Desktop */
--breakpoint-2xl:  1536px;   /* Desktop large */
--breakpoint-3xl:  1920px;   /* Ultrawide */
```

**Device Mapping:**
```
xs  (0-639px):     iPhone SE, small phones
sm  (640-767px):   iPhone 14 Pro, standard phones
md  (768-1023px):  iPad portrait, small tablets
lg  (1024-1279px): iPad landscape, laptop (13")
xl  (1280-1535px): Desktop (15-24")
2xl (1536-1919px): Desktop large (27"+)
3xl (1920px+):     Ultrawide displays
```

### Media Queries

```css
/* Mobile Small (default) */
/* No media query needed - mobile first */

/* Mobile Large */
@media (min-width: 640px) {
  /* Slightly larger typography, more padding */
}

/* Tablet Portrait */
@media (min-width: 768px) {
  /* Two-column layouts, side navigation visible */
}

/* Tablet Landscape / Desktop Small */
@media (min-width: 1024px) {
  /* Multi-column, floating panels, advanced features */
}

/* Desktop */
@media (min-width: 1280px) {
  /* Full feature set, optimal spacing */
}

/* Desktop Large */
@media (min-width: 1536px) {
  /* Spacious layouts, max content width applied */
}

/* Ultrawide */
@media (min-width: 1920px) {
  /* Advanced multi-workspace layouts */
}
```

---

## Layout Strategies

### Mobile Layout (0-767px)

**Characteristics:**
- Single column stacking
- Full-width components
- Bottom navigation
- Hamburger menu
- Collapsible sections
- Swipe gestures
- Vertical scrolling primary

**Layout Structure:**
```html
<div class="mobile-layout">
  <!-- Top Bar (fixed) -->
  <header class="mobile-header">
    <button class="menu-toggle">☰</button>
    <h1 class="logo">Arcanea</h1>
    <button class="profile-button">👤</button>
  </header>

  <!-- Main Content (scrollable) -->
  <main class="mobile-main">
    <!-- Content stacks vertically -->
  </main>

  <!-- Bottom Navigation (fixed) -->
  <nav class="mobile-nav">
    <button>Home</button>
    <button>Create</button>
    <button>Explore</button>
    <button>Realm</button>
  </nav>
</div>
```

**Mobile Considerations:**
- Minimum touch target: 44x44px
- Thumb-zone optimization (bottom 60% of screen)
- Single-column forms
- Accordions for content organization
- Sticky CTAs within reach
- Reduced motion on low-power mode

---

### Tablet Layout (768-1023px)

**Characteristics:**
- Two-column layouts
- Side navigation drawer (can be permanent)
- Floating action buttons
- Grid layouts (2-3 columns)
- More simultaneous content
- Both portrait and landscape modes

**Layout Structure:**
```html
<div class="tablet-layout">
  <!-- Side Navigation (slide-out or permanent) -->
  <aside class="tablet-sidebar">
    <nav><!-- Navigation --></nav>
  </aside>

  <!-- Main Content Area -->
  <div class="tablet-content">
    <!-- Top Bar -->
    <header class="tablet-header">
      <!-- Breadcrumbs, search, actions -->
    </header>

    <!-- Content Grid -->
    <main class="tablet-main">
      <!-- 2-3 column grid layouts -->
    </main>
  </div>
</div>
```

**Tablet Considerations:**
- Portrait: 2-column max, vertical scrolling
- Landscape: 3-column, horizontal panels
- Larger touch targets still important
- Hover states start to matter
- Picture-in-picture capabilities
- Split-screen support

---

### Desktop Layout (1024px+)

**Characteristics:**
- Multi-column layouts (3-4 columns)
- Persistent navigation
- Floating panels and modals
- Hover interactions rich
- Keyboard shortcuts important
- Mouse precision interactions

**Layout Structure:**
```html
<div class="desktop-layout">
  <!-- Top Navigation Bar (fixed) -->
  <header class="desktop-header">
    <nav class="main-nav"><!-- Primary navigation --></nav>
  </header>

  <!-- Main Container -->
  <div class="desktop-container">
    <!-- Left Sidebar (persistent) -->
    <aside class="desktop-sidebar-left">
      <!-- Secondary navigation, tools -->
    </aside>

    <!-- Main Content Area -->
    <main class="desktop-main">
      <!-- Primary content, multi-column grids -->
    </main>

    <!-- Right Sidebar (optional, contextual) -->
    <aside class="desktop-sidebar-right">
      <!-- Luminor assistance, metadata -->
    </aside>
  </div>
</div>
```

**Desktop Considerations:**
- Optimal line length: 680px
- Maximum content width: 1440px
- Centered with side margins
- Hover states fully utilized
- Keyboard navigation essential
- Multi-monitor support
- Advanced tooltips and popovers

---

## Component Adaptations

### Navigation

**Mobile (< 768px):**
```html
<!-- Hamburger menu + bottom nav -->
<nav class="mobile-bottom-nav">
  <a href="/home">
    <HomeIcon />
    <span>Home</span>
  </a>
  <a href="/create">
    <CreateIcon />
    <span>Create</span>
  </a>
  <a href="/explore">
    <ExploreIcon />
    <span>Explore</span>
  </a>
  <a href="/realm">
    <RealmIcon />
    <span>Realm</span>
  </a>
</nav>
```

**Tablet (768-1023px):**
```html
<!-- Slide-out drawer or compact sidebar -->
<aside class="tablet-sidebar">
  <nav>
    <a href="/home">
      <HomeIcon />
      <span>Home</span>
    </a>
    <!-- More nav items -->
  </nav>
</aside>
```

**Desktop (1024px+):**
```html
<!-- Full persistent sidebar or top nav -->
<aside class="desktop-sidebar">
  <nav>
    <a href="/home">
      <HomeIcon />
      <span>Home</span>
    </a>
    <!-- Nested sections, expanded items -->
  </nav>
</aside>
```

---

### Cards

**Mobile:**
```css
.essence-card {
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
}

.essence-card-image {
  width: 100%;
  aspect-ratio: 16/9;
}

.essence-card-content {
  /* Stack vertically */
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

**Tablet:**
```css
@media (min-width: 768px) {
  .essence-card {
    width: calc(50% - 12px); /* 2-column grid */
  }
}

@media (min-width: 1024px) and (orientation: landscape) {
  .essence-card {
    width: calc(33.333% - 16px); /* 3-column grid */
  }
}
```

**Desktop:**
```css
@media (min-width: 1280px) {
  .essence-card {
    width: calc(25% - 18px); /* 4-column grid */
  }

  .essence-card:hover {
    transform: translateY(-8px) scale(1.02);
  }
}
```

---

### Forms

**Mobile:**
```html
<form class="mobile-form">
  <!-- Full-width inputs, stacked -->
  <div class="form-field">
    <label for="title">Title</label>
    <input id="title" type="text" />
  </div>

  <div class="form-field">
    <label for="description">Description</label>
    <textarea id="description" rows="4"></textarea>
  </div>

  <!-- Full-width buttons -->
  <button type="submit" class="btn-full-width">
    Create Essence
  </button>
</form>
```

**Desktop:**
```html
<form class="desktop-form">
  <!-- Multi-column layout -->
  <div class="form-row">
    <div class="form-field">
      <label for="title">Title</label>
      <input id="title" type="text" />
    </div>

    <div class="form-field">
      <label for="academy">Academy</label>
      <select id="academy">...</select>
    </div>
  </div>

  <div class="form-field">
    <label for="description">Description</label>
    <textarea id="description" rows="6"></textarea>
  </div>

  <!-- Button group, right-aligned -->
  <div class="form-actions">
    <button type="button" class="btn-secondary">Cancel</button>
    <button type="submit" class="btn-primary">Create Essence</button>
  </div>
</form>
```

---

### Modals

**Mobile:**
```css
.modal {
  /* Full-screen on mobile */
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.modal-content {
  overflow-y: auto;
  height: 100%;
}
```

**Tablet & Desktop:**
```css
@media (min-width: 768px) {
  .modal {
    /* Centered dialog */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 600px;
    height: auto;
    max-height: 90vh;
    border-radius: 16px;
  }
}
```

---

## Grid Systems

### Mobile Grid (Single Column)

```css
.grid-mobile {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
}
```

### Tablet Grid (2-3 Columns)

```css
@media (min-width: 768px) {
  .grid-tablet {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 24px;
  }
}

@media (min-width: 1024px) and (orientation: landscape) {
  .grid-tablet {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Desktop Grid (4+ Columns)

```css
@media (min-width: 1280px) {
  .grid-desktop {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    padding: 32px;
    max-width: 1440px;
    margin: 0 auto;
  }
}
```

### Masonry Grid (Variable Heights)

```css
.grid-masonry {
  column-count: 1;
  column-gap: 16px;
}

@media (min-width: 768px) {
  .grid-masonry {
    column-count: 2;
    column-gap: 24px;
  }
}

@media (min-width: 1024px) {
  .grid-masonry {
    column-count: 3;
  }
}

@media (min-width: 1536px) {
  .grid-masonry {
    column-count: 4;
    column-gap: 32px;
  }
}
```

---

## Typography Scaling

### Responsive Type Scale

```css
/* Mobile */
:root {
  --font-cosmic: 2rem;       /* 32px */
  --font-stellar: 1.5rem;    /* 24px */
  --font-radiant: 1.25rem;   /* 20px */
  --font-base: 1rem;         /* 16px - never smaller */
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --font-cosmic: 2.25rem;  /* 36px */
    --font-stellar: 1.75rem; /* 28px */
    --font-radiant: 1.5rem;  /* 24px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --font-cosmic: 3rem;     /* 48px */
    --font-stellar: 2.25rem; /* 36px */
    --font-radiant: 1.75rem; /* 28px */
  }
}
```

---

## Touch vs Mouse Interactions

### Touch Interactions (Mobile/Tablet)

```css
/* Larger touch targets */
@media (pointer: coarse) {
  .btn {
    min-height: 44px;
    padding: 12px 24px;
  }

  .icon-button {
    width: 44px;
    height: 44px;
  }

  /* Remove hover effects, use active */
  .btn:hover {
    /* No hover state on touch */
  }

  .btn:active {
    transform: scale(0.95);
    background: var(--color-nebula);
  }
}
```

### Mouse Interactions (Desktop)

```css
/* Precise interactions */
@media (pointer: fine) {
  .btn {
    min-height: 40px;
    padding: 10px 20px;
  }

  .icon-button {
    width: 40px;
    height: 40px;
  }

  /* Rich hover states */
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(91, 139, 217, 0.3);
  }

  .btn:active {
    transform: translateY(0);
  }
}
```

---

## Performance Optimization

### Mobile Optimizations

```css
/* Reduce animations on mobile */
@media (max-width: 767px) {
  * {
    animation-duration: 0.2s !important;
  }

  /* Disable expensive effects */
  .cosmic-particles {
    display: none;
  }

  .glow-effect {
    box-shadow: none;
  }
}

/* Reduce motion for low-power mode */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Image Optimization

```html
<!-- Responsive images -->
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="image-large.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 768px)"
    srcset="image-medium.webp"
    type="image/webp"
  />
  <img
    src="image-small.webp"
    alt="Essence preview"
    loading="lazy"
  />
</picture>
```

---

## Orientation Handling

### Portrait vs Landscape

```css
/* Portrait specific (mobile/tablet) */
@media (orientation: portrait) {
  .studio-layout {
    flex-direction: column;
  }

  .studio-sidebar {
    width: 100%;
    height: auto;
  }
}

/* Landscape specific */
@media (orientation: landscape) and (max-width: 1023px) {
  .studio-layout {
    flex-direction: row;
  }

  .studio-sidebar {
    width: 300px;
    height: 100vh;
  }

  /* Reduce header height in landscape mobile */
  .mobile-header {
    height: 56px;
  }
}
```

---

## Device-Specific Adaptations

### iOS Considerations

```css
/* Safe area insets for notch/island */
@supports (padding: env(safe-area-inset-top)) {
  .mobile-header {
    padding-top: env(safe-area-inset-top);
  }

  .mobile-nav {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Prevent zoom on input focus */
input,
select,
textarea {
  font-size: 16px; /* Minimum to prevent zoom */
}
```

### Android Considerations

```css
/* Address bar height variations */
.mobile-main {
  min-height: 100dvh; /* Dynamic viewport height */
}

/* Hardware back button support */
/* Handled via JavaScript */
```

---

## Responsive Component Examples

### Creation Studio

**Mobile:**
```html
<div class="studio-mobile">
  <!-- Vertical tabs -->
  <nav class="studio-tabs-vertical">
    <button>Prompt</button>
    <button>Settings</button>
    <button>Preview</button>
  </nav>

  <!-- Full-width panels -->
  <div class="studio-panel active">
    <!-- Prompt input -->
  </div>
</div>
```

**Desktop:**
```html
<div class="studio-desktop">
  <!-- Left: Luminor -->
  <aside class="studio-luminor">
    <!-- AI companion -->
  </aside>

  <!-- Center: Main workspace -->
  <main class="studio-workspace">
    <!-- Creation interface -->
  </main>

  <!-- Right: Settings & preview -->
  <aside class="studio-sidebar">
    <!-- Controls and preview -->
  </aside>
</div>
```

---

### Realm Builder

**Mobile:**
```html
<div class="realm-mobile">
  <!-- Bottom sheet for essence library -->
  <div class="realm-canvas">
    <!-- Drag and drop disabled, tap to add -->
  </div>

  <div class="realm-library-sheet">
    <!-- Swipe up to expand -->
    <div class="essence-grid">
      <!-- Essence cards -->
    </div>
  </div>
</div>
```

**Desktop:**
```html
<div class="realm-desktop">
  <!-- Left: Essence library -->
  <aside class="realm-library">
    <!-- Draggable essences -->
  </aside>

  <!-- Center: Canvas -->
  <main class="realm-canvas">
    <!-- Full drag and drop -->
  </main>

  <!-- Right: Properties -->
  <aside class="realm-properties">
    <!-- Selected item details -->
  </aside>
</div>
```

---

## Testing Checklist

### Responsive Testing

- [ ] Test on real devices, not just emulators
- [ ] Verify all breakpoints (xs, sm, md, lg, xl, 2xl)
- [ ] Test portrait and landscape orientations
- [ ] Verify touch targets meet 44x44px minimum
- [ ] Test with large text size (accessibility setting)
- [ ] Verify safe area insets (iOS notch)
- [ ] Test keyboard appearance on mobile inputs
- [ ] Verify hover states work on desktop only
- [ ] Test gestures (swipe, pinch, tap)
- [ ] Verify performance on low-end devices
- [ ] Test with reduced motion preference
- [ ] Verify responsive images load correctly

### Device Matrix

**Must Test:**
- iPhone SE (small mobile)
- iPhone 14 Pro (standard mobile)
- iPad (tablet portrait)
- iPad Pro (tablet landscape)
- MacBook Air 13" (laptop)
- Desktop 27" (large desktop)

**Nice to Test:**
- Android phones (various sizes)
- Surface tablets
- Ultrawide monitors
- Foldable devices

---

## Quick Reference

**Breakpoints**: xs(0) | sm(640px) | md(768px) | lg(1024px) | xl(1280px) | 2xl(1536px)

**Touch Targets**: 44x44px minimum on mobile/tablet

**Type Scaling**: Mobile (32/24/20/16px) → Desktop (48/36/28/16px)

**Grid Columns**: Mobile (1) | Tablet (2-3) | Desktop (4+)

**Max Width**: 1440px for main content

**Layout**: Mobile (stack) | Tablet (2-col) | Desktop (3-col+)

---

**"Magic adapts to every canvas. Responsive is not optional, it's essential."**

Design for the smallest screen, enhance for the largest. Make every pixel count.
