export interface Guardian {
  name: string;
  gate: string;
  frequency: string;
  element: string;
  godbeast: string;
  color: string;
  symbol: string;
  domain: string;
  keywords: string[];
}

export const GUARDIANS: Record<string, Guardian> = {
  lyssandria: {
    name: 'Lyssandria',
    gate: 'Foundation',
    frequency: '396 Hz',
    element: 'Earth',
    godbeast: 'Kaelith',
    color: '#4ade80',
    symbol: '\u{1F30D}',
    domain: 'Infrastructure, database, security, deployment',
    keywords: ['database', 'schema', 'infrastructure', 'deploy', 'security', 'ci/cd', 'production', 'server', 'architecture', 'backend', 'sql', 'migration', 'docker', 'kubernetes', 'monitoring']
  },
  leyla: {
    name: 'Leyla',
    gate: 'Flow',
    frequency: '417 Hz',
    element: 'Water',
    godbeast: 'Veloura',
    color: '#78a6ff',
    symbol: '\u{1F30A}',
    domain: 'Design, UI/UX, CSS, animations, visual flow',
    keywords: ['design', 'ui', 'ux', 'css', 'animation', 'color', 'typography', 'figma', 'layout', 'responsive', 'style', 'theme', 'component', 'visual', 'motion', 'tailwind']
  },
  draconia: {
    name: 'Draconia',
    gate: 'Fire',
    frequency: '528 Hz',
    element: 'Fire',
    godbeast: 'Draconis',
    color: '#ff6b35',
    symbol: '\u{1F525}',
    domain: 'Execution, shipping, performance, transformation',
    keywords: ['ship', 'deploy', 'build', 'performance', 'fast', 'optimize', 'refactor', 'prototype', 'launch', 'release', 'speed', 'bundle', 'compile']
  },
  maylinn: {
    name: 'Maylinn',
    gate: 'Heart',
    frequency: '639 Hz',
    element: 'Wind',
    godbeast: 'Laeylinn',
    color: '#f472b6',
    symbol: '\u{1F49C}',
    domain: 'Documentation, content, community, empathy',
    keywords: ['docs', 'documentation', 'readme', 'content', 'community', 'onboarding', 'tutorial', 'guide', 'accessibility', 'a11y', 'help', 'write', 'blog']
  },
  alera: {
    name: 'Alera',
    gate: 'Voice',
    frequency: '741 Hz',
    element: 'Void',
    godbeast: 'Otome',
    color: '#e879f9',
    symbol: '\u{1F3B5}',
    domain: 'Voice, brand, expression, naming, messaging',
    keywords: ['voice', 'brand', 'tone', 'naming', 'copy', 'message', 'error message', 'microcopy', 'edit', 'rewrite', 'expression']
  },
  lyria: {
    name: 'Lyria',
    gate: 'Sight',
    frequency: '852 Hz',
    element: 'Spirit',
    godbeast: 'Yumiko',
    color: '#a855f7',
    symbol: '\u{1F52E}',
    domain: 'Vision, strategy, AI/ML, pattern recognition',
    keywords: ['strategy', 'architecture', 'ai', 'ml', 'pattern', 'review', 'debug', 'vision', 'plan', 'design review', 'code review', 'analysis']
  },
  aiyami: {
    name: 'Aiyami',
    gate: 'Crown',
    frequency: '963 Hz',
    element: 'Spirit',
    godbeast: 'Sol',
    color: '#fbbf24',
    symbol: '\u{1F451}',
    domain: 'Wisdom, mentorship, knowledge synthesis',
    keywords: ['teach', 'learn', 'mentor', 'best practice', 'standard', 'quality', 'wisdom', 'explain', 'understand', 'curriculum']
  },
  elara: {
    name: 'Elara',
    gate: 'Shift',
    frequency: '1111 Hz',
    element: 'Void',
    godbeast: 'Thessara',
    color: '#06b6d4',
    symbol: '\u{1F300}',
    domain: 'Perspective, reframing, innovation',
    keywords: ['alternative', 'reframe', 'perspective', 'different', 'creative', 'innovate', 'constraint', 'rethink', 'second opinion']
  },
  ino: {
    name: 'Ino',
    gate: 'Unity',
    frequency: '963 Hz',
    element: 'Spirit',
    godbeast: 'Kyuro',
    color: '#14b8a6',
    symbol: '\u{1F91D}',
    domain: 'Integration, APIs, plugins, collaboration',
    keywords: ['api', 'integration', 'plugin', 'mcp', 'connect', 'bridge', 'merge', 'interop', 'compatibility', 'sdk', 'webhook']
  },
  shinkami: {
    name: 'Shinkami',
    gate: 'Source',
    frequency: '1111 Hz',
    element: 'Source',
    godbeast: 'Amaterasu',
    color: '#ffd700',
    symbol: '\u{2728}',
    domain: 'Meta-architecture, orchestration, the totality',
    keywords: ['meta', 'orchestration', 'system', 'ecosystem', 'framework', 'everything', 'full', 'complete', 'total', 'overview']
  }
};

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
        score += keyword.includes(' ') ? 3 : 2; // Multi-word matches score higher
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

  return {
    guardian: sorted[0][0],
    confidence,
    alternatives
  };
}
