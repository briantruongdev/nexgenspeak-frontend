import BaseService from './base.service'

export class BookingService extends BaseService {
  constructor() {
    super('/registrations')
  }
}
