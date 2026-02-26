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
  breadcrumbs?: MaybeRefOrGetter<BreadcrumbItem[] | undefined>
  /** Course schema (use on course/study-plan page) */
  course?: MaybeRefOrGetter<CourseSchemaOption | undefined>
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
    const currentLocale = options.locale ?? locale.value ?? 'vi'

    const defaultTitle = t('pageTitle') || 'Học tiếng Anh 1-1 Online | NexGen Speak'
    const defaultDescription =
      t('pageDescription') ||
      'Học tiếng Anh online 1:1 với giáo viên bản xứ. Lớp học tiếng Anh 1-1, gia sư tiếng Anh online. Đăng ký học thử miễn phí.'

    const currentPath = route.path === '/' ? '' : route.path
    const currentUrl = options.url || `${siteUrl}${currentPath}`

    const titleValue = toValue(options.title)
    const descriptionValue = toValue(options.description)

    const title = titleValue ?? defaultTitle
    const description = descriptionValue ?? defaultDescription

    const ogType = options.type ?? 'website'
    const noindex = options.noindex === true

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogUrl: currentUrl,
      ogType,
      ogSiteName: siteName,
      ogLocale: currentLocale === 'vi' ? 'vi_VN' : 'en_US',
      ogImageWidth: 1200,
      ogImageHeight: 630,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
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
        { rel: 'alternate', hreflang: 'vi-VN', href: currentUrl },
        { rel: 'alternate', hreflang: 'vi', href: currentUrl },
        { rel: 'alternate', hreflang: 'x-default', href: currentUrl }
      ],
      meta: Object.entries(headMeta).map(([name, content]) => ({ property: name, content })),
      htmlAttrs: { lang: currentLocale }
    })

    const scripts: Array<{ type: string; innerHTML: string }> = []

    const logoUrl = absoluteUrl('/favicon.ico', siteUrl)
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        '@id': `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${siteUrl}/#logo`,
          url: logoUrl,
          contentUrl: logoUrl,
          width: 4096,
          height: 4096,
          caption: siteName
        },
        image: logoUrl,
        description: description,
        address: { '@type': 'PostalAddress', addressCountry: 'VN' },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+84-888-887-798',
          contactType: 'customer service',
          availableLanguage: ['Vietnamese', 'English'],
          areaServed: 'VN'
        },
        sameAs: ['https://www.facebook.com/nexgenspeak', 'https://www.youtube.com/@nexgenspeak']
      })
    })

    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        publisher: {
          '@id': `${siteUrl}/#organization`
        },
        inLanguage: currentLocale === 'vi' ? 'vi-VN' : 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/teachers?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      })
    })

    const breadcrumbs = toValue(options.breadcrumbs)
    if (breadcrumbs?.length) {
      const items = breadcrumbs.map((item, i) => ({
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

    const course = toValue(options.course)
    if (course) {
      scripts.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: course.name,
          description: course.description,
          provider: { '@type': 'Organization', name: course.provider },
          url: course.url ? absoluteUrl(course.url, siteUrl) : currentUrl,
          image: course.image ? absoluteUrl(course.image, siteUrl) : undefined,
          ...(course.price != null && {
            offers: {
              '@type': 'Offer',
              price: course.price,
              priceCurrency: course.priceCurrency || 'VND'
            }
          })
        })
      })
    }

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
    title: computed(() => toValue(options.title) || t('pageTitle') || 'Học tiếng Anh 1-1 Online | NexGen Speak'),
    description: computed(
      () =>
        toValue(options.description) ||
        t('pageDescription') ||
        'Học tiếng Anh online 1:1 với giáo viên bản xứ. Gia sư tiếng Anh online. Đăng ký học thử miễn phí.'
    ),
    url: computed(() => {
      const path = route.path === '/' ? '' : route.path
      return `${siteUrl}${path}`
    })
  }
}
