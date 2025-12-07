import { useState, type CSSProperties } from 'react';
import type { Effort } from './types.ts'
import colors from './colors.ts';

type EffortCellProps = {
    effort: Effort
    onChange: (effort: Effort) => void
}

function EffortCell({ effort, onChange }: EffortCellProps) {
    const options: Effort[] = ['MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTHS'];
    const optionStyles: Record<Effort, CSSProperties> = {
        MINUTES: { backgroundColor: colors.min },
        HOURS: { backgroundColor: colors.low },
        DAYS: { backgroundColor: colors.normal },
        WEEKS: { backgroundColor: colors.high },
        MONTHS: { backgroundColor: colors.max },
    }
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                style={optionStyles[effort]}
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