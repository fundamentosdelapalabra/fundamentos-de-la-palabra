// courseData.js
// -----------------------------------------------------------------------------
// Toda la información de las clases del curso vive aquí. La interfaz (React)
// solo LEE de este archivo: para editar el contenido de una lección, edita
// el objeto correspondiente más abajo. No es necesario tocar componentes.
//
// Estructura de cada lección:
// {
//   id: number            -> 0 = Clase 0, 1-24 = número de semana
//   moduleId: number       -> 0 = introducción, 1-6 = módulo del curso
//   moduleTitle: string
//   weekLabel: string       -> Texto corto mostrado en el índice ("Semana 3")
//   title: string           -> Título de la lección
//   date: string (YYYY-MM-DD) -> Fecha propuesta de la clase
//   disponible: boolean     -> ¿Puede el alumno ENTRAR a esta lección? Ver abajo.
//   verse: string | null    -> Texto del versículo clave
//   verseRef: string | null -> Referencia del versículo (ej. "Juan 1:1")
//   summary: string         -> Texto del Resumen de la lección
//   activity: string        -> Texto de la Actividad / Aplicación
//   testMakeupUrl: string | "#" -> Enlace de RECUPERACIÓN del test (opcional).
//                              El test normal se juega en directo en clase con
//                              Kahoot (no hace falta enlace para eso). Pero si
//                              alguien no puede venir, puedes crear en Kahoot un
//                              "reto individual" (self-paced challenge) y pegar
//                              aquí su enlace. Mientras el valor sea "#", la web
//                              no muestra ningún botón de recuperación.
//   materialDriveUrl: string -> Enlace a la carpeta de Google Drive del material
// }
// -----------------------------------------------------------------------------
//
// CÓMO BLOQUEAR / DESBLOQUEAR UNA LECCIÓN ("disponible"):
// El índice de la izquierda siempre muestra TODAS las semanas del curso (para
// que se vea el recorrido completo), pero mientras "disponible" sea `false`
// el alumno no puede entrar a esa lección: la ve en la lista con un candado,
// pero al pulsarla no pasa nada (o ve un aviso de "próximamente").
//
// Cuando termines de preparar el contenido real de una semana (resumen,
// actividad, etc.), simplemente cambia su valor a `true`:
//   "disponible": true,
// y esa lección se desbloquea automáticamente para todos los alumnos.
// Por defecto, todas las lecciones empiezan en `false` hasta que las subáis.
// -----------------------------------------------------------------------------
//
// CÓMO CREAR EL ENLACE DE RECUPERACIÓN EN KAHOOT (testMakeupUrl):
// 1. Entra en tu Kahoot del test de esa semana (kahoot.com).
// 2. Pulsa "Reproducir" y elige la opción "Asignar" / "Self-paced" (en vez de
//    "Host en directo"). Kahoot genera un enlace tipo https://kahoot.it/challenge/...
// 3. Copia ese enlace y pégalo en "testMakeupUrl" de esa lección, entre comillas
//    normales, así: "testMakeupUrl": "https://kahoot.it/challenge/...",
// 4. En la web aparecerá automáticamente un botón "Recuperar el test" en la
//    pestaña de Test de esa lección.
// -----------------------------------------------------------------------------
//
// CÓMO ESCRIBIR "summary" Y "activity" (lee esto antes de pegar contenido):
//
// 1. Estos dos campos van siempre entre comillas invertidas (backticks: ` `),
//    NO entre comillas normales ("" o ''). Así puedes escribir comillas,
//    apóstrofes y acentos con total libertad sin que se rompa la página.
//    Ejemplo correcto:
//      "summary": `El profeta dijo: "Así dice el Señor..." y el pueblo escuchó.`,
//    Lo único que NO se puede usar dentro de los backticks es otro backtick (`)
//    ni el símbolo ${ (dólar + llave). Si nunca los usas, no hay riesgo.
//
// 2. Puedes incluir HTML sencillo dentro del texto: <strong>negrita</strong>,
//    <em>cursiva</em>, saltos de párrafo, imágenes y embeds de Canva/Slides:
//      "summary": `
//        <p>Texto de la lección...</p>
//        <img src="/images/semana-01/mapa.jpg" alt="Mapa bíblico" />
//        <iframe src="https://www.canva.com/design/XXXX/view?embed" allowfullscreen></iframe>
//      `,
//    Las imágenes se suben a la carpeta public/images/ del proyecto.
// -----------------------------------------------------------------------------

export const courseTitle = 'Fundamentos de la Palabra'

export const modules = [
  {
    "id": 0,
    "title": "Clase introductoria",
    "subtitle": "Antes de empezar"
  },
  {
    "id": 1,
    "title": "La Biblia, Dios y el comienzo de todo",
    "subtitle": "Semanas 1-4"
  },
  {
    "id": 2,
    "title": "Pacto, pueblo de Dios y obediencia",
    "subtitle": "Semanas 5-8"
  },
  {
    "id": 3,
    "title": "Reino, sabiduría, profetas y esperanza",
    "subtitle": "Semanas 9-12"
  },
  {
    "id": 4,
    "title": "Jesucristo y el evangelio",
    "subtitle": "Semanas 13-16"
  },
  {
    "id": 5,
    "title": "Vida del discípulo y la iglesia",
    "subtitle": "Semanas 17-20"
  },
  {
    "id": 6,
    "title": "Madurez, perseverancia y discipulado a otros",
    "subtitle": "Semanas 21-24"
  }
];

export const courseData = [
  {
    "id": 0,
    "moduleId": 0,
    "moduleTitle": "Clase introductoria",
    "weekLabel": "Clase 0",
    "title": "Presentación del grupo y cómo vamos a estudiar la Biblia juntos",
    "date": "2026-06-27",
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Bienvenido a «Fundamentos de la Palabra». Antes de la primera clase en vivo, mira este vídeo de presentación para conocer cómo vamos a estudiar la Biblia juntos durante los próximos 6 meses.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/WMNd5-si9FM" title="Fundamentos de la Palabra - Vídeo de bienvenida" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>`,
    "activity": `Esta semana no hay actividad: solo te pedimos ver el vídeo de presentación y unirte a la primera clase en vivo el sábado.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 1,
    "moduleId": 1,
    "moduleTitle": "La Biblia, Dios y el comienzo de todo",
    "weekLabel": "Semana 1",
    "title": "Qué es la Biblia y por qué debemos aprender a leerla bien",
    "date": "2026-07-05",
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Esta semana descubrimos qué es la Biblia, cómo fue escrita y por qué aprender a leerla bien cambia todo. Mira el vídeo antes de la clase del sábado.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/7Nr9GJNpd3w" title="La Palabra: Dios Hablando" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">🎙️ Locución — escucha el resumen</p>
<p>Si prefieres escuchar, aquí tienes una locución en formato pódcast con los puntos clave de esta semana.</p>
<a href="https://notebooklm.google.com/notebook/7daa5f63-7b5a-4e39-ae72-b9677f23c703/artifact/d5aa0a5d-5a18-420a-9bef-d5c4ffabf8ab" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🎙️ Escuchar locución</a>
<p style="margin-top:1.5rem;font-weight:600">Mapa Bíblico</p>
<p>Explora el mapa bíblico interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebooklm.google.com/notebook/7daa5f63-7b5a-4e39-ae72-b9677f23c703/artifact/a580ed30-ecd8-4a0c-be0a-f0606aa4e637" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🗺️ Abrir Mapa Bíblico</a>
<p style="margin-top:1.5rem;font-weight:600">Infografía interactiva</p>
<p>Explora los cuatro puntos clave de forma visual. Incluye modo profesor y pregunta rápida para usar en clase.</p>
<a href="/infografia-semana1.html" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Abrir Infografía</a>`,
    "activity": `<p>Esta semana repasa los conceptos clave con las tarjetas interactivas. Es una forma rápida y efectiva de fijar lo aprendido antes de la próxima clase.</p>
<a href="https://notebooklm.google.com/notebook/7daa5f63-7b5a-4e39-ae72-b9677f23c703/artifact/4f4bb64a-9584-426f-b3d2-9d2596991464" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Abrir Tarjetas Bíblicas</a>`,
    "testMakeupUrl": "https://notebooklm.google.com/notebook/7daa5f63-7b5a-4e39-ae72-b9677f23c703/artifact/73629ab1-e437-40ae-a190-d701d0dc3744",
    "materialDriveUrl": "https://docs.google.com/presentation/d/1_F6f5hcTiS_JrvuSkdwcYD4KJ_CL3Uhy/edit?slide=id.p1#slide=id.p1"
  },
  {
    "id": 2,
    "moduleId": 1,
    "moduleTitle": "La Biblia, Dios y el comienzo de todo",
    "weekLabel": "Semana 2",
    "title": "El gran mapa de la Biblia",
    "date": "2026-07-12",
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Esta semana trazamos el gran mapa de la Biblia: cómo se divide el Antiguo y el Nuevo Testamento, y el hilo que recorre toda la historia bíblica de principio a fin.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/jdAaLjViYw4" title="El gran mapa de la Biblia" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa Bíblico</p>
<p>Explora el mapa bíblico interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebooklm.google.com/notebook/ac251be9-c239-4e79-81c9-6757c2512146/artifact/3489db0b-60d7-4837-9779-14343869eb63" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🗺️ Abrir Mapa Bíblico</a>`,
    "activity": `<p>Explora la infografía interactiva de esta semana para repasar y fijar los conceptos del gran mapa de la Biblia.</p>
<a href="/infografia-semana2.html" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Abrir Infografía Interactiva</a>`,
    "testMakeupUrl": "https://notebooklm.google.com/notebook/ac251be9-c239-4e79-81c9-6757c2512146/artifact/c4c87385-fc77-464c-b608-248bb5bf9c35",
    "materialDriveUrl": "#"
  },
  {
    "id": 3,
    "moduleId": 1,
    "moduleTitle": "La Biblia, Dios y el comienzo de todo",
    "weekLabel": "Semana 3",
    "title": "Dios Creador y el origen de todo",
    "date": "2026-07-19",
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Esta semana exploramos quién es Dios como Creador y qué nos revela el origen de todo sobre su carácter y propósito.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/sFTNO8OQGbQ" title="Dios Creador y el origen de todo" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa Bíblico</p>
<p>Explora el mapa bíblico interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebooklm.google.com/notebook/821fe7c2-b49f-4d5c-871d-c1ecfe371071/artifact/3dfc1ab6-842e-4a95-b7c0-f28ecf0722a5" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🗺️ Abrir Mapa Bíblico</a>`,
    "activity": `<p>Repasa los conceptos de esta semana con las tarjetas interactivas y la infografía.</p>
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem">
  <a href="https://notebooklm.google.com/notebook/821fe7c2-b49f-4d5c-871d-c1ecfe371071/artifact/29882f4e-b228-4fa5-ba60-5948bd68fc76" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Tarjetas Bíblicas</a>
  <a href="/infografia-semana3.html" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Infografía Interactiva</a>
</div>`,
    "testMakeupUrl": "https://notebooklm.google.com/notebook/821fe7c2-b49f-4d5c-871d-c1ecfe371071/artifact/72d7c133-8025-4adf-afaf-98fa3c73618a",
    "materialDriveUrl": "https://notebooklm.google.com/notebook/821fe7c2-b49f-4d5c-871d-c1ecfe371071/artifact/d23d2f00-2427-40fa-ad2f-c96b740955d0"
  },
  {
    "id": 4,
    "moduleId": 1,
    "moduleTitle": "La Biblia, Dios y el comienzo de todo",
    "weekLabel": "Semana 4",
    "title": "La caída, el pecado y la primera promesa",
    "date": "2026-07-26",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 5,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 5",
    "title": "Abraham y el Dios que llama",
    "date": "2026-08-02",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 6,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 6",
    "title": "Moisés, liberación y formación del pueblo",
    "date": "2026-08-09",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 7,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 7",
    "title": "La ley, el pacto y la santidad de Dios",
    "date": "2026-08-16",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 8,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 8",
    "title": "Idolatría, desierto y fidelidad de Dios",
    "date": "2026-08-23",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 9,
    "moduleId": 3,
    "moduleTitle": "Reino, sabiduría, profetas y esperanza",
    "weekLabel": "Semana 9",
    "title": "David y el reino: liderazgo bajo Dios",
    "date": "2026-08-30",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 10,
    "moduleId": 3,
    "moduleTitle": "Reino, sabiduría, profetas y esperanza",
    "weekLabel": "Semana 10",
    "title": "Salmos y Proverbios: oración y sabiduría para vivir",
    "date": "2026-09-06",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 11,
    "moduleId": 3,
    "moduleTitle": "Reino, sabiduría, profetas y esperanza",
    "weekLabel": "Semana 11",
    "title": "Los profetas: volver a Dios con justicia y verdad",
    "date": "2026-09-13",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 12,
    "moduleId": 3,
    "moduleTitle": "Reino, sabiduría, profetas y esperanza",
    "weekLabel": "Semana 12",
    "title": "Esperanza mesiánica: la promesa que apunta hacia Cristo",
    "date": "2026-09-20",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 13,
    "moduleId": 4,
    "moduleTitle": "Jesucristo y el evangelio",
    "weekLabel": "Semana 13",
    "title": "Jesús: nacimiento, identidad y misión",
    "date": "2026-09-27",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 14,
    "moduleId": 4,
    "moduleTitle": "Jesucristo y el evangelio",
    "weekLabel": "Semana 14",
    "title": "El Reino de Dios y las enseñanzas de Jesús",
    "date": "2026-10-04",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 15,
    "moduleId": 4,
    "moduleTitle": "Jesucristo y el evangelio",
    "weekLabel": "Semana 15",
    "title": "La cruz: pecado, perdón y gracia",
    "date": "2026-10-11",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 16,
    "moduleId": 4,
    "moduleTitle": "Jesucristo y el evangelio",
    "weekLabel": "Semana 16",
    "title": "La resurrección y la buena noticia del evangelio",
    "date": "2026-10-18",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 17,
    "moduleId": 5,
    "moduleTitle": "Vida del discípulo y la iglesia",
    "weekLabel": "Semana 17",
    "title": "El Espíritu Santo y la vida nueva",
    "date": "2026-10-25",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 18,
    "moduleId": 5,
    "moduleTitle": "Vida del discípulo y la iglesia",
    "weekLabel": "Semana 18",
    "title": "Oración, comunión y vida diaria con Dios",
    "date": "2026-11-01",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 19,
    "moduleId": 5,
    "moduleTitle": "Vida del discípulo y la iglesia",
    "weekLabel": "Semana 19",
    "title": "La iglesia: familia, cuerpo y servicio",
    "date": "2026-11-08",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 20,
    "moduleId": 5,
    "moduleTitle": "Vida del discípulo y la iglesia",
    "weekLabel": "Semana 20",
    "title": "Misión: compartir la Palabra con humildad",
    "date": "2026-11-15",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 21,
    "moduleId": 6,
    "moduleTitle": "Madurez, perseverancia y discipulado a otros",
    "weekLabel": "Semana 21",
    "title": "Cómo leer un pasaje bíblico sin perderse",
    "date": "2026-11-22",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 22,
    "moduleId": 6,
    "moduleTitle": "Madurez, perseverancia y discipulado a otros",
    "weekLabel": "Semana 22",
    "title": "Cómo preparar una pequeña enseñanza bíblica",
    "date": "2026-11-29",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 23,
    "moduleId": 6,
    "moduleTitle": "Madurez, perseverancia y discipulado a otros",
    "weekLabel": "Semana 23",
    "title": "Perseverancia, pruebas y esperanza final",
    "date": "2026-12-06",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 24,
    "moduleId": 6,
    "moduleTitle": "Madurez, perseverancia y discipulado a otros",
    "weekLabel": "Semana 24",
    "title": "Cierre del curso: repaso final y envío a discipular",
    "date": "2026-12-13",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  }
];

export const totalWeeks = 24;

export function getLessonById(id) {
  return courseData.find((lesson) => lesson.id === id);
}

export function getModuleLessons(moduleId) {
  return courseData.filter((lesson) => lesson.moduleId === moduleId);
}

export function getNextLessonId(currentId) {
  const ids = courseData.map((l) => l.id).sort((a, b) => a - b);
  const idx = ids.indexOf(currentId);
  if (idx === -1 || idx === ids.length - 1) return null;
  return ids[idx + 1];
}
