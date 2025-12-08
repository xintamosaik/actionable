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

const priority = (value: Value, urgency: Value): number => {
    const valueNumeric = Number(value); // will be 1-5
    const priorityScore = valueNumeric * urgency;
    return priorityScore;
}

const calcDaysLeft = (duedate: string | undefined) => { // shitty algorithm
    if (!duedate) return null

    const convertedTimestamp = new Date(duedate).getTime()
    if (Number.isNaN(convertedTimestamp)) return null

    const currentTimestamp = new Date().getTime();
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = convertedTimestamp - currentTimestamp;

    return Math.ceil(differenceInMilliseconds / millisecondsInADay);
}

const effortInDays = {
    MINUTES: 1,
    HOURS: 1,
    DAYS: 3,
    WEEKS: 21,
    MONTHS: 90
}

const calcRatio = (duedate: string | undefined, effort: Effort): number => {
    const left = calcDaysLeft(duedate) ?? DEFAULT_TIME_PRESSURE;
    const needed = effortInDays[effort]; // this will throw an Error and that's what I want

    return  left / needed;
}

const calcUrgency = (ratio: number): Value => {
    if (ratio <= 0.25) return 5;
    if (ratio <= 0.75) return 4;
    if (ratio <= 1.5) return 3;
    if (ratio <= 4) return 2;
    return 1
}

const urgencyLabels: Record<Value, string> = {
    5: "MAX",
    4: "High",
    3: "Medium",
    2: "Low",
    1: "MIN"
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
            <td>{priority(item.value, urgency) * 4}%</td>
            <td>
                <ValueCell
                    value={item.value}
                    onChange={(newValue) => onUpdateTodo(item.id, { value: newValue })}
                />
            </td>
            <td>
                {urgencyLabels[urgency]}
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
                {daysLeft !== null ? ` ${daysLeft} days left` : ''}
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