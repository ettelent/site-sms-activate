export function usePageSeo(title: string | Ref<string>, description: string | Ref<string>, options: { noindex?: boolean, image?: string } = {}) {
  const route = useRoute(); const { lang } = useLocale(); const config = useRuntimeConfig()
  const pageTitle = computed(() => `${unref(title)} — Signal SMS`); const desc = computed(() => unref(description)); const canonical = computed(() => `${config.public.siteUrl}${route.path}`)
  useHead({ htmlAttrs: { lang }, title: pageTitle, meta: [
    { name:'description', content:desc }, { name:'robots', content: options.noindex ? 'noindex,follow' : 'index,follow' },
    { property:'og:title', content:pageTitle }, { property:'og:description', content:desc }, { property:'og:type', content:'website' }, { property:'og:url', content:canonical },
    { property:'og:site_name', content:'Signal SMS' }, { property:'og:locale', content:computed(() => lang.value === 'ru' ? 'ru_RU':'en_US') }, { name:'twitter:card', content:'summary_large_image' }
  ], link: [{ rel:'canonical', href:canonical }, { rel:'alternate', hreflang:'x-default', href:canonical }] })
}
