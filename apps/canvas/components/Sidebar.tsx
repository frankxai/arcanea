'use client';

import { useCallback, useState } from 'react';
import { useBoard, type CanvasNode } from '@arcanea/canvas-core';

export function Sidebar() {
  const { board, selectedNodeIds, updateNode, removeNode, removeConnection } = useBoard();
  const [isOpen, setIsOpen] = useState(true);

  const selectedNodes = board.nodes.filter((n) => selectedNodeIds.includes(n.id));
  const selectedNode = selectedNodes.length === 1 ? selectedNodes[0] : null;

  const handleTitleChange = useCallback(
    (value: string) => {
      if (selectedNode) updateNode(selectedNode.id, { title: value });
    },
    [selectedNode, updateNode]
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      if (selectedNode) updateNode(selectedNode.id, { description: value });
    },
    [selectedNode, updateNode]
  );

  const handleTagsChange = useCallback(
    (value: string) => {
      if (selectedNode) {
        const tags = value
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        updateNode(selectedNode.id, { tags });
      }
    },
    [selectedNode, updateNode]
  );

  const handleDelete = useCallback(() => {
    if (selectedNode) {
      removeNode(selectedNode.id);
    }
  }, [selectedNode, removeNode]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 z-50 w-8 h-8 rounded-lg glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
        title="Open panel"
      >
        &#9776;
      </button>
    );
  }

  return (
    <div className="absolute top-0 right-0 h-full w-72 z-40 glass border-l border-cosmic-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cosmic-border/50">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Properties
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-text-muted hover:text-text-primary transition-colors text-sm"
        >
          &#10005;
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedNode ? (
          <div className="space-y-4">
            {/* Type badge */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary">
                {selectedNode.type}
              </span>
              {selectedNode.createdBy === 'agent' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent">
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Node title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-text-muted mb-1">Description</label>
              <textarea
                className="w-full bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-1.5 text-sm text-text-primary outline-none focus:border-brand-accent/50 resize-none h-20"
                value={selectedNode.description || ''}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Optional description"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs text-text-muted mb-1">Tags (comma separated)</label>
              <input
                className="w-full bg-cosmic-raised/50 border border-cosmic-border rounded-md px-3 py-1.5 text-sm text-text-primary outline-none focus:border-brand-accent/50"
                value={selectedNode.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="tag1, tag2"
              />
            </div>

            {/* Metadata */}
            <div>
              <label className="block text-xs text-text-muted mb-1">Position</label>
              <p className="text-xs text-text-secondary font-mono">
                x: {Math.round(selectedNode.position.x)}, y: {Math.round(selectedNode.position.y)}
              </p>
              <p className="text-xs text-text-secondary font-mono mt-0.5">
                {selectedNode.size.width} x {selectedNode.size.height}
              </p>
            </div>

            {/* ID */}
            <div>
              <label className="block text-xs text-text-muted mb-1">ID</label>
              <p className="text-[10px] text-text-muted font-mono break-all">{selectedNode.id}</p>
            </div>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="w-full px-3 py-2 rounded-md border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors"
            >
              Delete Node
            </button>
          </div>
        ) : selectedNodes.length > 1 ? (
          <div className="text-center py-8">
            <p className="text-sm text-text-secondary">{selectedNodes.length} nodes selected</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-text-muted">Select a node to view properties</p>
            <p className="text-xs text-text-muted/60 mt-2">
              Click a node on the canvas, or use the toolbar to add new ones.
            </p>
          </div>
        )}
      </div>

      {/* Board info footer */}
      <div className="px-4 py-3 border-t border-cosmic-border/50 text-xs text-text-muted">
        <p>{board.nodes.length} objects &middot; {board.connections.length} connections</p>
      </div>
    </div>
  );
}
