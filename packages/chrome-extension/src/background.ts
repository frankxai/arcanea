import { GUARDIANS, getGuardianById } from './guardians.js';
import { getSettings, getApiKeys, setSettings } from './utils/storage.js';
import type { Provider } from './ai-service.js';

// Message types
export interface BackgroundMessage {
  type: string;
  [key: string]: unknown;
}

// ─── Installation & Setup ─────────────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(async details => {
  if (details.reason === 'install') {
    // Initialize default settings
    await setSettings({
      defaultGuardianId: 'lyria',
      activeProvider: 'anthropic',
      theme: 'dark',
      includePageContext: true,
      enableFloatingButton: true,
      keyboardShortcuts: true,
      maxHistoryPerGuardian: 100,
    });

    // Open options page on first install
    chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
  }

  createContextMenus();
});

// ─── Context Menus ────────────────────────────────────────────────────────────

function createContextMenus(): void {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'arcanea-root',
      title: 'Arcanea Guardian AI',
      contexts: ['selection', 'page', 'link'],
    });

    chrome.contextMenus.create({
      id: 'arcanea-ask',
      parentId: 'arcanea-root',
      title: 'Ask Guardian about "%s"',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'arcanea-improve',
      parentId: 'arcanea-root',
      title: 'Improve selected text',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'arcanea-explain',
      parentId: 'arcanea-root',
      title: 'Explain this',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'separator-1',
      parentId: 'arcanea-root',
      type: 'separator',
      contexts: ['page', 'selection'],
    });

    chrome.contextMenus.create({
      id: 'arcanea-summarize',
      parentId: 'arcanea-root',
      title: 'Summarize this page',
      contexts: ['page', 'selection'],
    });

    chrome.contextMenus.create({
      id: 'arcanea-open-sidepanel',
      parentId: 'arcanea-root',
      title: 'Open Guardian Side Panel',
      contexts: ['page', 'selection'],
    });
  });
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;

  const settings = await getSettings();

  switch (info.menuItemId) {
    case 'arcanea-ask':
      await openSidePanelWithMessage(tab, {
        type: 'context-menu-action',
        action: 'ask',
        selectedText: info.selectionText ?? '',
        guardianId: settings.defaultGuardianId,
      });
      break;

    case 'arcanea-improve':
      await openSidePanelWithMessage(tab, {
        type: 'context-menu-action',
        action: 'improve',
        selectedText: info.selectionText ?? '',
        guardianId: 'alera', // Voice guardian for writing
      });
      break;

    case 'arcanea-explain':
      await openSidePanelWithMessage(tab, {
        type: 'context-menu-action',
        action: 'explain',
        selectedText: info.selectionText ?? '',
        guardianId: settings.defaultGuardianId,
      });
      break;

    case 'arcanea-summarize':
      await openSidePanelWithMessage(tab, {
        type: 'context-menu-action',
        action: 'summarize',
        selectedText: '',
        guardianId: settings.defaultGuardianId,
      });
      break;

    case 'arcanea-open-sidepanel':
      await chrome.sidePanel.open({ tabId: tab.id });
      break;
  }
});

async function openSidePanelWithMessage(
  tab: chrome.tabs.Tab,
  message: Record<string, unknown>
): Promise<void> {
  if (!tab.id) return;

  try {
    await chrome.sidePanel.open({ tabId: tab.id });

    // Give side panel time to load
    setTimeout(() => {
      chrome.runtime.sendMessage({ ...message, source: 'background' }).catch(() => {
        // Side panel not ready yet, store message for later retrieval
        pendingMessages.push(message);
      });
    }, 500);
  } catch (err) {
    console.error('Failed to open side panel:', err);
  }
}

// ─── Pending Messages Queue ───────────────────────────────────────────────────

const pendingMessages: Array<Record<string, unknown>> = [];

// ─── Keyboard Commands ────────────────────────────────────────────────────────

chrome.commands.onCommand.addListener(async command => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  switch (command) {
    case 'open-sidepanel':
      await chrome.sidePanel.open({ tabId: tab.id });
      break;

    case 'quick-summarize':
      await openSidePanelWithMessage(tab, {
        type: 'context-menu-action',
        action: 'summarize',
        selectedText: '',
        guardianId: 'lyria',
      });
      break;
  }
});

// ─── Message Routing ──────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message: BackgroundMessage, _sender, sendResponse) => {
  const msg = message;

  switch (msg.type) {
    case 'get-pending-messages': {
      const pending = [...pendingMessages];
      pendingMessages.length = 0;
      sendResponse({ messages: pending });
      break;
    }

    case 'get-settings': {
      getSettings().then(settings => sendResponse({ settings })).catch(err => {
        sendResponse({ error: String(err) });
      });
      return true; // Keep channel open for async
    }

    case 'set-settings': {
      const settingsUpdate = msg['settings'] as Record<string, unknown>;
      setSettings(settingsUpdate as Parameters<typeof setSettings>[0])
        .then(() => sendResponse({ success: true }))
        .catch(err => sendResponse({ error: String(err) }));
      return true;
    }

    case 'get-api-keys': {
      getApiKeys().then(keys => sendResponse({ keys })).catch(err => {
        sendResponse({ error: String(err) });
      });
      return true;
    }

    case 'open-sidepanel': {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];
        if (tab?.id) {
          chrome.sidePanel.open({ tabId: tab.id }).then(() => {
            sendResponse({ success: true });
          }).catch(err => sendResponse({ error: String(err) }));
        }
      });
      return true;
    }

    case 'get-page-content': {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];
        if (!tab?.id) {
          sendResponse({ error: 'No active tab' });
          return;
        }
        chrome.tabs.sendMessage(tab.id, { type: 'get-page-content' }, response => {
          if (chrome.runtime.lastError) {
            sendResponse({ error: chrome.runtime.lastError.message });
          } else {
            sendResponse(response);
          }
        });
      });
      return true;
    }

    case 'inject-content-script': {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0];
        if (!tab?.id) {
          sendResponse({ error: 'No active tab' });
          return;
        }
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['dist/content.js'],
        }).then(() => sendResponse({ success: true }))
          .catch(err => sendResponse({ error: String(err) }));
      });
      return true;
    }

    case 'change-provider': {
      const provider = msg['provider'] as Provider;
      setSettings({ activeProvider: provider })
        .then(() => sendResponse({ success: true }))
        .catch(err => sendResponse({ error: String(err) }));
      return true;
    }

    case 'change-guardian': {
      const guardianId = msg['guardianId'] as string;
      const guardian = getGuardianById(guardianId);
      if (!guardian) {
        sendResponse({ error: `Unknown guardian: ${guardianId}` });
      } else {
        setSettings({ defaultGuardianId: guardianId })
          .then(() => sendResponse({ success: true, guardian }))
          .catch(err => sendResponse({ error: String(err) }));
      }
      return true;
    }

    case 'get-guardians': {
      sendResponse({ guardians: GUARDIANS });
      break;
    }

    default:
      sendResponse({ error: `Unknown message type: ${String(msg.type)}` });
  }

  return false;
});

// ─── Tab Events ───────────────────────────────────────────────────────────────

chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  // Notify any open side panels about tab change
  chrome.runtime.sendMessage({
    type: 'tab-changed',
    tab: { id: tab.id, url: tab.url, title: tab.title },
  }).catch(() => {
    // Side panel might not be open — that's fine
  });
});

// ─── Side Panel Configuration ─────────────────────────────────────────────────

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch(() => {
    // API may not be available on all Chrome versions
  });
