import { useNavigate, useParams } from 'react-router-dom'
import { getLessonById, getNextLessonId } from '../data/courseData.js'
import { useProgress } from '../context/ProgressContext.jsx'
import ProgressBar from './ProgressBar.jsx'
import LessonTabs from './LessonTabs.jsx'
import Footer from './Footer.jsx'

function formatDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function LessonView({ onOpenMenu }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = getLessonById(Number(id))
  const { isCompleted, markAsCompleted } = useProgress()

  if (!lesson) {
    return (
      <div className="flex h-full flex-1 items-center justify-center p-8 text-center text-gray-500 dark:text-gray-400">
        No se encontró esta lección.
      </div>
    )
  }

  if (!lesson.disponible) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <svg
          className="h-10 w-10 text-gray-300 dark:text-gray-600"
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
        <p className="text-lg font-semibold text-ink dark:text-gray-100">
          {lesson.weekLabel} · Próximamente
        </p>
        <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
          Esta lección todavía no está disponible. Se desbloqueará cuando se
          publique el contenido de esa semana.
        </p>
      </div>
    )
  }

  const completed = isCompleted(lesson.id)
  const nextId = getNextLessonId(lesson.id)

  function handleCompleteAndContinue() {
    markAsCompleted(lesson.id)
    if (nextId !== null) {
      navigate(`/aula/clase/${nextId}`)
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto">
      {/* Barra superior */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-100 bg-paper/95 px-4 sm:px-8 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMenu}
            className="lg:hidden flex-shrink-0 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Abrir índice del curso"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="truncate text-sm sm:text-base font-semibold text-ink dark:text-gray-100">
            {lesson.weekLabel} · {lesson.title}
          </h2>
        </div>
        <ProgressBar week={lesson.id} />
      </header>

      {/* Contenido */}
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-8 py-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy/70 dark:text-navy-light/80">
          {lesson.moduleTitle}
        </p>
        <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-bold leading-tight text-ink dark:text-gray-100">
          {lesson.title}
        </h1>
        <p className="mt-2 text-sm text-gray-400 capitalize dark:text-gray-500">
          {formatDate(lesson.date)}
        </p>

        {lesson.verse && (
          <blockquote className="mt-6 rounded-xl border-l-4 border-navy bg-navy/5 px-5 py-4 dark:bg-navy-light/10">
            <p className="font-serif text-lg italic leading-relaxed text-navy-dark dark:text-navy-light">
              “{lesson.verse}”
            </p>
            {lesson.verseRef && (
              <footer className="mt-1.5 text-sm font-medium text-navy/70 dark:text-navy-light/80">
                — {lesson.verseRef}
              </footer>
            )}
          </blockquote>
        )}

        <div className="mt-8">
          <LessonTabs lesson={lesson} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 border-t border-gray-100 pt-8 dark:border-gray-800">
          <button
            onClick={handleCompleteAndContinue}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
          >
            {completed
              ? nextId !== null
                ? 'Ir a la siguiente clase'
                : 'Lección completada'
              : 'Marcar como completada y pasar a la siguiente clase'}
          </button>
          {completed && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy dark:text-navy-light">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Completada
            </span>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
