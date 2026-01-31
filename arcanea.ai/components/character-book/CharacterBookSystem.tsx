/**
 * Arcanea CharacterBook System
 * 
 * Advanced character creation and management with Guardian integration
 * Supports AI enhancement, relationship mapping, and story integration
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Plus, Edit, Trash2, Eye, Download, Upload, 
  Sparkles, Users, Link, Brain, Image, Mic, Heart,
  Crown, Flame, Droplet, Mountain, Wind, Circle,
  Save, X, ChevronRight, BookOpen, Settings
} from 'lucide-react';

// Types
interface CharacterRelationship {
  id: string;
  character: string;
  type: 'friend' | 'enemy' | 'family' | 'mentor' | 'rival' | 'ally' | 'love_interest' | 'complex';
  description: string;
  strength: number; // 1-10
}

interface CharacterTrait {
  name: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  impact: 'low' | 'medium' | 'high';
}

interface CharacterArcanea {
  id: string;
  name: string;
  archetype: string;
  elementalAlignment: string[];
  role: string;
  age: number;
  traits: CharacterTrait[];
  backstory: string;
  motivation: string;
  fears: string;
  goals: string[];
  relationships: CharacterRelationship[];
  aiGenerated?: {
    portrait?: string;
    voiceProfile?: {
      pitch: 'low' | 'medium' | 'high';
      tone: string;
      accent?: string;
      speed: 'slow' | 'normal' | 'fast';
    };
    personalityAnalysis?: {
      core_traits: string[];
      emotional_drivers: string[];
      conflict_sources: string[];
      growth_potential: string[];
    };
    story_suggestions?: string[];
  };
  guardian?: string;
  lastModified: string;
}

interface Guardian {
  id: string;
  name: string;
  element: string;
  specialty: string[];
  color: string;
  icon: React.ElementType;
}

const GUARDIANS: Guardian[] = [
  {
    id: 'draconia',
    name: 'Draconia',
    element: 'fire',
    specialty: ['character_transformation', 'creative_breakthroughs', 'artistic_vision'],
    color: 'from-red-500 to-orange-500',
    icon: Flame
  },
  {
    id: 'leylya',
    name: 'Leylya', 
    element: 'water',
    specialty: ['emotional_depth', 'relationship_mapping', 'empathetic_creation'],
    color: 'from-blue-500 to-cyan-500',
    icon: Droplet
  },
  {
    id: 'lyssandria',
    name: 'Lyssandria',
    element: 'earth',
    specialty: ['foundational_traits', 'consistent_backstory', 'structural_development'],
    color: 'from-green-500 to-emerald-500',
    icon: Mountain
  },
  {
    id: 'alera',
    name: 'Alera',
    element: 'air',
    specialty: ['communication_styles', 'expressive_dialogue', 'social_dynamics'],
    color: 'from-yellow-500 to-amber-500',
    icon: Wind
  },
  {
    id: 'elara',
    name: 'Elara',
    element: 'void',
    specialty: ['mysterious_origins', 'innovative_concepts', 'hidden_potential'],
    color: 'from-purple-500 to-pink-500',
    icon: Circle
  }
];

const ARCHETYPES = [
  'storm-seeker', 'crystal-guardian', 'shadow-weaver', 'light-bringer',
  'dream-walker', 'stone-keeper', 'wind-caller', 'flame-dancer',
  'void-touched', 'earth-binder', 'water-singer', 'sky-seer'
];

const CHARACTER_TEMPLATES = {
  'storm-seeker': {
    traits: ['adventurous', 'restless', 'impulsive', 'brave'],
    motivations: ['freedom', 'discovery', 'challenge', 'truth'],
    fears: ['confinement', 'stagnation', 'unknown_truths'],
    elementalAlignment: ['fire', 'air']
  },
  'crystal-guardian': {
    traits: ['protective', 'wise', 'patient', 'stubborn'],
    motivations: ['protection', 'preservation', 'knowledge', 'duty'],
    fears: ['failure_to_protect', 'corruption', 'ignorance'],
    elementalAlignment: ['earth', 'air']
  },
  'shadow-weaver': {
    traits: ['mysterious', 'manipulative', 'charismatic', ' secretive'],
    motivations: ['power', 'knowledge', 'control', 'revenge'],
    fears: ['exposure', 'weakness', 'betrayal'],
    elementalAlignment: ['void', 'water']
  }
};

export default function CharacterBookSystem() {
  const [characters, setCharacters] = useState<CharacterArcanea[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterArcanea | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'characters' | 'relationships' | 'ai-enhancement'>('characters');
  const [isGenerating, setIsGenerating] = useState(false);

  // Load sample data
  useEffect(() => {
    loadSampleCharacters();
  }, []);

  const loadSampleCharacters = () => {
    const sampleCharacters: CharacterArcanea[] = [
      {
        id: '1',
        name: 'Kira Vance',
        archetype: 'storm-seeker',
        elementalAlignment: ['fire', 'air'],
        role: 'Rogue Cloud Harvester',
        age: 28,
        traits: [
          { name: 'Photographic Memory', description: 'Remembers every detail with perfect clarity', type: 'positive', impact: 'high' },
          { name: 'Trust Issues', description: 'Struggles to trust others due to past betrayals', type: 'negative', impact: 'medium' },
          { name: 'Storm Affinity', description: 'Natural connection to weather patterns', type: 'positive', impact: 'high' },
          { name: 'Cybernetic Arm', description: 'Advanced prosthetic that senses electromagnetic fields', type: 'neutral', impact: 'medium' }
        ],
        backstory: 'Born in the floating cities above Venus, Kira learned to navigate plasma storms where others saw only chaos. After losing her right arm in a discharge accident, she replaced it with a cybernetic enhancement that can sense electromagnetic fluctuations in the clouds.',
        motivation: 'Uncover the truth about the mysterious Cloud Collective and find her place in the world.',
        fears: 'That the truth she seeks will destroy everything she cares about.',
        goals: ['Prove the Cloud Collective exists', 'Find redemption for past failures', 'Protect the floating cities'],
        relationships: [
          {
            id: '1',
            character: 'Jaxon',
            type: 'complex',
            description: 'AI City Administrator who may know more than he reveals',
            strength: 7
          },
          {
            id: '2',
            character: 'Elder Mara',
            type: 'mentor',
            description: 'Retired storm seeker who taught Kira everything',
            strength: 9
          }
        ],
        aiGenerated: {
          portrait: '/api/placeholder-image/400/600',
          voiceProfile: {
            pitch: 'medium',
            tone: 'sarcastic but determined',
            accent: 'neutral',
            speed: 'normal'
          },
          personalityAnalysis: {
            core_traits: ['Resilient', 'Intelligent', 'Guarded', 'Curious'],
            emotional_drivers: ['Truth-seeking', 'Protection instincts', 'Need for redemption'],
            conflict_sources: ['Past trauma', 'Trust issues', 'Moral dilemmas'],
            growth_potential: ['Learning to trust', 'Emotional vulnerability', 'Leadership development']
          },
          story_suggestions: [
            'Kira discovers the Cloud Collective is actually benevolent',
            'She must choose between truth and protecting her home',
            'Her cybernetic arm becomes the key to communicating with the Collective'
          ]
        },
        guardian: 'draconia',
        lastModified: new Date().toISOString()
      }
    ];

    setCharacters(sampleCharacters);
  };

  const generateCharacterWithGuardian = async (archetype: string, guardianId: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation with Guardian guidance
    setTimeout(() => {
      const guardian = GUARDIANS.find(g => g.id === guardianId);
      const template = CHARACTER_TEMPLATES[archetype as keyof typeof CHARACTER_TEMPLATES];
      
      if (guardian && template) {
        const newCharacter: CharacterArcanea = {
          id: Date.now().toString(),
          name: `${guardian.name}'s ${archetype.replace('-', ' ')}`,
          archetype,
          elementalAlignment: template.elementalAlignment,
          role: `Guardian-guided ${archetype.replace('-', ' ')}`,
          age: Math.floor(Math.random() * 50) + 18,
          traits: template.traits.map(trait => ({
            name: trait,
            description: `A core ${trait} characteristic enhanced by ${guardian.name}`,
            type: trait.includes('trust') ? 'negative' : 'positive' as const,
            impact: 'high' as const
          })),
          backstory: `Crafted by ${guardian.name}, Guardian of ${guardian.element}, this ${archetype} embodies the essence of ${guardian.specialty.join(', ')}.`,
          motivation: template.motivations[0],
          fears: template.fears[0],
          goals: template.motivations,
          relationships: [],
          aiGenerated: {
            portrait: `/api/placeholder-image/400/600`,
            voiceProfile: {
              pitch: 'medium' as const,
              tone: `Reflects ${guardian.element} elemental influence`,
              speed: 'normal' as const
            },
            personalityAnalysis: {
              core_traits: template.traits,
              emotional_drivers: template.motivations,
              conflict_sources: template.fears,
              growth_potential: [`Mastery of ${guardian.element} elements`, 'Spiritual evolution']
            }
          },
          guardian: guardianId,
          lastModified: new Date().toISOString()
        };

        setCharacters(prev => [...prev, newCharacter]);
        setSelectedCharacter(newCharacter);
      }
      
      setIsGenerating(false);
      setIsCreating(false);
    }, 2000);
  };

  const enhanceCharacterWithAI = async (character: CharacterArcanea) => {
    setIsGenerating(true);
    
    // Simulate AI enhancement
    setTimeout(() => {
      const enhancedCharacter = {
        ...character,
        aiGenerated: {
          ...character.aiGenerated,
          story_suggestions: [
            `${character.name} discovers hidden powers related to ${character.elementalAlignment.join(' and ')}`,
            `A major life choice forces ${character.name} to confront their greatest fear`,
            `${character.name}'s ${character.archetype} nature is tested by an unexpected challenge`,
            `Relationships are strained when ${character.name} must choose between duty and personal desires`
          ]
        },
        lastModified: new Date().toISOString()
      };

      setCharacters(prev => prev.map(c => c.id === character.id ? enhancedCharacter : c));
      setSelectedCharacter(enhancedCharacter);
      setIsGenerating(false);
    }, 1500);
  };

  const getGuardianById = (id: string) => GUARDIANS.find(g => g.id === id);
  const getElementalGradient = (elements: string[]) => {
    if (elements.includes('fire')) return 'from-red-500 to-orange-500';
    if (elements.includes('water')) return 'from-blue-500 to-cyan-500';
    if (elements.includes('earth')) return 'from-green-500 to-emerald-500';
    if (elements.includes('air')) return 'from-yellow-500 to-amber-500';
    if (elements.includes('void')) return 'from-purple-500 to-pink-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            🧙 Arcanea CharacterBook
          </h1>
          <p className="text-gray-300 text-lg">
            Create extraordinary characters with Guardian guidance and AI enhancement
          </p>
        </motion.div>

        {/* Guardian Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Choose Your Guardian Guide</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {GUARDIANS.map((guardian) => {
                const GuardianIcon = guardian.icon;
                return (
                  <motion.button
                    key={guardian.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGuardian(selectedGuardian === guardian.id ? '' : guardian.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedGuardian === guardian.id
                        ? `${guardian.color} border-white shadow-xl transform scale-105`
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <GuardianIcon className={`w-8 h-8 mx-auto mb-2 ${
                      selectedGuardian === guardian.id ? 'text-white' : 'text-gray-400'
                    }`} />
                    <div className="text-sm font-bold text-white">{guardian.name}</div>
                    <div className="text-xs text-gray-300 capitalize">{guardian.element}</div>
                  </motion.button>
                );
              })}
            </div>

            {selectedGuardian && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-700/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">Guardian Specialties</span>
                </div>
                <div className="text-sm text-gray-300">
                  {getGuardianById(selectedGuardian)?.specialty.map(specialty => (
                    <span key={specialty} className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full mr-2 mb-2">
                      {specialty.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Character Creation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-400" />
                Create New Character
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(!isCreating)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                {isCreating ? 'Cancel' : 'Create Character'}
              </motion.button>
            </div>

            <AnimatePresence>
              {isCreating && selectedGuardian && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-600 pt-4 mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Choose Archetype</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {ARCHETYPES.map((archetype) => (
                          <motion.button
                            key={archetype}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => generateCharacterWithGuardian(archetype, selectedGuardian)}
                            disabled={isGenerating}
                            className="p-3 bg-slate-700 border border-slate-600 rounded-lg hover:border-purple-500 transition-all text-sm text-gray-300 hover:text-white disabled:opacity-50"
                          >
                            {archetype.replace('-', ' ')}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {isGenerating && (
                      <div className="text-center py-4">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-gray-300">{getGuardianById(selectedGuardian)?.name} is crafting your character...</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Character List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setSelectedCharacter(character)}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all cursor-pointer"
            >
              {character.aiGenerated?.portrait && (
                <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 relative">
                  <img 
                    src={character.aiGenerated.portrait} 
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                  {character.guardian && (
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                      {React.createElement(getGuardianById(character.guardian)?.icon || Crown, { className: "w-4 h-4 text-white" })}
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getElementalGradient(character.elementalAlignment)} flex items-center justify-center`}>
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{character.name}</h3>
                    <p className="text-sm text-gray-400">{character.archetype} • {character.role}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {character.elementalAlignment.map((element) => (
                      <span
                        key={element}
                        className={`px-2 py-1 bg-gradient-to-r ${getElementalGradient([element])} text-white text-xs rounded-full`}
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-300 line-clamp-2 mb-2">
                    {character.backstory}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {character.age} years • {character.traits.length} traits
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      enhanceCharacterWithAI(character);
                    }}
                    disabled={isGenerating}
                    className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-1" />
                        AI Enhance
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // View character details
                    }}
                    className="px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Character Detail Modal */}
        <AnimatePresence>
          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCharacter(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Left Column - Portrait and Basic Info */}
                  <div className="p-6 border-r border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">{selectedCharacter.name}</h2>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedCharacter(null)}
                        className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </motion.button>
                    </div>

                    {selectedCharacter.aiGenerated?.portrait && (
                      <div className="mb-6 rounded-lg overflow-hidden">
                        <img 
                          src={selectedCharacter.aiGenerated.portrait} 
                          alt={selectedCharacter.name}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-400" />
                          Character Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Archetype:</span>
                            <span className="text-white capitalize">{selectedCharacter.archetype}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Role:</span>
                            <span className="text-white">{selectedCharacter.role}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Age:</span>
                            <span className="text-white">{selectedCharacter.age}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Guardian:</span>
                            <span className="text-white capitalize">{selectedCharacter.guardian}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <Heart className="w-5 h-5 text-red-400" />
                          Personality
                        </h3>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-400 text-sm">Motivation:</span>
                            <p className="text-white text-sm mt-1">{selectedCharacter.motivation}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Fears:</span>
                            <p className="text-white text-sm mt-1">{selectedCharacter.fears}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - AI Enhancement Details */}
                  <div className="p-6 overflow-y-auto">
                    {selectedCharacter.aiGenerated && (
                      <>
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Mic className="w-5 h-5 text-blue-400" />
                            Voice Profile
                          </h3>
                          {selectedCharacter.aiGenerated.voiceProfile && (
                            <div className="bg-slate-700/50 rounded-lg p-4 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pitch:</span>
                                <span className="text-white capitalize">{selectedCharacter.aiGenerated.voiceProfile.pitch}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Tone:</span>
                                <p className="text-white mt-1">{selectedCharacter.aiGenerated.voiceProfile.tone}</p>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Speed:</span>
                                <span className="text-white capitalize">{selectedCharacter.aiGenerated.voiceProfile.speed}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-purple-400" />
                            Personality Analysis
                          </h3>
                          {selectedCharacter.aiGenerated.personalityAnalysis && (
                            <div className="space-y-3">
                              <div>
                                <span className="text-gray-400 text-sm">Core Traits:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedCharacter.aiGenerated.personalityAnalysis.core_traits.map((trait, index) => (
                                    <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                                      {trait}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-sm">Emotional Drivers:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedCharacter.aiGenerated.personalityAnalysis.emotional_drivers.map((driver, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                                      {driver}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400 text-sm">Growth Potential:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedCharacter.aiGenerated.personalityAnalysis.growth_potential.map((potential, index) => (
                                    <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                                      {potential}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-yellow-400" />
                            Story Suggestions
                          </h3>
                          {selectedCharacter.aiGenerated.story_suggestions && (
                            <div className="space-y-2">
                              {selectedCharacter.aiGenerated.story_suggestions.map((suggestion, index) => (
                                <div key={index} className="bg-slate-700/50 rounded-lg p-3 text-sm text-gray-300">
                                  {suggestion}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}