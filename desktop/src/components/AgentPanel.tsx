import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  Clock,
  FileText,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { Agent, GenerationResult } from '../types';

interface AgentPanelProps {
  selectedAgent: string | null;
  agents: Agent[];
  onInvoke: (agentId: string, task: string) => Promise<GenerationResult>;
  isLoading?: boolean;
}

export default function AgentPanel({
  selectedAgent,
  agents,
  onInvoke,
}: AgentPanelProps) {
  const [task, setTask] = useState('');
  const [response, setResponse] = useState<GenerationResult | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const agent = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;

  const handleInvoke = async () => {
    if (!agent || !task.trim()) return;

    setLocalLoading(true);
    try {
      const result = await onInvoke(agent.id, task);
      setResponse(result);
    } catch (error) {
      console.error('Invocation failed:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleCopy = () => {
    if (response?.output) {
      navigator.clipboard.writeText(response.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  if (!agent) {
    return (
      <div className="w-96 bg-slate-900 border-l border-slate-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Select an Agent</h3>
          <p className="text-sm text-gray-500">
            Choose an agent from the sidebar to begin a conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
      {/* Agent Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getElementColor(agent.element)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <span className="text-xl font-bold text-white">{agent.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white truncate">{agent.name}</h3>
            <p className="text-xs text-gray-400">{agent.court}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 bg-slate-800 rounded text-gray-400">
                {agent.frequency}
              </span>
              <span className="text-xs px-2 py-0.5 bg-slate-800 rounded text-gray-400 capitalize">
                {agent.element}
              </span>
            </div>
          </div>
        </div>

        {/* Specialty */}
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
          <p className="text-sm text-gray-300">{agent.specialty}</p>
        </div>
      </div>

      {/* Task Input */}
      <div className="p-4 border-b border-slate-800">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
          Task
        </label>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Describe what you need help with..."
          className="w-full h-24 p-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
        />
        <button
          onClick={handleInvoke}
          disabled={!task.trim() || localLoading}
          className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {localLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {localLoading ? 'Invoking...' : 'Invoke Agent'}
        </button>
      </div>

      {/* Response Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Response Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">Response</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-800 rounded transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Response Content */}
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {response.output}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{response.executionTimeMs}ms</span>
                </div>
                {response.cached && (
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                    Cached
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!response && !localLoading && (
          <div className="text-center py-8">
            <FileText className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Enter a task to see the response</p>
          </div>
        )}
      </div>
    </div>
  );
}
