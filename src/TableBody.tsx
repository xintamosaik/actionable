import { useState } from 'react'
import type { TodoItem } from './types.ts'

import ValueCell from './ValueCell.tsx'
import EffortCell from './EffortCell.tsx'
import EditableTextCell from './EditableTextCell.tsx'
import DueCell from './DueCell.tsx'
import StateCell from './StateCell.tsx'

import { calcDaysLeft, calcRatio, calcUrgency, urgencyLabels, priority } from './utils.ts'

type PlusButtonProps = {
    show: Boolean;
    onClick: () => void;
};

function PlusButton({ show, onClick }: PlusButtonProps) {
    const style = {
        backgroundColor: 'Canvas',
        border: 'none',
    }

    return (
        <button type="button" style={style} title="Add Subtask" onClick={onClick}>
            {show ? '➖' : '➕'}
        </button>
    );
}

type TodoRowProps = {
    item: TodoItem;
    onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void;
}

function TodoRow({ item, onUpdateTodo }: TodoRowProps) {
    const daysLeft = calcDaysLeft(item.duedate);
    const ratio = calcRatio(item.duedate, item.effort);
    const urgency = calcUrgency(ratio);

    const [showNoteEditor, setShowNoteEditor] = useState(false);
    function handleClickOnNote() {
        showNoteEditor ? setShowNoteEditor(false) : setShowNoteEditor(true);
    }

    const [showDependencies, setShowDependencies] = useState(false);
    const [showAddDependencyInput, setShowAddDependencyInput] = useState(false);

    if (showNoteEditor) {
        return (
            <tr>
                <td colSpan={10}>
                    <h1 style={{ marginBottom: '0.5em' }}>Edit Notes</h1>
                    <h2>Task: {item.task}</h2>

                    <textarea
                        autoFocus
                        style={{ width: '100%', height: '100px' }}
                        value={item.notes}
                        onChange={(e) => onUpdateTodo(item.id, { notes: e.target.value })}
                        onBlur={() => setShowNoteEditor(false)}
                    />
                </td>
            </tr>
        );
    }

    return (
        <>
            <tr>
                <td>
                    <EditableTextCell
                        value={item.task}
                        onChange={(newName: string) => onUpdateTodo(item.id, { task: newName })}
                    />
                    <PlusButton show={showDependencies} onClick={() => setShowDependencies((v) => !v)} />
                </td>
                <td>
                    <StateCell
                        state={item.state}
                        onChange={(newState) => onUpdateTodo(item.id, { state: newState })}
                    />
                </td>
                <td>
                    <span style={{ fontWeight: item.state === 'DONE' ? 'lighter' : 'bold', color: item.state === 'DONE' ? 'gray' : 'CanvasText' }}>
                        {priority(item.value, urgency) * 4}%
                    </span>
                </td>
                <td>
                    <ValueCell
                        value={item.value}
                        onChange={(newValue) => onUpdateTodo(item.id, { value: newValue })}
                    />
                </td>
                <td>
                    <span style={{ fontWeight: item.state === 'DONE' ? 'lighter' : 'bold', color: item.state === 'DONE' ? 'gray' : 'CanvasText' }}>
                        {urgencyLabels[urgency]}
                    </span>
                </td>
                <td>
                    <EffortCell
                        effort={item.effort}
                        onChange={(newEffort) => onUpdateTodo(item.id, { effort: newEffort })}
                    />
                </td>
                <td>
                    <EditableTextCell
                        value={item.responsible}
                        onChange={(newName: string) => onUpdateTodo(item.id, { responsible: newName })}
                    />
                </td>
                <td>
                    <EditableTextCell
                        value={item.collaboration ?? ''}
                        onChange={(newName: string) => onUpdateTodo(item.id, { collaboration: newName || undefined })}
                    />
                </td>
                <td>
                    <DueCell
                        date={item.duedate ? item.duedate : ''}
                        onChange={(newDate: string) => onUpdateTodo(item.id, { duedate: newDate })}
                    ></DueCell>
                    <span style={{ fontWeight: item.state === 'DONE' ? 'lighter' : 'bold', color: item.state === 'DONE' ? 'gray' : 'CanvasText', marginLeft: '1ch' }}>
                        {daysLeft !== null ? ` ${daysLeft} days left` : ''}
                    </span>
                </td>
                <td>
                    <div onClick={handleClickOnNote} style={{ cursor: 'pointer', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                        {item.notes ? item.notes : <span style={{ fontStyle: 'italic', color: 'gray' }}>Add notes...</span>}
                    </div>
                </td>
            </tr>
            {showDependencies && (
                <>
                    <tr>
                        <td colSpan={10}>
                            <h2>Dependencies</h2>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10}>
                            {showAddDependencyInput ? (
                                <div>
                                    <input type="text" autoFocus />
                                    { // I AM FUMBLING OVER THIS
                                    }
                                </div>
                            ) : (
                                <button className="primary" onClick={() => setShowAddDependencyInput((v) => !v)}>
                                    + Add Dependency
                                </button>
                            )}
                        </td>
                    </tr>
                </>
            )}

        </>
    );
}

function TableBody({ todos, onUpdateTodo }: { todos: TodoItem[]; onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void; }) {
    return (
        <tbody>
            {todos.map((item) => (
                <TodoRow key={item.id} item={item} onUpdateTodo={onUpdateTodo} />
            ))}
        </tbody>
    )
}

export default TableBody;