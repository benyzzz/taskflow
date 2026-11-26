import { useState } from 'react'
import type { FormEvent } from 'react'

const MAX_LENGTH = 80

interface TaskFormProps {
  onAdd: (title: string) => void
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')

  const trimmed = title.trim()
  const tooLong = title.length > MAX_LENGTH
  const disabled = trimmed === '' || tooLong

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (disabled) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          type="text"
          placeholder="Nouvelle tâche"
          aria-label="Nouvelle tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Ajouter
        </button>
      </div>
      {tooLong && <p className="error">Le titre ne doit pas dépasser {MAX_LENGTH} caractères.</p>}
    </form>
  )
}
