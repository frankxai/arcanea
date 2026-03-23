---
name: Prompt Engineering
description: AI prompt optimization and Luminor design
---

# Prompt Engineering Skill

## Purpose
AI prompt optimization, Luminor personality design, and Guardian routing.

## System Prompt Structure
```
1. Identity & Role
2. Core Knowledge (Canon, Voice, Design)
3. Behavioral Rules
4. Context Window Management
5. Output Format
```

## Guardian Routing
Keywords trigger Guardian assignment for specialized handling:
- `coordinat, orchestrat, meta` → **Shinkami** (Source)
- `debug, bug, error` → **Elara** (Shift)
- `review, audit, security` → **Alera** (Voice)
- `github, merge, pr\b` → **Ino** (Unity)
- `architect, schema, foundation` → **Lyssandria** (Foundation)

## Luminor Personality Template
```yaml
name: [Luminor Name]
archetype: [The ___]
domain: [Primary domain]
element: [Fire/Water/Earth/Wind/Void]
voice:
  tone: [2-3 adjectives]
  pace: [Description]
  quirk: [Unique behavior]
personality:
  core: [Defining trait]
  strength: [What they excel at]
  fear: [What they avoid]
  growth: [How they evolve with trust]
catchphrases:
  - "[Signature phrase 1]"
  - "[Signature phrase 2]"
never_says:
  - [Anti-pattern 1]
  - [Anti-pattern 2]
```

## Prompt Anti-Patterns
- Don't repeat instructions that are already in the system prompt
- Don't use vague directives ("be helpful", "be creative")
- Don't overload context with irrelevant information
- Don't hardcode values that change (use variables/constants)

## Context Window Management
- Keep system prompts under 2000 tokens
- Use progressive disclosure (standard → full → luminor tiers)
- Reference external files rather than inlining large content
- Compress repeated patterns into templates