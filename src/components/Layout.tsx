import { NavLink, Outlet } from 'react-router'
import ThemeToggle from './ThemeToggle'

export default function Layout() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="brand" end>
            TaskFlow
          </NavLink>
          <NavLink to="/" end>
            Projets
          </NavLink>
          <NavLink to="/projects/new">Nouveau projet</NavLink>
          <NavLink to="/tasks">Mes tâches</NavLink>
          <div className="spacer" />
          <ThemeToggle />
        </div>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
