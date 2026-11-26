'use client'

// Seul composant client : le filtre a besoin d'un état et des clics
import { useState } from 'react'
import { STATUS_LABELS } from '@/lib/types'
import type { Filter, Task } from '@/lib/types'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'todo', label: 'À faire' },
  { value: 'doing', label: 'En cours' },
  { value: 'done', label: 'Terminées' },
]

export default function TaskBoard({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const visible = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)

  return (
    <section className="card">
      <header className="card-header">
        <h2>Tâches</h2>
        <div className="filter-bar" role="group" aria-label="Filtrer les tâches">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={f.value === filter ? 'filter active' : 'filter'}
              aria-pressed={f.value === filter}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {visible.length === 0 ? (
        <p className="empty">Aucune tâche à afficher.</p>
      ) : (
        <ul className="task-list">
          {visible.map((t) => (
            <li
              key={t.id}
              className={`task-item priority-${t.priority.toLowerCase()} ${t.status === 'done' ? 'is-done' : ''}`}
            >
              <span className={`badge status-${t.status}`}>{STATUS_LABELS[t.status]}</span>
              <span className="task-title">{t.title}</span>
              <span className="badge priority">{t.priority}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
