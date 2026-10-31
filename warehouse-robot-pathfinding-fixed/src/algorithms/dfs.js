import { cellKey, getNeighbors, sameCell } from '../utils/gridUtils.js';
import { reconstructPath } from './bfs.js';

export function dfs(grid, start, goal) {
  const startedAt = performance.now();
  const stack = [start];
  const visited = new Set([cellKey(start)]);
  const parent = new Map();
  const explored = [];
  let found = false;

  while (stack.length) {
    const current = stack.pop();
    explored.push(current);
    if (sameCell(current, goal)) {
      found = true;
      break;
    }
    const neighbors = getNeighbors(grid, current);
    for (let index = neighbors.length - 1; index >= 0; index -= 1) {
      const neighbor = neighbors[index];
      const key = cellKey(neighbor);
      if (visited.has(key)) continue;
      visited.add(key);
      parent.set(key, current);
      stack.push(neighbor);
    }
  }

  const path = found ? reconstructPath(parent, start, goal) : [];
  return { algorithm: 'DFS', path, explored, found: path.length > 0, elapsedMs: performance.now() - startedAt };
}
