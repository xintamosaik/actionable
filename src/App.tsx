import './App.css'
import React from 'react'
import useLocalStorage from './Localstore.ts'
import type { TodoItem } from './types.ts'

import TaskAddForm from './TaskAddForm.tsx'
import TodoTable from './TodoTable.tsx'

function App() {

  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todox.todos', []);

  const updateTodo = React.useCallback(
    (id: string, patch: Partial<TodoItem>) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)));
    },
    [setTodos]
  );

  return (
    <>
      <TaskAddForm onAdd={(todo) => setTodos((prev) => [...prev, todo])} />
      <TodoTable todos={todos} onUpdateTodo={updateTodo} />
    </>
  );
}

export default App
