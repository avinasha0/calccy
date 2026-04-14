import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionWrapper from './SectionWrapper'

function formatInr(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function HeroSection() {
  const [ctc, setCtc] = useState(2000000)
  const [taxRegime, setTaxRegime] = useState('new')
  const [resultTick, setResultTick] = useState(0)

  const monthlyInHand = useMemo(() => {
    const yearlyTaxRate = taxRegime === 'old' ? 0.22 : 0.19
    const yearlyPf = ctc * 0.12
    const yearlyTakeHome = Math.max(ctc - yearlyPf - ctc * yearlyTaxRate, 0)
    return Math.round(yearlyTakeHome / 12)
  }, [ctc, taxRegime])

  const handleCalculate = () => {
    setResultTick((prev) => prev + 1)
  }

  return (
    <SectionWrapper className="pt-8 sm:pt-12">
      <div className="relative overflow-hidden grid items-center gap-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 shadow-sm sm:p-10 lg:grid-cols-2">
        <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-blue-200/60 blur-2xl animate-float-slow" />
        <div className="pointer-events-none absolute right-10 top-6 h-16 w-16 rounded-full bg-cyan-200/70 blur-xl animate-float-medium" />
        <div className="pointer-events-none absolute bottom-8 right-1/3 h-20 w-20 rounded-full bg-blue-100/80 blur-xl animate-float-slow" />
        <div>
          <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 animate-fade-in-up">
            Built for India
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Modern calculators for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              smarter salary
            </span>{' '}
            and{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              money decisions
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Calccy gives instant and transparent salary insights with clean breakdowns, mobile-first UX,
            and SEO-friendly tool pages.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/tools/salary-calculator"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
            >
              Open Salary Calculator
            </Link>
            <Link
              to="/tools/salary-20-lpa-in-hand-india"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Try 20 LPA Example
            </Link>
          </div>
        </div>

        <article className="rounded-2xl border border-white/40 bg-white/70 p-5 shadow-xl backdrop-blur md:p-6">
          <p className="text-sm font-semibold text-slate-500">Mini Live Salary Calculator</p>
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">CTC (Yearly)</span>
              <input
                type="number"
                value={ctc}
                onChange={(event) => setCtc(Number(event.target.value || 0))}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tax Regime</p>
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                {['old', 'new'].map((regime) => (
                  <button
                    key={regime}
                    type="button"
                    onClick={() => setTaxRegime(regime)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize transition ${
                      taxRegime === regime ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {regime}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg"
            >
              Calculate
            </button>
          </div>
          <div
            key={resultTick}
            className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-center animate-fade-in-up"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Estimated In-Hand</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{formatInr(monthlyInHand)} / month</p>
          </div>
        </article>
      </div>
    </SectionWrapper>
  )
}

export default HeroSection
