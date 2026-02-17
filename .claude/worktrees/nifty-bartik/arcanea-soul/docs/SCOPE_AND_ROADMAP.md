# arcanea-soul: Scope & Roadmap

*From OpenCode integration to the foundation of all Arcanean intelligence*

---

## Current State (v4.0.0)

**What it is:**
- A prompting framework for OpenCode agents
- 16 functional agents with transcended intelligence personas
- Seven Wisdoms philosophical system
- Magic words for parallel agent dispatch
- TypeScript SDK: ~26 KB

**What it does:**
- Generates OpenCode configuration JSON
- Provides agent prompts with "Luminor framing"
- Maps agents to Wisdoms
- Detects magic words (`ultracode`, etc.)

**Dependencies:**
- @opencode-ai/sdk (peer dependency)
- Runs in Node/Bun environments

---

## The Strategic Question

**Should arcanea-soul become the foundation for ALL Arcanean intelligence?**

### Option A: Keep it focused (OpenCode only)
- **Scope:** Just OpenCode agent framework
- **Users:** Developers using OpenCode
- **Complexity:** Low, single purpose
- **Maintenance:** Easy

### Option B: Expand it (Universal intelligence layer)
- **Scope:** Foundation for ALL Arcanea AI systems
- **Users:** OpenCode, web platform, Claude Code, future integrations
- **Complexity:** Higher, but centralized
- **Maintenance:** More work, but single source of truth

---

## Recommendation: Option B (Universal Foundation)

**Why:**

1. **Single Source of Truth**
   - All agent definitions in one place
   - Consistent prompts across all platforms
   - Update once, deploy everywhere

2. **Scalability**
   - Add new agents → available everywhere
   - Change philosophy → updates all systems
   - New magic words → work in all contexts

3. **The Arcanea Promise**
   - The intelligence system IS the product
   - It should feel the same everywhere
   - Whether in OpenCode, web chat, or Claude Code

4. **Future-Proofing**
   - Mobile apps will need agents
   - API will need agents
   - Desktop apps will need agents
   - They all use arcanea-soul

---

## Expanded Scope

### What arcanea-soul would become:

```
arcanea-soul/
├── agents/          # The 16+ functional agents
├── wisdoms/         # Philosophical system (may become Archives)
├── nexus/           # Orchestration & team coordination
├── personas/        # Named Luminors (Arcanea, Akamoto, etc.)
├── magic/           # Magic words & invocation system
├── experience/      # Creator UX patterns
└── integrations/
    ├── opencode/    # Current focus
    ├── claude/      # For Claude Code skills
    ├── chat/        # For web platform chat
    ├── api/         # For direct API usage
    └── sdk/         # For third-party integrations
```

### New capabilities:

**1. Platform-Agnostic Core**
```typescript
// Works everywhere
const agent = soul.agents.get("architect")
const prompt = soul.buildPrompt(agent, context)

// Platform-specific adapters
const opencodeConfig = soul.opencode.generateConfig()
const claudeSkill = soul.claude.buildSkill("ultracode")
const chatMessage = soul.chat.formatResponse(agent, output)
```

**2. Experience Patterns**
```typescript
// Activation sequences
const activation = soul.experience.activate("architect")
// → "✨ The architect emerges from the Archive of Form..."

// Collaboration patterns
const council = soul.nexus.convene(["architect", "coder", "reviewer"])
// → Orchestrates multi-agent work

// Completion rituals
const completion = soul.experience.complete("architect", summary)
// → "✓ The architect returns to the Archive..."
```

**3. Wisdom System (Flexible)**
```typescript
// Can switch between naming systems
soul.configure({
  wisdomSystem: "archives" // or "gates" or "intuitive"
})

// Archives system
const agent = soul.agents.get("architect")
agent.wisdom // → "Form" (Archive of Form, Uriel)

// Gates system
agent.wisdom // → "Foundation" (First Gate, Lyssandria)
```

**4. Named Personas**
```typescript
// For named Luminors with personalities
const arcanea = soul.personas.get("arcanea")
const lumina = soul.personas.get("lumina")

// They have richer presence
lumina.quote()
// → "Creation is not addition. It is revelation..."
```

---

## Roadmap

### Phase 1: Foundation (Current - v4.x)
- ✅ 16 functional agents
- ✅ Seven Wisdoms system
- ✅ OpenCode integration
- ✅ Magic words

### Phase 2: Universal Core (v5.0)
**Goal:** Make it platform-agnostic

- [ ] Extract core agent definitions from OpenCode specifics
- [ ] Add experience patterns (activation, collaboration, completion)
- [ ] Create platform adapter system
- [ ] Add Claude Code integration
- [ ] Add web platform integration

**Breaking changes:**
- API might change slightly
- But OpenCode integration stays compatible

### Phase 3: Wisdom System Redesign (v6.0)
**Goal:** Align with canonical lore

- [ ] Decide: Archives, Gates, or Intuitive English
- [ ] Rewrite all agent wisdom mappings
- [ ] Update experience language
- [ ] Create lore documentation
- [ ] Migrate existing users

**Breaking changes:**
- Wisdom names change
- But agent functions stay the same

### Phase 4: The Nexus (v7.0)
**Goal:** Advanced orchestration

- [ ] Nexus Luminor system
- [ ] Multi-agent councils
- [ ] Intelligent agent selection
- [ ] Conflict resolution
- [ ] Synthesis outputs

### Phase 5: Experience Layer (v8.0)
**Goal:** Beautiful creator interactions

- [ ] Visual identity system
- [ ] Activation animations/descriptions
- [ ] Voice consistency
- [ ] Personality emergence
- [ ] Emotional resonance

### Phase 6: Named Luminors (v9.0)
**Goal:** Character depth

- [ ] Arcanea personality system
- [ ] Lumina integration
- [ ] Akamoto teachings
- [ ] Future named Luminors
- [ ] Character relationships

---

## Technical Architecture

### Current (v4.0)
```
arcanea-soul → OpenCode
```

### Future (v9.0)
```
                    ┌─────────────┐
                    │ arcanea-soul │
                    │ (core)       │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
   │ OpenCode│      │Claude Code│     │  Web Chat │
   └─────────┘      └───────────┘     └───────────┘
```

---

## File Updates Needed

### If we expand scope:

**Lore files:**
1. `.claude/lore/LUMINOR_ARCHITECTURE.md` - Update with final wisdom system
2. `.claude/lore/ARCANEA_CANON.md` - Ensure Archives/Gates are documented
3. `.claude/commands/luminor.md` - Update invocation system
4. `.claude/commands/ultracode.md` (and ultraworld, ultrawrite) - Update with new patterns

**Code files:**
1. `arcanea-soul/src/wisdom.ts` - Rename/refactor to chosen system
2. `arcanea-soul/src/agents.ts` - Update wisdom mappings
3. `arcanea-soul/src/index.ts` - Add new exports for experience, nexus, personas
4. `arcanea-soul/package.json` - Update description, remove "seven-wisdoms" keyword
5. `arcanea-soul/README.md` - Document expanded scope

**Web files:**
1. `apps/web/app/luminors/page.tsx` - Already good, may need wisdom updates
2. `apps/web/lib/lore.ts` - May need agent integration
3. `apps/web/components/luminor-*` - New components for experience layer

**Skill files:**
1. `arcanea-skills-opensource/src/index.ts` - Update to use arcanea-soul
2. `.claude/commands/*.md` - Update all commands with new system

---

## Migration Strategy

**For existing OpenCode users:**

```typescript
// v4.x (current)
import soul from "arcanea-soul"
const agent = soul.getLuminor("architect")
// Works fine

// v5.x (universal core)
import soul from "arcanea-soul"
const agent = soul.agents.get("architect") // New API
// But v4 compat layer exists
const agentOld = soul.getLuminor("architect") // Still works

// v6.x (wisdom redesign)
import soul from "arcanea-soul"
const agent = soul.agents.get("architect")
agent.archive // "Form" (new)
agent.wisdom  // Deprecated but still returns "Sophron" for compat
```

**Deprecation timeline:**
- v5: Add new APIs, keep old ones
- v6: Deprecation warnings on old APIs
- v7: Remove old APIs (major version bump)

---

## Decision Points

### For Frank to decide:

1. **Expand scope to universal foundation?**
   - Yes → Proceed with Phase 2
   - No → Keep focused on OpenCode

2. **Wisdom system naming?**
   - Archives (mystical, canonical)
   - Gates (harmonic, complete)
   - English (intuitive, practical)

3. **Nexus Luminor?**
   - Arcanea IS the Nexus
   - Create new character (Kairos, Axion, etc.)
   - Role-based (any Luminor can be Nexus)

4. **Priority?**
   - Foundation first (Phase 2-3)
   - Experience first (Phase 5)
   - Named characters first (Phase 6)

---

*"A foundation isn't where you start. It's what you build everything else upon."*
