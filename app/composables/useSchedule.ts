import { apiBooking } from '~/services'
import { ScheduleStatusEnum } from '~/types/constant.type'
import type { IDataRegistration, IScheduleFilter } from '~/types/registration.type'

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
  const { showSuccess, showError } = useNotification()
  const { apply, filters } = useScheduleFilterSync()
  const isBooking = ref(false)

  const booking = async (data: IDataRegistration) => {
    isBooking.value = true
    try {
      const rs = await apiBooking.registration(data)
      showSuccess(rs.message)
    } catch (error) {
      console.log(error)
    } finally {
      isBooking.value = false
    }
  }

  const { data, pending, error, refresh } = useAsyncData('schedule', () => apiBooking.getRegistration(), {
    server: true
  })

  const cancelBooking = async (data: { registrationId: string; slotIds: number[] }) => {
    try {
      const rs = await apiBooking.cancelRegistration(data)
      showSuccess(rs.message || 'Đã hủy lịch học thành công')
      await refresh()
    } catch (error) {
      showError('Không thể hủy lịch học. Vui lòng thử lại.')
      throw error
    }
  }

  return { isBooking, filters, data, pending, error, apply, refresh, booking, cancelBooking }
}
