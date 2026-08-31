import { useState, useEffect } from 'react';

const FILTERS = ['all', 'active', 'done'];

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then((r) => r.json())
      .then(setTasks)
      .catch(() => setError('Could not load tasks'));
  }, []);

  async function addTask() {
    setError(null);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        setError('Could not add task');
        return;
      }
      const created = await res.json();
      setTasks((current) => [...current, created]);
      setTitle('');
    } catch {
      setError('Could not add task');
    }
  }

  async function toggle(id) {
    const res = await fetch(`/api/tasks/${id}/toggle`, { method: 'PATCH' });
    if (!res.ok) return;
    const updated = await res.json();
    setTasks((current) => current.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function remove(id) {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) return;
    setTasks((current) => current.filter((t) => t.id !== id));
  }

  const visible = tasks.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <div>
      <input
        aria-label="New task"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      {error && <p role="alert">{error}</p>}

      <div role="group" aria-label="Filter">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>
            {f}
          </button>
        ))}
      </div>

      <ul>
        {visible.map((t) => (
          <li key={t.id} data-testid="task-item">
            <input
              type="checkbox"
              checked={t.done}
              aria-label={`Toggle ${t.title}`}
              onChange={() => toggle(t.id)}
            />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
            <button aria-label={`Delete ${t.title}`} onClick={() => remove(t.id)}>
              x
            </button>
          </li>
        ))}
      </ul>

      <p data-testid="counter">{tasks.length} items left</p>
    </div>
  );
}
