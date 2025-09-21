# On-Chain Economy // Sprint Backlog

**Squad**: Phoenix Accord | **Product Lead**: Phoenix | **Blockchain Lead**: TBD | **Treasury Steward**: DAO Council Rep

## Mission
Launch and scale the ARC token, NFT ecosystem, revenue splitter, and DAO governance frameworks supporting the Arcanea realm economy.

## Sprint Rhythm
- Sprint length: 2 weeks | Dedicated tokenomics & compliance review every Thursday.
- Capacity: 2 blockchain engineers, 1 product/ops, 1 legal advisor (fractional), Claude Code support.

## Sprint 1 (Sept 23 - Oct 6)
**Goal**: Stand up ARC token + custodial wallet integration.
- Author ARC token smart contract (ERC-20 on Base) with mint/allocation schedule.
- Draft token distribution + vesting contracts (team, treasury, partners) using Thirdweb suite.
- Integrate Web3Auth custodial wallets into App + Studio sandbox.
- Engage audit partner (request proposals, align timeline).
- Document compliance checklist (KYC, OFAC, tax) with legal consultant.
**Deliverables**: ARC contract repo, wallet API spec, audit engagement letter.
**Dependencies**: Platform Ops for secret handling, Arcanea App for wallet UI.
**Metrics**: Testnet contract deployed, audit kickoff scheduled.

## Sprint 2 (Oct 7 - Oct 20)
**Goal**: Build NFT + revenue splitter foundations.
- Develop world NFT contract template (ERC-721) with royalty parameters.
- Implement revenue splitter contract (70/20/10) + tests.
- Prototype mint flow (Thirdweb dashboard + API) integrated with App.
- Configure DAO treasury (Gnosis Safe) + Snapshot space.
- Draft token utility spec (discounts, boosts, governance) and share with Studio.
**Deliverables**: NFT + splitter contracts, DAO infrastructure, utility spec.
**Dependencies**: Knowledge team for metadata fields, Finance for tax considerations.
**Metrics**: Contracts tested (95% coverage), Snapshot proposals functioning on testnet.

## Sprint 3 (Oct 21 - Nov 3)
**Goal**: Prepare for mainnet launch + incentive programs.
- Finalize audit fixes, produce audit report summary.
- Launch staking contract for ARC boosts (with lockup tiers).
- Design liquidity bootstrapping plan (DEX pair, initial liquidity, partners).
- Build treasury reporting dashboard (Dune or query scripts) with automated exports.
- Plan ARC rewards program (creator incentives, affiliate bonuses) with marketing.
**Deliverables**: Audit-complete contracts, staking spec, liquidity plan deck.
**Dependencies**: Marketing for launch messaging, Finance for treasury oversight.
**Metrics**: Audit issues resolved (critical=0), staking APR model validated, liquidity partners confirmed.

## Backlog Highlights
- DAO governance portal with Luminor voting UI.
- Cross-chain bridges and fiat on-ramp integration.
- Automated royalty payout notifications.

## Risks & Mitigations
1. **Regulatory uncertainty** – maintain legal counsel cadence, geo-fence if required.
2. **Security** – enforce multi-sig, run bug bounty pre-mainnet.
3. **Liquidity shortfall** – line up strategic partners, allocate treasury reserves early.

## Coordination
- Weekly sync with Platform Ops on wallet APIs + security.
- Joint planning with App & Studio for ARC-based pricing flows.
- Update `status/on-chain-weekly.md` with key metrics + contract status.

