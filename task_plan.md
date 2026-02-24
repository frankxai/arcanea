# Task Plan: Wave 4 — Runtime Intelligence

**Status**: IN PROGRESS
**Date**: 2026-02-24
**Goal**: Build the Runtime Intelligence layer — agent-to-agent communication, flow orchestration, and skill discovery
**Previous**: All 27 packages published to npm, CI/CD configured, READMEs created

---

## Architecture Overview

Wave 4 builds three new packages on top of existing infrastructure:

```
┌─────────────────────────────────────────────────────┐
│              WAVE 4: RUNTIME INTELLIGENCE            │
├─────────────────────────────────────────────────────┤
│  @arcanea/agent-bus       ← message backbone        │
│  @arcanea/skill-registry  ← dynamic discovery       │
│  @arcanea/flow-engine     ← advanced orchestration  │
├─────────────────────────────────────────────────────┤
│              EXISTING (extend/integrate)             │
│  swarm-coordinator  intelligence-bridge  council    │
│  sona-learner  arcanea-hooks  creative-pipeline     │
└─────────────────────────────────────────────────────┘
```

### Existing Infrastructure
- **SwarmCoordinator**: Agent lifecycle, task distribution, basic workflows
- **IntelligenceBridge**: EventBus, Guardian routing, feedback loop
- **Council**: Consensus protocols (Raft, Byzantine, Gossip, Gate-Quorum)
- **SonaLearner**: Trajectory-based RL, pattern extraction
- **Hooks**: Lifecycle instrumentation with priority execution

### Gaps to Fill
- ❌ No request-response agent messaging (only event broadcast)
- ❌ No message correlation or delivery guarantees
- ❌ No dynamic skill registration or capability discovery
- ❌ No conditional branching or dynamic tasks in workflows
- ❌ No workflow state persistence or recovery

---

## Phase 1: @arcanea/agent-bus [in_progress]

Communication backbone for agent-to-agent messaging.

**Features:**
- Request-response with correlation IDs
- Pub-sub with topic filtering
- Message queuing with delivery guarantees
- Dead letter queue for failed deliveries
- Message TTL and expiry
- Middleware pipeline (intercept, transform, log)

**Build on:** IntelligenceBridge EventBus pattern, SwarmCoordinator agent:message events

---

## Phase 2: @arcanea/skill-registry [pending]

Dynamic skill discovery and activation.

**Features:**
- Runtime skill registration with metadata
- Semantic capability matching (beyond keyword)
- Skill versioning and compatibility
- Health checks and availability tracking
- Skill composition (chain skills into pipelines)
- Guardian-affinity aware matching

**Build on:** Agent capabilities in SwarmCoordinator, Guardian domains in IntelligenceBridge

---

## Phase 3: @arcanea/flow-engine [pending]

Advanced workflow orchestration extending SwarmCoordinator.

**Features:**
- Conditional branching (if/else/switch)
- Parallel + sequential execution control
- Dynamic task generation at runtime
- Workflow state persistence and recovery
- Compensation/rollback patterns (saga)
- Timeout and retry strategies
- Nested workflow composition

**Build on:** WorkflowEngine in SwarmCoordinator

---

## Phase 4: Integration & Testing [pending]

Wire everything together and test across the ecosystem.

---

## Phase 5: Publish Wave 4 Packages [pending]

Version bump, changeset, publish to npm.

---

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| (none yet) | | |
