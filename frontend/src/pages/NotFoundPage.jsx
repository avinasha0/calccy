import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import { applySeo } from '../lib/seo'

function NotFoundPage() {
  useEffect(() => {
    applySeo({
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist on Calccy.',
      path: '/404',
      robots: 'noindex,follow',
      type: 'website',
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SectionWrapper className="pt-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Error 404</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Page not found</h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            The URL might be outdated or removed. Use the tools directory to find the calculator you need.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Go Home
            </Link>
            <Link
              to="/tools"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Browse Tools
            </Link>
          </div>
        </div>
      </SectionWrapper>
      <Footer />
    </div>
  )
}

export default NotFoundPage
