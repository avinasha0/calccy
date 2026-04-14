import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/home/Footer'
import HeroSection from '../components/home/HeroSection'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import ToolCard from '../components/home/ToolCard'
import { applySeo, SITE_URL } from '../lib/seo'
import { getAllTools } from '../lib/tools'

function InlineIcon({ type }) {
  const common = 'h-4 w-4 text-blue-700'
  if (type === 'bolt') {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></svg>
  }
  if (type === 'india') {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>
  }
  if (type === 'chart') {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19V9M10 19V5M16 19v-7M22 19v-3" /></svg>
  }
  if (type === 'mobile') {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
  }
  if (type === 'calculator') {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8 6h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 19h8" /></svg>
  }
  if (type === 'search') {
    return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
  }
  return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1v22M1 12h22" /></svg>
}

const featuredTools = getAllTools().map((tool) => ({
  title: tool.name,
  description: `Use ${tool.name.toLowerCase()} with instant API-powered output.`,
  cta: 'Open Tool',
  href: `/tools/${tool.slug}`,
  status: 'Live',
}))

function HomePage() {
  useEffect(() => {
    applySeo({
      title: 'Salary & Finance Calculators for India',
      description:
        'Calccy provides fast salary and finance calculators with transparent in-hand breakdowns, India-specific tax logic, and mobile-first experience.',
      path: '/',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Calccy',
        url: SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/tools/{search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroSection />

      <SectionWrapper className="pt-2">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: '< 1 sec results', icon: 'bolt' },
            { label: 'Built for India', icon: 'india' },
            { label: 'Accurate tax logic', icon: 'chart' },
            { label: 'Mobile optimized', icon: 'mobile' },
          ].map((badge, index) => (
            <article
              key={badge.label}
              className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <InlineIcon type={badge.icon} />
              {badge.label}
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="All Tools"
        subtitle="30 live calculators built on one reusable platform."
        className="bg-white pt-6"
      >
        <div id="tools" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Popular Salary Searches" subtitle="SEO-ready dynamic pages" className="pt-6">
        <div className="flex flex-wrap gap-2.5 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
          {[
            { label: 'What is ₹12 LPA in-hand?', path: '/tools/salary-12-lpa-in-hand-india', icon: 'calculator' },
            { label: 'What is ₹20 LPA in-hand?', path: '/tools/salary-20-lpa-in-hand-india', icon: 'chart' },
            { label: 'What is ₹30 LPA in-hand?', path: '/tools/salary-30-lpa-in-hand-india', icon: 'search' },
            { label: '₹50L loan EMI per month?', path: '/tools/salary-50-lpa-in-hand-india', icon: 'calculator' },
          ].map((item) => (
            <Link
              key={item.path}
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-100"
              to={item.path}
            >
              <InlineIcon type={item.icon} />
              {item.label}
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Why users choose Calccy" className="bg-white pt-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: 'calculator',
              title: 'Reliable formulas',
              description: 'Tax slabs and deduction logic are transparent and auditable.',
            },
            {
              icon: 'bolt',
              title: 'Built for speed',
              description: 'Lean pages optimized for fast load and smooth mobile usage.',
            },
            {
              icon: 'search',
              title: 'SEO-first pages',
              description: 'Dynamic URLs turn high-intent salary queries into landing pages.',
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <InlineIcon type={item.icon} />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-6">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-10 text-center text-white shadow-lg sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Know your real salary — not just CTC</h2>
          <p className="mt-2 text-sm text-blue-50 sm:text-base">Get instant, accurate breakdown in seconds</p>
          <Link
            to="/tools/salary-calculator"
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-xl"
          >
            Calculate My Salary
          </Link>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  )
}

export default HomePage
