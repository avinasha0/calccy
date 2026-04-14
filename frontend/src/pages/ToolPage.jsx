import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import Button from '../components/ui/Button'
import InputField from '../components/ui/InputField'
import ResultCard from '../components/ui/ResultCard'
import SelectField from '../components/ui/SelectField'
import { calculateTool } from '../lib/api'
import { applySeo, SITE_URL } from '../lib/seo'
import { getToolContent } from '../lib/toolContent'
import { formatResult, getFieldsForTool, getToolMeta } from '../lib/tools'

function parseSlugPrefill(slug) {
  const salaryMatches = slug?.match(/salary-(\d+(?:\.\d+)?)-(lpa|lakh|lakhs|crore|cr)-in-hand-india/i)
  if (!salaryMatches) return null
  const value = Number(salaryMatches[1])
  const unit = salaryMatches[2].toLowerCase()
  const multiplier = unit === 'crore' || unit === 'cr' ? 10000000 : 100000
  return { sourceTool: 'salary-calculator', prefill: { ctc: Math.round(value * multiplier) } }
}

function ToolPage() {
  const { slug = 'salary-calculator' } = useParams()
  const seoSlugConfig = useMemo(() => parseSlugPrefill(slug), [slug])
  const baseSlug = seoSlugConfig?.sourceTool ?? slug
  const tool = getToolMeta(baseSlug)
  const fields = useMemo(() => getFieldsForTool(baseSlug), [baseSlug])
  const toolContent = useMemo(() => getToolContent(baseSlug), [baseSlug])

  const [form, setForm] = useState({})
  const [result, setResult] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const initial = {}
    fields.forEach((field) => {
      initial[field.key] = seoSlugConfig?.prefill?.[field.key] ?? field.defaultValue ?? ''
    })
    setForm(initial)
    setResult({})
    setError('')
  }, [fields, seoSlugConfig])

  useEffect(() => {
    if (!tool) return
    applySeo({
      title: tool.name,
      description: tool.description,
      path: `/tools/${slug}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: tool.name,
            description: tool.description,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            url: `${SITE_URL}/tools/${slug}`,
          },
          {
            '@type': 'FAQPage',
            mainEntity: toolContent.faqs.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          },
        ],
      },
    })
  }, [slug, tool, toolContent])

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const payload = {}
      fields.forEach((field) => {
        payload[field.key] = field.type === 'select' ? form[field.key] : Number(form[field.key])
      })
      const response = await calculateTool(baseSlug, payload)
      setResult(response.results ?? {})
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!tool) {
    return null
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
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tool.name}</h1>
            <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
            <div className="mt-6 space-y-4">
              {fields.map((field) =>
                field.type === 'select' ? (
                  <SelectField key={field.key} label={field.label} value={form[field.key] ?? ''} onChange={handleChange(field.key)} options={field.options ?? []} />
                ) : (
                  <InputField key={field.key} label={field.label} type="number" value={form[field.key] ?? ''} onChange={handleChange(field.key)} />
                ),
              )}
            </div>
            <div className="mt-6">
              <Button type="submit" disabled={isLoading}>{isLoading ? 'Calculating...' : 'Calculate'}</Button>
            </div>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </form>

          <section className="space-y-4">
            {Object.keys(result).length === 0 ? (
              <ResultCard title="Result" value="Fill values and calculate" caption="Live API-powered output" />
            ) : (
              Object.entries(result).map(([key, value]) => (
                <ResultCard key={key} title={key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())} value={formatResult(key, value)} />
              ))
            )}
          </section>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Formula</h2>
            <p className="mt-2 text-sm text-slate-600">{toolContent.formula}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Assumptions</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              {toolContent.assumptions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">FAQ</h2>
            <div className="mt-2 space-y-2">
              {toolContent.faqs.map((item) => (
                <details key={item.q} className="rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800">{item.q}</summary>
                  <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </article>
        </section>
      </SectionWrapper>
      <Footer />
    </div>
  )
}

export default ToolPage
