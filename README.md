# Fundamentos de la Palabra

SPA del curso bíblico "Fundamentos de la Palabra", construida con React + Vite, Tailwind CSS y React Router.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador. El proyecto recompila automáticamente al guardar cambios.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura

```
src/
  data/courseData.js       -> Contenido de las 25 clases (Clase 0 + Semanas 1-24). Edita aquí los textos.
  context/ProgressContext.jsx -> Progreso del alumno (localStorage), vía React Context.
  components/
    Sidebar.jsx             -> Logo, botón de Meet, índice de módulos, calendario, material descargable.
    LessonView.jsx          -> Cabecera de la lección, versículo, contenido y botón de completar.
    LessonTabs.jsx          -> Pestañas: Resumen, Actividad, Test Semanal, Descargar Material.
    ProgressBar.jsx         -> Indicador "Semana X de 24".
  App.jsx                   -> Rutas (`/clase/:id`) y layout responsivo (sidebar fijo en escritorio, drawer en móvil).
```

## Editar el contenido del curso

Todo el texto de las lecciones vive en `src/data/courseData.js`. Cada lección es un objeto con estos campos:

- `title`, `weekLabel`, `moduleTitle`, `date`
- `verse` / `verseRef` — versículo clave (déjalo en `null` si no hay)
- `summary` — texto de la pestaña Resumen
- `activity` — texto de la pestaña Actividad / Aplicación
- `testFormUrl` — enlace al Google Form del test semanal
- `materialDriveUrl` — enlace a la carpeta de Google Drive del material

No es necesario tocar ningún componente para actualizar el contenido.

## Personalización pendiente

- **Calendario**: el iframe en `Sidebar.jsx` usa un calendario público de ejemplo. Sustituye `CALENDAR_EMBED_URL` por el enlace de inserción (`Configuración > Integrar calendario`) de tu propio Google Calendar.
- **Test semanal / Material**: los campos `testFormUrl` y `materialDriveUrl` apuntan a `#` por ahora; sustitúyelos por tus enlaces reales de Google Forms / Google Drive en `courseData.js`.
- **Enlace de Meet**: definido en `MEET_URL` dentro de `Sidebar.jsx`.
