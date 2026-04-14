import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import { applySeo, SITE_URL } from '../lib/seo'
import { getMostUsedTools, getToolsByCategory } from '../lib/tools'

function ToolList({ tools }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          to={`/tools/${tool.slug}`}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
        >
          {tool.name}
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
