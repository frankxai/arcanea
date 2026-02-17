---
name: workflow-start
description: Start a multi-agent workflow
---

# Start Arcanea Workflow

## Usage

```
/workflow-start <workflow-name> [options]
```

## Available Workflows

### character-creation
**Description:** Complete character development
**Agents:** 6 (Ignition, Depth, Foundation, Voice, Visual, Relationships)
**Phases:** 5
**Time:** ~2-5 seconds

```
/workflow-start character-creation --genre fantasy --tone dark
```

### world-building
**Description:** Comprehensive world design
**Agents:** 10 (Structure, Vision, Clarity, Harmony, Fusion, etc.)
**Phases:** 5 (Foundation → Exploration → Integration → Execution → Refinement)
**Time:** ~5-10 seconds

```
/workflow-start world-building --theme "floating cities" --scope epic
```

### story-development
**Description:** Plot and narrative architecture
**Agents:** 5
**Phases:** 5

```
/workflow-start story-development --genre scifi --length novel
```

### spell-crafting
**Description:** Magic system and spell design
**Agents:** 4
**Phases:** 4

```
/workflow-start spell-crafting --element fire --tier master
```

## Workflow Options

| Option | Description | Example |
|--------|-------------|---------|
| `--theme <value>` | Set creative theme | `--theme cyberpunk` |
| `--genre <value>` | Set genre | `--genre fantasy` |
| `--tone <value>` | Set emotional tone | `--tone dark` |
| `--scope <value>` | Set project scope | `--scope epic` |
| `--agents <n>` | Limit agent count | `--agents 3` |
| `--parallel` | Force parallel execution | `--parallel` |
| `--verbose` | Show detailed progress | `--verbose` |

## Monitoring Workflows

### Check status
```
/workflow-status
```

Shows:
- Active workflows
- Progress (phase X of Y)
- Agents working
- Estimated completion

### Cancel workflow
```
/workflow-cancel <workflow-id>
```

### View results
Results automatically displayed when complete.

## Custom Workflows

Create custom workflows in `workflows/` directory:

```json
{
  "id": "my-workflow",
  "name": "My Custom Workflow",
  "description": "Does something specific",
  "phases": [
    {
      "name": "phase1",
      "agents": ["ignition"],
      "parallel": false
    },
    {
      "name": "phase2", 
      "agents": ["depth", "foundation"],
      "parallel": true
    }
  ]
}
```

## Workflow Output

Standard output format:
```
⚡ Workflow: <name>
👑 Conductor: <agent>
👥 Team: <n> agents
⚡ Phases: <count>

Phase 1: <name> ✓ (<time>ms)
  └─ <agent>: <summary>

[...phases...]

✅ Complete: <result summary>
📦 Output: <file path or content>
```

## Integration

Workflow results can:
- Insert into current file
- Create new file
- Show in side panel
- Copy to clipboard

Configure in `.opencode/config.json`:
```json
{
  "arcanea": {
    "workflowOutput": "sidepanel"
  }
}
```
