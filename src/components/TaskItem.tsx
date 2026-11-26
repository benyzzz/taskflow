import { STATUS_LABELS } from '../types'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onCycle: (id: string) => void
  onRemove: (id: string) => void
}

export default function TaskItem({ task, onCycle, onRemove }: TaskItemProps) {
  const classes = ['task-item', `priority-${task.priority.toLowerCase()}`]
  if (task.status === 'done') classes.push('is-done')

  return (
    <li className={classes.join(' ')}>
      <button
        type="button"
        className={`badge status-${task.status}`}
        title="Passer au statut suivant"
        onClick={() => onCycle(task.id)}
      >
        {STATUS_LABELS[task.status]}
      </button>
      <span className="task-title">{task.title}</span>
      <span className="badge priority">{task.priority}</span>
      <button
        type="button"
        className="btn-remove"
        aria-label={`Supprimer ${task.title}`}
        onClick={() => onRemove(task.id)}
      >
        ×
      </button>
    </li>
  )
}
