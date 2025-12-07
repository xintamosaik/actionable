import React from "react";
import type { Value } from './types.ts'
import state from "./colors.ts";
function ValueCell({
    value,
    onChange,
}: {
    value: Value;
    onChange: (v: Value) => void;
}) {

    const options: Value[] = [1, 2, 3, 4, 5];
    const optionLabels = {
        1: 'MIN',
        2: 'Low',
        3: 'Medium',
        4: 'High',
        5: 'MAX',
    };
    const optionStyles = {
        1: { backgroundColor: state.blue },
        2: { backgroundColor: state.green },
        3: { backgroundColor: state.yellow },
        4: { backgroundColor: state.orange },
        5: { backgroundColor: state.red },
    }
    const [open, setOpen] = React.useState(false);

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                style={optionStyles[value]}
            >
                {optionLabels[value]}
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

export default ValueCell;