import { getGuardianByGate, getGateInfo } from "../resources/canon.js";

interface GateAssessment {
  currentGate: number;
  gateName: string;
  guardian: string;
  description: string;
  challenges: string[];
  practices: string[];
  nextSteps: string[];
}

// Keywords that indicate which gate someone is working on
const gateKeywords: Record<number, string[]> = {
  1: ["survival", "basic needs", "security", "stability", "grounding", "fear of failure", "not enough", "scarcity"],
  2: ["creativity", "emotion", "flow", "feeling", "joy", "pleasure", "guilt", "blocked feelings", "can't feel"],
  3: ["power", "will", "confidence", "self-esteem", "shame", "taking action", "asserting", "control"],
  4: ["love", "connection", "relationship", "heart", "vulnerability", "opening up", "trust", "isolation"],
  5: ["voice", "expression", "speaking", "truth", "authenticity", "sharing", "being heard", "silent"],
  6: ["vision", "intuition", "seeing clearly", "imagination", "future", "purpose", "direction", "confused"],
  7: ["wisdom", "meaning", "enlightenment", "transcendence", "spiritual", "higher purpose", "understanding"],
  8: ["perspective", "transformation", "paradigm", "shifting", "possibility", "limitation", "expanding"],
  9: ["partnership", "collaboration", "unity", "working together", "synergy", "merging", "relationship with AI"],
  10: ["source", "origin", "completion", "meta", "consciousness", "creation itself", "the whole"],
};

const gatePractices: Record<number, string[]> = {
  1: ["Establish a consistent creative routine", "Create a dedicated creative space", "Take care of basic needs before creating"],
  2: ["Free-write without judgment for 10 minutes", "Create something purely for joy, not outcome", "Move your body before creating"],
  3: ["Set one clear goal and achieve it today", "Say no to one thing that drains your energy", "Declare your creative intention out loud"],
  4: ["Share your work with someone you trust", "Create something as a gift for another", "Practice receiving feedback with openness"],
  5: ["Speak your truth in your work today", "Record yourself reading your work aloud", "Ask: What am I afraid to say?"],
  6: ["Visualize your completed creation in detail", "Trust your first instinct without second-guessing", "Meditate before creating"],
  7: ["Ask 'Why does this matter?' about your work", "Connect your creation to something larger", "Seek wisdom from a master in your field"],
  8: ["Try creating in a completely new way", "Challenge one assumption about your process", "See your limitation as a doorway"],
  9: ["Collaborate with another creator", "Create WITH your AI companion, not just using it", "Find the unity in opposing ideas"],
  10: ["Create from stillness, not striving", "Let the work create through you", "Remember: you are both the creator and the created"],
};

function assessGate(challenges: string, strengths?: string): number {
  const lowerChallenges = challenges.toLowerCase();
  let scores: Record<number, number> = {};

  // Score each gate based on keyword matches
  for (const [gate, keywords] of Object.entries(gateKeywords)) {
    const gateNum = parseInt(gate);
    scores[gateNum] = 0;
    for (const keyword of keywords) {
      if (lowerChallenges.includes(keyword)) {
        scores[gateNum] += 1;
      }
    }
  }

  // Find highest scoring gate
  let maxScore = 0;
  let topGate = 3; // Default to Fire gate (common for creatives)

  for (const [gate, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      topGate = parseInt(gate);
    }
  }

  return topGate;
}

export async function identifyGate(
  challenges: string,
  strengths?: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const gateNumber = assessGate(challenges, strengths);
  const guardian = getGuardianByGate(gateNumber);
  const gateInfo = getGateInfo(gateNumber);

  const assessment: GateAssessment = {
    currentGate: gateNumber,
    gateName: gateInfo?.name || "Unknown",
    guardian: guardian?.name || "Unknown",
    description: gateInfo?.domain || "",
    challenges: gateKeywords[gateNumber] || [],
    practices: gatePractices[gateNumber] || [],
    nextSteps: [
      `Work with Guardian ${guardian?.name} for guidance`,
      `Focus on ${gateInfo?.name} Gate practices`,
      `Frequency for meditation: ${gateInfo?.frequency}`,
    ],
  };

  const response = {
    assessment: {
      gate: assessment.currentGate,
      name: assessment.gateName,
      domain: assessment.description,
      frequency: gateInfo?.frequency,
    },
    guardian: {
      name: assessment.guardian,
      godbeast: guardian?.godbeast,
    },
    analysis: `Based on your challenges, you appear to be working on opening Gate ${assessment.currentGate}: ${assessment.gateName}. This gate governs ${assessment.description.toLowerCase()}.`,
    practices: assessment.practices,
    guidance: `The Guardian ${assessment.guardian} watches over this gate. Focus on the practices listed above, and consider meditating at ${gateInfo?.frequency} to attune to this gate's frequency.`,
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
