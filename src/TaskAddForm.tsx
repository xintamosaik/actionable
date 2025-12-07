import {useState} from 'react';
import type { FormEvent } from 'react';
import type { TodoItem } from './types.ts'

function TaskAddForm({ onAdd }: { onAdd: (todo: TodoItem) => void }) {
    const [adding, setAdding] = useState(false);
    const [taskInput, setTaskInput] = useState('');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const trimmed = taskInput.trim();
        if (!trimmed) return;

        const newTodo: TodoItem = {
            id: crypto.randomUUID(),
            task: trimmed,
            value: 3,
            urgency: 3,
            effort: 'MINUTES',
            responsible: 'unassigned',
            state: 'WAITING',
            duedate: undefined,
            notes: '',
        };

        onAdd(newTodo);
        setTaskInput('');
        setAdding(false);
    }

    function onAddTask() {
        setAdding(true);
    }

    function handleEscape(event: React.KeyboardEvent) {
        if (event.key === 'Escape') {
            setAdding(false);
        }
    }

    return adding ? (
        <form onSubmit={handleSubmit} onKeyUp={handleEscape}>
            <label htmlFor="task">Task</label>
            <input
                id="task"
                type="text"
                placeholder="Get milk"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                autoFocus
            />
            <button type="button" onClick={() => setAdding(false)}>Cancel</button>
        </form>
    ) : (
        <button type="button" className="primary" onClick={onAddTask}>+ Add Task</button>
    );
}

export default TaskAddForm;