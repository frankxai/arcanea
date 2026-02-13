import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Ghost,
  Layers,
  Zap
} from 'lucide-react';
import { Agent, Prompt, Workflow } from '../types';

interface SidebarProps {
  agents: Agent[];
  prompts: Prompt[];
  workflows: Workflow[];
  activeTab: 'prompts' | 'agents' | 'workflows' | 'skills' | 'settings';
  onTabChange: (tab: 'prompts' | 'agents' | 'workflows' | 'skills' | 'settings') => void;
  onSelectPrompt: (prompt: Prompt) => void;
  onSelectAgent: (agentId: string) => void;
  onSelectWorkflow?: (workflowId: string) => void;
}

export default function Sidebar({
  agents,
  prompts,
  workflows,
  activeTab,
  onTabChange,
  onSelectPrompt,
  onSelectAgent
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCourt, setExpandedCourt] = useState<string | null>(null);

  // Group agents by element/court
  const agentsByCourt = agents.reduce((acc, agent) => {
    const court = agent.court || 'Unknown';
    if (!acc[court]) acc[court] = [];
    acc[court].push(agent);
    return acc;
  }, {} as Record<string, Agent[]>);

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Flame className="w-4 h-4" />;
      case 'water': return <Droplets className="w-4 h-4" />;
      case 'earth': return <Mountain className="w-4 h-4" />;
      case 'air': return <Wind className="w-4 h-4" />;
      case 'void': return <Ghost className="w-4 h-4" />;
      case 'integration': return <Layers className="w-4 h-4" />;
      case 'master': return <Sparkles className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'from-orange-500 to-red-500';
      case 'water': return 'from-cyan-500 to-blue-500';
      case 'earth': return 'from-amber-600 to-yellow-600';
      case 'air': return 'from-sky-400 to-blue-400';
      case 'void': return 'from-purple-600 to-indigo-600';
      case 'integration': return 'from-pink-500 to-rose-500';
      case 'master': return 'from-yellow-400 to-orange-400';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Logo Area */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Arcanea</h1>
            <p className="text-xs text-gray-500">64 Agents • v4.0</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-3 pb-2">
        <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg">
          {(['agents', 'prompts', 'workflows'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                activeTab === tab
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {activeTab === 'agents' && (
          <>
            {/* Courts */}
            {Object.entries(agentsByCourt).map(([court, courtAgents]) => {
              const firstAgent = courtAgents[0];
              const element = firstAgent?.element || 'void';
              const isExpanded = expandedCourt === court;

              return (
                <motion.div
                  key={court}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg overflow-hidden"
                >
                  {/* Court Header */}
                  <button
                    onClick={() => setExpandedCourt(isExpanded ? null : court)}
                    className={`w-full flex items-center justify-between p-3 bg-gradient-to-r ${getElementColor(element)} bg-opacity-10 hover:bg-opacity-20 transition-all`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded bg-gradient-to-br ${getElementColor(element)}`}>
                        {getElementIcon(element)}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-sm text-white">{court}</h3>
                        <p className="text-xs text-gray-400">{courtAgents.length} agents</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-gray-400"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Agent List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 space-y-1 bg-slate-800/30">
                          {courtAgents.map((agent) => (
                            <button
                              key={agent.id}
                              onClick={() => onSelectAgent(agent.id)}
                              className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-slate-700/50 transition-all text-left group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-600 transition-colors">
                                <span className="text-sm font-bold text-white">
                                  {agent.name.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-300 truncate">
                                  {agent.name}
                                </h4>
                                <p className="text-xs text-gray-500 truncate">
                                  {agent.specialty}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </>
        )}

        {activeTab === 'prompts' && (
          <div className="space-y-2">
            {prompts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No prompts yet</p>
                <p className="text-gray-600 text-xs mt-1">Create your first prompt</p>
              </div>
            ) : (
              prompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => onSelectPrompt(prompt)}
                  className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all group"
                >
                  <h4 className="text-sm font-medium text-gray-300 group-hover:text-white">
                    {prompt.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="text-xs px-2 py-0.5 bg-slate-700 text-gray-400 rounded"
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="space-y-2">
            {workflows.map((workflow) => (
              <button
                key={workflow.id}
                className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all"
              >
                <h4 className="text-sm font-medium text-gray-300">{workflow.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{workflow.phases.length} phases</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-slate-800">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-lg font-bold text-white">{agents.length}</p>
            <p className="text-xs text-gray-500">Agents</p>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-lg font-bold text-white">{prompts.length}</p>
            <p className="text-xs text-gray-500">Prompts</p>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-lg font-bold text-white">{workflows.length}</p>
            <p className="text-xs text-gray-500">Workflows</p>
          </div>
        </div>
      </div>
    </div>
  );
}
