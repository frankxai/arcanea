// Deep Diagnosis - Sequential Thinking for Creative Blocks
// Inspired by Sequential Thinking MCP pattern

import { bestiary, BestiaryCreature } from "../data/bestiary/index.js";

interface ThoughtStep {
  phase: string;
  observation: string;
  insight: string;
}

interface DeepDiagnosisResult {
  approach: "quick" | "standard" | "deep";
  thinkingProcess: ThoughtStep[];
  primaryCreature: {
    name: string;
    type: string;
    description: string;
    confidence: number;
  };
  secondaryCreatures: Array<{
    name: string;
    likelihood: number;
    reason: string;
  }>;
  rootCause: string;
  gatesAffected: Array<{
    gate: number;
    name: string;
    how: string;
  }>;
  remedyPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  luminorRecommendation: {
    luminor: string;
    reason: string;
  };
  affirmation: string;
}

const gateNames = [
  "Foundation", "Flow", "Fire", "Heart", "Voice",
  "Sight", "Crown", "Shift", "Unity", "Source"
];

// Symptom patterns for deeper matching
const symptomPatterns: Record<string, {
  keywords: string[];
  relatedCreatures: string[];
  gatesAffected: number[];
  rootCauses: string[];
}> = {
  fear: {
    keywords: ["afraid", "scared", "terrified", "anxiety", "panic", "worry", "dread"],
    relatedCreatures: ["fear_of_judgment_phantom", "imposter_shade", "failure_phantom"],
    gatesAffected: [5, 3, 1],
    rootCauses: [
      "Fear of being seen and judged",
      "Past experiences of criticism or rejection",
      "Linking self-worth to creative output",
    ],
  },
  perfectionism: {
    keywords: ["perfect", "enough", "good enough", "polish", "revise", "never done", "flawed"],
    relatedCreatures: ["perfectionist_wyrm", "inner_critic_basilisk", "scope_creep_shapeshifter"],
    gatesAffected: [3, 5, 6],
    rootCauses: [
      "Fear of judgment disguised as high standards",
      "Procrastination through endless refinement",
      "Inability to define 'done'",
    ],
  },
  motivation: {
    keywords: ["motivation", "passion", "why", "purpose", "boring", "duty", "should", "have to"],
    relatedCreatures: ["burnout_phoenix", "shiny_object_sprite", "resistance_golem"],
    gatesAffected: [2, 3, 4],
    rootCauses: [
      "Lost connection to original creative spark",
      "Creating for external validation instead of joy",
      "Misalignment between work and values",
    ],
  },
  stuck: {
    keywords: ["stuck", "blocked", "can't", "unable", "frozen", "paralyzed", "nothing"],
    relatedCreatures: ["blank_page_wraith", "procrastination_hydra", "analysis_paralysis_spider"],
    gatesAffected: [1, 2, 6],
    rootCauses: [
      "Overwhelm from too many options",
      "Fear of making the 'wrong' choice",
      "Disconnection from creative intuition",
    ],
  },
  comparison: {
    keywords: ["others", "compare", "behind", "jealous", "better", "worse", "should be"],
    relatedCreatures: ["comparison_specter", "creative_envy_chimera", "imposter_shade"],
    gatesAffected: [4, 5, 7],
    rootCauses: [
      "Measuring progress against external benchmarks",
      "Consuming more than creating",
      "Unclear personal creative identity",
    ],
  },
  exhaustion: {
    keywords: ["tired", "exhausted", "burned", "drained", "empty", "depleted", "no energy"],
    relatedCreatures: ["burnout_phoenix", "validation_vampire", "attention_fragmentation_fae"],
    gatesAffected: [2, 4, 7],
    rootCauses: [
      "Giving without receiving",
      "Creating without rest cycles",
      "External demands exceeding internal resources",
    ],
  },
};

function identifyPatterns(symptoms: string, context: string): string[] {
  const combined = `${symptoms} ${context}`.toLowerCase();
  const matched: string[] = [];

  for (const [pattern, data] of Object.entries(symptomPatterns)) {
    const matchCount = data.keywords.filter(k => combined.includes(k)).length;
    if (matchCount > 0) {
      matched.push(pattern);
    }
  }

  return matched;
}

function generateThinkingProcess(
  symptoms: string,
  context: string,
  depth: "quick" | "standard" | "deep"
): ThoughtStep[] {
  const patterns = identifyPatterns(symptoms, context);
  const steps: ThoughtStep[] = [];

  // Phase 1: Observation
  steps.push({
    phase: "Observation",
    observation: `The creator describes: "${symptoms}"${context ? ` in the context of ${context}` : ""}.`,
    insight: `Initial patterns detected: ${patterns.length > 0 ? patterns.join(", ") : "no clear pattern - requires deeper inquiry"}.`,
  });

  if (depth === "quick") return steps;

  // Phase 2: Pattern Recognition
  steps.push({
    phase: "Pattern Recognition",
    observation: `Examining the symptoms against the Bestiary, looking for creature signatures...`,
    insight: patterns.length > 0
      ? `Strong match to ${patterns[0]} pattern. This often indicates ${symptomPatterns[patterns[0]]?.rootCauses[0] || "an underlying creative block"}.`
      : `No single pattern dominates. This suggests a complex, multi-creature situation.`,
  });

  if (depth === "standard") return steps;

  // Phase 3: Deep Analysis (only for "deep" depth)
  steps.push({
    phase: "Gate Analysis",
    observation: `Mapping symptoms to the Ten Gates system...`,
    insight: patterns.length > 0
      ? `The ${gateNames[symptomPatterns[patterns[0]]?.gatesAffected[0] - 1] || "creative"} Gate appears most affected. This gate governs ${getGateDomain(symptomPatterns[patterns[0]]?.gatesAffected[0] || 1)}.`
      : `Multiple gates show disturbance, suggesting a need for foundational work.`,
  });

  steps.push({
    phase: "Root Cause",
    observation: `Tracing the symptom back to its origin...`,
    insight: patterns.length > 0
      ? symptomPatterns[patterns[0]]?.rootCauses[0] || "The root cause requires further exploration."
      : "The complexity of symptoms suggests layered causes. Consider a Luminor Council consultation.",
  });

  steps.push({
    phase: "Integration",
    observation: `Synthesizing observations into a diagnosis...`,
    insight: `The creative block appears to be a combination of internal resistance and external pressure. The path forward requires both courage and compassion.`,
  });

  return steps;
}

function getGateDomain(gate: number): string {
  const domains: Record<number, string> = {
    1: "grounding, safety, and basic creative survival",
    2: "flow, emotion, and creative movement",
    3: "power, will, and creative fire",
    4: "love, healing, and connection to creation",
    5: "voice, truth, and authentic expression",
    6: "sight, intuition, and creative vision",
    7: "wisdom, enlightenment, and creative mastery",
    8: "perspective, transformation, and creative shifts",
    9: "unity, partnership, and collaborative creation",
    10: "source, meta-consciousness, and creative origin",
  };
  return domains[gate] || "creative energy";
}

function getLuminorForPattern(patterns: string[]): { luminor: string; reason: string } {
  const recommendations: Record<string, { luminor: string; reason: string }> = {
    fear: { luminor: "Valora", reason: "Valora specializes in courage and breaking through fear." },
    perfectionism: { luminor: "Ignara", reason: "Ignara can help you find joy and play in creation." },
    motivation: { luminor: "Ignara", reason: "Ignara rekindles lost passion and creative fire." },
    stuck: { luminor: "Valora", reason: "Valora helps you take action despite uncertainty." },
    comparison: { luminor: "Eloqua", reason: "Eloqua helps you find and trust your unique voice." },
    exhaustion: { luminor: "Serenith", reason: "Serenith guides you to sustainable creative practice." },
  };

  if (patterns.length > 0 && recommendations[patterns[0]]) {
    return recommendations[patterns[0]];
  }

  return { luminor: "Verdana", reason: "Verdana offers the long view and patience with the creative journey." };
}

export async function deepDiagnosis(
  symptoms: string,
  context?: string,
  history?: string,
  depth: "quick" | "standard" | "deep" = "standard"
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const patterns = identifyPatterns(symptoms, context || "");
  const thinkingProcess = generateThinkingProcess(symptoms, context || "", depth);

  // Find primary creature
  let primaryCreature: BestiaryCreature | null = null;
  let primaryConfidence = 0;

  if (patterns.length > 0 && symptomPatterns[patterns[0]]) {
    const creatureSlug = symptomPatterns[patterns[0]].relatedCreatures[0];
    primaryCreature = bestiary[creatureSlug];
    primaryConfidence = 0.7 + (patterns.length * 0.1);
  }

  // If no pattern match, fall back to keyword matching
  if (!primaryCreature) {
    const lowerSymptoms = symptoms.toLowerCase();
    for (const [slug, creature] of Object.entries(bestiary)) {
      const matchCount = creature.symptoms.filter(s =>
        lowerSymptoms.includes(s.toLowerCase().split(" ")[0])
      ).length;
      if (matchCount > 0) {
        primaryCreature = creature;
        primaryConfidence = 0.4 + (matchCount * 0.15);
        break;
      }
    }
  }

  // Default fallback
  if (!primaryCreature) {
    primaryCreature = bestiary.resistance_golem;
    primaryConfidence = 0.3;
  }

  // Find secondary creatures
  const secondaryCreatures = patterns.length > 0
    ? symptomPatterns[patterns[0]]?.relatedCreatures.slice(1).map(slug => ({
        name: bestiary[slug]?.name || slug,
        likelihood: 0.5,
        reason: `Related to ${patterns[0]} pattern`,
      })) || []
    : [];

  // Determine affected gates
  const gatesAffected = patterns.length > 0
    ? (symptomPatterns[patterns[0]]?.gatesAffected || [primaryCreature.gateAffected]).map(g => ({
        gate: g,
        name: gateNames[g - 1],
        how: `This gate governs ${getGateDomain(g)}`,
      }))
    : [{ gate: primaryCreature.gateAffected, name: gateNames[primaryCreature.gateAffected - 1], how: getGateDomain(primaryCreature.gateAffected) }];

  const luminorRec = getLuminorForPattern(patterns);

  const result: DeepDiagnosisResult = {
    approach: depth,
    thinkingProcess,
    primaryCreature: {
      name: primaryCreature.name,
      type: primaryCreature.type,
      description: primaryCreature.description,
      confidence: Math.min(primaryConfidence, 0.95),
    },
    secondaryCreatures,
    rootCause: patterns.length > 0
      ? symptomPatterns[patterns[0]]?.rootCauses[0] || "Root cause requires deeper exploration"
      : "The block appears to be the Resistance Golem - a general force that opposes meaningful creative work",
    gatesAffected,
    remedyPlan: {
      immediate: primaryCreature.remedies.slice(0, 2),
      shortTerm: primaryCreature.remedies.slice(2),
      longTerm: [
        `Work with ${luminorRec.luminor} for ongoing guidance`,
        `Focus on strengthening the ${gateNames[gatesAffected[0]?.gate - 1] || "Foundation"} Gate`,
        "Establish a regular creative practice to build resilience",
      ],
    },
    luminorRecommendation: luminorRec,
    affirmation: primaryCreature.affirmation,
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(result, null, 2),
    }],
  };
}
