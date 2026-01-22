import { z } from 'zod'
import { PASSWORD_REGEX } from '~/constants'

export function loginSchema(t: (key: string) => string) {
  return z.object({
    userName: z.string().min(1, t('validation.usernameRequired')).max(100, t('validation.maxLength100')),
    password: z.string().regex(PASSWORD_REGEX, {
      message: t('validation.password')
    })
  })
}

// Types
export type IFormLogin = z.infer<ReturnType<typeof loginSchema>>
