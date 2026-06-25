// ProgressContext.jsx
// -----------------------------------------------------------------------------
// Progreso del alumno (lecciones completadas y actividades autodeclaradas
// como hechas). Antes se guardaba solo en el navegador (localStorage); ahora
// se guarda en Supabase (tabla "progreso") para que el profesor pueda verlo
// desde el panel de Seguimiento, y para que no se pierda al cambiar de
// dispositivo o de navegador.
// -----------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [completedIds, setCompletedIds] = useState([])
  const [activityIds, setActivityIds] = useState([])

  // Cuando cambia el usuario logueado (o al cargar), traemos su progreso.
  useEffect(() => {
    if (!user) {
      setCompletedIds([])
      setActivityIds([])
      return
    }

    supabase
      .from('progreso')
      .select('leccion_id, tipo')
      .eq('alumno_id', user.id)
      .then(({ data, error }) => {
        if (error || !data) return
        setCompletedIds(data.filter((r) => r.tipo === 'leccion').map((r) => r.leccion_id))
        setActivityIds(data.filter((r) => r.tipo === 'actividad').map((r) => r.leccion_id))
      })
  }, [user])

  async function setProgreso(id, tipo, completado) {
    if (!user) return
    const { error } = await supabase.from('progreso').upsert(
      {
        alumno_id: user.id,
        leccion_id: id,
        tipo,
        completado,
        fecha: new Date().toISOString(),
      },
      { onConflict: 'alumno_id,leccion_id,tipo' }
    )
    return !error
  }

  async function quitarProgreso(id, tipo) {
    if (!user) return
    const { error } = await supabase
      .from('progreso')
      .delete()
      .match({ alumno_id: user.id, leccion_id: id, tipo })
    return !error
  }

  // --- Lecciones completadas ---

  async function markAsCompleted(id) {
    if (await setProgreso(id, 'leccion', true)) {
      setCompletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }
  }

  async function unmarkAsCompleted(id) {
    if (await quitarProgreso(id, 'leccion')) {
      setCompletedIds((prev) => prev.filter((x) => x !== id))
    }
  }

  function toggleCompleted(id) {
    if (completedIds.includes(id)) {
      unmarkAsCompleted(id)
    } else {
      markAsCompleted(id)
    }
  }

  function isCompleted(id) {
    return completedIds.includes(id)
  }

  // --- Actividades hechas ---

  async function markActivityDone(id) {
    if (await setProgreso(id, 'actividad', true)) {
      setActivityIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }
  }

  async function unmarkActivityDone(id) {
    if (await quitarProgreso(id, 'actividad')) {
      setActivityIds((prev) => prev.filter((x) => x !== id))
    }
  }

  function toggleActivityDone(id) {
    if (activityIds.includes(id)) {
      unmarkActivityDone(id)
    } else {
      markActivityDone(id)
    }
  }

  function isActivityDone(id) {
    return activityIds.includes(id)
  }

  const value = {
    completedIds,
    markAsCompleted,
    unmarkAsCompleted,
    toggleCompleted,
    isCompleted,
    activityIds,
    markActivityDone,
    unmarkActivityDone,
    toggleActivityDone,
    isActivityDone,
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
