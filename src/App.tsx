import './App.css'
import { useState, useCallback, useRef, type ChangeEvent } from 'react'
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
  return todos.filter((todo) => todo.state === filter)
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
  const [showDeleteDialog, setShowDeleteDialog] = useState<Boolean>(false);
  const counts = countByFilter(todos)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const updateTodo = useCallback(
    (id: string, patch: Partial<TodoItem>) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)));
    },
    [setTodos]
  );
  const filteredTodos = filterTodos(todos, filter);

  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify(todos, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'todos.json'
    a.click()

    URL.revokeObjectURL(url)
  }, [todos])

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const importedTodos: TodoItem[] = JSON.parse(content)

          setTodos(importedTodos)
        } catch (error) {
          console.error('Error parsing JSON:', error)
        } finally {
          // allow selecting the same file again later
          event.target.value = ''
        }
      }
      reader.readAsText(file)
    },
    [setTodos],
  )

  const handleClearAll = useCallback(() => {
    setTodos([])
  }, [setTodos])

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
          <>
            <button className="secondary" type="button" onClick={handleImportClick}>
              Import
            </button>
            <button className="secondary" type="button" onClick={handleExport}>
              Export
            </button>
            <button className="secondary" type="button" onClick={() => setShowDeleteDialog(!showDeleteDialog)}>
              Clear All
            </button>
          </>
        )}

        {/* hidden file input for import */}
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {showDeleteDialog && (
          <div style={{ position: 'relative' }}>
            <div className="popup" style={{ boxSizing: 'content-box'}}>
              <p>Really?</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1ch' }}>
                <button className="secondary" onClick={() => setShowDeleteDialog(false)}>Cancel</button>
                <button className="danger" onClick={() => { handleClearAll(); setShowDeleteDialog(false); }}>Delete All</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <TodoTable todos={filteredTodos} onUpdateTodo={updateTodo} />
      </div>
    </>
  )
}

export default App
