import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAllBlogPosts } from '../src/lib/blogPosts.js'
import { getAllTools } from '../src/lib/tools.js'

const rootDir = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(rootDir, '../../public/app')
const indexPath = join(distDir, 'index.html')
const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, '') ?? 'https://calccy.com'
const defaultImage = `${siteUrl}/app/og-default.svg`

const staticRoutes = [
  {
    path: '/',
    title: 'Salary & Finance Calculators for India | Calccy',
    description:
      'Calccy provides fast salary and finance calculators with transparent in-hand breakdowns, India-specific tax logic, and mobile-first experience.',
    type: 'website',
  },
  {
    path: '/tools',
    title: 'All Tools | Calccy',
    description: 'Explore all Calccy calculators by category or pick from most used tools.',
    type: 'website',
  },
  {
    path: '/blog',
    title: 'Blog | Calccy',
    description: 'Read salary, tax, and in-hand income guides from Calccy.',
    type: 'website',
  },
  {
    path: '/404',
    title: 'Page Not Found | Calccy',
    description: 'The page you are looking for does not exist on Calccy.',
    type: 'website',
  },
]

const toolRoutes = getAllTools().map((tool) => ({
  path: `/tools/${tool.slug}`,
  title: `${tool.name} | Calccy`,
  description: `${tool.name} for India with instant result and mobile-first UX.`,
  type: 'website',
}))

const blogRoutes = getAllBlogPosts().map((post) => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} | Calccy`,
  description: post.description,
  type: 'article',
}))

const prerenderRoutes = [...staticRoutes, ...toolRoutes, ...blogRoutes]

const upsertMeta = (html, selector, attributes) => {
  const content = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
  const tag = `<meta ${content} />`
  const regex = new RegExp(`<meta[^>]*${selector}[^>]*>`, 'i')
  return regex.test(html) ? html.replace(regex, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

const upsertCanonical = (html, href) => {
  const tag = `<link rel="canonical" href="${href}" />`
  const regex = /<link[^>]*rel="canonical"[^>]*>/i
  return regex.test(html) ? html.replace(regex, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

const withSeo = (baseHtml, routeConfig) => {
  const canonicalUrl = `${siteUrl}${routeConfig.path}`
  let html = baseHtml
  html = html.replace(/<title>.*<\/title>/i, `<title>${routeConfig.title}</title>`)
  html = upsertMeta(html, 'name="description"', { name: 'description', content: routeConfig.description })
  html = upsertMeta(html, 'property="og:type"', { property: 'og:type', content: routeConfig.type })
  html = upsertMeta(html, 'property="og:title"', { property: 'og:title', content: routeConfig.title })
  html = upsertMeta(html, 'property="og:description"', { property: 'og:description', content: routeConfig.description })
  html = upsertMeta(html, 'property="og:url"', { property: 'og:url', content: canonicalUrl })
  html = upsertMeta(html, 'property="og:image"', { property: 'og:image', content: defaultImage })
  html = upsertMeta(html, 'name="twitter:card"', { name: 'twitter:card', content: 'summary_large_image' })
  html = upsertMeta(html, 'name="twitter:title"', { name: 'twitter:title', content: routeConfig.title })
  html = upsertMeta(html, 'name="twitter:description"', { name: 'twitter:description', content: routeConfig.description })
  html = upsertMeta(html, 'name="twitter:image"', { name: 'twitter:image', content: defaultImage })
  html = upsertCanonical(html, canonicalUrl)
  return html
}

const writeRoute = async (routeConfig, html) => {
  const routePath = routeConfig.path === '/' ? '' : routeConfig.path.replace(/^\//, '')
  const outputDir = routePath ? join(distDir, routePath) : distDir
  await mkdir(outputDir, { recursive: true })
  await writeFile(join(outputDir, 'index.html'), html, 'utf8')
}

const run = async () => {
  const htmlTemplate = await readFile(indexPath, 'utf8')
  for (const route of prerenderRoutes) {
    const html = withSeo(htmlTemplate, route)
    await writeRoute(route, html)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
