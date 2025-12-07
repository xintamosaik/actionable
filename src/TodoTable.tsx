import { useState, useMemo } from 'react'
import TableHeader from './TableHeader.tsx'
import TableBody from './TableBody.tsx'

import type { TodoItem } from './types.ts'
type TodoTableProps = {
    todos: TodoItem[];
    onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void;
}

function compareByValueThenUrgency(a: TodoItem, b: TodoItem, direction: 'asc' | 'desc') {
  const va = Number(a.value)
  const vb = Number(b.value)
  if (va !== vb) return direction === 'asc' ? va - vb : vb - va

  const ua = Number(a.urgency)
  const ub = Number(b.urgency)
  return direction === 'asc' ? ua - ub : ub - ua
}

function TodoTable({ todos, onUpdateTodo }: TodoTableProps) {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const sortedTodos = useMemo(() => {
        const copy = [...todos];
        copy.sort((a, b) => compareByValueThenUrgency(a, b, sortDirection));
        return copy;
    }, [todos, sortDirection]);

    return (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <TableHeader sortDirection={sortDirection} onToggleSort={() => setSortDirection((s) => s === 'asc' ? 'desc' : 'asc')} />
            <TableBody todos={sortedTodos} onUpdateTodo={onUpdateTodo} />
        </table>
    );
}

export default TodoTable;