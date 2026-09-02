// Avatar: The Last Airbender — Arcanea Original Variants.
//
// These are wholly original Arcanea creatures INSPIRED by but NOT reproducing
// Avatar IP. They carry Arcanea lore, elements, and canon status STAGING.
// All: promptable = true (original Arcanea creations, not IP reproductions).

import type { ArcaneaVariantSpec } from "../types.js";

export const avatarArcaneaVariants: ArcaneaVariantSpec[] = [
  {
    id: "sky-wanderer",
    sourceCreatureId: "sky-bison",
    name: "The Sky Wanderer",
    arcaneaTier: "T2",
    elements: ["Wind", "Void"],
    gate: null,
    domain: "The Wandering Sky — the airspace between the Ten Gates",
    description:
      "A colossal cloud-whale of the upper atmosphere, bonded to no Gate but drawn by Maylinn's resonance. It navigates by reading the frequencies of the Ten Gates as a living compass and carries wayfarers across impossible distances. Some Luminors believe it is the Void between Gates made briefly tangible.",
    appearance:
      "A six-winged cetacean form, translucent as spun cloud-glass. Silver-white bioluminescence traces star-map patterns across its wingspan that shift with Gate resonance. Its underbelly is a living atlas of Gate frequencies rendered in light.",
    abilities: [
      {
        name: "Frequency Navigation",
        description:
          "Reads the resonant hum of the Ten Gates to navigate between realms. Can locate any open Gate from beyond the horizon.",
        element: "Wind",
      },
      {
        name: "Cloud Cloak",
        description:
          "Merges with cloud formations, becoming invisible except during absolute atmospheric stillness.",
        element: "Wind",
      },
      {
        name: "Dream Transit",
        description:
          "Passengers enter a visionary sleep during long journeys, receiving Gate-relevant insight fitted to their next threshold.",
        element: "Void",
      },
    ],
    materialCorrespondence:
      "Cloudstone — crystallized upper-atmosphere vapor that stores navigational memory and resonates with Wind Gate frequency (285 Hz). Carried by navigators to aid wayfinding.",
    canonStatus: "staging",
  },
  {
    id: "titan-shell",
    sourceCreatureId: "lion-turtle",
    name: "The Titan Shell",
    arcaneaTier: "T3",
    elements: ["Earth", "Void"],
    gate: null,
    domain: "The Deep Foundation — the substrate layer beneath the physical world",
    description:
      "A continent-spanning turtle that predates the Ten Gates themselves — perhaps predates Lumina's First Dawn. Its shell carries the ruins of the Cities of Origin. It roams the Deep Foundation, a substrate beneath the visible world, surfacing once per age to allow a single soul of absolute clarity to receive a Gate attunement.",
    appearance:
      "Its shell spans kilometres; entire mountain ranges jut from its back like broken teeth. Ancient Arcanean script covers every surface. Its eyes glow with the slow luminescence of cooling supernovae. When it breathes, the sea floor shifts.",
    abilities: [
      {
        name: "Origin Grant",
        description:
          "Once per age, it can bestow a single Gate attunement on a soul of absolute clarity. The attunement is felt as a second heartbeat — the Gate's frequency synchronized to the recipient's life-force.",
        element: "Void",
      },
      {
        name: "World Memory",
        description:
          "Its shell stores a geological record of all eras of Arcanea's history. Lore-readers can extract memories from its growth rings.",
        element: "Earth",
      },
      {
        name: "Foundation Tremor",
        description:
          "When it shifts position in the Deep Foundation, continental plates realign. The tremors are experienced as creative revelation by attuned creators.",
        element: "Earth",
      },
    ],
    materialCorrespondence:
      "Foundation Stone — fragments of its shed shell, inscribed with echoes of an Origin Grant. Extremely rare; used in the deepest Vael Crystal ceremonies at the Source Gate.",
    canonStatus: "staging",
  },
  {
    id: "sight-keeper",
    sourceCreatureId: "wan-shi-tong",
    name: "The Sight Keeper",
    arcaneaTier: "T3",
    elements: ["Void", "Spirit"],
    gate: "sight",
    domain: "The Archive at the Seventh Threshold — a library between the Sixth and Seventh Gates",
    description:
      "A vast owl-entity of the Void, bonded to Lyria's Sight Gate. It has read every text ever written in Arcanea across all timelines. Its library exists between Gates, accessible only to those who carry no intent to harm.",
    appearance:
      "A bird of impossible size: its wingspan spans a cathedral's breadth, its feathers are inscribed vellum, and its eyes are twin void-portals that reflect the reader's own unread truth back at them.",
    abilities: [
      {
        name: "Archive Recall",
        description:
          "Can retrieve any fact, text, or memory ever recorded in Arcanea — but only delivers it in the form the seeker is ready to receive.",
        element: "Void",
      },
      {
        name: "Wrath of the Unread",
        description:
          "Those who enter the Archive with intent to weaponize knowledge are expelled and barred permanently.",
        element: "Spirit",
      },
      {
        name: "Third-Eye Mirror",
        description:
          "Its gaze reflects a person's own unacknowledged knowing — what they already understand but refuse to see.",
        element: "Spirit",
      },
    ],
    materialCorrespondence:
      "Vellum Shard — a single inscribed feather from its wing, containing a complete line of truth the holder needs. Changes its inscription to match the current need of its carrier.",
    canonStatus: "staging",
  },
];

export const AVATAR_ARCANEA_VARIANTS = avatarArcaneaVariants;
