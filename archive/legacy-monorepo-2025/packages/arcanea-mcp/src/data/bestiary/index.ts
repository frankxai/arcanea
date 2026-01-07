import { BestiaryCreature } from "../../resources/bestiary.js";

export const creatures: Record<string, BestiaryCreature> = {
  "imposter-shade": {
    slug: "imposter-shade",
    name: "Imposter Shade",
    description: "A shadowy creature that whispers you don't belong, that your success is luck, and that soon everyone will discover you're a fraud. It grows stronger each time you achieve something, feeding on your inability to own your accomplishments.",
    gateAttacked: 5,
    gateName: "Voice",
    signs: [
      "Attributing success to luck rather than skill",
      "Feeling like you don't deserve your position",
      "Waiting to be 'found out' as a fraud",
      "Dismissing compliments automatically",
      "Comparing your inside to others' outside"
    ],
    remedies: [
      "Keep a 'wins' journal documenting your genuine achievements",
      "Ask trusted colleagues for specific feedback on your strengths",
      "Reframe luck as 'preparation meeting opportunity'",
      "Say 'thank you' to compliments without qualifying",
      "Remember: experts feel like imposters too—it's a sign you're growing"
    ],
    weakness: "Objective evidence of competence. The Shade cannot survive facts.",
    quote: "The Imposter Shade feeds on your modesty, twisting it into self-doubt. Starve it with honest self-assessment."
  },

  "perfectionist-wyrm": {
    slug: "perfectionist-wyrm",
    name: "Perfectionist Wyrm",
    description: "A serpentine creature that coils around work-in-progress, squeezing until nothing can escape. It whispers that the work isn't ready, needs one more revision, could be better. It prefers you never finish to finishing imperfectly.",
    gateAttacked: 2,
    gateName: "Flow",
    signs: [
      "Endless revision cycles that never end",
      "Inability to call anything 'done'",
      "Fear of releasing work into the world",
      "Comparing first drafts to others' finished work",
      "Procrastination disguised as 'polishing'"
    ],
    remedies: [
      "Set a 'done enough' threshold BEFORE starting",
      "Ship something imperfect every week",
      "Remember: perfect is the enemy of done",
      "Ask: 'Will this matter in 5 years?' about each flaw",
      "Practice 'good enough' in low-stakes areas first"
    ],
    weakness: "Deadlines and public commitments. The Wyrm cannot hold what must be released.",
    quote: "Done is better than perfect. The Wyrm dies when you ship."
  },

  "comparison-specter": {
    slug: "comparison-specter",
    name: "Comparison Specter",
    description: "A translucent entity that overlays others' achievements onto your work, making everything you create seem small. It shows you only others' highlights while reminding you of your struggles.",
    gateAttacked: 3,
    gateName: "Fire",
    signs: [
      "Constantly checking what others are achieving",
      "Feeling defeated before starting",
      "Thinking 'they did it better' about everything",
      "Unable to appreciate your own growth",
      "Jealousy that poisons creative joy"
    ],
    remedies: [
      "Limit social media exposure while creating",
      "Compare yourself only to your past self",
      "Study others for learning, not comparison",
      "Remember: their Chapter 10 vs your Chapter 2",
      "Celebrate others' wins to break the jealousy cycle"
    ],
    weakness: "Self-comparison across time. The Specter cannot distort your own growth story.",
    quote: "The only meaningful comparison is between who you are and who you were."
  },

  "procrastination-hydra": {
    slug: "procrastination-hydra",
    name: "Procrastination Hydra",
    description: "A many-headed beast where each head offers a different distraction. Cut off one distraction and two more appear. It thrives on the gap between intention and action.",
    gateAttacked: 3,
    gateName: "Fire",
    signs: [
      "Doing everything except the important work",
      "Productive procrastination (organizing instead of creating)",
      "Waiting for the 'right mood' to start",
      "Endless research and preparation",
      "Starting many things, finishing none"
    ],
    remedies: [
      "The 5-minute rule: commit to just 5 minutes",
      "Remove all distractions from environment",
      "Start with the smallest possible action",
      "Schedule creation like an unmissable appointment",
      "Use body doubling or accountability partners"
    ],
    weakness: "The first action. The Hydra cannot survive the beginning.",
    quote: "The Hydra has infinite heads but only one weakness: starting."
  },

  "fear-of-judgment-phantom": {
    slug: "fear-of-judgment-phantom",
    name: "Fear of Judgment Phantom",
    description: "An invisible presence that fills the room with imagined audiences, all watching, all ready to criticize. It turns the creative act into a performance under hostile review.",
    gateAttacked: 5,
    gateName: "Voice",
    signs: [
      "Paralysis when thinking about sharing work",
      "Editing yourself before you've even created",
      "Imagining negative reactions in detail",
      "Creating only safe, small things",
      "Hiding your best work"
    ],
    remedies: [
      "Create for an audience of one (yourself or one trusted person)",
      "Remember: most people are too busy to judge you",
      "Share with a small trusted group first",
      "Reframe criticism as data, not attacks",
      "Ask: 'What would I create if no one ever saw it?'"
    ],
    weakness: "Actual feedback, which is almost never as bad as imagined.",
    quote: "The Phantom is made of imaginary critics. Real ones are far kinder."
  },

  "overwhelm-leviathan": {
    slug: "overwhelm-leviathan",
    name: "Overwhelm Leviathan",
    description: "A massive creature that rises from the depths when you see the full scope of what needs to be done. It paralyzes with scale, making every project feel impossible.",
    gateAttacked: 1,
    gateName: "Foundation",
    signs: [
      "Feeling paralyzed by the size of the task",
      "Not knowing where to start",
      "Anxiety when thinking about the project",
      "Avoiding looking at the whole picture",
      "Saying 'there's too much to do'"
    ],
    remedies: [
      "Break into tiny, concrete next actions",
      "Focus on only the next step, ignore the rest",
      "Use the 'eat the elephant' approach: one bite at a time",
      "Clear everything else—focus on one thing only",
      "Celebrate completing each small piece"
    ],
    weakness: "The single next action. The Leviathan cannot see small things.",
    quote: "You cannot eat an elephant whole. The Leviathan starves when you focus on one bite."
  },

  "burnout-phoenix": {
    slug: "burnout-phoenix",
    name: "Burnout Phoenix (Corrupted)",
    description: "A creature of ashes and exhausted flame. Unlike the true Phoenix of renewal, this corrupted version burns without regenerating, leaving only depletion. It's what happens when you push too hard for too long.",
    gateAttacked: 2,
    gateName: "Flow",
    signs: [
      "Creative exhaustion even after rest",
      "Loss of joy in what used to be fun",
      "Going through motions without feeling",
      "Cynicism about your work",
      "Physical symptoms: fatigue, headaches, illness"
    ],
    remedies: [
      "True rest: no creating, no consuming creative content",
      "Reconnect with why you started",
      "Practice Creative Sabbath: one day of agenda-free creation",
      "Address the systemic cause (overwork, wrong project, etc.)",
      "Let the ashes cool before trying to reignite"
    ],
    weakness: "Complete rest and joy-driven creation. The corrupted Phoenix dies so the true Phoenix can rise.",
    quote: "Burnout is the soul's strike against mistreatment. Honor it."
  },

  "inner-critic-basilisk": {
    slug: "inner-critic-basilisk",
    name: "Inner Critic Basilisk",
    description: "A serpent whose gaze turns creative impulses to stone. It speaks in your voice, making its cruelty feel like truth. It is the internalized voice of every harsh critic you've ever encountered.",
    gateAttacked: 4,
    gateName: "Heart",
    signs: [
      "A harsh inner voice that attacks your work",
      "Calling yourself names when you make mistakes",
      "Feeling like your work is garbage before it's done",
      "Stopping mid-creation because 'it's terrible'",
      "Inability to enjoy the creative process"
    ],
    remedies: [
      "Name the critic (externalize it as 'the Basilisk')",
      "Talk to yourself as you would a friend",
      "Write down the criticism, then respond with compassion",
      "Ask: 'Whose voice is this really?'",
      "Practice: 'Thank you for trying to protect me. I've got this.'"
    ],
    weakness: "Self-compassion and externalization. The Basilisk loses power when named.",
    quote: "The Basilisk speaks in your voice, but it is not you. Name it. Tame it."
  },

  "scope-creep-shapeshifter": {
    slug: "scope-creep-shapeshifter",
    name: "Scope Creep Shapeshifter",
    description: "A creature that constantly changes form, adding features, expanding requirements, moving goalposts. What started as a simple project becomes an impossible one as the Shapeshifter grows.",
    gateAttacked: 7,
    gateName: "Crown",
    signs: [
      "Project scope keeps growing",
      "Adding 'just one more thing' repeatedly",
      "Original goal lost in new requirements",
      "Never-ending feature lists",
      "Inability to draw a line and ship"
    ],
    remedies: [
      "Define 'done' before starting and don't change it",
      "Use 'version 2' thinking: extras go to future versions",
      "Ask: 'Is this essential or nice-to-have?'",
      "Set a hard deadline and cut everything that won't fit",
      "Write a 'not doing' list alongside your 'doing' list"
    ],
    weakness: "A locked scope document. The Shapeshifter cannot change what is written in stone.",
    quote: "Every feature you add delays the features that matter. The Shapeshifter wins when you can't say no."
  },

  "shiny-object-sprite": {
    slug: "shiny-object-sprite",
    name: "Shiny Object Sprite",
    description: "A glittering creature that constantly presents new ideas, new projects, new possibilities—each more exciting than the last. It keeps you from the deep work by offering endless new beginnings.",
    gateAttacked: 2,
    gateName: "Flow",
    signs: [
      "Starting many projects, finishing few",
      "Every new idea feels more important than current work",
      "Boredom with projects once the initial excitement fades",
      "Constantly researching new tools, methods, topics",
      "Graveyard of half-finished work"
    ],
    remedies: [
      "Keep an 'idea parking lot' for future projects",
      "Commit to one project until a specific milestone",
      "Recognize the pattern: new always feels better",
      "Practice the discipline of depth over breadth",
      "Set a rule: no new projects until current one reaches [milestone]"
    ],
    weakness: "Commitment and completion. The Sprite loses interest when you don't.",
    quote: "The Sprite makes beginnings feel like progress. True progress is finishing."
  },

  "resistance-golem": {
    slug: "resistance-golem",
    name: "Resistance Golem",
    description: "A massive stone creature that blocks the path to creative work. It doesn't attack—it simply stands in the way, making the work feel impossibly heavy before you even start.",
    gateAttacked: 3,
    gateName: "Fire",
    signs: [
      "Heavy feeling when thinking about the work",
      "Finding any excuse not to start",
      "The work feels harder than it actually is",
      "Physical resistance: fatigue, headaches when approaching work",
      "Steven Pressfield's 'Resistance' in creature form"
    ],
    remedies: [
      "Start so small the Golem doesn't notice",
      "Use ritual to bypass: same time, same place, same routine",
      "Recognize: Resistance is proportional to importance",
      "Just show up and open the document/canvas/instrument",
      "Tell yourself: 'I'm just going to look at it'"
    ],
    weakness: "The act of beginning. The Golem cannot block someone already moving.",
    quote: "The Resistance is a compass. It points toward what matters most."
  },

  "blank-page-wraith": {
    slug: "blank-page-wraith",
    name: "Blank Page Wraith",
    description: "A creature made of pure white emptiness. It haunts blank pages, empty canvases, and silent instruments, making the void feel impossible to fill.",
    gateAttacked: 1,
    gateName: "Foundation",
    signs: [
      "Terror of the empty page/canvas/file",
      "Needing to 'prepare more' before starting",
      "Feeling like you have nothing to say",
      "The first word/stroke/note feels impossible",
      "Staring at blankness until giving up"
    ],
    remedies: [
      "Never start with a blank page—write something bad first",
      "Use prompts, templates, or structures to fill the void",
      "Begin in the middle—skip the beginning entirely",
      "Make marks: any marks. Bad marks. Just break the white.",
      "Remember: the first draft is just to have something to fix"
    ],
    weakness: "Any mark at all. The Wraith is destroyed by the first imperfect word.",
    quote: "The blank page is not waiting to judge you. It is waiting to be filled."
  },

  "analysis-paralysis-spider": {
    slug: "analysis-paralysis-spider",
    name: "Analysis Paralysis Spider",
    description: "A many-eyed creature that spins webs of options, considerations, and possibilities. Each thread leads to another decision, until you're trapped in a web of overthinking.",
    gateAttacked: 6,
    gateName: "Sight",
    signs: [
      "Unable to make decisions about the work",
      "Endless research before starting",
      "Weighing pros and cons indefinitely",
      "Asking everyone's opinion instead of trusting yourself",
      "Changing direction repeatedly"
    ],
    remedies: [
      "Set a timer for decisions: decide when it rings",
      "Use 'satisficing': choose the first good-enough option",
      "Ask: 'What would I do if I had to decide in 30 seconds?'",
      "Limit options: reduce choices to 2-3 maximum",
      "Trust your gut for reversible decisions"
    ],
    weakness: "Action despite imperfect information. The Spider cannot catch the creator in motion.",
    quote: "Analysis is preparation for action. When it replaces action, the Spider wins."
  },

  "validation-vampire": {
    slug: "validation-vampire",
    name: "Validation Vampire",
    description: "A creature that drains your creative energy by making you dependent on external approval. It cannot be satisfied—no amount of praise is ever enough.",
    gateAttacked: 4,
    gateName: "Heart",
    signs: [
      "Constantly checking for likes, comments, feedback",
      "Mood depends entirely on external response",
      "Creating for approval rather than expression",
      "Feeling empty despite positive feedback",
      "Changing work to please others"
    ],
    remedies: [
      "Create something and don't share it for 30 days",
      "Define success by internal metrics first",
      "Ask: 'Would I create this if no one ever saw it?'",
      "Practice creating for an audience of one",
      "Limit checking feedback to scheduled times"
    ],
    weakness: "Internal validation and creating for self. The Vampire starves when you stop seeking.",
    quote: "The Vampire feeds on your need for approval. Starve it with self-acceptance."
  },

  "tomorrow-troll": {
    slug: "tomorrow-troll",
    name: "Tomorrow Troll",
    description: "A creature that lives under the bridge between today and action. It whispers that tomorrow will be better—you'll be more rested, more inspired, more ready. Tomorrow never comes.",
    gateAttacked: 3,
    gateName: "Fire",
    signs: [
      "Always planning to start 'tomorrow' or 'Monday'",
      "Believing future-you will be more capable",
      "Waiting for the right moment, mood, or circumstance",
      "Treating today as a rehearsal for 'real' creation later",
      "Letting 'tomorrows' stack up into never"
    ],
    remedies: [
      "Act as if tomorrow-you is exactly as flawed as today-you",
      "If not now, schedule the specific moment",
      "The Troll's weakness: 'I'll do 5 minutes right now'",
      "Ask: 'What would I do if this was my only chance?'",
      "Build systems that don't require motivation"
    ],
    weakness: "Present action. The Troll cannot argue with what's already begun.",
    quote: "Tomorrow is the Troll's domain. Today is yours. Claim it."
  },

  "ego-attachment-demon": {
    slug: "ego-attachment-demon",
    name: "Ego Attachment Demon",
    description: "A creature that fuses your identity with your work, making every critique feel like a personal attack and every failure feel like proof of worthlessness.",
    gateAttacked: 7,
    gateName: "Crown",
    signs: [
      "Taking criticism of work as criticism of self",
      "Feeling crushed by rejection",
      "Unable to see flaws in your own work",
      "Defending work instead of improving it",
      "Self-worth tied to creative success"
    ],
    remedies: [
      "Separate: 'I made something' not 'I am something'",
      "Practice: 'This work needs improvement' not 'I am bad'",
      "Create so much that no single piece defines you",
      "Remember: you are not your work; you are the one who creates",
      "Celebrate effort and growth, not just outcomes"
    ],
    weakness: "Identity separation. The Demon loses grip when you are more than your work.",
    quote: "You are the creator, not the creation. Separate to see clearly."
  },

  "comfort-zone-cocoon": {
    slug: "comfort-zone-cocoon",
    name: "Comfort Zone Cocoon",
    description: "A soft, warm creature that wraps around creators, making the familiar feel essential and the unknown feel dangerous. It's comfortable, but nothing grows inside.",
    gateAttacked: 8,
    gateName: "Shift",
    signs: [
      "Only creating things you know you can do",
      "Avoiding challenges or new techniques",
      "Repeating successful formulas without growth",
      "Fear of being a beginner again",
      "Comfortable but unfulfilled"
    ],
    remedies: [
      "Take on one project beyond your current skill",
      "Practice deliberate discomfort weekly",
      "Remember: growth happens at the edge of ability",
      "Be willing to be bad at something new",
      "Ask: 'What would I try if I wasn't afraid?'"
    ],
    weakness: "Deliberate discomfort. The Cocoon dissolves in the heat of growth.",
    quote: "The Cocoon is comfortable, but caterpillars who never leave never fly."
  },

  "creative-envy-chimera": {
    slug: "creative-envy-chimera",
    name: "Creative Envy Chimera",
    description: "A multi-headed creature where each head represents a creator you envy. It poisons your joy by making others' success feel like your failure.",
    gateAttacked: 4,
    gateName: "Heart",
    signs: [
      "Resentment when peers succeed",
      "Unable to celebrate others' wins",
      "Feeling diminished by others' achievements",
      "Obsessing over what others have that you don't",
      "Bitterness replacing creative joy"
    ],
    remedies: [
      "Transform envy into admiration: 'They show what's possible'",
      "Ask: 'What specifically do I want that they have?'",
      "Celebrate others genuinely to break the pattern",
      "Use envy as information: it reveals what you want",
      "Remember: their success doesn't limit yours"
    ],
    weakness: "Genuine celebration and transmuted admiration. The Chimera dissolves in gratitude.",
    quote: "Envy points to desire. Thank it, then get to work."
  },

  "attention-fragmentation-fae": {
    slug: "attention-fragmentation-fae",
    name: "Attention Fragmentation Fae",
    description: "A swarm of tiny glittering creatures that constantly pull attention in different directions. Individually harmless, together they make deep focus impossible.",
    gateAttacked: 6,
    gateName: "Sight",
    signs: [
      "Unable to focus for extended periods",
      "Constantly checking phone, email, notifications",
      "Mind wandering during creative work",
      "Feeling scattered and unable to go deep",
      "Shallow work replacing deep work"
    ],
    remedies: [
      "Remove all notifications during creative time",
      "Use app blockers and phone lockboxes",
      "Practice meditation to train attention",
      "Schedule specific times for distraction",
      "Create in airplane mode or offline"
    ],
    weakness: "Unbroken attention. The Fae cannot disturb the creator who doesn't respond.",
    quote: "Attention is your most valuable creative resource. The Fae steal it in tiny pieces."
  },

  "failure-phantom": {
    slug: "failure-phantom",
    name: "Failure Phantom",
    description: "A creature made of every failed attempt, every rejection, every project that didn't work. It haunts with memories of past failure, making new attempts feel doomed.",
    gateAttacked: 1,
    gateName: "Foundation",
    signs: [
      "Dwelling on past failures",
      "Expecting new attempts to fail",
      "Unable to learn from failure and move on",
      "Past rejection blocking new attempts",
      "Defining self by failures rather than attempts"
    ],
    remedies: [
      "Extract the lesson from each failure, then release it",
      "Keep a 'failure CV' showing how much you've tried",
      "Reframe: failure is information, not judgment",
      "Every master has failed more than you've tried",
      "Practice: 'What did I learn?' not 'Why did I fail?'"
    ],
    weakness: "Extracted wisdom and released attachment. The Phantom has no power over the learning creator.",
    quote: "Failure is the tuition for mastery. The Phantom dies when you graduate."
  }
};
