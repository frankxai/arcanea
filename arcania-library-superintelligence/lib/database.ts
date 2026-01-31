import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export interface Asset {
  id: string;
  path: string;
  filename: string;
  size: number;
  type: string;
  format: string;
  dimensions?: { width: number; height: number };
  metadata: {
    created: Date;
    modified: Date;
    exif?: any;
  };
  analysis: {
    description?: string;
    tags: string[];
    guardian?: string;
    element?: string;
    mood?: string;
    style?: string;
    content?: string[];
    colors?: string[];
    composition?: string;
  };
  usage: {
    views: number;
    selects: number;
    copies: number;
    lastUsed?: Date;
    favorites: boolean;
  };
  relationships: {
    similar: string[];
    related: string[];
    series?: string;
    variants: string[];
  };
}

export class ArcaneaDB {
  private db: Database.Database | null = null;

  async initialize(dbPath: string = './arcania.db'): Promise<void> {
    this.db = new Database(dbPath);
    
    // Enable foreign keys
    this.run('PRAGMA foreign_keys = ON');
    
    // Create tables
    this.createTables();
  }

  private createTables(): void {
    const tables = [
      `CREATE TABLE IF NOT EXISTS assets (
        id TEXT PRIMARY KEY,
        path TEXT UNIQUE NOT NULL,
        filename TEXT NOT NULL,
        size INTEGER NOT NULL,
        type TEXT NOT NULL,
        format TEXT NOT NULL,
        dimensions TEXT,
        metadata TEXT NOT NULL,
        analysis TEXT NOT NULL,
        usage TEXT NOT NULL,
        relationships TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        category TEXT,
        color TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS asset_tags (
        asset_id TEXT,
        tag_id INTEGER,
        confidence REAL DEFAULT 1.0,
        FOREIGN KEY (asset_id) REFERENCES assets (id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
        PRIMARY KEY (asset_id, tag_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS embeddings (
        asset_id TEXT PRIMARY KEY,
        embedding TEXT NOT NULL,
        model_version TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (asset_id) REFERENCES assets (id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS usage_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_id TEXT,
        action TEXT NOT NULL,
        context TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (asset_id) REFERENCES assets (id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS guardian_entities (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        element TEXT NOT NULL,
        description TEXT,
        color TEXT,
        symbol TEXT,
        domains TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS search_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        query TEXT NOT NULL,
        results_count INTEGER,
        clicked_asset TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const table of tables) {
      this.run(table);
    }

    // Initialize Guardian entities
    this.initializeGuardians();
  }

  private initializeGuardians(): void {
    const guardians = [
      { id: 'draconia', name: 'Draconia', element: 'fire', description: 'Transformation & Bold Creation', color: '#f97316', symbol: '🔥', domains: 'creativity,transformation,courage' },
      { id: 'aethon', name: 'Aethon', element: 'fire', description: 'Velocity & Swift Execution', color: '#ef4444', symbol: '⚡', domains: 'speed,execution,momentum' },
      { id: 'leyla', name: 'Leyla', element: 'water', description: 'Emotional Intelligence & Storytelling', color: '#3b82f6', symbol: '💧', domains: 'emotion,storytelling,flow' },
      { id: 'maylinn', name: 'Maylinn', element: 'water', description: 'Nurturing & Organic Development', color: '#10b981', symbol: '🌱', domains: 'growth,nurturing,organic' },
      { id: 'lyssandria', name: 'Lyssandria', element: 'earth', description: 'Architecture & Systematic Creation', color: '#8b5cf6', symbol: '🏛️', domains: 'structure,architecture,systematic' },
      { id: 'kaelix', name: 'Kaelix', element: 'earth', description: 'Refinement & Technical Excellence', color: '#6366f1', symbol: '💎', domains: 'precision,refinement,technical' },
      { id: 'alera', name: 'Alera', element: 'wind', description: 'Voice & Creative Expression', color: '#06b6d4', symbol: '🌪️', domains: 'communication,expression,freedom' },
      { id: 'yumiko', name: 'Yumiko', element: 'wind', description: 'Clarity & Authentic Expression', color: '#14b8a6', symbol: '🎯', domains: 'clarity,authenticity,truth' },
      { id: 'elara', name: 'Elara', element: 'void', description: 'Innovation & Future-Sight', color: '#7c3aed', symbol: '🔮', domains: 'innovation,future,mystery' },
      { id: 'shinkami', name: 'Shinkami', element: 'void', description: 'Universal Creation & Enlightenment', color: '#4c1d95', symbol: '✨', domains: 'universal,creation,enlightenment' }
    ];

    const stmt = this.db!.prepare(
      `INSERT OR IGNORE INTO guardian_entities (id, name, element, description, color, symbol, domains) VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    
    for (const guardian of guardians) {
      stmt.run(guardian.id, guardian.name, guardian.element, guardian.description, guardian.color, guardian.symbol, guardian.domains);
    }
    
    stmt.finalize();
  }
  }

  run(sql: string, params: any[] = []): Database.RunResult {
    return this.db!.prepare(sql).run(...params);
  }

  get(sql: string, params: any[] = []): any {
    return this.db!.prepare(sql).get(...params);
  }

  all(sql: string, params: any[] = []): any[] {
    return this.db!.prepare(sql).all(...params);
  }

  insertAsset(asset: Asset): void {
    this.run(
      `INSERT OR REPLACE INTO assets 
       (id, path, filename, size, type, format, dimensions, metadata, analysis, usage, relationships) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        asset.id,
        asset.path,
        asset.filename,
        asset.size,
        asset.type,
        asset.format,
        JSON.stringify(asset.dimensions),
        JSON.stringify(asset.metadata),
        JSON.stringify(asset.analysis),
        JSON.stringify(asset.usage),
        JSON.stringify(asset.relationships)
      ]
    );

    // Insert tags
    const tagStmt = this.db!.prepare(`INSERT OR IGNORE INTO tags (name, category) VALUES (?, ?)`);
    const relationStmt = this.db!.prepare(`INSERT OR IGNORE INTO asset_tags (asset_id, tag_id) VALUES (?, ?)`);
    
    for (const tag of asset.analysis.tags) {
      tagStmt.run(tag, 'auto-generated');
      
      const tagRow = this.get(`SELECT id FROM tags WHERE name = ?`, [tag]);
      if (tagRow) {
        relationStmt.run(asset.id, tagRow.id);
      }
    }
    
    tagStmt.finalize();
    relationStmt.finalize();
  }

  async updateAssetUsage(assetId: string, usage: Partial<Asset['usage']>): Promise<void> {
    const currentAsset = await this.get(`SELECT usage FROM assets WHERE id = ?`, [assetId]);
    if (currentAsset) {
      const currentUsage = JSON.parse(currentAsset.usage);
      const updatedUsage = { ...currentUsage, ...usage, lastUsed: new Date() };
      
      await this.run(
        `UPDATE assets SET usage = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [JSON.stringify(updatedUsage), assetId]
      );
    }
  }

  async logUsage(assetId: string, action: string, context?: string): Promise<void> {
    await this.run(
      `INSERT INTO usage_logs (asset_id, action, context) VALUES (?, ?, ?)`,
      [assetId, action, context]
    );
    
    // Update usage stats
    const incrementField = action === 'view' ? 'views' : 
                         action === 'select' ? 'selects' : 
                         action === 'copy' ? 'copies' : 'views';
    
    await this.run(
      `UPDATE assets SET 
       usage = json_set(
         json(usage), 
         '$.${incrementField}', 
         json_extract(usage, '$.${incrementField}') + 1
       ),
       updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [assetId]
    );
  }

  async searchAssets(query: string, filters?: any): Promise<Asset[]> {
    let sql = `
      SELECT DISTINCT a.* FROM assets a
      LEFT JOIN asset_tags at ON a.id = at.asset_id
      LEFT JOIN tags t ON at.tag_id = t.id
      WHERE 1=1
    `;
    const params: any[] = [];

    // Text search in filename, description, and tags
    if (query) {
      sql += ` AND (
        a.filename LIKE ? OR 
        json_extract(a.analysis, '$.description') LIKE ? OR
        t.name LIKE ? OR
        json_extract(a.analysis, '$.content') LIKE ?
      )`;
      const searchPattern = `%${query}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // Apply filters
    if (filters?.element) {
      sql += ` AND json_extract(a.analysis, '$.element') = ?`;
      params.push(filters.element);
    }

    if (filters?.guardian) {
      sql += ` AND json_extract(a.analysis, '$.guardian') = ?`;
      params.push(filters.guardian);
    }

    if (filters?.type) {
      sql += ` AND a.type = ?`;
      params.push(filters.type);
    }

    if (filters?.format) {
      sql += ` AND a.format = ?`;
      params.push(filters.format);
    }

    // Order by relevance and usage
    sql += ` ORDER BY 
      CASE WHEN a.filename LIKE ? THEN 1 ELSE 2 END,
      json_extract(a.usage, '$.favorites') DESC,
      json_extract(a.usage, '$.views') DESC,
      a.updated_at DESC
    `;

    if (query) {
      const exactPattern = `${query}%`;
      params.push(exactPattern);
    }

    const rows = await this.all(sql, params);
    return rows.map(row => ({
      ...row,
      metadata: JSON.parse(row.metadata),
      analysis: JSON.parse(row.analysis),
      usage: JSON.parse(row.usage),
      relationships: JSON.parse(row.relationships),
      dimensions: row.dimensions ? JSON.parse(row.dimensions) : undefined
    }));
  }

  async getAssetById(id: string): Promise<Asset | null> {
    const row = await this.get(`SELECT * FROM assets WHERE id = ?`, [id]);
    if (!row) return null;
    
    return {
      ...row,
      metadata: JSON.parse(row.metadata),
      analysis: JSON.parse(row.analysis),
      usage: JSON.parse(row.usage),
      relationships: JSON.parse(row.relationships),
      dimensions: row.dimensions ? JSON.parse(row.dimensions) : undefined
    };
  }

  async getSimilarAssets(assetId: string, limit: number = 10): Promise<Asset[]> {
    const asset = await this.getAssetById(assetId);
    if (!asset) return [];

    // Find similar based on tags, guardian, element, and visual analysis
    const sql = `
      SELECT * FROM assets 
      WHERE id != ? 
      AND (
        json_extract(analysis, '$.guardian') = ? OR
        json_extract(analysis, '$.element') = ? OR
        json_extract(analysis, '$.style') = ? OR
        EXISTS (
          SELECT 1 FROM asset_tags at1 
          JOIN asset_tags at2 ON at1.tag_id = at2.tag_id 
          WHERE at1.asset_id = ? AND at2.asset_id = assets.id
        )
      )
      ORDER BY 
        json_extract(usage, '$.views') DESC,
        updated_at DESC
      LIMIT ?
    `;

    const rows = await this.all(sql, [
      assetId, 
      asset.analysis.guardian, 
      asset.analysis.element, 
      asset.analysis.style,
      assetId, 
      limit
    ]);

    return rows.map(row => ({
      ...row,
      metadata: JSON.parse(row.metadata),
      analysis: JSON.parse(row.analysis),
      usage: JSON.parse(row.usage),
      relationships: JSON.parse(row.relationships),
      dimensions: row.dimensions ? JSON.parse(row.dimensions) : undefined
    }));
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}