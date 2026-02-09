import { ScheduleStatusEnum } from '~/types/constant.type'

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
  )
}

export const isBeforeToday = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const compareDate = new Date(date)
  compareDate.setHours(0, 0, 0, 0)
  return compareDate < today
}

export const isAfterToday = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const compareDate = new Date(date)
  compareDate.setHours(0, 0, 0, 0)
  return compareDate > today
}

export const matchesStatusFilter = (date: string, statusValue: number): boolean => {
  const itemDate = new Date(date)
  const today = new Date()

  switch (statusValue) {
    case ScheduleStatusEnum.COMPLETED:
      return isBeforeToday(itemDate)
    case ScheduleStatusEnum.TODAY:
      return isSameDate(itemDate, today)
    case ScheduleStatusEnum.UPCOMING:
      return isAfterToday(itemDate)
    case ScheduleStatusEnum.ALL:
    default:
      return true
  }
}
