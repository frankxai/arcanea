# Privacy Policy — Arcanea: Guardian AI Companion

**Last Updated:** February 22, 2026
**Extension Name:** Arcanea — Guardian AI
**Version:** 0.1.0
**Developer:** Arcanea / frankxai

---

## Overview

Arcanea — Guardian AI is a Chrome browser extension that provides mythology-themed AI assistance on AI chat platforms (ChatGPT, Claude, Gemini) and general web pages. This Privacy Policy explains clearly and honestly what data the extension does and does not collect.

**The short version:** This extension does not collect, transmit, or share any personal data. All processing happens locally in your browser.

---

## 1. Data We Do NOT Collect

We do not collect, store, transmit, or share:

- Your name, email address, or any identity information
- Browsing history or visited URLs
- Search queries or page content you view
- Conversation content or messages you send to AI providers
- Location data of any kind
- Device identifiers, hardware IDs, or fingerprinting data
- Analytics, telemetry, or usage statistics
- Crash reports or diagnostic information sent to external servers

---

## 2. Data Stored Locally (On Your Device Only)

The extension uses `chrome.storage.local` to store preferences entirely on your device. This data never leaves your browser and is never transmitted to any server operated by Arcanea or any third party.

The following is stored locally:

| Data | Purpose | Stored Where |
|------|---------|--------------|
| Active Guardian selection | Remember your preferred Guardian | `chrome.storage.local` |
| UI theme preference (dark/light) | Visual preference | `chrome.storage.local` |
| Provider selection (Anthropic/Google/OpenAI) | Default AI provider | `chrome.storage.local` |
| Feature toggles (floating button, context, shortcuts) | Behavior preferences | `chrome.storage.local` |
| API keys you enter | Connect to AI providers | `chrome.storage.local` |
| Conversation history | Review past chats per Guardian | `chrome.storage.local` |
| Recent Guardian list | Quick-access recent sessions | `chrome.storage.local` |

You can view, export, or delete all locally stored data at any time through the extension's Settings page (Options).

---

## 3. API Keys

If you choose to use the AI features, you will enter your own API keys for Anthropic (Claude), Google (Gemini), or OpenAI (GPT-4o). These keys are:

- Stored only in `chrome.storage.local` on your device
- Never transmitted to any Arcanea-operated server
- Sent only directly to the respective AI provider (Anthropic, Google, or OpenAI) when you send a message
- Protected by Chrome's extension storage isolation — other extensions and websites cannot access them

You are responsible for safeguarding your API keys and for any usage charges incurred with your provider accounts.

---

## 4. AI Provider Communication

When you send a message, the extension communicates directly from your browser to the AI provider API you have configured. This communication:

- Goes directly from your browser to the provider (Anthropic, Google, or OpenAI)
- Does not pass through any Arcanea or third-party intermediary
- Is subject to each provider's own privacy policy and terms of service

**Anthropic Privacy Policy:** https://www.anthropic.com/privacy
**Google Privacy Policy:** https://policies.google.com/privacy
**OpenAI Privacy Policy:** https://openai.com/policies/privacy-policy

---

## 5. Page Content Access

When the "Page Context" feature is enabled (the default), the extension reads text content from the current browser tab. This content is:

- Read locally in your browser's tab
- Used only to construct the prompt sent to your chosen AI provider
- Never sent to any Arcanea server
- Never stored beyond the current browser session (it is not saved to `chrome.storage.local`)

The extension injects a content script into web pages for this purpose. The content script only reads page text; it does not modify pages, capture screenshots, or record keystrokes.

---

## 6. Permissions Justification

The extension requests the following Chrome permissions:

| Permission | Reason |
|------------|--------|
| `activeTab` | Read content from the currently active tab when Page Context is enabled |
| `tabs` | Detect tab changes to clear cached page context |
| `storage` | Save your preferences and conversation history locally |
| `scripting` | Inject the floating action button into web pages |
| `contextMenus` | Add the "Ask Guardian" right-click context menu |
| `sidePanel` | Provide the Guardian side panel interface |
| `<all_urls>` host permission | Enable the floating selection button and page context on any website you visit |

No permission is used for any purpose beyond what is listed above.

---

## 7. No Third-Party Services

The extension does not load or call:

- Analytics platforms (Google Analytics, Mixpanel, Segment, etc.)
- Advertising networks
- Tracking pixels or beacons
- Social media widgets
- Any Arcanea-operated backend server

All extension resources (JavaScript, HTML, CSS, icons) are bundled within the extension package itself and served locally by Chrome.

---

## 8. Children's Privacy

This extension is not designed for or directed at children under 13 years of age. We do not knowingly collect any information from children. Because this extension collects no personal data from any users, it is inherently safe in this regard.

---

## 9. Data Deletion

To delete all data stored by this extension:

1. Open the extension popup
2. Click the Settings icon (gear) to open the Options page
3. Scroll to the **Data Management** section
4. Click **Clear All Data** to remove all locally stored data including API keys, preferences, and conversation history

Alternatively, you can uninstall the extension through Chrome's extension manager. Chrome will remove all locally stored data when the extension is uninstalled.

---

## 10. Changes to This Policy

If this privacy policy is updated in a material way, the updated version will be published with the extension update and reflected in the Last Updated date above. Continued use of the extension after an update constitutes acceptance of the revised policy.

---

## 11. Contact

For privacy questions, concerns, or requests, please contact:

**Project:** Arcanea
**GitHub:** https://github.com/frankxai/arcanea
**Email:** Contact via GitHub repository issues

---

## Summary

Arcanea — Guardian AI is designed with privacy as a first principle:

- No servers receive your data
- No analytics track your behavior
- No third parties receive anything
- Your API keys and conversations stay on your device
- You can delete everything at any time

The extension exists to help you think and create — not to observe you doing it.
