import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const REMEMBER_KEY = 'fdp-remembered-credentials'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(REMEMBER_KEY) || 'null')
      if (saved?.email) {
        setEmail(saved.email)
        setPassword(saved.password || '')
        setRememberPassword(true)
      }
    } catch {
      // localStorage corrupto o inaccesible: se ignora y se deja el formulario vacío.
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: signInError } = await signIn({ email, password })
    setLoading(false)

    if (signInError) {
      setError('Email o contraseña incorrectos. Inténtalo de nuevo.')
      return
    }

    if (rememberPassword) {
      localStorage.setItem(REMEMBER_KEY, JSON.stringify({ email, password }))
    } else {
      localStorage.removeItem(REMEMBER_KEY)
    }

    navigate('/aula')
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-paper px-6 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-navy sm:text-3xl dark:text-navy-light">
            Fundamentos de la Palabra
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Accede a tu aula virtual</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl bg-white p-8 shadow-soft dark:bg-gray-900">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm text-ink focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-navy dark:text-gray-500 dark:hover:text-navy-light"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy dark:border-gray-600 dark:bg-gray-800"
            />
            Recordar contraseña en este navegador
          </label>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark disabled:opacity-60"
          >
            {loading ? 'Accediendo…' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className="font-semibold text-navy hover:underline dark:text-navy-light">
            Regístrate
          </Link>
        </p>
        <p className="mt-3 text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-navy dark:text-gray-500 dark:hover:text-navy-light">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  )
}
