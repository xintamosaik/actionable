import './App.css'
import {useState, useCallback} from 'react'
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
  const [filter, setFilter] = useState<Filter>('IN_PROGRESS');

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
        <button className={filter === 'IN_PROGRESS' ? 'secondary active' : 'secondary'} onClick={() => setFilter('IN_PROGRESS')}>
          In progress
        </button>
        <button className={filter === 'WAITING' ? 'secondary active' : 'secondary'} onClick={() => setFilter('WAITING')}>
          Waiting
        </button>
        <button className={filter === 'DONE' ? 'secondary active' : 'secondary'} onClick={() => setFilter('DONE')}>
          Done
        </button>
        <button className={filter === 'ALL' ? 'secondary active' : 'secondary'} onClick={() => setFilter('ALL')}>
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
