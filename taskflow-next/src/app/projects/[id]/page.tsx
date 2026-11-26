import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TaskBoard from '@/components/TaskBoard'
import { getProject } from '@/lib/data'

export async function generateMetadata({ params }: PageProps<'/projects/[id]'>): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(id)
  return { title: project?.name ?? 'Projet introuvable' }
}

export default async function ProjectPage({ params }: PageProps<'/projects/[id]'>) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) notFound()

  const done = project.tasks.filter((t) => t.status === 'done').length

  return (
    <>
      <Link href="/" className="back-link">
        ← Tous les projets
      </Link>
      <div className="page-header">
        <div>
          <h1>{project.name}</h1>
          <p className="muted">{project.description}</p>
        </div>
        <span className="counter">
          {done} / {project.tasks.length} terminée(s)
        </span>
      </div>

      <TaskBoard tasks={project.tasks} />
    </>
  )
}
