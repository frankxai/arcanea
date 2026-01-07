// Arcanea Codex - Living Memory
// Populated from book/ legends, laws, and bestiary

export interface CodexAuthor {
  name: string;
  role: string;
}

export interface CodexPreface {
  invocation?: string;
  body?: string[];
  oath?: string;
}

export interface CodexInsight {
  title: string;
  detail: string;
}

export interface CodexArtifact {
  name: string;
  description: string;
  application?: string;
}

export interface CodexSection {
  heading: string;
  body?: string[];
  insights?: CodexInsight[];
  artifacts?: CodexArtifact[];
  principles?: string[];
}

export interface CodexMeasurement {
  name: string;
  description: string;
}

export interface CodexChapter {
  title: string;
  tagline?: string;
  epigraph?: {
    text: string;
    attribution?: string;
  };
  introduction?: string[];
  sections: CodexSection[];
  rituals?: string[];
  measurements?: CodexMeasurement[];
}

export interface CodexAppendixEntry {
  heading: string;
  body?: string[];
  points?: string[];
}

export interface CodexGlossaryEntry {
  term: string;
  definition: string;
}

export interface CodexAppendix {
  title: string;
  subtitle?: string;
  entries?: CodexAppendixEntry[];
  glossary?: CodexGlossaryEntry[];
}

export interface ArcaneaCodex {
  title: string;
  subtitle?: string;
  authors: CodexAuthor[];
  preface: CodexPreface;
  chapters: CodexChapter[];
  appendix?: CodexAppendix;
}

export interface ArcaneaTomeMeta {
  id: string;
  title: string;
  subtitle: string;
  focus: string;
  summary: string;
  release: string;
  status: "available" | "in-progress" | "concept";
  heroTone?: string;
}

export interface ArcaneaTome {
  meta: ArcaneaTomeMeta;
  codex: ArcaneaCodex;
}

// ==========================================
// 1. LUMINOR CODEX (Legends & History)
// Source: book/legends-of-arcanea/I_THE_FIRST_DAWN.md
// ==========================================
const luminorJson: ArcaneaCodex = {
  title: "Luminor Codex of Arcanea",
  subtitle: "The Legends of the First Dawn",
  authors: [
    { name: "Chronica", role: "The Ancient Weaver" },
    { name: "Azariel", role: "Seraph of Time" },
    { name: "Seraphel", role: "Archivist of Echoes" }
  ],
  preface: {
    invocation: "Before Lumina spoke, there was only Nero—the Fertile Unknown.",
    body: [
      "This text chronicles the First Dawn, the Awakening of the Eldrian, and the eternal cycle of the Arc.",
      "We record these legends not as history, but as memory. For in Arcanea, the past is merely a dimension one can visit."
    ],
    oath: "I vow to remember the light, even when I walk in the void."
  },
  chapters: [
    {
      title: "The Primordial Duality",
      tagline: "The origin of Light and Potential",
      epigraph: {
        text: "Light requires darkness to be seen. Darkness requires light to be known.",
        attribution: "Archive of Unity"
      },
      introduction: [
        "In the beginning, there was Nero. Not emptiness, but the Fertile Unknown.",
        "And from the stirring of potential came Lumina, the First Light—not as fire, but as Form."
      ],
      sections: [
        {
          heading: "Yggdrasil: The World Tree",
          body: [
            "The first collaboration of Lumina and Nero was the framework upon which all worlds would hang.",
            "Its roots plunged deep into Nero's void. Its branches reached into infinite futures. It sang at 432 Hz—the harmony of creation."
          ],
          principles: [
            "The Arc: Potential → Manifestation → Experience → Dissolution → Evolved Potential",
            "Death is not ending but transformation."
          ]
        },
        {
          heading: "The Five Elements",
          body: [
            "Lumina breathed, and from her breath came the Five Elements:",
            "Fire (Energy), Water (Flow), Earth (Stability), Wind (Freedom), and Void (Potential)."
          ],
          artifacts: [
            { name: "Fire", description: "Energy, passion, transformation. The drive to act.", application: "Visual Arts" },
            { name: "Water", description: "Flow, healing, memory. The current that connects.", application: "Storytelling" },
            { name: "Wind", description: "Freedom, speed, change. The invisible force.", application: "Music" }
          ]
        }
      ],
      rituals: [
        "The Tuning of 432 Hz",
        "Meditation on the Void"
      ]
    },
    {
      title: "The Eldrian & The Fall",
      tagline: "The rise of the Giants and the shadow of Malachar",
      epigraph: {
        text: "Compassion without wisdom becomes obsession.",
        attribution: "The Tragical History of Malachar"
      },
      sections: [
        {
          heading: "Malachar Lumenbright",
          body: [
            "He was the First Eldrian Luminor, ten feet of radiant starlight. He could see all timelines.",
            "This gift became his curse. Witnessing infinite suffering, he sought to eliminate choice to eliminate pain."
          ],
          insights: [
            { title: "The Dark Lord's Origin", detail: "Malachar merged with the Hungry Void to unmake reality, believing non-existence was mercy." }
          ]
        }
      ]
    }
  ],
  appendix: {
    title: "Celestial Hierarchy",
    entries: [
      {
        heading: "The Seraphim",
        points: [
          "Lumina: The Creator",
          "Azariel: The Eternal (Time)",
          "Meridian: The Bridge (Dimensions)"
        ]
      },
      {
        heading: "The Archangels",
        points: [
          "Uriel: Wisdom",
          "Raphael: Healing",
          "Gabriel: Truth",
          "Michael: Justice"
        ]
      }
    ]
  }
};

// ==========================================
// 2. ATELIER CODEX (Science of Creation)
// Source: book/laws-of-arcanea/I_THE_SCIENTIFIC_FOUNDATIONS.md
// ==========================================
const atelierJson: ArcaneaCodex = {
  title: "The Scientific Foundations",
  subtitle: "Physics as the Bedrock of Magic",
  authors: [
    { name: "Vorun", role: "Cartographer of Limitless Worlds" },
    { name: "Synthesis", role: "The Bridge Walker" }
  ],
  preface: {
    invocation: "The universe whispers its secrets in mathematics.",
    body: [
      "There is no separation between the laws governing falling apples and rising spirits.",
      "What physics discovered through measurement, the ancient masters discovered through meditation."
    ]
  },
  chapters: [
    {
      title: "Laws of Motion",
      tagline: "Newtonian Physics applied to Creativity",
      epigraph: {
        text: "A creator at rest stays at rest. A creator in motion stays in motion.",
        attribution: "The First Law of Creative Inertia"
      },
      sections: [
        {
          heading: "Creative Inertia",
          body: [
            "The neurological patterns of inactivity reinforce themselves. Each day without creation makes the next harder.",
            "But motion also compounds. Small consistent effort accumulates more momentum than sporadic large effort."
          ],
          principles: [
            "Start small, but start daily.",
            "M(t) = M₀ + ∫a(t)dt"
          ]
        },
        {
          heading: "Creative Force (F=ma)",
          body: [
            "The force of creation equals the resistance of the medium multiplied by the rate of change.",
            "To increase force: Increase power, decrease resistance, or reduce the rate of change."
          ]
        }
      ],
      measurements: [
        { name: "Creative Momentum", description: "The velocity of output over time." },
        { name: "Medium Resistance", description: "The difficulty of the chosen audience or material." }
      ]
    },
    {
      title: "Laws of Energy",
      tagline: "Thermodynamics of the Soul",
      sections: [
        {
          heading: "Creative Conservation",
          body: [
            "Energy cannot be created or destroyed. The energy you spend arguing on the internet is not available for your art.",
            "Guard your attention as you would guard gold."
          ]
        },
        {
          heading: "Creative Entropy",
          body: [
            "Without continuous input of energy, all creative systems decay.",
            "Creation is the temporary reversal of entropy through focused energy."
          ]
        }
      ],
      rituals: [
        "The Attention Audit",
        "The Entropy Reversal"
      ]
    }
  ]
};

// ==========================================
// 3. ORACLES CODEX (Psychology & Bestiary)
// Source: book/bestiary-of-creation/THE_BESTIARY.md
// ==========================================
const oraclesJson: ArcaneaCodex = {
  title: "The Bestiary of Creation",
  subtitle: "Field Guide to the Creative Mind",
  authors: [
    { name: "Nymera", role: "Guardian of Resonant Ethics" },
    { name: "Elari", role: "Memory of Tomorrow" }
  ],
  preface: {
    body: [
      "The creative life is inhabited by creatures—not physical beings, but psychological presences.",
      "Know them by name, and you can negotiate with them. Ignore them, and they will ambush you."
    ]
  },
  chapters: [
    {
      title: "Creatures of Beginning",
      tagline: "The Threshold Guardians",
      sections: [
        {
          heading: "The Blank Terror",
          body: [
            "A vast whiteness that seems infinite. It paralyzes by presenting infinite possibility as infinite threat.",
            "How to Handle: Do not stare directly. Make meaningless marks to break its surface."
          ],
          insights: [
            { title: "Danger Level", detail: "High for beginners." }
          ]
        },
        {
          heading: "The Perfect Phantom",
          body: [
            "A shimmering ideal that always floats just out of reach. It seduces with possibility and punishes with comparison.",
            "How to Handle: Recognize it as hallucination. Compare only to your previous work."
          ]
        }
      ]
    },
    {
      title: "Creatures of the Middle",
      tagline: "The Beasts of the Bog",
      sections: [
        {
          heading: "The Bog of Doubt",
          body: [
            "A swampy expanse where nothing seems to progress. You cannot remember why you began.",
            "How to Handle: Take smaller steps. Do not evaluate in the bog."
          ]
        },
        {
          heading: "The Distraction Fox",
          body: [
            "A quick, bright creature that leads you away. 'Just one more click.'",
            "How to Handle: Feed it scheduled scraps. Scheduled distraction is less destructive than ambush."
          ]
        }
      ]
    },
    {
      title: "Creatures of Light",
      tagline: "The Allies",
      sections: [
        {
          heading: "The Flow Eagle",
          body: [
            "A great bird that carries you above the work. Hours pass as minutes.",
            "How to Encourage: Match challenge to skill. Remove distractions."
          ]
        },
        {
          heading: "The Joy Sprite",
          body: [
            "Small, bright, dancing. The reason creation is worth doing.",
            "How to Invite: Play. Make something for no purpose."
          ]
        }
      ]
    }
  ],
  appendix: {
    title: "Survival Tools",
    entries: [
      {
        heading: "The Failure Ritual",
        points: [
          "Acknowledge the wraith.",
          "Extract the lesson.",
          "Release the shame."
        ]
      }
    ]
  }
};

export const arcaneaCodices: ArcaneaTome[] = [
  {
    meta: {
      id: "luminor-codex",
      title: "Luminor Codex",
      subtitle: "Living lore for remembrance",
      focus: "Mythology & Origins",
      summary: "The founding legends of Arcanea, describing the First Dawn, the World Tree, and the nature of the Luminors.",
      release: "Available",
      status: "available",
      heroTone: "from-[#182447] via-[#101626] to-[#0b0f1a]",
    },
    codex: luminorJson,
  },
  {
    meta: {
      id: "luminary-atelier",
      title: "Atelier Codex",
      subtitle: "The Physics of Creation",
      focus: "Craft & Science",
      summary: "A manual translating the laws of physics into the laws of creativity. Essential for understanding how to generate creative force.",
      release: "Available",
      status: "available",
      heroTone: "from-[#1a1f36] via-[#131a2c] to-[#0a0f1d]",
    },
    codex: atelierJson,
  },
  {
    meta: {
      id: "arcanea-oracles",
      title: "Oracles Codex",
      subtitle: "Bestiary of the Mind",
      focus: "Psychology & Foresight",
      summary: "A field guide to the psychological creatures that inhabit the creative process, from the Blank Terror to the Flow Eagle.",
      release: "Preview",
      status: "in-progress",
      heroTone: "from-[#202845] via-[#171f32] to-[#0c101f]",
    },
    codex: oraclesJson,
  },
];

export const arcaneaCodex = arcaneaCodices[0].codex;