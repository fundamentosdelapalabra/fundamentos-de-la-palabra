import { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQS = [
  {
    question: '¿Necesito saber algo de la Biblia para apuntarme?',
    answer:
      'No en absoluto. Este curso está diseñado "desde cero". No daremos por supuesto ningún conocimiento previo. El objetivo es aprender juntos con humildad y orden.',
  },
  {
    question: '¿Qué pasa si me pierdo una clase?',
    answer:
      'Las clases se grabarán (previo consentimiento) y el material quedará disponible en la plataforma para que puedas revisarlo a tu ritmo durante la semana.',
  },
  {
    question: '¿Las clases son en directo o son grabadas?',
    answer:
      'Son en directo a través de Google Meet los sábados a las 10:00 PM (Hora española). Es el momento para interactuar, hacer preguntas y compartir en grupo. Luego se quedan grabadas.',
  },
  {
    question: '¿Qué versión de la Biblia utilizáis?',
    answer:
      'Utilizamos la Biblia Reina-Valera 1960 (RVR1960) como base principal para todas las lecturas y referencias.',
  },
  {
    question: '¿Cuánto dura el curso?',
    answer:
      'El curso tiene una duración de 6 meses. Incluye una Clase 0 de presentación y 24 semanas de contenido bíblico progresivo.',
  },
  {
    question: '¿Se usan idiomas originales (griego/hebreo)?',
    answer:
      'Solo de forma muy puntual y sencilla. Se usarán raíces bíblicas únicamente cuando ayuden a aclarar una palabra o concepto esencial, nunca para impresionar ni complicar la clase.',
  },
  {
    question: '¿Cómo puedo dar de baja mi cuenta o mis datos?',
    answer:
      'Puedes escribirnos a fundamentosdelapalabra@gmail.com en cualquier momento y procederemos a dar de baja tu acceso y eliminar tus datos de nuestra plataforma.',
  },
]

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 pb-4 dark:border-gray-800">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{question}</h3>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <p className="mt-2 text-gray-700 dark:text-gray-300">{answer}</p>}
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="min-h-screen bg-paper px-6 py-16 font-sans text-ink dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">Preguntas Frecuentes (FAQ)</h1>

        <div className="space-y-0">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
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
