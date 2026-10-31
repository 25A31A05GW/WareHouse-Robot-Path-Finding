export default function MetricsPanel({ result, comparisons }) {
  const data = comparisons.map((item) => ({
    name: item.algorithm,
    explored: item.explored.length,
    pathLength: Math.max(0, item.path.length - 1),
    found: item.found,
    elapsedMs: item.elapsedMs,
  }));
  const maxExplored = Math.max(1, ...data.map((item) => item.explored));
  return (
    <section className="panel metrics-panel" aria-live="polite">
      <div className="section-heading"><div><p className="eyebrow">ALGORITHM ANALYSIS</p><h2>Performance metrics</h2></div><span className="metric-icon">↗</span></div>
      <div className="metric-grid">
        <Metric label="Path length" value={result?.found ? result.path.length - 1 : '—'} detail="grid moves" />
        <Metric label="Nodes explored" value={result ? result.explored.length : '—'} detail="visited cells" />
        <Metric label="Execution time" value={result ? `${result.elapsedMs.toFixed(3)} ms` : '—'} detail="single run" />
        <Metric label="Path status" value={result ? (result.found ? 'Found' : 'Blocked') : 'Ready'} detail="current result" />
      </div>
      <div className="chart-heading"><h3>Explored nodes by algorithm</h3><span>{data.length ? 'Comparison results' : 'Click “Compare algorithms”'}</span></div>
      {data.length ? <>
        <div className="comparison-chart" role="img" aria-label="Bar chart comparing explored nodes for A star, BFS, and DFS">
          {data.map((item) => <div className="bar-row" key={item.name}>
            <span className="bar-label">{item.name}</span><div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(2, (item.explored / maxExplored) * 100)}%` }} /></div><strong className="bar-value">{item.explored}</strong>
          </div>)}
        </div>
        <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Algorithm</th><th>Path length</th><th>Time (ms)</th><th>Status</th></tr></thead><tbody>
          {data.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.found ? item.pathLength : '—'}</td><td>{item.elapsedMs.toFixed(3)}</td><td>{item.found ? 'Found' : 'Blocked'}</td></tr>)}
        </tbody></table></div>
      </> : <div className="chart-empty"><strong>No comparison yet</strong><span>Click “Compare algorithms” above the warehouse map to display the A*, BFS, and DFS graph here.</span></div>}
      <p className="metrics-note">Execution times vary by device and browser. Run multiple trials for a fair report.</p>
    </section>
  );
}
function Metric({ label, value, detail }) { return <div className="metric-card"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>; }
