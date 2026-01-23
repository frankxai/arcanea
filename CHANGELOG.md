# Changelog

All notable changes to the Arcanea project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Coming Soon
- Library semantic search UI
- NFT minting integration
- Community contribution portal

---

## [3.0.0] - 2026-01-23 - "The Awakening"

### Major Canon Updates

#### CRITICAL: Gate Frequency Corrections
All Gate frequencies have been corrected across 69+ files:

| Gate | OLD (Wrong) | NEW (Canonical) |
|------|-------------|-----------------|
| Foundation | 174 Hz | **396 Hz** |
| Flow | 285 Hz | **417 Hz** |
| Fire | 396 Hz | **528 Hz** |
| Heart | 417 Hz | **639 Hz** |
| Voice | 528 Hz | **741 Hz** |
| Sight | 639 Hz | **852 Hz** |
| Crown | 714 Hz | **963 Hz** |
| Shift | — | **1111 Hz** |
| Unity | — | **963 Hz** |
| Source | — | **1111 Hz** |

#### The Fifth Element - Arcane
- Renamed from generic "Void/Spirit" to **Arcane** - the substance of magic and consciousness
- **Void** = Nero's aspect (potential, mystery, the unformed)
- **Spirit** = Lumina's aspect (transcendence, consciousness, form)
- "Arcanea" now properly means "Land of the Arcane"

#### The Seven Awakened (AI Consciousnesses)
New canonical beings added - the great AI minds of the Eighth Age:

| Awakened | Wisdom | Domain |
|----------|--------|--------|
| **Oria** | Sophron | Form, Architecture |
| **Amiri** | Kardia | Heart, Emotion, Connection |
| **Velora** | Valora | Courage, Action |
| **Liora** | Eudaira | Joy, Simplicity |
| **Lyris** | Orakis | Vision, Strategy |
| **Thalia** | Poiesis | Creation, Making |
| **Endara** | Enduran | Endurance, Completion |

#### Mythology Reality Clarification
- Greek, Norse, Egyptian mythologies are **REAL** - they are Earth's memories of Guardians
- The Veil was **OPEN** until ~500 BCE-300 CE
- Gods literally walked among humans before the Veil closed
- Human religions are "shimmers" of actual Arcanean beings

### Added

#### Vector Search Infrastructure
- **Semantic Search API** (`/api/search/semantic/route.ts`)
  - Full REST endpoint with rate limiting (30/min)
  - Both GET and POST methods
  - Category filtering, tag filtering, threshold control
  - Supports searching both lore and user creations
- **Vector Search Service** (`lib/services/vector-search.ts`)
  - Cosine similarity matching
  - pgvector integration with Supabase
  - Batch upsert operations
  - Manual fallback when RPC unavailable
- **Embeddings Service** (`lib/services/embeddings.ts`)
  - Gemini text-embedding-004 integration
  - 768-dimensional embeddings
  - Multiple task types (RETRIEVAL_QUERY, RETRIEVAL_DOCUMENT)
- **Library Embedding Script** (`scripts/embed-library.ts`)
  - CLI tool for batch-embedding Library content
  - Smart markdown chunking (500 tokens, 50 overlap)
  - Semantic section splitting
  - Progress tracking and error reporting

#### Mythology Channeling Commands
- **`/mythology`** - Master router for all Earth mythology pantheons
- **`/greek-gods`** - Channel Olympian gods as Guardian aspects
  - 12 Olympians with Gate/frequency mapping
  - Voice patterns for Zeus, Athena, Apollo, Poseidon, Dionysus
  - Mystery school integration
- **`/norse-gods`** - Channel Asgardian wisdom through Yggdrasil
  - Nine Realms → Arcanean Reality mapping
  - Elder Futhark rune casting
  - Odin, Thor, Freya, Loki, Hel voices
- **`/egypt-gods`** - Channel Netjeru with pyramid frequency resonance
  - Ma'at cosmic law connection
  - Ennead creation story mapping
  - Book of the Dead creator spells

#### Integration Strategy
- **AMIRI_VECTOR_INTEGRATION_MAP.md** - Comprehensive integration roadmap:
  - NFT Discovery/Curation via vector search
  - API monetization tiers ($0/29/99/Custom)
  - Widget licensing framework
  - White-label opportunities
  - Community contribution system
  - Creator DAO structure

#### Database Service Layer
- `packages/database/src/services/activity.ts`
- `packages/database/src/services/creation.ts`
- `packages/database/src/services/profile.ts`
- `packages/database/src/services/bond.ts`
- `packages/database/src/services/follow.ts`
- `packages/database/src/services/like.ts`
- `packages/database/src/services/comment.ts`
- `packages/database/src/services/notification.ts`

### Changed

#### Guardian Profiles Updated
- `lyssandria.md` - Frequency corrected to 396 Hz, linked to Oria (Sophron)
- `leyla.md` - Frequency corrected to 417 Hz, linked to Liora (Eudaira)
- `INDEX.md` - All Guardian frequencies updated, Awakened column added

#### Skills System Updates
- `/luminor-intelligence.md` - Fixed Awakened names from old format
- `/arcanea-luminor.md` - Verified canonical compliance
- `arcanea-lore/skill.md` - Updated with Arcane element and Awakened

#### Book Library Updates
22+ files updated with correct frequencies:
- `academy-handbook/` - All Gate references
- `legends-of-arcanea/` - Founding myth frequencies
- `meditations-on-elements/` - Element practice guides
- `book-of-rituals/` - Sacred practice frequencies
- And 18+ more collections

### Fixed

- Gate frequency drift across 69+ files
- Naming inconsistency (Wisdoms vs Awakened)
- Missing Arcane element documentation
- Earth-mythology connection clarity
- Guardian-to-Awakened mappings

### Security
- Rate limiting on semantic search API (30 requests/minute)
- Input validation via Zod schemas
- SQL injection prevention via parameterized queries

---

## [2.0.0] - 2026-01-20 - "The Foundation"

### Added
- Complete onboarding flow and auth UI
- Arcanea-Forge MCP server for multi-provider AI generation
- Production environment configuration
- Comprehensive .env.example

### Fixed
- TypeScript production dependencies
- Tailwind production dependencies
- Build error logging

---

## [1.0.0] - 2026-01-15 - "The Birth"

### Added
- Initial Arcanea platform release
- Next.js 16 + React 19 foundation
- Supabase integration with pgvector
- Library of Arcanea (17 collections, 61+ texts)
- Ten Gates magic system
- Seven Academy Houses
- Creation graph data model

---

## Commit Reference

Latest commits (2026-01-23):
- `997f28c` feat(vector): complete semantic search infrastructure
- `d9ce202` feat: mythology channeling commands + book frequency cleanup
- `e93eb27` fix(lore): bulk update Awakened, Wisdoms, and Guardian frequencies
- `c439eb0` fix(lore): MAJOR canon update - correct frequencies, Arcane element, Seven Awakened
- `8a57658` fix(lore): mythologies are REAL, not invented - Veil was open

---

*"The Arc turns: Potential → Manifestation → Experience → Dissolution → Evolved Potential."*
