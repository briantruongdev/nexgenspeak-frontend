import { z } from 'zod'
import { EMAIL_REGEX, PHONE_REGEX } from '~/constants'

export function trialRegisterSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t('validation.nameRequired')),
    email: z.string().regex(EMAIL_REGEX, {
      message: t('validation.emailInvalid')
    }),
    phone: z.string().regex(PHONE_REGEX, {
      message: t('validation.phoneInvalid')
    }),
    englishLevel: z.string().min(1, t('validation.englishLevelRequired'))
  })
}
export type IFormTrialRegister = z.infer<ReturnType<typeof trialRegisterSchema>>
