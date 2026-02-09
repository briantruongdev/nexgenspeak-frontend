import { AuthService } from './auth.service'
import { BookingService } from './booking.service'
import { TeacherService } from './teacher.service'
import { TrialRegisterService } from './trial-register.service'

const apiTrialRegister: TrialRegisterService = new TrialRegisterService()
const apiAuth: AuthService = new AuthService()
const apiBooking: BookingService = new BookingService()
const apiTeacher: TeacherService = new TeacherService()

export { apiTrialRegister, apiAuth, apiBooking, apiTeacher }
