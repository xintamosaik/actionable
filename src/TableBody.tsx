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
const Priority = (value: Value, duedate: string, effort: Effort): number => {
    const valueNumeric = Number(value);
    const urgencyNumeric = Urgency(duedate, effort); // Highest urgency is loest number (and negatives are overdue)
    console.log("Calculating priority for value:", valueNumeric, "and urgency:", urgencyNumeric);
    return valueNumeric * -urgencyNumeric;
}
const DaysLeft = (duedate: string) => { // shitty algorithm
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

const EffortInDays = (effort: Effort) => {
    switch (effort) {
        case 'MINUTES':
            return 1;
        case 'HOURS':
            return 1;
        case 'DAYS':
            return 3;
        case 'WEEKS':
            return 3*7;
        case 'MONTHS':
            return 3*30;
        default:
            return 3;
    }
}

const Urgency = (duedate: string, effort: Effort): number => {
    const daysLeft = DaysLeft(duedate);
    if (daysLeft === null) {
        return 180; // Default urgency for invalid dates
    }
    const effortInDays = EffortInDays(effort);
    console.log("Calculating urgency for days left:", daysLeft, "and effort in days:", effortInDays);
    return daysLeft - effortInDays;
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
            <td>{Priority(item.value, item.duedate ? item.duedate : '', item.effort)}</td>
            <td>
                <ValueCell
                    value={item.value}
                    onChange={(newValue) => onUpdateTodo(item.id, { value: newValue })}
                />
            </td>
            <td>
                { Urgency(item.duedate ? item.duedate : '', item.effort) }
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
                    value={item.collaboration ??''}
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