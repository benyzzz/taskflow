import type { NewProject, NewTask, Project, Task } from './types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(BASE_URL + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    throw new ApiError(0, "Impossible de joindre l'API. Est-elle bien lancée ?")
  }

  if (!res.ok) {
    throw new ApiError(res.status, `Erreur ${res.status} : ${res.statusText}`)
  }
  return (await res.json()) as T
}

export const api = {
  getProjects: () => request<Project[]>('/projects?_embed=tasks'),

  getProject: (id: string) => request<Project>(`/projects/${encodeURIComponent(id)}?_embed=tasks`),

  createProject: (data: NewProject) =>
    request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),

  deleteProject: (id: string) =>
    request<Project>(`/projects/${encodeURIComponent(id)}?_dependent=tasks`, { method: 'DELETE' }),

  createTask: (data: NewTask) => request<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) }),

  updateTask: (id: string, data: Partial<Task>) =>
    request<Task>(`/tasks/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(data) }),

  deleteTask: (id: string) => request<Task>(`/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' }),
}
