import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 dark:text-gray-100">Fundamentos de la Palabra</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Curso bíblico de discipulado desde cero.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 dark:text-gray-100">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/aviso-legal" className="hover:text-blue-900 dark:hover:text-navy-light">Aviso Legal</Link></li>
            <li><Link to="/privacidad" className="hover:text-blue-900 dark:hover:text-navy-light">Política de Privacidad</Link></li>
            <li><Link to="/cookies" className="hover:text-blue-900 dark:hover:text-navy-light">Política de Cookies</Link></li>
            <li><Link to="/faq" className="hover:text-blue-900 dark:hover:text-navy-light">Preguntas Frecuentes (FAQ)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 dark:text-gray-100">Contacto</h4>
          <a href="mailto:fundamentosdelapalabra@gmail.com" className="text-sm text-gray-600 hover:text-blue-900 break-all dark:text-gray-400 dark:hover:text-navy-light">
            fundamentosdelapalabra@gmail.com
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
        © 2026 Fundamentos de la Palabra. Todos los derechos reservados.
      </div>
    </footer>
  )
}
