export const DEFAULT_ROWS = 15;
export const DEFAULT_COLS = 25;

export function createGrid(rows = DEFAULT_ROWS, cols = DEFAULT_COLS) {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({ row, col, isWall: false })),
  );
}

export function cellKey(cell) {
  return `${cell.row},${cell.col}`;
}

export function sameCell(a, b) {
  return Boolean(a && b && a.row === b.row && a.col === b.col);
}

export function getNeighbors(grid, cell) {
  const candidates = [
    { row: cell.row - 1, col: cell.col },
    { row: cell.row + 1, col: cell.col },
    { row: cell.row, col: cell.col - 1 },
    { row: cell.row, col: cell.col + 1 },
  ];
  return candidates.filter(({ row, col }) =>
    row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col].isWall,
  );
}

export function manhattanDistance(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function generateRandomWalls(grid, start, goal, density = 0.22) {
  return grid.map((row) => row.map((cell) => ({
    ...cell,
    isWall: !sameCell(cell, start) && !sameCell(cell, goal) && Math.random() < density,
  })));
}
