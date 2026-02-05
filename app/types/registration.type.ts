export interface IDataRegistration {
  teacherId: number
  slotIds: number[]
  date: string
}

export interface IResponseRegistration {
  message: string
  registration: {
    registrationId: string
    userId: string
    teacherId: number
    slotIds: number[]
    date: string
    createdAt: string
  }
}
