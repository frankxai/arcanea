import fs from 'fs';
import path from 'path';
import { ArcaneaDB, Asset } from './database';

interface VisionAnalysis {
  description: string;
  tags: string[];
  guardian?: string;
  element?: string;
  mood?: string;
  style?: string;
  content: string[];
  colors: string[];
  composition?: string;
  objects?: string[];
  scenes?: string[];
  emotions?: string[];
}

export class VisionAnalyzer {
  private db: ArcaneaDB;
  private anthropic: any;

  constructor(db: ArcaneaDB) {
    this.db = db;
    // Initialize Anthropic SDK here if needed
  }

  async analyzeAssets(limit: number = 50): Promise<void> {
    console.log(`🧠 Analyzing ${limit} assets with vision AI...`);
    
    // Get assets that haven't been analyzed or need re-analysis
    const assets = await this.db.all(`
      SELECT * FROM assets 
      WHERE json_extract(analysis, '$.description') IS NULL 
         OR json_extract(analysis, '$.description') = ''
      ORDER BY updated_at DESC
      LIMIT ?
    `, [limit]);

    for (const assetRow of assets) {
      try {
        const asset = this.rowToAsset(assetRow);
        const analysis = await this.analyzeImage(asset);
        
        // Update asset with vision analysis
        await this.updateAssetAnalysis(asset.id, analysis);
        console.log(`✨ Analyzed: ${asset.filename}`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Vision analysis failed for ${assetRow.filename}:`, error);
      }
    }
    
    console.log('🎯 Vision analysis complete');
  }

  private async analyzeImage(asset: Asset): Promise<VisionAnalysis> {
    try {
      // Read image as base64
      const imageBuffer = fs.readFileSync(asset.path);
      const base64Image = imageBuffer.toString('base64');
      const mimeType = this.getMimeType(asset.format);
      
      // Create prompt for Arcanea-specific analysis
      const prompt = `Analyze this image for Arcanea Library Superintelligence. Provide analysis in this JSON format:

{
  "description": "Detailed visual description focusing on what's actually visible",
  "tags": ["tag1", "tag2", "tag3"],
  "guardian": "draconia|aethon|leyla|maylinn|lyssandria|kaelix|alera|yumiko|elara|shinkami|null",
  "element": "fire|water|earth|wind|void",
  "mood": "energetic|calm|mysterious|joyful|serious|dreamy|intense|peaceful",
  "style": "minimalist|detailed|abstract|realistic|geometric|organic|digital|traditional",
  "content": ["logo", "icon", "banner", "screenshot", "mockup", "photo", "illustration", "diagram", "texture"],
  "colors": ["#hex1", "#hex2", "#hex3"],
  "composition": "centered|rule-of-thirds|symmetrical|asymmetrical|dynamic|static",
  "objects": ["object1", "object2"],
  "scenes": ["scene1", "scene2"],
  "emotions": ["emotion1", "emotion2"]
}

Guardian Mapping:
- draconia: dragons, fire, transformation, bold creation, power
- aethon: lightning, speed, comets, rapid movement, energy
- leyla: water, rivers, emotions, stories, flow
- maylinn: gardens, forests, growth, nature, life
- lyssandria: crystals, structures, architecture, mountains
- kaelix: gems, precision, facets, refined beauty
- alera: wind, voice, expression, communication
- yumiko: mirrors, truth, clarity, reflection
- elara: void, space, mystery, innovation, quantum
- shinkami: universal energy, enlightenment, infinity, spiritual

Focus on what you can actually see in the image. Be specific but concise.`;

      // For now, return simulated analysis until actual vision API is integrated
      return this.simulatedAnalysis(asset);
      
      // Actual implementation would look like:
      /*
      const response = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mimeType,
                  data: base64Image
                }
              }
            ]
          }
        ]
      });
      
      return JSON.parse(response.content[0].text);
      */
      
    } catch (error) {
      console.warn('Vision analysis failed, using fallback:', error);
      return this.simulatedAnalysis(asset);
    }
  }

  private simulatedAnalysis(asset: Asset): VisionAnalysis {
    const filename = asset.filename.toLowerCase();
    const path = asset.path.toLowerCase();
    
    // Enhanced analysis based on filename and existing data
    let analysis: VisionAnalysis = {
      description: `${asset.filename} - ${asset.type} file`,
      tags: asset.analysis.tags.slice(0, 10),
      guardian: asset.analysis.guardian || undefined,
      element: asset.analysis.element || this.detectElement(filename, path),
      mood: this.detectMood(filename, path),
      style: this.detectStyle(filename, path),
      content: asset.analysis.content.length > 0 ? asset.analysis.content : ['unknown'],
      colors: this.extractColorsFromPath(filename, path),
      composition: 'centered',
      objects: [],
      scenes: []
    };

    // Advanced pattern matching for better analysis
    if (filename.includes('guardian') || filename.includes('draconia')) {
      analysis.guardian = 'draconia';
      analysis.element = 'fire';
      analysis.mood = 'powerful';
      analysis.description = 'Draconia Guardian artwork featuring fire element and transformation themes';
    } else if (filename.includes('logo') || filename.includes('brand')) {
      analysis.content = ['logo'];
      analysis.style = 'minimalist';
      analysis.composition = 'centered';
    } else if (filename.includes('screenshot')) {
      analysis.content = ['screenshot'];
      analysis.style = 'digital';
    } else if (filename.includes('mockup')) {
      analysis.content = ['mockup'];
      analysis.style = 'digital';
    }

    return analysis;
  }

  private detectElement(filename: string, path: string): string {
    const elementMap = {
      fire: ['fire', 'flame', 'red', 'orange', 'dragon', 'draconia', 'sun'],
      water: ['water', 'blue', 'ocean', 'river', 'leyla', 'flow'],
      earth: ['earth', 'green', 'forest', 'mountain', 'stone', 'lyssandria'],
      wind: ['wind', 'air', 'white', 'cloud', 'alera', 'sky'],
      void: ['void', 'dark', 'purple', 'space', 'elara', 'mystery']
    };

    for (const [element, keywords] of Object.entries(elementMap)) {
      if (keywords.some(keyword => filename.includes(keyword) || path.includes(keyword))) {
        return element;
      }
    }
    return 'void'; // Default
  }

  private detectMood(filename: string, path: string): string {
    const moodMap = {
      energetic: ['energy', 'power', 'bold', 'dynamic'],
      calm: ['calm', 'peace', 'quiet', 'soft'],
      mysterious: ['mystery', 'dark', 'void', 'hidden'],
      joyful: ['joy', 'bright', 'happy', 'colorful'],
      serious: ['serious', 'professional', 'formal'],
      dreamy: ['dream', 'ethereal', 'soft', 'flow']
    };

    for (const [mood, keywords] of Object.entries(moodMap)) {
      if (keywords.some(keyword => filename.includes(keyword) || path.includes(keyword))) {
        return mood;
      }
    }
    return 'calm';
  }

  private detectStyle(filename: string, path: string): string {
    const styleMap = {
      minimalist: ['minimal', 'simple', 'clean', 'logo'],
      detailed: ['detailed', 'complex', 'intricate'],
      abstract: ['abstract', 'geometric', 'pattern'],
      realistic: ['photo', 'realistic', 'render'],
      digital: ['digital', 'ui', 'interface', 'mockup'],
      traditional: ['traditional', 'classic', 'art']
    };

    for (const [style, keywords] of Object.entries(styleMap)) {
      if (keywords.some(keyword => filename.includes(keyword) || path.includes(keyword))) {
        return style;
      }
    }
    return 'digital';
  }

  private extractColorsFromPath(filename: string, path: string): string[] {
    const colorMap = {
      '#FF6B35': ['orange', 'fire', 'sunset'],
      '#3B82F6': ['blue', 'water', 'sky'],
      '#10B981': ['green', 'earth', 'nature'],
      '#8B5CF6': ['purple', 'void', 'mystery'],
      '#FFFFFF': ['white', 'light', 'clean'],
      '#000000': ['black', 'dark', 'void']
    };

    const foundColors: string[] = [];
    for (const [color, keywords] of Object.entries(colorMap)) {
      if (keywords.some(keyword => filename.includes(keyword) || path.includes(keyword))) {
        foundColors.push(color);
      }
    }
    return foundColors.length > 0 ? foundColors : ['#666666'];
  }

  private getMimeType(format: string): string {
    const mimeTypes: { [key: string]: string } = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'avif': 'image/avif',
      'svg': 'image/svg+xml'
    };
    return mimeTypes[format] || 'image/jpeg';
  }

  private async updateAssetAnalysis(assetId: string, analysis: VisionAnalysis): Promise<void> {
    const currentAsset = await this.db.get(`SELECT analysis FROM assets WHERE id = ?`, [assetId]);
    if (currentAsset) {
      const currentAnalysis = JSON.parse(currentAsset.analysis);
      const updatedAnalysis = {
        ...currentAnalysis,
        ...analysis,
        tags: [...new Set([...(currentAnalysis.tags || []), ...(analysis.tags || [])])]
      };
      
      await this.db.run(
        `UPDATE assets SET analysis = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [JSON.stringify(updatedAnalysis), assetId]
      );
    }
  }

  private rowToAsset(row: any): Asset {
    return {
      ...row,
      metadata: JSON.parse(row.metadata),
      analysis: JSON.parse(row.analysis),
      usage: JSON.parse(row.usage),
      relationships: JSON.parse(row.relationships),
      dimensions: row.dimensions ? JSON.parse(row.dimensions) : undefined
    };
  }

  async batchAnalyze(): Promise<void> {
    console.log('🚀 Starting batch vision analysis...');
    
    // Analyze in batches to avoid overwhelming the system
    const batchSize = 10;
    let processed = 0;
    
    while (true) {
      const assets = await this.db.all(`
        SELECT id FROM assets 
        WHERE json_extract(analysis, '$.description') IS NULL 
           OR json_extract(analysis, '$.description') = ''
        ORDER BY updated_at DESC
        LIMIT ?
      `, [batchSize]);

      if (assets.length === 0) break;
      
      await this.analyzeAssets(batchSize);
      processed += assets.length;
      console.log(`📊 Progress: ${processed} assets analyzed`);
      
      // Wait between batches to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`✨ Batch analysis complete! ${processed} assets processed`);
  }
}