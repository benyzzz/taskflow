import Link from 'next/link'
import { getProjects } from '@/lib/data'

// Composant serveur : les données sont lues avant l'envoi du HTML
export default async function HomePage() {
  const projects = await getProjects()

  return (
    <>
      <div className="page-header">
        <h1>Projets</h1>
      </div>

      {projects.length === 0 && <p className="empty">Aucun projet pour l&apos;instant.</p>}

      <div className="project-grid">
        {projects.map((p) => {
          const done = p.tasks.filter((t) => t.status === 'done').length
          const percent = p.tasks.length ? Math.round((done / p.tasks.length) * 100) : 0
          return (
            <Link key={p.id} href={`/projects/${p.id}`} className="project-card">
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <span className="project-count">
                {done} / {p.tasks.length} tâche(s) terminée(s)
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
