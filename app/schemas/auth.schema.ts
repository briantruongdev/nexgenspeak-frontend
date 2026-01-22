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

export function forgotPassword(t: (key: string) => string) {
  return z
    .object({
      oldPassword: z.string().regex(PASSWORD_REGEX, {
        message: t('validation.password')
      }),
      newPassword: z.string().regex(PASSWORD_REGEX, {
        message: t('validation.password')
      }),
      confirmNewPassword: z.string().regex(PASSWORD_REGEX, {
        message: t('validation.password')
      })
    })
    .refine(data => data.newPassword === data.confirmNewPassword, {
      message: t('validation.passwordMismatch'),
      path: ['confirmNewPassword']
    })
}

// Types
export type IFormLogin = z.infer<ReturnType<typeof loginSchema>>
export type IFormForgotPassword = z.infer<ReturnType<typeof forgotPassword>>
