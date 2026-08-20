// AdminContenido.jsx
// -----------------------------------------------------------------------------
// Panel de contenido: permite editar el vídeo, el resumen, la actividad, el
// material y el test de cada módulo directamente desde el navegador, sin
// tocar código ni subir nada a GitHub. Solo visible para los emails de
// lib/admins.js (protegido también a nivel de base de datos con RLS).
//
// Los cambios se guardan en la tabla `lecciones` de Supabase y se reflejan
// al instante en toda la web gracias a ContentContext.refresh().
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useContent } from '../context/ContentContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { isAdmin } from '../lib/admins.js'

function CampoTexto({ label, ayuda, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </span>
      {ayuda && <span className="mt-0.5 block text-xs text-gray-400 dark:text-gray-500">{ayuda}</span>}
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-ink dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
    </label>
  )
}

function CampoArea({ label, ayuda, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </span>
      {ayuda && <span className="mt-0.5 block text-xs text-gray-400 dark:text-gray-500">{ayuda}</span>}
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 font-mono text-xs leading-relaxed text-ink dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
    </label>
  )
}

function FilaLeccion({ lesson, cursoId, onGuardado }) {
  const [abierto, setAbierto] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [ok, setOk] = useState(false)
  const [form, setForm] = useState(null)

  async function abrir() {
    if (abierto) {
      setAbierto(false)
      return
    }
    setAbierto(true)
    if (form) return
    setCargando(true)
    const { data } = await supabase
      .from('lecciones')
      .select('video_url, resumen, actividad_descripcion, material_url, test_url, publicado')
      .eq('curso_id', cursoId)
      .eq('orden', lesson.id)
      .single()
    setForm(
      data || {
        video_url: '',
        resumen: lesson.summary,
        actividad_descripcion: lesson.activity,
        material_url: lesson.materialDriveUrl,
        test_url: lesson.testMakeupUrl,
        publicado: lesson.disponible,
      }
    )
    setCargando(false)
  }

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
    setOk(false)
  }

  async function guardar() {
    setGuardando(true)
    const { error } = await supabase.from('lecciones').upsert(
      {
        curso_id: cursoId,
        orden: lesson.id,
        tipo: 'clase',
        titulo: lesson.title,
        subtitulo: lesson.weekLabel,
        video_url: form.video_url || null,
        resumen: form.resumen || null,
        actividad_descripcion: form.actividad_descripcion || null,
        material_url: form.material_url || null,
        test_url: form.test_url || null,
        publicado: !!form.publicado,
      },
      { onConflict: 'curso_id,orden' }
    )
    setGuardando(false)
    if (!error) {
      setOk(true)
      onGuardado()
    } else {
      alert('No se pudo guardar: ' + error.message)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
      <button
        type="button"
        onClick={abrir}
        className="flex w-full items-center justify-between gap-3 bg-white px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span
            className={`h-2 w-2 flex-shrink-0 rounded-full ${
              lesson.disponible ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
          <span className="truncate font-medium text-ink dark:text-gray-100">
            {lesson.weekLabel} · {lesson.title}
          </span>
          {lesson.videoUrl && <span className="flex-shrink-0 text-xs text-navy dark:text-navy-light">🎬</span>}
        </span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${abierto ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {abierto && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          {cargando || !form ? (
            <p className="text-sm text-gray-400 dark:text-gray-500">Cargando…</p>
          ) : (
            <div className="flex flex-col gap-4">
              <CampoTexto
                label="Vídeo de la clase"
                ayuda="Pega el enlace de YouTube (cualquier formato: youtu.be/..., watch?v=..., etc.)"
                value={form.video_url}
                onChange={(v) => set('video_url', v)}
                placeholder="https://youtu.be/XXXXXXXXXXX"
              />
              <CampoArea
                label="Resumen"
                ayuda="Se admite HTML sencillo (por ejemplo <p>...</p>)."
                value={form.resumen}
                onChange={(v) => set('resumen', v)}
              />
              <CampoArea
                label="Actividad / Aplicación"
                ayuda="Se admite HTML sencillo."
                value={form.actividad_descripcion}
                onChange={(v) => set('actividad_descripcion', v)}
              />
              <CampoTexto
                label="Material (PDF)"
                ayuda="Enlace o ruta al PDF descargable."
                value={form.material_url}
                onChange={(v) => set('material_url', v)}
              />
              <CampoTexto
                label="Test semanal"
                ayuda='Enlace al test. Deja "#" si todavía no hay.'
                value={form.test_url}
                onChange={(v) => set('test_url', v)}
              />

              <label className="flex items-center gap-2 text-sm text-ink dark:text-gray-100">
                <input
                  type="checkbox"
                  checked={!!form.publicado}
                  onChange={(e) => set('publicado', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Visible para los alumnos
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={guardar}
                  disabled={guardando}
                  className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark disabled:opacity-50"
                >
                  {guardando ? 'Guardando…' : 'Guardar cambios'}
                </button>
                {ok && (
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    ✓ Guardado y publicado en la web
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AdminContenido({ onOpenMenu }) {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const autorizado = isAdmin(user?.email)
  const { courseData, cursoId, loading, refresh } = useContent()

  useEffect(() => {
    if (!authLoading && !autorizado) {
      navigate('/aula/clase/1', { replace: true })
    }
  }, [authLoading, autorizado, navigate])

  if (authLoading || !autorizado) return null

  const lecciones = courseData.filter((l) => l.moduleId !== 0)

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-paper/95 px-4 sm:px-8 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
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
          Panel de contenido
        </h2>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 px-4 sm:px-8 py-8 sm:py-10">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-ink dark:text-gray-100">
          Contenido de las clases
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Abre un módulo para añadir el vídeo de la clase en vivo, editar el
          resumen o la actividad, cambiar el material descargable, o marcarlo
          como visible/oculto para los alumnos. Los cambios se publican al
          instante, sin esperar ningún despliegue.
        </p>

        {loading || !cursoId ? (
          <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">Cargando…</p>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {lecciones.map((lesson) => (
              <FilaLeccion key={lesson.id} lesson={lesson} cursoId={cursoId} onGuardado={refresh} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
