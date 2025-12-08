import type { Effort, Value } from './types.ts'

const DEFAULT_TIME_PRESSURE = 180

const priority = (value: Value, urgency: Value): number => Number(value) * urgency;

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

    return left / effortInDays[effort];;
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

export { calcDaysLeft, calcRatio, calcUrgency, urgencyLabels, priority };