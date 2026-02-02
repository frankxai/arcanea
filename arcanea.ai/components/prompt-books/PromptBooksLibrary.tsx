/**
 * Arcanea Prompt Books - Web Interface
 * 
 * React component for managing .arc files, spells, characters, and worlds
 * Integration with Arcanea AI systems and Guardian agents
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Users, Globe, Sparkles, Plus, Filter, Play, Edit, Trash2, Download, Upload, Eye, Zap, Crown, Flame, Droplet, Mountain, Wind, Circle } from 'lucide-react';

// Types for Arcanea system
interface ArcaneaSpell {
  id: string;
  name: string;
  description: string;
  archetypes: string[];
  parameters: Record<string, any>;
  implementation: string;
  category: 'story' | 'character' | 'world' | 'system';
  guardian?: string;
  lastUsed?: string;
}

interface ArcaneaCharacter {
  id: string;
  name: string;
  archetype: string;
  elementalAlignment: string[];
  data: Record<string, any>;
  backstory: string;
  aiGenerated?: {
    portrait?: string;
    voiceProfile?: string;
    personalityAnalysis?: string;
  };
}

interface ArcaneaWorld {
  id: string;
  name: string;
  cosmology: Record<string, any>;
  geography: Record<string, any>;
  cultures: any[];
  history: any[];
  aiGenerated?: {
    mapVisualization?: string;
    cultureDetails?: string;
    magicalSystems?: string;
  };
}

interface Guardian {
  id: string;
  name: string;
  element: string;
  frequency: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const GUARDIANS: Guardian[] = [
  { id: 'draconia', name: 'Draconia', element: 'fire', frequency: 528, color: 'bg-red-500', icon: Flame },
  { id: 'leylya', name: 'Leylya', element: 'water', frequency: 639, color: 'bg-blue-500', icon: Droplet },
  { id: 'lyssandria', name: 'Lyssandria', element: 'earth', frequency: 396, color: 'bg-green-500', icon: Mountain },
  { id: 'alera', name: 'Alera', element: 'air', frequency: 417, color: 'bg-yellow-500', icon: Wind },
  { id: 'elara', name: 'Elara', element: 'void', frequency: 963, color: 'bg-purple-500', icon: Circle }
];

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  water: 'from-blue-500 to-cyan-500', 
  earth: 'from-green-500 to-emerald-500',
  air: 'from-yellow-500 to-amber-500',
  void: 'from-purple-500 to-pink-500'
};

export default function PromptBooksLibrary() {
  const [activeTab, setActiveTab] = useState<'spells' | 'characters' | 'worlds'>('spells');
  const [spells, setSpells] = useState<ArcaneaSpell[]>([]);
  const [characters, setCharacters] = useState<ArcaneaCharacter[]>([]);
  const [worlds, setWorlds] = useState<ArcaneaWorld[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuardian, setSelectedGuardian] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [castingSpell, setCastingSpell] = useState<string | null>(null);

  // Load sample data
  useEffect(() => {
    loadSampleData();
  }, []);

  const loadSampleData = async () => {
    setIsLoading(true);
    
    // Sample spells
    const sampleSpells: ArcaneaSpell[] = [
      {
        id: '1',
        name: 'character_motivation',
        description: 'Generate character-specific motivation and inner conflict',
        archetypes: ['fire', 'air', 'transformation'],
        parameters: {
          character: 'string',
          situation: 'string',
          emotional_state: ['determined', 'conflicted', 'hopeful', 'desperate']
        },
        implementation: `As \${character} faces \${situation}, their storm-seeker nature emerges with \${emotional_state} intensity.

**Inner Conflict:** The desire for truth wars against fear of what truth might bring.

**Motivation:**
- Primary: Deep-seated need to uncover the mystery
- Secondary: Protect those they care about
- Hidden: Find redemption for past failures`,
        category: 'character',
        guardian: 'draconia',
        lastUsed: new Date().toISOString()
      },
      {
        id: '2', 
        name: 'world_culture_generator',
        description: 'Generate detailed cultural systems for fantasy worlds',
        archetypes: ['earth', 'water', 'community'],
        parameters: {
          world_name: 'string',
          base_elements: ['fire', 'water', 'earth', 'air', 'void'],
          complexity_level: ['simple', 'moderate', 'complex'],
          focus_area: ['social_structure', 'beliefs', 'customs', 'technology']
        },
        implementation: `Generate culture for \${world_name} based on \${base_elements} elements.

**Social Structure:**
- Leadership model and hierarchy
- Family and community organization
- Economic systems and trade

**Belief Systems:**
- Core religious or philosophical beliefs
- Rituals and ceremonies
- Myths and creation stories

**Customs & Traditions:**
- Daily life practices
- Coming of age ceremonies
- Art and expression forms`,
        category: 'world',
        guardian: 'leylya',
        lastUsed: new Date().toISOString()
      }
    ];

    // Sample characters
    const sampleCharacters: ArcaneaCharacter[] = [
      {
        id: '1',
        name: 'Kira Vance',
        archetype: 'storm-seeker',
        elementalAlignment: ['fire', 'air'],
        data: {
          role: 'Rogue Cloud Harvester',
          traits: ['cybernetic_arm', 'trust_issues', 'photographic_memory'],
          age: 28,
          homeworld: 'Venus Floating Cities'
        },
        backstory: 'Born in floating cities above Venus, Kira learned to navigate storms where others saw only chaos...',
        aiGenerated: {
          portrait: '/api/placeholder-image/400/600',
          voiceProfile: 'Sarcastic but determined tone, medium pitch with slight cybernetic distortion',
          personalityAnalysis: 'Complex individual seeking truth while battling inner demons'
        }
      }
    ];

    // Sample worlds
    const sampleWorlds: ArcaneaWorld[] = [
      {
        id: '1',
        name: 'Venus Floating Cities',
        cosmology: {
          primary_elements: ['air', 'fire'],
          governance: 'AI_Administration_Council',
          energy_source: 'Cloud_Plasma_Harvesting'
        },
        geography: {
          continents: ['Aeris_Plateau', 'Tempest_Zone'],
          magical_regions: ['Plasma_Storms', 'Whisper_Clouds']
        },
        cultures: [],
        history: [],
        aiGenerated: {
          mapVisualization: '/api/placeholder-image/800/600',
          cultureDetails: 'Advanced cybernetic society with complex social hierarchies'
        }
      }
    ];

    setSpells(sampleSpells);
    setCharacters(sampleCharacters);
    setWorlds(sampleWorlds);
    setIsLoading(false);
  };

  const castSpell = async (spell: ArcaneaSpell, parameters: Record<string, any>) => {
    setCastingSpell(spell.id);
    
    // Simulate AI casting
    setTimeout(() => {
      const result = spell.implementation.replace(/\$\{(\w+)\}/g, (match, key) => {
        return parameters[key] || match;
      });
      
      alert(`Spell "${spell.name}" cast successfully!\n\nResult:\n${result}`);
      setCastingSpell(null);
    }, 2000);
  };

  const filteredSpells = spells.filter(spell => {
    const matchesSearch = spell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spell.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGuardian = !selectedGuardian || spell.guardian === selectedGuardian;
    return matchesSearch && matchesGuardian;
  });

  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWorlds = worlds.filter(world => 
    world.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGuardianById = (id: string) => GUARDIANS.find(g => g.id === id);

  const getElementalGradient = (elements: string[]) => {
    if (elements.length === 0) return 'from-gray-500 to-gray-600';
    if (elements.length === 1) return ELEMENT_COLORS[elements[0] as keyof typeof ELEMENT_COLORS];
    // For multiple elements, create a gradient based on the first element
    return ELEMENT_COLORS[elements[0] as keyof typeof ELEMENT_COLORS];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              🔮 Arcanea Prompt Books
            </h1>
            <p className="text-gray-300 text-lg">
              Master the arcane arts of character creation, world building, and spell casting
            </p>
          </div>
        </motion.div>

        {/* Guardian Selection */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Guardian Guidance</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {GUARDIANS.map((guardian) => (
                <motion.button
                  key={guardian.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGuardian(selectedGuardian === guardian.id ? '' : guardian.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedGuardian === guardian.id 
                      ? `${guardian.color} border-white shadow-lg` 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <guardian.icon className={`w-6 h-6 mx-auto mb-1 ${
                    selectedGuardian === guardian.id ? 'text-white' : 'text-gray-400'
                  }`} />
                  <div className="text-xs font-medium text-white">{guardian.name}</div>
                  <div className="text-xs text-gray-300">{guardian.element}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search spells, characters, or worlds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create New
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-2 border border-slate-700">
            <div className="flex gap-2">
              {[
                { id: 'spells', label: 'Spell Library', icon: Sparkles },
                { id: 'characters', label: 'CharacterBook', icon: Users },
                { id: 'worlds', label: 'World Builder', icon: Globe }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'spells' && (
            <motion.div
              key="spells"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSpells.map((spell, index) => {
                const guardian = getGuardianById(spell.guardian || '');
                const GuardianIcon = guardian?.icon || Sparkles;
                
                return (
                  <motion.div
                    key={spell.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{spell.name}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{spell.description}</p>
                      </div>
                      {guardian && (
                        <div className={`ml-3 p-2 rounded-lg ${guardian.color}`}>
                          <GuardianIcon className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {spell.archetypes.map((archetype) => (
                          <span
                            key={archetype}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                          >
                            {archetype}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        Category: {spell.category} • Last used: {new Date(spell.lastUsed || '').toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => castSpell(spell, {})}
                        disabled={castingSpell === spell.id}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {castingSpell === spell.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Casting...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            Cast Spell
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'characters' && (
            <motion.div
              key="characters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCharacters.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all"
                >
                  {character.aiGenerated?.portrait && (
                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <img 
                        src={character.aiGenerated.portrait} 
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getElementalGradient(character.elementalAlignment)} flex items-center justify-center`}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{character.name}</h3>
                        <p className="text-sm text-gray-400">{character.archetype}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {character.elementalAlignment.map((element) => (
                          <span
                            key={element}
                            className={`px-2 py-1 bg-gradient-to-r ${ELEMENT_COLORS[element as keyof typeof ELEMENT_COLORS]} text-white text-xs rounded-full`}
                          >
                            {element}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-300 line-clamp-2">
                        {character.backstory}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition-colors"
                      >
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'worlds' && (
            <motion.div
              key="worlds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredWorlds.map((world, index) => (
                <motion.div
                  key={world.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all"
                >
                  {world.aiGenerated?.mapVisualization && (
                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <img 
                        src={world.aiGenerated.mapVisualization} 
                        alt={world.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{world.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-300">
                        <span className="text-purple-400">Elements:</span> {world.cosmology.primary_elements?.join(', ')}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="text-purple-400">Governance:</span> {world.cosmology.governance}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="text-purple-400">Energy:</span> {world.cosmology.energy_source}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition-colors"
                      >
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit World
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-300">Loading Arcanea Library...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}