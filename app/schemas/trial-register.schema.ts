import { z } from 'zod'
import { PHONE_REGEX } from '~/constants'

export function trialRegisterSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t('validation.nameRequired')),
    email: z.email({ message: t('auth.invalidEmail') }).min(1, { message: t('auth.emailIsRequired') }),
    phone: z.string().regex(PHONE_REGEX, {
      message: t('validation.phoneInvalid')
    }),
    englishLevel: z.string().min(1, t('validation.englishLevelRequired'))
  })
}
export type IFormTrialRegister = z.infer<ReturnType<typeof trialRegisterSchema>>
