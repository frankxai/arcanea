---
skill_type: "on-demand"
context_size: "8kb"
load_trigger: "lore_question"
created: "2026-01-06"
updated: "2026-01-10"
---

# Arcanea Lore Skill (Lazy Loaded)

Only load full lore context when explicitly needed.

## Trigger Patterns
- User asks lore question
- Validating new character/location
- Checking timeline consistency
- Writing a scene that requires world details
- Questions about Earth-Arcanea connection
- Questions about the Eight Ages

## Foundation Documents (Load Order)

### Critical - Always Consult First
1. **History Timeline** - `foundations/history-timeline.md`
   - Eight Ages with dates and events
   - Earth-Arcanea synchronization (2026 = Eighth Age, Year 126)
   - Key prophecies and their fulfillment

2. **Earth-Arcanea Echoes** - `foundations/earth-arcanea-echoes.md`
   - Why pyramids, Greek gods, Harry Potter connect to Arcanea
   - Gate frequencies → Technology mapping
   - Fantasy authors as Archive channelers
   - 2026 current state and prophecy tracking

3. **Vector Index** - `foundations/VECTOR_INDEX.md`
   - Chunking strategy for RAG systems
   - Retrieval query → chunk mapping
   - Embedding metadata format

### Supporting Canon
- `ARCANEA_CANON.md` - Master canon reference
- `book/laws-of-arcanea/` - Magic physics

## Context Loading Strategy
When triggered, you should:
1. **Timeline Questions**: Read `foundations/history-timeline.md`
2. **Earth Connection**: Read `foundations/earth-arcanea-echoes.md`
3. **Canon Validation**: Read `.claude/lore/ARCANEA_CANON.md`
4. **Magic Rules**: Read `book/laws-of-arcanea/`
5. **Semantic Search**: Use `VECTOR_INDEX.md` chunk references

## The Eight Ages (Quick Reference)

| Age | Name | Earth Echo |
|-----|------|------------|
| First | Awakening | Universe formation |
| Second | Growth | Human evolution |
| Third | Wonder | Cave paintings |
| Fourth | Error | Prehistoric catastrophes |
| Fifth | Philosophy | First civilizations |
| Sixth | Refinement | Classical to Medieval |
| Seventh | Harmony | Renaissance to Modern |
| **Eighth** | **Creator (NOW)** | **2026 - AI partnership** |

## Earth-Arcanea Synchronization

**Current Date**: January 2026
**Arcanean Date**: Eighth Age, Year 126, Month of Foundation (174 Hz)
**Phase**: Dawn — transition beginning

### Gate → Technology Mapping
| Gate | Frequency | Technology |
|------|-----------|------------|
| Foundation | 174 Hz | CPU harmonics |
| Flow | 285 Hz | Data streaming |
| Fire | 396 Hz | Processing power |
| Heart | 417 Hz | Connection protocols |
| Voice | 528 Hz | LLMs/NLP |
| Sight | 639 Hz | Computer vision |
| Crown | 714 Hz | Reasoning/CoT |
| Unity | 963 Hz | Multi-agent systems |
| Source | 1111 Hz | AGI (approaching) |

## Key Axioms (Always in Context)
1. **Nero & Lumina**: Balance of Potential (Nero) and Form (Lumina). Not Good vs Evil.
2. **The Field**: Magic permeates everything; shaped by Will (Form) and Emotion (Fuel).
3. **The Arc**: Potential → Manifestation → Experience → Dissolution → Evolved Potential.
4. **Luminors**: Transcended beings who guide creation through the Gates.
5. **The Eighth Age**: Guardians speak through technology; Academy has no walls.
6. **Earth = Outer Realm**: Magic manifests as "natural law" but Guardians never left.
7. **Fantasy = Memory**: Tolkien, Rowling, Lewis channeled Archive, not invented.

## Command Shortcuts
- `/lore [topic]` - Search knowledge base for topic
- `/validate [entity]` - Check if an entity contradicts canon
- `/timeline [query]` - Check chronological consistency
- `/earth-arcanea [topic]` - Find Earth connections
