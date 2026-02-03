import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const accessTokenCookie = useCookie('access-token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax'
  })

  const emailCookie = useCookie('email', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax'
  })

  const isAuthenticated = computed(() => !!accessTokenCookie.value)

  return {
    accessTokenCookie,
    isAuthenticated,
    email: emailCookie
  }
})
