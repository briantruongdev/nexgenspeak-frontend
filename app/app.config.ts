export default defineAppConfig({
  pages: {
    home: {
      path: '/',
      name: 'Home'
    },
    'not-found': {
      path: '/:pathMatch(.*)*',
      title: 'Page Not Found'
    }
  },
  repository: 'nuxt/ui',
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    prose: {
      li: {
        base: 'wrap-break-word'
      },
      a: {
        base: 'wrap-break-word'
      }
    },
    font: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }
  }
})
