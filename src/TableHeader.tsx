function TableHeader({ sortDirection, onToggleSort }: { sortDirection?: 'asc' | 'desc'; onToggleSort?: () => void; }) {
    const headers = [
        'Task',
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
                    if (caption === 'Value') {
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