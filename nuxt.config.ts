// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt'],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'NexGen Speak - Học Tiếng Anh 1 kèm 1 Online',
      titleTemplate: '%s',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'author', content: 'NexGen Speak' }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/images/logo.png' }]
    }
  },
  css: ['~/assets/css/main.css'],
  vue: {
    compilerOptions: {
      whitespace: 'condense'
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  ui: {
    colorMode: true
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nexgenspeak.com',
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL || 'https://u3ekmrrakd.execute-api.ap-southeast-1.amazonaws.com/dev',
      maxSlots: parseInt(process.env.NUXT_PUBLIC_MAX_SLOTS || '3')
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/blog': { ssr: true },
    '/teachers': { ssr: true },
    '/teacher/**': { ssr: true },
    '/contact': { ssr: true },
    '/document': { ssr: true },
    '/recruitment': { ssr: true },
    '/study-plan': { ssr: true },
    '/register': { ssr: true },
    '/login': { ssr: true },
    '/forgot-password': { ssr: true }
  },

  // Performance: reduce JS bundle
  features: {
    inlineStyles: false
  },
  experimental: {
    payloadExtraction: true,
    componentIslands: false
  },

  compatibilityDate: '2025-01-19',
  nitro: {
    output: { publicDir: 'dist' },
    compressPublicAssets: true
  },

  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component'
      })
    ]
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'vi',
        iso: 'vi-VN',
        name: 'Tiếng Việt',
        file: 'vi.json',
        dir: 'ltr'
      }
    ],
    defaultLocale: 'vi',
    strategy: 'no_prefix',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'vi',
      cookieCrossOrigin: false,
      cookieSecure: true
    }
  }
})
