import React from 'react';

function OwnerCell({
    owner,
    onChange,
}: {
    owner: string;
    onChange: (e: string) => void;
}) {
   
    const [open, setOpen] = React.useState(false);

    if (!open) {
        return (
            <button type="button" onClick={() => setOpen(true)}>
                {owner}
            </button>
        );
    }

    return (
        <div className="effort-menu">
            <input type="text"
                defaultValue={owner}
                onBlur={(e) => {
                    onChange(e.target.value);
                    setOpen(false);
                }}
                autoFocus
            />
        </div>
    );
}

export default OwnerCell;