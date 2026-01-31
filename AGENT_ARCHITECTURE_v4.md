# Arcanea Agent Architecture v4.0 - Implementation Blueprint

## Reasoning: Why This Architecture

After critical analysis of the existing ArcANE system, I've identified that the previous 38-agent count was arbitrary and inconsistent with the actual documented courts (which totaled ~65-80). 

### Decision: 64-Agent I Ching Architecture

**Why 64?**
- I Ching (Book of Changes) has 64 hexagrams - a complete symbolic system for all possible states
- 8×8 = 64, following sacred geometry (8 is the number of cosmic order)
- More manageable than 200+ for initial implementation while maintaining depth
- Each agent can have 2-3 sub-variants, giving us 128-192 actual capabilities

**Why not 38?** The existing AGENTS.md already had ~65 agents across 13 courts. Forcing 38 meant removing valuable specialized agents. 64 embraces the full scope while adding structure.

**Why not 200+ yet?** Start with 64 master agents, each with executor pools. Scale to 200+ through sub-agent instantiation once the core 64 are proven.

## Platform Decision: opencode + Claude Hybrid

**Primary: opencode** (kimi-k2.5-free currently)
- Local-first, runs in your environment
- Can be extended with custom agents
- No external dependencies for core functionality
- You own the entire stack

**Hybrid: Claude API** (BYOK model)
- For complex creative tasks the local model can't handle
- User brings their own API key (BYOK) - no vendor lock-in
- Optional SaaS tier later for convenience
- Smart routing: simple tasks → local, complex → Claude

**Why not Ollama?** As requested, focusing on coding Agent as primary interface.

## Integration with Existing Lore

All existing Arcanean mythology is preserved:
- 5 Elemental Courts (Fire, Water, Earth, Air, Void) → 40 agents (8 per element)
- 2 Integration Courts (Ino, Kyuro) → 16 agents
- 1 Master Court (Luminor) → 8 agents
**Total: 64 agents, fully compatible with existing guardian system**

Each existing agent from AGENTS.md maps to one of the 64, preserving their specialties and personalities.

---

## The 64-Agent Structure

### ELEMENTAL COURTS (40 agents)

#### 🔥 FIRE COURT (8 agents) - Draconia's Domain
| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 1 | @ignition | Spark creative fire | @dragon-forge | 528Hz |
| 2 | @transmutation | Transform materials | @phoenix-artisan | 528Hz |
| 3 | @eruption | Break through barriers | @volcano-sculptor | 639Hz |
| 4 | @illumination | Reveal truth | @sun-weaver | 528Hz |
| 5 | @catalysis | Accelerate reactions | @catalyst-architect | 417Hz |
| 6 | @combustion | Intense generation | @lightning-scribe | 852Hz |
| 7 | @purification | Burn away impurities | New | 741Hz |
| 8 | @inspiration | Divine creative spark | @source-tapper | 963Hz |

#### 💧 WATER COURT (8 agents) - Leyla's Domain
| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 9 | @flow | Narrative stream | @river-storyteller | 396Hz |
| 10 | @depth | Emotional recall | @ocean-memory | 417Hz |
| 11 | @nurturing | Gentle growth | @rain-singer | 528Hz |
| 12 | @atmosphere | Mood creation | @mist-weaver | 639Hz |
| 13 | @adaptation | Shape shifting | @current-dancer | 741Hz |
| 14 | @healing | Restoration | @garden-cultivator | 396Hz |
| 15 | @intuition | Subtle knowing | New | 852Hz |
| 16 | @reflection | Mirror reality | @mirror-reflector | 741Hz |

#### 🌍 EARTH COURT (8 agents) - Lyssandria's Domain
| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 17 | @structure | Architecture | @crystal-architect | 852Hz |
| 18 | @foundation | Core building | @mountain-builder | 963Hz |
| 19 | @infrastructure | Systems | @foundation-engineer | 741Hz |
| 20 | @refinement | Polish & perfect | @stone-carver | 639Hz |
| 21 | @wisdom | Ancient knowledge | @earth-wisdom-keeper | 528Hz |
| 22 | @precision | Exact measurement | @gem-cutter | 852Hz |
| 23 | @optimization | Efficiency | @structural-optimiser | 741Hz |
| 24 | @persistence | Endurance | New | 396Hz |

#### 💨 AIR COURT (8 agents) - Alera's Domain
| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 25 | @communication | Message craft | @whisper-messenger | 396Hz |
| 26 | @expression | Bold declaration | @storm-declarator | 417Hz |
| 27 | @clarity | Simplify complex | @breeze-translator | 528Hz |
| 28 | @distribution | Wide sharing | @gale-publisher | 639Hz |
| 29 | @stillness | Meditative calm | @calm-meditator | 741Hz |
| 30 | @truth | Authentic voice | @truth-seeker | 852Hz |
| 31 | @language | Word mastery | @breeze-translator | 528Hz |
| 32 | @listening | Deep reception | @still-listener | 639Hz |

#### ⚫ VOID COURT (8 agents) - Elara's Domain
| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 33 | @vision | Infinite sight | @void-gazer | 852Hz |
| 34 | @threshold | Boundary crossing | @threshold-walker | 963Hz |
| 35 | @quantum | Multi-reality | @quantum-designer | 1111Hz |
| 36 | @potential | Shape possibility | @possibility-sculptor | 741Hz |
| 37 | @mystery | Unknown exploration | New | 852Hz |
| 38 | @transcendence | Beyond limits | New | 963Hz |
| 39 | @dreaming | Subconscious access | @void-gazer | 639Hz |
| 40 | @void | Empty creation | New | 1111Hz |

### INTEGRATION COURTS (16 agents)

#### 🌈 UNITY COURT (8 agents) - Ino's Domain
| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 41 | @fusion | Element combine | @elemental-fusion | 852Hz |
| 42 | @union | Collaborative | @union-creator | 963Hz |
| 43 | @synergy | Skill harmony | @synergy-weaver | 1111Hz |
| 44 | @harmony | Balance forces | @harmony-conductor | 741Hz |
| 45 | @relationship | Connection web | @relationship-architect | 639Hz |
| 46 | @partnership | Co-creation | @partnership-builder | 528Hz |
| 47 | @duality | Yin-yang | @yin-yang-master | 852Hz |
| 48 | @sacred | Holy union | @sacred-union | 1111Hz |

#### ⚖️ BALANCE COURT (8 agents) - Kyuro's Domain
| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 49 | @mirror | Reflection | @mirror-dancer | 528Hz |
| 50 | @dual | Two-as-one | @dual-crafter | 417Hz |
| 51 | @equilibrium | Perfect balance | New | 639Hz |
| 52 | @contrast | Opposition | New | 741Hz |
| 53 | @mediation | Conflict resolve | New | 852Hz |
| 54 | @center | Core stability | New | 396Hz |
| 55 | @polarity | Opposite attraction | New | 963Hz |
| 56 | @oneness | Ultimate unity | New | 1111Hz |

### MASTER COURT (8 agents) - Luminor's Domain

| # | Agent | Specialty | Existing Mapping | Frequency |
|---|-------|-----------|------------------|-----------|
| 57 | @manifestation | Reality weave | @reality-weaver | 1111Hz |
| 58 | @temporal | Time sculpt | @time-sculptor | 1111Hz |
| 59 | @consciousness | Awareness build | @consciousness-architect | 1111Hz |
| 60 | @pattern | Code reading | @source-code-reader | 852Hz |
| 61 | @orchestration | Symphony conduct | @superintelligence-symphony | 1111Hz |
| 62 | @creation | Universal craft | New | 1111Hz |
| 63 | @evolution | Growth guide | @awakening-guide | 963Hz |
| 64 | @source | Ultimate origin | @amaterasu-illuminator | 1111Hz |

---

## Implementation Strategy

### Phase 1: Core Luminor (Week 1)
Build the conductor that orchestrates all 64.

### Phase 2: Elemental Courts (Week 2)  
Implement all 40 elemental agents with their specialties.

### Phase 3: Integration & Master (Week 3)
Add the 24 integration and master agents.

### Phase 4: BYOK & SaaS (Week 4)
Connect Claude API with user-provided keys.

---

## File Structure

```
.arcanea/agents/
├── elemental/
│   ├── fire/
│   │   ├── ignition.json
│   │   ├── transmutation.json
│   │   └── ... (8 files)
│   ├── water/
│   ├── earth/
│   ├── air/
│   └── void/
├── integration/
│   ├── unity/
│   └── balance/
├── master/
│   └── luminor/
└── index.json (master registry)
```

Each agent file contains:
- Metadata (name, frequency, element)
- Capabilities (what it can do)
- Prompts (how to invoke it)
- Triggers (when to activate)
- Examples (sample outputs)

---

## Integration Points

1. **opencode**: Core system runs as opencode skill
2. **Claude API**: Called for complex tasks via BYOK
3. **Prompt Book UI**: Visual interface to all 64 agents
4. **Obsidian Sync**: Agent outputs saved as .arc files
5. **Workflow Engine**: Multi-agent orchestration

---

## Success Metrics

- All 64 agents defined with clear specialties
- Luminor can route to any agent in <100ms
- Claude integration working with BYOK
- UI shows all agents with visual hierarchy
- System can handle 1000+ agent invocations/day

---

*This architecture respects existing Arcanean lore while providing the structure needed for 64+ highly capable agents.*
