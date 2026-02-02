import { z } from 'zod'
import { PASSWORD_REGEX, PHONE_REGEX } from '~/constants'

export function loginSchema(t: (key: string) => string) {
  return z.object({
    email: z.email({ message: t('auth.invalid-email') }).min(1, { message: t('auth.email-is-required') }),
    password: z.string().regex(PASSWORD_REGEX, {
      message: t('validation.password')
    })
  })
}

export function forgotPassword(t: (key: string) => string) {
  return z
    .object({
      email: z.email({ message: t('auth.invalid-email') }).min(1, { message: t('auth.email-is-required') }),
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

export function registerSchema(t: (key: string) => string) {
  return z
    .object({
      email: z.email({ message: t('auth.invalid-email') }).min(1, { message: t('auth.email-is-required') }),
      phone: z.string().min(1, t('auth.phone-number-is-required')).regex(PHONE_REGEX, t('auth.phone-number-invalid')),

      password: z.string().regex(PASSWORD_REGEX, {
        message: t('validation.password')
      }),
      confirmPassword: z.string().min(1, t('auth.confirm-password-is-required'))
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('auth.passwords-do-not-match')
    })
}

// Types
export type IFormLogin = z.infer<ReturnType<typeof loginSchema>>
export type IFormForgotPassword = z.infer<ReturnType<typeof forgotPassword>>
export type IFormRegister = z.infer<ReturnType<typeof registerSchema>>
