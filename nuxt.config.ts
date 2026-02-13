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
      title: 'NexGen Speak - Học Tiếng Anh Trực Tuyến',
      titleTemplate: '%s | NexGen Speak',
      meta: [
        {
          name: 'format-detection',
          content: 'telephone=no'
        },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        },
        {
          name: 'googlebot',
          content: 'index, follow'
        },
        {
          name: 'author',
          content: 'NexGen Speak'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/logo.png'
        },
        {
          rel: 'canonical',
          href: 'https://nexgenspeak.com'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

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
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-19',
  nitro: {
    output: {
      publicDir: 'dist'
    }
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
