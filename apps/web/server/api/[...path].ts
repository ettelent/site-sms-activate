export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const path = getRouterParam(event, 'path') || ''
  return proxyRequest(event, `${config.apiInternalUrl}/${path}`, { redirect: 'manual' })
})
