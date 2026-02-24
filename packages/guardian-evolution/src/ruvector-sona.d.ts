/**
 * Type declarations for @ruvector/sona
 *
 * The actual WASM package is an optional peer dependency.
 * These declarations allow compilation without the package installed.
 */

declare module '@ruvector/sona' {
  export interface JsSonaConfig {
    hiddenDim: number;
    embeddingDim: number;
    microLoraRank: number;
    baseLoraRank: number;
    microLoraLr: number;
    baseLoraLr: number;
    ewcLambda: number;
    patternClusters: number;
    trajectoryCapacity: number;
    qualityThreshold: number;
    enableSimd: boolean;
    backgroundIntervalMs?: number;
  }

  export interface JsLearnedPattern {
    patternType: string;
    avgQuality: number;
    embedding: number[];
    count: number;
  }

  export class SonaEngine {
    static withConfig(config: JsSonaConfig): SonaEngine;
    beginTrajectory(queryEmbedding: number[]): number;
    addTrajectoryStep(
      trajectoryId: number,
      activations: number[],
      attentionWeights: number[],
      reward: number
    ): void;
    addTrajectoryContext(trajectoryId: number, context: string): void;
    endTrajectory(trajectoryId: number, quality: number): void;
    flush(): void;
    forceLearn(): string;
    tick(): string | null;
    applyMicroLora(input: number[]): number[];
    findPatterns(queryEmbedding: number[], k: number): JsLearnedPattern[];
    getStats(): string;
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
  }
}
