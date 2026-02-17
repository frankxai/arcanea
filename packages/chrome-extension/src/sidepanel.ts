import { GUARDIANS, getGuardianById, type Guardian } from './guardians.js';
import {
  getSettings,
  setSettings,
  getConversationHistory,
  addMessage,
  clearConversationHistory,
  updateRecentGuardians,
  getApiKeys,
  type Message,
} from './utils/storage.js';
import { streamChat, type Provider } from './ai-service.js';

// ─── State ────────────────────────────────────────────────────────────────────

let activeGuardian: Guardian = GUARDIANS[5]; // Lyria
let activeProvider: Provider = 'anthropic';
let includePageContext = true;
let isStreaming = false;
let pageContextCache: string | null = null;
let conversationHistory: Message[] = [];
let activeTab: 'chat' | 'history' = 'chat';

// ─── DOM ──────────────────────────────────────────────────────────────────────

const messagesEl = document.getElementById('sp-messages') as HTMLElement;
const welcomeEl = document.getElementById('sp-welcome') as HTMLElement;
const inputEl = document.getElementById('sp-input') as HTMLTextAreaElement;
const sendBtn = document.getElementById('sp-send-btn') as HTMLButtonElement;
const contextToggle = document.getElementById('sp-context-toggle') as HTMLButtonElement;
const contextLabel = document.getElementById('sp-context-label') as HTMLElement;
const contextBtn = document.getElementById('sp-context-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('sp-clear-btn') as HTMLButtonElement;
const guardianSelector = document.getElementById('sp-guardian-selector') as HTMLElement;
const charCount = document.getElementById('sp-char-count') as HTMLElement;
const welcomeAvatar = document.getElementById('sp-welcome-avatar') as HTMLElement;
const welcomeName = document.getElementById('sp-welcome-name') as HTMLElement;
const welcomeGate = document.getElementById('sp-welcome-gate') as HTMLElement;
const welcomeDesc = document.getElementById('sp-welcome-desc') as HTMLElement;
const historyEl = document.getElementById('sp-history') as HTMLElement;

// ─── Guardian Display ─────────────────────────────────────────────────────────

function updateGuardianDisplay(guardian: Guardian): void {
  activeGuardian = guardian;

  // Update CSS custom property for guardian color across all themed elements
  document.documentElement.style.setProperty('--guardian-color', guardian.color);

  // Update welcome screen
  welcomeAvatar.textContent = guardian.avatar;
  welcomeName.textContent = guardian.name;
  welcomeName.style.color = guardian.color;
  welcomeGate.textContent = `GATE OF ${guardian.gate.toUpperCase()} • ${guardian.element.toUpperCase()} • ${guardian.frequency} HZ`;
  welcomeDesc.textContent = guardian.domain.slice(0, 4).join(', ') + '. Ask me anything.';

  // Update active chip
  document.querySelectorAll<HTMLElement>('.sp-guardian-chip').forEach(chip => {
    const isActive = chip.dataset['guardianId'] === guardian.id;
    chip.classList.toggle('active', isActive);
    if (isActive) {
      chip.style.setProperty('--chip-color', guardian.color);
    }
  });
}

// ─── Guardian Selector ────────────────────────────────────────────────────────

function buildGuardianSelector(): void {
  guardianSelector.innerHTML = '';

  GUARDIANS.forEach(guardian => {
    const chip = document.createElement('button');
    chip.className = 'sp-guardian-chip';
    chip.dataset['guardianId'] = guardian.id;
    chip.style.setProperty('--chip-color', guardian.color);
    chip.innerHTML = `<span class="chip-emoji">${guardian.avatar}</span>${guardian.name}`;

    if (guardian.id === activeGuardian.id) {
      chip.classList.add('active');
    }

    chip.addEventListener('click', async () => {
      await switchGuardian(guardian.id);
    });

    guardianSelector.appendChild(chip);
  });
}

async function switchGuardian(guardianId: string): Promise<void> {
  const guardian = getGuardianById(guardianId);
  if (!guardian) return;

  // Save current conversation before switching
  updateGuardianDisplay(guardian);
  await setSettings({ defaultGuardianId: guardianId });
  await updateRecentGuardians(guardianId);

  // Load conversation history for new guardian
  await loadConversationHistory();
}

// ─── Markdown Rendering ───────────────────────────────────────────────────────

function renderMarkdown(text: string): string {
  let html = escapeHtml(text);

  // Code blocks (must be before inline code)
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Blockquote
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists
  html = html.replace(/^(\s*)[*-] (.+)$/gm, '<li>$2</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr>');

  // Paragraphs — wrap double newlines
  html = html.replace(/\n\n/g, '</p><p>');

  // Single newlines to <br> within paragraphs
  html = html.replace(/\n/g, '<br>');

  // Wrap in paragraph if not already in a block element
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Message Rendering ────────────────────────────────────────────────────────

function showWelcome(): void {
  welcomeEl.style.display = '';
}

function hideWelcome(): void {
  welcomeEl.style.display = 'none';
}

function appendMessage(role: 'user' | 'assistant', content: string, streaming = false): HTMLElement {
  hideWelcome();

  const msgEl = document.createElement('div');
  msgEl.className = `sp-message ${role}`;

  const avatarEl = document.createElement('div');
  avatarEl.className = `sp-msg-avatar ${role}`;
  avatarEl.textContent = role === 'user' ? '✦' : activeGuardian.avatar;

  if (role === 'assistant') {
    avatarEl.style.borderColor = `${activeGuardian.color}40`;
    avatarEl.style.background = `${activeGuardian.color}10`;
  }

  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'sp-msg-bubble';

  if (role === 'user') {
    bubbleEl.textContent = content;
  } else {
    bubbleEl.innerHTML = streaming ? '' : renderMarkdown(content);
  }

  msgEl.appendChild(avatarEl);
  msgEl.appendChild(bubbleEl);
  messagesEl.appendChild(msgEl);

  scrollToBottom();
  return bubbleEl;
}

function appendTypingIndicator(): HTMLElement {
  hideWelcome();

  const msgEl = document.createElement('div');
  msgEl.className = 'sp-message assistant';
  msgEl.id = 'sp-typing-indicator';

  const avatarEl = document.createElement('div');
  avatarEl.className = 'sp-msg-avatar assistant';
  avatarEl.textContent = activeGuardian.avatar;
  avatarEl.style.borderColor = `${activeGuardian.color}40`;
  avatarEl.style.background = `${activeGuardian.color}10`;

  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'sp-msg-bubble';
  bubbleEl.innerHTML = `
    <div class="sp-typing">
      <div class="sp-typing-dot"></div>
      <div class="sp-typing-dot"></div>
      <div class="sp-typing-dot"></div>
    </div>
  `;

  msgEl.appendChild(avatarEl);
  msgEl.appendChild(bubbleEl);
  messagesEl.appendChild(msgEl);

  scrollToBottom();
  return bubbleEl;
}

function removeTypingIndicator(): void {
  const indicator = document.getElementById('sp-typing-indicator');
  if (indicator) indicator.remove();
}

function appendError(message: string): void {
  const errorEl = document.createElement('div');
  errorEl.className = 'sp-error';
  errorEl.innerHTML = `<span>⚠️</span><span>${escapeHtml(message)}</span>`;
  messagesEl.appendChild(errorEl);
  scrollToBottom();
}

function scrollToBottom(): void {
  requestAnimationFrame(() => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
}

// ─── Load Conversation History ────────────────────────────────────────────────

async function loadConversationHistory(): Promise<void> {
  // Clear messages display
  messagesEl.innerHTML = '';
  messagesEl.appendChild(welcomeEl);

  const history = await getConversationHistory(activeGuardian.id);
  conversationHistory = history.messages;

  if (conversationHistory.length === 0) {
    showWelcome();
    return;
  }

  hideWelcome();

  // Render last 20 messages
  const recentMessages = conversationHistory.slice(-20);
  for (const msg of recentMessages) {
    appendMessage(msg.role, msg.content);
  }
}

// ─── Page Context ─────────────────────────────────────────────────────────────

async function getPageContext(): Promise<string | null> {
  if (!includePageContext) return null;
  if (pageContextCache) return pageContextCache;

  try {
    const response = await chrome.runtime.sendMessage({ type: 'get-page-content' }) as {
      success: boolean;
      formatted?: string;
      error?: string;
    };

    if (response.success && response.formatted) {
      pageContextCache = response.formatted;
      return pageContextCache;
    }
  } catch (err) {
    console.debug('Could not get page context:', err);
  }

  return null;
}

// ─── Send Message ─────────────────────────────────────────────────────────────

async function sendMessage(userText: string): Promise<void> {
  if (isStreaming || !userText.trim()) return;

  isStreaming = true;
  sendBtn.disabled = true;

  try {
    const apiKeys = await getApiKeys();

    // Save user message
    const userMsg = await addMessage(activeGuardian.id, {
      role: 'user',
      content: userText,
    });
    conversationHistory.push(userMsg);
    appendMessage('user', userText);

    // Get page context
    const pageContext = await getPageContext();

    // Show typing indicator
    appendTypingIndicator();

    let assistantText = '';
    let assistantBubble: HTMLElement | null = null;

    await streamChat({
      guardian: activeGuardian,
      messages: conversationHistory.slice(0, -1), // Exclude the message we just added
      userMessage: userText,
      pageContext: pageContext ?? undefined,
      apiKeys: apiKeys as Record<string, string>,
      provider: activeProvider,
      onChunk: chunk => {
        if (chunk.type === 'delta' && chunk.text) {
          if (!assistantBubble) {
            removeTypingIndicator();
            assistantBubble = appendMessage('assistant', '', true);
          }
          assistantText += chunk.text;
          assistantBubble.innerHTML = renderMarkdown(assistantText);
          scrollToBottom();
        } else if (chunk.type === 'error') {
          removeTypingIndicator();
          appendError(chunk.error ?? 'An error occurred');
        } else if (chunk.type === 'done') {
          removeTypingIndicator();
          if (assistantBubble && assistantText) {
            assistantBubble.innerHTML = renderMarkdown(assistantText);
          }
        }
      },
    });

    // Save assistant message if we got one
    if (assistantText) {
      const assistantMsg = await addMessage(activeGuardian.id, {
        role: 'assistant',
        content: assistantText,
      });
      conversationHistory.push(assistantMsg);
    }
  } catch (err) {
    removeTypingIndicator();
    const message = err instanceof Error ? err.message : 'An unexpected error occurred';
    appendError(message);
  } finally {
    isStreaming = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

// ─── Action Handlers ──────────────────────────────────────────────────────────

async function handleAction(action: string): Promise<void> {
  const prompts: Record<string, string> = {
    summarize: 'Please summarize the content of this page in a clear, structured way. Highlight the key points and main takeaways.',
    explain: 'Please explain the main concepts on this page in clear, accessible language.',
    translate: 'Please translate the main content of this page to English (or if already in English, provide a translation to Spanish).',
    codereview: 'Please review any code on this page. Identify potential issues, suggest improvements, and highlight best practices.',
    improve: 'I have some text I\'d like you to improve. Please make it clearer, more professional, and more impactful while preserving the original intent.',
    ask: '',
    analyze: 'Please perform a thorough analysis of this page\'s content. What is the main argument? What evidence is provided? What are the strengths and weaknesses?',
  };

  const prompt = prompts[action];
  if (prompt) {
    inputEl.value = prompt;
    await sendMessage(prompt);
  } else {
    inputEl.focus();
  }
}

// ─── History Tab ──────────────────────────────────────────────────────────────

async function loadHistoryTab(): Promise<void> {
  historyEl.innerHTML = '';

  const allHistories = await Promise.all(
    GUARDIANS.map(async g => {
      const history = await getConversationHistory(g.id);
      return { guardian: g, history };
    })
  );

  const withMessages = allHistories.filter(h => h.history.messages.length > 0);

  if (withMessages.length === 0) {
    historyEl.innerHTML = '<div style="text-align:center;color:#555860;font-size:13px;padding:24px;">No conversation history yet</div>';
    return;
  }

  for (const { guardian, history } of withMessages) {
    const lastMsg = history.messages[history.messages.length - 1];

    const item = document.createElement('div');
    item.className = 'sp-history-item';
    item.innerHTML = `
      <span class="sp-history-emoji">${guardian.avatar}</span>
      <div class="sp-history-content">
        <div class="sp-history-preview">${escapeHtml(lastMsg?.content.slice(0, 80) ?? '')}${(lastMsg?.content.length ?? 0) > 80 ? '…' : ''}</div>
        <div class="sp-history-meta">${guardian.name} • ${history.messages.length} messages • ${formatTimeAgo(history.lastUpdated)}</div>
      </div>
    `;

    item.addEventListener('click', async () => {
      await switchGuardian(guardian.id);
      // Switch back to chat tab
      activateTab('chat');
    });

    historyEl.appendChild(item);
  }
}

function formatTimeAgo(timestamp: number): string {
  const delta = Date.now() - timestamp;
  const minutes = Math.floor(delta / 60000);
  const hours = Math.floor(delta / 3600000);
  const days = Math.floor(delta / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ─── Tab Switching ────────────────────────────────────────────────────────────

function activateTab(tab: 'chat' | 'history'): void {
  if (activeTab === tab) return;
  activeTab = tab;

  document.querySelectorAll('.sp-tab').forEach(t => {
    t.classList.toggle('active', (t as HTMLElement).dataset['tab'] === tab);
  });

  document.querySelectorAll('.sp-tab-content').forEach(c => {
    c.classList.toggle('active', c.id === `tab-${tab}`);
  });

  if (tab === 'history') {
    historyEl.classList.add('visible');
    loadHistoryTab().catch(console.error);
  } else {
    historyEl.classList.remove('visible');
  }
}

// ─── Message Listener (from background/content) ───────────────────────────────

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const msg = message as {
    type: string;
    action?: string;
    selectedText?: string;
    guardianId?: string;
    source?: string;
  };

  switch (msg.type) {
    case 'content-action':
    case 'context-menu-action': {
      const action = msg.action ?? '';
      const selectedText = msg.selectedText ?? '';

      if (msg.guardianId && msg.guardianId !== activeGuardian.id) {
        switchGuardian(msg.guardianId).then(() => {
          handleActionWithText(action, selectedText).catch(console.error);
        }).catch(console.error);
      } else {
        handleActionWithText(action, selectedText).catch(console.error);
      }

      sendResponse({ success: true });
      break;
    }

    case 'tab-changed': {
      // Clear page context cache when tab changes
      pageContextCache = null;
      sendResponse({ success: true });
      break;
    }
  }

  return false;
});

async function handleActionWithText(action: string, selectedText: string): Promise<void> {
  // Switch to chat tab
  activateTab('chat');

  if (action === 'ask' && selectedText) {
    inputEl.value = selectedText;
    inputEl.focus();
    return;
  }

  if (action === 'improve' && selectedText) {
    await sendMessage(`Please improve the following text, making it clearer, more professional, and more impactful:\n\n"${selectedText}"`);
    return;
  }

  if (action === 'explain' && selectedText) {
    await sendMessage(`Please explain the following:\n\n"${selectedText}"`);
    return;
  }

  if (action === 'translate' && selectedText) {
    await sendMessage(`Please translate the following text to English (or to Spanish if already in English):\n\n"${selectedText}"`);
    return;
  }

  // Generic actions
  await handleAction(action);
}

// ─── Check for Pending Messages ───────────────────────────────────────────────

async function checkPendingMessages(): Promise<void> {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'get-pending-messages' }) as {
      messages: Array<{ type: string; action?: string; selectedText?: string; guardianId?: string }>;
    };

    for (const msg of response.messages) {
      if (msg.action) {
        await handleActionWithText(msg.action, msg.selectedText ?? '');
      }
    }
  } catch (err) {
    // No pending messages or background not ready
    console.debug('No pending messages:', err);
  }
}

// ─── Input Handling ───────────────────────────────────────────────────────────

function setupInput(): void {
  // Auto-resize textarea
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = `${Math.min(inputEl.scrollHeight, 120)}px`;

    const len = inputEl.value.length;
    charCount.textContent = len > 0 ? `${len}` : '';
  });

  // Send on Enter (not Shift+Enter)
  inputEl.addEventListener('keydown', async e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (text) {
        inputEl.value = '';
        inputEl.style.height = 'auto';
        charCount.textContent = '';
        await sendMessage(text);
      }
    }
  });

  sendBtn.addEventListener('click', async () => {
    const text = inputEl.value.trim();
    if (text) {
      inputEl.value = '';
      inputEl.style.height = 'auto';
      charCount.textContent = '';
      await sendMessage(text);
    }
  });
}

// ─── Context Toggle ───────────────────────────────────────────────────────────

function setupContextToggle(): void {
  contextToggle.addEventListener('click', async () => {
    includePageContext = !includePageContext;
    pageContextCache = null; // Clear cache on toggle

    contextToggle.classList.toggle('active', includePageContext);
    contextLabel.textContent = includePageContext ? 'Page context on' : 'Page context off';

    contextBtn.classList.toggle('active', includePageContext);

    await setSettings({ includePageContext });
  });

  contextBtn.addEventListener('click', () => {
    contextToggle.click();
  });
}

// ─── Clear Conversation ───────────────────────────────────────────────────────

function setupClear(): void {
  clearBtn.addEventListener('click', async () => {
    if (conversationHistory.length === 0) return;

    await clearConversationHistory(activeGuardian.id);
    conversationHistory = [];

    // Reset display
    messagesEl.innerHTML = '';
    messagesEl.appendChild(welcomeEl);
    showWelcome();
  });
}

// ─── Action Pills ─────────────────────────────────────────────────────────────

function setupActionPills(): void {
  document.querySelectorAll<HTMLButtonElement>('.sp-action-pill').forEach(pill => {
    pill.addEventListener('click', async () => {
      const action = pill.dataset['action'] ?? '';
      await handleAction(action);
    });
  });
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function setupTabs(): void {
  document.querySelectorAll<HTMLButtonElement>('.sp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = (tab.dataset['tab'] ?? 'chat') as 'chat' | 'history';
      activateTab(tabName);
    });
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init(): Promise<void> {
  const settings = await getSettings();
  activeProvider = settings.activeProvider;
  includePageContext = settings.includePageContext;

  const guardian = getGuardianById(settings.defaultGuardianId) ?? GUARDIANS[5];
  updateGuardianDisplay(guardian);
  buildGuardianSelector();

  // Sync context toggle display
  contextToggle.classList.toggle('active', includePageContext);
  contextBtn.classList.toggle('active', includePageContext);
  contextLabel.textContent = includePageContext ? 'Page context on' : 'Page context off';

  await loadConversationHistory();

  setupInput();
  setupContextToggle();
  setupClear();
  setupActionPills();
  setupTabs();

  // Check for pending actions from context menu
  await checkPendingMessages();

  // Focus input
  inputEl.focus();
}

init().catch(console.error);
