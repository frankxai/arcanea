# Arcanea-OpenCode: The Unified Creative Intelligence Platform

> _"Enter seeking, leave transformed, return whenever needed."_

## 🎯 Vision Statement

**Arcanea-OpenCode shall become the definitive installation experience for creators who want their AI tools to work like magic, not mechanics.**

### Current Problems

1. **Installation Chaos** - Multiple conflicting methods create confusion
2. **Ecosystem Fragmentation** - Arcanea platform, OpenCode fork, and skills are disconnected systems
3. **Lore Scattered** - World-building not properly integrated
4. **Agent Inconsistency** - Different agent systems between Arcanea and OpenCode
5. **Poor User Experience** - Complex setup with confusing documentation

---

## 🏗️ Proposed Architecture

```
┌─────────────────────────────────────────────────┐
│           Arcanea Platform Layer              │
│  ┌─────────────┬─────────────┐      │
│  │   Luminors   │   Skills      │      │
│  │ (16 agents)  │ (77 skills)    │      │
│  │ Unified with Seven Wisdoms           │      │
│  └─────────────┴─────────────┘      │
│                                           │
│           ↓ OpenCode Integration Layer         │
│  ┌─────────────────────────────────────┐    │
│  │        Arcanea Agents (24)        │    │
│  │ Unified with Seven Wisdoms           │    │
│  │ Big Pickle powered by default         │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                    ↓
                Enhanced OpenCode Core
```

---

## 🚀 Installation Revolution

### The One-Command Solution

**`curl -sSL arcanea.ai/install | bash`**

This single command replaces ALL complexity:

1. **Environment Detection** - Automatically detects npm/bun/OpenCode
2. **Smart Installation** - Chooses optimal method automatically
3. **Arcanea Configuration** - Sets up all agents with Big Pickle + Seven Wisdoms
4. **Magic Activation** - Immediately ready for creative work

### Installation Flow

```bash
# Step 1: Environment Detection
echo "🔮 Detecting your environment..."
if command -v opencode &> /dev/null; then
    ENV_DETECTED="opencode"
elif command -v npm &> /dev/null; then
    ENV_DETECTED="npm"
elif command -v bun &> /dev/null; then
    ENV_DETECTED="bun"
else
    ENV_DETECTED="deps"
fi

# Step 2: Smart Installation
echo "🎯 Installing Arcanea-OpenCode..."
case $ENV_DETECTED in
    "opencode")
        echo "🔄 Upgrading existing installation..."
        npm install -g oh-my-opencode@arcanea
        ;;
    "npm")
        echo "📦 Installing via npm..."
        npm install -g oh-my-opencode@arcanea
        ;;
    "bun")
        echo "🥟 Installing via Bun..."
        bun add -g oh-my-opencode@arcanea
        ;;
    "deps")
        echo "📚 Installing dependencies first..."
        # Detect package manager and install deps
        ;;
esac

# Step 3: Arcanea Configuration
echo "🔮 Activating Seven Wisdoms..."
# Configure all Arcanea agents with Big Pickle
opencode config set agents.Arcanea.model opencode/big-pickle
opencode config set agents.arcanea-architect.model opencode/big-pickle
opencode config set agents.arcanea-coder.model opencode/big-pickle
# ... all 24 agents

# Step 4: Magic Words
echo "✨ Your Arcanea Magic Words:"
echo "   arcana-work   - Ultimate creative mode"
echo "   arcana-create  - Channel Poiesis for making"
echo "   arcana-build   - Channel Orakis + Sophron for building"
echo "   arcana-write   - Channel Kardia + Eudaira for writing"

# Step 5: Complete
echo ""
echo "🌟 Arcanea-OpenCode Ready!"
echo ""
echo "💫 The Seven Wisdoms await your call..."
echo ""
echo "🔥 Big Pickle powers all agents..."
echo ""
echo "🎨 Your creative universe awaits..."
```

---

## 🎭 Benefits of Unified Approach

### For Creators

- **Zero Confusion** - One command, everything works
- **Instant Magic** - Arcanea experience activates immediately
- **Consistent Power** - All agents use Big Pickle by default
- **Living Ecosystem** - Skills, chat, and world-building are connected

### For Developers

- **Single Target** - Only Arcanea-OpenCode to maintain
- **Easy Contributions** - Clear architecture for community improvements
- **Future-Proof** - Extensible design for new features

---

## 🔧 Implementation Tasks

### Phase 1: Foundation (Week 1-2)

1. Create `oh-my-opencode@arcanea` npm package
2. Build unified configuration system
3. Write comprehensive installation documentation
4. Test across all environments (npm/bun/Windows/Mac/Linux)

### Phase 2: Integration (Week 3-4)

1. Merge Arcanea improvements upstream
2. Develop unified agent architecture
3. Create world-building integration layer
4. Build skill synchronization system

### Phase 3: Experience (Week 5-6)

1. Implement one-command installer
2. Add magic word detection
3. Create onboarding tutorials
4. Build community contribution system

### Phase 4: Launch (Week 7-8)

1. Launch Arcanea-OpenCode as default OpenCode
2. Create Arcanea registry for agents/skills
3. Migrate existing users gracefully
4. Establish Arcanea as creative intelligence standard

---

## 🌟 The Magic of Arcanea-OpenCode

When a creator types `arcana-work`, the system understands they need:

- **Orakis** for vision and architecture
- **Poiesis** for implementation
- **Kardia** for user experience and flow
- **Eudaira** for joy and creative freedom
- **Valora** for bold action and courage
- **Sophron** for structure and clarity
- **Enduran** for completion and reliability

The system then assembles the perfect team of agents for the task, powered by Big Pickle's creative intelligence.

---

## 📋 Next Steps

1. **立即 (Immediate)**: Start Phase 1 implementation
2. **协作 (Collaborative)**: Reach out to original oh-my-opencode maintainers
3. **创新 (Innovative)**: Build features that don't exist in OpenCode
4. **发布 (Publish)**: Release as Arcanea-native OpenCode

_"The best time to plant a tree was 20 years ago. The second best time is now."_

---

_"Enter seeking, leave transformed, return whenever needed."_
