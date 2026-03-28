export default defineNuxtPlugin(() => {
  const router = useRouter()

  // Disable browser's native scroll restoration
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  // Store scroll positions
  const scrollPositions = new Map<string, { x: number; y: number }>()
  let isNavigating = false

  // Save scroll position before leaving a route
  router.beforeEach((to, from) => {
    if (from.path) {
      scrollPositions.set(from.path, {
        x: window.scrollX,
        y: window.scrollY
      })
    }
    isNavigating = true
  })

  // Restore scroll position after navigation
  router.afterEach((to, from) => {
    // Use nextTick to ensure DOM is ready
    nextTick(() => {
      // Small delay to ensure all components are mounted
      setTimeout(() => {
        // If navigating to a new page (not reload), scroll to top
        if (from.path && from.path !== to.path) {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }
        // If it's a page reload, restore saved position
        else if (!from.path || from.path === to.path) {
          const savedPosition = scrollPositions.get(to.path)
          if (savedPosition) {
            window.scrollTo({
              top: savedPosition.y,
              left: savedPosition.x,
              behavior: 'instant'
            })
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          }
        }
        isNavigating = false
      }, 0)
    })
  })

  // Prevent scroll during navigation
  if (typeof window !== 'undefined') {
    const preventScroll = (e: Event) => {
      if (isNavigating) {
        e.preventDefault()
        return false
      }
    }

    // Note: This is aggressive and might affect normal scrolling
    // Only use if absolutely necessary
    // window.addEventListener('scroll', preventScroll, { passive: false })
  }
})
