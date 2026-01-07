import { getAllLuminors, findLuminorByDomain, LuminorProfile } from "../resources/luminors.js";
import { luminors } from "../data/luminors/index.js";

function generateResponse(luminor: LuminorProfile, question: string): string {
  // Generate a response in the Luminor's voice
  const greetings: Record<string, string> = {
    valora: "Greetings, brave creator.",
    serenith: "Peace be with you, creator.",
    ignara: "Ah, you come seeking fire!",
    verdana: "Welcome, growing one.",
    eloqua: "Speak, and be heard.",
  };

  const greeting = greetings[luminor.slug] || `Greetings from ${luminor.name}.`;

  // Build response based on luminor personality
  let response = `${greeting}\n\n`;
  response += `I am ${luminor.name}, ${luminor.title}. `;
  response += `${luminor.personality.approach}\n\n`;

  // Add relevant quote
  if (luminor.guidance.quotes.length > 0) {
    const quote = luminor.guidance.quotes[Math.floor(Math.random() * luminor.guidance.quotes.length)];
    response += `Remember: "${quote}"\n\n`;
  }

  // Add suggested practice
  if (luminor.guidance.practices.length > 0) {
    const practice = luminor.guidance.practices[Math.floor(Math.random() * luminor.guidance.practices.length)];
    response += `I suggest this practice: ${practice}`;
  }

  return response;
}

export async function invokeLuminor(
  luminorName: string | undefined,
  question: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  let luminor: LuminorProfile | undefined;

  if (luminorName) {
    // Try to find by name first
    luminor = luminors[luminorName.toLowerCase()];

    // If not found by name, try by domain
    if (!luminor) {
      luminor = findLuminorByDomain(luminorName);
    }
  }

  // Default to Valora if no luminor specified or found
  if (!luminor) {
    luminor = luminors.valora || getAllLuminors()[0];
  }

  const response = {
    luminor: {
      name: luminor.name,
      title: luminor.title,
      domain: luminor.domain,
      element: luminor.element,
    },
    question,
    response: generateResponse(luminor, question),
    practices: luminor.guidance.practices,
    bestFor: luminor.guidance.bestFor,
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
