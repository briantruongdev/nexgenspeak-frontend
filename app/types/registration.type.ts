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

export interface ISlot {
  id: number
  startTime: string
  endTime: string
  teacher: {
    teacherId: string
    fullName: string
    position: string
  }
  registrationId: string
  createdAt: string
}

export interface IRegistration {
  date: string
  slots: ISlot[]
}

export interface IListRegistration {
  registrations: IRegistration[]
  total: number
}
