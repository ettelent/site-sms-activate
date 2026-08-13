export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  debug: false,
  devtools: { enabled: false },
  css: ['~/assets/main.css', '~/assets/refinements.css'],
  modules: ['@nuxtjs/sitemap'],
  runtimeConfig: {
    apiInternalUrl: process.env.NUXT_API_INTERNAL_URL || 'http://localhost:4000',
    partnerUrl: process.env.PARTNER_URL || 'https://simdrop.me/',
    public: {
      siteUrl: process.env.PUBLIC_SITE_URL || 'http://localhost:3000',
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
      yandexMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID || '',
      googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      yandexVerification: process.env.NUXT_PUBLIC_YANDEX_VERIFICATION || ''
    }
  },
  site: { url: process.env.PUBLIC_SITE_URL || 'http://localhost:3000', name: 'Signal SMS' },
  sitemap: { sources: ['/api/__sitemap__/urls'] },
  routeRules: { '/images/**': { headers: { 'cache-control': 'public, max-age=2592000, immutable' } } },
  app: { head: { htmlAttrs: { lang: 'ru' }, meta: [
    { name: 'theme-color', content: '#081411' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'google-site-verification', content: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '' },
    { name: 'yandex-verification', content: process.env.NUXT_PUBLIC_YANDEX_VERIFICATION || '' }
  ], link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }] } }
})
