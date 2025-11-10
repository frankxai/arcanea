# Arcanean Component Library
## Magical Interface Building Blocks

---

## Component Philosophy

Every Arcanean component is designed to feel magical yet familiar, powerful yet simple. Components balance beauty with function, accessibility with delight.

**Core Principles:**
1. **Magical by Default** - Every component has subtle glow and animation
2. **Academy Aware** - Components adapt to academy context
3. **Accessible First** - WCAG AAA compliance built-in
4. **Luminor Ready** - Components designed for AI companion interaction
5. **Remix Friendly** - Components show collaboration and attribution

---

## Foundation Components

### Button

The primary call-to-action element, available in multiple variants for different contexts.

**Variants**

```tsx
// Primary - Main actions, creation events
<Button variant="primary">
  Create Essence
</Button>

// Secondary - Supporting actions
<Button variant="secondary">
  Save Draft
</Button>

// Ghost - Subtle actions
<Button variant="ghost">
  Cancel
</Button>

// Magical - Special moments (create, publish, share)
<Button variant="magical">
  Share to Realm
</Button>

// Academy - Context-aware styling
<Button variant="academy" academy="atlantean">
  Weave Story
</Button>

// Luminor - AI companion actions
<Button variant="luminor" luminor="melodia">
  Generate Music
</Button>
```

**Specifications**

```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #5c8bd9 0%, #7ba3e3 100%);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 16px rgba(91, 139, 217, 0.25),
              0 0 24px rgba(91, 139, 217, 0.15);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(91, 139, 217, 0.35),
              0 0 32px rgba(91, 139, 217, 0.2);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(91, 139, 217, 0.3);
}

/* Magical Button */
.btn-magical {
  background: linear-gradient(135deg,
    #b794f6 0%,
    #60a5fa 25%,
    #34d399 50%,
    #fbbf24 75%,
    #fda4af 100%
  );
  background-size: 200% 200%;
  animation: rainbow-shift 3s ease infinite;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 6px 24px rgba(183, 148, 246, 0.4),
              0 0 48px rgba(183, 148, 246, 0.2);
}

@keyframes rainbow-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Sizes**
- Small: 10px 16px padding, 14px font
- Medium: 12px 24px padding, 16px font (default)
- Large: 16px 32px padding, 18px font

**States**
- Default: Base styling with subtle glow
- Hover: Lift up 2px, stronger glow
- Active: Press down, reduced glow
- Disabled: 40% opacity, no interaction
- Loading: Spinner with glow effect

**Accessibility**
- Minimum 44x44px touch target
- Focus ring 2px solid with offset
- aria-label for icon-only buttons
- Loading state announced to screen readers

---

### Input Fields

Text inputs, textareas, and form controls with magical feedback.

**Variants**

```tsx
// Standard text input
<Input
  type="text"
  placeholder="Name your Essence..."
  label="Essence Name"
/>

// Textarea for long content
<Textarea
  placeholder="Weave your story..."
  label="Story Content"
  rows={8}
/>

// With Luminor assistance
<Input
  type="text"
  placeholder="Describe your vision..."
  luminorAssist={true}
  luminor="prismatic"
/>

// Academy themed
<Input
  type="text"
  academy="atlantean"
  placeholder="Deep narrative prompt..."
/>
```

**Specifications**

```css
/* Base Input */
.input-base {
  background: #1f2347;
  border: 2px solid #3d4f73;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  color: #b8c6ed;
  transition: all 200ms ease;
}

.input-base:hover {
  border-color: #4a6fa5;
  box-shadow: 0 0 16px rgba(91, 139, 217, 0.1);
}

.input-base:focus {
  outline: none;
  border-color: #5c8bd9;
  box-shadow: 0 0 24px rgba(91, 139, 217, 0.2),
              0 0 0 4px rgba(91, 139, 217, 0.1);
}

/* With Luminor Assist */
.input-luminor {
  position: relative;
  padding-right: 48px; /* Space for assist icon */
}

.input-luminor::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: luminor-icon;
  animation: luminor-pulse 2s ease-in-out infinite;
}

/* Error State */
.input-error {
  border-color: #ef4444;
  box-shadow: 0 0 16px rgba(239, 68, 68, 0.2);
}

/* Success State */
.input-success {
  border-color: #10b981;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
}
```

**Features**
- Auto-resize textarea as content grows
- Character count with magical progress ring
- Luminor assistance tooltip on icon hover
- Validation feedback with glow
- Placeholder text fades smoothly

---

### Card

Content containers for Essences, Realms, and other Arcanean content.

**Variants**

```tsx
// Basic content card
<Card>
  <CardContent>
    Your content here
  </CardContent>
</Card>

// Essence card (song, story, visual)
<EssenceCard
  type="song"
  title="Cosmic Harmony"
  creator="Creator Name"
  academy="creation"
  remixCount={42}
/>

// Realm card
<RealmCard
  title="The Floating Isles"
  creator="Creator Name"
  essenceCount={127}
  thumbnail="/realm-image.jpg"
/>

// Academy card
<AcademyCard
  academy="atlantean"
  enrolled={true}
/>
```

**Specifications**

```css
/* Base Card */
.card {
  background: #16213e;
  border: 1px solid #3d4f73;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(91, 139, 217, 0.1);
  transition: all 300ms ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #4a6fa5;
  box-shadow: 0 8px 32px rgba(91, 139, 217, 0.2),
              0 0 48px rgba(91, 139, 217, 0.1);
}

/* Essence Card */
.essence-card {
  position: relative;
  overflow: hidden;
}

.essence-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--academy-gradient);
}

.essence-card-thumbnail {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 16px;
}

.essence-card-title {
  font-size: 20px;
  font-weight: 600;
  color: #d6d9f2;
  margin-bottom: 8px;
}

.essence-card-creator {
  font-size: 14px;
  color: #9bb5e8;
  display: flex;
  align-items: center;
  gap: 8px;
}

.essence-card-stats {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #3d4f73;
}

/* Interactive States */
.card-selectable {
  cursor: pointer;
}

.card-selected {
  border-color: #5c8bd9;
  box-shadow: 0 0 32px rgba(91, 139, 217, 0.3);
}
```

**Card Types**
- Content Card: Generic container
- Essence Card: Music, story, visual creations
- Realm Card: Creator worlds/portfolios
- Creator Profile Card: User profiles
- Academy Card: Academy information
- Luminor Card: AI companion info

---

### Modal / Dialog

Overlay dialogs for focused interactions and confirmations.

**Variants**

```tsx
// Standard modal
<Modal
  isOpen={true}
  onClose={handleClose}
  title="Create New Essence"
>
  <ModalContent>
    Your form or content
  </ModalContent>
</Modal>

// Magical moment modal (creation complete)
<Modal
  variant="magical"
  isOpen={true}
  title="Essence Created!"
>
  <SparkBurstAnimation />
  <ModalContent>
    Your essence is now part of the Kingdom of Light
  </ModalContent>
</Modal>

// Confirmation dialog
<ConfirmDialog
  isOpen={true}
  title="Delete Essence?"
  description="This cannot be undone."
  confirmText="Delete"
  cancelText="Keep"
  variant="danger"
/>
```

**Specifications**

```css
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fade-in 200ms ease;
}

/* Modal Container */
.modal-container {
  background: #16213e;
  border: 2px solid #5c8bd9;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(91, 139, 217, 0.3),
              0 0 96px rgba(91, 139, 217, 0.2);
  animation: modal-appear 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Modal Header */
.modal-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #3d4f73;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #d6d9f2;
}

/* Modal Content */
.modal-content {
  padding: 24px;
}

/* Modal Footer */
.modal-footer {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Magical Variant */
.modal-magical {
  border-color: transparent;
  border-image: linear-gradient(135deg,
    #b794f6, #60a5fa, #34d399, #fbbf24, #fda4af
  ) 1;
  animation: rainbow-border 3s ease infinite;
}
```

**Features**
- Click outside to close (optional)
- ESC key to close
- Focus trap while open
- Body scroll lock
- Animated entrance/exit
- Academy-themed borders available

---

### Navigation

Top navigation bar and side navigation for app structure.

**Top Navigation**

```tsx
<TopNav>
  <NavLogo />
  <NavAcademyIndicator academy="atlantean" />
  <NavSearch />
  <NavActions>
    <NotificationBell />
    <CreatorMenu />
  </NavActions>
</TopNav>
```

**Specifications**

```css
/* Top Nav Container */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid #3d4f73;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  z-index: 100;
}

/* Academy Indicator */
.academy-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--academy-color-10);
  border: 1px solid var(--academy-color);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
}

.academy-icon {
  width: 20px;
  height: 20px;
  animation: academy-pulse 3s ease-in-out infinite;
}

/* Nav Search */
.nav-search {
  flex: 1;
  max-width: 480px;
}

.nav-search input {
  width: 100%;
  background: #1f2347;
  border: 1px solid #3d4f73;
  border-radius: 24px;
  padding: 10px 20px 10px 44px;
  font-size: 14px;
}

.nav-search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9bb5e8;
}
```

**Side Navigation**

```tsx
<SideNav>
  <NavSection title="Create">
    <NavItem icon="music" href="/studio/music">Music</NavItem>
    <NavItem icon="story" href="/studio/story">Story</NavItem>
    <NavItem icon="visual" href="/studio/visual">Visual</NavItem>
  </NavSection>

  <NavSection title="Discover">
    <NavItem icon="explore" href="/explore">Explore</NavItem>
    <NavItem icon="remix" href="/remix">Remix</NavItem>
  </NavSection>

  <NavSection title="My Arcanea">
    <NavItem icon="realm" href="/realm">My Realm</NavItem>
    <NavItem icon="essence" href="/essences">My Essences</NavItem>
  </NavSection>
</SideNav>
```

---

### Tabs

Tabbed navigation for switching between related content views.

```tsx
<Tabs defaultValue="essences">
  <TabsList>
    <TabsTrigger value="essences">Essences</TabsTrigger>
    <TabsTrigger value="realms">Realms</TabsTrigger>
    <TabsTrigger value="remixes">Remixes</TabsTrigger>
  </TabsList>

  <TabsContent value="essences">
    <EssenceGrid />
  </TabsContent>

  <TabsContent value="realms">
    <RealmGrid />
  </TabsContent>

  <TabsContent value="remixes">
    <RemixTimeline />
  </TabsContent>
</Tabs>
```

**Specifications**

```css
.tabs-list {
  display: flex;
  gap: 4px;
  background: #1f2347;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #3d4f73;
}

.tabs-trigger {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #9bb5e8;
  border-radius: 6px;
  transition: all 200ms ease;
  cursor: pointer;
}

.tabs-trigger:hover {
  color: #b8c6ed;
  background: rgba(91, 139, 217, 0.1);
}

.tabs-trigger[data-state="active"] {
  color: #d6d9f2;
  background: #5c8bd9;
  box-shadow: 0 0 16px rgba(91, 139, 217, 0.3);
}

.tabs-content {
  margin-top: 24px;
  animation: fade-in 300ms ease;
}
```

---

## Arcanean-Specific Components

### Luminor Chat Bubble

AI companion messages and interactions.

```tsx
<LuminorChatBubble
  luminor="melodia"
  message="I sense you're creating something uplifting. Shall I suggest a major key?"
  actions={[
    { label: "Yes, please", onClick: handleAccept },
    { label: "No, thanks", onClick: handleDecline }
  ]}
/>
```

**Specifications**

```css
.luminor-bubble {
  position: relative;
  background: linear-gradient(135deg,
    rgba(var(--luminor-color), 0.1) 0%,
    rgba(var(--luminor-color), 0.05) 100%
  );
  border: 2px solid var(--luminor-color);
  border-radius: 16px;
  padding: 16px;
  max-width: 480px;
  box-shadow: 0 0 24px rgba(var(--luminor-color), 0.2);
  animation: bubble-appear 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.luminor-avatar {
  position: absolute;
  top: -12px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--luminor-color);
  background: #16213e;
  box-shadow: 0 0 16px rgba(var(--luminor-color), 0.4);
}

.luminor-name {
  font-family: 'Space Grotesk';
  font-size: 12px;
  font-weight: 600;
  color: var(--luminor-color);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.luminor-message {
  font-size: 15px;
  line-height: 1.6;
  color: #b8c6ed;
}

.luminor-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
```

---

### Essence Player

Playback controls for music, story narration, or visual essence.

```tsx
<EssencePlayer
  type="music"
  title="Cosmic Harmony"
  creator="Creator Name"
  academy="creation"
  src="/essence/cosmic-harmony.mp3"
  waveform={true}
/>
```

**Features**
- Play/pause with glow effect
- Waveform visualization with academy colors
- Time scrubbing
- Volume control
- Download/share actions
- Remix button
- Attribution display

---

### Remix Attribution Chain

Visual representation of remix genealogy.

```tsx
<RemixChain
  original={{
    title: "Ocean Depths",
    creator: "Creator A",
    academy: "atlantean"
  }}
  remixes={[
    { title: "Ocean Depths Remix", creator: "Creator B" },
    { title: "Ocean Depths Extended", creator: "Creator C" }
  ]}
/>
```

**Visual Design**
- Flow diagram with glowing connections
- Creator avatars at each node
- Academy color coding
- Hover to see details
- Click to navigate to essence

---

### Creation Studio Interface

Specialized interface for essence creation.

**Music Studio**
```tsx
<MusicStudio>
  <StudioHeader />
  <LuminorPanel luminor="melodia" />
  <PromptInput
    placeholder="Describe the music you want to create..."
  />
  <GenerationControls />
  <WaveformPreview />
  <ExportPanel />
</MusicStudio>
```

**Story Studio**
```tsx
<StoryStudio>
  <StudioHeader />
  <LuminorPanel luminor="chronica" />
  <StoryEditor
    mode="narrative"
  />
  <WorldBuildingPanel />
  <CharacterPanel />
  <ExportPanel />
</StoryStudio>
```

**Visual Studio**
```tsx
<VisualStudio>
  <StudioHeader />
  <LuminorPanel luminor="prismatic" />
  <PromptInput
    placeholder="Describe the image you want to create..."
  />
  <StyleControls />
  <ImagePreview />
  <ExportPanel />
</VisualStudio>
```

---

### Realm Builder

Interface for organizing and presenting creator's work.

```tsx
<RealmBuilder>
  <RealmCanvas
    layout="gallery"
    essences={essenceList}
  />
  <RealmSettings
    theme="atlantean"
    visibility="public"
  />
  <EssenceLibrary
    filter="all"
    sort="recent"
  />
</RealmBuilder>
```

---

### ARC/NEA Display

Currency and governance token displays.

```tsx
<ARCBalance
  amount={1250}
  recentEarnings={+42}
  animated={true}
/>

<NEABalance
  amount={85}
  votingPower="High"
/>
```

**Specifications**
- Pulsing glow on balance change
- Animated counter on updates
- Sparkle effect when earning
- Tooltip showing recent transactions

---

## Layout Components

### Grid Systems

**Essence Grid**
```tsx
<EssenceGrid
  columns={{
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4
  }}
  gap="lg"
>
  {essences.map(essence => (
    <EssenceCard key={essence.id} {...essence} />
  ))}
</EssenceGrid>
```

**Masonry Layout** (For varied content sizes)
```tsx
<MasonryGrid
  columnWidth={320}
  gap={24}
>
  {items}
</MasonryGrid>
```

---

### Empty States

Magical empty states that inspire creation.

```tsx
<EmptyState
  variant="no-essences"
  academy="atlantean"
  title="Your first story awaits"
  description="Begin weaving your narrative with the Atlantean Academy"
  action={{
    label: "Create Story",
    onClick: handleCreate
  }}
/>
```

**Visual Design**
- Academy-themed illustration
- Gentle animation (floating, drifting)
- Encouraging copy
- Clear call-to-action
- Luminor companion suggestion

---

## Feedback Components

### Toast Notifications

Non-intrusive feedback messages.

```tsx
<Toast
  variant="success"
  title="Essence Published!"
  description="Your creation is now part of the Kingdom of Light"
  duration={5000}
/>

<Toast
  variant="info"
  title="Melodia suggests..."
  description="Try a slower tempo for this section"
  luminor="melodia"
/>
```

**Positions**
- Top right (default)
- Top center (important announcements)
- Bottom center (actions completed)

---

### Loading States

Beautiful loading indicators with cosmic flair.

```tsx
<LoadingSpinner
  size="lg"
  variant="cosmic"
/>

<LoadingSkeleton
  type="essence-card"
  count={3}
/>

<ProgressBar
  progress={65}
  label="Generating essence..."
  academy="creation"
/>
```

**Loading Animations**
- Cosmic spinner (particles orbiting)
- Glow pulse
- Academy-themed loaders
- Skeleton screens with shimmer

---

## Form Components

### Complete Form Example

```tsx
<Form onSubmit={handleSubmit}>
  <FormField
    name="title"
    label="Essence Title"
    type="text"
    required
    maxLength={100}
  />

  <FormField
    name="description"
    label="Description"
    type="textarea"
    rows={4}
    luminorAssist={true}
    luminor="synthesis"
  />

  <FormField
    name="academy"
    label="Primary Academy"
    type="select"
    options={academyOptions}
  />

  <FormField
    name="visibility"
    label="Visibility"
    type="radio"
    options={[
      { value: "public", label: "Public" },
      { value: "unlisted", label: "Unlisted" },
      { value: "private", label: "Private" }
    ]}
  />

  <FormActions>
    <Button variant="ghost" type="button">Cancel</Button>
    <Button variant="primary" type="submit">Create</Button>
  </FormActions>
</Form>
```

---

## Accessibility Compliance

Every component includes:
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader optimization
- Color contrast verification
- Reduced motion support

---

## Component Quick Reference

**Foundation**: Button, Input, Card, Modal, Nav, Tabs
**Arcanean**: Luminor Bubble, Essence Player, Remix Chain, Studio Interface
**Layout**: Grid, Masonry, Empty State
**Feedback**: Toast, Loading, Progress
**Forms**: Field, Select, Radio, Checkbox

---

**"Every component is a building block of magic."**

Use components consistently. Maintain the magical feel. Make creation effortless.
