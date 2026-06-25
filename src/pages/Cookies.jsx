import { Link } from 'react-router-dom'

export default function Cookies() {
  return (
    <div className="min-h-screen bg-paper px-6 py-16 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">Política de Cookies</h1>
        <div className="prose max-w-none text-gray-700 space-y-4 dark:text-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
            (ordenador, tableta o móvil) cuando visita una página web. Permiten que el sitio
            recuerde sus acciones y preferencias durante un tiempo.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">
            Cookies técnicas necesarias (Propias)
          </h2>
          <p>
            Esta web utiliza cookies estrictamente necesarias para el correcto funcionamiento de
            la plataforma. Almacenamos un pequeño identificador en su navegador (localStorage)
            exclusivamente para:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Recordar si ha iniciado sesión.</li>
            <li>Guardar su progreso en las lecciones (clases completadas).</li>
            <li>Recordar si ha firmado los consentimientos legales.</li>
          </ul>
          <p>
            <strong>Estas cookies no se pueden desactivar</strong>, ya que sin ellas la plataforma
            de aprendizaje no funcionaría correctamente.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">Cookies de terceros</h2>
          <p>
            Al integrar servicios externos para mejorar la experiencia del alumno, se pueden
            generar cookies de terceros:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Google Calendar:</strong> Al incrustar el calendario del curso, Google puede
              establecer cookies propias para su correcto funcionamiento y analítica.
            </li>
            <li>
              <strong>Google Meet:</strong> Al acceder a las clases en vivo a través del enlace,
              Google aplicará su propia política de cookies y privacidad.
            </li>
          </ul>
          <p>
            No tenemos acceso ni control sobre las cookies establecidas por estos servicios de
            terceros. Le recomendamos consultar sus respectivas políticas de privacidad para más
            información.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">Cómo gestionar las cookies</h2>
          <p>
            Puede configurar su navegador para bloquear o alertar sobre estas cookies, aunque esto
            afectará al funcionamiento de ciertas áreas de nuestra plataforma. Desde los ajustes
            de su navegador (Chrome, Safari, Firefox, Edge) puede gestionar y eliminar las cookies
            existentes.
          </p>
        </div>

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
