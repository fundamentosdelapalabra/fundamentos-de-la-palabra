import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'fundamentos-progreso'

const ProgressContext = createContext(null)

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function ProgressProvider({ children }) {
  const [completedIds, setCompletedIds] = useState(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds))
  }, [completedIds])

  function markAsCompleted(id) {
    setCompletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  function unmarkAsCompleted(id) {
    setCompletedIds((prev) => prev.filter((x) => x !== id))
  }

  function toggleCompleted(id) {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function isCompleted(id) {
    return completedIds.includes(id)
  }

  const value = {
    completedIds,
    markAsCompleted,
    unmarkAsCompleted,
    toggleCompleted,
    isCompleted,
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) {
    throw new Error('useProgress debe usarse dentro de <ProgressProvider>')
  }
  return ctx
}
