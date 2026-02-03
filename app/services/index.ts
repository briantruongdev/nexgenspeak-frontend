import { AuthService } from './auth.service'
import { TrialRegisterService } from './trial-register.service'

const apiTrialRegister: TrialRegisterService = new TrialRegisterService()
const apiAuth: AuthService = new AuthService()

export { apiTrialRegister, apiAuth }
