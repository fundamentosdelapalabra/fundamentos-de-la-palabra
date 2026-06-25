import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Consentimiento from './pages/Consentimiento.jsx'
import AvisoLegal from './pages/AvisoLegal.jsx'
import Privacidad from './pages/Privacidad.jsx'
import Cookies from './pages/Cookies.jsx'
import Faq from './pages/Faq.jsx'
import Sidebar from './components/Sidebar.jsx'
import LessonView from './components/LessonView.jsx'

function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-paper text-gray-400 dark:bg-gray-950 dark:text-gray-500">
      Cargando…
    </div>
  )
}

// Protege /aula: exige usuario logueado Y con consentimiento firmado.
function RequireConsentedUser({ children }) {
  const { user, isConsented, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (!isConsented) return <Navigate to="/consentimiento" replace />
  return children
}

// Protege /consentimiento: exige usuario logueado; si ya firmó, lo manda al aula.
function RequirePendingConsent({ children }) {
  const { user, isConsented, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (isConsented) return <Navigate to="/aula/clase/0" replace />
  return children
}

// Para /login y /registro: si ya hay sesión, redirige según su estado de consentimiento.
function RedirectIfAuthed({ children }) {
  const { user, isConsented, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (user && isConsented) return <Navigate to="/aula/clase/0" replace />
  if (user && !isConsented) return <Navigate to="/consentimiento" replace />
  return children
}

function Aula() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-paper text-ink font-sans dark:bg-gray-950 dark:text-gray-100">
      {/* Sidebar - escritorio */}
      <div className="hidden lg:flex h-full w-72 flex-shrink-0 border-r border-gray-100 shadow-soft dark:border-gray-800">
        <Sidebar />
      </div>

      {/* Sidebar - móvil (drawer) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative h-full w-80 max-w-[85%] shadow-xl">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800"
              aria-label="Cerrar índice del curso"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div onClick={() => setMenuOpen(false)}>
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <LessonView onOpenMenu={() => setMenuOpen(true)} />
      </main>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={
          <RedirectIfAuthed>
            <Login />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/registro"
        element={
          <RedirectIfAuthed>
            <Registro />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/consentimiento"
        element={
          <RequirePendingConsent>
            <Consentimiento />
          </RequirePendingConsent>
        }
      />
      <Route
        path="/aula"
        element={
          <RequireConsentedUser>
            <Navigate to="/aula/clase/0" replace />
          </RequireConsentedUser>
        }
      />
      <Route
        path="/aula/clase/:id"
        element={
          <RequireConsentedUser>
            <Aula />
          </RequireConsentedUser>
        }
      />
      <Route path="/aviso-legal" element={<AvisoLegal />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/faq" element={<Faq />} />
      <Route
        path="*"
        element={
          <div className="flex h-screen w-screen items-center justify-center bg-paper text-gray-500 dark:bg-gray-950 dark:text-gray-400">
            Página no encontrada.
          </div>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
