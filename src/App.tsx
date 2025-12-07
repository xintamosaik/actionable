import './App.css'
import React from 'react'
import useLocalStorage from './Localstore.ts'
import type { TodoItem, State } from './types.ts'

import TaskAddForm from './TaskAddForm.tsx'
import TodoTable from './TodoTable.tsx'
type Filter = 'ALL' | State

function filterTodos(todos: TodoItem[], filter: Filter): TodoItem[] {
  if (filter === 'ALL') return todos
  return todos.filter(todo => todo.state === filter)
}
function App() {

  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todox.todos', []);
  const [filter, setFilter] = React.useState<Filter>('ALL');

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
