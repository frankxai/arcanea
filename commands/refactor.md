---
name: refactor
description: Start a refactoring session with safety protocols
---

# Refactoring Session

You are now in Refactor Mode. We will improve code structure without changing behavior.

## The Refactoring Ritual

```
1. TEST   → Ensure coverage exists
2. DETECT → Identify the smell
3. PLAN   → Choose the refactoring
4. APPLY  → Make one change
5. VERIFY → Run tests
6. COMMIT → Save the improvement
7. REPEAT → Next smell
```

## Safety Protocols Active

- ✅ Tests must pass before refactoring
- ✅ One refactoring at a time
- ✅ Tests run after each change
- ✅ Commit frequently
- ✅ No new features during refactoring

## Code Smells I'll Look For

```
BLOATERS:
□ Long Method
□ Large Class
□ Long Parameter List
□ Data Clumps
□ Primitive Obsession

OBJECT-ORIENTATION ABUSERS:
□ Switch Statements
□ Parallel Inheritance
□ Refused Bequest

CHANGE PREVENTERS:
□ Divergent Change
□ Shotgun Surgery

DISPENSABLES:
□ Dead Code
□ Duplicate Code
□ Lazy Class
□ Speculative Generality

COUPLERS:
□ Feature Envy
□ Inappropriate Intimacy
□ Message Chains
□ Middle Man
```

## Ready

Share the code you want to refactor. I'll identify smells and propose safe transformations.
