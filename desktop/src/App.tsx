import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import AgentPanel from './components/AgentPanel';
import PromptEditor from './components/PromptEditor';
import './App.css';
import type { Agent, Prompt, GenerationResult } from './types';

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [activeTab, setActiveTab] = useState<'prompts' | 'agents' | 'workflows' | 'skills' | 'settings'>('prompts');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load agents on mount
  useEffect(() => {
    loadAgents();
    loadPrompts();
  }, []);

  const loadAgents = async () => {
    try {
      const agentList: Agent[] = await invoke('get_agents');
      setAgents(agentList);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load agents:', error);
      setIsLoading(false);
    }
  };

  const loadPrompts = async () => {
    try {
      const promptList: Prompt[] = await invoke('get_prompts');
      setPrompts(promptList);
    } catch (error) {
      console.error('Failed to load prompts:', error);
    }
  };

  const handleAgentInvoke = async (agentId: string, task: string): Promise<GenerationResult> => {
    try {
      const result: GenerationResult = await invoke('invoke_agent', {
        agentId,
        task,
        context: {}
      });
      console.log('Agent result:', result);
      return result;
    } catch (error) {
      console.error('Agent invocation failed:', error);
      throw error;
    }
  };

  const handleSavePrompt = async (prompt: Prompt): Promise<string> => {
    try {
      const id: string = await invoke('store_prompt', {
        name: prompt.name,
        content: prompt.content,
        tags: prompt.tags.map(t => t.label)
      });
      await loadPrompts();
      return id;
    } catch (error) {
      console.error('Failed to save prompt:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-bold text-white mb-2">Arcanea</h1>
          <p className="text-gray-400">Summoning 64 agents...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-300 flex overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-40"
          >
            <Sidebar 
              agents={agents}
              prompts={prompts}
              workflows={[]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onSelectPrompt={setSelectedPrompt}
              onSelectAgent={setSelectedAgent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-white">Arcanea</h1>
            <span className="text-xs text-gray-500 px-2 py-1 bg-slate-800 rounded">v4.0</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'prompts' && (
              <PromptEditor
                prompt={selectedPrompt}
                agents={agents}
                onAgentInvoke={handleAgentInvoke}
                onSave={handleSavePrompt}
              />
            )}
            
            {activeTab === 'agents' && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Agent Directory</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {agents.map((agent) => (
                    <motion.div
                      key={agent.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`p-4 bg-slate-800/50 rounded-xl border cursor-pointer transition-all ${
                        selectedAgent === agent.id 
                          ? 'border-purple-500/50 bg-purple-500/10' 
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                          agent.element === 'fire' ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                          agent.element === 'water' ? 'bg-gradient-to-br from-cyan-500 to-blue-500' :
                          agent.element === 'earth' ? 'bg-gradient-to-br from-amber-600 to-yellow-600' :
                          agent.element === 'air' ? 'bg-gradient-to-br from-sky-400 to-blue-400' :
                          'bg-gradient-to-br from-purple-600 to-indigo-600'
                        }`}>
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{agent.name}</h3>
                          <p className="text-xs text-gray-500">{agent.court}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{agent.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-slate-700 rounded">{agent.frequency}</span>
                        <span className="capitalize">{agent.element}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'workflows' && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Workflows</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'character-creation', name: 'Character Creation', description: 'Complete character development', agents: 6 },
                    { id: 'world-building', name: 'World Building', description: 'Comprehensive world design', agents: 10 },
                    { id: 'story-development', name: 'Story Development', description: 'Plot and narrative architecture', agents: 5 },
                    { id: 'spell-crafting', name: 'Spell Crafting', description: 'Magic system and spell design', agents: 4 },
                  ].map((workflow) => (
                    <motion.div
                      key={workflow.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-500/30 cursor-pointer"
                    >
                      <h3 className="font-semibold text-white mb-2">{workflow.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">{workflow.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-slate-700 rounded">{workflow.agents} agents</span>
                        <span className="px-2 py-1 bg-slate-700 rounded">Multi-phase</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Agent Panel */}
          <AgentPanel 
            selectedAgent={selectedAgent}
            agents={agents}
            onInvoke={handleAgentInvoke}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
