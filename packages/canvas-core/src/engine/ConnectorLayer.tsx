'use client';

import { useBoard } from '../graph/BoardState';
import type { CanvasNode, Connection } from '../graph/types';

function getNodeCenter(node: CanvasNode): { x: number; y: number } {
  return {
    x: node.position.x + node.size.width / 2,
    y: node.position.y + node.size.height / 2,
  };
}

function getConnectionPoints(
  source: CanvasNode,
  target: CanvasNode
): { sx: number; sy: number; tx: number; ty: number } {
  const sc = getNodeCenter(source);
  const tc = getNodeCenter(target);

  // Calculate edge intersection points
  const dx = tc.x - sc.x;
  const dy = tc.y - sc.y;
  const angle = Math.atan2(dy, dx);

  // Source edge
  const sw = source.size.width / 2;
  const sh = source.size.height / 2;
  const sAspect = Math.abs(Math.tan(angle));
  let sx: number, sy: number;
  if (sAspect < sh / sw) {
    sx = sc.x + Math.sign(dx) * sw;
    sy = sc.y + Math.sign(dx) * sw * Math.tan(angle);
  } else {
    sx = sc.x + (Math.sign(dy) * sh) / Math.tan(angle);
    sy = sc.y + Math.sign(dy) * sh;
  }

  // Target edge
  const tw = target.size.width / 2;
  const th = target.size.height / 2;
  const tAspect = Math.abs(Math.tan(angle));
  let tx: number, ty: number;
  if (tAspect < th / tw) {
    tx = tc.x - Math.sign(dx) * tw;
    ty = tc.y - Math.sign(dx) * tw * Math.tan(angle);
  } else {
    tx = tc.x - (Math.sign(dy) * th) / Math.tan(angle);
    ty = tc.y - Math.sign(dy) * th;
  }

  return { sx, sy, tx, ty };
}

function ConnectorPath({ connection, nodes }: { connection: Connection; nodes: CanvasNode[] }) {
  const source = nodes.find((n) => n.id === connection.sourceId);
  const target = nodes.find((n) => n.id === connection.targetId);
  if (!source || !target) return null;

  const { sx, sy, tx, ty } = getConnectionPoints(source, target);

  // Curved path
  const midX = (sx + tx) / 2;
  const midY = (sy + ty) / 2;
  const dx = tx - sx;
  const dy = ty - sy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const curvature = Math.min(dist * 0.2, 50);

  const cx1 = sx + (dx > 0 ? curvature : -curvature);
  const cy1 = sy;
  const cx2 = tx - (dx > 0 ? curvature : -curvature);
  const cy2 = ty;

  const strokeDasharray = connection.type === 'dashed' ? '8 4' : undefined;
  const markerEnd = connection.type === 'arrow' ? 'url(#arrowhead)' : undefined;

  return (
    <g>
      <path
        d={`M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`}
        fill="none"
        stroke="rgba(139, 92, 246, 0.5)"
        strokeWidth={2}
        strokeDasharray={strokeDasharray}
        markerEnd={markerEnd}
      />
      {connection.label && (
        <text
          x={midX}
          y={midY - 8}
          textAnchor="middle"
          fill="rgba(155, 177, 208, 0.8)"
          fontSize={12}
          fontFamily="inherit"
        >
          {connection.label}
        </text>
      )}
    </g>
  );
}

export function ConnectorLayer() {
  const { board } = useBoard();
  const { nodes, connections } = board;

  if (connections.length === 0) return null;

  // Calculate SVG bounds to cover all nodes with padding
  const padding = 200;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const node of nodes) {
    minX = Math.min(minX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxX = Math.max(maxX, node.position.x + node.size.width);
    maxY = Math.max(maxY, node.position.y + node.size.height);
  }

  if (!isFinite(minX)) return null;

  const svgX = minX - padding;
  const svgY = minY - padding;
  const svgW = maxX - minX + padding * 2;
  const svgH = maxY - minY + padding * 2;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{ left: svgX, top: svgY, width: svgW, height: svgH }}
      viewBox={`${svgX} ${svgY} ${svgW} ${svgH}`}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(139, 92, 246, 0.5)" />
        </marker>
      </defs>
      {connections.map((conn) => (
        <ConnectorPath key={conn.id} connection={conn} nodes={nodes} />
      ))}
    </svg>
  );
}
