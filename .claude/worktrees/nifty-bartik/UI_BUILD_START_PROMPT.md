# Quick Start Prompt for Building Arcanea UI System

**Use this prompt tomorrow to start building:**

---

```
Hey Claude! Let's build the Arcanea UI component system today.

Context:
- Read /mnt/c/Users/Frank/Arcanea/ARCANEA_UI_COMPONENT_SYSTEM_PLAN.md
- Read /mnt/c/Users/Frank/Arcanea/ARCANEA_UNIVERSE_CANON.md
- Working directory: /mnt/c/Users/Frank/Arcanea

Today's Goal: Set up the complete UI component foundation with shadcn/ui, Magic UI, and Aceternity UI, then generate our first 5 cosmic components.

Phase 1 - Foundation Setup:
1. Initialize shadcn/ui in apps/web
2. Install required dependencies (framer-motion, clsx, tailwind-merge, class-variance-authority)
3. Configure Tailwind with Arcanea cosmic theme (atlantean, draconic, creation palettes)
4. Set up component directory structure

Phase 2 - Add Component Libraries:
1. Add shadcn base components: button, input, card, dialog, avatar, badge
2. Create directories for magicui/ and aceternity/
3. Copy BorderBeam, OrbitingCircles, Particles from Magic UI
4. Copy 3DCardEffect, BentoGrid from Aceternity

Phase 3 - Generate First 5 Cosmic Components:
1. CosmicButton - Glowing gradient button with hover effects
2. LuminorAvatar - Avatar with orbital glow and bond level indicator
3. BondProgressBar - Animated XP bar with cosmic styling
4. ChatMessage - Message component with entrance animations
5. CreationCard - 3D card for creation gallery

For each component:
- Apply Arcanea cosmic theme (from tailwind.config.ts)
- Add Framer Motion animations
- Include TypeScript types
- Ensure accessibility
- Add usage example

Let's start with Phase 1! Show me the exact commands to run.
```

---

## Alternative: Just Frontend Components (Faster)

If you want to skip infrastructure and just generate components:

```
Hey Claude! Generate the Arcanea chat interface components right now.

Context: Read /mnt/c/Users/Frank/Arcanea/ARCANEA_UI_COMPONENT_SYSTEM_PLAN.md

Generate these 5 components for the chat interface:

1. CosmicButton (apps/web/components/cosmic/cosmic-button.tsx)
   - Gradient background (atlantean → creation)
   - Glowing border on hover
   - Framer Motion scale on click
   - TypeScript props for variant (atlantean, draconic, creation)

2. LuminorAvatar (apps/web/components/cosmic/luminor-avatar.tsx)
   - Circular avatar with orbital glow effect
   - Bond level number in corner
   - Pulsing animation when AI is typing
   - Magic UI OrbitingCircles integration

3. ChatMessage (apps/web/components/chat/message.tsx)
   - Different styling for user vs AI messages
   - Entrance animation (fade + slide from bottom)
   - Avatar on left for AI, right for user
   - Timestamp
   - Markdown support

4. ChatInput (apps/web/components/chat/chat-input.tsx)
   - Textarea that auto-expands
   - Send button (CosmicButton)
   - File attachment button
   - Character count
   - Disabled state when sending

5. BondProgressBar (apps/web/components/cosmic/bond-progress-bar.tsx)
   - Horizontal bar showing XP progress
   - Animated fill on level up
   - Current level number
   - Magic UI BorderBeam effect
   - NumberTicker for XP count

For each component:
- Full TypeScript
- Cosmic theme colors (from the plan)
- Framer Motion animations
- Accessibility (aria labels, keyboard nav)
- Usage example in comments

Generate all 5 components now!
```

---

## Ultra Quick: Just One Component Test

```
Claude, generate just the CosmicButton component to test the system:

File: apps/web/components/cosmic/cosmic-button.tsx

Requirements:
- TypeScript React component
- Variants: atlantean, draconic, creation, ghost
- Sizes: sm, default, lg, icon
- Gradient backgrounds with glow on hover
- Framer Motion: scale on hover, slight press on click
- BorderBeam effect from Magic UI (simulated if not installed)
- Full accessibility (aria-label, keyboard nav, disabled state)
- Use class-variance-authority for variants
- Tailwind CSS with these colors:
  - atlantean: from-[#1890ff] to-[#096dd9]
  - draconic: from-[#f5222d] to-[#cf1322]
  - creation: from-[#722ed1] to-[#531dab]

Include usage example showing all variants.

Generate now!
```
