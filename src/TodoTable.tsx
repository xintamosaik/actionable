import React from 'react'
import TableHeader from './TableHeader.tsx'
import TableBody from './TableBody.tsx'


import type { TodoItem } from './types.ts'




function TodoTable({
    todos,
    onUpdateTodo,
}: {
    todos: TodoItem[];
    onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void;
}) {
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

    const sortedTodos = React.useMemo(() => {
        const copy = [...todos];
        copy.sort((a, b) => {
            const va = Number(a.value);
            const vb = Number(b.value);
            if (va !== vb) {
                return sortDirection === 'asc' ? va - vb : vb - va;
            }
            const ua = Number(a.urgency);
            const ub = Number(b.urgency);
            return sortDirection === 'asc' ? ua - ub : ub - ua;
        });
        return copy;
    }, [todos, sortDirection]);

    return (
        <table style ={{ borderCollapse: 'collapse', width: '100%' }}>
            <TableHeader sortDirection={sortDirection} onToggleSort={() => setSortDirection((s) => s === 'asc' ? 'desc' : 'asc')} />
            <TableBody todos={sortedTodos} onUpdateTodo={onUpdateTodo} />
        </table>
    );
}

export default TodoTable;