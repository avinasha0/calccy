const SITE_NAME = 'Calccy'
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '')
const DEFAULT_IMAGE = `${SITE_URL}/app/og-default.svg`

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

export function applySeo({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  robots = 'index,follow',
  jsonLd = null,
}) {
  const canonicalUrl = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const fullTitle = `${title} | ${SITE_NAME}`

  document.title = fullTitle

  upsertMeta('meta[name="description"]', { name: 'description', content: description })
  upsertMeta('meta[name="robots"]', { name: 'robots', content: robots })

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' })
  upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' })

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: `${SITE_NAME} social preview` })

  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })

  const existingJsonLd = document.head.querySelector('script[data-seo-jsonld="true"]')
  if (existingJsonLd) {
    existingJsonLd.remove()
  }

  if (jsonLd) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seoJsonld = 'true'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
  }
}

export { SITE_NAME, SITE_URL }
