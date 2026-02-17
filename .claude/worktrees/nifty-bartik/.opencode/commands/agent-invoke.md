---
name: agent-invoke
description: Invoke an Arcanean agent with current context
---

# Invoke Arcanean Agent

## Usage

```
@<agent-name> <task-description>
```

## Examples

### Simple Invocation
```
@ignition brainstorm 5 ideas for my main character
```

### With Code Context
```typescript
// Select this code, then:
@refinement improve this function's error handling

function processData(data) {
  return data.map(x => x.value);
}
```

### Complex Task
```
@orchestration design a complete magic system with:
- 5 different schools
- Clear limitations
- Cultural impact
- Visual manifestations
```

## Available Agents

Run `/agents list` to see all 64 agents.

Popular agents:
- `@ignition` - Rapid ideation (Fire Court)
- `@depth` - Emotional analysis (Water Court)
- `@structure` - System design (Earth Court)
- `@clarity` - Simplification (Air Court)
- `@vision` - Infinite possibilities (Void Court)
- `@orchestration` - Full team coordination (Master Court)

## Process

1. Parse agent name from @mention
2. Load agent configuration from `core/agents/`
3. Build context-aware prompt with:
   - Current file content
   - Cursor position
   - Selected text (if any)
   - Project structure
4. Route to appropriate AI (opencode/Claude)
5. Stream response back to editor
6. Cache result for future use

## Output

Response appears inline or in side panel depending on length:

**Short responses:** Inline after cursor
**Long responses:** Side panel with formatted output
**Code:** Syntax-highlighted in appropriate language

## Keyboard Shortcuts

- `Ctrl+Shift+A` - Open agent picker
- `Ctrl+Shift+W` - Open workflow selector
- `Ctrl+Shift+M` - Toggle arcane/pro mode

## Configuration

Set default agent in `.opencode/config.json`:
```json
{
  "arcanea": {
    "defaultAgent": "orchestration"
  }
}
```
