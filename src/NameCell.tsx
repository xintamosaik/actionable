import React from 'react';

function NameCell({
    name,
    onChange,
}: {
    name: string;
    onChange: (e: string) => void;
}) {
   
    const [open, setOpen] = React.useState(false);

    if (!open) {
        return (
            <button type="button" onClick={() => setOpen(true)}>
                {name}
            </button>
        );
    }

    return (
        <div>
            <input type="text"
                defaultValue={name}
                onBlur={(e) => {
                    onChange(e.target.value);
                    setOpen(false);
                }}
                autoFocus
            />
        </div>
    );
}

export default NameCell;