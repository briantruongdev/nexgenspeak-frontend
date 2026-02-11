import type { IResponseSlots, IResponseTeachers, ITeacher, IToggleFavoriteResponse } from '~/types/teacher.type'
import BaseService from './base.service'

export class TeacherService extends BaseService {
  constructor() {
    super('/teachers')
  }

  async getAllTeachers(): Promise<IResponseTeachers> {
    return this.get<IResponseTeachers>('')
  }

  async getSlots(teacherId: string, date: string): Promise<IResponseSlots> {
    return this.get<IResponseSlots>(`/${teacherId}/available-slots?date=${date}`)
  }

  async toggleFavorite(body: { teacherId: string; action: 'add' | 'remove' }): Promise<IToggleFavoriteResponse> {
    return this.post<IToggleFavoriteResponse>(`/favorite`, body)
  }

  async getTeacherById(teacherId: string): Promise<{ teacher: ITeacher }> {
    return this.get<{ teacher: ITeacher }>(`/${teacherId}`)
  }
}
