import type { ComponentType } from 'react';
import type { CanvasNode, CanvasNodeType } from '../graph/types';

export interface NodeRendererProps {
  node: CanvasNode;
  isSelected: boolean;
}

export class NodeRegistry {
  private renderers = new Map<CanvasNodeType, ComponentType<NodeRendererProps>>();

  register(type: CanvasNodeType, renderer: ComponentType<NodeRendererProps>) {
    this.renderers.set(type, renderer);
    return this;
  }

  get(type: CanvasNodeType): ComponentType<NodeRendererProps> | undefined {
    return this.renderers.get(type);
  }

  has(type: CanvasNodeType): boolean {
    return this.renderers.has(type);
  }

  types(): CanvasNodeType[] {
    return Array.from(this.renderers.keys());
  }
}
