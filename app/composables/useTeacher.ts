import { apiTeacher } from '~/services'
import type { IResponseSlots, ISlots } from '~/types/teacher.type'

export const useTeacher = () => {
  const isGettingSlots = ref(false)
  const dataSlots = ref<IResponseSlots>()
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

  return {
    data,
    pending,
    error,
    dataSlots,
    isGettingSlots,
    slots,
    refresh,
    getSlotByDate
  }
}
