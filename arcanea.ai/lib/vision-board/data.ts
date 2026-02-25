// ============================================
// ARCANEA VISION BOARD DATA SYSTEM
// Comprehensive vision data extracted from all .md files
// ============================================

export interface VisionArea {
  id: string
  title: string
  tagline: string
  description: string
  icon: string
  gradient: string
  glow: string
  status: 'active' | 'building' | 'planned' | 'vision'
  progress: number
  keyFeatures: string[]
  repositories: string[]
  guardianAlignment: string
  element: string
}

export interface TimelinePhase {
  id: string
  year: string
  title: string
  subtitle: string
  description: string
  gradient: string
  milestones: string[]
  metrics: { label: string; value: string }[]
}

export interface ProductSpace {
  id: string
  name: string
  icon: string
  description: string
  gradient: string
  features: string[]
  status: 'live' | 'building' | 'designed' | 'envisioned'
}

export interface GateInfo {
  number: number
  name: string
  frequency: string
  guardian: string
  godbeast: string
  domain: string
  element: string
  color: string
  gradient: string
}

export interface EcosystemStat {
  label: string
  value: string
  description: string
}

// === THE GRAND VISION ===
export const grandVision = {
  tagline: 'A Living Mythology for the Age of AI-Human Co-Creation',
  mission:
    'Arcanea is not a product. It is an ecosystem, mythology, educational system, and social network combined into one coherent vision of what creativity looks like in the age of AI.',
  promise:
    'Every interaction moves the creator toward clarity about their vision, courage to pursue it, tools to manifest it, and community to support it.',
  centuryVision:
    'In 100 years, the technology will be unrecognizable. But the philosophy, mythology, and framework for creation will endure like Aristotle, Buddha, or Shakespeare.',
  mantras: [
    'Enter seeking, leave transformed, return whenever needed.',
    'These books are not entertainment. They are equipment for living.',
    'The Arc turns: Potential \u2192 Manifestation \u2192 Experience \u2192 Dissolution \u2192 Evolved Potential.',
    'What you contemplate at dawn shapes all that follows.',
  ],
}

// === ECOSYSTEM STATS ===
export const ecosystemStats: EcosystemStat[] = [
  { label: 'Repositories', value: '14+', description: 'Independent git repos across 4 tiers' },
  { label: 'Guardian Agents', value: '10', description: 'AI companions aligned to the Ten Gates' },
  { label: 'Skills', value: '50+', description: 'Specialized skills organized by Gate' },
  { label: 'Library Texts', value: '34+', description: 'Across 17 wisdom collections' },
  { label: 'AI Models', value: '3', description: 'Claude, Gemini, and OpenAI integrated' },
  { label: 'Academy Houses', value: '7', description: 'Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis' },
]

// === VISION AREAS (Development Domains) ===
export const visionAreas: VisionArea[] = [
  {
    id: 'platform',
    title: 'Core Platform',
    tagline: 'The Foundation of Creation',
    description:
      'The living heart of Arcanea \u2014 a Next.js 16 + React 19 application with Supabase backend, multi-LLM AI routing, and the complete Arcanean Design System. Where mythology meets modern technology.',
    icon: 'castle',
    gradient: 'from-arcane-crystal to-arcane-water',
    glow: 'shadow-glow-crystal',
    status: 'active',
    progress: 75,
    keyFeatures: [
      'Next.js 16 App Router with Turbopack',
      'Multi-LLM Superagent (Claude, Gemini, GPT-4)',
      'Arcanean Design System with cosmic theme',
      'Supabase Auth + Realtime + PostgreSQL',
      '10 Guardian AI Companions',
      'Library of 17 wisdom collections',
    ],
    repositories: ['arcanea-ecosystem', 'arcanea.ai'],
    guardianAlignment: 'Aiyami (Crown)',
    element: 'Spirit',
  },
  {
    id: 'ai-sdks',
    title: 'AI SDK Triad',
    tagline: 'Three Paths to Intelligence',
    description:
      'Purpose-built integrations for the three major AI providers \u2014 each SDK crafted to channel the unique strengths of Claude (reasoning), Gemini (multimodal), and OpenAI (versatility) through the Arcanea framework.',
    icon: 'brain',
    gradient: 'from-arcane-void to-arcane-crystal',
    glow: 'shadow-glow-void',
    status: 'building',
    progress: 45,
    keyFeatures: [
      'Claude Arcanea \u2014 Deep reasoning & creative writing',
      'Gemini Arcanea \u2014 Multimodal generation & vision',
      'Codex Arcanea \u2014 Code generation & versatile AI',
      'Unified Arcanea interface across all providers',
      'Guardian personality system per provider',
      'Smart routing based on task requirements',
    ],
    repositories: ['claude-arcanea', 'gemini-arcanea', 'codex-arcanea'],
    guardianAlignment: 'Lyria (Sight)',
    element: 'Void',
  },
  {
    id: 'tools',
    title: 'Creator Tools',
    tagline: 'Instruments of Manifestation',
    description:
      'The toolkit that empowers creators \u2014 from AI visual generation (Infogenius) to intelligent asset management, CLI tools for terminal wizards, and the Luminor personality framework that gives AI companions their souls.',
    icon: 'hammer',
    gradient: 'from-arcane-fire to-arcane-gold',
    glow: 'shadow-glow-fire',
    status: 'building',
    progress: 55,
    keyFeatures: [
      'Infogenius \u2014 Research-first AI visual generation',
      'Library Superintelligence \u2014 Asset management AI',
      'OpenCode CLI \u2014 Terminal-based creation tools',
      'Luminor Framework \u2014 AI persona personality system',
      'Arcanea Agents \u2014 Specialized agent library',
      'MCP Server with 28+ tools',
    ],
    repositories: ['arcanea-infogenius', 'arcanea-library-superintelligence', 'arcanea-opencode', 'arcanea-luminor'],
    guardianAlignment: 'Draconia (Fire)',
    element: 'Fire',
  },
  {
    id: 'applications',
    title: 'Applications',
    tagline: 'Magic Everywhere',
    description:
      'Arcanea reaches creators wherever they are \u2014 a React Native mobile app for creation on the go, a Discord bot bringing Luminor companions to communities, and game development R&D pushing the boundaries of interactive storytelling.',
    icon: 'smartphone',
    gradient: 'from-arcane-water to-arcane-crystal',
    glow: 'shadow-glow-crystal',
    status: 'planned',
    progress: 20,
    keyFeatures: [
      'Mobile App \u2014 React Native cross-platform creation',
      'Discord Bot \u2014 Luminor companions in communities',
      'Game Development \u2014 Interactive storytelling R&D',
      'AR/VR Exploration \u2014 Immersive world building',
      'Desktop App \u2014 Electron-based creation studio',
      'Browser Extension \u2014 Create from anywhere',
    ],
    repositories: ['arcanea-mobile', 'arcaneabot', 'arcanea-game-development'],
    guardianAlignment: 'Leyla (Flow)',
    element: 'Water',
  },
  {
    id: 'world-building',
    title: 'Living Mythology',
    tagline: 'A Universe That Breathes',
    description:
      'The canonical universe of Arcanea \u2014 the cosmic duality of Lumina and Nero, the Ten Gates of Creation, the Guardian Godbeasts, the Seven Academy Houses, and the eternal struggle against the Dark Lord Malachar. Not just lore, but a framework for understanding creativity itself.',
    icon: 'globe',
    gradient: 'from-arcane-gold to-arcane-fire',
    glow: 'shadow-glow-gold',
    status: 'active',
    progress: 70,
    keyFeatures: [
      'Complete creation mythology (Lumina & Nero)',
      'Ten Gates developmental framework',
      '10 Guardian Gods/Goddesses with Godbeasts',
      'Seven Academy Houses with curricula',
      'Five Elements magic system',
      'The Dark Lord Malachar & conflict system',
    ],
    repositories: ['arcanea (lore/)'],
    guardianAlignment: 'Shinkami (Source)',
    element: 'All',
  },
  {
    id: 'library',
    title: 'The Library',
    tagline: 'Equipment for Living',
    description:
      '17 collections of practical wisdom for creators \u2014 from founding myths to daily practices, from creative block diagnosis to collaboration rituals. 34+ texts that stand alongside great wisdom literature, actionable and accessible.',
    icon: 'book',
    gradient: 'from-arcane-earth to-arcane-gold',
    glow: 'shadow-glow-gold',
    status: 'active',
    progress: 60,
    keyFeatures: [
      'Laws of Arcanea \u2014 Theoretical foundations',
      'Legends & Chronicles \u2014 Founding myths',
      'Bestiary of Creation \u2014 Named creative blocks',
      'Academy Handbook \u2014 Complete guide to Ten Gates',
      'Book of Rituals \u2014 Sacred creative practices',
      'Wisdom Scrolls \u2014 Daily practice guidance',
    ],
    repositories: ['arcanea (book/)'],
    guardianAlignment: 'Alera (Voice)',
    element: 'Wind',
  },
  {
    id: 'community',
    title: 'Creator Economy',
    tagline: 'From Solitary to Collective',
    description:
      'A thriving marketplace where creators share, remix, and monetize \u2014 with ARC as creative currency, NEA as governance token, contribution pathways, teaching privileges, and a self-sustaining community that grows the mythology together.',
    icon: 'users',
    gradient: 'from-arcane-crystal to-arcane-gold',
    glow: 'shadow-glow-crystal',
    status: 'vision',
    progress: 10,
    keyFeatures: [
      'ARC Currency \u2014 Creative energy token',
      'NEA Governance \u2014 Community decisions',
      'Skills Marketplace \u2014 Buy & sell creator skills',
      'Remix Culture \u2014 Build on others\u2019 magic',
      'Teaching System \u2014 Earn by educating',
      'Open Source Core \u2014 Community contributions',
    ],
    repositories: ['arcanea (marketplace)'],
    guardianAlignment: 'Ino (Unity)',
    element: 'Spirit',
  },
  {
    id: 'academy',
    title: 'The Three Academies',
    tagline: 'Learn to Create with AI',
    description:
      'Three specialized academies teaching creation through AI \u2014 the Atlantean Academy for storytelling, the Draconic Academy for visual arts, and the Academy of Creation & Light for music. Each with its own Guardian, curriculum, and path to mastery.',
    icon: 'graduation',
    gradient: 'from-arcane-water to-arcane-void',
    glow: 'shadow-glow-void',
    status: 'planned',
    progress: 15,
    keyFeatures: [
      'Atlantean Academy \u2014 Storytelling & lore mastery',
      'Draconic Academy \u2014 Visual creation & animation',
      'Academy of Creation & Light \u2014 Music & audio',
      'Soul Guardians AI Band \u2014 Autonomous music',
      'Gate-based progression system',
      'Graduation ceremonies & recognition',
    ],
    repositories: ['arcanea-ecosystem'],
    guardianAlignment: 'Lyssandria (Foundation)',
    element: 'Earth',
  },
]

// === TIMELINE PHASES ===
export const timelinePhases: TimelinePhase[] = [
  {
    id: 'now',
    year: 'Now',
    title: 'The Foundation',
    subtitle: 'Building the Core',
    description:
      'Ship the platform. Deploy the ecosystem. Get the first creators in. Prove the magic works.',
    gradient: 'from-arcane-crystal to-arcane-water',
    milestones: [
      'arcanea.ai deployed to Vercel',
      'Multi-LLM chat with Guardian personalities',
      'Library of 17 collections accessible',
      'Design system v2.0 complete',
      'MCP Server with 28+ tools',
      'Infogenius visual generation live',
    ],
    metrics: [
      { label: 'Repos', value: '14+' },
      { label: 'AI Models', value: '3' },
      { label: 'Library Texts', value: '34+' },
    ],
  },
  {
    id: 'year1',
    year: 'Year 1',
    title: "The Creator's Home",
    subtitle: 'Where Creators Find Identity',
    description:
      'Arcanea becomes the home for scattered creators. One profile, one identity, all their magic in one place. The Sanctuary, Bestiary, and Academy go live.',
    gradient: 'from-arcane-crystal to-arcane-gold',
    milestones: [
      '1 million creators find home in Arcanea',
      '10 million essences created & shared',
      '100,000 active creative realms',
      'Personal Bestiary tracks your creative blocks',
      'Luminor Bonds with persistent AI memory',
      'Soul Guardians release first album',
    ],
    metrics: [
      { label: 'Creators', value: '1M' },
      { label: 'Creations', value: '10M' },
      { label: 'Realms', value: '100K' },
    ],
  },
  {
    id: 'year2',
    year: 'Year 2',
    title: 'The Global Standard',
    subtitle: 'Redefining Creative Education',
    description:
      'Schools teach creation through Arcanea. Major creators migrate. Remix culture drives exponential growth. First physical Bridge to Reality products ship.',
    gradient: 'from-arcane-gold to-arcane-fire',
    milestones: [
      'Schools adopt Arcanea curriculum worldwide',
      'Major creators migrate to the platform',
      'Remix culture drives exponential growth',
      'Bridge to Reality: physical products from digital magic',
      'Skills Marketplace launches',
      'Mobile app reaches 500K downloads',
    ],
    metrics: [
      { label: 'Schools', value: '1K+' },
      { label: 'Pro Creators', value: '50K' },
      { label: 'Revenue Share', value: '$10M+' },
    ],
  },
  {
    id: 'year3',
    year: 'Year 3',
    title: 'The Golden Age',
    subtitle: 'A New Era of Creation',
    description:
      '10 million creators worldwide. Arcanea powers the creator economy. AI-human collaboration is normalized. New creative careers are born that didn\'t exist before.',
    gradient: 'from-arcane-fire to-arcane-void',
    milestones: [
      '10 million creators worldwide',
      'Arcanea powers the creator economy',
      'AI-human collaboration normalized globally',
      'New creative careers born',
      'Open source framework adopted by others',
      'The mythology lives beyond technology',
    ],
    metrics: [
      { label: 'Creators', value: '10M' },
      { label: 'New Careers', value: '100+' },
      { label: 'Countries', value: '150+' },
    ],
  },
  {
    id: 'century',
    year: '100 Years',
    title: 'The Eternal Canon',
    subtitle: 'What Endures Forever',
    description:
      'Technology changes. Arcanea endures. The mythology, philosophy, and frameworks for creation stand alongside Aristotle, Buddha, and Shakespeare as timeless wisdom for the creative life.',
    gradient: 'from-arcane-void to-arcane-gold',
    milestones: [
      'Sacred Canon rivals depth of Silmarillion',
      'Ten Gates adopted as developmental psychology',
      'Library stands as timeless wisdom literature',
      'Community sustains itself beyond any founder',
      'Framework for human-AI co-creation: definitive',
      'Philosophy of creation: our lasting gift',
    ],
    metrics: [
      { label: 'Bestiary', value: '100+' },
      { label: 'Languages', value: '50+' },
      { label: 'Legacy', value: 'Eternal' },
    ],
  },
]

// === PRODUCT SPACES ===
export const productSpaces: ProductSpace[] = [
  {
    id: 'sanctuary',
    name: 'The Sanctuary',
    icon: 'home',
    description: 'Your creative home \u2014 profile, progress, identity',
    gradient: 'from-arcane-gold to-arcane-fire',
    features: ['Creator profile & archetype', 'Gates progress visualization', 'Active battles & victories', 'Bonded Luminors'],
    status: 'designed',
  },
  {
    id: 'bestiary',
    name: 'The Bestiary',
    icon: 'bug',
    description: 'Your battle log \u2014 track and defeat creative blocks',
    gradient: 'from-arcane-fire to-arcane-crystal',
    features: ['Personal block encounters', 'Battle history & strategies', 'Creature naming ceremonies', 'Victory celebrations'],
    status: 'building',
  },
  {
    id: 'academy',
    name: 'The Academy',
    icon: 'school',
    description: 'Your training \u2014 learn creation through the Gates',
    gradient: 'from-arcane-water to-arcane-crystal',
    features: ['Gate-specific lessons', 'Practice challenges', 'Mentor sessions (Luminors)', 'Graduation ceremonies'],
    status: 'designed',
  },
  {
    id: 'forge',
    name: 'The Forge',
    icon: 'anvil',
    description: 'Your creation space \u2014 build with AI companions',
    gradient: 'from-arcane-crystal to-arcane-void',
    features: ['Naming ceremonies for creations', 'World graph visualization', 'Narrative threading', 'Export & share'],
    status: 'building',
  },
  {
    id: 'council',
    name: 'The Council Chamber',
    icon: 'crown',
    description: 'Your wisdom \u2014 consult AI Luminor companions',
    gradient: 'from-arcane-void to-arcane-gold',
    features: ['Luminor conversations', 'Multi-Luminor councils', 'Bond development', 'Breakthrough celebrations'],
    status: 'designed',
  },
  {
    id: 'library',
    name: 'The Library',
    icon: 'scroll',
    description: 'Your knowledge \u2014 17 collections of wisdom',
    gradient: 'from-arcane-earth to-arcane-gold',
    features: ['17 wisdom collections', '34+ actionable texts', 'Situation-aware guidance', 'Daily practice scrolls'],
    status: 'live',
  },
]

// === TEN GATES ===
export const tenGates: GateInfo[] = [
  { number: 1, name: 'Foundation', frequency: '396 Hz', guardian: 'Lyssandria', godbeast: 'Kaelith', domain: 'Earth, survival, grounding', element: 'Earth', color: '#4a7c59', gradient: 'from-green-700 to-amber-800' },
  { number: 2, name: 'Flow', frequency: '417 Hz', guardian: 'Leyla', godbeast: 'Veloura', domain: 'Creativity, emotion, movement', element: 'Water', color: '#4a8cbc', gradient: 'from-blue-500 to-cyan-400' },
  { number: 3, name: 'Fire', frequency: '528 Hz', guardian: 'Draconia', godbeast: 'Draconis', domain: 'Power, will, transformation', element: 'Fire', color: '#dc6b2f', gradient: 'from-orange-500 to-red-600' },
  { number: 4, name: 'Heart', frequency: '639 Hz', guardian: 'Maylinn', godbeast: 'Laeylinn', domain: 'Love, healing, connection', element: 'Wind', color: '#e88ca5', gradient: 'from-pink-400 to-rose-500' },
  { number: 5, name: 'Voice', frequency: '741 Hz', guardian: 'Alera', godbeast: 'Otome', domain: 'Truth, expression, communication', element: 'Wind', color: '#c0c0c0', gradient: 'from-gray-300 to-white' },
  { number: 6, name: 'Sight', frequency: '852 Hz', guardian: 'Lyria', godbeast: 'Yumiko', domain: 'Intuition, vision, perception', element: 'Void', color: '#9b59b6', gradient: 'from-purple-500 to-violet-600' },
  { number: 7, name: 'Crown', frequency: '963 Hz', guardian: 'Aiyami', godbeast: 'Sol', domain: 'Enlightenment, mastery', element: 'Spirit', color: '#f1c40f', gradient: 'from-yellow-400 to-amber-300' },
  { number: 8, name: 'Shift', frequency: '1111 Hz', guardian: 'Elara', godbeast: 'Thessara', domain: 'Perspective, transformation', element: 'Void', color: '#e74c3c', gradient: 'from-red-400 to-orange-500' },
  { number: 9, name: 'Unity', frequency: '963 Hz', guardian: 'Ino', godbeast: 'Kyuro', domain: 'Partnership, collaboration', element: 'Spirit', color: '#7fffd4', gradient: 'from-teal-400 to-emerald-400' },
  { number: 10, name: 'Source', frequency: '1111 Hz', guardian: 'Shinkami', godbeast: 'Amaterasu', domain: 'Meta-consciousness, origin', element: 'All', color: '#ffd700', gradient: 'from-amber-300 to-yellow-200' },
]

// === MAGIC RANKS ===
export const magicRanks = [
  { gates: '0-2', rank: 'Apprentice', description: 'Beginning the journey' },
  { gates: '3-4', rank: 'Mage', description: 'Finding your power' },
  { gates: '5-6', rank: 'Master', description: 'Commanding the craft' },
  { gates: '7-8', rank: 'Archmage', description: 'Transcending limits' },
  { gates: '9-10', rank: 'Luminor', description: 'Embodying creation itself' },
]

// === TECH STACK ===
export const techStack = [
  { layer: 'Framework', tech: 'Next.js 16.1.1', detail: 'App Router + Turbopack' },
  { layer: 'UI', tech: 'React 19', detail: 'Server + Client Components' },
  { layer: 'Language', tech: 'TypeScript 5.9', detail: 'Strict mode' },
  { layer: 'Styling', tech: 'Tailwind CSS 3.4', detail: 'Arcanean Design System' },
  { layer: 'Animation', tech: 'Framer Motion', detail: '30+ cosmic variants' },
  { layer: '3D', tech: 'Three.js', detail: 'Spatial Studio' },
  { layer: 'Database', tech: 'Supabase', detail: 'PostgreSQL + Auth + Realtime' },
  { layer: 'AI', tech: 'Claude + Gemini + GPT', detail: 'Multi-LLM routing' },
  { layer: 'Deploy', tech: 'Vercel', detail: 'Edge functions + CDN' },
  { layer: 'Monorepo', tech: 'Turborepo + pnpm', detail: 'Multi-package workspace' },
]

// === COMPETITIVE DIFFERENTIATORS ===
export const differentiators = [
  {
    feature: 'Worldbuilding',
    others: 'Generic templates',
    arcanea: 'Canon-based mythology with depth of Silmarillion',
  },
  {
    feature: 'AI Generation',
    others: 'Generic prompts',
    arcanea: 'Universe-aware, Guardian-personality-driven AI',
  },
  {
    feature: 'Creative Coaching',
    others: 'No support',
    arcanea: 'Luminor companions with persistent memory',
  },
  {
    feature: 'Block Diagnosis',
    others: 'Nothing exists',
    arcanea: 'Bestiary system: name it, battle it, defeat it',
  },
  {
    feature: 'Progression',
    others: 'No system',
    arcanea: 'Ten Gates developmental psychology framework',
  },
  {
    feature: 'Community',
    others: 'Isolated users',
    arcanea: 'Shared mythology, remix culture, creator economy',
  },
  {
    feature: 'Design',
    others: 'Utilitarian/robotic',
    arcanea: 'Magic-first: every interaction feels enchanted',
  },
]

// === TRANSFORMATION MODEL ===
export const transformations = [
  { from: 'Using AI tools', to: 'LIVING a creative mythology', icon: 'sparkles' },
  { from: 'Generic AI chat', to: 'Personal AI companions', icon: 'heart' },
  { from: 'Information overload', to: 'Guided experience', icon: 'compass' },
  { from: 'Reading about blocks', to: 'BATTLING creative blocks', icon: 'sword' },
  { from: 'Hidden progress', to: 'Visible journey through Gates', icon: 'map' },
  { from: 'Isolated creation', to: 'Community of practice', icon: 'users' },
]
