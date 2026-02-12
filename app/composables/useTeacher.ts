import { apiTeacher } from '~/services'
import type { IResponseSlots, ISlots } from '~/types/teacher.type'

const slots = ref<ISlots[]>([])
const isGettingSlots = ref(false)
const isProcessing = ref(false)
const isFetchingTeacherDetail = ref(false)
export const useTeacher = () => {
  const dataSlots = ref<IResponseSlots>()
  const { showSuccess, showError } = useNotification()
  const { t } = useI18n()
  const { data, pending, error, refresh } = useAsyncData('teachers', () => apiTeacher.getAllTeachers(), {
    server: true
  })

  const getSlotByDate = async (teacherId: string, date: string) => {
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

  const toggleFavoriteTeacher = async (teacherId: string, action: 'add' | 'remove') => {
    try {
      isProcessing.value = true
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
    } finally {
      isProcessing.value = false
    }
  }

  return {
    data,
    pending,
    error,
    dataSlots,
    isGettingSlots,
    slots,
    isProcessing,
    isFetchingTeacherDetail,
    refresh,
    getSlotByDate,
    toggleFavoriteTeacher
  }
}
export const useTeacherDetail = (teacherId: MaybeRef<string>) => {
  const id = toRef(teacherId)

  const { data, pending, refresh } = useAsyncData(
    () => `teacher-${id.value}`,
    () => apiTeacher.getTeacherById(id.value),
    {
      server: true,
      watch: [id]
    }
  )

  const teacherDetail = computed(() => data.value?.teacher)

  return {
    teacherDetail,
    isFetchingTeacherDetail: pending,
    refreshTeacher: refresh
  }
}
