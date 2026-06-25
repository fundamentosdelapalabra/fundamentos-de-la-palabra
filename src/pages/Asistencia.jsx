// Asistencia.jsx
// -----------------------------------------------------------------------------
// Panel del profesor/líder: asistencia, progreso y descargas de cada alumno,
// semana a semana. Solo es visible para los emails listados en lib/admins.js
// (también protegido a nivel de base de datos con políticas RLS en Supabase).
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { courseData } from '../data/courseData.js'
import { isAdmin } from '../lib/admins.js'

export default function Asistencia({ onOpenMenu }) {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const autorizado = isAdmin(user?.email)

  const [leccionId, setLeccionId] = useState(courseData[0].id)
  const [alumnos, setAlumnos] = useState([])
  const [presentes, setPresentes] = useState(new Set())
  const [completados, setCompletados] = useState(new Set())
  const [actividades, setActividades] = useState(new Set())
  const [descargas, setDescargas] = useState(new Set())
  const [cargandoAlumnos, setCargandoAlumnos] = useState(true)
  const [cargandoSemana, setCargandoSemana] = useState(true)
  const [guardandoId, setGuardandoId] = useState(null)

  // Si alguien sin permiso intenta entrar por la URL, lo mandamos fuera.
  useEffect(() => {
    if (!authLoading && !autorizado) {
      navigate('/aula/clase/0', { replace: true })
    }
  }, [authLoading, autorizado, navigate])

  // Lista de alumnos (perfiles que no son profesores), una sola vez.
  useEffect(() => {
    if (!autorizado) return
    setCargandoAlumnos(true)
    supabase
      .from('perfiles')
      .select('id, nombre, apellido, email')
      .order('nombre', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setAlumnos(data.filter((p) => !isAdmin(p.email)))
        }
        setCargandoAlumnos(false)
      })
  }, [autorizado])

  // Asistencia, progreso y descargas guardados para la semana seleccionada.
  useEffect(() => {
    if (!autorizado) return
    setCargandoSemana(true)

    Promise.all([
      supabase.from('asistencia').select('alumno_id, presente').eq('leccion_id', leccionId),
      supabase.from('progreso').select('alumno_id, tipo').eq('leccion_id', leccionId),
      supabase.from('descargas').select('alumno_id').eq('leccion_id', leccionId),
    ]).then(([asistenciaRes, progresoRes, descargasRes]) => {
      setPresentes(
        new Set(
          (asistenciaRes.data ?? []).filter((a) => a.presente).map((a) => a.alumno_id)
        )
      )
      setCompletados(
        new Set((progresoRes.data ?? []).filter((p) => p.tipo === 'leccion').map((p) => p.alumno_id))
      )
      setActividades(
        new Set((progresoRes.data ?? []).filter((p) => p.tipo === 'actividad').map((p) => p.alumno_id))
      )
      setDescargas(new Set((descargasRes.data ?? []).map((d) => d.alumno_id)))
      setCargandoSemana(false)
    })
  }, [leccionId, autorizado])

  async function toggleAlumno(alumnoId) {
    const yaPresente = presentes.has(alumnoId)
    setGuardandoId(alumnoId)

    const { error } = await supabase.from('asistencia').upsert(
      {
        alumno_id: alumnoId,
        leccion_id: leccionId,
        presente: !yaPresente,
        marcado_por: user.id,
        fecha: new Date().toISOString(),
      },
      { onConflict: 'alumno_id,leccion_id' }
    )

    if (!error) {
      setPresentes((prev) => {
        const next = new Set(prev)
        if (yaPresente) {
          next.delete(alumnoId)
        } else {
          next.add(alumnoId)
        }
        return next
      })
    }
    setGuardandoId(null)
  }

  if (authLoading || !autorizado) return null

  const totalPresentes = presentes.size

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto">
      {/* Barra superior, igual que en las lecciones */}
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
            Seguimiento
          </h2>
        </div>
      </header>

      {/* Contenido */}
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 sm:px-8 py-8 sm:py-10">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-ink dark:text-gray-100">
          Seguimiento de alumnos
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Marca quién ha asistido a la clase en directo. La lección, la
          actividad y el material descargado se rellenan solos, según lo que
          marca cada alumno desde su propia cuenta.
        </p>

        <div className="mt-6 max-w-sm">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Semana
          </label>
          <select
            value={leccionId}
            onChange={(e) => setLeccionId(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-ink dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            {courseData.map((l) => (
              <option key={l.id} value={l.id}>
                {l.weekLabel} · {l.title}
              </option>
            ))}
          </select>
        </div>

        {!cargandoSemana && alumnos.length > 0 && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {totalPresentes} de {alumnos.length} alumnos marcados como presentes.
          </p>
        )}

        {!cargandoSemana && alumnos.length > 0 && (
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-navy" /> Asistió
            </span>
            <span>✓ Lección</span>
            <span>✓ Actividad</span>
            <span>✓ Material</span>
          </div>
        )}

        <div className="mt-4 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
          {cargandoAlumnos || cargandoSemana ? (
            <p className="p-4 text-sm text-gray-400 dark:text-gray-500">Cargando…</p>
          ) : alumnos.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 dark:text-gray-500">
              Todavía no hay ningún alumno registrado en la web.
            </p>
          ) : (
            alumnos.map((alumno) => {
              const presente = presentes.has(alumno.id)
              const leccionHecha = completados.has(alumno.id)
              const actividadHecha = actividades.has(alumno.id)
              const materialDescargado = descargas.has(alumno.id)
              const nombreCompleto =
                [alumno.nombre, alumno.apellido].filter(Boolean).join(' ') || alumno.email

              return (
                <div
                  key={alumno.id}
                  className="flex w-full items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-3 text-left text-sm last:border-b-0 dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="truncate text-ink dark:text-gray-100">{nombreCompleto}</span>

                  <div className="flex flex-shrink-0 items-center gap-2">
                    {/* Asistencia: editable por el profesor */}
                    <button
                      type="button"
                      disabled={guardandoId === alumno.id}
                      onClick={() => toggleAlumno(alumno.id)}
                      title="Asistió a la clase"
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-colors disabled:opacity-50 ${
                        presente
                          ? 'border-navy bg-navy text-white'
                          : 'border-gray-300 text-transparent dark:border-gray-600'
                      }`}
                    >
                      ✓
                    </button>

                    {/* Lección, actividad y material: solo lectura (lo marca el alumno) */}
                    <span
                      title="Lección completada"
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                        leccionHecha
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-200 text-transparent dark:border-gray-700'
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      title="Actividad hecha"
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                        actividadHecha
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-200 text-transparent dark:border-gray-700'
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      title="Material descargado"
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                        materialDescargado
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-200 text-transparent dark:border-gray-700'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
