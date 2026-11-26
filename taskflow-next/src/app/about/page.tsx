import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
}

export default function AboutPage() {
  return (
    <>
      <h1>À propos</h1>
      <div className="card">
        <p>
          TaskFlow est le projet fil rouge du module <strong>Développement Web Frontend React + Next.js</strong>{' '}
          (M2 Informatique, ESIEE-IT).
        </p>
        <p>
          Cette version (TP4) reprend la partie lecture du TP3 avec Next.js : les pages sont des dossiers, les
          données sont lues sur le serveur, et seul le filtre des tâches est un composant client.
        </p>
      </div>
    </>
  )
}
