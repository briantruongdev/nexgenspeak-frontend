import type { IResponseSlots, IResponseTeachers } from '~/types/teacher.type'
import BaseService from './base.service'

export class TeacherService extends BaseService {
  constructor() {
    super('/teachers')
  }

  async getAllTeachers(): Promise<IResponseTeachers> {
    return this.get<IResponseTeachers>('')
  }

  async getSlots(teacherId: number, date: string): Promise<IResponseSlots> {
    return this.get<IResponseSlots>(`/${teacherId}/available-slots?date=${date}`)
  }
}
