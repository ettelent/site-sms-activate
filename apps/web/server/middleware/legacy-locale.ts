export default defineEventHandler(event => {
  const path = getRequestURL(event).pathname
  const legacy = path.match(/^\/(ru|en)(?=\/|$)/)
  if (!legacy) return

  setCookie(event, 'signal_locale', legacy[1]!, {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/'
  })
  const target = path.replace(/^\/(ru|en)(?=\/|$)/, '') || '/'
  return sendRedirect(event, target.startsWith('/') ? target : `/${target}`, 301)
})
