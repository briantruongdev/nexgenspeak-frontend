import type { IDataRegistration, IListRegistration, IResponseRegistration } from '~/types/registration.type'
import BaseService from './base.service'

export class BookingService extends BaseService {
  constructor() {
    super('/registrations')
  }

  async registration(data: IDataRegistration): Promise<IResponseRegistration> {
    return this.post<IResponseRegistration>('', data)
  }

  async getRegistration(): Promise<IListRegistration> {
    return this.get<IListRegistration>('')
  }

  async cancelRegistration(registrationId: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/${registrationId}`)
  }
}
