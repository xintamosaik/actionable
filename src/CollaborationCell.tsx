import React from 'react';

function CollaborationCell({
    collaborator,
    onChange,
}: {
    collaborator: string;
    onChange: (e: string) => void;
}) {
   
    const [open, setOpen] = React.useState(false);

    if (!open) {
        return (
            <button type="button" onClick={() => setOpen(true)}>
                {collaborator ? collaborator : '-'}
            </button>
        );
    }

    return (
        <div>
            <input type="text"
                defaultValue={collaborator}
                onBlur={(e) => {
                    onChange(e.target.value);
                    setOpen(false);
                }}
                autoFocus
            />
        </div>
    );
}

export default CollaborationCell;