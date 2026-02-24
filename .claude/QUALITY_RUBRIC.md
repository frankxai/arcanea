# Arcanea Skill Quality Rubric

> *"A skill is not good because it exists. It is good because it helps. This rubric ensures every skill earns its place."*

---

## Purpose

This rubric provides:
1. Standards for creating new skills
2. Criteria for reviewing existing skills
3. Framework for skill improvement
4. Quality gates for contribution

---

## The Five Quality Dimensions

### Dimension 1: Actionability (25 points)

**Core Question**: Can someone use this skill immediately?

| Score | Criteria |
|-------|----------|
| 25 | Every section leads to action. Techniques are specific and immediately applicable. User can start using the skill within minutes. |
| 20 | Most sections are actionable. Some techniques require translation. Minor gaps in practical application. |
| 15 | Mix of actionable and theoretical content. User needs to figure out how to apply concepts. |
| 10 | Mostly conceptual. Limited practical techniques. User left wondering "but how?" |
| 5 | Pure theory. No practical application. Academic but not useful. |

**Checklist**:
```
□ Techniques are step-by-step
□ Examples accompany each concept
□ Templates provided where useful
□ Checklists for application
□ Common mistakes warned against
```

---

### Dimension 2: Completeness (20 points)

**Core Question**: Does this skill cover the domain adequately?

| Score | Criteria |
|-------|----------|
| 20 | Comprehensive coverage of the domain. No obvious gaps. User doesn't need to look elsewhere for basics. |
| 16 | Good coverage with minor gaps. Most common needs addressed. Some edge cases missing. |
| 12 | Adequate coverage of core concepts. Several gaps in practical scenarios. |
| 8 | Partial coverage. User needs other resources to complete understanding. |
| 4 | Significant gaps. Covers only a portion of the domain. |

**Checklist**:
```
□ Core concepts covered
□ Common use cases addressed
□ Edge cases acknowledged
□ Related topics linked
□ Further learning indicated
```

---

### Dimension 3: Clarity (20 points)

**Core Question**: Can someone understand this on first reading?

| Score | Criteria |
|-------|----------|
| 20 | Crystal clear. Concepts explained simply. Jargon defined. Structure aids understanding. |
| 16 | Clear with minor confusion points. Most readers understand without rereading. |
| 12 | Reasonably clear. Some sections require careful reading. |
| 8 | Muddy. Important concepts unclear. Reader must struggle to understand. |
| 4 | Confusing. Poor organization. Unclear explanations. |

**Checklist**:
```
□ Clear structure with headers
□ One concept per section
□ Examples clarify abstract concepts
□ Technical terms defined
□ Visual aids where helpful
```

---

### Dimension 4: Memorability (15 points)

**Core Question**: Will users remember the key concepts?

| Score | Criteria |
|-------|----------|
| 15 | Key concepts stick. Frameworks are named and memorable. User can recall without rereading. |
| 12 | Most concepts memorable. Some frameworks easy to recall. |
| 9 | Some memorable elements. User needs to reference the skill frequently. |
| 6 | Forgettable. Concepts blend together. No memorable handles. |
| 3 | Nothing sticks. User forgets immediately after reading. |

**Checklist**:
```
□ Frameworks have clear names
□ Concepts use metaphors/analogies
□ Key ideas are numbered or listed
□ Mantras or principles summarized
□ Quick reference section exists
```

---

### Dimension 5: Token Efficiency (20 points)

**Core Question**: Does this skill maximize value per token?

| Score | Criteria |
|-------|----------|
| 20 | Every word earns its place. No padding. Dense with value. Under 4k tokens. |
| 16 | Tight with minor padding. Good value density. Under 5k tokens. |
| 12 | Some unnecessary content. Could be tighter. Under 6k tokens. |
| 8 | Padded. Repetitive. Could say the same in half the space. Over 6k tokens. |
| 4 | Bloated. Significant waste. User's context unnecessarily consumed. |

**Checklist**:
```
□ No filler phrases
□ No unnecessary repetition
□ Tables instead of prose where appropriate
□ Concise explanations
□ Token budget respected
```

---

## Scoring Summary

| Dimension | Points | Weight |
|-----------|--------|--------|
| Actionability | 25 | Critical |
| Completeness | 20 | High |
| Clarity | 20 | High |
| Memorability | 15 | Medium |
| Token Efficiency | 20 | High |
| **Total** | **100** | |

---

## Quality Tiers

| Score | Tier | Status |
|-------|------|--------|
| 90-100 | **Exemplary** | Reference skill. Teach from this. |
| 80-89 | **Excellent** | Ready for production use. Minor polish possible. |
| 70-79 | **Good** | Usable. Some improvements needed. |
| 60-69 | **Adequate** | Functional but needs work. Flag for revision. |
| Below 60 | **Needs Work** | Not ready for use. Significant revision required. |

---

## Review Template

```markdown
# Skill Review: [Skill Name]

**Reviewer**: [Name]
**Date**: [Date]
**Skill Version**: [Version]

## Scores

| Dimension | Score | Notes |
|-----------|-------|-------|
| Actionability | /25 | |
| Completeness | /20 | |
| Clarity | /20 | |
| Memorability | /15 | |
| Token Efficiency | /20 | |
| **Total** | /100 | |

## Tier
[ ] Exemplary (90-100)
[ ] Excellent (80-89)
[ ] Good (70-79)
[ ] Adequate (60-69)
[ ] Needs Work (<60)

## Strengths
-

## Areas for Improvement
-

## Specific Recommendations
1.
2.
3.

## Verdict
[ ] Approve as-is
[ ] Approve with minor changes
[ ] Revise and resubmit
[ ] Major revision needed
```

---

## Self-Review Checklist

Before submitting a new skill:

### Actionability
```
□ Can someone use this within 5 minutes of reading?
□ Are techniques specific, not vague?
□ Are there examples for each concept?
□ Is there a quick reference section?
```

### Completeness
```
□ Does this cover the core domain?
□ Are common use cases addressed?
□ Are limitations acknowledged?
□ Are related skills linked?
```

### Clarity
```
□ Is the structure clear?
□ Is each section focused on one idea?
□ Are technical terms defined?
□ Does it make sense on first read?
```

### Memorability
```
□ Do frameworks have names?
□ Are there memorable principles?
□ Could someone explain the key ideas from memory?
```

### Token Efficiency
```
□ Is every word necessary?
□ Is the skill under 5k tokens?
□ Could any section be shorter?
□ Are tables used instead of prose where appropriate?
```

---

## Improvement Process

### For Skills Scoring 60-79

1. Identify lowest-scoring dimensions
2. Focus improvement on those areas
3. Re-review after changes
4. Target 80+ for production

### For Skills Scoring Below 60

1. Analyze fundamental issues
2. Consider full rewrite
3. Get feedback on approach before rewriting
4. Multiple review cycles expected

---

*"Quality is not an accident. It is the result of intelligent effort."*
