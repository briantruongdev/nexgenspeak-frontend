import type { IFormTrialRegister } from '~/schemas/trial-register.schema'
import BaseService from './base.service'

export class TrialRegisterService extends BaseService {
  constructor() {
    super('')
  }

  async register(form: IFormTrialRegister): Promise<{ message: string }> {
    return this.post<{ message: string }>('/trial-requests', form)
  }
}
