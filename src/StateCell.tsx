import { useState, type CSSProperties } from 'react';
import type { State } from './types.ts'
import colors from './colors.ts';
type StateCellProps = {
  state: State
  onChange: (state: State) => void
}
function StateCell({ state, onChange }: StateCellProps) {
  const options: State[] = ['WAITING', 'IN_PROGRESS', 'DONE',];
  const optionStyles: Record<State, CSSProperties> = {
    WAITING: { backgroundColor: colors.high },
    IN_PROGRESS: { backgroundColor: colors.normal },
    DONE: { backgroundColor: colors.low },
  }
  const optionLabels = {
    WAITING: 'Waiting',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
  }
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={optionStyles[state]}
      >
        {optionLabels[state]}
      </button>
    );
  }

  return (
    <dialog style={{ display: 'flex', flexDirection: 'column', }}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          style={optionStyles[opt]}
          onClick={() => {
            onChange(opt);
            setOpen(false);
          }}
        >
          {optionLabels[opt]}
        </button>
      ))}
    </dialog>
  );
}

export default StateCell;
