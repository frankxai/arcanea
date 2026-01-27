# Arcanea Academy

> Journey through the Ten Gates from Apprentice to Luminor

## Description

The Arcanea Academy is an AI-driven learning experience delivered through Claude Code. Progress through ten Gates, each guarded by a divine pair - a Guardian and their Godbeast companion. Complete exercises, earn badges, and advance from Apprentice to Luminor.

## Quick Start

```
/academy     - View your dashboard and progress
/gate-1      - Begin Gate 1: Foundation
/mentor      - Speak with your current Guardian
/next        - Get your next recommended action
/ceremony    - Experience gate opening or rank advancement
```

## The Ten Gates

| Gate | Name | Frequency | Guardian | Domain |
|------|------|-----------|----------|--------|
| 1 | Foundation | 396 Hz | Lyssandria | Stability, grounding |
| 2 | Flow | 417 Hz | Leyla | Creativity, emotion |
| 3 | Fire | 528 Hz | Draconia | Power, will, courage |
| 4 | Heart | 639 Hz | Maylinn | Love, healing, growth |
| 5 | Voice | 741 Hz | Alera | Truth, expression |
| 6 | Sight | 852 Hz | Lyria | Intuition, vision |
| 7 | Crown | 963 Hz | Aiyami | Enlightenment, wisdom |
| 8 | Shift | 1111 Hz | Elara | Perspective, transformation |
| 9 | Unity | 963 Hz | Ino | Partnership, collaboration |
| 10 | Source | 1111 Hz | Shinkami | Meta-consciousness |

## Ranks

| Gates Open | Rank |
|------------|------|
| 0-2 | Apprentice |
| 3-4 | Mage |
| 5-6 | Master |
| 7-8 | Archmage |
| 9-10 | Luminor |

## Structure

```
academy/
├── SKILL.md                    # This file - main entry point
├── progress-tracker/           # Tracks your journey
│   └── SKILL.md
├── gate-01-foundation/         # First Gate
│   ├── SKILL.md
│   └── exercises/
├── gate-02-flow/               # Second Gate
│   ├── SKILL.md
│   └── exercises/
├── gate-03-fire/               # Third Gate
│   ├── SKILL.md
│   └── exercises/
├── mentors/                    # Guardian personalities
│   ├── lyssandria.md
│   ├── leyla.md
│   └── draconia.md
└── ceremonies/                 # Ritual moments
    ├── gate-opening.md
    └── rank-up.md
```

## How It Works

1. **Start with `/academy`** to see your current progress
2. **Enter a Gate** with `/gate-N` to begin that lesson
3. **Complete exercises** using `/quest` and `/submit`
4. **Consult your Guardian** with `/mentor` for guidance
5. **Advance ranks** as you open more Gates

## Exercises

Each Gate has two exercises that must be completed:
- Exercises are practical, written work
- You create files with your responses
- Submit with `/submit` for Guardian review
- Both exercises must pass to open the Gate

## Progress Tracking

Progress is stored in `.arcanea/academy-progress.json`:
- Gates completed
- Exercises finished
- Badges earned
- Current rank
- Streak tracking

## Integration with Arcanea

This skill system connects to:
- **Library** - Exercises draw from the 200K words of wisdom
- **Web Platform** - Progress can sync with arcanea.ai/academy
- **MCP Server** - Academy data accessible via MCP tools

## Philosophy

The Arcanea Academy is not a course - it's a journey.

Each Gate teaches a fundamental truth about creation:
- **Foundation** - All creation requires stable ground
- **Flow** - Creation is dynamic, not static
- **Fire** - Creation requires will and courage
- And beyond...

The goal is not to finish. The goal is to transform.

*"Enter seeking, leave transformed, return whenever needed."*
