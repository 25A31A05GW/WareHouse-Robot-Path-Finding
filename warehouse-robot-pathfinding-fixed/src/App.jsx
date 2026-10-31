import { useMemo, useState } from 'react';
import { astar } from './algorithms/astar.js';
import { bfs } from './algorithms/bfs.js';
import { dfs } from './algorithms/dfs.js';
import ControlPanel from './components/ControlPanel.jsx';
import MetricsPanel from './components/MetricsPanel.jsx';
import TaskManager from './components/TaskManager.jsx';
import WarehouseGrid from './components/WarehouseGrid.jsx';
import { createGrid, generateRandomWalls, sameCell } from './utils/gridUtils.js';

const START = { row: 7, col: 3 };
const GOAL = { row: 7, col: 21 };
const ALGORITHMS = { astar, bfs, dfs };

export default function App() {
  const [grid, setGrid] = useState(() => createGrid());
  const [start, setStart] = useState(START);
  const [goal, setGoal] = useState(GOAL);
  const [algorithm, setAlgorithm] = useState('astar');
  const [editMode, setEditMode] = useState('wall');
  const [result, setResult] = useState(null);
  const [comparisons, setComparisons] = useState([]);
  const [robot, setRobot] = useState(START);
  const [isAnimating, setIsAnimating] = useState(false);
  const [status, setStatus] = useState('Ready to plan a route');
  const [tasks, setTasks] = useState([]);

  const wallCount = useMemo(() => grid.flat().filter((cell) => cell.isWall).length, [grid]);

  function resetResults() {
    setResult(null); setComparisons([]); setRobot(start); setStatus('Layout updated — ready to plan');
  }

  function handleCellClick(cell) {
    if (isAnimating) return;
    if (editMode === 'start') {
      if (cell.isWall || sameCell(cell, goal)) return;
      setStart({ row: cell.row, col: cell.col }); setRobot({ row: cell.row, col: cell.col }); resetResults(); return;
    }
    if (editMode === 'goal') {
      if (cell.isWall || sameCell(cell, start)) return;
      setGoal({ row: cell.row, col: cell.col }); resetResults(); return;
    }
    if (sameCell(cell, start) || sameCell(cell, goal)) return;
    setGrid((current) => current.map((row) => row.map((item) => sameCell(item, cell) ? { ...item, isWall: !item.isWall } : item)));
    resetResults();
  }

  function runSelected() {
    const nextResult = ALGORITHMS[algorithm](grid, start, goal);
    setResult(nextResult); setRobot(start);
    setStatus(nextResult.found ? `${nextResult.algorithm} found a route` : 'No route found — check obstacles');
  }

  function runComparison() {
    const nextComparisons = [astar(grid, start, goal), bfs(grid, start, goal), dfs(grid, start, goal)];
    setComparisons(nextComparisons);
    const selected = nextComparisons.find((item) => item.algorithm === (algorithm === 'astar' ? 'A*' : algorithm.toUpperCase()));
    setResult(selected ?? nextComparisons[0]); setRobot(start);
    setStatus('Comparison completed on the same warehouse layout');
  }

  async function animateRobot() {
    const nextResult = ALGORITHMS[algorithm](grid, start, goal);
    setResult(nextResult); setRobot(start);
    if (!nextResult.found) { setStatus('No route available to animate'); return; }
    setIsAnimating(true); setStatus('Robot is moving along the route');
    for (const cell of nextResult.path) {
      setRobot(cell);
      await new Promise((resolve) => window.setTimeout(resolve, 75));
    }
    setIsAnimating(false); setStatus('Delivery destination reached');
  }

  function clearPath() { setResult(null); setComparisons([]); setRobot(start); setStatus('Path cleared'); }
  function clearWalls() { setGrid(createGrid(grid.length, grid[0].length)); clearPath(); setStatus('All obstacles cleared'); }
  function randomize() { setGrid((current) => generateRandomWalls(current, start, goal)); clearPath(); setStatus('Random warehouse layout generated'); }

  function addTask(task) {
    if (task.row < 0 || task.row >= grid.length || task.col < 0 || task.col >= grid[0].length) {
      setStatus(`Task coordinates must be within rows 1–${grid.length} and columns 1–${grid[0].length}`); return;
    }
    if (grid[task.row][task.col].isWall) { setStatus('Choose a pickup cell without an obstacle'); return; }
    setTasks((current) => [...current, task]); setStatus(`Queued task: ${task.label}`);
  }

  async function runTaskQueue() {
    if (!tasks.length || isAnimating) return;
    setIsAnimating(true);
    let current = start;
    for (const task of tasks) {
      const destination = { row: task.row, col: task.col };
      const nextResult = astar(grid, current, destination);
      setResult(nextResult);
      if (!nextResult.found) { setStatus(`No route to ${task.label}`); setIsAnimating(false); return; }
      for (const cell of nextResult.path) {
        setRobot(cell);
        await new Promise((resolve) => window.setTimeout(resolve, 55));
      }
      current = destination;
    }
    setIsAnimating(false); setStatus('All queued pickup tasks completed');
  }

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">⬡</span><span>WAREHOUSE<span className="brand-light">LAB</span><small>PATHFINDING SIMULATOR</small></span></a><div className="topbar-right"><span className="online-indicator"><span /> SIMULATION ONLINE</span><span className="version-tag">v1.0</span></div></header>
      <div className="page-content" id="top">
        <section className="hero"><div><p className="eyebrow">ADVANCED DATA STRUCTURES & ALGORITHM ANALYSIS</p><h1>Warehouse Robot <span>Pathfinding</span></h1><p className="hero-copy">Design a route. Visualize the search. Understand the algorithm.</p></div><div className="hero-chip"><img src="/robot.svg" alt=""/><div><strong>Autonomous agent</strong><small>Grid-based navigation</small></div></div></section>
        <div className="overview-strip"><Overview label="GRID SIZE" value={`${grid[0].length} × ${grid.length}`} /><Overview label="OBSTACLES" value={wallCount} /><Overview label="START NODE" value={`(${start.row + 1}, ${start.col + 1})`} /><Overview label="DESTINATION" value={`(${goal.row + 1}, ${goal.col + 1})`} /></div>
        <div className="main-layout">
          <div className="left-column">
            <MetricsPanel result={result} comparisons={comparisons}/>
            <section className="panel warehouse-panel"><div className="section-heading"><div><p className="eyebrow">LIVE ENVIRONMENT</p><h2>Warehouse map</h2></div><div className="map-actions"><button className="button small secondary" onClick={runComparison} disabled={isAnimating}>Compare algorithms</button><button className="button small ghost" onClick={runSelected} disabled={isAnimating}>Run selected</button></div></div><div className="legend"><span><i className="legend-start"/> Start</span><span><i className="legend-goal"/> Destination</span><span><i className="legend-wall"/> Shelf / obstacle</span><span><i className="legend-explored"/> Explored</span><span><i className="legend-path"/> Final path</span></div><WarehouseGrid grid={grid} start={start} goal={goal} path={result?.path ?? []} explored={result?.explored ?? []} robot={robot} onCellClick={handleCellClick} isAnimating={isAnimating}/><div className="map-footer"><span>Click cells to edit the warehouse</span><span>Moves: up · down · left · right</span></div></section>
          </div>
          <aside className="right-column"><ControlPanel algorithm={algorithm} setAlgorithm={setAlgorithm} editMode={editMode} setEditMode={setEditMode} onRun={runSelected} onAnimate={animateRobot} onClearPath={clearPath} onClearWalls={clearWalls} onRandomize={randomize} isAnimating={isAnimating} status={status}/><TaskManager tasks={tasks} onAddTask={addTask} onRemoveTask={(id) => setTasks((current) => current.filter((task) => task.id !== id))} onClearTasks={() => setTasks([])} disabled={isAnimating}/><button className="button primary full-width" onClick={runTaskQueue} disabled={isAnimating || tasks.length === 0}>Run pickup queue</button></aside>
        </div>
        <footer className="footer"><span>WAREHOUSELAB <span>·</span> Educational algorithm simulator</span><span>Built with React · A* · BFS · DFS</span></footer>
      </div>
    </main>
  );
}

function Overview({ label, value }) {
  return <div className="overview-item"><span>{label}</span><strong>{value}</strong></div>;
}
