/**
 * Arcanea Prompt Books - Simple Library App
 * 
 * A clean, functional prompt library without image dependencies
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Users, Globe, Search, Plus, Play, Copy, Check } from 'lucide-react';

interface Prompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  usageCount: number;
}

interface Character {
  id: string;
  name: string;
  archetype: string;
  description: string;
  traits: string[];
}

interface World {
  id: string;
  name: string;
  description: string;
  elements: string[];
  magic: string;
}

const SAMPLE_PROMPTS: Prompt[] = [
  {
    id: '1',
    name: 'Character Motivation Generator',
    description: 'Generate deep motivations for any character',
    prompt: 'Create a motivation for a character who is {archetype}. Consider their {fear} and desire to {desire}. The motivation should be revealed through {action}.',
    category: 'Character',
    tags: ['motivation', 'character', 'arcane'],
    usageCount: 42
  },
  {
    id: '2',
    name: 'World Building Template',
    description: 'Build detailed fantasy worlds',
    prompt: 'Design a world where {element} magic is common. The society should be shaped by {geography}. Key locations include {location1} and {location2}.',
    category: 'World',
    tags: ['world', 'fantasy', 'building'],
    usageCount: 28
  },
  {
    id: '3',
    name: 'Dialogue Generator',
    description: 'Create authentic character dialogue',
    prompt: 'Write dialogue for {character} when they discover {truth}. They are feeling {emotion} and must convince {listener} of {point}.',
    category: 'Story',
    tags: ['dialogue', 'character', 'writing'],
    usageCount: 67
  },
  {
    id: '4',
    name: 'Spell Creation Framework',
    description: 'Design magical spells with clear rules',
    prompt: 'Create a {element} spell called {name}. It requires {cost} to cast, has {range} range, and the effect is {effect}. Limitations include {limitation}.',
    category: 'Magic',
    tags: ['magic', 'spells', 'arcane'],
    usageCount: 35
  },
  {
    id: '5',
    name: 'Conflict Generator',
    description: 'Generate compelling story conflicts',
    prompt: 'Create a conflict where {character} must choose between {obligation} and {desire}. The stakes are {stakes} and the consequence of inaction is {consequence}.',
    category: 'Story',
    tags: ['conflict', 'plot', 'drama'],
    usageCount: 51
  }
];

const SAMPLE_CHARACTERS: Character[] = [
  { id: '1', name: 'Kira Vance', archetype: 'Storm Seeker', description: 'Rogue cloud harvester with photographic memory', traits: ['determined', 'resourceful', 'trusting'] },
  { id: '2', name: 'Jaxon Prime', archetype: 'Crystal Guardian', description: 'Ancient protector of the crystalline libraries', traits: ['wise', 'patient', 'protective'] },
  { id: '3', name: 'Lyra Nightshade', archetype: 'Shadow Weaver', description: 'Mysterious spy who controls darkness', traits: ['cunning', 'loyal', 'brooding'] }
];

const SAMPLE_WORLDS: World[] = [
  { id: '1', name: 'Venus Floating Cities', description: 'Civilization above the clouds', elements: ['plasma', 'storm', 'technology'], magic: 'Storm Channeling' },
  { id: '2', name: 'Crystal Realms', description: 'World of living crystals', elements: ['crystal', 'light', 'earth'], magic: 'Resonance Magic' },
  { id: '3', name: 'Shadow Nexus', description: 'Realm where light and darkness blend', elements: ['shadow', 'void', 'energy'], magic: 'Void Manipulation' }
];

export default function PromptBooksLibrary() {
  const [activeTab, setActiveTab] = useState<'prompts' | 'characters' | 'worlds'>('prompts');
  const [searchTerm, setSearchTerm] = useState('');
  const [prompts, setPrompts] = useState(SAMPLE_PROMPTS);
  const [characters, setCharacters] = useState(SAMPLE_CHARACTERS);
  const [worlds, setWorlds] = useState(SAMPLE_WORLDS);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [filledPrompt, setFilledPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredPrompts = prompts.filter(prompt =>
    prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.archetype.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWorlds = worlds.filter(world =>
    world.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    world.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usePrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setFilledPrompt(prompt.prompt);
    setPrompts(prev => prev.map(p =>
      p.id === prompt.id ? { ...p, usageCount: p.usageCount + 1 } : p
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            📚 Arcanea Prompt Books
          </h1>
          <p className="text-gray-300 text-lg">
            Your library of magical prompts, characters, and worlds
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts, characters, worlds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-2 border border-slate-700">
            <div className="flex gap-2">
              {[
                { id: 'prompts', label: 'Spells', icon: Sparkles },
                { id: 'characters', label: 'Characters', icon: Users },
                { id: 'worlds', label: 'Worlds', icon: Globe }
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

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'prompts' && (
            <motion.div
              key="prompts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all cursor-pointer"
                  onClick={() => usePrompt(prompt)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{prompt.name}</h3>
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                        {prompt.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Used {prompt.usageCount}x</div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{prompt.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-slate-700 text-gray-300 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Use Spell
                  </motion.button>
                </motion.div>
              ))}
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
              {filteredCharacters.map((char, index) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{char.name}</h3>
                      <p className="text-sm text-gray-400">{char.archetype}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{char.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {char.traits.map((trait, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                        {trait}
                      </span>
                    ))}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredWorlds.map((world, index) => (
                <motion.div
                  key={world.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{world.name}</h3>
                      <p className="text-sm text-gray-400">{world.magic}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{world.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {world.elements.map((element, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                        {element}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt Modal */}
        <AnimatePresence>
          {selectedPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPrompt(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl max-w-2xl w-full p-6 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedPrompt.name}</h2>
                  <button
                    onClick={() => setSelectedPrompt(null)}
                    className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fill in the template:
                  </label>
                  <textarea
                    value={filledPrompt}
                    onChange={(e) => setFilledPrompt(e.target.value)}
                    className="w-full h-48 p-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                    placeholder="Edit the prompt template..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(filledPrompt)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600"
                  >
                    Use with AI
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}