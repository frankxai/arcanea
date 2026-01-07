// Block Diagnosis Tool
// Matches symptoms to Bestiary creatures

import { bestiary } from "../data/bestiary/index.js";

interface DiagnosisResult {
  creature: {
    name: string;
    type: string;
    description: string;
  };
  matchScore: number;
  gateAffected: {
    number: number;
    name: string;
  };
  remedies: string[];
  affirmation: string;
  relatedCreatures: string[];
}

const gateNames = [
  "Foundation", "Flow", "Fire", "Heart", "Voice",
  "Sight", "Crown", "Shift", "Unity", "Source"
];

// Keywords for each creature
const creatureKeywords: Record<string, string[]> = {
  imposter_shade: ["fraud", "fake", "luck", "deserve", "belong", "found out", "imposter", "unqualified"],
  perfectionist_wyrm: ["perfect", "never good enough", "revision", "polish", "not ready", "flawed", "critique"],
  comparison_specter: ["others", "compare", "behind", "jealous", "competitor", "envy", "better than me"],
  procrastination_hydra: ["later", "tomorrow", "distract", "avoid", "delay", "put off", "urgent"],
  overwhelm_leviathan: ["too much", "drowning", "can't handle", "everything", "paralyzed", "where to start", "overwhelm"],
  burnout_phoenix: ["exhausted", "tired", "burned out", "no energy", "cynical", "empty", "drained", "burnout"],
  inner_critic_basilisk: ["harsh", "critical", "self-talk", "mean to myself", "judge", "voice in head", "not good enough"],
  blank_page_wraith: ["blank", "empty", "start", "begin", "first line", "staring at", "nothing comes"],
  fear_of_judgment_phantom: ["judged", "criticism", "what will they think", "share", "public", "embarrass", "ridicule"],
  shiny_object_sprite: ["new idea", "another project", "excited about", "can't focus", "many projects", "bored with"],
  resistance_golem: ["avoid", "important", "meaningful", "block", "can't make myself", "resistance"],
  validation_vampire: ["likes", "followers", "feedback", "metrics", "approval", "external validation", "need response"],
  scope_creep_shapeshifter: ["bigger", "more features", "expand", "one more thing", "scope", "never done", "keeps growing"],
  analysis_paralysis_spider: ["research", "more information", "study", "not sure", "need to know", "analysis", "overthink"],
  tomorrow_troll: ["tomorrow", "next week", "when conditions are right", "not now", "later will be better", "starting monday"],
  ego_attachment_demon: ["personal", "attack", "defensive", "identity", "self-worth", "who I am", "failure defines me"],
  comfort_zone_cocoon: ["safe", "comfortable", "risk", "tried and true", "afraid to try", "new territory"],
  creative_envy_chimera: ["wish I had", "their talent", "why not me", "unfair", "their success", "want what they have"],
  attention_fragmentation_fae: ["focus", "distracted", "notifications", "scatter", "can't concentrate", "jumping around", "shallow"],
  failure_phantom: ["failed before", "try again", "history repeating", "what if I fail", "past failure", "burned"],
};

export async function diagnoseBlock(
  symptoms: string,
  context?: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const lowerSymptoms = symptoms.toLowerCase();
  const lowerContext = context?.toLowerCase() || "";
  const combined = `${lowerSymptoms} ${lowerContext}`;

  // Score each creature
  const scores: Array<{ slug: string; score: number }> = [];

  for (const [slug, keywords] of Object.entries(creatureKeywords)) {
    let score = 0;
    for (const keyword of keywords) {
      if (combined.includes(keyword)) {
        score += 1;
      }
    }
    // Also check against the creature's own symptoms
    const creature = bestiary[slug];
    if (creature) {
      for (const symptom of creature.symptoms) {
        const symptomWords = symptom.toLowerCase().split(" ");
        for (const word of symptomWords) {
          if (word.length > 4 && combined.includes(word)) {
            score += 0.5;
          }
        }
      }
    }
    if (score > 0) {
      scores.push({ slug, score });
    }
  }

  // Sort by score
  scores.sort((a, b) => b.score - a.score);

  // If no matches, provide a general response
  if (scores.length === 0) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          diagnosis: "No specific creature identified",
          suggestion: "Your symptoms don't clearly match a known Bestiary creature. Consider:",
          questions: [
            "Are you feeling blocked, or just taking a natural break?",
            "Is this about fear, perfectionism, overwhelm, or something else?",
            "When did this start? What changed?",
          ],
          generalRemedies: [
            "Take a short break and return with fresh eyes",
            "Talk to a trusted creative friend",
            "Try a different creative medium temporarily",
            "Practice Morning Clearing to identify the root cause",
          ],
        }, null, 2),
      }],
    };
  }

  // Get the primary match
  const primarySlug = scores[0].slug;
  const primary = bestiary[primarySlug];

  // Get related creatures (other high scorers)
  const related = scores
    .slice(1, 4)
    .filter(s => s.score >= scores[0].score * 0.5)
    .map(s => bestiary[s.slug]?.name)
    .filter(Boolean);

  const result: DiagnosisResult = {
    creature: {
      name: primary.name,
      type: primary.type,
      description: primary.description,
    },
    matchScore: Math.min(scores[0].score / 3, 1), // Normalize to 0-1
    gateAffected: {
      number: primary.gateAffected,
      name: gateNames[primary.gateAffected - 1],
    },
    remedies: primary.remedies,
    affirmation: primary.affirmation,
    relatedCreatures: related,
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        diagnosis: `The ${primary.name} appears to be affecting you`,
        confidence: result.matchScore > 0.7 ? "high" : result.matchScore > 0.4 ? "medium" : "tentative",
        creature: result.creature,
        gate: result.gateAffected,
        remedies: result.remedies,
        affirmation: result.affirmation,
        alsoConsider: result.relatedCreatures.length > 0
          ? `You may also be dealing with: ${result.relatedCreatures.join(", ")}`
          : undefined,
        guidance: `This creature affects the ${result.gateAffected.name} Gate. Working on opening or strengthening this Gate may help.`,
      }, null, 2),
    }],
  };
}
