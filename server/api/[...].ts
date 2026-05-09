import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const targetUrl = config.apiBaseUrl
  
  const path = event.path.replace('/api', '')
  const target = `${targetUrl}${path}`
  
  return proxyRequest(event, target)
})
