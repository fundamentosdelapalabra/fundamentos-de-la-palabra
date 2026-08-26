// TestLeccion.jsx
// -----------------------------------------------------------------------------
// Cuestionario autocalificado de la lección (pestaña "Test Semanal"). Las
// preguntas y opciones las crea el profesor desde el Panel de contenido; el
// alumno responde aquí y la corrección se hace en el servidor (función
// enviar_intento_test en Supabase), para que la respuesta correcta nunca
// viaje al navegador del alumno.
//
// Si la lección todavía no tiene preguntas cargadas, se muestra el enlace de
// recuperación de siempre (si lo hay) como alternativa.
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'

export default function TestLeccion({ lesson }) {
  const { user } = useAuth()
  const [cargando, setCargando] = useState(true)
  const [preguntas, setPreguntas] = useState([])
  const [respuestas, setRespuestas] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [ultimoIntento, setUltimoIntento] = useState(null)

  useEffect(() => {
    let cancelado = false

    async function cargar() {
      if (!lesson.dbId) {
        setCargando(false)
        setPreguntas([])
        return
      }
      setCargando(true)
      setResultado(null)
      setRespuestas({})

      const [preguntasRes, intentoRes] = await Promise.all([
        supabase
          .from('preguntas_test')
          .select('id, enunciado, orden')
          .eq('leccion_id', lesson.dbId)
          .order('orden'),
        user
          ? supabase
              .from('intentos_test')
              .select('puntuacion, total, fecha')
              .eq('leccion_id', lesson.dbId)
              .eq('alumno_id', user.id)
              .order('fecha', { ascending: false })
              .limit(1)
              .maybeSingle()
          : Promise.resolve({ data: null }),
      ])

      const preg = preguntasRes.data || []
      let lista = []
      if (preg.length > 0) {
        const { data: ops } = await supabase
          .from('opciones_test_alumno')
          .select('id, pregunta_id, texto, orden')
          .in(
            'pregunta_id',
            preg.map((p) => p.id)
          )
          .order('orden')
        lista = preg.map((p) => ({
          ...p,
          opciones: (ops || []).filter((o) => o.pregunta_id === p.id),
        }))
      }

      if (!cancelado) {
        setPreguntas(lista)
        setUltimoIntento(intentoRes.data || null)
        setCargando(false)
      }
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [lesson.dbId, user])

  function elegir(preguntaId, opcionId) {
    setRespuestas((r) => ({ ...r, [preguntaId]: opcionId }))
  }

  const todasRespondidas = preguntas.length > 0 && preguntas.every((p) => respuestas[p.id])

  async function enviar() {
    setEnviando(true)
    const payload = Object.entries(respuestas).map(([pregunta_id, opcion_id]) => ({
      pregunta_id,
      opcion_id,
    }))
    const { data, error } = await supabase.rpc('enviar_intento_test', {
      p_leccion_id: lesson.dbId,
      p_respuestas: payload,
    })
    setEnviando(false)
    if (error) {
      alert('No se pudo enviar el test: ' + error.message)
      return
    }
    setResultado(data)
    setUltimoIntento({ puntuacion: data.puntuacion, total: data.total, fecha: new Date().toISOString() })
  }

  function reintentar() {
    setRespuestas({})
    setResultado(null)
  }

  if (cargando) {
    return <p className="text-sm text-gray-400 dark:text-gray-500">Cargando…</p>
  }

  if (preguntas.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
          {lesson.testMakeupUrl && lesson.testMakeupUrl !== '#'
            ? 'Puedes hacer el test de recuperación de esta semana a tu propio ritmo.'
            : 'Todavía no hay ningún test disponible para esta semana.'}
        </p>
        {lesson.testMakeupUrl && lesson.testMakeupUrl !== '#' && (
          <a
            href={lesson.testMakeupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
          >
            Hacer el Test
          </a>
        )}
      </div>
    )
  }

  if (resultado) {
    return (
      <div className="flex flex-col items-start gap-4">
        <div className="rounded-xl border border-navy/20 bg-navy/5 px-5 py-4 dark:bg-navy-light/10">
          <p className="text-lg font-semibold text-navy dark:text-navy-light">
            Tu nota: {resultado.puntuacion} de {resultado.total}
          </p>
        </div>
        <button
          type="button"
          onClick={reintentar}
          className="inline-flex items-center gap-2 rounded-lg border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5 dark:border-navy-light dark:text-navy-light dark:hover:bg-navy-light/10"
        >
          Volver a intentarlo
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {ultimoIntento && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tu última nota fue {ultimoIntento.puntuacion} de {ultimoIntento.total}. Puedes volver a
          intentarlo cuando quieras.
        </p>
      )}

      {preguntas.map((p, i) => (
        <div key={p.id}>
          <p className="text-[15px] font-semibold text-ink dark:text-gray-100">
            {i + 1}. {p.enunciado}
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            {p.opciones.map((o) => (
              <label
                key={o.id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                  respuestas[p.id] === o.id
                    ? 'border-navy bg-navy/5 dark:border-navy-light dark:bg-navy-light/10'
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name={`pregunta-${p.id}`}
                  checked={respuestas[p.id] === o.id}
                  onChange={() => elegir(p.id, o.id)}
                  className="h-4 w-4"
                />
                <span className="text-ink dark:text-gray-100">{o.texto}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        disabled={!todasRespondidas || enviando}
        onClick={enviar}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark disabled:opacity-50"
      >
        {enviando ? 'Enviando…' : 'Corregir test'}
      </button>
    </div>
  )
}
