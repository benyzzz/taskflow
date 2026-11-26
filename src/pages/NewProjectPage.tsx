import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../api'
import Card from '../components/Card'
import { ErrorMessage } from '../components/Status'
import type { NewProject } from '../types'

type Errors = Partial<Record<keyof NewProject, string>>

function validate(values: NewProject): Errors {
  const errors: Errors = {}
  const name = values.name.trim()
  if (name.length < 3) errors.name = 'Le nom doit contenir au moins 3 caractères.'
  else if (name.length > 50) errors.name = 'Le nom ne doit pas dépasser 50 caractères.'
  if (values.description.length > 200) errors.description = '200 caractères maximum.'
  return errors
}

export default function NewProjectPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState<NewProject>({ name: '', description: '' })
  const [submitted, setSubmitted] = useState(false) // erreurs visibles après la 1re tentative
  const [sending, setSending] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const errors = validate(values)
  const hasErrors = Object.keys(errors).length > 0

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (hasErrors) return

    setSending(true)
    setApiError(null)
    try {
      const project = await api.createProject({
        name: values.name.trim(),
        description: values.description.trim(),
      })
      navigate(`/projects/${project.id}`)
    } catch (err) {
      setApiError((err as Error).message)
      setSending(false)
    }
  }

  return (
    <>
      <h1>Nouveau projet</h1>
      <Card title="Informations">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Nom du projet</label>
            <input
              id="name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              aria-invalid={submitted && !!errors.name}
            />
            {submitted && errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              value={values.description}
              onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
            {submitted && errors.description && <p className="error">{errors.description}</p>}
          </div>

          {apiError && <ErrorMessage message={apiError} />}

          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Création…' : 'Créer le projet'}
          </button>
        </form>
      </Card>
    </>
  )
}
