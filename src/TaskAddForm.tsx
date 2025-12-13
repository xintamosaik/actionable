import { useState, type FormEvent, type KeyboardEvent } from 'react';
import type { TodoItem } from './types.ts'

function TaskAddForm({ onAdd }: { onAdd: (todo: TodoItem) => void }) {
    const [adding, setAdding] = useState(false);
    const [taskInput, setTaskInput] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = taskInput.trim();
        if (!trimmed) return;

        const newTodo: TodoItem = {
            id: crypto.randomUUID(),
            task: trimmed,
            value: 3,
            urgency: 3,
            effort: 'MINUTES',
            responsible: 'Unassigned',
            state: 'WAITING',
            duedate: undefined,
            notes: '',
            dependencies: [],
        };

        onAdd(newTodo);
        setTaskInput('');
        setAdding(false);
    }

    function onAddTask() {
        setAdding(true);
    }

    function handleEscape(event: KeyboardEvent<HTMLFormElement>) {
        if (event.key === 'Escape') {
            setAdding(false);
        }
    }

    return adding ? (
        <form onSubmit={handleSubmit} onKeyUp={handleEscape} style={{ display: 'inline-flex', gap: '1ch', alignItems: 'center' }}>
            <label htmlFor="task">Name your task</label>
            <input
                id="task"
                type="text"
                placeholder="Get milk"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setAdding(false); }}
                autoFocus
            />
            <button type="submit" className="primary">Add</button>
            <button type="button" onClick={() => setAdding(false)}>Cancel</button>
        </form>
    ) : (
        <button type="button" className="primary" onClick={onAddTask}>+ Add Task</button>
    );
}

export default TaskAddForm;