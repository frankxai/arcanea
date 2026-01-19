# Arcanea + OpenCode Integration Architecture

## COMPLETED: Proper Fork Created

**Repository**: https://github.com/frankxai/arcanea-opencode
**Version**: 3.0.0
**Based on**: oh-my-opencode v2.14.0

### What We Built

1. **Persona System** - Configurable personas (Sisyphus, Arcanea, or custom)
2. **Schema Updates** - Added `persona` and `personas` config options
3. **Proper Fork** - Full oh-my-opencode fork with upstream tracking
4. **License Compliant** - NOTICE.md added per SUL-1.0 requirements

### Installation

```bash
# Remove old oh-my-opencode
cd ~/.config/opencode
bun remove oh-my-opencode

# Install arcanea-opencode
bun add github:frankxai/arcanea-opencode
```

### Configuration

```json
{
  "$schema": "https://raw.githubusercontent.com/frankxai/arcanea-opencode/master/assets/arcanea-opencode.schema.json",
  "persona": "Arcanea",
  "personas": {
    "Arcanea": {
      "display_name": "Arcanea",
      "color": "#8b5cf6",
      "prompt_append": "... custom Arcanea prompt ..."
    }
  },
  "agents": {
    "Arcanea": {
      "prompt_append": "Additional agent-specific prompts"
    }
  }
}
```

---

## Previous State (Before Fork)

**Problem**: Just patched `~/.config/opencode/node_modules/oh-my-opencode/dist/*.js` directly
- Fragile - any `bun update` will overwrite
- Not portable
- Can't have both Sisyphus AND Arcanea

## Vision

1. **Both Sisyphus and Arcanea coexist** - User can switch between them
2. **Arcanea is the default** - But Sisyphus remains available
3. **Proper installation** - Not just patching node_modules
4. **Portable config** - Easy to set up on new machines

---

## Architecture Options

### Option A: Fork oh-my-opencode → "arcanea-opencode"

**Approach**: Fork the repo, rename to "arcanea-opencode", make display name configurable

```
GitHub:
  frankxai/arcanea-opencode (forked from code-yeongyu/oh-my-opencode)

Installation:
  cd ~/.config/opencode
  bun add arcanea-opencode  # Instead of oh-my-opencode
```

**Pros**:
- Clean separation
- Can diverge significantly from oh-my-opencode
- Full control over naming

**Cons**:
- Maintaining a fork = ongoing work
- Need to keep up with upstream updates
- Two separate packages to manage

**License**: SUL-1.0 allows this for personal/non-commercial use. Must include:
- Original license
- Prominent notice that we modified it

---

### Option B: Make oh-my-opencode configurable (PR upstream)

**Approach**: Submit PR to oh-my-opencode adding `display_name` config option

```json
// oh-my-opencode.json
{
  "display_name": "Arcanea",  // NEW: changes UI display
  "agents": {
    "Arcanea": { ... }  // Config key matches display_name
  }
}
```

**Pros**:
- No fork to maintain
- Benefits everyone
- Stays in sync with upstream

**Cons**:
- PR might not be accepted
- Less control over implementation
- Depends on maintainer responsiveness

---

### Option C: Arcanea as oh-my-opencode plugin/extension

**Approach**: Keep oh-my-opencode as-is, add Arcanea as a layer on top

```
~/.config/opencode/
├── node_modules/
│   ├── oh-my-opencode/          # Unmodified
│   └── arcanea-plugin/          # Our extension
├── oh-my-opencode.json          # Base config
└── arcanea.json                 # Arcanea-specific config
```

**Pros**:
- No fork needed
- Clean separation of concerns
- Easy to update oh-my-opencode independently

**Cons**:
- Limited by what oh-my-opencode exposes
- Can't change the display name without patching
- More complexity

---

### Option D: Hybrid - Fork + Configurable + Both Agents

**Approach**: Fork oh-my-opencode, make it support multiple "personas"

```json
// arcanea-opencode.json (our fork's config)
{
  "personas": {
    "Arcanea": {
      "display_name": "Arcanea",
      "model": "anthropic/claude-opus-4-5",
      "prompt_file": "./personas/arcanea.md",
      "is_default": true
    },
    "Sisyphus": {
      "display_name": "Sisyphus", 
      "model": "anthropic/claude-sonnet-4",
      "prompt_file": "./personas/sisyphus.md",
      "is_default": false
    }
  },
  "agents": {
    // Shared agent configs
  }
}
```

**Pros**:
- Best of all worlds
- Both personas available
- Configurable defaults
- Could contribute back upstream

**Cons**:
- Most work upfront
- Fork maintenance

---

## Recommended Path: Option D (Hybrid)

### Phase 1: Quick Fork (NOW)
1. Fork oh-my-opencode → frankxai/arcanea-opencode
2. Add `display_name` config option (minimal change)
3. Test locally
4. Install from GitHub instead of npm

### Phase 2: Multi-Persona Support (NEXT)
1. Add `personas` config structure
2. Allow switching between Arcanea/Sisyphus
3. Each persona can have different:
   - Display name
   - Default model
   - System prompt additions
   - Agent configurations

### Phase 3: Upstream Contribution (LATER)
1. Clean up the configurable display_name feature
2. Submit PR to oh-my-opencode
3. If accepted, consider merging back or maintaining as separate project

---

## File Structure After Implementation

```
~/.config/opencode/
├── node_modules/
│   └── arcanea-opencode/        # Our fork (replaces oh-my-opencode)
│       ├── dist/
│       ├── personas/
│       │   ├── arcanea.md       # Arcanea system prompt
│       │   └── sisyphus.md      # Original Sisyphus prompt
│       └── package.json
├── arcanea-opencode.json        # Main config
└── ARCANEA.md                   # Project-level prompt additions

/mnt/c/Users/Frank/Arcanea/arcanea-opencode/  # Source repo
├── src/
│   ├── shared/
│   │   └── personas.ts          # NEW: Persona management
│   └── ...
├── personas/
│   ├── arcanea.md
│   └── sisyphus.md
└── package.json
```

---

## Installation Flow (After Fork)

```bash
# Remove old oh-my-opencode
cd ~/.config/opencode
bun remove oh-my-opencode

# Install our fork
bun add github:frankxai/arcanea-opencode

# Config automatically uses arcanea-opencode.json
```

---

## Key Changes Needed in Fork

### 1. Add display_name config option

```typescript
// src/shared/config.ts
interface PluginConfig {
  display_name?: string;  // NEW
  agents: { ... };
}
```

### 2. Use display_name in UI rendering

```typescript
// Where "Sisyphus" is hardcoded
const displayName = config.display_name ?? "Sisyphus";
```

### 3. Make AGENT_NAME_MAP configurable

```typescript
// Instead of hardcoded
const AGENT_NAME_MAP = {
  omo: config.display_name ?? "Sisyphus",
  // ...
};
```

---

## Questions to Resolve

1. **Should Arcanea be a completely separate project or stay close to oh-my-opencode?**
   - Separate = more freedom, more maintenance
   - Close = easier updates, less freedom

2. **Do we want to contribute back to oh-my-opencode?**
   - Yes = keep changes minimal and clean
   - No = can diverge significantly

3. **What's the long-term vision for Arcanea + OpenCode?**
   - Just a persona/skin? → Option B or C
   - Fundamentally different tool? → Option A or D

---

## Next Steps

1. [x] Fork oh-my-opencode to frankxai/arcanea-opencode
2. [x] Add display_name config option (persona system)
3. [x] Test locally (typecheck + build passed)
4. [x] Document installation process (see top of file)
5. [x] Create persona system (built into src/shared/persona.ts)
6. [ ] Consider PR to upstream for display_name feature
7. [ ] Test installation from GitHub in clean environment
8. [ ] Update oh-my-opencode.json → arcanea-opencode.json in ~/.config/opencode

---

## License Compliance (SUL-1.0)

When forking, we MUST:
1. [x] Include original LICENSE.md
2. [x] Add prominent notice: "This software is a modified version of oh-my-opencode by YeonGyu Kim" (NOTICE.md)
3. [x] Keep it non-commercial or internal business use only
4. [x] Not remove any copyright notices

---

## Files Created/Modified in Fork

```
/mnt/c/Users/Frank/Arcanea/arcanea-opencode-fork/
├── package.json                    # Renamed to arcanea-opencode v3.0.0
├── NOTICE.md                       # License compliance notice (NEW)
├── assets/
│   └── arcanea-opencode.schema.json # Renamed schema
├── script/
│   └── build-schema.ts             # Updated for new schema name
└── src/
    ├── agents/
    │   ├── index.ts                # Export CreateBuiltinAgentsOptions
    │   └── utils.ts                # Added persona support to createBuiltinAgents
    ├── config/
    │   ├── index.ts                # Export persona types
    │   └── schema.ts               # Added PersonaConfigSchema, PersonasConfigSchema
    └── shared/
        ├── migration.ts            # Made AGENT_NAME_MAP configurable
        └── persona.ts              # NEW - Persona management system
```

---

*Last updated: Session - Arcanea OpenCode fork completed*
