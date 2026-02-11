import { apiBooking } from '~/services'
import type { IDataRegistration } from '~/types/registration.type'

const isBooking = ref(false)
export const useRegistration = () => {
  const config = useRuntimeConfig()
  const maxSlots = config.public.maxSlots
  const { t } = useI18n()
  const isSlotModalVisible = useState<boolean>('slot-modal-visible', () => false)
  const selectedTeacherId = useState<string>('selected-teacher-id', () => '')
  const selectedSlotIds = useState<number[]>('selected-slot-ids', () => [])
  const { showSuccess, showError } = useNotification()

  const isSlotSelected = (slotId: number) => {
    return selectedSlotIds.value.includes(slotId)
  }
  const handleSelectSlot = (slotId: number) => {
    const index = selectedSlotIds.value.indexOf(slotId)

    if (index > -1) {
      selectedSlotIds.value.splice(index, 1)
    } else {
      if (selectedSlotIds.value.length < maxSlots) {
        selectedSlotIds.value.push(slotId)
      } else {
        showError(t('booking.maxSlotsError', { max: maxSlots }))
      }
    }
  }

  const booking = async (data: IDataRegistration) => {
    isBooking.value = true
    try {
      await apiBooking.registration(data)
      showSuccess(t('messgae-registration'))
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      isBooking.value = false
    }
  }
  const cancelBooking = async (data: { registrationId: string; slotIds: number[] }) => {
    try {
      const rs = await apiBooking.cancelRegistration(data)
      showSuccess(rs.message || 'Đã hủy lịch học thành công')
    } catch (error) {
      showError('Không thể hủy lịch học. Vui lòng thử lại.')
      throw error
    }
  }
  return {
    isBooking,
    isSlotModalVisible,
    selectedTeacherId,
    selectedSlotIds,
    isSlotSelected,
    handleSelectSlot,
    booking,
    cancelBooking
  }
}
