import { totalWeeks } from '../data/courseData.js'

export default function ProgressBar({ week }) {
  const isIntro = week === 0
  const pct = isIntro ? 0 : Math.round((week / totalWeeks) * 100)

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block w-40 h-1.5 rounded-full bg-gray-100 overflow-hidden dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-navy transition-all duration-300 dark:bg-navy-light"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="whitespace-nowrap text-xs font-medium text-gray-500 dark:text-gray-400">
        {isIntro ? 'Clase introductoria' : `Semana ${week} de ${totalWeeks}`}
      </span>
    </div>
  )
}
