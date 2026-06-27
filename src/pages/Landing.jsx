import { Link } from 'react-router-dom'
import { courseTitle, modules } from '../data/courseData.js'
import Footer from '../components/Footer.jsx'

// Iconos simples en SVG (trazo, sin librerías externas) para cada módulo.
const MODULE_ICONS = {
  1: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M4 5.5A2 2 0 0 1 6 3.5h6V20H6a2 2 0 0 0-2 2zM20 5.5A2 2 0 0 0 18 3.5h-6V20h6a2 2 0 0 1 2 2z"
    />
  ),
  2: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M7 11V6a3 3 0 0 1 6 0M9 14l-3.5 3.5a1.8 1.8 0 1 0 2.5 2.5L11.5 17M9 14l1.8 1.8M9 14l4-4M15 11v5a3 3 0 0 1-6 0"
    />
  ),
  3: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M4 18h16M4.5 18l-1-9 4.5 3L12 6l4 6 4.5-3-1 9"
    />
  ),
  4: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M12 3v18M7 8h10"
    />
  ),
  5: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.5 19c.5-2.5 2.5-4 5.5-4s5 1.5 5.5 4M10.5 19c.5-2.5 2.5-4 5.5-4s5 1.5 5.5 4"
    />
  ),
  6: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M3 20l6-11 4 6.5L16.5 9 21 20H3Z"
    />
  ),
}

function ModuleIcon({ id }) {
  return (
    <svg
      className="h-6 w-6 text-navy dark:text-navy-light"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      {MODULE_ICONS[id]}
    </svg>
  )
}

// Interruptor para el mapa interactivo de la Landing: ponlo en `true` el día
// que José confirme que se puede publicar (igual que "disponible" en las lecciones).
const MOSTRAR_MAPA_INTERACTIVO = true

const DETAILS = [
  { label: 'Grupo pequeño por Meet' },
  { label: 'Sábados a las 10:00 PM (hora española)' },
  { label: '6 meses de formación' },
]

export default function Landing() {
  return (
    <div className="min-h-screen w-full overflow-y-auto bg-paper font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      {/* Hero */}
      <header className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-20 pb-14 text-center sm:pt-28">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/70 dark:text-navy-light/80">
          Curso bíblico online
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-navy sm:text-5xl dark:text-navy-light">
          {courseTitle}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-500 dark:text-gray-400">
          Curso bíblico de discipulado desde cero
        </p>

        <blockquote className="mt-10 max-w-lg">
          <p className="font-serif text-xl italic leading-relaxed text-gray-600 sm:text-2xl dark:text-gray-300">
            &ldquo;Y conoceréis la verdad, y la verdad os hará libres.&rdquo;
          </p>
          <footer className="mt-2 text-sm font-medium text-navy/70 dark:text-navy-light/80">
            — Juan 8:32
          </footer>
        </blockquote>

        <Link
          to="/aula"
          className="mt-12 inline-flex items-center gap-2 rounded-lg bg-navy px-8 py-4 text-base font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
        >
          Acceder al Aula Virtual
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </header>

      {/* ¿De qué trata? */}
      <section className="mt-16 border-t border-gray-100 bg-white py-16 sm:mt-20 sm:py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-ink sm:text-3xl dark:text-gray-100">
            ¿De qué trata?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-500 dark:text-gray-400">
            Un recorrido de seis módulos por toda la Escritura, pensado para
            construir bases firmes desde el primer día.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules
              .filter((mod) => mod.id !== 0)
              .map((mod) => (
                <div
                  key={mod.id}
                  className="rounded-xl bg-paper p-6 shadow-soft transition-transform hover:-translate-y-0.5 dark:bg-gray-800"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy/10 dark:bg-navy-light/10">
                    <ModuleIcon id={mod.id} />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy/70 dark:text-navy-light/80">
                    Módulo {mod.id} · {mod.subtitle}
                  </p>
                  <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-ink dark:text-gray-100">
                    {mod.title}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Mapa interactivo del curso */}
      {MOSTRAR_MAPA_INTERACTIVO && (
        <section className="border-t border-gray-100 bg-white py-16 sm:py-20 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center font-serif text-2xl font-bold text-ink sm:text-3xl dark:text-gray-100">
              Explora el recorrido completo
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-gray-500 dark:text-gray-400">
              Pulsa cada módulo del mapa para ver sus cuatro clases.
            </p>
            <iframe
              src="/mapa-curso.html"
              title="Mapa interactivo del curso"
              className="mt-10 h-[560px] w-full rounded-2xl border border-gray-100 shadow-soft sm:h-[620px] dark:border-gray-800"
            />
          </div>
        </section>
      )}

      {/* Detalles del curso */}
      <section className="border-t border-gray-100 py-16 sm:py-20 dark:border-gray-800">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl dark:text-gray-100">
            Detalles del curso
          </h2>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-stretch sm:gap-0">
            {DETAILS.map((item, idx) => (
              <div
                key={item.label}
                className="flex flex-1 items-start justify-center gap-3 px-4 py-4"
              >
                <span className="text-sm font-medium text-gray-600 sm:text-[15px] dark:text-gray-300">
                  {item.label}
                </span>
                {idx < DETAILS.length - 1 && (
                  <span className="hidden w-px self-stretch bg-gray-200 sm:ml-2 sm:block dark:bg-gray-700" />
                )}
              </div>
            ))}
          </div>

          <Link
            to="/aula"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline dark:text-navy-light"
          >
            Acceder al Aula Virtual
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
