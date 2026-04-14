import { Link } from 'react-router-dom'

function CardIcon({ title }) {
  if (title.includes('Salary')) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 15h3" />
      </svg>
    )
  }

  if (title.includes('Tax')) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19v-3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 10h18" />
      <path d="M6 10V7a6 6 0 0 1 12 0v3" />
      <rect x="4" y="10" width="16" height="10" rx="2" />
    </svg>
  )
}

function ToolCard({ title, description, status, cta, href }) {
  const isActive = href !== '#'

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition duration-300 group-hover:ring-blue-300" />
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
          status === 'Live' ? 'animate-pulse bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
        }`}
      >
        {status}
      </span>
      <div className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
        <CardIcon title={title} />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <div className="mt-4">
        {isActive ? (
          <Link
            to={href}
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-blue-700"
          >
            {cta}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400"
          >
            {cta}
          </button>
        )}
      </div>
    </article>
  )
}

export default ToolCard
