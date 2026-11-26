export type Status = 'todo' | 'doing' | 'done'
export type Priority = 'P1' | 'P2' | 'P3'
export type Filter = 'all' | Status

export interface Task {
  id: string
  projectId: string
  title: string
  status: Status
  priority: Priority
}

export interface Project {
  id: string
  name: string
  description: string
}

export interface ProjectWithTasks extends Project {
  tasks: Task[]
}

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'À faire',
  doing: 'En cours',
  done: 'Terminé',
}
