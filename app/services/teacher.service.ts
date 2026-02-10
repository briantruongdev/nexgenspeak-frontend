import type { IResponseSlots, IResponseTeachers, IToggleFavoriteResponse } from '~/types/teacher.type'
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

  async toggleFavorite(body: { teacherId: number; action: 'add' | 'remove' }): Promise<IToggleFavoriteResponse> {
    return this.post<IToggleFavoriteResponse>(`/favorite`, body)
  }
}
