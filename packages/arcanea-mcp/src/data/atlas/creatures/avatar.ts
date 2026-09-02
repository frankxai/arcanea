// Avatar: The Last Airbender — Creature Catalog (Reference).
//
// All entries: rightsTier = "factual_reference", promptable = false.
// No generated imagery of these creatures is produced — they are documented
// for the world graph, thematic research, and Arcanea variant inspiration.

import type { AtlasCreatureSpec } from "../types.js";

export const avatarCreatures: AtlasCreatureSpec[] = [
  {
    id: "sky-bison",
    universeId: "avatar-the-last-airbender",
    name: "Sky Bison",
    aliases: ["Flying Bison", "Appa"],
    tier: "T2",
    scale: "large",
    elements: ["Air"],
    habitat: "Sky Temples, open sky, air currents above mountain ranges",
    description:
      "Massive six-legged bison with white fur. First taught airbending to humans by manipulating air through tail sweeps. Bond empathically with their riders over lifetimes.",
    abilities: [
      "Airbending via tail sweep",
      "Sustained supersonic flight",
      "Bond-empathy with Air Nomad rider",
    ],
    significance:
      "The original airbenders. The spiritual bond between bison and Air Nomad is the entire foundation of Air Nomad culture — their near-extinction in Sozin's Comet genocide destroyed a civilization.",
    relationships: [{ creatureId: "flying-lemur", type: "companion" }],
    rightsTier: "factual_reference",
    promptable: false,
    canonSources: [
      "Avatar: The Last Airbender (2005–2008)",
      "The Legend of Korra (2012–2014)",
    ],
  },
  {
    id: "lion-turtle",
    universeId: "avatar-the-last-airbender",
    name: "Lion Turtle",
    aliases: ["The Ancient Ones"],
    tier: "T4",
    scale: "world",
    elements: ["Earth", "Fire", "Water", "Air"],
    habitat: "Ocean depths and ancient coastlines; move continent-scale",
    description:
      "Island-sized turtles whose shells hold entire cities. The oldest living beings in the world, pre-dating the four-nation era. Hold and grant bending as a gift, not a birthright — the source of energybending.",
    abilities: [
      "Energybending grant — can transfer elemental attunement to a soul",
      "Continent-scale mass and movement",
      "Ancient elemental knowledge spanning all four bending arts",
    ],
    significance:
      "Pre-date the Avatar cycle entirely. Wan received the first bending ability from a lion turtle. Their energybending enabled Aang to remove Firelord Ozai's bending permanently.",
    rightsTier: "factual_reference",
    promptable: false,
    canonSources: [
      "The Legend of Korra Book 2: Spirits — Beginnings Parts 1 & 2",
    ],
  },
  {
    id: "ancient-dragon",
    universeId: "avatar-the-last-airbender",
    name: "Dragon (Ancient)",
    aliases: ["Ran", "Shaw", "Sun Warrior Dragons"],
    tier: "T2",
    scale: "large",
    elements: ["Fire"],
    habitat: "Volcanic mountains, Sun Warrior ruins",
    description:
      "The original firebenders, who taught the Sun Warriors the true meaning of fire — a living energy, not destruction. Produce multi-spectrum flame where each hue carries a distinct quality aligned to cosmic order.",
    abilities: [
      "True firebending: life-energy flame drawn from the sun, not anger",
      "Multi-spectrum color breath — hue encodes the dragons' judgment",
      "Ancient judgment: the flame test determines worthiness",
    ],
    significance:
      "Proved that true firebending is life-force, not rage. Zuko and Aang's encounter with Ran and Shaw dismantled the Fire Nation's corrupted firebending doctrine.",
    rightsTier: "factual_reference",
    promptable: false,
    canonSources: [
      "Avatar: The Last Airbender Book 3: Fire — The Firebending Masters",
    ],
  },
  {
    id: "badgermole",
    universeId: "avatar-the-last-airbender",
    name: "Badgermole",
    tier: "T2",
    scale: "large",
    elements: ["Earth"],
    habitat: "Underground tunnel networks, mountain interiors",
    description:
      "Blind, massive burrowing mammals. Navigate entirely by seismic sense and taught earthbending to the first humans in the Earth Kingdom.",
    abilities: [
      "Earthbending at scale — tunnel construction in seconds",
      "Seismic sense: precise spatial awareness without sight",
      "Ground vibration communication",
    ],
    significance:
      "Original earthbenders. Toph learned seismic sense from badgermoles — the most advanced earthbending ability — by spending time among them rather than human masters.",
    rightsTier: "factual_reference",
    promptable: false,
    canonSources: ["Avatar: The Last Airbender"],
  },
  {
    id: "flying-lemur",
    universeId: "avatar-the-last-airbender",
    name: "Flying Lemur",
    aliases: ["Momo"],
    tier: "T1",
    scale: "small",
    elements: ["Air"],
    habitat: "Air Temples, forest canopy, high-altitude terrain",
    description:
      "Winged primates native to Air Temple environments. Large bat-like ears, dexterous hands, membranous wings for gliding. Momo is the last known of his kind.",
    abilities: [
      "Sustained gliding flight via wing-membranes",
      "High intelligence and emotional attunement",
      "Bond-empathy with benders",
    ],
    significance:
      "Momo represents what survived Sozin's Comet — a symbol of the Air Nomad civilization's near-total erasure. His survival parallels Aang's.",
    relationships: [{ creatureId: "sky-bison", type: "companion" }],
    rightsTier: "factual_reference",
    promptable: false,
    canonSources: ["Avatar: The Last Airbender"],
  },
  {
    id: "hei-bai",
    universeId: "avatar-the-last-airbender",
    name: "Hei Bai",
    aliases: ["The Forest Spirit", "Giant Panda Spirit"],
    tier: "T3",
    scale: "titan",
    elements: ["Earth", "Spirit"],
    habitat: "Forest-adjacent spirit portals, the Spirit World",
    description:
      "A dual-form forest spirit: a peaceful giant panda when its forest is intact, a terrifying multi-limbed demon of ancient wrath when its grove is burned. A boundary being between the physical and spirit worlds.",
    abilities: [
      "Dual form shift: giant panda ↔ many-limbed abyssal demon",
      "Spirit realm portal access and traversal",
      "Elemental forest bond — its health mirrors the forest's",
    ],
    significance:
      "The first major spirit Aang successfully communicates with. Demonstrates the duality of the spirit world: balanced spirits become monstrous only when their domain is violated.",
    rightsTier: "factual_reference",
    promptable: false,
    canonSources: [
      "Avatar: The Last Airbender Book 1: Water — The Spirit World",
    ],
  },
  {
    id: "wan-shi-tong",
    universeId: "avatar-the-last-airbender",
    name: "Wan Shi Tong",
    aliases: ["He Who Knows Ten Thousand Things", "The Library Keeper"],
    tier: "T3",
    scale: "large",
    elements: ["Spirit", "Air"],
    habitat: "The Spirit World library — an infinite shifting repository of knowledge",
    description:
      "An ancient owl spirit who maintains the spirit world's library. Guards it jealously; his covenant is that knowledge must not be weaponized for war. Deception triggers permanent banishment.",
    abilities: [
      "Omniscient knowledge vault — has read every written work humans produced",
      "Spirit World manifestation — can physically appear in the human world",
      "Form-shift: scholarly owl → massive multi-headed spirit of wrath",
      "Library realm control — can sink the library beneath desert sands",
    ],
    significance:
      "Embodies the ethics of knowledge. When Team Avatar uses his library to find the solar eclipse date for military advantage, he sinks the library as punishment.",
    rightsTier: "factual_reference",
    promptable: false,
    canonSources: [
      "Avatar: The Last Airbender Book 2: Earth — The Library",
      "The Legend of Korra",
    ],
  },
];

export const AVATAR_CREATURES = avatarCreatures;
