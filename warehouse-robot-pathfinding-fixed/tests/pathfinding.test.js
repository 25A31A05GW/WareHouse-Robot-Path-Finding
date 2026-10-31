import { describe, expect, it } from 'vitest';
import { astar } from '../src/algorithms/astar.js';
import { bfs } from '../src/algorithms/bfs.js';
import { dfs } from '../src/algorithms/dfs.js';
import Queue from '../src/data-structures/Queue.js';
import PriorityQueue from '../src/data-structures/PriorityQueue.js';
import { createGrid } from '../src/utils/gridUtils.js';

const start = { row: 0, col: 0 };
const goal = { row: 2, col: 2 };

describe('pathfinding algorithms', () => {
  it('A* finds an optimal route on an open grid', () => {
    const result = astar(createGrid(3, 3), start, goal);
    expect(result.found).toBe(true);
    expect(result.path.length - 1).toBe(4);
  });

  it('BFS finds a shortest route on an unweighted grid', () => {
    const result = bfs(createGrid(3, 3), start, goal);
    expect(result.found).toBe(true);
    expect(result.path.length - 1).toBe(4);
  });

  it('DFS finds a route when one exists', () => {
    const result = dfs(createGrid(3, 3), start, goal);
    expect(result.found).toBe(true);
    expect(result.path[0]).toEqual(start);
    expect(result.path.at(-1)).toEqual(goal);
  });

  it('reports no path when the goal is enclosed', () => {
    const grid = createGrid(3, 3);
    grid[1][2].isWall = true;
    grid[2][1].isWall = true;
    const result = astar(grid, start, goal);
    expect(result.found).toBe(false);
    expect(result.path).toEqual([]);
  });

  it('returns a one-cell path when start equals goal', () => {
    const result = astar(createGrid(2, 2), start, start);
    expect(result.found).toBe(true);
    expect(result.path).toEqual([start]);
  });
});

describe('data structures', () => {
  it('Queue processes items in FIFO order', () => {
    const queue = new Queue();
    queue.enqueue('first'); queue.enqueue('second');
    expect(queue.dequeue()).toBe('first');
    expect(queue.dequeue()).toBe('second');
    expect(queue.isEmpty()).toBe(true);
  });

  it('PriorityQueue removes the lowest priority first', () => {
    const queue = new PriorityQueue();
    queue.enqueue('slow', 9); queue.enqueue('fast', 1); queue.enqueue('medium', 4);
    expect(queue.dequeue()).toBe('fast');
    expect(queue.dequeue()).toBe('medium');
    expect(queue.dequeue()).toBe('slow');
  });
});
