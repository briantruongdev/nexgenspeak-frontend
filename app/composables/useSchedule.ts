import { apiBooking } from '~/services'
import { ScheduleStatusEnum } from '~/types/constant.type'
import type { IScheduleFilter } from '~/types/registration.type'

export const useScheduleFilterSync = createFilterSync<IScheduleFilter>({
  defaults: {
    search: '',
    status: ScheduleStatusEnum.UPCOMING
  },
  mapping: {
    search: 'search',
    status: 'status'
  },
  coerce: {
    search: 'string',
    status: 'number'
  },
  debounceMs: 400
})

export const useSchedule = () => {
  const { apply, filters } = useScheduleFilterSync()

  const { data, pending, error, refresh } = useAsyncData('schedule', () => apiBooking.getRegistration(), {
    server: true
  })

  return { filters, data, pending, error, apply, refresh }
}
