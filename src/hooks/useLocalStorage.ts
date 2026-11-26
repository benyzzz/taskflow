import { useEffect, useState } from 'react'

// Comme useState, mais la valeur est sauvegardée dans le localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // lecture une seule fois, au premier rendu (fonction d'initialisation)
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? (JSON.parse(saved) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // écriture à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // stockage plein ou désactivé : on ignore
    }
  }, [key, value])

  return [value, setValue] as const
}
