import Queue from '../data-structures/Queue.js';
import { cellKey, getNeighbors, sameCell } from '../utils/gridUtils.js';

export function bfs(grid, start, goal) {
  const startedAt = performance.now();
  const queue = new Queue([start]);
  const visited = new Set([cellKey(start)]);
  const parent = new Map();
  const explored = [];

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    explored.push(current);
    if (sameCell(current, goal)) break;
    for (const neighbor of getNeighbors(grid, current)) {
      const key = cellKey(neighbor);
      if (visited.has(key)) continue;
      visited.add(key);
      parent.set(key, current);
      queue.enqueue(neighbor);
    }
  }

  const path = reconstructPath(parent, start, goal);
  return { algorithm: 'BFS', path, explored, found: path.length > 0, elapsedMs: performance.now() - startedAt };
}

export function reconstructPath(parent, start, goal) {
  if (sameCell(start, goal)) return [start];
  const path = [];
  let current = goal;
  while (current && !sameCell(current, start)) {
    path.push(current);
    current = parent.get(cellKey(current));
  }
  if (!current) return [];
  path.push(start);
  return path.reverse();
}
