export default defineEventHandler(event => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl as string) || 'https://nexgenspeak.com'

  const robots = `User-agent: *
Allow: /

# Private / auth pages - optional noindex via meta, still allow crawl for redirects
Allow: /login
Allow: /register
Allow: /forgot-password

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`

  event.node.res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  event.node.res.setHeader('Cache-Control', 'public, max-age=86400')
  return robots
})
