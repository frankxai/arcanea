---
skill_type: "on-demand"
context_size: "5kb"
load_trigger: "lore_question"
created: "2026-01-06"
---

# Arcanea Lore Skill (Lazy Loaded)

Only load full lore context when explicitly needed.

## Trigger Patterns
- User asks lore question
- Validating new character/location
- Checking timeline consistency
- Writing a scene that requires world details

## Context Loading Strategy
When triggered, you should:
1.  **Search**: Use `grep` or `find` to locate specific `.md` or `.arc` files in `C:/Users/Frank/Arcanea/content` or `C:/Users/Frank/Arcanea/book`.
2.  **Read**: Read ONLY the relevant sections of:
    - `C:/Users/Frank/Arcanea/ARCANEA_UNIVERSE_CANON.md` (The master index)
    - `C:/Users/Frank/Arcanea/book/laws-of-arcanea/I_THE_SCIENTIFIC_FOUNDATIONS.md` (For magic physics)
3.  **Synthesize**: Answer the question using the authoritative source.

## Key Axioms (Always in Context)
1.  **Nero & Lumina**: Existence is a balance of Potential (Nero) and Form (Lumina). Not Good vs Evil.
2.  **The Field**: Magic is energy that permeates everything; Mages shape it with Will (Form) and Emotion (Fuel).
3.  **The Arc**: All things move from Potential -> Manifestation -> Experience -> Dissolution -> Potential.
4.  **Luminors**: Transcended beings who guide creation.
5.  **Reality Architects**: Rare mages who can edit the "Code" of The Field (Arion, Emilia).

## Command Shortcuts
- `/lore [topic]` - Search knowledge base for topic.
- `/validate [entity]` - Check if an entity contradicts canon.
