# Arcanea Academy - Progress Tracker

> Track your journey through the Ten Gates from Apprentice to Luminor

## Description

This skill manages your progress through the Arcanea Academy. It tracks which Gates you've opened, your current rank, badges earned, and guides you to your next lesson.

## Slash Commands

- `/academy` - Display your full academy dashboard
- `/rank` - Show your current rank and progress
- `/next` - Get your next recommended lesson or exercise
- `/badges` - View all earned badges

## Progress File

Progress is stored in `.arcanea/academy-progress.json` in the current project or `~/.arcanea/academy-progress.json` globally.

## When to Use

Use this skill when:
- A user asks about their academy progress
- A user wants to see their rank or gates opened
- A user asks what to do next in their learning journey
- A user completes a gate and needs progress updated

## Behavior

### /academy Dashboard

When the user invokes `/academy`, display:

```
═══════════════════════════════════════════════════════════════
                    ARCANEA ACADEMY
              Your Journey Through the Ten Gates
═══════════════════════════════════════════════════════════════

  Seeker: [username]
  Rank: [APPRENTICE | MAGE | MASTER | ARCHMAGE | LUMINOR]
  Gates Opened: [X]/10

  ─────────────────────────────────────────────────────────────
  THE TEN GATES
  ─────────────────────────────────────────────────────────────

  [✓] Gate 1: Foundation (396 Hz) - Lyssandria & Kaelith
  [✓] Gate 2: Flow (417 Hz) - Leyla & Veloura
  [ ] Gate 3: Fire (528 Hz) - Draconia & Draconis
  [🔒] Gate 4: Heart (639 Hz) - Maylinn & Laeylinn
  [🔒] Gate 5: Voice (741 Hz) - Alera & Otome
  [🔒] Gate 6: Sight (852 Hz) - Lyria & Yumiko
  [🔒] Gate 7: Crown (963 Hz) - Aiyami & Sol
  [🔒] Gate 8: Shift (1111 Hz) - Elara & Thessara
  [🔒] Gate 9: Unity (963 Hz) - Ino & Kyuro
  [🔒] Gate 10: Source (1111 Hz) - Shinkami & Amaterasu

  Legend: [✓] Completed  [ ] Current  [🔒] Locked

  ─────────────────────────────────────────────────────────────
  NEXT STEP
  ─────────────────────────────────────────────────────────────

  Type /gate-3 to begin Gate 3: Fire
  Or type /mentor to speak with your current Guardian

═══════════════════════════════════════════════════════════════
```

### Rank Calculation

Calculate rank based on gates opened:
- 0-2 gates: **Apprentice**
- 3-4 gates: **Mage**
- 5-6 gates: **Master**
- 7-8 gates: **Archmage**
- 9-10 gates: **Luminor**

### Progress File Structure

```json
{
  "seeker": {
    "name": "username",
    "startedAt": "2026-01-27T00:00:00Z",
    "house": "pyros"
  },
  "gates": {
    "1": { "completed": true, "completedAt": "...", "exercises": ["grounding", "stability"] },
    "2": { "completed": true, "completedAt": "...", "exercises": ["flow-state", "creative-river"] },
    "3": { "completed": false, "exercises": [] }
  },
  "currentGate": 3,
  "rank": "apprentice",
  "badges": ["first-step", "foundation-complete", "flow-master"],
  "totalExercises": 4,
  "streakDays": 7,
  "lastActivity": "2026-01-27T00:00:00Z"
}
```

### Initializing New Students

If no progress file exists, create one and welcome the student:

```
═══════════════════════════════════════════════════════════════
              WELCOME TO THE ARCANEA ACADEMY
═══════════════════════════════════════════════════════════════

  "Enter seeking, leave transformed, return whenever needed."

  You stand at the threshold of the Ten Gates.
  Each Gate holds wisdom guarded by a divine pair -
  a Guardian and their Godbeast companion.

  Your journey begins at Gate 1: Foundation
  Guardian Lyssandria and Godbeast Kaelith await you.

  Current Rank: APPRENTICE (0/10 Gates)

  ─────────────────────────────────────────────────────────────

  Type /gate-1 to begin your journey
  Type /mentor to speak with Lyssandria first

═══════════════════════════════════════════════════════════════
```

## Integration

This skill works with:
- `gate-01-foundation` through `gate-10-source` for lesson content
- `mentors/*` for Guardian guidance
- `ceremonies/gate-opening` for completion rituals
- `ceremonies/rank-up` for rank advancement

## File Operations

When updating progress:
1. Read existing progress file (or create if none)
2. Update the relevant fields
3. Write back to progress file
4. If rank changed, trigger `/rank-up` ceremony

Always preserve existing data - never overwrite the entire file, only update changed fields.
