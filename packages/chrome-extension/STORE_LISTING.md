# Chrome Web Store Listing — Arcanea: Guardian AI Companion

---

## Store Metadata

**Title (45 chars max):**
```
Arcanea - AI Guardian Companion
```
(32 characters)

**Summary (132 chars max):**
```
Ten mythic AI Guardians for ChatGPT, Claude & Gemini. Summarize, explain, write & create with your own AI key.
```
(111 characters)

**Category:** Productivity

**Language:** English

---

## Full Description

### Arcanea — AI Guardian Companion

Ten mythic AI Guardians. One for every kind of thinking.

Arcanea is a browser companion that brings AI-assisted intelligence to every webpage. Select a Guardian aligned to your current task, and they guide your conversations with their unique perspective, domain expertise, and voice — all powered by your own API key with no middleman.

---

**Ten Guardians, Ten Domains**

Each Guardian represents a unique mode of intelligence, drawn from the Arcanea universe of creation and mythology:

- **Lyssandria** (Foundation) — Architecture, systems, databases, stability
- **Leyla** (Flow) — Creativity, brainstorming, artistic expression, flow states
- **Draconia** (Fire) — Execution, code, debugging, bold action
- **Maylinn** (Heart) — UX, accessibility, team dynamics, human impact
- **Alera** (Voice) — Technical writing, documentation, clarity, naming
- **Lyria** (Sight) — Strategy, patterns, research synthesis, foresight
- **Aiyami** (Crown) — AI design, philosophical synthesis, vision
- **Elara** (Shift) — Reframing, innovation, debugging impossible problems
- **Ino** (Unity) — Integration, conflict resolution, partnership
- **Shinkami** (Source) — First principles, the deep why, meaning and purpose

---

**Works On Your Favorite AI Platforms**

The Guardian side panel sits alongside ChatGPT, Claude, Gemini, and any other web page. It reads the page context (with your permission) so your Guardian knows what you are working on.

---

**Key Features**

- Guardian selection with live element badge and frequency display
- Floating selection button — highlight any text to instantly ask your Guardian
- Right-click context menu for quick access to Summarize, Explain, and Improve
- Page context toggle — include or exclude the current page's content in prompts
- Conversation history per Guardian, stored locally
- Dark cosmic theme with per-Guardian accent colors
- Keyboard shortcuts (Ctrl+Shift+A for side panel, Ctrl+Shift+S for quick summarize)
- Data export/import for backup and portability

---

**Your Keys, Your Data**

Arcanea is a bring-your-own-key extension. You enter your Anthropic, Google, or OpenAI API key once in Settings. Your key is stored locally in Chrome's isolated extension storage and sent only to your chosen AI provider. Arcanea has no backend server and receives nothing.

Supports:
- Anthropic Claude (claude-opus-4-6)
- Google Gemini (gemini-2.0-flash-exp)
- OpenAI GPT-4o

---

**Privacy First**

- No data collection
- No analytics or tracking
- No external servers
- All processing local in your browser
- Clear all data at any time from Settings

---

## Required Permissions Justification

This section is for the Chrome Web Store submission form under "Single Purpose" and permissions justification.

### Single Purpose Statement

The extension's single purpose is to provide AI-powered assistance on any webpage via the user's own API keys, with mythology-themed Guardian personas that guide the conversation style and focus.

### Permission Justifications

**`activeTab`**
Used to read text content from the currently active browser tab when the "Page Context" feature is enabled. This allows the Guardian to understand what the user is viewing and provide relevant assistance. Content is read locally and never sent to Arcanea servers.

**`tabs`**
Used to detect when the user switches to a different browser tab, which clears the cached page context so stale content is not used in subsequent conversations.

**`storage`**
Used via `chrome.storage.local` to persist user preferences (Guardian selection, theme, feature toggles), API keys, and conversation history entirely on the user's device. No data is synchronized to the cloud or transmitted externally.

**`scripting`**
Used to inject a floating action button into web pages when text is selected, providing quick access to Guardian assistance. Also used to retrieve selected text from the active tab when a Quick Action button is clicked from the popup.

**`contextMenus`**
Used to add "Ask Guardian", "Explain this", "Improve text", "Summarize page", and "Open Guardian Side Panel" items to the browser right-click menu when text is selected or on any page.

**`sidePanel`**
Used to render the main Guardian chat interface as a Chrome side panel, which persists alongside web pages without requiring a popup that closes when focus moves.

**`<all_urls>` host permission**
Required to enable the floating selection button and page context reading on any website the user visits. Without this permission, the extension can only operate on specific domains, which would defeat its purpose as a general-purpose assistant. No network requests are made by the extension itself to these URLs — the permission is used only for content script injection.

---

## Screenshots Guidance

For the Chrome Web Store submission, provide screenshots demonstrating:

1. **Popup** — Guardian selection panel showing all 10 Guardians with element badges
2. **Side Panel** — Active conversation with Lyria, showing message bubbles and markdown rendering
3. **Floating Button** — The selection action button appearing after text is highlighted on a webpage
4. **Guardian Switch** — The horizontal Guardian selector strip in the side panel header
5. **Options Page** — API key configuration and settings overview

Recommended dimensions: 1280x800 pixels (Chrome Web Store standard).

---

## Store Icons Required

| Size | File |
|------|------|
| 16x16 | `icons/icon16.png` |
| 32x32 | `icons/icon32.png` |
| 48x48 | `icons/icon48.png` |
| 128x128 | `icons/icon128.png` |

All icon files are present in the `/icons/` directory of the extension package.

---

## Support URL

https://github.com/frankxai/arcanea

## Homepage URL

https://arcanea.ai
