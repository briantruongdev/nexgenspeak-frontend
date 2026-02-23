import { watchEffect, computed } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { BreadcrumbItem, CourseSchemaOption, FAQItem } from '~/types/seo'

export interface SeoOptions {
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  image?: string
  url?: string
  type?: 'website' | 'article'
  siteName?: string
  locale?: string
  alternateLocale?: string
  /** Noindex for this page (e.g. thank-you, private) */
  noindex?: boolean
  /** Breadcrumb for BreadcrumbList schema + optional display */
  breadcrumbs?: BreadcrumbItem[]
  /** Course schema (use on course/study-plan page) */
  course?: CourseSchemaOption
  /** FAQ schema (use where FAQ exists) */
  faq?: FAQItem[]
  /** Override publishedTime for article */
  publishedTime?: string
  /** Override modifiedTime for article */
  modifiedTime?: string
}

const DEFAULT_SITE_NAME = 'NexGen Speak'

function absoluteUrl(url: string, base: string): string {
  if (url.startsWith('http')) return url
  const path = url.startsWith('/') ? url : `/${url}`
  return `${base.replace(/\/$/, '')}${path}`
}

export function useSeo(options: SeoOptions = {}) {
  const { locale, t } = useI18n()
  const config = useRuntimeConfig()
  const route = useRoute()

  const siteUrl = (config.public?.siteUrl as string) || 'https://nexgenspeak.com'
  const siteName = options.siteName || DEFAULT_SITE_NAME

  watchEffect(() => {
    const defaultTitle = t('pageTitle') || 'Học tiếng Anh 1 kèm 1 Online | NexGen Speak'
    const defaultDescription =
      t('pageDescription') ||
      'Học tiếng Anh online 1:1 với giáo viên bản xứ. Lớp học tiếng Anh 1 kèm 1, gia sư tiếng Anh online. Đăng ký học thử miễn phí.'
    const defaultImage = absoluteUrl('/images/banner.png', siteUrl)

    const currentPath = route.path === '/' ? '' : route.path
    const currentUrl = options.url || `${siteUrl}${currentPath}`

    const currentLocale = options.locale ?? locale.value ?? 'vi'
    const alternateLocale = options.alternateLocale ?? (currentLocale === 'vi' ? 'en' : 'vi')

    const titleValue = toValue(options.title)
    const descriptionValue = toValue(options.description)

    const title = titleValue ?? defaultTitle
    const description = descriptionValue ?? defaultDescription
    const image = options.image ? absoluteUrl(options.image, siteUrl) : defaultImage

    const ogType = options.type ?? 'website'
    const noindex = options.noindex === true

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogUrl: currentUrl,
      ogType,
      ogSiteName: siteName,
      ogLocale: currentLocale === 'vi' ? 'vi_VN' : 'en_US',
      ogImageWidth: 1200,
      ogImageHeight: 630,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      twitterSite: '@nexgenspeak',
      robots: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      author: siteName
    })

    const headMeta: Record<string, string> = {}
    if (options.publishedTime && ogType === 'article') {
      headMeta['og:published_time'] = options.publishedTime
      headMeta['og:modified_time'] = options.modifiedTime || options.publishedTime
    }

    useHead({
      link: [
        { rel: 'canonical', href: currentUrl },
        { rel: 'alternate', hreflang: currentLocale, href: currentUrl },
        { rel: 'alternate', hreflang: alternateLocale, href: `${siteUrl}${currentPath}` }
      ],
      meta: Object.entries(headMeta).map(([name, content]) => ({ property: name, content })),
      htmlAttrs: { lang: currentLocale }
    })

    const scripts: Array<{ type: string; innerHTML: string }> = []

    // Organization (global)
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: siteName,
        url: siteUrl,
        logo: absoluteUrl('/images/logo.png', siteUrl),
        description: description,
        address: { '@type': 'PostalAddress', addressCountry: 'VN' },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+84-888-887-798',
          contactType: 'customer service',
          availableLanguage: ['Vietnamese', 'English'],
          areaServed: 'VN'
        }
      })
    })

    // BreadcrumbList
    if (options.breadcrumbs?.length) {
      const items = options.breadcrumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(item.url, siteUrl)
      }))
      scripts.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items
        })
      })
    }

    // Course
    if (options.course) {
      const c = options.course
      scripts.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: c.name,
          description: c.description,
          provider: { '@type': 'Organization', name: c.provider },
          url: c.url ? absoluteUrl(c.url, siteUrl) : currentUrl,
          image: c.image ? absoluteUrl(c.image, siteUrl) : undefined,
          ...(c.price != null && {
            offers: {
              '@type': 'Offer',
              price: c.price,
              priceCurrency: c.priceCurrency || 'VND'
            }
          })
        })
      })
    }

    // FAQPage
    if (options.faq?.length) {
      scripts.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: options.faq.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer }
          }))
        })
      })
    }

    useHead({ script: scripts })
  })

  return {
    title: computed(() => toValue(options.title) || t('pageTitle') || 'Học tiếng Anh 1 kèm 1 Online | NexGen Speak'),
    description: computed(
      () =>
        toValue(options.description) ||
        t('pageDescription') ||
        'Học tiếng Anh online 1:1 với giáo viên bản xứ. Gia sư tiếng Anh online. Đăng ký học thử miễn phí.'
    ),
    image: computed(() => {
      const defaultImage = absoluteUrl('/images/banner.png', siteUrl)
      return options.image ? absoluteUrl(options.image, siteUrl) : defaultImage
    }),
    url: computed(() => {
      const path = route.path === '/' ? '' : route.path
      return `${siteUrl}${path}`
    })
  }
}
