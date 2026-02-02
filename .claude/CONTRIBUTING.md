# Contributing to Arcanea Skills

Welcome, fellow creator. Here's how to contribute.

---

## Types of Contributions

### 1. New Skills
Create skills that extend the system.

### 2. Skill Improvements
Enhance existing skills with better techniques.

### 3. Documentation
Improve guides, examples, and tutorials.

### 4. Bug Reports
Report issues with skill behavior.

### 5. Community Patterns
Share patterns you've discovered.

---

## Skill Creation Guidelines

### Required Elements

```yaml
---
name: arcanea-[skill-name]
description: Clear description of purpose
version: 1.0.0
author: Your name
tags: [relevant, tags]
triggers:
  - natural language trigger
  - another trigger
---
```

### Quality Standards

Skills must score 80+ on the Quality Rubric:

| Dimension | Weight |
|-----------|--------|
| Actionability | 25 |
| Completeness | 20 |
| Clarity | 20 |
| Memorability | 15 |
| Token Efficiency | 20 |

### Voice Requirements

- Elevated but accessible
- Practical, not academic
- Inclusive and universal
- Arcanean mythology where appropriate

---

## Submission Process

1. **Create** your skill following guidelines
2. **Self-review** using Quality Rubric
3. **Test** in real usage
4. **Submit** via pull request
5. **Respond** to feedback

---

## File Locations

```
.claude/
├── skills/
│   ├── arcanea/      # Core skills
│   ├── creative/     # Writing skills
│   ├── development/  # Coding skills
│   ├── industry/     # Domain skills
│   ├── meta/         # Meta-skills
│   └── premium/      # Advanced skills
├── commands/         # Slash commands
├── agents/           # Agent definitions
├── guides/           # User documentation
├── templates/        # Reusable templates
└── training/         # Exercises and paths
```

---

## Code of Conduct

- Be respectful
- Focus on the work
- Share generously
- Accept feedback gracefully
- Help others grow

---

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md
- Skill authorship metadata
- Community acknowledgments

---

*"Every contribution, however small, helps build the Library."*
