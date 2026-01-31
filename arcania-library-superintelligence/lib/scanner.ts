import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';
import exifr from 'exifr';
import { ArcaneaDB, Asset } from './database';

export class AssetScanner {
  private db: ArcaneaDB;
  private supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif', '.tiff'];

  constructor(db: ArcaneaDB) {
    this.db = db;
  }

  async scanDirectory(directoryPath: string): Promise<void> {
    console.log(`🔍 Scanning directory: ${directoryPath}`);
    
    const files = this.getAllFiles(directoryPath);
    console.log(`📁 Found ${files.length} files to process`);
    
    for (const filePath of files) {
      try {
        await this.processFile(filePath);
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error);
      }
    }
    
    console.log('✅ Scan complete');
  }

  private getAllFiles(dirPath: string): string[] {
    const files: string[] = [];
    
    const traverse = (currentPath: string) => {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (this.supportedFormats.includes(path.extname(item).toLowerCase())) {
          files.push(fullPath);
        }
      }
    };
    
    traverse(dirPath);
    return files;
  }

  private async processFile(filePath: string): Promise<void> {
    const stat = fs.statSync(filePath);
    const filename = path.basename(filePath);
    const ext = path.extname(filename).toLowerCase();
    const format = ext.slice(1);
    
    // Check if file already exists
    const existingAsset = await this.db.get(`SELECT id FROM assets WHERE path = ?`, [filePath]);
    const assetId = existingAsset?.id || this.generateId();
    
    // Basic file info
    const asset: Asset = {
      id: assetId,
      path: filePath,
      filename,
      size: stat.size,
      type: this.getFileType(format),
      format,
      dimensions: undefined,
      metadata: {
        created: stat.birthtime,
        modified: stat.mtime,
        exif: {}
      },
      analysis: {
        tags: [],
        guardian: undefined,
        element: undefined,
        mood: undefined,
        style: undefined,
        content: [],
        colors: [],
        composition: undefined
      },
      usage: {
        views: existingAsset ? JSON.parse(existingAsset.usage || '{}').views || 0 : 0,
        selects: existingAsset ? JSON.parse(existingAsset.usage || '{}').selects || 0 : 0,
        copies: existingAsset ? JSON.parse(existingAsset.usage || '{}').copies || 0 : 0,
        lastUsed: existingAsset ? JSON.parse(existingAsset.usage || '{}').lastUsed : undefined,
        favorites: existingAsset ? JSON.parse(existingAsset.usage || '{}').favorites || false : false
      },
      relationships: {
        similar: [],
        related: [],
        series: undefined,
        variants: []
      }
    };

    try {
      // Get dimensions for raster images
      if (!['svg'].includes(format)) {
        const dimensions = imageSize(filePath);
        if (dimensions.width && dimensions.height) {
          asset.dimensions = { width: dimensions.width, height: dimensions.height };
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not get dimensions for ${filename}`);
    }

    try {
      // Extract EXIF data
      if (['jpg', 'jpeg', 'tiff'].includes(format)) {
        const exif = await exifr.parse(filePath);
        if (exif) {
          asset.metadata.exif = exif;
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not extract EXIF from ${filename}`);
    }

    // Initial analysis based on filename and path
    this.performBasicAnalysis(asset);
    
    await this.db.insertAsset(asset);
    console.log(`✅ Processed: ${filename}`);
  }

  private getFileType(format: string): string {
    const raster = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'tiff'];
    const vector = ['svg', 'ai', 'eps'];
    const document = ['pdf'];
    
    if (raster.includes(format)) return 'raster';
    if (vector.includes(format)) return 'vector';
    if (document.includes(format)) return 'document';
    return 'unknown';
  }

  private performBasicAnalysis(asset: Asset): void {
    const pathLower = asset.path.toLowerCase();
    const filenameLower = asset.filename.toLowerCase();
    
    // Analyze filename for Guardian associations
    const guardianKeywords = {
      draconia: ['dragon', 'fire', 'transform', 'bold', 'power', 'draconia'],
      aethon: ['speed', 'swift', 'lightning', 'comet', 'thunder', 'aethon'],
      leyla: ['water', 'emotion', 'story', 'river', 'ocean', 'leyla'],
      maylinn: ['growth', 'garden', 'forest', 'bloom', 'life', 'maylinn'],
      lyssandria: ['earth', 'crystal', 'mountain', 'structure', 'lyssandria'],
      kaelix: ['gem', 'precision', 'crystal', 'facet', 'kaelix'],
      alera: ['wind', 'voice', 'expression', 'whisper', 'storm', 'alera'],
      yumiko: ['truth', 'clarity', 'mirror', 'authentic', 'yumiko'],
      elara: ['void', 'vision', 'quantum', 'mystery', 'elara'],
      shinkami: ['source', 'universal', 'enlightenment', 'infinity', 'shinkami']
    };

    for (const [guardian, keywords] of Object.entries(guardianKeywords)) {
      if (keywords.some(keyword => pathLower.includes(keyword) || filenameLower.includes(keyword))) {
        asset.analysis.guardian = guardian;
        break;
      }
    }

    // Element detection
    const elementKeywords = {
      fire: ['fire', 'flame', 'burn', 'hot', 'red', 'orange', 'dragon'],
      water: ['water', 'ocean', 'river', 'blue', 'flow', 'wave'],
      earth: ['earth', 'ground', 'stone', 'rock', 'brown', 'green', 'forest'],
      wind: ['wind', 'air', 'sky', 'cloud', 'white', 'fly'],
      void: ['void', 'dark', 'space', 'cosmos', 'purple', 'black']
    };

    for (const [element, keywords] of Object.entries(elementKeywords)) {
      if (keywords.some(keyword => pathLower.includes(keyword) || filenameLower.includes(keyword))) {
        asset.analysis.element = element;
        break;
      }
    }

    // Generate basic tags from path and filename
    const tagCandidates = [
      ...pathLower.split(/[\\\/]/),
      ...filenameLower.split(/[-_\s]/),
      filenameLower.split('.')[0]
    ].filter(Boolean);

    asset.analysis.tags = [...new Set(tagCandidates)].slice(0, 20);

    // Detect content type from filename
    const contentTypes = {
      logo: ['logo', 'brand', 'identity'],
      icon: ['icon', 'favicon', 'symbol'],
      banner: ['banner', 'header', 'hero'],
      screenshot: ['screenshot', 'screen', 'capture'],
      mockup: ['mockup', 'prototype', 'design'],
      photo: ['photo', 'picture', 'image'],
      illustration: ['illustration', 'drawing', 'art'],
      diagram: ['diagram', 'chart', 'graph'],
      texture: ['texture', 'pattern', 'material']
    };

    for (const [type, keywords] of Object.entries(contentTypes)) {
      if (keywords.some(keyword => pathLower.includes(keyword) || filenameLower.includes(keyword))) {
        asset.analysis.content.push(type);
        break;
      }
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async watchDirectory(directoryPath: string): Promise<void> {
    const chokidar = require('chokidar');
    
    console.log(`👀 Watching directory for changes: ${directoryPath}`);
    
    const watcher = chokidar.watch(directoryPath, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('add', async (filePath) => {
      if (this.supportedFormats.includes(path.extname(filePath).toLowerCase())) {
        console.log(`📝 New file detected: ${filePath}`);
        await this.processFile(filePath);
      }
    });

    watcher.on('change', async (filePath) => {
      console.log(`🔄 File modified: ${filePath}`);
      await this.processFile(filePath);
    });

    watcher.on('unlink', async (filePath) => {
      console.log(`🗑️  File deleted: ${filePath}`);
      await this.db.run(`DELETE FROM assets WHERE path = ?`, [filePath]);
    });
  }
}