export type ID = string;
export type Duedate = string;
export type Person = string;
export type Priority = 1 | 2 | 3 | 4 | 5;
export type Value = 1 | 2 | 3 | 4 | 5;
export type Effort = "MINUTES" | "HOURS" | "DAYS" | "WEEKS"  | "MONTHS";
export type State = "IN_PROGRESS" | "DONE" | "WAITING"

export type TodoItem = {
  id: string;
  task: string;
  value: Value;
  urgency: Value;
  effort: Effort;
  responsible: Person;
  collaboration?: Person;
  state: State;
  duedate?: Duedate;
  notes?: string;
  dependencies?: ID[];
}
