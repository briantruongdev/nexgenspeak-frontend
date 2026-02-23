export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl as string) || 'https://nexgenspeak.com'
  const baseApiUrl = (config.public.baseApiUrl as string) || ''
  const now = new Date().toISOString().slice(0, 10)

  const staticRoutes: Array<{ url: string; changefreq: string; priority: number }> = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/study-plan', changefreq: 'weekly', priority: 0.9 },
    { url: '/teachers', changefreq: 'weekly', priority: 0.9 },
    { url: '/blog', changefreq: 'weekly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/document', changefreq: 'weekly', priority: 0.7 },
    { url: '/recruitment', changefreq: 'monthly', priority: 0.6 },
    { url: '/register', changefreq: 'monthly', priority: 0.7 }
  ]

  let teacherIds: string[] = []
  if (baseApiUrl) {
    try {
      const res = await $fetch<{ teachers?: Array<{ teacherId: string }> }>(`${baseApiUrl}/teachers`, { timeout: 5000 }).catch(
        () => null
      )
      if (res?.teachers?.length) {
        teacherIds = res.teachers.map(t => t.teacherId)
      }
    } catch {
      // ignore
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
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    r => `  <url>
    <loc>${siteUrl}${r.url}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <xhtml:link rel="alternate" hreflang="vi" href="${siteUrl}${r.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${r.url}" />
  </url>`
  )
  .join('\n')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600')
  return sitemap
})
