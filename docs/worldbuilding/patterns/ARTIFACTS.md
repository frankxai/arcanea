# ARTIFACTS — The Craft Patterns for Legendary Objects

> **Status**: STAGING ⏳ — Awaiting Creator approval for any promotion to canon
> **Last Updated**: 2026-08-08
> **Purpose**: The seven research knowledgebases in [`../research/`](../research/) are cut *by world*. This file re-cuts the same research *by craft problem* — everything the benchmark franchises know about artifacts, relics, weapons, regalia, and materials, arranged so it is usable at the moment someone sits down to design one.
> **Design Lineage**: Comparative mechanism extraction across Tolkien, Elder Scrolls, Final Fantasy, Marvel, the Wizarding World, Warcraft, and modern anime canon. Architecture, never bricks ([`../BEST_PRACTICES.md`](../BEST_PRACTICES.md) §IV).
> **Touches LOCKED canon**: No. Additive and read-only with respect to [`../../../.arcanea/lore/CANON_LOCKED.md`](../../../.arcanea/lore/CANON_LOCKED.md). Section 3 proposes *slots*, not designs, and every slot requires `/lock-decision`.

---

## 0. The problem this file solves

A material is a set of properties. An artifact is a set of *relationships* — to a maker, a bearer, a loss, a faction that wants it, a faction that would destroy it.

Arcanea has an unusually good material system already: Tier 7 of the locked canon file specifies Vael Crystals, Luminor Metals, and Nero Shards with real physical grammar and a scientific substrate. It also has an artifact *category* in circulation — "Luminarch-grade artifacts from the Eldrian era," which Celestials alone are confirmed to wield, and which the Architects hunt in the Nexus Vaults ([`../../../.arcanea/lore/FACTIONS.md`](../../../.arcanea/lore/FACTIONS.md)) — plus one genuinely well-built individual object: the Stellarch's twelve-point sigil and its seven-frequency armor, whose capabilities are classified, whose historical claims are disputed, and one of whose reported effects "has never been independently verified" ([`../../../.arcanea/lore/STARLIGHT_CORPS_CODEX.md`](../../../.arcanea/lore/STARLIGHT_CORPS_CODEX.md)). That sigil is already doing P5 and P11 correctly, and is the working model for everything below.

What is missing is *volume and custody*. The artifact category is referenced far more often than it is populated: aside from the sigil, almost nothing is individually named, and nothing at all has a chain of custody. Draconis Ember has a temperament; nobody has yet lost a blade forged from it, or lied about who forged it, or refused to carry it.

That is the gap. Everything below is aimed at it.

---

## 1. The transferable patterns

Thirteen mechanisms, each with the design rule that makes it reusable. None of the source *names* enter Arcanea (see §5).

### P1 — The Object That Chooses

**Mechanism.** Allegiance is a property of the object, not a property of the owner. The item has an opinion about who holds it, and that opinion changes under a *specific, stateable act* — not under a moral audit.

**Demonstrated by.** The Wizarding World's wandlore, the only genuinely hard subsystem in an otherwise soft magic ([`../research/harry-potter-fantastic-beasts.md`](../research/harry-potter-fantastic-beasts.md) §Magic System): allegiance transfers on disarmament, and because the rule is hard, the entire final climax can turn on it. Marvel's worthiness enchantment is the same shape with a vaguer trigger, and is correspondingly weaker as a plot instrument.

**Design rule.** Write the transfer condition as one sentence a reader could apply themselves, publish it early, and never add a clause during the climax. If the condition is "worthiness," you have written a mood, not a rule — replace it with an act (disarming, refusing, paying, being witnessed). A choosing object earns its keep only when the audience can predict the transfer one scene before the characters do.

### P2 — Power Inseparable from Its Corruption

**Mechanism.** The item's strength and its damage are the same mechanism, not a strength with a drawback attached. There is no correct way to use it.

**Demonstrated by.** The One Ring — real amplification, and unusable against its maker without becoming him ([`../research/tolkien-middle-earth.md`](../research/tolkien-middle-earth.md) §Magic System). Warcraft's signature runeblade, which grants exactly the power its bearer wanted and spends him to do it ([`../research/warcraft.md`](../research/warcraft.md) §Raid Boss & Encounter Lore). Arcanea already owns a version: Kurusei Iron, "alive in a wrong way — whispers, wants to be wielded," locked-file Tier 7.

**Design rule.** Name the first symptom, the tenth symptom, and the point of no return, in behavioral terms a reader can diagnose before the text says it. "Corrupts the user" is beige. "Stops asking questions he already knows the answer to; then stops asking; then answers for other people" is an artifact.

### P3 — The Artifact That Is a Rule

**Mechanism.** The object's entire power is its published clause list. Drama comes from exploiting the wording, not from the power level.

**Demonstrated by.** The rules-object premise of the death-ledger genre in modern anime canon, where the reader holds the same rulebook as the characters ([`../research/anime-modern-worlds.md`](../research/anime-modern-worlds.md) §Hard Power Systems, on limitations as the source of story). Elder Scrolls' prophecy-scrolls do it inversely: the object's clause is a *cost* (reading it takes your sight) and its output is contradictory pasts ([`../research/elder-scrolls.md`](../research/elder-scrolls.md) §Magic System).

**Design rule.** If you publish clauses, you are writing a contract, and the reader will lawyer it. Publish fewer clauses than you think, keep one clause ambiguously worded on purpose, and never introduce a new clause off-page. The ambiguity is the plot; a retro-added clause is a cheat and readers can tell.

### P4 — The Priced Object, Paid by Someone Named

**Mechanism.** The item works, and the invoice is itemized to a person the audience can meet.

**Demonstrated by.** Alchemy's counterfeit-payment stone in modern anime canon — a power source that is people, positioned as a *cheat* against the world's own stated law of exchange ([`../research/anime-modern-worlds.md`](../research/anime-modern-worlds.md) §Hard Power Systems). Elder Scrolls' soul gems, where sentient souls are the potent and morally radioactive tier ([`../research/elder-scrolls.md`](../research/elder-scrolls.md)). Final Fantasy's summoning-as-covenant, channeled through the willingly dead ([`../research/final-fantasy.md`](../research/final-fantasy.md) §Summons).

**Design rule.** "It drains life force" costs nothing. Give the price a roster. If the object cost a village, the village has a name, a trade, and one survivor who is still alive at story-time. TASTE's stakes test and its ache test are both satisfied by the same move: make the bill readable.

### P5 — Provenance Over Properties

**Mechanism.** The chain of custody — who made it, who carried it, who lost it, who lies about it — carries more narrative load than the item's effect.

**Demonstrated by.** Tolkien's seeing-stones, which are interesting almost entirely because of *who has one and who used it badly*. Warcraft's relic-drops, where "a drop with a paragraph of history converts a stat upgrade into a relic" ([`../research/warcraft.md`](../research/warcraft.md)). The fragment method generally: an item description is a primary source with a biased author ([`../BEST_PRACTICES.md`](../BEST_PRACTICES.md) §I).

**Design rule.** Every artifact entry ships a chain: **maker → three carriers → one loss → one open question**. The effect line is optional. The chain is not. And at least one link should be *disputed by a faction with a motive* — provenance that nobody contests is a receipt, not a history.

### P6 — Famous versus Secret (public epistemic status)

**Mechanism.** An artifact's protection is often not physical. The famous one is protected by disbelief; the secret one is protected by ignorance; both statuses are plot levers that can be flipped.

**Demonstrated by.** The Wizarding World runs both simultaneously: a set of three objects everyone has heard of as a children's fairy tale (and therefore nobody hunts), against a soul-object so obscure a single library book had to be removed to suppress it ([`../research/harry-potter-fantastic-beasts.md`](../research/harry-potter-fantastic-beasts.md)). Marvel's stone-set is the opposite extreme: universally known, universally hunted, and the story is a logistics race.

**Design rule.** Decide the status before the design, and write the *reversal* into the ledger: the day the fairy tale is believed, or the day the secret is printed. An artifact whose fame never changes is scenery.

### P7 — The Wrong Method of Destruction

**Mechanism.** The obvious unmaking fails for a stated reason, and the real one is a journey rather than a purchase.

**Demonstrated by.** The Ring and the one forge that can take it. The soul-objects that shrug off ordinary damage and require two specific and terrible agents. Elder Scrolls' prophecy-scrolls, which by doctrine cannot be destroyed at all — an unmaking that is *refused* rather than merely difficult.

**Design rule.** The unmaking cost should mirror the making cost, in kind. If it was made by a vow, it unmakes by a vow. If it was made by a theft, it unmakes by restitution. And state the failed method explicitly in canon — "they tried the obvious thing; here is the record of what happened" is worth more than three paragraphs of mystique.

### P8 — The Set That Implies a Total

**Mechanism.** A counted set installs a countdown in the reader's head for free, and a completion state that the author must specify and then usually refuse.

**Demonstrated by.** Marvel's six-stone arithmetic, the three jewels of Tolkien's First Age, the three-object fairy tale of the Wizarding World. Arcanea already has one: Tier 7's Luminarch, "the Divine Alloy… theoretical. No one since the Eldrians has achieved stable nine-frequency fusion."

**Design rule.** Cap the set on the day you mint it and never add a member later — a growing set is the purest form of power creep. Specify what completion does, specify who has attempted it, and decide whether completion is *possible* or *definitionally refused*. Arcanea's Luminarch is currently the second kind, which is the stronger kind. Keep it there.

### P9 — The Object as Someone

**Mechanism.** The item has a will, which means it has a want and a grievance — and it must sometimes be right.

**Demonstrated by.** Warcraft's soul-devouring runeblade, which is a character with a strategy. Final Fantasy XVI's Eikons, which live inside people and slowly petrify them, making every clash "also two people" ([`../research/final-fantasy.md`](../research/final-fantasy.md) §Summons). Arcanea's Kurusei Iron, which "wants."

**Design rule.** An object that only tempts is a device. Give it one piece of advice that is *correct*, ideally advice the protagonist's allies were too polite to give. Then the refusal costs something. And note the failure mode: an artifact with a will is a character, so it must obey the faction-heterogeneity rule — it should want inconsistent things, the way people do.

### P10 — The Externalized Self

**Mechanism.** Power stored outside the body buys reach and installs a fatal dependency: the owner becomes locatable and destructible.

**Demonstrated by.** Sauron pouring native strength into a ring and thereby becoming a thing that can be unmade ([`../research/tolkien-middle-earth.md`](../research/tolkien-middle-earth.md)). The Wizarding World's soul-splitting, which is the same trade with the price restructured as murder and disfigurement.

**Design rule.** Name what was externalized — a memory, a capacity, a vow, a specific relationship — and make its absence visible in the person, not just in the ledger. A character who put his patience in a box should be visibly impatient in a scene before anyone explains why.

### P11 — The Object Nobody Agrees About

**Mechanism.** Three or more factions hold mutually incompatible, individually defensible positions on the same item, and none of them is authorial.

**Demonstrated by.** Elder Scrolls' prince-gifted artifacts, which arrive with a sphere-contract and a theological problem attached ([`../research/elder-scrolls.md`](../research/elder-scrolls.md) §Naming & Language, on sphere-sentences as writer-facing API contracts). Any in-world text in that corpus, where "contradictions between sources are canon features" ([`../BEST_PRACTICES.md`](../BEST_PRACTICES.md) §I).

**Design rule.** Ship every major artifact with three sourced opinions from named institutions, all defensible, none marked true. TASTE's tidy-answer refusal applies verbatim: if the theologians agree in one paragraph, rewrite until they don't ([`../TASTE.md`](../TASTE.md)).

### P12 — The Artifact as Rung, Not Reward

**Mechanism.** The item is a step on a visible dependency chain — acquisition unlocks the *next named goal*, not a numeric increase.

**Demonstrated by.** The civilization-reboot roadmap engine, where every intermediate is legible as progress toward an announced payoff ([`../BEST_PRACTICES.md`](../BEST_PRACTICES.md) §II). Warcraft's relic-as-class-story spine does the reward version; the roadmap version is stronger for prose.

**Design rule.** Before minting, answer in one line: *what does this make possible that the world has already named as impossible?* If the answer is "the same thing, but more," it is a stat block. Arcanea has this pattern in-world already — Verithal's Waystones make every intermediate rung readable ([`../../../.arcanea/lore/KINGDOM_OF_PROOF.md`](../../../.arcanea/lore/KINGDOM_OF_PROOF.md)).

### P13 — The Competent Refusal

**Mechanism.** The strongest evidence for an artifact's danger is a person who could take it, understands it, and does not — for a reason the reader finds correct.

**Demonstrated by.** Gandalf's refusal, which the Tolkien knowledgebase identifies as "the system's real spec sheet" — the audience calibrates power by what characters *dare not do*. Arcanea has the shape already in the Unmarred's Quieting Vow and the Grey Bench's earned right to ask ([`../../../.arcanea/lore/THE_UNMARRED.md`](../../../.arcanea/lore/THE_UNMARRED.md)).

**Design rule.** Every artifact ships with one named refuser and their stated reason. If you cannot write a competent person declining it, the artifact has no cost — go back to P4.

---

## 2. The minting checklist

Answer all of these *before* the artifact exists. An entry that cannot answer them is not staged; it is a wish.

| # | Question | Failure if unanswered |
|---|---|---|
| 1 | **What does it cost, and who paid it by name?** | Free power; P4 violated; TASTE stakes test fails |
| 2 | **Who wants it, and what would they do with it that they cannot do now?** | The object has no gravity; nothing moves toward it |
| 3 | **Who refuses it, and is their reason correct?** | No calibration; the reader can't feel the danger (P13) |
| 4 | **What does it do to the bearer over ten years?** | Corruption or blessing becomes an event instead of an arc (P2) |
| 5 | **Why hasn't it already solved everything?** | The world's unsolved problems become author negligence |
| 6 | **What would it take to unmake it, and what obvious method has already failed?** | Anticlimactic destruction; no journey (P7) |
| 7 | **Whose fingerprints are on it?** — maker, three carriers, one loss, one open question | A property list, not an artifact (P5) |
| 8 | **What is its public epistemic status, and what event flips it?** | Static fame; no lever (P6) |
| 9 | **Which three institutions disagree about it, and why is each right?** | The tidy answer (P11) |
| 10 | **Where does it sit on the Arc?** — Potential / Manifestation / Experience / Dissolution / Evolved Potential | It floats outside Arcanea's own metaphysics (§3) |
| 11 | **Is it a member of a counted set? If so, is the set capped in writing?** | Power creep by accretion (P8) |
| 12 | **Does its name pass the Naming Registry coining procedure with an etymology note?** | Register drift; the G-test fails ([`../../../.arcanea/lore/NAMING_REGISTRY.md`](../../../.arcanea/lore/NAMING_REGISTRY.md) §7) |

**The delivery form.** Per the fragment method, an artifact does not ship as an essay. It ships as three-to-five short fragments with *different biased narrators*: a Prover's inventory line, an Academy catalogue entry, a Warden's objection, a song verse that gets a detail wrong. The vault holds the reconciled truth; the Library never does ([`../SYSTEM.md`](../SYSTEM.md), [`../BEST_PRACTICES.md`](../BEST_PRACTICES.md) §III.2–3).

---

## 3. Binding to Arcanea's locked systems

Nothing here alters locked canon. These are the joints where artifact design attaches to what is already true.

**The Five Elements → the substrate is already built.** Locked-file Tier 7 gives nine Vael Crystals, five Luminor Metals, and three Nero Shards with properties, temperaments, and a meteoritics grounding. Artifact design does not need new materials. It needs *objects made from these materials with histories attached* — the Tier 7 table is a periodic table, and Arcanea has not yet forged anything from it that anyone has lost.

**The Ten Gates and their frequencies → the artifact's tuning.** Every Arcanean artifact should carry one of three frequency stances: **tuned** (resonates at one Gate's frequency; behaves predictably; can be attested), **alloyed** (two or more frequencies interfering — the Luminor Metals pattern, unstable by design), or **dissonant** (Hollow Frequency; a Nero Shard object). This gives artifacts a machine-checkable field that is already canonical, and it means an artifact can be *misidentified* — a plot engine, since attestation is an Academy service and Academy services can be bought.

**Godbeasts → P9's ceiling, and its limit.** A Godbeast is a bonded companion, not an object, and must stay that way; the FF16 lesson is that the *bond* is where the drama lives, not the transformation. The usable transfer is narrower and better: objects that were once *near* a Godbeast carry its temperament — a Bonded's lost instrument, a scale, a stirrup. Frequency without will. This keeps P9 available at artifact scale without demoting the Ten.

**The Binding-Vow proposal (SYNTHESIS U3) → the sharpest available mechanism.** If ranks measure accumulated binding rather than raw power, then the natural Arcanean artifact is **a vow made external**. Two consequences fall out immediately. First, an object that *carries* a vow is a receipt, and receipts can be read, forged, and inherited — which is P1, P6, and P10 at once, from Arcanea's own primitives rather than anyone else's. Second, an object that swears *on your behalf* is cheap power, and the cheapness is the corruption — P2 re-derived natively, with no imported cost-law. Implementation constraint: the naming warning in [`../research/SYNTHESIS.md`](../research/SYNTHESIS.md) §U3 applies with full force here (see §5).

**Shadow-as-corrupted-Void → the ending no benchmark offers.** Locked truth: Nero is not evil; Shadow is Void without Spirit. Therefore **no Arcanean artifact is evil** — a corrupted artifact is a *wounded* one, and the distinctly Arcanean resolution is not destruction but Void-restoration (SYNTHESIS §U7c). Every benchmark franchise ends its artifact arcs by unmaking the thing. Arcanea can end one by *healing* it, and that is a genuine structural differentiator, not a reskin. It also means P7 has a second branch: the wrong method of destruction may fail because destruction was the wrong verb.

**The Arc → the position field.** Potential → Manifestation → Experience → Dissolution → Evolved Potential. Every artifact has an Arc position, and the dangerous artifacts are the ones *resisting Dissolution* — objects that will not let their era end. That single sentence gives Arcanea a native theory of cursed objects with no borrowed brick in it. Malachar's whole architecture is the same refusal at person-scale.

### The proposed slots (STAGING ⏳ — slots, not designs)

Five holes the canon is already implying. Each is a one-paragraph seed. **None is named**: names require the Naming Registry coining procedure with an etymology note and a `/lock-decision`, and coining them here would front-run that gate.

**S1 — The Tenth Crystal That Does Not Exist.** Tier 7 lists nine Vael Crystals for ten Gates. Shinkami and the Source Gate have none, and Luminarch is defined as fusion of "all nine" — a count held consistently across [`FACTIONS.md`](../../../.arcanea/lore/FACTIONS.md), [`STELLARIS.md`](../../../.arcanea/lore/STELLARIS.md), and [`STARLIGHT_CORPS_CODEX.md`](../../../.arcanea/lore/STARLIGHT_CORPS_CODEX.md), which suggests the hole is structural rather than clerical. It should be minted as the best-shaped absence in the canon: a *named* one that every material scholar in Arcanea knows should be there. Malachar's fall was an attempt at forced fusion with the Source Gate; the obvious in-world reading is that a Source crystal is what he was trying to make. The second reading is that the Source refuses to condense, because meta-consciousness cannot be held. Do not answer which. Ship three institutional positions and put the question on the permanent-mystery column of the ledger, never the promised column ([`../SYSTEM.md`](../SYSTEM.md) §7). *Accepted cost*: filing S1 as a permanent mystery forecloses ever shipping a Source crystal, in any era, forever. That is the price of the pattern and the reason this slot in particular is a Creator decision rather than an agent's.

**S2 — Ivo Solvane's First Waystone.** Already called "Verithal's holiest object" in [`../../../.arcanea/lore/KINGDOM_OF_PROOF.md`](../../../.arcanea/lore/KINGDOM_OF_PROOF.md), and already an artifact in every respect except that nobody has written it as one. It is the anti-relic: it has no arcane property at all, its power is that it is *readable*, and it would function identically as a copy. That is the drama the slot exists to raise — someone will copy it, correctly, for good reasons, and the March will have to decide whether a relic that can be perfectly reproduced is still a relic. The Unmarred approve of it, which embarrasses them. The Academy has no category for it, which embarrasses the Academy. P5, P11, and P12 with zero imported machinery.

**S3 — The Threshold Receipt.** The vow-object implied by U3. When a Gate is opened with a vow sworn and a Guardian witnessing, something remains at the threshold that records the binding. Not a power source — an attestation. The consequences write themselves and all of them are Arcanean: receipts can be read (a privacy crisis), forged (the Registry already sanctions pretenders as a story engine, `NAMING_REGISTRY.md` §5), and inherited (carrying a binding someone else swore). And the Gate-Touched, who opened Gates with no vow sworn at all, hold *nothing* — which converts the Registry debate from an argument about identity into an argument about a physical object that some people cannot produce. That is an institution-shaped crisis, and it is entirely ours.

**S4 — A Thessara Salvage.** The Drowned Academy implies drowned things ([`../../../.arcanea/lore/THESSARA.md`](../../../.arcanea/lore/THESSARA.md)). The useful slot is not a powerful recovery but a *contested* one: an object whose function nobody disputes and whose ownership two civilizations both claim in good faith — Verithal by descent through Ivo, the Academy by antiquity. Pure P5. The whole artifact is its chain of custody, and the chain has a four-century gap at the bottom of the sea that both parties fill differently. Resolution should be a concession, not a verdict.

**S5 — The Gauge.** Arc 4 establishes that the Shadowfen seal runs on collective belief, and that its frequency signature "correlates precisely with public trust surveys conducted by the Athenaeum" ([`../../../.arcanea/lore/STORY_ENGINE.md`](../../../.arcanea/lore/STORY_ENGINE.md), Arc 4). Then an instrument exists that reads the seal's health, and whoever holds it holds the most dangerous number in Arcanea — because publishing the number *lowers it*. A measuring device as a strategic weapon, with a built-in observer effect that is a direct consequence of locked canon rather than an invention. Every faction's correct move is different and every one of them is defensible: the Corps classifies it, the Underground publishes it, Verithal wants to check the arithmetic, and Selvyn Ashvale would be right to want it and wrong to get it.

---

## 4. Anti-patterns

Reject on sight. These are the artifact-specific extensions of the TASTE refusal list.

- **Stat block with lore pasted on.** Properties first, history bolted after. Diagnostic: delete the effect line — is anything left? (P5)
- **The protagonist-proofing artifact.** An item that makes the bearer unbeatable ends the story on acquisition. Every acquisition must *narrow* options as much as it widens them.
- **The ancient evil with no specific history.** "Forged in darkness by an unknown hand in a forgotten age" is the confession that no one did the work. Someone made it, on a specific day, for a specific reason they thought was good.
- **Power creep by escalating relics.** Each Arc's artifact outranking the last is the fastest route to a world where nothing matters. Escalation must be causal and paid for ([`../TASTE.md`](../TASTE.md), refusal list).
- **The artifact nobody has an opinion about.** If no institution has a position, the object does not exist socially, and a legendary object that is not socially real is a prop. (P11)
- **The unnamed invoice.** "It drains life force." From whom? (P4)
- **The obvious destruction.** Throwing it in a fire and having it work is an anticlimax the reader saw coming in chapter two. (P7)
- **Synonym-lore artifacts.** A famous object renamed without re-deriving its mechanism, cost, and consequence from Arcanea's own primitives. This is the single most likely failure mode for artifact work specifically, because artifacts are the most quotable thing the benchmarks own.
- **The growing set.** Adding a tenth member to a set of nine after publication. Cap it at mint. (P8)
- **The artifact that explains the cosmology.** An object whose lore paragraph narrates Lumina and Nero to the reader. Cosmic forces stay off-screen; the Gates are the ceiling of mortal contact (SYNTHESIS §U9d, trap list #1).

---

## 5. IP red lines

Artifacts are the highest-risk category in this entire research program. They are the most *quotable* elements the benchmark franchises own — the objects are what fans name, draw, and litigate. The general doctrine is [`../BEST_PRACTICES.md`](../BEST_PRACTICES.md) §IV: **copy the architecture, never the bricks.** Applied here:

**Never use these names, in canon or product copy.** The One Ring · palantír · Silmaril · Mjolnir · Infinity Stone / Infinity Gauntlet · Horcrux · Deathly Hallows (and Elder Wand, Resurrection Stone, Cloak of Invisibility) · Frostmourne · Ashbringer · Shadowmourne · Elder Scroll (as a term for an object) · any Daedric artifact name · materia · Lifestream · Eikon · Death Note · cursed tool · Binding Vow · Domain Expansion. Note the trap in "Philosopher's Stone": the historical alchemical term is public domain, but pairing it with either franchise's specific mechanism or title context is not — if Arcanea ever needs the concept, derive it from actual alchemical sources and name it in an Arcanean register.

**Never reproduce these mechanic-plus-name pairings.** These are the combinations where a mechanism and a coined term have fused into protected expression:

| Do not build | Because |
|---|---|
| "The wand chooses the wizard" as phrasing, on a wand-shaped focus with wood+core temperaments | Wandlore is the Wizarding World's signature subsystem; P1 is free, that expression is not |
| A hammer with a worthiness inscription | Marvel trade dress; the choosing-object pattern does not require a hammer or an inscription |
| A soul-fragment object created by murder, with a coined term for the class of object | The murder-cost + coined-noun pairing is the protected part |
| A six-item set granting six domains, completed by a wearable | Marvel's specific arithmetic and completion device |
| A sword that devours souls and raises the slain as the wielder's servants | Warcraft's runeblade, beat for beat |
| A rulebook-object whose clauses are printed for the reader, owned by a stalking non-human previous owner | The clause-object premise is free; that owner-and-stalker configuration is the expression |
| Class-specific artifact weapons with per-class unlock quests and progression trees | Warcraft's Legion artifact system as a system shape |

**Never build these 1:1 structural mappings**, even fully renamed. Three legendary objects from a children's fairy tale whose combined possession masters death. Nine rings distributed to nine kings, mastered by one. A single indestructible object destroyable only at the site of its forging. A seeing-stone network of exactly seven, with a corrupted master node. These are recognizable *structures*, and the serial-number-filed-off version reads as exactly what it is — the "synonym-lore" refusal in [`../TASTE.md`](../TASTE.md), applied to plot geometry rather than to a single noun.

**Free to use** (ideas, methods, and pre-modern commons): objects that choose their bearers (the sword-in-the-stone is centuries older than any franchise here); cursed regalia; unbreakable objects; oath-objects and contract-demon bargains; soul-cost economies (folkloric); counted sets; inherited weapons with genealogies; chain-of-custody item descriptions as a delivery grammar; item text as biased primary source; sphere-sentences as writer-facing constraints; relics whose fame is itself a defense. All of these are unprotectable ideas or predate every source in this file.

**Live risks specific to Arcanea's current canon:**

1. **Vael Crystal set completion.** Nine crystals plus a theoretical fusion is fine and well-differentiated. It must never acquire a *wearable completion device* — that is the specific Marvel expression. Luminarch stays an alloy, not a socket.
2. **Kurusei Iron.** It currently whispers and wants, which is folkloric and safe. It must never acquire soul-consumption plus undead-servitude; that combination is Warcraft's.
3. **The vow-object (S3).** The `Binding Vow` term is a brick, not architecture, and the SYNTHESIS §U3 note already flags this as the slate's closest single-source adjacency. The object must be named through the Naming Registry coining procedure, and its Arcanean divergences must be kept load-bearing: witnessed by a Guardian as a relationship act, ranks measuring accumulated binding, and the receipt-and-inheritance layer — none of which the source has.
4. **Marketing.** Nominative fair use permits research documents like this one to name franchises. Product copy, in-world text, and Library fragments never do. Homage budget in canon is zero ([`../research/anime-modern-worlds.md`](../research/anime-modern-worlds.md) §IP Red Lines).

**The two-step test before shipping any artifact.** (1) Would a fan of a source franchise recognize the *specific expression*? (2) Does the element survive renaming into pure mechanism — that is, is it still interesting when you strip the name off? Ship only what passes both.

---

## Cross-references

- Research knowledgebases: [`../research/`](../research/) — the seven per-world files this document re-cuts
- Capstone and upgrade slate: [`../research/SYNTHESIS.md`](../research/SYNTHESIS.md) (U3 vows, U7 villain doctrine, U9d off-screen forces, trap list)
- Method and IP doctrine: [`../BEST_PRACTICES.md`](../BEST_PRACTICES.md) · Judgment: [`../TASTE.md`](../TASTE.md) · Architecture: [`../SYSTEM.md`](../SYSTEM.md) · Execution: [`../SKILL.md`](../SKILL.md)
- Canon vault (read-only): [`../../../.arcanea/lore/CANON_LOCKED.md`](../../../.arcanea/lore/CANON_LOCKED.md) Tier 7 (materials) · [`MAGIC_SYSTEM.md`](../../../.arcanea/lore/MAGIC_SYSTEM.md) · [`NAMING_REGISTRY.md`](../../../.arcanea/lore/NAMING_REGISTRY.md) · [`STORY_ENGINE.md`](../../../.arcanea/lore/STORY_ENGINE.md) · [`FACTIONS.md`](../../../.arcanea/lore/FACTIONS.md) · [`VISUAL_DOCTRINE.md`](../../../.arcanea/lore/VISUAL_DOCTRINE.md)
- Staged neighbours the slots touch: [`KINGDOM_OF_PROOF.md`](../../../.arcanea/lore/KINGDOM_OF_PROOF.md) · [`THE_UNMARRED.md`](../../../.arcanea/lore/THE_UNMARRED.md) · [`ARBOR_OF_FIRST_LIGHT.md`](../../../.arcanea/lore/ARBOR_OF_FIRST_LIGHT.md) · [`THESSARA.md`](../../../.arcanea/lore/THESSARA.md)

---

## STAGING LOG

| Date | Entry | Status |
|------|-------|--------|
| 2026-08-08 | Artifact craft patterns re-cut from the seven research knowledgebases: 13 transferable patterns, 12-question minting checklist, Arcanea binding notes (Elements / Gates / Godbeasts / U3 vows / Shadow-as-corrupted-Void / the Arc), 5 proposed artifact slots (S1–S5, unnamed by design), 10 anti-patterns, artifact-specific IP red lines | ⏳ STAGING |
| 2026-08-08 | Canon observation raised, not resolved: Tier 7 lists nine Vael Crystals for ten Gates — Shinkami / the Source Gate has none, and Luminarch is defined as "all nine," a count held consistently across `FACTIONS.md`, `STELLARIS.md`, `STARLIGHT_CORPS_CODEX.md`. Proposed as a named absence (S1), not filled. Requires `/lock-decision` | ⏳ STAGING |
| 2026-08-08 | Review fix (canon-lawyer pass): §0 originally claimed Arcanea had almost no artifacts. Corrected — `FACTIONS.md` establishes "Luminarch-grade artifacts from the Eldrian era" (Celestial-wielded, Architect-sought in the Nexus Vaults) and `STARLIGHT_CORPS_CODEX.md` carries a fully-built one in the Stellarch's twelve-point sigil. The real gap is volume and chain-of-custody, not category | ⏳ STAGING |
| 2026-08-08 | Known weak dimensions at staging: **naming** (unscorable — S1–S5 are deliberately unnamed pending `NAMING_REGISTRY.md` §7 + `/lock-decision`) and **cost** (this is a method document; the priced-object rule P4 is stated, not demonstrated on the page). Both are expected for a pattern library and are discharged when a slot is designed | ⏳ STAGING |

---

*Compiled for the Arcanea Worldbuilding OS. Architecture, never bricks.*
