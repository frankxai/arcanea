import { GUARDIANS, getGuardianById, type Guardian } from './guardians.js';
import {
  getSettings,
  setSettings,
  getConversationHistory,
  getRecentGuardians,
  updateRecentGuardians,
} from './utils/storage.js';
import { getProviderModel, type Provider } from './ai-service.js';

// ─── State ────────────────────────────────────────────────────────────────────

let activeGuardian: Guardian = GUARDIANS[5]; // Lyria
let activeProvider: Provider = 'anthropic';

// ─── DOM Elements ─────────────────────────────────────────────────────────────

const guardianPanel = document.getElementById('guardian-panel') as HTMLElement;
const guardianAvatar = document.getElementById('guardian-avatar') as HTMLElement;
const guardianName = document.getElementById('guardian-name') as HTMLElement;
const guardianMeta = document.getElementById('guardian-meta') as HTMLElement;
const guardianDesc = document.getElementById('guardian-desc') as HTMLElement;
const guardianGrid = document.getElementById('guardian-grid') as HTMLElement;
const recentList = document.getElementById('recent-list') as HTMLElement;
const providerToggle = document.getElementById('provider-toggle') as HTMLButtonElement;
const providerLabel = document.getElementById('provider-label') as HTMLElement;
const modelBadge = document.getElementById('model-badge') as HTMLElement;
const openSidepanelBtn = document.getElementById('open-sidepanel-btn') as HTMLButtonElement;

// ─── Guardian Display ─────────────────────────────────────────────────────────

function updateGuardianDisplay(guardian: Guardian): void {
  activeGuardian = guardian;

  guardianAvatar.textContent = guardian.avatar;
  guardianName.textContent = guardian.name;
  guardianMeta.textContent = `Gate of ${guardian.gate} • ${guardian.element} • ${guardian.frequency} Hz`;
  guardianDesc.textContent = guardian.shortDescription + ' — ' + guardian.domain.slice(0, 3).join(', ');

  // Apply guardian color
  guardianPanel.style.setProperty('--guardian-color', guardian.color);
  guardianPanel.style.setProperty('--guardian-color-bg', `${guardian.color}22`);
  guardianAvatar.style.setProperty('--guardian-color', guardian.color);
  guardianAvatar.style.borderColor = guardian.color;
  guardianAvatar.style.background = `${guardian.color}18`;

  // Update active chip in grid
  document.querySelectorAll<HTMLElement>('.guardian-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset['guardianId'] === guardian.id);
    if (chip.dataset['guardianId'] === guardian.id) {
      chip.style.setProperty('--chip-color', guardian.color);
    }
  });
}

// ─── Guardian Grid ────────────────────────────────────────────────────────────

function buildGuardianGrid(): void {
  guardianGrid.innerHTML = '';

  GUARDIANS.forEach(guardian => {
    const chip = document.createElement('button');
    chip.className = 'guardian-chip';
    chip.dataset['guardianId'] = guardian.id;
    chip.title = `${guardian.name} — ${guardian.shortDescription}`;
    chip.textContent = guardian.avatar;
    chip.style.setProperty('--chip-color', guardian.color);

    if (guardian.id === activeGuardian.id) {
      chip.classList.add('active');
    }

    chip.addEventListener('click', async () => {
      updateGuardianDisplay(guardian);
      await setSettings({ defaultGuardianId: guardian.id });
      await updateRecentGuardians(guardian.id);
    });

    guardianGrid.appendChild(chip);
  });
}

// ─── Recent Conversations ─────────────────────────────────────────────────────

async function loadRecentConversations(): Promise<void> {
  const recentGuardianIds = await getRecentGuardians();

  if (recentGuardianIds.length === 0) {
    recentList.innerHTML = '<div class="empty-state">No recent conversations</div>';
    return;
  }

  recentList.innerHTML = '';

  for (const guardianId of recentGuardianIds.slice(0, 3)) {
    const guardian = getGuardianById(guardianId);
    if (!guardian) continue;

    const history = await getConversationHistory(guardianId);
    const lastMessage = history.messages[history.messages.length - 1];

    const item = document.createElement('div');
    item.className = 'recent-item';
    item.innerHTML = `
      <span class="recent-avatar">${guardian.avatar}</span>
      <div class="recent-content">
        <div class="recent-text">${lastMessage ? escapeHtml(lastMessage.content.slice(0, 60)) + (lastMessage.content.length > 60 ? '…' : '') : guardian.shortDescription}</div>
        <div class="recent-meta">${guardian.name} • ${lastMessage ? formatTimeAgo(lastMessage.timestamp) : 'Start a conversation'}</div>
      </div>
    `;

    item.addEventListener('click', async () => {
      updateGuardianDisplay(guardian);
      await setSettings({ defaultGuardianId: guardianId });
      // Open side panel
      await chrome.runtime.sendMessage({ type: 'open-sidepanel' });
      window.close();
    });

    recentList.appendChild(item);
  }
}

// ─── Provider Cycling ─────────────────────────────────────────────────────────

const PROVIDERS: Provider[] = ['anthropic', 'google', 'openai'];

async function cycleProvider(): Promise<void> {
  const currentIndex = PROVIDERS.indexOf(activeProvider);
  const nextProvider = PROVIDERS[(currentIndex + 1) % PROVIDERS.length] as Provider;
  activeProvider = nextProvider;

  await setSettings({ activeProvider: nextProvider });
  updateProviderDisplay();
}

function updateProviderDisplay(): void {
  const shortNames: Record<Provider, string> = {
    anthropic: 'Claude',
    google: 'Gemini',
    openai: 'GPT-4o',
  };
  providerLabel.textContent = shortNames[activeProvider];
  modelBadge.textContent = getProviderModel(activeProvider);
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

function setupQuickActions(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const action = btn.dataset['action'] ?? '';

      // Get current tab context
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const tabId = tab?.id;

      let selectedText = '';
      if (tabId) {
        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId },
            func: () => window.getSelection()?.toString() ?? '',
          });
          selectedText = results[0]?.result as string ?? '';
        } catch {
          // Selection retrieval failed — that's fine
        }
      }

      // Open side panel and trigger action
      try {
        if (tabId) {
          await chrome.sidePanel.open({ tabId });
        }
        await chrome.runtime.sendMessage({
          type: 'content-action',
          action,
          selectedText,
          source: 'popup',
        });
      } catch (err) {
        console.error('Action failed:', err);
      }

      window.close();
    });
  });
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init(): Promise<void> {
  const settings = await getSettings();
  activeProvider = settings.activeProvider;

  const guardian = getGuardianById(settings.defaultGuardianId) ?? GUARDIANS[5];
  updateGuardianDisplay(guardian);
  buildGuardianGrid();

  await loadRecentConversations();
  updateProviderDisplay();
  setupQuickActions();

  // Open side panel button
  openSidepanelBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.sidePanel.open({ tabId: tab.id });
    }
    window.close();
  });

  // Provider toggle
  providerToggle.addEventListener('click', cycleProvider);

  // Settings link — ensure it opens correctly
  const settingsLink = document.getElementById('settings-link') as HTMLAnchorElement;
  settingsLink.addEventListener('click', e => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
    window.close();
  });
}

init().catch(console.error);
