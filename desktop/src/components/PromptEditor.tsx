import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Sparkles,
  Tag,
  Plus,
  X,
  Wand2,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { Agent, Prompt, GenerationResult } from '../types';

interface PromptEditorProps {
  prompt: Prompt | null;
  agents: Agent[];
  onAgentInvoke: (agentId: string, task: string) => Promise<GenerationResult>;
  onSave: (prompt: Prompt) => Promise<string>;
}

export default function PromptEditor({
  prompt,
  agents,
  onAgentInvoke,
  onSave
}: PromptEditorProps) {
  const [name, setName] = useState(prompt?.name || '');
  const [content, setContent] = useState(prompt?.content || '');
  const [tags, setTags] = useState<{ id: string; label: string }[]>(prompt?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reset form when prompt changes
  useEffect(() => {
    if (prompt) {
      setName(prompt.name);
      setContent(prompt.content);
      setTags(prompt.tags || []);
    } else {
      setName('');
      setContent('');
      setTags([]);
    }
  }, [prompt]);

  const handleSave = async () => {
    if (!name.trim() || !content.trim()) return;

    setIsSaving(true);
    try {
      const promptData: Prompt = {
        id: prompt?.id || crypto.randomUUID(),
        name: name.trim(),
        content: content.trim(),
        tags: tags.map(t => ({
          ...t,
          category: 'custom',
          weight: 1.0,
          color: '#a855f7'
        })),
        category: 'prompts',
        createdAt: prompt?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: prompt?.usageCount || 0
      };
      await onSave(promptData);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEnhance = async () => {
    if (!content.trim()) return;

    setIsEnhancing(true);
    try {
      // Find an enhancement agent
      const enhancer = agents.find(a => a.name.includes('Enhancer') || a.specialty.includes('enhance'));
      if (enhancer) {
        const result = await onAgentInvoke(enhancer.id, `Enhance this prompt: ${content}`);
        setContent(result.output);
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.find(t => t.label === newTag.trim())) {
      setTags([...tags, { id: crypto.randomUUID(), label: newTag.trim() }]);
      setNewTag('');
    }
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'from-orange-500 to-red-500';
      case 'water': return 'from-cyan-500 to-blue-500';
      case 'earth': return 'from-amber-600 to-yellow-600';
      case 'air': return 'from-sky-400 to-blue-400';
      case 'void': return 'from-purple-600 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {prompt ? 'Edit Prompt' : 'New Prompt'}
          </h2>
          <p className="text-gray-500 text-sm">
            {prompt ? 'Update your existing prompt' : 'Create a new creative prompt'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !content.trim() || isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Prompt'}
          </button>
        </div>
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Give your prompt a memorable name..."
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
        />
      </div>

      {/* Content Editor */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Content
          </label>
          <button
            onClick={handleEnhance}
            disabled={!content.trim() || isEnhancing}
            className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Wand2 className="w-3 h-3" />
            {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
          </button>
        </div>
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your creative vision in detail... The more specific, the better the results."
            className="w-full h-64 p-4 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm leading-relaxed"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            {content.length} chars
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.span
                key={tag.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm"
              >
                <Tag className="w-3 h-3" />
                {tag.label}
                <button
                  onClick={() => removeTag(tag.id)}
                  className="ml-1 p-0.5 hover:bg-purple-500/30 rounded transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add a tag..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
          />
          <button
            onClick={addTag}
            disabled={!newTag.trim()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-all disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agent Suggestions */}
      <div className="border-t border-slate-800 pt-6">
        <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Suggested Agents
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {agents.slice(0, 8).map((agent) => (
            <motion.button
              key={agent.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-left transition-all group"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getElementColor(agent.element)} flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm font-bold text-white">{agent.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-300 truncate group-hover:text-white">
                  {agent.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{agent.frequency}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
