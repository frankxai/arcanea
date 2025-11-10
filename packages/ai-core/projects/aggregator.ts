/**
 * Project Result Aggregator
 * Combines multiple AI generations into cohesive project deliverables
 */

import {
  ProjectFlowState,
  ProjectFlowResult,
  ProjectSummary,
  ProjectStats,
  ProjectBundle,
  BundleFile,
  GeneratedAsset,
  AssetType,
} from '../types/projects';

export class ProjectAggregator {
  /**
   * Aggregate project results into final deliverable
   */
  async aggregateResults(state: ProjectFlowState): Promise<ProjectFlowResult> {
    const summary = await this.generateSummary(state);
    const stats = this.calculateStats(state);
    const bundle = await this.createBundle(state);

    return {
      projectId: state.projectId,
      templateId: state.templateId,
      status: state.status,
      summary,
      assets: state.generatedAssets,
      stats,
      exportBundle: bundle,
    };
  }

  /**
   * Generate project summary
   */
  private async generateSummary(state: ProjectFlowState): Promise<ProjectSummary> {
    const title = this.generateTitle(state);
    const description = this.generateDescription(state);
    const keyFeatures = this.extractKeyFeatures(state);
    const highlights = this.extractHighlights(state);
    const completionMessage = this.generateCompletionMessage(state);

    return {
      title,
      description,
      keyFeatures,
      highlights,
      completionMessage,
    };
  }

  /**
   * Generate project title
   */
  private generateTitle(state: ProjectFlowState): string {
    const templateNames: Record<string, string> = {
      'character-design-v1': 'Character Design',
      'world-building-v1': 'World Building',
      'story-creation-v1': 'Story Creation',
      'music-composition-v1': 'Music Composition',
      'visual-series-v1': 'Visual Series',
    };

    const baseName = templateNames[state.templateId] || 'Creative Project';

    // Try to extract a custom name from collected data
    const customName =
      state.collectedData.characterName ||
      state.collectedData.worldName ||
      state.collectedData.storyTitle ||
      state.collectedData.songTitle ||
      state.collectedData.seriesTitle;

    return customName ? `${customName} - ${baseName}` : baseName;
  }

  /**
   * Generate project description
   */
  private generateDescription(state: ProjectFlowState): string {
    const assetCount = state.generatedAssets.length;
    const duration = Math.round(
      (new Date().getTime() - state.startedAt.getTime()) / 1000 / 60
    );

    const assetTypes = this.groupAssetsByType(state.generatedAssets);
    const assetSummary = Object.entries(assetTypes)
      .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`)
      .join(', ');

    return `Complete ${state.context.templateName} project with ${assetCount} generated assets (${assetSummary}). Created in ${duration} minutes through ${state.conversationHistory.length} collaborative interactions.`;
  }

  /**
   * Extract key features from project
   */
  private extractKeyFeatures(state: ProjectFlowState): string[] {
    const features: string[] = [];

    // Extract from collected data
    if (state.collectedData.characterType) {
      features.push(`Character Type: ${state.collectedData.characterType}`);
    }

    if (state.collectedData.genre) {
      features.push(`Genre: ${state.collectedData.genre}`);
    }

    if (state.collectedData.style) {
      features.push(`Style: ${state.collectedData.style}`);
    }

    if (state.collectedData.mood) {
      features.push(`Mood: ${state.collectedData.mood}`);
    }

    // Add asset counts
    const assetTypes = this.groupAssetsByType(state.generatedAssets);
    if (assetTypes.image) {
      features.push(`${assetTypes.image} Visual Asset${assetTypes.image > 1 ? 's' : ''}`);
    }
    if (assetTypes.music) {
      features.push(`${assetTypes.music} Music Track${assetTypes.music > 1 ? 's' : ''}`);
    }
    if (assetTypes.story || assetTypes.text) {
      const textCount = (assetTypes.story || 0) + (assetTypes.text || 0);
      features.push(`${textCount} Written Piece${textCount > 1 ? 's' : ''}`);
    }

    return features.slice(0, 5); // Limit to 5 key features
  }

  /**
   * Extract project highlights
   */
  private extractHighlights(state: ProjectFlowState): string[] {
    const highlights: string[] = [];

    // Highlight completed goals
    for (const goalId of state.completedGoals) {
      const goal = state.context.userGoals?.find(g => g === goalId);
      if (goal) {
        highlights.push(goal);
      }
    }

    // Highlight notable assets
    const premiumAssets = state.generatedAssets.filter(
      a => a.metadata?.quality === 'premium' || a.metadata?.featured
    );

    if (premiumAssets.length > 0) {
      highlights.push(`${premiumAssets.length} premium-quality asset${premiumAssets.length > 1 ? 's' : ''}`);
    }

    // Highlight unique elements
    if (state.collectedData.uniqueElements) {
      highlights.push(`Unique elements: ${state.collectedData.uniqueElements}`);
    }

    return highlights.slice(0, 5);
  }

  /**
   * Generate completion message
   */
  private generateCompletionMessage(state: ProjectFlowState): string {
    const assetCount = state.generatedAssets.length;
    const templateName = state.context.templateName;

    const messages = [
      `Congratulations! Your ${templateName} project is complete with ${assetCount} unique assets.`,
      `Amazing work! You've created a comprehensive ${templateName} with ${assetCount} generated elements.`,
      `Your ${templateName} is ready! ${assetCount} beautiful assets are waiting for you.`,
      `Project complete! Your ${templateName} features ${assetCount} AI-generated creations.`,
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  /**
   * Calculate project statistics
   */
  private calculateStats(state: ProjectFlowState): ProjectStats {
    const duration = state.completedAt
      ? Math.round(
          (state.completedAt.getTime() - state.startedAt.getTime()) / 1000 / 60
        )
      : Math.round((Date.now() - state.startedAt.getTime()) / 1000 / 60);

    const totalCost = state.generatedAssets.reduce(
      (sum, asset) => sum + (asset.cost || 0),
      0
    );

    const modelUsage: Record<string, number> = {};
    for (const asset of state.generatedAssets) {
      if (asset.model) {
        modelUsage[asset.model] = (modelUsage[asset.model] || 0) + 1;
      }
    }

    return {
      totalDuration: duration,
      totalSteps: state.totalSteps,
      assetsGenerated: state.generatedAssets.length,
      arcSpent: Math.round(totalCost * 100), // Convert to ARC points
      apiCostUsd: totalCost,
      modelUsage,
    };
  }

  /**
   * Create export bundle
   */
  private async createBundle(state: ProjectFlowState): Promise<ProjectBundle> {
    const files: BundleFile[] = [];
    const timestamp = new Date();

    // Add assets to bundle
    for (const asset of state.generatedAssets) {
      files.push(this.assetToBundleFile(asset));
    }

    // Add metadata file
    files.push({
      filename: 'project-metadata.json',
      type: 'application/json',
      content: JSON.stringify(
        {
          projectId: state.projectId,
          templateId: state.templateId,
          context: state.context,
          stats: this.calculateStats(state),
          createdAt: state.startedAt,
          completedAt: state.completedAt,
        },
        null,
        2
      ),
    });

    // Add README
    const readme = this.generateReadme(state);
    files.push({
      filename: 'README.md',
      type: 'text/markdown',
      content: readme,
    });

    return {
      files,
      readme,
      metadata: {
        projectId: state.projectId,
        templateId: state.templateId,
        version: '1.0',
        generatedBy: 'Arcanea AI',
      },
      timestamp,
    };
  }

  /**
   * Convert asset to bundle file
   */
  private assetToBundleFile(asset: GeneratedAsset): BundleFile {
    const extension = this.getFileExtension(asset.type);
    const filename = `${asset.type}-${asset.id}${extension}`;

    return {
      filename,
      type: this.getMimeType(asset.type),
      url: asset.url,
      content: asset.content,
      size: asset.metadata?.fileSize,
    };
  }

  /**
   * Generate README for bundle
   */
  private generateReadme(state: ProjectFlowState): string {
    const title = this.generateTitle(state);
    const description = this.generateDescription(state);
    const stats = this.calculateStats(state);

    const assetTypes = this.groupAssetsByType(state.generatedAssets);
    const assetList = Object.entries(assetTypes)
      .map(([type, count]) => `- **${this.capitalizeFirst(type)}**: ${count} file${count > 1 ? 's' : ''}`)
      .join('\n');

    return `# ${title}

${description}

## Project Overview

- **Template**: ${state.context.templateName}
- **Created**: ${state.startedAt.toLocaleDateString()}
- **Duration**: ${stats.totalDuration} minutes
- **Total Assets**: ${stats.assetsGenerated}

## Generated Assets

${assetList}

## Project Details

### Preferences
${Object.entries(state.context.preferences)
  .map(([key, value]) => `- **${this.capitalizeFirst(key)}**: ${value}`)
  .join('\n')}

### Goals Completed
${state.completedGoals.map(goal => `- ✅ ${goal}`).join('\n')}

## Files

This bundle contains all generated assets from your project. Each file is named according to its type and unique identifier.

## Usage

All assets in this bundle are yours to use according to Arcanea's creative license. You can:
- Use them in your personal or commercial projects
- Share them with others
- Remix and build upon them
- Export them to other platforms

---

*Generated by Arcanea AI - ${new Date().toISOString()}*
`;
  }

  /**
   * Group assets by type
   */
  private groupAssetsByType(assets: GeneratedAsset[]): Record<string, number> {
    const groups: Record<string, number> = {};

    for (const asset of assets) {
      const type = asset.type;
      groups[type] = (groups[type] || 0) + 1;
    }

    return groups;
  }

  /**
   * Get file extension for asset type
   */
  private getFileExtension(type: AssetType): string {
    const extensions: Record<string, string> = {
      image: '.png',
      music: '.mp3',
      video: '.mp4',
      text: '.txt',
      story: '.md',
      character: '.json',
      concept_art: '.png',
      world_map: '.png',
      timeline: '.json',
    };

    return extensions[type] || '.txt';
  }

  /**
   * Get MIME type for asset type
   */
  private getMimeType(type: AssetType): string {
    const mimeTypes: Record<string, string> = {
      image: 'image/png',
      music: 'audio/mpeg',
      video: 'video/mp4',
      text: 'text/plain',
      story: 'text/markdown',
      character: 'application/json',
      concept_art: 'image/png',
      world_map: 'image/png',
      timeline: 'application/json',
    };

    return mimeTypes[type] || 'application/octet-stream';
  }

  /**
   * Capitalize first letter
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Create showcase view
   */
  async createShowcase(state: ProjectFlowState): Promise<ProjectShowcase> {
    const summary = await this.generateSummary(state);
    const featuredAssets = this.selectFeaturedAssets(state.generatedAssets);

    return {
      title: summary.title,
      description: summary.description,
      coverImage: this.selectCoverImage(state.generatedAssets),
      featuredAssets,
      stats: this.calculateStats(state),
      tags: this.extractTags(state),
    };
  }

  /**
   * Select featured assets for showcase
   */
  private selectFeaturedAssets(assets: GeneratedAsset[]): GeneratedAsset[] {
    // Prioritize images, then music, then text
    const images = assets.filter(a => a.type === 'image' || a.type === 'concept_art');
    const music = assets.filter(a => a.type === 'music');
    const text = assets.filter(a => a.type === 'story' || a.type === 'text');

    const featured: GeneratedAsset[] = [];

    // Add up to 3 images
    featured.push(...images.slice(0, 3));

    // Add 1 music track
    if (music.length > 0) featured.push(music[0]);

    // Add 1 text piece if space
    if (featured.length < 5 && text.length > 0) {
      featured.push(text[0]);
    }

    return featured;
  }

  /**
   * Select cover image
   */
  private selectCoverImage(assets: GeneratedAsset[]): string | undefined {
    // Look for specific cover art
    const coverArt = assets.find(
      a => a.metadata?.isCover || a.metadata?.featured
    );
    if (coverArt?.url) return coverArt.url;

    // Fall back to first image
    const firstImage = assets.find(a => a.type === 'image' || a.type === 'concept_art');
    return firstImage?.url;
  }

  /**
   * Extract tags from project
   */
  private extractTags(state: ProjectFlowState): string[] {
    const tags = new Set<string>();

    // Add from context
    if (state.context.projectType) {
      tags.add(state.context.projectType);
    }

    // Add from preferences
    if (state.context.preferences.style) {
      tags.add(state.context.preferences.style);
    }
    if (state.context.preferences.mood) {
      tags.add(state.context.preferences.mood);
    }

    // Add from collected data
    if (state.collectedData.genre) {
      tags.add(state.collectedData.genre);
    }

    // Add asset types
    const assetTypes = this.groupAssetsByType(state.generatedAssets);
    for (const type of Object.keys(assetTypes)) {
      tags.add(type);
    }

    return Array.from(tags).slice(0, 10);
  }
}

export interface ProjectShowcase {
  title: string;
  description: string;
  coverImage?: string;
  featuredAssets: GeneratedAsset[];
  stats: ProjectStats;
  tags: string[];
}

// Create singleton instance
export const projectAggregator = new ProjectAggregator();
