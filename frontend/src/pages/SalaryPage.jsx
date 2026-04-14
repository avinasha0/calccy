import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import Button from '../components/ui/Button'
import InputField from '../components/ui/InputField'
import ResultCard from '../components/ui/ResultCard'
import SelectField from '../components/ui/SelectField'
import { calculateSalary } from '../lib/api'
import { applySeo, SITE_URL } from '../lib/seo'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

function parseSalarySlug(slug) {
  const matches = slug?.match(/salary-(\d+(?:\.\d+)?)-(lpa|lakh|lakhs|crore|cr)-in-hand-india/i)
  if (!matches) {
    return null
  }

  const value = Number(matches[1])
  const unit = matches[2].toLowerCase()
  const multiplier = unit === 'crore' || unit === 'cr' ? 10000000 : 100000

  return {
    ctc: Math.round(value * multiplier),
    title: `${value} ${unit.toUpperCase()} Salary In-Hand Calculator (India)`,
    description: `Estimate monthly in-hand salary for ${value} ${unit.toUpperCase()} package in India.`,
  }
}

function SalaryPage() {
  const { slug } = useParams()
  const parsedSlug = useMemo(() => parseSalarySlug(slug), [slug])
  const [form, setForm] = useState({
    ctc: parsedSlug?.ctc ?? 2000000,
    taxRegime: 'new',
    pfPercent: 12,
    deductions: 50000,
  })
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!parsedSlug) {
      applySeo({
        title: 'Salary Calculator',
        description:
          'Calculate monthly in-hand salary in India using annual CTC, tax regime, PF contribution, and deductions.',
        path: '/tools/salary-calculator',
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Calccy Salary Calculator',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          url: `${SITE_URL}/tools/salary-calculator`,
        },
      })
      return
    }

    applySeo({
      title: parsedSlug.title,
      description: parsedSlug.description,
      path: `/tools/${slug}`,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: parsedSlug.title,
        description: parsedSlug.description,
        mainEntityOfPage: `${SITE_URL}/tools/${slug}`,
        author: {
          '@type': 'Organization',
          name: 'Calccy',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calccy',
        },
      },
    })

    setForm((previous) => ({
      ...previous,
      ctc: parsedSlug.ctc,
    }))
  }, [parsedSlug])

  const handleChange = (key) => (event) => {
    setForm((previous) => ({
      ...previous,
      [key]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const data = await calculateSalary({
        ctc: Number(form.ctc),
        taxRegime: form.taxRegime,
        pfPercent: Number(form.pfPercent),
        deductions: Number(form.deductions),
      })
      setResult(data.results)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SectionWrapper className="pt-8 sm:pt-12">
        <div className="mb-5">
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800">
            ← Back to homepage
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Salary Calculator</h1>
            <p className="mt-2 text-sm text-slate-600">Calculate your monthly in-hand salary in India.</p>

            <div className="mt-6 space-y-4">
              <InputField label="Annual CTC (INR)" type="number" min="1" value={form.ctc} onChange={handleChange('ctc')} required />
              <SelectField
                label="Tax Regime"
                value={form.taxRegime}
                onChange={handleChange('taxRegime')}
                options={[
                  { label: 'New Regime', value: 'new' },
                  { label: 'Old Regime', value: 'old' },
                ]}
              />
              <InputField label="PF Contribution (%)" type="number" min="0" max="20" value={form.pfPercent} onChange={handleChange('pfPercent')} />
              <InputField
                label="Other Yearly Deductions (INR)"
                type="number"
                min="0"
                value={form.deductions}
                onChange={handleChange('deductions')}
              />
            </div>

            <div className="mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Calculating...' : 'Calculate In-Hand Salary'}
              </Button>
            </div>

            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </form>

          <section className="space-y-4">
            <ResultCard
              title="Monthly In-Hand Salary"
              value={formatCurrency(result?.monthlyInHand)}
              caption="Estimated take-home after PF, tax, and deductions"
            />
            <ResultCard title="Yearly In-Hand Salary" value={formatCurrency(result?.yearlyInHand)} />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Yearly Breakdown</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Gross CTC: {formatCurrency(result?.yearlyBreakdown?.grossCtc)}</li>
                <li>Employee PF: {formatCurrency(result?.yearlyBreakdown?.employeePf)}</li>
                <li>Income Tax: {formatCurrency(result?.yearlyBreakdown?.incomeTax)}</li>
                <li>Health & Education Cess: {formatCurrency(result?.yearlyBreakdown?.cess)}</li>
                <li>Other Deductions: {formatCurrency(result?.yearlyBreakdown?.otherDeductions)}</li>
              </ul>
            </div>
          </section>
        </section>
      </SectionWrapper>
      <Footer />
    </div>
  )
}

export default SalaryPage
