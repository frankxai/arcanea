# Arcanea Skill Templates

> *"A well-structured skill teaches well. Use these templates to create skills that Claude can use effectively."*

---

## Official SKILL.md Format

Every skill must follow the Anthropic official format:

```markdown
---
name: skill-name-kebab-case
description: Clear description of what this skill does and when Claude should use it. This is critical for skill discovery.
version: 1.0.0
author: Your Name
tags: [relevant, tags, for, discovery]
triggers:
  - keyword1
  - keyword2
  - phrase that activates
---

# Skill Title

> *"Opening quote that captures the essence of this skill."*

---

## Core Content

[The actual skill content goes here]

---

*"Closing wisdom or summary."*
```

---

## Template: Creative Skill

For skills that help with creative work:

```markdown
---
name: arcanea-[domain]
description: [What creative challenge this addresses and how]
version: 1.0.0
author: Arcanea
tags: [creative, domain-specific-tags]
triggers:
  - [domain keywords]
---

# The Art of [Domain]

> *"Opening wisdom about this creative domain."*

---

## The Core Truth

[One fundamental insight about this domain]

---

## Key Frameworks

### Framework 1: [Name]
```
[Visual representation or structure]
```

[Explanation of how to apply it]

### Framework 2: [Name]
[Same pattern]

---

## Common Patterns

### Pattern: [Name]
**When to use**: [Situation]
**How it works**: [Explanation]
**Example**: [Concrete example]

---

## Common Pitfalls

### The [Trap Name] Trap
**Problem**: [What goes wrong]
**Solution**: [How to avoid/fix]

---

## Quick Reference

### [Domain] Checklist
```
□ [Checklist item 1]
□ [Checklist item 2]
□ [Checklist item 3]
```

### [Domain] Templates
```markdown
## Template: [Name]

[Template structure]
```

---

*"Closing wisdom."*
```

---

## Template: Development Skill

For skills that help with software development:

```markdown
---
name: arcanea-[practice]
description: [What development practice and when to apply]
version: 1.0.0
author: Arcanea
tags: [development, practice-tags]
triggers:
  - [practice keywords]
---

# [Practice Name]: The Arcanean Way

> *"Opening philosophy connecting development to Arcanean principles."*

---

## The Philosophy

[Why this practice matters, connected to Arcanean values]

---

## The Process

### Step 1: [Name]
```
[Pseudocode or workflow]
```
[Explanation]

### Step 2: [Name]
[Continue pattern]

---

## Techniques

### Technique: [Name]
```[language]
// Code example
```
**Why it works**: [Explanation]

---

## Tools & Commands

| Tool | Purpose | Command |
|------|---------|---------|
| [Tool] | [Purpose] | `command` |

---

## Quick Reference

### [Practice] Checklist
```
□ [Step 1]
□ [Step 2]
□ [Step 3]
```

---

*"Closing wisdom."*
```

---

## Template: Guidance Skill

For skills that provide wisdom and direction:

```markdown
---
name: arcanea-[guidance-type]
description: [What guidance this provides and when needed]
version: 1.0.0
author: Arcanea
tags: [guidance, wisdom, mindset]
triggers:
  - [emotional/situational keywords]
---

# [Guidance Domain]

> *"Opening wisdom quote."*

---

## Understanding the Territory

[Context about when creators face this challenge]

---

## The Wisdom

### Principle 1: [Name]
> *"Quote embodying this principle."*

[Explanation and application]

### Principle 2: [Name]
[Continue pattern]

---

## Practices

### The [Practice Name] Ritual
```
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

**Why it works**: [Explanation]

---

## Quick Reference

| Situation | Response | First Action |
|-----------|----------|--------------|
| [State] | [Approach] | [Immediate step] |

---

*"Closing wisdom."*
```

---

## Frontmatter Best Practices

### Name
```yaml
name: arcanea-story-weave    # Good: clear, kebab-case
name: StoryWeaving           # Bad: wrong format
name: arcanea_story          # Bad: underscores
```

### Description
```yaml
# Good: Clear, actionable, specific
description: Master narrative craft using the Arcanean Story System - structure, pacing, scene architecture, and dialogue for compelling stories

# Bad: Vague, passive
description: A skill about storytelling
```

### Tags
```yaml
# Good: Mix of broad and specific
tags: [storytelling, narrative, writing, plot, scene, dialogue]

# Bad: Too few or too generic
tags: [writing]
```

### Triggers
```yaml
# Good: Variety of activation patterns
triggers:
  - story
  - plot
  - narrative
  - scene structure
  - dialogue writing

# Bad: Too narrow
triggers:
  - novel
```

---

## Token Budget Guidelines

| Skill Type | Target Tokens | Notes |
|------------|---------------|-------|
| Core skill | 3-5k | Full depth |
| Support skill | 2-3k | Focused scope |
| Quick reference | 1-2k | Tables and checklists |

### Strategies for Token Efficiency

1. **Use tables** instead of prose for lists
2. **Use code blocks** for structured content
3. **Avoid redundancy** - say it once, well
4. **Front-load** - most important content first
5. **Progressive disclosure** - overview → details

---

## Voice Guidelines

### The Arcanean Voice

**Is**:
- Elevated but accessible
- Practical wisdom, not theory
- Encouraging without flattery
- Direct without harshness

**Is Not**:
- Academic or jargon-heavy
- Vague or mystical without substance
- Condescending
- Overly casual

### Example Voice

```markdown
# Good
> *"Fear is not your enemy. Hesitation is."*

# Bad
> *"One should endeavor to minimize hesitancy in creative pursuits."*
```

---

## Quality Checklist

Before publishing a skill:

```
□ Frontmatter complete and accurate
□ Description enables correct discovery
□ Content is actionable, not just theoretical
□ Examples are concrete and useful
□ Quick reference section included
□ Token budget respected
□ Voice consistent with Arcanean style
□ Tested in Claude Code
```

---

*"The skill that teaches well serves its purpose. Craft yours with care."*
