import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page introuvable</p>
      <Link href="/" className="btn btn-primary">
        Retour aux projets
      </Link>
    </div>
  )
}
