export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl dark:bg-gray-900">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-navy dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-navy-light"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-2">{children}</div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-dark"
          >
            Entendido, cerrar documento
          </button>
        </div>
      </div>
    </div>
  )
}
