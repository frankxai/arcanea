---
name: Community Skills Quick Start
description: Practical templates and examples to get started immediately
version: 1.0.0
---

# Community Skills Quick Start

> **Copy-paste templates to start using skills immediately**

## Agent Orchestration Templates

### Minimal Team Definition
```yaml
# .claude/agents/my-agent.md
---
name: My Agent
description: What this agent does in one line
model: sonnet
---

# My Agent

## Mission
[One sentence purpose]

## Responsibilities
- [Responsibility 1]
- [Responsibility 2]

## When to Use
Use this agent when you need to [specific task].
```

### Team Coordination Template
```yaml
# Three-agent team pattern
Team:
  Lead:
    Agent: architect
    Role: Coordinates, makes decisions

  Specialists:
    Agent 1: frontend
    Role: UI implementation

    Agent 2: backend
    Role: API and data

Communication:
  Lead → Specialists: Task assignment
  Specialists → Lead: Status, blockers
  Specialists ↔ Specialists: Interface contracts
```

### Handoff Template
```markdown
## Handoff: [From Agent] → [To Agent]

### Context
[What was the task]

### Completed
- [What's done]

### Deliverables
- [Output 1]
- [Output 2]

### For Next Agent
- [What they need to do]
- [Dependencies or constraints]

### Open Questions
- [Question 1]
```

---

## Creative Writing Templates

### Character Quick-Build
```yaml
Name: [Character Name]

# Core (required)
Want: [External goal]
Need: [Internal goal]
Fear: [What holds them back]

# Voice (pick 3)
Vocabulary: [Education/Regional/Professional]
Rhythm: [Short sentences / Long flowing / Mixed]
Quirks: [Verbal tics, catchphrases, topics they return to]

# One-line summary
"[Name] wants [want] but fears [fear], and must learn [need]."
```

### Scene Structure
```markdown
## Scene: [Name]

**POV:** [Who experiences this]
**Goal:** [What POV wants in this scene]
**Obstacle:** [What prevents it]

### Beats
1. [Establish situation]
2. [Introduce conflict]
3. [Escalate tension]
4. [Turning point]
5. [New status/hook to next scene]

**End state:** [How situation changed]
```

### Story Pitch Format
```markdown
[GENRE] [LENGTH]

When [PROTAGONIST] faces [INCITING INCIDENT],
they must [GOAL/QUEST].
But [OBSTACLE/ANTAGONIST] threatens to [STAKES].
[PROTAGONIST] must [CLIMACTIC CHOICE]
or [CONSEQUENCE OF FAILURE].
```

---

## Design System Templates

### Minimal Token Setup
```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-background: #ffffff;
  --color-text: #1f2937;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Typography */
  --font-sans: system-ui, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

### Component Pattern
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

---

## Development Workflow Templates

### PR Description
```markdown
## Summary
[2-3 sentences on what this PR does]

## Changes
- [Change 1]
- [Change 2]

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Edge cases verified

## Screenshots
[If UI changes]
```

### Commit Message Format
```
type(scope): short description

- Detail 1
- Detail 2

Closes #123
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

### Bug Report
```markdown
## Bug: [Title]

**Environment:** [Browser, OS, Version]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What happens]

**Evidence:** [Screenshot/console errors]
```

---

## Testing Templates

### Unit Test Structure
```typescript
describe('[Unit Name]', () => {
  describe('[Method/Scenario]', () => {
    it('does expected thing', () => {
      // Arrange
      const input = createTestData();

      // Act
      const result = unitUnderTest(input);

      // Assert
      expect(result).toBe(expectedValue);
    });

    it('handles edge case', () => {
      // Edge case test
    });

    it('throws on invalid input', () => {
      expect(() => unitUnderTest(null)).toThrow();
    });
  });
});
```

### Integration Test Pattern
```typescript
describe('POST /api/resource', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it('creates resource with valid data', async () => {
    const response = await request(app)
      .post('/api/resource')
      .send(validData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      ...validData
    });
  });

  it('returns 400 with invalid data', async () => {
    const response = await request(app)
      .post('/api/resource')
      .send({});

    expect(response.status).toBe(400);
  });
});
```

---

## Documentation Templates

### README Structure
```markdown
# Project Name

> One-line description

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Feature 1
- Feature 2

## Documentation

- [Getting Started](./docs/getting-started.md)
- [API Reference](./docs/api.md)

## License

MIT
```

### Function Documentation
```typescript
/**
 * Brief description of what function does.
 *
 * @param paramName - Description of parameter
 * @returns Description of return value
 *
 * @example
 * \`\`\`ts
 * const result = functionName(input);
 * \`\`\`
 */
```

### How-To Guide Template
```markdown
# How to [Task]

## Prerequisites

- [Requirement 1]
- [Requirement 2]

## Steps

### 1. [First Step]

[Description]

\`\`\`bash
[Command or code]
\`\`\`

### 2. [Second Step]

[Description]

## Troubleshooting

**Problem:** [Common issue]
**Solution:** [How to fix]

## Next Steps

- [Related guide 1]
- [Related guide 2]
```

---

## Quick Decisions

### When to use which skill

| Situation | Skill to Use |
|-----------|--------------|
| Coordinating multiple AI agents | agent-orchestration |
| Writing stories, characters, content | creative-writing |
| Building design tokens, components | design-systems |
| Improving dev process | development-workflows |
| Writing tests | testing-strategies |
| Writing docs | documentation-patterns |

### When to upgrade to premium

Consider premium when you need:
- **Teacher Team**: Personalized learning at scale
- **Visionary Team**: Strategic planning, innovation
- **Enterprise**: Scale, compliance, custom solutions
- **Industry Verticals**: Domain-specific expertise

---

*"Start simple, evolve as needed."*
