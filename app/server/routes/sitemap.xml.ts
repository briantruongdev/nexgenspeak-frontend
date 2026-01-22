export default defineEventHandler(event => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl || 'https://nexgenspeak.com'
  const currentDate = new Date().toISOString()

  // Define your routes
  const routes = [
    {
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: currentDate
    }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    route => `  <url>
    <loc>${siteUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="vi" href="${siteUrl}${route.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${route.url}" />
  </url>`
  )
  .join('\n')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600')
  return sitemap
})
