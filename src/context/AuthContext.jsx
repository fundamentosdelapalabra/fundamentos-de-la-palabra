// AuthContext.jsx
// -----------------------------------------------------------------------------
// Contexto de autenticación basado en Supabase Auth. No usa tablas SQL: el
// consentimiento RGPD (grabación por Meet + política de privacidad) se guarda
// directamente en el user_metadata de cada usuario.
// -----------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function signUp({ email, password, nombre, apellido }) {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          apellido,
          consentimiento_video: false,
          consentimiento_privacidad: false,
        },
      },
    })

    // Si el registro fue bien, guardamos también una copia básica del
    // alumno en la tabla "perfiles" (necesaria para el panel de asistencia).
    if (result.data?.user && !result.error) {
      await supabase.from('perfiles').insert({
        id: result.data.user.id,
        nombre,
        apellido,
        email,
      })
    }

    return result
  }

  async function signIn({ email, password }) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  async function signOut() {
    return supabase.auth.signOut()
  }

  const metadata = user?.user_metadata ?? {}
  const isConsented =
    metadata.consentimiento_video === true && metadata.consentimiento_privacidad === true

  const value = { user, loading, signUp, signIn, signOut, isConsented }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>.')
  }
  return ctx
}
