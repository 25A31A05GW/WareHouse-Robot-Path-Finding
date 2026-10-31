export default function ControlPanel({ algorithm, setAlgorithm, editMode, setEditMode, onRun, onAnimate, onClearPath, onClearWalls, onRandomize, isAnimating, status }) {
  return (
    <section className="panel controls-panel">
      <div className="section-heading"><div><p className="eyebrow">CONTROL CENTER</p><h2>Plan a route</h2></div><span className="live-pill"><span /> SIMULATION</span></div>
      <label className="field-label" htmlFor="algorithm">Pathfinding algorithm</label>
      <select id="algorithm" value={algorithm} onChange={(event) => setAlgorithm(event.target.value)} disabled={isAnimating}>
        <option value="astar">A* Search</option><option value="bfs">Breadth-First Search (BFS)</option><option value="dfs">Depth-First Search (DFS)</option>
      </select>
      <label className="field-label" htmlFor="edit-mode">Grid editing mode</label>
      <select id="edit-mode" value={editMode} onChange={(event) => setEditMode(event.target.value)} disabled={isAnimating}>
        <option value="wall">Place / remove obstacles</option><option value="start">Move start position</option><option value="goal">Move destination</option>
      </select>
      <div className="button-stack">
        <button className="button primary" onClick={onRun} disabled={isAnimating}>Find path</button>
        <button className="button secondary" onClick={onAnimate} disabled={isAnimating}>Animate robot</button>
        <div className="button-row"><button className="button ghost" onClick={onClearPath} disabled={isAnimating}>Clear path</button><button className="button ghost" onClick={onClearWalls} disabled={isAnimating}>Clear walls</button></div>
        <button className="button ghost" onClick={onRandomize} disabled={isAnimating}>Generate random layout</button>
      </div>
      <div className="status-box"><span className="status-dot" /><div><strong>System status</strong><p>{status}</p></div></div>
    </section>
  );
}
