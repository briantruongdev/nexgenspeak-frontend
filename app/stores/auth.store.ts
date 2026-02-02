import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const accessTokenCookie = useCookie('access-token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax'
  })
  const email = computed(() => localStorage.getItem('email'))
  const isAuthenticated = computed(() => {
    return !!accessTokenCookie.value
  })

  return { accessTokenCookie, isAuthenticated, email }
})
