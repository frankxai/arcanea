/**
 * Arcanea Media Self-Learning System
 *
 * Learns from evaluation feedback to improve taste over time
 * Uses pattern recognition to identify what makes images successful
 */

import { ImageEvaluation } from "./aesthetic-evaluation.js";

interface LearningSignal {
  imageId: string;
  timestamp: number;
  signal: "positive" | "negative" | "neutral";
  context: {
    page?: string;
    placement?: string;
    engagement?: number;
    userFeedback?: string;
  };
  features: {
    colors?: string[];
    composition?: string;
    mood?: string[];
    guardian?: string;
    element?: string;
  };
}

interface LearnedPattern {
  feature: string;
  value: string;
  signalStrength: number; // -1 to 1
  sampleSize: number;
  lastUpdated: number;
}

export class MediaTasteLearner {
  private signals: LearningSignal[] = [];
  private patterns: Map<string, LearnedPattern> = new Map();
  private feedbackDb: Map<string, ImageEvaluation> = new Map();

  constructor() {
    // Load from persistent storage in production
  }

  /**
   * Record a learning signal from user feedback or engagement
   */
  recordSignal(signal: Omit<LearningSignal, "timestamp">): void {
    const fullSignal: LearningSignal = {
      ...signal,
      timestamp: Date.now(),
    };
    this.signals.push(fullSignal);
    this.updatePatterns(fullSignal);
  }

  /**
   * Update pattern weights based on new signal
   */
  private updatePatterns(signal: LearningSignal): void {
    const weight =
      signal.signal === "positive" ? 1 : signal.signal === "negative" ? -1 : 0;

    for (const [feature, value] of Object.entries(signal.features)) {
      const key = `${feature}:${value}`;
      const existing = this.patterns.get(key);

      if (existing) {
        // Running average
        const n = existing.sampleSize;
        existing.signalStrength =
          (existing.signalStrength * n + weight) / (n + 1);
        existing.sampleSize = n + 1;
        existing.lastUpdated = Date.now();
      } else {
        this.patterns.set(key, {
          feature,
          value,
          signalStrength: weight,
          sampleSize: 1,
          lastUpdated: Date.now(),
        });
      }
    }
  }

  /**
   * Get learned preferences for a feature
   */
  getPreferences(feature: string): Array<{ value: string; strength: number }> {
    const prefs: Array<{ value: string; strength: number }> = [];

    for (const [key, pattern] of this.patterns) {
      if (pattern.feature === feature) {
        prefs.push({ value: pattern.value, strength: pattern.signalStrength });
      }
    }

    return prefs.sort((a, b) => b.strength - a.strength);
  }

  /**
   * Score a new image based on learned patterns
   */
  scoreFromPatterns(features: LearningSignal["features"]): number {
    let totalScore = 50; // Start neutral
    let featureCount = 0;

    for (const [feature, value] of Object.entries(features)) {
      const key = `${feature}:${value}`;
      const pattern = this.patterns.get(key);

      if (pattern) {
        totalScore += pattern.signalStrength * 30; // Weight the learned signal
        featureCount++;
      }
    }

    // Normalize based on features found
    return featureCount > 0 ? totalScore : 50;
  }

  /**
   * Store evaluation feedback for training
   */
  storeFeedback(evaluation: ImageEvaluation): void {
    this.feedbackDb.set(evaluation.imageId, evaluation);

    // Convert to signal
    this.recordSignal({
      imageId: evaluation.imageId,
      signal:
        evaluation.qualityTier === "hero"
          ? "positive"
          : evaluation.qualityTier === "rejected"
            ? "negative"
            : "neutral",
      context: {
        page: evaluation.recommendedPages[0]?.page,
        placement: evaluation.recommendedPages[0]?.url,
      },
      features: {
        guardian: evaluation.guardian,
        composition: evaluation.dimensions.find(
          (d) => d.dimension === "designCompliance",
        )?.reasoning,
      },
    });
  }

  /**
   * Get improvement suggestions based on patterns
   */
  getSuggestions(): string[] {
    const suggestions: string[] = [];

    // Analyze negative patterns
    const negativePatterns = Array.from(this.patterns.values()).filter(
      (p) => p.signalStrength < -0.3 && p.sampleSize >= 3,
    );

    for (const pattern of negativePatterns) {
      suggestions.push(
        `Avoid ${pattern.value} ${pattern.feature} - ${pattern.sampleSize} negative signals`,
      );
    }

    // Analyze positive patterns
    const positivePatterns = Array.from(this.patterns.values()).filter(
      (p) => p.signalStrength > 0.3 && p.sampleSize >= 3,
    );

    for (const pattern of positivePatterns) {
      suggestions.push(
        `${pattern.value} ${pattern.feature} performs well - ${pattern.sampleSize} positive signals`,
      );
    }

    return suggestions;
  }

  /**
   * Export patterns for training data
   */
  exportTrainingData(): {
    patterns: LearnedPattern[];
    signalCount: number;
    exportDate: number;
  } {
    return {
      patterns: Array.from(this.patterns.values()),
      signalCount: this.signals.length,
      exportDate: Date.now(),
    };
  }

  /**
   * Get statistics
   */
  getStats(): {
    totalSignals: number;
    uniquePatterns: number;
    positivePatterns: number;
    negativePatterns: number;
  } {
    const patterns = Array.from(this.patterns.values());
    return {
      totalSignals: this.signals.length,
      uniquePatterns: patterns.length,
      positivePatterns: patterns.filter((p) => p.signalStrength > 0).length,
      negativePatterns: patterns.filter((p) => p.signalStrength < 0).length,
    };
  }
}

// Export singleton instance
export const tasteLearner = new MediaTasteLearner();
