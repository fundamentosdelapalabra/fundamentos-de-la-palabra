import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'
import Modal from '../components/Modal.jsx'

export default function Consentimiento() {
  const navigate = useNavigate()
  const [video, setVideo] = useState(false)
  const [privacidad, setPrivacidad] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState(null) // null | 'grabacion' | 'privacidad'
  const [hasReadVideo, setHasReadVideo] = useState(false)
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false)

  const canContinue = hasReadVideo && hasReadPrivacy && video && privacidad

  function closeVideoModal() {
    setOpenModal(null)
    setHasReadVideo(true)
  }

  function closePrivacyModal() {
    setOpenModal(null)
    setHasReadPrivacy(true)
  }

  async function handleSubmit() {
    if (!canContinue || loading) return
    setLoading(true)
    setError('')

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        consentimiento_video: true,
        consentimiento_privacidad: true,
      },
    })

    setLoading(false)

    if (updateError) {
      setError('No se ha podido guardar tu consentimiento. Inténtalo de nuevo.')
      return
    }

    navigate('/aula')
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-paper px-6 py-12 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-soft dark:bg-gray-900">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy/70 dark:text-navy-light/80">
          Fundamentos de la Palabra
        </p>
        <h1 className="mt-2 font-serif text-2xl font-bold leading-tight text-navy sm:text-3xl dark:text-navy-light">
          Consentimiento Obligatorio
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Las clases de este curso se imparten y se graban a través de Google Meet. Antes de
          acceder al aula, necesitamos tu consentimiento explícito para grabar las sesiones y
          para el tratamiento de tus datos personales.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label
              className={`flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 ${
                !hasReadVideo ? 'opacity-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={video}
                disabled={!hasReadVideo}
                onChange={(e) => setVideo(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-navy focus:ring-navy disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800"
              />
              <span>
                Doy mi consentimiento expreso para que mi voz e imagen sean grabadas durante las
                clases en Google Meet con fines exclusivamente educativos para este grupo.
              </span>
            </label>
            <div className="ml-7 mt-1">
              <button
                type="button"
                onClick={() => setOpenModal('grabacion')}
                className="text-sm font-semibold text-navy underline hover:text-navy-dark dark:text-navy-light dark:hover:text-navy"
              >
                📖 Leer documento de consentimiento de grabación
              </button>
              {!hasReadVideo && (
                <p className="mt-0.5 text-xs text-red-400 dark:text-red-400/80">
                  (Debes leer el documento para poder aceptar)
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className={`flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 ${
                !hasReadPrivacy ? 'opacity-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={privacidad}
                disabled={!hasReadPrivacy}
                onChange={(e) => setPrivacidad(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-navy focus:ring-navy disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800"
              />
              <span>He leído y acepto la Política de Privacidad de Fundamentos de la Palabra.</span>
            </label>
            <div className="ml-7 mt-1">
              <button
                type="button"
                onClick={() => setOpenModal('privacidad')}
                className="text-sm font-semibold text-navy underline hover:text-navy-dark dark:text-navy-light dark:hover:text-navy"
              >
                📖 Leer Política de Privacidad
              </button>
              {!hasReadPrivacy && (
                <p className="mt-0.5 text-xs text-red-400 dark:text-red-400/80">
                  (Debes leer el documento para poder aceptar)
                </p>
              )}
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!canContinue || loading}
          className="mt-8 w-full rounded-lg bg-navy px-4 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? 'Guardando…' : 'Firmar y acceder al Aula'}
        </button>
      </div>

      <Modal isOpen={openModal === 'grabacion'} onClose={closeVideoModal}>
        <h2 className="font-serif text-xl font-bold text-navy dark:text-navy-light">
          Acuerdo de Consentimiento de Grabación de Video y Audio
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          Fundamentos de la Palabra (en adelante, la Organización) realizará grabaciones de
          audio y video de las clases en línea a través de la plataforma Google Meet con fines
          exclusivamente educativos y pastorales para los alumnos inscritos.
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Alcance del consentimiento:</strong> Usted acepta que su imagen, voz y
            nombre mostrado en pantalla sean grabados.
          </li>
          <li>
            <strong>Uso de las grabaciones:</strong> Las grabaciones serán utilizadas única y
            exclusivamente para que los alumnos del curso puedan revisar las clases. No se
            publicarán en redes sociales, YouTube, ni plataformas públicas sin una autorización
            adicional expresa.
          </li>
          <li>
            <strong>Almacenamiento:</strong> Los archivos se almacenarán en un Google Drive
            privado al que solo tiene acceso el administrador del curso (José Cabrelles Sanz).
          </li>
          <li>
            <strong>Duración:</strong> Las grabaciones se conservarán durante la duración del
            curso y hasta 6 meses después de su finalización para repaso, tras lo cual serán
            borradas de forma permanente.
          </li>
          <li>
            <strong>Revocación:</strong> Puede revocar este consentimiento en cualquier momento
            enviando un correo a{' '}
            <a href="mailto:fundamentosdelapalabra@gmail.com" className="text-navy underline dark:text-navy-light">
              fundamentosdelapalabra@gmail.com
            </a>
            , lo que implicará que su imagen/voz será borrada de las grabaciones futuras (no se
            pueden borrar de grabaciones ya realizadas en vivo).
          </li>
        </ul>
      </Modal>

      <Modal isOpen={openModal === 'privacidad'} onClose={closePrivacyModal}>
        <h2 className="font-serif text-xl font-bold text-navy dark:text-navy-light">
          Política de Privacidad - Fundamentos de la Palabra
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          Responsable del tratamiento: José Cabrelles Sanz (DNI 19837890E), C/ La Perdiu 1, 08184,
          Palau-solità i Plegamans, Barcelona. Contacto:{' '}
          <a href="mailto:fundamentosdelapalabra@gmail.com" className="text-navy underline dark:text-navy-light">
            fundamentosdelapalabra@gmail.com
          </a>
          .
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Finalidad:</strong> Tratamos sus datos (Nombre, Apellido, Email y Contraseña
            encriptada) exclusivamente para gestionar su inscripción al curso bíblico, permitirle
            el acceso al aula virtual y registrar su consentimiento legal.
          </li>
          <li>
            <strong>Legitimación:</strong> Su consentimiento explícito al marcarse las casillas
            correspondientes.
          </li>
          <li>
            <strong>Destinatarios:</strong> Sus datos no se venden a terceros. Solo se almacenan
            en los servidores seguros de Supabase (ubicados en la UE) para el funcionamiento de
            la plataforma.
          </li>
          <li>
            <strong>Derechos:</strong> Tiene derecho a acceder, rectificar, suprimir y portar sus
            datos, así como a limitar u oponerse a su tratamiento. Puede ejercerlos vía email.
          </li>
          <li>
            <strong>Conservación:</strong> Sus datos se conservarán mientras esté inscrito en el
            curso y se borrarán a su solicitud una vez finalizado el mismo.
          </li>
        </ul>
      </Modal>
    </div>
  )
}
