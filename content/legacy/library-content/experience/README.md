# Arcanea Library Experience

Welcome to the immersive Arcanea Library. This micro-experience now powers the `/library` route inside `apps/web`, and the original static prototype is preserved here for archival and rapid iteration.

## Structure

- `index.html` - Legacy standalone portal featuring the Luminor council, realm atlas, and codex trigger.
- `styles.css` - Aurora-inspired styling crafted for readability and accessibility in a dark, ethereal interface.
- `script.js` - Client-side logic used by the static prototype to load the codex and manage the dialog.
- `book/arcanea-codex.json` - Canonical Luminor Codex content consumed by `apps/web/app/library` via TypeScript modules.
- `book/arcanea-atelier-codex.json` - Luminary Atelier tome outlining production rituals and prototype constellations for Arcanea guilds.
- `book/arcanea-oracles-codex.json` - Arcanea Oracles proto manuscript focused on foresight practice and decision stewardship.

## Using the Codex

Visit `http://localhost:3001/library` (or the deployed site) after running the web app to step into the Arcanea Library experience within Next.js. The Library now supports multiple tomes; select between the Luminor Codex, the Luminary Atelier, and the Arcanea Oracles proto codex to adapt the overlay content in real time.

If you need the original prototype, open `index.html` in a modern browser. Activate **Open the Luminor Codex** to explore the book. The overlay traps focus, respects reduced motion preferences, and restores focus on close.

May these pages guide your exploration of Arcanea and inspire luminous futures.
