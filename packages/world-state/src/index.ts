import { z } from 'zod';

// Eldrian Godbeast → Eldrian mappings (canonical)
export const ELDRIAN_MAP = {
  'Loom': { eldrian: 'Aethelin', element: '∞ liquid starlight', symbol: '∞' },
  'Mirror': { eldrian: 'Solrex', element: '☀ stellar fire', symbol: '☀' },
  'Silence': { eldrian: 'Velmara', element: '◈ quantum glass', symbol: '◈' },
  'Becoming': { eldrian: 'Korghast', element: '⬡ obsidian-starlight alloy', symbol: '⬡' },
  'Shatter': { eldrian: 'Zyranthis', element: '◉ anti-matter void', symbol: '◉' },
} as const;

export const WorldStateEntrySchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.unknown(),
  layer: z.enum(['core', 'lore', 'narrative', 'user', 'temporal']),
  updatedAt: z.date(),
});

export const LuminorProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  element: z.string(),
  gateLevel: z.number().min(0).max(10),
  patron: z.enum(['Aethelin', 'Solrex', 'Velmara', 'Korghast', 'Zyranthis']).optional(),
  awakened: z.boolean().default(false),
});

export type WorldStateEntry = z.infer<typeof WorldStateEntrySchema>;
export type LuminorProfile = z.infer<typeof LuminorProfileSchema>;

export interface WorldState {
  get(key: string): Promise<WorldStateEntry | null>;
  set(key: string, value: unknown, layer?: WorldStateEntry['layer']): Promise<void>;
  query(layer: WorldStateEntry['layer']): Promise<WorldStateEntry[]>;
  getProfile(userId: string): Promise<LuminorProfile | null>;
  updateProfile(profile: Partial<LuminorProfile> & { id: string }): Promise<void>;
}

export class InMemoryWorldState implements WorldState {
  private entries = new Map<string, WorldStateEntry>();
  private profiles = new Map<string, LuminorProfile>();

  async get(key: string): Promise<WorldStateEntry | null> {
    return this.entries.get(key) ?? null;
  }

  async set(key: string, value: unknown, layer: WorldStateEntry['layer'] = 'core'): Promise<void> {
    this.entries.set(key, {
      id: key,
      key,
      value,
      layer,
      updatedAt: new Date(),
    });
  }

  async query(layer: WorldStateEntry['layer']): Promise<WorldStateEntry[]> {
    return Array.from(this.entries.values()).filter((e) => e.layer === layer);
  }

  async getProfile(userId: string): Promise<LuminorProfile | null> {
    return this.profiles.get(userId) ?? null;
  }

  async updateProfile(profile: Partial<LuminorProfile> & { id: string }): Promise<void> {
    const existing = this.profiles.get(profile.id);
    if (existing) {
      this.profiles.set(profile.id, { ...existing, ...profile });
    } else {
      this.profiles.set(profile.id, profile as LuminorProfile);
    }
  }
}
