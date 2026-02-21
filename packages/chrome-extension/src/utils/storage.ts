export interface ApiKeys {
  anthropic?: string;
  google?: string;
  openai?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  guardianId: string;
}

export interface ConversationHistory {
  guardianId: string;
  messages: Message[];
  lastUpdated: number;
}

export interface Settings {
  defaultGuardianId: string;
  activeProvider: 'anthropic' | 'google' | 'openai';
  theme: 'dark' | 'light';
  includePageContext: boolean;
  enableFloatingButton: boolean;
  keyboardShortcuts: boolean;
  maxHistoryPerGuardian: number;
}

export interface StorageSchema {
  apiKeys: ApiKeys;
  settings: Settings;
  conversations: Record<string, ConversationHistory>;
  recentGuardians: string[];
}

const DEFAULT_SETTINGS: Settings = {
  defaultGuardianId: 'lyria',
  activeProvider: 'anthropic',
  theme: 'dark',
  includePageContext: true,
  enableFloatingButton: true,
  keyboardShortcuts: true,
  maxHistoryPerGuardian: 100,
};

const DEFAULT_STORAGE: StorageSchema = {
  apiKeys: {},
  settings: DEFAULT_SETTINGS,
  conversations: {},
  recentGuardians: ['lyria', 'draconia', 'leyla'],
};

export async function getStorage<K extends keyof StorageSchema>(
  key: K
): Promise<StorageSchema[K]> {
  return new Promise(resolve => {
    chrome.storage.local.get(key as string, result => {
      if (chrome.runtime.lastError) {
        console.error('Storage get error:', chrome.runtime.lastError);
        resolve(DEFAULT_STORAGE[key]);
        return;
      }
      resolve((result[key as string] as StorageSchema[K]) ?? DEFAULT_STORAGE[key]);
    });
  });
}

export async function setStorage<K extends keyof StorageSchema>(
  key: K,
  value: StorageSchema[K]
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key as string]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
}

export async function getApiKeys(): Promise<ApiKeys> {
  return getStorage('apiKeys');
}

export async function setApiKeys(keys: ApiKeys): Promise<void> {
  return setStorage('apiKeys', keys);
}

export async function getSettings(): Promise<Settings> {
  const stored = await getStorage('settings');
  return { ...DEFAULT_SETTINGS, ...stored };
}

export async function setSettings(settings: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  return setStorage('settings', { ...current, ...settings });
}

export async function getConversationHistory(
  guardianId: string
): Promise<ConversationHistory> {
  const all = await getStorage('conversations');
  return (
    all[guardianId] ?? {
      guardianId,
      messages: [],
      lastUpdated: Date.now(),
    }
  );
}

export async function addMessage(
  guardianId: string,
  message: Omit<Message, 'id' | 'timestamp' | 'guardianId'>
): Promise<Message> {
  const settings = await getSettings();
  const history = await getConversationHistory(guardianId);
  const all = await getStorage('conversations');

  const newMessage: Message = {
    ...message,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
    guardianId,
  };

  const messages = [...history.messages, newMessage];

  // Trim to max
  const trimmed =
    messages.length > settings.maxHistoryPerGuardian
      ? messages.slice(messages.length - settings.maxHistoryPerGuardian)
      : messages;

  await setStorage('conversations', {
    ...all,
    [guardianId]: {
      guardianId,
      messages: trimmed,
      lastUpdated: Date.now(),
    },
  });

  return newMessage;
}

export async function clearConversationHistory(guardianId: string): Promise<void> {
  const all = await getStorage('conversations');
  const updated = { ...all };
  delete updated[guardianId];
  await setStorage('conversations', updated);
}

export async function clearAllData(): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.clear(() => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
}

export async function getRecentGuardians(): Promise<string[]> {
  return getStorage('recentGuardians');
}

export async function updateRecentGuardians(guardianId: string): Promise<void> {
  const recent = await getRecentGuardians();
  const filtered = recent.filter(id => id !== guardianId);
  const updated = [guardianId, ...filtered].slice(0, 5);
  await setStorage('recentGuardians', updated);
}

export async function exportData(): Promise<string> {
  const data = await new Promise<Record<string, unknown>>(resolve => {
    chrome.storage.local.get(null, resolve);
  });
  return JSON.stringify(data, null, 2);
}

const ALLOWED_STORAGE_KEYS: Set<keyof StorageSchema> = new Set([
  'apiKeys',
  'settings',
  'conversations',
  'recentGuardians',
]);

export async function importData(jsonString: string): Promise<void> {
  let raw: unknown;
  try {
    raw = JSON.parse(jsonString);
  } catch {
    throw new Error('Invalid JSON format');
  }

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new Error('Import data must be a JSON object');
  }

  // Only allow known storage keys to prevent overwriting unexpected data
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (ALLOWED_STORAGE_KEYS.has(key as keyof StorageSchema)) {
      data[key] = value;
    }
  }

  if (Object.keys(data).length === 0) {
    throw new Error('No valid Arcanea data found in import file');
  }

  return new Promise((resolve, reject) => {
    chrome.storage.local.set(data, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
}
