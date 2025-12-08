import type { Effort, TodoItem, Value } from './types.ts'
import ValueCell from './ValueCell.tsx'
import EffortCell from './EffortCell.tsx'
import EditableTextCell from './EditableTextCell.tsx'
import DueCell from './DueCell.tsx'
import StateCell from './StateCell.tsx'

type TodoRowProps = {
    item: TodoItem;
    onUpdateTodo: (id: string, patch: Partial<TodoItem>) => void;
}

const DEFAULT_TIME_PRESSURE = 180

const priority = (value: Value, duedate: string, effort: Effort): number => {
    const valueNumeric = Number(value);
    const urgencyNumeric = urgency(duedate, effort); // Highest urgency is loest number (and negatives are overdue)
    return urgencyNumeric / valueNumeric;
}
const daysLeft = (duedate: string) => { // shitty algorithm
    const convertedTimestamp = new Date(duedate).getTime();
    console.log("Converted timestamp for duedate", duedate, "is", convertedTimestamp);
    if (isNaN(convertedTimestamp)) {
        return null; // Invalid date
    }

    const currentTimestamp = new Date().getTime();
    const millisecondsInADay = 24 * 60 * 60 * 1000;

    const differenceInMilliseconds = convertedTimestamp - currentTimestamp;
    const differenceInDays = Math.ceil(differenceInMilliseconds / millisecondsInADay);

    return differenceInDays;
}

const effortInDays = (effort: Effort) => {
    switch (effort) {
        case 'MINUTES':
            return 1;
        case 'HOURS':
            return 1;
        case 'DAYS':
            return 3;
        case 'WEEKS':
            return 21;
        case 'MONTHS':
            return 90;
        default:
            return 3;
    }
}


const urgency = (duedate: string, effort: Effort): number => {
    const left = daysLeft(duedate);

    const needed = effortInDays(effort);

    if (left === null) {
        return DEFAULT_TIME_PRESSURE - needed;
    } else {
        return left - needed;
    }
}

function TodoRow({ item, onUpdateTodo }: TodoRowProps) {
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
            <td>{priority(item.value, item.duedate ? item.duedate : '', item.effort)}</td>
            <td>
                <ValueCell
                    value={item.value}
                    onChange={(newValue) => onUpdateTodo(item.id, { value: newValue })}
                />
            </td>
            <td>
                {urgency(item.duedate ? item.duedate : '', item.effort)}
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