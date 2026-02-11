import { apiBooking } from '~/services'

export const useSchedule = () => {
  const { data, pending, error, refresh } = useAsyncData('schedule', () => apiBooking.getRegistration(), {
    server: true
  })

  return { data, pending, error, refresh }
}
