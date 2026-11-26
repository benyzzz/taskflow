import { useEffect, useState } from 'react'
import Card from './Card'

const DURATION = 25 * 60

function format(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DURATION)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  function reset() {
    setRunning(false)
    setSecondsLeft(DURATION)
  }

  return (
    <Card title="Concentration">
      <div className="timer">
        <span className="timer-value" aria-live="polite">
          {format(secondsLeft)}
        </span>
        <div className="timer-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setRunning((r) => !r)}
            disabled={secondsLeft === 0}
          >
            {running ? 'Pause' : 'Démarrer'}
          </button>
          <button type="button" className="btn" onClick={reset}>
            Réinitialiser
          </button>
        </div>
      </div>
    </Card>
  )
}
