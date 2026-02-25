---
name: swarm-crosscheck
description: Launch multi-Guardian swarm for cross-verification with different models
---

# Arcanea Swarm Cross-Check

## Usage

```
@swarm-crosscheck <task> --guardians lyssandria,lyria,draconia --model cheap
@swarm-crosscheck "Review this code for issues" --guardians all --model balanced
@swarm-crosscheck "Design the auth system" --guardians lyssandria,ino --model powerful
```

## What It Does

Launches multiple Guardian agents in parallel to cross-verify work:

1. **Different models** per Guardian (cost optimization)
2. **Parallel execution** for speed
3. **Consensus gathering** - all agents review each other's work
4. **Synthesis** - combines findings into unified output

## Guardian Model Mapping

| Guardian      | Gate | Hz   | Model        | Best For                 |
| ------------- | ---- | ---- | ------------ | ------------------------ |
| `@lyssandria` | 1    | 174  | MiniMax Free | Architecture, foundation |
| `@leyla`      | 2    | 285  | MiniMax Free | UI/UX, creative          |
| `@draconia`   | 3    | 396  | Big-Pickle   | Code generation          |
| `@maylinn`    | 4    | 417  | MiniMax Free | Quick fixes, healing     |
| `@alera`      | 5    | 528  | MiniMax Free | Documentation            |
| `@lyria`      | 6    | 639  | Big-Pickle   | Testing, review          |
| `@aiyami`     | 7    | 741  | Big-Pickle   | Integration, wisdom      |
| `@elara`      | 8    | 852  | MiniMax Free | Perspective shifts       |
| `@ino`        | 9    | 963  | Big-Pickle   | Unity, synthesis         |
| `@shinkami`   | 10   | 1111 | Big-Pickle   | Meta-orchestration       |

## Model Presets

| Preset             | Description                                |
| ------------------ | ------------------------------------------ |
| `--model cheap`    | All MiniMax M2.5 Free                      |
| `--model balanced` | Big-Pickle for complex, MiniMax for simple |
| `--model powerful` | All Big-Pickle                             |
| `--model auto`     | Based on task complexity                   |

## Options

| Option        | Description                                 |
| ------------- | ------------------------------------------- |
| `--guardians` | Comma-separated list or "all"               |
| `--model`     | Model preset (cheap/balanced/powerful/auto) |
| `--async`     | Run in background, notify on complete       |
| `--consensus` | Require all agents to agree                 |

## Examples

### Code Review with 3 Guardians

```
@swarm-crosscheck "Review auth.ts for security issues" --guardians lyria,lyssandria,draconia
```

### Design Review with All Guardians

```
@swarm-crosscheck "Review this API design" --guardians all --model balanced
```

### Parallel Implementation + Review

```
@swarm-crosscheck "Implement user dashboard" --guardians draconia,lyria --async
```

## Execution Flow

1. Parse task and Guardian selection
2. Assign models based on preset
3. Launch all Guardians in parallel (background)
4. Collect results as they complete
5. Run consensus check (optional)
6. Synthesize findings into unified response

## Notes

- Uses OpenCode's native multi-agent execution
- Each Guardian brings their domain expertise
- Big-Pickle (200K context) for complex reasoning
- MiniMax M2.5 Free for fast, simple tasks
