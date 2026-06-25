// ThemeContext.jsx
// -----------------------------------------------------------------------------
// Gestiona la preferencia de tema (system | light | dark), la persiste en
// localStorage y aplica/retira la clase "dark" en <html> para que Tailwind
// (darkMode: 'class') pinte la interfaz en consecuencia.
// -----------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(undefined)
const STORAGE_KEY = 'fdp-theme'

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyResolvedTheme(theme) {
  const isDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark())
  document.documentElement.classList.toggle('dark', isDark)
  return isDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'system'
    return localStorage.getItem(STORAGE_KEY) || 'system'
  })
  const [resolvedTheme, setResolvedTheme] = useState(() => applyResolvedTheme(theme))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
    setResolvedTheme(applyResolvedTheme(theme))

    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    function handleChange() {
      setResolvedTheme(applyResolvedTheme('system'))
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [theme])

  const value = { theme, setTheme, resolvedTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (ctx === undefined) {
    throw new Error('useTheme debe usarse dentro de un <ThemeProvider>.')
  }
  return ctx
}
