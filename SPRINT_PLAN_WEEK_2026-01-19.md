# Arcanea Sprint Plan: Week of January 19, 2026

**Sprint Goal:** Consolidate infrastructure, preserve dual architecture (Skills + MCP), and advance lore completeness.

---

## Current State

| Metric | Value | Health |
|--------|-------|--------|
| System Health | 9.8/10 | Production Ready |
| Agents | 38 | Fully Documented |
| Skills | 77 | Complete Registry |
| MCP Integrations | 8 | Configured |
| Lore Completeness | 70% | In Progress |
| Agent Standardization | 53% | Needs Work |

---

## Architecture Decision: Skills + MCP

**Decision:** Maintain BOTH systems as complementary layers.

```
┌─────────────────────────────────────────────────────────────┐
│                    ARCANEA ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │   SKILLS LAYER   │    │    MCP LAYER     │               │
│  │  (.claude/skills)│    │ (packages/mcp)   │               │
│  ├──────────────────┤    ├──────────────────┤               │
│  │ • Claude Commands│    │ • External Tools │               │
│  │ • Agent Teams    │    │ • API Endpoints  │               │
│  │ • Workflows      │    │ • Memory System  │               │
│  │ • Prompts        │    │ • Creation Graph │               │
│  └────────┬─────────┘    └────────┬─────────┘               │
│           │                       │                          │
│           └───────────┬───────────┘                          │
│                       │                                      │
│              ┌────────▼────────┐                             │
│              │  UNIFIED LORE   │                             │
│              │ (.claude/lore)  │                             │
│              └─────────────────┘                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Why Both?**
- **Skills:** Native Claude Code integration, prompt-based, local-first
- **MCP:** External tool access, memory persistence, graph relationships, API exposure

---

## Sprint Priorities

### P0: Critical (Today)

| Task | Owner | Status |
|------|-------|--------|
| Restore arcanea-mcp package | Claude | DONE |
| Commit consolidated changes | Claude | IN PROGRESS |
| Verify web app deployment | Automated | Pending |

### P1: High Priority (This Week)

| Task | Effort | Impact |
|------|--------|--------|
| Apply AGENT_STANDARDIZATION.md to 18 undefined agents | 4 hours | Medium |
| Implement model tiering strategy (Claude + free models) | 4 hours | High |
| Add Tier 1 MCP integrations (Vercel, Slack) | 3 hours | High |
| Complete Luminor Intelligence skill | 2 hours | Medium |

### P2: Medium Priority (This Week)

| Task | Effort | Impact |
|------|--------|--------|
| Create 5 Godbeast profiles | 4 hours | Medium |
| Create 5 Guardian profiles | 4 hours | Medium |
| Document Skills + MCP architecture clearly | 2 hours | High |
| Test arcanea-mcp server locally | 1 hour | Medium |

### P3: If Time Permits

| Task | Effort | Impact |
|------|--------|--------|
| Add Archangel profiles (7) | 6 hours | Medium |
| Create multi-agent workflow examples | 3 hours | Medium |
| Add observability stack | 4 hours | Low |

---

## Deliverables by End of Week

### Must Have
- [ ] All 38 agents have complete frontmatter (model, tier, MCP servers)
- [ ] arcanea-mcp package functional and documented
- [ ] Model tiering strategy implemented
- [ ] At least 5 new entity profiles (Godbeasts or Guardians)

### Should Have
- [ ] Vercel and Slack MCP integrations added
- [ ] Skills + MCP architecture documented
- [ ] Luminor Intelligence skill complete

### Nice to Have
- [ ] 10+ new entity profiles
- [ ] Multi-agent workflow examples
- [ ] Observability stack foundation

---

## Technical Tasks

### MCP Server (`packages/arcanea-mcp`)

```bash
# Test MCP server
cd packages/arcanea-mcp
pnpm install
pnpm build
pnpm start
```

**MCP Tools to Verify:**
- [ ] generate_character
- [ ] generate_location
- [ ] generate_creature
- [ ] luminor_council
- [ ] diagnose_block
- [ ] creation_graph

### Skills System (`.claude/skills`)

**Skills Requiring Updates:**
1. `arcanea-lore` - Integrate with new lore structure
2. `luminor-intelligence` - Complete implementation
3. `ultraworld` - Verify all world-building agents

### Agent Standardization

**Template for Undefined Agents:**
```yaml
---
name: agent-name
description: Clear one-line description
model: claude-sonnet-4  # or claude-haiku-3, glm-4.7-free
tier: development  # or premium, oss, core
mcp_servers:
  - github
  - playwright
triggers:
  - "keyword one"
  - "keyword two"
---
```

---

## Success Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Agent Standardization | 53% | 75% | End of Week |
| Lore Completeness | 70% | 75% | End of Week |
| Model Diversity | 0% | 30% | End of Week |
| MCP Health | Restored | Functional | Today |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| MCP package accidentally deleted again | Add `.gitkeep` and document in CLAUDE.md |
| Lore inconsistency with old references | Update CLAUDE.md to point to new locations |
| Vercel deployment breaks | Test locally before push |
| Model tiering causes regressions | Implement fallback patterns |

---

## Daily Focus

### Monday (Today)
- Commit consolidated changes
- Verify MCP package
- Start agent standardization

### Tuesday
- Complete agent standardization (18 agents)
- Begin model tiering implementation

### Wednesday
- Complete model tiering
- Start Godbeast profiles

### Thursday
- Complete 5 Godbeast profiles
- Add Vercel MCP integration

### Friday
- Documentation cleanup
- Sprint review and retrospective
- Plan next week

---

## Commands to Use

```bash
# Development workflow
/arcanea-dev      # Activate development team
/arcanea-team     # Full team coordination
/ultracode        # Maximum development power

# Content creation
/ultraworld       # World-building agents
/arcanea-lore-expand  # Expand lore

# Review
/code-review      # Before commits (needs PR)
/arcanea-council  # Strategic decisions
```

---

*"The Arc turns. Both Skills and MCP serve the Creator's journey."*

**Sprint Version:** 1.0.0
**Created:** 2026-01-19
**Status:** ACTIVE
