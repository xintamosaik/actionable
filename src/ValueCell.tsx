import { useState } from "react";
import type { CSSProperties } from "react";
import type { Value } from './types.ts'
import colors from "./colors.ts";
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
    const optionStyles: Record<Value, CSSProperties> = {
        1: { backgroundColor: colors.min },
        2: { backgroundColor: colors.low },
        3: { backgroundColor: colors.normal },
        4: { backgroundColor: colors.high },
        5: { backgroundColor: colors.max },
    }
    const [open, setOpen] = useState(false);

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
        <div style={{ position: 'relative' }}>
            <div className="popup" style={{ display: 'flex', flexDirection: 'column', }}>
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
            </div>
        </div>
    );
}

export default ValueCell;