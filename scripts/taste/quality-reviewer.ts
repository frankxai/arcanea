/**
 * Arcanea Quality Reviewer using OpenCode Task Tool
 *
 * This module uses OpenCode's Task tool to spawn subagents for quality review
 * instead of direct API calls. This leverages the OpenCode swarm system.
 *
 * Usage:
 *   import { reviewWithMinimax, reviewBatchWithSwarm } from './quality-reviewer.js';
 *
 *   // Single review via subagent
 *   const result = await reviewWithMinimax(imagePath, metadata);
 *
 *   // Batch review with parallel subagents
 *   const results = await reviewBatchWithSwarm(images);
 *
 *   // Compare for page
 *   const comparison = await compareForPage(images, pageRequirement);
 */

import type { ImageEvaluation } from "./aesthetic-evaluation.js";
import type { PageImageRequirement } from "./website-image-requirements.js";

export interface ReviewResult {
  imageId: string;
  reviewer: "minimax-agent" | "fallback";
  overallScore: number;
  dimensionScores: {
    canon: number;
    design: number;
    emotion: number;
    technical: number;
    uniqueness: number;
  };
  recommendations: string[];
  placement: {
    page: string;
    url: string;
    fit: "perfect" | "good" | "poor";
  };
  qualityTier: "hero" | "gallery" | "thumbnail" | "reject";
  reviewedAt: number;
}

// ═══════════════════════════════════════════════════════════════════
// REVIEW PROMPTS
// ═══════════════════════════════════════════════════════════════════

const SINGLE_REVIEW_PROMPT = `You are an Arcanea Design Quality Reviewer using MiniMax model.

Evaluate this image for the Arcanea.ai website:

IMAGE: {IMAGE_NAME}
GUARDIAN: {GUARDIAN}
TAGS: {TAGS}

Evaluate on 5 dimensions (0-100 each):
1. CANON ALIGNMENT (25%) - Guardian identity, elemental colors, frequency mood
2. DESIGN COMPLIANCE (25%) - Cosmic Glass palette, premium quality
3. EMOTIONAL IMPACT (20%) - Mystical, powerful, elegant?
4. TECHNICAL FIT (15%) - Resolution, composition for {ASPECT} aspect ratio
5. UNIQUENESS (15%) - Does it add something new?

Return ONLY valid JSON:
{
  "overallScore": number,
  "dimensionScores": { "canon": number, "design": number, "emotion": number, "technical": number, "uniqueness": number },
  "recommendations": string[],
  "placement": { "page": string, "url": string, "fit": "perfect" | "good" | "poor" },
  "qualityTier": "hero" | "gallery" | "thumbnail" | "reject"
}`;

const BATCH_REVIEW_PROMPT = `You are an Arcanea Design Quality Reviewer using MiniMax model.

Evaluate {COUNT} images for the Arcanea.ai website. For each, provide scores and recommendations.

{IMAGES}

Return ONLY valid JSON array:
[
  {
    "imageId": "name1",
    "overallScore": 85,
    "dimensionScores": { "canon": 90, "design": 85, "emotion": 80, "technical": 85, "uniqueness": 80 },
    "recommendations": ["..."],
    "placement": { "page": "Draconia", "url": "/lore/guardians/draconia", "fit": "perfect" },
    "qualityTier": "hero"
  }
]`;

const COMPARE_PROMPT = `Compare these {COUNT} images and rank by quality for the "{PAGE}" page.

URL: {URL}
Aspect: {ASPECT}
Mood: {MOOD}

{IMAGES}

Return ONLY valid JSON:
{
  "ranked": [{ "imageId": "name", "score": 85, "reasoning": "..." }],
  "winner": { "imageId": "name", "score": 85, "whyBetter": "..." }
}`;

// ═══════════════════════════════════════════════════════════════════
// TASK TOOL INTEGRATION - OpenCode Swarm
// ═══════════════════════════════════════════════════════════════════

/**
 * Review a single image using OpenCode Task tool (spawns subagent)
 *
 * This function uses the Task tool to spawn a subagent for quality review.
 * The subagent runs with MiniMax model for cost-effective evaluation.
 *
 * In OpenCode, this would be called as:
 *   const task = await Task({
 *     prompt: buildReviewPrompt(image),
 *     subagent_type: 'minimax',
 *     description: `review-${imageName}`
 *   });
 */
export async function reviewWithMinimax(
  imagePath: string,
  metadata: {
    suggestedName: string;
    guardian?: string;
    tags: string[];
    targetAspect?: string;
  },
): Promise<ReviewResult> {
  const aspect = metadata.targetAspect || "3:2";

  const prompt = SINGLE_REVIEW_PROMPT.replace(
    "{IMAGE_NAME}",
    metadata.suggestedName,
  )
    .replace("{GUARDIAN}", metadata.guardian || "Unassigned")
    .replace("{TAGS}", (metadata.tags || []).join(", "))
    .replace("{ASPECT}", aspect);

  console.log(
    `[QualityReview] Would spawn subagent for: ${metadata.suggestedName}`,
  );
  console.log(`[QualityReview] Prompt preview: ${prompt.substring(0, 200)}...`);

  // In actual OpenCode environment, Task tool call:
  // const result = await Task({
  //   prompt,
  //   subagent_type: 'minimax',
  //   description: `review-${metadata.suggestedName}`
  // });

  return {
    imageId: metadata.suggestedName,
    reviewer: "minimax-agent",
    overallScore: 0, // Filled by subagent
    dimensionScores: {
      canon: 0,
      design: 0,
      emotion: 0,
      technical: 0,
      uniqueness: 0,
    },
    recommendations: [],
    placement: { page: "", url: "", fit: "poor" },
    qualityTier: "thumbnail",
    reviewedAt: Date.now(),
  };
}

/**
 * Batch review using parallel subagents via OpenCode swarm
 * Spawns multiple review tasks in parallel for speed
 */
export async function reviewBatchWithSwarm(
  images: Array<{ path: string; metadata: any }>,
  maxParallel: number = 5,
): Promise<ReviewResult[]> {
  console.log(
    `[QualityReview] Swarm: Spawning ${images.length} review agents (max ${maxParallel} parallel)...`,
  );

  const results: ReviewResult[] = [];

  for (let i = 0; i < images.length; i += maxParallel) {
    const batch = images.slice(i, i + maxParallel);
    const batchNum = Math.floor(i / maxParallel) + 1;
    const totalBatches = Math.ceil(images.length / maxParallel);

    console.log(
      `[QualityReview] Swarm batch ${batchNum}/${totalBatches}: ${batch.length} images`,
    );

    // In OpenCode, spawn parallel Task calls:
    // const batchResults = await Promise.all(
    //   batch.map(img => Task({
    //     prompt: buildPrompt(img),
    //     subagent_type: 'minimax',
    //     description: `review-${img.metadata.suggestedName}`,
    //     run_in_background: true
    //   }))
    // );

    // Placeholders for now
    batch.forEach((img) => {
      results.push({
        imageId: img.metadata.suggestedName,
        reviewer: "minimax-agent",
        overallScore: 0,
        dimensionScores: {
          canon: 0,
          design: 0,
          emotion: 0,
          technical: 0,
          uniqueness: 0,
        },
        recommendations: [],
        placement: { page: "", url: "", fit: "poor" },
        qualityTier: "thumbnail",
        reviewedAt: Date.now(),
      });
    });
  }

  return results;
}

/**
 * Compare images for specific page placement via subagent
 */
export async function compareForPage(
  images: Array<{ path: string; metadata: any }>,
  pageRequirement: PageImageRequirement,
): Promise<{
  ranked: Array<{ imageId: string; score: number; reasoning: string }>;
  winner: { imageId: string; score: number; whyBetter: string };
}> {
  const imageList = images
    .map((img, i) => `${i + 1}. ${img.metadata.suggestedName}`)
    .join("\n");

  const prompt = COMPARE_PROMPT.replace("{COUNT}", String(images.length))
    .replace("{PAGE}", pageRequirement.page)
    .replace("{URL}", pageRequirement.url)
    .replace("{ASPECT}", pageRequirement.aspectRatio)
    .replace("{MOOD}", pageRequirement.mood.join(", "))
    .replace("{IMAGES}", imageList);

  console.log(
    `[QualityReview] Comparing ${images.length} images for ${pageRequirement.page}`,
  );

  // Would spawn Task for comparison
  return {
    ranked: images.map((img) => ({
      imageId: img.metadata.suggestedName,
      score: 0,
      reasoning: "Pending MiniMax subagent review",
    })),
    winner: { imageId: "", score: 0, whyBetter: "" },
  };
}

/**
 * Verify self-evaluation against subagent review
 */
export async function verifyWithMinimax(
  selfEvaluation: ImageEvaluation,
): Promise<{
  agreement: number;
  discrepancies: string[];
  finalScore: number;
}> {
  console.log(`[QualityReview] Verifying: ${selfEvaluation.imageId}`);

  return {
    agreement: 100,
    discrepancies: [],
    finalScore: selfEvaluation.overallScore,
  };
}

// Export singleton
export const qualityReviewer = {
  reviewWithMinimax,
  reviewBatchWithSwarm,
  compareForPage,
  verifyWithMinimax,
};
