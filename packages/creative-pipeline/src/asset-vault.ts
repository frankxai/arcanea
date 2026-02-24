import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import type { Asset, AssetType, AssetQuery } from './types.js';

const MAX_ASSETS = 100000;

/**
 * AssetVault — In-memory asset storage and management system.
 * Provides CRUD, query, search, variation tracking, and event emission.
 */
export class AssetVault extends EventEmitter {
  private assets: Map<string, Asset> = new Map();

  // ─── CRUD ───────────────────────────────────────────────────────────────

  store(input: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Asset {
    if (this.assets.size >= MAX_ASSETS) {
      throw new Error(`Asset vault is full (max ${MAX_ASSETS} assets)`);
    }

    const now = new Date();
    const asset: Asset = {
      ...input,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.assets.set(asset.id, asset);
    this.emit('asset-stored', asset);
    return asset;
  }

  get(id: string): Asset | undefined {
    return this.assets.get(id);
  }

  update(id: string, updates: Partial<Omit<Asset, 'id' | 'createdAt'>>): Asset {
    const existing = this.assets.get(id);
    if (!existing) {
      throw new Error(`Asset not found: ${id}`);
    }

    const updated: Asset = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };

    this.assets.set(id, updated);
    this.emit('asset-updated', updated);
    return updated;
  }

  delete(id: string): void {
    const asset = this.assets.get(id);
    if (!asset) {
      throw new Error(`Asset not found: ${id}`);
    }
    this.assets.delete(id);
    this.emit('asset-deleted', asset);
  }

  // ─── Query ──────────────────────────────────────────────────────────────

  query(query: AssetQuery): Asset[] {
    let results: Asset[] = [];

    for (const asset of this.assets.values()) {
      if (query.type && asset.type !== query.type) continue;
      if (query.guardianId && asset.guardianId !== query.guardianId) continue;
      if (query.gate && asset.gate !== query.gate) continue;
      if (query.element && asset.element !== query.element) continue;
      if (query.tags && query.tags.length > 0) {
        const hasAllTags = query.tags.every((t) => asset.tags.includes(t));
        if (!hasAllTags) continue;
      }
      if (query.search) {
        const q = query.search.toLowerCase();
        const inName = asset.name.toLowerCase().includes(q);
        const inDesc = asset.description.toLowerCase().includes(q);
        const inTags = asset.tags.some((t) => t.toLowerCase().includes(q));
        if (!inName && !inDesc && !inTags) continue;
      }
      results.push(asset);
    }

    // Sort
    if (query.orderBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (query.orderBy === 'updated') {
      results.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    } else {
      // default: created desc
      results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // Pagination
    const offset = query.offset ?? 0;
    const limit = query.limit ?? results.length;
    results = results.slice(offset, offset + limit);

    return results;
  }

  getByGuardian(guardianId: string, type?: AssetType): Asset[] {
    return this.query({ guardianId, type });
  }

  getByElement(element: string, type?: AssetType): Asset[] {
    return this.query({ element, type });
  }

  getByTag(tag: string): Asset[] {
    return this.query({ tags: [tag] });
  }

  search(queryStr: string): Asset[] {
    return this.query({ search: queryStr });
  }

  // ─── Variations ─────────────────────────────────────────────────────────

  createVariation(parentId: string, overrides: Partial<Omit<Asset, 'id' | 'createdAt' | 'updatedAt' | 'parentId'>>): Asset {
    const parent = this.assets.get(parentId);
    if (!parent) {
      throw new Error(`Parent asset not found: ${parentId}`);
    }

    const now = new Date();
    const variation: Asset = {
      ...parent,
      ...overrides,
      id: randomUUID(),
      parentId,
      createdAt: now,
      updatedAt: now,
      name: overrides.name ?? `${parent.name} (variation)`,
    };

    if (this.assets.size >= MAX_ASSETS) {
      throw new Error(`Asset vault is full (max ${MAX_ASSETS} assets)`);
    }

    this.assets.set(variation.id, variation);
    this.emit('variation-created', variation);
    return variation;
  }

  getVariations(assetId: string): Asset[] {
    const results: Asset[] = [];
    for (const asset of this.assets.values()) {
      if (asset.parentId === assetId) {
        results.push(asset);
      }
    }
    return results;
  }

  // ─── Export ─────────────────────────────────────────────────────────────

  export(id: string): { asset: Asset; metadata: Record<string, unknown> } {
    const asset = this.assets.get(id);
    if (!asset) {
      throw new Error(`Asset not found: ${id}`);
    }

    return {
      asset: { ...asset },
      metadata: {
        exportedAt: new Date().toISOString(),
        hasParent: !!asset.parentId,
        variationCount: this.getVariations(id).length,
        tags: [...asset.tags],
      },
    };
  }

  // ─── Stats ──────────────────────────────────────────────────────────────

  getStats(): {
    total: number;
    byType: Record<string, number>;
    byGuardian: Record<string, number>;
    byElement: Record<string, number>;
  } {
    const byType: Record<string, number> = {};
    const byGuardian: Record<string, number> = {};
    const byElement: Record<string, number> = {};

    for (const asset of this.assets.values()) {
      byType[asset.type] = (byType[asset.type] ?? 0) + 1;
      if (asset.guardianId) {
        byGuardian[asset.guardianId] = (byGuardian[asset.guardianId] ?? 0) + 1;
      }
      if (asset.element) {
        byElement[asset.element] = (byElement[asset.element] ?? 0) + 1;
      }
    }

    return {
      total: this.assets.size,
      byType,
      byGuardian,
      byElement,
    };
  }
}
