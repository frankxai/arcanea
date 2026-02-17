import { GUARDIANS } from './guardians.js';
import {
  getApiKeys,
  setApiKeys,
  getSettings,
  setSettings,
  clearAllData,
  exportData,
  importData,
  clearConversationHistory,
  type ApiKeys,
} from './utils/storage.js';
import type { Provider } from './ai-service.js';

// ─── State ────────────────────────────────────────────────────────────────────

let currentSettings = await getSettings();
let currentKeys = await getApiKeys();
let selectedGuardianId = currentSettings.defaultGuardianId;
let selectedProvider: Provider = currentSettings.activeProvider;

// ─── Toast ────────────────────────────────────────────────────────────────────

function showToast(message: string, isError = false): void {
  const toast = document.getElementById('toast') as HTMLElement;
  toast.textContent = message;
  toast.className = `toast${isError ? ' error' : ''}`;

  // Ensure visible
  requestAnimationFrame(() => {
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  });
}

// ─── API Key Sections ─────────────────────────────────────────────────────────

interface KeySection {
  provider: keyof ApiKeys;
  inputId: string;
  statusId: string;
  toggleId: string;
  saveId: string;
}

const KEY_SECTIONS: KeySection[] = [
  {
    provider: 'anthropic',
    inputId: 'anthropic-key',
    statusId: 'anthropic-status',
    toggleId: 'anthropic-toggle-visible',
    saveId: 'anthropic-save',
  },
  {
    provider: 'google',
    inputId: 'google-key',
    statusId: 'google-status',
    toggleId: 'google-toggle-visible',
    saveId: 'google-save',
  },
  {
    provider: 'openai',
    inputId: 'openai-key',
    statusId: 'openai-status',
    toggleId: 'openai-toggle-visible',
    saveId: 'openai-save',
  },
];

function updateKeyStatus(section: KeySection, hasKey: boolean): void {
  const statusEl = document.getElementById(section.statusId) as HTMLElement;
  statusEl.textContent = hasKey ? 'Set ✓' : 'Not set';
  statusEl.className = `key-status ${hasKey ? 'set' : 'unset'}`;
}

function maskKey(key: string): string {
  if (key.length <= 8) return '•'.repeat(key.length);
  return key.slice(0, 4) + '•'.repeat(Math.min(key.length - 8, 20)) + key.slice(-4);
}

function setupKeySection(section: KeySection): void {
  const input = document.getElementById(section.inputId) as HTMLInputElement;
  const toggleBtn = document.getElementById(section.toggleId) as HTMLButtonElement;
  const saveBtn = document.getElementById(section.saveId) as HTMLButtonElement;

  const existingKey = currentKeys[section.provider] ?? '';

  // Show masked version if key exists
  if (existingKey) {
    input.value = maskKey(existingKey);
    input.type = 'password';
    updateKeyStatus(section, true);
  }

  // Reveal/hide toggle
  let isVisible = false;
  let isEditing = false;

  input.addEventListener('focus', () => {
    if (!isEditing && existingKey) {
      // Clear mask on focus for editing
      input.value = '';
      input.type = 'text';
      isEditing = true;
    }
  });

  input.addEventListener('blur', () => {
    if (isEditing && !input.value && existingKey) {
      // Restore mask if no new value entered
      input.value = maskKey(existingKey);
      input.type = 'password';
      isEditing = false;
    }
  });

  toggleBtn.addEventListener('click', () => {
    isVisible = !isVisible;
    if (isEditing) {
      input.type = isVisible ? 'text' : 'password';
    } else {
      input.type = isVisible ? 'text' : 'password';
      if (isVisible && existingKey) {
        input.value = existingKey;
      } else if (!isVisible && existingKey) {
        input.value = maskKey(existingKey);
      }
    }
    toggleBtn.textContent = isVisible ? 'Hide' : 'Show';
  });

  saveBtn.addEventListener('click', async () => {
    const rawValue = input.value.trim();

    // Don't save if it's still the masked version
    if (rawValue.includes('•')) {
      showToast('No changes to save');
      return;
    }

    if (!rawValue) {
      // Clear the key
      const updated = { ...currentKeys };
      delete updated[section.provider];
      await setApiKeys(updated);
      currentKeys = updated;
      updateKeyStatus(section, false);
      input.value = '';
      isEditing = false;
      showToast(`${section.provider} API key cleared`);
      return;
    }

    // Validate basic format
    if (!validateApiKey(section.provider, rawValue)) {
      showToast(`Invalid ${section.provider} API key format`, true);
      return;
    }

    const updated = { ...currentKeys, [section.provider]: rawValue };
    await setApiKeys(updated);
    currentKeys = updated;
    updateKeyStatus(section, true);

    // Reset display
    input.value = maskKey(rawValue);
    input.type = 'password';
    isEditing = false;
    isVisible = false;
    toggleBtn.textContent = 'Show';

    showToast(`${section.provider} API key saved`);
  });
}

function validateApiKey(provider: keyof ApiKeys, key: string): boolean {
  switch (provider) {
    case 'anthropic':
      return key.startsWith('sk-ant-') || key.startsWith('sk-ant-api');
    case 'google':
      return key.startsWith('AIza') && key.length > 20;
    case 'openai':
      return key.startsWith('sk-') && key.length > 20;
    default:
      return key.length > 10;
  }
}

// ─── Provider Select ──────────────────────────────────────────────────────────

function setupProviderSelect(): void {
  const select = document.getElementById('provider-select') as HTMLSelectElement;
  select.value = selectedProvider;

  select.addEventListener('change', async () => {
    selectedProvider = select.value as Provider;
    await setSettings({ activeProvider: selectedProvider });
    showToast(`Default provider set to ${selectedProvider}`);
  });
}

// ─── Guardian Options Grid ────────────────────────────────────────────────────

function buildGuardianOptionsGrid(): void {
  const grid = document.getElementById('guardian-options-grid') as HTMLElement;
  grid.innerHTML = '';

  GUARDIANS.forEach(guardian => {
    const option = document.createElement('div');
    option.className = `guardian-option${guardian.id === selectedGuardianId ? ' selected' : ''}`;
    option.style.setProperty('--option-color', guardian.color);
    option.dataset['guardianId'] = guardian.id;

    option.innerHTML = `
      <span class="guardian-option-emoji">${guardian.avatar}</span>
      <div class="guardian-option-info">
        <div class="guardian-option-name">${guardian.name}</div>
        <div class="guardian-option-gate">${guardian.gate}</div>
      </div>
    `;

    option.addEventListener('click', async () => {
      selectedGuardianId = guardian.id;

      // Update all options
      document.querySelectorAll<HTMLElement>('.guardian-option').forEach(el => {
        el.classList.toggle('selected', el.dataset['guardianId'] === guardian.id);
      });

      await setSettings({ defaultGuardianId: guardian.id });
      showToast(`Default Guardian set to ${guardian.name}`);
    });

    grid.appendChild(option);
  });
}

// ─── Toggle Settings ──────────────────────────────────────────────────────────

function setupToggles(): void {
  const toggles: Array<{
    id: string;
    setting: keyof Parameters<typeof setSettings>[0];
    defaultValue: boolean;
  }> = [
    { id: 'toggle-floating-btn', setting: 'enableFloatingButton', defaultValue: true },
    { id: 'toggle-page-context', setting: 'includePageContext', defaultValue: true },
    { id: 'toggle-shortcuts', setting: 'keyboardShortcuts', defaultValue: true },
  ];

  toggles.forEach(({ id, setting, defaultValue }) => {
    const toggle = document.getElementById(id) as HTMLInputElement;

    // Set initial state
    const value = currentSettings[setting as keyof typeof currentSettings];
    toggle.checked = typeof value === 'boolean' ? value : defaultValue;

    toggle.addEventListener('change', async () => {
      await setSettings({ [setting]: toggle.checked });
      showToast(`Setting updated`);
    });
  });
}

// ─── Data Management ──────────────────────────────────────────────────────────

function setupDataManagement(): void {
  const exportBtn = document.getElementById('btn-export') as HTMLButtonElement;
  const importBtn = document.getElementById('btn-import') as HTMLButtonElement;
  const importFile = document.getElementById('import-file') as HTMLInputElement;
  const clearHistoryBtn = document.getElementById('btn-clear-history') as HTMLButtonElement;
  const clearAllBtn = document.getElementById('btn-clear-all') as HTMLButtonElement;

  exportBtn.addEventListener('click', async () => {
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `arcanea-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Data exported successfully');
    } catch (err) {
      showToast('Export failed', true);
    }
  });

  importBtn.addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', async () => {
    const file = importFile.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await importData(text);
      showToast('Data imported successfully. Reload to apply.');
    } catch (err) {
      showToast('Import failed — invalid file format', true);
    }

    importFile.value = '';
  });

  clearHistoryBtn.addEventListener('click', async () => {
    if (!confirm('Clear all conversation history? This cannot be undone.')) return;

    try {
      for (const guardian of GUARDIANS) {
        await clearConversationHistory(guardian.id);
      }
      showToast('Conversation history cleared');
    } catch (err) {
      showToast('Failed to clear history', true);
    }
  });

  clearAllBtn.addEventListener('click', async () => {
    if (!confirm('Clear ALL Arcanea data including API keys and settings? This cannot be undone.')) return;
    if (!confirm('Are you sure? All API keys will be deleted.')) return;

    try {
      await clearAllData();
      showToast('All data cleared. Reload to reset settings.');
    } catch (err) {
      showToast('Failed to clear data', true);
    }
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init(): Promise<void> {
  // Set up key sections
  KEY_SECTIONS.forEach(section => {
    updateKeyStatus(section, !!currentKeys[section.provider]);
    setupKeySection(section);
  });

  setupProviderSelect();
  buildGuardianOptionsGrid();
  setupToggles();
  setupDataManagement();
}

init().catch(console.error);
