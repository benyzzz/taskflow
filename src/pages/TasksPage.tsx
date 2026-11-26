import { useEffect, useState } from 'react'
import Card from '../components/Card'
import FilterBar from '../components/FilterBar'
import FocusTimer from '../components/FocusTimer'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { nextStatus } from '../types'
import type { Filter, Priority, Task } from '../types'

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Lire le cours sur les props', status: 'done', priority: 'P2' },
  { id: '2', title: 'Créer le composant Card', status: 'doing', priority: 'P1' },
  { id: '3', title: 'Préparer la pull request', status: 'todo', priority: 'P3' },
]

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', INITIAL_TASKS)
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  const remaining = tasks.filter((t) => t.status !== 'done').length
  const visibleTasks = tasks
    .filter((t) => filter === 'all' || t.status === filter)
    .filter((t) => t.title.toLowerCase().includes(search.trim().toLowerCase()))

  useEffect(() => {
    document.title = `(${remaining}) TaskFlow`
    return () => {
      document.title = 'TaskFlow'
    }
  }, [remaining])

  function add(title: string, priority: Priority) {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, status: 'todo', priority }])
  }

  function cycle(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t)))
  }

  function remove(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function clearAll() {
    if (window.confirm('Supprimer toutes les tâches ?')) setTasks([])
  }

  return (
    <>
      <div className="page-header">
        <h1>Mes tâches</h1>
        <span className="counter">{remaining} restante(s)</span>
      </div>

      <Card title="Mes tâches" actions={<FilterBar value={filter} onChange={setFilter} />}>
        <TaskForm onAdd={add} />
        <input
          className="search"
          type="search"
          placeholder="Rechercher une tâche…"
          aria-label="Rechercher une tâche"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TaskList tasks={visibleTasks} onCycle={cycle} onRemove={remove} />
        {tasks.length > 0 && (
          <div className="card-footer">
            <button type="button" className="btn btn-danger" onClick={clearAll}>
              Tout effacer
            </button>
          </div>
        )}
      </Card>

      <FocusTimer />
    </>
  )
}
