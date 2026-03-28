import type { ICancelRegistration, IDataRegistration, IListRegistration, IResponseRegistration } from '~/types/registration.type'
import BaseService from './base.service'

export class BookingService extends BaseService {
  constructor() {
    super('/registrations')
  }

  async booking(data: IDataRegistration): Promise<IResponseRegistration> {
    return this.post<IResponseRegistration>('', data)
  }

  async getBooking(): Promise<IListRegistration> {
    return this.get<IListRegistration>('')
  }

  async cancelBooking(body: { registrationId: string; slotIds: number[] }): Promise<ICancelRegistration> {
    return this.delete<ICancelRegistration>(`/cancel-slot`, body)
  }
}
