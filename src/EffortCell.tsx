import React from 'react';
import type { Effort } from './types.ts'
import colors from './colors.ts';
function EffortCell({
    effort,
    onChange,
}: {
    effort: Effort;
    onChange: (e: Effort) => void;
}) {
    const options: Effort[] = ['MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTHS'];
    const optionStyles = {
        MINUTES: { backgroundColor: colors.min },
        HOURS: { backgroundColor: colors.low },
        DAYS: { backgroundColor: colors.normal },
        WEEKS: { backgroundColor: colors.high },
        MONTHS: { backgroundColor:  colors.max },
    }
    const [open, setOpen] = React.useState(false);

    if (!open) {
        return (
            <button 
                type="button" 
                onClick={() => setOpen(true)}
                style= {optionStyles[effort]}
            >
                {effort}
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
                    {opt}
                </button>
            ))}
        </dialog>
    );
}

export default EffortCell;