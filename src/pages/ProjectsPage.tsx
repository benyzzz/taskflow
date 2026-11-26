import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../api'
import { ErrorMessage, Loading } from '../components/Status'
import type { Project } from '../types'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    api
      .getProjects()
      .then((data) => {
        if (!cancelled) setProjects(data)
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <div className="page-header">
        <h1>Projets</h1>
        <Link to="/projects/new" className="btn btn-primary">
          + Nouveau projet
        </Link>
      </div>

      {loading && <Loading text="Chargement des projets…" />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && projects.length === 0 && <p className="empty">Aucun projet pour l'instant.</p>}

      <div className="project-grid">
        {projects.map((p) => {
          const tasks = p.tasks ?? []
          const done = tasks.filter((t) => t.status === 'done').length
          const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0
          return (
            <Link key={p.id} to={`/projects/${p.id}`} className="project-card">
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <span className="project-count">
                {done} / {tasks.length} tâche(s) terminée(s)
              </span>
              <div className="progress" aria-hidden="true">
                <div className="progress-bar" style={{ width: `${percent}%` }} />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
