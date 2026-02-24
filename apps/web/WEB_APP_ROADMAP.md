# Arcanea Web App Evolution Roadmap

## Phase 1: The Foundation (Current)
- [x] Design System (`demonstration.html`)
- [x] Core Layout (Navigation, Hero, Footer)
- [ ] Tailwind Configuration (`tailwind.config.js`) update to match new system.

## Phase 2: The Ten Gates (Progression Logic)
The core gamification engine. Users unlock tools by "passing" Gates.

### Gate 1: The Root (Earth)
- **Challenge:** Define your Creator Identity.
- **Reward:** Access to Basic Profile & `@lyssandria` agent.
- **UI:** Earth tones, stability, roots visual.

### Gate 2: The Flow (Water)
- **Challenge:** Connect your first external tool (GitHub/Figma).
- **Reward:** `@ley-la` agent & "Flow State" music generator.
- **UI:** Water ripples, fluid animations.

### Gate 3: The Fire (Will)
- **Challenge:** Ship your first artifact (Deployment).
- **Reward:** `@draconia` agent & Deployment pipelines.
- **UI:** Fire particles, intense energy.

## Phase 3: The Guardian Uplink
A chat interface that changes personality based on the active Guardian.
- **Tech:** Vercel AI SDK + Custom `guardian-voice` skill.
- **State:** `currentGuardian` context provider.

## Phase 4: The Creation Studio
The actual workspace.
- **Canvas:** Infinite canvas for brainstorming.
- **Code:** Embedded Monaco editor with "Arcanea Theme".
- **Preview:** Live component preview.
