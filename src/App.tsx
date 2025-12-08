import './App.css'
import { useState, useCallback } from 'react'
import useLocalStorage from './Localstore.ts'
import type { TodoItem, State } from './types.ts'

import TaskAddForm from './TaskAddForm.tsx'
import TodoTable from './TodoTable.tsx'
type Filter = 'ALL' | State
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'IN_PROGRESS', label: 'In progress' },
  { id: 'WAITING', label: 'Waiting' },
  { id: 'DONE', label: 'Done' },
  { id: 'ALL', label: 'All' },
]
function filterTodos(todos: TodoItem[], filter: Filter): TodoItem[] {
  if (filter === 'ALL') return todos
  return todos.filter(todo => todo.state === filter)
}
function countByFilter(todos: TodoItem[]): Record<Filter, number> {
  const counts: Record<Filter, number> = {
    ALL: todos.length,
    IN_PROGRESS: 0,
    WAITING: 0,
    DONE: 0,
  }

  for (const todo of todos) {
    counts[todo.state] += 1
  }

  return counts
}


function App() {

  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todox.todos', []);
  const [more, setMore] = useState(false);
  const [filter, setFilter] = useState<Filter>('IN_PROGRESS');
  const counts = countByFilter(todos)
  const updateTodo = useCallback(
    (id: string, patch: Partial<TodoItem>) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)));
    },
    [setTodos]
  );
  const filteredTodos = filterTodos(todos, filter);
  function exportTodos(todos: TodoItem[]) {
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todos, null, 2)));
  downloadAnchorNode.setAttribute("download", "todos.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importTodos(uploadFn: (todos: TodoItem[]) => void) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedTodos: TodoItem[] = JSON.parse(content);

        console.log('Imported todos:', importedTodos);
        uploadFn(importedTodos);

      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };
  input.click();

}
  return (
    <>
      <div style={{ display: 'flex', gap: '1ch', marginBottom: '1em' }}>
        <TaskAddForm onAdd={(todo) => setTodos((prev) => [...prev, todo])} />
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5ch' }}
            className={filter === id ? 'secondary active' : 'secondary inactive'}
            onClick={() => setFilter(id)}
            aria-pressed={filter === id}
          >
            {label}
            <span style={{ padding: "1ch", backgroundColor: "Canvas", borderRadius: "42%" }}>{counts[id]}</span>
          </button>
        ))}
        <button className="secondary" onClick={() => setMore((prev) => !prev)}>
          {more ? 'Less' : 'More'}
        </button>
        {more && (
          <button className="secondary" onClick={() => importTodos(setTodos)}>
            Import
          </button>
        )}
        {more && (
          <button className="secondary" onClick={() => exportTodos(todos)}>
            Export
          </button>
        )}
        {more && (
          <button className="secondary" onClick={() => setTodos([])}>
            Clear All
          </button>
        )}
      </div>
      <div>
        <TodoTable todos={filteredTodos} onUpdateTodo={updateTodo} />
      </div>


    </>
  );
}

export default App
