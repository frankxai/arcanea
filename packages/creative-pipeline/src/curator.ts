import type {
  Asset,
  CurationScore,
  CurationResult,
  CurationCriteria,
} from './types.js';
import { GUARDIAN_CREATIVE_DOMAINS } from './types.js';

const DEFAULT_CRITERIA: CurationCriteria = {
  minQuality: 40,
  minAlignment: 40,
  requireGuardianFit: false,
  autoApproveThreshold: 75,
};

/**
 * Curator — Quality curation system for Arcanea assets.
 * Evaluates assets across quality, alignment, originality, and Guardian fit.
 */
export class Curator {
  private criteria: CurationCriteria = { ...DEFAULT_CRITERIA };
  private evaluatedCount = 0;
  private approvedCount = 0;
  private rejectedCount = 0;
  private totalScores = { quality: 0, alignment: 0, originality: 0, guardianFit: 0, overall: 0 };

  // ─── Configuration ──────────────────────────────────────────────────────

  setDefaultCriteria(criteria: CurationCriteria): void {
    this.criteria = { ...criteria };
  }

  getDefaultCriteria(): CurationCriteria {
    return { ...this.criteria };
  }

  // ─── Evaluation ─────────────────────────────────────────────────────────

  evaluate(asset: Asset, criteria?: CurationCriteria): CurationResult {
    const activeCriteria = criteria ?? this.criteria;
    const scores = this.scoreAsset(asset);
    const feedback = this.generateFeedback(asset, scores, activeCriteria);

    const meetsQuality = scores.quality >= activeCriteria.minQuality;
    const meetsAlignment = scores.alignment >= activeCriteria.minAlignment;
    const meetsGuardianFit = !activeCriteria.requireGuardianFit || scores.guardianFit >= 50;
    const autoApproved = scores.overall >= activeCriteria.autoApproveThreshold;

    const approved = autoApproved || (meetsQuality && meetsAlignment && meetsGuardianFit);

    const curatorGuardian = asset.guardianId ?? 'lyria'; // Lyria is the default curator (Sight)

    const result: CurationResult = {
      assetId: asset.id,
      scores,
      feedback,
      approved,
      curatorGuardian,
    };

    // Track stats
    this.evaluatedCount++;
    if (approved) this.approvedCount++;
    else this.rejectedCount++;
    this.totalScores.quality += scores.quality;
    this.totalScores.alignment += scores.alignment;
    this.totalScores.originality += scores.originality;
    this.totalScores.guardianFit += scores.guardianFit;
    this.totalScores.overall += scores.overall;

    return result;
  }

  batchEvaluate(assets: Asset[], criteria?: CurationCriteria): CurationResult[] {
    return assets.map((a) => this.evaluate(a, criteria));
  }

  getApproved(results: CurationResult[]): CurationResult[] {
    return results.filter((r) => r.approved);
  }

  getRejected(results: CurationResult[]): CurationResult[] {
    return results.filter((r) => !r.approved);
  }

  // ─── Stats ──────────────────────────────────────────────────────────────

  getStats(): {
    evaluated: number;
    approved: number;
    rejected: number;
    avgScores: { quality: number; alignment: number; originality: number; guardianFit: number; overall: number };
  } {
    const n = this.evaluatedCount || 1;
    return {
      evaluated: this.evaluatedCount,
      approved: this.approvedCount,
      rejected: this.rejectedCount,
      avgScores: {
        quality: Math.round(this.totalScores.quality / n),
        alignment: Math.round(this.totalScores.alignment / n),
        originality: Math.round(this.totalScores.originality / n),
        guardianFit: Math.round(this.totalScores.guardianFit / n),
        overall: Math.round(this.totalScores.overall / n),
      },
    };
  }

  // ─── Scoring Logic ──────────────────────────────────────────────────────

  private scoreAsset(asset: Asset): CurationScore {
    const quality = this.scoreQuality(asset);
    const alignment = this.scoreAlignment(asset);
    const originality = this.scoreOriginality(asset);
    const guardianFit = this.scoreGuardianFit(asset);

    // Weighted average: quality 30%, alignment 30%, originality 20%, guardianFit 20%
    const overall = Math.round(
      quality * 0.3 + alignment * 0.3 + originality * 0.2 + guardianFit * 0.2
    );

    return { quality, alignment, originality, guardianFit, overall };
  }

  private scoreQuality(asset: Asset): number {
    let score = 30; // base

    // Content length
    const contentLen = asset.content?.length ?? 0;
    if (contentLen > 500) score += 20;
    else if (contentLen > 100) score += 15;
    else if (contentLen > 20) score += 10;
    else if (contentLen > 0) score += 5;

    // Description completeness
    const descLen = asset.description?.length ?? 0;
    if (descLen > 100) score += 15;
    else if (descLen > 30) score += 10;
    else if (descLen > 0) score += 5;

    // Metadata presence
    if (asset.metadata && Object.keys(asset.metadata).length > 0) score += 10;

    // Tags
    if (asset.tags.length >= 3) score += 10;
    else if (asset.tags.length >= 1) score += 5;

    // Prompt recorded
    if (asset.promptUsed) score += 5;

    // Model recorded
    if (asset.model) score += 5;

    // Name quality
    if (asset.name.length > 5) score += 5;

    return Math.min(100, score);
  }

  private scoreAlignment(asset: Asset): number {
    let score = 20; // base

    // Has Guardian association
    if (asset.guardianId) score += 20;

    // Has element
    if (asset.element) score += 15;

    // Has gate
    if (asset.gate) score += 15;

    // Canon-compatible tags
    const canonTags = [
      'lumina', 'nero', 'guardian', 'godbeast', 'gate', 'element',
      'fire', 'water', 'earth', 'wind', 'void', 'spirit',
      'arcanea', 'mage', 'luminor', 'archmage', 'academy',
      'lore', 'chronicle', 'cosmic', 'divine',
    ];
    const tagMatches = asset.tags.filter((t) =>
      canonTags.some((ct) => t.toLowerCase().includes(ct))
    ).length;
    score += Math.min(20, tagMatches * 5);

    // Element consistency (if both guardian and element present)
    if (asset.guardianId && asset.element) score += 10;

    return Math.min(100, score);
  }

  private scoreOriginality(asset: Asset): number {
    let score = 40; // base

    // Description uniqueness (length as proxy)
    const descLen = asset.description?.length ?? 0;
    if (descLen > 200) score += 25;
    else if (descLen > 100) score += 20;
    else if (descLen > 50) score += 15;
    else if (descLen > 10) score += 10;

    // Has parentId means it's a variation (slightly less original)
    if (asset.parentId) score -= 10;

    // Unique tags boost
    if (asset.tags.length >= 5) score += 15;
    else if (asset.tags.length >= 3) score += 10;

    // Custom metadata
    if (asset.metadata && Object.keys(asset.metadata).length >= 3) score += 10;
    else if (asset.metadata && Object.keys(asset.metadata).length >= 1) score += 5;

    return Math.min(100, Math.max(0, score));
  }

  private scoreGuardianFit(asset: Asset): number {
    if (!asset.guardianId) return 50; // neutral if no guardian

    const domains = GUARDIAN_CREATIVE_DOMAINS[asset.guardianId];
    if (!domains) return 30; // unknown guardian

    let score = 30; // base for having a guardian

    // Check if tags match the guardian's creative domains
    const tagText = asset.tags.join(' ').toLowerCase();
    const descText = (asset.description ?? '').toLowerCase();
    const nameText = (asset.name ?? '').toLowerCase();
    const combined = `${tagText} ${descText} ${nameText}`;

    let domainMatches = 0;
    for (const domain of domains) {
      const domainWords = domain.toLowerCase().split(/[\s,]+/);
      for (const word of domainWords) {
        if (word.length > 2 && combined.includes(word)) {
          domainMatches++;
        }
      }
    }

    score += Math.min(50, domainMatches * 10);

    // Type alignment bonus
    if (asset.type === 'image' || asset.type === 'character' || asset.type === 'location') {
      score += 10;
    }

    // Element presence
    if (asset.element) score += 10;

    return Math.min(100, score);
  }

  private generateFeedback(
    asset: Asset,
    scores: CurationScore,
    criteria: CurationCriteria
  ): string[] {
    const feedback: string[] = [];

    if (scores.quality < criteria.minQuality) {
      feedback.push(`Quality score (${scores.quality}) is below minimum (${criteria.minQuality}). Add more content, metadata, and tags.`);
    }
    if (scores.alignment < criteria.minAlignment) {
      feedback.push(`Alignment score (${scores.alignment}) is below minimum (${criteria.minAlignment}). Include Guardian, Gate, and Element references.`);
    }
    if (criteria.requireGuardianFit && scores.guardianFit < 50) {
      feedback.push(`Guardian fit score (${scores.guardianFit}) is low. Ensure asset matches the Guardian's creative domain.`);
    }
    if (scores.originality < 40) {
      feedback.push(`Originality could be improved. Add a unique description and diverse tags.`);
    }
    if (!asset.guardianId) {
      feedback.push('Consider associating this asset with a Guardian for better curation.');
    }
    if (asset.tags.length < 3) {
      feedback.push('Add more tags (at least 3) for better discoverability.');
    }
    if (scores.overall >= criteria.autoApproveThreshold) {
      feedback.push('Excellent work! This asset meets the auto-approve threshold.');
    }

    return feedback;
  }
}
