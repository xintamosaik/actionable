import './App.css'
import React from 'react'
import useLocalStorage from './Localstore.ts'
import type { TodoItem } from './types.ts'

import TaskAddForm from './TaskAddForm.tsx'
import TodoTable from './TodoTable.tsx'
function filterTodos(todos: TodoItem[], filter: 'ALL' | 'IN_PROGRESS' | 'WAITING' | 'DONE'): TodoItem[] {
  switch (filter) {
    case 'IN_PROGRESS':
      return todos.filter((todo) => todo.state === 'IN_PROGRESS')
    case 'WAITING':
      return todos.filter((todo) => todo.state === 'WAITING')
    case 'DONE':
      return todos.filter((todo) => todo.state === 'DONE')
    case 'ALL':
    default:
      return todos
  }
}
function App() {

  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todox.todos', []);
  const [filter, setFilter] = React.useState<'ALL' | 'IN_PROGRESS' | 'WAITING' | 'DONE'>('ALL');

  const updateTodo = React.useCallback(
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
        <button onClick={() => setFilter('IN_PROGRESS')}>
          In progress
        </button>
        <button onClick={() => setFilter('WAITING')}>
          Waiting
        </button>
        <button onClick={() => setFilter('DONE')}>
          Done
        </button>
        <button onClick={() => setFilter('ALL')}>
          All
        </button>
      </div>

      <div>
        <TodoTable todos={filteredTodos} onUpdateTodo={updateTodo} />
      </div>

    </>
  );
}

export default App
