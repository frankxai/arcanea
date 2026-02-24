import { Resource } from "@modelcontextprotocol/sdk/types.js";
import { creatures } from "../data/bestiary/index.js";

export interface BestiaryCreature {
  slug: string;
  name: string;
  description: string;
  gateAttacked: number;
  gateName: string;
  signs: string[];
  remedies: string[];
  weakness: string;
  quote?: string;
}

export const bestiaryResources: Resource[] = Object.keys(creatures).map((slug) => ({
  uri: `arcanea://bestiary/${slug}`,
  name: creatures[slug].name,
  description: `Creative block creature: ${creatures[slug].description.substring(0, 100)}...`,
  mimeType: "application/json",
}));

export function getBestiaryCreature(slug: string) {
  const creature = creatures[slug];
  if (!creature) {
    throw new Error(`Creature not found: ${slug}`);
  }

  return {
    contents: [
      {
        uri: `arcanea://bestiary/${slug}`,
        mimeType: "application/json",
        text: JSON.stringify(creature, null, 2),
      },
    ],
  };
}

export function getAllCreatures(): BestiaryCreature[] {
  return Object.values(creatures);
}

export function findCreaturesByGate(gate: number): BestiaryCreature[] {
  return Object.values(creatures).filter((c) => c.gateAttacked === gate);
}

export function searchCreatures(symptoms: string): BestiaryCreature[] {
  const lowerSymptoms = symptoms.toLowerCase();
  return Object.values(creatures).filter(
    (c) =>
      c.description.toLowerCase().includes(lowerSymptoms) ||
      c.signs.some((s) => s.toLowerCase().includes(lowerSymptoms))
  );
}
