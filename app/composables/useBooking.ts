import { apiBooking } from '~/services'
import type { IDataRegistration } from '~/types/registration.type'

export const useBooking = () => {
  const { showSuccess } = useNotification()
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

  return { isBooking, booking }
}
