/**
 * Remix Detection and Attribution System
 * Tracks creative lineage and ensures fair ARC distribution
 */

import type {
  RemixChain,
  RemixNode,
  Attribution,
  ArcDistribution,
  Contributor,
  ArcShareRule
} from '../types';

export class RemixDetectionSystem {
  /**
   * Create a new remix chain for an original creation
   */
  createOriginalChain(creationId: string, creatorId: string): RemixChain {
    return {
      id: `chain_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      originalCreationId: creationId,
      remixes: [],
      totalGenerations: 0,
      createdAt: new Date(),
      lastRemixedAt: new Date()
    };
  }

  /**
   * Add a remix to the chain
   */
  addRemix(
    chain: RemixChain,
    remix: {
      creationId: string;
      creatorId: string;
      creatorName: string;
      parentId: string | null;
      remixType: 'variation' | 'extension' | 'transformation' | 'collaboration';
      changes: string[];
    }
  ): RemixChain {
    const node: RemixNode = {
      id: `remix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      creationId: remix.creationId,
      creatorId: remix.creatorId,
      creatorName: remix.creatorName,
      parentId: remix.parentId || chain.originalCreationId,
      children: [],
      remixType: remix.remixType,
      changes: remix.changes,
      arcDistribution: this.calculateArcDistribution(chain, remix),
      timestamp: new Date()
    };

    // Update parent's children
    if (remix.parentId) {
      const parent = chain.remixes.find(r => r.creationId === remix.parentId);
      if (parent) {
        parent.children.push(node.id);
      }
    }

    chain.remixes.push(node);
    chain.totalGenerations += 1;
    chain.lastRemixedAt = new Date();

    return chain;
  }

  /**
   * Calculate ARC distribution for a remix
   */
  private calculateArcDistribution(
    chain: RemixChain,
    remix: {
      creatorId: string;
      parentId: string | null;
      remixType: 'variation' | 'extension' | 'transformation' | 'collaboration';
    }
  ): ArcDistribution {
    // Base distribution rules
    const baseRules = {
      variation: { original: 30, parent: 10, creator: 55, platform: 5 },
      extension: { original: 20, parent: 20, creator: 55, platform: 5 },
      transformation: { original: 15, parent: 10, creator: 70, platform: 5 },
      collaboration: { original: 25, parent: 25, creator: 45, platform: 5 }
    };

    const rules = baseRules[remix.remixType];

    const distribution: ArcDistribution = {
      originalCreator: rules.original,
      remixers: {},
      platformFee: rules.platform
    };

    // Distribute to parent if not original
    if (remix.parentId && remix.parentId !== chain.originalCreationId) {
      const parent = chain.remixes.find(r => r.creationId === remix.parentId);
      if (parent) {
        distribution.remixers[parent.creatorId] = rules.parent;
      }
    }

    // Creator gets remaining percentage
    distribution.remixers[remix.creatorId] = rules.creator;

    return distribution;
  }

  /**
   * Generate full attribution for a creation
   */
  generateAttribution(
    chain: RemixChain,
    creationId: string,
    originalCreatorName: string
  ): Attribution {
    const node = chain.remixes.find(r => r.creationId === creationId);

    if (!node) {
      // This is the original
      return {
        originalCreator: {
          id: creationId,
          name: originalCreatorName,
          contribution: 'Original creation'
        },
        contributors: [],
        license: 'open',
        arcShareRules: [
          {
            creatorId: creationId,
            percentage: 100,
            type: 'fixed'
          }
        ]
      };
    }

    // Build contributor list from chain
    const contributors = this.buildContributorList(chain, node);

    // Generate ARC share rules
    const arcShareRules = this.generateArcShareRules(chain, node);

    return {
      originalCreator: {
        id: chain.originalCreationId,
        name: originalCreatorName,
        contribution: 'Original creation'
      },
      contributors,
      license: 'attribution',
      arcShareRules
    };
  }

  /**
   * Build contributor list
   */
  private buildContributorList(chain: RemixChain, node: RemixNode): Contributor[] {
    const contributors: Contributor[] = [];

    // Add current creator
    contributors.push({
      id: node.creatorId,
      name: node.creatorName,
      role: 'remixer',
      contribution: this.describeRemix(node.remixType, node.changes),
      timestamp: node.timestamp
    });

    // Walk up the chain to find all ancestors
    let currentNode: RemixNode | undefined = node;
    while (currentNode && currentNode.parentId) {
      const parent = chain.remixes.find(r => r.creationId === currentNode!.parentId);
      if (parent) {
        contributors.push({
          id: parent.creatorId,
          name: parent.creatorName,
          role: this.determineRole(parent, currentNode),
          contribution: this.describeRemix(parent.remixType, parent.changes),
          timestamp: parent.timestamp
        });
        currentNode = parent;
      } else {
        break;
      }
    }

    return contributors;
  }

  /**
   * Determine contributor role
   */
  private determineRole(
    contributor: RemixNode,
    child: RemixNode
  ): 'co-creator' | 'remixer' | 'inspiration' | 'collaborator' {
    if (contributor.remixType === 'collaboration') {
      return 'collaborator';
    }
    if (child.changes.some(c => c.includes('inspired by'))) {
      return 'inspiration';
    }
    if (contributor.remixType === 'variation') {
      return 'remixer';
    }
    return 'co-creator';
  }

  /**
   * Describe remix type
   */
  private describeRemix(type: string, changes: string[]): string {
    const descriptions = {
      variation: 'Created a variation with',
      extension: 'Extended the original with',
      transformation: 'Transformed the work with',
      collaboration: 'Collaborated by adding'
    };

    const base = descriptions[type as keyof typeof descriptions] || 'Modified with';
    return `${base} ${changes.slice(0, 2).join(' and ')}`;
  }

  /**
   * Generate ARC share rules
   */
  private generateArcShareRules(chain: RemixChain, node: RemixNode): ArcShareRule[] {
    const rules: ArcShareRule[] = [];

    // Original creator gets diminishing share
    const generation = this.calculateGeneration(chain, node);
    const originalShare = Math.max(5, 30 - (generation * 2));

    rules.push({
      creatorId: chain.originalCreationId,
      percentage: originalShare,
      type: 'diminishing'
    });

    // Parent creator gets fixed share
    if (node.parentId && node.parentId !== chain.originalCreationId) {
      const parent = chain.remixes.find(r => r.creationId === node.parentId);
      if (parent) {
        rules.push({
          creatorId: parent.creatorId,
          percentage: node.remixType === 'collaboration' ? 25 : 15,
          type: 'fixed'
        });
      }
    }

    // Current creator gets remainder
    const currentShare = 100 - rules.reduce((sum, r) => sum + r.percentage, 0) - 5; // 5% platform
    rules.push({
      creatorId: node.creatorId,
      percentage: currentShare,
      type: 'fixed'
    });

    return rules;
  }

  /**
   * Calculate generation depth
   */
  private calculateGeneration(chain: RemixChain, node: RemixNode): number {
    let generation = 0;
    let currentNode: RemixNode | undefined = node;

    while (currentNode && currentNode.parentId) {
      generation++;
      currentNode = chain.remixes.find(r => r.creationId === currentNode!.parentId);
    }

    return generation;
  }

  /**
   * Detect similarity between creations (for potential remix detection)
   */
  async detectSimilarity(
    creation1: {
      type: 'visual' | 'music' | 'story';
      content: string;
      metadata?: any;
    },
    creation2: {
      type: 'visual' | 'music' | 'story';
      content: string;
      metadata?: any;
    }
  ): Promise<{
    similarity: number; // 0-100
    likelyRemix: boolean;
    commonElements: string[];
  }> {
    // Type must match
    if (creation1.type !== creation2.type) {
      return {
        similarity: 0,
        likelyRemix: false,
        commonElements: []
      };
    }

    let similarity = 0;
    const commonElements: string[] = [];

    // Simple text-based similarity for now
    // In production, use proper embedding/ML models
    const words1 = new Set(creation1.content.toLowerCase().split(/\s+/));
    const words2 = new Set(creation2.content.toLowerCase().split(/\s+/));

    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);

    similarity = (intersection.size / union.size) * 100;

    if (similarity > 30) {
      commonElements.push(...Array.from(intersection).slice(0, 5));
    }

    return {
      similarity: Math.round(similarity),
      likelyRemix: similarity > 50,
      commonElements
    };
  }

  /**
   * Get remix chain stats
   */
  getChainStats(chain: RemixChain): {
    totalRemixes: number;
    generations: number;
    uniqueCreators: number;
    mostPopularBranch: string | null;
    arcDistributed: number;
  } {
    const uniqueCreators = new Set(chain.remixes.map(r => r.creatorId));

    // Find deepest branch
    let maxDepth = 0;
    let mostPopularBranch: string | null = null;

    chain.remixes.forEach(node => {
      const depth = this.calculateGeneration(chain, node);
      if (depth > maxDepth) {
        maxDepth = depth;
        mostPopularBranch = node.id;
      }
    });

    return {
      totalRemixes: chain.remixes.length,
      generations: maxDepth,
      uniqueCreators: uniqueCreators.size,
      mostPopularBranch,
      arcDistributed: chain.remixes.length * 100 // Placeholder calculation
    };
  }

  /**
   * Visualize remix chain as tree
   */
  visualizeChain(chain: RemixChain): string {
    const lines: string[] = [];
    lines.push(`Remix Chain: ${chain.id}`);
    lines.push(`Original: ${chain.originalCreationId}`);
    lines.push('');

    // Build tree
    const buildTree = (parentId: string, depth: number = 0) => {
      const children = chain.remixes.filter(r => r.parentId === parentId);

      children.forEach(child => {
        const indent = '  '.repeat(depth);
        lines.push(`${indent}├─ ${child.creatorName} (${child.remixType})`);
        buildTree(child.creationId, depth + 1);
      });
    };

    buildTree(chain.originalCreationId);

    return lines.join('\n');
  }
}

/**
 * Factory to create remix detection system
 */
export function createRemixDetection(): RemixDetectionSystem {
  return new RemixDetectionSystem();
}
