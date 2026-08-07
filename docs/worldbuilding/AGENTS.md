# AGENTS.md — The Worldbuilding Swarm

> Role architecture for multi-agent lore work. Mirrors how elite human writers' rooms actually divide the labor — and maps onto Arcanea's existing agent registry.

---

## The principle

One mind holds the vault; many hands write the surface. Swarm parallelism is safe at the **fragment layer** (many narrators are a feature) and dangerous at the **vault layer** (one truth). So: vault work is single-threaded through a lead; fragment work fans out wide.

## The roles

| Role | Charter | Maps to existing agent |
|---|---|---|
| **Loremaster (lead)** | Owns vault coherence for the session. Only role that writes STAGING vault docs. Single-threaded. | `Arcanea Lore Master` |
| **World Architect** | Systems: geography, eras, factions, magic-economics. Proposes to Loremaster. | `Arcanea World Expander` / `World Architect` |
| **Character Smith** | Psychology, voice, arcs, name-register compliance. | `Arcanea Character Crafter` / `Character Psychologist` |
| **Fragment Writers (fan-out)** | Item texts, legends, songs, dialogue — each assigned a *narrator + bias*, writing in parallel. | `Lorekeeper`, genre masters |
| **Continuity Warden** | Reads everything against the vault + ledger + registry. Veto power on contradictions. | `Continuity Guardian` |
| **Taste Council** | Multi-lens quality gate (see `TASTE.md`): canon lens, craft lens, reader lens. Binding verdicts. | `visual-creation-council` pattern / `Council` |
| **Research Scout** | External craft + encyclopedia research via Lore Atlas MCP; returns architecture, never bricks. | `researcher` / `Research Librarian` |
| **IP Sentinel** | Name/expression originality check before any merge. | `Sentinel` |

## Dispatch order (the pipeline)

```
Creator intent
  → Loremaster frames the stance-sentence + vault doc (single thread)
  → parallel: World Architect / Character Smith / Research Scout
  → Loremaster integrates → STAGING vault doc committed
  → Fragment Writers fan out (one narrator each, N parallel)
  → Continuity Warden sweep → Taste Council verdict → IP Sentinel
  → PR (STAGING) → Creator /lock-decision
```

Rules of engagement:
- **Never two agents on one vault doc.** Fragment writers never edit the vault.
- Every fan-out prompt embeds: the stance-sentence, the relevant vault excerpts, the assigned narrator + bias, the naming register, and the mystery ledger. Agents don't share context — the dispatch must carry it.
- Contradiction between two fragment writers' outputs → Continuity Warden decides: *intentional tension (log it)* or *bug (fix it)*. Default for facts: bug. Default for interpretation: tension.
- Verdicts from the Taste Council are binding. REVISE beats deadline.

## Session shapes

- **Expansion session** (new faction/region): full pipeline, 6–10 agents.
- **Deepening session** (existing entity): skip World Architect; heavy Fragment fan-out.
- **Continuity audit**: Warden + Sentinel sweep only; output is a defect list, not new lore.
- **Research session**: Scout + Loremaster only; output is BEST_PRACTICES.md deltas.
