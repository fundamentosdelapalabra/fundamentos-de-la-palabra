# Fundamentos de la Palabra — guía técnica del proyecto

Curso bíblico online. SPA en React + Vite + Tailwind CSS, con React Router v6 y Supabase (Auth + Postgres con RLS) como backend. Desplegado en Vercel, con auto-deploy al hacer `git push` a `main` en GitHub.

## Archivos clave

- `src/data/courseData.js` — todo el contenido del curso. Cada lección tiene un flag `"disponible": true/false` que controla si es visible/clicable en el índice (`Sidebar.jsx`). Por defecto, todo contenido nuevo debe entrar con `disponible: false` hasta que José confirme que se puede publicar.
- `src/pages/Landing.jsx` — página pública (antes de iniciar sesión). Tiene una constante `MOSTRAR_MAPA_INTERACTIVO` (mismo patrón que `disponible`) que controla si se muestra la sección del mapa interactivo del curso.
- `public/mapa-curso.html` — mapa interactivo del curso (HTML/CSS/JS vanilla, sin dependencias), embebido en `Landing.jsx` vía `<iframe src="/mapa-curso.html">`. El CSS original referenciaba una imagen `fondo.png` que nunca se llegó a subir; se quitó esa referencia y se dejó un fondo de color liso (`#f8efd9`).
- `src/context/AuthContext.jsx` — wrapper de Supabase Auth. Incluye `resetPasswordForEmail` / `updatePassword` para el flujo de recuperación de contraseña (rutas públicas `/recuperar-contrasena` y `/restablecer-contrasena`).
- `src/pages/Login.jsx` y `src/pages/Registro.jsx` — incluyen una casilla "Recordar email y contraseña" que guarda las credenciales **en texto plano** en `localStorage` (clave `fdp-remembered-credentials`). Es una decisión de seguridad consciente: José prefirió la comodidad pese al riesgo explicado (ver memoria del proyecto).
- `vercel.json` — rewrite `/(.*)` → `/index.html`, necesario para que las rutas internas de la SPA (`/aula/clase/0`, `/login`, etc.) no den 404 al refrescar o acceder directamente por URL en Vercel.

## Patrón de publicación de contenido

Todo contenido nuevo (lecciones, vídeos, secciones de la Landing) se integra en el código pero se mantiene oculto con un flag booleano (`disponible`, `MOSTRAR_MAPA_INTERACTIVO`) hasta que José da el visto bueno explícito. Esto permite preparar y revisar material sin publicarlo accidentalmente.

## Flujo de despliegue (importante)

- Claude edita archivos directamente, pero **nunca ejecuta `git add` / `git commit` / `git push` ni borra archivos en la carpeta del proyecto** vía shell — solo José lo hace, desde su propio PowerShell. (Hacerlo desde el sandbox corrompió `courseData.js` y el estado de `.git` en el pasado.)
- José usa PowerShell, que **no soporta `&&`** para encadenar comandos — siempre hay que darle los comandos por separado:
  ```
  cd "C:\Users\Jose\Documents\Claude\Projects\Fundamentos de la Palabra"
  git add .
  git commit -m "..."
  git push
  ```
- José cierra la consola con frecuencia, así que conviene incluir siempre la ruta completa del `cd` en las instrucciones, no asumir que ya está en la carpeta.
- Tras el `git push`, Vercel tarda 1-2 minutos en desplegar; un 404 o contenido desactualizado justo después del push suele ser solo caché o despliegue en curso, no un error real.

## Sobre José

No es desarrollador — viene de WordPress. Explicar todo en lenguaje llano, sin asumir conocimiento de git, variables de entorno, JSX, etc.
