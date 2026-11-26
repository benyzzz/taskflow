import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { api, ApiError } from '../api'
import Card from '../components/Card'
import FilterBar from '../components/FilterBar'
import { ErrorMessage, Loading } from '../components/Status'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { nextStatus } from '../types'
import type { Filter, Priority, Project, Task } from '../types'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setNotFound(false)

    api
      .getProject(id)
      .then((p) => {
        if (cancelled) return
        setProject(p)
        setTasks(p.tasks ?? [])
      })
      .catch((e: Error) => {
        if (cancelled) return
        if (e instanceof ApiError && e.status === 404) setNotFound(true)
        else setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  // l'API d'abord, puis l'état
  async function add(title: string, priority: Priority) {
    try {
      const created = await api.createTask({ projectId: id, title, priority, status: 'todo' })
      setTasks((prev) => [...prev, created])
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function cycle(taskId: string) {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    try {
      const updated = await api.updateTask(taskId, { status: nextStatus(task.status) })
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function remove(taskId: string) {
    try {
      await api.deleteTask(taskId)
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  // bonus : supprimer le projet
  async function removeProject() {
    if (!window.confirm('Supprimer ce projet et toutes ses tâches ?')) return
    try {
      await api.deleteProject(id)
      navigate('/')
    } catch (e) {
      setError((e as Error).message)
    }
  }

  if (loading) return <Loading />
  if (notFound) return <NotFoundPage />
  if (!project) return <ErrorMessage message={error ?? 'Projet introuvable'} />

  const visible = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)
  const done = tasks.filter((t) => t.status === 'done').length

  return (
    <>
      <Link to="/" className="back-link">
        ← Tous les projets
      </Link>
      <div className="page-header">
        <div>
          <h1>{project.name}</h1>
          <p className="muted">{project.description}</p>
        </div>
        <button type="button" className="btn btn-danger" onClick={removeProject}>
          Supprimer le projet
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      <Card
        title={`Tâches (${done}/${tasks.length} terminées)`}
        actions={<FilterBar value={filter} onChange={setFilter} />}
      >
        <TaskForm onAdd={add} />
        <TaskList tasks={visible} onCycle={cycle} onRemove={remove} />
      </Card>
    </>
  )
}
