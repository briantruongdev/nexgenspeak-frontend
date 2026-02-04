import { watchEffect, computed } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface SeoOptions {
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  image?: string
  url?: string
  type?: string
  siteName?: string
  locale?: string
  alternateLocale?: string
}

export const useSeo = (options: SeoOptions = {}) => {
  const { locale, t } = useI18n()
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = options.url || config.public?.siteUrl || 'https://nexgenspeak.com'
  const siteName = options.siteName || 'NexGen Speak'

  watchEffect(() => {
    const defaultTitle = t('pageTitle') || 'Chinh phục Tiếng Anh với NexGen Speak'
    const defaultDescription =
      t('pageDescription') ||
      'Học Tiếng Anh trực tuyến với giáo viên bản xứ. Môi trường học tập tối ưu, phương pháp hiện đại, cam kết đầu ra.'
    const defaultImage = `${siteUrl}/images/banner.png`

    const currentUrl = `${siteUrl}${route.path === '/' ? '' : route.path}`

    const currentLocale = options.locale || locale.value || 'vi'
    const alternateLocale = options.alternateLocale || (currentLocale === 'vi' ? 'en' : 'vi')

    const titleValue = toValue(options.title)
    const descriptionValue = toValue(options.description)

    const title = titleValue || defaultTitle
    const description = descriptionValue || defaultDescription
    const image = options.image ? (options.image.startsWith('http') ? options.image : `${siteUrl}${options.image}`) : defaultImage

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogUrl: currentUrl,
      ogType: 'website',
      ogSiteName: siteName,
      ogLocale: currentLocale === 'vi' ? 'vi_VN' : 'en_US',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      author: siteName
    })

    useHead({
      link: [
        {
          rel: 'canonical',
          href: currentUrl
        },
        {
          rel: 'alternate',
          hreflang: currentLocale,
          href: currentUrl
        },
        {
          rel: 'alternate',
          hreflang: alternateLocale,
          href: `${siteUrl}${route.path}`
        }
      ],
      htmlAttrs: {
        lang: currentLocale
      }
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: siteName,
            url: siteUrl,
            logo: `${siteUrl}/images/logo.png`,
            description,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'VN'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+84-888-887-798',
              contactType: 'Customer Service',
              availableLanguage: ['Vietnamese', 'English']
            },
            sameAs: []
          })
        }
      ]
    })
  })

  return {
    title: computed(() => toValue(options.title) || t('pageTitle') || 'Chinh phục Tiếng Anh với NexGen Speak'),
    description: computed(
      () =>
        toValue(options.description) ||
        t('pageDescription') ||
        'Học Tiếng Anh trực tuyến với giáo viên bản xứ. Môi trường học tập tối ưu, phương pháp hiện đại, cam kết đầu ra.'
    ),
    image: computed(() => {
      const defaultImage = `${siteUrl}/images/banner.png`
      return options.image ? (options.image.startsWith('http') ? options.image : `${siteUrl}${options.image}`) : defaultImage
    }),
    url: computed(() => `${siteUrl}${route.path === '/' ? '' : route.path}`)
  }
}
