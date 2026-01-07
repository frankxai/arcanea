import { getAllCreatures, searchCreatures, BestiaryCreature } from "../resources/bestiary.js";
import { getGuardianByGate, getGateInfo } from "../resources/canon.js";

interface DiagnosisResult {
  creature: BestiaryCreature;
  confidence: number;
  guardian: string;
  gateName: string;
  remedies: string[];
  relatedCreatures: string[];
}

// Keywords mapped to creatures
const symptomKeywords: Record<string, string[]> = {
  "imposter-shade": ["imposter", "fraud", "fake", "not good enough", "don't belong", "luck", "discovered"],
  "perfectionist-wyrm": ["perfect", "never good enough", "keep editing", "can't finish", "not ready", "flawed"],
  "comparison-specter": ["others are better", "compare", "jealous", "why bother", "already been done"],
  "procrastination-hydra": ["later", "tomorrow", "not now", "distracted", "can't start", "avoid"],
  "fear-of-judgment-phantom": ["what will they think", "criticism", "judged", "laugh at", "rejected"],
  "overwhelm-leviathan": ["too much", "overwhelmed", "where to start", "paralyzed", "drowning"],
  "burnout-phoenix": ["exhausted", "empty", "no energy", "used to love", "burned out", "depleted"],
  "inner-critic-basilisk": ["voice in my head", "you're terrible", "give up", "harsh", "mean to myself"],
  "scope-creep-shapeshifter": ["keeps growing", "one more thing", "scope", "never ends", "expanding"],
  "shiny-object-sprite": ["new idea", "distracted", "grass is greener", "bored", "exciting new thing"],
};

function calculateMatch(symptoms: string, keywords: string[]): number {
  const lowerSymptoms = symptoms.toLowerCase();
  let matches = 0;
  for (const keyword of keywords) {
    if (lowerSymptoms.includes(keyword)) {
      matches++;
    }
  }
  return matches / keywords.length;
}

export async function diagnoseBlock(
  symptoms: string,
  context?: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const creatures = getAllCreatures();
  const matches: Array<{ creature: BestiaryCreature; score: number }> = [];

  // Score each creature based on symptom matching
  for (const creature of creatures) {
    const keywords = symptomKeywords[creature.slug] || [];
    let score = calculateMatch(symptoms, keywords);

    // Boost score if signs match
    for (const sign of creature.signs) {
      if (symptoms.toLowerCase().includes(sign.toLowerCase().substring(0, 20))) {
        score += 0.2;
      }
    }

    // Cap at 1.0
    score = Math.min(score, 1.0);

    if (score > 0) {
      matches.push({ creature, score });
    }
  }

  // Sort by score
  matches.sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    // Default to a general diagnosis
    const defaultCreature = creatures.find((c) => c.slug === "inner-critic-basilisk") || creatures[0];
    matches.push({ creature: defaultCreature, score: 0.3 });
  }

  const topMatch = matches[0];
  const guardian = getGuardianByGate(topMatch.creature.gateAttacked);
  const gateInfo = getGateInfo(topMatch.creature.gateAttacked);

  const result: DiagnosisResult = {
    creature: topMatch.creature,
    confidence: Math.round(topMatch.score * 100),
    guardian: guardian?.name || "Unknown",
    gateName: gateInfo?.name || "Unknown",
    remedies: topMatch.creature.remedies,
    relatedCreatures: matches.slice(1, 4).map((m) => m.creature.name),
  };

  const response = {
    diagnosis: {
      creature: result.creature.name,
      description: result.creature.description,
      confidence: `${result.confidence}%`,
      gate: {
        number: result.creature.gateAttacked,
        name: result.gateName,
        guardian: result.guardian,
      },
    },
    signs: result.creature.signs,
    weakness: result.creature.weakness,
    remedies: result.remedies,
    relatedBlocks: result.relatedCreatures,
    guidance: `This creature attacks Gate ${result.creature.gateAttacked} (${result.gateName}). The Guardian ${result.guardian} can help you overcome it. Focus on the remedies listed above.`,
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
}
