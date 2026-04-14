import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import { applySeo, SITE_URL } from '../lib/seo'
import { getMostUsedTools, getToolsByCategory } from '../lib/tools'

const toolIconBySlug = {
  'salary-calculator': 'currency',
  'ctc-to-in-hand-calculator': 'currency',
  'old-vs-new-tax-regime-calculator': 'currency',
  'income-tax-calculator-india': 'currency',
  'monthly-salary-breakdown-tool': 'currency',
  'salary-hike-calculator': 'currency',
  'bonus-variable-pay-calculator': 'currency',
  'pf-calculator': 'currency',
  'home-loan-emi-calculator': 'card',
  'emi-affordability-calculator': 'card',
  'rent-vs-buy-calculator': 'home',
  'rental-yield-calculator': 'home',
  'property-roi-calculator': 'home',
  'pg-income-calculator': 'home',
  'construction-cost-calculator': 'home',
  'stamp-duty-calculator-india': 'home',
  'sip-calculator': 'chart',
  'lumpsum-investment-calculator': 'chart',
  'compound-interest-calculator': 'chart',
  'loan-eligibility-calculator': 'card',
  'personal-loan-emi-calculator': 'card',
  'credit-card-interest-calculator': 'card',
  'gst-calculator-india': 'document',
  'invoice-generator-pdf': 'document',
  'profit-margin-calculator': 'document',
  'break-even-calculator': 'document',
  'wealth-comparison-tool-india': 'chart',
  'time-to-become-crorepati-calculator': 'clock',
  'can-you-afford-this-house-tool': 'clock',
  'salary-vs-lifestyle-calculator': 'clock',
}

function ToolIcon({ tool }) {
  const iconType = toolIconBySlug[tool.slug] ?? 'calculator'
  const common = 'h-5 w-5 text-slate-700'

  if (iconType === 'currency') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v20M17 6.5c0-1.4-1.8-2.5-4-2.5s-4 1.1-4 2.5 1.8 2.5 4 2.5 4 1.1 4 2.5-1.8 2.5-4 2.5-4 1.1-4 2.5 1.8 2.5 4 2.5 4-1.1 4-2.5" />
      </svg>
    )
  }

  if (iconType === 'card') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    )
  }

  if (iconType === 'home') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m3 11 9-7 9 7" />
        <path d="M5 10.5V20h14v-9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    )
  }

  if (iconType === 'chart') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V5M4 19h16" />
        <path d="m7 15 3-3 3 2 4-5" />
      </svg>
    )
  }

  if (iconType === 'document') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 3h8l4 4v14H7z" />
        <path d="M15 3v5h5M10 13h6M10 17h6" />
      </svg>
    )
  }

  if (iconType === 'clock') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 19h8" />
    </svg>
  )
}

function ToolList({ tools }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          to={`/tools/${tool.slug}`}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
              <ToolIcon tool={tool} />
            </span>
            <span>{tool.name}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const mostUsedTools = getMostUsedTools()
  const toolsByCategory = getToolsByCategory()
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredMostUsedTools = useMemo(() => {
    if (!normalizedQuery) return mostUsedTools
    return mostUsedTools.filter((tool) => tool.name.toLowerCase().includes(normalizedQuery))
  }, [mostUsedTools, normalizedQuery])

  const filteredToolsByCategory = useMemo(() => {
    if (!normalizedQuery) return toolsByCategory
    return Object.entries(toolsByCategory).reduce((accumulator, [category, tools]) => {
      const matched = tools.filter((tool) => tool.name.toLowerCase().includes(normalizedQuery))
      if (matched.length > 0) {
        accumulator[category] = matched
      }
      return accumulator
    }, {})
  }, [toolsByCategory, normalizedQuery])

  const hasNoResults = Object.keys(filteredToolsByCategory).length === 0 && filteredMostUsedTools.length === 0

  useEffect(() => {
    applySeo({
      title: 'All Tools',
      description: 'Explore all Calccy calculators by category or pick from most used tools.',
      path: '/tools',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Calccy Tools',
        description: 'Category-wise finance and business calculators.',
        url: `${SITE_URL}/tools`,
      },
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SectionWrapper className="pt-8 sm:pt-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">All Calculators</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Browse tools by category or start with the most used ones.
        </p>
        <div className="mt-5">
          <label className="block">
            <span className="sr-only">Search tools</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search tools (e.g. salary, emi, gst, sip)"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>
      </SectionWrapper>

      {filteredMostUsedTools.length > 0 ? (
        <SectionWrapper title="Most Used Tools" className="pt-0">
          <ToolList tools={filteredMostUsedTools} />
        </SectionWrapper>
      ) : null}

      {Object.entries(filteredToolsByCategory).map(([category, tools]) => (
        <SectionWrapper key={category} title={category} className="pt-2">
          <ToolList tools={tools} />
        </SectionWrapper>
      ))}

      {hasNoResults ? (
        <SectionWrapper className="pt-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
            No tools found for "<span className="font-semibold text-slate-800">{searchQuery}</span>".
          </div>
        </SectionWrapper>
      ) : null}

      <Footer />
    </div>
  )
}

export default ToolsPage
