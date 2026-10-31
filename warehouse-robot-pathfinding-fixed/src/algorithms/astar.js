import PriorityQueue from '../data-structures/PriorityQueue.js';
import { cellKey, getNeighbors, manhattanDistance, sameCell } from '../utils/gridUtils.js';
import { reconstructPath } from './bfs.js';

export function astar(grid, start, goal) {
  const startedAt = performance.now();
  const open = new PriorityQueue();
  const gScore = new Map([[cellKey(start), 0]]);
  const parent = new Map();
  const closed = new Set();
  const explored = [];
  open.enqueue(start, manhattanDistance(start, goal));
  let found = false;

  while (!open.isEmpty()) {
    const current = open.dequeue();
    const currentKey = cellKey(current);
    if (closed.has(currentKey)) continue;
    closed.add(currentKey);
    explored.push(current);

    if (sameCell(current, goal)) {
      found = true;
      break;
    }

    for (const neighbor of getNeighbors(grid, current)) {
      const neighborKey = cellKey(neighbor);
      if (closed.has(neighborKey)) continue;
      const tentativeG = gScore.get(currentKey) + 1;
      if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
        parent.set(neighborKey, current);
        gScore.set(neighborKey, tentativeG);
        const fScore = tentativeG + manhattanDistance(neighbor, goal);
        open.enqueue(neighbor, fScore);
      }
    }
  }

  const path = found ? reconstructPath(parent, start, goal) : [];
  return { algorithm: 'A*', path, explored, found: path.length > 0, elapsedMs: performance.now() - startedAt };
}
