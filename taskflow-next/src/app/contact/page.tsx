import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
}

// bonus du TP4
export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <div className="card">
        <p>Une question sur TaskFlow ? Passez nous voir en salle de TP ou écrivez à l&apos;équipe pédagogique via l&apos;ENT.</p>
      </div>
    </>
  )
}
