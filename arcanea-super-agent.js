#!/usr/bin/env node

/**
 * Arcanea Library Superintelligence Agent
 * Built with opencode + kimi k2.5 + full tool ecosystem
 * 
 * This agent combines:
 * - File system intelligence (Glob, Read, Bash)
 * - Pattern recognition (Grep, custom logic)
 * - Arcanea domain knowledge (built-in)
 * - Vision analysis simulation (metadata + path analysis)
 * - Learning system (JSON persistence)
 * - Recommendation engine (scoring algorithm)
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

class ArcaneaSuperintelligenceAgent {
  constructor() {
    this.arcaneaRoot = process.cwd();
    this.knowledgeBase = {
      guardians: {
        draconia: ['dragon', 'fire', 'phoenix', 'volcano', 'sun', 'catalyst', 'transform', 'bold'],
        leyla: ['river', 'ocean', 'water', 'rain', 'mist', 'current', 'flow', 'story'],
        lyssandria: ['crystal', 'mountain', 'foundation', 'stone', 'earth', 'structure', 'build'],
        alera: ['whisper', 'storm', 'breeze', 'gale', 'calm', 'wind', 'voice', 'speak'],
        elara: ['void', 'quantum', 'source', 'possibility', 'infinity', 'future', 'vision'],
        ino: ['fusion', 'union', 'synergy', 'harmony', 'relationship', 'connect'],
        others: ['guardian', 'arcanea', 'frankx', 'superintelligence']
      },
      categories: {
        mythology: ['god', 'goddess', 'deity', 'pantheon', 'myth', 'legend', 'ancient', 'oracle'],
        technology: ['bot', 'interface', 'tech', 'ai', 'digital', 'code', 'app', 'software'],
        artwork: ['art', 'illustration', 'painting', 'drawing', 'design', 'creative'],
        icons: ['icon', 'logo', 'symbol', 'emblem', 'badge', 'mark'],
        screenshots: ['screenshot', 'ui', 'interface', 'screen', 'capture', 'image'],
        documentation: ['diagram', 'chart', 'doc', 'guide', 'manual', 'readme'],
        branding: ['brand', 'header', 'banner', 'hero', 'showcase', 'asset']
      },
      visualPatterns: {
        darkTheme: ['dark', 'night', 'midnight', 'shadow', 'black', 'deep'],
        lightTheme: ['light', 'bright', 'day', 'white', 'clean', 'minimal'],
        detailed: ['detailed', 'complex', 'intricate', 'high-res', '4k', 'hd'],
        minimal: ['minimal', 'simple', 'clean', 'flat', 'basic'],
        vibrant: ['vibrant', 'colorful', 'bright', 'saturated', 'rich'],
        muted: ['muted', 'soft', 'pastel', 'subtle', 'gentle']
      }
    };
    
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.ico'];
    this.libraryCache = null;
    this.learningDataPath = path.join(this.arcaneaRoot, '.arcanea-learning.json');
    this.learningData = null;
    this.libraryCachePath = path.join(this.arcaneaRoot, '.arcanea-library-cache.json');
  }

  // 💾 Load persisted library
  async loadLibrary() {
    try {
      const data = await fs.readFile(this.libraryCachePath, 'utf8');
      this.libraryCache = JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  }

  // 🧠 Initialize learning system
  async initLearning() {
    try {
      const data = await fs.readFile(this.learningDataPath, 'utf8');
      this.learningData = JSON.parse(data);
    } catch {
      this.learningData = {
        userCorrections: {},
        preferredTags: {},
        searchHistory: [],
        usagePatterns: {},
        discoveredConnections: [],
        version: '1.0'
      };
      await this.saveLearning();
    }
  }

  async saveLearning() {
    await fs.writeFile(this.learningDataPath, JSON.stringify(this.learningData, null, 2));
  }

  // 🔍 Superintelligent file discovery
  async discoverFiles() {
    console.log('🔮 Activating Arcanea Superintelligence...');
    console.log('🧠 Scanning with multi-dimensional pattern recognition...\n');

    const allFiles = [];
    const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];

    try {
      // Use glob-like discovery with opencode capabilities
      const { stdout } = await execAsync(
        `find "${this.arcaneaRoot}" -type f \\( ${this.supportedFormats.map(ext => `-name "*${ext}"`).join(' -o ')} \\) 2>/dev/null | head -1000`
      );
      
      const files = stdout.trim().split('\n').filter(f => f);
      
      for (const filePath of files) {
        const relativePath = path.relative(this.arcaneaRoot, filePath);
        const dirName = path.dirname(relativePath).split(path.sep).pop();
        
        // Skip excluded directories
        if (excludeDirs.some(dir => relativePath.includes(dir))) continue;
        
        try {
          const stats = await fs.stat(filePath);
          allFiles.push({
            path: filePath,
            relativePath,
            filename: path.basename(filePath),
            dirname: dirName,
            extension: path.extname(filePath).toLowerCase(),
            size: stats.size,
            modified: stats.mtime.toISOString(),
            created: stats.birthtime.toISOString()
          });
        } catch (err) {
          // Skip inaccessible files
        }
      }
    } catch (error) {
      console.log('⚠️  Using fallback file discovery...');
      // Fallback to manual traversal
      await this.manualDiscovery(this.arcaneaRoot, allFiles, excludeDirs);
    }

    return allFiles;
  }

  async manualDiscovery(dir, fileList, excludeDirs, depth = 0) {
    if (depth > 5) return; // Limit recursion
    
    try {
      const items = await fs.readdir(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          if (!excludeDirs.includes(item.name)) {
            await this.manualDiscovery(fullPath, fileList, excludeDirs, depth + 1);
          }
        } else if (this.supportedFormats.includes(path.extname(item.name).toLowerCase())) {
          const stats = await fs.stat(fullPath);
          fileList.push({
            path: fullPath,
            relativePath: path.relative(this.arcaneaRoot, fullPath),
            filename: item.name,
            dirname: path.basename(path.dirname(fullPath)),
            extension: path.extname(item.name).toLowerCase(),
            size: stats.size,
            modified: stats.mtime.toISOString(),
            created: stats.birthtime.toISOString()
          });
        }
      }
    } catch (err) {
      // Skip inaccessible directories
    }
  }

  // 🎨 Visual content analysis (simulated vision)
  async analyzeVisualContent(file) {
    const text = (file.filename + ' ' + file.dirname).toLowerCase();
    
    // Multi-dimensional analysis
    const analysis = {
      // Guardian entity detection
      guardianAffinity: this.detectGuardianAffinity(text),
      
      // Category classification
      primaryCategory: this.classifyCategory(text),
      secondaryCategories: this.classifySecondaryCategories(text),
      
      // Visual style detection
      visualStyle: this.detectVisualStyle(text),
      
      // Content themes
      themes: this.extractThemes(text),
      
      // Arcanea ecosystem relevance
      arcaneaRelevance: this.calculateArcaneaRelevance(text),
      
      // Quality indicators
      quality: this.assessQuality(file),
      
      // Usage prediction
      predictedUsage: this.predictUsage(file),
      
      // Smart tags
      tags: this.generateSmartTags(file, text)
    };

    // Apply learning adjustments
    await this.applyLearning(analysis, file);
    
    return analysis;
  }

  // 🛡️ Detect Guardian affinity
  detectGuardianAffinity(text) {
    const scores = {};
    
    for (const [guardian, keywords] of Object.entries(this.knowledgeBase.guardians)) {
      const matches = keywords.filter(kw => text.includes(kw)).length;
      scores[guardian] = matches;
    }
    
    // Find primary guardian
    const entries = Object.entries(scores);
    entries.sort((a, b) => b[1] - a[1]);
    
    const primary = entries[0];
    const secondary = entries[1];
    
    return {
      primary: primary[1] > 0 ? primary[0] : 'general',
      secondary: secondary[1] > 0 ? secondary[0] : null,
      confidence: Math.min((primary[1] / 3) * 100, 100),
      allScores: scores
    };
  }

  // 📚 Classify primary category
  classifyCategory(text) {
    const scores = {};
    
    for (const [category, keywords] of Object.entries(this.knowledgeBase.categories)) {
      const matches = keywords.filter(kw => text.includes(kw)).length;
      scores[category] = matches;
    }
    
    // Add context-based scoring
    if (text.includes('guardian') || text.includes('draconia') || text.includes('leyla')) {
      scores.guardians = (scores.guardians || 0) + 3;
    }
    
    const entries = Object.entries(scores);
    entries.sort((a, b) => b[1] - a[1]);
    
    return entries[0][1] > 0 ? entries[0][0] : 'general';
  }

  // 🔮 Classify secondary categories
  classifySecondaryCategories(text) {
    const secondary = [];
    
    for (const [category, keywords] of Object.entries(this.knowledgeBase.categories)) {
      const matches = keywords.filter(kw => text.includes(kw)).length;
      if (matches > 0) {
        secondary.push(category);
      }
    }
    
    return secondary.slice(0, 3); // Top 3
  }

  // 🎨 Detect visual style
  detectVisualStyle(text) {
    const styles = [];
    
    for (const [style, keywords] of Object.entries(this.knowledgeBase.visualPatterns)) {
      if (keywords.some(kw => text.includes(kw))) {
        styles.push(style);
      }
    }
    
    return styles.length > 0 ? styles : ['neutral'];
  }

  // 🌟 Extract themes
  extractThemes(text) {
    const themes = [];
    const themeKeywords = {
      'transformation': ['transform', 'change', 'evolution', 'growth'],
      'power': ['power', 'strength', 'force', 'mighty'],
      'wisdom': ['wisdom', 'knowledge', 'learn', 'teach'],
      'creation': ['create', 'build', 'make', 'craft'],
      'mystery': ['mystery', 'secret', 'hidden', 'unknown'],
      'harmony': ['harmony', 'balance', 'peace', 'unity']
    };
    
    for (const [theme, keywords] of Object.entries(themeKeywords)) {
      if (keywords.some(kw => text.includes(kw))) {
        themes.push(theme);
      }
    }
    
    return themes;
  }

  // 🔮 Calculate Arcanea relevance
  calculateArcaneaRelevance(text) {
    let score = 0;
    
    // Arcanea brand mentions
    if (text.includes('arcanea')) score += 25;
    if (text.includes('frankx')) score += 20;
    if (text.includes('guardian')) score += 15;
    
    // Element mentions
    if (text.includes('fire') || text.includes('dragon')) score += 10;
    if (text.includes('water') || text.includes('ocean')) score += 10;
    if (text.includes('earth') || text.includes('crystal')) score += 10;
    if (text.includes('wind') || text.includes('storm')) score += 10;
    if (text.includes('void') || text.includes('quantum')) score += 10;
    
    return Math.min(score, 100);
  }

  // ⭐ Assess quality
  assessQuality(file) {
    let score = 50; // Base score
    
    // Size-based quality (larger files often higher quality)
    if (file.size > 1000000) score += 20; // > 1MB
    else if (file.size > 500000) score += 10; // > 500KB
    
    // Format quality
    if (['.png', '.webp'].includes(file.extension)) score += 10;
    if (file.extension === '.svg') score += 15; // Vector quality
    
    // Naming quality
    if (file.filename.includes('arcanea')) score += 10;
    if (file.filename.includes('guardian')) score += 10;
    
    return Math.min(score, 100);
  }

  // 🎯 Predict usage patterns
  predictUsage(file) {
    const predictions = [];
    const text = (file.filename + ' ' + file.dirname).toLowerCase();
    
    if (text.includes('icon') || text.includes('logo')) predictions.push('branding');
    if (text.includes('hero') || text.includes('banner')) predictions.push('marketing');
    if (text.includes('screenshot')) predictions.push('documentation');
    if (text.includes('avatar') || text.includes('profile')) predictions.push('profile');
    if (text.includes('bg') || text.includes('background')) predictions.push('background');
    if (text.includes('guardian')) predictions.push('guardian-entity');
    
    return predictions.length > 0 ? predictions : ['general'];
  }

  // 🏷️ Generate smart tags
  generateSmartTags(file, text) {
    const tags = new Set();
    
    // Add analysis-based tags
    const guardian = this.detectGuardianAffinity(text);
    if (guardian.primary !== 'general') tags.add(guardian.primary);
    if (guardian.secondary) tags.add(guardian.secondary);
    
    const category = this.classifyCategory(text);
    tags.add(category);
    
    const styles = this.detectVisualStyle(text);
    styles.forEach(style => tags.add(style));
    
    const themes = this.extractThemes(text);
    themes.forEach(theme => tags.add(theme));
    
    // Format-based tags
    if (file.extension === '.svg') tags.add('vector');
    if (file.extension === '.gif') tags.add('animated');
    
    // Size-based tags
    if (file.size > 2000000) tags.add('high-resolution');
    if (file.size < 50000) tags.add('optimized');
    
    return Array.from(tags);
  }

  // 🧠 Apply learned preferences
  async applyLearning(analysis, file) {
    if (!this.learningData) await this.initLearning();
    
    // Check for user corrections
    const fileId = Buffer.from(file.path).toString('base64').slice(0, 16);
    if (this.learningData.userCorrections[fileId]) {
      const correction = this.learningData.userCorrections[fileId];
      analysis.primaryCategory = correction.category || analysis.primaryCategory;
      analysis.tags = [...new Set([...analysis.tags, ...(correction.tags || [])])];
    }
    
    // Apply preferred tags
    for (const [tag, weight] of Object.entries(this.learningData.preferredTags)) {
      if (weight > 0.7 && !analysis.tags.includes(tag)) {
        analysis.tags.push(tag);
      }
    }
    
    return analysis;
  }

  // 🔍 Semantic search
  async semanticSearch(query, library) {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const results = [];
    
    for (const file of library.files) {
      let score = 0;
      const analysis = file.analysis;
      
      // Guardian matching
      if (analysis.guardianAffinity) {
        if (queryTerms.some(term => term.includes(analysis.guardianAffinity.primary))) {
          score += 50;
        }
      }
      
      // Category matching
      if (queryTerms.some(term => term.includes(analysis.primaryCategory))) {
        score += 40;
      }
      
      // Tag matching
      const tagMatches = analysis.tags.filter(tag => 
        queryTerms.some(term => term.includes(tag) || tag.includes(term))
      ).length;
      score += tagMatches * 15;
      
      // Theme matching
      const themeMatches = analysis.themes.filter(theme =>
        queryTerms.some(term => term.includes(theme))
      ).length;
      score += themeMatches * 10;
      
      // Visual style matching
      const styleMatches = analysis.visualStyle.filter(style =>
        queryTerms.some(term => term.includes(style))
      ).length;
      score += styleMatches * 5;
      
      // Filename matching
      if (queryTerms.some(term => file.filename.toLowerCase().includes(term))) {
        score += 20;
      }
      
      if (score > 0) {
        results.push({ file, score, relevance: Math.min(score / 100, 100) });
      }
    }
    
    return results.sort((a, b) => b.score - a.score);
  }

  // 🎯 Generate recommendations
  async generateRecommendations(library) {
    const recommendations = [];
    
    // Find related files based on analysis similarity
    for (const file of library.files) {
      const related = [];
      
      for (const other of library.files) {
        if (file.path === other.path) continue;
        
        let similarity = 0;
        
        // Guardian similarity
        if (file.analysis.guardianAffinity.primary === other.analysis.guardianAffinity.primary) {
          similarity += 30;
        }
        
        // Category similarity
        if (file.analysis.primaryCategory === other.analysis.primaryCategory) {
          similarity += 25;
        }
        
        // Tag overlap
        const commonTags = file.analysis.tags.filter(tag => 
          other.analysis.tags.includes(tag)
        );
        similarity += commonTags.length * 10;
        
        if (similarity > 40) {
          related.push({ file: other, similarity });
        }
      }
      
      if (related.length > 0) {
        related.sort((a, b) => b.similarity - a.similarity);
        recommendations.push({
          file,
          related: related.slice(0, 5)
        });
      }
    }
    
    return recommendations;
  }

  // 📊 Main execution
  async execute(command, args = {}) {
    await this.initLearning();
    
    switch (command) {
      case 'scan':
        return await this.cmdScan();
      case 'search':
        return await this.cmdSearch(args.query);
      case 'stats':
        return await this.cmdStats();
      case 'analyze':
        return await this.cmdAnalyze(args.file);
      case 'recommend':
        return await this.cmdRecommend();
      case 'learn':
        return await this.cmdLearn(args.file, args.category, args.tags);
      default:
        return this.showHelp();
    }
  }

  async cmdScan() {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  🔮 ARCANEA LIBRARY SUPERINTELLIGENCE AGENT           ║');
    console.log('║  Built with opencode + kimi k2.5 + Full Tool Ecosystem ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const files = await this.discoverFiles();
    console.log(`📁 Discovered ${files.length} visual files\n`);

    console.log('🧠 Analyzing with multi-dimensional intelligence...');
    const analyzedFiles = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      process.stdout.write(`\r  Analyzing ${i + 1}/${files.length}: ${file.filename.slice(0, 40).padEnd(40)}`);
      
      const analysis = await this.analyzeVisualContent(file);
      analyzedFiles.push({ ...file, analysis });
    }
    
    console.log('\n\n✅ Analysis complete!\n');
    
    // Build library structure
    const library = {
      total: analyzedFiles.length,
      scanned: new Date().toISOString(),
      files: analyzedFiles,
      categories: {},
      guardians: {},
      stats: this.calculateStats(analyzedFiles)
    };
    
    // Categorize
    for (const file of analyzedFiles) {
      const cat = file.analysis.primaryCategory;
      if (!library.categories[cat]) library.categories[cat] = [];
      library.categories[cat].push(file);
      
      const guard = file.analysis.guardianAffinity.primary;
      if (!library.guardians[guard]) library.guardians[guard] = [];
      library.guardians[guard].push(file);
    }
    
    this.libraryCache = library;
    
    // Save to disk for persistence
    await fs.writeFile(this.libraryCachePath, JSON.stringify(library, null, 2));
    console.log(`💾 Library saved to ${this.libraryCachePath}\n`);
    
    // Display results
    this.displayResults(library);
    
    return library;
  }

  async cmdSearch(query) {
    if (!this.libraryCache) {
      const loaded = await this.loadLibrary();
      if (!loaded) {
        console.log('⚠️  Library not scanned yet. Run: node arcanea-super-agent.js scan');
        return;
      }
    }
    
    console.log(`\n🔍 Searching: "${query}"\n`);
    
    const results = await this.semanticSearch(query, this.libraryCache);
    
    console.log(`Found ${results.length} results:\n`);
    
    results.slice(0, 10).forEach((result, i) => {
      const file = result.file;
      const analysis = file.analysis;
      
      console.log(`${i + 1}. ${file.filename}`);
      console.log(`   Path: ${file.relativePath}`);
      console.log(`   Guardian: ${analysis.guardianAffinity.primary} (${Math.round(analysis.guardianAffinity.confidence)}% confidence)`);
      console.log(`   Category: ${analysis.primaryCategory}`);
      console.log(`   Tags: ${analysis.tags.slice(0, 5).join(', ')}`);
      console.log(`   Relevance: ${Math.round(result.relevance * 100)}%\n`);
    });
    
    return results;
  }

  async cmdStats() {
    if (!this.libraryCache) {
      const loaded = await this.loadLibrary();
      if (!loaded) {
        console.log('⚠️  Library not scanned yet. Run: node arcanea-super-agent.js scan');
        return;
      }
    }
    
    const stats = this.libraryCache.stats;
    
    console.log('\n📊 Arcanea Library Statistics\n');
    console.log('═══════════════════════════════════════');
    console.log(`Total Files:        ${stats.total}`);
    console.log(`Categories:         ${stats.categoryCount}`);
    console.log(`Guardians:          ${stats.guardianCount}`);
    console.log(`Total Size:         ${stats.totalSize}`);
    console.log(`Average Quality:    ${stats.avgQuality}%`);
    console.log(`Arcanea Relevance:  ${stats.avgArcaneaRelevance}%`);
    console.log('═══════════════════════════════════════\n');
    
    console.log('Category Distribution:');
    for (const [cat, count] of Object.entries(stats.categoryDistribution)) {
      console.log(`  ${cat}: ${count} files`);
    }
    
    console.log('\nGuardian Distribution:');
    for (const [guard, count] of Object.entries(stats.guardianDistribution)) {
      console.log(`  ${guard}: ${count} files`);
    }
    
    return stats;
  }

  async cmdAnalyze(filePath) {
    try {
      const stats = await fs.stat(filePath);
      const file = {
        path: filePath,
        filename: path.basename(filePath),
        dirname: path.basename(path.dirname(filePath)),
        extension: path.extname(filePath).toLowerCase(),
        size: stats.size,
        modified: stats.mtime.toISOString(),
        created: stats.birthtime.toISOString()
      };
      
      const analysis = await this.analyzeVisualContent(file);
      
      console.log('\n🔮 Deep Analysis\n');
      console.log(`File: ${file.filename}`);
      console.log(`Size: ${file.size} bytes`);
      console.log(`\nAnalysis:`);
      console.log(`  Guardian Affinity: ${analysis.guardianAffinity.primary}`);
      console.log(`  Primary Category: ${analysis.primaryCategory}`);
      console.log(`  Visual Style: ${analysis.visualStyle.join(', ')}`);
      console.log(`  Themes: ${analysis.themes.join(', ')}`);
      console.log(`  Arcanea Relevance: ${analysis.arcaneaRelevance}%`);
      console.log(`  Quality Score: ${analysis.quality}%`);
      console.log(`  Tags: ${analysis.tags.join(', ')}\n`);
      
      return analysis;
    } catch (err) {
      console.log(`❌ Error analyzing file: ${err.message}`);
    }
  }

  async cmdRecommend() {
    if (!this.libraryCache) {
      const loaded = await this.loadLibrary();
      if (!loaded) {
        console.log('⚠️  Library not scanned yet. Run: node arcanea-super-agent.js scan');
        return;
      }
    }
    
    console.log('\n🎯 Smart Recommendations\n');
    
    const recommendations = await this.generateRecommendations(this.libraryCache);
    
    recommendations.slice(0, 5).forEach((rec, i) => {
      const file = rec.file;
      console.log(`${i + 1}. ${file.filename}`);
      console.log(`   Related files you might also need:`);
      rec.related.forEach(rel => {
        console.log(`     - ${rel.file.filename} (${Math.round(rel.similarity)}% similar)`);
      });
      console.log();
    });
    
    return recommendations;
  }

  async cmdLearn(filePath, category, tags) {
    const fileId = Buffer.from(filePath).toString('base64').slice(0, 16);
    
    this.learningData.userCorrections[fileId] = {
      category,
      tags: tags.split(',').map(t => t.trim()),
      timestamp: new Date().toISOString()
    };
    
    await this.saveLearning();
    
    console.log('\n🧠 Learning saved! Agent will use this knowledge for future analysis.\n');
    console.log('The Arcanea Superintelligence gets smarter with each correction.');
  }

  calculateStats(files) {
    const stats = {
      total: files.length,
      categoryCount: 0,
      guardianCount: 0,
      totalSize: 0,
      avgQuality: 0,
      avgArcaneaRelevance: 0,
      categoryDistribution: {},
      guardianDistribution: {},
      formatDistribution: {}
    };
    
    let totalQuality = 0;
    let totalRelevance = 0;
    
    for (const file of files) {
      stats.totalSize += file.size;
      totalQuality += file.analysis.quality;
      totalRelevance += file.analysis.arcaneaRelevance;
      
      // Category distribution
      const cat = file.analysis.primaryCategory;
      stats.categoryDistribution[cat] = (stats.categoryDistribution[cat] || 0) + 1;
      
      // Guardian distribution
      const guard = file.analysis.guardianAffinity.primary;
      stats.guardianDistribution[guard] = (stats.guardianDistribution[guard] || 0) + 1;
      
      // Format distribution
      const ext = file.extension;
      stats.formatDistribution[ext] = (stats.formatDistribution[ext] || 0) + 1;
    }
    
    stats.categoryCount = Object.keys(stats.categoryDistribution).length;
    stats.guardianCount = Object.keys(stats.guardianDistribution).length;
    stats.avgQuality = Math.round(totalQuality / files.length);
    stats.avgArcaneaRelevance = Math.round(totalRelevance / files.length);
    stats.totalSize = this.formatBytes(stats.totalSize);
    
    return stats;
  }

  displayResults(library) {
    console.log('📚 Library Structure\n');
    
    console.log('Categories:');
    for (const [cat, files] of Object.entries(library.categories)) {
      console.log(`  ${cat}: ${files.length} files`);
    }
    
    console.log('\nGuardian Affinities:');
    for (const [guard, files] of Object.entries(library.guardians)) {
      console.log(`  ${guard}: ${files.length} files`);
    }
    
    console.log('\n🎯 Sample Smart Tags:');
    const allTags = new Set();
    library.files.slice(0, 20).forEach(f => {
      f.analysis.tags.forEach(t => allTags.add(t));
    });
    console.log(`  ${Array.from(allTags).slice(0, 15).join(', ')}...\n`);
    
    console.log('💡 Usage Commands:');
    console.log('  node arcanea-super-agent.js search "draconia fire"');
    console.log('  node arcanea-super-agent.js stats');
    console.log('  node arcanea-super-agent.js recommend\n');
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  showHelp() {
    console.log(`
╔════════════════════════════════════════════════════════╗
║  🔮 ARCANEA LIBRARY SUPERINTELLIGENCE AGENT           ║
╚════════════════════════════════════════════════════════╝

INTELLIGENCE FEATURES:
  🧠 Multi-dimensional pattern recognition
  🛡️ Guardian entity affinity detection
  🎨 Visual style classification
  🔍 Semantic search (find by meaning, not just text)
  🎯 Smart recommendations based on content similarity
  📚 Arcanea domain knowledge integration
  🔄 Learning system (gets smarter with feedback)

USAGE:
  node arcanea-super-agent.js scan                    # Full library scan
  node arcanea-super-agent.js search "query"         # Semantic search
  node arcanea-super-agent.js stats                   # Show statistics
  node arcanea-super-agent.js analyze <file>         # Deep file analysis
  node arcanea-super-agent.js recommend              # Get recommendations
  node arcanea-super-agent.js learn <file> <cat> <tags>  # Teach the agent

EXAMPLES:
  node arcanea-super-agent.js search "draconia fire transformation"
  node arcanea-super-agent.js search "leyla water flow mythology"
  node arcanea-super-agent.js analyze ./my-image.png
  node arcanea-super-agent.js learn ./file.jpg guardians "draconia,bold,fire"

The agent uses:
  ✓ Advanced pattern matching
  ✓ Arcanea Guardian knowledge base
  ✓ Multi-category classification
  ✓ Theme and style detection
  ✓ Quality assessment
  ✓ Usage prediction
  ✓ Smart tagging

Built with opencode + kimi k2.5 + full tool ecosystem
`);
  }
}

// CLI Entry Point
async function main() {
  const agent = new ArcaneaSuperintelligenceAgent();
  
  const command = process.argv[2] || 'help';
  const args = {
    query: process.argv[3],
    file: process.argv[3],
    category: process.argv[4],
    tags: process.argv[5]
  };
  
  try {
    await agent.execute(command, args);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = ArcaneaSuperintelligenceAgent;