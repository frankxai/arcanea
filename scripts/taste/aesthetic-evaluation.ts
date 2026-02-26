/**
 * Arcanea Aesthetic Evaluation Framework
 *
 * "Taste" - the learned judgment of what fits Arcanea's visual identity
 * This is NOT subjective - it's a structured evaluation system
 * based on the Design Bible and Canon
 */

import type { PageImageRequirement } from "./website-image-requirements.js";

// ═══════════════════════════════════════════════════════════════════
// EVALUATION DIMENSIONS
// ═══════════════════════════════════════════════════════════════════

export interface EvaluationScore {
  dimension: string;
  score: number; // 0-100
  weight: number; // How much this matters for final score
  reasoning: string;
  evidence: string[]; // What in the image supports this
}

export interface ImageEvaluation {
  imageId: string;
  imagePath: string;
  suggestedName: string;
  guardian?: string;

  // Scores
  overallScore: number;
  dimensions: EvaluationScore[];

  // Recommendations
  recommendedPages: {
    page: string;
    url: string;
    fitScore: number;
    reasoning: string;
  }[];

  qualityTier: "hero" | "gallery" | "thumbnail" | "rejected";

  // Processing decisions
  decisions: {
    action: "approve" | "reject" | "needs-review" | "needs-editing";
    priority: 1 | 2 | 3;
    reason: string;
  };

  // Self-learning data
  trainingData: {
    positiveSignals: string[];
    negativeSignals: string[];
    ambiguityNotes: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════
// AESTHETIC CRITERIA (THE "TASTE")
// ═══════════════════════════════════════════════════════════════════

export const AESTHETIC_CRITERIA = {
  /**
   * DIMENSION 1: CANON ALIGNMENT (Weight: 25%)
   * Does the image match Arcanea's mythology and lore?
   */
  canonAlignment: {
    weight: 25,
    criteria: [
      {
        element: "Guardian Identity",
        check:
          "Does the image clearly represent the correct Guardian or Godbeast?",
        keywords: {
          draconia: ["dragon", "fire", "wings", "scale", "draconis"],
          alera: ["otome", "music", "sound", "voice", "melodic"],
          elara: ["unicorn", "transformation", "shift", "vaelith"],
          lyssandria: ["tree", "roots", "earth", "forest", "kaelith"],
          lyria: ["vision", "eye", "sight", "intuition", "yumiko"],
          maylinn: ["deer", "heart", "laeylinn", "wind", "healing"],
          leyla: ["phoenix", "water", "veloura", "flow", "creativity"],
          aiyami: ["sun", "sol", "crown", "light", "radiant"],
          ino: ["kyuro", "partnership", "connection", "unity"],
          shinkami: ["amaterasu", "void", "source", "spirit", "meta"],
        },
        scoreRange: [0, 25],
      },
      {
        element: "Elemental Authenticity",
        check: "Does the color palette match the correct element?",
        elementalColors: {
          fire: ["#ff6b35", "#ff8c5a", "#d94e1f", "red", "orange", "gold"],
          water: ["#78a6ff", "#9dbfff", "#5a8ce6", "blue", "silver", "crystal"],
          earth: ["#8b7355", "#a89070", "#6e5940", "green", "brown", "stone"],
          wind: ["#00ff88", "#33ffaa", "#00cc6d", "white", "silver", "air"],
          void: ["#9966ff", "#b38cff", "#7a4dcc", "purple", "black", "cosmic"],
          crystal: ["#7fffd9", "#99ffe0", "#5ce6b8", "aquamarine", "diamond"],
        },
        scoreRange: [0, 25],
      },
      {
        element: "Frequency Resonance",
        check:
          "Does the image convey the emotional quality of the Gate frequency?",
        frequencyMoods: {
          "174": ["grounded", "ancient", "stable", "survival"],
          "285": ["fluid", "creative", "emotional", "flow"],
          "396": ["powerful", "fierce", "transformative", "courage"],
          "417": ["healing", "loving", "compassionate", "heart"],
          "528": ["truth", "expression", "clarity", "voice"],
          "639": ["intuition", "vision", "insight", "sight"],
          "741": ["enlightenment", "radiance", "awakening", "crown"],
          "852": ["transformation", "shift", "perspective", "change"],
          "963": ["unity", "connection", "partnership", "all"],
          "1111": ["transcendence", "meta", "void", "source"],
        },
        scoreRange: [0, 25],
      },
    ],
  },

  /**
   * DIMENSION 2: DESIGN SYSTEM COMPLIANCE (Weight: 25%)
   * Does the image fit Arcanea's visual language?
   */
  designCompliance: {
    weight: 25,
    criteria: [
      {
        element: "Color Harmony",
        check: "Do the colors follow the Cosmic Glass palette?",
        validTokens: [
          "#0b0e14",
          "#121826",
          "#1a2332",
          "#242f42", // cosmic
          "#8b5cf6",
          "#7fffd4",
          "#ffd700",
          "#78a6ff", // brand
          "#ff6b35",
          "#78a6ff",
          "#00ff88",
          "#9966ff", // elements
        ],
        scoreRange: [0, 25],
      },
      {
        element: "Visual Quality",
        check: "Is the image high resolution, well-composed?",
        checks: [
          "proper lighting",
          "no artifacts",
          "clean composition",
          "appropriate depth of field",
        ],
        scoreRange: [0, 25],
      },
      {
        element: "Style Consistency",
        check: "Does it match Arcanea style (cosmic, mystical, premium)?",
        positive: ["cosmic", "mystical", "ethereal", "premium", "elegant"],
        negative: ["flat", "generic", "clip-art", "overly-realistic"],
        scoreRange: [0, 25],
      },
    ],
  },

  /**
   * DIMENSION 3: EMOTIONAL IMPACT (Weight: 20%)
   * Does the image evoke the right feelings?
   */
  emotionalImpact: {
    weight: 20,
    criteria: [
      {
        element: "Mood Appropriateness",
        check: "Does the image convey the intended mood for its target page?",
        scoreRange: [0, 33],
      },
      {
        element: "Visual Storytelling",
        check: "Does the image tell a story or convey meaning?",
        scoreRange: [0, 33],
      },
      {
        element: "Memorability",
        check: "Is the image distinctive and memorable?",
        scoreRange: [0, 34],
      },
    ],
  },

  /**
   * DIMENSION 4: TECHNICAL FIT (Weight: 15%)
   * Can the image technically serve its intended purpose?
   */
  technicalFit: {
    weight: 15,
    criteria: [
      {
        element: "Resolution Adequacy",
        check:
          "Is it suitable for hero (2400px), gallery (1200px), or thumb (320px)?",
        scoreRange: [0, 50],
      },
      {
        element: "Composition",
        check:
          "Is the subject well-positioned for cropping to required aspect ratios?",
        aspectRatios: ["1:1", "16:9", "4:3", "3:2", "2:1", "9:16"],
        scoreRange: [0, 50],
      },
    ],
  },

  /**
   * DIMENSION 5: UNIQUENESS (Weight: 15%)
   * Does this add value vs existing images?
   */
  uniqueness: {
    weight: 15,
    criteria: [
      {
        element: "Novelty",
        check: "Does this image offer something new?",
        scoreRange: [0, 50],
      },
      {
        element: "Variety",
        check: "Does it provide a different angle/viewpoint?",
        scoreRange: [0, 50],
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
// EVALUATION ENGINE
// ═══════════════════════════════════════════════════════════════════

/**
 * Evaluate an image against the taste framework
 * Returns detailed scoring and recommendations
 */
export async function evaluateImage(
  imagePath: string,
  metadata: {
    suggestedName: string;
    guardian?: string;
    originalName: string;
    tags: string[];
    type: "image" | "video";
  },
  targetPages?: PageImageRequirement[],
): Promise<ImageEvaluation> {
  // This would use vision AI in production
  // For now, returns the evaluation structure
  // The actual scoring happens when we have the image + AI vision

  const dimensions: EvaluationScore[] = [];

  // Calculate weighted overall score
  let totalWeight = 0;
  let weightedSum = 0;

  for (const [dimension, config] of Object.entries(AESTHETIC_CRITERIA)) {
    totalWeight += config.weight;
    // In production, this would call vision AI
    // For now, we return structure for later population
    dimensions.push({
      dimension,
      score: 0, // Will be populated by AI
      weight: config.weight,
      reasoning: "",
      evidence: [],
    });
  }

  const overallScore = weightedSum / totalWeight;

  // Determine quality tier
  let qualityTier: ImageEvaluation["qualityTier"] = "rejected";
  if (overallScore >= 80) qualityTier = "hero";
  else if (overallScore >= 60) qualityTier = "gallery";
  else if (overallScore >= 40) qualityTier = "thumbnail";

  return {
    imageId: metadata.suggestedName,
    imagePath,
    suggestedName: metadata.suggestedName,
    guardian: metadata.guardian,
    overallScore,
    dimensions,
    recommendedPages: [],
    qualityTier,
    decisions: {
      action:
        overallScore >= 60
          ? "approve"
          : overallScore >= 40
            ? "needs-review"
            : "reject",
      priority: overallScore >= 80 ? 1 : overallScore >= 60 ? 2 : 3,
      reason: "",
    },
    trainingData: {
      positiveSignals: [],
      negativeSignals: [],
      ambiguityNotes: [],
    },
  };
}

/**
 * Batch evaluate multiple images
 */
export async function evaluateBatch(
  images: Array<{ path: string; metadata: ImageEvaluation["imageId"] }>,
  targetPages?: PageImageRequirement[],
): Promise<ImageEvaluation[]> {
  const results = await Promise.all(
    images.map((img) =>
      evaluateImage(img.path, img.metadata as any, targetPages),
    ),
  );
  return results.sort((a, b) => b.overallScore - a.overallScore);
}

/**
 * Get evaluation summary statistics
 */
export function getEvaluationStats(evaluations: ImageEvaluation[]): {
  total: number;
  hero: number;
  gallery: number;
  thumbnail: number;
  rejected: number;
  averageScore: number;
  topScoring: ImageEvaluation[];
  needsReview: ImageEvaluation[];
} {
  return {
    total: evaluations.length,
    hero: evaluations.filter((e) => e.qualityTier === "hero").length,
    gallery: evaluations.filter((e) => e.qualityTier === "gallery").length,
    thumbnail: evaluations.filter((e) => e.qualityTier === "thumbnail").length,
    rejected: evaluations.filter((e) => e.qualityTier === "rejected").length,
    averageScore:
      evaluations.reduce((sum, e) => sum + e.overallScore, 0) /
      evaluations.length,
    topScoring: evaluations.slice(0, 10),
    needsReview: evaluations.filter(
      (e) => e.decisions.action === "needs-review",
    ),
  };
}
