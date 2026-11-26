import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page introuvable</p>
      <Link to="/" className="btn btn-primary">
        Retour aux projets
      </Link>
    </div>
  )
}
