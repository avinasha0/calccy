import { useEffect } from 'react'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import { applySeo, SITE_URL } from '../lib/seo'

const posts = [
  {
    title: 'Old vs New Tax Regime: Which One Saves More?',
    excerpt: 'A practical comparison using real salary ranges and deduction scenarios.',
    tag: 'Tax',
  },
  {
    title: 'How to Estimate In-Hand Salary From CTC',
    excerpt: 'Understand PF, income tax, cess, and employer components in simple terms.',
    tag: 'Salary',
  },
  {
    title: 'Salary Negotiation Math: What Actually Matters',
    excerpt: 'Use effective monthly take-home numbers instead of headline CTC alone.',
    tag: 'Career',
  },
]

function BlogPage() {
  useEffect(() => {
    applySeo({
      title: 'Blog',
      description:
        'Read salary, tax, and in-hand income guides from Calccy to make better personal finance decisions in India.',
      path: '/blog',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Calccy Blog',
        url: `${SITE_URL}/blog`,
      },
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SectionWrapper className="pt-10 sm:pt-14">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Calccy Blog</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Insights to make smarter salary decisions
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Guides, explainers, and calculator-driven tips for salary, tax, and monthly planning.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-2">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {post.tag}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>
      <Footer />
    </div>
  )
}

export default BlogPage
