import { Link } from 'react-router-dom'

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-paper px-6 py-16 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">Aviso Legal</h1>
        <div className="prose max-w-none text-gray-700 space-y-4 dark:text-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">1. Datos identificativos</h2>
          <p>
            En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios
            de la Sociedad de la Información y el Comercio Electrónico (LSSI-CE), se facilitan los
            siguientes datos del titular de esta web:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Denominación:</strong> Fundamentos de la Palabra
            </li>
            <li>
              <strong>Titular:</strong> José Cabrelles Sanz
            </li>
            <li>
              <strong>NIF/DNI:</strong> 19837890E
            </li>
            <li>
              <strong>Domicilio:</strong> C/ La Perdiu 1, 08184, Palau-solità i Plegamans,
              Barcelona
            </li>
            <li>
              <strong>Email de contacto:</strong> fundamentosdelapalabra@gmail.com
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">2. Objeto</h2>
          <p>
            Esta web (fundamentosdelapalabra.com) pone a disposición de los usuarios una
            plataforma de formación bíblica online (curso "Fundamentos de la Palabra"), así como
            contenidos informativos relacionados.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">
            3. Propiedad intelectual e industrial
          </h2>
          <p>
            Todos los contenidos de esta web (textos, imágenes, diseños, logos, estructura) son
            propiedad de Fundamentos de la Palabra o de sus legítimos titulares y están protegidos
            por las leyes de propiedad intelectual e industrial. Queda prohibida su reproducción,
            distribución o comunicación pública sin autorización expresa.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">4. Hosting y Tecnología</h2>
          <p>
            La plataforma está alojada en los servidores de Vercel Inc., con domicilio en EE.UU.,
            cumpliendo con las normativas de transferencia internacional de datos. El código
            fuente de la aplicación es de propiedad privada.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 dark:text-gray-100">
            5. Limitación de responsabilidad
          </h2>
          <p>
            Fundamentos de la Palabra no se hace responsable de los posibles daños o perjuicios
            que se puedan derivar del uso de la información publicada, ni de las interferencias
            que puedan ocurrir durante las clases en vivo a través de Google Meet, siendo esta una
            herramienta de terceros.
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
