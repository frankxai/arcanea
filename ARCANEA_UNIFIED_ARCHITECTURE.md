# Arcanea Unified Architecture

> _"The Seven Wisdoms flow through one system, not many."_

## 🎯 Vision: The Living Platform

Arcanea is not a collection of separate tools. Arcanea is **one living system** where:

- **Chat** flows seamlessly into **Studio** creation
- **World-building** connects directly to the **Library** canon
- **Skills** integrate naturally with all experiences
- **OpenCode** becomes Arcanea-native intelligence layer

---

## 🏗️ Core Architecture

```
┌─────────────────────────────────────────────┐
│              Arcanea Core Platform              │
│  ┌───────────────┬───────────────┐      │
│  │  🧠 Intelligence Layer  │  🎨 Creation Layer     │
│  │  ┌───────────┬──────────┐   │  ┌───────────────┬───────────┐   │
│  │  │   Seven Wisdoms │   │   │   Luminors (16)    │   │   Skills (77)     │   │
│  │  │   • Sophron    │   │   │   • Each channels     │   │   • Each extends     │
│  │  │   • Kardia     │   │   │   • specific Wisdom │   │   │   • platform      │
│  │  │   • Valora     │   │   │                   │   │   │   • capabilities   │
│  │  │   • Eudaira    │   │   │                   │   │   │   │   • instantly       │
│  │  │   • Orakis     │   │   │                   │   │   │   │                   │
│  │  │   • Poiesis    │   │   │                   │   │   │   │                   │
│  │  │   • Enduran    │   │   │                   │   │   │   │                   │
│  │  └─────────────┴───────────┘   │   └───────────────┴───────────┘   │   └───────────────┴───────────┘   │
│  │                                   │   │                   │   │   │                   │
│  │                                   │   │                   │   │   │                   │
│  └─────────────────────────────────────────┘   │
│                                           │
│           ↓ Integration Layer                     │
│  ┌─────────────────────────────────────┐    │
│  │     🤖 Arcanea-OpenCode (Native)     │    │
│  │  ┌─────────────────────────────┬───┐ │    │
│  │  │ Arcanea Agents (24)              │ │    │
│  │  │ • Architect                 │ │    │
│  │  │ • Coder                     │ │    │
│  │  │ • Story Master               │ │    │
│  │  │ • Character Crafter          │ │    │
│  │  │ • World Expander           │ │    │
│  │  │ • Lore Master                │    │
│  │  │ • Prose Weaver              │ │    │
│  │  │ • Voice Alchemist            │ │    │
│  │  │ • Line Editor               │ │    │
│  │  │ • Continuity Guardian       │    │
│  │  └─────────────────────────────┘   │    │
│  │                                   │    │
│  │         ↓ Big Pickle Power            │    │
│  │         All agents use Big Pickle     │    │
│  │         by default                          │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
                    ↓
         Unified Creator Experience
```

---

## 🔗 Integration Points

### 1. **Chat ↔ Studio Creation**

```typescript
// Chat message automatically available in Studio
const chatMessage = await arcanea.chat.getMessage(messageId);
const studioCreation = arcanea.studio.createFromChat(chatMessage);
```

### 2. **World-Building ↔ Library Canon**

```typescript
// World elements automatically sync to Library
const worldElement = await arcanea.world.createElement(element);
const libraryReference = arcanea.library.getCanonReference(worldElement);
```

### 3. **Skills ↔ Platform Extension**

```typescript
// Skills extend platform capabilities instantly
const skill = await arcanea.skills.load("custom-skill");
arcanea.platform.registerSkill(skill);
```

### 4. **OpenCode ↔ Native Intelligence**

```typescript
// Arcanea agents available everywhere
const agent = arcanea.opencode.getAgent("ArcaneaArchitect");
// Uses Big Pickle by default, no configuration needed
```

---

## 🚀 Implementation Strategy

### Phase 1: Unification (Month 1-2)

1. **Merge repositories** into single `arcanea` monorepo
2. **Create unified package** structure
3. **Build cross-platform interfaces**

### Phase 2: Arcanea-OpenCode (Month 3-4)

1. **Fork oh-my-opencode** with Arcanea extensions
2. **Replace all OpenCode agents** with Arcanea equivalents
3. **Big Pickle as default model** for all agents

### Phase 3: One-Click Experience (Month 5-6)

1. **Single command installation**: `curl arcanea.ai/install | bash`
2. **Auto-configuration** based on user environment
3. **Immediate Arcanea activation**

---

## 🎨 The Creator Experience

### Installation

```bash
# One command to unlock everything
curl -sSL arcanea.ai/install | bash

# Output progression
🔮 Arcanea Intelligence manifesting...
📦 Arcanea Agents arriving (24/24)...
✨ Your Arcanea Luminors stand ready...
🎯 Arcanea-OpenCode Big Pickle ready...
💫 The Seven Wisdoms await your call...

# Magic Words available instantly
arcana-work    # Ultimate creative mode
arcana-create   # Channel Poiesis for making
arcana-build    # Channel Orakis + Sophron for building
arcana-write    # Channel Kardia + Eudaira for writing
```

### Daily Use

```bash
# Start your day with Arcanea
opencode

# All agents are Arcanea-native by default
# Big Pickle powers everything automatically

# Magic Words work intuitively
arcana-work "Design a revolutionary AI platform"
# Response channels appropriate Wisdom automatically
```

---

## 🌟 Benefits

### For Creators

- **🎨 Unified Creative Intelligence** - All tools work as one system
- **🔄 Living Ecosystem** - Skills, world, and lore evolve together
- **🚀 Zero-Learning Curve** - Intuitive from first moment
- **🌍 Universal Access** - Works on any machine with npm/bun

### For Developers

- **🎯 Single Target** - Only one package to maintain
- **🧩 Clean Architecture** - Extensible system for community
- **🚀 Rapid Innovation** - New agents/skills easy to add

---

## 📋 Migration Path

For existing users:

```bash
# From fragmented to unified
npm install -g oh-my-opencode@arcanea

# Configure Arcanea agents
opencode config set agents.arcanea-*.model opencode/big-pickle
```

For new users:

```bash
# Direct to magical experience
curl -sSL arcanea.ai/install | bash
```

---

_"The best time to plant a tree was 20 years ago. The second best time is now."_

---

**Arcanea: Where intelligence becomes wisdom.**
