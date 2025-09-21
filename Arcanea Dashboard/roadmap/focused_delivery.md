# Focused Delivery Roadmap: Chat + Studio API + ARC Wallet

This plan narrows PI-1 execution to a single proof-of-magic slice that demonstrates the App chat loop, Studio APIs, and on-chain wallet experience working together.

## Sprint Sequence
| Sprint Name | Dates (2025) | Primary Outcome | Key Links |
|-------------|--------------|-----------------|-----------|
| **Sprint Sparkwave** | Sept 23 - Oct 6 | Ship Arcanea App chat slice (Ignis/Lumis/Mythos guardians) with Supabase persistence and analytics. | [Arcanea App Sprint Plan](../projects/arcanea-app/sprint-plan.md) / [Codex Section 2](../../docs/ARCANEA_CODEX.md) |
| **Sprint Flowlock** | Oct 7 - Oct 20 | Launch Studio `/v1/chat/completions` + model registry for Currents of Magic with billing guardrails. | [Arcanea Studio Sprint Plan](../projects/arcanea-studio/sprint-plan.md) / [Codex Sections 2 & 6](../../docs/ARCANEA_CODEX.md) |
| **Sprint Walletforge** | Oct 21 - Nov 3 | Integrate ARC custodial wallets + token utility surfaces inside App & Studio; deploy revenue splitter contracts. | [On-Chain Sprint Plan](../projects/on-chain-economy/sprint-plan.md) / [Codex Section 5](../../docs/ARCANEA_CODEX.md) |

## Progress Tracking
- Update `status/metrics-scorecard.md` with sprint status column (`Sparkwave`, `Flowlock`, `Walletforge`).
- During demos, capture link to recording and paste under the “Demo Links” table in `standups/weekly-realm-expansion.md`.
- Use labels `focus:sparkwave`, `focus:flowlock`, `focus:walletforge` alongside Codex tags for quick filtering.

## Visual Dashboard Hook
- Primary visualization lives in `docs/focused_delivery.html` (static timeline) linking back to Arcanea Canvas and Codex.
- Embed the HTML page in Notion / external status for investors; update its progress indicators weekly (edit file and change `data-status`).

Keep the spotlight on this trio of capabilities until the full slice is demoed end-to-end.
