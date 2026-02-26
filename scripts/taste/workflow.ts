/**
 * Arcanea Media Curation Workflow
 *
 * Complete workflow: Scan → Process → Evaluate → Review → Recommend → Track
 *
 * Usage:
 *   import { runCurationWorkflow } from './workflow.js';
 *   await runCurationWorkflow({ sourceDir: 'G:/My Drive/Arcanea', dryRun: false });
 */

import {
  ImageEvaluation,
  evaluateImage,
  AESTHETIC_CRITERIA,
} from "./aesthetic-evaluation.js";
import {
  WEBSITE_IMAGE_REQUIREMENTS,
  getCriticalRequirements,
} from "./website-image-requirements.js";
import { tasteLearner, MediaTasteLearner } from "./self-learning.js";
import { qualityReviewer, ReviewResult } from "./quality-reviewer.js";

export interface WorkflowConfig {
  sourceDir: string;
  outputDir: string;
  dryRun: boolean;
  minScore?: number;
  reviewWithAI?: boolean;
}

export interface WorkflowResult {
  processed: number;
  approved: number;
  heroQuality: number;
  galleryQuality: number;
  needsReview: number;
  recommendations: Array<{
    image: string;
    page: string;
    placement: string;
    score: number;
  }>;
  learningStats: ReturnType<MediaTasteLearner["getStats"]>;
  reviewResults?: ReviewResult[];
}

/**
 * Main curation workflow
 */
export async function runCurationWorkflow(
  config: WorkflowConfig,
): Promise<WorkflowResult> {
  console.log("═".repeat(60));
  console.log("  ARCANEA MEDIA CURATION WORKFLOW");
  console.log("═".repeat(60));
  console.log(`Source: ${config.sourceDir}`);
  console.log(`Output: ${config.outputDir}`);
  console.log(`Mode: ${config.dryRun ? "DRY RUN" : "LIVE"}`);
  console.log("═".repeat(60));

  // Step 1: Get all processed images from output dir
  const processedImages = await getProcessedImages(config.outputDir);
  console.log(`\n[1/5] Found ${processedImages.length} processed images`);

  // Step 2: Evaluate each image
  console.log("\n[2/5] Evaluating images...");
  const evaluations: ImageEvaluation[] = [];

  for (const img of processedImages) {
    const eval = await evaluateImage(
      img.path,
      {
        suggestedName: img.name,
        guardian: img.guardian,
        originalName: img.originalName,
        tags: img.tags,
        type: img.type,
      },
      getCriticalRequirements(),
    );

    // Apply learned patterns
    const learnedScore = tasteLearner.scoreFromPatterns({
      guardian: img.guardian,
      composition: img.tags.join(","),
    });

    // Blend AI eval with learned patterns
    eval.overallScore = eval.overallScore * 0.7 + learnedScore * 0.3;

    evaluations.push(eval);
  }

  // Step 3: Quality review (MiniMax if configured)
  console.log("\n[3/5] Quality review...");
  let reviewResults: ReviewResult[] = [];

  if (config.reviewWithAI && !config.dryRun) {
    reviewResults = await qualityReviewer.batchReview(
      processedImages.map((img) => ({
        path: img.path,
        metadata: {
          suggestedName: img.name,
          guardian: img.guardian,
          tags: img.tags,
        },
      })),
    );
  }

  // Step 4: Generate recommendations
  console.log("\n[4/5] Generating recommendations...");
  const recommendations = generateRecommendations(
    evaluations,
    config.minScore || 60,
  );

  // Step 5: Update learning system
  console.log("\n[5/5] Updating taste learner...");
  for (const eval of evaluations) {
    tasteLearner.storeFeedback(eval);
  }

  // Summary
  const heroCount = evaluations.filter((e) => e.qualityTier === "hero").length;
  const galleryCount = evaluations.filter(
    (e) => e.qualityTier === "gallery",
  ).length;
  const reviewCount = evaluations.filter(
    (e) => e.decisions.action === "needs-review",
  ).length;

  console.log("\n" + "═".repeat(60));
  console.log("  RESULTS");
  console.log("═".repeat(60));
  console.log(`Total processed: ${processedImages.length}`);
  console.log(`Hero quality:    ${heroCount}`);
  console.log(`Gallery quality: ${galleryCount}`);
  console.log(`Needs review:    ${reviewCount}`);
  console.log(`Recommendations: ${recommendations.length}`);
  console.log("═".repeat(60));

  return {
    processed: processedImages.length,
    approved: heroCount + galleryCount,
    heroQuality: heroCount,
    galleryQuality: galleryCount,
    needsReview: reviewCount,
    recommendations,
    learningStats: tasteLearner.getStats(),
    reviewResults,
  };
}

/**
 * Generate page placement recommendations
 */
function generateRecommendations(
  evaluations: ImageEvaluation[],
  minScore: number,
): Array<{
  image: string;
  page: string;
  placement: string;
  score: number;
}> {
  const recommendations: Array<{
    image: string;
    page: string;
    placement: string;
    score: number;
  }> = [];

  for (const eval of evaluations) {
    if (eval.overallScore < minScore) continue;

    // Find best matching page
    for (const req of WEBSITE_IMAGE_REQUIREMENTS) {
      if (!eval.guardian) continue;

      // Check guardian match
      const guardianMatch = req.page
        .toLowerCase()
        .includes(eval.guardian.toLowerCase());

      if (guardianMatch && eval.overallScore >= 80) {
        recommendations.push({
          image: eval.imagePath,
          page: req.page,
          placement: req.placement,
          score: eval.overallScore,
        });
        break;
      }
    }
  }

  return recommendations.sort((a, b) => b.score - a.score);
}

/**
 * Get processed images from output directory
 */
async function getProcessedImages(outputDir: string): Promise<
  Array<{
    path: string;
    name: string;
    guardian?: string;
    originalName: string;
    tags: string[];
    type: "image" | "video";
  }>
> {
  // This would read from the processed directory
  // Placeholder - would use fs/directory reading
  return [];
}

/**
 * CLI entry point
 */
export async function main() {
  const args = process.argv.slice(2);
  const config: WorkflowConfig = {
    sourceDir:
      args[0] || process.env.ARCANEA_SOURCE_DIR || "G:/My Drive/Arcanea",
    outputDir:
      args[1] ||
      process.env.ARCANEA_OUTPUT_DIR ||
      "C:/Users/frank/arcanea-processed",
    dryRun: args.includes("--dry-run"),
    minScore: parseInt(
      args.find((a) => a.startsWith("--min-score="))?.split("=")[1] || "60",
    ),
    reviewWithAI: !args.includes("--no-ai-review"),
  };

  const result = await runCurationWorkflow(config);

  console.log("\n" + "═".repeat(60));
  console.log("  TOP RECOMMENDATIONS");
  console.log("═".repeat(60));

  for (const rec of result.recommendations.slice(0, 10)) {
    console.log(
      `${rec.score.toFixed(0).padStart(3)} | ${rec.page.padEnd(25)} | ${rec.image.split("/").pop()}`,
    );
  }

  return result;
}

// Run if called directly
// main();
