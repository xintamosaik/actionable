import {useState } from 'react';
import type { State } from './types.ts'
type StateCellProps = {
  state: State
  onChange: (state: State) => void
}
function StateCell({ state, onChange }: StateCellProps) {
    const options: State[] =  ['WAITING', 'IN_PROGRESS', 'DONE', ];
  
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <button 
                type="button" 
                onClick={() => setOpen(true)}
        
            >
                {state}
            </button>
        );
    }

    return (
        <dialog style={{ display: 'flex', flexDirection: 'column', }}>
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
           
                    onClick={() => {
                        onChange(opt);
                        setOpen(false);
                    }}
                >
                    {opt}
                </button>
            ))}
        </dialog>
    );
}

export default StateCell;
