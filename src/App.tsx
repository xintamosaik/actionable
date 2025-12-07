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
  const [filter, setFilter] = useState<Filter>('IN_PROGRESS');
  const counts = countByFilter(todos)
  const updateTodo = useCallback(
    (id: string, patch: Partial<TodoItem>) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)));
    },
    [setTodos]
  );
  const filteredTodos = filterTodos(todos, filter);

  return (
    <>
      <div style={{ display: 'flex', gap: '1ch', marginBottom: '1em' }}>
        <TaskAddForm onAdd={(todo) => setTodos((prev) => [...prev, todo])} />
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5ch' }}
            className={filter === id ? 'secondary active' : 'secondary'}
            onClick={() => setFilter(id)}
            aria-pressed={filter === id}
          >
            {label} 
            <span style={{padding: "1ch", backgroundColor: "Canvas", borderRadius: "42%"}}>{counts[id]}</span>
            
          </button>
        ))}
      </div>
      <div>
        <TodoTable todos={filteredTodos} onUpdateTodo={updateTodo} />
      </div>

  
    </>
  );
}

export default App
