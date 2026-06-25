import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function RecuperarContrasena() {
  const { resetPasswordForEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: resetError } = await resetPasswordForEmail(email)
    setLoading(false)

    if (resetError) {
      setError('No se ha podido enviar el email. Comprueba la dirección e inténtalo de nuevo.')
      return
    }

    setEnviado(true)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-paper px-6 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-navy sm:text-3xl dark:text-navy-light">
            Fundamentos de la Palabra
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Recupera el acceso a tu cuenta</p>
        </div>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-soft dark:bg-gray-900">
          {enviado ? (
            <p className="text-sm text-ink dark:text-gray-100">
              Te hemos enviado un email a <strong>{email}</strong> con un enlace para crear una
              contraseña nueva. Revisa también la carpeta de spam si no lo ves en unos minutos.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Escribe el email con el que te registraste y te enviaremos un enlace para
                restablecer tu contraseña.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-ink focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                  placeholder="tu@email.com"
                />
              </div>

              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark disabled:opacity-60"
              >
                {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link to="/login" className="font-semibold text-navy hover:underline dark:text-navy-light">
            Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
