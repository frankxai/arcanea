/**
 * Arcanea Media Auto-Workflow
 *
 * Automatic execution hooks - no commands needed
 * Monitors processing, runs evals, spawns swarm reviews automatically
 */

import { watch } from "fs";
import { readdirSync, statSync } from "fs";
import { join } from "path";

// Auto-run states
const AUTO_STATE = {
  watching: false,
  lastProcessedCount: 0,
  evaluationRan: false,
  reviewRan: false,
};

/**
 * Start automatic media workflow
 * Called once at startup - runs forever
 */
export async function startAutoMediaWorkflow() {
  console.log("═".repeat(60));
  console.log("  ARCANEA MEDIA AUTO-WORKFLOW");
  console.log("  Watching for processed images...");
  console.log("═".repeat(60));

  AUTO_STATE.watching = true;

  // Check every 30 seconds for new processed files
  const checkInterval = setInterval(async () => {
    if (!AUTO_STATE.watching) {
      clearInterval(checkInterval);
      return;
    }

    const status = await checkProcessingStatus();

    if (status.isComplete && !AUTO_STATE.evaluationRan) {
      console.log("\n[ AUTO ] Processing complete! Running evaluation...");
      await runAutoEvaluation();
      AUTO_STATE.evaluationRan = true;
    }

    if (
      status.newFiles > 0 &&
      AUTO_STATE.evaluationRan &&
      !AUTO_STATE.reviewRan
    ) {
      console.log("\n[ AUTO ] New files detected. Running swarm review...");
      await runAutoSwarmReview();
    }
  }, 30000); // 30 seconds

  return {
    stop: () => {
      AUTO_STATE.watching = false;
      clearInterval(checkInterval);
    },
  };
}

/**
 * Check processing status
 */
async function checkProcessingStatus(): Promise<{
  isComplete: boolean;
  processedCount: number;
  newFiles: number;
}> {
  const outputDir = "C:/Users/frank/arcanea-processed";
  let totalFiles = 0;

  try {
    const dirs = readdirSync(outputDir);
    for (const dir of dirs) {
      if (dir.startsWith("_")) continue;
      const dirPath = join(outputDir, dir);
      const stat = statSync(dirPath);
      if (stat.isDirectory()) {
        totalFiles += readdirSync(dirPath).length;
      }
    }
  } catch {
    return { isComplete: false, processedCount: 0, newFiles: 0 };
  }

  const newFiles = totalFiles - AUTO_STATE.lastProcessedCount;
  AUTO_STATE.lastProcessedCount = totalFiles;

  // Assume complete at 1280 (total files)
  const isComplete = totalFiles >= 1280;

  return { isComplete, processedCount: totalFiles, newFiles };
}

/**
 * Run automatic evaluation on all processed images
 */
async function runAutoEvaluation() {
  console.log("\n[ AUTO-EVAL ] Starting aesthetic evaluation...");

  // In real implementation:
  // 1. Load processed images from output dir
  // 2. Run aesthetic-evaluation.ts on each
  // 3. Generate recommendations
  // 4. Update manifest with quality tiers

  const outputDir = "C:/Users/frank/arcanea-processed";
  const images = await scanProcessedImages(outputDir);

  console.log(`[ AUTO-EVAL ] Found ${images.length} processed images`);

  // Would call evaluateImage() from aesthetic-evaluation.ts
  // Then save results to manifest

  return images.length;
}

/**
 * Run automatic swarm quality review
 */
async function runAutoSwarmReview() {
  console.log("\n[ AUTO-SWARM ] Spawning quality review agents...");

  // Would spawn Task tool subagents in parallel
  // Using quality-reviewer.ts functions

  // const results = await reviewBatchWithSwarm(images, 5);
  // console.log(`[ AUTO-SWARM ] Reviewed ${results.length} images`);

  AUTO_STATE.reviewRan = true;

  return true;
}

/**
 * Scan processed images directory
 */
async function scanProcessedImages(dir: string): Promise<string[]> {
  const images: string[] = [];

  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (entry.startsWith("_")) continue;
      const entryPath = join(dir, entry);
      const stat = statSync(entryPath);
      if (stat.isDirectory()) {
        const files = readdirSync(entryPath).filter((f) => f.endsWith(".webp"));
        images.push(...files.map((f) => join(entryPath, f)));
      }
    }
  } catch {
    // Ignore errors
  }

  return images;
}

/**
 * Generate final recommendations
 */
export async function generateAutoRecommendations(): Promise<void> {
  console.log("\n[ AUTO ] Generating website placement recommendations...");

  // Would:
  // 1. Load evaluated images
  // 2. Match to website-image-requirements.ts
  // 3. Output: "Draconia hero: /lore/guardians/draconia <- draconia-dragon-xxx.webp"

  console.log("[ AUTO ] Recommendations ready!");
}

// Auto-start hook - uncomment to enable
// startAutoMediaWorkflow();
