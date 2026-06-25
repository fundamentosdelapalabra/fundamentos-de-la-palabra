import { Link } from 'react-router-dom'

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-paper px-6 py-16 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">Política de Privacidad</h1>
        <div className="prose max-w-none text-gray-700 space-y-4 dark:text-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">1. Responsable del tratamiento</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Responsable:</strong> José Cabrelles Sanz
            </li>
            <li>
              <strong>NIF/DNI:</strong> 19837890E
            </li>
            <li>
              <strong>Domicilio:</strong> C/ La Perdiu 1, 08184, Palau-solità i Plegamans,
              Barcelona
            </li>
            <li>
              <strong>Contacto:</strong> fundamentosdelapalabra@gmail.com
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">
            2. Finalidad del tratamiento
          </h2>
          <p>
            Tratamos sus datos personales (Nombre, Apellido, Email y Contraseña encriptada)
            exclusivamente para:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gestionar su inscripción y acceso al curso bíblico "Fundamentos de la Palabra".</li>
            <li>Registrar de forma inequívoca su consentimiento para la grabación de las clases.</li>
            <li>Guardar su progreso educativo dentro de la plataforma.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">3. Legitimación</h2>
          <p>
            La base legal para el tratamiento de sus datos es su consentimiento explícito,
            prestado mediante la marcación de las casillas correspondientes en el formulario de
            registro y la firma en la pantalla de consentimiento.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">
            4. Destinatarios de los datos
          </h2>
          <p>
            Sus datos no se venden, comparten ni ceden a terceros con fines comerciales. Los
            datos se alojan de forma segura en los servidores de Supabase (empresa ubicada en la
            Unión Europea) y en los de Vercel (para el alojamiento de la web), bajo estrictos
            protocolos de seguridad.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">5. Derechos del interesado</h2>
          <p>
            Usted tiene derecho a acceder a sus datos personales, rectificar los inexactos,
            solicitar su supresión, limitar su tratamiento u oponerse al mismo. Puede ejercer
            estos derechos enviando un correo electrónico a fundamentosdelapalabra@gmail.com
            indicando el asunto "Derechos RGPD".
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">
            6. Conservación de los datos
          </h2>
          <p>
            Los datos se conservarán mientras el usuario esté inscrito en el curso y durante el
            tiempo necesario para cumplir con las obligaciones legales aplicables. Una vez
            finalizado el curso, los datos se eliminarán a petición del interesado.
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
