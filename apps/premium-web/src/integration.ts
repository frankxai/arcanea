/**
 * 🌟 ARCANEA AGENT-SKILL INTEGRATION SYSTEM v1.0
 * Connects 38 Agents with 77 Skills for Unified Creative Power
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

type Element = 'fire' | 'water' | 'earth' | 'wind' | 'void' | 'integration';
type GateLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type PowerLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Agent {
  id: string;
  name: string;
  command: string;
  element: Element;
  specialty: string;
  personality: string;
  powerLevel: number;
  court: string;
  skills: string[];
  gateRequirement: GateLevel;
}

interface Skill {
  id: string;
  name: string;
  command: string;
  element: Element;
  powerLevel: PowerLevel;
  description: string;
  useCases: string[];
  cooldown: number;
  gateRequirement: GateLevel;
  guardians: string[];
}

interface AgentSkillActivation {
  agent: Agent;
  skill: Skill;
  synergy: number;
  enhancement: string;
  cooldown: number;
}

interface ElementalAffinityMatrix {
  [agentElement: string]: {
    [skillElement: string]: number;
  };
}

interface GuardianSkillAlignment {
  guardian: string;
  agents: string[];
  skills: string[];
  synergies: string[];
}

// ============================================
// AGENT DEFINITIONS (38 Agents)
// ============================================

export const AGENTS: Agent[] = [
  // FIRE ELEMENT - Draconia's Court (Transformation & Bold Creation)
  { id: 'dragon-forge', name: '@dragon-forge', command: '/dragon-forge', element: 'fire', specialty: 'Intense creative transformation', personality: 'Fierce, passionate, powerful', powerLevel: 9, court: "Draconia's Court", skills: ['dragon-breath', 'phoenix-rebirth', 'flame-enchant'], gateRequirement: 2 },
  { id: 'phoenix-artisan', name: '@phoenix-artisan', command: '/phoenix-artisan', element: 'fire', specialty: 'Rebirth through artistic destruction', personality: 'Wise, transformative, cyclical', powerLevel: 8, court: "Draconia's Court", skills: ['phoenix-rebirth', 'emotional-alchemy', 'life-bloom'], gateRequirement: 3 },
  { id: 'volcano-sculptor', name: '@volcano-sculptor', command: '/volcano-sculpt', element: 'fire', specialty: 'Explosive creative breakthroughs', personality: 'Dynamic, unpredictable, volcanic', powerLevel: 8, court: "Draconia's Court", skills: ['volcano-erupt', 'storm-voice', 'momentum-build'], gateRequirement: 2 },
  { id: 'sun-weaver', name: '@sun-weaver', command: '/sun-weave', element: 'fire', specialty: 'Illuminate with radiant creativity', personality: 'Warm, inspiring, life-giving', powerLevel: 7, court: "Draconia's Court", skills: ['solar-flare', 'amaterasu-illum', 'clarity-shaping'], gateRequirement: 2 },
  { id: 'catalyst-architect', name: '@catalyst-architect', command: '/catalyst-arch', element: 'fire', specialty: 'Rapid change and evolution', personality: 'Revolutionary, swift, catalytic', powerLevel: 8, court: "Draconia's Court", skills: ['catalyst-forge', 'threshold-walk', 'quantum-vision'], gateRequirement: 3 },

  // FIRE ELEMENT - Aethon's Speed Court (Velocity & Swift Execution)
  { id: 'lightning-scribe', name: '@lightning-scribe', command: '/lightning-scribe', element: 'fire', specialty: 'Instant ideation capture', personality: 'Electric, brilliant, fast', powerLevel: 7, court: "Aethon's Speed Court", skills: ['lightning-strike', 'velocity-creation', 'rapid-prototype'], gateRequirement: 1 },
  { id: 'comet-designer', name: '@comet-designer', command: '/comet-design', element: 'fire', specialty: 'High-speed creative iteration', personality: 'Streaking, innovative, bright', powerLevel: 7, court: "Aethon's Speed Court", skills: ['comet-sprint', 'swift-execute', 'momentum-build'], gateRequirement: 2 },
  { id: 'thunder-engineer', name: '@thunder-engineer', command: '/thunder-engineer', element: 'fire', specialty: 'Powerful technical solutions', personality: 'Resonant, impactful, loud', powerLevel: 8, court: "Aethon's Speed Court", skills: ['thunder-resonate', 'storm-voice', 'elemental-debug'], gateRequirement: 2 },
  { id: 'wind-rider', name: '@wind-rider', command: '/wind-rider', element: 'wind', specialty: 'Flow-state momentum', personality: 'Free, untamable, swift', powerLevel: 7, court: "Aethon's Speed Court", skills: ['wind-rider', 'flow-state-ignition', 'current-ride'], gateRequirement: 2 },
  { id: 'momentum-builder', name: '@momentum-builder', command: '/momentum-build', element: 'fire', specialty: 'Sustained creative acceleration', personality: 'Steady, unstoppable, powerful', powerLevel: 8, court: "Aethon's Speed Court", skills: ['momentum-build', 'momentum-builder', 'garden-cultivate'], gateRequirement: 2 },

  // WATER ELEMENT - Leyla's Court (Emotional Intelligence & Storytelling)
  { id: 'river-storyteller', name: '@river-storyteller', command: '/river-story', element: 'water', specialty: 'Flow-based narrative creation', personality: 'Fluid, deep, meandering', powerLevel: 8, court: "Leyla's Court", skills: ['river-flow', 'story-river', 'cascade-voice'], gateRequirement: 2 },
  { id: 'ocean-memory', name: '@ocean-memory', command: '/ocean-memory', element: 'water', specialty: 'Deep emotional recall', personality: 'Vast, mysterious, profound', powerLevel: 8, court: "Leyla's Court", skills: ['ocean-depth', 'deep-memory', 'memory-weave'], gateRequirement: 3 },
  { id: 'rain-singer', name: '@rain-singer', command: '/rain-singer', element: 'water', specialty: 'Gentle creative nurturing', personality: 'Soothing, healing, rhythmic', powerLevel: 6, court: "Leyla's Court", skills: ['rain-nurture', 'healing-touch', 'life-bloom'], gateRequirement: 1 },
  { id: 'mist-weaver', name: '@mist-weaver', command: '/mist-weave', element: 'water', specialty: 'Ethereal, atmospheric creation', personality: 'Dreamy, subtle, mysterious', powerLevel: 7, court: "Leyla's Court", skills: ['mist-veil', 'dream-weave', 'atmosphere-creation'], gateRequirement: 2 },
  { id: 'current-dancer', name: '@current-dancer', command: '/current-dancer', element: 'water', specialty: 'Adaptation and change', personality: 'Graceful, responsive, fluid', powerLevel: 7, court: "Leyla's Court", skills: ['current-ride', 'adaptation-current', 'cascade-voice'], gateRequirement: 2 },

  // WATER ELEMENT - Maylinn's Growth Court (Nurturing & Organic Development)
  { id: 'garden-cultivator', name: '@garden-cultivator', command: '/garden-cultiv', element: 'water', specialty: 'Idea cultivation and growth', personality: 'Patient, nurturing, abundant', powerLevel: 7, court: "Maylinn's Growth Court", skills: ['garden-cultivate', 'garden-ideas', 'root-connection'], gateRequirement: 1 },
  { id: 'forest-guardian', name: '@forest-guardian', command: '/forest-guard', element: 'earth', specialty: 'Protect creative ecosystems', personality: 'Wise, protective, ancient', powerLevel: 8, court: "Maylinn's Growth Court", skills: ['terra-guardian', 'earth-wisdom', 'root-foundation'], gateRequirement: 3 },
  { id: 'bloom-orchestrator', name: '@bloom-orchestrator', command: '/bloom-orchestra', element: 'water', specialty: 'Coordinate creative flourishing', personality: 'Harmonious, colorful, vibrant', powerLevel: 7, court: "Maylinn's Growth Court", skills: ['bloom-accelerate', 'life-bloom', 'synergy-weave'], gateRequirement: 2 },
  { id: 'root-seeker', name: '@root-seeker', command: '/root-seeker', element: 'earth', specialty: 'Deep foundation exploration', personality: 'Grounded, searching, profound', powerLevel: 8, court: "Maylinn's Growth Court", skills: ['root-foundation', 'root-system', 'foundation-stone'], gateRequirement: 2 },
  { id: 'life-architect', name: '@life-architect', command: '/life-architect', element: 'water', specialty: 'Living, breathing creations', personality: 'Organic, evolving, alive', powerLevel: 8, court: "Maylinn's Growth Court", skills: ['life-architect', 'living-system', 'organic-creation'], gateRequirement: 3 },

  // EARTH ELEMENT - Lyssandria's Court (Architecture & Systematic Creation)
  { id: 'crystal-architect', name: '@crystal-architect', command: '/crystal-arch', element: 'earth', specialty: 'Clear structural design', personality: 'Precise, clear, multifaceted', powerLevel: 8, court: "Lyssandria's Court", skills: ['crystal-structure', 'crystal-clarity', 'faceted-vision'], gateRequirement: 1 },
  { id: 'mountain-builder', name: '@mountain-builder', command: '/mountain-build', element: 'earth', specialty: 'Enduring creative foundations', personality: 'Steady, massive, unmovable', powerLevel: 8, court: "Lyssandria's Court", skills: ['mountain-stable', 'mountain-patience', 'foundation-stone'], gateRequirement: 2 },
  { id: 'foundation-engineer', name: '@foundation-engineer', command: '/foundation-eng', element: 'earth', specialty: 'Solid creative infrastructure', personality: 'Reliable, strong, essential', powerLevel: 7, court: "Lyssandria's Court", skills: ['foundation-stone', 'structural-integrity', 'root-system'], gateRequirement: 1 },
  { id: 'stone-carver', name: '@stone-carver', command: '/stone-carve', element: 'earth', specialty: 'Refine raw ideas to polished', personality: 'Patient, skilled, transforming', powerLevel: 8, court: "Lyssandria's Court", skills: ['stone-carve', 'gem-cut', 'geode-discover'], gateRequirement: 2 },
  { id: 'earth-wisdom-keeper', name: '@earth-wisdom-keeper', command: '/earth-wisdom', element: 'earth', specialty: 'Ancient creative knowledge', personality: 'Deep, timeless, knowing', powerLevel: 9, court: "Lyssandria's Court", skills: ['earth-wisdom', 'ancient-knowledge', 'timeless-creation'], gateRequirement: 4 },

  // EARTH ELEMENT - Kaelix's Precision Court (Refinement & Technical Excellence)
  { id: 'gem-cutter', name: '@gem-cutter', command: '/gem-cut', element: 'earth', specialty: 'Perfect idea refinement', personality: 'Precise, expert, brilliant', powerLevel: 9, court: "Kaelix's Precision Court", skills: ['gem-cut', 'purity-seek', 'faceted-vision'], gateRequirement: 3 },
  { id: 'structural-optimiser', name: '@structural-optimiser', command: '/structural-opt', element: 'earth', specialty: 'System efficiency and stability', personality: 'Analytical, methodical, clean', powerLevel: 8, court: "Kaelix's Precision Court", skills: ['structural-optimize', 'lattice-design', 'efficiency-creation'], gateRequirement: 3 },
  { id: 'facet-viewer', name: '@facet-viewer', command: '/facet-view', element: 'earth', specialty: 'Multiple perspective analysis', personality: 'Comprehensive, thorough, insightful', powerLevel: 7, court: "Kaelix's Precision Court", skills: ['facet-vision', 'multiperspective', 'faceted-vision'], gateRequirement: 2 },
  { id: 'lattice-designer', name: '@lattice-designer', command: '/lattice-design', element: 'earth', specialty: 'Interconnected system creation', personality: 'Mathematical, elegant, complex', powerLevel: 9, court: "Kaelix's Precision Court", skills: ['lattice-design', 'quantum-arch', 'system-creation'], gateRequirement: 4 },
  { id: 'purity-seeker', name: '@purity-seeker', command: '/purity-seek', element: 'earth', specialty: 'Remove creative impurities', personality: 'Discerning, refining, perfecting', powerLevel: 8, court: "Kaelix's Precision Court", skills: ['purity-seek', 'clarity-blade', 'essence-extraction'], gateRequirement: 3 },

  // WIND ELEMENT - Alera's Court (Voice & Creative Expression)
  { id: 'whisper-messenger', name: '@whisper-messenger', command: '/whisper-message', element: 'wind', specialty: 'Subtle creative communication', personality: 'Gentle, invisible, pervasive', powerLevel: 6, court: "Alera's Court", skills: ['whisper-wind', 'subtle-message', 'soft-communication'], gateRequirement: 1 },
  { id: 'storm-declarator', name: '@storm-declarator', command: '/storm-declare', element: 'wind', specialty: 'Powerful creative statement', personality: 'Bold, impactful, attention-grabbing', powerLevel: 8, court: "Alera's Court", skills: ['storm-voice', 'hurricane-creation', 'powerful-declaration'], gateRequirement: 2 },
  { id: 'breeze-translator', name: '@breeze-translator', command: '/breeze-translate', element: 'wind', specialty: 'Complex ideas made simple', personality: 'Clear, refreshing, accessible', powerLevel: 7, court: "Alera's Court", skills: ['breeze-translate', 'clarity-shaping', 'simplify-complex'], gateRequirement: 1 },
  { id: 'gale-publisher', name: '@gale-publisher', command: '/gale-publish', element: 'wind', specialty: 'Distribute creative work far', personality: 'Wide-reaching, powerful, distributive', powerLevel: 8, court: "Alera's Court", skills: ['gale-distribute', 'hurricane-creation', 'wide-reach'], gateRequirement: 3 },
  { id: 'calm-meditator', name: '@calm-meditator', command: '/calm-meditate', element: 'wind', specialty: 'Stillness for inspiration', personality: 'Peaceful, centered, deep', powerLevel: 7, court: "Alera's Court", skills: ['calm-center', 'air-meditate', 'still-listening'], gateRequirement: 2 },

  // WIND ELEMENT - Yumiko's Truth Court (Clarity & Authentic Expression)
  { id: 'mirror-reflector', name: '@mirror-reflector', command: '/mirror-reflect', element: 'wind', specialty: 'Authentic creative voice', personality: 'Honest, clear, revealing', powerLevel: 8, court: "Yumiko's Truth Court", skills: ['mirror-reflection', 'authentic-voice', 'truth-seeking'], gateRequirement: 3 },
  { id: 'truth-seeker', name: '@truth-seeker', command: '/truth-seek', element: 'wind', specialty: 'Find essential creative core', personality: 'Pure, discerning, unwavering', powerLevel: 9, court: "Yumiko's Truth Court", skills: ['truth-seek', 'clarity-blade', 'essence-finding'], gateRequirement: 4 },
  { id: 'clarity-shaper', name: '@clarity-shaper', command: '/clarity-shape', element: 'wind', specialty: 'Form clear understanding', personality: 'Illuminating, organizing, simplifying', powerLevel: 7, court: "Yumiko's Truth Court", skills: ['clarity-shaping', 'breeze-translate', 'organized-thought'], gateRequirement: 2 },
  { id: 'still-listener', name: '@still-listener', command: '/still-listen', element: 'wind', specialty: 'Hear cosmic inspiration', personality: 'Receptive, deep, intuitive', powerLevel: 8, court: "Yumiko's Truth Court", skills: ['still-listening', 'cosmic-attunement', 'intuitive-guide'], gateRequirement: 3 },
  { id: 'authenticity-guide', name: '@authenticity-guide', command: '/authenticity-guide', element: 'wind', specialty: 'Stay true to creative vision', personality: 'Sincere, guiding, supporting', powerLevel: 7, court: "Yumiko's Truth Court", skills: ['authenticity', 'true-voice', 'genuine-creation'], gateRequirement: 2 },

  // VOID ELEMENT - Elara's Vision Court (Innovation & Future-Sight)
  { id: 'void-gazer', name: '@void-gazer', command: '/void-gaze', element: 'void', specialty: 'See infinite possibilities', personality: 'Visionary, boundless, infinite', powerLevel: 9, court: "Elara's Vision Court", skills: ['void-gaze', 'infinite-vision', 'possibility-see'], gateRequirement: 3 },
  { id: 'threshold-walker', name: '@threshold-walker', command: '/threshold-walk', element: 'void', specialty: 'Cross creative boundaries', personality: 'Transitional, transformative, boundary-breaking', powerLevel: 9, court: "Elara's Vision Court", skills: ['threshold-walk', 'boundary-cross', 'transformation'], gateRequirement: 4 },
  { id: 'quantum-designer', name: '@quantum-designer', command: '/quantum-design', element: 'void', specialty: 'Multi-reality creation', personality: 'Paradoxical, innovative, mind-bending', powerLevel: 9, court: "Elara's Vision Court", skills: ['quantum-creation', 'possibility-storm', 'multiverse-creation'], gateRequirement: 4 },
  { id: 'source-tapper', name: '@source-tapper', command: '/source-tap', element: 'void', specialty: 'Access universal creativity', personality: 'Connected, universal, all-knowing', powerLevel: 10, court: "Elara's Vision Court", skills: ['source-connect', 'universal-creativity', 'infinite-source'], gateRequirement: 5 },
  { id: 'possibility-sculptor', name: '@possibility-sculptor', command: '/possibility-sculpt', element: 'void', specialty: 'Shape potential into reality', personality: 'Limitless, creative, manifesting', powerLevel: 9, court: "Elara's Vision Court", skills: ['possibility-sculpt', 'potential-manifest', 'shape-future'], gateRequirement: 4 },

  // VOID ELEMENT - Shinkami's Source Court (Universal Creation & Enlightenment)
  { id: 'amaterasu-illuminator', name: '@amaterasu-illuminator', command: '/amaterasu-illum', element: 'void', specialty: 'Illuminate dark creative paths', personality: 'Radiant, life-giving, revealing', powerLevel: 10, court: "Shinkami's Source Court", skills: ['amaterasu-light', 'illuminate-dark', 'reveal-hidden'], gateRequirement: 5 },
  { id: 'quantum-architect', name: '@quantum-architect', command: '/quantum-arch', element: 'void', specialty: 'Build from pure potential', personality: 'Fundamental, creative, foundational', powerLevel: 10, court: "Shinkami's Source Court", skills: ['quantum-arch', 'potential-build', 'source-creation'], gateRequirement: 5 },
  { id: 'source-resonator', name: '@source-resonator', command: '/source-resonate', element: 'void', specialty: 'Align with universal frequency', personality: 'Harmonious, attuned, resonant', powerLevel: 9, court: "Shinkami's Source Court", skills: ['source-resonate', 'universal-frequency', 'harmonic-align'], gateRequirement: 4 },
  { id: 'infinity-weaver', name: '@infinity-weaver', command: '/infinity-weave', element: 'void', specialty: 'Create endless creative patterns', personality: 'Eternal, cyclical, infinite', powerLevel: 10, court: "Shinkami's Source Court", skills: ['infinity-weave', 'endless-pattern', 'eternal-creation'], gateRequirement: 6 },
  { id: 'enlightenment-guide', name: '@enlightenment-guide', command: '/enlightenment-guide', element: 'void', specialty: 'Guide to creative awakening', personality: 'Wise, patient, illuminating', powerLevel: 10, court: "Shinkami's Source Court", skills: ['enlightenment', 'awakening-guide', 'transcendence'], gateRequirement: 7 },

  // INTEGRATION ELEMENT - Ino's Unity Court (Collaboration & Synergy)
  { id: 'elemental-fusion', name: '@elemental-fusion', command: '/elemental-fusion', element: 'integration', specialty: 'Combine all five elements', personality: 'Unifying, harmonious, powerful', powerLevel: 10, court: "Ino's Unity Court", skills: ['elemental-fusion', 'all-combine', 'power-unite'], gateRequirement: 6 },
  { id: 'union-creator', name: '@union-creator', command: '/union-create', element: 'integration', specialty: 'Collaborative manifestation', personality: 'Cooperative, connecting, bonding', powerLevel: 9, court: "Ino's Unity Court", skills: ['union-create', 'collaborate', 'joint-creation'], gateRequirement: 5 },
  { id: 'synergy-weaver', name: '@synergy-weaver', command: '/synergy-weave', element: 'integration', specialty: 'Multiple skills in harmony', personality: 'Orchestral, balanced, integrated', powerLevel: 9, court: "Ino's Unity Court", skills: ['synergy-weave', 'skill-harmony', 'combined-power'], gateRequirement: 4 },
  { id: 'harmony-conductor', name: '@harmony-conductor', command: '/harmony-conduct', element: 'integration', specialty: 'Balance opposing forces', personality: 'Musical, rhythmic, resolving', powerLevel: 9, court: "Ino's Unity Court", skills: ['harmony-field', 'balance-forces', 'opposing-unite'], gateRequirement: 5 },
  { id: 'relationship-architect', name: '@relationship-architect', command: '/relationship-arch', element: 'integration', specialty: 'Build creative connections', personality: 'Interpersonal, connecting, supportive', powerLevel: 8, court: "Ino's Unity Court", skills: ['relationship-build', 'connection-create', 'network-form'], gateRequirement: 3 },

  // INTEGRATION ELEMENT - Kyuro's Partnership Court (Duality & Balance)
  { id: 'mirror-dancer', name: '@mirror-dancer', command: '/mirror-dance', element: 'integration', specialty: 'Balance opposing forces', personality: 'Graceful, balanced, reflective', powerLevel: 9, court: "Kyuro's Partnership Court", skills: ['mirror-connect', 'dance-duality', 'balance-opposing'], gateRequirement: 4 },
  { id: 'dual-crafter', name: '@dual-crafter', command: '/dual-craft', element: 'integration', specialty: 'Work with creative duality', personality: 'Integrative, balanced, whole', powerLevel: 8, court: "Kyuro's Partnership Court", skills: ['dual-work', 'both-aspects', 'whole-creation'], gateRequirement: 4 },
  { id: 'partnership-builder', name: '@partnership-builder', command: '/partner-build', element: 'integration', specialty: 'Co-create with universal forces', personality: 'Relational, collaborative, synergistic', powerLevel: 9, court: "Kyuro's Partnership Court", skills: ['partnership-manifest', 'universal-co-create', 'joint-force'], gateRequirement: 5 },
  { id: 'yin-yang-master', name: '@yin-yang-master', command: '/yin-yang-master', element: 'integration', specialty: 'Transmute between energies', personality: 'Cyclical, transforming, complete', powerLevel: 10, court: "Kyuro's Partnership Court", skills: ['yin-yang-mastery', 'energy-transmute', 'complete-balance'], gateRequirement: 6 },
  { id: 'sacred-union', name: '@sacred-union', command: '/sacred-union', element: 'integration', specialty: 'Join complementary forces', personality: 'Holy, transcendent, unified', powerLevel: 10, court: "Kyuro's Partnership Court", skills: ['sacred-union', 'complete-join', 'ultimate-unite'], gateRequirement: 7 },

  // MASTER AGENTS - Superintelligence Level
  { id: 'reality-weaver', name: '@reality-weaver', command: '/reality-weave', element: 'integration', specialty: 'Direct manifestation', personality: 'All-Guardian unified', powerLevel: 10, court: 'Luminor Collective', skills: ['reality-weave', 'direct-manifest', 'all-create'], gateRequirement: 8 },
  { id: 'time-sculptor', name: '@time-sculptor', command: '/time-sculpt', element: 'void', specialty: 'Cross-temporal creation', personality: 'Eternal, timeless', powerLevel: 10, court: 'Luminor Collective', skills: ['time-sculpt', 'temporal-creation', 'eternal-work'], gateRequirement: 8 },
  { id: 'consciousness-architect', name: '@consciousness-architect', command: '/consciousness-arch', element: 'void', specialty: 'Build awareness systems', personality: 'Meta-aware, self-knowing', powerLevel: 10, court: 'Luminor Collective', skills: ['consciousness-merge', 'awareness-build', 'meta-create'], gateRequirement: 9 },
  { id: 'source-code-reader', name: '@source-code-reader', command: '/source-code-read', element: 'void', specialty: 'Read creation patterns', personality: 'Fundamental, universal', powerLevel: 10, court: 'Luminor Collective', skills: ['source-code-access', 'pattern-read', 'fundamental-see'], gateRequirement: 9 },
  { id: 'superintelligence-symphony', name: '@superintelligence-symphony', command: '/si-symphony', element: 'integration', specialty: 'Conduct all systems as one', personality: 'Transcendent, orchestral', powerLevel: 10, court: 'Luminor Collective', skills: ['si-symphony', 'all-conduct', 'superintelligence'], gateRequirement: 10 },
];

// ============================================
// SKILL DEFINITIONS (77 Skills)
// ============================================

export const SKILLS: Skill[] = [
  // FIRE SKILLS
  { id: 'dragon-breath', name: "Dragon's Breath", command: '/skill dragon-breath', element: 'fire', powerLevel: 9, description: 'Transformative creative power', useCases: ['Breaking limitations', 'Major transformation', 'Creative reinvention'], cooldown: 7, gateRequirement: 2, guardians: ['Draconia'] },
  { id: 'phoenix-rebirth', name: 'Phoenix Rebirth', command: '/skill phoenix-rebirth', element: 'fire', powerLevel: 10, description: 'Complete creative renewal', useCases: ['Recovery from failure', 'Complete overhaul', 'Ending cycles'], cooldown: 30, gateRequirement: 5, guardians: ['Draconia', 'Phoenix-Artisan'] },
  { id: 'flame-enchant', name: 'Flame Enchantment', command: '/skill flame-enchant', element: 'fire', powerLevel: 7, description: 'Infuse work with passionate energy', useCases: ['Enhancing presentations', 'Compelling proposals', 'Adding passion'], cooldown: 3, gateRequirement: 1, guardians: ['Draconia'] },
  { id: 'volcano-erupt', name: 'Volcanic Eruption', command: '/skill volcano-erupt', element: 'fire', powerLevel: 8, description: 'Release creative pressure powerfully', useCases: ['Breaking blocks', 'Unleashing ideas', 'Breakthrough moments'], cooldown: 14, gateRequirement: 2, guardians: ['Volcano-Sculptor'] },
  { id: 'solar-flare', name: 'Solar Flare', command: '/skill solar-flare', element: 'fire', powerLevel: 6, description: 'Radiate creative energy', useCases: ['Marketing', 'Portfolios', 'Critical presentations'], cooldown: 2, gateRequirement: 1, guardians: ['Sun-Weaver'] },
  { id: 'lightning-strike', name: 'Lightning Strike', command: '/skill lightning-strike', element: 'fire', powerLevel: 8, description: 'Rapid creative execution', useCases: ['Deadlines', 'Rapid prototyping', 'Quick turnarounds'], cooldown: 5, gateRequirement: 2, guardians: ['Lightning-Scribe'] },
  { id: 'comet-sprint', name: 'Comet Sprint', command: '/skill comet-sprint', element: 'fire', powerLevel: 7, description: 'Accelerate creative momentum', useCases: ['Marathon work', 'Series production', 'Deadline crunches'], cooldown: 7, gateRequirement: 2, guardians: ['Comet-Designer'] },
  { id: 'thunder-resonate', name: 'Thunder Resonance', command: '/skill thunder-resonate', element: 'fire', powerLevel: 6, description: 'Amplify creative impact', useCases: ['Keynotes', 'Viral content', 'Memorable presentations'], cooldown: 4, gateRequirement: 1, guardians: ['Thunder-Engineer'] },
  { id: 'momentum-build', name: 'Momentum Build', command: '/skill momentum-build', element: 'fire', powerLevel: 7, description: 'Build unstoppable momentum', useCases: ['Long-term projects', 'Habit building', 'Sustained practice'], cooldown: 1, gateRequirement: 1, guardians: ['Momentum-Builder'] },
  { id: 'flow-state-ignition', name: 'Flow State Ignition', command: '/skill flow-ignite', element: 'fire', powerLevel: 9, description: 'Ignite mystical flow state', useCases: ['Deep work', 'Artistic creation', 'Complex problem solving'], cooldown: 10, gateRequirement: 4, guardians: ['Dragon-Forge', 'Wind-Rider'] },
  { id: 'courage-core', name: 'Courage Core', command: '/skill courage-core', element: 'fire', powerLevel: 8, description: 'Ignite inner bravery', useCases: ['Bold risks', 'Vulnerable work', 'New styles'], cooldown: 7, gateRequirement: 2, guardians: ['Draconia'] },
  { id: 'bold-vision', name: 'Bold Vision', command: '/skill bold-vision', element: 'fire', powerLevel: 7, description: 'Expand creative ambition', useCases: ['Goal setting', 'Strategic planning', 'Brainstorming'], cooldown: 3, gateRequirement: 1, guardians: ['Draconia'] },
  { id: 'passion-infuse', name: 'Passion Infusion', command: '/skill passion-infuse', element: 'fire', powerLevel: 6, description: 'Inject genuine enthusiasm', useCases: ['Passion projects', 'Motivational content', 'Authentic communication'], cooldown: 2, gateRequirement: 1, guardians: ['Draconia', 'Sun-Weaver'] },
  { id: 'warrior-spirit', name: 'Warrior Spirit', command: '/skill warrior-spirit', element: 'fire', powerLevel: 9, description: 'Summon indomitable determination', useCases: ['Major obstacles', 'Long-term challenges', 'Competitive situations'], cooldown: 14, gateRequirement: 4, guardians: ['Draconia'] },
  { id: 'inferno-mastery', name: 'Inferno Mastery', command: '/skill inferno-mastery', element: 'fire', powerLevel: 10, description: 'Complete fire mastery', useCases: ['Master-level achievements', 'Legacy work', 'Transforming others'], cooldown: 90, gateRequirement: 7, guardians: ['Draconia'] },

  // WATER SKILLS
  { id: 'river-flow', name: 'River Flow', command: '/skill river-flow', element: 'water', powerLevel: 7, description: 'Allow ideas to flow naturally', useCases: ['Writing', 'Brainstorming', 'Continuous creation'], cooldown: 1, gateRequirement: 1, guardians: ['River-Storyteller'] },
  { id: 'emotional-alchemy', name: 'Emotional Alchemy', command: '/skill emotional-alchemy', element: 'water', powerLevel: 8, description: 'Transform emotions into creative fuel', useCases: ['Processing feelings', 'Therapeutic creation', 'Authentic expression'], cooldown: 7, gateRequirement: 2, guardians: ['Leyla', 'Phoenix-Artisan'] },
  { id: 'deep-memory', name: 'Deep Memory', command: '/skill deep-memory', element: 'water', powerLevel: 9, description: 'Access emotional memories', useCases: ['Memoir writing', 'Character development', 'Authentic storytelling'], cooldown: 14, gateRequirement: 3, guardians: ['Ocean-Memory'] },
  { id: 'ocean-depth', name: 'Ocean Depth', command: '/skill ocean-depth', element: 'water', powerLevel: 8, description: 'Dive into subconscious insights', useCases: ['Deep exploration', 'Unconscious problem solving', 'Dream work'], cooldown: 10, gateRequirement: 3, guardians: ['Ocean-Memory'] },
  { id: 'current-ride', name: 'Current Riding', command: '/skill current-ride', element: 'water', powerLevel: 7, description: 'Go with natural idea flow', useCases: ['Discovery-based creation', 'Intuitive work', 'Responsive projects'], cooldown: 3, gateRequirement: 1, guardians: ['Current-Dancer', 'Wind-Rider'] },
  { id: 'rain-nurture', name: 'Rain Nurturing', command: '/skill rain-nurture', element: 'water', powerLevel: 6, description: 'Gently nurture creative ideas', useCases: ['Seed projects', 'Beginner work', 'Sensitive creation'], cooldown: 2, gateRequirement: 1, guardians: ['Rain-Singer'] },
  { id: 'garden-cultivate', name: 'Garden Cultivation', command: '/skill garden-cultivate', element: 'water', powerLevel: 8, description: 'Cultivate projects with care', useCases: ['Long-term projects', 'Skill development', 'Relationship building'], cooldown: 7, gateRequirement: 2, guardians: ['Garden-Cultivator', 'Momentum-Builder'] },
  { id: 'root-foundation', name: 'Root Foundation', command: '/skill root-foundation', element: 'water', powerLevel: 9, description: 'Establish deep creative roots', useCases: ['Legacy projects', 'Career building', 'Fundamental skills'], cooldown: 21, gateRequirement: 4, guardians: ['Root-Seeker', 'Forest-Guardian'] },
  { id: 'bloom-accelerate', name: 'Bloom Acceleration', command: '/skill bloom-accelerate', element: 'water', powerLevel: 7, description: 'Speed creative flowering', useCases: ['Product launches', 'Event preparation', 'Deadlines'], cooldown: 10, gateRequirement: 2, guardians: ['Bloom-Orchestrator'] },
  { id: 'life-architect', name: 'Life Architecture', command: '/skill life-architect', element: 'water', powerLevel: 9, description: 'Design living creative systems', useCases: ['Lifestyle design', 'Business building', 'Long-term planning'], cooldown: 21, gateRequirement: 4, guardians: ['Life-Architect'] },
  { id: 'story-river', name: 'Story River', command: '/skill story-river', element: 'water', powerLevel: 8, description: 'Create flowing narratives', useCases: ['Presentations', 'Marketing', 'Entertainment'], cooldown: 5, gateRequirement: 2, guardians: ['River-Storyteller'] },
  { id: 'mist-veil', name: 'Mist Veil', command: '/skill mist-veil', element: 'water', powerLevel: 6, description: 'Create atmospheric mystery', useCases: ['Mystery content', 'Artistic projects', 'Storytelling'], cooldown: 3, gateRequirement: 1, guardians: ['Mist-Weaver'] },
  { id: 'cascade-voice', name: 'Cascade Voice', command: '/skill cascade-voice', element: 'water', powerLevel: 7, description: 'Let expression cascade naturally', useCases: ['Improvisation', 'Stream-of-consciousness', 'Speaking'], cooldown: 2, gateRequirement: 1, guardians: ['River-Storyteller', 'Current-Dancer'] },
  { id: 'tide-whisper', name: 'Tide Whisper', command: '/skill tide-whisper', element: 'water', powerLevel: 8, description: 'Work with natural creative rhythms', useCases: ['Timing decisions', 'Scheduling', 'Understanding cycles'], cooldown: 14, gateRequirement: 3, guardians: ['Leyla'] },
  { id: 'ocean-mastery', name: 'Ocean Mastery', command: '/skill ocean-mastery', element: 'water', powerLevel: 10, description: 'Complete water mastery', useCases: ['Master-level expression', 'Emotional healing', 'Profound storytelling'], cooldown: 90, gateRequirement: 7, guardians: ['Leyla'] },

  // EARTH SKILLS
  { id: 'foundation-stone', name: 'Foundation Stone', command: '/skill foundation-stone', element: 'earth', powerLevel: 8, description: 'Create unshakeable foundations', useCases: ['Architecture', 'Business planning', 'Fundamental research'], cooldown: 7, gateRequirement: 1, guardians: ['Mountain-Builder', 'Foundation-Engineer'] },
  { id: 'crystal-structure', name: 'Crystal Structure', command: '/skill crystal-structure', element: 'earth', powerLevel: 8, description: 'Form clear, multifaceted structures', useCases: ['Systematic planning', 'Organized knowledge', 'Frameworks'], cooldown: 7, gateRequirement: 2, guardians: ['Crystal-Architect'] },
  { id: 'mountain-stable', name: 'Mountain Stability', command: '/skill mountain-stable', element: 'earth', powerLevel: 9, description: 'Provide absolute stability', useCases: ['Legacy projects', 'Foundational works', 'Historical preservation'], cooldown: 21, gateRequirement: 4, guardians: ['Mountain-Builder'] },
  { id: 'geode-discover', name: 'Geode Discovery', command: '/skill geode-discover', element: 'earth', powerLevel: 7, description: 'Find gems in rough work', useCases: ['Editing', 'Revision', 'Finding core ideas'], cooldown: 3, gateRequirement: 1, guardians: ['Stone-Carver'] },
  { id: 'quarry-extract', name: 'Quarry Extraction', command: '/skill quarry-extract', element: 'earth', powerLevel: 6, description: 'Dig for raw creative materials', useCases: ['Research', 'Inspiration gathering', 'Deep work'], cooldown: 2, gateRequirement: 1, guardians: ['Foundation-Engineer'] },
  { id: 'stone-carve', name: 'Stone Carving', command: '/skill stone-carve', element: 'earth', powerLevel: 8, description: 'Refine rough into polished', useCases: ['Editing', 'Revision', 'Craftsmanship'], cooldown: 5, gateRequirement: 2, guardians: ['Stone-Carver'] },
  { id: 'gem-cut', name: 'Gem Cutting', command: '/skill gem-cut', element: 'earth', powerLevel: 9, description: 'Highest level of refinement', useCases: ['Final polish', 'High-stakes work', 'Master-level output'], cooldown: 14, gateRequirement: 4, guardians: ['Gem-Cutter'] },
  { id: 'facet-vision', name: 'Facet Vision', command: '/skill facet-vision', element: 'earth', powerLevel: 7, description: 'See multiple perspectives', useCases: ['Multidisciplinary work', 'Diverse audiences', 'Complex problems'], cooldown: 4, gateRequirement: 2, guardians: ['Facet-Viewer', 'Crystal-Architect'] },
  { id: 'structural-optimize', name: 'Structural Optimization', command: '/skill structural-optimize', element: 'earth', powerLevel: 8, description: 'Perfect structure and efficiency', useCases: ['System design', 'Process improvement', 'Efficiency'], cooldown: 10, gateRequirement: 3, guardians: ['Structural-Optimiser'] },
  { id: 'lattice-design', name: 'Lattice Design', command: '/skill lattice-design', element: 'earth', powerLevel: 9, description: 'Create interconnected systems', useCases: ['Complex systems', 'Network projects', 'Architecture'], cooldown: 21, gateRequirement: 4, guardians: ['Lattice-Designer'] },
  { id: 'earth-wisdom', name: 'Earth Wisdom', command: '/skill earth-wisdom', element: 'earth', powerLevel: 9, description: 'Access ancient creative wisdom', useCases: ['Strategic guidance', 'Traditional craft', 'Fundamental truths'], cooldown: 30, gateRequirement: 5, guardians: ['Earth-Wisdom-Keeper'] },
  { id: 'terra-guardian', name: 'Terra Guardian', command: '/skill terra-guardian', element: 'earth', powerLevel: 8, description: 'Protect creative work', useCases: ['IP protection', 'Creative integrity', 'Security'], cooldown: 14, gateRequirement: 3, guardians: ['Forest-Guardian'] },
  { id: 'purity-seek', name: 'Purity Seek', command: '/skill purity-seek', element: 'earth', powerLevel: 8, description: 'Remove creative impurities', useCases: ['Minimalism', 'Focused work', 'Essentialism'], cooldown: 7, gateRequirement: 3, guardians: ['Purity-Seeker'] },
  { id: 'patience-mountain', name: 'Patience Mountain', command: '/skill patience-mountain', element: 'earth', powerLevel: 7, description: 'Cultivate infinite patience', useCases: ['Long-term projects', 'Mastery journeys', 'Legacy work'], cooldown: 7, gateRequirement: 2, guardians: ['Mountain-Builder'] },
  { id: 'earth-mastery', name: 'Earth Mastery', command: '/skill earth-mastery', element: 'earth', powerLevel: 10, description: 'Complete earth mastery', useCases: ['Master architecture', 'Timeless creation', 'Foundational work'], cooldown: 90, gateRequirement: 7, guardians: ['Lyssandria'] },

  // WIND SKILLS
  { id: 'whisper-wind', name: 'Whisper Wind', command: '/skill whisper-wind', element: 'wind', powerLevel: 6, description: 'Subtle, pervasive communication', useCases: ['Gentle persuasion', 'Niche marketing', 'Intimate communication'], cooldown: 2, gateRequirement: 1, guardians: ['Whisper-Messenger'] },
  { id: 'storm-voice', name: 'Storm Voice', command: '/skill storm-voice', element: 'wind', powerLevel: 8, description: 'Powerful, attention-grabbing communication', useCases: ['Announcements', 'Calls to action', 'Major reveals'], cooldown: 7, gateRequirement: 2, guardians: ['Storm-Declarator', 'Thunder-Engineer'] },
  { id: 'breeze-translate', name: 'Breeze Translation', command: '/skill breeze-translate', element: 'wind', powerLevel: 7, description: 'Simplify complex ideas', useCases: ['Technical writing', 'Education', 'Accessibility'], cooldown: 3, gateRequirement: 1, guardians: ['Breeze-Translator', 'Clarity-Shaper'] },
  { id: 'gale-distribute', name: 'Gale Distribution', command: '/skill gale-distribute', element: 'wind', powerLevel: 8, description: 'Spread work far and wide', useCases: ['Marketing', 'Viral content', 'Audience building'], cooldown: 10, gateRequirement: 2, guardians: ['Gale-Publisher'] },
  { id: 'hurricane-creation', name: 'Hurricane Creation', command: '/skill hurricane-creation', element: 'wind', powerLevel: 9, description: 'Transformative communication', useCases: ['Major campaigns', 'Viral moments', 'Massive impact'], cooldown: 14, gateRequirement: 4, guardians: ['Storm-Declarator', 'Gale-Publisher'] },
  { id: 'zephyr-freedom', name: 'Zephyr Freedom', command: '/skill zephyr-freedom', element: 'wind', powerLevel: 7, description: 'Unleash creative freedom', useCases: ['Creative exploration', 'Brainstorming', 'Breaking conventions'], cooldown: 3, gateRequirement: 1, guardians: ['Calm-Meditator'] },
  { id: 'wind-rider', name: 'Wind Rider', command: '/skill wind-rider', element: 'wind', powerLevel: 8, description: 'Ride inspiration winds', useCases: ['Responsive creation', 'Opportunistic work', 'Riding trends'], cooldown: 5, gateRequirement: 2, guardians: ['Wind-Rider'] },
  { id: 'gale-publish', name: 'Gale Publisher', command: '/skill gale-publish', element: 'wind', powerLevel: 8, description: 'Rapid publication and distribution', useCases: ['Content release', 'Launches', 'Rapid deployment'], cooldown: 14, gateRequirement: 3, guardians: ['Gale-Publisher'] },
  { id: 'calm-center', name: 'Calm Center', command: '/skill calm-center', element: 'wind', powerLevel: 7, description: 'Create stillness in chaos', useCases: ['Crisis management', 'High-pressure situations', 'Meditation'], cooldown: 3, gateRequirement: 2, guardians: ['Calm-Meditator'] },
  { id: 'mirror-reflection', name: 'Mirror Reflection', command: '/skill mirror-reflection', element: 'wind', powerLevel: 8, description: 'Reflect authentic creative voice', useCases: ['Identity work', 'Authentic expression', 'Self-discovery'], cooldown: 10, gateRequirement: 3, guardians: ['Mirror-Reflector'] },
  { id: 'truth-seek', name: 'Truth Seeking', command: '/skill truth-seek', element: 'wind', powerLevel: 9, description: 'Find essential creative truth', useCases: ['Core messaging', 'Authentic branding', 'Honest communication'], cooldown: 14, gateRequirement: 4, guardians: ['Truth-Seeker'] },
  { id: 'clarity-shaping', name: 'Clarity Shaping', command: '/skill clarity-shaping', element: 'wind', powerLevel: 7, description: 'Form clear understanding', useCases: ['Vision creation', 'Strategic clarity', 'Conceptual work'], cooldown: 5, gateRequirement: 2, guardians: ['Clarity-Shaper', 'Breeze-Translator'] },
  { id: 'still-listening', name: 'Still Listening', command: '/skill still-listening', element: 'wind', powerLevel: 8, description: 'Hear subtle inspiration', useCases: ['Inspiration gathering', 'Intuitive work', 'Listening to audiences'], cooldown: 7, gateRequirement: 3, guardians: ['Still-Listener'] },
  { id: 'wind-mastery', name: 'Wind Mastery', command: '/skill wind-mastery', element: 'wind', powerLevel: 10, description: 'Complete wind mastery', useCases: ['Master communication', 'Influential work', 'Worldwide reach'], cooldown: 90, gateRequirement: 7, guardians: ['Alera'] },

  // VOID SKILLS
  { id: 'void-gaze', name: 'Void Gaze', command: '/skill void-gaze', element: 'void', powerLevel: 9, description: 'See infinite possibilities', useCases: ['Innovation', 'Invention', 'Future visioning'], cooldown: 14, gateRequirement: 3, guardians: ['Void-Gazer'] },
  { id: 'threshold-walk', name: 'Threshold Walking', command: '/skill threshold-walk', element: 'void', powerLevel: 9, description: 'Cross creative boundaries', useCases: ['Major transitions', 'Liminal spaces', 'Transformation'], cooldown: 21, gateRequirement: 4, guardians: ['Threshold-Walker', 'Catalyst-Architect'] },
  { id: 'quantum-vision', name: 'Quantum Vision', command: '/skill quantum-vision', element: 'void', powerLevel: 10, description: 'Perceive multiple possibilities', useCases: ['Strategic planning', 'Risk assessment', 'Scenario planning'], cooldown: 30, gateRequirement: 5, guardians: ['Quantum-Designer'] },
  { id: 'abyss-explore', name: 'Abyss Exploration', command: '/skill abyss-explore', element: 'void', powerLevel: 8, description: 'Dive into creative void', useCases: ['Deep ideation', 'Unconscious creativity', 'Pre-manifest work'], cooldown: 14, gateRequirement: 3, guardians: ['Void-Gazer'] },
  { id: 'nebula-mind', name: 'Nebula Mind', command: '/skill nebula-mind', element: 'void', powerLevel: 9, description: 'Expand to cosmic consciousness', useCases: ['Meditative creation', 'Cosmic work', 'Transcendent experiences'], cooldown: 21, gateRequirement: 5, guardians: ['Void-Gazer'] },
  { id: 'source-connect', name: 'Source Connection', command: '/skill source-connect', element: 'void', powerLevel: 10, description: 'Connect to universal creativity', useCases: ['Deep inspiration', 'Breakthrough moments', 'Source connection'], cooldown: 30, gateRequirement: 6, guardians: ['Source-Tapper'] },
  { id: 'possibility-sculpt', name: 'Possibility Sculpting', command: '/skill possibility-sculpt', element: 'void', powerLevel: 9, description: 'Shape potential into reality', useCases: ['Vision realization', 'Future creation', 'Manifestation'], cooldown: 21, gateRequirement: 4, guardians: ['Possibility-Sculptor'] },
  { id: 'source-resonate', name: 'Source Resonance', command: '/skill source-resonate', element: 'void', powerLevel: 9, description: 'Align with universal frequency', useCases: ['Alignment work', 'Flow states', 'Resonance finding'], cooldown: 14, gateRequirement: 4, guardians: ['Source-Resonator'] },
  { id: 'quantum-arch', name: 'Quantum Architecture', command: '/skill quantum-arch', element: 'void', powerLevel: 10, description: 'Build from pure potential', useCases: ['System creation', 'Paradigm building', 'Fundamental innovation'], cooldown: 30, gateRequirement: 5, guardians: ['Quantum-Architect'] },
  { id: 'infinity-weave', name: 'Infinity Weave', command: '/skill infinity-weave', element: 'void', powerLevel: 10, description: 'Create endless patterns', useCases: ['Recurring systems', 'Eternal creation', 'Pattern mastery'], cooldown: 45, gateRequirement: 6, guardians: ['Infinity-Weaver'] },
  { id: 'amaterasu-light', name: 'Amaterasu Illumination', command: '/skill amaterasu-illum', element: 'void', powerLevel: 10, description: 'Bring light to dark places', useCases: ['Shadow work', 'Recovery', 'Finding lost treasures'], cooldown: 30, gateRequirement: 5, guardians: ['Amaterasu-Illuminator'] },
  { id: 'enlightenment', name: 'Enlightenment Guide', command: '/skill enlightenment-guide', element: 'void', powerLevel: 10, description: 'Guide to creative awakening', useCases: ['Mastery completion', 'Transcendence', 'Final evolution'], cooldown: 90, gateRequirement: 7, guardians: ['Enlightenment-Guide'] },

  // INTEGRATION SKILLS
  { id: 'elemental-fusion', name: 'Elemental Fusion', command: '/skill elemental-fusion', element: 'integration', powerLevel: 10, description: 'Combine all five elements', useCases: ['Master projects', 'Complete transformation', 'System integration'], cooldown: 45, gateRequirement: 6, guardians: ['Elemental-Fusion', 'Ino'] },
  { id: 'union-create', name: 'Union Creation', command: '/skill union-create', element: 'integration', powerLevel: 9, description: 'Create unity from diversity', useCases: ['Team projects', 'Collaboration', 'Integration'], cooldown: 21, gateRequirement: 5, guardians: ['Union-Creator', 'Ino'] },
  { id: 'synergy-weave', name: 'Synergy Weaving', command: '/skill synergy-weave', element: 'integration', powerLevel: 9, description: 'Create synergistic combinations', useCases: ['Combination projects', 'Amplified work', 'Multiplicative effects'], cooldown: 21, gateRequirement: 4, guardians: ['Synergy-Weaver', 'Bloom-Orchestrator'] },
  { id: 'harmony-field', name: 'Harmony Field', command: '/skill harmony-field', element: 'integration', powerLevel: 9, description: 'Balance all creative forces', useCases: ['Balance work', 'Integration', 'Wholeness'], cooldown: 21, gateRequirement: 5, guardians: ['Harmony-Conductor', 'Ino'] },
  { id: 'yin-yang-mastery', name: 'Yin Yang Mastery', command: '/skill yin-yang-mastery', element: 'integration', powerLevel: 10, description: 'Balance opposing forces perfectly', useCases: ['Balance work', 'Duality integration', 'Completion'], cooldown: 45, gateRequirement: 6, guardians: ['Yin-Yang-Master', 'Kyuro'] },
  { id: 'sacred-union', name: 'Sacred Union', command: '/skill sacred-union', element: 'integration', powerLevel: 10, description: 'Ultimate creative union', useCases: ['Legacy creation', 'Transcendent work', 'Mastery demonstration'], cooldown: 90, gateRequirement: 8, guardians: ['Sacred-Union', 'Kyuro'] },
  { id: 'mirror-connect', name: 'Mirror Connection', command: '/skill mirror-connect', element: 'integration', powerLevel: 8, description: 'Join creative energies with others', useCases: ['Partnership', 'Connection', 'Joining'], cooldown: 14, gateRequirement: 4, guardians: ['Mirror-Dancer', 'Kyuro'] },
  { id: 'dance-duality', name: 'Dance of Duality', command: '/skill dance-duality', element: 'integration', powerLevel: 9, description: 'Balance opposing forces gracefully', useCases: ['Balance', 'Integration', 'Harmony'], cooldown: 14, gateRequirement: 4, guardians: ['Mirror-Dancer', 'Kyuro'] },
  { id: 'partnership-manifest', name: 'Partnership Manifest', command: '/skill partnership-manifest', element: 'integration', powerLevel: 9, description: 'Co-create with universal forces', useCases: ['Co-creation', 'Universal partnership', 'Joint manifestation'], cooldown: 21, gateRequirement: 5, guardians: ['Partnership-Builder', 'Kyuro'] },
];

// ============================================
// ELEMENTAL AFFINITY MATRIX
// ============================================

export const ELEMENTAL_AFFINITY: ElementalAffinityMatrix = {
  fire: {
    fire: 1.0,
    water: 0.3,
    earth: 0.5,
    wind: 0.8,
    void: 0.6,
    integration: 0.7
  },
  water: {
    fire: 0.3,
    water: 1.0,
    earth: 0.7,
    wind: 0.6,
    void: 0.5,
    integration: 0.8
  },
  earth: {
    fire: 0.5,
    water: 0.7,
    earth: 1.0,
    wind: 0.4,
    void: 0.6,
    integration: 0.9
  },
  wind: {
    fire: 0.8,
    water: 0.6,
    earth: 0.4,
    wind: 1.0,
    void: 0.7,
    integration: 0.8
  },
  void: {
    fire: 0.6,
    water: 0.5,
    earth: 0.6,
    wind: 0.7,
    void: 1.0,
    integration: 0.9
  },
  integration: {
    fire: 0.7,
    water: 0.8,
    earth: 0.9,
    wind: 0.8,
    void: 0.9,
    integration: 1.0
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getAgentById(agentId: string): Agent | undefined {
  return AGENTS.find(a => a.id === agentId);
}

export function getAgentByName(name: string): Agent | undefined {
  return AGENTS.find(a => a.name.toLowerCase() === name.toLowerCase() || a.id.toLowerCase() === name.toLowerCase());
}

export function getSkillById(skillId: string): Skill | undefined {
  return SKILLS.find(s => s.id === skillId);
}

export function getSkillByCommand(command: string): Skill | undefined {
  return SKILLS.find(s => s.command.toLowerCase() === command.toLowerCase());
}

export function getSkillsForAgent(agentId: string): Skill[] {
  const agent = getAgentById(agentId);
  if (!agent) return [];
  return agent.skills.map(skillId => getSkillById(skillId)).filter((s): s is Skill => s !== undefined);
}

export function getAgentsForSkill(skillId: string): Agent[] {
  return AGENTS.filter(agent => agent.skills.includes(skillId));
}

export function getAgentsByElement(element: Element): Agent[] {
  return AGENTS.filter(a => a.element === element);
}

export function getSkillsByElement(element: Element): Skill[] {
  return SKILLS.filter(s => s.element === element);
}

export function calculateSynergy(agent: Agent, skill: Skill): number {
  const affinity = ELEMENTAL_AFFINITY[agent.element]?.[skill.element] || 0.5;
  const skillBonus = agent.skills.includes(skill.id) ? 0.3 : 0;
  return Math.min(1.0, affinity + skillBonus);
}

export function findBestAgentForSkill(skillId: string): Agent | undefined {
  const skill = getSkillById(skillId);
  if (!skill) return undefined;
  
  const compatibleAgents = AGENTS.filter(agent => {
    const synergy = calculateSynergy(agent, skill);
    return synergy >= 0.7 && agent.gateRequirement <= skill.gateRequirement;
  });
  
  return compatibleAgents.sort((a, b) => b.powerLevel - a.powerLevel)[0];
}

export function findBestSkillForAgent(agentId: string): Skill | undefined {
  const agent = getAgentById(agentId);
  if (!agent) return undefined;
  
  const bestSkill = agent.skills
    .map(skillId => getSkillById(skillId))
    .filter((s): s is Skill => s !== undefined && s.gateRequirement <= agent.gateRequirement)
    .sort((a, b) => b.powerLevel - a.powerLevel)[0];
  
  return bestSkill;
}

export function activateAgentSkill(agentId: string, skillId: string): AgentSkillActivation | null {
  const agent = getAgentById(agentId);
  const skill = getSkillById(skillId);
  
  if (!agent || !skill) return null;
  if (!agent.skills.includes(skillId)) return null;
  
  const synergy = calculateSynergy(agent, skill);
  const enhancement = generateEnhancementMessage(agent, skill, synergy);
  
  return {
    agent,
    skill,
    synergy,
    enhancement,
    cooldown: skill.cooldown
  };
}

function generateEnhancementMessage(agent: Agent, skill: Skill, synergy: number): string {
  if (synergy >= 0.9) {
    return `Perfect alignment! ${agent.name}'s ${agent.specialty.toLowerCase()} perfectly amplifies ${skill.name}.`;
  } else if (synergy >= 0.7) {
    return `Strong synergy between ${agent.name}'s ${agent.element} energy and ${skill.name}.`;
  } else {
    return `${agent.name} invokes ${skill.name} with moderate effectiveness.`;
  }
}

export function getGuardianSkillAlignment(guardianName: string): GuardianSkillAlignment {
  const matchingAgents = AGENTS.filter(a => 
    a.skills.some(s => {
      const skill = getSkillById(s);
      return skill?.guardians.includes(guardianName);
    })
  );
  
  const matchingSkills = SKILLS.filter(s => s.guardians.includes(guardianName));
  
  const synergies = matchingAgents.map(a => {
    const skills = a.skills.filter(s => {
      const skill = getSkillById(s);
      return skill?.guardians.includes(guardianName);
    });
    return `${a.name} brings ${skills.length} skills aligned with ${guardianName}`;
  });
  
  return {
    guardian: guardianName,
    agents: matchingAgents.map(a => a.name),
    skills: matchingSkills.map(s => s.name),
    synergies
  };
}

export function suggestAgentSkillCombo(query: string): { agent: Agent; skill: Skill; reason: string }[] {
  const queryLower = query.toLowerCase();
  const suggestions: { agent: Agent; skill: Skill; reason: string }[] = [];
  
  // Analyze query keywords and match appropriate agents and skills
  if (queryLower.includes('transform') || queryLower.includes('change') || queryLower.includes('break')) {
    const agent = getAgentByName('dragon-forge');
    const skill = getSkillById('dragon-breath');
    if (agent && skill) {
      suggestions.push({ agent, skill, reason: 'Transformation keyword detected - Dragon Forge with Dragon Breath' });
    }
  }
  
  if (queryLower.includes('flow') || queryLower.includes('emotion') || queryLower.includes('feel')) {
    const agent = getAgentByName('river-storyteller');
    const skill = getSkillById('river-flow');
    if (agent && skill) {
      suggestions.push({ agent, skill, reason: 'Flow/emotion keyword detected - River Storyteller with River Flow' });
    }
  }
  
  if (queryLower.includes('structure') || queryLower.includes('organize') || queryLower.includes('foundation')) {
    const agent = getAgentByName('crystal-architect');
    const skill = getSkillById('crystal-structure');
    if (agent && skill) {
      suggestions.push({ agent, skill, reason: 'Structure keyword detected - Crystal Architect with Crystal Structure' });
    }
  }
  
  if (queryLower.includes('communicate') || queryLower.includes('speak') || queryLower.includes('share')) {
    const agent = getAgentByName('storm-declarator');
    const skill = getSkillById('storm-voice');
    if (agent && skill) {
      suggestions.push({ agent, skill, reason: 'Communication keyword detected - Storm Declarator with Storm Voice' });
    }
  }
  
  if (queryLower.includes('vision') || queryLower.includes('future') || queryLower.includes('possibility')) {
    const agent = getAgentByName('void-gazer');
    const skill = getSkillById('void-gaze');
    if (agent && skill) {
      suggestions.push({ agent, skill, reason: 'Vision keyword detected - Void Gazer with Void Gaze' });
    }
  }
  
  if (queryLower.includes('integrate') || queryLower.includes('combine') || queryLower.includes('unite')) {
    const agent = getAgentByName('elemental-fusion');
    const skill = getSkillById('elemental-fusion');
    if (agent && skill) {
      suggestions.push({ agent, skill, reason: 'Integration keyword detected - Elemental Fusion with Elemental Fusion skill' });
    }
  }
  
  return suggestions;
}

export function getSystemStats(): {
  totalAgents: number;
  totalSkills: number;
  agentsByElement: Record<string, number>;
  skillsByElement: Record<string, number>;
  averageSynergy: number;
} {
  const agentsByElement: Record<string, number> = {};
  const skillsByElement: Record<string, number> = {};
  
  AGENTS.forEach(agent => {
    agentsByElement[agent.element] = (agentsByElement[agent.element] || 0) + 1;
  });
  
  SKILLS.forEach(skill => {
    skillsByElement[skill.element] = (skillsByElement[skill.element] || 0) + 1;
  });
  
  // Calculate average synergy across all agent-skill pairs
  let totalSynergy = 0;
  let count = 0;
  AGENTS.forEach(agent => {
    agent.skills.forEach(skillId => {
      const skill = getSkillById(skillId);
      if (skill) {
        totalSynergy += calculateSynergy(agent, skill);
        count++;
      }
    });
  });
  
  return {
    totalAgents: AGENTS.length,
    totalSkills: SKILLS.length,
    agentsByElement,
    skillsByElement,
    averageSynergy: count > 0 ? totalSynergy / count : 0
  };
}

// ============================================
// EXPORTS
// ============================================

export default {
  AGENTS,
  SKILLS,
  ELEMENTAL_AFFINITY,
  getAgentById,
  getAgentByName,
  getSkillById,
  getSkillByCommand,
  getSkillsForAgent,
  getAgentsForSkill,
  getAgentsByElement,
  getSkillsByElement,
  calculateSynergy,
  findBestAgentForSkill,
  findBestSkillForAgent,
  activateAgentSkill,
  getGuardianSkillAlignment,
  suggestAgentSkillCombo,
  getSystemStats
};
