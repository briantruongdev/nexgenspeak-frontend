export interface ITeacher {
  award3: string
  award2: string
  award1: string
  createdAt: string
  teacherId: number
  fullName: string
  position: string
}

export interface IResponseTeachers {
  teachers: ITeacher[]
  total: number
}
