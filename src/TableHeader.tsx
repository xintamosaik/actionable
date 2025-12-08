type TableHeaderProps = {
    sortDirection?: 'asc' | 'desc';
    onToggleSort?: () => void;
}

function TableHeader({ sortDirection, onToggleSort }: TableHeaderProps) {
    const headers = [
        'Task',
        'State',
        'Priority',
        'Value',
        'Urgency',
        'Effort',
        'Responsible',
        'Collab',
        'Duedate',
        'Notes',
    ]
    return (
        <thead>
            <tr>
                {headers.map((caption) => {
                    if (caption === 'Priority') {
                        return (
                            <th
                                key={caption}
                                onClick={onToggleSort}
                                style={{ cursor: onToggleSort ? 'pointer' : 'default', userSelect: 'none' }}
                                title={onToggleSort ? 'Toggle sort by Value (primary) and Urgency (secondary)' : undefined}
                            >
                                {caption}{' '}
                                {sortDirection ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                            </th>
                        )
                    }
                    return <th key={caption}>{caption}</th>
                })}
            </tr>
        </thead>
    );
}

export default TableHeader;