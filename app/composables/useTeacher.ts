import { apiTeacher } from '~/services'
import type { IResponseSlots, ISlots } from '~/types/teacher.type'

export const useTeacher = () => {
  const isGettingSlots = ref(false)
  const dataSlots = ref<IResponseSlots>()
  const { showSuccess, showError } = useNotification()
  const { t } = useI18n()
  const slots = ref<ISlots[]>([])
  const { data, pending, error, refresh } = useAsyncData('teachers', () => apiTeacher.getAllTeachers(), {
    server: true
  })

  const getSlotByDate = async (teacherId: number, date: string) => {
    isGettingSlots.value = true
    try {
      const rs = await apiTeacher.getSlots(teacherId, date)
      dataSlots.value = rs
      slots.value = rs.slots.filter(s => s.isAvailable)
    } catch (error) {
      console.log(error)
    } finally {
      isGettingSlots.value = false
    }
  }

  const toggleFavoriteTeacher = async (teacherId: number, action: 'add' | 'remove') => {
    try {
      const body = {
        teacherId,
        action
      }
      const rs = await apiTeacher.toggleFavorite(body)

      if (data.value?.teachers) {
        const teacher = data.value.teachers.find(t => t.teacherId === teacherId)
        if (teacher) {
          teacher.isFavorite = action === 'add'
          triggerRef(data)
        }
      }
      showSuccess(rs.message)
    } catch (error) {
      console.log(error)
      showError(t('booking.favoriteError'))
    }
  }

  return {
    data,
    pending,
    error,
    dataSlots,
    isGettingSlots,
    slots,
    refresh,
    getSlotByDate,
    toggleFavoriteTeacher
  }
}
