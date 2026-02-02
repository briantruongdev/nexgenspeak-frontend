import type { IFormTrialRegister } from '~/schemas/trial-register.schema'
import BaseService from './base.service'
import type { IFormForgotPassword, IFormLogin } from '~/schemas/auth.schema'
import type { IResponseLogin, IResponseRegisterAndResetPassword } from '~/types/auth.type'

export class AuthService extends BaseService {
  constructor() {
    super('')
  }

  async login(form: IFormLogin): Promise<IResponseLogin> {
    return this.post<IResponseLogin>('/login', form)
  }

  async register(form: IFormTrialRegister): Promise<IResponseRegisterAndResetPassword> {
    return this.post<IResponseRegisterAndResetPassword>('/register', form)
  }

  async resetPassword(form: IFormForgotPassword): Promise<IResponseRegisterAndResetPassword> {
    return this.post<IResponseRegisterAndResetPassword>('/forgot-password', form)
  }
}
