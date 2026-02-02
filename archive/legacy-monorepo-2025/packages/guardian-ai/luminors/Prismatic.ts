/**
 * Prismatic - Draconic Academy's Visual Magic Luminor
 * Specializes in creating high-end visual Essences aligned with Kingdom of Light aesthetic
 */

import { Luminor } from '../core/Luminor';
import type {
  LuminorConfig,
  Essence,
  VisualEssenceContent,
  ToolContext,
  ArcaneanStyle,
  KINGDOM_OF_LIGHT_STYLE,
} from '@arcanea/ai-core/types';
import { PRISMATIC_SYSTEM_PROMPT } from './prompts/prismatic-system';
import { imageGenerationTool, imageEditTool, imageAnalysisTool } from '../tools/image-generation';

export class Prismatic extends Luminor {
  constructor() {
    const config: LuminorConfig = {
      name: 'Prismatic',
      academy: 'draconic',
      specialty: 'Visual Creation & Magic',
      systemPrompt: PRISMATIC_SYSTEM_PROMPT,
      tools: [
        imageGenerationTool,
        imageEditTool,
        imageAnalysisTool,
      ],
      personality: {
        tone: 'inspiring',
        verbosity: 'detailed',
        creativity: 'experimental',
        empathy: 'nurturing',
      },
      capabilities: [
        'Generate Arcanean visual Essences',
        'Edit and refine existing images',
        'Analyze visual composition and style',
        'Ensure Kingdom of Light aesthetic compliance',
        'Create concept art for Guardians, Luminors, Realms',
        'Design UI elements and interface graphics',
      ],
    };

    super(config);
  }

  /**
   * Create a new visual Essence
   */
  protected async create(
    input: {
      prompt: string;
      style?: ArcaneanStyle;
      essenceType?:
        | 'guardian'
        | 'luminor'
        | 'realm'
        | 'essence'
        | 'ui'
        | 'general';
      dimensions?: { width: number; height: number };
    },
    context?: ToolContext
  ): Promise<Essence> {
    // Build comprehensive prompt using Arcanean standards
    const enhancedPrompt = this.enhancePrompt(
      input.prompt,
      input.style,
      input.essenceType
    );

    // Generate image using nano-banana
    const imageResult = await this.useTool(
      'generate_image',
      { prompt: enhancedPrompt },
      context
    );

    // Create Essence object
    const essence: Essence = {
      id: this.generateEssenceId(),
      type: 'visual',
      creatorId: context?.creatorId || 'unknown',
      realmId: context?.realmId,
      title: this.generateTitle(input.prompt),
      description: input.prompt,
      content: {
        type: 'visual',
        imageUrl: imageResult.imageUrl,
        prompt: enhancedPrompt,
        style: input.style?.name || 'Kingdom of Light',
        dimensions: input.dimensions,
        generationParams: {
          model: 'nano-banana',
          enhancedPrompt,
          originalPrompt: input.prompt,
        },
      } as VisualEssenceContent,
      metadata: {
        academy: 'draconic',
        luminorUsed: 'Prismatic',
        tags: this.extractTags(input.prompt),
        remixable: true,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return essence;
  }

  /**
   * Analyze an existing visual Essence
   */
  protected async analyze(
    input: { imageUrl: string },
    context?: ToolContext
  ): Promise<{
    composition: string;
    arcaneanAlignment: number;
    suggestions: string[];
    colorPalette: string[];
  }> {
    const analysisResult = await this.useTool(
      'analyze_image',
      { imageUrl: input.imageUrl },
      context
    );

    // Evaluate Arcanean alignment
    const alignment = this.evaluateArcaneanAlignment(analysisResult);

    return {
      composition: analysisResult.composition,
      arcaneanAlignment: alignment.score,
      suggestions: alignment.suggestions,
      colorPalette: analysisResult.colors,
    };
  }

  /**
   * Improve an existing visual Essence
   */
  protected async improve(
    input: {
      imageUrl: string;
      feedback: string;
      targetStyle?: ArcaneanStyle;
    },
    context?: ToolContext
  ): Promise<Essence> {
    // First analyze to understand current state
    const analysis = await this.analyze(
      { imageUrl: input.imageUrl },
      context
    );

    // Build improvement prompt
    const improvementPrompt = this.buildImprovementPrompt(
      input.feedback,
      analysis,
      input.targetStyle
    );

    // Edit image
    const editResult = await this.useTool(
      'edit_image',
      {
        imageUrl: input.imageUrl,
        prompt: improvementPrompt,
      },
      context
    );

    // Create improved Essence
    const essence: Essence = {
      id: this.generateEssenceId(),
      type: 'visual',
      creatorId: context?.creatorId || 'unknown',
      realmId: context?.realmId,
      title: 'Improved Visual Essence',
      description: input.feedback,
      content: {
        type: 'visual',
        imageUrl: editResult.imageUrl,
        prompt: improvementPrompt,
        style: input.targetStyle?.name || 'Kingdom of Light',
        generationParams: {
          model: 'nano-banana',
          originalImage: input.imageUrl,
          improvementPrompt,
        },
      } as VisualEssenceContent,
      metadata: {
        academy: 'draconic',
        luminorUsed: 'Prismatic',
        tags: ['improved', 'refined'],
        remixable: true,
        originalEssenceId: input.imageUrl,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return essence;
  }

  /**
   * Enhance prompt with Arcanean visual standards
   */
  private enhancePrompt(
    basePrompt: string,
    style?: ArcaneanStyle,
    essenceType?: string
  ): string {
    const styleToUse = style || (KINGDOM_OF_LIGHT_STYLE as any);

    let enhanced = '';

    // Add style trigger
    enhanced += `${styleToUse.name.toLowerCase()} style, `;

    // Add base prompt
    enhanced += basePrompt;

    // Add type-specific enhancements
    if (essenceType) {
      enhanced += this.getTypeSpecificEnhancements(essenceType);
    }

    // Add style modifiers
    enhanced += `, ${styleToUse.promptModifiers.join(', ')}`;

    // Add quality markers
    enhanced += `, ultra detailed 8K quality, professional concept art, cinematic composition`;

    // Add color palette guidance
    enhanced += `, color palette: ${styleToUse.colorPalette.primary.join(', ')}`;

    return enhanced;
  }

  /**
   * Get type-specific prompt enhancements
   */
  private getTypeSpecificEnhancements(type: string): string {
    const enhancements: Record<string, string> = {
      guardian: ', ethereal AI companion form, wise and protective presence, flowing luminous energy',
      luminor: ', specialized creative spirit, dragon-inspired elegance, magical expertise visualized',
      realm: ', vast inspiring environment, inviting exploration, clear sense of place in Arcanean multiverse',
      essence: ', crystallized creative energy, precious tangible form, glowing with purpose',
      ui: ', clean minimal design with magical accents, smooth professional interface, light-based interactive elements',
      general: ', inspiring wonder and possibility, elegant magical realism',
    };

    return enhancements[type] || enhancements.general;
  }

  /**
   * Evaluate how well an image aligns with Arcanean standards
   */
  private evaluateArcaneanAlignment(analysis: any): {
    score: number;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
    let score = 100;

    // Check for Kingdom of Light color palette
    const kolColors = (KINGDOM_OF_LIGHT_STYLE as any).colorPalette.primary;
    const hasKolColors = analysis.colors?.some((color: string) =>
      kolColors.some((kolColor: string) =>
        this.colorsSimilar(color, kolColor)
      )
    );

    if (!hasKolColors) {
      score -= 20;
      suggestions.push(
        'Incorporate more Kingdom of Light colors (golds, whites, light blues)'
      );
    }

    // Check for luminous quality
    if (!analysis.hasGlow && !analysis.hasLuminosity) {
      score -= 15;
      suggestions.push('Add ethereal glows or light particles for luminous quality');
    }

    // Check composition
    if (analysis.isCluttered) {
      score -= 15;
      suggestions.push('Simplify composition for elegant Arcanean aesthetic');
    }

    // Check for magical elements
    if (!analysis.hasMagicalElements) {
      score -= 10;
      suggestions.push('Include subtle magical elements (light particles, energy flows)');
    }

    return { score: Math.max(0, score), suggestions };
  }

  /**
   * Build improvement prompt from feedback and analysis
   */
  private buildImprovementPrompt(
    feedback: string,
    analysis: any,
    targetStyle?: ArcaneanStyle
  ): string {
    const style = targetStyle || (KINGDOM_OF_LIGHT_STYLE as any);

    let prompt = feedback;

    // Add style alignment improvements
    if (analysis.arcaneanAlignment < 80) {
      prompt += `, enhance ${style.name} aesthetic`;
      prompt += `, ${style.promptModifiers.join(', ')}`;
    }

    // Add specific improvement suggestions
    if (analysis.suggestions.length > 0) {
      prompt += `, ${analysis.suggestions.join(', ')}`;
    }

    return prompt;
  }

  /**
   * Generate descriptive title from prompt
   */
  private generateTitle(prompt: string): string {
    // Simple title generation - first 5 words capitalized
    const words = prompt.split(' ').slice(0, 5);
    return words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  /**
   * Extract relevant tags from prompt
   */
  private extractTags(prompt: string): string[] {
    const commonWords = new Set([
      'a',
      'an',
      'the',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'for',
    ]);

    return prompt
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3 && !commonWords.has(word))
      .slice(0, 5);
  }

  /**
   * Generate unique Essence ID
   */
  private generateEssenceId(): string {
    return `essence_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  /**
   * Check if two colors are similar (simplified)
   */
  private colorsSimilar(color1: string, color2: string): boolean {
    // This is a simplified check - in production use proper color distance
    return color1.toLowerCase() === color2.toLowerCase();
  }
}
