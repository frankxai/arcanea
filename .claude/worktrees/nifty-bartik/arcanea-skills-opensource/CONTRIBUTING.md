# Contributing to Arcanea Skills

> *"The creative community grows stronger when we share our tools."*

Thank you for considering contributing to Arcanea Skills! This document provides guidelines for contributing new skills, improving existing ones, and extending the Arcanea ecosystem.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Types of Contributions](#types-of-contributions)
3. [Skill Structure](#skill-structure)
4. [The Arcanean Voice](#the-arcanean-voice)
5. [Quality Standards](#quality-standards)
6. [Submission Process](#submission-process)

---

## Philosophy

### Core Principles

Before contributing, understand the Arcanea philosophy:

1. **Wisdom must be usable** - Every framework should lead to action
2. **The work is the teacher** - Learning happens through making
3. **Name it to navigate it** - Psychological clarity enables progress
4. **Both/and, not either/or** - Human AND AI, structure AND freedom
5. **The creator is the authority** - All guidance serves the user's vision

### The Centaur Principle

Arcanea skills embody the centaur model of AI collaboration:
- Human provides: Taste, meaning, vision, judgment
- AI provides: Generation, exploration, patterns, speed
- Together: Greater than either alone

Skills should enhance this collaboration, not replace human creativity.

---

## Types of Contributions

### 1. New Skills

Create entirely new skills that fit the Arcanea ecosystem:

**Good candidates:**
- Creative domains not yet covered
- Development practices with Arcanean philosophy
- Psychological tools for creators
- Integration patterns for AI collaboration

**Examples:**
- `arcanea-poetry-forge` - Poetic craft and form
- `arcanea-dialogue-master` - Conversation and subtext
- `arcanea-refactor-ritual` - Code refactoring practices

### 2. Skill Improvements

Enhance existing skills:
- Add missing patterns or techniques
- Improve examples and templates
- Fix errors or unclear sections
- Add quick reference materials

### 3. New Luminors

Create domain-specific Luminors:

```markdown
# [Name] - The Luminor of [Domain]

**Domain**: [Area of expertise]
**Color**: [Associated color]
**Voice**: [Communication style]

**Core Teaching**:
> *"[Signature wisdom quote]"*

**Signature Questions**:
1. [Question that illuminates]
2. [Question that challenges]
3. [Question that inspires action]

**When to Channel**:
- [Situation 1]
- [Situation 2]

**Navigation Protocol**:
1. [Step 1]
2. [Step 2]
```

### 4. Bestiary Creatures

Add new creative obstacles:

```markdown
## The [Creature Name]

**What It Is**: [Description]

**How It Manifests**:
- [Symptom 1]
- [Symptom 2]

**The Truth It Hides**: [Underlying reality]

**Navigation Protocol**:
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

### 5. Documentation

- Improve README clarity
- Add use case examples
- Create tutorials
- Translate to other languages

---

## Skill Structure

### Required Format

All skills must follow the official SKILL.md format:

```markdown
---
name: arcanea-[skill-name]
description: Clear description of what this skill does and when to use it
version: 1.0.0
author: Your Name
tags: [relevant, tags]
triggers:
  - keyword1
  - keyword2
---

# Skill Title

> *"Opening quote that captures the essence"*

---

## Core Content

[Skill content here]

---

*"Closing wisdom"*
```

### Frontmatter Requirements

| Field | Required | Format | Notes |
|-------|----------|--------|-------|
| `name` | Yes | `arcanea-kebab-case` | Lowercase, hyphens |
| `description` | Yes | 1-2 sentences | Critical for discovery |
| `version` | Yes | semver | e.g., `1.0.0` |
| `author` | Yes | String | Your name/handle |
| `tags` | Yes | Array | 3-6 relevant tags |
| `triggers` | Recommended | Array | Activation keywords |

### Token Budget

Keep skills efficient:

| Skill Type | Target | Maximum |
|------------|--------|---------|
| Core skill | 3-5k tokens | 6k |
| Support skill | 2-3k tokens | 4k |
| Quick reference | 1-2k tokens | 2k |

---

## The Arcanean Voice

### Voice Characteristics

**Is:**
- Elevated but accessible
- Practical wisdom, not theory
- Encouraging without flattery
- Direct without harshness
- Mythological without being precious

**Is Not:**
- Academic or jargon-heavy
- Vague or mystical without substance
- Condescending
- Overly casual
- Preachy or moralistic

### Examples

```markdown
# Good
> *"Fear is not your enemy. Hesitation is."*

The story structure isn't a cage—it's a foundation.
Build on it, then transcend it.

# Bad
> *"One should endeavor to minimize hesitancy in creative pursuits."*

You really need to understand that story structure is important
because it helps you write better and everyone knows that.
```

### Luminor Voice Patterns

When writing Luminor content, maintain distinct voices:

| Luminor | Voice Pattern |
|---------|---------------|
| Valora | Direct imperatives, challenges |
| Sophron | Socratic questions, patience |
| Kardia | Warm, vulnerable, emotionally honest |
| Poiesis | Playful, curious, experimental |
| Enduran | Steady, calm, long-view |
| Orakis | Mystical, pattern-seeing |
| Eudaira | Light, celebratory, joyful |

---

## Quality Standards

### Content Checklist

Before submitting:

```
□ Frontmatter is complete and accurate
□ Description enables correct skill discovery
□ Content is actionable, not just theoretical
□ Examples are concrete and useful
□ Quick reference section included
□ Token budget respected (<5k for most skills)
□ Voice consistent with Arcanean style
□ No typos or grammatical errors
□ Tested in Claude Code
```

### Skill Quality Criteria

**Essential:**
- Solves a real creative/development problem
- Provides actionable frameworks
- Includes concrete examples
- Has clear structure

**Recommended:**
- Quick reference tables
- Templates for common uses
- Integration with other Arcanea skills
- Navigation protocols for common issues

### What We Don't Accept

- Skills that are just collections of prompts
- Content that appropriates specific cultures
- Overly generic advice without frameworks
- Skills that duplicate existing functionality
- Content that encourages harmful practices

---

## Submission Process

### 1. Check Existing Skills

Before creating something new:
- Review existing skills for overlap
- Check issues for planned features
- Consider extending rather than duplicating

### 2. Open an Issue First

For significant contributions:
1. Open an issue describing your proposed skill
2. Discuss with maintainers
3. Get approval before investing time

### 3. Create Your Contribution

1. Fork the repository
2. Create a branch: `feature/skill-name` or `improve/skill-name`
3. Follow the structure guidelines
4. Test in Claude Code

### 4. Submit Pull Request

Include in your PR:
- Clear description of the skill/change
- Why it fits the Arcanea ecosystem
- How you tested it
- Any breaking changes

### 5. Review Process

Maintainers will review for:
- Arcanean voice consistency
- Technical quality
- Token efficiency
- Integration with ecosystem

---

## Recognition

Contributors are recognized in:
- README acknowledgments
- Skill file author attribution
- Community highlights

---

## Questions?

- Open an issue for clarification
- Join the Discord for discussion
- Check existing skills for examples

---

*"The creative community grows stronger when we share our tools. Thank you for contributing to Arcanea."*
