import type { IDataRegistration, IResponseRegistration } from '~/types/registration.type'
import BaseService from './base.service'

export class BookingService extends BaseService {
  constructor() {
    super('/registrations')
  }

  async registration(data: IDataRegistration): Promise<IResponseRegistration> {
    return this.post<IResponseRegistration>('', data)
  }
}
