export default defineEventHandler(event => {
  const config = useRuntimeConfig(event)
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /_nuxt/\n\nSitemap: ${config.public.siteUrl}/sitemap.xml\n`
})
