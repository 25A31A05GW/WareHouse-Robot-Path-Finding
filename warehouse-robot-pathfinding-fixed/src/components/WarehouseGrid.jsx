import { cellKey, sameCell } from '../utils/gridUtils.js';

export default function WarehouseGrid({ grid, start, goal, path = [], explored = [], robot, onCellClick, isAnimating = false }) {
  const pathKeys = new Set(path.map(cellKey));
  const exploredKeys = new Set(explored.map(cellKey));

  return (
    <div className="grid-shell" aria-label="Warehouse grid">
      <div className="warehouse-grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}>
        {grid.flat().map((cell) => {
          const key = cellKey(cell);
          const isStart = sameCell(cell, start);
          const isGoal = sameCell(cell, goal);
          const isRobot = sameCell(cell, robot);
          const classNames = [
            'grid-cell', cell.isWall && 'wall', exploredKeys.has(key) && 'explored',
            pathKeys.has(key) && 'path-cell', isStart && 'start-cell', isGoal && 'goal-cell', isRobot && 'robot-cell',
          ].filter(Boolean).join(' ');
          const label = isRobot ? 'Robot' : isStart ? 'Start' : isGoal ? 'Goal' : cell.isWall ? 'Obstacle' : `Row ${cell.row + 1}, column ${cell.col + 1}`;
          return (
            <button key={key} type="button" className={classNames} aria-label={label}
              title={label} onClick={() => onCellClick(cell)} disabled={isAnimating}>
              {isRobot ? '🤖' : isStart ? 'S' : isGoal ? 'G' : cell.isWall ? '' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
