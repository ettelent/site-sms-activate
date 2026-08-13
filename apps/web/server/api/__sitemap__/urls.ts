export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const [countries, services, articles] = await Promise.all([
    $fetch<any[]>(`${config.apiInternalUrl}/catalog/countries`),
    $fetch<any[]>(`${config.apiInternalUrl}/catalog/services`),
    $fetch<any[]>(`${config.apiInternalUrl}/content/articles`)
  ])
  const staticPages = ['', '/countries', '/services', '/premium', '/blog', '/reviews', '/api-access', '/terms', '/privacy']
  return [
    ...staticPages.map(path => ({ loc: path || '/', changefreq: path === '' ? 'daily' : 'weekly', priority: path === '' ? 1 : .7 })),
    ...countries.map(c => ({ loc: `/countries/${c.id}`, changefreq: 'weekly', priority: .65 })),
    ...services.map(s => ({ loc: `/services/${s.code}`, changefreq: 'weekly', priority: .6 })),
    ...articles.map(a => ({ loc: `/blog/${a.slug}`, lastmod: a.publishedAt, priority: .65 }))
  ]
})
