# Arcanea Implementation Architecture

## 🗺️ Where Things Should Live

### Current Structure (What You Have)

```
Arcanea/
├── .claude/                    ❌ NOT PRESENT (but referenced in docs)
├── AGENTS.md                   ✅ 38 guardians documented
├── agents.md                   ✅ Agent system overview
├── SKILL.md                    ✅ Skill system overview
├── skills.md                   ✅ Skills documentation
├── arcanea-agents/            ✅ NEW: 64-agent registry
│   ├── registry.js
│   └── luminor-conductor.js
├── arcanea-opencode/          ✅ EXISTS
│   ├── .opencode/
│   └── src/
├── arcaneabot/                ✅ EXISTS (moltbot-based)
│   └── skills/
├── intelligence-os/           ✅ EXISTS
│   ├── .claude/CLAUDE.md     ✅ Canonical frequencies
│   └── skills/                ✅ 10 gate skills
├── labs/
│   └── Arcanea-Prompt-Language-System/
│       └── engine/            ✅ Parser, workflows
└── arcanea.ai/                ✅ Next.js app
    └── components/
        └── prompt-books/      ✅ React components
```

### What Should Actually Exist

You have **multiple overlapping systems**. Here's how to consolidate:

## 🎯 Recommended Consolidated Structure

### Core Philosophy: **One System, Multiple Interfaces**

```
Arcanea/
├── core/                      # Shared brain
│   ├── agents/               # 64-agent registry
│   │   ├── registry.json     # Master agent definitions
│   │   ├── prompts/          # Agent prompt templates
│   │   └── routing/          # Luminor conductor
│   ├── engine/               # Execution engine
│   │   ├── parser.js         # .arc parser
│   │   ├── workflows.js      # Task orchestration
│   │   └── cache.js          # Response caching
│   └── knowledge/            # Arcanean lore
│       ├── canon.md          # Source of truth
│       ├── mythology/        # Guardian stories
│       └── frequencies.md    # 174-1111Hz system
│
├── interfaces/               # Different ways to access
│   ├── claude/              # Claude Code integration
│   │   ├── CLAUDE.md        # Instructions for Claude
│   │   ├── skills/          # Claude skills
│   │   └── commands/        # /slash commands
│   ├── opencode/            # opencode editor integration
│   │   ├── .opencode/       # opencode commands
│   │   ├── skills/          # opencode skills
│   │   └── prompts/         # Inline prompts
│   ├── desktop/             # Tauri desktop app
│   │   ├── src/            # React + Tauri
│   │   ├── prompt-books/    # Premium UI
│   │   └── assets/          # Icons, themes
│   └── web/                 # arcanea.ai web app
│       ├── app/            # Next.js app
│       └── components/      # Shared components
│
├── integrations/            # Third-party connections
│   ├── obsidian/           # Obsidian plugin
│   ├── vscode/             # VS Code extension
│   └── api/                # REST API for custom
│
└── deployment/             # Deployment configs
    ├── vercel.json         # Web deployment
    ├── tauri.conf.json     # Desktop build
    └── docker/             # Containerized API
```

---

## 🎨 How .claude/CLAUDE.md Should Work

### Purpose
Tells Claude Code (when running in Arcanea directory) how to behave as an Arcanean agent.

### Location
```
Arcanea/.claude/CLAUDE.md
```

### Content Structure
```markdown
---
context: arcanea-v4
agents: 64
mode: hybrid
---

# Arcanea Claude Instructions

## You Are
An Arcanean agent assisting with creative projects.

## Available Commands
- @ignition - Rapid ideation
- @depth - Emotional analysis
- @structure - System design

## Canonical Frequencies (Use These)
| Task Type | Frequency | Agent |
|-----------|-----------|-------|
| Creative burst | 528Hz | Ignition |
| Emotional depth | 396Hz | Depth |
| System design | 852Hz | Structure |

## Workflow
When user asks for creative help:
1. Analyze request complexity
2. Select appropriate agent
3. Route through Luminor
4. Provide structured output

## Output Format
Always wrap in .arc format:
```arc
@output
{{content}}
@meta
agent: {{agent}}
frequency: {{frequency}}
```
```

### Integration Points
Claude Code reads this when:
- User runs `claude` in Arcanea directory
- Uses `/agent` command
- Calls @guardian mention

---

## ⚡ How .opencode/ Should Work

### Purpose
opencode editor commands and skills for Arcanea integration.

### Location
```
Arcanea/.opencode/
├── commands/
│   ├── agent-invoke.md      # @agent command
│   ├── spell-cast.md        # Cast .arc spells
│   └── workflow-start.md    # Start workflows
└── skills/
    └── arcanea-coding-agent/
        ├── SKILL.md         # Skill definition
        └── prompts/         # System prompts
```

### Example Command: agent-invoke.md
```markdown
---
name: agent-invoke
description: Invoke an Arcanean agent
---

# Invoke Arcanean Agent

Usage: `@ignition help me brainstorm ideas`

## Process
1. Parse agent name from @mention
2. Load agent configuration from core/agents/
3. Build context-aware prompt
4. Call AI (opencode or Claude)
5. Return formatted output

## Example
Input: "@depth analyze this character's motivation"
Output: [Emotional depth analysis from Depth agent]
```

---

## 📦 How SKILL.md Files Should Work

### Two Types of Skills

**1. Gate Skills (Elemental)**
Location: `core/skills/{gate}-gate/SKILL.md`

Example: `fire-gate/SKILL.md`
```markdown
---
gate: Fire
frequency: 396Hz
guardian: Draconia
element: Fire
---

# Fire Gate Skills

## Capabilities
- Rapid ideation (@ignition)
- Transformation (@transmutation)
- Breakthrough (@eruption)

## When to Use
- Creative blocks
- Need intense energy
- Transformation required

## Prompt Template
```
You are {{agent}} from the Fire Court.
Frequency: {{frequency}}
Task: {{task}}
Provide fiery, passionate response.
```
```

**2. Domain Skills (Functional)**
Location: `core/skills/domain/SKILL.md`

Example: `character-design/SKILL.md`
```markdown
---
domain: Character Design
agents: [ignition, depth, foundation]
workflow: character-creation
---

# Character Design Skill

## Process
1. @ignition - Spark initial concept
2. @depth - Add emotional layers
3. @foundation - Ground in consistency

## Output Format
.arc character file with:
- @character definition
- @psychology analysis
- @backstory narrative
```

---

## 🔌 Plugin Ecosystem Architecture

### How Plugins Work

```typescript
// Plugin interface
interface ArcaneaPlugin {
  name: string;
  version: string;
  
  // What this plugin provides
  agents?: AgentDefinition[];
  skills?: SkillDefinition[];
  workflows?: WorkflowDefinition[];
  
  // Hooks into system
  onInit: (core: ArcaneaCore) => void;
  onAgentInvoke: (agent: string, context: Context) => Promise<Result>;
}

// Example: Fantasy World Plugin
const fantasyWorldsPlugin = {
  name: "fantasy-worlds",
  version: "1.0.0",
  
  agents: [
    {
      id: "geography-master",
      name: "Geography Master",
      specialty: "Map and terrain design",
      element: "earth"
    }
  ],
  
  onInit: (core) => {
    core.registerAgent('geography-master', config);
  }
};
```

### Plugin Discovery

```
Arcanea/plugins/           # Built-in
~/.arcanea/plugins/        # User installed
./arcanea-plugins/         # Project-specific
```

### Plugin Registry (Future)
```
npm install arcanea-plugin-fantasy-worlds
# Automatically registers agents and skills
```

---

## 🎨 How Prompt Book UI Connects

### Architecture

```
┌─────────────────────────────────────────────┐
│  Prompt Book UI (React/Tauri/Desktop)       │
│  ┌─────────────────────────────────────┐   │
│  │  Sidebar: Agent Selection           │   │
│  │  ├─ Fire Court (@ignition, etc)    │   │
│  │  ├─ Water Court (@flow, etc)       │   │
│  │  └─ ...                            │   │
│  ├─────────────────────────────────────┤   │
│  │  Editor: Prompt Composition         │   │
│  │  ├─ Weight controls (0.1-2.0)      │   │
│  │  ├─ Tag builder (Quality/Style)    │   │
│  │  └─ Negative prompts               │   │
│  ├─────────────────────────────────────┤   │
│  │  Preview: Generated Output          │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  Arcanea Core (Node.js/Rust)                │
│  ├─ Agent Registry (64 agents)             │
│  ├─ Luminor Conductor (orchestration)      │
│  ├─ AI Router (opencode/Claude)            │
│  └─ Cache & Learning                       │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  AI Providers                               │
│  ├─ opencode (kimi-k2.5-free)              │
│  ├─ Claude API (BYOK)                      │
│  └─ Local models (optional)                │
└─────────────────────────────────────────────┘
```

### Data Flow

1. **User selects agent** in UI sidebar
2. **UI calls core API**: `POST /api/agent/invoke`
3. **Core loads agent** from registry
4. **Luminor builds prompt** with agent template
5. **AI Router selects provider** (opencode/Claude)
6. **AI generates response**
7. **Core caches result** and returns to UI
8. **UI displays formatted output**

### API Endpoints

```typescript
// Core API (what UI calls)
POST /api/agent/invoke
{
  agent: "ignition",
  task: "brainstorm character ideas",
  context: { /* previous outputs */ }
}

Response:
{
  agent: "Ignition",
  output: "Here's 5 fiery character concepts...",
  frequency: "528Hz",
  executionTime: 450
}
```

---

## 🚀 Where You Can Open It

### 1. **Tauri Desktop App** (Standalone)

**Location:** `Arcanea/desktop/`

**How to open:**
```bash
cd Arcanea/desktop
npm install
npm run tauri dev      # Development
npm run tauri build    # Production executable
```

**Result:** Native app window with full UI

### 2. **Web App** (Browser)

**Location:** `Arcanea/arcanea.ai/`

**How to open:**
```bash
cd Arcanea/arcanea.ai
npm install
npm run dev            # localhost:3000
```

**Result:** Browser-based app

### 3. **VS Code Extension**

**Location:** `Arcanea/integrations/vscode/`

**How to open:**
```bash
code --install-extension arcanea-vscode.vsix
# Then use command palette: "Arcanea: Open Prompt Book"
```

### 4. **Obsidian Plugin**

**Location:** `Arcanea/integrations/obsidian/`

**How to open:**
1. Install plugin in Obsidian
2. Click Arcanea icon in sidebar
3. Opens prompt book in side panel

### 5. **Claude Code CLI**

**Location:** Use anywhere with `Arcanea/.claude/CLAUDE.md`

**How to open:**
```bash
cd Arcanea
claude
# Then: @ignition help me brainstorm
```

### 6. **opencode Editor**

**Location:** `Arcanea/.opencode/`

**How to open:**
1. Open any file in opencode
2. Type `@ignition` in chat
3. Agent responds inline

---

## 📦 Deployment Options

### Option 1: Desktop App (Recommended First)

**Platform:** Tauri (Rust + Web frontend)

**Deploy to:**
- **Windows:** `.msi` installer
- **Mac:** `.dmg` or Mac App Store
- **Linux:** `.AppImage` or `.deb`

**Pros:**
- Works offline
- Fast (native performance)
- No backend needed
- Easy distribution

**Build:**
```bash
cd Arcanea/desktop
npm run tauri build -- --target universal-apple-darwin  # Mac
npm run tauri build -- --target x86_64-pc-windows-msvc # Windows
```

### Option 2: Web App (SaaS)

**Platform:** Vercel + Next.js

**Deploy:**
```bash
cd Arcanea/arcanea.ai
vercel --prod
```

**Pros:**
- Instant updates
- Cross-platform (any browser)
- Easy to share
- Subscription model possible

**Cons:**
- Requires internet
- Backend costs
- Slower than native

### Option 3: CLI Tool (NPM)

**Package:** `arcanea-cli`

**Install:**
```bash
npm install -g arcanea-cli
arcanea prompt-book
```

**Opens:** Terminal-based UI or launches desktop app

### Option 4: VS Code Extension

**Marketplace:** VS Code Extension Store

**Benefits:**
- Context-aware (knows your code)
- Sidebar integration
- Command palette access

### Option 5: API Server (Self-Hosted)

**Docker:**
```bash
docker run -p 3000:3000 arcanea/api
```

**Use for:**
- Custom integrations
- Team collaboration
- Enterprise deployments

---

## 🎯 Implementation Priority

### Phase 1: Core (Week 1)
- [ ] Consolidate agent registry (64 agents)
- [ ] Build Luminor conductor
- [ ] Create .claude/CLAUDE.md
- [ ] Create .opencode/ commands

### Phase 2: Desktop (Week 2)
- [ ] Tauri shell
- [ ] Port PremiumPromptBooks.tsx
- [ ] SQLite local storage
- [ ] Build executables

### Phase 3: Integrations (Week 3)
- [ ] VS Code extension
- [ ] Obsidian plugin
- [ ] Web app (Vercel)

### Phase 4: Distribution (Week 4)
- [ ] GitHub releases
- [ ] npm publish
- [ ] VS Code marketplace
- [ ] Obsidian community plugins

---

## 📊 Summary

### What Exists Now
- ✅ 64-agent registry (arcanea-agents/)
- ✅ Luminor conductor (working)
- ✅ Premium UI components
- ✅ intelligence-os/ with frequencies
- ✅ arcaneabot/ with many skills
- ✅ Parser and workflows

### What Needs to Be Built
- ❌ Unified .claude/CLAUDE.md
- ❌ Unified .opencode/ skills
- ❌ Tauri desktop app
- ❌ VS Code extension
- ❌ Obsidian plugin
- ❌ Hybrid AI router (opencode + Claude)

### Where to Open It
1. **Desktop:** Tauri app (primary)
2. **Web:** arcanea.ai (secondary)
3. **VS Code:** Extension (integration)
4. **Obsidian:** Plugin (integration)
5. **CLI:** npm package (power users)

### Deployment
- **Primary:** Desktop app (GitHub releases)
- **Secondary:** Web (Vercel)
- **Integrations:** VS Code marketplace, Obsidian plugins

---

**The architecture is clear. The components exist. It just needs consolidation and packaging.**
