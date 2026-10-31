import { useState } from 'react';

export default function TaskManager({ onAddTask, tasks, onRemoveTask, onClearTasks, disabled }) {
  const [label, setLabel] = useState('');
  const [row, setRow] = useState('');
  const [col, setCol] = useState('');

  function submit(event) {
    event.preventDefault();
    const parsedRow = Number(row) - 1;
    const parsedCol = Number(col) - 1;
    if (!label.trim() || row === '' || col === '') return;
    onAddTask({ id: crypto.randomUUID(), label: label.trim(), row: parsedRow, col: parsedCol });
    setLabel(''); setRow(''); setCol('');
  }

  return (
    <section className="panel task-panel">
      <div className="section-heading"><div><p className="eyebrow">PICKUP QUEUE</p><h2>Robot tasks</h2></div><span className="task-count">{tasks.length} queued</span></div>
      <form className="task-form" onSubmit={submit}>
        <label className="field-label" htmlFor="task-label">Task / item name</label><input id="task-label" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="e.g. Package A-14" maxLength={45} disabled={disabled} required />
        <div className="coordinate-fields"><div><label className="field-label" htmlFor="task-row">Row</label><input id="task-row" type="number" min="1" max="15" value={row} onChange={(event) => setRow(event.target.value)} placeholder="1–15" disabled={disabled} required /></div><div><label className="field-label" htmlFor="task-col">Column</label><input id="task-col" type="number" min="1" max="25" value={col} onChange={(event) => setCol(event.target.value)} placeholder="1–25" disabled={disabled} required /></div></div>
        <button className="button secondary" type="submit" disabled={disabled}>Add pickup task</button>
      </form>
      <div className="task-list">{tasks.length === 0 ? <p className="empty-tasks">No tasks yet. Add a pickup location to build the queue.</p> : tasks.map((task, index) => <div className="task-item" key={task.id}><span className="task-index">{index + 1}</span><div className="task-info"><strong>{task.label}</strong><small>Row {task.row + 1}, column {task.col + 1}</small></div><button className="remove-task" onClick={() => onRemoveTask(task.id)} aria-label={`Remove ${task.label}`} disabled={disabled}>×</button></div>)}</div>
      {tasks.length > 0 && <button className="button ghost full-width" onClick={onClearTasks} disabled={disabled}>Clear queue</button>}
      <p className="metrics-note">Tasks are processed in first-in, first-out order. The task queue is a demonstration of the Queue data structure.</p>
    </section>
  );
}
