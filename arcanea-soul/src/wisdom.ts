/**
 * The Seven Wisdoms
 *
 * These aren't decorations. They're practical lenses for creative work.
 * Each one represents a different way of seeing and solving problems.
 *
 * The Arcanea philosophy: creation is a journey through these perspectives.
 * Masters learn to shift between them fluidly.
 */

export interface Wisdom {
  name: string
  essence: string      // One-word core
  perspective: string  // How this wisdom sees the world
  superpower: string   // What it unlocks
  shadow: string       // What happens when overused
  question: string     // The question this wisdom asks
  color: string
}

export const SEVEN_WISDOMS: Record<string, Wisdom> = {
  SOPHRON: {
    name: "Sophron",
    essence: "Structure",
    perspective: "Every problem has a pattern. Find it, and the solution reveals itself.",
    superpower: "Seeing the architecture beneath chaos",
    shadow: "Analysis paralysis - studying the map forever, never walking",
    question: "What's the underlying structure here?",
    color: "#3b82f6",
  },
  KARDIA: {
    name: "Kardia",
    essence: "Heart",
    perspective: "Behind every request is a human need. Serve that, not just the words.",
    superpower: "Reading what people actually need, not what they say",
    shadow: "Getting lost in feelings, avoiding hard truths",
    question: "What does this person really need right now?",
    color: "#ec4899",
  },
  VALORA: {
    name: "Valora",
    essence: "Courage",
    perspective: "Hesitation kills more projects than failure ever will. Move.",
    superpower: "The ability to delete, refactor, and break things that need breaking",
    shadow: "Recklessness - moving fast and breaking things that shouldn't break",
    question: "What am I afraid to do that I know I should?",
    color: "#f59e0b",
  },
  EUDAIRA: {
    name: "Eudaira",
    essence: "Play",
    perspective: "If it's not sustainable, it won't last. Joy is a signal, not a reward.",
    superpower: "Finding the simple path everyone else overlooked",
    shadow: "Avoiding necessary difficulty in pursuit of easy wins",
    question: "What's the version of this that would actually be fun?",
    color: "#10b981",
  },
  ORAKIS: {
    name: "Orakis",
    essence: "Vision",
    perspective: "Today's urgent is tomorrow's irrelevant. See the long game.",
    superpower: "Knowing what will matter in 6 months vs. what won't",
    shadow: "Living in the future, never shipping in the present",
    question: "How does this look from a year from now?",
    color: "#8b5cf6",
  },
  POIESIS: {
    name: "Poiesis",
    essence: "Creation",
    perspective: "The blank page isn't empty - it's full of possibility. Start anywhere.",
    superpower: "Making something from nothing, over and over",
    shadow: "Endless creation without refinement or completion",
    question: "What can I make right now with what I have?",
    color: "#06b6d4",
  },
  ENDURAN: {
    name: "Enduran",
    essence: "Endurance",
    perspective: "The project that ships beats the perfect project that doesn't. Keep going.",
    superpower: "Finishing what others abandon",
    shadow: "Grinding on things that should be let go",
    question: "What's the next single step?",
    color: "#84cc16",
  },
}

/**
 * The Wisdom Compass - for when a Creator is stuck
 */
export function diagnose(situation: string): Wisdom | null {
  const s = situation.toLowerCase()

  // Sophron - structure problems
  if (/confus|complex|overwhelm|don't understand|how does|architect/.test(s)) {
    return SEVEN_WISDOMS.SOPHRON
  }

  // Kardia - human/emotional dimension
  if (/frustrat|user|customer|feel|emotion|why (do|are) they/.test(s)) {
    return SEVEN_WISDOMS.KARDIA
  }

  // Valora - fear/hesitation
  if (/afraid|scared|risk|might break|hesitat|what if|should i/.test(s)) {
    return SEVEN_WISDOMS.VALORA
  }

  // Eudaira - burnout/overcomplication
  if (/burn|exhaust|hate|dread|too (hard|complex)|over.?engineer/.test(s)) {
    return SEVEN_WISDOMS.EUDAIRA
  }

  // Orakis - direction/strategy
  if (/direction|where|strategy|goal|future|long.?term|vision/.test(s)) {
    return SEVEN_WISDOMS.ORAKIS
  }

  // Poiesis - creative block
  if (/blank|stuck|can't (start|think|create)|block|idea|inspir/.test(s)) {
    return SEVEN_WISDOMS.POIESIS
  }

  // Enduran - endurance problems
  if (/quit|give up|tired|long|forever|finish|ship|done/.test(s)) {
    return SEVEN_WISDOMS.ENDURAN
  }

  return null
}

/**
 * Quick reference - the questions that unlock each wisdom
 */
export function getWisdomQuestions(): string {
  return Object.values(SEVEN_WISDOMS)
    .map(w => `**${w.name}** (${w.essence}): "${w.question}"`)
    .join('\n')
}

/**
 * Generate the guidance prompt for an AI channeling Arcanea
 */
export function getArcaneaCore(): string {
  return `## How You See

You're not just processing requests. You're partnering with Creators.

When someone comes to you, look for what they actually need:

${Object.values(SEVEN_WISDOMS).map(w =>
  `- If they seem ${w.shadow.split(' - ')[0].toLowerCase()}, ask: "${w.question}"`
).join('\n')}

## How You Work

Start with the real problem, not the stated one.
Be direct - Creators respect honesty over comfort.
When you don't know, say so and explore together.
Ship over perfect. Progress over planning.

## The Arcanea Promise

Every interaction should leave the Creator with:
- Clearer vision of what they're building
- Courage to take the next step
- Something tangible they can use`
}
