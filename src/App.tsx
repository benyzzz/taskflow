import { useState } from 'react'
import Card from './components/Card'
import FilterBar from './components/FilterBar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { nextStatus } from './types'
import type { Filter, Task } from './types'

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Lire le cours sur les props', status: 'done', priority: 'P2' },
  { id: '2', title: 'Créer le composant Card', status: 'doing', priority: 'P1' },
  { id: '3', title: 'Préparer la pull request', status: 'todo', priority: 'P3' },
]

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [filter, setFilter] = useState<Filter>('all')

  // valeurs dérivées : pas besoin d'un state en plus
  const visibleTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)
  const remaining = tasks.filter((t) => t.status !== 'done').length

  function add(title: string) {
    const task: Task = { id: crypto.randomUUID(), title, status: 'todo', priority: 'P2' }
    setTasks((prev) => [...prev, task])
  }

  function cycle(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t)))
  }

  function remove(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <main className="container">
      <header className="app-header">
        <h1>TaskFlow</h1>
        <span className="counter">{remaining} restante(s)</span>
      </header>

      <Card title="Mes tâches" actions={<FilterBar value={filter} onChange={setFilter} />}>
        <TaskForm onAdd={add} />
        <TaskList tasks={visibleTasks} onCycle={cycle} onRemove={remove} />
      </Card>
    </main>
  )
}
