import type { IResponseTeachers } from '~/types/teacher.type'
import BaseService from './base.service'

export class TeacherService extends BaseService {
  constructor() {
    super('/teachers')
  }

  async getAllTeachers(): Promise<IResponseTeachers> {
    return this.get<IResponseTeachers>('')
  }
}
