// Petits composants pour les états "chargement" et "erreur"

export function Loading({ text = 'Chargement…' }: { text?: string }) {
  return <p className="status-msg">{text}</p>
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="status-msg status-error" role="alert">
      <strong>Oups !</strong> {message}
    </div>
  )
}
