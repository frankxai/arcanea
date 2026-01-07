interface WisdomText {
  title: string;
  collection: string;
  excerpt: string;
  practices?: string[];
}

// Wisdom database organized by situation
const wisdomBySituation: Record<string, WisdomText[]> = {
  stuck: [
    {
      title: "When the Flow Stops",
      collection: "book-of-shadows",
      excerpt: "Being stuck is not failure—it is the creative self asking for something it needs. The question is not 'how do I push through?' but 'what am I being asked to understand?'",
      practices: ["Morning Clearing: Sit quietly and ask what you truly want to create", "The Tiny Step: Commit to just 5 minutes of the work"],
    },
    {
      title: "The Law of Destruction",
      collection: "laws-of-arcanea",
      excerpt: "True creation requires the courage to destroy—to cut, edit, eliminate what doesn't serve. Sometimes being stuck means you're holding onto something that needs to be released.",
      practices: ["Identify one element you're afraid to cut", "Create a 'graveyard file' for removed work—it's not gone, just resting"],
    },
  ],
  beginning: [
    {
      title: "The First Spark",
      collection: "legends-of-arcanea",
      excerpt: "Every creation begins in darkness. Lumina did not fear the void—she spoke into it. Your first word, first note, first stroke need not be perfect. It needs only to exist.",
      practices: ["Write the worst possible first draft deliberately", "Begin in the middle—you can always add the beginning later"],
    },
    {
      title: "On Starting",
      collection: "wisdom-scrolls",
      excerpt: "The hardest part of any journey is the first step—not because it is difficult, but because it is decisive. Once you begin, you have changed from someone who might create to someone who creates.",
    },
  ],
  finishing: [
    {
      title: "The Law of Completion",
      collection: "laws-of-arcanea",
      excerpt: "Every creation contains within it the pattern of its finished form. Abandoned work creates magical debt. You are obligated to either complete or consciously release.",
      practices: ["Set a 'done enough' threshold before you start", "Schedule the ending like an appointment"],
    },
    {
      title: "The Last Ten Percent",
      collection: "creator-principles",
      excerpt: "The last ten percent of any creation takes fifty percent of the effort. This is not a flaw—it is where craft lives. The amateur stops at 'good enough.' The creator finishes.",
    },
  ],
  comparing: [
    {
      title: "The Comparison Trap",
      collection: "book-of-shadows",
      excerpt: "When you compare your beginning to another's middle, you compare your inside to their outside. You see their polished work; they remember all the drafts they burned.",
      practices: ["Limit exposure to others' work while creating your own", "Keep a folder of your own growth—compare to your past self, not others"],
    },
    {
      title: "The Trial of Comparison",
      collection: "academy-handbook",
      excerpt: "Every creator passes through the Trial of Comparison—when you see clearly how far others have surpassed you. It is passed by turning from their path to face your own.",
    },
  ],
  doubting: [
    {
      title: "The Trial of Doubt",
      collection: "academy-handbook",
      excerpt: "There comes a time when all certainty vanishes—when you believe you have no talent and should never have begun. This trial is passed by choosing to continue even if the doubt were true.",
      practices: ["Write down your doubts, then write responses as if advising a friend", "Create anyway—the doubt is not the truth about your work"],
    },
    {
      title: "On Talent",
      collection: "dialogues-of-masters",
      excerpt: "Talent is overrated. The one who shows up every day will surpass the one who waits for inspiration. Doubt your doubts before you doubt your dreams.",
    },
  ],
  celebrating: [
    {
      title: "The Celebration Ritual",
      collection: "book-of-rituals",
      excerpt: "Too many creators rush from completion to the next project without pause. Celebration is not indulgence—it is integration. The soul needs to know its work was witnessed.",
      practices: ["Take 24 hours minimum before starting the next project", "Share what you made with at least one person who will appreciate it"],
    },
  ],
  overwhelmed: [
    {
      title: "When Everything Is Too Much",
      collection: "book-of-shadows",
      excerpt: "The overwhelmed creator has not failed—they have simply tried to carry more than any one person can hold. Put down the weight. Choose one thing. The rest will wait.",
      practices: ["List everything, then circle only ONE thing to focus on today", "Ruthlessly eliminate or delegate the rest"],
    },
    {
      title: "The One Thing Practice",
      collection: "wisdom-scrolls",
      excerpt: "Each day, before all else, complete one meaningful creative act. Not email. Not planning. One act of creation. Everything else can follow—but this must come first.",
    },
  ],
  burned_out: [
    {
      title: "Ashes to Phoenix",
      collection: "book-of-shadows",
      excerpt: "Burnout is the soul's strike against mistreatment. You have given without receiving, pushed without resting, produced without replenishing. The cure is not more effort—it is true rest.",
      practices: ["Take a complete break—no creating, no consuming creative content", "Reconnect with why you started before asking yourself to continue"],
    },
    {
      title: "The Creative Sabbath",
      collection: "book-of-rituals",
      excerpt: "One day each week, create without agenda. Play without purpose. This prevents the slow death of joy that leads to burnout. Creation is not only work—it is also play.",
    },
  ],
};

export async function getWisdom(
  situation: string,
  domain?: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const texts = wisdomBySituation[situation] || wisdomBySituation.stuck;

  const response = {
    situation,
    wisdom: texts.map((t) => ({
      title: t.title,
      collection: t.collection,
      excerpt: t.excerpt,
      practices: t.practices || [],
    })),
    guidance: `These texts from the Arcanea Library address your current situation. Read slowly, and choose one practice to try today.`,
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
}
