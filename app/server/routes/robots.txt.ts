export default defineEventHandler(event => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl as string) || 'https://nexgenspeak.com'

  const robots = `# NexGen Speak - Robots.txt
# Generated on ${new Date().toISOString()}

# Allow all search engines to crawl the site
User-agent: *
Allow: /

# Disallow crawling of private user areas
Disallow: /my-schedule
Disallow: /booking

# Allow important auth pages for SEO (they have proper meta robots tags)
Allow: /login$
Allow: /register$
Allow: /forgot-password$

# Crawl-delay for aggressive bots (optional, uncomment if needed)
# User-agent: *
# Crawl-delay: 1

# Specific rules for major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml
`

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')
  return robots
})
