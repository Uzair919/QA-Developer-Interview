import TaskList from './TaskList.jsx';

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 480, margin: '3rem auto' }}>
      <h1>Task Tracker</h1>
      <TaskList />
    </main>
  );
}
