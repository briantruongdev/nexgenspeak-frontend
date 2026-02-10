import type { IRegistrationFilter } from '~/types/registration.type'

export const useRegistrationFilterSync = createFilterSync<IRegistrationFilter>({
  defaults: {
    search: ''
  },
  mapping: {
    search: 'search'
  },
  coerce: {
    search: 'string'
  },
  debounceMs: 400
})

export const useRegistration = () => {
  const { apply, filters } = useRegistrationFilterSync()
  return { apply, filters }
}
