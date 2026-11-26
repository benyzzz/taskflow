import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority } from '../types'

const MAX_LENGTH = 80

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'P1', label: 'Haute' },
  { value: 'P2', label: 'Moyenne' },
  { value: 'P3', label: 'Basse' },
]

interface TaskFormProps {
  onAdd: (title: string, priority: Priority) => void
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('P2')
  const inputRef = useRef<HTMLInputElement>(null)

  // focus au premier affichage
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const trimmed = title.trim()
  const tooLong = title.length > MAX_LENGTH
  const disabled = trimmed === '' || tooLong

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (disabled) return
    onAdd(trimmed, priority)
    setTitle('')
    inputRef.current?.focus() // et après chaque ajout
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nouvelle tâche"
          aria-label="Nouvelle tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          aria-label="Priorité"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Ajouter
        </button>
      </div>
      {tooLong && <p className="error">Le titre ne doit pas dépasser {MAX_LENGTH} caractères.</p>}
    </form>
  )
}
