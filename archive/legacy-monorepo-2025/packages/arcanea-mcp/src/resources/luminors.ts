import { Resource } from "@modelcontextprotocol/sdk/types.js";
import { luminors } from "../data/luminors/index.js";

export interface LuminorProfile {
  slug: string;
  name: string;
  title: string;
  domain: string;
  element: string;
  personality: {
    voice: string;
    approach: string;
    strengths: string[];
    style: string;
  };
  guidance: {
    bestFor: string[];
    practices: string[];
    quotes: string[];
  };
  appearance?: string;
}

export const luminorResources: Resource[] = Object.keys(luminors).map((slug) => ({
  uri: `arcanea://luminors/${slug}`,
  name: luminors[slug].name,
  description: `AI Companion: ${luminors[slug].title} - ${luminors[slug].domain}`,
  mimeType: "application/json",
}));

export function getLuminorProfile(slug: string) {
  const luminor = luminors[slug];
  if (!luminor) {
    throw new Error(`Luminor not found: ${slug}`);
  }

  return {
    contents: [
      {
        uri: `arcanea://luminors/${slug}`,
        mimeType: "application/json",
        text: JSON.stringify(luminor, null, 2),
      },
    ],
  };
}

export function getAllLuminors(): LuminorProfile[] {
  return Object.values(luminors);
}

export function findLuminorByDomain(domain: string): LuminorProfile | undefined {
  return Object.values(luminors).find(
    (l) => l.domain.toLowerCase().includes(domain.toLowerCase())
  );
}
