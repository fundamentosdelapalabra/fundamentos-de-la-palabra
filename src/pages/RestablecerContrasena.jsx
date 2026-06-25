import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function RestablecerContrasena() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [hecho, setHecho] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (password !== password2) {
      setError('Las dos contraseñas no coinciden.')
      return
    }

    setLoading(true)
    const { error: updateError } = await updatePassword(password)
    setLoading(false)

    if (updateError) {
      setError(
        'No se ha podido cambiar la contraseña. El enlace puede haber caducado: pide uno nuevo desde "¿Olvidaste tu contraseña?".'
      )
      return
    }

    setHecho(true)
    setTimeout(() => navigate('/login'), 2500)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-paper px-6 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-navy sm:text-3xl dark:text-navy-light">
            Fundamentos de la Palabra
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Crea tu nueva contraseña</p>
        </div>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-soft dark:bg-gray-900">
          {hecho ? (
            <p className="text-sm text-ink dark:text-gray-100">
              Contraseña actualizada. Te llevamos a la pantalla de inicio de sesión…
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-ink focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Repite la contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-ink focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                />
              </div>

              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark disabled:opacity-60"
              >
                {loading ? 'Guardando…' : 'Guardar nueva contraseña'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
