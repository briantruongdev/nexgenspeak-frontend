import { apiTeacher } from '~/services'

export const useTeacher = () => {
  const { data, pending, error, refresh } = useAsyncData('teachers', () => apiTeacher.getAllTeachers(), {
    server: true
  })

  return {
    data,
    pending,
    error,
    refresh
  }
}
