export interface SeoOptions {
  title?: string
  description?: string
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

  // Default values
  const siteUrl = options.url || config.public?.siteUrl || 'https://nexgenspeak.com'
  const siteName = options.siteName || 'NexGen Speak'
  const defaultTitle = t('pageTitle') || 'Chinh phục Tiếng Anh với NexGen Speak'
  const defaultDescription =
    t('pageDescription') ||
    'Học Tiếng Anh trực tuyến với giáo viên bản xứ. Môi trường học tập tối ưu, phương pháp hiện đại, cam kết đầu ra.'
  const defaultImage = `${siteUrl}/images/banner.png`

  const currentUrl = `${siteUrl}${route.path === '/' ? '' : route.path}`

  const currentLocale = options.locale || locale.value || 'vi'
  const alternateLocale = options.alternateLocale || (currentLocale === 'vi' ? 'en' : 'vi')

  const title = options.title || defaultTitle

  const description = options.description || defaultDescription

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
          sameAs: [
            // Add social media links here if available
          ]
        })
      }
    ]
  })

  return {
    title,
    description,
    image,
    url: currentUrl
  }
}
