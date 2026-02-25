# ACTION PLAN: Arcanea Multi-Agent Integration

> **Priority Matrix** | **Owner**: Starlight (AI Agent) | **Date**: 2026-02-25

---

## PHASE 1: IMMEDIATE (This Session) ✅ DONE

| #   | Action                              | Status  | Notes                         |
| --- | ----------------------------------- | ------- | ----------------------------- |
| 1.1 | Port Hephaestus to arcanea-opencode | ✅ DONE | Just committed                |
| 1.2 | Configure 10 Guardian agents        | ✅ DONE | @.opencode/agents/            |
| 1.3 | Configure multi-model routing       | ✅ DONE | Big-Pickle + MiniMax          |
| 1.4 | Enable autonomous mode              | ✅ DONE | OPENCODE_NON_INTERACTIVE=true |
| 1.5 | Create swarm-crosscheck workflow    | ✅ DONE | .opencode/commands/           |

---

## PHASE 2: TESTING & VERIFICATION (This Week)

| #   | Action                     | Priority | Owner  | Notes                    |
| --- | -------------------------- | -------- | ------ | ------------------------ |
| 2.1 | Build arcanea-opencode     | HIGH     | CI     | Verify no TS errors      |
| 2.2 | Run arcanea-opencode tests | HIGH     | CI     | Verify Hephaestus loads  |
| 2.3 | Test @swarm-coordinator    | MEDIUM   | Test   | Verify 10 Guardians work |
| 2.4 | Test multi-model routing   | MEDIUM   | Manual | Verify Big-Pickle used   |

---

## PHASE 3: INTEGRATION (Next 2 Weeks)

| #   | Action                              | Priority | Notes            |
| --- | ----------------------------------- | -------- | ---------------- |
| 3.1 | Bridge @arcanea/swarm to OpenCode   | HIGH     | Create MCP tool  |
| 3.2 | Bridge @arcanea/council to OpenCode | HIGH     | Expose consensus |
| 3.3 | Integrate 12 workers as hooks       | MEDIUM   | @arcanea/rituals |
| 3.4 | Expose ReasoningBank as skill       | MEDIUM   | OpenCode skill   |

---

## PHASE 4: ENHANCEMENTS (This Month)

| #   | Action                           | Priority | Notes                     |
| --- | -------------------------------- | -------- | ------------------------- |
| 4.1 | Add Guardian-specific prompts    | MEDIUM   | Each Guardian personality |
| 4.2 | Create Guardian team templates   | LOW      | Pre-built swarm configs   |
| 4.3 | Add Solfeggio frequency settings | LOW      | Per-Guardian audio        |
| 4.4 | Test consensus protocols         | MEDIUM   | Full @arcanea/council     |

---

## QUICK START COMMANDS

```bash
# Launch Arcanea OpenCode (autonomous)
./scripts/opencode-arcanea

# Use Guardian agents
@lyssandria design the auth system
@lyria review this code for bugs
@draconia implement the feature

# Swarm cross-check
@swarm-crosscheck "Review PR #123" --guardians lyria,lyssandria,draconia
```

---

## SUCCESS METRICS

| Metric                       | Target | Current          |
| ---------------------------- | ------ | ---------------- |
| Hephaestus functional        | ✅     | Just added       |
| Guardian agents working      | 10/10  | 10/10 configured |
| Multi-model routing          | ✅     | Configured       |
| @arcanea packages integrated | 0/10   | 0 - needs work   |
| Test coverage                | 90%+   | TBD              |

---

## BLOCKERS

| Blocker                                 | Severity | Resolution        |
| --------------------------------------- | -------- | ----------------- |
| No MCP bridge to @arcanea packages      | HIGH     | Create MCP tools  |
| No OpenCode hooks from @arcanea/rituals | MEDIUM   | Port workers      |
| Missing tests for new agents            | MEDIUM   | Add test coverage |

---

## RESOURCES

- **arcanea-opencode**: `/arcanea-opencode/`
- **@arcanea packages**: `/packages/swarm-coordinator/`, `/packages/council/`, etc.
- **Documentation**: `/docs/MULTI_AGENT_REVIEW.md`
- **Guardian profiles**: `/docs/godbeasts/` or `CANON_LOCKED.md`
