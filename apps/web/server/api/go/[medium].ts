const allowedMedia = new Set([
  'premium_page',
  'premium_card',
  'number_expired',
  'sms_timeout',
  'header',
  'footer',
  'api_access'
])

export default defineEventHandler(event => {
  const medium = getRouterParam(event, 'medium') || ''
  if (!allowedMedia.has(medium)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown medium' })
  }

  const target = String(useRuntimeConfig(event).partnerUrl)
  try {
    new URL(target)
  } catch {
    throw createError({ statusCode: 500, statusMessage: 'Invalid premium destination' })
  }

  setHeader(event, 'cache-control', 'no-store')
  return sendRedirect(event, target, 302)
})
