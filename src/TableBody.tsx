import type { TodoItem } from './types.ts'
import ValueCell from './ValueCell.tsx'
import EffortCell from './EffortCell.tsx'
import EditableTextCell from './EditableTextCell.tsx'
import DueCell from './DueCell.tsx'
import StateCell from './StateCell.tsx'
import { calcDaysLeft, calcRatio, calcUrgency, urgencyLabels, priority } from './utils.ts'

type TodoRowProps = {
    item: TodoItem;
    onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void;
}



function TodoRow({ item, onUpdateTodo }: TodoRowProps) {
    const daysLeft = calcDaysLeft(item.duedate);
    const ratio = calcRatio(item.duedate, item.effort);
    const urgency = calcUrgency(ratio);

    return (
        <tr>
            <td>
                <EditableTextCell
                    value={item.task}
                    onChange={(newName: string) => onUpdateTodo(item.id, { task: newName })}
                />
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
                <EditableTextCell
                    value={item.notes ? item.notes : ''}
                    onChange={(newName: string) => onUpdateTodo(item.id, { notes: newName })}
                />
            </td>
        </tr>
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