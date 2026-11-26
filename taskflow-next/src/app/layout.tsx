import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'TaskFlow',
    template: '%s · TaskFlow',
  },
  description: 'TaskFlow : gestion de projets et de tâches (TP4 Next.js)',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr">
      <body>
        <nav className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="brand">
              TaskFlow
            </Link>
            <Link href="/">Projets</Link>
            <Link href="/about">À propos</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
