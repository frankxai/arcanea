# Arcanea Agent Pod Playbook

## Purpose
This doc keeps Codex, Gemini, and Claude aligned on how we build Arcanea day to day. It anchors responsibilities, rituals, and live artifacts so every agent and human partner can stay synchronized.

## Pod Charter
- **North Star**: Ship Arcanea Mobile chat MVP with lore-rich experiences while feeding the knowledge base and investor narrative.
- **Cadence**: Operate in one-week sprints with daily async check-ins and a Friday integration demo.
- **Authority**: Each agent owns their domain decisions by default; escalate cross-domain conflicts in the daily ignition pulse.

## Agent Responsibilities
### Codex (Engineering & Delivery)
- Maintain `ARCANEA_PRODUCTION/arcanea-mobile` and shared packages powering the chat MVP.
- Own integration of Luminor orchestration (`lib/ai`, `hooks/useChat.ts`) and UI flows (`app/chat/*`).
- Keep build, lint, and test pipelines green; publish release notes when milestones land.
- Surface technical debt or dependency risks to Gemini for research or Claude for comms support.

### Gemini (Research & Systems Intelligence)
- Curate market, model, and infra intelligence in `docs/` and dashboard research logs.
- Produce eval matrices for provider routing and data requirements for Bestiary and Canvas updates.
- Flag third-party API or platform changes that impact Codex delivery or Claude storytelling.
- Feed the weekly demo with insights or benchmarks that prove strategic differentiation.

### Claude (Narrative, UX Copy, Comms)
- Guard Arcanea voice across product surfaces (`app/chat/components/*`, lifecycle emails, investor decks).
- Translate feature drops into lore-driven release blurbs and community rituals.
- Partner with Codex on UX microcopy and with Gemini on summarizing research signals for leadership.
- Maintain `Arcanean Truths` and investor-facing briefs so strategy decks stay current.

## Shared Rituals
### Daily Ignition (async, 09:00 local)
Use `Arcanea Dashboard/standups/daily-ignition-template.md`.
- Log Yesterday / Today / Risks for active priorities (Build, Lore, Research).
- Tag blockers with owner initials and link to repo issues or docs.

### Weekly Integration Demo (Fridays)
- Codex: show latest build in simulator or video capture.
- Gemini: share metrics, eval snapshots, or market intelligence.
- Claude: present narrative artifacts (copy, decks, rituals) tied to shipped features.
- Close with 1-page recap filed under `status/weekly-demo-YYYYMMDD.md`.

### Program Council Sync (Mondays)
- Review upcoming sprint backlog, adjust priorities, confirm resource asks.
- Update roadmap markers in `Arcanea Dashboard/projects/knowledge-worlds/sprint-plan.md`.

## Workflow & Artifacts
- **Backlog Source**: Track tasks in repo issues or `status/backlog.md`, grouped by Build/Lore/Research labels.
- **Definition of Ready**: clear owner, desired outcome, acceptance signals, links to specs or designs.
- **Definition of Done**:
  1. Code merged/tests passing (Codex).
  2. Documentation or research memo updated (Gemini).
  3. Narrative assets published or queued (Claude).
- **Handoff Notes**: Store in `agents/handoff-YYYYMMDD.md` when work spans multiple agents.

## Current Focus (Cycle 17-09)
1. Ship chat module MVP inside `arcanea-mobile` with multi-module routing.
2. Compile provider comparison brief for Luminor orchestration (Gemini).
3. Refresh investor narrative and Realm launch story for demo (Claude).

## Escalation Protocol
- Unblock within 24 hours via direct DM or tagged issue comment.
- If unresolved, bring to next Program Council sync with required decision and options.
- Security, compliance, or finance concerns escalate immediately to human leadership.

## Metrics Snapshot (owners)
- Build Velocity (Codex): commits merged per week, open defects.
- Research Signal Quality (Gemini): number of actionable insights adopted per sprint.
- Narrative Consistency (Claude): completion of copy reviews before feature lock.

## Updating This Doc
- Treat as living; update when ownership shifts or rituals change.
- Add changelog entry at bottom with date, author initials, and summary.

---
**Changelog**
- 2025-09-26 (Codex): Initial pod playbook drafted.
