'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { useBoard, type CanvasNode, type CanvasNodeType } from '@arcanea/canvas-core';

type SidebarTab = 'properties' | 'ai';

export function Sidebar() {
  const { board, selectedNodeIds, updateNode, removeNode, addNode, addConnection } = useBoard();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>('properties');

  const selectedNodes = board.nodes.filter((n) => selectedNodeIds.includes(n.id));
  const selectedNode = selectedNodes.length === 1 ? selectedNodes[0] : null;

  // Auto-switch to properties when selection changes
  useEffect(() => {
    if (selectedNode && activeTab !== 'properties') {
      setActiveTab('properties');
    }
  }, [selectedNode?.id]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 z-50 w-8 h-8 rounded-lg glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors border border-cosmic-border/30"
        title="Open panel"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M15 3v18" />
        </svg>
      </button>
    );
  }

  return (
    <div className="absolute top-0 right-0 h-full w-80 z-40 glass border-l border-cosmic-border flex flex-col">
      {/* Header with tabs */}
      <div className="flex items-center justify-between px-2 py-2 border-b border-cosmic-border/50">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'properties'
                ? 'bg-cosmic-raised text-text-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-brand-accent/20 text-brand-accent'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            AI Agent
          </button>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-text-muted hover:text-text-primary transition-colors text-sm p-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'properties' ? (
          <PropertiesPanel
            selectedNode={selectedNode}
            selectedNodes={selectedNodes}
            board={board}
          />
        ) : (
          <AIPanel
            selectedNodes={selectedNodes}
            board={board}
          />
        )}
      </div>

      {/* Board info footer */}
      <div className="px-4 py-2.5 border-t border-cosmic-border/50 text-xs text-text-muted flex items-center justify-between">
        <span>{board.nodes.length} objects &middot; {board.connections.length} connections</span>
        <span className="text-[10px] text-text-muted/50">Drop URLs to import</span>
      </div>
    </div>
  );
}

// ─── Properties Panel ────────────────────────────────────────

function PropertiesPanel({
  selectedNode,
  selectedNodes,
  board,
}: {
  selectedNode: CanvasNode | null;
  selectedNodes: CanvasNode[];
  board: { nodes: CanvasNode[] };
}) {
  const { updateNode, removeNode } = useBoard();

  if (!selectedNode && selectedNodes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-3xl opacity-20 mb-3">&#9672;</div>
        <p className="text-sm text-text-muted">Select a node to view properties</p>
        <p className="text-[10px] text-text-muted/60 mt-2 max-w-[200px]">
          Click a node on the canvas, or use the toolbar to add new ones. Press N for note, C for card.
        </p>
      </div>
    );
  }

  if (selectedNodes.length > 1) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-sm text-text-secondary">{selectedNodes.length} nodes selected</p>
        <p className="text-xs text-text-muted mt-1">Select one node to edit properties</p>
        <button
          onClick={() => {
            for (const n of selectedNodes) removeNode(n.id);
          }}
          className="mt-4 px-4 py-2 rounded-md border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors"
        >
          Delete All Selected
        </button>
      </div>
    );
  }

  if (!selectedNode) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Type badge */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary">
          {selectedNode.type}
        </span>
        {selectedNode.createdBy === 'agent' && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            AI generated
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs text-text-muted mb-1">Title</label>
        <input
          className="w-full bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-1.5 text-sm text-text-primary outline-none focus:border-brand-accent/50"
          value={selectedNode.title}
          onChange={(e) => updateNode(selectedNode.id, { title: e.target.value })}
          placeholder="Node title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-text-muted mb-1">Description</label>
        <textarea
          className="w-full bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-1.5 text-sm text-text-primary outline-none focus:border-brand-accent/50 resize-none h-20"
          value={selectedNode.description || ''}
          onChange={(e) => updateNode(selectedNode.id, { description: e.target.value })}
          placeholder="Optional description"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs text-text-muted mb-1">Tags</label>
        <input
          className="w-full bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-1.5 text-sm text-text-primary outline-none focus:border-brand-accent/50"
          value={selectedNode.tags.join(', ')}
          onChange={(e) => {
            const tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
            updateNode(selectedNode.id, { tags });
          }}
          placeholder="tag1, tag2"
        />
      </div>

      {/* Source URL (if applicable) */}
      {selectedNode.sourceUrl && (
        <div>
          <label className="block text-xs text-text-muted mb-1">Source URL</label>
          <a
            href={selectedNode.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-accent hover:underline break-all"
          >
            {selectedNode.sourceUrl}
          </a>
        </div>
      )}

      {/* Position & Size */}
      <div>
        <label className="block text-xs text-text-muted mb-1">Position</label>
        <p className="text-xs text-text-secondary font-mono">
          x: {Math.round(selectedNode.position.x)}, y: {Math.round(selectedNode.position.y)}
        </p>
        <p className="text-xs text-text-secondary font-mono mt-0.5">
          {Math.round(selectedNode.size.width)} &times; {Math.round(selectedNode.size.height)}
        </p>
      </div>

      {/* ID */}
      <div>
        <label className="block text-xs text-text-muted mb-1">ID</label>
        <p className="text-[10px] text-text-muted font-mono break-all select-all">{selectedNode.id}</p>
      </div>

      {/* Created info */}
      <div>
        <label className="block text-xs text-text-muted mb-1">Created</label>
        <p className="text-xs text-text-secondary">
          {new Date(selectedNode.createdAt).toLocaleString()} by {selectedNode.createdBy}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={() => removeNode(selectedNode.id)}
        className="w-full px-3 py-2 rounded-md border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors"
      >
        Delete Node
      </button>
    </div>
  );
}

// ─── AI Panel ────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

function AIPanel({
  selectedNodes,
  board,
}: {
  selectedNodes: CanvasNode[];
  board: { nodes: CanvasNode[]; connections: { sourceId: string; targetId: string; label?: string }[] };
}) {
  const { addNode, addConnection, updateNode } = useBoard();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const buildContext = useCallback(() => {
    const context: string[] = [];

    if (selectedNodes.length > 0) {
      context.push(`Selected nodes (${selectedNodes.length}):`);
      for (const node of selectedNodes) {
        context.push(`- [${node.type}] "${node.title}" ${node.content ? `: ${node.content.slice(0, 200)}` : ''}`);
        if (node.tags.length > 0) context.push(`  Tags: ${node.tags.join(', ')}`);
      }
    }

    context.push(`\nBoard has ${board.nodes.length} total nodes, ${board.connections.length} connections.`);

    const typeCounts: Record<string, number> = {};
    for (const node of board.nodes) {
      typeCounts[node.type] = (typeCounts[node.type] || 0) + 1;
    }
    context.push(`Types: ${Object.entries(typeCounts).map(([t, c]) => `${t}(${c})`).join(', ')}`);

    return context.join('\n');
  }, [selectedNodes, board]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    const context = buildContext();

    try {
      const res = await fetch('/api/canvas-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          context,
          history: messages.slice(-6),
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      // Stream response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', timestamp: new Date().toISOString() },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantContent += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: assistantContent,
            };
            return updated;
          });
        }
      }

      // Parse any canvas actions from the response
      parseAndExecuteActions(assistantContent, addNode, addConnection, updateNode, selectedNodes);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${errorMsg}. The AI agent API route (/api/canvas-ai) needs to be configured with your AI provider.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages, buildContext, addNode, addConnection, updateNode, selectedNodes]);

  const quickActions = [
    { label: 'Summarize board', prompt: 'Summarize the contents of this board in a few sentences.' },
    { label: 'Brainstorm', prompt: 'Generate 5 related ideas as sticky notes based on what\'s on the board.' },
    { label: 'Connect selected', prompt: 'Suggest connections between the selected nodes and explain the relationships.' },
    { label: 'Expand selected', prompt: 'Expand on the selected node(s) - break them down into sub-topics.' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Context indicator */}
      {selectedNodes.length > 0 && (
        <div className="px-4 py-2 bg-brand-accent/5 border-b border-brand-accent/20 shrink-0">
          <p className="text-[10px] text-brand-accent">
            Context: {selectedNodes.length} node{selectedNodes.length > 1 ? 's' : ''} selected
          </p>
          <p className="text-[10px] text-text-muted truncate mt-0.5">
            {selectedNodes.map((n) => n.title || n.type).join(', ')}
          </p>
        </div>
      )}

      {/* Quick actions */}
      {messages.length === 0 && (
        <div className="px-4 py-3 space-y-1.5 shrink-0">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Quick Actions</p>
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                setInput(action.prompt);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-xs text-text-secondary hover:text-text-primary hover:bg-cosmic-raised/50 transition-colors border border-cosmic-border/30"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${
              msg.role === 'user' ? 'ml-6' : 'mr-2'
            }`}
          >
            <div
              className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-brand-primary/20 text-text-primary'
                  : 'bg-cosmic-raised/50 text-text-secondary border border-cosmic-border/30'
              }`}
            >
              {msg.content || (
                <span className="inline-flex items-center gap-1 text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  Thinking...
                </span>
              )}
            </div>
            <p className="text-[9px] text-text-muted/40 mt-0.5 px-1">
              {msg.role === 'user' ? 'You' : 'AI Agent'} &middot; {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-cosmic-border/50 shrink-0">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-2 text-xs text-text-primary outline-none focus:border-brand-accent/50 placeholder:text-text-muted/50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={selectedNodes.length > 0 ? 'Ask about selected nodes...' : 'Ask the AI agent...'}
            disabled={isStreaming}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="px-3 py-2 rounded-md bg-brand-accent text-cosmic-deep text-xs font-medium hover:bg-brand-accent/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isStreaming ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Parse AI response for canvas action commands.
 * AI can include structured commands like [CREATE:sticky-note:title:content]
 */
function parseAndExecuteActions(
  response: string,
  addNode: (type: CanvasNodeType, pos: { x: number; y: number }, overrides?: Partial<CanvasNode>) => CanvasNode,
  addConnection: (sourceId: string, targetId: string, type?: 'arrow' | 'line' | 'dashed', label?: string) => void,
  updateNode: (id: string, updates: Partial<CanvasNode>) => void,
  selectedNodes: CanvasNode[]
) {
  // Look for action blocks in the response
  const actionPattern = /\[ACTION:(\w+)(?::([^\]]*))?\]/g;
  let match;

  while ((match = actionPattern.exec(response)) !== null) {
    const action = match[1];
    const params = match[2]?.split('|') || [];

    switch (action) {
      case 'CREATE': {
        const type = (params[0] || 'sticky-note') as CanvasNodeType;
        const title = params[1] || '';
        const content = params[2] || '';

        // Position near selected nodes or at center
        const baseX = selectedNodes.length > 0
          ? Math.max(...selectedNodes.map((n) => n.position.x + n.size.width)) + 30
          : 200;
        const baseY = selectedNodes.length > 0
          ? selectedNodes[0].position.y
          : 200;

        addNode(type, { x: baseX, y: baseY }, {
          title,
          content,
          createdBy: 'agent',
        });
        break;
      }
      case 'CONNECT': {
        if (params[0] && params[1]) {
          addConnection(params[0], params[1], 'arrow', params[2]);
        }
        break;
      }
    }
  }
}
