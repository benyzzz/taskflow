// Lecture des données côté serveur : plus besoin de json-server ni de fetch
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Project, ProjectWithTasks, Task } from './types'

interface Db {
  projects: Project[]
  tasks: Task[]
}

async function readDb(): Promise<Db> {
  const file = path.join(process.cwd(), 'db.json')
  const content = await readFile(file, 'utf-8')
  return JSON.parse(content) as Db
}

export async function getProjects(): Promise<ProjectWithTasks[]> {
  const db = await readDb()
  return db.projects.map((p) => ({
    ...p,
    tasks: db.tasks.filter((t) => t.projectId === p.id),
  }))
}

export async function getProject(id: string): Promise<ProjectWithTasks | null> {
  const db = await readDb()
  const project = db.projects.find((p) => p.id === id)
  if (!project) return null
  return { ...project, tasks: db.tasks.filter((t) => t.projectId === id) }
}
