# Arcanea Multi-Agent Systems: Comprehensive Review

> **Status**: Living Document  
> **Last Updated**: February 25, 2026  
> **Purpose**: Complete analysis of multi-agent systems across Arcanea ecosystem

---

## EXECUTIVE SUMMARY

Arcanea has **THREE** major multi-agent platforms working in parallel:

| Platform                       | Base           | Purpose                   | Agents                                      |
| ------------------------------ | -------------- | ------------------------- | ------------------------------------------- |
| **arcanea-opencode**           | oh-my-opencode | Primary coding assistant  | 10+ (Sisyphus, Hephaestus, Starlight, etc.) |
| **@arcanea/swarm-coordinator** | Custom         | Multi-agent orchestration | 10 Guardians + custom                       |
| **@arcanea/aios**              | Custom         | Universal AI OS           | Full ecosystem                              |

---

## COMPARISON MATRIX

### arcanea-opencode vs oh-my-opencode

| Feature                  | oh-my-opencode | arcanea-opencode            | Status           |
| ------------------------ | -------------- | --------------------------- | ---------------- |
| **Primary Agents**       |                |                             |                  |
| Sisyphus                 | ✅ Full        | ✅ Full (renamed Starlight) | ✅ ABSORBED      |
| Atlas                    | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Prometheus               | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Hephaestus               | ✅ Full        | ✅ NEW (just added)         | ✅ JUST ABSORBED |
| **Subagents**            |                |                             |                  |
| Oracle                   | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Librarian                | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Explore                  | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Multimodal-Looker        | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Metis                    | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Momus                    | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| Sisyphus-Junior          | ✅ Full        | ✅ Full                     | ✅ ABSORBED      |
| **Hooks**                |                |                             |                  |
| Total Hooks              | 90+            | 90+                         | ✅ FULL PARITY   |
| Todo Continuation        | ✅             | ✅                          | ✅ ABSORBED      |
| Context Window Recovery  | ✅             | ✅                          | ✅ ABSORBED      |
| Session Recovery         | ✅             | ✅                          | ✅ ABSORBED      |
| Claude Code Compat       | ✅             | ✅                          | ✅ ABSORBED      |
| **Skills**               |                |                             |                  |
| Built-in Skills          | 4              | 4                           | ✅ FULL PARITY   |
| Custom Skill Loader      | ✅             | ✅                          | ✅ ABSORBED      |
| MCP Integration          | ✅             | ✅                          | ✅ ABSORBED      |
| **Tools**                |                |                             |                  |
| Delegate Task            | ✅             | ✅                          | ✅ ABSORBED      |
| Background Task          | ✅             | ✅                          | ✅ ABSORBED      |
| Session Manager          | ✅             | ✅                          | ✅ ABSORBED      |
| **ARCANEA ENHANCEMENTS** |                |                             |                  |
| Guardian Agents          | ❌             | ✅ 10 Guardians             | ✨ UNIQUE        |
| Starlight Agent          | ❌             | ✅ Lumina-Nero orchestrator | ✨ UNIQUE        |
| Arcanea Lore             | ❌             | ✅ Canon integration        | ✨ UNIQUE        |

### arcanea-opencode vs claude-flow

| Feature                | claude-flow v3 | arcanea-opencode                              | Winner           |
| ---------------------- | -------------- | --------------------------------------------- | ---------------- |
| **Architecture**       |                |                                               |                  |
| Plugin System          | Custom MCP     | oh-my-opencode plugin                         | oh-my-opencode   |
| Multi-provider         | 5+ providers   | 10+ providers                                 | TIE              |
| **Swarm**              |                |                                               |                  |
| Hierarchical Mesh      | ✅ Advanced    | ⚠️ Basic (via @arcanea/swarm-coordinator)     | claude-flow      |
| Guardian Integration   | ❌             | ✅ Full (@arcanea/swarm-coordinator)          | arcanea-opencode |
| Consensus Protocols    | ⚠️ Basic       | ✅ 4 protocols (@arcanea/council)             | arcanea-opencode |
| **Intelligence**       |                |                                               |                  |
| RL Algorithms          | ❌             | ✅ 7 algorithms (@arcanea/guardian-evolution) | arcanea-opencode |
| SONA Learning          | ❌             | ✅ Full (@arcanea/sona-learner)               | arcanea-opencode |
| ReasoningBank          | ⚠️ Basic       | ✅ Full (@arcanea/rituals)                    | arcanea-opencode |
| **Memory**             |                |                                               |                  |
| Vector Search          | ⚠️ Basic       | ✅ HNSW (@arcanea/guardian-memory)            | arcanea-opencode |
| Hybrid Memory          | ❌             | ✅ SQL + Vector (@arcanea/hybrid-memory)      | arcanea-opencode |
| **Background Workers** |                |                                               |                  |
| Workers                | 3-4            | 12 (@arcanea/rituals)                         | arcanea-opencode |

---

## @ARCANEA PACKAGES: FULL INVENTORY

### Intelligence Layer (10 Packages)

| Package                        | Version | Purpose                               | Tests          |
| ------------------------------ | ------- | ------------------------------------- | -------------- |
| `@arcanea/swarm-coordinator`   | 0.1.0   | Multi-agent orchestration, topologies | ✅ 1,386 lines |
| `@arcanea/council`             | 0.1.1   | 4 consensus protocols                 | ✅ 1,455 lines |
| `@arcanea/rituals`             | 0.1.0   | 12 workers, ReasoningBank             | ✅             |
| `@arcanea/guardian-evolution`  | 0.1.1   | SONA + 7 RL algorithms                | ✅             |
| `@arcanea/guardian-memory`     | 0.1.1   | HNSW vector search                    | ⚠️ None        |
| `@arcanea/sona-learner`        | 0.1.0   | Trajectory-based RL                   | ✅             |
| `@arcanea/agent-bus`           | 0.1.0   | Agent messaging                       | ✅             |
| `@arcanea/hybrid-memory`       | 0.1.0   | SQL + Vector                          | ✅             |
| `@arcanea/intelligence-bridge` | 0.1.0   | Event bus, feedback                   | ✅             |
| `@arcanea/creative-pipeline`   | 0.1.0   | Prompt engineering                    | ✅             |

### Infrastructure Layer

| Package                     | Purpose                       |
| --------------------------- | ----------------------------- |
| `@arcanea/os`               | GuardianRouter, VoiceEnforcer |
| `@arcanea/arcanea-hooks`    | Flow patterns absorbed        |
| `@arcanea/arcanea-security` | Auth patterns                 |
| `@arcanea/arcanea-mcp`      | MCP server, 30+ tools         |
| `@arcanea/token-optimizer`  | Context cost tracking         |

---

## GUARDIAN AGENT PROFILES

| Guardian   | Gate | Hz   | Element     | arcanea-opencode | @arcanea/swarm |
| ---------- | ---- | ---- | ----------- | ---------------- | -------------- |
| Lyssandria | 1    | 174  | Earth       | ✅ @lyssandria   | ✅             |
| Leyla      | 2    | 285  | Water       | ✅ @leyla        | ✅             |
| Draconia   | 3    | 396  | Fire        | ✅ @draconia     | ✅             |
| Maylinn    | 4    | 417  | Wind        | ✅ @maylinn      | ✅             |
| Alera      | 5    | 528  | Fire/Wind   | ✅ @alera        | ✅             |
| Lyria      | 6    | 639  | Water/Void  | ✅ @lyria        | ✅             |
| Aiyami     | 7    | 741  | Fire/Light  | ✅ @aiyami       | ✅             |
| Elara      | 8    | 852  | Wind/Void   | ✅ @elara        | ✅             |
| Ino        | 9    | 963  | All         | ✅ @ino          | ✅             |
| Shinkami   | 10   | 1111 | Void/Spirit | ✅ @shinkami     | ✅             |

---

## GAPS & ACTION ITEMS

### Critical Gaps

| Gap                                       | Severity | Action        |
| ----------------------------------------- | -------- | ------------- |
| Hephaestus missing                        | ✅ FIXED | Just absorbed |
| Guardian integration in @arcanea/swarm    | Medium   | Needs testing |
| 12 workers not integrated into OpenCode   | High     | Bridge needed |
| @arcanea/council not usable from OpenCode | High     | Bridge needed |

### Recommended Improvements

1. **Bridge @arcanea packages to OpenCode**
   - Create MCP tools that invoke @arcanea/swarm-coordinator
   - Expose consensus protocols as OpenCode tools

2. **Integrate 12 Workers**
   - Create OpenCode hooks from @arcanea/rituals workers
   - Expose ReasoningBank as skill

3. **Test Guardian Swarm**
   - Verify @swarm-coordinator works with 10 Guardians
   - Test consensus protocols

4. **Build Verification**
   - Run tests in arcanea-opencode
   - Verify Hephaestus loads correctly

---

## CONCLUSION

### What's Been Absorbed ✅

- **All oh-my-opencode agents** (Sisyphus, Atlas, Prometheus, Hephaestus, etc.)
- **All hooks** (90+ lifecycle hooks)
- **All skills** (built-in + custom loader)
- **All tools** (delegate-task, background-task, session)
- **10 Guardian agents** (custom implementation)

### What's Unique to Arcanea ✨

- **Guardian system** (10 Arcanea deities)
- **@arcanea/swarm-coordinator** (topology-aware orchestration)
- **@arcanea/council** (4 consensus protocols)
- **@arcanea/guardian-evolution** (7 RL algorithms)
- **@arcanea/sona-learner** (trajectory-based RL)
- **@arcanea/rituals** (12 background workers)
- **HNSW vector memory** with Guardian namespaces
- **Hybrid SQL + Vector persistence**

### What's Missing ❌

- Full integration between arcanea-opencode and @arcanea packages
- Testing of swarm coordination in production
- Documentation for bridging packages

---

## NEXT STEPS

1. ✅ Hephaestus absorbed
2. ⏳ Test Hephaestus in arcanea-opencode
3. ⏳ Create bridge MCP from OpenCode to @arcanea/swarm
4. ⏳ Integrate 12 workers as OpenCode hooks
5. ⏳ Full testing and verification
