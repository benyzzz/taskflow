// Modèle de données de TaskFlow

export type Status = 'todo' | 'doing' | 'done'
export type Priority = 'P1' | 'P2' | 'P3'

export interface Task {
  id: string
  title: string
  status: Status
  priority: Priority
  projectId?: string // TP3 : la tâche appartient à un projet
}

export type Filter = 'all' | Status

// TP3
export interface Project {
  id: string
  name: string
  description: string
  tasks?: Task[] // rempli avec ?_embed=tasks
}

export type NewProject = Omit<Project, 'id' | 'tasks'>
export type NewTask = Omit<Task, 'id'>

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'À faire',
  doing: 'En cours',
  done: 'Terminé',
}

// À faire -> En cours -> Terminé -> À faire
export function nextStatus(status: Status): Status {
  if (status === 'todo') return 'doing'
  if (status === 'doing') return 'done'
  return 'todo'
}
