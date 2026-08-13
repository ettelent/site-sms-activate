type SeoOptions = {
  noindex?: boolean
  image?: string
  type?: 'website' | 'article'
}

export function usePageSeo(title: string | Ref<string>, description: string | Ref<string>, options: SeoOptions = {}) {
  const route = useRoute()
  const { lang } = useLocale()
  const config = useRuntimeConfig()
  const origin = String(config.public.siteUrl).replace(/\/$/, '')
  const pageTitle = computed(() => `${unref(title)} — Signal SMS`)
  const desc = computed(() => unref(description).trim())
  const canonical = computed(() => `${origin}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`)
  const image = computed(() => options.image?.startsWith('http') ? options.image : `${origin}${options.image || '/og-cover.svg'}`)

  useSeoMeta({
    title: pageTitle,
    description: desc,
    robots: options.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    author: 'Signal SMS',
    ogTitle: pageTitle,
    ogDescription: desc,
    ogType: options.type || 'website',
    ogUrl: canonical,
    ogImage: image,
    ogImageAlt: computed(() => lang.value === 'ru' ? 'Signal SMS — каталог временных номеров' : 'Signal SMS — temporary number catalog'),
    ogSiteName: 'Signal SMS',
    ogLocale: computed(() => lang.value === 'ru' ? 'ru_RU' : 'en_US'),
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: desc,
    twitterImage: image
  })

  useHead({
    htmlAttrs: { lang },
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: 'x-default', href: canonical }
    ]
  })
}
