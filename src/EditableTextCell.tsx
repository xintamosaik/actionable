import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

type EditableTextCellProps = {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

function EditableTextCell({ value, placeholder = '-', onChange }: EditableTextCellProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)

  function close(commit: boolean) {
    if (commit) {
      const trimmed = draft.trim()
      if (trimmed !== value) onChange(trimmed)
    }
    setOpen(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') close(true)
    if (e.key === 'Escape') close(false)
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)}>
        {value || placeholder}
      </button>
    )
  }

  return (
    <input
      autoFocus
      type="text"
      value={draft}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
      onBlur={() => close(true)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default EditableTextCell
