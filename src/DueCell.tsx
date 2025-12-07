type DueCellProps = {
    date: string,
    onChange: (date: string) => void
}

function DueCell({ date, onChange }: DueCellProps) {

    return (
        <input
            type="date"
            value={date || ''}
            onChange={(e) => {
                onChange(e.target.value);
            }}
        />

    );
}

export default DueCell;