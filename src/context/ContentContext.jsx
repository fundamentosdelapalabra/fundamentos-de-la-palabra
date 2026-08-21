import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { courseTitle, modules as staticModules, courseData as staticCourseData } from '../data/courseData.js'

const CURSO_SLUG = 'fundamentos-de-la-palabra'
const ContentContext = createContext(undefined)

export function toYoutubeEmbed(url) {
  if (!url) return null
  const trimmed = url.trim()
  if (!trimmed) return null
  if (trimmed.includes('/embed/')) return trimmed
  const short = trimmed.match(/youtu\.be\/([\w-]+)/)
  if (short) return `https://www.youtube.com/embed/${short[1]}`
  const watch = trimmed.match(/[?&]v=([\w-]+)/)
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`
  return trimmed
}

function mergeLesson(base, fila) {
  if (!fila) return base
  return {
    ...base,
    dbId: fila.id,
    videoUrl: toYoutubeEmbed(fila.video_url),
    summary: fila.resumen || base.summary,
    activity: fila.actividad_descripcion || base.activity,
    materialDriveUrl: fila.material_url || base.materialDriveUrl,
    testMakeupUrl: fila.test_url || base.testMakeupUrl,
    disponible: fila.publicado ?? base.disponible,
  }
}

export function ContentProvider({ children }) {
  const [overrides, setOverrides] = useState({})
  const [cursoId, setCursoId] = useState(null)
  const [loading, setLoading] = useState(true)

  const cargar = useCallback(async () => {
    setLoading(true)
    const { data: curso } = await supabase.from('cursos').select('id').eq('slug', CURSO_SLUG).single()
    if (!curso) { setLoading(false); return }
    setCursoId(curso.id)
    const { data, error } = await supabase
      .from('lecciones')
      .select('id, orden, video_url, resumen, actividad_descripcion, material_url, test_url, publicado')
      .eq('curso_id', curso.id)
    if (!error && data) {
      const map = {}
      data.forEach((fila) => { map[fila.orden] = fila })
      setOverrides(map)
    }
    setLoading(false)
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const courseData = staticCourseData.map((lesson) => mergeLesson(lesson, overrides[lesson.id]))

  function getLessonById(id) { return courseData.find((l) => l.id === id) }
  function getModuleLessons(moduleId) { return courseData.filter((l) => l.moduleId === moduleId) }
  function getNextLessonId(currentId) {
    const ids = courseData.map((l) => l.id).sort((a, b) => a - b)
    const idx = ids.indexOf(currentId)
    if (idx === -1 || idx === ids.length - 1) return null
    return ids[idx + 1]
  }

  const value = { courseTitle, modules: staticModules, courseData, cursoId, loading, getLessonById, getModuleLessons, getNextLessonId, refresh: cargar }
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (ctx === undefined) throw new Error('useContent debe usarse dentro de un <ContentProvider>.')
  return ctx
}
