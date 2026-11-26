// Squelette affiché automatiquement pendant le chargement d'une page
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Chargement">
      <div className="skeleton skeleton-title" />
      <div className="project-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    </div>
  )
}
