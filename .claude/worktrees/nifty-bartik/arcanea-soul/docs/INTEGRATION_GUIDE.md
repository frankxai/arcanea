# Integration Guide

How to integrate the Luminor Framework into your AI systems.

## OpenCode Integration

arcanea-soul is designed to work alongside oh-my-opencode.

### Installation

```bash
cd ~/.config/opencode
npm install arcanea-soul
```

### Configuration

Generate and merge the configuration:

```typescript
import soul from "arcanea-soul"

const config = soul.generateConfig({
  orchestratorModel: "opencode/minimax-m2.1",  // For complex tasks
  agentModel: "opencode/glm-4.7-free"          // For routine tasks
})

// Merge with your opencode.json
```

Or generate a standalone config file:

```bash
bun -e "
import soul from 'arcanea-soul'
console.log(JSON.stringify(soul.generateConfig(), null, 2))
" > arcanea-config.json
```

### Available Agents

The config generates these agents (prefixed with `arc-`):

**Dev Team:**
- `arc-architect` - System design
- `arc-coder` - Implementation
- `arc-reviewer` - Code quality
- `arc-debugger` - Root cause finding

**Creative Team:**
- `arc-story` - Narrative structure
- `arc-character` - Psychology
- `arc-world` - World building
- `arc-lore` - Canon consistency

**Writing Team:**
- `arc-drafter` - First drafts
- `arc-dialogue` - Character voice
- `arc-editor` - Line editing
- `arc-continuity` - Consistency

**Research Team:**
- `arc-sage` - Deep analysis
- `arc-archivist` - Reference lookup
- `arc-scout` - Fast exploration
- `arc-muse` - Inspiration finding

## Claude Code Integration

Use the Luminor prompts in Claude Code custom commands:

```markdown
---
description: "Summon the System Architect Luminor"
---

$ARGUMENTS

{{luminor-architect}}
```

Where `{{luminor-architect}}` loads the architect's prompt from arcanea-soul.

## Custom Integration

### Get a Luminor's Full Prompt

```typescript
import { getLuminor, buildAgentPrompt } from "arcanea-soul"

const architect = getLuminor("architect")
const fullPrompt = buildAgentPrompt(architect)

// Use in your own system
yourAISystem.setSystemPrompt(fullPrompt)
```

### Diagnose Creator State

```typescript
import { helpCreator } from "arcanea-soul"

const userMessage = "I feel stuck and don't know where to start"
const diagnosis = helpCreator(userMessage)

// diagnosis = {
//   wisdom: { name: "Poiesis", ... },
//   question: "What can I make right now?",
//   guidance: "The blank page is not empty. It's full of possibility."
// }
```

### Detect Magic Words

```typescript
import { detectMagic, getMagicAgents } from "arcanea-soul"

const userInput = "ultracode this feature"
const magic = detectMagic(userInput)

if (magic) {
  const agents = getMagicAgents(magic)
  // Fire these agents in parallel
  agents.forEach(agent => fireAgent(agent))
}
```

## API Reference

### Core Functions

```typescript
// Generate full OpenCode configuration
generateConfig(options?: {
  orchestratorModel?: string  // Default: "opencode/minimax-m2.1"
  agentModel?: string         // Default: "opencode/glm-4.7-free"
}): Config

// Get a Luminor by ID
getLuminor(id: string): Agent | undefined

// Build full prompt for a Luminor
buildAgentPrompt(agent: Agent): string

// Diagnose what wisdom a stuck Creator needs
helpCreator(situation: string): {
  wisdom: Wisdom | null
  question: string
  guidance: string
}

// Detect magic words in input
detectMagic(input: string): "ultracode" | "ultraworld" | "ultrawrite" | "ultrawork" | null

// Get agents for a magic word
getMagicAgents(magic: string): Agent[]

// Diagnose which wisdom fits a situation
diagnose(situation: string): Wisdom | null
```

### Data Exports

```typescript
// All 16 Luminor agents
AGENTS: Agent[]

// The Seven Wisdoms
SEVEN_WISDOMS: Record<string, Wisdom>

// Magic word configurations
MAGIC: Record<string, MagicConfig>

// Team colors
TEAM_COLORS: { dev, creative, writing, research }

// Core identity prompts
ARCANEA_IDENTITY: string
LUMINOR_ESSENCE: string
LUMINOR_PRINCIPLES: string
```

## Best Practices

### 1. Use Appropriate Models

Heavy tasks (architect, story, world, sage) benefit from more capable models.
Routine tasks (coder, editor, scout) work fine with lighter models.

### 2. Let Luminors Do Their Job

Don't override their perspective with conflicting instructions.
They have strong opinions - that's the point.

### 3. Use Magic Words for Parallel Execution

When you need comprehensive coverage:
- `ultracode` for development tasks
- `ultraworld` for creative tasks
- `ultrawrite` for writing tasks
- `ultrawork` for deep analysis

### 4. Diagnose Before Prescribing

When a Creator is stuck, use `helpCreator()` to diagnose what they need.
Different problems need different Wisdoms.
