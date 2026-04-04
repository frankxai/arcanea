# Arcanea Canvas - Backlog

## Phase 1: Thin Slice MVP [CURRENT]

- [x] Architecture docs (ADR-001, ARCHITECTURE.md, PRODUCT-VISION.md, DOMAIN-MODEL.md)
- [x] packages/canvas-core scaffold with types
- [x] InfiniteCanvas engine (zoom/pan/viewport)
- [x] CanvasNode wrapper (position/drag/resize)
- [x] Content nodes: StickyNote, Card, Frame
- [x] ConnectorLayer (SVG arrows)
- [x] BoardState (state management with useReducer)
- [x] apps/canvas Next.js app scaffold
- [x] Board editor page with canvas + toolbar + sidebar
- [x] Board dashboard page
- [x] Supabase migration for boards table
- [x] BoardStore (localStorage persistence)
- [x] Monorepo config (package.json, turbo.json)
- [ ] Install dependencies and verify build
- [ ] Keyboard shortcuts (Delete, Ctrl+Z undo)
- [ ] Multi-select with shift+click

## Phase 2: Content Richness + URL Magic

- [ ] MarkdownDoc node (react-markdown rendering)
- [ ] CodeBlock node (prism-react-renderer syntax highlighting)
- [ ] MediaEmbed node (YouTube, images, videos)
- [ ] URLCard node (auto-metadata extraction with metascraper)
- [ ] LivePreview node (iframe with srcdoc/src)
- [ ] URL drop handler (detect type, create appropriate node)
- [ ] YouTube transcript extraction (API route + youtube-transcript npm)
- [ ] Article content extraction (@mozilla/readability)
- [ ] Properties panel enhancements (edit all metadata)
- [ ] Board version history (snapshots table)
- [ ] Node search/filter
- [ ] Copy/paste nodes
- [ ] Undo/redo with full history
- [ ] Grid snapping
- [ ] Minimap
- [ ] Freehand drawing overlay (SVG/Canvas)

## Phase 3: AI Agent Integration

- [ ] AI sidebar chat (Vercel AI SDK streaming)
- [ ] Context builder (selected nodes -> AI prompt context)
- [ ] AI generates new nodes positioned near selection
- [ ] MindMap node (React Flow embedded)
- [ ] Infographic node (SVG/HTML generation)
- [ ] UIPreview node (AI-generated HTML in sandboxed iframe)
- [ ] WorkflowBlock node
- [ ] Agent CRUD API (programmatic canvas manipulation)
- [ ] Provenance badges on AI-generated nodes
- [ ] Smart clustering (group similar notes)
- [ ] Auto-layout (force-directed graph positioning)
- [ ] Template suggestions based on board content

## Phase 4: Collaboration + Productization

- [ ] Real-time collaboration (Yjs + WebSocket or Supabase Realtime)
- [ ] Board sharing (public link, team access controls)
- [ ] Template system (pre-built board layouts)
- [ ] Export to PNG/SVG/JSON/PDF
- [ ] Board embedding (iframe for other Arcanea apps)
- [ ] Cursor presence (see other users' cursors)
- [ ] Comments on nodes
- [ ] Board permissions (view, edit, admin)
- [ ] Activity feed per board

## Phase 5: Arcanea Differentiation

- [ ] Guardian-themed board templates (one per Gate)
- [ ] Elemental styling for nodes (Fire/Water/Earth/Wind/Void colors)
- [ ] Luminor companion as canvas AI agent with personality
- [ ] Library content embedding (link texts to canvas objects)
- [ ] Academy integration (canvas work counts toward Gate progression)
- [ ] Lore-aware AI suggestions (Guardian-specific responses)
- [ ] Cosmic effects (glow, particles on selected nodes)
- [ ] Arcanea Canvas integration with main Arcanea app
- [ ] Board marketplace (share/discover templates)

## Technical Debt / Infrastructure

- [ ] Virtualization for 1000+ DOM nodes (off-screen culling)
- [ ] Supabase persistence (replace localStorage)
- [ ] Auth integration with main Arcanea auth
- [ ] E2E tests with Playwright
- [ ] Performance benchmarks
- [ ] Accessibility audit (keyboard navigation, screen reader)
- [ ] Mobile/tablet touch support
- [ ] PWA support for offline boards
