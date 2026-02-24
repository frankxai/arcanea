import { extractPageContent, formatPageContextForAI } from './utils/readability.js';

// ─── Shadow DOM Setup ─────────────────────────────────────────────────────────

let shadowHost: HTMLElement | null = null;
let shadowRoot: ShadowRoot | null = null;
let floatingButton: HTMLElement | null = null;
let selectionTimeout: ReturnType<typeof setTimeout> | null = null;
let lastSelectedText = '';

function createShadowContainer(): ShadowRoot {
  if (shadowRoot) return shadowRoot;

  shadowHost = document.createElement('div');
  shadowHost.id = 'arcanea-extension-root';
  shadowHost.style.cssText = `
    position: fixed;
    z-index: 2147483647;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  `;
  document.documentElement.appendChild(shadowHost);

  shadowRoot = shadowHost.attachShadow({ mode: 'closed' });

  // Inject scoped styles into shadow DOM
  const style = document.createElement('style');
  style.textContent = `
    :host { all: initial; }

    .arcanea-btn {
      position: fixed;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: rgba(18, 21, 28, 0.92);
      border: 1px solid rgba(127, 255, 212, 0.35);
      border-radius: 20px;
      color: #7fffd4;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      pointer-events: all;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(127,255,212,0.1);
      transition: all 0.2s ease;
      white-space: nowrap;
      z-index: 2147483647;
      user-select: none;
    }

    .arcanea-btn:hover {
      background: rgba(26, 29, 38, 0.96);
      border-color: rgba(127, 255, 212, 0.6);
      box-shadow: 0 6px 32px rgba(0,0,0,0.5), 0 0 16px rgba(127,255,212,0.15);
      transform: translateY(-1px);
    }

    .arcanea-btn .arcanea-icon {
      font-size: 14px;
      line-height: 1;
    }

    .arcanea-btn .arcanea-label {
      color: #e8e6e3;
      font-size: 12px;
    }

    .arcanea-btn .arcanea-guardian-name {
      color: #7fffd4;
      font-size: 12px;
      font-weight: 600;
    }

    .arcanea-actions-menu {
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: rgba(18, 21, 28, 0.96);
      border: 1px solid rgba(127, 255, 212, 0.2);
      border-radius: 12px;
      padding: 6px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      z-index: 2147483647;
      pointer-events: all;
      min-width: 180px;
    }

    .arcanea-action-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 8px;
      color: #e8e6e3;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .arcanea-action-item:hover {
      background: rgba(127, 255, 212, 0.08);
      color: #7fffd4;
    }

    .arcanea-action-icon {
      font-size: 15px;
      width: 20px;
      text-align: center;
    }

    @keyframes arcanea-fade-in {
      from { opacity: 0; transform: translateY(4px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .arcanea-btn, .arcanea-actions-menu {
      animation: arcanea-fade-in 0.15s ease;
    }
  `;
  shadowRoot.appendChild(style);

  return shadowRoot;
}

// ─── Floating Action Button ────────────────────────────────────────────────────

function showFloatingButton(x: number, y: number, selectedText: string): void {
  const root = createShadowContainer();
  removeFloatingButton();

  const btn = document.createElement('div');
  btn.className = 'arcanea-btn';

  // Position near selection
  const vpWidth = window.innerWidth;
  const btnLeft = Math.min(x, vpWidth - 220);
  const btnTop = y - 50;

  btn.style.left = `${Math.max(8, btnLeft)}px`;
  btn.style.top = `${Math.max(8, btnTop)}px`;

  btn.innerHTML = `
    <span class="arcanea-icon">✦</span>
    <span class="arcanea-label">Ask</span>
    <span class="arcanea-guardian-name">Guardian</span>
  `;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    e.preventDefault();
    showActionsMenu(btnLeft, btnTop + 44, selectedText);
  });

  floatingButton = btn;
  root.appendChild(btn);
}

function showActionsMenu(x: number, y: number, selectedText: string): void {
  const root = createShadowContainer();
  removeActionsMenu();

  if (floatingButton) floatingButton.remove();
  floatingButton = null;

  const menu = document.createElement('div');
  menu.className = 'arcanea-actions-menu';
  menu.id = 'arcanea-actions-menu';

  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;
  menu.style.left = `${Math.min(x, vpWidth - 200)}px`;
  menu.style.top = `${Math.min(y, vpHeight - 200)}px`;

  const actions = [
    { icon: '✦', label: 'Ask Guardian', action: 'ask' },
    { icon: '📖', label: 'Explain this', action: 'explain' },
    { icon: '✏️', label: 'Improve text', action: 'improve' },
    { icon: '🌐', label: 'Translate', action: 'translate' },
    { icon: '💡', label: 'Summarize page', action: 'summarize' },
  ];

  for (const item of actions) {
    const el = document.createElement('div');
    el.className = 'arcanea-action-item';
    el.innerHTML = `<span class="arcanea-action-icon">${item.icon}</span>${item.label}`;

    el.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      removeActionsMenu();
      sendToSidePanel(item.action, selectedText);
    });

    menu.appendChild(el);
  }

  root.appendChild(menu);

  // Close on outside click
  const closeHandler = (e: Event) => {
    if (!menu.contains(e.target as Node)) {
      removeActionsMenu();
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 100);
}

function removeFloatingButton(): void {
  if (floatingButton) {
    floatingButton.remove();
    floatingButton = null;
  }
}

function removeActionsMenu(): void {
  if (!shadowRoot) return;
  const menu = shadowRoot.getElementById('arcanea-actions-menu');
  if (menu) menu.remove();
}

// ─── Selection Detection ──────────────────────────────────────────────────────

let floatingButtonEnabled = true; // Updated by initialize()

document.addEventListener('mouseup', _e => {
  if (!floatingButtonEnabled) return;
  if (selectionTimeout) {
    clearTimeout(selectionTimeout);
    selectionTimeout = null;
  }

  selectionTimeout = setTimeout(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() ?? '';

    if (text.length > 10 && text !== lastSelectedText) {
      lastSelectedText = text;
      const range = selection?.getRangeAt(0);
      if (range) {
        const rect = range.getBoundingClientRect();
        showFloatingButton(
          rect.right + window.scrollX,
          rect.bottom + window.scrollY,
          text
        );
      }
    } else if (text.length === 0) {
      removeFloatingButton();
      removeActionsMenu();
      lastSelectedText = '';
    }
  }, 300);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    removeFloatingButton();
    removeActionsMenu();
  }
});

// ─── Communication with Side Panel ───────────────────────────────────────────

function sendToSidePanel(action: string, selectedText: string): void {
  chrome.runtime.sendMessage({
    type: 'content-action',
    action,
    selectedText,
    pageUrl: window.location.href,
    pageTitle: document.title,
  }).catch(err => {
    console.debug('Arcanea: Could not send to side panel:', err);
    // Open side panel if not already open
    chrome.runtime.sendMessage({ type: 'open-sidepanel' }).then(() => {
      setTimeout(() => {
        chrome.runtime.sendMessage({
          type: 'content-action',
          action,
          selectedText,
          pageUrl: window.location.href,
          pageTitle: document.title,
        }).catch(() => {
          // Last resort: store in pending queue
        });
      }, 600);
    }).catch(() => {});
  });
}

// ─── Message Listener ─────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case 'get-page-content': {
      try {
        const content = extractPageContent();
        const formatted = formatPageContextForAI(content);
        sendResponse({
          success: true,
          content,
          formatted,
        });
      } catch (err) {
        sendResponse({
          success: false,
          error: err instanceof Error ? err.message : 'Failed to extract content',
        });
      }
      break;
    }

    case 'highlight-text': {
      const text = message.text as string;
      if (text) {
        highlightTextOnPage(text);
      }
      sendResponse({ success: true });
      break;
    }

    case 'scroll-to-top': {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      sendResponse({ success: true });
      break;
    }

    default:
      sendResponse({ error: `Unknown message type: ${String(message.type)}` });
  }

  return false;
});

// ─── Text Highlighting ────────────────────────────────────────────────────────

function highlightTextOnPage(text: string): void {
  // Simple implementation: use find API if available
  if ('find' in window) {
    (window as Window & { find: (text: string) => boolean }).find(text);
  }
}

// ─── Input/Textarea Detection ─────────────────────────────────────────────────

function setupWritingAssistant(): void {
  let activeInput: HTMLTextAreaElement | HTMLInputElement | null = null;

  document.addEventListener('focusin', e => {
    const target = e.target as HTMLElement;
    if (
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLInputElement && target.type === 'text')
    ) {
      activeInput = target;
    }
  });

  document.addEventListener('focusout', () => {
    activeInput = null;
  });

  // Listen for keyboard shortcut Ctrl+Shift+Space to activate writing assistant
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'Space') {
      if (activeInput) {
        const text = activeInput.value;
        if (text.trim().length > 0) {
          sendToSidePanel('improve', text);
        }
      }
    }
  });
}

// Initialize with settings check
async function initialize(): Promise<void> {
  try {
    const result = await chrome.storage.local.get('settings');
    const settings = result?.settings ?? {};
    const enableFloating = settings.enableFloatingButton ?? true;
    const enableShortcuts = settings.keyboardShortcuts ?? true;
    floatingButtonEnabled = enableFloating;

    if (enableFloating) {
      createShadowContainer();
    }
    if (enableShortcuts) {
      setupWritingAssistant();
    }
  } catch {
    // Fallback: enable everything if storage fails
    createShadowContainer();
    setupWritingAssistant();
  }
}

initialize();
