import { useState } from 'react'

const TABS = [
  { key: 'resumen', label: 'Resumen' },
  { key: 'actividad', label: 'Actividad / Aplicación' },
  { key: 'test', label: 'Test Semanal' },
  { key: 'material', label: 'Descargar Material' },
]

export default function LessonTabs({ lesson }) {
  const [active, setActive] = useState('resumen')

  return (
    <div className="rounded-xl bg-white shadow-soft dark:bg-gray-900">
      {/* Encabezado de pestañas */}
      <div className="flex overflow-x-auto border-b border-gray-100 dark:border-gray-800">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`flex-shrink-0 px-4 sm:px-6 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${
              active === tab.key
                ? 'text-navy border-b-2 border-navy dark:text-navy-light dark:border-navy-light'
                : 'text-gray-500 hover:text-ink border-b-2 border-transparent dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de pestañas */}
      <div className="p-5 sm:p-8">
        {active === 'resumen' && (
          <div
            className="lesson-content text-[15px] leading-relaxed text-gray-700 whitespace-pre-line dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: lesson.summary }}
          />
        )}

        {active === 'actividad' && (
          <div
            className="lesson-content text-[15px] leading-relaxed text-gray-700 whitespace-pre-line dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: lesson.activity }}
          />
        )}

        {active === 'test' && (
          <div className="flex flex-col items-start gap-4">
            <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
              El test de esta semana se juega en directo, todos juntos, durante la
              clase del sábado por Google Meet, usando Kahoot.
            </p>
            <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
              No hace falta hacer nada aquí: cuando llegue el momento en la clase,
              el profesor compartirá el PIN para entrar en{' '}
              <span className="font-semibold text-navy dark:text-navy-light">kahoot.it</span>{' '}
              desde el móvil u ordenador.
            </p>

            {lesson.testMakeupUrl && lesson.testMakeupUrl !== '#' && (
              <>
                <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                  ¿No pudiste asistir a la clase? Recupera el test por tu cuenta:
                </p>
                <a
                  href={lesson.testMakeupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
                >
                  Recuperar el Test
                </a>
              </>
            )}
          </div>
        )}

        {active === 'material' && (
          <div className="flex flex-col items-start gap-4">
            <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
              Descarga las lecturas, esquemas y recursos adicionales de esta
              lección.
            </p>
            <a
              href={lesson.materialDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5 dark:border-navy-light dark:text-navy-light dark:hover:bg-navy-light/10"
            >
              Abrir carpeta en Google Drive
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
