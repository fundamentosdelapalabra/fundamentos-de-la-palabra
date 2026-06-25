import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { modules, getModuleLessons } from '../data/courseData.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const MEET_URL = 'https://meet.google.com/fxy-wzpq-xxa'
const CONTACT_EMAIL = 'fundamentosdelapalabra@gmail.com'
const CALENDAR_URL =
  'https://calendar.google.com/calendar/embed?src=fundamentosdelapalabra%40gmail.com&ctz=Europe%2FMadrid&wkst=2'

const THEME_OPTIONS = [
  { value: 'system', label: 'Sistema', icon: '💻' },
  { value: 'light', label: 'Claro', icon: '☀️' },
  { value: 'dark', label: 'Oscuro', icon: '🌙' },
]

function ModuleSection({ mod, currentId, isOpenByDefault }) {
  const [open, setOpen] = useState(isOpenByDefault)
  const lessons = getModuleLessons(mod.id)
  const { isCompleted } = useProgress()

  return (
    <div className="border-b border-gray-100 last:border-b-0 dark:border-gray-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-ink hover:bg-gray-50 transition-colors dark:text-gray-100 dark:hover:bg-gray-800"
      >
        <span>
          {mod.id === 0 ? mod.title : `Módulo ${mod.id}: ${mod.title}`}
          <span className="block text-xs font-normal text-gray-400 mt-0.5 dark:text-gray-500">
            {mod.subtitle}
          </span>
        </span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className="accordion-content"
        style={{ maxHeight: open ? `${lessons.length * 44 + 8}px` : '0px' }}
      >
        <ul className="pb-2">
          {lessons.map((lesson) => {
            const active = currentId === String(lesson.id)
            const done = isCompleted(lesson.id)
            const locked = !lesson.disponible

            if (locked) {
              return (
                <li key={lesson.id}>
                  <span
                    title="Todavía no disponible"
                    className="flex cursor-not-allowed items-center gap-2 px-4 py-2 pl-7 text-sm text-gray-400 dark:text-gray-600"
                  >
                    <svg
                      className="h-4 w-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 9h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <span className="truncate">{lesson.weekLabel}</span>
                  </span>
                </li>
              )
            }

            return (
              <li key={lesson.id}>
                <NavLink
                  to={`/aula/clase/${lesson.id}`}
                  className={`flex items-center gap-2 px-4 py-2 pl-7 text-sm transition-colors ${
                    active
                      ? 'bg-navy/10 text-navy font-medium border-r-2 border-navy dark:bg-navy/20'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-ink dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border text-[10px] ${
                      done
                        ? 'bg-navy border-navy text-white'
                        : 'border-gray-300 text-transparent dark:border-gray-600'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="truncate">{lesson.weekLabel}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Sidebar({ onNavigate }) {
  const { id } = useParams()
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const nombre = user?.user_metadata?.nombre
  const apellido = user?.user_metadata?.apellido
  const nombreCompleto = [nombre, apellido].filter(Boolean).join(' ')
  const initials = `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  async function handleSignOut() {
    setMenuOpen(false)
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="flex h-full w-full flex-col bg-white dark:bg-gray-900">
      {/* Tarjeta de usuario / menú de cuenta */}
      {user && (
        <div ref={menuRef} className="relative border-b border-gray-100 px-5 pb-4 pt-5 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="flex w-full items-center gap-3 rounded-xl bg-gray-100 p-3 text-left transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-ink dark:text-gray-100">{nombreCompleto}</p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <svg
              className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                menuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute left-5 right-5 z-20 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <p className="px-3 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Tema
              </p>
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTheme(opt.value)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <span className="flex items-center gap-2">
                    <span>{opt.icon}</span>
                    {opt.label}
                  </span>
                  {theme === opt.value && <span className="h-1.5 w-1.5 rounded-full bg-navy dark:bg-navy-light" />}
                </button>
              ))}

              <div className="my-1.5 border-t border-gray-100 dark:border-gray-700" />

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <span>🚪</span>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}

      {/* Logo / Título */}
      <div className="px-5 pt-3 pb-4">
        <h1 className="font-serif text-xl font-bold leading-tight text-navy dark:text-navy-light">
          Fundamentos
          <br />
          de la Palabra
        </h1>
      </div>

      {/* Botón Meet */}
      <div className="px-5 pb-4">
        <a
          href={MEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4Z" />
          </svg>
          Unirse a la clase en vivo
        </a>

        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-blue-900 text-blue-900 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors mt-3 text-sm dark:bg-gray-900 dark:border-navy-light dark:text-navy-light dark:hover:bg-gray-800"
        >
          📅 Ver Calendario del Curso
        </a>
      </div>

      {/* Índice del curso */}
      <nav className="thin-scroll flex-1 overflow-y-auto border-t border-gray-100 dark:border-gray-800">
        {modules.map((mod) => (
          <ModuleSection
            key={mod.id}
            mod={mod}
            currentId={id}
            isOpenByDefault={mod.id === 0 || mod.id === 1}
          />
        ))}
      </nav>

      {/* Material descargable */}
      <div className="border-t border-gray-100 px-5 py-4 space-y-3 dark:border-gray-800">
        <a
          href="#"
          className="flex items-center gap-2 text-sm font-medium text-navy hover:underline dark:text-navy-light"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
            />
          </svg>
          Material Descargable
        </a>
      </div>

      {/* Pie de página: contacto */}
      <div className="border-t border-gray-100 px-5 py-3 dark:border-gray-800">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="block truncate text-xs text-gray-400 hover:text-navy dark:text-gray-500 dark:hover:text-navy-light"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

    </aside>
  )
}
