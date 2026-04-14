import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
import SectionWrapper from '../components/home/SectionWrapper'
import { getBlogPostBySlug } from '../lib/blogPosts'
import { applySeo, SITE_URL } from '../lib/seo'

function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getBlogPostBySlug(slug)

  useEffect(() => {
    if (!post) return

    applySeo({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          '@type': 'Organization',
          name: 'Calccy',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calccy',
        },
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      },
    })
  }, [post])

  if (!post) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SectionWrapper className="pt-8 sm:pt-12">
        <div className="mb-4">
          <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800">
            ← Back to blog
          </Link>
        </div>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{post.category}</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-2 text-sm text-slate-500">
            Published {post.publishedAt}
          </p>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </SectionWrapper>
      <Footer />
    </div>
  )
}

export default BlogPostPage
