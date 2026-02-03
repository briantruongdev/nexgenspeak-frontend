import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import type { FetchError } from 'ofetch'

const API_REQUEST_TIMEOUT = 20000
const defaultHeaders: Record<string, string> = {
  // 'App-Code': 'nexgen-speak',
  Accept: 'application/json'
}

interface ExtendedFetchOptions<T extends NitroFetchRequest = NitroFetchRequest> extends NitroFetchOptions<T> {
  _retry?: boolean
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const toast = useToast()
  const language = useCookie('i18n_redirected')

  const $http = $fetch.create({
    baseURL: runtimeConfig.public.baseApiUrl,
    headers: defaultHeaders,
    timeout: API_REQUEST_TIMEOUT
  })

  async function apiFetch<T>(url: NitroFetchRequest, options: ExtendedFetchOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) ?? {})
    }

    if (options.body && !(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    if (import.meta.client) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      if (csrfToken) headers['X-CSRF-Token'] = csrfToken
    }

    try {
      return await $http<T>(url, { ...options, headers })
    } catch (error) {
      const err = error as FetchError

      if (err?.response?.status === 401 && !options._retry) {
        options._retry = true
      }

      if (err?.response?.status === 400 && import.meta.client) {
        toast.add({
          title: language.value === 'en' ? 'Error' : 'Lỗi',
          description: err?.response?._data?.message || 'Có lỗi xảy ra',
          color: 'error'
        })
      }

      throw err
    }
  }

  return {
    provide: {
      http: apiFetch,
      api: apiFetch
    }
  }
})
