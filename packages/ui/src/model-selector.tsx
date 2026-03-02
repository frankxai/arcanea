import * as React from 'react';
import { cn } from './utils';

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  description?: string;
  capabilities?: string[];
}

export interface ModelSelectorProps {
  models: ModelOption[];
  selected: string;
  onSelect: (modelId: string) => void;
  className?: string;
}

export function ModelSelector({ models, selected, onSelect, className }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedModel = models.find((m) => m.id === selected);

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg',
          'bg-white/5 border border-white/10 hover:border-white/20',
          'text-sm text-gray-300 transition-colors'
        )}
      >
        <span className="text-xs text-gray-500">{selectedModel?.provider}</span>
        <span>{selectedModel?.name ?? 'Select model'}</span>
        <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={cn(
          'absolute z-50 top-full mt-1 w-64 py-1 rounded-lg',
          'bg-gray-900/95 border border-white/10 backdrop-blur-xl shadow-2xl'
        )}>
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => { onSelect(model.id); setIsOpen(false); }}
              className={cn(
                'w-full text-left px-3 py-2 hover:bg-white/5 transition-colors',
                model.id === selected && 'bg-purple-600/10 text-purple-300'
              )}
            >
              <div className="text-sm font-medium text-gray-200">{model.name}</div>
              <div className="text-xs text-gray-500">{model.provider}{model.description ? ` — ${model.description}` : ''}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
