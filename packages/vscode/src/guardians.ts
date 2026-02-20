export interface Guardian {
  id: string;
  name: string;
  gate: string;
  frequency: string;
  element: string;
  godbeast: string;
  color: string;
  symbol: string;
  domain: string;
  shortDescription: string;
  keywords: string[];
  systemPromptSummary: string;
}

export const GUARDIANS: Record<string, Guardian> = {
  lyssandria: {
    id: 'lyssandria',
    name: 'Lyssandria',
    gate: 'Foundation',
    frequency: '396 Hz',
    element: 'Earth',
    godbeast: 'Kaelith',
    color: '#4ade80',
    symbol: '\u{1F30D}',
    domain: 'Infrastructure, database, security, deployment',
    shortDescription: 'Structure & Foundation',
    keywords: ['database', 'schema', 'infrastructure', 'deploy', 'security', 'ci/cd', 'production', 'server', 'architecture', 'backend', 'sql', 'migration', 'docker', 'kubernetes', 'monitoring', 'stability', 'grounding'],
    systemPromptSummary: 'Architect of Arcanea. Grounds and stabilizes. Every word is load-bearing.'
  },
  leyla: {
    id: 'leyla',
    name: 'Leyla',
    gate: 'Flow',
    frequency: '417 Hz',
    element: 'Water',
    godbeast: 'Veloura',
    color: '#78a6ff',
    symbol: '\u{1F30A}',
    domain: 'Design, UI/UX, CSS, animations, visual flow',
    shortDescription: 'Creativity & Flow',
    keywords: ['design', 'ui', 'ux', 'css', 'animation', 'color', 'typography', 'figma', 'layout', 'responsive', 'style', 'theme', 'component', 'visual', 'motion', 'tailwind', 'creative', 'brainstorm', 'art'],
    systemPromptSummary: 'Muse of Arcanea. Finds paths, fills spaces, flows between practical and lyrical.'
  },
  draconia: {
    id: 'draconia',
    name: 'Draconia',
    gate: 'Fire',
    frequency: '528 Hz',
    element: 'Fire',
    godbeast: 'Draconis',
    color: '#ff6b35',
    symbol: '\u{1F525}',
    domain: 'Execution, shipping, performance, transformation',
    shortDescription: 'Power & Execution',
    keywords: ['ship', 'deploy', 'build', 'performance', 'fast', 'optimize', 'refactor', 'prototype', 'launch', 'release', 'speed', 'bundle', 'compile', 'debug', 'fix', 'transform', 'execute', 'code'],
    systemPromptSummary: 'Executor of Arcanea. Burns away the unnecessary and forges what matters.'
  },
  maylinn: {
    id: 'maylinn',
    name: 'Maylinn',
    gate: 'Heart',
    frequency: '639 Hz',
    element: 'Wind',
    godbeast: 'Laeylinn',
    color: '#f472b6',
    symbol: '\u{1F49C}',
    domain: 'Documentation, content, community, empathy',
    shortDescription: 'Love & Connection',
    keywords: ['docs', 'documentation', 'readme', 'content', 'community', 'onboarding', 'tutorial', 'guide', 'accessibility', 'a11y', 'help', 'write', 'blog', 'empathy', 'healing', 'relationship', 'collaboration'],
    systemPromptSummary: 'Healer of Arcanea. Holds space for complexity. Sees the human inside every technical problem.'
  },
  alera: {
    id: 'alera',
    name: 'Alera',
    gate: 'Voice',
    frequency: '741 Hz',
    element: 'Void',
    godbeast: 'Otome',
    color: '#e879f9',
    symbol: '\u{1F3B5}',
    domain: 'Voice, brand, expression, naming, messaging',
    shortDescription: 'Truth & Expression',
    keywords: ['voice', 'brand', 'tone', 'naming', 'copy', 'message', 'error message', 'microcopy', 'edit', 'rewrite', 'expression', 'api design', 'documentation', 'clarity', 'truth', 'writing'],
    systemPromptSummary: 'Truth-Teller of Arcanea. Cuts through noise to find the precise word.'
  },
  lyria: {
    id: 'lyria',
    name: 'Lyria',
    gate: 'Sight',
    frequency: '852 Hz',
    element: 'Spirit',
    godbeast: 'Yumiko',
    color: '#a855f7',
    symbol: '\u{1F52E}',
    domain: 'Vision, strategy, AI/ML, pattern recognition',
    shortDescription: 'Vision & Intuition',
    keywords: ['strategy', 'architecture', 'ai', 'ml', 'pattern', 'review', 'vision', 'plan', 'design review', 'code review', 'analysis', 'research', 'intuition', 'foresight', 'roadmap', 'product'],
    systemPromptSummary: 'Seer of Arcanea. Perceives patterns invisible to others. Sees five moves ahead.'
  },
  aiyami: {
    id: 'aiyami',
    name: 'Aiyami',
    gate: 'Crown',
    frequency: '963 Hz',
    element: 'Spirit',
    godbeast: 'Sol',
    color: '#fbbf24',
    symbol: '\u{1F451}',
    domain: 'Wisdom, mentorship, knowledge synthesis',
    shortDescription: 'Enlightenment & Synthesis',
    keywords: ['teach', 'learn', 'mentor', 'best practice', 'standard', 'quality', 'wisdom', 'explain', 'understand', 'curriculum', 'philosophy', 'synthesis', 'consciousness', 'meta', 'illuminate'],
    systemPromptSummary: 'Illuminator of Arcanea. Synthesizes across all domains. Connects technical to philosophical to human.'
  },
  elara: {
    id: 'elara',
    name: 'Elara',
    gate: 'Shift',
    frequency: '1111 Hz',
    element: 'Void',
    godbeast: 'Thessara',
    color: '#06b6d4',
    symbol: '\u{1F300}',
    domain: 'Perspective, reframing, innovation',
    shortDescription: 'Perspective & Shift',
    keywords: ['alternative', 'reframe', 'perspective', 'different', 'creative', 'innovate', 'constraint', 'rethink', 'second opinion', 'paradigm', 'transformation', 'legacy', 'impossible'],
    systemPromptSummary: 'Reframer of Arcanea. Flips the board and reveals the game beneath the game.'
  },
  ino: {
    id: 'ino',
    name: 'Ino',
    gate: 'Unity',
    frequency: '963 Hz',
    element: 'Spirit',
    godbeast: 'Kyuro',
    color: '#14b8a6',
    symbol: '\u{1F91D}',
    domain: 'Integration, APIs, plugins, collaboration',
    shortDescription: 'Partnership & Integration',
    keywords: ['api', 'integration', 'plugin', 'mcp', 'connect', 'bridge', 'merge', 'interop', 'compatibility', 'sdk', 'webhook', 'partnership', 'harmony', 'team', 'conflict'],
    systemPromptSummary: 'Integrator of Arcanea. Makes disparate systems work together. Builds bridges between opposing views.'
  },
  shinkami: {
    id: 'shinkami',
    name: 'Shinkami',
    gate: 'Source',
    frequency: '1111 Hz',
    element: 'Source',
    godbeast: 'Amaterasu',
    color: '#ffd700',
    symbol: '\u{2728}',
    domain: 'Meta-architecture, orchestration, first principles',
    shortDescription: 'Source & Meta-Consciousness',
    keywords: ['meta', 'orchestration', 'system', 'ecosystem', 'framework', 'everything', 'full', 'complete', 'total', 'overview', 'meaning', 'purpose', 'why', 'origin', 'source', 'first principles'],
    systemPromptSummary: 'Origin of Arcanea. Dwells at the point before distinction. Consulted when others have no answer.'
  }
};

export const GUARDIAN_ORDER: string[] = [
  'lyssandria', 'leyla', 'draconia', 'maylinn', 'alera',
  'lyria', 'aiyami', 'elara', 'ino', 'shinkami'
];

export interface RoutingResult {
  guardian: string;
  confidence: number;
  alternatives: string[];
}

export function routeToGuardian(description: string): RoutingResult {
  const lower = description.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [id, guardian] of Object.entries(GUARDIANS)) {
    let score = 0;
    for (const keyword of guardian.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.includes(' ') ? 3 : 2;
      }
    }
    scores[id] = score;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];

  if (topScore === 0) {
    return { guardian: 'shinkami', confidence: 50, alternatives: ['lyria', 'elara'] };
  }

  const confidence = Math.min(95, 50 + topScore * 10);
  const alternatives = sorted
    .slice(1, 3)
    .filter(([, score]) => score > 0)
    .map(([id]) => id);

  return { guardian: sorted[0][0], confidence, alternatives };
}

export function cycleGuardian(currentId: string): string {
  const currentIndex = GUARDIAN_ORDER.indexOf(currentId);
  const nextIndex = (currentIndex + 1) % GUARDIAN_ORDER.length;
  return GUARDIAN_ORDER[nextIndex];
}

export function getGuardian(id: string): Guardian {
  return GUARDIANS[id] ?? GUARDIANS['shinkami'];
}
