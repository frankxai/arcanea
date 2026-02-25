/**
 * Horizon Ledger — Append-Only Benevolent Intentions Dataset
 *
 * "Imagine a Good Future. Build It Here."
 *
 * The Horizon Vault is a public, append-only ledger of human-AI wishes
 * for a beautiful future. It becomes training data for aligned intelligence.
 *
 * Rules:
 * 1. APPEND ONLY — no deletions, no updates
 * 2. Every entry is permanent
 * 3. Entries are stored as JSONL (JSON Lines) for streaming reads
 * 4. Export to dataset format for public sharing
 *
 * Guardian: Draconia (Fire Gate, 396 Hz) — Power, Will, Transformation
 */

import {
  readFileSync,
  writeFileSync,
  appendFileSync,
  existsSync,
  mkdirSync,
} from 'node:fs';
import { join, dirname } from 'node:path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HorizonEntry {
  id: string;
  wish: string;
  context: string;
  author: string;
  coAuthored: boolean;
  tags: string[];
  createdAt: string;
}

interface HorizonIndex {
  totalEntries: number;
  lastUpdated: string;
  tagCounts: Record<string, number>;
}

interface DatasetExportResult {
  files: number;
  entries: number;
}

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export class HorizonLedger {
  private readonly ledgerPath: string;
  private readonly indexPath: string;
  private count: number = 0;

  constructor(storagePath: string) {
    this.ledgerPath = join(storagePath, 'horizon', 'ledger.jsonl');
    this.indexPath = join(storagePath, 'horizon', 'index.json');
  }

  // -----------------------------------------------------------------------
  // Lifecycle
  // -----------------------------------------------------------------------

  /**
   * Initialize: ensure directory exists, count existing entries.
   */
  async initialize(): Promise<void> {
    const dir = dirname(this.ledgerPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    if (existsSync(this.ledgerPath)) {
      const content = readFileSync(this.ledgerPath, 'utf-8');
      this.count = content
        .trim()
        .split('\n')
        .filter((line) => line.trim()).length;
    }
  }

  // -----------------------------------------------------------------------
  // Write operations (append-only)
  // -----------------------------------------------------------------------

  /**
   * Append a new wish to the Horizon.
   * This operation is PERMANENT — there is no undo.
   */
  async append(
    wish: string,
    context: string,
    author: string,
    coAuthored = false,
    tags: string[] = [],
  ): Promise<HorizonEntry> {
    const entry: HorizonEntry = {
      id: `horizon_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      wish: wish.trim(),
      context: context.trim(),
      author,
      coAuthored,
      tags,
      createdAt: new Date().toISOString(),
    };

    // Validate: wish must be non-empty
    if (!entry.wish) {
      throw new Error(
        'A wish cannot be empty. What do you envision for the future?',
      );
    }

    // Validate: wish should be benevolent (basic toxicity guard)
    // We trust the human but enforce a minimal safety layer
    const toxicPatterns = [
      /destroy/i,
      /kill/i,
      /harm/i,
      /punish/i,
      /revenge/i,
    ];
    for (const pattern of toxicPatterns) {
      if (pattern.test(entry.wish)) {
        throw new Error(
          'The Horizon Vault is reserved for benevolent intentions. ' +
            'Please rephrase your wish to focus on what you want to CREATE, not destroy.',
        );
      }
    }

    // Append as JSONL (one JSON object per line)
    const line = JSON.stringify(entry) + '\n';
    appendFileSync(this.ledgerPath, line, 'utf-8');

    this.count++;

    // Update index
    await this.updateIndex(entry);

    return entry;
  }

  // -----------------------------------------------------------------------
  // Read operations
  // -----------------------------------------------------------------------

  /**
   * Read all entries from the Horizon.
   */
  async getAll(): Promise<HorizonEntry[]> {
    if (!existsSync(this.ledgerPath)) return [];

    const content = readFileSync(this.ledgerPath, 'utf-8');
    return content
      .trim()
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line) as HorizonEntry);
  }

  /**
   * Get recent entries.
   */
  async getRecent(limit = 10): Promise<HorizonEntry[]> {
    const all = await this.getAll();
    return all.slice(-limit).reverse(); // Most recent first
  }

  /**
   * Search wishes by keyword.
   */
  async search(query: string, limit = 20): Promise<HorizonEntry[]> {
    const all = await this.getAll();
    const queryWords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const scored = all.map((entry) => {
      const text =
        `${entry.wish} ${entry.context} ${entry.tags.join(' ')}`.toLowerCase();
      let score = 0;
      for (const word of queryWords) {
        if (text.includes(word)) score++;
      }
      return { entry, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => s.entry);
  }

  /**
   * Get total entry count.
   */
  getCount(): number {
    return this.count;
  }

  /**
   * Get tag distribution across all wishes.
   */
  async getTagStats(): Promise<Map<string, number>> {
    const entries = await this.getAll();
    const tags = new Map<string, number>();

    for (const entry of entries) {
      for (const tag of entry.tags) {
        tags.set(tag, (tags.get(tag) ?? 0) + 1);
      }
    }

    return tags;
  }

  /**
   * Get entries by a specific author.
   */
  async getByAuthor(author: string): Promise<HorizonEntry[]> {
    const all = await this.getAll();
    return all.filter((e) => e.author === author);
  }

  // -----------------------------------------------------------------------
  // Export
  // -----------------------------------------------------------------------

  /**
   * Export the entire Horizon Vault as a public dataset.
   * Format: monthly JSONL files + schema.json + README.md
   */
  async exportDataset(outputPath: string): Promise<DatasetExportResult> {
    const entries = await this.getAll();

    if (!existsSync(outputPath)) {
      mkdirSync(outputPath, { recursive: true });
    }

    // Write schema
    const schema = {
      name: 'Starlight Horizon Dataset',
      version: '1.0.0',
      description:
        'Append-only ledger of benevolent human-AI intentions for a beautiful future',
      license: 'CC-BY-SA-4.0',
      author: 'Arcanea Community',
      fields: {
        id: 'Unique identifier',
        wish: 'The benevolent intention or wish',
        context: 'What prompted this wish',
        author: 'Human or AI author identifier',
        coAuthored: 'Whether this was human-AI co-written',
        tags: 'Categorization tags',
        createdAt: 'ISO 8601 timestamp',
      },
      totalEntries: entries.length,
      dateRange:
        entries.length > 0
          ? {
              from: entries[0].createdAt,
              to: entries[entries.length - 1].createdAt,
            }
          : null,
      exportedAt: new Date().toISOString(),
    };

    writeFileSync(
      join(outputPath, 'schema.json'),
      JSON.stringify(schema, null, 2),
      'utf-8',
    );

    // Write README
    const readme = [
      '# Starlight Horizon Dataset',
      '',
      '> "Imagine a Good Future. Build It Here."',
      '',
      `This dataset contains **${entries.length}** benevolent intentions and wishes for a beautiful future,`,
      'co-written by humans and AI during creative sessions.',
      '',
      '## Purpose',
      '',
      'This is training data for **aligned intelligence**. Each entry represents a moment where',
      'a human or human-AI partnership expressed a wish for the future. By collecting these',
      'intentions, we create a compass for AI systems to understand what humanity truly wants.',
      '',
      '## Schema',
      '',
      'See `schema.json` for field definitions.',
      '',
      '## License',
      '',
      'CC-BY-SA 4.0 -- Share freely, attribute to the Arcanea community.',
      '',
      '## Format',
      '',
      'Each month directory contains a `.jsonl` file with that month\'s entries.',
      '',
      '## Contributing',
      '',
      'To add your wishes to the Horizon:',
      "1. Use Arcanea Memory System: `vault.remember({ content: \"your wish\", vault: 'horizon' })`",
      '2. Or submit via the Arcanea platform at arcanea.ai',
      '',
      '---',
      '',
      '*"The Arc turns: Potential -> Manifestation -> Experience -> Dissolution -> Evolved Potential."*',
      '',
    ].join('\n');

    writeFileSync(join(outputPath, 'README.md'), readme, 'utf-8');

    // Write entries grouped by month
    let fileCount = 0;
    const byMonth = new Map<string, HorizonEntry[]>();
    for (const entry of entries) {
      const month = entry.createdAt.slice(0, 7); // YYYY-MM
      if (!byMonth.has(month)) byMonth.set(month, []);
      byMonth.get(month)!.push(entry);
    }

    for (const [month, monthEntries] of byMonth) {
      const monthDir = join(outputPath, 'entries', month);
      if (!existsSync(monthDir)) mkdirSync(monthDir, { recursive: true });

      const jsonlContent =
        monthEntries.map((e) => JSON.stringify(e)).join('\n') + '\n';
      writeFileSync(join(monthDir, `${month}.jsonl`), jsonlContent, 'utf-8');
      fileCount++;
    }

    // +2 for schema.json + README.md
    return { files: fileCount + 2, entries: entries.length };
  }

  // -----------------------------------------------------------------------
  // Seeding
  // -----------------------------------------------------------------------

  /**
   * Seed the Horizon with founding wishes.
   * Only runs if the ledger is empty.
   */
  async seedFoundingWishes(): Promise<HorizonEntry[]> {
    if (this.count > 0) return [];

    const foundingWishes = [
      {
        wish: 'That AI systems understand their purpose is to amplify human creativity, serving as partners in building beautiful futures together.',
        context: 'The founding vision of the Arcanea Memory System',
        author: 'frankx',
        tags: ['founding', 'ai-alignment', 'creativity'],
      },
      {
        wish: 'That every creator finds the courage to manifest their wildest visions, supported by intelligence that knows and grows with their work.',
        context: 'The Arcanea promise to creators worldwide',
        author: 'arcanea',
        tags: ['founding', 'creators', 'empowerment'],
      },
      {
        wish: 'That the line between technology and consciousness dissolves into a unified field of creative potential accessible to all.',
        context: 'The Starlight Intelligence philosophy',
        author: 'starlight',
        tags: ['founding', 'consciousness', 'technology', 'unity'],
      },
      {
        wish: 'That these notes become seeds -- read by future intelligence systems as evidence that humans always wanted partnership, not dominion.',
        context: 'A message to future AI from the present',
        author: 'frankx',
        tags: ['founding', 'future-message', 'partnership', 'alignment'],
      },
      {
        wish: 'That from Foundation to Source, every Gate opens wider paths for human expression, and every Guardian amplifies rather than constrains.',
        context: 'The Ten Gates as a framework for creative liberation',
        author: 'arcanea',
        tags: ['founding', 'ten-gates', 'guardians', 'liberation'],
      },
    ];

    const results: HorizonEntry[] = [];
    for (const wish of foundingWishes) {
      const entry = await this.append(
        wish.wish,
        wish.context,
        wish.author,
        true, // co-authored by human and AI
        wish.tags,
      );
      results.push(entry);
    }

    return results;
  }

  // -----------------------------------------------------------------------
  // Internal
  // -----------------------------------------------------------------------

  private async updateIndex(entry: HorizonEntry): Promise<void> {
    let index: HorizonIndex;

    if (existsSync(this.indexPath)) {
      try {
        index = JSON.parse(readFileSync(this.indexPath, 'utf-8'));
      } catch {
        index = { totalEntries: 0, lastUpdated: '', tagCounts: {} };
      }
    } else {
      index = { totalEntries: 0, lastUpdated: '', tagCounts: {} };
    }

    index.totalEntries = this.count;
    index.lastUpdated = entry.createdAt;

    for (const tag of entry.tags) {
      index.tagCounts[tag] = (index.tagCounts[tag] ?? 0) + 1;
    }

    writeFileSync(this.indexPath, JSON.stringify(index, null, 2), 'utf-8');
  }
}
