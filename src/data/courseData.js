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
    "subtitle": "Semanas 5-9"
  },
  {
    "id": 3,
    "title": "Reino, sabiduría, profetas y esperanza",
    "subtitle": "Semanas 10-13"
  },
  {
    "id": 4,
    "title": "Jesucristo y el evangelio",
    "subtitle": "Semanas 14-17"
  },
  {
    "id": 5,
    "title": "Vida del discípulo y la iglesia",
    "subtitle": "Semanas 18-21"
  },
  {
    "id": 6,
    "title": "Madurez, perseverancia y discipulado a otros",
    "subtitle": "Semanas 22-25"
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
</div>
<p style="margin-top:1.5rem;font-weight:600">🎙️ Locución — escucha la presentación</p>
<p>Si prefieres escuchar, aquí tienes una locución en formato pódcast de esta presentación.</p>
<a href="https://go.ivoox.com/rf/179550242" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🎙️ Escuchar podcast</a>`,
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
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Esta semana descubrimos qué ocurrió en la caída, cómo entró el pecado en la historia humana y cuál fue la primera promesa de Dios.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/i5bXFA-MaJU" title="La caída, el pecado y la primera promesa" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa Bíblico</p>
<p>Explora el mapa bíblico interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebook.google.com/notebook/9a83a2b1-16ce-4e2f-90a6-5d6dc870f0de/artifact/8a216e82-a2ed-42ea-af68-3abba77c521b" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🗺️ Abrir Mapa Bíblico</a>`,
    "activity": `<p>Repasa los conceptos de esta semana con las tarjetas interactivas y la infografía.</p>
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem">
  <a href="https://notebook.google.com/notebook/9a83a2b1-16ce-4e2f-90a6-5d6dc870f0de/artifact/e99bd336-c28e-448a-b87f-0272ea7b5d67" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Tarjetas Bíblicas</a>
  <a href="/infografia-semana4.html" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Infografía Interactiva</a>
</div>`,
    "testMakeupUrl": "https://notebook.google.com/notebook/9a83a2b1-16ce-4e2f-90a6-5d6dc870f0de/artifact/e18a2b98-bd91-4b78-8131-f3020a38c3f1",
    "materialDriveUrl": "/material-semana4.pptx"
  },
  {
    "id": 5,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 5",
    "title": "Abraham y el Dios que llama",
    "date": "2026-08-01",
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Esta semana conocemos a Abraham y al Dios que llama: cómo Dios inicia una promesa de fe, pacto y obediencia que marcará el resto de la Escritura. Mira el vídeo antes de la clase del sábado.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/DQOqlUEJhLw" title="Abraham y el Dios que llama" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa mental</p>
<p>Explora el mapa mental interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebook.google.com/notebook/3918fef8-a275-4e04-8503-339c87a37dcd/artifact/094ef3e1-36d6-423f-b393-8f2e8aa1898d?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🧠 Abrir Mapa Mental</a>`,
    "activity": `<p>Repasa los conceptos de esta semana con las tarjetas interactivas y la infografía.</p>
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem">
  <a href="https://notebook.google.com/notebook/3918fef8-a275-4e04-8503-339c87a37dcd/artifact/ff9bd1c7-cab5-4a46-9b6e-1fa61f8183c7?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Tarjetas Bíblicas</a>
  <a href="/infografia-semana5.html" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Infografía Interactiva</a>
</div>`,
    "testMakeupUrl": "https://notebook.google.com/notebook/3918fef8-a275-4e04-8503-339c87a37dcd/artifact/ee90c99f-46bf-45db-b7f2-f19a96cc41de?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_",
    "materialDriveUrl": "https://docs.google.com/presentation/d/1v_28OwRaqwG9DUxGcekDu4qBHFc4n4MY/edit?usp=drive_web&ouid=113236244804924227906&rtpof=true"
  },
  {
    "id": 6,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 6",
    "title": "Noé, el diluvio, el pacto y Babel",
    "date": "2026-08-08",
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Esta semana conocemos a Noé, el diluvio, el pacto del arcoíris y la dispersión de las naciones en Babel. Mira el vídeo antes de la clase del sábado.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/t04iGz8txWw" title="Noé, el diluvio, el pacto y Babel" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa mental</p>
<p>Explora el mapa mental interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebook.google.com/notebook/1347079b-f4ca-4ff4-a1c9-d07cd2cec881/artifact/4bfad26f-9232-445d-b6ee-f54dce1a724a?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🧠 Abrir Mapa Mental</a>`,
    "activity": `<p>Repasa los conceptos de esta semana con las tarjetas interactivas y la infografía.</p>
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem">
  <a href="https://notebook.google.com/notebook/1347079b-f4ca-4ff4-a1c9-d07cd2cec881/artifact/0719e030-fff5-4f95-bbac-0e81ab1f09d4?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Tarjetas Bíblicas</a>
  <a href="/infografia-semana6.html" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Infografía Interactiva</a>
</div>`,
    "testMakeupUrl": "https://notebook.google.com/notebook/1347079b-f4ca-4ff4-a1c9-d07cd2cec881/artifact/8c911a6a-f84f-40b3-a301-e8a46abc26e1?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_",
    "materialDriveUrl": "/material-semana6.pptx"
  },
  {
    "id": 7,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 7",
    "title": "Moisés, liberación y formación del pueblo",
    "date": "2026-08-22",
    "disponible": true,
    "verse": "Yo soy el que soy.",
    "verseRef": "Éxodo 3:14",
    "summary": `<p>Esta semana conocemos a Moisés: la esclavitud del pueblo en Egipto, el llamado de Dios desde la zarza, la Pascua, la salida de Egipto y la confianza en Dios cuando no parece haber salida. Mira el vídeo antes de la clase del sábado.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/MskwdgN-APM" title="Moisés, liberación y formación del pueblo" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa mental</p>
<p>Explora el mapa mental interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebook.google.com/notebook/a94cdc8f-bee9-40fd-9cf7-287261283d1c/artifact/3c09db7f-f9ed-426e-9ae3-7c8bccf22167?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🧠 Abrir Mapa Mental</a>`,
    "activity": `<p>Esta semana repasa los conceptos clave con las tarjetas interactivas. Es una forma rápida y efectiva de fijar lo aprendido antes de la próxima clase.</p>
<a href="https://notebook.google.com/notebook/a94cdc8f-bee9-40fd-9cf7-287261283d1c/artifact/06621d2e-e9ef-4d75-858e-778433535521?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Abrir Tarjetas Bíblicas</a>`,
    "testMakeupUrl": "https://notebook.google.com/notebook/a94cdc8f-bee9-40fd-9cf7-287261283d1c/artifact/2ec14f2c-c8b2-4221-b76d-e974f21dc396?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_",
    "materialDriveUrl": "/material-semana7.pptx"
  },
  {
    "id": 8,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 8",
    "title": "Ley, pacto y santidad",
    "date": "2026-08-29",
    "disponible": true,
    "verse": null,
    "verseRef": null,
    "summary": `<p>Esta semana descubrimos cómo la ley llega después de la liberación: el pacto del Sinaí, los Diez Mandamientos y el llamado a la santidad como respuesta a la gracia ya recibida, no como condición para ella. Mira el vídeo antes de la clase del viernes.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/nfW-SBfUrbQ" title="Ley, pacto y santidad" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa mental</p>
<p>Explora el mapa mental interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebook.google.com/notebook/337ecce5-04e1-4ae7-a3aa-5f12de7bbaaa/artifact/773771c3-f621-4766-a6fd-dddc7e2974d9" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🧠 Abrir Mapa Mental</a>`,
    "activity": `<p>Repasa los conceptos de esta semana con las tarjetas interactivas y la infografía.</p>
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem">
  <a href="https://notebook.google.com/notebook/337ecce5-04e1-4ae7-a3aa-5f12de7bbaaa/artifact/46a4e3c8-c737-4611-940f-b704756d9ea6" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Tarjetas Bíblicas</a>
  <a href="https://claude.ai/code/artifact/880729f4-37a8-4dda-8eab-755b4b1afc95" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Infografía Interactiva</a>
</div>`,
    "testMakeupUrl": "https://notebook.google.com/notebook/337ecce5-04e1-4ae7-a3aa-5f12de7bbaaa/artifact/eae88e82-e649-4bab-bf89-f34f2ae2f734",
    "materialDriveUrl": "https://drive.google.com/file/d/1G-0ShxvAPCuNwfSBRGH2Ln4gF-R_Xp5j/view?usp=drivesdk"
  },
  {
    "id": 9,
    "moduleId": 2,
    "moduleTitle": "Pacto, pueblo de Dios y obediencia",
    "weekLabel": "Semana 9",
    "title": "Idolatría, desierto y fidelidad de Dios",
    "date": "2026-09-05",
    "disponible": true,
    "verse": "Jehová, tardo para la ira y grande en misericordia, que perdona la iniquidad y la rebelión, aunque de ningún modo tendrá por inocente al culpable.",
    "verseRef": "Números 14:18",
    "summary": `<p>Israel ha sido liberado, ha recibido el pacto y ha conocido la voluntad de Dios; sin embargo, el corazón humano sigue inclinándose a la idolatría, a la queja y a la incredulidad. Esta semana recorremos el becerro de oro (Éxodo 32), la queja en el desierto (Números 11), el informe de los espías (Números 13-14) y Meriba (Números 20): el desierto revela el corazón humano, pero también revela la fidelidad de Dios. Mira el vídeo antes de la clase del sábado.</p>
<div style="position:relative;width:100%;max-width:720px;aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin-top:1rem">
  <iframe src="https://www.youtube.com/embed/c4ixlGSGWKc" title="Idolatría, desierto y fidelidad de Dios" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p style="margin-top:1.5rem;font-weight:600">Mapa mental</p>
<p>Explora el mapa mental interactivo para ver cómo encaja esta lección en el gran relato de la Escritura.</p>
<a href="https://notebook.google.com/notebook/d3879ec7-a354-469a-809e-d9bdeb1ac695/artifact/6b771baf-0a68-4389-b67a-55f80d2ced54" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.75rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🧠 Abrir Mapa Mental</a>
<p style="margin-top:1.5rem;font-weight:600">Podcast</p>
<p>Escucha este podcast antes de la clase: una reflexión sobre por qué, como Israel en el desierto, a veces saboteamos nuestra propia libertad.</p>
<audio controls style="width:100%;max-width:480px;margin-top:0.5rem">
  <source src="/podcast-semana9.mp3" type="audio/mpeg" />
  Tu navegador no soporta el elemento de audio. <a href="/podcast-semana9.mp3">Descarga el podcast aquí</a>.
</audio>`,
    "activity": `<p>Repasa los conceptos de esta semana con las tarjetas interactivas y la infografía.</p>
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem">
  <a href="https://notebook.google.com/notebook/d3879ec7-a354-469a-809e-d9bdeb1ac695/artifact/428e9de4-9349-4d08-b327-ee62dcbb8250" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">🃏 Tarjetas Bíblicas</a>
  <a href="https://claude.ai/code/artifact/a94bf568-324e-4f2d-bb50-e8a9975cd065" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;background:#295674;color:white;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600">📊 Infografía Interactiva</a>
</div>`,
    "testMakeupUrl": "https://notebook.google.com/notebook/d3879ec7-a354-469a-809e-d9bdeb1ac695/artifact/9925e641-8ca3-448b-8718-396b044a4ef6",
    "materialDriveUrl": "/material-semana9.pptx"
  },
  {
    "id": 10,
    "moduleId": 3,
    "moduleTitle": "Reino, sabiduría, profetas y esperanza",
    "weekLabel": "Semana 10",
    "title": "David y el reino: liderazgo bajo Dios",
    "date": "2026-09-12",
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
    "title": "Salmos y Proverbios: oración y sabiduría para vivir",
    "date": "2026-09-19",
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
    "title": "Los profetas: volver a Dios con justicia y verdad",
    "date": "2026-09-26",
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
    "moduleId": 3,
    "moduleTitle": "Reino, sabiduría, profetas y esperanza",
    "weekLabel": "Semana 13",
    "title": "Esperanza mesiánica: la promesa que apunta hacia Cristo",
    "date": "2026-10-03",
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
    "title": "Jesús: nacimiento, identidad y misión",
    "date": "2026-10-10",
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
    "title": "El Reino de Dios y las enseñanzas de Jesús",
    "date": "2026-10-17",
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
    "title": "La cruz: pecado, perdón y gracia",
    "date": "2026-10-24",
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
    "moduleId": 4,
    "moduleTitle": "Jesucristo y el evangelio",
    "weekLabel": "Semana 17",
    "title": "La resurrección y la buena noticia del evangelio",
    "date": "2026-10-31",
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
    "title": "El Espíritu Santo y la vida nueva",
    "date": "2026-11-07",
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
    "title": "Oración, comunión y vida diaria con Dios",
    "date": "2026-11-14",
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
    "title": "La iglesia: familia, cuerpo y servicio",
    "date": "2026-11-21",
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
    "moduleId": 5,
    "moduleTitle": "Vida del discípulo y la iglesia",
    "weekLabel": "Semana 21",
    "title": "Misión: compartir la Palabra con humildad",
    "date": "2026-11-28",
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
    "title": "Cómo leer un pasaje bíblico sin perderse",
    "date": "2026-12-05",
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
    "title": "Cómo preparar una pequeña enseñanza bíblica",
    "date": "2026-12-12",
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
    "title": "Perseverancia, pruebas y esperanza final",
    "date": "2026-12-19",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  },
  {
    "id": 25,
    "moduleId": 6,
    "moduleTitle": "Madurez, perseverancia y discipulado a otros",
    "weekLabel": "Semana 25",
    "title": "Cierre del curso: repaso final y envío a discipular",
    "date": "2026-12-26",
    "disponible": false,
    "verse": null,
    "verseRef": null,
    "summary": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "activity": `Estamos preparando esta lección con cuidado. Estará disponible próximamente.`,
    "testMakeupUrl": "#",
    "materialDriveUrl": "#"
  }

];

export const totalWeeks = 25;

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
