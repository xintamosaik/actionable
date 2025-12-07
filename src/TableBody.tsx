import ValueCell from './ValueCell.tsx'
import EffortCell from './EffortCell.tsx'
import NameCell from './NameCell.tsx';
import OwnerCell from './OwnerCell.tsx';

import type { TodoItem, Value } from './types.ts'
import CollaborationCell from './CollaborationCell.tsx';



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
        <tr className={item.state === 'DONE' ? 'row-done' : ''} style={{ borderBottom: '1px solid #ccc' }}>
            <td>
                <NameCell
                    name={item.task}
                    onChange={(newName) => onUpdateTodo(item.id, { task: newName })}
                ></NameCell>
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
                <OwnerCell
                    owner={item.responsible}
                    onChange={(newName) => onUpdateTodo(item.id, { responsible: newName })}
                ></OwnerCell>
            </td>
            <td>
                <CollaborationCell
                    collaborator={item.collaboration ? item.collaboration : ''}
                    onChange={(newName) => onUpdateTodo(item.id, { collaboration: newName })}
                ></CollaborationCell>

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