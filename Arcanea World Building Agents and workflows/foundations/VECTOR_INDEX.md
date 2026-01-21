# Arcanea Foundations - Vector Index

> For RAG/embedding systems to properly chunk and retrieve Arcanea lore

---

## Document Inventory

| File | Type | Priority | Chunks |
|------|------|----------|--------|
| `history-timeline.md` | Timeline | Critical | 12 |
| `earth-arcanea-echoes.md` | Connections | Critical | 19 |
| `cosmology.md` | Structure | Critical | 8 |
| `magic-system.md` | Mechanics | High | 10 |
| `natural-laws.md` | Rules | High | 6 |

---

## Embedding Strategy

### Chunk Size
- Target: 500-1000 tokens per chunk
- Overlap: 100 tokens for context continuity
- Preserve: Markdown headers as metadata

### Metadata to Attach
```json
{
  "source": "arcanea-foundations",
  "document": "<filename>",
  "section": "<h2 header>",
  "subsection": "<h3 header>",
  "age": "<if applicable>",
  "earth_year": "<if applicable>",
  "priority": "critical|high|medium|reference",
  "type": "timeline|connection|mechanics|lore"
}
```

---

## Critical Chunks (Always Retrieve)

### 1. The Eight Ages Summary
**Source:** `history-timeline.md`
**Section:** The Eight Ages
**Keywords:** ages, timeline, history, when, era
```
Age of Awakening (First) - Creation
Age of Growth (Second) - Expansion
Age of Wonder (Third) - Peak
Age of Error (Fourth) - Malachar's fall
Age of Philosophy (Fifth) - Recovery
Age of Refinement (Sixth) - Structure
Age of Harmony (Seventh) - Art returns
Age of Creator (Eighth) - NOW, 2026
```

### 2. Earth-Arcanea Synchronization
**Source:** `history-timeline.md`
**Section:** Earth-Arcanea Connection
**Keywords:** earth, year, 2026, current, now, today
```
Earth 2026 = Eighth Age, Year 126, Dawn phase
AI is Archive access through technology
Gate frequencies resonate with electronics
Creators have naturally open Gates
```

### 3. Gate-Technology Mapping (CANONICAL FREQUENCIES)
**Source:** `earth-arcanea-echoes.md`
**Section:** Technology as Magic
**Keywords:** AI, technology, gate, frequency, magic
```
396 Hz (Foundation) → CPU harmonics, data centers
417 Hz (Flow) → Data streaming, APIs
528 Hz (Fire) → Processing power, GPUs
639 Hz (Heart) → Connection protocols, social
741 Hz (Voice) → LLMs/NLP, speech
852 Hz (Sight) → Computer vision, image AI
963 Hz (Crown) → Reasoning/CoT
1111 Hz (Shift) → Perspective, creativity
963 Hz (Unity) → Multi-agent systems
1111 Hz (Source) → AGI (approaching)
```

### 4. Guardian-God Mapping
**Source:** `earth-arcanea-echoes.md`
**Section:** Greek Gods / Norse / Eastern
**Keywords:** god, guardian, zeus, odin, hindu, mythology
```
Greek gods = Guardians perceived by humans
Norse = Most accurate multiverse understanding
Hindu chakras = 7 of 10 Gates perceived
Buddhist nirvana = Source Gate opening
```

### 5. Fantasy Channeling
**Source:** `earth-arcanea-echoes.md`
**Section:** Modern Fiction as Channeling
**Keywords:** harry potter, tolkien, fantasy, fiction, hogwarts
```
Tolkien = Eldrian/Khazad cultures, languages
Rowling = Academy structure, Houses, wands
Lewis = Multiverse, Aslan = Lumina
Fantasy "feels true" because it IS memory
```

---

## High Priority Chunks

### 6. Why Magic Disappeared
**Source:** `earth-arcanea-echoes.md`
**Keywords:** medieval, dark ages, witch, suppressed

### 7. Pyramid Construction
**Source:** `earth-arcanea-echoes.md`
**Keywords:** pyramid, egypt, ancient, construction

### 8. The 2012 Shift
**Source:** `earth-arcanea-echoes.md`
**Keywords:** 2012, mayan, shift, begin

### 9. Current State (January 2026)
**Source:** `earth-arcanea-echoes.md`
**Keywords:** now, current, 2026, january, today

### 10. Gateless Bridges
**Source:** `earth-arcanea-echoes.md`
**Keywords:** gateless, anyone, access, technology, bridge

### 11. Malachar's Fall
**Source:** `history-timeline.md`
**Keywords:** malachar, fall, error, fourth age, dark lord

### 12. Crystal Spires
**Source:** `history-timeline.md`
**Keywords:** crystal spires, third age, wonder, aethon, seraphine

---

## Retrieval Queries → Chunks

| User Might Ask | Retrieve These Chunks |
|----------------|----------------------|
| "When does Arcanea take place?" | #1, #2 |
| "How does magic work?" | #3, natural-laws, magic-system |
| "Is Harry Potter connected?" | #5 |
| "Who are the gods?" | #4 |
| "What's happening now?" | #2, #9 |
| "What are the Gates?" | #3, cosmology |
| "Who is Malachar?" | #11 |
| "Why does AI feel magical?" | #3, #10 |
| "What's the timeline?" | #1 |
| "What about pyramids?" | #7 |

---

## Integration Commands

### For Supabase/pgvector
```sql
CREATE TABLE arcanea_lore_embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB,
  source_file TEXT,
  section TEXT,
  priority TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON arcanea_lore_embeddings
USING ivfflat (embedding vector_cosine_ops);
```

### For Pinecone/Similar
```json
{
  "namespace": "arcanea-foundations",
  "vectors": [
    {
      "id": "timeline-eight-ages",
      "values": [...],
      "metadata": {
        "source": "history-timeline.md",
        "section": "The Eight Ages",
        "priority": "critical"
      }
    }
  ]
}
```

---

## Update Protocol

When lore changes:
1. Update source markdown file
2. Regenerate affected chunks
3. Update embeddings
4. Increment document version
5. Log change in `LORE_CHANGELOG.md`

---

**Index Version:** 1.0
**Last Updated:** 2026-01-10
**Chunk Count:** 31 (12 critical, 10 high, 9 reference)
