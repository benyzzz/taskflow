export type Status = 'todo' | 'doing' | 'done'
export type Priority = 'P1' | 'P2' | 'P3'

export interface Task {
  id: string
  title: string
  status: Status
  priority: Priority
  projectId?: string
}

export type Filter = 'all' | Status

export interface Project {
  id: string
  name: string
  description: string
  tasks?: Task[]
}

export type NewProject = Omit<Project, 'id' | 'tasks'>
export type NewTask = Omit<Task, 'id'>

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'À faire',
  doing: 'En cours',
  done: 'Terminé',
}

export function nextStatus(status: Status): Status {
  if (status === 'todo') return 'doing'
  if (status === 'doing') return 'done'
  return 'todo'
}
