// The Bestiary of Creative Blocks
// Each creature represents an obstacle creators face

export interface BestiaryCreature {
  slug: string;
  name: string;
  type: string;
  description: string;
  symptoms: string[];
  gateAffected: number;
  remedies: string[];
  affirmation: string;
}

export const bestiary: Record<string, BestiaryCreature> = {
  imposter_shade: {
    slug: "imposter_shade",
    name: "Imposter Shade",
    type: "Shadow",
    description: "A creature that whispers you don't belong, that your success is luck and your failures prove incompetence.",
    symptoms: [
      "Feeling like a fraud despite accomplishments",
      "Attributing success to luck, not skill",
      "Fear of being 'found out'",
      "Dismissing positive feedback",
    ],
    gateAffected: 5, // Voice Gate
    remedies: [
      "Keep an evidence file of your accomplishments",
      "Ask trusted colleagues for honest feedback",
      "Remember: experts often feel like beginners",
      "Share your doubts - you'll find you're not alone",
    ],
    affirmation: "I have earned my place through effort and learning. My growth is proof of my belonging.",
  },

  perfectionist_wyrm: {
    slug: "perfectionist_wyrm",
    name: "Perfectionist Wyrm",
    type: "Dragon",
    description: "A serpentine creature that coils around your work, convincing you it's never good enough to release.",
    symptoms: [
      "Endless revision without progress",
      "Fear of shipping imperfect work",
      "Comparing first drafts to others' finished work",
      "All-or-nothing thinking",
    ],
    gateAffected: 3, // Fire Gate (will, power)
    remedies: [
      "Set a 'good enough' threshold before starting",
      "Practice 'done is better than perfect'",
      "Ship small, iterate often",
      "Separate creation from editing sessions",
    ],
    affirmation: "Imperfect action beats perfect inaction. My work doesn't need to be perfect to be valuable.",
  },

  comparison_specter: {
    slug: "comparison_specter",
    name: "Comparison Specter",
    type: "Ghost",
    description: "A phantom that constantly shows you others' highlight reels while you live your behind-the-scenes.",
    symptoms: [
      "Obsessing over competitors' success",
      "Feeling behind no matter what you achieve",
      "Jealousy that blocks celebration",
      "Measuring worth by others' metrics",
    ],
    gateAffected: 4, // Heart Gate
    remedies: [
      "Curate your information diet",
      "Focus on your own 'before and after'",
      "Celebrate others genuinely to break the spell",
      "Remember: you see their results, not their struggle",
    ],
    affirmation: "My path is my own. Another's success does not diminish my worth.",
  },

  procrastination_hydra: {
    slug: "procrastination_hydra",
    name: "Procrastination Hydra",
    type: "Hydra",
    description: "A many-headed beast. Cut off one distraction, two more take its place.",
    symptoms: [
      "Doing everything except the important thing",
      "Urgent always beats important",
      "Waiting for the 'right moment'",
      "Productive procrastination",
    ],
    gateAffected: 1, // Foundation Gate
    remedies: [
      "Start with just 2 minutes",
      "Remove choice: schedule your creative time",
      "Make starting easier than not starting",
      "Identify the fear behind the delay",
    ],
    affirmation: "The right time is now. Beginning is the hardest step, and I can take it.",
  },

  overwhelm_leviathan: {
    slug: "overwhelm_leviathan",
    name: "Overwhelm Leviathan",
    type: "Leviathan",
    description: "A massive creature that drowns you in the ocean of everything that needs to be done.",
    symptoms: [
      "Paralysis from too many options",
      "Can't see where to start",
      "Everything feels equally urgent",
      "Mental fog and exhaustion",
    ],
    gateAffected: 6, // Sight Gate (clarity)
    remedies: [
      "Write everything down to externalize",
      "Choose just ONE next action",
      "Ruthlessly eliminate or delegate",
      "Break the whale into bite-sized pieces",
    ],
    affirmation: "I do not need to do everything. I need to do the next right thing.",
  },

  burnout_phoenix: {
    slug: "burnout_phoenix",
    name: "Burnout Phoenix",
    type: "Phoenix",
    description: "Unlike the healing Phoenix, this creature burns you to ash without the rebirth. It feeds on your passion until nothing remains.",
    symptoms: [
      "Exhaustion that sleep doesn't fix",
      "Cynicism about work you once loved",
      "Decreased performance despite more effort",
      "Emotional detachment from outcomes",
    ],
    gateAffected: 2, // Flow Gate
    remedies: [
      "Complete rest without guilt",
      "Reconnect with why you started",
      "Set boundaries and enforce them",
      "Seek support - this is not weakness",
    ],
    affirmation: "Rest is not the opposite of productivity. Rest is what makes productivity possible.",
  },

  inner_critic_basilisk: {
    slug: "inner_critic_basilisk",
    name: "Inner Critic Basilisk",
    type: "Basilisk",
    description: "A creature whose gaze turns your creative impulses to stone before they can manifest.",
    symptoms: [
      "Harsh self-judgment during creation",
      "Voice in head that's meaner than you'd be to anyone else",
      "Editing while drafting",
      "Assuming negative outcomes before trying",
    ],
    gateAffected: 5, // Voice Gate
    remedies: [
      "Name the critic - externalize it",
      "Ask: would I say this to a friend?",
      "Separate creation time from judgment time",
      "Thank the critic for trying to protect you, then proceed",
    ],
    affirmation: "My inner critic means well but is not in charge. I create first, evaluate later.",
  },

  blank_page_wraith: {
    slug: "blank_page_wraith",
    name: "Blank Page Wraith",
    type: "Wraith",
    description: "A pale specter that haunts empty canvases and blank documents, feeding on the fear of beginning.",
    symptoms: [
      "Staring at empty space unable to start",
      "Fear of ruining the pristine blank",
      "Waiting for inspiration to strike",
      "Overthinking the first move",
    ],
    gateAffected: 1, // Foundation Gate
    remedies: [
      "Start with garbage - give yourself permission to write badly",
      "Use prompts or constraints to remove the infinite choice",
      "Begin in the middle, not the beginning",
      "Fill the blank with anything - then edit",
    ],
    affirmation: "The blank page is not sacred. It is waiting to be transformed by my imperfect action.",
  },

  fear_of_judgment_phantom: {
    slug: "fear_of_judgment_phantom",
    name: "Fear of Judgment Phantom",
    type: "Phantom",
    description: "An invisible presence that amplifies imagined criticism until it drowns out all creative impulse.",
    symptoms: [
      "Creating only in secret",
      "Never sharing work",
      "Imagining worst-case responses",
      "Over-preparing to forestall criticism",
    ],
    gateAffected: 5, // Voice Gate
    remedies: [
      "Share with one trusted person first",
      "Remember: most people are too busy with their own lives",
      "Criticism means someone engaged with your work",
      "You are not your work - it's one expression of many",
    ],
    affirmation: "Creating publicly takes courage. I am brave enough to be seen.",
  },

  shiny_object_sprite: {
    slug: "shiny_object_sprite",
    name: "Shiny Object Sprite",
    type: "Fae",
    description: "A glittering creature that lures you from project to project, never letting you finish anything.",
    symptoms: [
      "Many started projects, few finished",
      "New idea excitement kills current momentum",
      "Constantly pivoting",
      "Boredom with the middle",
    ],
    gateAffected: 2, // Flow Gate
    remedies: [
      "Keep an 'idea parking lot' for new ideas",
      "Set completion gates before starting new things",
      "Remember: the middle is where the magic happens",
      "Commit publicly to finishing one thing",
    ],
    affirmation: "Finishing is a skill. I will see this through before chasing the next shiny thing.",
  },

  resistance_golem: {
    slug: "resistance_golem",
    name: "Resistance Golem",
    type: "Golem",
    description: "A heavy stone creature that blocks the path between you and your most important work. The more important the work, the larger the golem.",
    symptoms: [
      "Avoidance of meaningful projects",
      "Doing easy tasks instead of important ones",
      "Physical discomfort when approaching the work",
      "Rationalization for not starting",
    ],
    gateAffected: 3, // Fire Gate (will)
    remedies: [
      "Recognize resistance as a compass pointing to important work",
      "Start before you feel ready",
      "Create accountability structures",
      "Make the first step laughably small",
    ],
    affirmation: "Resistance is a sign that I'm approaching something meaningful. I move toward it, not away.",
  },

  validation_vampire: {
    slug: "validation_vampire",
    name: "Validation Vampire",
    type: "Vampire",
    description: "A creature that drains your creative energy by making you dependent on external approval.",
    symptoms: [
      "Creating for likes, not meaning",
      "Constantly checking metrics",
      "Mood tied to reception",
      "Unable to create without audience",
    ],
    gateAffected: 4, // Heart Gate
    remedies: [
      "Create something you'll never share",
      "Delay checking metrics by 24 hours",
      "Define your own success criteria before publishing",
      "Remember: your favorite creators had small audiences once",
    ],
    affirmation: "My work has value independent of its reception. I create because I must, not for approval.",
  },

  scope_creep_shapeshifter: {
    slug: "scope_creep_shapeshifter",
    name: "Scope Creep Shapeshifter",
    type: "Shapeshifter",
    description: "A creature that constantly grows your project larger, preventing completion.",
    symptoms: [
      "Projects that keep expanding",
      "Moving goalposts",
      "Feature additions that delay shipping",
      "Lost sight of original goal",
    ],
    gateAffected: 6, // Sight Gate (clarity)
    remedies: [
      "Define 'done' in writing before starting",
      "Keep a separate list for 'version 2'",
      "Ask: is this essential to the core purpose?",
      "Set a hard deadline and work backward",
    ],
    affirmation: "Constraints create clarity. I will finish what I set out to do before expanding.",
  },

  analysis_paralysis_spider: {
    slug: "analysis_paralysis_spider",
    name: "Analysis Paralysis Spider",
    type: "Spider",
    description: "A creature that spins webs of endless research and planning, trapping you before you begin.",
    symptoms: [
      "Researching instead of doing",
      "Seeking more information before action",
      "Waiting until you know enough",
      "Planning as procrastination",
    ],
    gateAffected: 6, // Sight Gate
    remedies: [
      "Set a research time limit",
      "Prototype first, research when stuck",
      "Good enough information beats perfect paralysis",
      "Ask: what would I do if I had to decide now?",
    ],
    affirmation: "I have enough information to begin. Action teaches what research cannot.",
  },

  tomorrow_troll: {
    slug: "tomorrow_troll",
    name: "Tomorrow Troll",
    type: "Troll",
    description: "A creature that guards the bridge to action, always suggesting tomorrow is a better day to cross.",
    symptoms: [
      "Perpetual 'starting Monday'",
      "Conditions that must be met before starting",
      "Tomorrow always seems better",
      "Time blindness about future availability",
    ],
    gateAffected: 1, // Foundation Gate
    remedies: [
      "Do 5 minutes today, not 'starting tomorrow'",
      "Recognize: tomorrow's you has the same challenges",
      "Build on existing habits, don't create new ones",
      "Make starting easier than continuing to wait",
    ],
    affirmation: "Tomorrow is a lie I tell myself. Today is the only day I can act.",
  },

  ego_attachment_demon: {
    slug: "ego_attachment_demon",
    name: "Ego Attachment Demon",
    type: "Demon",
    description: "A creature that fuses your identity with your work's reception, making criticism feel like personal attack.",
    symptoms: [
      "Defensive reaction to feedback",
      "Identity tied to work quality",
      "Success or failure determines self-worth",
      "Inability to iterate on criticized work",
    ],
    gateAffected: 7, // Crown Gate (wisdom)
    remedies: [
      "Separate creator from creation",
      "Remember: you are not your work",
      "Practice receiving feedback with gratitude",
      "Your next work will be different from this one",
    ],
    affirmation: "I am not my work. My work is one expression of me, not the totality of my worth.",
  },

  comfort_zone_cocoon: {
    slug: "comfort_zone_cocoon",
    name: "Comfort Zone Cocoon",
    type: "Insect",
    description: "A warm, safe wrapping that feels protective but prevents transformation.",
    symptoms: [
      "Avoiding creative risks",
      "Repeating what worked before",
      "Fear of experimentation",
      "Choosing safety over growth",
    ],
    gateAffected: 8, // Shift Gate (transformation)
    remedies: [
      "Schedule small experiments regularly",
      "Try one 'uncomfortable' thing per project",
      "Remember: comfort zones shrink if not expanded",
      "Define growth goals alongside output goals",
    ],
    affirmation: "Growth lives just outside my comfort zone. I will reach for it.",
  },

  creative_envy_chimera: {
    slug: "creative_envy_chimera",
    name: "Creative Envy Chimera",
    type: "Chimera",
    description: "A multi-headed beast that makes you want others' gifts while blinding you to your own.",
    symptoms: [
      "Wishing you had someone else's talent",
      "Copying style without finding your own",
      "Resentment of others' success",
      "Blindness to your unique strengths",
    ],
    gateAffected: 5, // Voice Gate (authenticity)
    remedies: [
      "List your unique combination of traits",
      "Study how they developed their style (it wasn't overnight)",
      "Transform envy into admiration and learning",
      "Ask: what can only I create?",
    ],
    affirmation: "Their light does not diminish mine. I will find and fuel my own flame.",
  },

  attention_fragmentation_fae: {
    slug: "attention_fragmentation_fae",
    name: "Attention Fragmentation Fae",
    type: "Fae",
    description: "Tiny creatures that scatter your focus into a thousand pieces, never letting you sink deep.",
    symptoms: [
      "Constant task-switching",
      "Unable to achieve flow state",
      "Addiction to notifications",
      "Shallow work feels busy but accomplishes little",
    ],
    gateAffected: 7, // Crown Gate (concentration)
    remedies: [
      "Block distractions during creative time",
      "Practice single-tasking deliberately",
      "Batch similar activities",
      "Create a ritual for deep work entry",
    ],
    affirmation: "My attention is valuable. I will protect it and direct it with intention.",
  },

  failure_phantom: {
    slug: "failure_phantom",
    name: "Failure Phantom",
    type: "Phantom",
    description: "A spectral creature that haunts you with memories of past failures, preventing new attempts.",
    symptoms: [
      "Paralyzed by previous failures",
      "Expecting history to repeat",
      "Risk aversion from old wounds",
      "Defining self by past mistakes",
    ],
    gateAffected: 8, // Shift Gate (perspective)
    remedies: [
      "Reframe failures as data, not destiny",
      "List what you learned from each failure",
      "Remember: every master has a graveyard of failures",
      "The past does not equal the future",
    ],
    affirmation: "My past failures are teachers, not predictions. I am not who I was.",
  },
};
