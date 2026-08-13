export default defineNuxtRouteMiddleware(to => {
  const legacy = to.path.match(/^\/(ru|en)(?=\/|$)/)
  if (!legacy) return
  const locale = useCookie<'ru' | 'en'>('signal_locale', { sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
  locale.value = legacy[1] as 'ru' | 'en'
  const path = to.fullPath.replace(/^\/(ru|en)(?=\/|$)/, '') || '/'
  return navigateTo(path.startsWith('/') ? path : `/${path}`, { redirectCode: 301 })
})
