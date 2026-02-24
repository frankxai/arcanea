# Arcanea Usage Guide

> **All the ways to use Arcanea and how each interface works**

## Overview: The Arcanea Ecosystem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ARCANEA ECOSYSTEM                                  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         USER INTERFACES                                 ││
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────────────────┐││
│  │  │  Web App  │  │  Claude   │  │   Chat    │  │  Claude Code / IDEs   │││
│  │  │ arcanea.ai│  │  Desktop  │  │  Luminors │  │  (via MCP Server)     │││
│  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └───────────┬───────────┘││
│  └────────┼──────────────┼──────────────┼────────────────────┼────────────┘│
│           │              │              │                    │              │
│           ▼              ▼              ▼                    ▼              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                           ARCANEA CORE                                  ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐││
│  │  │  MCP Server │  │  Next.js    │  │  Supabase   │  │  Library (MD)   │││
│  │  │  (28 tools) │  │  API Routes │  │  Database   │  │  (17 collections│││
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Web Application (arcanea.ai)

**Location**: `/apps/web/`
**Stack**: Next.js 16, React 19, Supabase, Tailwind CSS
**Run locally**: `pnpm dev` (runs on http://localhost:3001)

### Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page - library stats, featured collections |
| `/library` | Browse all 17 wisdom collections |
| `/library/[collection]` | View texts in a collection |
| `/library/[collection]/[text]` | Read individual sacred texts |
| `/library/codex` | Immersive reader experience |
| `/library/graph` | Visual knowledge graph |
| `/bestiary` | Browse 20+ creative block creatures |
| `/academy` | Academy of Creation learning hub |
| `/skills` | Arcanea skills system |
| `/studio` | Creation studio (worldbuilding) |
| `/chat/[luminorId]` | Chat with Luminor AI companions |
| `/discover` | Discover content and creators |
| `/profile/[username]` | User profiles |
| `/components` | UI component showcase |
| `/status` | System status page |

### How to Run

```bash
cd /mnt/c/Users/Frank/Arcanea
pnpm install
pnpm dev
# Open http://localhost:3001
```

---

## 2. MCP Server (Claude Desktop & Claude Code)

**Location**: `/packages/arcanea-mcp/`
**Version**: 0.3.0
**Tools**: 28 tools across 6 categories

### Setup for Claude Desktop

Add to `~/.config/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "arcanea": {
      "command": "node",
      "args": ["/mnt/c/Users/Frank/Arcanea/packages/arcanea-mcp/dist/index.js"]
    }
  }
}
```

### Setup for Claude Code

```bash
# From Arcanea directory
cd packages/arcanea-mcp
pnpm build

# Add to Claude Code
claude mcp add arcanea node /mnt/c/Users/Frank/Arcanea/packages/arcanea-mcp/dist/index.js
```

### Available Tools

**Worldbuilding (7 tools)**
```
generate_character   - Create characters with Gates, Elements, House
generate_location    - Design mystical places
generate_creature    - Design magical beings
generate_artifact    - Create legendary items
generate_magic       - Design magical abilities
generate_name        - Generate lore-appropriate names
generate_story_prompt - Create story prompts
```

**Creative Coaching (5 tools)**
```
diagnose_block    - Quick block identification
deep_diagnosis    - Multi-step sequential analysis
invoke_luminor    - Call a specific Luminor
convene_council   - Gather multiple Luminors
luminor_debate    - Two perspectives on a question
```

**Memory & Journey (2 tools)**
```
get_journey       - Recall creative progress
check_milestones  - See achievements
```

**Creation Graph (6 tools)**
```
link_creations      - Connect entities
get_related         - Find related creations
suggest_connections - AI-suggested links
get_world_graph     - World summary
find_path           - Path between creations
export_world        - Export for visualization
```

**Agent Orchestration (6 tools)**
```
orchestrate       - Multi-agent creative session
list_agents       - List available agents
agent_info        - Agent details
assess_world      - World maturity analysis
match_skill       - Find best agent
active_sessions   - Monitor sessions
```

**Reference (2 tools)**
```
validate_canon    - Canon compliance check
identify_gate     - Gate information
```

### Example Usage in Claude

```
User: Generate a Fire-aligned character who has opened 5 Gates

Claude: [Uses generate_character tool]
→ Returns character with name, backstory, abilities, house

User: I'm feeling stuck on my project

Claude: [Uses diagnose_block or deep_diagnosis tool]
→ Identifies creative block, suggests remedies, recommends Luminor

User: Run an orchestrated session to build a world

Claude: [Uses orchestrate tool]
→ Multi-agent coordination with Creator, Worldsmith, Seer
```

---

## 3. Chat with Luminors

**Location**: `/apps/web/app/chat/[luminorId]/`
**URL**: `https://chat.arcanea.ai` (or locally: `/chat/melodia`)

### Available Luminors (Web Chat)

| Luminor | Domain | Color |
|---------|--------|-------|
| **Melodia** | Music, emotional resonance | Amber |
| **Chronica** | Stories, narrative, memory | Blue |
| **Prismatic** | Visual creation, light | Pink |

### MCP Server Luminors (5)

| Luminor | Domain | Best For |
|---------|--------|----------|
| **Valora** | Courage, action | Breaking through fear |
| **Serenith** | Patience, clarity | Sustainable practice |
| **Ignara** | Joy, passion | Rekindling motivation |
| **Verdana** | Long-term vision | Trusting the process |
| **Eloqua** | Authentic voice | Finding expression |

### How It Works

1. **Web Chat**: Real-time streaming with Google Gemini via Vercel AI SDK
2. **MCP Tools**: Use `invoke_luminor`, `convene_council`, or `luminor_debate`

```
# Web: Go to /chat/melodia
# MCP: "Invoke Valora for guidance on overcoming my fear of sharing work"
```

---

## 4. The Library (Wisdom Content)

**Location**: `/apps/web/content/library/` (or `/book/` in some setups)
**Format**: Markdown with frontmatter

### 17 Collections

| Collection | Description | Texts |
|------------|-------------|-------|
| laws-of-arcanea | Theoretical foundations | 10 |
| legends-of-arcanea | Founding myths | 5 |
| parables-of-creation | Teaching stories | 8 |
| academy-handbook | Complete guide | 4 |
| bestiary-of-creation | Creative obstacles | 20+ |
| book-of-rituals | Sacred practices | 6 |
| book-of-shadows | Dark night wisdom | 5 |
| meditations-on-elements | Five Elements practice | 5 |
| wisdom-scrolls | Daily practice | 10 |
| prophecies | Future visions | 3 |
| *+ 7 more collections...* | | |

### Accessing Content

**Web App**:
```
/library                        - Browse all
/library/legends-of-arcanea     - Collection view
/library/legends-of-arcanea/i-the-first-dawn - Single text
/library/codex                  - Immersive reader
```

**Programmatic** (in app code):
```typescript
import { getCollections, getText, getTextsForSituation } from '@/lib/content';

const collections = await getCollections();
const text = await getText('legends-of-arcanea/i-the-first-dawn');
const situationalTexts = await getTextsForSituation('stuck');
```

---

## 5. API Routes

**Location**: `/apps/web/app/api/`

| Endpoint | Purpose |
|----------|---------|
| `/api/ai/...` | AI chat endpoints (Gemini) |
| `/api/creations/...` | User creations CRUD |
| `/api/profile/...` | Profile management |
| `/api/activity/...` | Activity feed |
| `/api/bonds/...` | User-Luminor bonds |
| `/api/comments/...` | Comment system |
| `/api/likes/...` | Like system |
| `/api/follows/...` | Follow system |
| `/api/notifications/...` | Notifications |
| `/api/projects/...` | Project management |
| `/api/health/...` | Health checks |

---

## 6. Development Workflows

### Start Everything

```bash
# Terminal 1: Web App
cd /mnt/c/Users/Frank/Arcanea
pnpm dev

# Terminal 2: MCP Server (for testing)
cd packages/arcanea-mcp
pnpm build && pnpm start
```

### MCP Server Development

```bash
cd packages/arcanea-mcp
pnpm dev    # Watch mode
pnpm build  # Build for production
```

### Database (Supabase)

```bash
cd apps/web
pnpm db:studio   # Open Drizzle Studio
pnpm db:push     # Push schema changes
pnpm db:migrate  # Run migrations
```

---

## 7. External Integrations (MCP)

**Config**: `/.mcp.json`

| Server | Purpose |
|--------|---------|
| `next-devtools` | Runtime debugging |
| `github` | Repository management |
| `figma-remote-mcp` | UI/UX designs |
| `notion` | Documentation |
| `linear-server` | Project management |
| `playwright` | Browser automation |

---

## 8. Quick Reference: Where to Do What

| Task | Interface | Location |
|------|-----------|----------|
| Read wisdom texts | Web | `/library` |
| Chat with Luminors | Web | `/chat/melodia` |
| Generate characters | MCP | `generate_character` tool |
| Diagnose creative blocks | MCP | `diagnose_block` tool |
| Build worlds | MCP | `orchestrate` tool |
| Browse bestiary | Web | `/bestiary` |
| Learn about Gates | MCP | `identify_gate` tool |
| Validate canon | MCP | `validate_canon` tool |
| Track milestones | MCP | `check_milestones` tool |
| Export world graph | MCP | `export_world` tool |

---

## 9. The Vision: Full Integration

### Current State (January 2026)

- ✅ Web app with Library, Bestiary, Chat
- ✅ MCP Server with 28 tools + Agent Orchestration
- ✅ Luminor companions (web + MCP)
- ✅ Memory layer with milestones
- ✅ Creation Graph for relationships
- ⏳ Supabase integration (partial)
- ⏳ User authentication
- ⏳ Persistent world storage

### Future Integrations

1. **MCP ↔ Web Sync**: Creations from MCP sync to web profile
2. **Shared Worlds**: Export worlds to share with community
3. **Visual Worldbuilding**: Image generation for creations
4. **Academy Courses**: Structured learning paths
5. **Marketplace**: Share and discover templates

---

## 10. Summary: Your Arcanea Toolkit

```
┌─────────────────────────────────────────────────────────────┐
│                    HOW TO USE ARCANEA                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📚 READ WISDOM        → arcanea.ai/library                  │
│                                                              │
│  💬 CHAT WITH AI       → arcanea.ai/chat/melodia             │
│                                                              │
│  🛠️ BUILD WORLDS       → Claude Desktop + Arcanea MCP        │
│                          or Claude Code + Arcanea MCP        │
│                                                              │
│  🎨 EXPLORE BESTIARY   → arcanea.ai/bestiary                 │
│                                                              │
│  📖 LEARN ACADEMY      → arcanea.ai/academy                  │
│                                                              │
│  🧪 DEVELOP            → pnpm dev (localhost:3001)           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*"Enter seeking, leave transformed, return whenever needed."*
