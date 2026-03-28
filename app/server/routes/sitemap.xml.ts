export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl as string) || 'https://nexgenspeak.com'
  const baseApiUrl = (config.public.baseApiUrl as string) || ''
  const now = new Date().toISOString()

  const staticRoutes: Array<{ url: string; changefreq: string; priority: number }> = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/study-plan', changefreq: 'weekly', priority: 0.9 },
    { url: '/teachers', changefreq: 'weekly', priority: 0.9 },
    { url: '/blog', changefreq: 'weekly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/document', changefreq: 'weekly', priority: 0.7 },
    { url: '/recruitment', changefreq: 'monthly', priority: 0.6 },
    { url: '/register', changefreq: 'monthly', priority: 0.7 },
    { url: '/booking', changefreq: 'monthly', priority: 0.7 },
    { url: '/my-schedule', changefreq: 'daily', priority: 0.5 }
  ]

  let teacherIds: string[] = []
  if (baseApiUrl) {
    try {
      const res = await $fetch<{ teachers?: Array<{ teacherId: string }> }>(`${baseApiUrl}/teachers`, {
        timeout: 5000,
        retry: 1
      })
      if (res?.teachers?.length) {
        teacherIds = res.teachers.map(t => t.teacherId).filter(Boolean)
      }
    } catch (error) {
      console.warn('[Sitemap] Failed to fetch teachers:', error)
      // Continue without teacher pages if API fails
    }
  }

  const teacherUrls = teacherIds.map(id => ({
    url: `/teacher/${id}`,
    changefreq: 'weekly' as const,
    priority: 0.7
  }))

  const routes = [...staticRoutes.map(r => ({ ...r, lastmod: now })), ...teacherUrls.map(r => ({ ...r, lastmod: now }))]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    r => `  <url>
    <loc>${siteUrl}${r.url}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <xhtml:link rel="alternate" hreflang="vi" href="${siteUrl}${r.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${r.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${r.url}" />
  </url>`
  )
  .join('\n')}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')
  setResponseHeader(event, 'X-Robots-Tag', 'noindex')
  return sitemap
})
