const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const sharp = require('sharp');

// Arcanea Library Agent - Local File Intelligence System
class ArcaneaLibraryAgent {
  constructor() {
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'];
    this.arcaneaRoot = process.cwd();
    this.libraryCache = new Map();
    this.lastScan = null;
    
    // AI Categories for intelligent sorting
    this.categories = {
      'guardians': ['draconia', 'leyla', 'lyssandria', 'alera', 'elara'],
      'mythology': ['god', 'goddess', 'myth', 'legend', 'ancient'],
      'technology': ['bot', 'interface', 'tech', 'ai', 'digital'],
      'artwork': ['art', 'illustration', 'painting', 'drawing'],
      'icons': ['icon', 'logo', 'symbol', 'emblem'],
      'screenshots': ['screenshot', 'ui', 'interface', 'app'],
      'documentation': ['diagram', 'chart', 'documentation'],
      'abstract': ['abstract', 'pattern', 'texture', 'background']
    };
  }

  // 🔍 Scan all Arcanea directories for visual files
  async scanLibrary() {
    console.log('🔍 Scanning Arcanea Library for visual assets...');
    
    const allFiles = await this.getAllFiles(this.arcaneaRoot);
    const visualFiles = allFiles.filter(file => 
      this.supportedFormats.includes(path.extname(file).toLowerCase())
    );

    // Enhance with AI-powered analysis
    const enhancedFiles = await Promise.all(
      visualFiles.map(file => this.analyzeFile(file))
    );

    // Sort and categorize
    const library = {
      total: enhancedFiles.length,
      categories: this.categorizeFiles(enhancedFiles),
      files: enhancedFiles.sort((a, b) => b.score - a.score),
      scanned: new Date().toISOString()
    };

    this.libraryCache.set('current', library);
    this.lastScan = Date.now();
    
    console.log(`✅ Found ${library.total} visual files`);
    return library;
  }

  // 📁 Recursively get all files
  async getAllFiles(dir, fileList = []) {
    try {
      const items = await fs.readdir(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          await this.getAllFiles(fullPath, fileList);
        } else {
          fileList.push(fullPath);
        }
      }
    } catch (error) {
      console.log(`⚠️  Cannot access ${dir}: ${error.message}`);
    }
    
    return fileList;
  }

  // 🧠 AI-powered file analysis
  async analyzeFile(filePath) {
    const stats = await fs.stat(filePath);
    const filename = path.basename(filePath);
    const dirname = path.basename(path.dirname(filePath));
    const ext = path.extname(filePath).toLowerCase();
    
    // Extract metadata
    const metadata = await this.extractImageMetadata(filePath);
    
    // AI categorization based on path and filename
    const aiCategory = this.categorizeByPath(filename, dirname);
    const aiTags = this.generateTags(filename, dirname);
    
    // Calculate relevance score
    const score = this.calculateScore(filename, dirname, metadata, aiCategory);
    
    return {
      id: Buffer.from(filePath).toString('base64').slice(0, 8),
      path: filePath,
      filename,
      dirname,
      size: stats.size,
      created: stats.birthtime.toISOString(),
      modified: stats.mtime.toISOString(),
      extension: ext,
      metadata,
      category: aiCategory,
      tags: aiTags,
      score,
      preview: await this.generatePreview(filePath)
    };
  }

  // 🏷️ Generate intelligent tags
  generateTags(filename, dirname) {
    const tags = new Set();
    const text = (filename + ' ' + dirname).toLowerCase();
    
    // Guardian detection
    Object.keys(this.categories).forEach(category => {
      if (this.categories[category].some(keyword => text.includes(keyword))) {
        tags.add(category);
      }
    });
    
    // Style detection
    if (text.includes('dark') || text.includes('night')) tags.add('dark-theme');
    if (text.includes('light') || text.includes('bright')) tags.add('light-theme');
    if (text.includes('minimal')) tags.add('minimal');
    if (text.includes('detailed')) tags.add('detailed');
    
    // Usage detection
    if (text.includes('icon') || text.includes('logo')) tags.add('branding');
    if (text.includes('screenshot')) tags.add('documentation');
    if (text.includes('banner') || text.includes('hero')) tags.add('header');
    
    return Array.from(tags);
  }

  // 📂 Smart categorization
  categorizeByPath(filename, dirname) {
    const text = (filename + ' ' + dirname).toLowerCase();
    
    // Priority categorization
    for (const [category, keywords] of Object.entries(this.categories)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }
    
    // Default categorization by directory
    if (dirname.includes('image') || dirname.includes('img')) return 'artwork';
    if (dirname.includes('icon')) return 'icons';
    if (dirname.includes('screenshot')) return 'screenshots';
    if (dirname.includes('doc')) return 'documentation';
    
    return 'general';
  }

  // 📊 Calculate relevance score
  calculateScore(filename, dirname, metadata, category) {
    let score = 50; // Base score
    
    // Filename relevance
    if (filename.includes('arcanea')) score += 20;
    if (filename.includes('draconia') || filename.includes('guardian')) score += 15;
    if (filename.includes('frankx')) score += 10;
    
    // Directory relevance  
    if (dirname.includes('arcanea')) score += 15;
    if (dirname.includes('docs')) score += 5;
    if (dirname.includes('assets')) score += 5;
    
    // Category priority
    const categoryScores = {
      'guardians': 25,
      'mythology': 20,
      'technology': 15,
      'artwork': 15,
      'icons': 10,
      'screenshots': 8,
      'documentation': 5
    };
    score += categoryScores[category] || 0;
    
    // Quality indicators
    if (metadata && metadata.width && metadata.height) {
      const pixels = metadata.width * metadata.height;
      if (pixels > 1000000) score += 10; // High resolution
    }
    
    return Math.min(score, 100);
  }

  // 🖼️ Generate preview
  async generatePreview(filePath) {
    try {
      const ext = path.extname(filePath).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        // Generate thumbnail with sharp
        const thumbnailPath = filePath.replace(ext, `_thumb${ext}`);
        await sharp(filePath)
          .resize(200, 200, { fit: 'cover' })
          .jpeg({ quality: 80 })
          .toFile(thumbnailPath);
        
        return thumbnailPath;
      }
    } catch (error) {
      console.log(`⚠️  Cannot generate preview for ${filePath}`);
    }
    
    return null;
  }

  // 📊 Extract image metadata
  async extractImageMetadata(filePath) {
    try {
      const ext = path.extname(filePath).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const metadata = await sharp(filePath).metadata();
        return {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          channels: metadata.channels,
          density: metadata.density
        };
      }
    } catch (error) {
      console.log(`⚠️  Cannot read metadata for ${filePath}`);
    }
    
    return null;
  }

  // 🗂️ Organize files by category
  categorizeFiles(files) {
    const categorized = {};
    
    files.forEach(file => {
      if (!categorized[file.category]) {
        categorized[file.category] = [];
      }
      categorized[file.category].push(file);
    });
    
    // Sort each category by score
    Object.keys(categorized).forEach(category => {
      categorized[category].sort((a, b) => b.score - a.score);
    });
    
    return categorized;
  }

  // 🔍 Search files
  searchLibrary(query) {
    const library = this.libraryCache.get('current');
    if (!library) return [];

    const results = library.files.filter(file => {
      const searchText = (file.filename + ' ' + file.dirname + ' ' + file.tags.join(' ')).toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    return results.sort((a, b) => b.score - a.score);
  }

  // 📈 Get statistics
  getStats() {
    const library = this.libraryCache.get('current');
    if (!library) return null;

    const stats = {
      total: library.total,
      categories: Object.keys(library.categories).length,
      totalSize: library.files.reduce((sum, file) => sum + file.size, 0),
      avgScore: Math.round(library.files.reduce((sum, file) => sum + file.score, 0) / library.total),
      formats: {},
      scanned: library.scanned
    };

    // Count formats
    library.files.forEach(file => {
      const ext = file.extension || 'unknown';
      stats.formats[ext] = (stats.formats[ext] || 0) + 1;
    });

    return stats;
  }

  // 💾 Export library data for web UI
  exportForWeb() {
    const library = this.libraryCache.get('current');
    if (!library) return null;

    return {
      stats: this.getStats(),
      categories: library.categories,
      files: library.files.map(file => ({
        id: file.id,
        filename: file.filename,
        dirname: file.dirname,
        category: file.category,
        tags: file.tags,
        score: file.score,
        metadata: file.metadata,
        preview: file.preview ? `/preview/${file.id}` : null
      }))
    };
  }

  // 🔄 Auto-organize files (optional feature)
  async organizeFiles(targetDir) {
    console.log('🗂️  Auto-organizing Arcanea Library...');
    
    const library = this.libraryCache.get('current');
    if (!library) {
      console.log('❌ Library not scanned yet');
      return;
    }

    for (const [category, files] of Object.entries(library.categories)) {
      const categoryDir = path.join(targetDir, category);
      await fs.mkdir(categoryDir, { recursive: true });
      
      for (const file of files) {
        if (file.dirname !== categoryDir) {
          const newPath = path.join(categoryDir, file.filename);
          console.log(`Moving ${file.filename} to ${category}/`);
          // await fs.rename(file.path, newPath); // Uncomment to actually move files
        }
      }
    }
    
    console.log('✅ Library organization complete');
  }
}

// CLI Interface
async function main() {
  const agent = new ArcaneaLibraryAgent();
  
  const command = process.argv[2] || 'scan';
  
  switch (command) {
    case 'scan':
      await agent.scanLibrary();
      console.log(JSON.stringify(agent.exportForWeb(), null, 2));
      break;
      
    case 'search':
      const query = process.argv[3] || '';
      const results = agent.searchLibrary(query);
      console.log(`Found ${results.length} results for "${query}":`);
      results.forEach(file => console.log(`  - ${file.filename} (${file.category})`));
      break;
      
    case 'stats':
      await agent.scanLibrary();
      const stats = agent.getStats();
      console.log('📊 Arcanea Library Statistics:');
      console.log(JSON.stringify(stats, null, 2));
      break;
      
    case 'organize':
      const targetDir = process.argv[3] || './organized-library';
      await agent.scanLibrary();
      await agent.organizeFiles(targetDir);
      break;
      
    default:
      console.log(`
🔮 Arcanea Library Agent - Local File Intelligence System

Usage:
  node arcanea-agent.js <command> [options]

Commands:
  scan                    - Scan and display library
  search <query>          - Search for files
  stats                   - Show library statistics  
  organize <target>        - Auto-organize files into categories

Examples:
  node arcanea-agent.js scan
  node arcanea-agent.js search draconia
  node arcanea-agent.js stats
  node arcanea-agent.js organize ./organized
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = ArcaneaLibraryAgent;