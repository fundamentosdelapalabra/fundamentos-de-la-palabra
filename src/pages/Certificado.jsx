// Certificado.jsx
// -----------------------------------------------------------------------------
// Certificado de finalización del curso. Se desbloquea cuando el alumno ha
// completado las 24 semanas (módulos 1 a 6; la "Clase 0" introductoria no
// cuenta). Se descarga como PDF usando la función de imprimir del propio
// navegador (Guardar como PDF), sin necesidad de librerías adicionales.
// -----------------------------------------------------------------------------

import { useAuth } from '../context/AuthContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { courseData } from '../data/courseData.js'

const SEMANAS = courseData.filter((l) => l.moduleId !== 0)

export default function Certificado({ onOpenMenu }) {
  const { user } = useAuth()
  const { completedIds } = useProgress()

  const nombre = user?.user_metadata?.nombre
  const apellido = user?.user_metadata?.apellido
  const nombreCompleto = [nombre, apellido].filter(Boolean).join(' ') || user?.email

  const completadas = SEMANAS.filter((l) => completedIds.includes(l.id)).length
  const cursoCompleto = SEMANAS.length > 0 && completadas === SEMANAS.length

  const fecha = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto">
      {/* Barra superior */}
      <header className="no-print sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-100 bg-paper/95 px-4 sm:px-8 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
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
            Certificado
          </h2>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-8 py-8 sm:py-10">
        {!cursoCompleto ? (
          <div className="rounded-xl border border-gray-100 p-8 text-center dark:border-gray-800">
            <p className="text-lg font-semibold text-ink dark:text-gray-100">
              Todavía no has completado el curso
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Llevas {completadas} de {SEMANAS.length} semanas completadas. Cuando
              termines la última, tu certificado aparecerá aquí.
            </p>
          </div>
        ) : (
          <>
            <div className="no-print mb-6">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
              >
                Descargar / Imprimir certificado
              </button>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Se abrirá el diálogo de impresión: elige "Guardar como PDF" como
                destino para descargarlo.
              </p>
            </div>

            <div
              id="certificado"
              className="rounded-2xl border-8 border-navy bg-white p-10 text-center sm:p-16 dark:bg-gray-900"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-navy/70 dark:text-navy-light/80">
                Certificado de Finalización
              </p>
              <h1 className="mt-4 font-serif text-3xl font-bold text-navy dark:text-navy-light">
                Fundamentos de la Palabra
              </h1>
              <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
                Se otorga el presente certificado a
              </p>
              <p className="mt-2 font-serif text-2xl font-bold text-ink dark:text-gray-100">
                {nombreCompleto}
              </p>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                por haber completado satisfactoriamente las 24 semanas del curso
                bíblico «Fundamentos de la Palabra».
              </p>
              <p className="mt-10 text-xs text-gray-400 dark:text-gray-500">{fecha}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
