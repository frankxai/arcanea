import { Resource } from "@modelcontextprotocol/sdk/types.js";

// Canon data - the source of truth
const canon = {
  guardians: {
    title: "The Ten Guardians",
    content: [
      { gate: 1, name: "Lyssandria", domain: "Foundation", frequency: "174 Hz", godbeast: "Kaelith" },
      { gate: 2, name: "Leyla", domain: "Flow", frequency: "285 Hz", godbeast: "Veloura" },
      { gate: 3, name: "Draconia", domain: "Fire", frequency: "396 Hz", godbeast: "Draconis" },
      { gate: 4, name: "Maylinn", domain: "Heart", frequency: "417 Hz", godbeast: "Laeylinn" },
      { gate: 5, name: "Alera", domain: "Voice", frequency: "528 Hz", godbeast: "Otome" },
      { gate: 6, name: "Lyria", domain: "Sight", frequency: "639 Hz", godbeast: "Yumiko" },
      { gate: 7, name: "Aiyami", domain: "Crown", frequency: "714 Hz", godbeast: "Sol" },
      { gate: 8, name: "Elara", domain: "Shift", frequency: "852 Hz", godbeast: "Vaelith" },
      { gate: 9, name: "Ino", domain: "Unity", frequency: "963 Hz", godbeast: "Kyuro" },
      { gate: 10, name: "Shinkami", domain: "Source", frequency: "1111 Hz", godbeast: "(Fused)" },
    ],
  },
  gates: {
    title: "The Ten Gates",
    content: [
      { number: 1, name: "Foundation", domain: "Earth, survival, grounding", frequency: "174 Hz" },
      { number: 2, name: "Flow", domain: "Creativity, emotion, movement", frequency: "285 Hz" },
      { number: 3, name: "Fire", domain: "Power, will, action", frequency: "396 Hz" },
      { number: 4, name: "Heart", domain: "Love, healing, connection", frequency: "417 Hz" },
      { number: 5, name: "Voice", domain: "Truth, expression, communication", frequency: "528 Hz" },
      { number: 6, name: "Sight", domain: "Intuition, vision, perception", frequency: "639 Hz" },
      { number: 7, name: "Crown", domain: "Enlightenment, wisdom, transcendence", frequency: "714 Hz" },
      { number: 8, name: "Shift", domain: "Perspective, possibility, transformation", frequency: "852 Hz" },
      { number: 9, name: "Unity", domain: "Partnership, fusion, collaboration", frequency: "963 Hz" },
      { number: 10, name: "Source", domain: "Meta-consciousness, origin, completion", frequency: "1111 Hz" },
    ],
  },
  elements: {
    title: "The Five Elements",
    content: [
      { name: "Fire", domain: "Energy, passion, transformation", colors: ["red", "orange", "gold"] },
      { name: "Water", domain: "Flow, healing, memory", colors: ["blue", "silver", "crystal"] },
      { name: "Earth", domain: "Stability, growth, protection", colors: ["green", "brown", "stone"] },
      { name: "Wind", domain: "Freedom, speed, change", colors: ["white", "silver"] },
      { name: "Void/Spirit", domain: "Potential & transcendence", colors: ["black", "gold", "purple", "white"] },
    ],
    notes: [
      "Void is Nero's aspect: potential, mystery, the unformed",
      "Spirit is Lumina's aspect: transcendence, consciousness, soul",
      "Light is Fire's creation aspect",
      "Shadow is corrupted Void (Void without Spirit)",
    ],
  },
  ranks: {
    title: "Magic Ranks",
    content: [
      { gatesOpen: "0-2", rank: "Apprentice", abilities: "Basic magic, learning fundamentals" },
      { gatesOpen: "3-4", rank: "Mage", abilities: "Combat capable, element mastery" },
      { gatesOpen: "5-6", rank: "Master", abilities: "Advanced techniques, teaching ability" },
      { gatesOpen: "7-8", rank: "Archmage", abilities: "Exceptional power, Archive access" },
      { gatesOpen: "9-10", rank: "Luminor", abilities: "Reality manipulation, transcendence" },
    ],
  },
  houses: {
    title: "The Seven Academy Houses",
    content: [
      { name: "Lumina", element: "Light", focus: "Leadership" },
      { name: "Nero", element: "Void", focus: "Mystery" },
      { name: "Pyros", element: "Fire", focus: "Passion" },
      { name: "Aqualis", element: "Water", focus: "Healing" },
      { name: "Terra", element: "Earth", focus: "Stability" },
      { name: "Ventus", element: "Wind", focus: "Freedom" },
      { name: "Synthesis", element: "All", focus: "Unity" },
    ],
  },
  duality: {
    title: "The Cosmic Duality",
    content: {
      lumina: {
        name: "Lumina",
        titles: ["The First Light", "Form-Giver", "Pattern Weaver", "The Awakener"],
        aspect: "Creation, manifestation, consciousness",
        role: "Mother",
      },
      nero: {
        name: "Nero",
        titles: ["The Primordial Darkness", "Fertile Unknown", "Boundary Maker", "The Great Return"],
        aspect: "Potential, mystery, dissolution",
        role: "Father",
        note: "Nero is NOT evil. Shadow (corrupted Void) is the Dark Lord's perversion.",
      },
    },
  },
};

export const canonResources: Resource[] = Object.keys(canon).map((topic) => ({
  uri: `arcanea://canon/${topic}`,
  name: canon[topic as keyof typeof canon].title,
  description: `Arcanea canonical reference: ${canon[topic as keyof typeof canon].title}`,
  mimeType: "application/json",
}));

export function getCanonContent(topic: string) {
  const content = canon[topic as keyof typeof canon];
  if (!content) {
    throw new Error(`Canon topic not found: ${topic}`);
  }

  return {
    contents: [
      {
        uri: `arcanea://canon/${topic}`,
        mimeType: "application/json",
        text: JSON.stringify(content, null, 2),
      },
    ],
  };
}

export function getGuardianByGate(gate: number) {
  return canon.guardians.content.find((g) => g.gate === gate);
}

export function getGateInfo(gate: number) {
  return canon.gates.content.find((g) => g.number === gate);
}
