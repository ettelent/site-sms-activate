export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = String(config.public.gaId || '')
  const ymId = Number(config.public.yandexMetrikaId || 0)
  if (gaId) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    document.head.appendChild(script)
    const dataLayer = ((window as any).dataLayer ||= [])
    const gtag = (...args: any[]) => dataLayer.push(args)
    gtag('js', new Date())
    gtag('config', gaId, { anonymize_ip: true })
  }
  if (ymId) {
    ;(window as any).ym = (window as any).ym || function (...args: any[]) { ((window as any).ym.a ||= []).push(args) }
    ;(window as any).ym.l = Date.now()
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://mc.yandex.ru/metrika/tag.js'
    document.head.appendChild(script)
    ;(window as any).ym(ymId, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true })
  }
})
