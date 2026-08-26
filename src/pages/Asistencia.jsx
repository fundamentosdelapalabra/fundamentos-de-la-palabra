// Asistencia.jsx
// -----------------------------------------------------------------------------
// Panel del profesor/líder: asistencia, progreso y descargas de cada alumno,
// semana a semana, más un resumen general y exportación a CSV/Excel. Solo es
// visible para los emails listados en lib/admins.js (también protegido a
// nivel de base de datos con políticas RLS en Supabase).
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useContent } from '../context/ContentContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { isAdmin } from '../lib/admins.js'

const DIAS_PARA_INACTIVO = 14

function escaparCSV(valor) {
  const str = String(valor ?? '')
  if (str.includes(';') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export default function Asistencia({ onOpenMenu }) {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const autorizado = isAdmin(user?.email)
  const { courseData } = useContent()
  const SEMANAS = courseData.filter((l) => l.moduleId !== 0)
  const SEMANAS_DISPONIBLES = SEMANAS.filter((l) => l.disponible).length

  const [vista, setVista] = useState('semana') // 'semana' | 'resumen'
  const [leccionId, setLeccionId] = useState(courseData[0].id)
  const [alumnos, setAlumnos] = useState([])
  const [presentes, setPresentes] = useState(new Set())
  const [completados, setCompletados] = useState(new Set())
  const [actividades, setActividades] = useState(new Set())
  const [descargas, setDescargas] = useState(new Set())
  const [cargandoAlumnos, setCargandoAlumnos] = useState(true)
  const [cargandoSemana, setCargandoSemana] = useState(true)
  const [guardandoId, setGuardandoId] = useState(null)
  const [todo, setTodo] = useState(null)
  const [cargandoResumen, setCargandoResumen] = useState(true)
  const [exportando, setExportando] = useState(false)

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
      .select('id, nombre, apellido, email, ultima_visita')
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
        new Set((asistenciaRes.data ?? []).filter((a) => a.presente).map((a) => a.alumno_id))
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

  // Datos de TODAS las semanas, para el resumen general (se cargan al abrir esa pestaña).
  useEffect(() => {
    if (!autorizado || vista !== 'resumen') return
    setCargandoResumen(true)
    Promise.all([
      supabase.from('asistencia').select('alumno_id, leccion_id, presente'),
      supabase.from('progreso').select('alumno_id, leccion_id, tipo'),
      supabase.from('descargas').select('alumno_id, leccion_id'),
    ]).then(([a, p, d]) => {
      setTodo({
        asistencia: a.data ?? [],
        progreso: p.data ?? [],
        descargas: d.data ?? [],
      })
      setCargandoResumen(false)
    })
  }, [autorizado, vista])

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

  async function exportarCSV() {
    setExportando(true)
    const [aRes, pRes, dRes] = await Promise.all([
      supabase.from('asistencia').select('alumno_id, leccion_id, presente'),
      supabase.from('progreso').select('alumno_id, leccion_id, tipo'),
      supabase.from('descargas').select('alumno_id, leccion_id'),
    ])
    const asistenciaRows = aRes.data ?? []
    const progresoRows = pRes.data ?? []
    const descargasRows = dRes.data ?? []

    const filas = [
      ['Alumno', 'Email', 'Semana', 'Asistió', 'Lección completada', 'Actividad hecha', 'Material descargado'],
    ]

    for (const alumno of alumnos) {
      const nombreCompleto = [alumno.nombre, alumno.apellido].filter(Boolean).join(' ') || alumno.email
      for (const leccion of SEMANAS) {
        const asistio = asistenciaRows.some(
          (a) => a.alumno_id === alumno.id && a.leccion_id === leccion.id && a.presente
        )
        const leccionHecha = progresoRows.some(
          (p) => p.alumno_id === alumno.id && p.leccion_id === leccion.id && p.tipo === 'leccion'
        )
        const actividadHecha = progresoRows.some(
          (p) => p.alumno_id === alumno.id && p.leccion_id === leccion.id && p.tipo === 'actividad'
        )
        const material = descargasRows.some((d) => d.alumno_id === alumno.id && d.leccion_id === leccion.id)

        filas.push([
          nombreCompleto,
          alumno.email,
          leccion.weekLabel,
          asistio ? 'Sí' : 'No',
          leccionHecha ? 'Sí' : 'No',
          actividadHecha ? 'Sí' : 'No',
          material ? 'Sí' : 'No',
        ])
      }
    }

    const csv = filas.map((fila) => fila.map(escaparCSV).join(';')).join('\n')
    const blob = new Blob([' ' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = `seguimiento_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(enlace)
    enlace.click()
    document.body.removeChild(enlace)
    URL.revokeObjectURL(url)
    setExportando(false)
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

        <button
          type="button"
          disabled={exportando || cargandoAlumnos}
          onClick={exportarCSV}
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-navy px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-navy/5 disabled:opacity-50 dark:border-navy-light dark:text-navy-light dark:hover:bg-navy-light/10"
        >
          {exportando ? 'Exportando…' : '📥 Exportar a Excel'}
        </button>
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

        {/* Pestañas */}
        <div className="mt-6 flex border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setVista('semana')}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              vista === 'semana'
                ? 'text-navy border-b-2 border-navy dark:text-navy-light dark:border-navy-light'
                : 'text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            Semana a semana
          </button>
          <button
            onClick={() => setVista('resumen')}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              vista === 'resumen'
                ? 'text-navy border-b-2 border-navy dark:text-navy-light dark:border-navy-light'
                : 'text-gray-500 hover:text-ink dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            Resumen general
          </button>
        </div>

        {vista === 'semana' ? (
          <>
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
          </>
        ) : (
          <ResumenGeneral
            alumnos={alumnos}
            todo={todo}
            cargando={cargandoAlumnos || cargandoResumen}
            semanasDisponibles={SEMANAS_DISPONIBLES}
          />
        )}
      </div>
    </div>
  )
}

function ResumenGeneral({ alumnos, todo, cargando, semanasDisponibles }) {
  if (cargando || !todo) {
    return <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">Cargando…</p>
  }

  if (alumnos.length === 0) {
    return (
      <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
        Todavía no hay ningún alumno registrado en la web.
      </p>
    )
  }

  const filas = alumnos.map((alumno) => {
    const asistenciaCount = todo.asistencia.filter((a) => a.alumno_id === alumno.id && a.presente).length
    const leccionCount = todo.progreso.filter(
      (p) => p.alumno_id === alumno.id && p.tipo === 'leccion'
    ).length
    const actividadCount = todo.progreso.filter(
      (p) => p.alumno_id === alumno.id && p.tipo === 'actividad'
    ).length

    const asistenciaPct =
      semanasDisponibles > 0 ? Math.round((asistenciaCount / semanasDisponibles) * 100) : null
    const progresoPct =
      semanasDisponibles > 0 ? Math.round((leccionCount / semanasDisponibles) * 100) : null

    const diasInactivo = alumno.ultima_visita
      ? Math.floor((Date.now() - new Date(alumno.ultima_visita).getTime()) / 86400000)
      : null
    const inactivo = diasInactivo === null || diasInactivo >= DIAS_PARA_INACTIVO
    const atrasado = semanasDisponibles > 0 && (asistenciaPct < 50 || progresoPct < 50)

    return {
      alumno,
      asistenciaCount,
      leccionCount,
      actividadCount,
      asistenciaPct,
      progresoPct,
      diasInactivo,
      inactivo,
      atrasado,
    }
  })

  const conDatos = filas.filter((f) => f.asistenciaPct !== null)
  const asistenciaMedia =
    conDatos.length > 0
      ? Math.round(conDatos.reduce((sum, f) => sum + f.asistenciaPct, 0) / conDatos.length)
      : null
  const progresoMedio =
    conDatos.length > 0
      ? Math.round(conDatos.reduce((sum, f) => sum + f.progresoPct, 0) / conDatos.length)
      : null

  const aVigilar = filas
    .filter((f) => f.atrasado || f.inactivo)
    .sort((a, b) => (b.diasInactivo ?? 9999) - (a.diasInactivo ?? 9999))

  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-100 p-4 text-center dark:border-gray-800">
          <p className="text-2xl font-bold text-ink dark:text-gray-100">{alumnos.length}</p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Alumnos</p>
        </div>
        <div className="rounded-xl border border-gray-100 p-4 text-center dark:border-gray-800">
          <p className="text-2xl font-bold text-ink dark:text-gray-100">
            {asistenciaMedia !== null ? `${asistenciaMedia}%` : '—'}
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Asistencia media</p>
        </div>
        <div className="rounded-xl border border-gray-100 p-4 text-center dark:border-gray-800">
          <p className="text-2xl font-bold text-ink dark:text-gray-100">
            {progresoMedio !== null ? `${progresoMedio}%` : '—'}
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Progreso medio</p>
        </div>
      </div>

      {semanasDisponibles === 0 && (
        <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
          Todavía no hay ninguna semana publicada, así que aún no hay porcentajes que mostrar.
        </p>
      )}

      <h3 className="mt-8 text-sm font-semibold text-ink dark:text-gray-100">
        Alumnos a vigilar
      </h3>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        Atrasados (menos del 50% de asistencia o progreso) o sin entrar a la web en {DIAS_PARA_INACTIVO}{' '}
        días o más.
      </p>

      <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
        {aVigilar.length === 0 ? (
          <p className="p-4 text-sm text-gray-400 dark:text-gray-500">
            Ningún alumno destaca por ahora. 🎉
          </p>
        ) : (
          aVigilar.map(({ alumno, diasInactivo, atrasado, inactivo }) => {
            const nombreCompleto = [alumno.nombre, alumno.apellido].filter(Boolean).join(' ') || alumno.email
            return (
              <div
                key={alumno.id}
                className="flex w-full items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-3 text-sm last:border-b-0 dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="truncate text-ink dark:text-gray-100">{nombreCompleto}</span>
                <div className="flex flex-shrink-0 items-center gap-2 text-xs">
                  {atrasado && (
                    <span className="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      ⚠️ Atrasado
                    </span>
                  )}
                  {inactivo && (
                    <span className="rounded-full bg-red-100 px-2 py-1 font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      🔴 {diasInactivo === null ? 'Nunca ha entrado' : `${diasInactivo} días sin entrar`}
                    </span>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
