import { useState, useMemo } from 'react'
import TableHeader from './TableHeader.tsx'
import TableBody from './TableBody.tsx'

import { calcRatio, calcUrgency, priority } from './utils.ts'

import type { TodoItem } from './types.ts'
type TodoTableProps = {
    todos: TodoItem[];
    onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void;
}

function compareByValueThenUrgency(a: TodoItem, b: TodoItem, direction: 'asc' | 'desc') {

    const ua = calcUrgency(calcRatio(a.duedate, a.effort))
    const pa = priority(a.value, ua)

    const ub = calcUrgency(calcRatio(b.duedate, b.effort))
    const pb = priority(b.value, ub)

    if (pa === pb) {
        return direction === 'asc' ? ua - ub : ub - ua;
    }
    return direction === 'asc' ? pa - pb : pb - pa;
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