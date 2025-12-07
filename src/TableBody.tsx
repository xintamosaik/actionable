import ValueCell from './ValueCell.tsx'
import EffortCell from './EffortCell.tsx'
import EditableTextCell from './EditableTextCell.tsx'
import type { TodoItem, Value } from './types.ts'
import StateCell from './StateCell.tsx'

const Priority = (value: Value, urgency: Value): number => {
    const valueNumeric = Number(value);
    const urgencyNumeric = Number(urgency);

    return Math.floor((valueNumeric * 2 + urgencyNumeric) / 15 * 100)
}

function TodoRow({
    item,
    onUpdateTodo,
}: {
    item: TodoItem;
    onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void;
}) {
    return (
        <tr style={{ borderBottom: '1px solid #ccc' }}>
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
            <td>{Priority(item.value, item.urgency)}%</td>

            <td>
                <ValueCell
                    value={item.value}
                    onChange={(newValue) => onUpdateTodo(item.id, { value: newValue })}
                />
            </td>

            <td>
                <ValueCell
                    value={item.urgency}
                    onChange={(newUrgency) => onUpdateTodo(item.id, { urgency: newUrgency })}
                />
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
                    value={item.collaboration ? item.collaboration : ''}
                    onChange={(newName: string) => onUpdateTodo(item.id, { collaboration: newName })}
                />

            </td>

            <td>{item.duedate ? item.duedate : ''}</td>
            <td>{item.notes ? item.notes : ''}</td>
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