export interface ITeacher {
  teacherId: string
  fullName: string
  position: string
  award1: string
  award2: string
  award3: string
  avatar: string
  rating: number
  totalReviews: number
  students: number
  lessons: number
  pricePerHour: number
  languages: string[]
  aboutMe: string
  strengths: string
  teachingStyle: string
  resume: [{ time: string; value: string }]
  specialties: [
    {
      title: string
      description: string
    }
  ]
  isFavorite?: boolean
}

export interface IResponseTeachers {
  teachers: ITeacher[]
  total: number
}

export interface IResponseSlots {
  teacherId: number
  teacherName: string
  date: string
  slots: ISlots[]
}

export interface ISlots {
  id: number
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface IToggleFavoriteResponse {
  success: boolean
  message: string
  data: {
    favoriteTeachers: number[]
  }
}
