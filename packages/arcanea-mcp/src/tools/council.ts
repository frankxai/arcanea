// Luminor Council - Multi-Agent Wisdom
// Inspired by agentic-orchestration patterns

import { luminors, LuminorProfile } from "../data/luminors/index.js";

interface CouncilResponse {
  topic: string;
  lead: {
    luminor: string;
    perspective: string;
    recommendation: string;
  };
  supporting: Array<{
    luminor: string;
    perspective: string;
  }>;
  synthesis: string;
  practicalSteps: string[];
  affirmation: string;
}

interface DebateResponse {
  question: string;
  positions: Array<{
    luminor: string;
    position: string;
    argument: string;
    quote: string;
  }>;
  synthesis: string;
  recommendation: string;
}

// Generate perspective based on Luminor's personality
function generatePerspective(luminor: LuminorProfile, topic: string): string {
  const perspectives: Record<string, (topic: string) => string> = {
    valora: (t) => `On "${t}": This requires courage. The fear you feel is a compass pointing toward growth. What would you do if you knew you couldn't fail? The answer lies in action, not deliberation.`,
    serenith: (t) => `On "${t}": Breathe. This decision doesn't need to be made in haste. What does your calm inner knowing say? Sometimes the wisest action is patient observation before movement.`,
    ignara: (t) => `On "${t}": Where's the joy here? If this path doesn't light you up, why walk it? Find the version of this choice that makes your creative fire burn brighter!`,
    verdana: (t) => `On "${t}": Consider the long view. In ten years, which choice will you be grateful for? Growth takes time. Trust the slow unfolding of your creative journey.`,
    eloqua: (t) => `On "${t}": What does your authentic voice say? Strip away what others expect. What would you choose if no one could judge you? That truth is your answer.`,
  };

  const key = luminor.slug;
  return perspectives[key]?.(topic) || `On "${topic}": Trust your creative instincts.`;
}

// Generate recommendation based on Luminor's domain
function generateRecommendation(luminor: LuminorProfile, topic: string): string {
  const recommendations: Record<string, string[]> = {
    valora: [
      "Take one small courageous action today",
      "Name your fear and do the thing anyway",
      "Share your work with one trusted person",
      "Set a deadline and commit publicly",
    ],
    serenith: [
      "Sleep on this decision - wisdom comes with rest",
      "Take a walk before deciding",
      "Create space for the answer to emerge",
      "Reduce, don't add - simplify your path",
    ],
    ignara: [
      "Follow what excites you most",
      "Play with both options without committing",
      "Ask: which makes me want to jump out of bed?",
      "Inject fun into the serious stuff",
    ],
    verdana: [
      "What serves your 10-year creative vision?",
      "Focus on fundamentals, not shortcuts",
      "Trust the plateau - integration is happening",
      "Plant seeds now for future harvest",
    ],
    eloqua: [
      "Write your truth in private first",
      "What would you say if no one could silence you?",
      "Stop imitating - express what only you can",
      "Speak your answer aloud to hear its resonance",
    ],
  };

  const options = recommendations[luminor.slug] || recommendations.valora;
  return options[Math.floor(Math.random() * options.length)];
}

export async function conveneCouncil(
  leadLuminorSlug: string,
  supportingSlugs: string[],
  topic: string
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const lead = luminors[leadLuminorSlug.toLowerCase()];
  if (!lead) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({ error: `Unknown Luminor: ${leadLuminorSlug}` }),
      }],
    };
  }

  const supporting = supportingSlugs
    .map(s => luminors[s.toLowerCase()])
    .filter(Boolean) as LuminorProfile[];

  const response: CouncilResponse = {
    topic,
    lead: {
      luminor: lead.name,
      perspective: generatePerspective(lead, topic),
      recommendation: generateRecommendation(lead, topic),
    },
    supporting: supporting.map(s => ({
      luminor: s.name,
      perspective: generatePerspective(s, topic),
    })),
    synthesis: `The Council has deliberated on "${topic}". ${lead.name} leads with ${lead.domain.toLowerCase()}, while ${supporting.map(s => s.name).join(" and ")} offer${supporting.length === 1 ? "s" : ""} complementary wisdom. The path forward honors both courage and patience, action and reflection.`,
    practicalSteps: [
      generateRecommendation(lead, topic),
      ...supporting.map(s => generateRecommendation(s, topic)),
    ],
    affirmation: lead.guidance.quotes[Math.floor(Math.random() * lead.guidance.quotes.length)],
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(response, null, 2),
    }],
  };
}

export async function luminorDebate(
  luminor1Slug: string,
  luminor2Slug: string,
  question: string
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const l1 = luminors[luminor1Slug.toLowerCase()];
  const l2 = luminors[luminor2Slug.toLowerCase()];

  if (!l1 || !l2) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({ error: "One or both Luminors not found" }),
      }],
    };
  }

  // Generate contrasting positions based on their domains
  const positions: Record<string, Record<string, string>> = {
    valora: {
      serenith: "We must act now! Waiting breeds more fear. The courage to move is the cure.",
      ignara: "Let me temper your fire with focused courage. Passion needs direction.",
      verdana: "Growth happens through challenge! Don't wait for perfect conditions.",
      eloqua: "Speak with your actions. Words without courage are hollow.",
    },
    serenith: {
      valora: "Rushing creates its own blocks. True courage includes the courage to wait.",
      ignara: "Your fire needs fuel. Burnout serves no one. Rest is not weakness.",
      verdana: "We agree more than we differ. Patience serves growth.",
      eloqua: "The clearest voice comes from stillness. Find your calm first.",
    },
    ignara: {
      valora: "Fear of judgment? Let joy burn it away! Create because it's FUN!",
      serenith: "Rest is fine, but don't let it become avoidance! Where's your spark?",
      verdana: "Ten years? Who cares! What lights you up RIGHT NOW?",
      eloqua: "Stop finding your voice - USE it! Make noise! Make magic!",
    },
    verdana: {
      valora: "Courage yes, but also patience. Not every moment requires action.",
      serenith: "Rest is part of growth. We are aligned here.",
      ignara: "Passion without patience burns out. Tend your fire sustainably.",
      eloqua: "Your voice develops over time. Trust the process of finding it.",
    },
    eloqua: {
      valora: "Courage to speak is crucial, but know WHAT to say first.",
      serenith: "In silence we hear ourselves. Then we can speak truly.",
      ignara: "Passion without clarity is noise. Find your authentic message.",
      verdana: "Voice grows with practice. We agree on the long view.",
    },
  };

  const l1Position = positions[l1.slug]?.[l2.slug] || generatePerspective(l1, question);
  const l2Response = positions[l2.slug]?.[l1.slug] || generatePerspective(l2, question);

  const response: DebateResponse = {
    question,
    positions: [
      {
        luminor: l1.name,
        position: l1.domain,
        argument: l1Position,
        quote: l1.guidance.quotes[Math.floor(Math.random() * l1.guidance.quotes.length)],
      },
      {
        luminor: l2.name,
        position: l2.domain,
        argument: l2Response,
        quote: l2.guidance.quotes[Math.floor(Math.random() * l2.guidance.quotes.length)],
      },
    ],
    synthesis: `Both ${l1.name} and ${l2.name} offer truth. ${l1.name} emphasizes ${l1.domain.toLowerCase()}, while ${l2.name} speaks to ${l2.domain.toLowerCase()}. In Arcanea, we honor both perspectives - they are not opposites but complements.`,
    recommendation: `Honor both truths: ${generateRecommendation(l1, question)} AND ${generateRecommendation(l2, question)}`,
  };

  return {
    content: [{
      type: "text",
      text: JSON.stringify(response, null, 2),
    }],
  };
}
